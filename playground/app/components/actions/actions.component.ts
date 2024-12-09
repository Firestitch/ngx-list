import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';

import { FsApi } from '@firestitch/api';
import { ActionType, FsListComponent, FsListConfig } from '@firestitch/list';

import { map } from 'rxjs/operators';


@Component({
  selector: 'actions',
  templateUrl: './actions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionsComponent implements OnInit {

  @ViewChild('table')
  public table: FsListComponent;
  public config: FsListConfig;

  constructor(private _fsApi: FsApi) { }

  public ngOnInit() {

    this.config = {
      actions: [
        {
          click: () => {
            // this.table.enableOrder();
          },
          label: 'Kebab only button',
          menu: true,
        },
        {
          click: (event) => {
            console.log(event);
          },
          label: 'Basic Primary',
          menu: false,
          type: ActionType.Basic,
        },
        {
          click: (event) => {
            console.log(event);
          },
          label: 'Basic Secondary',
          menu: false,
          primary: false,
          type: ActionType.Basic,
        },
        {
          click: (event) => {
            console.log(event);
          },
          label: 'Primary Button',
          menu: false,
        },
        {
          click: (event) => {
            console.log(event);
          },
          icon: 'delete',
          primary: false,
          label: 'Secondary Button',
        },
        {
          click: (event) => {
            console.log(event);
          },
          className: 'mat-accent',
          icon: 'favorite',
          menu: false,
          type: ActionType.Icon,
        },
      ],
      fetch: (query) => {
        query.count = 3;
        query.limit = 3;

        return this._fsApi.get('dummy', query)
          .pipe(
            map((response) => ({ data: response.objects, paging: response.paging })),
          );
      },
      paging: false,
      status: false,
    };
  }
}
