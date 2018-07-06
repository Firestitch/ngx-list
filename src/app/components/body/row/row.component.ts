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
  Output,
  ViewChildren,
} from '@angular/core';

import { Column, RowAction } from '../../../models';


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
  @Input() rowClass;

  @Input() public rowIndex: number;
  @Input() public columns: Column[];
  @Input() public reorder = false;

  @Output() public startDragging = new EventEmitter();
  @Output() public stopDragging = new EventEmitter();

  @ViewChildren('td') public cellRefs;

  public rowActions: RowAction[];
  public menuRowActions: RowAction[];
  public inlineRowActions: RowAction[];

  private _rowDiffer: KeyValueDiffer<{}, {}>;

  private _eventListeners = [];

  constructor(public el: ElementRef,
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

    if (this.rowActionsRaw) {
      this.rowActions = this.rowActionsRaw.map((action) => new RowAction(action));

      this.menuRowActions = this.rowActions.filter((action) => action.menu);
      this.inlineRowActions = this.rowActions.filter((action) => !action.menu);
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
    this._eventListeners.forEach((listener) => { listener() })
  }

  public mousedow(event) {
    if (this.reorder) {
      this.startDragging.emit({event: event, target: this.el.nativeElement})
    }
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
}
