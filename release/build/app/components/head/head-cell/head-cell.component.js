"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var cell_component_1 = require("../../body/row/cell/cell.component");
var FsHeadCellComponent = (function (_super) {
    __extends(FsHeadCellComponent, _super);
    function FsHeadCellComponent(cdRef, differs) {
        var _this = _super.call(this) || this;
        _this.cdRef = cdRef;
        _this.differs = differs;
        _this.cellContext = {};
        _this._columnDiffer = differs.find({}).create();
        return _this;
    }
    FsHeadCellComponent.prototype.ngDoCheck = function () {
        if (this._columnDiffer.diff(this.column)) {
            this.cdRef.markForCheck();
        }
    };
    FsHeadCellComponent.prototype.initCellContext = function () {
        this.cellContext.value = this.column.title;
    };
    FsHeadCellComponent = __decorate([
        core_1.Component({
            selector: 'fs-head-cell',
            templateUrl: 'head-cell.component.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [core_1.ChangeDetectorRef,
            core_1.KeyValueDiffers])
    ], FsHeadCellComponent);
    return FsHeadCellComponent;
}(cell_component_1.FsCellComponent));
exports.FsHeadCellComponent = FsHeadCellComponent;
//# sourceMappingURL=head-cell.component.js.map