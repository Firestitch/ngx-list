import { Component, ViewContainerRef } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { ExternalParamsController } from '@firestitch/filter';

import { Observable } from 'rxjs';


@Component({
  selector: 'fs-list-saved-filters',
  templateUrl: './saved-filters.component.html',
})
export class FsListSavedFiltersComponent {
  constructor(
    private _dialog: MatDialog,
    private _externalParams: ExternalParamsController,
    private _vcRef: ViewContainerRef,
  ) { }

  public get savedFiltersEnabled$(): Observable<boolean> {
    return this._externalParams.savedFiltersController.enabled$;
  }

  public showManageDialog(): void {
    // this._dialog.open(FsListManageSavedFiltersComponent, {
    //   viewContainerRef: this._vcRef,
    // });
  }
}
