import { Component, OnInit, ViewChild } from '@angular/core';
import { FsApi } from '@firestitch/api';
import { ActionType, FsListComponent, FsListConfig } from '../../../../src';
import 'rxjs/add/operator/map';

@Component({
  selector: 'actions',
  templateUrl: 'actions.component.html',
  styles: []
})
export class ActionsComponent implements OnInit {

  @ViewChild('table')
  public table: FsListComponent;
  public config: FsListConfig;

  constructor(private _fsApi: FsApi) {}

  public ngOnInit() {

    this.config = {
      actions: [
        {
          click: (event) => {
            // this.table.enableOrder();
          },
          label: 'Kebab only button',
          menu: true
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
          menu: false
        },
        {
          click: (event) => {
            console.log(event);
          },
          icon: 'delete',
          primary: false,
          label: 'Secondary Button'
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
        return this._fsApi.get('https://boilerplate.firestitch.com/api/dummy', query)
          .map(response => ({ data: response.data.objects, paging: response.data.paging }));
      },
      paging: false,
      status: false
    };
  }
}
