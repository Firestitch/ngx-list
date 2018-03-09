import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, ElementRef,
  Input,
  IterableDiffers, NgZone
} from '@angular/core';
import { FsBodyComponent } from '../body/body.component';

@Component({
  selector: '[fs-list-footer]',
  templateUrl: 'footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FsFooterComponent extends FsBodyComponent {

  @Input() hasRowActions: boolean;

  constructor(
    el: ElementRef,
    cdRef: ChangeDetectorRef,
    differs: IterableDiffers,
    zone: NgZone,
  ) {
    super(el, cdRef, differs, zone);
  }

}
