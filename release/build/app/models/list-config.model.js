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
var filter_1 = require("@firestitch/filter");
var tsmodels_1 = require("tsmodels");
var column_model_1 = require("./column.model");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var Observable_1 = require("rxjs/Observable");
var pagination_model_1 = require("./pagination.model");
var sorting_model_1 = require("./sorting.model");
var FsListConfig = (function (_super) {
    __extends(FsListConfig, _super);
    function FsListConfig(config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this) || this;
        _this.filters = [];
        _this.columns = [];
        _this.paging = new pagination_model_1.Pagination();
        _this.sorting = new sorting_model_1.Sorting(_this.columns);
        _this.filterService = new filter_1.FsFilter();
        _this.data$ = new BehaviorSubject_1.BehaviorSubject([]);
        _this.loading = false;
        _this._fromJSON(config);
        _this.watchFilters();
        _this.initPaging(config);
        _this.subscribe();
        return _this;
    }
    FsListConfig.create = function (config) {
        return new FsListConfig(config);
    };
    FsListConfig.prototype.load = function () {
        var _this = this;
        this.loading = true;
        var query = Object.assign({}, this.filtersQuery, this.paging.query);
        if (this.sorting.sortingColumn) {
            Object.assign(query, { order: this.sorting.sortingColumn.name + "," + this.sorting.sortingColumn.direction });
        }
        var result = this.dataFn(query);
        if (result instanceof Promise) {
            result.then(function (response) {
                _this.paging.updatePaging(response.paging);
                _this.loading = false;
                _this.data$.next(response.data);
            });
        }
        else if (result instanceof Observable_1.Observable) {
            result.subscribe(function (response) {
                _this.paging.updatePaging(response.paging);
                _this.loading = false;
                _this.data$.next(response.data);
            });
        }
    };
    /**
     * Transform templates for using
     * @param templates
     */
    FsListConfig.prototype.tranformTemplatesToColumns = function (templates) {
        var _this = this;
        templates.forEach(function (column) {
            var col = new column_model_1.Column(column);
            if (col.sortable) {
                _this.sorting.addSortableColumn(col);
            } // add column to sortable
            _this.columns.push(col);
        });
    };
    /**
     * Init paging
     * @param config
     */
    FsListConfig.prototype.initPaging = function (config) {
        if (config.paging) {
            this.paging.enabled = config.paging.enabled;
            if (config.paging.limits) {
                this.paging.limits = config.paging.limits;
            }
        }
    };
    /**
     * Watch page changes
     */
    FsListConfig.prototype.subscribe = function () {
        var _this = this;
        this.paging.pageChanged.subscribe(function () {
            _this.load();
        });
        this.sorting.sortingChanged.subscribe(function () {
            _this.load();
        });
    };
    /**
     * Update and watch filter changes
     */
    FsListConfig.prototype.watchFilters = function () {
        var _this = this;
        if (this.filters && this.filters.length) {
            this.filterService.fsConfig = {
                persist: this.persist,
                items: this.filters,
                inline: this.inlineFilters,
                init: function (instance) {
                    _this.filtersQuery = instance.gets({ flatten: true });
                    _this.load();
                },
                change: function (query, instance) {
                    _this.filtersQuery = instance.gets({ flatten: true });
                    _this.load();
                }
            };
        }
        else {
            this.filtersQuery = {};
            this.load();
        }
    };
    __decorate([
        tsmodels_1.Alias(),
        __metadata("design:type", Object)
    ], FsListConfig.prototype, "inlineFilters", void 0);
    __decorate([
        tsmodels_1.Alias(),
        __metadata("design:type", Object)
    ], FsListConfig.prototype, "actions", void 0);
    __decorate([
        tsmodels_1.Alias(),
        __metadata("design:type", Object)
    ], FsListConfig.prototype, "rowActions", void 0);
    __decorate([
        tsmodels_1.Alias(),
        __metadata("design:type", Object)
    ], FsListConfig.prototype, "rowEvents", void 0);
    __decorate([
        tsmodels_1.Alias(),
        __metadata("design:type", Object)
    ], FsListConfig.prototype, "columnTemplates", void 0);
    __decorate([
        tsmodels_1.Alias('data'),
        __metadata("design:type", Object)
    ], FsListConfig.prototype, "dataFn", void 0);
    __decorate([
        tsmodels_1.Alias(),
        __metadata("design:type", Object)
    ], FsListConfig.prototype, "filters", void 0);
    return FsListConfig;
}(tsmodels_1.Model));
exports.FsListConfig = FsListConfig;
//# sourceMappingURL=list-config.model.js.map