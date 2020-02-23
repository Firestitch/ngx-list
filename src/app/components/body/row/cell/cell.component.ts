import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  TemplateRef,
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

  constructor(protected _cdRef: ChangeDetectorRef) {
    //this._cdRef.detach();
  }

  public ngOnInit() {
    this._initCellContext();
    this._initCellTemplate();

    this._listenGroupOpen();

    this._cdRef.detectChanges();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.rowIndex) {
      this.cellContext.index = this.rowIndex;
    }

    this._cdRef.detectChanges();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private _initCellContext() {
    this.cellContext.index = this.rowIndex;

    if (this.row) {
      if (this.row.isGroup) {
        this.cellContext.groupIndex = this.row.index;
      } else if (this.row.isChild) {
        this.cellContext.groupChildIndex = this.row.index;
      }
    }

    this.cellContext.column = this.column;
    if (this.row) {
      this.cellContext.row = this.row.data;
      this.cellContext.value = this.row.data[this.column.name];
      this.cellContext.expanded = this.row.expanded;
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
      this.row.expanded$
        .pipe(
          takeUntil(this._destroy$),
        )
        .subscribe((status) => {
          this.cellContext.expanded = status;
        })
    }
  }
}
