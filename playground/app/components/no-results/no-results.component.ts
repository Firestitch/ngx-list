import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

import { FsListConfig } from '@firestitch/list';
import { ItemType } from '@firestitch/filter';


@Component({
  templateUrl: 'no-results.component.html',
  styles: []
})
export class NoResultsComponent implements OnInit {

  @ViewChild('table', { static: true })
  public config: FsListConfig;

  constructor() {}

  public ngOnInit() {

    this.config = {
      filters: [
        {
          name: 'keyword',
          type: ItemType.Text,
          label: 'Search'
        }
      ],
      heading: 'No Results',
      fetch: (query) => {
        return new Observable(observer => {
          observer.next({ data: [], paging: {} });
          observer.complete();
      });
      },
    };
  }
}
