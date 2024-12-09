import { AfterContentInit, Component, OnInit, ViewChild } from '@angular/core';

import { FsApi } from '@firestitch/api';
import { FsExampleComponent } from '@firestitch/example';
import { ItemType } from '@firestitch/filter';
import {
  FsListAbstractRow,
  FsListComponent,
  FsListConfig,
  ReorderPosition,
} from '@firestitch/list';
import { SelectionActionType } from '@firestitch/selection';

import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';


import { ApiStrategy } from '../../services/api-strategy.service';
import { StrategyBaseComponent } from '../examples/strategy-base/strategy-base.component';


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
      status: true,
      filterInput: true,
      paging: false,
      queryParam: false,
      persist: false,
      actions: [
        {
          label: 'Toggle Group Mode',
          click: () => {
            this.list.groupEnabled = !this.list.groupEnabled;
          },
        },
        {
          label: 'Enable Selection',
          click: () => {
            this.enableSelection();
            this.list.filterRef.updateActionsVisibility();
          },
          show: () => {
            return this.list.list.selection.disabled;
          },
        },
        {
          label: 'Disable Selection',
          click: () => {
            this.disableSelection();
            this.list.filterRef.updateActionsVisibility();
          },
          show: () => {
            return !this.list.list.selection.disabled;
          },
        },
      ],
      trackBy: 'name',
      selection: {
        disabled: false,
        selectAll: true,
        actions: [
          {
            type: SelectionActionType.Action,
            name: 'delete',
            label: 'Delete',
          },
          {
            type: SelectionActionType.Select,
            label: 'Change Status To',
            values: [
              {
                name: 'TODO',
                value: '1',
              },
              {
                name: 'Done',
                value: '2',
              },
            ],
          },
        ],
        actionSelected: (action) => {

          console.log(action);

          return of(true).pipe(
            delay(2000),
          );
        },
        allSelected: () => {
        },
        cancelled: () => {
        },
        selectionChanged: (data, allSelected, selectionRef) => {
          if (data.find((row) => row.name === 'Object 1')) {
            return of([
              {
                type: SelectionActionType.Action,
                value: 'custom',
                label: 'Custom Action',
              },
            ]);
          } 
          if (selectionRef) {
            selectionRef.resetActions();
          }
          
        },
      },
      reorder: {
        moveDrop: ({ row1, row2, group1, group2 }) => {
          // console.log(row1, row2, group1, group2);

          return group1 === group2;
        },
        position: ReorderPosition.Left,
        start: () => {
          // console.log('reorder started');
        },
        moved: (data) => {
          // console.log('reorder moved', data);
        },
        done: (data) => {
          // console.log('reorder finished', data);
        },
      },
      group: {
        groupBy: (row) => {
          return row.group;
        },
        compareBy: (group) => {
          return group.id;
        },
        footer: (group) => {
          return true;
        },
        actions: [
          {
            click: (row, event) => {
              console.log('Group Action Clicked');
            },
            label: 'Group action',
          },
        ],
      },
      sort: {
        value: 'guid',
        direction: 'desc',
      },
      filters: [
        {
          name: 'keyword',
          type: ItemType.Keyword,
          label: 'Search',
        },
      ],
      rowActions: [
        {
          click: (row, event) => {

          },
          menu: true,
          label: 'Go to Project',
        },
        {
          label: 'Group 1',
          rowActions: [
            {
              click: (row, event) => {

              },
              menu: true,
              icon: 'edit',
              label: 'Edit',
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
              menu: true,
              remove: {
                title: 'Confirm',
                template: 'Are you sure you would like to delete this record?',
              },
              icon: 'delete',
              label: 'Remove',
            },
          ],
        },
        {
          label: 'View Donations',
          rowActions: [
            {
              click: (row, event) => {

              },
              label: 'All',
            },
            {
              click: (row, event) => {

              },
              label: 'Complete',
            },
            {
              click: (row, event) => {

              },
              label: 'Overdue',
            },
          ],
        },

      ],
      rowClass: (row, options) => {
        // console.log(options);
        return 'custom-row-class';
      },
      rowEvents:
      {
        mouseover: (event) => {
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
        query.count = 500;
        query.limit = 20;

        return this._fsApi.get('dummy', query)
          .pipe(
            map((response) => ({ data: response.objects, paging: response.paging })),
          );
      },
    };
  }

  ngAfterContentInit() {
  }

  public onClick(row, event) {
    console.log(row, event);
  }

  public enableSelection() {
    this.list.enableSelection();
  }

  public disableSelection() {
    this.list.disableSelection();
  }
}
