import { Component, OnInit, ViewChild } from '@angular/core';
import { of } from 'rxjs';

import { FsListComponent, FsListConfig } from '@firestitch/list';
import { ItemType } from '@firestitch/filter';
import { delay, switchMap } from 'rxjs/operators';
import { NgIf, JsonPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { FsListComponent as FsListComponent_1 } from '../../../../src/app/components/list/list.component';
import { FsListColumnDirective } from '../../../../src/app/directives/column/column.directive';
import { FsListHeaderDirective } from '../../../../src/app/directives/header/header.directive';
import { FsListCellDirective } from '../../../../src/app/directives/cell/cell.directive';
import { FsListContentDirective } from '../../../../src/app/directives/content/content.directive';
import { FsListEmptyStateDirective } from '../../../../src/app/directives/empty-state/empty-state.directive';


@Component({
    selector: 'empty-state',
    templateUrl: './empty-state.component.html',
    styleUrls: [
        './empty-state.component.scss',
    ],
    standalone: true,
    imports: [
        NgIf,
        MatButton,
        FsListComponent_1,
        FsListColumnDirective,
        FsListHeaderDirective,
        FsListCellDirective,
        FsListContentDirective,
        FsListEmptyStateDirective,
        JsonPipe,
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
