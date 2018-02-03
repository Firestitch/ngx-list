import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FsCellComponent } from '../../../body';

@Component({
  selector: '[fs-list-footer-cell]',
  templateUrl: 'footer-cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FsFooterCellComponent extends FsCellComponent {

  constructor() {
    super()
  }
}
