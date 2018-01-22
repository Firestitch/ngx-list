import {
  Component,
  OnInit,
  Input,
  ViewContainerRef,
  ViewChild,
  ViewEncapsulation,
  ComponentFactoryResolver
} from '@angular/core';

import { FsList } from '../../models';
import { FsRowComponent } from '../row/row.component';

@Component({
  selector: 'fs-list',
  templateUrl: 'list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FsListComponent implements OnInit {
  components = [];
  @Input() public list: FsList;
  @ViewChild('row', { read: ViewContainerRef }) rowsContainer;

  constructor(private _componentFactoryResolver: ComponentFactoryResolver) {
  }

  public ngOnInit() {
    this.loadData();
    if (this.rowsContainer) {
      this.drawData();
    }
  }

  public loadData() {
    if (this.list.filters && this.list.filters.length) {
      this.list.filterService.fsConfig = {
        persist: this.list.persist,
        items: this.list.filters,
        inline: this.list.inlineFilters,
        init: (instance) => {
          this.rowsContainer.clear();
          this.list.load(instance.gets({ flatten: true }));
        },
        change: (query, instance) => {
          this.rowsContainer.clear();
          this.list.load(instance.gets({ flatten: true }));
        }
      };
    }else {
      this.list.load({});
    }
  }

  public drawData() {
    this.rowsContainer.clear();

    this.list.data$.subscribe((rows) => {
      rows.forEach((row, index) => this.initRowComponent(row, index));
    });
  }

  public initRowComponent(data, index) {
    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(this.list.rowComponent);

    const viewContainerRef = this.rowsContainer;

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<FsRowComponent>componentRef.instance).row = data;
    (<FsRowComponent>componentRef.instance).rowIndex = index;
  }
}
