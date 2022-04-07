import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { FsApi } from '@firestitch/api';
import { ItemDateMode, ItemType, ActionMode } from '@firestitch/filter';
import {
  ActionType,
  FsListAbstractRow,
  FsListComponent,
  FsListConfig,
  PaginationStrategy
} from '@firestitch/list';
import { nameValue } from '@firestitch/common';

import { BehaviorSubject, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { StrategyBaseComponent } from '../examples/strategy-base/strategy-base.component';
import { ApiStrategy } from '../../services/api-strategy.service';
import { FsExampleComponent } from '@firestitch/example';
import { ConfigureComponent } from '../configure';
import { cloneDeep } from 'lodash-es';
import { savedFilters } from './saved-filter';


@Component({
  selector: 'kitchensink',
  templateUrl: 'kitchensink.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KitchenSinkComponent extends StrategyBaseComponent implements OnInit, AfterContentInit {

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
      status: true,
      chips: true,
      filterInput: true,
      queryParam: true,
      paging: {
        limits: [5, 15, 50, 150, 250, 500, 1000],
        strategy: PaginationStrategy.Offset,
      },
      sort: {
        value: 'guid',
        direction: 'desc',
      },
      sorts: [
        {
          name: 'Custom Sort',
          direction: 'desc',
          value: 'custom'
        }
      ],
      loadMore: false,
      column: {
        load: () => {
          return of([
            {
              name: 'name',
              show: true,
            }
          ]);
        },
        change: (columns) => {
          console.log('Column changed ', columns);
        },
        tooltip: (name) => {
          if (name === 'name') {
            return 'Custom Tooltip "tip"';
          }
        },
        disabled: (name) => {
          if (name === 'name') {
            return true;
          }
        },
      },
      filters: [
        {
          name: 'keyword',
          type: ItemType.Keyword,
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
          label: ['Min', 'Max'],
        },
        {
          name: 'date',
          type: ItemType.Date,
          label: 'Date',
          change: (event) => {
            debugger;
          }
        },
        {
          name: 'date_scroll',
          type: ItemType.Date,
          mode: ItemDateMode.ScrollMonthYear,
          label: 'Month Scroll Picker'
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
      afterContentInit: (query, data) => {
        console.log('AfterContent Init', query, data);
      },
      savedFilters: {
        load: () => {
          console.log('<====== Load Saved Filters =====>');
          return of(savedFilters)
            .pipe(
              delay(1500),
            );
        },
        save: (filter) => {
          console.log('<====== Save Filter =====>');
          const filterIndex = savedFilters.findIndex((f) => {
            return f.id === filter.id;
          });

          if (filterIndex > -1) {
            // Here I'm emulating like backend returend filter which automatically activated
            filter.active = true;
            savedFilters[filterIndex] = filter;
          } else {
            // Here I'm emulating like backend returend new filter with ID to me
            filter = {
              ...filter,
              id: 999,
            }
            savedFilters.push(filter);
          }

          console.log('Save Filter', filter);
          console.log('Saved Filters: ', savedFilters);

          return of(filter)
            .pipe(
              delay(1500),
            );
        },
        order: (filters) => {
          console.log('<====== Order Saved Filters =====>');
          console.log('order filters', filters);

          return of(filters);
        },
        delete: (filter) => {
          console.log('<====== Delete Saved Filter =====>');

          return of();
        },
      },
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
          label: 'Columns',
          customize: true,
          primary: false,
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
          mode: ActionMode.Menu,
          label: 'Presets',
          icon: 'arrow_drop_down',
          primary: false,
          items: [
            {
              label: 'Today',
              click: () => {

              }
            },
            ]
        }
      ],
      // rowActions: [
      //   {
      //     click: (row, event) => {
      //       console.log('Accept', row, event);
      //     },
      //     show: (row) => {
      //       return row.show;
      //     },
      //     menu: false,
      //     icon: 'done',
      //     className: 'mat-warn',
      //     type: ActionType.Icon,
      //   },
      //
      //   {
      //     click: (row, event) => {
      //       console.log('edit', row, event);
      //     },
      //     show: (row) => {
      //       return row.show;
      //     },
      //     menu: true,
      //     icon: 'edit',
      //     label: 'Edit',
      //     type: ActionType.Basic
      //   },
      //   {
      //     click: (row, event) => {
      //       console.log('delete', row, event);
      //       this.list.removeData(
      //         (listRow: FsListAbstractRow) => {
      //           return listRow.name === row.name;
      //         }
      //       );
      //     },
      //     menu: true,
      //     remove: {
      //       title: 'Confirm',
      //       template: 'Are you sure you would like to delete this record?',
      //     },
      //     icon: 'delete',
      //     label: 'Remove'
      //   }
      // ],
      rowActions: [
        {
          label: 'Simple Btn',
          type: ActionType.Raised,
          menu: false,
          click: (row) => {
            console.log('simple btn clicked', row);
          },
        },
        {
          label: 'Upload',
          type: ActionType.Raised,
          menu: false,
          file: {
            select: (file) => {
              console.log('files:', file);
            },
          },
        },
        {
          label: 'Link Btn',
          type: ActionType.Raised,
          menu: false,
          link: (row) => {

            return { link: ['rows', row.guid ], queryParams: { param: 1 } }
          },
        },
        {
          label: (row) => {
            return `Go to ${row.name}`;
          },
          link: (row) => {

            return { link: ['rows', row.guid ], queryParams: { param: 1 } }
          },
        },
        {
          label: 'Menu Upload',
          menu: true,
          file: {
            select: (file) => {
              console.log('files:', file);
            },
          },
        },
        {
          label: 'Group 1',
          rowActions: [
            {
              link: (row) => {
                return { link: ['rows', row.guid ], queryParams: { param: 1 } }
              },
              icon: 'edit',
              label: 'Edit'
            },
            {
              link: (row) => {
                return { link: ['rows', row.guid ], queryParams: { param: 1 } }
              },
              show: () => {
                return false;
              },
              label: 'Hidden',
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
              remove: {
                title: 'Confirm',
                template: 'Are you sure you would like to delete this record?',
              },
              icon: 'delete',
              label: 'Remove'
            },
            {
              label: 'Sub Menu Upload',
              file: {
                select: (file) => {
                  console.log('files:', file);
                },
              },
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
        query.count = 50;
        return this._fsApi.get('https://specify.dev.firestitch.com/api/dummy', query)
          .pipe(
            map(response => ({ data: response.data.objects, paging: response.data.paging })),
          );
      },
      afterFetch: (query, data) => {
        console.log(query, data);
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
