webpackJsonp([2],{

/***/ "../node_modules/css-loader/index.js?{\"sourceMap\":true}!../node_modules/postcss-loader/lib/index.js?{\"sourceMap\":true}!../node_modules/resolve-url-loader/index.js?{\"sourceMap\":true,\"absolute\":false,\"fail\":false,\"silent\":false,\"keepQuery\":false,\"attempts\":0,\"debug\":false,\"root\":null,\"includeRoot\":false}!../node_modules/sass-loader/lib/loader.js?{\"sourceMap\":true}!../src/app/components/pagination/pagination.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ".paging .pages {\n  text-align: center;\n  padding: 0;\n  margin: 0;\n}\n\n.paging .pages li {\n  display: inline-block;\n}\n\n.paging .pages li a {\n  display: inline-block;\n  padding: 16px;\n  text-align: center;\n  color: #333;\n  text-decoration: none;\n  font-size: 15px;\n  cursor: pointer;\n}\n\n.paging .pages li:not(.page) a {\n  font-size: 19px;\n}\n\n.paging .pages li.disabled a {\n  pointer-events: none;\n  cursor: default;\n  color: #ccc;\n}\n\n.paging .pages li.active a {\n  font-weight: bold;\n}\n\n.paging .records div {\n  margin-top: 10px;\n}\n\n", "", {"version":3,"sources":["C:/Projects/fs-list/src/app/components/pagination/C:/Projects/fs-list/src/app/components/pagination/src/app/components/pagination/pagination.component.scss","C:/Projects/fs-list/src/app/components/pagination/C:/Projects/fs-list/pagination.component.scss"],"names":[],"mappings":"AAEE;EACE,mBAAA;EACA,WAAA;EACA,UAAA;CCDH;;ADJD;EAQM,sBAAA;CCAL;;ADRD;EAWQ,sBAAA;EACA,cAAA;EACA,mBAAA;EACA,YAAA;EACA,sBAAA;EACA,gBAAA;EACA,gBAAA;CCCP;;ADEkB;EACX,gBAAA;CCCP;;ADEgB;EACT,qBAAA;EACA,gBAAA;EACA,YAAA;CCCP;;AD5BD;EA+BQ,kBAAA;CCCP;;ADhCD;EAsCM,iBAAA;CCFL","file":"pagination.component.scss","sourcesContent":[".paging {\r\n\r\n  .pages {\r\n    text-align: center;\r\n    padding: 0;\r\n    margin: 0;\r\n\r\n    li {\r\n      display: inline-block;\r\n\r\n      a {\r\n        display: inline-block;\r\n        padding: 16px;\r\n        text-align: center;\r\n        color: #333;\r\n        text-decoration: none;\r\n        font-size: 15px;\r\n        cursor: pointer;\r\n      }\r\n\r\n      &:not(.page) a {\r\n        font-size: 19px;\r\n      }\r\n\r\n      &.disabled a {\r\n        pointer-events: none;\r\n        cursor: default;\r\n        color: #ccc;\r\n      }\r\n\r\n      &.active a {\r\n        font-weight: bold;\r\n      }\r\n    }\r\n  }\r\n\r\n  .records {\r\n    div {\r\n      margin-top: 10px;\r\n    }\r\n  }\r\n\r\n  .limits {\r\n\r\n  }\r\n}\r\n",".paging .pages {\n  text-align: center;\n  padding: 0;\n  margin: 0;\n}\n\n.paging .pages li {\n  display: inline-block;\n}\n\n.paging .pages li a {\n  display: inline-block;\n  padding: 16px;\n  text-align: center;\n  color: #333;\n  text-decoration: none;\n  font-size: 15px;\n  cursor: pointer;\n}\n\n.paging .pages li:not(.page) a {\n  font-size: 19px;\n}\n\n.paging .pages li.disabled a {\n  pointer-events: none;\n  cursor: default;\n  color: #ccc;\n}\n\n.paging .pages li.active a {\n  font-weight: bold;\n}\n\n.paging .records div {\n  margin-top: 10px;\n}\n\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ "../node_modules/css-loader/index.js?{\"sourceMap\":true}!../node_modules/postcss-loader/lib/index.js?{\"sourceMap\":true}!../node_modules/resolve-url-loader/index.js?{\"sourceMap\":true,\"absolute\":false,\"fail\":false,\"silent\":false,\"keepQuery\":false,\"attempts\":0,\"debug\":false,\"root\":null,\"includeRoot\":false}!../node_modules/sass-loader/lib/loader.js?{\"sourceMap\":true}!../src/app/components/status/status.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ".infinite-records {\n  color: #999;\n  font-size: 13px;\n  margin-left: 4px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  display: block;\n}\n\n.infinite-records a {\n  color: #546E7A;\n}\n\n.infinite-records .order-toggle {\n  cursor: pointer;\n  padding-left: 4px;\n}\n\n.infinite-records .saved-filters {\n  float: right;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n\n", "", {"version":3,"sources":["C:/Projects/fs-list/src/app/components/status/C:/Projects/fs-list/src/app/components/status/src/app/components/status/status.component.scss","C:/Projects/fs-list/src/app/components/status/C:/Projects/fs-list/status.component.scss"],"names":[],"mappings":"AAAA;EACE,YAAA;EACA,gBAAA;EACA,iBAAA;EACA,oBAAA;EACA,iBAAA;EACA,wBAAA;EACA,eAAA;CCCD;;ADRD;EAUG,eAAA;CCEF;;ADCC;EACE,gBAAA;EACA,kBAAA;CCEH;;ADjBD;EAmBI,aAAA;EACA,qBAAA;EAAA,qBAAA;EAAA,cAAA;CCEH","file":"status.component.scss","sourcesContent":[".infinite-records {\r\n  color: #999;\r\n  font-size: 13px;\r\n  margin-left: 4px;\r\n  white-space: nowrap;\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\r\n  display: block;\r\n\r\n  a {\r\n   color: #546E7A;\r\n  }\r\n\r\n  .order-toggle {\r\n    cursor: pointer;\r\n    padding-left: 4px;\r\n  }\r\n\r\n  .saved-filters {\r\n    float: right;\r\n    display: flex;\r\n  }\r\n}\r\n",".infinite-records {\n  color: #999;\n  font-size: 13px;\n  margin-left: 4px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  display: block;\n}\n\n.infinite-records a {\n  color: #546E7A;\n}\n\n.infinite-records .order-toggle {\n  cursor: pointer;\n  padding-left: 4px;\n}\n\n.infinite-records .saved-filters {\n  float: right;\n  display: flex;\n}\n\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ "../node_modules/css-loader/index.js?{\"sourceMap\":true}!../node_modules/postcss-loader/lib/index.js?{\"sourceMap\":true}!../node_modules/resolve-url-loader/index.js?{\"sourceMap\":true}!../node_modules/sass-loader/lib/loader.js?{\"sourceMap\":true}!../src/app/components/list/list.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ":host {\n  width: 100%;\n  display: block;\n}\n\n.fs-list-table {\n  display: table;\n  width: 100%;\n  border-collapse: collapse;\n}\n\n:host ::ng-deep .fs-filter {\n  margin-bottom: 0;\n}\n\n:host ::ng-deep .fs-filter .main-filter-bar {\n  overflow: hidden;\n}\n\n:host ::ng-deep .fs-list-body {\n  display: table-row-group;\n  position: relative;\n}\n\n:host ::ng-deep .fs-list-body.loading {\n  opacity: 0.4;\n}\n\n:host ::ng-deep .fs-list-body .fs-list-row:hover .fs-list-col {\n  background-color: #f6f6f6;\n}\n\n:host ::ng-deep .fs-list-body .fs-list-row:last-child .fs-list-col {\n  border-bottom: 2px solid #ddd;\n}\n\n:host ::ng-deep .fs-list-head .fs-list-row,\n:host ::ng-deep .fs-list-body .fs-list-row {\n  display: table-row;\n}\n\n:host ::ng-deep .fs-list-head .fs-list-row:nth-child(1) .fs-list-col,\n:host ::ng-deep .fs-list-body .fs-list-row:nth-child(1) .fs-list-col {\n  border-top: 0;\n}\n\n:host ::ng-deep .fs-list-head .fs-list-row:last-child .fs-list-col,\n:host ::ng-deep .fs-list-body .fs-list-row:last-child .fs-list-col {\n  border-bottom: 2px solid #ddd;\n}\n\n:host ::ng-deep .fs-list-head .fs-list-row .fs-list-col,\n:host ::ng-deep .fs-list-body .fs-list-row .fs-list-col {\n  display: table-cell;\n  border-top: 1px solid #ddd;\n  padding: 8px;\n  vertical-align: middle;\n  outline: none;\n}\n\n:host ::ng-deep .fs-list-head .fs-list-row .fs-list-col.left,\n:host ::ng-deep .fs-list-body .fs-list-row .fs-list-col.left {\n  text-align: left;\n}\n\n:host ::ng-deep .fs-list-head .fs-list-row .fs-list-col.center,\n:host ::ng-deep .fs-list-body .fs-list-row .fs-list-col.center {\n  text-align: center;\n}\n\n:host ::ng-deep .fs-list-head .fs-list-row .fs-list-col.right,\n:host ::ng-deep .fs-list-body .fs-list-row .fs-list-col.right {\n  text-align: right;\n}\n\n:host ::ng-deep .fs-list-filters .fs-list-actions {\n  margin-left: 10px;\n  float: right;\n}\n\n:host ::ng-deep .fs-list-filters .fs-list-actions .action-button mat-icon {\n  margin-right: 5px;\n}\n\n:host ::ng-deep .fs-list-filters .fs-list-actions .mat-button {\n  margin-top: 0;\n  margin-bottom: 0;\n  margin-right: 0;\n}\n\n:host ::ng-deep .fs-list-head {\n  display: table-header-group;\n}\n\n:host ::ng-deep .fs-list-head .fs-list-col {\n  border-bottom: 2px solid #ddd;\n  color: #999;\n  font-size: 14px;\n  padding: 8px;\n  font-weight: normal;\n  font-size: 13px;\n  color: #8f8f8f;\n}\n\n:host ::ng-deep .fs-list-head .fs-list-col.sorting {\n  cursor: pointer;\n}\n\n:host ::ng-deep .fs-list-head .fs-list-col.sorting:hover {\n  background-color: #F6F6F6;\n}\n\n:host ::ng-deep .fs-list-head .fs-list-col .wrap {\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  vertical-align: middle;\n  white-space: nowrap;\n}\n\n:host ::ng-deep .fs-list-head .fs-list-col .wrap mat-icon {\n  font-size: 14px;\n  display: block;\n  height: 14px;\n  width: 14px;\n}\n\n:host ::ng-deep .fs-list-head .fs-list-col.sorting {\n  background-image: none;\n}\n\n:host ::ng-deep fs-list-status {\n  font-size: 13px;\n  color: #3a3a3a;\n  padding-bottom: 10px;\n  display: block;\n}\n\n:host ::ng-deep tfoot td {\n  padding: 8px;\n}\n\n", "", {"version":3,"sources":["C:/Projects/fs-list/src/app/components/list/C:/Projects/fs-list/src/app/components/list/src/app/components/list/list.component.scss","C:/Projects/fs-list/src/app/components/list/C:/Projects/fs-list/list.component.scss"],"names":[],"mappings":"AAAA;EACE,YAAA;EACA,eAAA;CCCD;;ADED;EACE,eAAA;EACA,YAAA;EACA,0BAAA;CCCD;;ADED;EAGI,iBAAA;CCDH;;ADGG;EACE,iBAAA;CCAL;;ADIC;EACE,yBAAA;EACA,mBAAA;CCDH;;ADXD;EAeM,aAAA;CCAL;;ADGsB;EACjB,0BAAA;CCAL;;ADnBD;EAuBM,8BAAA;CCAL;;ADvBD;;EA6BM,mBAAA;CCDL;;AD5BD;;EAgCQ,cAAA;CCCP;;ADCkB;;EACX,8BAAA;CCGP;;ADAK;;EAcE,oBAAA;EAEA,2BAAA;EACA,aAAA;EACA,uBAAA;EACA,cAAA;CCVP;;ADTK;;EAGI,iBAAA;CCWT;;ADdK;;EAOI,mBAAA;CCYT;;ADnBK;;EAWI,kBAAA;CCaT;;AD9DD;EAgEM,kBAAA;EACA,aAAA;CCEL;;ADAoB;EACb,kBAAA;CCGP;;ADAK;EACE,cAAA;EACA,iBAAA;EACA,gBAAA;CCGP;;ADEC;EACE,4BAAA;CCCH;;ADCG;EACE,8BAAA;EACA,YAAA;EACA,gBAAA;EACA,aAAA;EACA,oBAAA;EACA,gBAAA;EACA,eAAA;CCEL;;ADTG;EAWI,gBAAA;CCEP;;ADbG;EAaM,0BAAA;CCIT;;ADAK;EACE,4BAAA;EAAA,4BAAA;EAAA,qBAAA;EACA,uBAAA;EACA,oBAAA;CCGP;;ADDO;EACE,gBAAA;EACA,eAAA;EACA,aAAA;EACA,YAAA;CCIT;;ADhHD;EAiHQ,uBAAA;CCGP;;ADpHD;EAuHI,gBAAA;EACA,eAAA;EACA,qBAAA;EACA,eAAA;CCCH;;AD3HD;EA8HI,aAAA;CCCH","file":"list.component.scss","sourcesContent":[":host {\r\n  width: 100%;\r\n  display: block;\r\n}\r\n\r\n.fs-list-table {\r\n  display: table;\r\n  width: 100%;\r\n  border-collapse: collapse;\r\n}\r\n\r\n:host ::ng-deep {\r\n\r\n  .fs-filter {\r\n    margin-bottom: 0;\r\n\r\n    .main-filter-bar {\r\n      overflow: hidden;\r\n    }\r\n  }\r\n\r\n  .fs-list-body {\r\n    display: table-row-group;\r\n    position: relative;\r\n\r\n    &.loading {\r\n      opacity: 0.4;\r\n    }\r\n\r\n    .fs-list-row:hover .fs-list-col {\r\n      background-color: #f6f6f6;\r\n    }\r\n\r\n    .fs-list-row:last-child .fs-list-col {\r\n      border-bottom: 2px solid #ddd;\r\n    }\r\n  }\r\n\r\n  .fs-list-head, .fs-list-body {\r\n    .fs-list-row {\r\n      display: table-row;\r\n\r\n      &:nth-child(1) .fs-list-col {\r\n        border-top: 0;\r\n      }\r\n      &:last-child .fs-list-col {\r\n        border-bottom: 2px solid #ddd;\r\n      }\r\n\r\n      .fs-list-col {\r\n\r\n        &.left {\r\n          text-align: left;\r\n        }\r\n\r\n        &.center {\r\n          text-align: center;\r\n        }\r\n\r\n        &.right {\r\n          text-align: right;\r\n        }\r\n\r\n        display: table-cell;\r\n\r\n        border-top: 1px solid #ddd;\r\n        padding: 8px;\r\n        vertical-align: middle;\r\n        outline: none;\r\n      }\r\n    }\r\n  }\r\n\r\n  .fs-list-filters {\r\n    .fs-list-actions {\r\n      margin-left: 10px;\r\n      float: right;\r\n\r\n      .action-button mat-icon {\r\n        margin-right: 5px;\r\n      }\r\n\r\n      .mat-button {\r\n        margin-top: 0;\r\n        margin-bottom: 0;\r\n        margin-right: 0;\r\n      }\r\n    }\r\n  }\r\n\r\n  .fs-list-head {\r\n    display: table-header-group;\r\n\r\n    .fs-list-col {\r\n      border-bottom: 2px solid #ddd;\r\n      color: #999;\r\n      font-size: 14px;\r\n      padding: 8px;\r\n      font-weight: normal;\r\n      font-size: 13px;\r\n      color: rgba(143, 143, 143, 1);\r\n\r\n      &.sorting {\r\n\r\n        cursor: pointer;\r\n        &:hover {\r\n          background-color: #F6F6F6;\r\n        }\r\n      }\r\n\r\n      .wrap {\r\n        display: inline-flex;\r\n        vertical-align: middle;\r\n        white-space: nowrap;\r\n\r\n        mat-icon {\r\n          font-size: 14px;\r\n          display: block;\r\n          height: 14px;\r\n          width: 14px;\r\n        }\r\n      }\r\n\r\n      &.sorting {\r\n        background-image: none;\r\n      }\r\n    }\r\n  }\r\n\r\n  fs-list-status {\r\n    font-size: 13px;\r\n    color: rgb(58, 58, 58);\r\n    padding-bottom: 10px;\r\n    display: block;\r\n  }\r\n\r\n  tfoot td {\r\n    padding: 8px;\r\n  }\r\n}\r\n\r\n\r\n\r\n//    .material-icons {\r\n//      font-family: 'Material Icons';\r\n//      font-weight: normal;\r\n//      font-style: normal;\r\n//      line-height: 1;\r\n//      letter-spacing: normal;\r\n//      text-transform: none;\r\n//      display: inline-block;\r\n//      white-space: nowrap;\r\n//      word-wrap: normal;\r\n//      direction: ltr;\r\n//      -webkit-font-feature-settings: 'liga';\r\n//      -webkit-font-smoothing: antialiased;\r\n//    }\r\n",":host {\n  width: 100%;\n  display: block;\n}\n\n.fs-list-table {\n  display: table;\n  width: 100%;\n  border-collapse: collapse;\n}\n\n:host ::ng-deep .fs-filter {\n  margin-bottom: 0;\n}\n\n:host ::ng-deep .fs-filter .main-filter-bar {\n  overflow: hidden;\n}\n\n:host ::ng-deep .fs-list-body {\n  display: table-row-group;\n  position: relative;\n}\n\n:host ::ng-deep .fs-list-body.loading {\n  opacity: 0.4;\n}\n\n:host ::ng-deep .fs-list-body .fs-list-row:hover .fs-list-col {\n  background-color: #f6f6f6;\n}\n\n:host ::ng-deep .fs-list-body .fs-list-row:last-child .fs-list-col {\n  border-bottom: 2px solid #ddd;\n}\n\n:host ::ng-deep .fs-list-head .fs-list-row,\n:host ::ng-deep .fs-list-body .fs-list-row {\n  display: table-row;\n}\n\n:host ::ng-deep .fs-list-head .fs-list-row:nth-child(1) .fs-list-col,\n:host ::ng-deep .fs-list-body .fs-list-row:nth-child(1) .fs-list-col {\n  border-top: 0;\n}\n\n:host ::ng-deep .fs-list-head .fs-list-row:last-child .fs-list-col,\n:host ::ng-deep .fs-list-body .fs-list-row:last-child .fs-list-col {\n  border-bottom: 2px solid #ddd;\n}\n\n:host ::ng-deep .fs-list-head .fs-list-row .fs-list-col,\n:host ::ng-deep .fs-list-body .fs-list-row .fs-list-col {\n  display: table-cell;\n  border-top: 1px solid #ddd;\n  padding: 8px;\n  vertical-align: middle;\n  outline: none;\n}\n\n:host ::ng-deep .fs-list-head .fs-list-row .fs-list-col.left,\n:host ::ng-deep .fs-list-body .fs-list-row .fs-list-col.left {\n  text-align: left;\n}\n\n:host ::ng-deep .fs-list-head .fs-list-row .fs-list-col.center,\n:host ::ng-deep .fs-list-body .fs-list-row .fs-list-col.center {\n  text-align: center;\n}\n\n:host ::ng-deep .fs-list-head .fs-list-row .fs-list-col.right,\n:host ::ng-deep .fs-list-body .fs-list-row .fs-list-col.right {\n  text-align: right;\n}\n\n:host ::ng-deep .fs-list-filters .fs-list-actions {\n  margin-left: 10px;\n  float: right;\n}\n\n:host ::ng-deep .fs-list-filters .fs-list-actions .action-button mat-icon {\n  margin-right: 5px;\n}\n\n:host ::ng-deep .fs-list-filters .fs-list-actions .mat-button {\n  margin-top: 0;\n  margin-bottom: 0;\n  margin-right: 0;\n}\n\n:host ::ng-deep .fs-list-head {\n  display: table-header-group;\n}\n\n:host ::ng-deep .fs-list-head .fs-list-col {\n  border-bottom: 2px solid #ddd;\n  color: #999;\n  font-size: 14px;\n  padding: 8px;\n  font-weight: normal;\n  font-size: 13px;\n  color: #8f8f8f;\n}\n\n:host ::ng-deep .fs-list-head .fs-list-col.sorting {\n  cursor: pointer;\n}\n\n:host ::ng-deep .fs-list-head .fs-list-col.sorting:hover {\n  background-color: #F6F6F6;\n}\n\n:host ::ng-deep .fs-list-head .fs-list-col .wrap {\n  display: inline-flex;\n  vertical-align: middle;\n  white-space: nowrap;\n}\n\n:host ::ng-deep .fs-list-head .fs-list-col .wrap mat-icon {\n  font-size: 14px;\n  display: block;\n  height: 14px;\n  width: 14px;\n}\n\n:host ::ng-deep .fs-list-head .fs-list-col.sorting {\n  background-image: none;\n}\n\n:host ::ng-deep fs-list-status {\n  font-size: 13px;\n  color: #3a3a3a;\n  padding-bottom: 10px;\n  display: block;\n}\n\n:host ::ng-deep tfoot td {\n  padding: 8px;\n}\n\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ "../node_modules/moment/locale recursive ^\\.\\/.*$":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "../node_modules/moment/locale/af.js",
	"./af.js": "../node_modules/moment/locale/af.js",
	"./ar": "../node_modules/moment/locale/ar.js",
	"./ar-dz": "../node_modules/moment/locale/ar-dz.js",
	"./ar-dz.js": "../node_modules/moment/locale/ar-dz.js",
	"./ar-kw": "../node_modules/moment/locale/ar-kw.js",
	"./ar-kw.js": "../node_modules/moment/locale/ar-kw.js",
	"./ar-ly": "../node_modules/moment/locale/ar-ly.js",
	"./ar-ly.js": "../node_modules/moment/locale/ar-ly.js",
	"./ar-ma": "../node_modules/moment/locale/ar-ma.js",
	"./ar-ma.js": "../node_modules/moment/locale/ar-ma.js",
	"./ar-sa": "../node_modules/moment/locale/ar-sa.js",
	"./ar-sa.js": "../node_modules/moment/locale/ar-sa.js",
	"./ar-tn": "../node_modules/moment/locale/ar-tn.js",
	"./ar-tn.js": "../node_modules/moment/locale/ar-tn.js",
	"./ar.js": "../node_modules/moment/locale/ar.js",
	"./az": "../node_modules/moment/locale/az.js",
	"./az.js": "../node_modules/moment/locale/az.js",
	"./be": "../node_modules/moment/locale/be.js",
	"./be.js": "../node_modules/moment/locale/be.js",
	"./bg": "../node_modules/moment/locale/bg.js",
	"./bg.js": "../node_modules/moment/locale/bg.js",
	"./bm": "../node_modules/moment/locale/bm.js",
	"./bm.js": "../node_modules/moment/locale/bm.js",
	"./bn": "../node_modules/moment/locale/bn.js",
	"./bn.js": "../node_modules/moment/locale/bn.js",
	"./bo": "../node_modules/moment/locale/bo.js",
	"./bo.js": "../node_modules/moment/locale/bo.js",
	"./br": "../node_modules/moment/locale/br.js",
	"./br.js": "../node_modules/moment/locale/br.js",
	"./bs": "../node_modules/moment/locale/bs.js",
	"./bs.js": "../node_modules/moment/locale/bs.js",
	"./ca": "../node_modules/moment/locale/ca.js",
	"./ca.js": "../node_modules/moment/locale/ca.js",
	"./cs": "../node_modules/moment/locale/cs.js",
	"./cs.js": "../node_modules/moment/locale/cs.js",
	"./cv": "../node_modules/moment/locale/cv.js",
	"./cv.js": "../node_modules/moment/locale/cv.js",
	"./cy": "../node_modules/moment/locale/cy.js",
	"./cy.js": "../node_modules/moment/locale/cy.js",
	"./da": "../node_modules/moment/locale/da.js",
	"./da.js": "../node_modules/moment/locale/da.js",
	"./de": "../node_modules/moment/locale/de.js",
	"./de-at": "../node_modules/moment/locale/de-at.js",
	"./de-at.js": "../node_modules/moment/locale/de-at.js",
	"./de-ch": "../node_modules/moment/locale/de-ch.js",
	"./de-ch.js": "../node_modules/moment/locale/de-ch.js",
	"./de.js": "../node_modules/moment/locale/de.js",
	"./dv": "../node_modules/moment/locale/dv.js",
	"./dv.js": "../node_modules/moment/locale/dv.js",
	"./el": "../node_modules/moment/locale/el.js",
	"./el.js": "../node_modules/moment/locale/el.js",
	"./en-au": "../node_modules/moment/locale/en-au.js",
	"./en-au.js": "../node_modules/moment/locale/en-au.js",
	"./en-ca": "../node_modules/moment/locale/en-ca.js",
	"./en-ca.js": "../node_modules/moment/locale/en-ca.js",
	"./en-gb": "../node_modules/moment/locale/en-gb.js",
	"./en-gb.js": "../node_modules/moment/locale/en-gb.js",
	"./en-ie": "../node_modules/moment/locale/en-ie.js",
	"./en-ie.js": "../node_modules/moment/locale/en-ie.js",
	"./en-nz": "../node_modules/moment/locale/en-nz.js",
	"./en-nz.js": "../node_modules/moment/locale/en-nz.js",
	"./eo": "../node_modules/moment/locale/eo.js",
	"./eo.js": "../node_modules/moment/locale/eo.js",
	"./es": "../node_modules/moment/locale/es.js",
	"./es-do": "../node_modules/moment/locale/es-do.js",
	"./es-do.js": "../node_modules/moment/locale/es-do.js",
	"./es-us": "../node_modules/moment/locale/es-us.js",
	"./es-us.js": "../node_modules/moment/locale/es-us.js",
	"./es.js": "../node_modules/moment/locale/es.js",
	"./et": "../node_modules/moment/locale/et.js",
	"./et.js": "../node_modules/moment/locale/et.js",
	"./eu": "../node_modules/moment/locale/eu.js",
	"./eu.js": "../node_modules/moment/locale/eu.js",
	"./fa": "../node_modules/moment/locale/fa.js",
	"./fa.js": "../node_modules/moment/locale/fa.js",
	"./fi": "../node_modules/moment/locale/fi.js",
	"./fi.js": "../node_modules/moment/locale/fi.js",
	"./fo": "../node_modules/moment/locale/fo.js",
	"./fo.js": "../node_modules/moment/locale/fo.js",
	"./fr": "../node_modules/moment/locale/fr.js",
	"./fr-ca": "../node_modules/moment/locale/fr-ca.js",
	"./fr-ca.js": "../node_modules/moment/locale/fr-ca.js",
	"./fr-ch": "../node_modules/moment/locale/fr-ch.js",
	"./fr-ch.js": "../node_modules/moment/locale/fr-ch.js",
	"./fr.js": "../node_modules/moment/locale/fr.js",
	"./fy": "../node_modules/moment/locale/fy.js",
	"./fy.js": "../node_modules/moment/locale/fy.js",
	"./gd": "../node_modules/moment/locale/gd.js",
	"./gd.js": "../node_modules/moment/locale/gd.js",
	"./gl": "../node_modules/moment/locale/gl.js",
	"./gl.js": "../node_modules/moment/locale/gl.js",
	"./gom-latn": "../node_modules/moment/locale/gom-latn.js",
	"./gom-latn.js": "../node_modules/moment/locale/gom-latn.js",
	"./gu": "../node_modules/moment/locale/gu.js",
	"./gu.js": "../node_modules/moment/locale/gu.js",
	"./he": "../node_modules/moment/locale/he.js",
	"./he.js": "../node_modules/moment/locale/he.js",
	"./hi": "../node_modules/moment/locale/hi.js",
	"./hi.js": "../node_modules/moment/locale/hi.js",
	"./hr": "../node_modules/moment/locale/hr.js",
	"./hr.js": "../node_modules/moment/locale/hr.js",
	"./hu": "../node_modules/moment/locale/hu.js",
	"./hu.js": "../node_modules/moment/locale/hu.js",
	"./hy-am": "../node_modules/moment/locale/hy-am.js",
	"./hy-am.js": "../node_modules/moment/locale/hy-am.js",
	"./id": "../node_modules/moment/locale/id.js",
	"./id.js": "../node_modules/moment/locale/id.js",
	"./is": "../node_modules/moment/locale/is.js",
	"./is.js": "../node_modules/moment/locale/is.js",
	"./it": "../node_modules/moment/locale/it.js",
	"./it.js": "../node_modules/moment/locale/it.js",
	"./ja": "../node_modules/moment/locale/ja.js",
	"./ja.js": "../node_modules/moment/locale/ja.js",
	"./jv": "../node_modules/moment/locale/jv.js",
	"./jv.js": "../node_modules/moment/locale/jv.js",
	"./ka": "../node_modules/moment/locale/ka.js",
	"./ka.js": "../node_modules/moment/locale/ka.js",
	"./kk": "../node_modules/moment/locale/kk.js",
	"./kk.js": "../node_modules/moment/locale/kk.js",
	"./km": "../node_modules/moment/locale/km.js",
	"./km.js": "../node_modules/moment/locale/km.js",
	"./kn": "../node_modules/moment/locale/kn.js",
	"./kn.js": "../node_modules/moment/locale/kn.js",
	"./ko": "../node_modules/moment/locale/ko.js",
	"./ko.js": "../node_modules/moment/locale/ko.js",
	"./ky": "../node_modules/moment/locale/ky.js",
	"./ky.js": "../node_modules/moment/locale/ky.js",
	"./lb": "../node_modules/moment/locale/lb.js",
	"./lb.js": "../node_modules/moment/locale/lb.js",
	"./lo": "../node_modules/moment/locale/lo.js",
	"./lo.js": "../node_modules/moment/locale/lo.js",
	"./lt": "../node_modules/moment/locale/lt.js",
	"./lt.js": "../node_modules/moment/locale/lt.js",
	"./lv": "../node_modules/moment/locale/lv.js",
	"./lv.js": "../node_modules/moment/locale/lv.js",
	"./me": "../node_modules/moment/locale/me.js",
	"./me.js": "../node_modules/moment/locale/me.js",
	"./mi": "../node_modules/moment/locale/mi.js",
	"./mi.js": "../node_modules/moment/locale/mi.js",
	"./mk": "../node_modules/moment/locale/mk.js",
	"./mk.js": "../node_modules/moment/locale/mk.js",
	"./ml": "../node_modules/moment/locale/ml.js",
	"./ml.js": "../node_modules/moment/locale/ml.js",
	"./mr": "../node_modules/moment/locale/mr.js",
	"./mr.js": "../node_modules/moment/locale/mr.js",
	"./ms": "../node_modules/moment/locale/ms.js",
	"./ms-my": "../node_modules/moment/locale/ms-my.js",
	"./ms-my.js": "../node_modules/moment/locale/ms-my.js",
	"./ms.js": "../node_modules/moment/locale/ms.js",
	"./mt": "../node_modules/moment/locale/mt.js",
	"./mt.js": "../node_modules/moment/locale/mt.js",
	"./my": "../node_modules/moment/locale/my.js",
	"./my.js": "../node_modules/moment/locale/my.js",
	"./nb": "../node_modules/moment/locale/nb.js",
	"./nb.js": "../node_modules/moment/locale/nb.js",
	"./ne": "../node_modules/moment/locale/ne.js",
	"./ne.js": "../node_modules/moment/locale/ne.js",
	"./nl": "../node_modules/moment/locale/nl.js",
	"./nl-be": "../node_modules/moment/locale/nl-be.js",
	"./nl-be.js": "../node_modules/moment/locale/nl-be.js",
	"./nl.js": "../node_modules/moment/locale/nl.js",
	"./nn": "../node_modules/moment/locale/nn.js",
	"./nn.js": "../node_modules/moment/locale/nn.js",
	"./pa-in": "../node_modules/moment/locale/pa-in.js",
	"./pa-in.js": "../node_modules/moment/locale/pa-in.js",
	"./pl": "../node_modules/moment/locale/pl.js",
	"./pl.js": "../node_modules/moment/locale/pl.js",
	"./pt": "../node_modules/moment/locale/pt.js",
	"./pt-br": "../node_modules/moment/locale/pt-br.js",
	"./pt-br.js": "../node_modules/moment/locale/pt-br.js",
	"./pt.js": "../node_modules/moment/locale/pt.js",
	"./ro": "../node_modules/moment/locale/ro.js",
	"./ro.js": "../node_modules/moment/locale/ro.js",
	"./ru": "../node_modules/moment/locale/ru.js",
	"./ru.js": "../node_modules/moment/locale/ru.js",
	"./sd": "../node_modules/moment/locale/sd.js",
	"./sd.js": "../node_modules/moment/locale/sd.js",
	"./se": "../node_modules/moment/locale/se.js",
	"./se.js": "../node_modules/moment/locale/se.js",
	"./si": "../node_modules/moment/locale/si.js",
	"./si.js": "../node_modules/moment/locale/si.js",
	"./sk": "../node_modules/moment/locale/sk.js",
	"./sk.js": "../node_modules/moment/locale/sk.js",
	"./sl": "../node_modules/moment/locale/sl.js",
	"./sl.js": "../node_modules/moment/locale/sl.js",
	"./sq": "../node_modules/moment/locale/sq.js",
	"./sq.js": "../node_modules/moment/locale/sq.js",
	"./sr": "../node_modules/moment/locale/sr.js",
	"./sr-cyrl": "../node_modules/moment/locale/sr-cyrl.js",
	"./sr-cyrl.js": "../node_modules/moment/locale/sr-cyrl.js",
	"./sr.js": "../node_modules/moment/locale/sr.js",
	"./ss": "../node_modules/moment/locale/ss.js",
	"./ss.js": "../node_modules/moment/locale/ss.js",
	"./sv": "../node_modules/moment/locale/sv.js",
	"./sv.js": "../node_modules/moment/locale/sv.js",
	"./sw": "../node_modules/moment/locale/sw.js",
	"./sw.js": "../node_modules/moment/locale/sw.js",
	"./ta": "../node_modules/moment/locale/ta.js",
	"./ta.js": "../node_modules/moment/locale/ta.js",
	"./te": "../node_modules/moment/locale/te.js",
	"./te.js": "../node_modules/moment/locale/te.js",
	"./tet": "../node_modules/moment/locale/tet.js",
	"./tet.js": "../node_modules/moment/locale/tet.js",
	"./th": "../node_modules/moment/locale/th.js",
	"./th.js": "../node_modules/moment/locale/th.js",
	"./tl-ph": "../node_modules/moment/locale/tl-ph.js",
	"./tl-ph.js": "../node_modules/moment/locale/tl-ph.js",
	"./tlh": "../node_modules/moment/locale/tlh.js",
	"./tlh.js": "../node_modules/moment/locale/tlh.js",
	"./tr": "../node_modules/moment/locale/tr.js",
	"./tr.js": "../node_modules/moment/locale/tr.js",
	"./tzl": "../node_modules/moment/locale/tzl.js",
	"./tzl.js": "../node_modules/moment/locale/tzl.js",
	"./tzm": "../node_modules/moment/locale/tzm.js",
	"./tzm-latn": "../node_modules/moment/locale/tzm-latn.js",
	"./tzm-latn.js": "../node_modules/moment/locale/tzm-latn.js",
	"./tzm.js": "../node_modules/moment/locale/tzm.js",
	"./uk": "../node_modules/moment/locale/uk.js",
	"./uk.js": "../node_modules/moment/locale/uk.js",
	"./ur": "../node_modules/moment/locale/ur.js",
	"./ur.js": "../node_modules/moment/locale/ur.js",
	"./uz": "../node_modules/moment/locale/uz.js",
	"./uz-latn": "../node_modules/moment/locale/uz-latn.js",
	"./uz-latn.js": "../node_modules/moment/locale/uz-latn.js",
	"./uz.js": "../node_modules/moment/locale/uz.js",
	"./vi": "../node_modules/moment/locale/vi.js",
	"./vi.js": "../node_modules/moment/locale/vi.js",
	"./x-pseudo": "../node_modules/moment/locale/x-pseudo.js",
	"./x-pseudo.js": "../node_modules/moment/locale/x-pseudo.js",
	"./yo": "../node_modules/moment/locale/yo.js",
	"./yo.js": "../node_modules/moment/locale/yo.js",
	"./zh-cn": "../node_modules/moment/locale/zh-cn.js",
	"./zh-cn.js": "../node_modules/moment/locale/zh-cn.js",
	"./zh-hk": "../node_modules/moment/locale/zh-hk.js",
	"./zh-hk.js": "../node_modules/moment/locale/zh-hk.js",
	"./zh-tw": "../node_modules/moment/locale/zh-tw.js",
	"./zh-tw.js": "../node_modules/moment/locale/zh-tw.js"
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "../node_modules/moment/locale recursive ^\\.\\/.*$";

/***/ }),

/***/ "../src/app/components/body/body.component.html":
/***/ (function(module, exports) {

module.exports = "<tr fs-list-row *ngFor=\"let row of rows; let i = index\"\r\n    [row]=\"row\"\r\n    [rowIndex]=\"i\"\r\n    [columns]=\"columns\"\r\n    [rowActions]=\"rowActions\">\r\n</tr>\r\n"

/***/ }),

/***/ "../src/app/components/body/body.component.ts":
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
var core_1 = __webpack_require__("../node_modules/@angular/core/esm2015/core.js");
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
            template: __webpack_require__("../src/app/components/body/body.component.html"),
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [core_1.ChangeDetectorRef,
            core_1.IterableDiffers])
    ], FsBodyComponent);
    return FsBodyComponent;
}());
exports.FsBodyComponent = FsBodyComponent;


/***/ }),

/***/ "../src/app/components/body/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("../src/app/components/body/body.component.ts"));
__export(__webpack_require__("../src/app/components/body/row/index.ts"));


/***/ }),

/***/ "../src/app/components/body/row/cell/cell.component.html":
/***/ (function(module, exports) {

module.exports = "<ng-template [ngTemplateOutlet]=\"column.rowTemplate || cell\" [ngTemplateOutletContext]=\"cellContext\"></ng-template>\r\n\r\n<ng-template #cell let-value=\"value\">\r\n  {{value}}\r\n</ng-template>\r\n"

/***/ }),

/***/ "../src/app/components/body/row/cell/cell.component.ts":
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
var core_1 = __webpack_require__("../node_modules/@angular/core/esm2015/core.js");
var column_model_1 = __webpack_require__("../src/app/models/column.model.ts");
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
            template: __webpack_require__("../src/app/components/body/row/cell/cell.component.html"),
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [])
    ], FsCellComponent);
    return FsCellComponent;
}());
exports.FsCellComponent = FsCellComponent;


/***/ }),

/***/ "../src/app/components/body/row/cell/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("../src/app/components/body/row/cell/cell.component.ts"));


/***/ }),

/***/ "../src/app/components/body/row/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("../src/app/components/body/row/row.component.ts"));
__export(__webpack_require__("../src/app/components/body/row/cell/index.ts"));


/***/ }),

/***/ "../src/app/components/body/row/row.component.html":
/***/ (function(module, exports) {

module.exports = "<ng-container *ngFor=\"let column of columns\">\r\n  <td fs-cell\r\n      *ngIf=\"!column.cellColspanned\"\r\n      [column]=\"column\"\r\n      [row]=\"row\"\r\n      [rowIndex]=\"rowIndex\"\r\n      [ngClass]=\"column.cellConfigs.classesArray\"\r\n      [attr.colspan]=\"column.cellConfigs.colspan\"\r\n      [attr.width]=\"column.width\">\r\n  </td>\r\n</ng-container>\r\n<td *ngIf=\"rowActions?.length > 0\" class=\"fs-list-col\">\r\n  <button mat-icon-button [matMenuTriggerFor]=\"rowActionsRef\">\r\n    <mat-icon>more_vert</mat-icon>\r\n  </button>\r\n  <mat-menu #rowActionsRef>\r\n    <button mat-menu-item *ngFor=\"let action of rowActions\" (click)=\"action.click(row, $event)\">\r\n      <mat-icon *ngIf=\"action.icon\">{{action.icon}}</mat-icon> {{action.label}}\r\n    </button>\r\n  </mat-menu>\r\n</td>\r\n"

/***/ }),

/***/ "../src/app/components/body/row/row.component.ts":
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
var core_1 = __webpack_require__("../node_modules/@angular/core/esm2015/core.js");
var FsRowComponent = (function () {
    function FsRowComponent(cdRef, differs) {
        this.cdRef = cdRef;
        this.differs = differs;
        this.t = true;
        this.role = 'row';
        this.rowActions = [];
        this._rowDiffer = differs.find({}).create();
    }
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
    FsRowComponent = __decorate([
        core_1.Component({
            selector: '[fs-list-row]',
            template: __webpack_require__("../src/app/components/body/row/row.component.html"),
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [core_1.ChangeDetectorRef,
            core_1.KeyValueDiffers])
    ], FsRowComponent);
    return FsRowComponent;
}());
exports.FsRowComponent = FsRowComponent;


/***/ }),

/***/ "../src/app/components/footer/footer-row/footer-cell/footer-cell.component.html":
/***/ (function(module, exports) {

module.exports = "<ng-template [ngTemplateOutlet]=\"column.footerTemplate || cell\" [ngTemplateOutletContext]=\"cellContext\"></ng-template>\r\n\r\n<ng-template #cell let-value=\"value\">\r\n  {{value}}\r\n</ng-template>\r\n"

/***/ }),

/***/ "../src/app/components/footer/footer-row/footer-cell/footer-cell.component.ts":
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
var core_1 = __webpack_require__("../node_modules/@angular/core/esm2015/core.js");
var body_1 = __webpack_require__("../src/app/components/body/index.ts");
var FsFooterCellComponent = (function (_super) {
    __extends(FsFooterCellComponent, _super);
    function FsFooterCellComponent() {
        return _super.call(this) || this;
    }
    FsFooterCellComponent = __decorate([
        core_1.Component({
            selector: '[fs-list-footer-cell]',
            template: __webpack_require__("../src/app/components/footer/footer-row/footer-cell/footer-cell.component.html"),
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [])
    ], FsFooterCellComponent);
    return FsFooterCellComponent;
}(body_1.FsCellComponent));
exports.FsFooterCellComponent = FsFooterCellComponent;


/***/ }),

/***/ "../src/app/components/footer/footer-row/footer-cell/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("../src/app/components/footer/footer-row/footer-cell/footer-cell.component.ts"));


/***/ }),

/***/ "../src/app/components/footer/footer-row/footer-row.component.html":
/***/ (function(module, exports) {

module.exports = "<ng-container *ngFor=\"let column of columns\">\r\n  <td fs-list-footer-cell\r\n      *ngIf=\"!column.footerColspanned\"\r\n      [column]=\"column\"\r\n      [row]=\"row\"\r\n      [rowIndex]=\"rowIndex\"\r\n      [ngClass]=\"column.footerConfigs.classesArray\"\r\n      [attr.colspan]=\"column.footerConfigs.colspan\"\r\n      [attr.width]=\"column.width\">\r\n  </td>\r\n</ng-container>\r\n<td *ngIf=\"hasRowActions\" class=\"fs-list-col\"></td>\r\n"

/***/ }),

/***/ "../src/app/components/footer/footer-row/footer-row.component.ts":
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
var core_1 = __webpack_require__("../node_modules/@angular/core/esm2015/core.js");
var body_1 = __webpack_require__("../src/app/components/body/index.ts");
var FsFooterRowComponent = (function (_super) {
    __extends(FsFooterRowComponent, _super);
    function FsFooterRowComponent(cdRef, differs) {
        return _super.call(this, cdRef, differs) || this;
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], FsFooterRowComponent.prototype, "hasRowActions", void 0);
    FsFooterRowComponent = __decorate([
        core_1.Component({
            selector: '[fs-list-footer-row]',
            template: __webpack_require__("../src/app/components/footer/footer-row/footer-row.component.html"),
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [core_1.ChangeDetectorRef,
            core_1.KeyValueDiffers])
    ], FsFooterRowComponent);
    return FsFooterRowComponent;
}(body_1.FsRowComponent));
exports.FsFooterRowComponent = FsFooterRowComponent;


/***/ }),

/***/ "../src/app/components/footer/footer-row/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("../src/app/components/footer/footer-row/footer-row.component.ts"));
__export(__webpack_require__("../src/app/components/footer/footer-row/footer-cell/index.ts"));


/***/ }),

/***/ "../src/app/components/footer/footer.component.html":
/***/ (function(module, exports) {

module.exports = "<tr fs-list-footer-row [columns]=\"columns\" [hasRowActions]=\"hasRowActions\"></tr>\r\n"

/***/ }),

/***/ "../src/app/components/footer/footer.component.ts":
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
var core_1 = __webpack_require__("../node_modules/@angular/core/esm2015/core.js");
var body_component_1 = __webpack_require__("../src/app/components/body/body.component.ts");
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
            template: __webpack_require__("../src/app/components/footer/footer.component.html"),
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [core_1.ChangeDetectorRef,
            core_1.IterableDiffers])
    ], FsFooterComponent);
    return FsFooterComponent;
}(body_component_1.FsBodyComponent));
exports.FsFooterComponent = FsFooterComponent;


/***/ }),

/***/ "../src/app/components/footer/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("../src/app/components/footer/footer.component.ts"));
__export(__webpack_require__("../src/app/components/footer/footer-row/index.ts"));


/***/ }),

/***/ "../src/app/components/head/head-cell/head-cell.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"wrap\">\r\n    <span class=\"title\">\r\n      <ng-template [ngIf]=\"!column.headerTemplate\">{{column.title}}</ng-template>\r\n      <ng-template\r\n        [ngIf]=\"column.headerTemplate\"\r\n        [ngTemplateOutlet]=\"column.headerTemplate\"\r\n        [ngTemplateOutletContext]=\"cellContext\">\r\n      </ng-template>\r\n    </span>\r\n  <div class=\"direction\" *ngIf=\"column.ordered\" [ngSwitch]=\"column.sortingDirection\">\r\n    <mat-icon class=\"material-icons\" role=\"img\" aria-label=\"arrow_downward\" *ngSwitchCase=\"0\">arrow_downward</mat-icon>\r\n    <mat-icon class=\"material-icons\" role=\"img\" aria-label=\"arrow_upward\" *ngSwitchCase=\"1\">arrow_upward</mat-icon>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "../src/app/components/head/head-cell/head-cell.component.ts":
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
var core_1 = __webpack_require__("../node_modules/@angular/core/esm2015/core.js");
var cell_component_1 = __webpack_require__("../src/app/components/body/row/cell/cell.component.ts");
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
            template: __webpack_require__("../src/app/components/head/head-cell/head-cell.component.html"),
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [core_1.ChangeDetectorRef,
            core_1.KeyValueDiffers])
    ], FsHeadCellComponent);
    return FsHeadCellComponent;
}(cell_component_1.FsCellComponent));
exports.FsHeadCellComponent = FsHeadCellComponent;


/***/ }),

/***/ "../src/app/components/head/head-cell/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("../src/app/components/head/head-cell/head-cell.component.ts"));


/***/ }),

/***/ "../src/app/components/head/head.component.html":
/***/ (function(module, exports) {

module.exports = "<tr class=\"fs-list-row\">\r\n  <th fs-head-cell *ngFor=\"let column of columns\"\r\n      (click)=\"sorting.sortBy(column)\"\r\n      [column]=\"column\"\r\n      [class.sorting]=\"column.sortable\"\r\n      [ngClass]=\"column.headerConfigs.classesArray\"\r\n      [attr.colspan]=\"column.headerConfigs.colspan\"\r\n      [attr.width]=\"column.width\"></th>\r\n\r\n  <th *ngIf=\"hasRowActions\" class=\"fs-list-col\"></th>\r\n</tr>\r\n"

/***/ }),

/***/ "../src/app/components/head/head.component.ts":
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
var core_1 = __webpack_require__("../node_modules/@angular/core/esm2015/core.js");
var sorting_model_1 = __webpack_require__("../src/app/models/sorting.model.ts");
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
        core_1.ViewChild('rowsContainer', { read: core_1.ViewContainerRef }),
        __metadata("design:type", Object)
    ], FsHeadComponent.prototype, "rowsContainer", void 0);
    FsHeadComponent = __decorate([
        core_1.Component({
            selector: '[fs-list-head]',
            template: __webpack_require__("../src/app/components/head/head.component.html"),
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [core_1.ChangeDetectorRef])
    ], FsHeadComponent);
    return FsHeadComponent;
}());
exports.FsHeadComponent = FsHeadComponent;


/***/ }),

/***/ "../src/app/components/head/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("../src/app/components/head/head.component.ts"));
__export(__webpack_require__("../src/app/components/head/head-cell/index.ts"));


/***/ }),

/***/ "../src/app/components/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("../src/app/components/list/index.ts"));
__export(__webpack_require__("../src/app/components/status/index.ts"));
__export(__webpack_require__("../src/app/components/body/index.ts"));
__export(__webpack_require__("../src/app/components/head/index.ts"));
__export(__webpack_require__("../src/app/components/pagination/index.ts"));
__export(__webpack_require__("../src/app/components/footer/index.ts"));


/***/ }),

/***/ "../src/app/components/list/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("../src/app/components/list/list.component.ts"));


/***/ }),

/***/ "../src/app/components/list/list.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"fs-list-container\">\r\n  <div class=\"fs-list-filters\" fxLayoutRow>\r\n    <fs-filter *ngIf=\"listConfig.filterService.fsConfig.items.length\" [(filter)]=\"listConfig.filterService\" fxFlex></fs-filter>\r\n    <div class=\"fs-list-actions\" *ngIf=\"listConfig.actions?.length\">\r\n      <span *ngFor=\"let action of listConfig.actions\">\r\n          <button mat-raised-button\r\n                  (click)=\"action.click(action, $event)\"\r\n                  [ngClass]=\"{ 'mat-primary': action.primary }\">\r\n            <mat-icon *ngIf=\"action.icon\">{{action.icon}}</mat-icon> {{ action.label }}\r\n          </button>\r\n      </span>\r\n    </div>\r\n  </div>\r\n  <fs-list-status [dataChangedRef]=\"listConfig.data$\" [sorting]=\"listConfig.sorting\" [paging]=\"listConfig.paging\" *ngIf=\"listConfig.paging\"></fs-list-status>\r\n  <table class=\"fs-list-table\" role=\"grid\">\r\n    <thead fs-list-head\r\n      class=\"fs-list-head\"\r\n      role=\"rowgroup\"\r\n      [columns]=\"listConfig.columns\"\r\n      [sorting]=\"listConfig.sorting\"\r\n      [hasRowActions]=\"listConfig.hasRowActions\">\r\n    </thead>\r\n\r\n    <tbody fs-list-body\r\n      class=\"fs-list-body\"\r\n      role=\"rowgroup\"\r\n      [class.loading]=\"listConfig.loading\"\r\n      [rows]=\"displayRows\"\r\n      [rowActions]=\"listConfig.rowActions\"\r\n      [columns]=\"listConfig.columns\"\r\n      [hasFooter]=\"listConfig.hasFooter\">\r\n    </tbody>\r\n\r\n    <tfoot fs-list-footer\r\n           class=\"fs-list-footer\"\r\n           *ngIf=\"listConfig.hasFooter\"\r\n           [columns]=\"listConfig.columns\"\r\n           [hasRowActions]=\"listConfig.hasRowActions\">\r\n    </tfoot>\r\n  </table>\r\n\r\n  <fs-list-pagination\r\n    *ngIf=\"listConfig.paging.enabled\"\r\n    [dataChangedRef]=\"listConfig.data$\"\r\n    [pagination]=\"listConfig.paging\">\r\n  </fs-list-pagination>\r\n</div>\r\n"

/***/ }),

/***/ "../src/app/components/list/list.component.scss":
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__("../node_modules/css-loader/index.js?{\"sourceMap\":true}!../node_modules/postcss-loader/lib/index.js?{\"sourceMap\":true}!../node_modules/resolve-url-loader/index.js?{\"sourceMap\":true}!../node_modules/sass-loader/lib/loader.js?{\"sourceMap\":true}!../src/app/components/list/list.component.scss");

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ "../src/app/components/list/list.component.ts":
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
var core_1 = __webpack_require__("../node_modules/@angular/core/esm2015/core.js");
var directives_1 = __webpack_require__("../src/app/directives/index.ts");
var list_config_model_1 = __webpack_require__("../src/app/models/list-config.model.ts");
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
            template: __webpack_require__("../src/app/components/list/list.component.html"),
            styles: [
                __webpack_require__("../src/app/components/list/list.component.scss"),
            ],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], FsListComponent);
    return FsListComponent;
}());
exports.FsListComponent = FsListComponent;


/***/ }),

/***/ "../src/app/components/pagination/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("../src/app/components/pagination/pagination.component.ts"));


/***/ }),

/***/ "../src/app/components/pagination/pagination.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"paging\" fxLayout=\"row\" *ngIf=\"pagination?.pagesArray && pagination.pagesArray.length > 0\">\r\n  <div class=\"records\"></div>\r\n  <div fxFlex>\r\n    <ul class=\"pages\">\r\n      <li class=\"first\" [class.disabled]=\"!pagination.hasPrevPage\">\r\n        <a (click)=\"pagination.goFirst()\">&laquo;</a>\r\n      </li>\r\n      <li class=\"previous\" [class.disabled]=\"!pagination.hasPrevPage\">\r\n        <a (click)=\"pagination.goPrev()\">‹</a>\r\n      </li>\r\n      <li class=\"page\" *ngFor=\"let page of pagination.pagesArray;\"\r\n          [class.active]=\"pagination.isActive(page)\"\r\n      >\r\n        <a (click)=\"pagination.goToPage(page)\">{{ page }}</a>\r\n      </li>\r\n      <li class=\"next\" [class.disabled]=\"!pagination.hasNextPage\">\r\n        <a (click)=\"pagination.goNext()\">›</a>\r\n      </li>\r\n      <li class=\"last\" [class.disabled]=\"!pagination.hasNextPage\">\r\n        <a (click)=\"pagination.goLast()\">&raquo;</a>\r\n      </li>\r\n    </ul>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "../src/app/components/pagination/pagination.component.scss":
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__("../node_modules/css-loader/index.js?{\"sourceMap\":true}!../node_modules/postcss-loader/lib/index.js?{\"sourceMap\":true}!../node_modules/resolve-url-loader/index.js?{\"sourceMap\":true,\"absolute\":false,\"fail\":false,\"silent\":false,\"keepQuery\":false,\"attempts\":0,\"debug\":false,\"root\":null,\"includeRoot\":false}!../node_modules/sass-loader/lib/loader.js?{\"sourceMap\":true}!../src/app/components/pagination/pagination.component.scss");

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ "../src/app/components/pagination/pagination.component.ts":
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
var core_1 = __webpack_require__("../node_modules/@angular/core/esm2015/core.js");
var BehaviorSubject_1 = __webpack_require__("../node_modules/rxjs/BehaviorSubject.js");
var pagination_model_1 = __webpack_require__("../src/app/models/pagination.model.ts");
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
            template: __webpack_require__("../src/app/components/pagination/pagination.component.html"),
            styles: [
                __webpack_require__("../src/app/components/pagination/pagination.component.scss")
            ],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [core_1.ChangeDetectorRef])
    ], FsPaginationComponent);
    return FsPaginationComponent;
}());
exports.FsPaginationComponent = FsPaginationComponent;


/***/ }),

/***/ "../src/app/components/status/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("../src/app/components/status/status.component.ts"));


/***/ }),

/***/ "../src/app/components/status/status.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"infinite-records\" fxLayout=\"row\" fxLayoutAlign=\"start center\">\r\n  Showing&nbsp;<a [matMenuTriggerFor]=\"limitsMenu\">{{paging.displayed}}</a>&nbsp;of {{paging.records}} results\r\n  <span *ngIf=\"sorting.sortingColumn\">&nbsp;ordered by\r\n    <a class=\"order-toggle\" [matMenuTriggerFor]=\"orderColumnsMenu\">{{sorting.sortingColumn.title}}</a>,\r\n    <a class=\"order-toggle\" [matMenuTriggerFor]=\"orderDirectionMenu\">{{sorting.sortingColumn.fullNameDirection}}</a></span>\r\n</div>\r\n\r\n<mat-menu #limitsMenu>\r\n  <button mat-menu-item *ngFor=\"let lim of paging.limits\" (click)=\"setLimit(lim)\"> {{lim}} </button>\r\n</mat-menu>\r\n\r\n<mat-menu #orderColumnsMenu>\r\n  <button mat-menu-item *ngFor=\"let column of sorting.sortingColumns\" (click)=\"setSortableColumn(column)\">{{column.title}}</button>\r\n</mat-menu>\r\n\r\n<mat-menu #orderDirectionMenu>\r\n  <button mat-menu-item (click)=\"setDirection(OrderDirection.asc)\"> ascending </button>\r\n  <button mat-menu-item (click)=\"setDirection(OrderDirection.desc)\"> descending </button>\r\n</mat-menu>\r\n"

/***/ }),

/***/ "../src/app/components/status/status.component.scss":
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__("../node_modules/css-loader/index.js?{\"sourceMap\":true}!../node_modules/postcss-loader/lib/index.js?{\"sourceMap\":true}!../node_modules/resolve-url-loader/index.js?{\"sourceMap\":true,\"absolute\":false,\"fail\":false,\"silent\":false,\"keepQuery\":false,\"attempts\":0,\"debug\":false,\"root\":null,\"includeRoot\":false}!../node_modules/sass-loader/lib/loader.js?{\"sourceMap\":true}!../src/app/components/status/status.component.scss");

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ "../src/app/components/status/status.component.ts":
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
var core_1 = __webpack_require__("../node_modules/@angular/core/esm2015/core.js");
var column_model_1 = __webpack_require__("../src/app/models/column.model.ts");
var pagination_model_1 = __webpack_require__("../src/app/models/pagination.model.ts");
var sorting_model_1 = __webpack_require__("../src/app/models/sorting.model.ts");
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
            template: __webpack_require__("../src/app/components/status/status.component.html"),
            styles: [
                __webpack_require__("../src/app/components/status/status.component.scss"),
            ],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [core_1.ChangeDetectorRef])
    ], FsStatusComponent);
    return FsStatusComponent;
}());
exports.FsStatusComponent = FsStatusComponent;


/***/ }),

/***/ "../src/app/directives/cell/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("../src/app/directives/cell/row.directive.ts"));


/***/ }),

/***/ "../src/app/directives/cell/row.directive.ts":
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
var core_1 = __webpack_require__("../node_modules/@angular/core/esm2015/core.js");
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

/***/ "../src/app/directives/column/column.directive.ts":
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
var core_1 = __webpack_require__("../node_modules/@angular/core/esm2015/core.js");
var _1 = __webpack_require__("../src/app/directives/index.ts");
var footer_directive_1 = __webpack_require__("../src/app/directives/footer/footer.directive.ts");
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

/***/ "../src/app/directives/column/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("../src/app/directives/column/column.directive.ts"));


/***/ }),

/***/ "../src/app/directives/footer/footer.directive.ts":
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
var core_1 = __webpack_require__("../node_modules/@angular/core/esm2015/core.js");
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

/***/ "../src/app/directives/footer/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("../src/app/directives/footer/footer.directive.ts"));


/***/ }),

/***/ "../src/app/directives/header/header.directive.ts":
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
var core_1 = __webpack_require__("../node_modules/@angular/core/esm2015/core.js");
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

/***/ "../src/app/directives/header/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("../src/app/directives/header/header.directive.ts"));


/***/ }),

/***/ "../src/app/directives/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("../src/app/directives/header/index.ts"));
__export(__webpack_require__("../src/app/directives/cell/index.ts"));
__export(__webpack_require__("../src/app/directives/column/index.ts"));
__export(__webpack_require__("../src/app/directives/footer/index.ts"));


/***/ }),

/***/ "../src/app/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("../src/app/components/index.ts"));
__export(__webpack_require__("../src/app/models/index.ts"));
__export(__webpack_require__("../src/app/directives/index.ts"));


/***/ }),

/***/ "../src/app/models/action.model.ts":
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
var tsmodels_1 = __webpack_require__("../node_modules/tsmodels/package/index.js");
var Action = (function (_super) {
    __extends(Action, _super);
    function Action(config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this) || this;
        _this.primary = true; //TODO make it as @Alias after tsmodels release
        if (config.primary === false) {
            _this.primary = false;
        }
        _this._fromJSON(config);
        return _this;
    }
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
        __metadata("design:type", Function)
    ], Action.prototype, "click", void 0);
    return Action;
}(tsmodels_1.Model));
exports.Action = Action;


/***/ }),

/***/ "../src/app/models/column.model.ts":
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
var tsmodels_1 = __webpack_require__("../node_modules/tsmodels/package/index.js");
var core_1 = __webpack_require__("../node_modules/@angular/core/esm2015/core.js");
var _isObject = __webpack_require__("../node_modules/lodash/isObject.js");
var _isBoolean = __webpack_require__("../node_modules/lodash/isBoolean.js");
var styleConfig_model_1 = __webpack_require__("../src/app/models/styleConfig.model.ts");
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

/***/ "../src/app/models/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("../src/app/models/column.model.ts"));
__export(__webpack_require__("../src/app/models/list-config.model.ts"));
__export(__webpack_require__("../src/app/models/sorting.model.ts"));
__export(__webpack_require__("../src/app/models/pagination.model.ts"));
__export(__webpack_require__("../src/app/models/styleConfig.model.ts"));


/***/ }),

/***/ "../src/app/models/list-config.model.ts":
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
var filter_1 = __webpack_require__("../node_modules/@firestitch/filter/package/index.js");
var column_model_1 = __webpack_require__("../src/app/models/column.model.ts");
var pagination_model_1 = __webpack_require__("../src/app/models/pagination.model.ts");
var sorting_model_1 = __webpack_require__("../src/app/models/sorting.model.ts");
var _isNumber = __webpack_require__("../node_modules/lodash/isNumber.js");
var tsmodels_1 = __webpack_require__("../node_modules/tsmodels/package/index.js");
var Observable_1 = __webpack_require__("../node_modules/rxjs/Observable.js");
var BehaviorSubject_1 = __webpack_require__("../node_modules/rxjs/BehaviorSubject.js");
var styleConfig_model_1 = __webpack_require__("../src/app/models/styleConfig.model.ts");
var action_model_1 = __webpack_require__("../src/app/models/action.model.ts");
var FsListModel = (function (_super) {
    __extends(FsListModel, _super);
    function FsListModel(config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this) || this;
        _this.filters = [];
        _this.columns = [];
        _this.paging = new pagination_model_1.Pagination();
        _this.sorting = new sorting_model_1.Sorting(_this.columns);
        _this.filterService = new filter_1.FsFilter();
        _this.data$ = new BehaviorSubject_1.BehaviorSubject([]);
        _this.loading = false;
        _this.hasFooter = false;
        _this.initialFetch = true;
        _this._fromJSON(config);
        if (config.initialFetch === false) {
            _this.initialFetch = false;
        }
        _this._headerConfig = new styleConfig_model_1.StyleConfig(config.header);
        _this._cellConfig = new styleConfig_model_1.StyleConfig(config.cell);
        _this._footerConfig = new styleConfig_model_1.StyleConfig(config.footer);
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
                _this.paging.updatePaging(response.paging);
                _this.loading = false;
                _this.data$.next(response.data);
            });
        }
        else if (result instanceof Observable_1.Observable) {
            result.subscribe(function (response) {
                _this.paging.updatePaging(response.paging);
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
            this.load();
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
        __metadata("design:type", Object)
    ], FsListModel.prototype, "inlineFilters", void 0);
    __decorate([
        tsmodels_1.Alias('actions', action_model_1.Action),
        __metadata("design:type", Object)
    ], FsListModel.prototype, "actions", void 0);
    __decorate([
        tsmodels_1.Alias(),
        __metadata("design:type", Object)
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

/***/ "../src/app/models/pagination.model.ts":
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
var tsmodels_1 = __webpack_require__("../node_modules/tsmodels/package/index.js");
var Subject_1 = __webpack_require__("../node_modules/rxjs/Subject.js");
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

/***/ "../src/app/models/sorting.model.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var column_model_1 = __webpack_require__("../src/app/models/column.model.ts");
var Subject_1 = __webpack_require__("../node_modules/rxjs/Subject.js");
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

/***/ "../src/app/models/styleConfig.model.ts":
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
var tsmodels_1 = __webpack_require__("../node_modules/tsmodels/package/index.js");
var _isString = __webpack_require__("../node_modules/lodash/isString.js");
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

/***/ "../src/fslist.module.ts":
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
var core_1 = __webpack_require__("../node_modules/@angular/core/esm2015/core.js");
var common_1 = __webpack_require__("../node_modules/@angular/common/esm2015/common.js");
var material_1 = __webpack_require__("../node_modules/@angular/material/esm2015/material.js");
var flex_layout_1 = __webpack_require__("../node_modules/@angular/flex-layout/esm2015/flex-layout.js");
var filter_1 = __webpack_require__("../node_modules/@firestitch/filter/package/index.js");
var components_1 = __webpack_require__("../src/app/components/index.ts");
var directives_1 = __webpack_require__("../src/app/directives/index.ts");
__export(__webpack_require__("../src/app/components/list/list.component.ts"));
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

/***/ "../src/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("../src/fslist.module.ts"));
__export(__webpack_require__("../src/app/index.ts"));


/***/ }),

/***/ "../tools lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../tools lazy recursive";

/***/ }),

/***/ "../tools/assets/playground.scss":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "../tools/components/examples/examples.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"example-title\">{{title}}</div>\n<mat-tab-group>\n  <mat-tab label=\"Examples\">\n      <div class=\"examples-body\">\n        <ng-content></ng-content>\n      </div>\n  </mat-tab>\n  <mat-tab label=\"Docs\">\n    <!-- <iframe src=\"/docs\" class=\"iframe-example\"></iframe> -->\n    <div class=\"iframe-container\">\n      <iframe class=\"iframe-example ng-star-inserted\" src=\"http://list.components.firestitch.com/docs\"></iframe>\n    </div>\n  </mat-tab>\n</mat-tab-group>\n"

/***/ }),

/***/ "../tools/components/examples/examples.component.ts":
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
var core_1 = __webpack_require__("../node_modules/@angular/core/esm2015/core.js");
var FsExamplesComponent = (function () {
    function FsExamplesComponent() {
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], FsExamplesComponent.prototype, "title", void 0);
    FsExamplesComponent = __decorate([
        core_1.Component({
            selector: 'fs-examples',
            template: __webpack_require__("../tools/components/examples/examples.component.html")
        })
    ], FsExamplesComponent);
    return FsExamplesComponent;
}());
exports.FsExamplesComponent = FsExamplesComponent;


/***/ }),

/***/ "./app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<fs-examples title=\"List Component\">\n  <fs-example title=\"Kitchen Sink\" componentName=\"kitchensink\">\n    <kitchensink></kitchensink>\n  </fs-example>\n</fs-examples>\n\n"

/***/ }),

/***/ "./app/app.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../node_modules/@angular/core/esm2015/core.js");
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            template: __webpack_require__("./app/app.component.html")
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;


/***/ }),

/***/ "./app/components/kitchensink/kitchensink.component.html":
/***/ (function(module, exports) {

module.exports = "<fs-list [config]=\"config\" #table>\r\n\r\n  <fs-list-column>\r\n    <ng-template fs-list-header>\r\n      №\r\n    </ng-template>\r\n    <ng-template fs-list-cell let-index=\"index\">\r\n      {{index}}\r\n    </ng-template>\r\n    <ng-template fs-list-footer colspan=\"2\">\r\n      Footer with colspan 2 and left align\r\n    </ng-template>\r\n  </fs-list-column>\r\n\r\n  <fs-list-column name=\"name\" title=\"Name\" [sortable]=\"true\">\r\n    <ng-template fs-list-header>\r\n      <b>User</b> name\r\n    </ng-template>\r\n    <ng-template fs-list-cell let-value=\"value\" let-row=\"row\">\r\n      {{value}}\r\n      <mat-form-field>\r\n        <input matInput [(ngModel)]=\"row.guid\" (click)=\"onClick(row, $event)\">\r\n      </mat-form-field>\r\n    </ng-template>\r\n  </fs-list-column>\r\n\r\n  <fs-list-column name=\"guid\" title=\"GUID\" [sortable]=\"true\">\r\n    <ng-template fs-list-cell let-guid=\"value\" let-row=\"row\">\r\n      This row's guid is {{ row.guid }} ({{guid}}).\r\n    </ng-template>\r\n  </fs-list-column>\r\n\r\n  <fs-list-column title=\"Link\">\r\n    <ng-template fs-list-cell let-guid=\"value\" [class]=\"['myTestClass', 'myTestClass2']\">\r\n      <a routerLink=\"/welcome\">Simple Link</a>\r\n    </ng-template>\r\n    <ng-template fs-list-footer colspan=\"2\" align=\"right\">\r\n      Footer with colspan 2 and right align\r\n    </ng-template>\r\n  </fs-list-column>\r\n</fs-list>\r\n"

/***/ }),

/***/ "./app/components/kitchensink/kitchensink.component.ts":
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
var core_1 = __webpack_require__("../node_modules/@angular/core/esm2015/core.js");
var router_1 = __webpack_require__("../node_modules/@angular/router/esm2015/router.js");
var api_1 = __webpack_require__("../node_modules/@firestitch/api/api.umd.js");
__webpack_require__("../node_modules/rxjs/add/operator/map.js");
var list_component_1 = __webpack_require__("../src/app/components/list/list.component.ts");
var KitchenSinkComponent = (function () {
    function KitchenSinkComponent(_fsApi, _router) {
        this._fsApi = _fsApi;
        this._router = _router;
    }
    KitchenSinkComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.config = {
            paging: {
                limits: [5, 15, 50, 150, 250, 500, 1000]
            },
            filters: [
                {
                    name: 'keyword',
                    type: 'text',
                    label: 'Search'
                },
                {
                    name: 'simple_select',
                    type: 'select',
                    label: 'Simple Select',
                    values: function () {
                        return [
                            { name: 'All', value: '__all' },
                            { name: 'Option 1', value: 1 },
                            { name: 'Option 2', value: 2 },
                            { name: 'Option 3', value: 3 }
                        ];
                    }
                }
            ],
            actions: [
                {
                    click: function (event) {
                        console.log(event);
                    },
                    label: 'Primary Button'
                },
                {
                    click: function (event) {
                        console.log(event);
                    },
                    icon: 'delete',
                    primary: false,
                    label: 'Secondary Button'
                }
            ],
            rowActions: [
                {
                    click: function (row, event) {
                        console.log('edit', row, event);
                    },
                    icon: 'edit',
                    label: 'Edit'
                },
                {
                    click: function (row, event) {
                        console.log('delete', row, event);
                    },
                    icon: 'delete',
                    label: 'Remove'
                }
            ],
            rowEvents: {
                hover: function (event) {
                },
                click: function (event) {
                }
            },
            header: {
                className: 'header-test-defaults-class',
                align: 'left'
            },
            cell: {
                className: 'cell-test-defaults-class',
                align: 'left'
            },
            fetch: function (query) {
                query.count = 500;
                return _this._fsApi.get('https://boilerplate.firestitch.com/api/dummy', query)
                    .map(function (response) { return ({ data: response.data.objects, paging: response.data.paging }); });
            },
        };
    };
    KitchenSinkComponent.prototype.onClick = function (row, event) {
        console.log(row, event);
    };
    __decorate([
        core_1.ViewChild('table'),
        __metadata("design:type", list_component_1.FsListComponent)
    ], KitchenSinkComponent.prototype, "table", void 0);
    KitchenSinkComponent = __decorate([
        core_1.Component({
            selector: 'kitchensink',
            template: __webpack_require__("./app/components/kitchensink/kitchensink.component.html"),
            styles: []
        }),
        __metadata("design:paramtypes", [api_1.FsApi, router_1.Router])
    ], KitchenSinkComponent);
    return KitchenSinkComponent;
}());
exports.KitchenSinkComponent = KitchenSinkComponent;


/***/ }),

/***/ "./app/material.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var material_1 = __webpack_require__("../node_modules/@angular/material/esm2015/material.js");
//import { FlexLayoutModule } from '@angular/flex-layout';
var core_1 = __webpack_require__("../node_modules/@angular/core/esm2015/core.js");
var table_1 = __webpack_require__("../node_modules/@angular/cdk/esm2015/table.js");
var AppMaterialModule = (function () {
    function AppMaterialModule() {
    }
    AppMaterialModule = __decorate([
        core_1.NgModule({
            exports: [
                table_1.CdkTableModule,
                material_1.MatAutocompleteModule,
                material_1.MatButtonModule,
                material_1.MatButtonToggleModule,
                material_1.MatCardModule,
                material_1.MatCheckboxModule,
                material_1.MatChipsModule,
                material_1.MatStepperModule,
                material_1.MatDatepickerModule,
                material_1.MatDialogModule,
                material_1.MatExpansionModule,
                material_1.MatGridListModule,
                material_1.MatIconModule,
                material_1.MatInputModule,
                material_1.MatListModule,
                material_1.MatMenuModule,
                material_1.MatNativeDateModule,
                material_1.MatPaginatorModule,
                material_1.MatProgressBarModule,
                material_1.MatProgressSpinnerModule,
                material_1.MatRadioModule,
                material_1.MatRippleModule,
                material_1.MatSelectModule,
                material_1.MatSidenavModule,
                material_1.MatSliderModule,
                material_1.MatSlideToggleModule,
                material_1.MatSnackBarModule,
                material_1.MatSortModule,
                material_1.MatTableModule,
                material_1.MatTabsModule,
                material_1.MatToolbarModule,
                material_1.MatTooltipModule,
            ]
        })
    ], AppMaterialModule);
    return AppMaterialModule;
}());
exports.AppMaterialModule = AppMaterialModule;


/***/ }),

/***/ "./main.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var playground_module_1 = __webpack_require__("./playground.module.ts");
var platform_browser_dynamic_1 = __webpack_require__("../node_modules/@angular/platform-browser-dynamic/esm2015/platform-browser-dynamic.js");
var platform_browser_1 = __webpack_require__("../node_modules/@angular/platform-browser/esm2015/platform-browser.js");
var core_1 = __webpack_require__("../node_modules/@angular/core/esm2015/core.js");
/**
 * Bootstrap our Angular app with a top level NgModule
 */
function main() {
    platform_browser_dynamic_1.platformBrowserDynamic()
        .bootstrapModule(playground_module_1.PlaygroundModule)
        .then(decorateModuleRef)
        .catch(function (err) { return console.error(err); });
}
exports.main = main;
/**
 * Needed for hmr
 * in prod this is replace for document ready
 */
switch (document.readyState) {
    case 'loading':
        document.addEventListener('DOMContentLoaded', _domReadyHandler, false);
        break;
    case 'interactive':
    case 'complete':
    default:
        main();
}
function _domReadyHandler() {
    document.removeEventListener('DOMContentLoaded', _domReadyHandler, false);
    main();
}
function decorateModuleRef(modRef) {
    var appRef = modRef.injector.get(core_1.ApplicationRef);
    var cmpRef = appRef.components[0];
    var _ng = window.ng;
    platform_browser_1.enableDebugTools(cmpRef);
    window.ng.probe = _ng.probe;
    window.ng.coreTokens = _ng.coreTokens;
    return modRef;
}


/***/ }),

/***/ "./playground.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__("../tools/assets/playground.scss");
var core_1 = __webpack_require__("../node_modules/@angular/core/esm2015/core.js");
var app_component_1 = __webpack_require__("./app/app.component.ts");
var forms_1 = __webpack_require__("../node_modules/@angular/forms/esm2015/forms.js");
var platform_browser_1 = __webpack_require__("../node_modules/@angular/platform-browser/esm2015/platform-browser.js");
var src_1 = __webpack_require__("../src/index.ts");
var animations_1 = __webpack_require__("../node_modules/@angular/platform-browser/esm2015/animations.js");
var flex_layout_1 = __webpack_require__("../node_modules/@angular/flex-layout/esm2015/flex-layout.js");
var material_module_1 = __webpack_require__("./app/material.module.ts");
var kitchensink_component_1 = __webpack_require__("./app/components/kitchensink/kitchensink.component.ts");
var examples_component_1 = __webpack_require__("../tools/components/examples/examples.component.ts");
var example_1 = __webpack_require__("../node_modules/@firestitch/example/package/index.js");
var api_1 = __webpack_require__("../node_modules/@firestitch/api/api.umd.js");
var router_1 = __webpack_require__("../node_modules/@angular/router/esm2015/router.js");
var PlaygroundModule = (function () {
    function PlaygroundModule() {
    }
    PlaygroundModule = __decorate([
        core_1.NgModule({
            bootstrap: [app_component_1.AppComponent],
            imports: [
                platform_browser_1.BrowserModule,
                src_1.FsListModule,
                animations_1.BrowserAnimationsModule,
                material_module_1.AppMaterialModule,
                forms_1.FormsModule,
                flex_layout_1.FlexLayoutModule,
                example_1.FsExampleModule,
                api_1.FsApiModule,
                router_1.RouterModule.forRoot([
                    { path: '', component: app_component_1.AppComponent }
                ])
            ],
            entryComponents: [],
            declarations: [
                app_component_1.AppComponent,
                kitchensink_component_1.KitchenSinkComponent,
                examples_component_1.FsExamplesComponent
            ],
            providers: [],
        })
    ], PlaygroundModule);
    return PlaygroundModule;
}());
exports.PlaygroundModule = PlaygroundModule;


/***/ })

},["./main.ts"]);
//# sourceMappingURL=main.map