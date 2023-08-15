import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ElementRef,
  Renderer2, KeyValueDiffers,
} from '@angular/core';

import { FsRowComponent } from '../../body/row/row.component';
import { ReorderPosition, ReorderStrategy } from '../../../classes/reorder-controller';


@Component({
  selector: '[fs-list-footer-row]',
  templateUrl: 'footer-row.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FsFooterRowComponent extends FsRowComponent {
  @Input() hasRowActions: boolean;
  @Input() activeFiltersCount: number;
  @Input() reorderEnabled: boolean;
  @Input() reorderPosition: ReorderPosition | null;
  @Input() reorderStrategy: ReorderStrategy | null;

  constructor(
    el: ElementRef,
    cdRef: ChangeDetectorRef,
    differs: KeyValueDiffers,
    renderer: Renderer2
  ) {
    super(el, cdRef, differs, renderer, null);
  }

}
