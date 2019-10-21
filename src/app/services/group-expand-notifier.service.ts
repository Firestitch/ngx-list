import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Injectable()
export class GroupExpandNotifierService implements OnDestroy {

  private _expandStatusChanged$ = new Subject();
  private _destroy$ = new Subject();

  get expandStatusChange$() {
    return this._expandStatusChanged$.pipe(
      takeUntil(this._destroy$)
    )
  }
  public toggleExpandStatus(rowData: any) {
    this._expandStatusChanged$.next(rowData);
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
