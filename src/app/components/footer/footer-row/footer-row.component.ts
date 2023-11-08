import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  KeyValueDiffers,
  Renderer2,
} from '@angular/core';

import { ReorderPosition, ReorderStrategy } from '../../../classes/reorder-controller';
import { FsRowComponent } from '../../body/row/row.component';


@Component({
  selector: '[fs-list-footer-row]',
  templateUrl: './footer-row.component.html',
  styleUrls: ['./footer-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsFooterRowComponent extends FsRowComponent {

  @Input() public hasRowActions: boolean;
  @Input() public activeFiltersCount: number;
  @Input() public reorderEnabled: boolean;
  @Input() public reorderPosition: ReorderPosition | null;
  @Input() public reorderStrategy: ReorderStrategy | null;

  constructor(
    el: ElementRef,
    cdRef: ChangeDetectorRef,
    differs: KeyValueDiffers,
    renderer: Renderer2,
  ) {
    super(el, cdRef, differs, renderer, null);
  }

}
