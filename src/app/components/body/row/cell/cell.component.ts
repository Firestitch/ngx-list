import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input, OnChanges, OnDestroy,
  OnInit, SimpleChanges,
  TemplateRef
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Column } from '../../../../models/column.model';
import { Row } from '../../../../models/row.model';


@Component({
  selector: '[fs-cell]',
  templateUrl: 'cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FsCellComponent implements OnInit, OnChanges, OnDestroy {
  @HostBinding('class.fs-list-col') isColl = true;

  @HostBinding('attr.role') role = 'gridcell';

  @Input() public column: Column;
  @Input() public row: Row;
  @Input() public rowIndex: number;

  public cellContext: any = {};
  public cellTemplate: TemplateRef<any>;

  private _destroy$ = new Subject<void>();

  constructor() {}

  public ngOnInit() {
    this._initCellContext();
    this._initCellTemplate();

    this._listenGroupOpen();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.rowIndex) {
      this.cellContext.index = this.rowIndex;
    }
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private _initCellContext() {
    this.cellContext.index = this.rowIndex;
    this.cellContext.column = this.column;
    if (this.row) {
      this.cellContext.row = this.row.data;
      this.cellContext.value = this.row.data[this.column.name];
      this.cellContext.opened = this.row.opened;
    }
  }

  private _initCellTemplate() {
    if (this.row && this.row.isGroup) {
      this.cellTemplate = this.column.groupCellTemplate || this.column.cellTemplate;
    } else {
      this.cellTemplate = this.column.cellTemplate;
    }
  }

  private _listenGroupOpen() {
    if (this.row && this.row.isGroup) {
      this.row.opened$
        .pipe(
          takeUntil(this._destroy$),
        )
        .subscribe((status) => {
          this.cellContext.opened = status;
        })
    }
  }
}
