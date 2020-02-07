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
  TemplateRef,
} from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';

import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { Column } from '../../../models/column.model';
import { ReorderPosition, ReorderStrategy } from '../../../classes/reorder-controller';
import { SelectionController, SelectionChangeType } from '../../../classes/selection-controller';
import { RowAction } from '../../../models/row-action.model';
import { Row } from '../../../models/row.model';


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
  @Input() public reorderEnabled: boolean;
  @Input() public reorderStrategy: ReorderStrategy;
  @Input() public reorderPosition: ReorderPosition;

  @Input() public dragStart: any;
  @Input() public activeRow: TemplateRef<any>;

  @Input() public rowRemoved: EventEmitter<any>;

  // @Output() public stopDragging = new EventEmitter();

  @ViewChildren('td')
  public cellRefs;

  public readonly ReorderPosition = ReorderPosition;
  public readonly ReorderStrategy = ReorderStrategy;

  public rowActions: RowAction[] = [];

  public menuRowActions: RowAction[] = [];
  public inlineRowActions: RowAction[] = [];
  public restoreAction: RowAction;

  public selected = false;

  private _rowDiffer: KeyValueDiffer<any, any>;

  private _eventListeners = [];

  private _destroy$ = new Subject();

  constructor(
    public el: ElementRef,
    private _cdRef: ChangeDetectorRef,
    private _differs: KeyValueDiffers,
    private _renderer: Renderer2,
  ) {
    this._rowDiffer = _differs.find({}).create();
    this._cdRef.detach();
  }

  @HostBinding('class')
  get rowCssClass() {
    let cls = 'fs-list-row';

    if (this.rowIndex % 2 !== 0) cls += ' fs-list-row-odd';
    if (this.rowIndex % 2 === 0) cls += ' fs-list-row-even';

    if (this.row && this.row.isGroup) cls += ' fs-list-row-group';

    if (this.rowClass) {
      const resultClass = this.rowClass(this.row.data);

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
          action.checkShowStatus(this.row.data);
          action.updateLink(this.row.data);
        });
        this.filterActionsByCategories();
      }

      this._cdRef.detectChanges();
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
    this.selected = event.checked;

    this.selection.rowSelectionChange(this.row.data, event.checked);
    this._cdRef.detectChanges();
  }

  /**
   * Track By for improve change detection
   * @param index
   */
  public trackByFn(index) {
    return index;
  }

  /**
   * Set event listeners for row
   */
  private initRowEvents() {
    for (const event in this.rowEvents) {
      if (this.rowEvents.hasOwnProperty(event)) {
        const listener = this._renderer.listen(this.el.nativeElement, event, (evt) => {
          evt.preventDefault();
          evt.stopPropagation();

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
          // Would like to respond only when checkbox on top is changed
          // or was clicked "Select All" in selection dialog
          filter(({type}) => {
            return type === SelectionChangeType.AllVisibleSelectionChange
              || type === SelectionChangeType.SelectedAll;
          }),
          takeUntil(this._destroy$),
        )
        .subscribe(({payload: status}) => {
          this.selected = status;

          this._cdRef.detectChanges();
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
