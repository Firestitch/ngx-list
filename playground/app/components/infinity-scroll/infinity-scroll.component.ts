import { Component, OnInit, ViewChild } from '@angular/core';
import { FsApi } from '@firestitch/api';
import { ItemType } from '@firestitch/filter';
import { ActionType, FsListComponent, FsListConfig } from '@firestitch/list';
import { map } from 'rxjs/operators';
import { ApiStrategy } from '../../services/api-strategy.service';
import { StrategyBaseComponent } from '../examples/strategy-base/strategy-base.component';


@Component({
  selector: 'infinity-scroll',
  templateUrl: 'infinity-scroll.component.html',
  styles: []
})
export class InfinityScrollComponent extends StrategyBaseComponent implements OnInit {

  @ViewChild('table', { static: true })
  public table: FsListComponent; // Controller fs-list
  public config: FsListConfig;

  public roles = [
    { value: 'admin', viewValue: 'Admin' },
    { value: 'moderator', viewValue: 'Moderator' },
    { value: 'user', viewValue: 'User' }
  ];

  constructor(
    protected _apiStrategy: ApiStrategy,
    private _fsApi: FsApi,
  ) {
    super(_apiStrategy);
  }

  public ngOnInit() {

    this.config = {
      paging: {
        limits: [30, 50, 150]
      },
      scrollable: {
        name: 'list-scroll',
      },
      queryParam: false,
      persist: false,
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
          label: 'Date'
        },
        {
          name: 'checkbox',
          type: ItemType.Checkbox,
          label: 'Checkbox'
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
      rowActions: [
        {
          click: (row, event) => {
            console.log('Accept', row, event);
          },
          show: (row) => {
            return row.show;
          },
          menu: false,
          icon: 'done',
          className: 'mat-warn',
          type: ActionType.Icon,
        },
        {
          click: (row, event) => {
            row.show = !row.show;
            console.log('Cancel', row, event);
          },
          icon: 'clear',
          label: 'Cancel',
          type: ActionType.Raised,
        },
        {
          click: (row, event) => {
            console.log('edit', row, event);
          },
          show: (row) => {
            return row.show;
          },
          menu: true,
          icon: 'edit',
          label: 'Edit',
          type: ActionType.Basic
        },
        {
          click: (row, event) => {
            console.log('delete', row, event);
          },
          menu: true,
          icon: 'delete',
          label: 'Remove'
        }
      ],
      fetch: (query) => {
        query.count = 12;
        query.limit = 3;
        const genders = ['men', 'women'];
        return this._fsApi.get('https://specify.firestitch.dev/api/dummy', query)
          .pipe(
            map(response => {
              response.objects.forEach((obj) => {
                const gender = genders[this.randomInteger(0, 1)];
                obj.avatar = 'http://api.randomuser.me/portraits/' + gender + '/' + this.randomInteger(1, 99) + '.jpg';
              });

              return { data: response.objects, paging: response.paging };
            }),
          );
      },
    };
  }

  public onClick(row, event) {
    console.log(row, event);
  }

  private randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
  }
}
