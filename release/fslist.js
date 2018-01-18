"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var Observable_1 = require("rxjs/Observable");
var filter_1 = require("@firestitch/filter");
var FsList = (function () {
    function FsList(config) {
        this.inlineFilters = false;
        this.topActions = [];
        // Modules available for column templates
        this.imports = [];
        this.data$ = new BehaviorSubject_1.BehaviorSubject([]);
        this.filters = [];
        this.filterService = new filter_1.FsFilter();
        this.filtersQuery = {};
        Object.assign(this, config || {});
    }
    FsList.create = function (config) {
        return new FsList(config);
    };
    /*
    setConfig(config: any) {
        Object.assign(this, config || {});
    }
    */
    // Populated from config
    FsList.prototype.data = function (query) { };
    FsList.prototype.load = function (query) {
        var _this = this;
        this.filtersQuery = query;
        var result = this.data(this.filtersQuery);
        if (result instanceof Promise) {
            result.then(function (response) {
                _this.data$.next(response.data);
            });
        }
        else if (result instanceof Observable_1.Observable) {
            result.subscribe(function (response) {
                _this.data$.next(response.data);
            });
        }
    };
    return FsList;
}());
exports.FsList = FsList;
//# sourceMappingURL=fslist.js.map