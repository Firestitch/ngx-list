import { ChangeDetectionStrategy, Component, OnInit, ViewChild, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FsApi } from '@firestitch/api';
import { nameValue } from '@firestitch/common';
import { ActionMode, ItemDateMode, ItemType } from '@firestitch/filter';
import {
  ActionType,
  FsListAbstractRow,
  FsListComponent,
  FsListConfig,
  FsListHeadingDirective,
} from '@firestitch/list';

import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { FsListComponent as FsListComponent_1 } from '../../../../src/app/components/list/list.component';
import { FsListCellDirective } from '../../../../src/app/directives/cell/cell.directive';
import { FsListColumnDirective } from '../../../../src/app/directives/column/column.directive';
import { FsListFooterDirective } from '../../../../src/app/directives/footer/footer.directive';
import { FsListHeaderDirective } from '../../../../src/app/directives/header/header.directive';
import { ApiStrategy } from '../../services/api-strategy.service';

import { SavedFilters } from './saved-filter';


@Component({
  selector: 'kitchensink',
  templateUrl: './kitchensink.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FsListComponent_1,
    FsListColumnDirective,
    FsListHeaderDirective,
    FsListCellDirective,
    FsListFooterDirective,
    FsListHeadingDirective,
    RouterLink,
  ],
})
export class KitchenSinkComponent
implements OnInit {
  protected _apiStrategy = inject(ApiStrategy);
  private _api = inject(FsApi);


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

  public ngOnInit() {
    this.config = {
      status: true,
      chips: true,
      persist: {
        name: 'kitchensink',
      },
      queryParam: true,
      paging: {
        limits: [5, 15, 50, 150, 250, 500, 1000],
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
      heading: 'Heading',
      subheading: 'Subheading',
      column: {
        load: () => {
          return of([
            {
              name: 'id',
              customizable: false,
            },
            {
              name: 'name',
              show: true,
            },
          ]);
        },
        change: (columns) => {
          console.log('Column changed ', columns);
        },

      },
      filters: [
        {
          name: 'keyword',
          type: ItemType.Keyword,
          label: 'Search',
        },
        {
          name: 'singleSelect',
          type: ItemType.Select,
          label: 'Simple Select',
          values: () => {
            return [
              { name: 'All', value: null },
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
          name: 'dateScroll',
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
          name: 'daysChips',
          label: 'Weekdays',
          type: ItemType.Chips,
          multiple: true,
          values: () => {
            return of(this.weekdays)
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
      restore: {
        query: { state: 'deleted' },
        filterLabel: 'Show Deleted',
        menuLabel: 'Restore',
        reload: true,
        click: (row) => {
          return of({ id: row.id, state: 'active' });
        },
      },
      afterContentInit: (query, data) => {
        console.log('AfterContent Init', query, data);
      },
      savedFilters: {
        load: () => {
          console.log('<====== Load Saved Filters =====>');

          return of(SavedFilters);
        },
        save: (filter) => {
          console.log('<====== Save Filter =====>');
          const filterIndex = SavedFilters.findIndex((f) => {
            return f.id === filter.id;
          });

          if (filterIndex > -1) {
            // Here I'm emulating like backend returend filter which automatically activated
            filter.active = true;
            SavedFilters[filterIndex] = filter;
          } else {
            // Here I'm emulating like backend returend new filter with ID to me
            filter = {
              ...filter,
              id: 999,
            };
            SavedFilters.push(filter);
          }

          console.log('Save Filter', filter);
          console.log('Saved Filters: ', SavedFilters);

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
          icon: (row) => {
            return row.checked  ? 'check_circle' : 'radio_button_unchecked';
          },
          click: (row) => {
            row.checked = !row.checked;
            this.list.updateData([row], (listRow: FsListAbstractRow) => {
              return listRow.guid === row.guid;
            });
          },
          menu: false,
          // link: (row) => {
          //   return { link: ['rows', row.guid], queryParams: { param: 1 } };
          // },
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
        query.count = 100;

        console.log('Fetch', query);

        return this._api.get('dummy', query)
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
