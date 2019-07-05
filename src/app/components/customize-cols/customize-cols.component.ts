import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';


@Component({
  templateUrl: 'customize-cols.component.html',
})
export class CustomizeColsDialogComponent {
  public columns = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private _dialog: MatDialogRef<any>,
  ) {
    this.columns = data.columns;
  }

  public visibilityChange(event, column) {
    column.show = event.checked;
  }

  public save() {
    this._dialog.close(this.columns);
  }

  public cancel() {
    this._dialog.close();
  }
}
