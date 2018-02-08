"use strict";
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
var core_1 = require("@angular/core");
var FsListFooterDirective = (function () {
    function FsListFooterDirective() {
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsListFooterDirective.prototype, "colspan", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], FsListFooterDirective.prototype, "align", void 0);
    __decorate([
        core_1.Input('class'),
        __metadata("design:type", Object)
    ], FsListFooterDirective.prototype, "className", void 0);
    FsListFooterDirective = __decorate([
        core_1.Directive({ selector: '[fs-list-footer]' })
    ], FsListFooterDirective);
    return FsListFooterDirective;
}());
exports.FsListFooterDirective = FsListFooterDirective;
//# sourceMappingURL=footer.directive.js.map