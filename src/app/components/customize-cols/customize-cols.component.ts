import { ChangeDetectionStrategy, Component, Inject, OnDestroy } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ColumnsColumn } from '../../models';


@Component({
  templateUrl: './customize-cols.component.html',
  styleUrls: ['./customize-cols.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomizeColsDialogComponent implements OnDestroy {

  public columns: ColumnsColumn[] = [];
  public saveDisabled = false;
  private _changeFn;
  private _destroy$ = new Subject();

  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private _dialog: MatDialogRef<any>,
  ) {
    this.columns = data.columns;
    this._changeFn = data.changeFn;
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
