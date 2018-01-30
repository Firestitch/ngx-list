import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ComponentFactoryResolver,
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { Column } from '../../models/column.model';
import { FsRowComponent } from './row/row.component';

@Component({
  selector: 'fs-list-body',
  templateUrl: 'body.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FsBodyComponent implements OnInit {
  @Input() set rows(value) {
    this._rows = value;

    this.rowsContainer.clear();
    this.initRowsComponents();

    this.cdRef.markForCheck();
  }

  get rows() {
    return this._rows;
  }

  @Input() columns: Column[] = [];
  @ViewChild('rowsContainer', { read: ViewContainerRef }) rowsContainer;

  private _rowComponent = FsRowComponent;
  private _rows;

  constructor(
    private cdRef: ChangeDetectorRef,
    private _componentFactoryResolver: ComponentFactoryResolver) {
  }

  public ngOnInit() {
    // this.config.data$.subscribe((rows) => {
    //
    // })
  }

  public initRowsComponents() {
    this.rows.forEach((row, index) => {
      this.initRowComponent(row, index)
    })
  }

  public initRowComponent(data, index) {
    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(this._rowComponent);

    const viewContainerRef = this.rowsContainer;

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<FsRowComponent>componentRef.instance).row = data;
    (<FsRowComponent>componentRef.instance).rowIndex = index;
    (<FsRowComponent>componentRef.instance).columns = this.columns;
  }

}
