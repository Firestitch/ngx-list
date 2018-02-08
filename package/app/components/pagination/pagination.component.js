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
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var pagination_model_1 = require("../../models/pagination.model");
var FsPaginationComponent = (function () {
    function FsPaginationComponent(cdRef) {
        this.cdRef = cdRef;
    }
    FsPaginationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataChangedRef.subscribe(function () {
            _this.cdRef.markForCheck();
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", pagination_model_1.Pagination)
    ], FsPaginationComponent.prototype, "pagination", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", BehaviorSubject_1.BehaviorSubject)
    ], FsPaginationComponent.prototype, "dataChangedRef", void 0);
    FsPaginationComponent = __decorate([
        core_1.Component({
            selector: 'fs-list-pagination',
            templateUrl: 'pagination.component.html',
            styleUrls: [
                './pagination.component.css'
            ],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [core_1.ChangeDetectorRef])
    ], FsPaginationComponent);
    return FsPaginationComponent;
}());
exports.FsPaginationComponent = FsPaginationComponent;
//# sourceMappingURL=pagination.component.js.map