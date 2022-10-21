import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';

import { FsListConfig } from '@firestitch/list';
import { ItemType } from '@firestitch/filter';
import { delay } from 'rxjs/operators';


@Component({
  selector: 'no-results',
  templateUrl: './no-results.component.html',
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
          type: ItemType.Keyword,
          label: 'Search'
        }
      ],
      heading: 'No Results',
      fetch: () => {
        return of({ data: [], paging: { records: 10 } })
          .pipe(
            delay(300),
          )        
      },
    };
  }
}
