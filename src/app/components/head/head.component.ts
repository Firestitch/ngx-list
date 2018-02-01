import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Sorting } from '../../models/sorting.model';
import { Column } from '../../index';

@Component({
  selector: '[fs-list-head]',
  templateUrl: 'head.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FsHeadComponent implements OnInit {
  @Input() sorting: Sorting;
  @Input() columns: Column[];

  @ViewChild('rowsContainer', { read: ViewContainerRef }) rowsContainer;

  constructor(private cdRef: ChangeDetectorRef) {
  }

  public ngOnInit() {
    this.sorting.sortingChanged.subscribe(() => {
      this.cdRef.markForCheck();
    })
  }
}
