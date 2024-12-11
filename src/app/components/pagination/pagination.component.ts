import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';


import { PaginationController } from '../../classes/pagination-controller';

@Component({
  selector: 'fs-list-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
