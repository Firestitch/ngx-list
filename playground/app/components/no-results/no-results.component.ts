import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { FsListComponent, FsListConfig } from '../../../../src';


@Component({
  templateUrl: 'no-results.component.html',
  styles: []
})
export class NoResultsComponent implements OnInit {

  @ViewChild('table')
  public config: FsListConfig;

  constructor() {}

  public ngOnInit() {

    this.config = {
      filters: [
        {
          name: 'keyword',
          type: 'text',
          label: 'Search'
        }
      ],
      heading: 'No Results',
      fetch: (query) => {
        return Observable.create(observer => {
          observer.next({ data: [], paging: {} });
          observer.complete();
      });
      },
    };
  }
}
