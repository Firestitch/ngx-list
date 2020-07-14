import { ActivatedRoute, Router } from '@angular/router';

import { merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { PaginationController } from '../classes/pagination-controller';
import { SortingController } from '../classes/sorting-controller';
import { PersistanceController } from './persistance-controller';

import { FsListSortConfig } from '../interfaces';
import {
  ExternalParams,
  ExternalQueryPagination,
  ExternalQuerySorting,
} from '../interfaces/external-params.interface';


export class ExternalParamsController {

  private _externalParams: ExternalParams = {
    page: null,
    limit: null,
    sortName: null,
    sortDirection: null,
  };

  private _destroy$ = new Subject<void>();

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _persistance: PersistanceController,
    private _paginator: PaginationController,
    private _sorting: SortingController,
    private _queryParamsEnabled: boolean,
  ) {
    this.initialize();
  }

  public get externalSorting(): FsListSortConfig {
    if (this._sortName && this._sortDirection) {
      return {
        value: this._sortName,
        direction: this._sortDirection,
      }
    } else {
      return null;
    }
  }

  private get _page(): number {
    return this._externalParams.page;
  }

  private get _limit(): number {
    return this._externalParams.limit;
  }

  private get _sortName(): string {
    return this._externalParams.sortName;
  }

  private get _sortDirection(): 'asc' | 'desc' {
    return this._externalParams.sortDirection;
  }

  public initialize() {

    // Restore from localStorage parameters if persistance enabled
    if (this._persistance.enabled) {
      this._restorePaginationParams(this._persistance.getDataForScope('paging'));
      this._restoreSortingParams(this._persistance.getDataForScope('sorting'));
    }

    // Restore from queryParams and override if persistance already had values for those params
    if (this._queryParamsEnabled) {
      this._restorePaginationParams(this._route.snapshot.queryParams as ExternalQueryPagination);
      this._restoreSortingParams(this._route.snapshot.queryParams as ExternalQuerySorting);
    }

    // Set initial pagination params
    // The same initial, but for sorting placed in list-controller "tranformTemplatesToColumns" method
    if (this._paginator.enabled && !this._paginator.infinityScrollEnabled) {
      if (this._limit) {
        this._paginator.setLimit(this._limit);
      }

      if (this._page) {
        this._paginator.goToPage(this._page);

      }
    }

    // Update pagination in stores
    this._updatePaginationParams(this._paginator.queryPageStrategy);

    this._listenPaginatorChanges();
    this._listenSortingChanges();
  }

  public destroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private _restorePaginationParams(values: ExternalQueryPagination) {
    if (values?.page) {
      this._externalParams.page = +values.page;
    }

    if (values?.limit) {
      this._externalParams.limit = +values.limit;
    }
  }

  private _restoreSortingParams(values: ExternalQuerySorting) {
    if (values?.sortName) {
      this._externalParams.sortName = values.sortName;
    }

    if (values?.sortDirection) {
      this._externalParams.sortDirection = values.sortDirection;
    }
  }

  private _listenPaginatorChanges() {
    this._paginator.pageChanged
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this._updatePaginationParams(this._paginator.queryPageStrategy);
      });
  }

  private _listenSortingChanges() {
    merge(
      this._sorting.initialized$,
      this._sorting.sortingChanged$,
    )
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        const sorting = this._sorting.value;

        if (sorting) {
          this._updateSortingParams(sorting.value, sorting.direction);
        } else {
          this._updateSortingParams(null, null);
        }
      })
  }

  private _updateSortingParams(name: string, direction: string) {
    if (this._queryParamsEnabled) {
      // FIXME
      setTimeout(() => {
        this._router.navigate([], {
          replaceUrl: true,
          relativeTo: this._route,
          queryParams: {
            sortName: name,
            sortDirection: direction,
          },
          queryParamsHandling: 'merge'
        }).then(() => {});
      });
    }

    if (this._persistance.enabled) {
      if (name && direction) {
        this._persistance.setDataForScope('sorting', { sortName: name, sortDirection: direction});
      } else {
        this._persistance.setDataForScope('sorting', null);
      }
    }
  }

  private _updatePaginationParams(params) {
    if (this._queryParamsEnabled) {
      setTimeout(() => {
        this._router.navigate([], {
          replaceUrl: true,
          relativeTo: this._route,
          queryParams: params,
          queryParamsHandling: 'merge'
        }).then(() => {});
      });
    }

    if (this._persistance.enabled) {
      this._persistance.setDataForScope('paging', params);
    }
  }
}
