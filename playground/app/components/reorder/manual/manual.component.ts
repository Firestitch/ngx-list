import { Component, OnInit } from '@angular/core';

import { FsApi } from '@firestitch/api';
import { FsListConfig, ReorderPosition, ReorderStrategy } from '@firestitch/list';

import { delay, map } from 'rxjs/operators';
import { of } from 'rxjs';


@Component({
  selector: 'manual-reorder',
  templateUrl: './manual.component.html',
})
export class ManualReorderComponent implements OnInit {

  public config: FsListConfig = null;

  constructor(private _fsApi: FsApi) {}

  public ngOnInit() {
    this.config = {
      heading: 'Reorder',
      subheading: 'With Manual strategy and positioned to right',
      status: false,
      filterInput: true,
      reorder: {
        position: ReorderPosition.Right,
        strategy: ReorderStrategy.Manual,
        menu: false,
        start: () => {
          console.log('reorder started');
          return of(null).pipe(delay(5000));
        },
        moved: (data) => {
          console.log('reorder moved', data);
        },
        done: (data) => {
          console.log('reorder finished', data);
          return of(null).pipe(delay(5000));
        }
      },
      fetch: query => {
        return this._fsApi.get('https://boilerplate.firestitch.com/api/dummy', query)
          .pipe(
            map(response => ({ data: response.data.objects, paging: response.data.paging })),
          );
      }
    };
  }
}
