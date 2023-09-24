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
import { Row } from '../../../../models/row';


@Component({
  selector: '[fs-cell]',
  templateUrl: 'cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FsCellComponent implements OnInit, OnChanges, OnDestroy {
  @HostBinding('class.fs-list-col') isColl = true;

  @HostBinding('attr.role') role = 'gridcell';

  @Input() public column: Column;
  @Input() public row: any; // tmp
  @Input() public rowIndex: number;

  public cellContext: any = {};
  public cellTemplate: TemplateRef<any>;

  private _destroy$ = new Subject<void>();

  constructor() {}

  public ngOnInit() {
    this._listenGroupOpen();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.rowIndex?.currentValue !== changes.rowIndex?.previousValue) {
      this.cellContext.index = this.rowIndex;
    }

    if (changes.column?.currentValue !== changes.column?.previousValue) {
      this._initCellContext();
      this._initCellTemplate();
    }
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
      } else if (this.row.isChild || this.row.isGroupFooter) {
        this.cellContext.groupIndex = this.row.index;
        this.cellContext.groupRow = this.row.parent.data;
        this.cellContext.group = this.row.parent.data;
      }

      if (this.row.isGroup) {
        this.cellContext.group = this.row.data;
        this.cellContext.groupChildren = this.row.children
         .map((child) => child.data);
      } else if(this.row.isGroupFooter) {
        this.cellContext.group = this.row.parent.data;
        this.cellContext.groupIndex = this.row.index;
        this.cellContext.groupChildren = this.row.parent.children
          .map((child) => child.data);
      }
    }

    this.cellContext.column = this.column;
    if (this.row) {
      this.cellContext.$implicit = this.row.data;
      this.cellContext.row = this.row.data;
      this.cellContext.value = this.row.data[this.column.name];
      this.cellContext.expanded = this.row.expanded;
    }
  }

  private _initCellTemplate() {
    if (this.row?.isGroup) {
      this.cellTemplate = this.column.groupHeaderTemplate || this.column.cellTemplate;
    } else if (this.row?.isGroupFooter) {
      this.cellTemplate = this.column.groupFooterTemplate || this.column.cellTemplate;
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
