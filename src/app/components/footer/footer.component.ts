import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  IterableDiffers
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
    cdRef: ChangeDetectorRef,
    differs: IterableDiffers,
  ) {
    super(cdRef, differs);
  }

}
