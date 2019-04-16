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
  subYears
} from 'date-fns';

@Component({
  selector: 'ago',
  templateUrl: 'ago.component.html',
  styles: []
})
export class AgoComponent implements OnInit {

  @ViewChild('table')
  public table: FsListComponent; // Controller fs-list
  public config: FsListConfig;

  public date = new Date();
  public dataArray = [
    {
      name: '1 year ago',
      time: subYears(this.date, 1)
    },
    {
      name: '1 month ago',
      time: subMonths(this.date, 1)
    },
    {
      name: '1 hour ago',
      time: subHours(this.date, 1)
    },
    {
      name: '1 day ago',
      time: subDays(this.date, 1)
    },
    {
      name: '1 minute ago',
      time: subMinutes(this.date, 1)
    },
    {
      name: 'Now',
      time: this.date
    },
    {
      name: '1 month from now',
      time: addMonths(this.date, 1)
    },
    {
      name: '1 year from now',
      time: addYears(this.date, 1)
    }
  ];

  constructor() {}

  public ngOnInit() {

    this.config = {
      heading: 'Ago',
      status: false,
      filterInput: false,
      paging: false,
      filters: [],
      fetch: () => {
        return of({ data: this.dataArray })
      },
    };
  }

  public onClick(row, event) {
    console.log(row, event);
  }
}
