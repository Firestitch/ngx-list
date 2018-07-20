import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FsApi } from '@firestitch/api';
import { FsListConfig } from '../../../../src';
import { FsListComponent } from '../../../../src/app/components/list';
import { ActionType } from '../../../../src/app/models';

import 'rxjs/add/operator/map';
import { ItemType } from '@firestitch/filter/models/fs-filter-item';


@Component({
  selector: 'infinity-scroll',
  templateUrl: 'infinity-scroll.component.html',
  styles: []
})
export class InfinityScrollComponent implements OnInit {

  @ViewChild('table')
  public table: FsListComponent; // Controller fs-list
  public config: FsListConfig;

  public avatars = [
    'http://api.randomuser.me/portraits/women/77.jpg',
    'http://api.randomuser.me/portraits/men/38.jpg',
    'http://api.randomuser.me/portraits/men/91.jpg',
    'http://api.randomuser.me/portraits/men/74.jpg',
    'http://api.randomuser.me/portraits/women/85.jpg',
  ];

  public roles = [
    {value: 'admin', viewValue: 'Admin'},
    {value: 'moderator', viewValue: 'Moderator'},
    {value: 'user', viewValue: 'User'}
  ];

  constructor(private _fsApi: FsApi, private _router: Router) {}

  public ngOnInit() {

    this.config = {
      heading: 'Infinity Scroll',
      paging: {
        limits: [30, 50, 150]
      },
      scrollable: {
        name: 'infinity-example',
        activationDown: 85,
        loaderDiametr: 25,

      },
      filters: [
        {
          name: 'keyword',
          type: 'text',
          label: 'Search'
        },
        {
          name: 'simple_select',
          type: 'select',
          label: 'Simple Select',
          values: () => {
            return [
              { name: 'All', value: '__all' },
              { name: 'Option 1', value: 1 },
              { name: 'Option 2', value: 2 },
              { name: 'Option 3', value: 3 }
            ];
          }
        },
        {
          name: 'range',
          type: ItemType.range,
          label: 'Range',
          placeholder: ['Min', 'Max']
        },
        {
          name: 'date',
          type: ItemType.date,
          label: 'Date'
        },
        {
          name: 'checkbox',
          type: ItemType.checkbox,
          label: 'Checkbox'
        },
        {
          name: 'state',
          type: ItemType.select,
          label: 'Status',
          multiple: true,
          values: [
            { name: 'Active', value: 'active' },
            { name: 'Pending', value: 'pending' },
            { name: 'Deleted', value: 'deleted' }
          ],
          isolate: { label: 'Show Deleted', value: 'deleted' }
        }
      ],
      rowActions: [
        {
          click: (row, event) => {
            console.log('Accept', row, event);
          },
          show: (row) => {
            return row.show;
          },
          menu: false,
          icon: 'done',
          className: 'mat-warn',
          type: ActionType.icon,
        },
        {
          click: (row, event) => {
            row.show = !row.show;
            console.log('Cancel', row, event);
          },
          icon: 'clear',
          label: 'Cancel',
          type: ActionType.raised,
        },
        {
          click: (row, event) => {
            console.log('edit', row, event);
          },
          show: (row) => {
            return row.show;
          },
          menu: true,
          icon: 'edit',
          label: 'Edit',
          type: ActionType.basic
        },
        {
          click: (row, event) => {
            console.log('delete', row, event);
          },
          menu: true,
          icon: 'delete',
          label: 'Remove'
        }
      ],
      fetch: (query) => {
        query.count = 120;
        return this._fsApi.get('https://boilerplate.firestitch.com/api/dummy', query)
          .map(response => {
            response.data.objects.forEach((obj) => {
              obj.avatar = this.avatars[this.randomInteger(0, 4)]
            });

            console.log(response.data.objects);

            return { data: response.data.objects, paging: response.data.paging };
          });
      },
    };
  }

  public onClick(row, event) {
    console.log(row, event);
  }

  private randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
  }
}
