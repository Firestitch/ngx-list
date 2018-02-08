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
    //private _rowsDiffer: IterableDiffer<any[]>;
    // constructor(private cdRef: ChangeDetectorRef,
    //             private differs: IterableDiffers) {
    //   this._rowsDiffer = differs.find([]).create(null);
    // }
    FsListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.listConfig = new list_config_model_1.FsListModel(this.config);
        //this.listConfig.rows = this.rows;
        if (!this.listConfig.filters || this.listConfig.filters.length === 0 && this.listConfig.initialFetch) {
            this.listConfig.load();
        }
        this.listConfig.data$.subscribe(function (rows) {
            _this.displayRows = rows;
        });
    };
    //public ngDoCheck() {
    // const rowsDiffer = this._rowsDiffer.diff(this.rows);
    // const displayRowsDiffer = this._rowsDiffer.diff(this.displayRows);
    // if (rowsDiffer || displayRowsDiffer) {
    //   this.cdRef.markForCheck();
    // }
    // if (this.listConfig.paging.manual && rowsDiffer) {
    //   this.listConfig.paging.updatePagingManual(this.rows);
    //   this.listConfig.paging.pageChanged.next();
    // }
    //}
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
        this.listConfig.load();
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