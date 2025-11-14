import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  HostBinding,
  input,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';

import { Subject } from 'rxjs';
import { skip, takeUntil } from 'rxjs/operators';

import { isChildTypeRow, isGroupFooterRow, isGroupRow, Row } from '../../../../models';
import { Column } from '../../../../models/column.model';
import { SimpleRow } from '../../../../models/row/simple-row';


@Component({
  selector: '[fs-cell]',
  templateUrl: './cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgTemplateOutlet],
})
export class FsCellComponent implements OnInit, OnChanges, OnDestroy {

  @HostBinding('class.fs-list-col') public isColl = true;

  @HostBinding('attr.role') public role = 'gridcell';

  @Input() public column: Column;
  @Input() public rowIndex: number;
  public row = input<Row>();

  public cellContext: any = {};
  public cellTemplate: TemplateRef<any>;

  private _destroy$ = new Subject<void>();

  constructor() {
    effect(() => {
      const currentRow = this.row();

      if (currentRow) {
        this.cellContext.groupIndex = currentRow.index;
      }
    });
  }

  public ngOnInit() {
    this._listenRowDataChange();
    this._listenGroupOpen();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.rowIndex?.currentValue !== changes.rowIndex?.previousValue) {
      this.cellContext.index = this.rowIndex;
      this.cellContext.groupIndex = this.row().index;
    }

    if (changes.column?.currentValue !== changes.column?.previousValue) {
      this._initCellContext();
      this._initCellTemplate();
    }
  }

  public ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  private _initCellContext() {
    const currentRow = this.row();

    this.cellContext.index = this.rowIndex;

    if (currentRow) {
      if (isGroupRow(currentRow)) {
        this.cellContext.groupIndex = currentRow.index;
      } else if (isChildTypeRow(currentRow)) {
        this.cellContext.groupIndex = currentRow.index;
        this.cellContext.groupRow = currentRow.parent.data;
        this.cellContext.group = currentRow.parent.data;
      }

      if (isGroupRow(currentRow)) {
        this.cellContext.group = currentRow.data;
        this.cellContext.groupChildren = currentRow.children
          .map((child) => child.data);
      } else if (isGroupFooterRow(currentRow)) {
        this.cellContext.group = currentRow.parent.data;
        this.cellContext.groupIndex = currentRow.index;
        this.cellContext.groupChildren = currentRow.parent.children
          .map((child) => child.data);
      }
    }

    this.cellContext.column = this.column;
    if (currentRow) {
      this.cellContext.$implicit = currentRow.data;
      this.cellContext.row = currentRow.data;
      this.cellContext.value = currentRow.data[this.column.name];

      if (isGroupRow(currentRow)) {
        this.cellContext.expanded = currentRow.expanded;
      }
    }
  }

  private _listenRowDataChange() {
    const currentRow = this.row();
    if(currentRow instanceof SimpleRow) {
      currentRow.data$
        .pipe(
          skip(1),
          takeUntil(this._destroy$),
        )
        .subscribe(() => {
          this._initCellContext();
        });
    }
  }

  private _initCellTemplate() {
    const currentRow = this.row();

    if (currentRow && isGroupRow(currentRow)) {
      this.cellTemplate = this.column.groupHeaderTemplate || this.column.cellTemplate;
    } else if (currentRow && isGroupFooterRow(currentRow)) {
      this.cellTemplate = this.column.groupFooterTemplate || this.column.cellTemplate;
    } else {
      this.cellTemplate = this.column.cellTemplate;
    }
  }

  private _listenGroupOpen() {
    const currentRow = this.row();

    if (currentRow && isGroupRow(currentRow)) {
      currentRow.expanded$
        .pipe(
          takeUntil(this._destroy$),
        )
        .subscribe((status) => {
          this.cellContext.expanded = status;
        });
    }
  }
}
