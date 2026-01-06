import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { MatIconAnchor } from '@angular/material/button';


import { Row } from '../../../../../models/row';
import { RowAction } from '../../../../../models/row-action.model';
import { FsRowInlineButtonContentComponent } from '../button-content/button-content.component';


@Component({
  selector: 'fs-list-row-inline-icon-link',
  templateUrl: './icon-link.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    RouterLink,
    MatIconAnchor,
    FsRowInlineButtonContentComponent,
  ],
})
export class FsRowInlineIconLinkComponent {

  @Input()
  public rowAction: RowAction;

  @Input()
  public row: Row;

}

