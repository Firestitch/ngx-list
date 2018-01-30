import { Column, SortingDirection } from './column.model';
import { FsListConfig } from './list-config.model';
import { Subject } from 'rxjs/Subject';

export class Sorting {
  public config: FsListConfig;

  public tableColumns: Column[];
  public sortingColumns: Column[] = [];
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
      this.sortingChanged.next();
    }
  }

  /**
   * Sort By
   * @param column
   * @param doubleSelectBehaviour - when user click twice on same param
   */
  public sortBy(column: Column, doubleSelectBehaviour = true) {
    // Can't do sort by non sortable column
    if (!column.sortable) {
      return false;
    }

    // If column was ordered and sort direction was desc then cancel sorting
    if (column.ordered && (column.sortingDirection === SortingDirection.desc && doubleSelectBehaviour)) {
      this.sortingColumn = void 0;
      column.ordered = false;

      this.sortingChanged.next();

      return true;
    }

    // Column was ordered before
    if (column.ordered) {
      if (doubleSelectBehaviour) {
        column.changeDirection();
      } else {
        return true;
      }
    } else {
      this.tableColumns
        .filter((col) => col.ordered)
        .map((col) => col.ordered = false);

      column.ordered = true;
    }

    this.sortingColumn = column;
    this.sortingChanged.next();
  }
}
