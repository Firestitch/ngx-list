import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FsCellComponent } from '../../../body/row/cell/cell.component';
import { NgTemplateOutlet } from '@angular/common';


@Component({
    selector: '[fs-list-footer-cell]',
    templateUrl: './footer-cell.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgTemplateOutlet],
})
export class FsFooterCellComponent extends FsCellComponent {

  constructor() {
    super();
  }
}
