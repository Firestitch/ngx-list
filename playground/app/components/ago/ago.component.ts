import { Component, OnInit, ViewChild } from '@angular/core';

import { FsListComponent, FsListConfig } from '@firestitch/list';

import { of } from 'rxjs';

import {
  addMonths,
  addYears,
  subDays,
  subHours,
  subMinutes,
  subMonths,
  subYears,
} from 'date-fns';
import { FsListComponent as FsListComponent_1 } from '../../../../src/app/components/list/list.component';
import { FsListColumnDirective } from '../../../../src/app/directives/column/column.directive';
import { FsListCellDirective } from '../../../../src/app/directives/cell/cell.directive';
import { FsDateModule } from '@firestitch/date';

@Component({
    selector: 'ago',
    templateUrl: 'ago.component.html',
    styles: [],
    standalone: true,
    imports: [
        FsListComponent_1,
        FsListColumnDirective,
        FsListCellDirective,
        FsDateModule,
    ],
})
export class AgoComponent implements OnInit {

  @ViewChild('table')
  public table: FsListComponent; // Controller fs-list
  public config: FsListConfig;

  public date = new Date();
  public dataArray = [
    {
      name: '1 year ago',
      time: subYears(this.date, 1),
    },
    {
      name: '1 month ago',
      time: subMonths(this.date, 1),
    },
    {
      name: '1 hour ago',
      time: subHours(this.date, 1),
    },
    {
      name: '1 day ago',
      time: subDays(this.date, 1),
    },
    {
      name: '1 minute ago',
      time: subMinutes(this.date, 1),
    },
    {
      name: 'Now',
      time: this.date,
    },
    {
      name: '1 month from now',
      time: addMonths(this.date, 1),
    },
    {
      name: '1 year from now',
      time: addYears(this.date, 1),
    },
  ];

  constructor() {}

  public ngOnInit() {

    this.config = {
      heading: 'Ago',
      status: false,
      paging: false,
      filters: [],
      fetch: () => {
        return of({ data: this.dataArray });
      },
    };
  }

  public onClick(row, event) {
    console.log(row, event);
  }
}
