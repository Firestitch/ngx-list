import { NgTemplateOutlet } from '@angular/common';
import { Component, OnInit, ViewChild, inject } from '@angular/core';

import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

import { FsApi } from '@firestitch/api';
import { ItemType } from '@firestitch/filter';
import {
  FsListComponent,
  FsListConfig,
  ReorderPosition,
} from '@firestitch/list';

import { map } from 'rxjs/operators';

import { FsListComponent as FsListComponent_1 } from '../../../../src/app/components/list/list.component';
import { FsListBreakpointDirective } from '../../../../src/app/directives/breakpoint/breakpoint.directive';
import { FsListCellDirective } from '../../../../src/app/directives/cell/cell.directive';
import { FsListColumnDirective } from '../../../../src/app/directives/column/column.directive';
import { FsListFooterDirective } from '../../../../src/app/directives/footer/footer.directive';
import { FsListGroupExpandTriggerDirective } from '../../../../src/app/directives/group-expand-trigger/group-expand-trigger.directive';
import { FsListGroupFooterDirective } from '../../../../src/app/directives/group-footer/group-footer.directive';
import { FsListGroupHeaderDirective } from '../../../../src/app/directives/group-header/group-header.directive';
import { FsListHeaderDirective } from '../../../../src/app/directives/header/header.directive';


@Component({
  selector: 'breakpoints',
  templateUrl: './breakpoints.component.html',
  styleUrls: ['./breakpoints.component.scss'],
  standalone: true,
  imports: [
    FsListComponent_1,
    FsListColumnDirective,
    FsListBreakpointDirective,
    FsListHeaderDirective,
    FsListGroupHeaderDirective,
    FsListGroupFooterDirective,
    FsListCellDirective,
    FsListFooterDirective,
    FsListGroupExpandTriggerDirective,
    MatIconButton,
    MatIcon,
    NgTemplateOutlet,
  ],
})
export class BreakpointsComponent implements OnInit {

  @ViewChild('list', { static: true })
  public list: FsListComponent;

  public config: FsListConfig;

  private _fsApi = inject(FsApi);

  public ngOnInit(): void {
    this.config = {
      status: true,
      paging: false,
      queryParam: false,
      persist: false,
      style: 'card',
      trackBy: 'name',
      selection: {
        selectAll: true,
      },
      reorder: {
        position: ReorderPosition.Left,
      },
      group: {
        groupBy: (row) => ({ groupIndex: row.groupIndex }),
        compareBy: (group) => group.groupIndex,
        footer: () => true,
      },
      sort: {
        value: 'name',
        direction: 'asc',
      },
      filters: [
        {
          name: 'keyword',
          type: ItemType.Keyword,
          label: 'Search',
        },
        {
          name: 'status',
          type: ItemType.Select,
          label: 'Status',
          values: () => [
            { name: 'All', value: null },
            { name: 'Active', value: 'active' },
            { name: 'Pending', value: 'pending' },
            { name: 'Archived', value: 'archived' },
          ],
        },
        {
          name: 'priority',
          type: ItemType.Select,
          label: 'Priority',
          multiple: true,
          values: () => [
            { name: 'Low', value: 'low' },
            { name: 'Medium', value: 'medium' },
            { name: 'High', value: 'high' },
          ],
        },
      ],
      rowActions: [
        {
          click: (row) => console.log('edit', row),
          icon: 'edit',
          label: 'Edit',
        },
        {
          click: (row) => console.log('delete', row),
          icon: 'delete',
          label: 'Remove',
        },
      ],
      fetch: (query) => {
        query.count = 60;
        query.limit = 10;

        return this._fsApi.get('dummy', query)
          .pipe(
            map((response) => ({ data: response.objects, paging: response.paging })),
          );
      },
    };
  }

}
