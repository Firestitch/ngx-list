import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  IterableDiffers,
  Component,
  DoCheck,
  Input,
  OnInit, IterableDiffer
} from '@angular/core';

import { Pagination } from '../../models/pagination.model';

@Component({
  selector: 'fs-list-pagination',
  templateUrl: 'pagination.component.html',
  styleUrls: [
    './pagination.component.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FsPaginationComponent implements OnInit, DoCheck {
  @Input() pagination: Pagination;
  @Input() rows;

  private differ: IterableDiffer<any>;

  constructor(
    private differs: IterableDiffers,
    private cdRef: ChangeDetectorRef,
  ) {
    this.differ = this.differs.find([]).create(null);
  }

  public ngOnInit() {
  }

  public ngDoCheck() {
    if (this.differ.diff(this.pagination.pagesArray)) {
      this.cdRef.markForCheck();
    }
  }
}
