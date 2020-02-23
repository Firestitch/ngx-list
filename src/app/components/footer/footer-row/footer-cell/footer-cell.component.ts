import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FsCellComponent } from '../../../body/row/cell/cell.component';


@Component({
  selector: '[fs-list-footer-cell]',
  templateUrl: 'footer-cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FsFooterCellComponent extends FsCellComponent {

  constructor(protected _cdRef: ChangeDetectorRef) {
    super(_cdRef);
    //this._cdRef.detach();
  }
}
