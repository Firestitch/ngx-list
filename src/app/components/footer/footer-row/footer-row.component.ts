import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ElementRef,
  KeyValueDiffers,
  Renderer2,
} from '@angular/core';
import { FsRowComponent } from '../../body';

@Component({
  selector: '[fs-list-footer-row]',
  templateUrl: 'footer-row.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FsFooterRowComponent extends FsRowComponent {
  @Input() hasRowActions: boolean;

  constructor(cdRef: ChangeDetectorRef,
              differs: KeyValueDiffers,
              el: ElementRef,
              renderer: Renderer2) {
    super(el, cdRef, differs, renderer);
  }
}
