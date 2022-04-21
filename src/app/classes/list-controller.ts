import { ElementRef, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeFn, FilterConfig, IFilterSavedFiltersConfig, ItemType } from '@firestitch/filter';
import { FsScrollInstance, FsScrollService } from '@firestitch/scroll';
import { SelectionDialog } from '@firestitch/selection';

import { Alias, Model } from 'tsmodels';

import {
  BehaviorSubject,
  combineLatest,
  from,
  Observable,
  of,
  Subject,
  Subscription
} from 'rxjs';
import {
  catchError,
  debounceTime,
  map,
  mapTo,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { cloneDeep } from 'lodash-es';

import { SortingDirection } from '../models/column.model';

// Interfaces
import {
  FsListAfterContentInitFn,
  FsListAfterFetchFn,
  FsListConfig,
  FsListEmptyStateConfig, FsListFetchFn, FsListFetchOptions,
  FsListFetchSubscription,
  FsListGroupConfig,
  FsListLoadMoreConfig,
  FsListNoResultsConfig,
  FsListRestoreConfig,
  FsListScrollableConfig,
  FsListSelectionConfig,
  FsListTrackByFn,
  FsPaging,
  PageChange
} from '../interfaces';
import { StyleConfig } from '../models/styleConfig.model';
import { RowAction } from '../models/row-action.model';
import { ColumnsController } from './columns-controller';
import { PageChangeType } from '../enums/page-change-type.enum';
import { ActionsController } from './index';
import { DataController } from './data-controller';
import { PaginationController } from './pagination-controller';
import { SelectionController } from './selection-controller';
import { SortingController } from './sorting-controller';

import { FsListState } from '../enums/state.enum';
import { PersistanceController } from './persistance-controller';
import { ExternalParamsController } from './external-params-controller';

const SHOW_DELETED_FILTERS_KEY = '$$_show_deleted_$$';


export class List extends Model {
  @Alias() public heading: string;
  @Alias() public trackBy: string;
  @Alias() public subheading: string;
  @Alias() public inlineFilters: any;
  // @Alias('actions', Action) public actions: Action[];
  @Alias('rowActions') public rowActionsRaw: any[];
  public groupActionsRaw: any[];
  @Alias('rowClass') public rowClass;
  @Alias() public rowEvents: any;
  @Alias() public restore: FsListRestoreConfig;
  @Alias() public columnTemplates: any;
  @Alias() public persist: boolean;
  @Alias() public filters = [];
  @Alias('filterInit') public filterInitCb: ChangeFn;
  @Alias('filterChange') public filterChangeCb: ChangeFn;
  @Alias() public savedFilters: IFilterSavedFiltersConfig;
  @Alias() public scrollable: FsListScrollableConfig | false = false;
  @Alias() public noResults: FsListNoResultsConfig;
  @Alias() public emptyState: FsListEmptyStateConfig;
  // @Alias() public initialFetch = true; //TODO fixme
  @Alias('fetch') public fetchFn: FsListFetchFn;
  @Alias('afterFetch') public afterFetchFn: FsListAfterFetchFn;
  public afterContentInit: FsListAfterContentInitFn;
  // @Alias('rows') private _rows: any;

  public initialized$ = new BehaviorSubject(false);
  public loading$ = new BehaviorSubject(false);

  // public operation: Operation;

  public hasRowActions;
  public paging = new PaginationController();

  public columns = new ColumnsController();
  public actions = new ActionsController();
  public dataController = new DataController();
  public sorting = new SortingController();
  public externalParams: ExternalParamsController;
  public selection: SelectionController;

  public filterConfig: FilterConfig = null;

  public fetch$ = new Subject<FsListFetchSubscription | void>();
  public fetchComplete$ = new Subject<void>();
  public filtersReady$ = new Subject<void>();

  public status = true;
  public chips = false;
  public filterInput = true;
  public queryParam = false;
  public restoreMode = false;

  public initialFetch = true;

  // Empty state
  public emptyStateEnabled = false;
  public emptyStateTemplate: TemplateRef<any>;

  public fsScrollInstance: FsScrollInstance;

  public onDestroy$ = new Subject();

  private readonly _filtersQuery = new BehaviorSubject<Record<string, any>>(null);
  private readonly _headerConfig: StyleConfig;
  private readonly _groupCellConfig: StyleConfig;
  private readonly _cellConfig: StyleConfig;
  private readonly _footerConfig: StyleConfig;

  private _fsScrollSubscription: Subscription;

  constructor(
    private el: ElementRef,
    private config: FsListConfig = {},
    private fsScroll: FsScrollService,
    private selectionDialog: SelectionDialog,
    private router: Router,
    private route: ActivatedRoute,
    private persistance: PersistanceController,
    private inDialog: boolean,
  ) {
    super();
    this._fromJSON(config);

    this.initialize(config);

    this._headerConfig = new StyleConfig(config.header);
    this._groupCellConfig = new StyleConfig(config.cell);
    this._cellConfig = new StyleConfig(config.cell);
    this._footerConfig = new StyleConfig(config.footer);

    this.initialized$.next(true);

    this.subscribe();

    if (this.initialFetch) {
      this.dataController.setOperation(FsListState.Load);
      this.fetch$.next();
    }

  }

  public get hasSavedFilters(): boolean {
    return !!this.filterConfig.savedFilters;
  }

  public get filtersQuery(): Record<string, any> {
    return this._filtersQuery.getValue();
  }

  public get filtersQuery$(): Observable<Record<string, any>> {
    return this._filtersQuery.asObservable();
  }

  public fetchRemote(query) {
    const options: FsListFetchOptions = {
      state: this.dataController.operation,
    };

    const result: any = this.fetchFn(query, options);

    return result instanceof Promise ? from(result) : result;
  }

  // public loadLocal() {
  //   this.paging.updatePagingManual(this._rows);
  //   const from = (this.paging.page - 1) * this.paging.limit;
  //   const to = (this.paging.page === 1) ? this.paging.limit : this.paging.limit * this.paging.page;
  //   const sliceOfRows = this._rows.slice(from, to);
  //   this.data$.next(sliceOfRows);
  // }

  /**
   * Transform templates for using
   * @param templates
   */
  public tranformTemplatesToColumns(templates) {
    const defaultConfigs = {
      header: this._headerConfig,
      groupCell: this._groupCellConfig,
      cell: this._cellConfig,
      footer: this._footerConfig,
    };

    this.columns.setDefaults(defaultConfigs);
    this.columns.initializeColumns(templates);

    // Set sortBy default column
    this.sorting.clearSortableColumns();
    this.columns.columns
      .filter((column) => column.sortable && column.visible)
      .forEach((column) => {
        this.sorting.addSortableColumn(column);
      });

    // Default sort by
    const externalSorting = this.externalParams.externalSorting;
    const initialSortConfig = externalSorting || this.config.sort;
    this.sorting.initialSortBy(initialSortConfig);

    if (externalSorting && !this.sorting.isDefined) {
      this.externalParams.clearSortingParams();

      console.warn('Not able to restore persisted sorting params.', externalSorting);
    }

    this.initFilters();
    this.initInfinityScroll();
  }

  public reload() {
    this.loading$.next(true);

    this.dataController.setOperation(FsListState.Reload);

    if (this.fsScrollInstance) {
      this.paging.resetPaging();
      this.dataController.clearRows();
      this.fsScrollInstance.reload();
    } else {
      this.fetch$.next();
    }
  }

  /**
   * Watch page changes
   */
  public subscribe() {
    this.paging.pageChanged$
      .pipe(
        takeUntil(this.onDestroy$),
      )
      .subscribe((event: PageChange) => {
        this.dataController.setOperation(FsListState.PageChange);

        // Remove all rows if limits was changed
        if (event.type === PageChangeType.LimitChanged && this.paging.hasPageStrategy) {
          this.dataController.clearRows();
        }

        if (this.paging.hasOffsetStrategy) {
          this.paging.updatePagination();

          if (this.selection) {
            this.selection.updateVisibleRecordsCount(this.paging.getVisibleRecords());
            this.selection.updateTotalRecordsCount(this.paging.records);
            this.selection.pageChanged(this.scrollable);
          }
        }

        if (!this.scrollable && !this.paging.loadMoreEnabled) {

          const contains = [].slice.call(document.querySelectorAll('.cdk-overlay-container')).some(overlay => {
            return this.el.nativeElement.contains(overlay);
          });

          let el = this.el.nativeElement;

          if (!contains) {
            const rect = this.el.nativeElement.getBoundingClientRect();
            if ((rect.top + window.pageYOffset) < window.innerHeight) {
              el = document.body;
            }
          }

          this.fetchComplete$.asObservable()
          .pipe(
            take(1),
            takeUntil(this.onDestroy$)
          )
          .subscribe(() => {
            el.scrollIntoView({ behavior: 'smooth' });
          });
        }

        this.fetch$.next();
      });

    this.sorting.sortingChanged$
      .pipe(
        takeUntil(this.onDestroy$),
      )
      .subscribe(() => {
        this.dataController.setOperation(FsListState.Sort);
        this.paging.page = 1;

        if (this.fsScrollInstance) {
          this.dataController.clearRows();
          this.fsScrollInstance.reload();
        } else {
          this.fetch$.next();
        }
      });

    this.listenRowsRemove();
    this.listenFetch();
  }

  public getData(trackBy?: FsListTrackByFn) {
    let rowsData = this.dataController
      .visibleRowsData;

    if (trackBy) {
      rowsData = rowsData
        .filter(trackBy);
    }

    return rowsData
      .map((data) => {
        return cloneDeep(data);
      });
  }

  public hasData(trackBy: FsListTrackByFn) {
    return this.dataController.visibleRowsData.some(trackBy);
  }

  /**
   * Toggle group mode status
   * @param value
   */
  public groupEnabled(value: boolean) {
    if (this.dataController.groupEnabled !== value) {
      this.dataController.groupEnabled = value;

      // Commented out because Ray wants to change group status in fetch map pipe
      // and it triggers extra requests
      // this.reload();
    }
  }

  public destroy() {
    if (this._fsScrollSubscription) {
      this._fsScrollSubscription.unsubscribe();
    }

    if (this.paging) {
      this.paging.destroy();
    }

    if (this.sorting) {
      this.sorting.destroy();
    }

    if (this.selection) {
      this.selection.destroy();
    }

    if (this.filterConfig) {
      this.filterConfig = null;
    }

    if (this.externalParams) {
      this.externalParams.destroy()
    }

    this.columns.destroy();

    this.onDestroy$.next();
    this.onDestroy$.complete();

    this.dataController.destroy();
  }

  /**
   * Do initialization of table
   * @param config
   */
  private initialize(config: FsListConfig) {
    this.columns.initConfig(config.column);
    this.initDefaultOptions(config);
    this.initRestore();
    this.initActions(config.actions);
    this.initPaging(config.paging, config.loadMore);
    this.initSelection(config.selection, this.selectionDialog);
    this.initGroups(config.group);
    this.initExternalParamsController();

    this.initializeData();
  }

  /**
   * Just init options by default it it wasn't specified
   * @param config
   */
  private initDefaultOptions(config) {
    // We should prevent initial fetch in cases when it will be fetched in any case
    // As ex. scrollable or filter will do fetch in any cases
    if (config.initialFetch === false || config.scrollable) { // TODO fixme after tsmodel version update
      this.initialFetch = false;
    }
    if (config.status === false) {
      this.status = false;
    }
    if (config.chips) {
      this.chips = config.chips;
    }
    if (config.filterInput === false) {
      this.filterInput = false;
    }

    if (this.inDialog) {
      this.queryParam = false;
    } else {
      this.queryParam = (config.queryParam === void 0)
        ? true
        : config.queryParam;
    }

    if (config.sorts) {
      this.sorting.initFakeColumns(config.sorts);
    }
    if (!config.trackBy) {
      this.trackBy = 'id';
    }

    if (config.afterContentInit) {
      this.afterContentInit = () => {
        config.afterContentInit(this.paging.query, this.dataController.visibleRows);
      }
    }
  }

  /**
   * Init restore row action and append Show Deleted option into filters
   */
  private initRestore() {
    if (this.restore) {
      const restoreAction = new RowAction({
        label: this.restore.menuLabel || 'Restore',
        menu: true,
        click: (row) => { this.restoreClick(this.restore.click, row) }, // TODO fix me, move to special file
        restore: true
      });

      if (!this.rowActionsRaw) {
        this.rowActionsRaw = [];
      }

      this.rowActionsRaw.push(restoreAction);

      if (!this.filters) {
        this.filters = [];
      }

      if (this.restore.filter !== false) {
        this.filters.push({
          name: SHOW_DELETED_FILTERS_KEY,
          type: ItemType.Checkbox,
          label: this.restore.filterLabel || 'Show Deleted'
        });
      }
    }

  }

  /**
   * Init paging
   * @param pagingConfig
   * @param loadMore
   */
  private initPaging(pagingConfig: FsPaging | false, loadMore: FsListLoadMoreConfig | boolean) {
    this.paging.initWithConfig(pagingConfig, loadMore, !!this.scrollable);
  }

  /**
   * Split actions by categories
   */
  private initActions(actions) {
    if (actions) {
      this.actions.setActions(actions);
    }

    this.hasRowActions =
      (this.rowActionsRaw && this.rowActionsRaw.length > 0)
      || (this.groupActionsRaw && this.groupActionsRaw.length > 0);
  }

  private initSelection(
    selectionConfig: FsListSelectionConfig,
    selectionDialog: SelectionDialog,
  ) {
    if (selectionConfig) {
      this.selection = new SelectionController(selectionConfig, this.trackBy, selectionDialog);
      this.selection.setRowsCallback(() => this.dataController.visibleRows);
    }
  }

  private initializeData() {
    this.dataController.setAdditionalConfigs({
      scrollable: !!this.scrollable,
      loadMoreEnabled: this.paging.loadMoreEnabled
    });
  }

  private initGroups(groupConfig: FsListGroupConfig) {
    if (groupConfig) {
      this.dataController.setGroupConfig(groupConfig);
      this.groupActionsRaw = groupConfig.actions;
    }
  }

  private initExternalParamsController() {
    this.externalParams = new ExternalParamsController(
      this.router,
      this.route,
      this.persistance,
      this.paging,
      this.sorting,
      this.queryParam
    );
  }

  /**
   * Subscribe to fetch$ event with debounce
   */
  private listenFetch() {
    let fetch$ = this.fetch$.asObservable();

    // Should wait until saved filters not loaded
    if (!!this.filters) {
      fetch$ = combineLatest([fetch$, this.filtersReady$])
        .pipe(
          map(([params]) => params),
        );
    }

    fetch$
      .pipe(
        debounceTime(50),
        tap(() => {
          this.loading$.next(true);
        }),
        tap(() => {
          this.selection?.closeSelectionDialog();
        }),
        map((params: FsListFetchSubscription) => {
          let query = Object.assign({}, this.filtersQuery);

          if (this.paging.hasOffsetStrategy && params && params.loadOffset) {
            query = Object.assign(query, this.paging.loadDeletedOffsetQuery);
          } else {
            const allRecordsRangeNeeded = (this.initialFetch
                || this.dataController.operation === FsListState.Reload
              ) && this.paging.loadMoreEnabled;

            if (allRecordsRangeNeeded) {
              query = Object.assign(query, this.paging.loadMoreQuery);
            } else {
              query = Object.assign(query, this.paging.query);
            }
          }

          if (this.sorting.sortingColumn) {
            Object.assign(
              query,
              {
                order: `${this.sorting.sortingColumn.name},${this.sorting.sortingColumn.direction}`
              }
            )
          }

          return query;
        }),
        switchMap((query) => {
          if (this.columns.loadFnConfigured && !this.columns.columnsFetched) {
            return this.columns.loadRemoteColumnConfigs()
              .pipe(
                mapTo(query)
              );
          } else {
            return of(query);
          }
        }),
        switchMap((query) => {
          if (this.columns.configured) {
            Object.assign(
              query,
              {
                columns: this.columns.visibleColumnsNames,
              }
            )
          }

          return combineLatest([of(query), this.fetchRemote(query)]);
        }),
        catchError((error, source$) => {
          console.error(error);

          return source$;
        }),
        takeUntil(this.onDestroy$),
      )
      .subscribe((response) => {
        this.initialFetch = false;

        this.completeFetch(response);
      });
  }

  private listenRowsRemove() {
    this.dataController.rowsRemoved$
      .pipe(
        takeUntil(this.onDestroy$),
      )
      .subscribe((rows: any[]) => {
        if (this.paging.enabled) {

          const removedCount = rows.length;

          if (this.paging.hasPageStrategy) {
            this.noDataPaginationUpdate(removedCount);
          } else {
            // Fetch more if has something for fetch
            if (this.dataController.hasData || this.paging.hasNextPage) {
              this.dataController.setOperation(FsListState.LoadMore);

              this.paging.removeRows(removedCount);
              this.fetch$.next({ loadOffset: true });
            } else {
              this.noDataPaginationUpdate(removedCount);
            }
          }
        }

        // Remove from selection
        if (this.selection) {
          rows.forEach((row) => {
            this.selection.removeRow(row.data);
          });
        }
      });
  }

  private initInfinityScroll() {
    if (this.fsScrollInstance) {
      return;
    }

    if (this.scrollable) {
      // Scrollable status by default
      if (this.scrollable.status === void 0) {
        this.scrollable.status = true;
      }


      this.fsScroll
        .component(this.scrollable.name)
        .pipe(
          takeUntil(this.onDestroy$)
        )
        .subscribe((fsScrollInstance: FsScrollInstance) => {
          this.fsScrollInstance = fsScrollInstance;
          this._fsScrollSubscription = fsScrollInstance
            .subscribe(() => {
              let startLoading = false;
              const operation = this.dataController.operation;

              // Initial loading if initialFetch equals false
              if (!this.initialFetch
                && !this.paging.initialized
                && operation !== FsListState.Reload
              ) {

                this.dataController.setOperation(FsListState.Load);
                startLoading = true;

              } else if (
                operation === FsListState.Reload ||
                operation === FsListState.Filter ||
                operation === FsListState.Sort
              ) {
                startLoading = true;
              } else if (this.paging.initialized && this.paging.hasNextPage) {
                // Loading if content has been scrolled
                startLoading = true;
                this.dataController.setOperation(FsListState.Load);
                this.paging.goNext();
              }

              if (startLoading) {
                this.fetch$.next();
                fsScrollInstance.loading();
              }
          });

          this.dataController.remoteRowsChange$
            .pipe(
              takeUntil(this.onDestroy$),
            )
            .subscribe(() => {
              fsScrollInstance.loaded();
          });
        });
    }
  }

  /**
   * Update and watch filter changes
   */
  private initFilters() {
    if (this.filterConfig) {
      return;
    }

    // Merge sorting and fake sorting cols
    // Fake sorting cols it's cols which don't represented in table cols, like abstract cols
    const sortValues =
      [
        ...this.sorting.sortingColumns,
        ...this.sorting.fakeSortingColumns
      ].reduce((acc, column) => {

        const sortingItem = {
          name: column.title,
          value: column.name,
          default: this.sorting.sortingColumn && this.sorting.sortingColumn.name === column.name
        };

        acc.push(sortingItem);
        return acc;
      }, []);

    const sortConfig = this.sorting.sortingColumn
      ? { value: this.sorting.sortingColumn.name, direction: this.sorting.sortingColumn.direction}
      : null;

    // Config
    this.filterConfig = {
      persist: this.persist,
      items: this.filters || [],
      savedFilters: this.savedFilters,
      inline: this.inlineFilters,
      actions: this.actions.actions,
      queryParam: this.queryParam,
      sorts: sortValues,
      sort: sortConfig,
      chips: this.chips,
      init: this.filterInit.bind(this),
      change: this.filterChange.bind(this),
      reload: this.reload.bind(this),
      sortChange: this.filterSort.bind(this),
    };
  }

  /**
   * Callback when Filter has been initialized
   * @param filters
   */
  private filterInit(filters) {
    if (this.filterInitCb) {
      this.filterInitCb(filters);
    }

    this._filtersQuery.next(filters);

    this.checkRestoreFilter();
  }

  /**
   * Callback when Filter has been changed
   * @param filterQuery
   * @param filterSort
   */
  private filterChange(filterQuery, filterSort) {
    if (this.filterChangeCb) {
      this.filterChangeCb(filterQuery, filterSort);
    }

    this._filtersQuery.next(filterQuery);

    this.restoreMode = false;

    // Restore option
    this.checkRestoreFilter();

    if (this.restore && this.restore.reload) {
      this.reload();
    }

    this.dataController.setOperation(FsListState.Filter);

    // Reset paging for request with correct offset
    this.paging.resetPaging();

    if (this.fsScrollInstance) {
      this.dataController.clearRows();
      this.fsScrollInstance.reload();
    } else {
      this.fetch$.next();
    }
  }

  private checkRestoreFilter() {
    // Restore option
    if (this.restore && this.filtersQuery[SHOW_DELETED_FILTERS_KEY]) {
      delete this.filtersQuery[SHOW_DELETED_FILTERS_KEY];

      Object.assign(this.filtersQuery, this.restore.query);

      this.restoreMode = true;
    }
  }

  // Callback when Filter sort has been changed
  private filterSort(filterQuery, filterSort) {
    if (filterSort) {
      this.sorting.sortByColumnWithName(filterSort.value);

      const sortDirection = filterSort.direction === 'asc' ? SortingDirection.asc : SortingDirection.desc;
      this.sorting.sortDirection(sortDirection);
    } else {
      // FIXME need to be refactored...
      this.sorting.sortingColumn = void 0;
      this.reload();
    }
  }

  private completeFetch([query, response]) {

    if (!this.paging.page) {
      this.paging.page = 1;
    }

    if (response.paging) {
      const displayed = (Array.isArray(response.data) && response.data.length) || 0;
      this.paging.updatePaging(
        response.paging,
        displayed,
        this.dataController.operation === FsListState.LoadMore
      );
    } else if (this.paging.enabled) {
      console.log(
        '%c FsList Warning ',
        'color: white; background-color: #ffcc0b',
        'Pagination does not configured properly. ' +
        'Pagination is enabled, but http response does not contain "paging" field. ' +
        'You have to set "paging: false" in config or add "paging" field to response.'
      );
    }

    /// must be before selection, because seletion use records
    this.dataController.setRowsFromResponse(response.data);
    ///

    // Update selection params
    if (this.selection) {

      if (this.paging.enabled) {
        this.selection.pageChanged(this.scrollable);
        this.selection.updateVisibleRecordsCount(this.paging.getVisibleRecords());
        this.selection.updateTotalRecordsCount(this.paging.records);
      } else {
        const count = response.paging && response.paging.records
          || Array.isArray(response.data) && response.data.length;

        this.selection.updateVisibleRecordsCount(count);
        this.selection.updateTotalRecordsCount(count);
      }

      this.selection.selectedRowsIntersection(this.dataController.visibleRowsData);
    }

    if (this.emptyState?.validate && this.emptyStateTemplate) {
      this.emptyStateEnabled = this.emptyState.validate(query, cloneDeep(this.dataController.visibleRowsData));
    }

    if (this.afterFetchFn) {
      this.afterFetchFn(query, this.dataController.visibleRowsData);
    }

    this.fetchComplete$.next();
    this.loading$.next(false);
  }

  /**
   * Will do some actions if you removed item and item was last on his own page
   *
   * Ex: if list has 3 pages and on third page you have only one item. And you just deleted this item.
   * You must go to second page, but if it was last page and you can't go back -> just reload
   *
   * @param deletedCount
   */
  private noDataPaginationUpdate(deletedCount) {
    if (!this.dataController.hasData) {
      if (this.paging.page > 1) {
        this.paging.goToPage(this.paging.page - 1 || 1);
      } else {
        this.reload();
      }
    }

    this.paging.records -= deletedCount;
    this.paging.updatePagination();

    if (this.dataController.hasData && this.selection) {
      this.selection.updateVisibleRecordsCount(this.dataController.visibleRowsCount);
      this.selection.updateTotalRecordsCount(this.paging.records);
    }
  }

  /**
   * Temporary solution, will do auto subscribe if was returned Observable.
   *
   * TODO: MOVE THIS PEACE OF CODE TO SPECIAL PLACE
   *
   * @param restoreClickCallback
   * @param row
   */
  private restoreClick(restoreClickCallback, row) {
    const restoreClickResult = restoreClickCallback(row);

    if (restoreClickResult instanceof Observable) {
      restoreClickResult
        .pipe(
          take(1),
          takeUntil(this.onDestroy$),
        )
        .subscribe({
          next: () => this.reload(),
          error: () => {},
        })
    }
  }
}
