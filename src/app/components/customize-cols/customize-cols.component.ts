import { ChangeDetectionStrategy, Component, inject, OnDestroy } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions } from '@angular/material/dialog';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { PersistanceController } from '../../classes/persistance-controller';
import { ColumnsColumn } from '../../models';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { NgFor, NgTemplateOutlet } from '@angular/common';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatButton } from '@angular/material/button';


@Component({
    templateUrl: './customize-cols.component.html',
    styleUrls: ['./customize-cols.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        MatDialogTitle,
        CdkScrollable,
        MatDialogContent,
        NgFor,
        MatCheckbox,
        NgTemplateOutlet,
        MatDialogActions,
        MatButton,
    ],
})
export class CustomizeColsDialogComponent implements OnDestroy {

  public columns: ColumnsColumn[] = [];
  public saveDisabled = false;
  public columnsEnabled = false;

  private _changeFn;
  private _destroy$ = new Subject();
  private _persistance = inject(PersistanceController);
  private _dialog = inject(MatDialogRef);
  private _data = inject(MAT_DIALOG_DATA);

  constructor() {
    this.columns = this._data.columns;
    this._changeFn = this._data.changeFn;
  }

  public ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  public visibilityChange(event, column) {
    column.show = event.checked;
  }

  public save() {
    const data = this.columns
      .filter((column) => !!column.name)
      .map((column) => {
        return {
          name: column.name,
          show: column.show,
        };
      });

    if(this._persistance.columnsEnabled) {
      this._persistance.setColumns(data);
    }

    this.saveDisabled = true;
    const changed = this._changeFn ? this._changeFn(data) : null;

    if (changed instanceof Observable) {
      changed
        .pipe(takeUntil(this._destroy$))
        .subscribe({
          next: () => {
            this._dialog.close(this.columns);
          },
          error: () => {
            this.saveDisabled = false;
          },
        });
    } else {
      this._dialog.close(this.columns);
    }
  }

  public cancel() {
    this._dialog.close();
  }
}
