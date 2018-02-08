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
var core_1 = require("@angular/core");
var _isObject = require("lodash/isObject");
var _isBoolean = require("lodash/isBoolean");
var styleConfig_model_1 = require("./styleConfig.model");
var SortingDirection;
(function (SortingDirection) {
    SortingDirection[SortingDirection["asc"] = 0] = "asc";
    SortingDirection[SortingDirection["desc"] = 1] = "desc";
})(SortingDirection = exports.SortingDirection || (exports.SortingDirection = {}));
var ALLOWED_DEFAULTS = [
    'title',
    'sortable',
    'align',
    'class'
];
var Column = (function (_super) {
    __extends(Column, _super);
    function Column(colConfig, colDefaults) {
        if (colConfig === void 0) { colConfig = {}; }
        if (colDefaults === void 0) { colDefaults = false; }
        var _this = _super.call(this) || this;
        _this.headerConfigs = new styleConfig_model_1.StyleConfig();
        _this.cellConfigs = new styleConfig_model_1.StyleConfig();
        _this.footerConfigs = new styleConfig_model_1.StyleConfig();
        _this.headerColspanned = false;
        _this.cellColspanned = false;
        _this.footerColspanned = false;
        _this._ordered = false;
        _this._fromJSON(colConfig);
        _this.colStyles = new styleConfig_model_1.StyleConfig(colConfig);
        _this.mergeWithColumnDefaults(colDefaults);
        return _this;
    }
    Object.defineProperty(Column.prototype, "direction", {
        get: function () {
            return (this.sortingDirection === SortingDirection.asc) ? 'asc' : 'desc';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "fullNameDirection", {
        get: function () {
            return (this.sortingDirection === SortingDirection.asc) ? 'ascending' : 'descending';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "ordered", {
        get: function () {
            return this._ordered;
        },
        set: function (value) {
            this._ordered = value;
            if (value) {
                this.sortingDirection = SortingDirection.asc;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Merge with defaults with existing config
     * @param defaults
     */
    Column.prototype.mergeWithColumnDefaults = function (defaults) {
        var _this = this;
        if (!_isObject(defaults)) {
            defaults = {};
        }
        ALLOWED_DEFAULTS.forEach(function (key) {
            switch (key) {
                case 'title':
                    {
                        _this.title = _this.title || defaults.title;
                    }
                    break;
                case 'sortable':
                    {
                        if (_isBoolean(defaults.sortable)) {
                            if (_this.sortable === void 0) {
                                _this.sortable = defaults.sortable;
                            }
                        }
                    }
                    break;
                case 'class':
                    {
                        _this.headerConfigs.mergeClassByPriority(_this.colStyles, defaults.header);
                        _this.cellConfigs.mergeClassByPriority(_this.colStyles, defaults.cell);
                        _this.footerConfigs.mergeClassByPriority(_this.colStyles, defaults.footer);
                    }
                    break;
                case 'align':
                    {
                        _this.headerConfigs.mergeAlignByPriority(_this.colStyles, defaults.header);
                        _this.cellConfigs.mergeAlignByPriority(_this.colStyles, defaults.cell);
                        _this.footerConfigs.mergeAlignByPriority(_this.colStyles, defaults.footer);
                    }
                    break;
            }
        });
        this.headerConfigs.updateClasesArray();
        this.cellConfigs.updateClasesArray();
        this.footerConfigs.updateClasesArray();
    };
    /**
     * Change sorting direction
     */
    Column.prototype.changeDirection = function () {
        if (this.sortingDirection === SortingDirection.asc) {
            this.sortingDirection = SortingDirection.desc;
        }
        else {
            this.sortingDirection = SortingDirection.asc;
        }
    };
    __decorate([
        tsmodels_1.Alias(),
        __metadata("design:type", String)
    ], Column.prototype, "title", void 0);
    __decorate([
        tsmodels_1.Alias(),
        __metadata("design:type", String)
    ], Column.prototype, "name", void 0);
    __decorate([
        tsmodels_1.Alias(),
        __metadata("design:type", String)
    ], Column.prototype, "width", void 0);
    __decorate([
        tsmodels_1.Alias(),
        __metadata("design:type", Boolean)
    ], Column.prototype, "sortable", void 0);
    __decorate([
        tsmodels_1.Alias(),
        __metadata("design:type", core_1.TemplateRef)
    ], Column.prototype, "headerTemplate", void 0);
    __decorate([
        tsmodels_1.Alias(),
        __metadata("design:type", core_1.TemplateRef)
    ], Column.prototype, "rowTemplate", void 0);
    __decorate([
        tsmodels_1.Alias(),
        __metadata("design:type", core_1.TemplateRef)
    ], Column.prototype, "footerTemplate", void 0);
    __decorate([
        tsmodels_1.Alias('headerConfigs', styleConfig_model_1.StyleConfig),
        __metadata("design:type", styleConfig_model_1.StyleConfig)
    ], Column.prototype, "headerConfigs", void 0);
    __decorate([
        tsmodels_1.Alias('cellConfigs', styleConfig_model_1.StyleConfig),
        __metadata("design:type", styleConfig_model_1.StyleConfig)
    ], Column.prototype, "cellConfigs", void 0);
    __decorate([
        tsmodels_1.Alias('footerConfigs', styleConfig_model_1.StyleConfig),
        __metadata("design:type", styleConfig_model_1.StyleConfig)
    ], Column.prototype, "footerConfigs", void 0);
    return Column;
}(tsmodels_1.Model));
exports.Column = Column;
//# sourceMappingURL=column.model.js.map