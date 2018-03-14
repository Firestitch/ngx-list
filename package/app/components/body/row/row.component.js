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
var FsRowComponent = (function () {
    function FsRowComponent(el, cdRef, differs) {
        this.el = el;
        this.cdRef = cdRef;
        this.differs = differs;
        this.t = true;
        this.role = 'row';
        this.rowActions = [];
        this.reorder = false;
        this.startDragging = new core_1.EventEmitter();
        this.stopDragging = new core_1.EventEmitter();
        this._rowDiffer = differs.find({}).create();
    }
    FsRowComponent.prototype.mousedow = function (event) {
        this.startDragging.emit({ event: event, target: this.el.nativeElement });
    };
    FsRowComponent.prototype.ngDoCheck = function () {
        if (this._rowDiffer.diff(this.row)) {
            this.cdRef.markForCheck();
        }
    };
    __decorate([
        core_1.HostBinding('class.fs-list-row'),
        __metadata("design:type", Object)
    ], FsRowComponent.prototype, "t", void 0);
    __decorate([
        core_1.HostBinding('attr.role'),
        __metadata("design:type", Object)
    ], FsRowComponent.prototype, "role", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsRowComponent.prototype, "row", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsRowComponent.prototype, "rowActions", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], FsRowComponent.prototype, "rowIndex", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], FsRowComponent.prototype, "columns", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsRowComponent.prototype, "reorder", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], FsRowComponent.prototype, "startDragging", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], FsRowComponent.prototype, "stopDragging", void 0);
    FsRowComponent = __decorate([
        core_1.Component({
            selector: '[fs-list-row]',
            templateUrl: 'row.component.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [core_1.ElementRef,
            core_1.ChangeDetectorRef,
            core_1.KeyValueDiffers])
    ], FsRowComponent);
    return FsRowComponent;
}());
exports.FsRowComponent = FsRowComponent;
//# sourceMappingURL=row.component.js.map