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
var _isString = require("lodash/isString");
var StyleConfig = (function (_super) {
    __extends(StyleConfig, _super);
    function StyleConfig(config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this) || this;
        _this.className = []; // Can't be used in tempaltes!
        _this.classesArray = []; // Can be used in tempaltes
        _this._fromJSON(config);
        return _this;
    }
    /**
     * Create static array of styles for using in templates
     */
    StyleConfig.prototype.updateClasesArray = function () {
        this.classesArray = [].concat(this.className, this.align);
    };
    /**
     * Prioritized merge for align options
     * @param {StyleConfig} prior1
     * @param {StyleConfig} prior2
     */
    StyleConfig.prototype.mergeAlignByPriority = function (prior1, prior2) {
        var targetValue = this.align;
        if (targetValue === void 0) {
            if (prior1 && prior1.align !== void 0) {
                targetValue = prior1.align;
            }
            else if (prior2 && prior2.align !== void 0) {
                targetValue = prior2.align;
            }
            else {
                targetValue = 'left';
            }
        }
        this.align = targetValue;
    };
    /**
     * Prioritized merge for class options
     * @param {StyleConfig} prior1
     * @param {StyleConfig} prior2
     */
    StyleConfig.prototype.mergeClassByPriority = function (prior1, prior2) {
        var targetValue = [];
        if (Array.isArray(this.className)) {
            targetValue = targetValue.concat(this.className);
        }
        else if (_isString(this.className)) {
            targetValue.push(this.className);
        }
        if (prior1 && prior1.className !== void 0) {
            this.mergeAnythingIntoArray(targetValue, prior1.className);
        }
        else if (prior2 && prior2.className !== void 0) {
            this.mergeAnythingIntoArray(targetValue, prior2.className);
        }
        this.className = targetValue;
    };
    /**
     * Merge params into array
     * @param {string[]} to
     * @param {string | string[]} from
     * @returns {string[]}
     */
    StyleConfig.prototype.mergeAnythingIntoArray = function (to, from) {
        if (_isString(from)) {
            to.push(from);
        }
        else if (Array.isArray(from)) {
            to.push.apply(to, from);
        }
    };
    __decorate([
        tsmodels_1.Alias(),
        __metadata("design:type", Object)
    ], StyleConfig.prototype, "colspan", void 0);
    __decorate([
        tsmodels_1.Alias(),
        __metadata("design:type", String)
    ], StyleConfig.prototype, "align", void 0);
    __decorate([
        tsmodels_1.Alias(),
        __metadata("design:type", Object)
    ], StyleConfig.prototype, "className", void 0);
    return StyleConfig;
}(tsmodels_1.Model));
exports.StyleConfig = StyleConfig;
//# sourceMappingURL=styleConfig.model.js.map