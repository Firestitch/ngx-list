import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  DoCheck,
  ElementRef,
  EventEmitter,
  Input,
  IterableDiffer,
  IterableDiffers,
  OnDestroy,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

import { Subject } from 'rxjs';

import { Column } from '../../models/column.model';
import { ReorderController } from '../../classes/reorder-controller';
import { SelectionController } from '../../classes/selection-controller';
import { Row } from '../../models/row';

import { FsRowComponent } from './row/row.component';


@Component({
  selector: '[fs-list-body]',
  templateUrl: 'body.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FsBodyComponent implements DoCheck, OnDestroy {
  @Input() rows: Row[];
  @Input() columns: Column[] = [];
  @Input() hasFooter = false;
  @Input() rowActionsRaw: any[] = [];
  @Input() groupActionsRaw: any[] = [];
  @Input() rowEvents = {};
  @Input() rowClass;
  @Input() hasRowActions = false;
  @Input() selection: SelectionController;
  @Input() restoreMode = false;
  @Input() rowRemoved: EventEmitter<any>;

  @ViewChild('rowsContainer', { read: ViewContainerRef, static: true }) rowsContainer;
  @ContentChild(FsRowComponent, { read: TemplateRef, static: true })
  headerTemplate: TemplateRef<any>;

  private _rowsDiffer: IterableDiffer<any>;

  private _destroy$ = new Subject();

  constructor(
    public reorderContoller: ReorderController,
    private el: ElementRef,
    private cdRef: ChangeDetectorRef,
    private differs: IterableDiffers,
  ) {
    this._rowsDiffer = differs.find([]).create(null);
  }

  public ngDoCheck() {
    if (this._rowsDiffer.diff(this.rows)) {
      this.cdRef.markForCheck();
    }
  }

  public ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  // /**
  //  * Track By for improve change detection
  //  * @param index
  //  * @param item
  //  */
  // public trackByFn(index, item) {
  //   // TODO improve with track by id
  //   return index;
  // }
}
