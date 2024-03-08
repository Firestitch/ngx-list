import { Component, OnInit } from '@angular/core';

import { FsApi } from '@firestitch/api';
import { FsListConfig, ReorderPosition } from '@firestitch/list';

import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';


@Component({
  selector: 'manual-reorder',
  templateUrl: './manual.component.html',
})
export class ManualReorderComponent implements OnInit {

  public config: FsListConfig = null;

  constructor(private _fsApi: FsApi) { }

  public ngOnInit() {
    this.config = {
      status: true,
      persist: false,
      reorder: {
        position: ReorderPosition.Right,
        toggle: true,
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
      fetch: (query) => {
        return this._fsApi.get('https://specify.firestitch.dev/api/dummy', query)
          .pipe(
            map((response) => ({ data: response.objects, paging: response.paging })),
          );
      }
    };
  }
}
