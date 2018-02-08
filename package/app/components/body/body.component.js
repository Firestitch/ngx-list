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
var FsBodyComponent = (function () {
    function FsBodyComponent(cdRef, differs) {
        this.cdRef = cdRef;
        this.differs = differs;
        this.columns = [];
        this.hasFooter = false;
        this.rowActions = [];
        this._rowsDiffer = differs.find([]).create(null);
    }
    FsBodyComponent.prototype.ngDoCheck = function () {
        if (this._rowsDiffer.diff(this.rows)) {
            this.cdRef.markForCheck();
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsBodyComponent.prototype, "rows", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], FsBodyComponent.prototype, "columns", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsBodyComponent.prototype, "hasFooter", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsBodyComponent.prototype, "rowActions", void 0);
    __decorate([
        core_1.ViewChild('rowsContainer', { read: core_1.ViewContainerRef }),
        __metadata("design:type", Object)
    ], FsBodyComponent.prototype, "rowsContainer", void 0);
    FsBodyComponent = __decorate([
        core_1.Component({
            selector: '[fs-list-body]',
            templateUrl: 'body.component.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [core_1.ChangeDetectorRef,
            core_1.IterableDiffers])
    ], FsBodyComponent);
    return FsBodyComponent;
}());
exports.FsBodyComponent = FsBodyComponent;
//# sourceMappingURL=body.component.js.map