import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  KeyValueDiffers,
} from '@angular/core';
import { FsRowComponent } from '../../body';

@Component({
  selector: '[fs-list-footer-row]',
  templateUrl: 'footer-row.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FsFooterRowComponent extends FsRowComponent {

  constructor(cdRef: ChangeDetectorRef,
              differs: KeyValueDiffers) {
    super(cdRef, differs);
  }
}
