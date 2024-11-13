import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';

import { FsApi } from '@firestitch/api';
import { nameValue } from '@firestitch/common';
import { ActionMode, ItemDateMode, ItemType } from '@firestitch/filter';
import {
  ActionType,
  FsListAbstractRow,
  FsListComponent,
  FsListConfig,
  PaginationStrategy,
} from '@firestitch/list';

import { BehaviorSubject, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { ApiStrategy } from '../../services/api-strategy.service';
import { StrategyBaseComponent } from '../examples/strategy-base/strategy-base.component';

import { savedFilters } from './saved-filter';


@Component({
  selector: 'kitchensink',
  templateUrl: './kitchensink.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KitchenSinkComponent
  extends StrategyBaseComponent
  implements OnInit {

  @ViewChild(FsListComponent, { static: true })
  public list: FsListComponent;
  
  public config: FsListConfig;

  public linkVisible = true;

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
  ) {
    super(_apiStrategy);
  }

  public ngOnInit() {
    this.config = {
      status: true,
      chips: true,
      persist: false,
      filterInput: true,
      queryParam: true,
      paging: {
        limits: [5, 15, 50, 150, 250, 500, 1000],
        strategy: PaginationStrategy.Offset,
      },
      rowHoverHighlight: true,
      // sort: {
      //   value: 'guid',
      //   direction: 'desc',
      // },
      // autoReload: {
      //   seconds: 10,
      // },
      sorts: [
        {
          name: 'Custom Sort',
          direction: 'desc',
          value: 'custom',
        },
      ],
      //loadMore: true,
      // loadMore: {
      //   buttonType: 'flat',
      //   buttonColor: 'primary',
      // },
      column: {
        load: () => {
          return of([
            {
              name: 'name',
              show: true,
            },
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
          label: 'Search',
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
              { name: 'Option 3', value: 3 },
            ];
          },
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
        },
        {
          name: 'date_scroll',
          type: ItemType.Date,
          mode: ItemDateMode.ScrollMonthYear,
          label: 'Month Scroll Picker',
        },
        {
          name: 'checkbox',
          type: ItemType.Checkbox,
          label: 'Checkbox',
        },
        {
          name: 'days_chips',
          label: 'Weekdays',
          type: ItemType.Chips,
          multiple: true,
          values: () => {
            return new BehaviorSubject(this.weekdays)
              .pipe(
                map((weekdays) => nameValue(weekdays, 'name', 'id')),
              );
          },
        },
        {
          name: 'state',
          type: ItemType.Select,
          label: 'Status',
          multiple: true,
          values: [
            { name: 'Active', value: 'active' },
            { name: 'Pending', value: 'pending' },
            { name: 'Deleted', value: 'deleted' },
          ],
          isolate: { label: 'Show Deleted', value: 'deleted' },
        },
      ],
      afterContentInit: (query, data) => {
        console.log('AfterContent Init', query, data);
      },
      savedFilters: {
        load: () => {
          console.log('<====== Load Saved Filters =====>');

          return of(savedFilters)
            .pipe(
              delay(100),
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
            };
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
        delete: () => {
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
        },
      },
      rowActionsHover: false,
      actions: [
        {
          label: 'Columns',
          customize: true,
          primary: false,
        },
        {
          click: () => {
            this.linkVisible = !this.linkVisible;
          },
          primary: false,
          label: 'Toggle Link Visibility',
        },
        {
          click: () => {
            // this.list.enableOrder();
          },
          label: 'Kebab only button',
          menu: true,
        },
        {
          click: (event) => {
            console.log(event);
          },
          label: 'Primary Button',
        },
        {
          mode: ActionMode.Menu,
          label: 'Presets',
          primary: false,
          items: [
            {
              label: 'Today',
            },
          ],
        },
      ],
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
          icon: 'launch',
          menu: false,
          link: (row) => {
            return { link: ['rows', row.guid], queryParams: { param: 1 } };
          },
        },
        {
          label: (row) => {
            return `Go to ${row.name}`;
          },
          link: (row) => {

            return { link: ['rows', row.guid], queryParams: { param: 1 } };
          },
          className: 'test',
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
                return { link: ['rows', row.guid], queryParams: { param: 1 } };
              },
              icon: 'edit',
              label: 'Edit',
            },
            {
              link: (row) => {
                return { link: ['rows', row.guid], queryParams: { param: 1 } };
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
                  },
                );
              },
              remove: {
                title: 'Confirm',
                template: 'Are you sure you would like to delete this record?',
              },
              icon: 'delete',
              label: 'Remove',
            },
            {
              label: 'Sub Menu Upload',
              file: {
                select: (file) => {
                  console.log('files:', file);
                },
              },
            },
          ],
        },
        {
          label: 'View Donations',
          rowActions: [
            {
              click: (row) => {
                console.log(row);
              },
              label: 'All',
            },
            {
              click: (row) => {
                console.log(row);
              },
              label: 'Complete',
            },
            {
              click: (row) => {
                console.log(row);
              },
              label: 'Overdue',
            },
          ],
        },

      ],
      rowClass: () => {
        return 'custom-row-class';
      },
      rowEvents: {
        mouseover: () => {
          // console.log('over', event);
        },
        click: (event) => {
          console.log('row click', event);
        },
      },
      header: {
        className: 'header-test-defaults-class',
        align: 'left',
      },
      cell: {
        className: 'cell-test-defaults-class',
        align: 'left',
      },
      fetch: (query) => {
        query.count = 50;

        console.log('Fetch', query);

        return this._fsApi.get('https://specify.firestitch.dev/api/dummy', query)
          .pipe(
            map((response) => ({ data: response.objects, paging: response.paging })),
          );
      },
      beforeFetch: (query) => {
        console.log(query);

        return of(query);
      },
      afterFetch: (query, data) => {
        console.log(query, data);
      },
      afterInit: (listComponent: FsListComponent) => {
        console.log(listComponent);
      },
    };
  }

  public onClick(row, event) {
    console.log(row, event);
  }
}
