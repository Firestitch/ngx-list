import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import { FsListModule, FsList }  from '@firestitch/list';
import { FsApi } from '@firestitch/api';
import { FormsModule } from '@angular/forms';
import { FsArray } from '@firestitch/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list',
  template: '<fs-list [(list)]="list"></fs-list>',
  styles: []
})
export class ListComponent implements OnInit {

  list: FsList = null;

  constructor(fsArray: FsArray, fsApi: FsApi, route: ActivatedRoute, router: Router) {
      this.list = FsList.create({
        imports: [FormsModule, RouterModule],
        inlineFilters: true,
        columns:
        [
            {
                title: 'column1',
                template: `This row's name is <input [(ngModel)]="row.name" (click)="onClick($event, row)"/>. {{ row.name }}`,
                data: {
                    onClick: (event, row) => {
                        console.log(event, row);
                    }
                }
            },
            {
                title: 'column2',
                align: 'right',
                template: `This row's guid is {{ row.guid }}.`
            },
            {
                title: 'Simple Link',
                template: `<a routerLink="/welcome">Simple Link</a>`
            },
            {
              title: 'Redirect with Handler',
              template: `<a (click)="proceed('/welcome')">Link Handler</a>`,
              data: {
                proceed(link) {
                  router.navigateByUrl(link);
                }
              }
          },
        ],
        topActions:
        [
            {
                click: (filters, event) => {
                    console.log(filters);
                },
                primary: false,
                label: 'Pretty Button 2'
            },
            {
                click: (filters, event) => {
                    console.log(filters);
                },
                raised: false,
                label: 'Pretty Button'
            }
        ],
        filters: [
            {
                name: 'keyword',
                type: 'text',
                label: 'Search'
            },
            {
                name: 'simple_select',
                type: 'select',
                label: 'Simple Select',
                values: () => {
                    return [
                        { name: 'All', value: '__all' },
                        { name: 'Option 1', value: 1 },
                        { name: 'Option 2', value: 2 },
                        { name: 'Option 3', value: 3 }
                    ];
                }
            }
        ],
        data: (query) => {

        // Connect to dummy api and disply the data
        // we need to return 3 types of data
        // 1. the array of data that is displayed
        // 2. The paging object { data: [], paging: { limit: 10, page: 1, pages: 1, records: 50 } }
        // 3. global data that can be applied to the footer templates (dont worry about this one for now)
        // so we can return an FsResult object that is populate from the api response
        // or some other structure. Think about this and also take a look at the Angular 1 implementaion.

            return fsApi.get('https://boilerplate.firestitch.com/api/dummy', query)
                .map(response => ({ data: response.data.objects }));
        }
    });
  }

  ngOnInit() {
  }
}
