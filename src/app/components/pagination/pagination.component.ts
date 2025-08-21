import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';


import { PaginationController } from '../../classes/pagination-controller';
import { NgTemplateOutlet, NgIf } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatRipple } from '@angular/material/core';
import { MatIcon } from '@angular/material/icon';
import { FsCommonModule } from '@firestitch/common';

@Component({
    selector: 'fs-list-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        NgTemplateOutlet,
        MatButton,
        NgIf,
        MatRipple,
        MatIcon,
        FsCommonModule,
    ],
})
export class FsPaginationComponent {

  @Input() public pagination: PaginationController;
  @Input() public rows;

  public first() {
    this.pagination.goFirst();
  }

  public prev() {
    this.pagination.goPrev();
  }

  public next() {
    this.pagination.goNext();
  }

  public last() {
    this.pagination.goLast();
  }
}
