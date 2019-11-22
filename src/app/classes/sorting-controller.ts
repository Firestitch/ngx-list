import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { isString } from 'lodash-es';

import { Column, SortingDirection } from '../models/column.model';
import { List } from '../models/list.model';

export interface SortingChangeEvent {
  sortBy: string;
  sortDirection: string;
}

export class SortingController {
  public config: List;

  public sortingColumns: Column[] = [];
  public fakeSortingColumns: Column[] = [];
  public sortingColumn: Column;

  private _initialization = false;
  private _sortingChanged = new Subject<SortingChangeEvent>();
  private _onDestroy = new Subject();

  constructor() {}

  get sortingChanged(): Observable<SortingChangeEvent> {
    return this._sortingChanged.pipe(takeUntil(this._onDestroy));
  }

  public addSortableColumn(column: Column) {
    this.sortingColumns.push(column);
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
    const column =
      this.sortingColumns.find(col => col.name === name && col.sortable) ||
      this.fakeSortingColumns.find(col => col.name === name && col.sortable);

    if (!column) { return; }

    this._setSortingColumn(column);
  }

  /**
   * Init fake columns for sorting
   * @param columns
   */
  public initFakeColumns(columns) {
    columns.forEach((column) => {
      const fakeColumn = new Column({
        title: column.name,
        name: column.value,
        sortable: true
      });

      this.fakeSortingColumns.push(fakeColumn);
    });
  }

  /**
   * Set initial sorting
   * @param sort
   */
  public initialSortBy(sort: string) {
    this._initialization = true;

    if (!sort || !isString(sort)) {
      this.sortByFirstSortbale();

      this._initialization = false;
      return;
    }

    const [columnName, columnDirection] = sort.split(',')
      .map(str => str.trim());

    this.sortByColumnWithName(columnName);

    const direction = (columnDirection === 'asc')
      ? SortingDirection.asc
      : SortingDirection.desc;
    this._setSortingDirection(direction);

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

  /**
   * Destroy
   */
  public destroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  private _setSortingColumn(column) {
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
        .map((col) => col.ordered = false);

      column.ordered = true;
    }

    this.sortingColumn = column;
  }

  private _setSortingDirection(direction) {
    this.sortingColumn.sortingDirection = direction;
  }

  private _notifySortChanged() {
    if (this._initialization) { return; }
    this._sortingChanged.next({
      sortBy: this.sortingColumn.name,
      sortDirection: this.sortingColumn.direction
    });
  }
}
