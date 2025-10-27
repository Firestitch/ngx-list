import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  KeyValueDiffer,
  KeyValueDiffers,
} from '@angular/core';

import { FsCellComponent } from '../../body/row/cell/cell.component';
import { NgTemplateOutlet, AsyncPipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';


@Component({
    selector: '[fs-head-cell]',
    templateUrl: './head-cell.component.html',
    styleUrls: ['./head-cell.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
    NgTemplateOutlet,
    MatIcon,
    AsyncPipe
],
})
export class FsHeadCellComponent extends FsCellComponent implements DoCheck {

  public cellContext: any = {};

  private _columnDiffer: KeyValueDiffer<string, any>;

  constructor(
    private _cdRef: ChangeDetectorRef,
    private _differs: KeyValueDiffers,
  ) {
    super();
    this._columnDiffer = this._differs.find({}).create();
  }

  public ngDoCheck() {
    if (this._columnDiffer.diff(this.column)) {
      this._cdRef.markForCheck();
    }
  }

  public initCellContext() {
    this.cellContext.value = this.column.title;
  }
}
