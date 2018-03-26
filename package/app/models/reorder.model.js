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
var ReorderModel = (function (_super) {
    __extends(ReorderModel, _super);
    function ReorderModel(data) {
        if (data === void 0) { data = {}; }
        var _this = _super.call(this) || this;
        _this._fromJSON(data);
        return _this;
    }
    ReorderModel.prototype._fromJSON = function (data) {
        _super.prototype._fromJSON.call(this, data);
        if (data.menu === void 0) {
            this.menu = true;
        }
    };
    __decorate([
        tsmodels_1.Alias(),
        __metadata("design:type", Function)
    ], ReorderModel.prototype, "start", void 0);
    __decorate([
        tsmodels_1.Alias(),
        __metadata("design:type", Function)
    ], ReorderModel.prototype, "done", void 0);
    __decorate([
        tsmodels_1.Alias(),
        __metadata("design:type", String)
    ], ReorderModel.prototype, "label", void 0);
    __decorate([
        tsmodels_1.Alias(),
        __metadata("design:type", Boolean)
    ], ReorderModel.prototype, "menu", void 0);
    return ReorderModel;
}(tsmodels_1.Model));
exports.ReorderModel = ReorderModel;
//# sourceMappingURL=reorder.model.js.map