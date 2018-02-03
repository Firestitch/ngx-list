import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  KeyValueDiffer,
  KeyValueDiffers,
} from '@angular/core';
import { FsCellComponent } from '../../body/row/cell/cell.component';
import { Column } from '../../../models/column.model';

@Component({
  selector: '[fs-head-cell]',
  templateUrl: 'head-cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FsHeadCellComponent extends FsCellComponent implements DoCheck {

  public cellContext: any = {};

  private _columnDiffer: KeyValueDiffer<string, any>;

  constructor(private cdRef: ChangeDetectorRef,
              private differs: KeyValueDiffers) {
    super();
    this._columnDiffer = differs.find({}).create();
  }

  public ngDoCheck() {
    if (this._columnDiffer.diff(this.column)) {
      this.cdRef.markForCheck();
    }
  }

  public initCellContext() {
    this.cellContext.value = this.column.title;
  }
}
