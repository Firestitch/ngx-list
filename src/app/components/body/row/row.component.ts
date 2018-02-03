import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, DoCheck,
  HostBinding,
  Input,
  KeyValueDiffer,
  KeyValueDiffers,
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

  @Input() rowIndex: number;
  @Input() columns: Column[];

  private _rowDiffer: KeyValueDiffer<{}, {}>;

  constructor(private cdRef: ChangeDetectorRef,
              private differs: KeyValueDiffers) {
    this._rowDiffer = differs.find({}).create();
  }

  public ngDoCheck() {
    if (this._rowDiffer.diff(this.row)) {
      this.cdRef.markForCheck();
    }
  }
}
