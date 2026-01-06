import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';

import { FsApi } from '@firestitch/api';
import { ItemType } from '@firestitch/filter';
import { FsListConfig, ReorderPosition } from '@firestitch/list';

import { map } from 'rxjs/operators';

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
  ],
})
export class ToggleReorderComponent implements OnInit {

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
          icon: (taskType) => {
            return taskType.default ? 'check_circle' : 'radio_button_unchecked';
          },
          menu: false,
          click: () => {
            // TODO: Implement default action
          },
        },
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
        moved: (data) => {
          console.log('reorder moved', data);
        },
        done: (data) => {
          console.log('reorder finished', data);
        },
      },
      fetch: (query) => {
        return this._fsApi.get('dummy', query)
          .pipe(
            map((response) => ({ data: response.objects, paging: response.paging })),
          );
      },
    };
  }

}
