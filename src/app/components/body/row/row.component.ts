import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  DoCheck,
  ElementRef,
  EventEmitter,
  HostBinding,
  input,
  Input,
  KeyValueDiffer,
  KeyValueDiffers,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { NgIf, NgTemplateOutlet, NgFor, NgClass, AsyncPipe } from '@angular/common';

import { MatCheckboxChange, MatCheckbox } from '@angular/material/checkbox';
import { MatIcon } from '@angular/material/icon';

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
import { isChildRow, isChildTypeRow, isGroupFooterRow, isGroupRow, Row } from '../../../models/row';
import { RowAction } from '../../../models/row-action.model';
import { FsCellComponent } from './cell/cell.component';
import { FsRowActionsComponent } from './actions/actions.component';


@Component({
    selector: '[fs-list-row]',
    templateUrl: './row.component.html',
    styleUrls: ['./row.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
      '[class]': "this.rowCustomClass()",
    },
    standalone: true,
    imports: [
        NgIf,
        NgTemplateOutlet,
        MatCheckbox,
        NgFor,
        FsCellComponent,
        NgClass,
        FsRowActionsComponent,
        MatIcon,
        AsyncPipe,
    ],
})
export class FsRowComponent implements OnInit, DoCheck, AfterViewInit, OnDestroy {

  @HostBinding('attr.role')
  public role = 'row';

  public row = input<Row>();

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

  public get isDragDisabled(): boolean {
    return !this.selected && this.reorderMultiple && !!this.selection.selectedRows.size;
  }

  @HostBinding('class.multiple-selection')
  public get isMultipleSelection() {
    const multiple = this.reorderMultiple;

    return multiple && this.selected;
  }

  public rowCustomClass = computed(() => {
    if (!this.row()) {
      return;
    }

    let classes = ['fs-list-row'];

    if (this.rowIndex % 2 !== 0) {
      classes.push('fs-list-row-odd');
    }
    if (this.rowIndex % 2 === 0) {
      classes.push('fs-list-row-even');
    }

    if (isGroupRow(this.row())) {
      classes.push('fs-list-row-group');
    } else if (isChildRow(this.row())) {
      classes.push('fs-list-row-group-child');
    } else if (isGroupFooterRow(this.row())) {
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
  });

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

    if (this.row()) {
      this._initRowActionsUpdate();
    }

    if (this.row() && isGroupRow(this.row()) && this.groupActionsRaw) {
      this.rowActions = this.groupActionsRaw.map((action) => new RowAction(action));

      this._filterActionsByCategories();
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

  public ngAfterViewInit(): void {
    this._initSelection();
  }

  public isGroupRow = computed(() => {
    return isGroupRow(this.row());
  });

  public isGroupFooterRow = computed(() => {
    return isGroupFooterRow(this.row());
  });

  public dragCellVisible = computed(() => {
    return !isGroupRow(this.row());
  });

  public updateRowActions() {
    if (this.rowActions) {
      this.rowActions.forEach((action) => {
        action.checkShowStatus(this.row().data, this.rowIndex);
        action.updateLink(this.row().data);
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
    this.selection.rowSelectionChange(this.row(), event.checked);
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
              row: this.row().data,
              rowIndex: this.rowIndex,
            });
          });

        this._eventListeners.push(listener);
      });
  }

  private _initRowActionsUpdate() : void {
    if(this.row().actionsUpdated$) {
      this.row().actionsUpdated$
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
    const currentRow = this.row();
    const options: FsListRowClassOptions = {
      index: this.rowIndex,
      type: currentRow.type,
    };

    if (isGroupRow(currentRow)) {
      options.groupIndex = currentRow.index;
    } else if (isChildTypeRow(currentRow)) {
      options.groupIndex = currentRow.parent.index;
    }

    const resultClass = rowClass(this.row().data, options);
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
    if (this.selection && this.row()) {
      this.selected = this.selection.isRowSelected(this.row().data);

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
          const currentRow = this.row();

          this.selected = currentRow && this.selection.isRowSelected(currentRow.data);

          if (isGroupRow(currentRow)) {
            const groupSelection = this.selection.isGroupSelected(currentRow);

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
