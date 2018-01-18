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
var cell_component_1 = require("../cell/cell.component");
var fslist_1 = require("../../../fslist");
var FsListComponent = (function () {
    function FsListComponent(compiler, _injector, _m, app) {
        this.compiler = compiler;
        this._injector = _injector;
        this._m = _m;
        this.app = app;
        this.components = [];
    }
    FsListComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (this.list.filters && this.list.filters.length) {
            setTimeout(function () {
                _this.list.filterService.fsConfig = {
                    persist: _this.list.persist,
                    items: _this.list.filters,
                    inline: _this.list.inlineFilters,
                    init: function (instance) {
                        _this.list.load(instance.gets({ flatten: true }));
                    },
                    change: function (query, instance) {
                        _this.list.load(instance.gets({ flatten: true }));
                    }
                };
            });
        }
        else {
            this.list.load({});
        }
        this.items.changes
            .subscribe(function (cellRef) {
            _this.renderColumns();
        });
    };
    FsListComponent.prototype.renderColumns = function () {
        var _this = this;
        this.components = [];
        this.compiler.clearCache();
        this.list.data$.value.forEach(function (row) {
            _this.list.columns.forEach(function (column) {
                var component = core_1.Component({
                    template: column.template,
                    encapsulation: core_1.ViewEncapsulation.Emulated,
                    styles: []
                })((function () {
                    function class_1() {
                        this.row = row;
                    }
                    // public column = column;
                    class_1.prototype.ngOnInit = function () {
                        Object.assign(this, column.data || {});
                    };
                    return class_1;
                }()));
                _this.components.push(component);
            });
        });
        var tmpModule = core_1.NgModule({
            declarations: this.components,
            imports: this.list.imports
        })((function () {
            function class_2() {
            }
            return class_2;
        }()));
        this.compiler.compileModuleAndAllComponentsAsync(tmpModule)
            .then(function (factories) {
            _this.items.forEach(function (item, index) {
                var cmpRef = factories.componentFactories[index].create(_this._injector, [], null, _this._m);
                cmpRef.instance.name = 'dynamic' + index;
                item.insert(cmpRef.hostView);
            });
        });
    };
    FsListComponent.prototype.topActionsClick = function (action, $event) {
        if (action.click) {
            action.click(this.list.filtersQuery, $event);
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", fslist_1.FsList)
    ], FsListComponent.prototype, "list", void 0);
    __decorate([
        core_1.ViewChild('vc', { read: core_1.ViewContainerRef }),
        __metadata("design:type", Object)
    ], FsListComponent.prototype, "vc", void 0);
    __decorate([
        core_1.ViewChildren(cell_component_1.FsCellComponent, { read: core_1.ViewContainerRef }),
        __metadata("design:type", core_1.QueryList)
    ], FsListComponent.prototype, "items", void 0);
    FsListComponent = __decorate([
        core_1.Component({
            selector: 'fs-list',
            templateUrl: './list.component.html',
            styleUrls: ['./list.component.css'],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [core_1.Compiler, core_1.Injector,
            core_1.NgModuleRef, core_1.ApplicationRef])
    ], FsListComponent);
    return FsListComponent;
}());
exports.FsListComponent = FsListComponent;
//# sourceMappingURL=list.component.js.map