import { Component, OnInit } from '@angular/core';
import { FsApi } from '@firestitch/api';

import { FsListConfig, ReorderPosition, ReorderStrategy } from '../../../../../src';

import 'rxjs/add/operator/map';


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
        start: () => {
          console.log('reorder started');
        },
        done: (data) => {
          console.log('reorder finished', data);
        }
      },
      fetch: query => {
        return this._fsApi.get('https://boilerplate.firestitch.com/api/dummy', query)
          .map(response => ({ data: response.data.objects, paging: response.data.paging }));
      }
    };
  }
}
