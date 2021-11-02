import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FsCellComponent } from '../../../body/row/cell/cell.component';
import { Row } from '../../../../models/row';


@Component({
  selector: '[fs-list-footer-cell]',
  templateUrl: 'footer-cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FsFooterCellComponent extends FsCellComponent {

  @Input()
  public rows: Row[];

  constructor() {
    super()
  }

  protected _initCellContext() {
    this.cellContext.column = this.column;

    this.cellContext.$implicit = this.rows
      .map((row) => row.data);
  }
}
