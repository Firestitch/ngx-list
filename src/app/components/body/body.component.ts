import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ComponentFactoryResolver,
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef, DoCheck, IterableDiffer, IterableDiffers
} from '@angular/core';
import { Column } from '../../models/column.model';
import { FsRowComponent } from './row/row.component';

@Component({
  selector: '[fs-list-body]',
  templateUrl: 'body.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FsBodyComponent implements DoCheck {
  @Input() rows;
  @Input() columns: Column[] = [];
  @ViewChild('rowsContainer', { read: ViewContainerRef }) rowsContainer;

  private _rowComponent = FsRowComponent;

  private _rowsDiffer: IterableDiffer<any[]>;

  constructor(
    private cdRef: ChangeDetectorRef,
    private differs: IterableDiffers,
    private _componentFactoryResolver: ComponentFactoryResolver
  ) {
    this._rowsDiffer = differs.find([]).create(null);
  }

  public ngDoCheck() {
    if (this._rowsDiffer.diff(this.rows)) {
      // this.rowsContainer.clear();
      // this.initRowsComponents();

      this.cdRef.markForCheck();
    }
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
