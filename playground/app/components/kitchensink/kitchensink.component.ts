import { Component, OnInit, ViewChild, AfterContentInit } from '@angular/core';
import { FsApi } from '@firestitch/api';
import { ItemType } from '@firestitch/filter';
import {
  ActionType,
  FsListConfig,
  PaginationStrategy,
  FsListComponent,
  FsListAbstractRow
} from '@firestitch/list';
import { nameValue } from '@firestitch/common';

import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { StrategyBaseComponent } from '../examples/strategy-base/strategy-base.component';
import { ApiStrategy } from '../../services/api-strategy.service';
import { FsExampleComponent } from '@firestitch/example';
import { ConfigureComponent } from '../configure';
import { cloneDeep } from 'lodash-es';


@Component({
  selector: 'kitchensink',
  templateUrl: 'kitchensink.component.html',
  styles: []
})
export class KitchenSinkComponent extends StrategyBaseComponent implements OnInit, AfterContentInit {

  @ViewChild('list')
  public list: FsListComponent; // Controller fs-list
  public config: FsListConfig;

  public weekdays = [
    { id: 1, name: 'Monday' },
    { id: 2, name: 'Tuesday' },
    { id: 3, name: 'Wednesday' },
    { id: 4, name: 'Thursday' },
    { id: 5, name: 'Friday' },
    { id: 6, name: 'Saturday' },
    { id: 7, name: 'Sunday' },
  ];

  constructor(
    protected _apiStrategy: ApiStrategy,
    private _fsApi: FsApi,
    private example: FsExampleComponent) {
    super(_apiStrategy);

  }

  public ngOnInit() {

    this.config = {
      heading: 'Kitchen Sink',
      subheading: 'Subheading',
      status: true,
      chips: true,
      filterInput: true,
      queryParam: true,
      paging: {
        limits: [5, 15, 50, 150, 250, 500, 1000],
        strategy: PaginationStrategy.Page,
      },
      filters: [
        {
          name: 'keyword',
          type: ItemType.Text,
          label: 'Search'
        },
        {
          name: 'simple_select',
          type: ItemType.Select,
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
          type: ItemType.Range,
          label: 'Range',
          placeholder: ['Min', 'Max']
        },
        {
          name: 'date',
          type: ItemType.Date,
          label: 'Date'
        },
        {
          name: 'checkbox',
          type: ItemType.Checkbox,
          label: 'Checkbox'
        },
        {
          name: 'days_chips',
          label: 'Weekdays',
          type: ItemType.Chips,
          multiple: true,
          values: (keyword) => {
            return new BehaviorSubject(this.weekdays)
              .pipe(
                map((weekdays) => nameValue(weekdays, 'name', 'id')),
              )
          }
        },
        {
          name: 'state',
          type: ItemType.Select,
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
      reorder: {
        start: () => {
          console.log('reorder started');
        },
        done: (data) => {
          console.log(data);
        }
      },
      actions: [
        {
          click: (event) => {
            // this.list.enableOrder();
          },
          label: 'Kebab only button',
          menu: true
        },
        {
          click: (event) => {
            console.log(event);
          },
          label: 'Primary Button'
        },
        {
          click: (event) => {
            console.log(event);
          },
          icon: 'delete',
          primary: false,
          label: 'Secondary Button'
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
          type: ActionType.Icon,
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
          type: ActionType.Basic
        },
        {
          click: (row, event) => {
            console.log('delete', row, event);
            this.list.removeData(
              (listRow: FsListAbstractRow) => {
                return listRow.name === row.name;
              }
            );
          },
          menu: true,
          remove: {
            title: 'Confirm',
            template: 'Are you sure you would like to delete this record?',
          },
          icon: 'delete',
          label: 'Remove'
        }
      ],
      rowClass: (row) => {
        return 'custom-row-class';
      },
      rowEvents:
      {
        mouseover: (event) => {
          // console.log('over', event);
        },
        click: (event) => {
          console.log('row click', event);
        }
      },
      header: {
        className: 'header-test-defaults-class',
        align: 'left'
      },
      cell: {
        className: 'cell-test-defaults-class',
        align: 'left'
      },
      fetch: (query) => {
        query.count = 500;
        return this._fsApi.get('https://boilerplate.firestitch.com/api/dummy', query)
          .pipe(
            map(response => ({ data: response.data.objects, paging: response.data.paging })),
          );
      },
    };
  }

  ngAfterContentInit() {
    this.example.setConfigureComponent(ConfigureComponent, {
      config: this.config,
      list: this.list,
      defaultConfig: cloneDeep(this.config)
    });
  }

  public onClick(row, event) {
    console.log(row, event);
  }
}
