import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FsRowComponent } from '../../body/row/row.component';

import { FsFooterCellComponent } from './footer-cell/footer-cell.component';


@Component({
  selector: '[fs-list-footer-row]',
  templateUrl: './footer-row.component.html',
  styleUrls: ['./footer-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FsFooterCellComponent,
    NgClass,
  ],
})
export class FsFooterRowComponent extends FsRowComponent {

}
