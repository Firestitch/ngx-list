import { Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FsListConfig } from '../../models/list-config.model';
import { FsRowComponent } from '../row/row.component';

@Component({
  selector: 'fs-list-head',
  templateUrl: 'head.component.html'
})
export class FsHeadComponent implements OnInit {
  @Input() config: FsListConfig;

  @ViewChild('rowsContainer', { read: ViewContainerRef }) rowsContainer;

  private rowComponent = FsRowComponent;

  constructor() {

  }

  public ngOnInit() {
  }

}
