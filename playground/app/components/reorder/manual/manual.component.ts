import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, ViewChild } from '@angular/core';

import { FsApi } from '@firestitch/api';
import { FsListComponent, FsListConfig, ReorderPosition } from '@firestitch/list';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


@Component({
  selector: 'manual-reorder',
  templateUrl: './manual.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManualReorderComponent implements OnInit {

  @ViewChild(FsListComponent, { static: true })
  public list: FsListComponent;

  public config: FsListConfig = null;

  private _notReordering$ = new BehaviorSubject<boolean>(true);
  private _destroyRef = inject(DestroyRef);

  constructor(
    private _fsApi: FsApi,
  ) { }

  public ngOnInit() {
    this.list.reorderController.enabled$
      .pipe(
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe((enabled) => {
        this._notReordering$.next(!enabled);
      });

    this.config = {
      status: true,
      persist: false,
      heading: 'Reorder',
      subheading: 'With Manual strategy and positioned to right',
      reorder: {
        position: ReorderPosition.Right,
        toggle: true,
        start: () => {
          console.log('reorder start');

          return of(null).pipe(delay(1000));
        },
        moved: (data) => {
          console.log('reorder moved', data);
        },
        done: (data) => {
          console.log('reorder done', data);

          return of(null).pipe(delay(1000));
        },
      },
      fetch: (query) => {
        return this._fsApi.get('dummy', query)
          .pipe(
            map((response) => ({ data: response.objects, paging: response.paging })),
          );
      },
    };
  }
  
  public get notReordering$(): Observable<boolean> {
    return this._notReordering$.asObservable();
  }

}
