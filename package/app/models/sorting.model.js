"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var column_model_1 = require("./column.model");
var Subject_1 = require("rxjs/Subject");
var isString = require("lodash/isString");
var Sorting = (function () {
    function Sorting(columns) {
        this.sortingColumns = [];
        this.fakeSortingColumns = [];
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
            this.fakeSortingColumns.concat(this.sortingColumns).filter(function (col) { return col.ordered; })
                .map(function (col) { return col.ordered = false; });
            column.ordered = true;
        }
        this.sortingColumn = column;
        this.sortingChanged.next();
    };
    /**
     * Init fake columns for sorting
     * @param columns
     */
    Sorting.prototype.initFakeColumns = function (columns) {
        var _this = this;
        columns.forEach(function (column) {
            var fakeColumn = new column_model_1.Column({
                title: column.name,
                name: column.value,
                sortable: true
            });
            _this.fakeSortingColumns.push(fakeColumn);
        });
    };
    /**
     * Set initial sorting
     * @param {string} sort
     */
    Sorting.prototype.initialSortBy = function (sort) {
        if (!sort || !isString(sort)) {
            this.sortByFirstSortbale();
            return;
        }
        var _a = sort.split(',')
            .map(function (str) { return str.trim(); }), columnName = _a[0], columnDirection = _a[1];
        var column = this.sortingColumns.find(function (col) { return col.name === columnName && col.sortable; }) ||
            this.fakeSortingColumns.find(function (col) { return col.name === columnName && col.sortable; });
        if (!column) {
            return;
        }
        this.sortBy(column, false);
        this.setSortDirection((columnDirection === 'asc')
            ? column_model_1.SortingDirection.asc
            : column_model_1.SortingDirection.desc);
    };
    /**
     * Sort by first of available sorting columns
     */
    Sorting.prototype.sortByFirstSortbale = function () {
        var column = this.sortingColumns.find(function (col) { return col.sortable; });
        if (!column) {
            return;
        }
        this.sortBy(column, false);
        this.setSortDirection(column_model_1.SortingDirection.asc);
    };
    return Sorting;
}());
exports.Sorting = Sorting;
//# sourceMappingURL=sorting.model.js.map