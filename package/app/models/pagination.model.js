"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var tsmodels_1 = require("tsmodels");
var Subject_1 = require("rxjs/Subject");
var Pagination = (function (_super) {
    __extends(Pagination, _super);
    function Pagination(config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this) || this;
        _this.limit = 5;
        _this.pages = 0; // Total pages
        _this.manual = false;
        _this.page = 1; // Active page
        _this.pageChanged = new Subject_1.Subject();
        _this.pagesArray = [];
        _this.displayed = 0;
        _this._enabled = true;
        _this._limits = [10, 25, 50, 100, 200];
        _this.updatePaging(config);
        return _this;
    }
    Object.defineProperty(Pagination.prototype, "enabled", {
        /**
         * Get enabled
         * @returns {boolean}
         */
        get: function () {
            return this._enabled;
        },
        /**
         * Set enabled and update pages array
         * @param value
         */
        set: function (value) {
            this._enabled = value;
            this.updatePagesArray();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pagination.prototype, "limits", {
        /**
         * Get Limits
         * @returns {number[]}
         */
        get: function () {
            return this._limits;
        },
        /**
         * Set limits, update pages array and set new limit per page
         * @param value
         */
        set: function (value) {
            this._limits = value;
            this.updatePagesArray();
            if (this.limits.length > 0 && this.limits.indexOf(this.limit) === -1) {
                this.limit = this.limits[0];
            }
            else if (this.limits.length === 0) {
                this.limit = this.records;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pagination.prototype, "query", {
        /**
         * Get query for request
         * @returns {{page: number; limit: number}}
         */
        get: function () {
            return {
                page: this.page || 1,
                limit: this.limit || 10,
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pagination.prototype, "hasPrevPage", {
        /**
         * If prev page can be activated
         * @returns {boolean}
         */
        get: function () {
            return this.page > 1 && this.pages > 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pagination.prototype, "hasNextPage", {
        /**
         * If next page can be activated
         * @returns {boolean}
         */
        get: function () {
            return this.page < this.pages && this.pages > 1;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Update paging config and all related fields
     * @param config
     */
    Pagination.prototype.updatePaging = function (config) {
        this._fromJSON(config);
        this.updatePagesArray();
        this.updateDisplayed();
    };
    /**
     * Update paging when data source not remove
     * @param {any[]} rows
     */
    Pagination.prototype.updatePagingManual = function (rows) {
        if (Array.isArray(rows) && rows.length > 0) {
            this.records = rows.length;
            this.pages = Math.ceil(rows.length / this.limit);
        }
        this.updatePagesArray();
        this.updateDisplayed();
    };
    /**
     * Update pages array with new pages count
     */
    Pagination.prototype.updatePagesArray = function () {
        var MIDDLE = 3;
        var pagesArr = [];
        var from = 0;
        var to = 0;
        if (this.page < MIDDLE) {
            from = MIDDLE - 2;
            to = MIDDLE + 2;
        }
        else if (this.page >= MIDDLE && this.page <= this.pages - MIDDLE + 1) {
            from = this.page - 2;
            to = this.page + 2;
        }
        else if (this.page > this.pages - MIDDLE + 1) {
            from = this.pages - MIDDLE - 1;
            to = this.pages;
        }
        if (!this.pages || this.pages < 5) {
            to = this.pages || 0;
        }
        for (var i = from; i <= to; i++) {
            pagesArr.push(i);
        }
        this.pagesArray = Object.assign([], pagesArr);
    };
    /**
     * Update dispayed records counter
     */
    Pagination.prototype.updateDisplayed = function () {
        if (this.records > this.limit) {
            this.displayed = this.limit;
        }
        else {
            this.displayed = this.records;
        }
    };
    /**
     * Set new limit
     * @param limit
     */
    Pagination.prototype.setLimit = function (limit) {
        this.limit = limit;
        this.resetPaging();
        this.pageChanged.next();
    };
    /**
     * If page is activate page
     * @param page
     * @returns {boolean}
     */
    Pagination.prototype.isActive = function (page) {
        return page === this.page;
    };
    /**
     * Go to page
     * @param page
     */
    Pagination.prototype.goToPage = function (page) {
        if (page >= 1 && page <= this.pages && this.page !== page) {
            this.page = page;
            this.pageChanged.next(page);
        }
    };
    Pagination.prototype.resetPaging = function () {
        this.page = 1;
    };
    /**
     * Go to next page
     */
    Pagination.prototype.goNext = function () {
        if (this.page < this.pages) {
            this.page++;
            this.pageChanged.next(this.page);
        }
    };
    /**
     * Go to first page
     */
    Pagination.prototype.goFirst = function () {
        if (this.page > 1) {
            this.page = 1;
            this.pageChanged.next(this.page);
        }
    };
    /**
     * Go to prev page
     */
    Pagination.prototype.goPrev = function () {
        if (this.page > 1) {
            this.page--;
            this.pageChanged.next(this.page);
        }
    };
    /**
     * Go to last page
     */
    Pagination.prototype.goLast = function () {
        if (this.page < this.pages) {
            this.page = this.pages;
            this.pageChanged.next(this.page);
        }
    };
    __decorate([
        tsmodels_1.Alias(),
        __metadata("design:type", Object)
    ], Pagination.prototype, "limit", void 0);
    __decorate([
        tsmodels_1.Alias(),
        __metadata("design:type", Object)
    ], Pagination.prototype, "pages", void 0);
    __decorate([
        tsmodels_1.Alias(),
        __metadata("design:type", Number)
    ], Pagination.prototype, "records", void 0);
    __decorate([
        tsmodels_1.Alias(),
        __metadata("design:type", Object)
    ], Pagination.prototype, "manual", void 0);
    return Pagination;
}(tsmodels_1.Model));
exports.Pagination = Pagination;
//# sourceMappingURL=pagination.model.js.map