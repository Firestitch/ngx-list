import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  KeyValueDiffer,
  KeyValueDiffers,
} from '@angular/core';
import { FsCellComponent } from '../../body/row/cell/cell.component';

@Component({
  selector: '[fs-head-cell]',
  templateUrl: 'head-cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FsHeadCellComponent extends FsCellComponent implements DoCheck {

  public cellContext: any = {};

  private _columnDiffer: KeyValueDiffer<string, any>;

  constructor(protected _cdRef: ChangeDetectorRef,
              private differs: KeyValueDiffers) {
    super(_cdRef);

    //this._cdRef.detach();
    this._columnDiffer = differs.find({}).create();
  }

  public ngDoCheck() {
    if (this._columnDiffer.diff(this.column)) {
      this._cdRef.detectChanges();
    }
  }

  public initCellContext() {
    this.cellContext.value = this.column.title;
  }
}
