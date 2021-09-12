import { Component, OnInit, ViewChild } from '@angular/core';
import { of } from 'rxjs';

import { FsListComponent, FsListConfig } from '@firestitch/list';
import { ItemType } from '@firestitch/filter';
import { delay, switchMap } from 'rxjs/operators';


@Component({
  selector: 'empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: [
    './empty-state.component.scss',
  ],
})
export class EmptyStateComponent implements OnInit {

  @ViewChild(FsListComponent)
  public listRef: FsListComponent;

  public config: FsListConfig;

  public tmpData = [
    {
      name: 'Row',
      guid: 'guid',
    },
  ];

  public state: 'empty' | 'data' = 'empty';
  public valid = true;

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
      emptyState: {
        validate: (query, rows) => {
          console.log('Query for validate: ', query);
          console.log('Rows for validate: ', rows);

          return this.valid;
        }
      },
      fetch: () => {
        return of(true)
        .pipe(
          switchMap(() => {
            if (this.state === 'empty') {
              return of({ data: [], paging: {} });
            }
            
            return of({ data: this.tmpData, paging: {} });
          }),
          delay(300),
        )  
      },
    };
  }


  public toggleEmptyDataStates() {
    if (this.state === 'empty') {
      this.state = 'data';
    } else {
      this.state = 'empty';
    }

    this.listRef.reload();
  }

  public toggleValidState() {
    this.valid = !this.valid;

    this.listRef.reload();
  }
}
