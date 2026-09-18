import { Component, OnInit, ViewChild } from '@angular/core';

import { ItemType } from '@firestitch/filter';
import { FsListComponent, FsListConfig } from '@firestitch/list';

import { of, throwError } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';

import { FsListComponent as FsListComponent_1 } from '../../../../src/app/components/list/list.component';
import { FsListCellDirective } from '../../../../src/app/directives/cell/cell.directive';
import { FsListColumnDirective } from '../../../../src/app/directives/column/column.directive';


@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: [
    './error.component.scss',
  ],
  standalone: true,
  imports: [
    FsListComponent_1,
    FsListColumnDirective,
    FsListCellDirective,
  ],
})
export class ErrorComponent implements OnInit {

  @ViewChild(FsListComponent)
  public listRef: FsListComponent;

  public config: FsListConfig;

  /** Flipped by the toggle to make the next fetch fail, standing in for a broken API. */
  public failing = true;

  public ngOnInit(): void {
    this.config = {
      filters: [
        {
          name: 'keyword',
          type: ItemType.Keyword,
          label: 'Search',
        },
      ],
      heading: 'Error',
      error: {
        message: 'There was a problem loading the list',
      },
      // `label` is a static string, so the toggle is two actions that swap on `show()`.
      actions: [
        {
          label: 'Reload With Error',
          show: () => !this.failing,
          click: () => this.toggleFailing(),
        },
        {
          label: 'Reload Successfully',
          show: () => this.failing,
          click: () => this.toggleFailing(),
        },
      ],
      fetch: () => {
        return of(true)
          .pipe(
            delay(300),
            switchMap(() => {
              if (this.failing) {
                return throwError(() => new Error('Fetch failed'));
              }

              return of({
                data: [
                  { name: 'Row one', guid: 'aaa-111' },
                  { name: 'Row two', guid: 'bbb-222' },
                ],
                paging: { records: 2 },
              });
            }),
          );
      },
    };
  }

  public toggleFailing(): void {
    this.failing = !this.failing;

    this.listRef.reload();
  }
}
