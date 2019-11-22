import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  IterableDiffers,
  Component,
  DoCheck,
  Input,
  OnInit, IterableDiffer
} from '@angular/core';

import { PaginationController } from '../../classes/pagination-controller';

@Component({
  selector: 'fs-list-pagination',
  templateUrl: 'pagination.component.html',
  styleUrls: [
    './pagination.component.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FsPaginationComponent implements OnInit, DoCheck {
  @Input() pagination: PaginationController;
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
