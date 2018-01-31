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
var column_model_1 = require("../../../../models/column.model");
var FsCellComponent = (function () {
    function FsCellComponent() {
        this.isColl = true;
        this.role = 'gridcell';
        this.cellContext = {};
    }
    FsCellComponent.prototype.ngOnInit = function () {
        this.initCellContext();
    };
    FsCellComponent.prototype.initCellContext = function () {
        this.cellContext.index = this.rowIndex + 1;
        this.cellContext.row = this.row;
        this.cellContext.column = this.column;
        this.cellContext.value = this.row[this.column.name];
    };
    __decorate([
        core_1.HostBinding('class.fs-list-col'),
        __metadata("design:type", Object)
    ], FsCellComponent.prototype, "isColl", void 0);
    __decorate([
        core_1.HostBinding('attr.role'),
        __metadata("design:type", Object)
    ], FsCellComponent.prototype, "role", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", column_model_1.Column)
    ], FsCellComponent.prototype, "column", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsCellComponent.prototype, "row", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], FsCellComponent.prototype, "rowIndex", void 0);
    FsCellComponent = __decorate([
        core_1.Component({
            selector: 'fs-cell',
            templateUrl: 'cell.component.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [])
    ], FsCellComponent);
    return FsCellComponent;
}());
exports.FsCellComponent = FsCellComponent;
//# sourceMappingURL=cell.component.js.map