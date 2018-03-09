import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, DoCheck, ElementRef, EventEmitter,
  HostBinding, HostListener,
  Input,
  KeyValueDiffer,
  KeyValueDiffers, Output,
} from '@angular/core';
import { Column } from '../../../models/column.model';

@Component({
  selector: '[fs-list-row]',
  templateUrl: 'row.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FsRowComponent implements DoCheck {
  @HostBinding('class.fs-list-row') t = true;
  @HostBinding('attr.role') role = 'row';

  @Input() public row: any;
  @Input() public rowActions = [];

  @Input() public rowIndex: number;
  @Input() public columns: Column[];

  @Output() public startDragging = new EventEmitter();
  @Output() public stopDragging = new EventEmitter();

  public mousedow(event) {
    this.startDragging.emit({event: event, target: this.el.nativeElement})
  }

  private _rowDiffer: KeyValueDiffer<{}, {}>;

  constructor(private el: ElementRef,
              private cdRef: ChangeDetectorRef,
              private differs: KeyValueDiffers) {
    this._rowDiffer = differs.find({}).create();
  }

  public ngDoCheck() {
    if (this._rowDiffer.diff(this.row)) {
      this.cdRef.markForCheck();
    }
  }
}
