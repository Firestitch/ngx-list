import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'fs-cell',
  templateUrl: 'cell.component.html'
})
export class FsCellComponent implements OnInit {
  @HostBinding('class.fs-list-col') isColl = true;

  @Input('name') public name;
  @HostBinding('attr.role') role = 'gridcell';

  constructor() {
  }

  public ngOnInit() {
  }
}
