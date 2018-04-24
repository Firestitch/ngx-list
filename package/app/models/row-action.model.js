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
var ActionType;
(function (ActionType) {
    ActionType["basic"] = "basic";
    ActionType["raised"] = "raised";
    ActionType["icon"] = "icon";
    ActionType["fab"] = "fab";
    ActionType["miniFab"] = "mini-fab";
})(ActionType = exports.ActionType || (exports.ActionType = {}));
var RowAction = (function (_super) {
    __extends(RowAction, _super);
    function RowAction(config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this) || this;
        _this.classArray = [];
        _this.isShown = true;
        _this._fromJSON(config);
        return _this;
    }
    RowAction.prototype._fromJSON = function (value) {
        var _this = this;
        _super.prototype._fromJSON.call(this, value);
        if (value.type === void 0) {
            this.type = ActionType.basic;
        }
        value.click = function (row, event, rowActionsRef) {
            if (rowActionsRef === void 0) { rowActionsRef = null; }
            _this.clickEvent(row, event, rowActionsRef, value);
        };
        if (this.className) {
            this.classArray = this.className.split(' ').reduce(function (acc, elem) {
                acc.push(elem);
                return acc;
            }, []);
        }
    };
    RowAction.prototype.checkShowStatus = function (row) {
        if (this.show) {
            this.isShown = this.show(row);
        }
    };
    RowAction.prototype.clickEvent = function (row, event, rowActionsRef, value) {
        // Stop event propagation for parent
        event.stopPropagation();
        // Close menu
        if (rowActionsRef) {
            rowActionsRef.close.emit();
        }
        if (value.click) {
            // Fire passed callback
            value.click(row, event);
        }
    };
    __decorate([
        tsmodels_1.Alias(),
        __metadata("design:type", String)
    ], RowAction.prototype, "icon", void 0);
    __decorate([
        tsmodels_1.Alias(),
        __metadata("design:type", String)
    ], RowAction.prototype, "label", void 0);
    __decorate([
        tsmodels_1.Alias(),
        __metadata("design:type", Boolean)
    ], RowAction.prototype, "menu", void 0);
    __decorate([
        tsmodels_1.Alias(),
        __metadata("design:type", Function)
    ], RowAction.prototype, "click", void 0);
    __decorate([
        tsmodels_1.Alias(),
        __metadata("design:type", String)
    ], RowAction.prototype, "className", void 0);
    __decorate([
        tsmodels_1.Alias(),
        __metadata("design:type", String)
    ], RowAction.prototype, "type", void 0);
    __decorate([
        tsmodels_1.Alias(),
        __metadata("design:type", Function)
    ], RowAction.prototype, "show", void 0);
    return RowAction;
}(tsmodels_1.Model));
exports.RowAction = RowAction;
//# sourceMappingURL=row-action.model.js.map