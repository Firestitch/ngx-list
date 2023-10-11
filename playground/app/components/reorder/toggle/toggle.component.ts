import { Component, OnInit } from '@angular/core';

import { FsApi } from '@firestitch/api';
import { FsListConfig, ReorderPosition } from '@firestitch/list';

import { map } from 'rxjs/operators';


@Component({
  selector: 'toggle-reorder',
  templateUrl: './toggle.component.html',
})
export class ToggleReorderComponent implements OnInit {

  public config: FsListConfig = null;

  constructor(private _fsApi: FsApi) { }

  public ngOnInit() {
    this.config = {
      heading: 'Reorder',
      subheading: 'With Always strategy and positioned to left',
      status: false,
      filterInput: true,
      queryParam: false,
      persist: false,
      reorder: {
        position: ReorderPosition.Left,
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
        return this._fsApi.get('https://specify.dev.firestitch.com/api/dummy', query)
          .pipe(
            map(response => ({ data: response.objects, paging: response.paging }))
          );
      }
    };
  }
}
