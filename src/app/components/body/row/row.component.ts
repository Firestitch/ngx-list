import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  KeyValueDiffer,
  KeyValueDiffers,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChildren,
} from '@angular/core';

import { MatCheckboxChange } from '@angular/material/checkbox';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {
  ReorderPosition,
  ReorderStrategy,
} from '../../../classes/reorder-controller';
import { SelectionController } from '../../../classes/selection-controller';
import { FsListDraggableListDirective } from '../../../directives/draggable-list/draggable-list.directive';
import { FsListRowClassOptions } from '../../../interfaces';
import { Column } from '../../../models/column.model';
import { Row } from '../../../models/row';
import { RowAction } from '../../../models/row-action.model';


@Component({
  selector: '[fs-list-row]',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsRowComponent implements OnInit, DoCheck, OnDestroy {

  @HostBinding('attr.role')
  public role = 'row';

  @Input() public row: Row;
  @Input() public rowActionsRaw: any[] = [];
  @Input() public groupActionsRaw: any[] = [];
  @Input() public hasRowActions = false;
  @Input() public rowEvents: any = {};
  @Input() public rowClass;
  @Input() public restoreMode = false;
  @Input() public rowIndex: number;
  @Input() public columns: Column[];
  @Input() public selection: SelectionController;
  @Input() public rowRemoved: EventEmitter<any>;
  @Input() public activeFiltersCount: number;

  @Input()
  @HostBinding('class.drag-row')
  public reorderEnabled: boolean;

  @Input() public reorderPosition: ReorderPosition | null;
  @Input() public reorderStrategy: ReorderStrategy | null;
  @Input() public reorderMultiple: boolean;


  @ViewChildren('td')
  public cellRefs;

  public readonly ReorderPosition = ReorderPosition;
  public readonly ReorderStrategy = ReorderStrategy;
  public rowActions: RowAction[] = [];
  public menuRowActions: RowAction[] = [];
  public inlineRowActions: RowAction[] = [];
  public restoreAction: RowAction;
  public selected = false;
  public indeterminateSelected: boolean | 'indeterminate' = false;

  private _rowDiffer: KeyValueDiffer<any, any>;
  private _eventListeners = [];
  private _destroy$ = new Subject();

  constructor(
    public el: ElementRef,
    private _cdRef: ChangeDetectorRef,
    private _differs: KeyValueDiffers,
    private _renderer: Renderer2,
    private _draggableList: FsListDraggableListDirective,
  ) {
    this._rowDiffer = _differs.find({}).create();
  }

  public get isGroupRow(): boolean {
    return this.row.isGroup;
  }

  public get isGroupChildRow(): boolean {
    return this.row.isGroupChild;
  }

  public get isGroupFooterRow(): boolean {
    return this.row.isGroupFooter;
  }

  public get isDragDisabled(): boolean {
    return !this.selected && this.reorderMultiple && !!this.selection.selectedRows.size;
  }

  @HostBinding('class.multiple-selection')
  public get isMultipleSelection() {
    const multiple = this.reorderMultiple;

    return multiple && this.selected;
  }

  @HostBinding('class')
  public get rowCssClass() {
    let classes = ['fs-list-row'];

    if (this.rowIndex % 2 !== 0) {
      classes.push('fs-list-row-odd');
    }
    if (this.rowIndex % 2 === 0) {
      classes.push('fs-list-row-even');
    }

    if (this.row?.isGroup) {
      classes.push('fs-list-row-group');
    } else if ((this.row as any)?.isChild) { // TODO fix isChild & all
      classes.push('fs-list-row-group-child');
    } else if (this.row?.isGroupFooter) {
      classes.push('fs-list-row-group-footer');
    } else {
      classes.push('fs-list-row-body');
    }

    if(this.rowEvents?.click) {
      classes.push('fs-list-row-clickable');
    }

    if (this.rowClass) {
      classes = [
        ...classes,
        ...this._getRowClasses(this.rowClass),
      ];
    }

    return classes.join(' ');
  }

  public get dragCellVisible(): boolean {
    return !this.row.isGroup;
  }

  public get leftDragDropEnabled(): boolean {
    return this.reorderEnabled
      && this.reorderPosition === ReorderPosition.Left
      && this.activeFiltersCount === 0;
  }

  public get rightDragDropEnabled(): boolean {
    return this.reorderEnabled
      && this.reorderPosition === ReorderPosition.Right
      && this.activeFiltersCount === 0;
  }

  public ngOnInit() {
    this._initRowEvents();
    this._initSelection();

    if (this.row) {
      this._initRowActionsUpdate();
    }

    if (this.row && this.row.isGroup) {
      if (this.row && this.row.isGroup && this.groupActionsRaw) {
        this.rowActions = this.groupActionsRaw.map((action) => new RowAction(action));

        this._filterActionsByCategories();
      }
    } else if (this.rowActionsRaw) {
      this.rowActions = this.rowActionsRaw.map((action) => new RowAction(action));

      this._filterActionsByCategories();
    }
  }

  public ngDoCheck() {
    if (this._rowDiffer.diff(this.row)) {
      this.updateRowActions();
    }
  }

  public updateRowActions() {
    if (this.rowActions) {
      this.rowActions.forEach((action) => {
        action.checkShowStatus(this.row.data, this.rowIndex);
        action.updateLink(this.row.data);
      });
      this._filterActionsByCategories();
    }

    this._cdRef.markForCheck();
  }

  public ngOnDestroy() {
    this._eventListeners.forEach((listener) => {
      listener();
    });

    this._destroy$.next(null);
    this._destroy$.complete();
  }

  /**
   * Select row by checkbox
   *
   * @param event
   */
  public selectRow(event: MatCheckboxChange) {
    this.selection.rowSelectionChange(this.row, event.checked);
    this._cdRef.markForCheck();
  }

  /**
   * Track By for improve change detection
   *
   * @param index
   */
  public trackByFn(index) {
    return index;
  }

  public dragStart(event) {
    if (this.reorderEnabled && !this.isDragDisabled) {
      event.preventDefault();
      event.stopPropagation();

      this._draggableList.dragStart(this.el.nativeElement);
    }
  }

  /**
   * Set event listeners for row
   */
  private _initRowEvents() {
    Object.keys(this.rowEvents || {})
      .forEach((event) => {
        const listener = this._renderer
          .listen(this.el.nativeElement, event, (evt) => {
            this.rowEvents[event]({
              event: evt,
              row: this.row.data,
              rowIndex: this.rowIndex,
            });
          });

        this._eventListeners.push(listener);
      });
  }
  
  private _initRowActionsUpdate() : void {
    if(this.row.actionsUpdate$) {
      this.row.actionsUpdate$
        .pipe(
          takeUntil(this._destroy$),
        )
        .subscribe(() => {
          this.updateRowActions();
        });
    }
  }

  private _getRowClasses(rowClass): string[] {
    const classes = [];
    const options: FsListRowClassOptions = {
      index: this.rowIndex,
      type: this.row.type,
    };

    if (this.row.isGroup) {
      options.groupIndex = this.row.index;
    } else if ((this.row as any).isChild || this.row.isGroupFooter) { // TODO fix isChild & all
      options.groupIndex = this.row.parent.index;
    }

    const resultClass = rowClass(this.row.data, options);
    if(resultClass) {
      if (typeof resultClass === 'string') {
        classes.push(resultClass);
      } else if (typeof resultClass === 'object') {
        const keys = Object.keys(resultClass);
        for (const k of keys) {
          if (resultClass[k] === true) {
            classes.push(k);
          }
        }
      }
    }

    return classes;
  }

  /**
   * Subscribe to selection change events
   */
  private _initSelection() {
    if (this.selection) {
      this.selected = this.row && this.selection.isRowSelected(this.row.data);

      this.selection.selectionChange$
        .pipe(
          // // Would like to respond only when checkbox on top is changed
          // // or was clicked "Select All" in selection dialog
          // filter(({type}) => {
          //   return type === SelectionChangeType.AllVisibleSelectionChange
          //     || type === SelectionChangeType.SelectedAll;
          // }),
          takeUntil(this._destroy$),
        )
        .subscribe(() => {
          this.selected = this.row && this.selection.isRowSelected(this.row.data);

          if (this.row?.isGroup) {
            const groupSelection = this.selection.isGroupSelected(this.row);

            if (groupSelection === 'indeterminate') {
              this.selected = true;
              this.indeterminateSelected = true;
            } else {
              this.selected = groupSelection;
              this.indeterminateSelected = false;
            }
          }

          this._cdRef.markForCheck();
        });
    }
  }

  private _filterActionsByCategories() {
    this.menuRowActions = [];
    this.inlineRowActions = [];
    this.restoreAction = null;

    this.rowActions.forEach((action) => {

      if (!action.isShown) {
        return;
      }

      if (action.menu && !action.restore) {
        this.menuRowActions.push(action);
      } else if (!action.menu && !action.restore) {
        this.inlineRowActions.push(action);
      } else if (action.restore) {
        this.restoreAction = action;
      }
    });
  }
}
