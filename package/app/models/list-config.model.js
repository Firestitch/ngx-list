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
var column_model_1 = require("./column.model");
var pagination_model_1 = require("./pagination.model");
var sorting_model_1 = require("./sorting.model");
var _isNumber = require("lodash/isNumber");
var tsmodels_1 = require("tsmodels");
var Observable_1 = require("rxjs/Observable");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var styleConfig_model_1 = require("./styleConfig.model");
var action_model_1 = require("./action.model");
var FsListModel = (function (_super) {
    __extends(FsListModel, _super);
    function FsListModel(config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this) || this;
        _this.filters = [];
        _this.columns = [];
        _this.paging = new pagination_model_1.Pagination();
        _this.sorting = new sorting_model_1.Sorting(_this.columns);
        _this.filterService = new filter_1.FsFilter();
        _this.data$ = new BehaviorSubject_1.BehaviorSubject([]);
        _this.loading = false;
        _this.hasFooter = false;
        _this.initialFetch = true;
        _this._fromJSON(config);
        if (config.initialFetch === false) {
            _this.initialFetch = false;
        }
        _this._headerConfig = new styleConfig_model_1.StyleConfig(config.header);
        _this._cellConfig = new styleConfig_model_1.StyleConfig(config.cell);
        _this._footerConfig = new styleConfig_model_1.StyleConfig(config.footer);
        _this.hasRowActions = _this.rowActions && _this.rowActions.length > 0;
        _this.watchFilters();
        _this.initPaging(config);
        _this.subscribe();
        return _this;
    }
    Object.defineProperty(FsListModel.prototype, "rows", {
        set: function (value) {
            this._rows = value;
        },
        enumerable: true,
        configurable: true
    });
    FsListModel.create = function (config) {
        return new FsListModel(config);
    };
    FsListModel.prototype.load = function () {
        this.loading = true;
        var query = Object.assign({}, this.filtersQuery, this.paging.query);
        if (this.sorting.sortingColumn) {
            Object.assign(query, { order: this.sorting.sortingColumn.name + "," + this.sorting.sortingColumn.direction });
        }
        if (this.fetchFn) {
            this.loadRemote(query);
        }
        else if (Array.isArray(this._rows)) {
            this.loadLocal();
        }
    };
    FsListModel.prototype.loadRemote = function (query) {
        var _this = this;
        var result = this.fetchFn(query);
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
    FsListModel.prototype.loadLocal = function () {
        this.paging.updatePagingManual(this._rows);
        var from = (this.paging.page - 1) * this.paging.limit;
        var to = (this.paging.page === 1) ? this.paging.limit : this.paging.limit * this.paging.page;
        var sliceOfRows = this._rows.slice(from, to);
        this.data$.next(sliceOfRows);
        this.loading = false;
    };
    /**
     * Transform templates for using
     * @param templates
     */
    FsListModel.prototype.tranformTemplatesToColumns = function (templates) {
        var _this = this;
        var defaultConfigs = {
            header: this._headerConfig,
            cell: this._cellConfig,
            footer: this._footerConfig,
        };
        templates.forEach(function (column) {
            var col = new column_model_1.Column(column, defaultConfigs);
            if (col.sortable) {
                _this.sorting.addSortableColumn(col);
            } // add column to sortable
            if (col.footerTemplate) {
                _this.hasFooter = true;
            }
            _this.columns.push(col);
        });
        this.updateColspans('headerConfigs', 'headerColspanned');
        this.updateColspans('cellConfigs', 'cellColspanned');
        this.updateColspans('footerConfigs', 'footerColspanned');
    };
    /**
     * Init paging
     * @param config
     */
    FsListModel.prototype.initPaging = function (config) {
        if (config.paging) {
            this.paging.manual = config.paging.manual;
            if (config.paging.limits) {
                this.paging.limits = config.paging.limits;
            }
        }
        else if (config.paging === false) {
            this.paging.enabled = false;
        }
    };
    /**
     * Watch page changes
     */
    FsListModel.prototype.subscribe = function () {
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
    FsListModel.prototype.watchFilters = function () {
        var _this = this;
        if (this.filters && this.filters.length) {
            this.filterService.fsConfig = {
                persist: this.persist,
                items: this.filters,
                inline: this.inlineFilters,
                init: function (instance) {
                    _this.filtersQuery = instance.gets({ flatten: true });
                    if (_this.initialFetch) {
                        _this.load();
                    }
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
    FsListModel.prototype.updateColspans = function (config, updateFlag) {
        var _this = this;
        this.columns.forEach(function (col, index) {
            if (col[config].colspan !== void 0) {
                var spanTo = index + +col[config].colspan;
                if (!_isNumber(spanTo)) {
                    return;
                }
                _this.columns[index][updateFlag] = false;
                for (var i = index + 1; i < spanTo; i++) {
                    if (_this.columns[i]) {
                        _this.columns[i][updateFlag] = true;
                    }
                }
            }
        });
    };
    __decorate([
        tsmodels_1.Alias(),
        __metadata("design:type", Object)
    ], FsListModel.prototype, "inlineFilters", void 0);
    __decorate([
        tsmodels_1.Alias('actions', action_model_1.Action),
        __metadata("design:type", Object)
    ], FsListModel.prototype, "actions", void 0);
    __decorate([
        tsmodels_1.Alias(),
        __metadata("design:type", Object)
    ], FsListModel.prototype, "rowActions", void 0);
    __decorate([
        tsmodels_1.Alias(),
        __metadata("design:type", Object)
    ], FsListModel.prototype, "rowEvents", void 0);
    __decorate([
        tsmodels_1.Alias(),
        __metadata("design:type", Object)
    ], FsListModel.prototype, "columnTemplates", void 0);
    __decorate([
        tsmodels_1.Alias(),
        __metadata("design:type", Object)
    ], FsListModel.prototype, "filters", void 0);
    __decorate([
        tsmodels_1.Alias('fetch'),
        __metadata("design:type", Object)
    ], FsListModel.prototype, "fetchFn", void 0);
    __decorate([
        tsmodels_1.Alias('rows'),
        __metadata("design:type", Object)
    ], FsListModel.prototype, "_rows", void 0);
    return FsListModel;
}(tsmodels_1.Model));
exports.FsListModel = FsListModel;
//# sourceMappingURL=list-config.model.js.map