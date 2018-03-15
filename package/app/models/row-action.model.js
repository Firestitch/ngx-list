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
    ActionType[ActionType["basic"] = 0] = "basic";
    ActionType[ActionType["raised"] = 1] = "raised";
    ActionType[ActionType["icon"] = 2] = "icon";
    ActionType[ActionType["fab"] = 3] = "fab";
    ActionType[ActionType["miniFab"] = 4] = "miniFab";
})(ActionType = exports.ActionType || (exports.ActionType = {}));
var RowAction = (function (_super) {
    __extends(RowAction, _super);
    function RowAction(config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this) || this;
        _this.classArray = [];
        _this._fromJSON(config);
        return _this;
    }
    RowAction.prototype._fromJSON = function (value) {
        _super.prototype._fromJSON.call(this, value);
        if (value.menu === undefined) {
            this.menu = true;
        }
        if (value.type === undefined) {
            this.type = ActionType.basic;
        }
        if (this.className) {
            this.classArray = this.className.split(' ').reduce(function (acc, elem) {
                acc.push(elem);
                return acc;
            }, []);
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
        __metadata("design:type", Number)
    ], RowAction.prototype, "type", void 0);
    return RowAction;
}(tsmodels_1.Model));
exports.RowAction = RowAction;
//# sourceMappingURL=row-action.model.js.map