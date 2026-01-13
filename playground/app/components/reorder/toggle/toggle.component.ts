import { ChangeDetectionStrategy, Component, OnInit, ViewChild, inject } from '@angular/core';

import { MatIcon } from '@angular/material/icon';

import { FsApi } from '@firestitch/api';
import { ItemType } from '@firestitch/filter';
import { FsListAbstractRow, FsListConfig, ReorderPosition } from '@firestitch/list';

import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { FsListComponent } from '../../../../../src/app/components/list/list.component';
import { FsListCellDirective } from '../../../../../src/app/directives/cell/cell.directive';
import { FsListColumnDirective } from '../../../../../src/app/directives/column/column.directive';
import { FsListHeaderDirective } from '../../../../../src/app/directives/header/header.directive';


@Component({
  selector: 'toggle-reorder',
  templateUrl: './toggle.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FsListComponent,
    FsListColumnDirective,
    FsListHeaderDirective,
    FsListCellDirective,
    MatIcon,
  ],
})
export class ToggleReorderComponent implements OnInit {

  @ViewChild(FsListComponent, { static: true })
  public list: FsListComponent;

  public config: FsListConfig = null;
  
  private _fsApi = inject(FsApi);

  public ngOnInit() {
    this.config = {
      heading: 'Reorder',
      subheading: 'With Always strategy and positioned to left',
      status: false,
      queryParam: false,
      style: 'card',
      rowHoverHighlight: false,
      rowEvents: {
        click: () => {
          console.log('click'); 
        },
      },
      filters: [
        {
          name: 'keyword',
          type: ItemType.Keyword,
          label: 'Search',
          hide: true,
        },
      ],
      rowActions: [
        {
          icon: 'delete',
          menu: false,
          click: () => {
            // TODO: Implement delete action
          },
          remove: {
            title: 'Confirm',
            template: 'Are you sure you want to delete this task type?',
          },
        },
      ],
      persist: false,
      reorder: {
        position: ReorderPosition.Left,
        start: () => {
          console.log('reorder started');
        },
        moved: (data: any) => {
          console.log('reorder moved', data);
        },
        done: (data: any) => {
          console.log('reorder finished', data);
        },
      },
      fetch: (query: any) => {
        return this._fsApi.get('dummy', query)
          .pipe(
            map((response: any) => ({ data: response.objects, paging: response.paging })),
          );
      },
    };
  }

  public setDefault(taskType: any): void {
    of(null)
      .pipe(delay(100))
      .subscribe(() => {
        const allRows = this.list.getData();
        const updatedRows = allRows.map((row: FsListAbstractRow) => {
          return {
            ...row,
            default: row.id === taskType.id,
          };
        });
        this.list.updateData(updatedRows, (item: FsListAbstractRow, targetRow?: FsListAbstractRow) => {
          return (targetRow as any)?.id === item.id;
        });
      });
  }

}
