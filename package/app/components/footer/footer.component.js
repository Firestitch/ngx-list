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
var body_component_1 = require("../body/body.component");
var FsFooterComponent = (function (_super) {
    __extends(FsFooterComponent, _super);
    function FsFooterComponent(cdRef, differs) {
        return _super.call(this, cdRef, differs) || this;
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], FsFooterComponent.prototype, "hasRowActions", void 0);
    FsFooterComponent = __decorate([
        core_1.Component({
            selector: '[fs-list-footer]',
            templateUrl: 'footer.component.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [core_1.ChangeDetectorRef,
            core_1.IterableDiffers])
    ], FsFooterComponent);
    return FsFooterComponent;
}(body_component_1.FsBodyComponent));
exports.FsFooterComponent = FsFooterComponent;
//# sourceMappingURL=footer.component.js.map