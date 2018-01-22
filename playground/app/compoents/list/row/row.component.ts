import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FsRowComponent } from '../../../../../src/app/components/row/row.component';

@Component({
  selector: 'fs-row',
  templateUrl: 'row.component.html'
})
export class RowComponent extends FsRowComponent implements OnInit {

  constructor(private router: Router) {
    super();
  }

  public ngOnInit() {
  }

  public onClick(event, row) {
    console.log(event, row);
  }

  public proceed(link) {
    this.router.navigateByUrl(link);
  }
}
