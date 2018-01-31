"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var material_1 = require("@angular/material");
var flex_layout_1 = require("@angular/flex-layout");
var filter_1 = require("@firestitch/filter");
var components_1 = require("./app/components");
var directives_1 = require("./app/directives");
__export(require("./app/components/list/list.component"));
var FsListModule = (function () {
    function FsListModule() {
    }
    FsListModule_1 = FsListModule;
    FsListModule.forRoot = function () {
        return {
            ngModule: FsListModule_1,
            providers: [
                components_1.FsListComponent
            ]
        };
    };
    FsListModule = FsListModule_1 = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                material_1.MatButtonModule,
                material_1.MatIconModule,
                material_1.MatMenuModule,
                filter_1.FsFilterModule,
                flex_layout_1.FlexLayoutModule
            ],
            entryComponents: [
                components_1.FsRowComponent,
            ],
            declarations: [
                // Components
                components_1.FsListComponent,
                components_1.FsRowComponent,
                components_1.FsCellComponent,
                // Internal Components
                components_1.FsStatusComponent,
                components_1.FsHeadComponent,
                components_1.FsHeadCellComponent,
                components_1.FsBodyComponent,
                components_1.FsPaginationComponent,
                // Directives
                directives_1.FsListColumnDirective,
                directives_1.FsListRowTemplateDirective,
            ],
            providers: [],
            exports: [
                components_1.FsListComponent,
                components_1.FsRowComponent,
                components_1.FsCellComponent,
                directives_1.FsListColumnDirective,
                directives_1.FsListRowTemplateDirective,
            ]
        })
    ], FsListModule);
    return FsListModule;
    var FsListModule_1;
}());
exports.FsListModule = FsListModule;
//# sourceMappingURL=fslist.module.js.map