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
  ViewChildren, TemplateRef,
} from '@angular/core';
import { MatCheckboxChange } from '@angular/material';

import { FsPrompt } from '@firestitch/prompt';

import { Observable, Subject } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';

import {
  Column,
  RowAction,
  Selection,
  SelectionChangeType
} from '../../../models';


@Component({
  selector: '[fs-list-row]',
  templateUrl: 'row.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FsRowComponent implements OnInit, DoCheck, OnDestroy {
  @HostBinding('attr.role') role = 'row';

  @Input() public row: any;
  @Input() public rowActionsRaw: any [] = [];
  @Input() public rowEvents = {};
  @Input() public rowClass;

  @Input() public rowIndex: number;
  @Input() public columns: Column[];
  @Input() public selection: Selection;
  @Input() public reorder = false;
  @Input() public restoreMode = false;

  @Input() public dragStart: any;
  @Input() public activeRow: TemplateRef<any>;

  @Input() public rowRemoved: EventEmitter<any>;

  // @Output() public startDragging = new EventEmitter();
  // @Output() public stopDragging = new EventEmitter();

  @ViewChildren('td') public cellRefs;

  public rowActions: RowAction[];
  public menuRowActions: RowAction[];
  public inlineRowActions: RowAction[];
  public restoreAction: RowAction;
  public selected = false;

  private _rowDiffer: KeyValueDiffer<{}, {}>;

  private _eventListeners = [];

  private _destroy$ = new Subject();

  constructor(public el: ElementRef,
              private _fsPrompt: FsPrompt,
              private _cdRef: ChangeDetectorRef,
              private _differs: KeyValueDiffers,
              private _renderer: Renderer2) {
    this._rowDiffer = _differs.find({}).create();
  }

  @HostBinding('class')
  get rowCssClass() {
    let cls = 'fs-list-row';

    if (this.rowIndex % 2 !== 0) cls += ' fs-list-row-odd';
    if (this.rowIndex % 2 === 0) cls += ' fs-list-row-even';

    if (this.rowClass) {
      const resultClass = this.rowClass(this.row);

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

    if (this.rowActionsRaw) {
      this.rowActions = this.rowActionsRaw.map((action) => new RowAction(action));

      this.menuRowActions = this.rowActions.filter((action) => action.menu && !action.restore);
      this.inlineRowActions = this.rowActions.filter((action) => !action.menu && !action.restore);
      this.restoreAction = this.rowActions.find((action) => action.restore);
    }
  }

  public ngDoCheck() {
    if (this._rowDiffer.diff(this.row)) {
      if (this.rowActions) {
        this.rowActions.forEach((action) => action.checkShowStatus(this.row));
      }

      this._cdRef.markForCheck();
    }
  }

  public ngOnDestroy() {
    this._eventListeners.forEach((listener) => { listener() });

    this._destroy$.next();
    this._destroy$.complete();
  }

  public actionClick(action: RowAction, row: any, event: any) {
    if (action.remove) {
      this._fsPrompt.confirm({
        title: action.remove.title,
        template: action.remove.template,
      }).pipe(
        take(1),
        takeUntil(this._destroy$),
      ).subscribe({
          next: () => {
            this.removeAction(action, row, event);
          }
        })
    } else {
      action.click(row, event);
    }
  }

  /**
   * Select row by checkbox
   * @param event
   */
  public selectRow(event: MatCheckboxChange) {
    this.selected = event.checked;

    this.selection.rowSelectionChange(this.row, event.checked);
    this._cdRef.markForCheck();
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

          if (!this.reorder) {
            this.rowEvents[event]({
              event: evt,
              row: this.row,
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
      this.selection.selectionChange$
        .pipe(
          // Would like to respond only when checkbox on top is changed
          // or was clicked "Select All" in selection dialog
          filter(({type}) => {
            return type === SelectionChangeType.visibleRowsSelectionChanged
              || type === SelectionChangeType.selectedAll;
          }),
        )
        .subscribe(({type: type, payload: status}) => {
          this.selected = status;

          this.selection.rowSelectionChange(this.row, this.selected);

          this._cdRef.markForCheck();
        });
    }
  }

  /**
   * Emit that some row must be removed
   * @param action
   * @param row
   * @param event
   */
  private removeAction(action, row, event) {
    const removeObservable = action.click(row, event);

    if (removeObservable && removeObservable instanceof Observable) {
      removeObservable
        .pipe(
          take(1),
          takeUntil(this._destroy$),
        )
        .subscribe(() => {
          this.rowRemoved.emit(row);
        });
    }
  }
}
