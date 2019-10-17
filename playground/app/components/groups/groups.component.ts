import { Component, OnInit, ViewChild, AfterContentInit } from '@angular/core';
import { FsApi } from '@firestitch/api';
import { ItemDateMode, ItemType } from '@firestitch/filter';
import {
  FsListConfig,
  PaginationStrategy,
  FsListComponent,
  FsListAbstractRow
} from '@firestitch/list';
import { nameValue } from '@firestitch/common';

import { BehaviorSubject, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { StrategyBaseComponent } from '../examples/strategy-base/strategy-base.component';
import { ApiStrategy } from '../../services/api-strategy.service';
import { FsExampleComponent } from '@firestitch/example';
import { ConfigureComponent } from '../configure';
import { cloneDeep } from 'lodash-es';


@Component({
  selector: 'groups',
  templateUrl: 'groups.component.html',
  styles: []
})
export class GroupsComponent extends StrategyBaseComponent implements OnInit, AfterContentInit {

  @ViewChild('list', { static: true })
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
      heading: 'Groups',
      status: true,
      filterInput: true,
      paging: {
        limits: [20, 40, 60],
        strategy: PaginationStrategy.Page,
      },
      group: {
        groupBy: (row) => {
          return row['some'];
        },
        compareBy: (group) => {
          return group.name;
        }
      },
      sort: 'guid,desc',
      filters: [
        {
          name: 'keyword',
          type: ItemType.Text,
          label: 'Search'
        }
      ],
      rowActions: [
        {
          click: (row, event) => {

          },
          menu: true,
          label: 'Go to Project'
        },
        {
          label: 'Group 1',
          rowActions: [
            {
              click: (row, event) => {

              },
              menu: true,
              icon: 'edit',
              label: 'Edit'
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
            },
          ]
        },
        {
          label: 'View Donations',
          rowActions: [
            {
              click: (row, event) => {

              },
              label: 'All'
            },
            {
              click: (row, event) => {

              },
              label: 'Complete'
            },
            {
              click: (row, event) => {

              },
              label: 'Overdue'
            },
          ]
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
        let splitter = 0;

        return this._fsApi.get('https://boilerplate.firestitch.com/api/dummy', query)
          .pipe(
            map(response => ({ data: response.data.objects, paging: response.data.paging })),
            map((response) => {
              response.data.map((row) => {
                if (splitter < 8) {
                  row['some'] = {"name":"Group 1","date":"2000-07-19T10:59:46+00:00","signin_date":"2018-09-23T08:16:21+00:00","guid":"ec8996f74e9522237bce9467d016909c"};
                } else {
                  row['some'] = {"name":"Group 2","date":"2000-07-19T10:59:46+00:00","signin_date":"2018-09-23T08:16:21+00:00","guid":"AFKMSFAOISFasfja)(FASjfiasofajFi"};
                }
                splitter++;
              });

              return response;
            })
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
