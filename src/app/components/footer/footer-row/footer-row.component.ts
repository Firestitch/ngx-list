import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ElementRef,
  KeyValueDiffers,
  Renderer2,
} from '@angular/core';

import { FsRowComponent } from '../../body/row/row.component';
import { ReorderController, ReorderPosition } from '../../../classes/reorder-controller';


@Component({
  selector: '[fs-list-footer-row]',
  templateUrl: 'footer-row.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FsFooterRowComponent extends FsRowComponent {
  @Input() hasRowActions: boolean;

  public readonly ReorderPosition = ReorderPosition;

  constructor(
    el: ElementRef,
    reorderController: ReorderController,
    cdRef: ChangeDetectorRef,
    differs: KeyValueDiffers,
    renderer: Renderer2
  ) {
    super(el, reorderController, cdRef, differs, renderer, null);
  }
}
