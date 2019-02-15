import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ElementRef,
  KeyValueDiffers,
  Renderer2,
} from '@angular/core';

import { FsPrompt } from '@firestitch/prompt';
import { FsRowComponent } from '../../body/row/row.component';


@Component({
  selector: '[fs-list-footer-row]',
  templateUrl: 'footer-row.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FsFooterRowComponent extends FsRowComponent {
  @Input() hasRowActions: boolean;

  constructor(cdRef: ChangeDetectorRef,
              fsPrompt: FsPrompt,
              differs: KeyValueDiffers,
              el: ElementRef,
              renderer: Renderer2) {
    super(el, fsPrompt, cdRef, differs, renderer);
  }
}
