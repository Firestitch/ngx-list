import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { FsApi } from '@firestitch/api';
import { ItemType } from '@firestitch/filter';
import { FsListConfig, ReorderPosition } from '@firestitch/list';

import { map } from 'rxjs/operators';


@Component({
  selector: 'toggle-reorder',
  templateUrl: './toggle.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleReorderComponent implements OnInit {

  public config: FsListConfig = null;

  constructor(private _fsApi: FsApi) { }

  public ngOnInit() {
    this.config = {
      heading: 'Reorder',
      subheading: 'With Always strategy and positioned to left',
      status: false,
      queryParam: false,
      rowEvents: {
        click: () => {
          console.log('click'); 
        },
      },
      filters: [
        {
          name: 'keyword',
          type: ItemType.Keyword,
          label: 'Search',
          hide: true,
        },
      ],
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
        },
      },
      fetch: (query) => {
        return this._fsApi.get('dummy', query)
          .pipe(
            map((response) => ({ data: response.objects, paging: response.paging })),
          );
      },
    };
  }
}
