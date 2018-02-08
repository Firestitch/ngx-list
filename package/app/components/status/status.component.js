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
var column_model_1 = require("../../models/column.model");
var pagination_model_1 = require("../../models/pagination.model");
var sorting_model_1 = require("../../models/sorting.model");
var FsStatusComponent = (function () {
    function FsStatusComponent(cdRef) {
        this.cdRef = cdRef;
        this.OrderDirection = column_model_1.SortingDirection;
    }
    FsStatusComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataChangedRef.subscribe(function () {
            _this.cdRef.markForCheck();
        });
    };
    FsStatusComponent.prototype.setDirection = function (direction) {
        this.sorting.setSortDirection(direction);
    };
    FsStatusComponent.prototype.setSortableColumn = function (column) {
        this.sorting.sortBy(column, false);
    };
    FsStatusComponent.prototype.setLimit = function (limit) {
        this.paging.setLimit(limit);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", pagination_model_1.Pagination)
    ], FsStatusComponent.prototype, "paging", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", sorting_model_1.Sorting)
    ], FsStatusComponent.prototype, "sorting", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsStatusComponent.prototype, "dataChangedRef", void 0);
    FsStatusComponent = __decorate([
        core_1.Component({
            selector: 'fs-list-status',
            templateUrl: 'status.component.html',
            styleUrls: [
                './status.component.css',
            ],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [core_1.ChangeDetectorRef])
    ], FsStatusComponent);
    return FsStatusComponent;
}());
exports.FsStatusComponent = FsStatusComponent;
//# sourceMappingURL=status.component.js.map