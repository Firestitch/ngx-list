"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var column_model_1 = require("./column.model");
var Subject_1 = require("rxjs/Subject");
var Sorting = (function () {
    function Sorting(columns) {
        this.sortingColumns = [];
        this.sortingChanged = new Subject_1.Subject();
        this.tableColumns = columns;
    }
    Sorting.prototype.addSortableColumn = function (column) {
        this.sortingColumns.push(column);
    };
    /**
     * Set Sortable Direction
     * @param direction
     */
    Sorting.prototype.setSortDirection = function (direction) {
        if (this.sortingColumn && this.sortingColumn.sortingDirection !== direction) {
            this.sortingColumn.sortingDirection = direction;
            this.sortingChanged.next();
        }
    };
    /**
     * Sort By
     * @param column
     * @param doubleSelectBehaviour - when user click twice on same param
     */
    Sorting.prototype.sortBy = function (column, doubleSelectBehaviour) {
        if (doubleSelectBehaviour === void 0) { doubleSelectBehaviour = true; }
        // Can't do sort by non sortable column
        if (!column.sortable) {
            return false;
        }
        // If column was ordered and sort direction was desc then cancel sorting
        if (column.ordered && (column.sortingDirection === column_model_1.SortingDirection.desc && doubleSelectBehaviour)) {
            this.sortingColumn = void 0;
            column.ordered = false;
            this.sortingChanged.next();
            return true;
        }
        // Column was ordered before
        if (column.ordered) {
            if (doubleSelectBehaviour) {
                column.changeDirection();
            }
            else {
                return true;
            }
        }
        else {
            this.tableColumns
                .filter(function (col) { return col.ordered; })
                .map(function (col) { return col.ordered = false; });
            column.ordered = true;
        }
        this.sortingColumn = column;
        this.sortingChanged.next();
    };
    return Sorting;
}());
exports.Sorting = Sorting;
//# sourceMappingURL=sorting.model.js.map