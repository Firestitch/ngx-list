import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  KeyValueDiffers,
  Renderer2,
} from '@angular/core';

import { FsRowComponent } from '../../body/row/row.component';
import { NgIf, NgFor, NgClass } from '@angular/common';
import { FsFooterCellComponent } from './footer-cell/footer-cell.component';


@Component({
    selector: '[fs-list-footer-row]',
    templateUrl: './footer-row.component.html',
    styleUrls: ['./footer-row.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        NgIf,
        NgFor,
        FsFooterCellComponent,
        NgClass,
    ],
})
export class FsFooterRowComponent extends FsRowComponent {

  constructor(
    el: ElementRef,
    cdRef: ChangeDetectorRef,
    differs: KeyValueDiffers,
    renderer: Renderer2,
  ) {
    super(el, cdRef, differs, renderer, null);
  }

}
