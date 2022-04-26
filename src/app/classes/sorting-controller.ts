import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Column, SortingDirection } from '../models/column.model';
import { List } from './list-controller';
import { FsListSortConfig } from '../interfaces';
import { ColumnAttributes } from '../models/column-attributes';

export interface SortingChangeEvent {
  sortBy: string;
  sortDirection: string;
}

export class SortingController {
  public config: List;

  public sortingColumns: Column[] = [];
  public fakeSortingColumns: Column[] = [];
  public sortingColumn: Column;

  private _initialized = new BehaviorSubject<boolean>(false);
  private _sortingChanged$ = new Subject<SortingChangeEvent>();
  private _onDestroy = new Subject();

  constructor() {}

  get sortingChanged$(): Observable<SortingChangeEvent> {
    return this._sortingChanged$.pipe(takeUntil(this._onDestroy));
  }

  get initialized$(): Observable<boolean> {
    return this._initialized.pipe(takeUntil(this._onDestroy));
  }

  get value(): FsListSortConfig | undefined {
    if (this.sortingColumn) {
      return {
        value: this.sortingColumn.name,
        direction: this.sortingColumn.direction,
      };
    } else {
      return void 0;
    }
  }

  get initialization(): boolean {
    return !this._initialized.getValue();
  }

  get isDefined(): boolean {
    return !!this.sortingColumn;
  }

  private set _initialization(value: boolean) {
    this._initialized.next(!value);
  }

  public addSortableColumn(column: Column) {
    this.sortingColumns.push(column);
  }

  public clearSortableColumns(): void {
    this.sortingColumns = [];
  }

  /**
   * Set Sortable Direction
   * @param direction
   */
  public sortDirection(direction) {
    if (this.sortingColumn && this.sortingColumn.sortingDirection !== direction) {
      this._setSortingDirection(direction);

      this._notifySortChanged();
    }
  }

  /**
   * Sort By
   * @param column
   */
  public sortBy(column: Column) {
    if (column.sortable) {
      this._setSortingColumn(column);

      this._notifySortChanged();
    }
  }

  /**
   * Same as sortBy, but need only column name as parameter for sort
   * @param name
   */
  public sortByColumnWithName(name: string) {
    const column = this.getColumn(name);

    if (!column) { return; }

    this._setSortingColumn(column);

    this._notifySortChanged();
  }

  /**
   * Init fake columns for sorting
   * @param columns
   */
  public initFakeColumns(columns) {
    columns.forEach((column) => {
      const attributes = new ColumnAttributes({
        title: column.name,
        name: column.value,
        sortable: true,
        direction: column.direction,
      });

      const fakeColumn = new Column({
        attributes,
      });

      this.fakeSortingColumns.push(fakeColumn);
    });
  }

  /**
   * Set initial sorting
   * @param sort
   */
  public initialSortBy(sort: FsListSortConfig) {
    this._initialization = true;

    if (!sort) {
      this._trySortByDefaultSortableColumn();

      if (!this.sortingColumn) {
        this.sortByFirstSortbale();
      }

      this._initialization = false;
      return;
    }

    if (!this.getColumn(sort.value)) {
      this.sortByFirstSortbale();

      console.warn(`
        Not possible to do initial sort by "${sort.value}" column.
        Column with name "${sort.value}" does not exists.
        Check your lister configuration.
      `);
    } else {
      this.sortByColumnWithName(sort.value);

      const direction = (sort.direction === void 0 || sort.direction === 'asc')
        ? SortingDirection.asc
        : SortingDirection.desc;
      this._setSortingDirection(direction);
    }

    this._initialization = false;
  }

  /**
   * Sort by first of available sorting columns
   */
  public sortByFirstSortbale() {
    const column =
      this.sortingColumns.find(col => col.sortable);

    if (!column) { return; }

    this.sortBy(column);
    this.sortDirection(SortingDirection.asc);
  }

  public getColumn(name: string): Column {
    return [...this.sortingColumns, ...this.fakeSortingColumns]
      .find(col => col.name === name && col.sortable);
  }

  /**
   * Destroy
   */
  public destroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  private _setSortingColumn(column: Column) {
    // Can't do sort by non sortable column
    if (!column.sortable) {
      return false;
    }

    // Column was ordered before
    if (column.ordered) {
      column.changeDirection();
    } else {
      [...this.fakeSortingColumns, ...this.sortingColumns]
        .filter((col) => col.ordered)
        .forEach((col) => col.ordered = false);

      column.ordered = true;
    }

    this.sortingColumn = column;
  }

  private _setSortingDirection(direction) {
    this.sortingColumn.sortingDirection = direction;
  }

  private _notifySortChanged() {
    if (this.initialization) { return; }

    this._sortingChanged$.next({
      sortBy: this.sortingColumn.name,
      sortDirection: this.sortingColumn.direction
    });
  }

  private _trySortByDefaultSortableColumn(): void {
    const sortableDefault = this.sortingColumns
      .find((column) => column.sortableDefault);

    if (sortableDefault) {
      this.sortByColumnWithName(sortableDefault.name);
    }
  }
}
