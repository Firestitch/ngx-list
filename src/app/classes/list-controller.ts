import { ElementRef, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {
  ChangeFn, FilterConfig, FsFilterAutoReload, IFilterSavedFiltersConfig, ItemType,
} from '@firestitch/filter';
import { SelectionDialog } from '@firestitch/selection';

import {
  BehaviorSubject, combineLatest, EMPTY, from, Observable, of, Subject,
} from 'rxjs';
import {
  catchError, debounceTime,
  delay,
  map, mapTo, shareReplay, switchMap, take, takeUntil, tap,
} from 'rxjs/operators';

import { cloneDeep } from 'lodash-es';

import { PageChangeType } from '../enums/page-change-type.enum';
import { FsListState } from '../enums/state.enum';
import {
  FsListAfterContentInitFn,
  FsListAfterFetchFn,
  FsListAfterInitFn,
  FsListBeforeFetchFn,
  FsListConfig,
  FsListEmptyStateConfig,
  FsListFetchFn,
  FsListFetchOptions,
  FsListFetchSubscription,
  FsListGroupConfig,
  FsListLoadMoreConfig,
  FsListNoResultsConfig,
  FsListPersitance,
  FsListRestoreConfig,
  FsListRowAction,
  FsListRowActionGroup,
  FsListSelectionConfig,
  FsListTrackByFn,
  FsPaging,
  PageChange,
} from '../interfaces';
import { SortingDirection } from '../models/column.model';
import { StyleConfig } from '../models/styleConfig.model';

import { ColumnsController } from './columns-controller';
import { DataController } from './data-controller';
import { ExternalParamsController } from './external-params-controller';
import { ActionsController } from './index';
import { PaginationController } from './pagination-controller';
import { PersistanceController } from './persistance-controller';
import { SelectionController } from './selection-controller';
import { SortingController } from './sorting-controller';

const showDeletedFilterKey = 'showDeleted';


export class List {

  public heading: string;
  public trackBy: string;
  public subheading: string;
  public autoFocus: boolean;
  public rowHoverHighlight: boolean;
  public rowActionsRaw: (FsListRowActionGroup | FsListRowAction)[];
  public groupActionsRaw: any[];
  public rowClass;
  public rowEvents: any;
  public restore: FsListRestoreConfig;
  public persist: FsListPersitance;
  public filters = [];
  public filterInitCb: ChangeFn;
  public filterChangeCb: ChangeFn;
  public savedFilters: IFilterSavedFiltersConfig;
  public noResults: FsListNoResultsConfig;
  public emptyState: FsListEmptyStateConfig;
  public fetchFn: FsListFetchFn;
  public beforeFetchFn: FsListBeforeFetchFn;
  public afterFetchFn: FsListAfterFetchFn;
  public afterContentInit: FsListAfterContentInitFn;
  public afterInit: FsListAfterInitFn;
  public style;
  public hasRowActions;
  public rowActionsHover = false;
  public paging: PaginationController;
  public columns: ColumnsController;
  public actions: ActionsController;
  public dataController: DataController;
  public sorting: SortingController;
  public externalParams: ExternalParamsController;
  public selection: SelectionController;
  public filterConfig: FilterConfig = null;
  public status = true;
  public chips = false;
  public queryParam = false;
  public restoreMode = false;
  public autoReload: FsFilterAutoReload;
  public initialFetch = true;
  public emptyStateEnabled = false;
  public emptyStateTemplate: TemplateRef<any>;

  private _loading$ = new BehaviorSubject(false);
  private _fetchComplete$ = new Subject<{ scrollIntoView?: boolean }>();
  private _filtersReady$ = new Subject<void>();
  private _destroy$ = new Subject();
  private _initialized$ = new BehaviorSubject(false);
  private _fetch$ = new Subject<FsListFetchSubscription | void>();
  private readonly _filtersQuery = new BehaviorSubject<Record<string, any>>(null);
  private readonly _headerConfig: StyleConfig;
  private readonly _groupCellConfig: StyleConfig;
  private readonly _cellConfig: StyleConfig;
  private readonly _footerConfig: StyleConfig;

  constructor(
    private _el: ElementRef,
    private _config: FsListConfig = {},
    private _selectionDialog: SelectionDialog,
    private _route: ActivatedRoute,
    private _persistance: PersistanceController,
    private _inDialog: boolean,
  ) {
    this.columns = new ColumnsController(this._persistance);
    this.actions = new ActionsController();
    this.paging = new PaginationController();
    this.dataController = new DataController();
    this.sorting = new SortingController();

    this._initialize(_config);
    this._headerConfig = new StyleConfig(_config.header);
    this._groupCellConfig = new StyleConfig(_config.cell);
    this._cellConfig = new StyleConfig(_config.cell);
    this._footerConfig = new StyleConfig(_config.footer);
    this._initialized$.next(true);
    this.subscribe();

    if (this.initialFetch) {
      this.dataController.setOperation(FsListState.Load);
      this._fetch$.next(null);
    }
  }

  public get loading$(): Observable<boolean> {
    return this._loading$.asObservable();
  }

  public filtersReady() {
    this._filtersReady$.next(null);
  }

  public get filtersReady$(): Observable<void> {
    return this._filtersReady$.asObservable();
  }

  public get fetch$(): Observable<FsListFetchSubscription | void> {
    return this._fetch$.asObservable();
  }

  public get fetchComplete$(): Observable<{ scrollIntoView?: boolean }> {
    return this._fetchComplete$.asObservable();
  }

  public get hasSavedFilters(): boolean {
    return !!this.filterConfig.savedFilters;
  }

  public get filtersQuery(): Record<string, any> {
    return this._filtersQuery.getValue();
  }

  public get filtersQuery$(): Observable<Record<string, any>> {
    return this._filtersQuery.asObservable()
      .pipe(
        map((v) => v || {}),
      );
  }

  public get activeFiltersCount$(): Observable<number> {
    return this.filtersQuery$
      .pipe(
        map((v) => Object.keys(v).length),
        shareReplay(),
      );
  }

  public get destroy$(): Observable<any> {
    return this._destroy$;
  }

  public get initialized$(): Observable<boolean> {
    return this._initialized$;
  }

  public fetchRemote(query): Observable<any> {
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
   *
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
    this._updateSortingColumns();

    // Default sort by
    const externalSorting = this.externalParams.externalSorting;
    const initialSortConfig = externalSorting || this._config.sort;
    this.sorting.initialSortBy(initialSortConfig);

    if (externalSorting && !this.sorting.isDefined) {
      this.externalParams.clearSortingParams();

      console.warn('Not able to restore persisted sorting params.', externalSorting);
    }

    this._initFilters();
  }

  public reload(): Observable<any> {
    this._loading$.next(true);
    this.dataController.setOperation(FsListState.Reload);
    this._fetch$.next(null);

    return this._fetchComplete$
      .asObservable()
      .pipe(      
        take(1),  
        delay(0),
      );
  }

  /**
   * Watch page changes
   */
  public subscribe() {
    this.paging.pageChanged$
      .pipe(
        tap((event: PageChange) => {
          this.dataController.setOperation(FsListState.PageChange);
  
          // Remove all rows if limits was changed
          if (event.type === PageChangeType.LimitChanged && this.paging.hasPageStrategy) {
            this.dataController.clearRows();
          }
  
          if (this.paging.hasOffsetStrategy) {
            this.paging.updatePagination();
  
            if (this.selection) {
              this.selection.updateVisibleRecordsCount(this.paging.getPageRecords());
              this.selection.updateTotalRecordsCount(this.paging.records);
              this.selection.pageChanged();
            }
          }
        }),
        switchMap((event: any) => {
          this._fetch$.next(null);
          if (!this.paging.loadMoreEnabled) {
            const contains = [].slice.call(document.querySelectorAll('.cdk-overlay-container'))
              .some((overlay) => {
                return this._el.nativeElement.contains(overlay);
              });

            let el = this._el.nativeElement;

            if (!contains) {
              const rect = this._el.nativeElement.getBoundingClientRect();
              if ((Number(rect.top || 0) + window.pageYOffset) < window.innerHeight) {
                el = document.body;
              }
            }

            return this._fetchComplete$
              .asObservable()
              .pipe(
                take(1),
                tap(() => {
                  if(event?.scrollIntoView ?? true) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  }
                }),
              );
          }

          return of(null);
        }),
        takeUntil(this._destroy$),
      )
      .subscribe();

    this.sorting.sortingChanged$
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this.dataController.setOperation(FsListState.Sort);
        this.paging.page = 1;
        this._fetch$.next(null);
      });

    this._listenVisibleColumnChanges();
    this._listenRowsRemove();
    this._listenFetch();
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
   *
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
      this.externalParams.destroy();
    }

    this.columns.destroy();

    this._destroy$.next(null);
    this._destroy$.complete();

    this.dataController.destroy();
  }

  /**
   * Do initialization of table
   *
   * @param config
   */
  private _initialize(config: FsListConfig) {
    this._initVariables(config);
    this._initDefaultOptions(config);
    this._initRestore();
    this._initActions(config);
    this._initPaging(config.paging, config.loadMore);
    this._initSelection(config.selection, this._selectionDialog);
    this._initGroups(config.group);
    this._initExternalParamsController();
    this._initializeData();
  }

  // eslint-disable-next-line max-statements
  private _initVariables(config: FsListConfig) {
    this.autoFocus = config.autoFocus;
    this.rowHoverHighlight = config.rowHoverHighlight ?? true;
    this.heading = config.heading;
    this.trackBy = config.trackBy;
    this.subheading = config.subheading;
    this.rowActionsRaw = config.rowActions;
    this.rowClass = config.rowClass;
    this.rowEvents = config.rowEvents;
    this.restore = config.restore;
    this.persist = config.persist;
    this.filters = config.filters ?? [];
    this.filterInitCb = config.filterInit;
    this.filterChangeCb = config.filterChange;
    this.savedFilters = config.savedFilters;
    this.noResults = config.noResults;
    this.emptyState = config.emptyState;
    this.fetchFn = config.fetch;
    this.afterFetchFn = config.afterFetch;
    this.beforeFetchFn = config.beforeFetch;
    this.afterInit = config.afterInit;
    this.style = config.style;
    this.autoReload = config.autoReload;
    this.columns.initConfig(config.column);
  }

  /**
   * Just init options by default it it wasn't specified
   *
   * @param config
   */
  private _initDefaultOptions(config) {
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

    if (this._inDialog) {
      this.queryParam = false;
    } else {
      this.queryParam = (config.queryParam === undefined)
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
      };
    }
  }

  /**
   * Init restore row action and append Show Deleted option into filters
   */
  private _initRestore() {
    if (this.restore) {
      const restoreAction = {
        label: this.restore.menuLabel || 'Restore',
        menu: true,
        click: (row) => {
          this._restoreClick(this.restore.click, row);
        }, // TODO fix me, move to special file
        restore: true,
      };

      if (!this.rowActionsRaw) {
        this.rowActionsRaw = [];
      }

      this.rowActionsRaw.push(restoreAction);
      this.filters = this.filters || [];

      if (this.restore.filter !== false) {
        this.filters.push({
          name: showDeletedFilterKey,
          type: ItemType.Checkbox,
          label: this.restore.filterLabel || 'Show Deleted',
          default: null,
        });
      }
    }

  }

  /**
   * Init paging
   *
   * @param pagingConfig
   * @param loadMore
   */
  private _initPaging(pagingConfig: FsPaging | false, loadMore: FsListLoadMoreConfig | boolean) {
    this.paging.initWithConfig(pagingConfig, loadMore);
  }

  /**
   * Split actions by categories
   */
  private _initActions(config) {
    if (config.actions) {
      this.actions.setActions(config.actions);
    }

    this.rowActionsHover = config.rowActionsHover ?? false;

    this.hasRowActions =
      (this.rowActionsRaw && this.rowActionsRaw.length > 0)
      || (this.groupActionsRaw && this.groupActionsRaw.length > 0);
  }

  private _initSelection(
    selectionConfig: FsListSelectionConfig,
    selectionDialog: SelectionDialog,
  ) {
    if (selectionConfig) {
      this.selection = new SelectionController(selectionConfig, this.trackBy, selectionDialog);
      this.selection.setRowsCallback(() => this.dataController.visibleRows);
    }
  }

  private _initializeData() {
    this.dataController.setAdditionalConfigs({
      loadMoreEnabled: this.paging.loadMoreEnabled,
    });
  }

  private _initGroups(groupConfig: FsListGroupConfig) {
    if (groupConfig) {
      this.dataController.setGroupConfig(groupConfig);
      this.groupActionsRaw = groupConfig.actions;
    }
  }

  private _initExternalParamsController() {
    this.externalParams = new ExternalParamsController(
      this._route,
      this._persistance,
      this.paging,
      this.sorting,
      this.queryParam,
    );
  }

  /**
   * Subscribe to fetch$ event with debounce
   */
  private _listenFetch() {
    let fetch$ = this.fetch$;

    // Should wait until saved filters not loaded
    if (this.filters) {
      fetch$ = combineLatest([fetch$, this._filtersReady$])
        .pipe(
          map(([params]) => params),
        );
    }

    fetch$
      .pipe(
        debounceTime(50),
        tap(() => {
          this._loading$.next(true);
        }),
        tap(() => {
          this.selection?.closeSelectionDialog();
        }),
        map((params: FsListFetchSubscription) => {
          let query = { ...this.filtersQuery };

          if (this.paging.hasOffsetStrategy && params?.loadOffset) {
            query = Object.assign(query, this.paging.loadDeletedOffsetQuery);
          } else {
            const allRecordsRangeNeeded = (this.initialFetch
              || this.dataController.operation === FsListState.Reload
            ) && this.paging.loadMoreEnabled;

            query = allRecordsRangeNeeded ? 
              Object.assign(query, this.paging.loadMoreQuery) : 
              Object.assign(query, this.paging.query);
          }

          if (this.sorting.sortingColumn) {
            Object.assign(
              query,
              {
                order: `${this.sorting.sortingColumn.name},${this.sorting.sortingColumn.direction}`,
              },
            );
          }

          if (this.columns.configured) {
            query = {
              ...query,
              columns: this.columns.visibleColumnsNames,
            };
          }

          return { params, query };
        }),
        switchMap(({ params, query }) => {
          if (!this.columns.columnsFetched) {
            return this.columns.loadRemoteColumnConfigs()
              .pipe(
                mapTo({ params, query }),
              );
          }

          return of({ params, query });
        }),
        switchMap(({ params, query }) => {
          if (this.beforeFetchFn) {
            return this.beforeFetchFn(query)
              .pipe(
                map((beforeFetchQuery) => ({ params, query: beforeFetchQuery })),
                catchError((error) => {
                  console.error(error);

                  return EMPTY;
                }),
              );
          }

          return of({ params, query });
        }),
        switchMap(({ params, query }) => {
          const remoteFetch = this.fetchRemote(query)
            .pipe(
              catchError((error) => {
                console.error(error);
                this._loading$.next(false);

                return EMPTY;
              }),
            );

          return combineLatest<any>([of({ params, query }), remoteFetch]);
        }),
        catchError((error) => {
          console.error(error);
          this._loading$.next(false);

          return EMPTY;
        }),
        takeUntil(this._destroy$),
      )
      .subscribe(([paramsQuery, response]) => {
        this.initialFetch = false;
        this._completeFetch(paramsQuery.params, paramsQuery.query, response);
      });
  }

  private _listenRowsRemove() {
    this.dataController.rowsRemoved$
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((rows: any[]) => {
        if (this.paging.enabled) {

          const removedCount = rows.length;

          if (this.paging.hasPageStrategy) {
            this._noDataPaginationUpdate(removedCount);
          } else {
            // Fetch more if has something for fetch
            if (this.dataController.hasData || this.paging.hasNextPage) {
              this.dataController.setOperation(FsListState.LoadMore);

              this.paging.removeRows(removedCount);
              this._fetch$.next({ loadOffset: true });
            } else {
              this._noDataPaginationUpdate(removedCount);
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

  /**
   * Lister may have originally hidden columns, but visibility of those columns
   * can be changed programmaticaly in any time
   */
  private _listenVisibleColumnChanges(): void {
    this.columns.visibleColumns$
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this._updateSortingColumns();
      });
  }

  /**
   * Update and watch filter changes
   */
  private _initFilters() {
    if (this.filterConfig) {
      return;
    }

    const sortConfig = this.sorting.sortingColumn
      ? { value: this.sorting.sortingColumn.name, direction: this.sorting.sortingColumn.direction }
      : null;

    // Config
    this.filterConfig = {
      items: this.filters || [],
      savedFilters: this.savedFilters,
      actions: this.actions.actions,
      queryParam: this.queryParam,
      autofocus: this.autoFocus,
      sort: sortConfig,
      chips: this.chips,
      autoReload: this.autoReload,
      init: this._filterInit.bind(this),
      change: this._filterChange.bind(this),
      reload: this._config.reload ?? true,
      sortChange: this._filterSort.bind(this),
      heading: this.heading,
      subheading: this.subheading,
    };

    if(this._persistance.queryEnabled) {
      this.filterConfig.persist =  {
        name: this._persistance.name,
      };
    }
  }

  /**
   * Callback when Filter has been initialized
   *
   * @param filters
   */
  private _filterInit(query) {
    if (this.filterInitCb) {
      this.filterInitCb(query);
    }

    query = this._processRestoreQuery(query);

    this._filtersQuery.next(query);

    this.filtersReady();
  }

  /**
   * Callback when Filter has been changed
   *
   * @param query
   * @param sort
   */
  private _filterChange(query, sort) {
    if (this.filterChangeCb) {
      this.filterChangeCb(query, sort);
    }

    query = this._processRestoreQuery(query);

    this._filtersQuery.next(query);

    if (this.restore && this.restore.reload) {
      this.reload();
    }

    this.dataController.setOperation(FsListState.Filter);

    // Reset paging for request with correct offset
    this.paging.resetPaging();
    this._fetch$.next(null);
  }

  private _processRestoreQuery(query) {
    this.restoreMode = false;
    // Restore option
    if (this.restore && query[showDeletedFilterKey]) {
      query = Object.keys(query)
        .filter((key) => key !== showDeletedFilterKey)
        .reduce((acc, key) => {
          return {
            ...acc,
            [key]: query[key],
          };
        }, {});

      query = {
        ...query,
        ...this.restore.query,
      };

      this.restoreMode = true;
    }

    return query;
  }

  // Callback when Filter sort has been changed
  private _filterSort(filterQuery, filterSort) {
    if (filterSort) {
      this.sorting.sortByColumnWithName(filterSort.value);

      const sortDirection = filterSort.direction === 'asc' ? SortingDirection.asc : SortingDirection.desc;
      this.sorting.sortDirection(sortDirection);
    } else {
      // FIXME need to be refactored...
      this.sorting.sortingColumn = undefined;
      this.reload();
    }
  }

  private _completeFetch(params, query, response) {
    if (!this.paging.page) {
      this.paging.page = 1;
    }

    if (response.paging) {
      const pageRecords = (Array.isArray(response.data) && response.data.length) || 0;
      this.paging.updatePaging(
        response.paging,
        pageRecords,
        this.dataController.operation === FsListState.LoadMore,
      );
    } else if (this.paging.enabled) {
      console.log(
        '%c FsList Warning ',
        'color: white; background-color: #ffcc0b',
        'Pagination does not configured properly. ' +
        'Pagination is enabled, but http response does not contain "paging" field. ' +
        'You have to set "paging: false" in config or add "paging" field to response.',
      );
    }

    /// must be before selection, because seletion use records
    this.dataController.setRowsFromResponse(response.data);
    ///

    this._completeFetchUpdateSelecton(response);

    if (this.emptyState?.validate && this.emptyStateTemplate) {
      this.emptyStateEnabled = this.emptyState.validate(query, cloneDeep(this.dataController.visibleRowsData));
    }

    if (this.afterFetchFn) {
      this.afterFetchFn(query, this.dataController.visibleRowsData);
    }

    // case when have removed all results from last page
    if (this.dataController.visibleRows.length === 0
      && this.paging.page > 1
      && this.paging.page > this.paging.pages
    ) {
      this.paging.goLast();
    }

    this._fetchComplete$.next({ scrollIntoView: params?.scrollIntoView });
    this._loading$.next(false);
  }

  private _completeFetchUpdateSelecton(response) {
    // Update selection params
    if (this.selection) {
      if (this.paging.enabled) {
        this.selection.pageChanged();
        this.selection.updateVisibleRecordsCount(this.paging.getPageRecords());
        this.selection.updateTotalRecordsCount(this.paging.records);
      } else {
        const count = response.paging && response.paging.records
          || Array.isArray(response.data) && response.data.length;

        this.selection.updateVisibleRecordsCount(count);
        this.selection.updateTotalRecordsCount(count);
      }

      this.selection.selectedRowsIntersection(this.dataController.visibleRowsData);
    }
  }

  /**
   * Will do some actions if you removed item and item was last on his own page
   *
   * Ex: if list has 3 pages and on third page you have only one item. And you just deleted this item.
   * You must go to second page, but if it was last page and you can't go back -> just reload
   *
   * @param deletedCount
   */
  private _noDataPaginationUpdate(deletedCount) {
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
  private _restoreClick(restoreClickCallback, row) {
    const restoreClickResult = restoreClickCallback(row);

    if (restoreClickResult instanceof Observable) {
      restoreClickResult
        .pipe(
          take(1),
          takeUntil(this._destroy$),
        )
        .subscribe({
          next: () => this.reload(),
        });
    }
  }

  private _updateSortingColumns(): void {
    this.sorting.clearSortableColumns();
    this.columns.columns
      .filter((column) => column.sortable && column.visible)
      .forEach((column) => {
        this.sorting.addSortableColumn(column);
      });
  }
}
