import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { PaginationController } from './pagination-controller';


export class RouterQueryListenerController {

  protected _pageChangedSubscription: Subscription;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _paginator: PaginationController,
  ) {
    if (this._paginator.enabled && !this._paginator.infinityScrollEnabled) {
      this._initPaginationWithRouteParams();
      this._listenPaginatorChanges();
    }
  }

  public destroy() {
    if (this._pageChangedSubscription) {
      this._pageChangedSubscription.unsubscribe();
    }
  }

  private _listenPaginatorChanges() {
    this._pageChangedSubscription = this._paginator.pageChanged
      .subscribe(() => {
        if (this._paginator.page === 1) {
          this._router.navigate([], {
            replaceUrl: true,
            relativeTo: this._route,
            queryParams: {
              page: null,
              limit: null,
            },
            queryParamsHandling: 'merge'
          }).then(() => {});

        } else {
          this._router.navigate([], {
            relativeTo: this._route,
            queryParams: this._paginator.queryPageStrategy,
            queryParamsHandling: 'merge',
          }).then(() => {});
        }
      });
  }

  private _initPaginationWithRouteParams() {
    const params = this._route.snapshot.queryParams;

    if (params) {
      const page = +params.page;
      const limit = +params.limit;

      if (limit) {
        this._paginator.setLimit(limit);
      }

      if (page) {
        this._paginator.goToPage(page);
      }
    }
  }
}
