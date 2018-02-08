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
var _1 = require("../");
var footer_directive_1 = require("../footer/footer.directive");
var FsListColumnDirective = (function () {
    function FsListColumnDirective() {
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], FsListColumnDirective.prototype, "title", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], FsListColumnDirective.prototype, "name", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], FsListColumnDirective.prototype, "sortable", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], FsListColumnDirective.prototype, "align", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], FsListColumnDirective.prototype, "width", void 0);
    __decorate([
        core_1.Input('class'),
        __metadata("design:type", Object)
    ], FsListColumnDirective.prototype, "className", void 0);
    __decorate([
        core_1.ContentChild(_1.FsListHeaderDirective, { read: core_1.TemplateRef }),
        __metadata("design:type", core_1.TemplateRef)
    ], FsListColumnDirective.prototype, "headerTemplate", void 0);
    __decorate([
        core_1.ContentChild(_1.FsListHeaderDirective),
        __metadata("design:type", Object)
    ], FsListColumnDirective.prototype, "headerConfigs", void 0);
    __decorate([
        core_1.ContentChild(_1.FsListCellDirective, { read: core_1.TemplateRef }),
        __metadata("design:type", core_1.TemplateRef)
    ], FsListColumnDirective.prototype, "rowTemplate", void 0);
    __decorate([
        core_1.ContentChild(_1.FsListCellDirective),
        __metadata("design:type", Object)
    ], FsListColumnDirective.prototype, "cellConfigs", void 0);
    __decorate([
        core_1.ContentChild(footer_directive_1.FsListFooterDirective, { read: core_1.TemplateRef }),
        __metadata("design:type", core_1.TemplateRef)
    ], FsListColumnDirective.prototype, "footerTemplate", void 0);
    __decorate([
        core_1.ContentChild(footer_directive_1.FsListFooterDirective),
        __metadata("design:type", Object)
    ], FsListColumnDirective.prototype, "footerConfigs", void 0);
    FsListColumnDirective = __decorate([
        core_1.Directive({
            selector: 'fs-list-column'
        })
    ], FsListColumnDirective);
    return FsListColumnDirective;
}());
exports.FsListColumnDirective = FsListColumnDirective;
//# sourceMappingURL=column.directive.js.map