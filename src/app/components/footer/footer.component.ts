import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  IterableDiffers
} from '@angular/core';
import { FsBodyComponent } from '../body/body.component';

@Component({
  selector: '[fs-list-footer]',
  templateUrl: 'footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FsFooterComponent extends FsBodyComponent {

  constructor(
    cdRef: ChangeDetectorRef,
    differs: IterableDiffers,
  ) {
    super(cdRef, differs);
  }

}
