import { ChangeDetectionStrategy, Component, OnInit, ViewChild, inject } from '@angular/core';

import { FsApi } from '@firestitch/api';
import { ItemType } from '@firestitch/filter';
import { FsListComponent, FsListConfig } from '@firestitch/list';
import { SelectionActionType } from '@firestitch/selection';

import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { FsListComponent as FsListComponent_1 } from '../../../../src/app/components/list/list.component';
import { FsListCellDirective } from '../../../../src/app/directives/cell/cell.directive';
import { FsListColumnDirective } from '../../../../src/app/directives/column/column.directive';
import { FsListHeaderDirective } from '../../../../src/app/directives/header/header.directive';
import { ApiStrategy } from '../../services/api-strategy.service';


@Component({
  selector: 'selection',
  templateUrl: './selection.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FsListComponent_1,
    FsListColumnDirective,
    FsListHeaderDirective,
    FsListCellDirective,
  ],
})
export class SelectionComponent implements OnInit {

  @ViewChild('table', { static: true })
  public table: FsListComponent; // Controller fs-list
  public config: FsListConfig;

  protected _apiStrategy = inject(ApiStrategy);
  private _api = inject(FsApi);

  public ngOnInit() {

    this.config = {
      trackBy: 'name',
      status: true,
      queryParam: false,
      persist: false,
      selection: {
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
        actionSelected: () => {
          return of(true).pipe(
            delay(2000),
          );
        },
        allSelected: () => {
          //
        },
        cancelled: () => {
          //
        },
        selectable: (row, index) => {
          return index % 2 === 0;
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
      paging: {
        limits: [5, 15, 50],
      },
      filters: [
        {
          name: 'keyword',
          type: ItemType.Keyword,
          label: 'Search',
        },
      ],
      fetch: (query) => {
        query.count = 500;

        return this._api.get('dummy', query)
          .pipe(
            map((response) => ({ data: response.objects, paging: response.paging })),
          );
      },
    };
  }

  public onClick(row, event) {
    console.log(row, event);
  }
}
