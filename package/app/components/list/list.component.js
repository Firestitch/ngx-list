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
var models_1 = require("../../models");
var FsListComponent = (function () {
    function FsListComponent() {
    }
    Object.defineProperty(FsListComponent.prototype, "columnTemplates", {
        /**
         * Set columns to config
         * Create Column Model instances
         *
         * @param {QueryList<FsListColumnDirective>} val
         */
        set: function (val) {
            this.listConfig.tranformTemplatesToColumns(val);
        },
        enumerable: true,
        configurable: true
    });
    FsListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.listConfig = new models_1.FsListModel(this.config);
        if (!this.listConfig.filters || this.listConfig.filters.length === 0 && this.listConfig.initialFetch) {
            this.listConfig.load$.next();
        }
        this.listConfig.data$.subscribe(function (rows) {
            _this.displayRows = rows;
        });
    };
    FsListComponent.prototype.ngOnDestroy = function () {
        this.listConfig.data$.complete();
        this.listConfig.paging.pageChanged.complete();
    };
    FsListComponent.prototype.nextPage = function () {
        this.listConfig.paging.goNext();
    };
    FsListComponent.prototype.prevPage = function () {
        this.listConfig.paging.goPrev();
    };
    FsListComponent.prototype.firstPage = function () {
        this.listConfig.paging.goFirst();
    };
    FsListComponent.prototype.lastPage = function () {
        this.listConfig.paging.goLast();
    };
    FsListComponent.prototype.load = function () {
        this.listConfig.load$.next();
    };
    FsListComponent.prototype.finishReorder = function () {
        this.listConfig.reoderEnabled = false;
        if (this.listConfig.reoder.done) {
            this.listConfig.reoder.done(this.displayRows);
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsListComponent.prototype, "config", void 0);
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
        })
    ], FsListComponent);
    return FsListComponent;
}());
exports.FsListComponent = FsListComponent;
//# sourceMappingURL=list.component.js.map