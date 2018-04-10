(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("@firestitch/list", [], factory);
	else if(typeof exports === 'object')
		exports["@firestitch/list"] = factory();
	else
		root["@firestitch/list"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/css-loader/index.js?{\"sourceMap\":true}!../node_modules/postcss-loader/lib/index.js?{\"sourceMap\":true}!../node_modules/resolve-url-loader/index.js?{\"sourceMap\":true,\"absolute\":false,\"fail\":false,\"silent\":false,\"keepQuery\":false,\"attempts\":0,\"debug\":false,\"root\":null,\"includeRoot\":false}!../node_modules/sass-loader/lib/loader.js?{\"sourceMap\":true}!./app/components/pagination/pagination.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ".paging .pages {\n  text-align: center;\n  padding: 0;\n  margin: 0;\n}\n\n.paging .pages li {\n  display: inline-block;\n}\n\n.paging .pages li a {\n  display: inline-block;\n  padding: 16px;\n  text-align: center;\n  color: #333;\n  text-decoration: none;\n  font-size: 15px;\n  cursor: pointer;\n}\n\n.paging .pages li:not(.page) a {\n  font-size: 19px;\n}\n\n.paging .pages li.disabled a {\n  pointer-events: none;\n  cursor: default;\n  color: #ccc;\n}\n\n.paging .pages li.active a {\n  font-weight: bold;\n}\n\n.paging .records div {\n  margin-top: 10px;\n}\n\n", "", {"version":3,"sources":["/Users/mendor/work/fs-list/src/app/components/pagination/src/app/components/pagination/pagination.component.scss","/Users/mendor/work/fs-list/pagination.component.scss"],"names":[],"mappings":"AAEE;EACE,mBAAA;EACA,WAAA;EACA,UAAA;CCDH;;ADJD;EAQM,sBAAA;CCAL;;ADRD;EAWQ,sBAAA;EACA,cAAA;EACA,mBAAA;EACA,YAAA;EACA,sBAAA;EACA,gBAAA;EACA,gBAAA;CCCP;;ADEkB;EACX,gBAAA;CCCP;;ADEgB;EACT,qBAAA;EACA,gBAAA;EACA,YAAA;CCCP;;AD5BD;EA+BQ,kBAAA;CCCP;;ADhCD;EAsCM,iBAAA;CCFL","file":"pagination.component.scss","sourcesContent":[".paging {\n\n  .pages {\n    text-align: center;\n    padding: 0;\n    margin: 0;\n\n    li {\n      display: inline-block;\n\n      a {\n        display: inline-block;\n        padding: 16px;\n        text-align: center;\n        color: #333;\n        text-decoration: none;\n        font-size: 15px;\n        cursor: pointer;\n      }\n\n      &:not(.page) a {\n        font-size: 19px;\n      }\n\n      &.disabled a {\n        pointer-events: none;\n        cursor: default;\n        color: #ccc;\n      }\n\n      &.active a {\n        font-weight: bold;\n      }\n    }\n  }\n\n  .records {\n    div {\n      margin-top: 10px;\n    }\n  }\n\n  .limits {\n\n  }\n}\n",".paging .pages {\n  text-align: center;\n  padding: 0;\n  margin: 0;\n}\n\n.paging .pages li {\n  display: inline-block;\n}\n\n.paging .pages li a {\n  display: inline-block;\n  padding: 16px;\n  text-align: center;\n  color: #333;\n  text-decoration: none;\n  font-size: 15px;\n  cursor: pointer;\n}\n\n.paging .pages li:not(.page) a {\n  font-size: 19px;\n}\n\n.paging .pages li.disabled a {\n  pointer-events: none;\n  cursor: default;\n  color: #ccc;\n}\n\n.paging .pages li.active a {\n  font-weight: bold;\n}\n\n.paging .records div {\n  margin-top: 10px;\n}\n\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ "../node_modules/css-loader/index.js?{\"sourceMap\":true}!../node_modules/postcss-loader/lib/index.js?{\"sourceMap\":true}!../node_modules/resolve-url-loader/index.js?{\"sourceMap\":true,\"absolute\":false,\"fail\":false,\"silent\":false,\"keepQuery\":false,\"attempts\":0,\"debug\":false,\"root\":null,\"includeRoot\":false}!../node_modules/sass-loader/lib/loader.js?{\"sourceMap\":true}!./app/components/status/status.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ".infinite-records {\n  display: block;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  color: #999;\n  font-size: 13px;\n}\n\n.infinite-records a {\n  color: #546E7A;\n}\n\n.infinite-records .order-toggle {\n  cursor: pointer;\n  padding-left: 4px;\n}\n\n.infinite-records .saved-filters {\n  float: right;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n\n", "", {"version":3,"sources":["/Users/mendor/work/fs-list/src/app/components/status/src/app/components/status/status.component.scss","/Users/mendor/work/fs-list/status.component.scss"],"names":[],"mappings":"AAAA;EACE,eAAA;EACA,iBAAA;EACA,oBAAA;EACA,wBAAA;EACA,YAAA;EACA,gBAAA;CCCD;;ADPD;EASG,eAAA;CCEF;;ADXD;EAaI,gBAAA;EACA,kBAAA;CCEH;;ADCC;EACE,aAAA;EACA,qBAAA;EAAA,qBAAA;EAAA,cAAA;CCEH","file":"status.component.scss","sourcesContent":[".infinite-records {\n  display: block;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  color: #999;\n  font-size: 13px;\n\n  a {\n   color: #546E7A;\n  }\n\n  .order-toggle {\n    cursor: pointer;\n    padding-left: 4px;\n  }\n\n  .saved-filters {\n    float: right;\n    display: flex;\n  }\n}\n",".infinite-records {\n  display: block;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  color: #999;\n  font-size: 13px;\n}\n\n.infinite-records a {\n  color: #546E7A;\n}\n\n.infinite-records .order-toggle {\n  cursor: pointer;\n  padding-left: 4px;\n}\n\n.infinite-records .saved-filters {\n  float: right;\n  display: flex;\n}\n\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ "../node_modules/css-loader/index.js?{\"sourceMap\":true}!../node_modules/postcss-loader/lib/index.js?{\"sourceMap\":true}!../node_modules/resolve-url-loader/index.js?{\"sourceMap\":true}!../node_modules/sass-loader/lib/loader.js?{\"sourceMap\":true}!./app/components/list/list.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ":host {\n  width: 100%;\n  display: block;\n}\n\n.fs-list-container {\n  width: 100%;\n}\n\n.fs-list-table-container {\n  width: 100%;\n  overflow: auto;\n}\n\n.fs-list-table {\n  display: table;\n  width: 100%;\n  border-collapse: collapse;\n}\n\n:host ::ng-deep .fs-filter {\n  margin-bottom: 0;\n}\n\n:host ::ng-deep .fs-filter .main-filter-bar {\n  overflow: hidden;\n}\n\n:host ::ng-deep .hidden {\n  display: none;\n}\n\n:host ::ng-deep .fs-list-body {\n  display: table-row-group;\n  position: relative;\n  border-bottom: 2px solid #ddd;\n}\n\n:host ::ng-deep .fs-list-body.loading {\n  opacity: 0.4;\n}\n\n:host ::ng-deep .fs-list-body .fs-list-col {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n\n:host ::ng-deep .fs-list-body .fs-list-row:hover .fs-list-col {\n  background-color: #f6f6f6;\n}\n\n:host ::ng-deep .fs-list-body .fs-list-row:hover .fs-list-col {\n  background-color: #f6f6f6;\n}\n\n:host ::ng-deep .fs-list-body .fs-list-row.drag-row {\n  cursor: move;\n}\n\n:host ::ng-deep .fs-list-head tr:last-child .fs-list-col,\n:host ::ng-deep .fs-list-body tr:last-child .fs-list-col {\n  border-bottom: 2px solid #ddd;\n}\n\n:host ::ng-deep .fs-list-head .fs-list-row,\n:host ::ng-deep .fs-list-body .fs-list-row,\n:host ::ng-deep .fs-list-footer .fs-list-row {\n  display: table-row;\n}\n\n:host ::ng-deep .fs-list-head .fs-list-row.draggable,\n:host ::ng-deep .fs-list-body .fs-list-row.draggable,\n:host ::ng-deep .fs-list-footer .fs-list-row.draggable {\n  position: fixed;\n  z-index: 9999;\n}\n\n:host ::ng-deep .fs-list-head .fs-list-row.draggable .fs-list-col,\n:host ::ng-deep .fs-list-body .fs-list-row.draggable .fs-list-col,\n:host ::ng-deep .fs-list-footer .fs-list-row.draggable .fs-list-col {\n  background-color: #f6f6f6;\n}\n\n:host ::ng-deep .fs-list-head .fs-list-row:nth-child(1) .fs-list-col,\n:host ::ng-deep .fs-list-body .fs-list-row:nth-child(1) .fs-list-col,\n:host ::ng-deep .fs-list-footer .fs-list-row:nth-child(1) .fs-list-col {\n  border-top: 0;\n}\n\n:host ::ng-deep .fs-list-head .fs-list-row .fs-list-col,\n:host ::ng-deep .fs-list-body .fs-list-row .fs-list-col,\n:host ::ng-deep .fs-list-footer .fs-list-row .fs-list-col {\n  display: table-cell;\n  border-top: 1px solid #ddd;\n  padding: 8px 12px;\n  vertical-align: middle;\n  outline: none;\n}\n\n:host ::ng-deep .fs-list-head .fs-list-row .fs-list-col.drag-col,\n:host ::ng-deep .fs-list-body .fs-list-row .fs-list-col.drag-col,\n:host ::ng-deep .fs-list-footer .fs-list-row .fs-list-col.drag-col {\n  width: 1%;\n}\n\n:host ::ng-deep .fs-list-head .fs-list-row .fs-list-col:first-child,\n:host ::ng-deep .fs-list-head .fs-list-row .fs-list-col:last-child,\n:host ::ng-deep .fs-list-body .fs-list-row .fs-list-col:first-child,\n:host ::ng-deep .fs-list-body .fs-list-row .fs-list-col:last-child,\n:host ::ng-deep .fs-list-footer .fs-list-row .fs-list-col:first-child,\n:host ::ng-deep .fs-list-footer .fs-list-row .fs-list-col:last-child {\n  padding-left: 20px;\n}\n\n:host ::ng-deep .fs-list-head .fs-list-row .fs-list-col.row-actions,\n:host ::ng-deep .fs-list-body .fs-list-row .fs-list-col.row-actions,\n:host ::ng-deep .fs-list-footer .fs-list-row .fs-list-col.row-actions {\n  width: 1%;\n  white-space: nowrap;\n  padding-right: 10px;\n  overflow: hidden;\n}\n\n:host ::ng-deep .fs-list-head .fs-list-row .fs-list-col.row-actions .row-inline-action,\n:host ::ng-deep .fs-list-body .fs-list-row .fs-list-col.row-actions .row-inline-action,\n:host ::ng-deep .fs-list-footer .fs-list-row .fs-list-col.row-actions .row-inline-action {\n  margin-left: 12px;\n  display: inline-block;\n}\n\n:host ::ng-deep .fs-list-head .fs-list-row .fs-list-col.row-actions .row-inline-action:first-child,\n:host ::ng-deep .fs-list-body .fs-list-row .fs-list-col.row-actions .row-inline-action:first-child,\n:host ::ng-deep .fs-list-footer .fs-list-row .fs-list-col.row-actions .row-inline-action:first-child {\n  margin-left: 0;\n}\n\n:host ::ng-deep .fs-list-head .fs-list-row .fs-list-col.row-actions .row-inline-action-icon,\n:host ::ng-deep .fs-list-head .fs-list-row .fs-list-col.row-actions .row-inline-action-fab,\n:host ::ng-deep .fs-list-head .fs-list-row .fs-list-col.row-actions .row-inline-action-mini-fab,\n:host ::ng-deep .fs-list-head .fs-list-row .fs-list-col.row-actions .row-menu-action,\n:host ::ng-deep .fs-list-body .fs-list-row .fs-list-col.row-actions .row-inline-action-icon,\n:host ::ng-deep .fs-list-body .fs-list-row .fs-list-col.row-actions .row-inline-action-fab,\n:host ::ng-deep .fs-list-body .fs-list-row .fs-list-col.row-actions .row-inline-action-mini-fab,\n:host ::ng-deep .fs-list-body .fs-list-row .fs-list-col.row-actions .row-menu-action,\n:host ::ng-deep .fs-list-footer .fs-list-row .fs-list-col.row-actions .row-inline-action-icon,\n:host ::ng-deep .fs-list-footer .fs-list-row .fs-list-col.row-actions .row-inline-action-fab,\n:host ::ng-deep .fs-list-footer .fs-list-row .fs-list-col.row-actions .row-inline-action-mini-fab,\n:host ::ng-deep .fs-list-footer .fs-list-row .fs-list-col.row-actions .row-menu-action {\n  width: 35px;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n\n:host ::ng-deep .fs-list-head .fs-list-row .fs-list-col.left,\n:host ::ng-deep .fs-list-body .fs-list-row .fs-list-col.left,\n:host ::ng-deep .fs-list-footer .fs-list-row .fs-list-col.left {\n  text-align: left;\n}\n\n:host ::ng-deep .fs-list-head .fs-list-row .fs-list-col.center,\n:host ::ng-deep .fs-list-body .fs-list-row .fs-list-col.center,\n:host ::ng-deep .fs-list-footer .fs-list-row .fs-list-col.center {\n  text-align: center;\n}\n\n:host ::ng-deep .fs-list-head .fs-list-row .fs-list-col.right,\n:host ::ng-deep .fs-list-body .fs-list-row .fs-list-col.right,\n:host ::ng-deep .fs-list-footer .fs-list-row .fs-list-col.right {\n  text-align: right;\n}\n\n:host ::ng-deep .fs-list-header-container {\n  margin-bottom: 10px;\n}\n\n:host ::ng-deep .fs-list-header {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-flow: column wrap;\n          flex-flow: column wrap;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n}\n\n:host ::ng-deep .fs-list-header.no-wrap {\n  -webkit-box-orient: horizontal !important;\n  -webkit-box-direction: normal !important;\n      -ms-flex-flow: row nowrap !important;\n          flex-flow: row nowrap !important;\n}\n\n:host ::ng-deep .fs-list-header .fs-list-toolbar {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-flow: row nowrap;\n          flex-flow: row nowrap;\n}\n\n:host ::ng-deep .fs-list-header .heading-container {\n  -ms-flex-item-align: left;\n      align-self: left;\n  margin-right: 10px;\n  margin-bottom: 10px;\n  font-weight: 600;\n  font-size: 18px;\n  color: #212537;\n}\n\n:host ::ng-deep .fs-list-header .heading {\n  margin-top: 0;\n  margin-bottom: 10px;\n}\n\n:host ::ng-deep .fs-list-header .subheading {\n  display: block;\n  font-size: 14px;\n  margin-top: -10px;\n  color: #929292;\n  font-weight: 400;\n}\n\n:host ::ng-deep .fs-list-header .fs-list-filter {\n  -webkit-box-flex: 100;\n      -ms-flex: 100;\n          flex: 100 1 0%;\n  margin-right: 10px;\n}\n\n:host ::ng-deep .fs-list-header .fs-list-actions {\n  margin-left: auto;\n  white-space: nowrap;\n}\n\n:host ::ng-deep .fs-list-header .action-button {\n  margin-left: 5px;\n}\n\n:host ::ng-deep .fs-list-header .action-button:first-child {\n  margin-left: 0;\n}\n\n:host ::ng-deep .fs-list-header .mat-button {\n  margin-top: 0;\n  margin-bottom: 0;\n  margin-right: 0;\n}\n\n:host ::ng-deep .fs-list-container.has-filter-input .heading-container {\n  -webkit-box-flex: 1;\n      -ms-flex: 1 1 100%;\n          flex: 1 1 100%;\n}\n\n:host ::ng-deep .fs-list-container:not(.has-filters):not(.has-actions):not(.has-heading) .fs-list-header-container {\n  display: none;\n}\n\n:host ::ng-deep .fs-list-head {\n  display: table-header-group;\n}\n\n:host ::ng-deep .fs-list-head .fs-list-col {\n  border-bottom: 2px solid #ddd;\n  color: #999;\n  padding: 8px;\n  font-weight: normal;\n  font-size: 13px;\n  color: #8f8f8f;\n}\n\n:host ::ng-deep .fs-list-head .fs-list-col.sorting {\n  cursor: pointer;\n}\n\n:host ::ng-deep .fs-list-head .fs-list-col.sorting:hover {\n  background-color: #F6F6F6;\n}\n\n:host ::ng-deep .fs-list-head .fs-list-col .wrap {\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  vertical-align: middle;\n  white-space: nowrap;\n}\n\n:host ::ng-deep .fs-list-head .fs-list-col .wrap mat-icon {\n  font-size: 14px;\n  display: block;\n  height: 14px;\n  width: 14px;\n}\n\n:host ::ng-deep .fs-list-head .fs-list-col.sorting {\n  background-image: none;\n}\n\n:host ::ng-deep fs-list-status {\n  font-size: 13px;\n  color: #3a3a3a;\n  display: block;\n}\n\n:host ::ng-deep tfoot td {\n  padding: 8px;\n}\n\n::ng-deep .reorder-in-progress {\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n\n::ng-deep .draggable-elem {\n  opacity: 0.2;\n}\n\n::ng-deep .hidden-mobile-menu-action {\n  display: none !important;\n}\n\n::ng-deep .hidden-mobile {\n  display: none !important;\n}\n\n@media only screen and (max-width: 600px) {\n  ::ng-deep .fs-list-filter .inline-actions {\n    top: auto !important;\n    top: initial !important;\n    position: static !important;\n    position: initial !important;\n  }\n\n  ::ng-deep .fs-list-filter .inline-actions .action-filter {\n    margin-bottom: 0 !important;\n  }\n\n  ::ng-deep .fs-list-header:not(.has-filters) {\n    -webkit-box-orient: horizontal !important;\n    -webkit-box-direction: normal !important;\n        -ms-flex-flow: row nowrap !important;\n            flex-flow: row nowrap !important;\n  }\n\n  ::ng-deep .fs-list-header:not(.has-filters) .filter-input {\n    display: none !important;\n  }\n\n  ::ng-deep .mat-form-field-infix {\n    min-width: 90px !important;\n    width: auto !important;\n  }\n\n  ::ng-deep .fs-list-header.has-filters {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-flow: row wrap;\n            flex-flow: row wrap;\n  }\n}\n\n@media only screen and (max-width: 768px) {\n  ::ng-deep .show-mobile {\n    display: inline-block !important;\n  }\n\n  ::ng-deep .fs-list-actions .action-button {\n    display: none;\n  }\n\n  ::ng-deep .row-inline-action.mobile-hide {\n    display: none;\n  }\n\n  ::ng-deep .hidden-mobile-menu-action {\n    display: block !important;\n  }\n}\n\n", "", {"version":3,"sources":["/Users/mendor/work/fs-list/src/app/components/list/src/app/components/list/list.component.scss","/Users/mendor/work/fs-list/list.component.scss","/Users/mendor/work/fs-list/src/app/components/list/src/app/styles/_mixins.scss"],"names":[],"mappings":"AAEA;EACE,YAAA;EACA,eAAA;CCDD;;ADID;EACE,YAAA;CCDD;;ADID;EACE,YAAA;EACA,eAAA;CCDD;;ADID;EACE,eAAA;EACA,YAAA;EACA,0BAAA;CCDD;;ADID;EAGI,iBAAA;CCHH;;ADKG;EACE,iBAAA;CCFL;;ADJD;EAWI,cAAA;CCHH;;ADMC;EACE,yBAAA;EACA,mBAAA;EACA,8BAAA;CCHH;;ADdD;EAoBM,aAAA;CCFL;;ADKG;EACE,+BAAA;UAAA,uBAAA;CCFL;;ADtBD;EA4BM,0BAAA;CCFL;;AD1BD;EAkCU,0BAAA;CCJT;;AD9BD;EAuCQ,aAAA;CCLP;;ADYiB;;EACZ,8BAAA;CCRL;;ADaG;;;EACE,mBAAA;CCRL;;ADOG;;;EAKI,gBAAA;EACA,cAAA;CCNP;;ADpDD;;;EA6DU,0BAAA;CCHT;;AD1DD;;;EAkEQ,cAAA;CCFP;;ADhED;;;EAuEQ,oBAAA;EAEA,2BAAA;EACA,kBAAA;EACA,uBAAA;EACA,cAAA;CCFP;;AD1ED;;;EA+EU,UAAA;CCCT;;ADhFD;;;;;;EAoFU,mBAAA;CCKT;;ADpBK;;;EAmBI,UAAA;EACA,oBAAA;EACA,oBAAA;EACA,iBAAA;CCOT;;ADlGD;;;EA8FY,kBAAA;EACA,sBAAA;CCUX;;ADzGD;;;EAkGc,eAAA;CCab;;ADTS;;;;;;;;;;;;EAII,YAAA;EACA,yBAAA;MAAA,sBAAA;UAAA,wBAAA;EACA,0BAAA;MAAA,uBAAA;UAAA,oBAAA;CCoBb;;AD3DK;;;EA4CI,iBAAA;CCqBT;;ADtID;;;EAqHU,mBAAA;CCuBT;;ADvEK;;;EAoDI,kBAAA;CCyBT;;ADlJD;EAgII,oBAAA;CCsBH;;ADnBC;EACE,qBAAA;EAAA,qBAAA;EAAA,cAAA;EACA,6BAAA;EAAA,8BAAA;MAAA,2BAAA;UAAA,uBAAA;EACA,0BAAA;MAAA,uBAAA;UAAA,+BAAA;CCsBH;;AD5JD;EAyIM,0CAAA;EAAA,yCAAA;MAAA,qCAAA;UAAA,iCAAA;CCuBL;;ADhKD;EA6IM,qBAAA;EAAA,qBAAA;EAAA,cAAA;EACA,+BAAA;EAAA,8BAAA;MAAA,0BAAA;UAAA,sBAAA;CCuBL;;ADpBG;EACE,0BAAA;MAAA,iBAAA;EACA,mBAAA;EACA,oBAAA;EACA,iBAAA;EACA,gBAAA;EACA,eAAA;CCuBL;;ADpBG;EACE,cAAA;EACA,oBAAA;CCuBL;;ADpBG;EACE,eAAA;EACA,gBAAA;EACA,kBAAA;EACA,eAAA;EACA,iBAAA;CCuBL;;AD3LD;EAwKM,sBAAA;MAAA,cAAA;UAAA,eAAA;EACA,mBAAA;CCuBL;;ADrBG;EACE,kBAAA;EACA,oBAAA;CCwBL;;ADrBG;EACE,iBAAA;CCwBL;;ADzMD;EAmLQ,eAAA;CC0BP;;AD7MD;EAwLM,cAAA;EACA,iBAAA;EACA,gBAAA;CCyBL;;ADnND;EAoMQ,oBAAA;MAAA,mBAAA;UAAA,eAAA;CCmBP;;ADvND;EA0MQ,cAAA;CCiBP;;ADZC;EACE,4BAAA;CCeH;;AD/ND;EAmNM,8BAAA;EACA,YAAA;EACA,aAAA;EACA,oBAAA;EACA,gBAAA;EACA,eAAA;CCgBL;;ADxOD;EA4NQ,gBAAA;CCgBP;;AD5OD;EA8NU,0BAAA;CCkBT;;ADhPD;EAmOQ,4BAAA;EAAA,4BAAA;EAAA,qBAAA;EACA,uBAAA;EACA,oBAAA;CCiBP;;ADtPD;EAwOU,gBAAA;EACA,eAAA;EACA,aAAA;EACA,YAAA;CCkBT;;AD7PD;EAgPQ,uBAAA;CCiBP;;ADZC;EACE,gBAAA;EACA,eAAA;EACA,eAAA;CCeH;;ADvQD;EA4PI,aAAA;CCeH;;ADXD;EAGI,0BAAA;KAAA,uBAAA;MAAA,sBAAA;UAAA,kBAAA;CCYH;;ADfD;EAOI,aAAA;CCYH;;ADTC;EACE,yBAAA;CCYH;;ADTC;EACE,yBAAA;CCYH;;AC3QC;EFqQI;IACE,qBAAA;IAAA,wBAAA;IACA,4BAAA;IAAA,6BAAA;GCUL;;EDjCH;IA0BU,4BAAA;GCWP;;EDrCH;IAkCQ,0CAAA;IAAA,yCAAA;QAAA,qCAAA;YAAA,iCAAA;GCOL;;EDzCH;IAqCU,yBAAA;GCQP;;ED7CH;IA2CM,2BAAA;IACA,uBAAA;GCMH;;EDlDH;IAiDQ,+BAAA;IAAA,8BAAA;QAAA,wBAAA;YAAA,oBAAA;GCKL;CACF;;AC7SC;EFsPF;IAyDM,iCAAA;GCGH;;ED5DH;IA8DQ,cAAA;GCEL;;EDEC;IAEI,cAAA;GCAL;;EDpEH;IAwEM,0BAAA;GCAH;CACF","file":"list.component.scss","sourcesContent":["@import \"../../styles/mixins\";\n\n:host {\n  width: 100%;\n  display: block;\n}\n\n.fs-list-container {\n  width: 100%;\n}\n\n.fs-list-table-container {\n  width: 100%;\n  overflow: auto;\n}\n\n.fs-list-table {\n  display: table;\n  width: 100%;\n  border-collapse: collapse;\n}\n\n:host ::ng-deep {\n\n  .fs-filter {\n    margin-bottom: 0;\n\n    .main-filter-bar {\n      overflow: hidden;\n    }\n  }\n\n  .hidden {\n    display: none;\n  }\n\n  .fs-list-body {\n    display: table-row-group;\n    position: relative;\n    border-bottom: 2px solid #ddd;\n\n    &.loading {\n      opacity: 0.4;\n    }\n\n    .fs-list-col {\n      box-sizing: border-box;\n    }\n\n    .fs-list-row:hover .fs-list-col {\n      background-color: #f6f6f6;\n    }\n\n    .fs-list-row {\n      &:hover {\n        .fs-list-col {\n          background-color: #f6f6f6;\n        }\n      }\n\n      &.drag-row {\n        cursor: move;\n      }\n    }\n  }\n\n  .fs-list-head,\n  .fs-list-body {\n    tr:last-child .fs-list-col {\n      border-bottom: 2px solid #ddd;\n    }\n  }\n\n  .fs-list-head, .fs-list-body, .fs-list-footer {\n    .fs-list-row {\n      display: table-row;\n\n\n      &.draggable {\n        position: fixed;\n        z-index: 9999;\n\n        .fs-list-col {\n          background-color: #f6f6f6;\n        }\n      }\n\n      &:nth-child(1) .fs-list-col {\n        border-top: 0;\n      }\n\n      .fs-list-col {\n\n        display: table-cell;\n\n        border-top: 1px solid #ddd;\n        padding: 8px 12px;\n        vertical-align: middle;\n        outline: none;\n\n        &.drag-col {\n          width: 1%;\n        }\n\n        &:first-child,\n        &:last-child {\n          padding-left: 20px;\n        }\n\n        &.row-actions {\n          width: 1%;\n          white-space: nowrap;\n          padding-right: 10px;\n          overflow: hidden;\n\n          .row-inline-action {\n            margin-left: 12px;\n            display: inline-block;\n\n            &:first-child {\n              margin-left: 0;\n            }\n          }\n\n          .row-inline-action-icon,\n          .row-inline-action-fab,\n          .row-inline-action-mini-fab,\n          .row-menu-action {\n              width: 35px;\n              justify-content: center;\n              align-items: center;\n          }\n        }\n\n        &.left {\n          text-align: left;\n        }\n\n        &.center {\n          text-align: center;\n        }\n\n        &.right {\n          text-align: right;\n        }\n      }\n    }\n  }\n\n  .fs-list-header-container {\n    margin-bottom: 10px;\n  }\n\n  .fs-list-header {\n    display: flex;\n    flex-flow: column wrap;\n    justify-content: space-between;\n\n    &.no-wrap {\n      flex-flow: row nowrap !important;\n    }\n\n    .fs-list-toolbar {\n      display: flex;\n      flex-flow: row nowrap;\n    }\n\n    .heading-container {\n      align-self: left;\n      margin-right: 10px;\n      margin-bottom: 10px;\n      font-weight: 600;\n      font-size: 18px;\n      color: #212537;\n    }\n\n    .heading {\n      margin-top: 0;\n      margin-bottom: 10px;\n    }\n\n    .subheading {\n      display: block;\n      font-size: 14px;\n      margin-top: -10px;\n      color: #929292;\n      font-weight: 400;\n    }\n\n    .fs-list-filter {\n      flex: 100;\n      margin-right: 10px;\n    }\n    .fs-list-actions {\n      margin-left: auto;\n      white-space: nowrap;\n    }\n\n    .action-button {\n      margin-left: 5px;\n      &:first-child {\n        margin-left: 0;\n      }\n    }\n\n    .mat-button {\n      margin-top: 0;\n      margin-bottom: 0;\n      margin-right: 0;\n    }\n  }\n\n\n\n  .fs-list-container {\n\n    &.has-filter-input {\n      .heading-container {\n        flex: 1 1 100%;\n      }\n    }\n\n    &:not(.has-filters):not(.has-actions):not(.has-heading)  {\n      .fs-list-header-container {\n        display: none;\n      }\n    }\n  }\n\n  .fs-list-head {\n    display: table-header-group;\n\n    .fs-list-col {\n      border-bottom: 2px solid #ddd;\n      color: #999;\n      padding: 8px;\n      font-weight: normal;\n      font-size: 13px;\n      color: rgba(143, 143, 143, 1);\n\n      &.sorting {\n\n        cursor: pointer;\n        &:hover {\n          background-color: #F6F6F6;\n        }\n      }\n\n      .wrap {\n        display: inline-flex;\n        vertical-align: middle;\n        white-space: nowrap;\n\n        mat-icon {\n          font-size: 14px;\n          display: block;\n          height: 14px;\n          width: 14px;\n        }\n      }\n\n      &.sorting {\n        background-image: none;\n      }\n    }\n  }\n\n  fs-list-status {\n    font-size: 13px;\n    color: rgb(58, 58, 58);\n    display: block;\n  }\n\n  tfoot td {\n    padding: 8px;\n  }\n}\n\n::ng-deep {\n\n  .reorder-in-progress {\n    user-select: none;\n  }\n\n  .draggable-elem {\n    opacity: 0.2;\n  }\n\n  .hidden-mobile-menu-action {\n    display: none !important;\n  }\n\n  .hidden-mobile {\n    display: none !important;\n  }\n\n  @include phone {\n\n    .fs-list-filter {\n      .inline-actions {\n        top: initial !important; // Cratch, but we need to change layout in fs-filter.\n        position: initial !important; // Cratch, but we need to change layout in fs-filter.\n\n        .action-filter {\n          margin-bottom: 0 !important;\n        }\n      }\n    }\n\n    .fs-list-header {\n\n      &:not(.has-filters) {\n        flex-flow: row nowrap !important;\n\n        .filter-input {\n          display: none !important;\n        }\n      }\n    }\n\n    .mat-form-field-infix {\n      min-width: 90px !important;\n      width: auto !important;\n    }\n\n    .fs-list-header {\n      &.has-filters {\n        flex-flow: row wrap;\n      }\n    }\n  }\n\n  @include apply-to(less-than, tablet) {\n\n    .show-mobile {\n      display: inline-block !important;\n    }\n\n    .fs-list-actions {\n      .action-button {\n        display: none;\n      }\n    }\n\n    .row-inline-action {\n      &.mobile-hide {\n        display: none;\n      }\n    }\n    .hidden-mobile-menu-action {\n      display: block !important;\n    }\n  }\n}\n\n//    .material-icons {\n//      font-family: 'Material Icons';\n//      font-weight: normal;\n//      font-style: normal;\n//      line-height: 1;\n//      letter-spacing: normal;\n//      text-transform: none;\n//      display: inline-block;\n//      white-space: nowrap;\n//      word-wrap: normal;\n//      direction: ltr;\n//      -webkit-font-feature-settings: 'liga';\n//      -webkit-font-smoothing: antialiased;\n//    }\n",":host {\n  width: 100%;\n  display: block;\n}\n\n.fs-list-container {\n  width: 100%;\n}\n\n.fs-list-table-container {\n  width: 100%;\n  overflow: auto;\n}\n\n.fs-list-table {\n  display: table;\n  width: 100%;\n  border-collapse: collapse;\n}\n\n:host ::ng-deep .fs-filter {\n  margin-bottom: 0;\n}\n\n:host ::ng-deep .fs-filter .main-filter-bar {\n  overflow: hidden;\n}\n\n:host ::ng-deep .hidden {\n  display: none;\n}\n\n:host ::ng-deep .fs-list-body {\n  display: table-row-group;\n  position: relative;\n  border-bottom: 2px solid #ddd;\n}\n\n:host ::ng-deep .fs-list-body.loading {\n  opacity: 0.4;\n}\n\n:host ::ng-deep .fs-list-body .fs-list-col {\n  box-sizing: border-box;\n}\n\n:host ::ng-deep .fs-list-body .fs-list-row:hover .fs-list-col {\n  background-color: #f6f6f6;\n}\n\n:host ::ng-deep .fs-list-body .fs-list-row:hover .fs-list-col {\n  background-color: #f6f6f6;\n}\n\n:host ::ng-deep .fs-list-body .fs-list-row.drag-row {\n  cursor: move;\n}\n\n:host ::ng-deep .fs-list-head tr:last-child .fs-list-col,\n:host ::ng-deep .fs-list-body tr:last-child .fs-list-col {\n  border-bottom: 2px solid #ddd;\n}\n\n:host ::ng-deep .fs-list-head .fs-list-row,\n:host ::ng-deep .fs-list-body .fs-list-row,\n:host ::ng-deep .fs-list-footer .fs-list-row {\n  display: table-row;\n}\n\n:host ::ng-deep .fs-list-head .fs-list-row.draggable,\n:host ::ng-deep .fs-list-body .fs-list-row.draggable,\n:host ::ng-deep .fs-list-footer .fs-list-row.draggable {\n  position: fixed;\n  z-index: 9999;\n}\n\n:host ::ng-deep .fs-list-head .fs-list-row.draggable .fs-list-col,\n:host ::ng-deep .fs-list-body .fs-list-row.draggable .fs-list-col,\n:host ::ng-deep .fs-list-footer .fs-list-row.draggable .fs-list-col {\n  background-color: #f6f6f6;\n}\n\n:host ::ng-deep .fs-list-head .fs-list-row:nth-child(1) .fs-list-col,\n:host ::ng-deep .fs-list-body .fs-list-row:nth-child(1) .fs-list-col,\n:host ::ng-deep .fs-list-footer .fs-list-row:nth-child(1) .fs-list-col {\n  border-top: 0;\n}\n\n:host ::ng-deep .fs-list-head .fs-list-row .fs-list-col,\n:host ::ng-deep .fs-list-body .fs-list-row .fs-list-col,\n:host ::ng-deep .fs-list-footer .fs-list-row .fs-list-col {\n  display: table-cell;\n  border-top: 1px solid #ddd;\n  padding: 8px 12px;\n  vertical-align: middle;\n  outline: none;\n}\n\n:host ::ng-deep .fs-list-head .fs-list-row .fs-list-col.drag-col,\n:host ::ng-deep .fs-list-body .fs-list-row .fs-list-col.drag-col,\n:host ::ng-deep .fs-list-footer .fs-list-row .fs-list-col.drag-col {\n  width: 1%;\n}\n\n:host ::ng-deep .fs-list-head .fs-list-row .fs-list-col:first-child,\n:host ::ng-deep .fs-list-head .fs-list-row .fs-list-col:last-child,\n:host ::ng-deep .fs-list-body .fs-list-row .fs-list-col:first-child,\n:host ::ng-deep .fs-list-body .fs-list-row .fs-list-col:last-child,\n:host ::ng-deep .fs-list-footer .fs-list-row .fs-list-col:first-child,\n:host ::ng-deep .fs-list-footer .fs-list-row .fs-list-col:last-child {\n  padding-left: 20px;\n}\n\n:host ::ng-deep .fs-list-head .fs-list-row .fs-list-col.row-actions,\n:host ::ng-deep .fs-list-body .fs-list-row .fs-list-col.row-actions,\n:host ::ng-deep .fs-list-footer .fs-list-row .fs-list-col.row-actions {\n  width: 1%;\n  white-space: nowrap;\n  padding-right: 10px;\n  overflow: hidden;\n}\n\n:host ::ng-deep .fs-list-head .fs-list-row .fs-list-col.row-actions .row-inline-action,\n:host ::ng-deep .fs-list-body .fs-list-row .fs-list-col.row-actions .row-inline-action,\n:host ::ng-deep .fs-list-footer .fs-list-row .fs-list-col.row-actions .row-inline-action {\n  margin-left: 12px;\n  display: inline-block;\n}\n\n:host ::ng-deep .fs-list-head .fs-list-row .fs-list-col.row-actions .row-inline-action:first-child,\n:host ::ng-deep .fs-list-body .fs-list-row .fs-list-col.row-actions .row-inline-action:first-child,\n:host ::ng-deep .fs-list-footer .fs-list-row .fs-list-col.row-actions .row-inline-action:first-child {\n  margin-left: 0;\n}\n\n:host ::ng-deep .fs-list-head .fs-list-row .fs-list-col.row-actions .row-inline-action-icon,\n:host ::ng-deep .fs-list-head .fs-list-row .fs-list-col.row-actions .row-inline-action-fab,\n:host ::ng-deep .fs-list-head .fs-list-row .fs-list-col.row-actions .row-inline-action-mini-fab,\n:host ::ng-deep .fs-list-head .fs-list-row .fs-list-col.row-actions .row-menu-action,\n:host ::ng-deep .fs-list-body .fs-list-row .fs-list-col.row-actions .row-inline-action-icon,\n:host ::ng-deep .fs-list-body .fs-list-row .fs-list-col.row-actions .row-inline-action-fab,\n:host ::ng-deep .fs-list-body .fs-list-row .fs-list-col.row-actions .row-inline-action-mini-fab,\n:host ::ng-deep .fs-list-body .fs-list-row .fs-list-col.row-actions .row-menu-action,\n:host ::ng-deep .fs-list-footer .fs-list-row .fs-list-col.row-actions .row-inline-action-icon,\n:host ::ng-deep .fs-list-footer .fs-list-row .fs-list-col.row-actions .row-inline-action-fab,\n:host ::ng-deep .fs-list-footer .fs-list-row .fs-list-col.row-actions .row-inline-action-mini-fab,\n:host ::ng-deep .fs-list-footer .fs-list-row .fs-list-col.row-actions .row-menu-action {\n  width: 35px;\n  justify-content: center;\n  align-items: center;\n}\n\n:host ::ng-deep .fs-list-head .fs-list-row .fs-list-col.left,\n:host ::ng-deep .fs-list-body .fs-list-row .fs-list-col.left,\n:host ::ng-deep .fs-list-footer .fs-list-row .fs-list-col.left {\n  text-align: left;\n}\n\n:host ::ng-deep .fs-list-head .fs-list-row .fs-list-col.center,\n:host ::ng-deep .fs-list-body .fs-list-row .fs-list-col.center,\n:host ::ng-deep .fs-list-footer .fs-list-row .fs-list-col.center {\n  text-align: center;\n}\n\n:host ::ng-deep .fs-list-head .fs-list-row .fs-list-col.right,\n:host ::ng-deep .fs-list-body .fs-list-row .fs-list-col.right,\n:host ::ng-deep .fs-list-footer .fs-list-row .fs-list-col.right {\n  text-align: right;\n}\n\n:host ::ng-deep .fs-list-header-container {\n  margin-bottom: 10px;\n}\n\n:host ::ng-deep .fs-list-header {\n  display: flex;\n  flex-flow: column wrap;\n  justify-content: space-between;\n}\n\n:host ::ng-deep .fs-list-header.no-wrap {\n  flex-flow: row nowrap !important;\n}\n\n:host ::ng-deep .fs-list-header .fs-list-toolbar {\n  display: flex;\n  flex-flow: row nowrap;\n}\n\n:host ::ng-deep .fs-list-header .heading-container {\n  align-self: left;\n  margin-right: 10px;\n  margin-bottom: 10px;\n  font-weight: 600;\n  font-size: 18px;\n  color: #212537;\n}\n\n:host ::ng-deep .fs-list-header .heading {\n  margin-top: 0;\n  margin-bottom: 10px;\n}\n\n:host ::ng-deep .fs-list-header .subheading {\n  display: block;\n  font-size: 14px;\n  margin-top: -10px;\n  color: #929292;\n  font-weight: 400;\n}\n\n:host ::ng-deep .fs-list-header .fs-list-filter {\n  flex: 100;\n  margin-right: 10px;\n}\n\n:host ::ng-deep .fs-list-header .fs-list-actions {\n  margin-left: auto;\n  white-space: nowrap;\n}\n\n:host ::ng-deep .fs-list-header .action-button {\n  margin-left: 5px;\n}\n\n:host ::ng-deep .fs-list-header .action-button:first-child {\n  margin-left: 0;\n}\n\n:host ::ng-deep .fs-list-header .mat-button {\n  margin-top: 0;\n  margin-bottom: 0;\n  margin-right: 0;\n}\n\n:host ::ng-deep .fs-list-container.has-filter-input .heading-container {\n  flex: 1 1 100%;\n}\n\n:host ::ng-deep .fs-list-container:not(.has-filters):not(.has-actions):not(.has-heading) .fs-list-header-container {\n  display: none;\n}\n\n:host ::ng-deep .fs-list-head {\n  display: table-header-group;\n}\n\n:host ::ng-deep .fs-list-head .fs-list-col {\n  border-bottom: 2px solid #ddd;\n  color: #999;\n  padding: 8px;\n  font-weight: normal;\n  font-size: 13px;\n  color: #8f8f8f;\n}\n\n:host ::ng-deep .fs-list-head .fs-list-col.sorting {\n  cursor: pointer;\n}\n\n:host ::ng-deep .fs-list-head .fs-list-col.sorting:hover {\n  background-color: #F6F6F6;\n}\n\n:host ::ng-deep .fs-list-head .fs-list-col .wrap {\n  display: inline-flex;\n  vertical-align: middle;\n  white-space: nowrap;\n}\n\n:host ::ng-deep .fs-list-head .fs-list-col .wrap mat-icon {\n  font-size: 14px;\n  display: block;\n  height: 14px;\n  width: 14px;\n}\n\n:host ::ng-deep .fs-list-head .fs-list-col.sorting {\n  background-image: none;\n}\n\n:host ::ng-deep fs-list-status {\n  font-size: 13px;\n  color: #3a3a3a;\n  display: block;\n}\n\n:host ::ng-deep tfoot td {\n  padding: 8px;\n}\n\n::ng-deep .reorder-in-progress {\n  user-select: none;\n}\n\n::ng-deep .draggable-elem {\n  opacity: 0.2;\n}\n\n::ng-deep .hidden-mobile-menu-action {\n  display: none !important;\n}\n\n::ng-deep .hidden-mobile {\n  display: none !important;\n}\n\n@media only screen and (max-width: 600px) {\n  ::ng-deep .fs-list-filter .inline-actions {\n    top: initial !important;\n    position: initial !important;\n  }\n\n  ::ng-deep .fs-list-filter .inline-actions .action-filter {\n    margin-bottom: 0 !important;\n  }\n\n  ::ng-deep .fs-list-header:not(.has-filters) {\n    flex-flow: row nowrap !important;\n  }\n\n  ::ng-deep .fs-list-header:not(.has-filters) .filter-input {\n    display: none !important;\n  }\n\n  ::ng-deep .mat-form-field-infix {\n    min-width: 90px !important;\n    width: auto !important;\n  }\n\n  ::ng-deep .fs-list-header.has-filters {\n    flex-flow: row wrap;\n  }\n}\n\n@media only screen and (max-width: 768px) {\n  ::ng-deep .show-mobile {\n    display: inline-block !important;\n  }\n\n  ::ng-deep .fs-list-actions .action-button {\n    display: none;\n  }\n\n  ::ng-deep .row-inline-action.mobile-hide {\n    display: none;\n  }\n\n  ::ng-deep .hidden-mobile-menu-action {\n    display: block !important;\n  }\n}\n\n","@import \"variables\";\n\n\n@mixin apply-to($ltgt, $device) {\n  $extrema: null;\n  $boundary-target: null;\n  $delta: null;\n\n  @if $ltgt == less-than {\n    $extrema: max;\n    $delta: -1;\n  } @else if $ltgt == greater-than {\n    $extrema: min;\n    $delta: +1;\n  }\n\n  @if $device == phone {\n    @if $ltgt == less-than {\n      $boundary-target: $phone-width-max;\n    } @else if $ltgt == greater-than {\n      $boundary-target: $tablet-width-min;\n    }\n  } @else if $device == tablet {\n    @if $ltgt == less-than {\n      $boundary-target: $tablet-width-min;\n    } @else if $ltgt == greater-than {\n      $boundary-target: $tablet-width-max;\n    }\n  } @else if $device == desktop {\n    $boundary-target: $desktop-width-min;\n  }\n\n  @media only screen and (#{$extrema}-width: $boundary-target) {\n    @content;\n  }\n}\n\n@mixin phone {\n  @media only screen and (max-width: #{$phone-width-max}) {\n    @content;\n  }\n}\n\n@mixin tablet {\n  @media only screen and (min-width: #{$tablet-width-min}) and (max-width: #{$tablet-width-max}) {\n    @content;\n  }\n}\n\n@mixin desktop {\n  @media only screen and (min-width: #{$desktop-width-min}) {\n    @content;\n  }\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ "../node_modules/css-loader/lib/css-base.js":
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "./app/components/body/body.component.html":
/***/ (function(module, exports) {

module.exports = "<tr fs-list-row *ngFor=\"let row of rows; let i = index\"\n    [row]=\"row\"\n    [rowIndex]=\"i\"\n    [columns]=\"columns\"\n    [rowActions]=\"rowActions\"\n    [rowEvents]=\"rowEvents\"\n    [reorder]=\"reorder\"\n    [ngClass]=\"{'drag-row': reorder}\"\n    (mousedown)=\"dragStart($event, activeRow)\" #activeRow>\n</tr>\n"

/***/ }),

/***/ "./app/components/body/body.component.ts":
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__("@angular/core");
var row_1 = __webpack_require__("./app/components/body/row/index.ts");
var draggable_1 = __webpack_require__("./app/components/body/draggable.ts");
var FsBodyComponent = (function () {
    function FsBodyComponent(el, cdRef, differs, zone) {
        this.el = el;
        this.cdRef = cdRef;
        this.differs = differs;
        this.zone = zone;
        this.columns = [];
        this.hasFooter = false;
        this.rowActions = [];
        this.rowEvents = {};
        this.reorder = false;
        this._rowsDiffer = differs.find([]).create(null);
        this.draggable = new draggable_1.Draggable(this.el, this.cdRef, this.zone, this.rows);
    }
    FsBodyComponent.prototype.ngOnInit = function () {
    };
    FsBodyComponent.prototype.ngDoCheck = function () {
        if (this._rowsDiffer.diff(this.rows)) {
            this.draggable.rows = this.rows;
            this.cdRef.markForCheck();
        }
    };
    FsBodyComponent.prototype.dragStart = function (event, elemRef) {
        if (this.reorder) {
            this.draggable.dragStart({ event: event, target: elemRef.el && elemRef.el.nativeElement });
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
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsBodyComponent.prototype, "rowEvents", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsBodyComponent.prototype, "reorder", void 0);
    __decorate([
        core_1.ViewChild('rowsContainer', { read: core_1.ViewContainerRef }),
        __metadata("design:type", Object)
    ], FsBodyComponent.prototype, "rowsContainer", void 0);
    __decorate([
        core_1.ContentChild(row_1.FsRowComponent, { read: core_1.TemplateRef }),
        __metadata("design:type", core_1.TemplateRef)
    ], FsBodyComponent.prototype, "headerTemplate", void 0);
    FsBodyComponent = __decorate([
        core_1.Component({
            selector: '[fs-list-body]',
            template: __webpack_require__("./app/components/body/body.component.html"),
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [core_1.ElementRef,
            core_1.ChangeDetectorRef,
            core_1.IterableDiffers,
            core_1.NgZone])
    ], FsBodyComponent);
    return FsBodyComponent;
}());
exports.FsBodyComponent = FsBodyComponent;


/***/ }),

/***/ "./app/components/body/draggable.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Draggable = (function () {
    function Draggable(el, cdRef, zone, _rows) {
        this.el = el;
        this.cdRef = cdRef;
        this.zone = zone;
        this._rows = _rows;
        this.dragElement = {
            targetEl: null,
            draggableEl: null,
            targetHeight: null,
            activeIndex: null,
            moveHandler: this.dragTo.bind(this),
            stopHandler: this.dragEnd.bind(this)
        };
    }
    Object.defineProperty(Draggable.prototype, "rows", {
        set: function (value) {
            this._rows = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Prepare draggable elements and add events
     * @param event
     */
    Draggable.prototype.dragStart = function (event) {
        var _this = this;
        window.document.body.classList.add('reorder-in-progress');
        this.dragElement.targetEl = event.target;
        this.prepareElements();
        this.initDraggableElement(event);
        this.dragElement.targetEl.classList.add('draggable-elem');
        this.zone.runOutsideAngular(function () {
            window.document.addEventListener('mousemove', _this.dragElement.moveHandler);
            window.document.addEventListener('touchmove', _this.dragElement.moveHandler, { passive: false });
            window.document.addEventListener('mouseup', _this.dragElement.stopHandler);
            window.document.addEventListener('touchend', _this.dragElement.stopHandler);
            window.document.addEventListener('touchcancel', _this.dragElement.stopHandler);
        });
    };
    /**
     * Move draggable elements and swap items
     * @param event
     */
    Draggable.prototype.dragTo = function (event) {
        this.touchFix(event);
        var elemIndex = this.lookupElementUnder(event);
        if (elemIndex !== null) {
            this.swapWithIndex(elemIndex);
        }
        var topOffset = (event.y || event.clientY) - (this.dragElement.targetHeight / 2);
        this.dragElement.draggableEl.style.top = topOffset + 'px';
    };
    /**
     * Remove events and classes after drag finish
     */
    Draggable.prototype.dragEnd = function () {
        this.dragElement.targetEl.classList.remove('draggable-elem');
        window.document.body.classList.remove('reorder-in-progress');
        this.dragElement.draggableEl.remove();
        window.document.removeEventListener('mousemove', this.dragElement.moveHandler);
        window.document.removeEventListener('touchmove', this.dragElement.moveHandler);
        window.document.removeEventListener('mouseup', this.dragElement.stopHandler);
        window.document.removeEventListener('touchend', this.dragElement.stopHandler);
        window.document.removeEventListener('touchcancel', this.dragElement.stopHandler);
    };
    /**
     * looking row elements and save their dims
     */
    Draggable.prototype.prepareElements = function () {
        this.lookupChildElements();
        this.calcElementsDimensions();
    };
    /**
     * Store child rows
     */
    Draggable.prototype.lookupChildElements = function () {
        var _this = this;
        this.elements = Array.from(this.el.nativeElement.querySelectorAll('tr')).reduce(function (acc, rowElement, index) {
            var element = { target: rowElement };
            if (rowElement === _this.dragElement.targetEl) {
                _this.dragElement.activeIndex = index;
                element.active = true;
            }
            acc.push(element);
            return acc;
        }, []);
    };
    /**
     * Calc child rows sizes/offsets
     */
    Draggable.prototype.calcElementsDimensions = function () {
        this.elements.forEach(function (el, index) {
            var dims = el.target.getBoundingClientRect();
            el.top = dims.top;
            el.height = dims.height;
            el.center = dims.top + (dims.height / 2);
            el.index = index;
        });
    };
    /**
     * Init draggable element
     * @param event
     */
    Draggable.prototype.initDraggableElement = function (event) {
        var el = event.target.cloneNode(true);
        var data = event.target.getBoundingClientRect();
        el.style.width = data.width + 'px';
        el.style.left = data.left + 'px';
        el.style.top = data.top + 'px';
        el.classList.add('draggable');
        this.el.nativeElement.append(el);
        this.dragElement.draggableEl = el;
        this.dragElement.targetHeight = data.height;
        this.updateDraggableDims(event);
    };
    /**
     * Looking by stored row elemens for overlapped row
     * @param event
     * @returns {any}
     */
    Draggable.prototype.lookupElementUnder = function (event) {
        var top = event.y || event.clientY - (this.dragElement.targetHeight / 2);
        var bottom = event.y || event.clientY + this.dragElement.targetHeight - (this.dragElement.targetHeight / 2);
        var elemIndex = null;
        for (var i = 0; i < this.elements.length; i++) {
            var el = this.elements[i];
            if (!el.active) {
                // 30 - it is offset from center
                if (top < el.center + 30 && el.index < this.dragElement.activeIndex
                    || bottom > el.center - 30 && el.index > this.dragElement.activeIndex) {
                    elemIndex = i;
                }
            }
        }
        return elemIndex;
    };
    /**
     * Swap rows
     * @param index
     */
    Draggable.prototype.swapWithIndex = function (index) {
        var _this = this;
        var activeIndex = this.dragElement.activeIndex;
        var activeRow = this._rows[activeIndex];
        this._rows[activeIndex] = this._rows[index];
        this._rows[index] = activeRow;
        activeRow = this.elements[activeIndex].target;
        this.elements[activeIndex].active = false;
        this.elements[activeIndex].target = this.elements[index].target;
        this.elements[index].target = activeRow;
        this.elements[index].active = true;
        this.dragElement.activeIndex = index;
        this.zone.run(function () {
            _this.cdRef.markForCheck();
        });
    };
    /**
     * Update cell width for draggable elem
     * @param event
     */
    Draggable.prototype.updateDraggableDims = function (event) {
        var draggableCells = Array.from(this.dragElement.draggableEl.querySelectorAll('td'));
        Array.from(event.target.querySelectorAll('td')).forEach(function (elem, index) {
            var dims = elem.getBoundingClientRect();
            draggableCells[index].style.width = dims.width + 'px';
        });
    };
    /**
     * Fix background when mobile
     * @param e
     */
    Draggable.prototype.touchFix = function (e) {
        if (!('clientX' in e) && !('clientY' in e)) {
            var touches = e.touches || e.originalEvent.touches;
            if (touches && touches.length) {
                e.clientX = touches[0].clientX;
                e.clientY = touches[0].clientY;
            }
            e.preventDefault();
        }
    };
    return Draggable;
}());
exports.Draggable = Draggable;


/***/ }),

/***/ "./app/components/body/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("./app/components/body/body.component.ts"));
__export(__webpack_require__("./app/components/body/row/index.ts"));


/***/ }),

/***/ "./app/components/body/row/cell/cell.component.html":
/***/ (function(module, exports) {

module.exports = "<ng-template [ngTemplateOutlet]=\"column.rowTemplate || cell\" [ngTemplateOutletContext]=\"cellContext\"></ng-template>\n\n<ng-template #cell let-value=\"value\">\n  {{value}}\n</ng-template>\n"

/***/ }),

/***/ "./app/components/body/row/cell/cell.component.ts":
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__("@angular/core");
var column_model_1 = __webpack_require__("./app/models/column.model.ts");
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
        this.cellContext.column = this.column;
        if (this.row) {
            this.cellContext.row = this.row;
            this.cellContext.value = this.row[this.column.name];
        }
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
            selector: '[fs-cell]',
            template: __webpack_require__("./app/components/body/row/cell/cell.component.html"),
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [])
    ], FsCellComponent);
    return FsCellComponent;
}());
exports.FsCellComponent = FsCellComponent;


/***/ }),

/***/ "./app/components/body/row/cell/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("./app/components/body/row/cell/cell.component.ts"));


/***/ }),

/***/ "./app/components/body/row/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("./app/components/body/row/row.component.ts"));
__export(__webpack_require__("./app/components/body/row/cell/index.ts"));


/***/ }),

/***/ "./app/components/body/row/row.component.html":
/***/ (function(module, exports) {

module.exports = "<ng-container *ngFor=\"let column of columns\">\n  <td fs-cell\n      *ngIf=\"!column.cellColspanned\"\n      [column]=\"column\"\n      [row]=\"row\"\n      [rowIndex]=\"rowIndex\"\n      [ngClass]=\"column.cellConfigs.classesArray\"\n      [attr.colspan]=\"column.cellConfigs.colspan\"\n      [attr.width]=\"column.width\">\n  </td>\n</ng-container>\n\n<!-- Drag -->\n<td class=\"fs-list-col drag-col\" *ngIf=\"reorder\">\n  <mat-icon>drag_handle</mat-icon>\n</td>\n\n<!-- Row Actions -->\n<td *ngIf=\"rowActions?.length > 0 && !reorder\" class=\"fs-list-col row-actions\">\n  <span *ngFor=\"let action of inlineRowActions\"\n        class=\"row-inline-action row-inline-action-{{action.type}}\"\n        [ngClass]=\"{'mobile-hide': action.menu === undefined}\"\n  >\n    <ng-container *ngIf=\"action.isShown\" [ngSwitch]=\"action.type\">\n      <!-- Basic button -->\n      <button type=\"button\"\n              *ngSwitchCase=\"'basic'\"\n              mat-button\n              (click)=\"$event.stopPropagation(); action.click(row, $event)\"\n              [ngClass]=\"action.classArray\"\n      >\n        <ng-template [ngTemplateOutlet]=\"buttonContent\"></ng-template>\n      </button>\n\n        <!-- Raised button -->\n      <button type=\"button\"\n              *ngSwitchCase=\"'raised'\"\n              mat-raised-button\n              (click)=\"$event.stopPropagation(); action.click(row, $event)\"\n              [ngClass]=\"action.classArray\"\n      >\n        <ng-template [ngTemplateOutlet]=\"buttonContent\"></ng-template>\n      </button>\n\n        <!-- Icon button -->\n      <button type=\"button\"\n              *ngSwitchCase=\"'icon'\"\n              mat-icon-button\n              (click)=\"$event.stopPropagation(); action.click(row, $event)\"\n              [ngClass]=\"action.classArray\"\n      >\n        <ng-template [ngTemplateOutlet]=\"buttonContent\"></ng-template>\n      </button>\n\n        <!-- Fab button -->\n      <button type=\"button\"\n              *ngSwitchCase=\"'fab'\"\n              mat-fab\n              (click)=\"$event.stopPropagation(); action.click(row, $event)\"\n              [ngClass]=\"action.classArray\"\n      >\n        <ng-template [ngTemplateOutlet]=\"buttonContent\"></ng-template>\n      </button>\n\n        <!-- Mini Fab button -->\n      <button type=\"button\"\n              *ngSwitchCase=\"'mini-fab'\"\n              mat-mini-fab\n              (click)=\"$event.stopPropagation(); action.click(row, $event)\"\n              [ngClass]=\"action.classArray\"\n      >\n        <ng-template [ngTemplateOutlet]=\"buttonContent\"></ng-template>\n      </button>\n\n      <ng-template #buttonContent let-value=\"value\">\n        <mat-icon *ngIf=\"action.icon\">{{action.icon}}</mat-icon> {{action.label}}\n      </ng-template>\n    </ng-container>\n  </span>\n\n  <!-- Menu -->\n  <span class=\"row-menu-action\" *ngIf=\"menuRowActions.length\" (click)=\"$event.stopPropagation();\">\n    <button type=\"button\" mat-icon-button [matMenuTriggerFor]=\"rowActionsRef\">\n      <mat-icon>more_vert</mat-icon>\n    </button>\n  </span>\n  <mat-menu #rowActionsRef>\n    <ng-container *ngFor=\"let action of inlineRowActions\">\n      <button type=\"button\" class=\"hidden-mobile-menu-action\"\n              mat-menu-item\n              *ngIf=\"action.menu === undefined && action.isShown\"\n              (click)=\"$event.stopPropagation(); action.click(row, $event)\"\n      >\n        <mat-icon *ngIf=\"action.icon\">{{action.icon}}</mat-icon> {{action.label}}\n      </button>\n    </ng-container>\n    <ng-container *ngFor=\"let action of menuRowActions\">\n      <button type=\"button\" mat-menu-item *ngIf=\"action.isShown\" (click)=\"$event.stopPropagation();  action.click(row, $event)\">\n        <mat-icon *ngIf=\"action.icon\">{{action.icon}}</mat-icon> {{action.label}}\n      </button>\n    </ng-container>\n  </mat-menu>\n</td>\n"

/***/ }),

/***/ "./app/components/body/row/row.component.ts":
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__("@angular/core");
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
        var _this = this;
        if (this._rowDiffer.diff(this.row)) {
            if (this.rowActions) {
                this.rowActions.forEach(function (action) { return action.checkShowStatus(_this.row); });
            }
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
                    evt.preventDefault();
                    evt.stopPropagation();
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
            template: __webpack_require__("./app/components/body/row/row.component.html"),
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


/***/ }),

/***/ "./app/components/footer/footer-row/footer-cell/footer-cell.component.html":
/***/ (function(module, exports) {

module.exports = "<ng-template [ngTemplateOutlet]=\"column.footerTemplate || cell\" [ngTemplateOutletContext]=\"cellContext\"></ng-template>\n\n<ng-template #cell let-value=\"value\">\n  {{value}}\n</ng-template>\n"

/***/ }),

/***/ "./app/components/footer/footer-row/footer-cell/footer-cell.component.ts":
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__("@angular/core");
var body_1 = __webpack_require__("./app/components/body/index.ts");
var FsFooterCellComponent = (function (_super) {
    __extends(FsFooterCellComponent, _super);
    function FsFooterCellComponent() {
        return _super.call(this) || this;
    }
    FsFooterCellComponent = __decorate([
        core_1.Component({
            selector: '[fs-list-footer-cell]',
            template: __webpack_require__("./app/components/footer/footer-row/footer-cell/footer-cell.component.html"),
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [])
    ], FsFooterCellComponent);
    return FsFooterCellComponent;
}(body_1.FsCellComponent));
exports.FsFooterCellComponent = FsFooterCellComponent;


/***/ }),

/***/ "./app/components/footer/footer-row/footer-cell/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("./app/components/footer/footer-row/footer-cell/footer-cell.component.ts"));


/***/ }),

/***/ "./app/components/footer/footer-row/footer-row.component.html":
/***/ (function(module, exports) {

module.exports = "<ng-container *ngFor=\"let column of columns\">\n  <td fs-list-footer-cell\n      *ngIf=\"!column.footerColspanned\"\n      [column]=\"column\"\n      [row]=\"row\"\n      [rowIndex]=\"rowIndex\"\n      [ngClass]=\"column.footerConfigs.classesArray\"\n      [attr.colspan]=\"column.footerConfigs.colspan\"\n      [attr.width]=\"column.width\">\n  </td>\n</ng-container>\n\n<!-- Drag -->\n<td *ngIf=\"hasRowActions && !reorder\" class=\"fs-list-col row-actions\"></td>\n\n<!-- Row Actions -->\n<td *ngIf=\"reorder\" class=\"fs-list-col drag-col\"></td>\n"

/***/ }),

/***/ "./app/components/footer/footer-row/footer-row.component.ts":
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__("@angular/core");
var body_1 = __webpack_require__("./app/components/body/index.ts");
var FsFooterRowComponent = (function (_super) {
    __extends(FsFooterRowComponent, _super);
    function FsFooterRowComponent(cdRef, differs, el, renderer) {
        return _super.call(this, el, cdRef, differs, renderer) || this;
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], FsFooterRowComponent.prototype, "hasRowActions", void 0);
    FsFooterRowComponent = __decorate([
        core_1.Component({
            selector: '[fs-list-footer-row]',
            template: __webpack_require__("./app/components/footer/footer-row/footer-row.component.html"),
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [core_1.ChangeDetectorRef,
            core_1.KeyValueDiffers,
            core_1.ElementRef,
            core_1.Renderer2])
    ], FsFooterRowComponent);
    return FsFooterRowComponent;
}(body_1.FsRowComponent));
exports.FsFooterRowComponent = FsFooterRowComponent;


/***/ }),

/***/ "./app/components/footer/footer-row/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("./app/components/footer/footer-row/footer-row.component.ts"));
__export(__webpack_require__("./app/components/footer/footer-row/footer-cell/index.ts"));


/***/ }),

/***/ "./app/components/footer/footer.component.html":
/***/ (function(module, exports) {

module.exports = "<tr fs-list-footer-row [columns]=\"columns\" [hasRowActions]=\"hasRowActions\"></tr>\n"

/***/ }),

/***/ "./app/components/footer/footer.component.ts":
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__("@angular/core");
var body_component_1 = __webpack_require__("./app/components/body/body.component.ts");
var FsFooterComponent = (function (_super) {
    __extends(FsFooterComponent, _super);
    function FsFooterComponent(el, cdRef, differs, zone) {
        return _super.call(this, el, cdRef, differs, zone) || this;
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], FsFooterComponent.prototype, "hasRowActions", void 0);
    FsFooterComponent = __decorate([
        core_1.Component({
            selector: '[fs-list-footer]',
            template: __webpack_require__("./app/components/footer/footer.component.html"),
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [core_1.ElementRef,
            core_1.ChangeDetectorRef,
            core_1.IterableDiffers,
            core_1.NgZone])
    ], FsFooterComponent);
    return FsFooterComponent;
}(body_component_1.FsBodyComponent));
exports.FsFooterComponent = FsFooterComponent;


/***/ }),

/***/ "./app/components/footer/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("./app/components/footer/footer.component.ts"));
__export(__webpack_require__("./app/components/footer/footer-row/index.ts"));


/***/ }),

/***/ "./app/components/head/head-cell/head-cell.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"wrap\">\n    <span class=\"title\">\n      <ng-template [ngIf]=\"!column.headerTemplate\">{{column.title}}</ng-template>\n      <ng-template\n        [ngIf]=\"column.headerTemplate\"\n        [ngTemplateOutlet]=\"column.headerTemplate\"\n        [ngTemplateOutletContext]=\"cellContext\">\n      </ng-template>\n    </span>\n  <div class=\"direction\" *ngIf=\"column.ordered\" [ngSwitch]=\"column.sortingDirection\">\n    <mat-icon class=\"material-icons\" role=\"img\" aria-label=\"arrow_downward\" *ngSwitchCase=\"0\">arrow_downward</mat-icon>\n    <mat-icon class=\"material-icons\" role=\"img\" aria-label=\"arrow_upward\" *ngSwitchCase=\"1\">arrow_upward</mat-icon>\n  </div>\n</div>\n"

/***/ }),

/***/ "./app/components/head/head-cell/head-cell.component.ts":
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__("@angular/core");
var cell_component_1 = __webpack_require__("./app/components/body/row/cell/cell.component.ts");
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
            selector: '[fs-head-cell]',
            template: __webpack_require__("./app/components/head/head-cell/head-cell.component.html"),
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [core_1.ChangeDetectorRef,
            core_1.KeyValueDiffers])
    ], FsHeadCellComponent);
    return FsHeadCellComponent;
}(cell_component_1.FsCellComponent));
exports.FsHeadCellComponent = FsHeadCellComponent;


/***/ }),

/***/ "./app/components/head/head-cell/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("./app/components/head/head-cell/head-cell.component.ts"));


/***/ }),

/***/ "./app/components/head/head.component.html":
/***/ (function(module, exports) {

module.exports = "<tr class=\"fs-list-row\">\n  <th fs-head-cell *ngFor=\"let column of columns\"\n      (click)=\"$event.stopPropagation(); sorting.sortBy(column)\"\n      [column]=\"column\"\n      [class.sorting]=\"column.sortable\"\n      [ngClass]=\"column.headerConfigs.classesArray\"\n      [attr.colspan]=\"column.headerConfigs.colspan\"\n      [attr.width]=\"column.width\"></th>\n\n  <!-- Drag -->\n  <th *ngIf=\"reorder\" class=\"fs-list-col drag-col\"></th>\n\n  <!-- Row Actions -->\n  <th *ngIf=\"hasRowActions && !reorder\" class=\"fs-list-col row-actions\"></th>\n</tr>\n"

/***/ }),

/***/ "./app/components/head/head.component.ts":
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__("@angular/core");
var sorting_model_1 = __webpack_require__("./app/models/sorting.model.ts");
var FsHeadComponent = (function () {
    function FsHeadComponent(cdRef) {
        this.cdRef = cdRef;
    }
    FsHeadComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sorting.sortingChanged.subscribe(function () {
            _this.cdRef.markForCheck();
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", sorting_model_1.Sorting)
    ], FsHeadComponent.prototype, "sorting", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], FsHeadComponent.prototype, "columns", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], FsHeadComponent.prototype, "hasRowActions", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], FsHeadComponent.prototype, "reorder", void 0);
    __decorate([
        core_1.ViewChild('rowsContainer', { read: core_1.ViewContainerRef }),
        __metadata("design:type", Object)
    ], FsHeadComponent.prototype, "rowsContainer", void 0);
    FsHeadComponent = __decorate([
        core_1.Component({
            selector: '[fs-list-head]',
            template: __webpack_require__("./app/components/head/head.component.html"),
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [core_1.ChangeDetectorRef])
    ], FsHeadComponent);
    return FsHeadComponent;
}());
exports.FsHeadComponent = FsHeadComponent;


/***/ }),

/***/ "./app/components/head/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("./app/components/head/head.component.ts"));
__export(__webpack_require__("./app/components/head/head-cell/index.ts"));


/***/ }),

/***/ "./app/components/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("./app/components/list/index.ts"));
__export(__webpack_require__("./app/components/status/index.ts"));
__export(__webpack_require__("./app/components/body/index.ts"));
__export(__webpack_require__("./app/components/head/index.ts"));
__export(__webpack_require__("./app/components/pagination/index.ts"));
__export(__webpack_require__("./app/components/footer/index.ts"));


/***/ }),

/***/ "./app/components/list/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("./app/components/list/list.component.ts"));


/***/ }),

/***/ "./app/components/list/list.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"fs-list-container\" [ngClass]=\"{ 'has-filter-input': listConfig.filterInput,\n                                            'has-filters': listConfig.filterService.fsConfig.items.length,\n                                            'has-heading': listConfig.heading,\n                                            'has-status': listConfig.status,\n                                            'has-actions': listConfig.actions.length }\">\n  <!-- Header -->\n  <div class=\"fs-list-header-container\">\n    <div class=\"fs-list-header\"\n        [ngClass]=\"{ 'no-wrap': listConfig.reoderEnabled || !listConfig.filterService.fsConfig.items.length }\">\n      <div class=\"heading-container\" *ngIf=\"listConfig.heading || listConfig.subheading\">\n        <h2 class=\"heading\" *ngIf=\"listConfig.heading\">{{listConfig.heading}}</h2>\n        <span class=\"subheading\" *ngIf=\"listConfig.subheading\">{{listConfig.subheading}}</span>\n      </div>\n      <!-- Filters/actions -->\n      <div class=\"fs-list-toolbar\">\n        <fs-filter\n          class=\"fs-list-filter\"\n          [hidden]=\"!listConfig.filterService.fsConfig.items.length || listConfig.reoderEnabled\"\n          [(filter)]=\"listConfig.filterService\"\n        >\n        </fs-filter>\n\n        <!-- Actions -->\n        <div class=\"fs-list-actions\" *ngIf=\"listConfig.actions?.length\">\n          <ng-container *ngIf=\"!listConfig.reoderEnabled\">\n            <span *ngFor=\"let action of listConfig.menuActions\" class=\"action-button\">\n              <button type=\"button\"\n                      mat-raised-button\n                      (click)=\"action.click(action, $event)\"\n                      [ngClass]=\"{ 'mat-primary': action.primary }\">\n                <mat-icon *ngIf=\"action.icon\">{{action.icon}}</mat-icon> {{ action.label }}\n              </button>\n          </span>\n          </ng-container>\n          <button type=\"button\"\n                  mat-icon-button\n                  *ngIf=\"!listConfig.reoderEnabled\"\n                  [matMenuTriggerFor]=\"rowActionsRef\"\n                  [ngClass]=\"{\n                    'hidden': !listConfig.kebabActions.length,\n                    'show-mobile': !listConfig.kebabActions.length && listConfig.menuActions.length\n                  }\">\n            <mat-icon>more_vert</mat-icon>\n          </button>\n          <mat-menu #rowActionsRef>\n            <button type=\"button\"\n                    class=\"hidden-mobile-menu-action\"\n                    mat-menu-item\n                    *ngFor=\"let action of listConfig.menuActions\"\n                    (click)=\"action.click(row, $event)\"\n            >\n              <mat-icon *ngIf=\"action.icon\">{{action.icon}}</mat-icon> {{action.label}}\n            </button>\n            <button type=\"button\"\n                    mat-menu-item\n                    *ngFor=\"let action of listConfig.kebabActions\"\n                    (click)=\"action.click(row, $event)\">\n              <mat-icon *ngIf=\"action.icon\">{{action.icon}}</mat-icon> {{action.label}}\n            </button>\n          </mat-menu>\n\n          <button type=\"button\"\n                  mat-button\n                  color=\"primary\"\n                  *ngIf=\"listConfig.reoderEnabled\"\n                  (click)=\"finishReorder()\">\n            DONE\n          </button>\n        </div>\n        <!-- /Actions -->\n      </div>\n    </div>\n\n    <!-- Status -->\n    <fs-list-status\n      [ngClass]=\"{'hidden-mobile': !listConfig.status}\"\n      [dataChangedRef]=\"listConfig.data$\"\n      [sorting]=\"listConfig.sorting\"\n      [paging]=\"listConfig.paging\"\n      *ngIf=\"listConfig.paging && !listConfig.reoderEnabled\">\n    </fs-list-status>\n  </div>\n\n\n  <!-- Table implementation -->\n  <div class=\"fs-list-table-container\">\n    <table class=\"fs-list-table\" role=\"grid\">\n      <thead fs-list-head\n             class=\"fs-list-head\"\n             role=\"rowgroup\"\n             [columns]=\"listConfig.columns\"\n             [sorting]=\"listConfig.sorting\"\n             [hasRowActions]=\"listConfig.hasRowActions\"\n             [reorder]=\"listConfig.reoderEnabled\">\n      </thead>\n\n      <tbody fs-list-body\n             class=\"fs-list-body\"\n             role=\"rowgroup\"\n             [class.loading]=\"listConfig.loading\"\n             [rows]=\"displayRows\"\n             [rowActions]=\"listConfig.rowActions\"\n             [rowEvents]=\"listConfig.rowEvents\"\n             [columns]=\"listConfig.columns\"\n             [hasFooter]=\"listConfig.hasFooter\"\n             [reorder]=\"listConfig.reoderEnabled\">\n      </tbody>\n\n      <tfoot fs-list-footer\n             class=\"fs-list-footer\"\n             *ngIf=\"listConfig.hasFooter\"\n             [columns]=\"listConfig.columns\"\n             [hasRowActions]=\"listConfig.hasRowActions\">\n      </tfoot>\n    </table>\n  </div>\n\n  <fs-list-pagination\n    *ngIf=\"listConfig.paging.enabled\"\n    [dataChangedRef]=\"listConfig.data$\"\n    [pagination]=\"listConfig.paging\">\n  </fs-list-pagination>\n</div>\n"

/***/ }),

/***/ "./app/components/list/list.component.scss":
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__("../node_modules/css-loader/index.js?{\"sourceMap\":true}!../node_modules/postcss-loader/lib/index.js?{\"sourceMap\":true}!../node_modules/resolve-url-loader/index.js?{\"sourceMap\":true}!../node_modules/sass-loader/lib/loader.js?{\"sourceMap\":true}!./app/components/list/list.component.scss");

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ "./app/components/list/list.component.ts":
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__("@angular/core");
var directives_1 = __webpack_require__("./app/directives/index.ts");
var list_config_model_1 = __webpack_require__("./app/models/list-config.model.ts");
var FsListComponent = (function () {
    function FsListComponent() {
    }
    Object.defineProperty(FsListComponent.prototype, "columnTemplates", {
        /**
         * Set columns to config
         * Create Column Model instances
         *
         * @param {QueryList<FsListColumnDirective>} val
         */
        set: function (val) {
            this.listConfig.tranformTemplatesToColumns(val);
        },
        enumerable: true,
        configurable: true
    });
    //private _rowsDiffer: IterableDiffer<any[]>;
    // constructor(private cdRef: ChangeDetectorRef,
    //             private differs: IterableDiffers) {
    //   this._rowsDiffer = differs.find([]).create(null);
    // }
    FsListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.listConfig = new list_config_model_1.FsListModel(this.config);
        //this.listConfig.rows = this.rows;
        if (!this.listConfig.filters || this.listConfig.filters.length === 0 && this.listConfig.initialFetch) {
            this.listConfig.load();
        }
        this.listConfig.data$.subscribe(function (rows) {
            _this.displayRows = rows;
        });
    };
    //public ngDoCheck() {
    // const rowsDiffer = this._rowsDiffer.diff(this.rows);
    // const displayRowsDiffer = this._rowsDiffer.diff(this.displayRows);
    // if (rowsDiffer || displayRowsDiffer) {
    //   this.cdRef.markForCheck();
    // }
    // if (this.listConfig.paging.manual && rowsDiffer) {
    //   this.listConfig.paging.updatePagingManual(this.rows);
    //   this.listConfig.paging.pageChanged.next();
    // }
    //}
    FsListComponent.prototype.ngOnDestroy = function () {
        this.listConfig.data$.complete();
        this.listConfig.paging.pageChanged.complete();
    };
    FsListComponent.prototype.nextPage = function () {
        this.listConfig.paging.goNext();
    };
    FsListComponent.prototype.prevPage = function () {
        this.listConfig.paging.goPrev();
    };
    FsListComponent.prototype.firstPage = function () {
        this.listConfig.paging.goFirst();
    };
    FsListComponent.prototype.lastPage = function () {
        this.listConfig.paging.goLast();
    };
    FsListComponent.prototype.load = function () {
        this.listConfig.load();
    };
    FsListComponent.prototype.finishReorder = function () {
        this.listConfig.reoderEnabled = false;
        if (this.listConfig.reoder.done) {
            this.listConfig.reoder.done(this.displayRows);
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsListComponent.prototype, "config", void 0);
    __decorate([
        core_1.ContentChildren(directives_1.FsListColumnDirective),
        __metadata("design:type", core_1.QueryList),
        __metadata("design:paramtypes", [core_1.QueryList])
    ], FsListComponent.prototype, "columnTemplates", null);
    FsListComponent = __decorate([
        core_1.Component({
            selector: 'fs-list',
            template: __webpack_require__("./app/components/list/list.component.html"),
            styles: [
                __webpack_require__("./app/components/list/list.component.scss"),
            ],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], FsListComponent);
    return FsListComponent;
}());
exports.FsListComponent = FsListComponent;


/***/ }),

/***/ "./app/components/pagination/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("./app/components/pagination/pagination.component.ts"));


/***/ }),

/***/ "./app/components/pagination/pagination.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"paging\" fxLayout=\"row\"\n     *ngIf=\"pagination?.pagesArray && pagination.pagesArray.length > 1\">\n  <div class=\"records\"></div>\n  <div fxFlex>\n    <ul class=\"pages\">\n      <li class=\"first\" [class.disabled]=\"!pagination.hasPrevPage\">\n        <a (click)=\"pagination.goFirst()\">&laquo;</a>\n      </li>\n      <li class=\"previous\" [class.disabled]=\"!pagination.hasPrevPage\">\n        <a (click)=\"pagination.goPrev()\">‹</a>\n      </li>\n      <li class=\"page\" *ngFor=\"let page of pagination.pagesArray;\"\n          [class.active]=\"pagination.isActive(page)\"\n      >\n        <a (click)=\"pagination.goToPage(page)\">{{ page }}</a>\n      </li>\n      <li class=\"next\" [class.disabled]=\"!pagination.hasNextPage\">\n        <a (click)=\"pagination.goNext()\">›</a>\n      </li>\n      <li class=\"last\" [class.disabled]=\"!pagination.hasNextPage\">\n        <a (click)=\"pagination.goLast()\">&raquo;</a>\n      </li>\n    </ul>\n  </div>\n</div>\n"

/***/ }),

/***/ "./app/components/pagination/pagination.component.scss":
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__("../node_modules/css-loader/index.js?{\"sourceMap\":true}!../node_modules/postcss-loader/lib/index.js?{\"sourceMap\":true}!../node_modules/resolve-url-loader/index.js?{\"sourceMap\":true,\"absolute\":false,\"fail\":false,\"silent\":false,\"keepQuery\":false,\"attempts\":0,\"debug\":false,\"root\":null,\"includeRoot\":false}!../node_modules/sass-loader/lib/loader.js?{\"sourceMap\":true}!./app/components/pagination/pagination.component.scss");

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ "./app/components/pagination/pagination.component.ts":
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__("@angular/core");
var BehaviorSubject_1 = __webpack_require__("rxjs/BehaviorSubject");
var pagination_model_1 = __webpack_require__("./app/models/pagination.model.ts");
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
            template: __webpack_require__("./app/components/pagination/pagination.component.html"),
            styles: [
                __webpack_require__("./app/components/pagination/pagination.component.scss")
            ],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [core_1.ChangeDetectorRef])
    ], FsPaginationComponent);
    return FsPaginationComponent;
}());
exports.FsPaginationComponent = FsPaginationComponent;


/***/ }),

/***/ "./app/components/status/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("./app/components/status/status.component.ts"));


/***/ }),

/***/ "./app/components/status/status.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"infinite-records\" fxLayout=\"row\" fxLayoutAlign=\"start center\" *ngIf=\"paging.enabled\">\n  Showing&nbsp;<a [matMenuTriggerFor]=\"limitsMenu\">{{paging.displayed}}</a>&nbsp;of {{paging.records}} results\n  <span *ngIf=\"sorting.sortingColumn\">&nbsp;ordered by\n    <a class=\"order-toggle\" [matMenuTriggerFor]=\"orderColumnsMenu\">{{sorting.sortingColumn.title}}</a>,\n    <a class=\"order-toggle\" [matMenuTriggerFor]=\"orderDirectionMenu\">{{sorting.sortingColumn.fullNameDirection}}</a></span>\n</div>\n\n<div class=\"infinite-records\" fxLayout=\"row\" fxLayoutAlign=\"start center\" *ngIf=\"!paging.enabled && paging.displayed > 0\">\n  Showing&nbsp;\n  <span *ngIf=\"paging.displayed == 1\">{{paging.displayed}} result</span>\n  <span *ngIf=\"paging.displayed > 1\">{{paging.displayed}} results</span>\n</div>\n\n<mat-menu #limitsMenu>\n  <button type=\"button\" mat-menu-item *ngFor=\"let lim of paging.limits\" (click)=\"setLimit(lim)\"> {{lim}} </button>\n</mat-menu>\n\n<mat-menu #orderColumnsMenu>\n  <button type=\"button\" mat-menu-item *ngFor=\"let column of sorting.sortingColumns\" (click)=\"setSortableColumn(column)\">{{column.title}}</button>\n</mat-menu>\n\n<mat-menu #orderDirectionMenu>\n  <button type=\"button\" mat-menu-item (click)=\"setDirection(OrderDirection.asc)\"> ascending </button>\n  <button type=\"button\" mat-menu-item (click)=\"setDirection(OrderDirection.desc)\"> descending </button>\n</mat-menu>\n"

/***/ }),

/***/ "./app/components/status/status.component.scss":
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__("../node_modules/css-loader/index.js?{\"sourceMap\":true}!../node_modules/postcss-loader/lib/index.js?{\"sourceMap\":true}!../node_modules/resolve-url-loader/index.js?{\"sourceMap\":true,\"absolute\":false,\"fail\":false,\"silent\":false,\"keepQuery\":false,\"attempts\":0,\"debug\":false,\"root\":null,\"includeRoot\":false}!../node_modules/sass-loader/lib/loader.js?{\"sourceMap\":true}!./app/components/status/status.component.scss");

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ "./app/components/status/status.component.ts":
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__("@angular/core");
var column_model_1 = __webpack_require__("./app/models/column.model.ts");
var pagination_model_1 = __webpack_require__("./app/models/pagination.model.ts");
var sorting_model_1 = __webpack_require__("./app/models/sorting.model.ts");
var FsStatusComponent = (function () {
    function FsStatusComponent(cdRef) {
        this.cdRef = cdRef;
        this.OrderDirection = column_model_1.SortingDirection;
    }
    FsStatusComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataChangedRef.subscribe(function () {
            _this.cdRef.markForCheck();
        });
    };
    FsStatusComponent.prototype.setDirection = function (direction) {
        this.sorting.setSortDirection(direction);
    };
    FsStatusComponent.prototype.setSortableColumn = function (column) {
        this.sorting.sortBy(column, false);
    };
    FsStatusComponent.prototype.setLimit = function (limit) {
        this.paging.setLimit(limit);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", pagination_model_1.Pagination)
    ], FsStatusComponent.prototype, "paging", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", sorting_model_1.Sorting)
    ], FsStatusComponent.prototype, "sorting", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsStatusComponent.prototype, "dataChangedRef", void 0);
    FsStatusComponent = __decorate([
        core_1.Component({
            selector: 'fs-list-status',
            template: __webpack_require__("./app/components/status/status.component.html"),
            styles: [
                __webpack_require__("./app/components/status/status.component.scss"),
            ],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [core_1.ChangeDetectorRef])
    ], FsStatusComponent);
    return FsStatusComponent;
}());
exports.FsStatusComponent = FsStatusComponent;


/***/ }),

/***/ "./app/directives/cell/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("./app/directives/cell/row.directive.ts"));


/***/ }),

/***/ "./app/directives/cell/row.directive.ts":
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__("@angular/core");
var FsListCellDirective = (function () {
    function FsListCellDirective() {
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsListCellDirective.prototype, "colspan", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], FsListCellDirective.prototype, "align", void 0);
    __decorate([
        core_1.Input('class'),
        __metadata("design:type", Object)
    ], FsListCellDirective.prototype, "className", void 0);
    FsListCellDirective = __decorate([
        core_1.Directive({ selector: '[fs-list-cell]' })
    ], FsListCellDirective);
    return FsListCellDirective;
}());
exports.FsListCellDirective = FsListCellDirective;


/***/ }),

/***/ "./app/directives/column/column.directive.ts":
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__("@angular/core");
var _1 = __webpack_require__("./app/directives/index.ts");
var footer_directive_1 = __webpack_require__("./app/directives/footer/footer.directive.ts");
var FsListColumnDirective = (function () {
    function FsListColumnDirective() {
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], FsListColumnDirective.prototype, "title", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], FsListColumnDirective.prototype, "name", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], FsListColumnDirective.prototype, "sortable", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], FsListColumnDirective.prototype, "align", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], FsListColumnDirective.prototype, "width", void 0);
    __decorate([
        core_1.Input('class'),
        __metadata("design:type", Object)
    ], FsListColumnDirective.prototype, "className", void 0);
    __decorate([
        core_1.ContentChild(_1.FsListHeaderDirective, { read: core_1.TemplateRef }),
        __metadata("design:type", core_1.TemplateRef)
    ], FsListColumnDirective.prototype, "headerTemplate", void 0);
    __decorate([
        core_1.ContentChild(_1.FsListHeaderDirective),
        __metadata("design:type", Object)
    ], FsListColumnDirective.prototype, "headerConfigs", void 0);
    __decorate([
        core_1.ContentChild(_1.FsListCellDirective, { read: core_1.TemplateRef }),
        __metadata("design:type", core_1.TemplateRef)
    ], FsListColumnDirective.prototype, "rowTemplate", void 0);
    __decorate([
        core_1.ContentChild(_1.FsListCellDirective),
        __metadata("design:type", Object)
    ], FsListColumnDirective.prototype, "cellConfigs", void 0);
    __decorate([
        core_1.ContentChild(footer_directive_1.FsListFooterDirective, { read: core_1.TemplateRef }),
        __metadata("design:type", core_1.TemplateRef)
    ], FsListColumnDirective.prototype, "footerTemplate", void 0);
    __decorate([
        core_1.ContentChild(footer_directive_1.FsListFooterDirective),
        __metadata("design:type", Object)
    ], FsListColumnDirective.prototype, "footerConfigs", void 0);
    FsListColumnDirective = __decorate([
        core_1.Directive({
            selector: 'fs-list-column'
        })
    ], FsListColumnDirective);
    return FsListColumnDirective;
}());
exports.FsListColumnDirective = FsListColumnDirective;


/***/ }),

/***/ "./app/directives/column/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("./app/directives/column/column.directive.ts"));


/***/ }),

/***/ "./app/directives/footer/footer.directive.ts":
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__("@angular/core");
var FsListFooterDirective = (function () {
    function FsListFooterDirective() {
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsListFooterDirective.prototype, "colspan", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], FsListFooterDirective.prototype, "align", void 0);
    __decorate([
        core_1.Input('class'),
        __metadata("design:type", Object)
    ], FsListFooterDirective.prototype, "className", void 0);
    FsListFooterDirective = __decorate([
        core_1.Directive({ selector: '[fs-list-footer]' })
    ], FsListFooterDirective);
    return FsListFooterDirective;
}());
exports.FsListFooterDirective = FsListFooterDirective;


/***/ }),

/***/ "./app/directives/footer/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("./app/directives/footer/footer.directive.ts"));


/***/ }),

/***/ "./app/directives/header/header.directive.ts":
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__("@angular/core");
var FsListHeaderDirective = (function () {
    function FsListHeaderDirective() {
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], FsListHeaderDirective.prototype, "colspan", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], FsListHeaderDirective.prototype, "align", void 0);
    __decorate([
        core_1.Input('class'),
        __metadata("design:type", Object)
    ], FsListHeaderDirective.prototype, "className", void 0);
    FsListHeaderDirective = __decorate([
        core_1.Directive({ selector: '[fs-list-header]' })
    ], FsListHeaderDirective);
    return FsListHeaderDirective;
}());
exports.FsListHeaderDirective = FsListHeaderDirective;


/***/ }),

/***/ "./app/directives/header/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("./app/directives/header/header.directive.ts"));


/***/ }),

/***/ "./app/directives/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("./app/directives/header/index.ts"));
__export(__webpack_require__("./app/directives/cell/index.ts"));
__export(__webpack_require__("./app/directives/column/index.ts"));
__export(__webpack_require__("./app/directives/footer/index.ts"));


/***/ }),

/***/ "./app/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("./app/components/index.ts"));
__export(__webpack_require__("./app/models/index.ts"));
__export(__webpack_require__("./app/directives/index.ts"));


/***/ }),

/***/ "./app/models/action.model.ts":
/***/ (function(module, exports, __webpack_require__) {

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
var tsmodels_1 = __webpack_require__("tsmodels");
var Action = (function (_super) {
    __extends(Action, _super);
    function Action(config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this) || this;
        _this.primary = true; //TODO make it as @Alias after tsmodels release
        _this._fromJSON(config);
        return _this;
    }
    Action.prototype._fromJSON = function (value) {
        _super.prototype._fromJSON.call(this, value);
        if (value.primary === false) {
            this.primary = false;
        }
        if (value.click === void 0) {
            this.click = function () { };
        }
    };
    __decorate([
        tsmodels_1.Alias(),
        __metadata("design:type", String)
    ], Action.prototype, "icon", void 0);
    __decorate([
        tsmodels_1.Alias(),
        __metadata("design:type", String)
    ], Action.prototype, "label", void 0);
    __decorate([
        tsmodels_1.Alias(),
        __metadata("design:type", Boolean)
    ], Action.prototype, "menu", void 0);
    __decorate([
        tsmodels_1.Alias(),
        __metadata("design:type", Function)
    ], Action.prototype, "click", void 0);
    return Action;
}(tsmodels_1.Model));
exports.Action = Action;


/***/ }),

/***/ "./app/models/column.model.ts":
/***/ (function(module, exports, __webpack_require__) {

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
var tsmodels_1 = __webpack_require__("tsmodels");
var core_1 = __webpack_require__("@angular/core");
var _isObject = __webpack_require__("lodash/isObject");
var _isBoolean = __webpack_require__("lodash/isBoolean");
var styleConfig_model_1 = __webpack_require__("./app/models/styleConfig.model.ts");
var SortingDirection;
(function (SortingDirection) {
    SortingDirection[SortingDirection["asc"] = 0] = "asc";
    SortingDirection[SortingDirection["desc"] = 1] = "desc";
})(SortingDirection = exports.SortingDirection || (exports.SortingDirection = {}));
var ALLOWED_DEFAULTS = [
    'title',
    'sortable',
    'align',
    'class'
];
var Column = (function (_super) {
    __extends(Column, _super);
    function Column(colConfig, colDefaults) {
        if (colConfig === void 0) { colConfig = {}; }
        if (colDefaults === void 0) { colDefaults = false; }
        var _this = _super.call(this) || this;
        _this.headerConfigs = new styleConfig_model_1.StyleConfig();
        _this.cellConfigs = new styleConfig_model_1.StyleConfig();
        _this.footerConfigs = new styleConfig_model_1.StyleConfig();
        _this.headerColspanned = false;
        _this.cellColspanned = false;
        _this.footerColspanned = false;
        _this._ordered = false;
        _this._fromJSON(colConfig);
        _this.colStyles = new styleConfig_model_1.StyleConfig(colConfig);
        _this.mergeWithColumnDefaults(colDefaults);
        return _this;
    }
    Object.defineProperty(Column.prototype, "direction", {
        get: function () {
            return (this.sortingDirection === SortingDirection.asc) ? 'asc' : 'desc';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "fullNameDirection", {
        get: function () {
            return (this.sortingDirection === SortingDirection.asc) ? 'ascending' : 'descending';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "ordered", {
        get: function () {
            return this._ordered;
        },
        set: function (value) {
            this._ordered = value;
            if (value) {
                this.sortingDirection = SortingDirection.asc;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Merge with defaults with existing config
     * @param defaults
     */
    Column.prototype.mergeWithColumnDefaults = function (defaults) {
        var _this = this;
        if (!_isObject(defaults)) {
            defaults = {};
        }
        ALLOWED_DEFAULTS.forEach(function (key) {
            switch (key) {
                case 'title':
                    {
                        _this.title = _this.title || defaults.title;
                    }
                    break;
                case 'sortable':
                    {
                        if (_isBoolean(defaults.sortable)) {
                            if (_this.sortable === void 0) {
                                _this.sortable = defaults.sortable;
                            }
                        }
                    }
                    break;
                case 'class':
                    {
                        _this.headerConfigs.mergeClassByPriority(_this.colStyles, defaults.header);
                        _this.cellConfigs.mergeClassByPriority(_this.colStyles, defaults.cell);
                        _this.footerConfigs.mergeClassByPriority(_this.colStyles, defaults.footer);
                    }
                    break;
                case 'align':
                    {
                        _this.headerConfigs.mergeAlignByPriority(_this.colStyles, defaults.header);
                        _this.cellConfigs.mergeAlignByPriority(_this.colStyles, defaults.cell);
                        _this.footerConfigs.mergeAlignByPriority(_this.colStyles, defaults.footer);
                    }
                    break;
            }
        });
        this.headerConfigs.updateClasesArray();
        this.cellConfigs.updateClasesArray();
        this.footerConfigs.updateClasesArray();
    };
    /**
     * Change sorting direction
     */
    Column.prototype.changeDirection = function () {
        if (this.sortingDirection === SortingDirection.asc) {
            this.sortingDirection = SortingDirection.desc;
        }
        else {
            this.sortingDirection = SortingDirection.asc;
        }
    };
    __decorate([
        tsmodels_1.Alias(),
        __metadata("design:type", String)
    ], Column.prototype, "title", void 0);
    __decorate([
        tsmodels_1.Alias(),
        __metadata("design:type", String)
    ], Column.prototype, "name", void 0);
    __decorate([
        tsmodels_1.Alias(),
        __metadata("design:type", String)
    ], Column.prototype, "width", void 0);
    __decorate([
        tsmodels_1.Alias(),
        __metadata("design:type", Boolean)
    ], Column.prototype, "sortable", void 0);
    __decorate([
        tsmodels_1.Alias(),
        __metadata("design:type", core_1.TemplateRef)
    ], Column.prototype, "headerTemplate", void 0);
    __decorate([
        tsmodels_1.Alias(),
        __metadata("design:type", core_1.TemplateRef)
    ], Column.prototype, "rowTemplate", void 0);
    __decorate([
        tsmodels_1.Alias(),
        __metadata("design:type", core_1.TemplateRef)
    ], Column.prototype, "footerTemplate", void 0);
    __decorate([
        tsmodels_1.Alias('headerConfigs', styleConfig_model_1.StyleConfig),
        __metadata("design:type", styleConfig_model_1.StyleConfig)
    ], Column.prototype, "headerConfigs", void 0);
    __decorate([
        tsmodels_1.Alias('cellConfigs', styleConfig_model_1.StyleConfig),
        __metadata("design:type", styleConfig_model_1.StyleConfig)
    ], Column.prototype, "cellConfigs", void 0);
    __decorate([
        tsmodels_1.Alias('footerConfigs', styleConfig_model_1.StyleConfig),
        __metadata("design:type", styleConfig_model_1.StyleConfig)
    ], Column.prototype, "footerConfigs", void 0);
    return Column;
}(tsmodels_1.Model));
exports.Column = Column;


/***/ }),

/***/ "./app/models/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("./app/models/action.model.ts"));
__export(__webpack_require__("./app/models/column.model.ts"));
__export(__webpack_require__("./app/models/list-config.model.ts"));
__export(__webpack_require__("./app/models/pagination.model.ts"));
__export(__webpack_require__("./app/models/reorder.model.ts"));
__export(__webpack_require__("./app/models/row-action.model.ts"));
__export(__webpack_require__("./app/models/sorting.model.ts"));
__export(__webpack_require__("./app/models/styleConfig.model.ts"));


/***/ }),

/***/ "./app/models/list-config.model.ts":
/***/ (function(module, exports, __webpack_require__) {

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
var filter_1 = __webpack_require__("@firestitch/filter");
var column_model_1 = __webpack_require__("./app/models/column.model.ts");
var pagination_model_1 = __webpack_require__("./app/models/pagination.model.ts");
var sorting_model_1 = __webpack_require__("./app/models/sorting.model.ts");
var _isNumber = __webpack_require__("lodash/isNumber");
var tsmodels_1 = __webpack_require__("tsmodels");
var Observable_1 = __webpack_require__("rxjs/Observable");
var BehaviorSubject_1 = __webpack_require__("rxjs/BehaviorSubject");
var styleConfig_model_1 = __webpack_require__("./app/models/styleConfig.model.ts");
var action_model_1 = __webpack_require__("./app/models/action.model.ts");
var reorder_model_1 = __webpack_require__("./app/models/reorder.model.ts");
var row_action_model_1 = __webpack_require__("./app/models/row-action.model.ts");
var FsListModel = (function (_super) {
    __extends(FsListModel, _super);
    function FsListModel(config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this) || this;
        _this.filters = [];
        _this.menuActions = [];
        _this.kebabActions = [];
        _this.columns = [];
        _this.paging = new pagination_model_1.Pagination();
        _this.sorting = new sorting_model_1.Sorting(_this.columns);
        _this.filterService = new filter_1.FsFilter();
        _this.data$ = new BehaviorSubject_1.BehaviorSubject([]);
        _this.status = true;
        _this.filterInput = true;
        _this.reoderEnabled = false;
        _this.loading = false;
        _this.hasFooter = false;
        _this.initialFetch = true;
        _this._fromJSON(config);
        if (config.initialFetch === false) {
            _this.initialFetch = false;
        }
        if (config.status === false) {
            _this.status = false;
        }
        if (config.filterInput === false) {
            _this.filterInput = false;
        }
        if (!config.actions) {
            _this.actions = [];
        }
        _this._headerConfig = new styleConfig_model_1.StyleConfig(config.header);
        _this._cellConfig = new styleConfig_model_1.StyleConfig(config.cell);
        _this._footerConfig = new styleConfig_model_1.StyleConfig(config.footer);
        if (_this.reoder) {
            var action = new action_model_1.Action({
                label: _this.reoder.label || 'Reorder',
                menu: _this.reoder.menu,
                click: function () {
                    _this.reoderEnabled = true;
                    // Fire callback that reorder was started
                    if (_this.reoder.start) {
                        _this.reoder.start();
                    }
                }
            });
            _this.actions.push(action);
        }
        _this.menuActions = _this.actions.filter(function (action) { return !action.menu; });
        _this.kebabActions = _this.actions.filter(function (action) { return action.menu; });
        _this.hasRowActions = _this.rowActions && _this.rowActions.length > 0;
        _this.watchFilters();
        _this.initPaging(config);
        _this.subscribe();
        return _this;
    }
    Object.defineProperty(FsListModel.prototype, "rows", {
        set: function (value) {
            this._rows = value;
        },
        enumerable: true,
        configurable: true
    });
    FsListModel.create = function (config) {
        return new FsListModel(config);
    };
    FsListModel.prototype.load = function () {
        this.loading = true;
        var query = Object.assign({}, this.filtersQuery, this.paging.query);
        if (this.sorting.sortingColumn) {
            Object.assign(query, { order: this.sorting.sortingColumn.name + "," + this.sorting.sortingColumn.direction });
        }
        if (this.fetchFn) {
            this.loadRemote(query);
        }
        else if (Array.isArray(this._rows)) {
            this.loadLocal();
        }
    };
    FsListModel.prototype.loadRemote = function (query) {
        var _this = this;
        var result = this.fetchFn(query);
        if (result instanceof Promise) {
            result.then(function (response) {
                if (response.paging) {
                    _this.paging.updatePaging(response.paging);
                }
                _this.loading = false;
                _this.data$.next(response.data);
            });
        }
        else if (result instanceof Observable_1.Observable) {
            result.subscribe(function (response) {
                if (response.paging) {
                    _this.paging.updatePaging(response.paging);
                }
                _this.loading = false;
                _this.data$.next(response.data);
            });
        }
    };
    FsListModel.prototype.loadLocal = function () {
        this.paging.updatePagingManual(this._rows);
        var from = (this.paging.page - 1) * this.paging.limit;
        var to = (this.paging.page === 1) ? this.paging.limit : this.paging.limit * this.paging.page;
        var sliceOfRows = this._rows.slice(from, to);
        this.data$.next(sliceOfRows);
        this.loading = false;
    };
    /**
     * Transform templates for using
     * @param templates
     */
    FsListModel.prototype.tranformTemplatesToColumns = function (templates) {
        var _this = this;
        var defaultConfigs = {
            header: this._headerConfig,
            cell: this._cellConfig,
            footer: this._footerConfig,
        };
        templates.forEach(function (column) {
            var col = new column_model_1.Column(column, defaultConfigs);
            if (col.sortable) {
                _this.sorting.addSortableColumn(col);
            } // add column to sortable
            if (col.footerTemplate) {
                _this.hasFooter = true;
            }
            _this.columns.push(col);
        });
        this.updateColspans('headerConfigs', 'headerColspanned');
        this.updateColspans('cellConfigs', 'cellColspanned');
        this.updateColspans('footerConfigs', 'footerColspanned');
    };
    /**
     * Init paging
     * @param config
     */
    FsListModel.prototype.initPaging = function (config) {
        if (config.paging) {
            this.paging.manual = config.paging.manual;
            if (config.paging.limits) {
                this.paging.limits = config.paging.limits;
            }
        }
        else if (config.paging === false) {
            this.paging.enabled = false;
        }
    };
    /**
     * Watch page changes
     */
    FsListModel.prototype.subscribe = function () {
        var _this = this;
        this.paging.pageChanged.subscribe(function () {
            _this.load();
        });
        this.sorting.sortingChanged.subscribe(function () {
            _this.load();
        });
    };
    /**
     * Update and watch filter changes
     */
    FsListModel.prototype.watchFilters = function () {
        var _this = this;
        if (this.filters && this.filters.length) {
            this.filterService.fsConfig = {
                persist: this.persist,
                items: this.filters,
                inline: this.inlineFilters,
                init: function (instance) {
                    _this.filtersQuery = instance.gets({ flatten: true });
                    if (_this.initialFetch) {
                        _this.load();
                    }
                },
                change: function (query, instance) {
                    _this.filtersQuery = instance.gets({ flatten: true });
                    _this.load();
                }
            };
        }
        else {
            this.filtersQuery = {};
        }
    };
    FsListModel.prototype.updateColspans = function (config, updateFlag) {
        var _this = this;
        this.columns.forEach(function (col, index) {
            if (col[config].colspan !== void 0) {
                var spanTo = index + +col[config].colspan;
                if (!_isNumber(spanTo)) {
                    return;
                }
                _this.columns[index][updateFlag] = false;
                for (var i = index + 1; i < spanTo; i++) {
                    if (_this.columns[i]) {
                        _this.columns[i][updateFlag] = true;
                    }
                }
            }
        });
    };
    __decorate([
        tsmodels_1.Alias(),
        __metadata("design:type", String)
    ], FsListModel.prototype, "heading", void 0);
    __decorate([
        tsmodels_1.Alias(),
        __metadata("design:type", String)
    ], FsListModel.prototype, "subheading", void 0);
    __decorate([
        tsmodels_1.Alias(),
        __metadata("design:type", Object)
    ], FsListModel.prototype, "inlineFilters", void 0);
    __decorate([
        tsmodels_1.Alias('actions', action_model_1.Action),
        __metadata("design:type", Array)
    ], FsListModel.prototype, "actions", void 0);
    __decorate([
        tsmodels_1.Alias('rowActions', row_action_model_1.RowAction),
        __metadata("design:type", Array)
    ], FsListModel.prototype, "rowActions", void 0);
    __decorate([
        tsmodels_1.Alias(),
        __metadata("design:type", Object)
    ], FsListModel.prototype, "rowEvents", void 0);
    __decorate([
        tsmodels_1.Alias(),
        __metadata("design:type", Object)
    ], FsListModel.prototype, "columnTemplates", void 0);
    __decorate([
        tsmodels_1.Alias(),
        __metadata("design:type", Object)
    ], FsListModel.prototype, "filters", void 0);
    __decorate([
        tsmodels_1.Alias('reorder', reorder_model_1.ReorderModel),
        __metadata("design:type", Object)
    ], FsListModel.prototype, "reoder", void 0);
    __decorate([
        tsmodels_1.Alias('fetch'),
        __metadata("design:type", Object)
    ], FsListModel.prototype, "fetchFn", void 0);
    __decorate([
        tsmodels_1.Alias('rows'),
        __metadata("design:type", Object)
    ], FsListModel.prototype, "_rows", void 0);
    return FsListModel;
}(tsmodels_1.Model));
exports.FsListModel = FsListModel;


/***/ }),

/***/ "./app/models/pagination.model.ts":
/***/ (function(module, exports, __webpack_require__) {

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
var tsmodels_1 = __webpack_require__("tsmodels");
var Subject_1 = __webpack_require__("rxjs/Subject");
var Pagination = (function (_super) {
    __extends(Pagination, _super);
    function Pagination(config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this) || this;
        _this.limit = 5;
        _this.pages = 0; // Total pages
        _this.manual = false;
        _this.page = 1; // Active page
        _this.pageChanged = new Subject_1.Subject();
        _this.pagesArray = [];
        _this.displayed = 0;
        _this._enabled = true;
        _this._limits = [10, 25, 50, 100, 200];
        _this.updatePaging(config);
        return _this;
    }
    Object.defineProperty(Pagination.prototype, "enabled", {
        /**
         * Get enabled
         * @returns {boolean}
         */
        get: function () {
            return this._enabled;
        },
        /**
         * Set enabled and update pages array
         * @param value
         */
        set: function (value) {
            this._enabled = value;
            this.updatePagesArray();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pagination.prototype, "limits", {
        /**
         * Get Limits
         * @returns {number[]}
         */
        get: function () {
            return this._limits;
        },
        /**
         * Set limits, update pages array and set new limit per page
         * @param value
         */
        set: function (value) {
            this._limits = value;
            this.updatePagesArray();
            if (this.limits.length > 0 && this.limits.indexOf(this.limit) === -1) {
                this.limit = this.limits[0];
            }
            else if (this.limits.length === 0) {
                this.limit = this.records;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pagination.prototype, "query", {
        /**
         * Get query for request
         * @returns {{page: number; limit: number}}
         */
        get: function () {
            return {
                page: this.page || 1,
                limit: this.limit || 10,
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pagination.prototype, "hasPrevPage", {
        /**
         * If prev page can be activated
         * @returns {boolean}
         */
        get: function () {
            return this.page > 1 && this.pages > 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pagination.prototype, "hasNextPage", {
        /**
         * If next page can be activated
         * @returns {boolean}
         */
        get: function () {
            return this.page < this.pages && this.pages > 1;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Update paging config and all related fields
     * @param config
     */
    Pagination.prototype.updatePaging = function (config) {
        this._fromJSON(config);
        this.updatePagesArray();
        this.updateDisplayed();
    };
    /**
     * Update paging when data source not remove
     * @param {any[]} rows
     */
    Pagination.prototype.updatePagingManual = function (rows) {
        if (Array.isArray(rows) && rows.length > 0) {
            this.records = rows.length;
            this.pages = Math.ceil(rows.length / this.limit);
        }
        this.updatePagesArray();
        this.updateDisplayed();
    };
    /**
     * Update pages array with new pages count
     */
    Pagination.prototype.updatePagesArray = function () {
        var MIDDLE = 3;
        var pagesArr = [];
        var from = 0;
        var to = 0;
        if (this.page < MIDDLE) {
            from = MIDDLE - 2;
            to = MIDDLE + 2;
        }
        else if (this.page >= MIDDLE && this.page <= this.pages - MIDDLE + 1) {
            from = this.page - 2;
            to = this.page + 2;
        }
        else if (this.page > this.pages - MIDDLE + 1) {
            from = this.pages - MIDDLE - 1;
            to = this.pages;
        }
        if (!this.pages || this.pages < 5) {
            to = this.pages || 0;
        }
        for (var i = from; i <= to; i++) {
            pagesArr.push(i);
        }
        this.pagesArray = Object.assign([], pagesArr);
    };
    /**
     * Update dispayed records counter
     */
    Pagination.prototype.updateDisplayed = function () {
        if (this.records > this.limit) {
            this.displayed = this.limit;
        }
        else {
            this.displayed = this.records;
        }
    };
    /**
     * Set new limit
     * @param limit
     */
    Pagination.prototype.setLimit = function (limit) {
        this.limit = limit;
        this.resetPaging();
        this.pageChanged.next();
    };
    /**
     * If page is activate page
     * @param page
     * @returns {boolean}
     */
    Pagination.prototype.isActive = function (page) {
        return page === this.page;
    };
    /**
     * Go to page
     * @param page
     */
    Pagination.prototype.goToPage = function (page) {
        if (page >= 1 && page <= this.pages && this.page !== page) {
            this.page = page;
            this.pageChanged.next(page);
        }
    };
    Pagination.prototype.resetPaging = function () {
        this.page = 1;
    };
    /**
     * Go to next page
     */
    Pagination.prototype.goNext = function () {
        if (this.page < this.pages) {
            this.page++;
            this.pageChanged.next(this.page);
        }
    };
    /**
     * Go to first page
     */
    Pagination.prototype.goFirst = function () {
        if (this.page > 1) {
            this.page = 1;
            this.pageChanged.next(this.page);
        }
    };
    /**
     * Go to prev page
     */
    Pagination.prototype.goPrev = function () {
        if (this.page > 1) {
            this.page--;
            this.pageChanged.next(this.page);
        }
    };
    /**
     * Go to last page
     */
    Pagination.prototype.goLast = function () {
        if (this.page < this.pages) {
            this.page = this.pages;
            this.pageChanged.next(this.page);
        }
    };
    __decorate([
        tsmodels_1.Alias(),
        __metadata("design:type", Object)
    ], Pagination.prototype, "limit", void 0);
    __decorate([
        tsmodels_1.Alias(),
        __metadata("design:type", Object)
    ], Pagination.prototype, "pages", void 0);
    __decorate([
        tsmodels_1.Alias(),
        __metadata("design:type", Number)
    ], Pagination.prototype, "records", void 0);
    __decorate([
        tsmodels_1.Alias(),
        __metadata("design:type", Object)
    ], Pagination.prototype, "manual", void 0);
    return Pagination;
}(tsmodels_1.Model));
exports.Pagination = Pagination;


/***/ }),

/***/ "./app/models/reorder.model.ts":
/***/ (function(module, exports, __webpack_require__) {

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
var tsmodels_1 = __webpack_require__("tsmodels");
var ReorderModel = (function (_super) {
    __extends(ReorderModel, _super);
    function ReorderModel(data) {
        if (data === void 0) { data = {}; }
        var _this = _super.call(this) || this;
        _this._fromJSON(data);
        return _this;
    }
    ReorderModel.prototype._fromJSON = function (data) {
        _super.prototype._fromJSON.call(this, data);
        if (data.menu === void 0) {
            this.menu = true;
        }
    };
    __decorate([
        tsmodels_1.Alias(),
        __metadata("design:type", Function)
    ], ReorderModel.prototype, "start", void 0);
    __decorate([
        tsmodels_1.Alias(),
        __metadata("design:type", Function)
    ], ReorderModel.prototype, "done", void 0);
    __decorate([
        tsmodels_1.Alias(),
        __metadata("design:type", String)
    ], ReorderModel.prototype, "label", void 0);
    __decorate([
        tsmodels_1.Alias(),
        __metadata("design:type", Boolean)
    ], ReorderModel.prototype, "menu", void 0);
    return ReorderModel;
}(tsmodels_1.Model));
exports.ReorderModel = ReorderModel;


/***/ }),

/***/ "./app/models/row-action.model.ts":
/***/ (function(module, exports, __webpack_require__) {

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
var tsmodels_1 = __webpack_require__("tsmodels");
var ActionType;
(function (ActionType) {
    ActionType["basic"] = "basic";
    ActionType["raised"] = "raised";
    ActionType["icon"] = "icon";
    ActionType["fab"] = "fab";
    ActionType["miniFab"] = "mini-fab";
})(ActionType = exports.ActionType || (exports.ActionType = {}));
var RowAction = (function (_super) {
    __extends(RowAction, _super);
    function RowAction(config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this) || this;
        _this.classArray = [];
        _this.isShown = true;
        _this._fromJSON(config);
        return _this;
    }
    RowAction.prototype._fromJSON = function (value) {
        _super.prototype._fromJSON.call(this, value);
        if (value.type === void 0) {
            this.type = ActionType.basic;
        }
        if (value.click === void 0) {
            this.click = function () { return true; };
        }
        if (this.className) {
            this.classArray = this.className.split(' ').reduce(function (acc, elem) {
                acc.push(elem);
                return acc;
            }, []);
        }
    };
    RowAction.prototype.checkShowStatus = function (row) {
        if (this.show) {
            this.isShown = this.show(row);
        }
    };
    __decorate([
        tsmodels_1.Alias(),
        __metadata("design:type", String)
    ], RowAction.prototype, "icon", void 0);
    __decorate([
        tsmodels_1.Alias(),
        __metadata("design:type", String)
    ], RowAction.prototype, "label", void 0);
    __decorate([
        tsmodels_1.Alias(),
        __metadata("design:type", Boolean)
    ], RowAction.prototype, "menu", void 0);
    __decorate([
        tsmodels_1.Alias(),
        __metadata("design:type", Function)
    ], RowAction.prototype, "click", void 0);
    __decorate([
        tsmodels_1.Alias(),
        __metadata("design:type", String)
    ], RowAction.prototype, "className", void 0);
    __decorate([
        tsmodels_1.Alias(),
        __metadata("design:type", String)
    ], RowAction.prototype, "type", void 0);
    __decorate([
        tsmodels_1.Alias(),
        __metadata("design:type", Function)
    ], RowAction.prototype, "show", void 0);
    return RowAction;
}(tsmodels_1.Model));
exports.RowAction = RowAction;


/***/ }),

/***/ "./app/models/sorting.model.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var column_model_1 = __webpack_require__("./app/models/column.model.ts");
var Subject_1 = __webpack_require__("rxjs/Subject");
var Sorting = (function () {
    function Sorting(columns) {
        this.sortingColumns = [];
        this.sortingChanged = new Subject_1.Subject();
        this.tableColumns = columns;
    }
    Sorting.prototype.addSortableColumn = function (column) {
        this.sortingColumns.push(column);
    };
    /**
     * Set Sortable Direction
     * @param direction
     */
    Sorting.prototype.setSortDirection = function (direction) {
        if (this.sortingColumn && this.sortingColumn.sortingDirection !== direction) {
            this.sortingColumn.sortingDirection = direction;
            this.sortingChanged.next();
        }
    };
    /**
     * Sort By
     * @param column
     * @param doubleSelectBehaviour - when user click twice on same param
     */
    Sorting.prototype.sortBy = function (column, doubleSelectBehaviour) {
        if (doubleSelectBehaviour === void 0) { doubleSelectBehaviour = true; }
        // Can't do sort by non sortable column
        if (!column.sortable) {
            return false;
        }
        // If column was ordered and sort direction was desc then cancel sorting
        if (column.ordered && (column.sortingDirection === column_model_1.SortingDirection.desc && doubleSelectBehaviour)) {
            this.sortingColumn = void 0;
            column.ordered = false;
            this.sortingChanged.next();
            return true;
        }
        // Column was ordered before
        if (column.ordered) {
            if (doubleSelectBehaviour) {
                column.changeDirection();
            }
            else {
                return true;
            }
        }
        else {
            this.tableColumns
                .filter(function (col) { return col.ordered; })
                .map(function (col) { return col.ordered = false; });
            column.ordered = true;
        }
        this.sortingColumn = column;
        this.sortingChanged.next();
    };
    return Sorting;
}());
exports.Sorting = Sorting;


/***/ }),

/***/ "./app/models/styleConfig.model.ts":
/***/ (function(module, exports, __webpack_require__) {

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
var tsmodels_1 = __webpack_require__("tsmodels");
var _isString = __webpack_require__("lodash/isString");
var StyleConfig = (function (_super) {
    __extends(StyleConfig, _super);
    function StyleConfig(config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this) || this;
        _this.className = []; // Can't be used in tempaltes!
        _this.classesArray = []; // Can be used in tempaltes
        _this._fromJSON(config);
        return _this;
    }
    /**
     * Create static array of styles for using in templates
     */
    StyleConfig.prototype.updateClasesArray = function () {
        this.classesArray = [].concat(this.className, this.align);
    };
    /**
     * Prioritized merge for align options
     * @param {StyleConfig} prior1
     * @param {StyleConfig} prior2
     */
    StyleConfig.prototype.mergeAlignByPriority = function (prior1, prior2) {
        var targetValue = this.align;
        if (targetValue === void 0) {
            if (prior1.align !== void 0) {
                targetValue = prior1.align;
            }
            else if (prior2.align !== void 0) {
                targetValue = prior2.align;
            }
            else {
                targetValue = 'left';
            }
        }
        this.align = targetValue;
    };
    /**
     * Prioritized merge for class options
     * @param {StyleConfig} prior1
     * @param {StyleConfig} prior2
     */
    StyleConfig.prototype.mergeClassByPriority = function (prior1, prior2) {
        var targetValue = [];
        if (Array.isArray(this.className)) {
            targetValue = targetValue.concat(this.className);
        }
        else if (_isString(this.className)) {
            targetValue.push(this.className);
        }
        if (prior1.className !== void 0) {
            this.mergeAnythingIntoArray(targetValue, prior1.className);
        }
        else if (prior2.className !== void 0) {
            this.mergeAnythingIntoArray(targetValue, prior2.className);
        }
        this.className = targetValue;
    };
    /**
     * Merge params into array
     * @param {string[]} to
     * @param {string | string[]} from
     * @returns {string[]}
     */
    StyleConfig.prototype.mergeAnythingIntoArray = function (to, from) {
        if (_isString(from)) {
            to.push(from);
        }
        else if (Array.isArray(from)) {
            to.push.apply(to, from);
        }
    };
    __decorate([
        tsmodels_1.Alias(),
        __metadata("design:type", Object)
    ], StyleConfig.prototype, "colspan", void 0);
    __decorate([
        tsmodels_1.Alias(),
        __metadata("design:type", String)
    ], StyleConfig.prototype, "align", void 0);
    __decorate([
        tsmodels_1.Alias(),
        __metadata("design:type", Object)
    ], StyleConfig.prototype, "className", void 0);
    return StyleConfig;
}(tsmodels_1.Model));
exports.StyleConfig = StyleConfig;


/***/ }),

/***/ "./fslist.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("@angular/core");
var common_1 = __webpack_require__("@angular/common");
var material_1 = __webpack_require__("@angular/material");
var flex_layout_1 = __webpack_require__("@angular/flex-layout");
var filter_1 = __webpack_require__("@firestitch/filter");
var components_1 = __webpack_require__("./app/components/index.ts");
var directives_1 = __webpack_require__("./app/directives/index.ts");
__export(__webpack_require__("./app/components/list/list.component.ts"));
var FsListModule = (function () {
    function FsListModule() {
    }
    FsListModule_1 = FsListModule;
    FsListModule.forRoot = function () {
        return {
            ngModule: FsListModule_1,
            providers: [
                components_1.FsListComponent
            ]
        };
    };
    FsListModule = FsListModule_1 = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                material_1.MatButtonModule,
                material_1.MatIconModule,
                material_1.MatMenuModule,
                filter_1.FsFilterModule,
                flex_layout_1.FlexLayoutModule
            ],
            declarations: [
                // Components
                components_1.FsListComponent,
                components_1.FsRowComponent,
                components_1.FsCellComponent,
                components_1.FsFooterRowComponent,
                components_1.FsFooterCellComponent,
                // Internal Components
                components_1.FsStatusComponent,
                components_1.FsHeadComponent,
                components_1.FsHeadCellComponent,
                components_1.FsBodyComponent,
                components_1.FsFooterComponent,
                components_1.FsPaginationComponent,
                // Directives
                directives_1.FsListColumnDirective,
                directives_1.FsListCellDirective,
                directives_1.FsListHeaderDirective,
                directives_1.FsListFooterDirective,
            ],
            providers: [],
            exports: [
                components_1.FsListComponent,
                components_1.FsRowComponent,
                components_1.FsCellComponent,
                directives_1.FsListColumnDirective,
                directives_1.FsListCellDirective,
                directives_1.FsListHeaderDirective,
                directives_1.FsListFooterDirective,
            ]
        })
    ], FsListModule);
    return FsListModule;
    var FsListModule_1;
}());
exports.FsListModule = FsListModule;


/***/ }),

/***/ "./index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("./fslist.module.ts"));
__export(__webpack_require__("./app/index.ts"));


/***/ }),

/***/ "@angular/common":
/***/ (function(module, exports) {

module.exports = require("@angular/common");

/***/ }),

/***/ "@angular/core":
/***/ (function(module, exports) {

module.exports = require("@angular/core");

/***/ }),

/***/ "@angular/flex-layout":
/***/ (function(module, exports) {

module.exports = require("@angular/flex-layout");

/***/ }),

/***/ "@angular/material":
/***/ (function(module, exports) {

module.exports = require("@angular/material");

/***/ }),

/***/ "@firestitch/filter":
/***/ (function(module, exports) {

module.exports = require("@firestitch/filter");

/***/ }),

/***/ "lodash/isBoolean":
/***/ (function(module, exports) {

module.exports = require("lodash/isBoolean");

/***/ }),

/***/ "lodash/isNumber":
/***/ (function(module, exports) {

module.exports = require("lodash/isNumber");

/***/ }),

/***/ "lodash/isObject":
/***/ (function(module, exports) {

module.exports = require("lodash/isObject");

/***/ }),

/***/ "lodash/isString":
/***/ (function(module, exports) {

module.exports = require("lodash/isString");

/***/ }),

/***/ "rxjs/BehaviorSubject":
/***/ (function(module, exports) {

module.exports = require("rxjs/BehaviorSubject");

/***/ }),

/***/ "rxjs/Observable":
/***/ (function(module, exports) {

module.exports = require("rxjs/Observable");

/***/ }),

/***/ "rxjs/Subject":
/***/ (function(module, exports) {

module.exports = require("rxjs/Subject");

/***/ }),

/***/ "tsmodels":
/***/ (function(module, exports) {

module.exports = require("tsmodels");

/***/ })

/******/ });
});
//# sourceMappingURL=index.map