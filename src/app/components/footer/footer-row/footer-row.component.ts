import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, Input,
  KeyValueDiffers,
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
              differs: KeyValueDiffers) {
    super(cdRef, differs);
  }
}
