import { Component, OnInit, ViewChild, AfterContentInit } from '@angular/core';
import { FsApi } from '@firestitch/api';
import { ItemType } from '@firestitch/filter';
import {
  FsListConfig,
  PaginationStrategy,
  FsListComponent,
  FsListAbstractRow
} from '@firestitch/list';
import { map } from 'rxjs/operators';

import { StrategyBaseComponent } from '../examples/strategy-base/strategy-base.component';
import { ApiStrategy } from '../../services/api-strategy.service';
import { FsExampleComponent } from '@firestitch/example';
import { ConfigureComponent } from '../configure';
import { cloneDeep } from 'lodash-es';


@Component({
  selector: 'groups',
  templateUrl: 'groups.component.html',
  styleUrls: ['./groups.component.scss'],
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
      paging: false,
      group: {
        groupBy: (row) => {
          return row.group;
        },
        compareBy: (group) => {
          return group.id;
        },
        groupActions: [
          {
            click: (row, event) => {

            },
            menu: true,
            label: 'Group action'
          }
        ]
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
        query.limit = 20;

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
