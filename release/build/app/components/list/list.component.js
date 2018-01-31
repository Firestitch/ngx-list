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
var directives_1 = require("../../directives");
var list_config_model_1 = require("../../models/list-config.model");
var FsListComponent = (function () {
    function FsListComponent(cdRef) {
        this.cdRef = cdRef;
        this.rows = [];
    }
    Object.defineProperty(FsListComponent.prototype, "columnTemplates", {
        /**
         * Set columns to config
         * Create Column Model instances
         *
         * @param {QueryList<FsListColumnDirective>} val
         */
        set: function (val) {
            this.config.tranformTemplatesToColumns(val);
        },
        enumerable: true,
        configurable: true
    });
    FsListComponent.prototype.actionClick = function () {
        alert('TODO');
    };
    FsListComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.config) {
            this.config = new list_config_model_1.FsListConfig();
        }
        if (!this.config.filters || this.config.filters.length === 0) {
            this.config.load();
        }
        this.config.data$.subscribe(function (rows) {
            _this.rows = rows;
            _this.cdRef.markForCheck();
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsListComponent.prototype, "config", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsListComponent.prototype, "columns", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], FsListComponent.prototype, "inlineFilters", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsListComponent.prototype, "rows", void 0);
    __decorate([
        core_1.ContentChildren(directives_1.FsListColumnDirective),
        __metadata("design:type", core_1.QueryList),
        __metadata("design:paramtypes", [core_1.QueryList])
    ], FsListComponent.prototype, "columnTemplates", null);
    FsListComponent = __decorate([
        core_1.Component({
            selector: 'fs-list',
            templateUrl: 'list.component.html',
            styleUrls: [
                './list.component.css',
            ],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [core_1.ChangeDetectorRef])
    ], FsListComponent);
    return FsListComponent;
}());
exports.FsListComponent = FsListComponent;
//# sourceMappingURL=list.component.js.map