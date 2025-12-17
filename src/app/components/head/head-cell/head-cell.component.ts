import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { MatIcon } from '@angular/material/icon';

import { FsCellComponent } from '../../body/row/cell/cell.component';


@Component({
  selector: '[fs-head-cell]',
  templateUrl: './head-cell.component.html',
  styleUrls: ['./head-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgTemplateOutlet,
    MatIcon,
    AsyncPipe,
  ],
})
export class FsHeadCellComponent extends FsCellComponent {

  public cellContext: any = {};

  public initCellContext() {
    this.cellContext.value = this.column.title;
  }
}
