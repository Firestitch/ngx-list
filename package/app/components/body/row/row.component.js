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
    function FsRowComponent(el, _cdRef, _differs, _renderer) {
        this.el = el;
        this._cdRef = _cdRef;
        this._differs = _differs;
        this._renderer = _renderer;
        this.t = true;
        this.role = 'row';
        this.rowActions = [];
        this.rowEvents = {};
        this.reorder = false;
        this.startDragging = new core_1.EventEmitter();
        this.stopDragging = new core_1.EventEmitter();
        this._eventListeners = [];
        this._rowDiffer = _differs.find({}).create();
    }
    FsRowComponent.prototype.ngOnInit = function () {
        this.initRowEvents();
        if (this.rowActions) {
            this.menuRowActions = this.rowActions.filter(function (action) { return action.menu; });
            this.inlineRowActions = this.rowActions.filter(function (action) { return !action.menu; });
        }
    };
    FsRowComponent.prototype.ngDoCheck = function () {
        if (this._rowDiffer.diff(this.row)) {
            this._cdRef.markForCheck();
        }
    };
    FsRowComponent.prototype.ngOnDestroy = function () {
        this._eventListeners.forEach(function (listener) { listener(); });
    };
    FsRowComponent.prototype.mousedow = function (event) {
        if (this.reorder) {
            this.startDragging.emit({ event: event, target: this.el.nativeElement });
        }
    };
    /**
     * Set event listeners for row
     */
    FsRowComponent.prototype.initRowEvents = function () {
        var _this = this;
        var _loop_1 = function (event_1) {
            if (this_1.rowEvents.hasOwnProperty(event_1)) {
                var listener = this_1._renderer.listen(this_1.el.nativeElement, event_1, function (evt) {
                    if (!_this.reorder) {
                        _this.rowEvents[event_1]({
                            event: evt,
                            row: _this.row,
                            rowIndex: _this.rowIndex
                        });
                    }
                });
                this_1._eventListeners.push(listener);
            }
        };
        var this_1 = this;
        for (var event_1 in this.rowEvents) {
            _loop_1(event_1);
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
        __metadata("design:type", Array)
    ], FsRowComponent.prototype, "rowActions", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsRowComponent.prototype, "rowEvents", void 0);
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
            core_1.KeyValueDiffers,
            core_1.Renderer2])
    ], FsRowComponent);
    return FsRowComponent;
}());
exports.FsRowComponent = FsRowComponent;
//# sourceMappingURL=row.component.js.map