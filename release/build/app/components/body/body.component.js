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
var row_component_1 = require("./row/row.component");
var FsBodyComponent = (function () {
    function FsBodyComponent(cdRef, _componentFactoryResolver) {
        this.cdRef = cdRef;
        this._componentFactoryResolver = _componentFactoryResolver;
        this.columns = [];
        this._rowComponent = row_component_1.FsRowComponent;
    }
    Object.defineProperty(FsBodyComponent.prototype, "rows", {
        get: function () {
            return this._rows;
        },
        set: function (value) {
            this._rows = value;
            this.rowsContainer.clear();
            this.initRowsComponents();
            this.cdRef.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    FsBodyComponent.prototype.ngOnInit = function () {
        // this.config.data$.subscribe((rows) => {
        //
        // })
    };
    FsBodyComponent.prototype.initRowsComponents = function () {
        var _this = this;
        this.rows.forEach(function (row, index) {
            _this.initRowComponent(row, index);
        });
    };
    FsBodyComponent.prototype.initRowComponent = function (data, index) {
        var componentFactory = this._componentFactoryResolver.resolveComponentFactory(this._rowComponent);
        var viewContainerRef = this.rowsContainer;
        var componentRef = viewContainerRef.createComponent(componentFactory);
        componentRef.instance.row = data;
        componentRef.instance.rowIndex = index;
        componentRef.instance.columns = this.columns;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], FsBodyComponent.prototype, "rows", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], FsBodyComponent.prototype, "columns", void 0);
    __decorate([
        core_1.ViewChild('rowsContainer', { read: core_1.ViewContainerRef }),
        __metadata("design:type", Object)
    ], FsBodyComponent.prototype, "rowsContainer", void 0);
    FsBodyComponent = __decorate([
        core_1.Component({
            selector: 'fs-list-body',
            templateUrl: 'body.component.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [core_1.ChangeDetectorRef,
            core_1.ComponentFactoryResolver])
    ], FsBodyComponent);
    return FsBodyComponent;
}());
exports.FsBodyComponent = FsBodyComponent;
//# sourceMappingURL=body.component.js.map