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
var SortingDirection;
(function (SortingDirection) {
    SortingDirection[SortingDirection["asc"] = 0] = "asc";
    SortingDirection[SortingDirection["desc"] = 1] = "desc";
})(SortingDirection = exports.SortingDirection || (exports.SortingDirection = {}));
var Column = (function (_super) {
    __extends(Column, _super);
    function Column(colConfig) {
        if (colConfig === void 0) { colConfig = {}; }
        var _this = _super.call(this) || this;
        _this.headerClass = '';
        _this.cellClass = '';
        _this.headStyles = [];
        _this.cellStyles = [];
        _this._ordered = false;
        _this._fromJSON(colConfig);
        if (colConfig.template) {
            _this.template = colConfig.template;
        }
        _this.headStyles = _this.getClassesArray(_this.headerAlign, _this.headerClass);
        _this.cellStyles = _this.getClassesArray(_this.cellAlign, _this.cellClass);
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
    Column.prototype.getAlignClass = function (align) {
        if (align && ['left', 'center', 'right'].indexOf(align) > -1) {
            return align;
        }
        else {
            return 'left';
        }
    };
    Column.prototype.getClassesArray = function (align, cssClass) {
        var alignClass = this.getAlignClass(align) || [];
        var classArray = [];
        if (Array.isArray(cssClass)) {
            classArray = classArray.concat(cssClass, alignClass);
        }
        else if (cssClass) {
            classArray = classArray.concat(cssClass, alignClass);
        }
        else {
            classArray = classArray.concat(this.getAlignClass(align));
        }
        return classArray;
    };
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
        __metadata("design:type", Boolean)
    ], Column.prototype, "sortable", void 0);
    __decorate([
        tsmodels_1.Alias(),
        __metadata("design:type", String)
    ], Column.prototype, "headerAlign", void 0);
    __decorate([
        tsmodels_1.Alias(),
        __metadata("design:type", Object)
    ], Column.prototype, "headerClass", void 0);
    __decorate([
        tsmodels_1.Alias(),
        __metadata("design:type", String)
    ], Column.prototype, "cellAlign", void 0);
    __decorate([
        tsmodels_1.Alias(),
        __metadata("design:type", Object)
    ], Column.prototype, "cellClass", void 0);
    return Column;
}(tsmodels_1.Model));
exports.Column = Column;
//# sourceMappingURL=column.model.js.map