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
} from '@angular/core';

import { Column } from '../../../models';

@Component({
  selector: '[fs-list-row]',
  templateUrl: 'row.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FsRowComponent implements OnInit, DoCheck, OnDestroy {
  @HostBinding('class.fs-list-row') t = true;
  @HostBinding('attr.role') role = 'row';

  @Input() public row: any;
  @Input() public rowActions = [];
  @Input() public rowEvents = {};

  @Input() public rowIndex: number;
  @Input() public columns: Column[];
  @Input() public reorder = false;

  @Output() public startDragging = new EventEmitter();
  @Output() public stopDragging = new EventEmitter();

  private _rowDiffer: KeyValueDiffer<{}, {}>;

  private _eventListeners = [];

  constructor(private _el: ElementRef,
              private _cdRef: ChangeDetectorRef,
              private _differs: KeyValueDiffers,
              private _renderer: Renderer2) {
    this._rowDiffer = _differs.find({}).create();
  }

  public ngOnInit() {
    this.initRowEvents();
  }

  public ngDoCheck() {
    if (this._rowDiffer.diff(this.row)) {
      this._cdRef.markForCheck();
    }
  }

  public ngOnDestroy() {
    this._eventListeners.forEach((listener) => { listener() })
  }

  public mousedow(event) {
    if (this.reorder) {
      this.startDragging.emit({event: event, target: this._el.nativeElement})
    }
  }

  /**
   * Set event listeners for row
   */
  private initRowEvents() {
    for (const event in this.rowEvents) {
      if (this.rowEvents.hasOwnProperty(event)) {
        const listener = this._renderer.listen(this._el.nativeElement, event, (evt) => {
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
