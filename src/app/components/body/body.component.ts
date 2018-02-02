import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  ViewChild,
  ViewContainerRef, DoCheck, IterableDiffer, IterableDiffers
} from '@angular/core';
import { Column } from '../../models/column.model';

@Component({
  selector: '[fs-list-body]',
  templateUrl: 'body.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FsBodyComponent implements DoCheck {
  @Input() rows;
  @Input() columns: Column[] = [];
  @Input() hasFooter = false;

  @ViewChild('rowsContainer', { read: ViewContainerRef }) rowsContainer;

  private _rowsDiffer: IterableDiffer<any[]>;

  constructor(
    private cdRef: ChangeDetectorRef,
    private differs: IterableDiffers,
  ) {
    this._rowsDiffer = differs.find([]).create(null);
  }

  public ngDoCheck() {
    if (this._rowsDiffer.diff(this.rows)) {
      this.cdRef.markForCheck();
    }
  }

}
