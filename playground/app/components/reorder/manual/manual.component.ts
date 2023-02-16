import { Component, OnInit } from '@angular/core';

import { FsApi } from '@firestitch/api';
import { FsListConfig, ReorderPosition } from '@firestitch/list';

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
      status: false,
      filterInput: true,
      queryParam: false,
      persist: false,
      reorder: {
        position: ReorderPosition.Right,
        toggle: true,
        menu: false,
        start: () => {
          console.log('reorder start');
          return of(null).pipe(delay(1000));
        },
        moved: (data) => {
          console.log('reorder moved', data);
        },
        done: (data) => {
          console.log('reorder done', data);
          return of(null).pipe(delay(1000));
        }
      },
      fetch: query => {
        return this._fsApi.get('https://specify.dev.firestitch.com/api/dummy', query)
          .pipe(
            map(response => ({ data: response.data.objects, paging: response.data.paging })),
          );
      }
    };
  }
}
