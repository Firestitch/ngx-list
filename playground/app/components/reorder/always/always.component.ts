import { Component, OnInit } from '@angular/core';

import { FsApi } from '@firestitch/api';
import { FsListConfig, ReorderPosition, ReorderStrategy } from '@firestitch/list';

import { map } from 'rxjs/operators';


@Component({
  selector: 'always-reorder',
  templateUrl: './always.component.html',
})
export class AlwaysReorderComponent implements OnInit {

  public config: FsListConfig = null;

  constructor(private _fsApi: FsApi) {}

  public ngOnInit() {
    this.config = {
      heading: 'Reorder',
      subheading: 'With Always strategy and positioned to left',
      status: false,
      filterInput: true,
      reorder: {
        position: ReorderPosition.Left,
        strategy: ReorderStrategy.Always,
        start: () => {
          console.log('reorder started');
        },
        moved: (data) => {
          console.log('reorder moved', data);
        },
        done: (data) => {
          console.log('reorder finished', data);
        }
      },
      fetch: query => {
        return this._fsApi.get('https://boilerplate.firestitch.com/api/dummy', query)
          .pipe(
            map(response => ({ data: response.data.objects, paging: response.data.paging }))
          );
      }
    };
  }
}
