import { Column, SortingDirection } from './column.model';
import { List } from './list.model';
import { Subject } from 'rxjs/Subject';
import * as isString from 'lodash/isString';

export class Sorting {
  public config: List;

  public tableColumns: Column[];
  public sortingColumns: Column[] = [];
  public fakeSortingColumns: Column[] = [];
  public sortingColumn: Column;

  public sortingChanged = new Subject();

  constructor(columns) {
    this.tableColumns = columns;
  }

  public addSortableColumn(column: Column) {
    this.sortingColumns.push(column);
  }
  /**
   * Set Sortable Direction
   * @param direction
   */
  public setSortDirection(direction) {
    if (this.sortingColumn && this.sortingColumn.sortingDirection !== direction) {
      this.sortingColumn.sortingDirection = direction;
      this.sortingChanged.next({
        sortBy: this.sortingColumn.name,
        sortDirection: this.sortingColumn.direction
      });
    }
  }

  /**
   * Sort By
   * @param column
   */
  public sortBy(column: Column) {
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
    this.sortingChanged.next({
      sortBy: this.sortingColumn.name,
      sortDirection: this.sortingColumn.direction
    });
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
   * @param {string} sort
   */
  public initialSortBy(sort: string) {
    if (!sort || !isString(sort)) {
      this.sortByFirstSortbale();
      return;
    }

    const [columnName, columnDirection] = sort.split(',')
      .map(str => str.trim());

    const column =
      this.sortingColumns.find(col => col.name === columnName && col.sortable) ||
      this.fakeSortingColumns.find(col => col.name === columnName && col.sortable);

    if (!column) { return; }

    this.sortBy(column);

    this.setSortDirection((columnDirection === 'asc')
      ? SortingDirection.asc
      : SortingDirection.desc);
  }

  /**
   * Sort by first of available sorting columns
   */
  public sortByFirstSortbale() {
    const column =
      this.sortingColumns.find(col => col.sortable);

    if (!column) { return; }

    this.sortBy(column);
    this.setSortDirection(SortingDirection.asc);
  }
}
