import {
  ChangeDetectorRef, Component, ComponentFactoryResolver, Input, OnInit, ViewChild,
  ViewContainerRef
} from '@angular/core';
import { Column } from '../../models/column.model';
import { FsListConfig } from '../../models/list-config.model';
import { FsRowComponent } from './row/row.component';

@Component({
  selector: 'fs-list-body',
  templateUrl: 'body.component.html'
})
export class FsBodyComponent implements OnInit {
  @Input() config: FsListConfig;
  @Input() columns: Column[] = [];
  @ViewChild('rowsContainer', { read: ViewContainerRef }) rowsContainer;

  public rows: any = [];
  private rowComponent = FsRowComponent;

  constructor(
    private cdRef: ChangeDetectorRef,
    private _componentFactoryResolver: ComponentFactoryResolver) {
  }

  public ngOnInit() {
    this.config.data$.subscribe((rows) => {
      this.rowsContainer.clear();
      this.rows = rows;

      this.rows.forEach((row, index) => {
        this.initRowComponent(row, index)
      })
    })
  }

  public initRowComponent(data, index) {
    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(this.rowComponent);

    const viewContainerRef = this.rowsContainer;

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<FsRowComponent>componentRef.instance).row = data;
    (<FsRowComponent>componentRef.instance).rowIndex = index;
    (<FsRowComponent>componentRef.instance).columns = this.config.columns;
  }

}
