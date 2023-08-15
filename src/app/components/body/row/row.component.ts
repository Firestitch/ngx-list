import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ElementRef,
  EventEmitter,
  KeyValueDiffers,
  Renderer2,
  Component,
  DoCheck,
  HostBinding,
  Input,
  KeyValueDiffer,
  OnDestroy,
  OnInit,
  ViewChildren,
} from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Column } from '../../../models/column.model';
import {
  ReorderController,
  ReorderPosition,
  ReorderStrategy
} from '../../../classes/reorder-controller';
import { SelectionController } from '../../../classes/selection-controller';
import { RowAction } from '../../../models/row-action.model';
import { Row } from '../../../models/row';
import { FsListDraggableListDirective } from '../../../directives/draggable-list/draggable-list.directive';


@Component({
  selector: '[fs-list-row]',
  templateUrl: 'row.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FsRowComponent implements OnInit, DoCheck, OnDestroy {

  @HostBinding('attr.role')
  public role = 'row';

  @Input() public row: Row;
  @Input() public rowActionsRaw: any [] = [];
  @Input() public groupActionsRaw: any [] = [];
  @Input() public hasRowActions = false;
  @Input() public rowEvents = {};
  @Input() public rowClass;
  @Input() public restoreMode = false;

  @Input() public rowIndex: number;
  @Input() public columns: Column[];
  @Input() public selection: SelectionController;

  @Input() public rowRemoved: EventEmitter<any>;

  @Input() activeFiltersCount: number;

  @Input()
  @HostBinding('class.drag-row')
  public reorderEnabled: boolean;

  @Input() reorderPosition: ReorderPosition | null;
  @Input() reorderStrategy: ReorderStrategy | null;
  @Input() reorderMultiple: boolean;


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

  public get isChildRow(): boolean {
    return this.row.isChild;
  }

  public get isGroupFooterRow(): boolean {
    return this.row.isGroupFooter;
  }

  public get isDragDisabled(): boolean {
    return !this.selected && this.reorderMultiple && !!this.selection.selectedRows.size;
  }

  @HostBinding('class.multiple-selection')
  get isMultipleSelection() {
    const multiple = this.reorderMultiple;

    return multiple && this.selected;
  }

  @HostBinding('class')
  get rowCssClass() {
    let cls = 'fs-list-row';

    if (this.rowIndex % 2 !== 0) cls += ' fs-list-row-odd';
    if (this.rowIndex % 2 === 0) cls += ' fs-list-row-even';

    if (this.row?.isGroup) {
      cls += ' fs-list-row-group';
    } else if (this.row?.isChild) {
      cls += ' fs-list-row-group-child';
    } else if (this.row?.isGroupFooter) {
      cls += ' fs-list-row-group-footer';
    }

    if (this.rowClass) {
      const options: any = {
        index: this.rowIndex,
      };

      if (this.row.isGroup) {
        options.groupIndex = this.row.index;
      } else if (this.row.isChild) {
        options.groupIndex = this.row.index;
      }

      const resultClass = this.rowClass(this.row.data, options);

      if (typeof resultClass === 'string') {
        cls += ` ${resultClass}`;
      } else if (typeof resultClass === 'object') {
        const keys = Object.keys(resultClass);
        for (const k of keys) {
          if (resultClass[k] === true) cls += ` ${k}`;
        }
      }
    }

    return cls;
  }

  public get dragCellVisible(): boolean {
    return !this.row.isGroup;
  }

  public get leftDragDropEnabled(): boolean {
    return this.reorderEnabled
      && this.reorderPosition === ReorderPosition.Left
      && this.activeFiltersCount == 0
  }

  public get rightDragDropEnabled(): boolean {
    return this.reorderEnabled
      && this.reorderPosition === ReorderPosition.Right
      && this.activeFiltersCount == 0
  }

  public ngOnInit() {
    this.initRowEvents();
    this.initSelection();

    if (this.row && this.row.isGroup) {
      if (this.row && this.row.isGroup && this.groupActionsRaw) {
        this.rowActions = this.groupActionsRaw.map((action) => new RowAction(action));

        this.filterActionsByCategories();
      }
    } else if (this.rowActionsRaw) {
      this.rowActions = this.rowActionsRaw.map((action) => new RowAction(action));

      this.filterActionsByCategories();
    }
  }

  public ngDoCheck() {
    if (this._rowDiffer.diff(this.row)) {
      if (this.rowActions) {
        this.rowActions.forEach((action) => {
          action.checkShowStatus(this.row.data, this.rowIndex);
          action.updateLink(this.row.data);
        });
        this.filterActionsByCategories();
      }

      this._cdRef.markForCheck();
    }
  }

  public ngOnDestroy() {
    this._eventListeners.forEach((listener) => { listener() });

    this._destroy$.next();
    this._destroy$.complete();
  }

  /**
   * Select row by checkbox
   * @param event
   */
  public selectRow(event: MatCheckboxChange) {
    this.selection.rowSelectionChange(this.row, event.checked);
    this._cdRef.markForCheck();
  }

  /**
   * Track By for improve change detection
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
  private initRowEvents() {
    for (const event in this.rowEvents) {
      if (this.rowEvents.hasOwnProperty(event)) {
        const listener = this._renderer.listen(this.el.nativeElement, event, (evt) => {
          // evt.preventDefault();
          // evt.stopPropagation();

          if (!this.reorderEnabled) {
            this.rowEvents[event]({
              event: evt,
              row: this.row.data,
              rowIndex: this.rowIndex
            });
          }
        });

        this._eventListeners.push(listener);
      }
    }
  }

  /**
   * Subscribe to selection change events
   */
  private initSelection() {
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

  private filterActionsByCategories() {
    this.menuRowActions = [];
    this.inlineRowActions = [];
    this.restoreAction = null;

    this.rowActions.forEach((action) => {

      if (!action.isShown) { return }

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
