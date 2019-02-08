/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/core/checker.ts":
/*!****************************!*\
  !*** ./js/core/checker.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 检查数独的解决方案

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __importDefault = undefined && undefined.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
function checkArray(array) {
    var length = array.length;
    var marks = new Array(length);
    marks.fill(true);
    for (var i = 0; i < length - 1; i++) {
        if (!marks[i]) {
            continue;
        }
        var v = array[i];
        // 是否有效， 0 - 无效， 1-9 有效
        if (!v) {
            marks[i] = false;
            continue;
        }
        // 是否有重复: i + 1 - 9， 是否有重复
        for (var j = i + 1; j < length; j++) {
            if (v === array[j]) {
                marks[i] = marks[j] = false;
            }
        }
    }
    return marks;
}
var toolkit_1 = __importDefault(__webpack_require__(/*! ./toolkit */ "./js/core/toolkit.ts"));
// 输入： matrix， 用户完成的数据，9 x 9
// 处理： 对 matrix 行、列、宫进行检查，并填写 marks
// 输出： 检查是否成功、marks

var Checker = function () {
    function Checker(matrix) {
        _classCallCheck(this, Checker);

        this._success = false;
        this._matrix = matrix;
        this._matrixMarks = toolkit_1.default.matrix.makeMatrix(true);
    }

    _createClass(Checker, [{
        key: "check",
        value: function check() {
            this.checkRows();
            this.checkCols();
            this.checkBoxes();
            this._success = this._matrixMarks.every(function (row) {
                return row.every(function (mark) {
                    return mark;
                });
            });
            return this._success;
        }
    }, {
        key: "checkRows",
        value: function checkRows() {
            for (var rowIndex = 0; rowIndex < 9; rowIndex++) {
                var row = this._matrix[rowIndex];
                var marks = checkArray(row);
                for (var colIndex = 0; colIndex < marks.length; colIndex++) {
                    if (!marks[colIndex]) {
                        this._matrixMarks[rowIndex][colIndex] = false;
                    }
                }
            }
        }
    }, {
        key: "checkCols",
        value: function checkCols() {
            for (var colIndex = 0; colIndex < 9; colIndex++) {
                var cols = [];
                for (var rowIndex = 0; rowIndex < 9; rowIndex++) {
                    cols[rowIndex] = this._matrix[rowIndex][colIndex];
                }
                var marks = checkArray(cols);
                for (var _rowIndex = 0; _rowIndex < marks.length; _rowIndex++) {
                    if (!marks[_rowIndex]) {
                        this._matrixMarks[_rowIndex][colIndex] = false;
                    }
                }
            }
        }
    }, {
        key: "checkBoxes",
        value: function checkBoxes() {
            for (var boxIndex = 0; boxIndex < 9; boxIndex++) {
                var boxes = toolkit_1.default.box.getBoxCells(this._matrix, boxIndex);
                var marks = checkArray(boxes);
                for (var cellIndex = 0; cellIndex < 9; cellIndex++) {
                    var _toolkit_1$default$bo = toolkit_1.default.box.convertFromBoxIndex(boxIndex, cellIndex),
                        rowIndex = _toolkit_1$default$bo.rowIndex,
                        colIndex = _toolkit_1$default$bo.colIndex;

                    if (!marks[cellIndex]) {
                        this._matrixMarks[rowIndex][colIndex] = false;
                    }
                }
            }
        }
    }, {
        key: "matrixMarks",
        get: function get() {
            return this._matrixMarks;
        }
    }, {
        key: "isSuccess",
        get: function get() {
            return this._success;
        }
    }]);

    return Checker;
}();

exports.Checker = Checker;
;
exports.default = Checker;

/***/ }),

/***/ "./js/core/generator.ts":
/*!******************************!*\
  !*** ./js/core/generator.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __importDefault = undefined && undefined.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// 生成数独解决方案
var toolkit_1 = __importDefault(__webpack_require__(/*! ./toolkit */ "./js/core/toolkit.ts"));

var Generator = function () {
    function Generator() {
        _classCallCheck(this, Generator);
    }

    _createClass(Generator, [{
        key: "generate",
        value: function generate() {
            while (!this.internalGenerate()) {
                console.warn("try again.");
            }
        }
    }, {
        key: "internalGenerate",
        value: function internalGenerate() {
            var _this = this;

            this.matrix = toolkit_1.default.matrix.makeMatrix();
            this.orders = toolkit_1.default.matrix.makeMatrix().map(function (row) {
                return row.map(function (v, i) {
                    return i;
                });
            }).map(function (row) {
                return toolkit_1.default.matrix.shuffle(row);
            });
            return toolkit_1.default.matrix.makeRow().every(function (n, i) {
                return _this.fillNumber(i + 1);
            });
        }
    }, {
        key: "fillNumber",
        value: function fillNumber(n) {
            return this.fillRow(n, 0);
        }
    }, {
        key: "fillRow",
        value: function fillRow(n, rowIndex) {
            if (rowIndex > 8) return true;
            var row = this.matrix[rowIndex];
            var orders = this.orders[rowIndex];
            for (var i = 0; i < 9; i++) {
                var colIndex = orders[i];
                // 如果该位置已经有值，跳过
                if (row[colIndex]) {
                    continue;
                }
                // 检查这个位置是否可以填写
                if (!toolkit_1.default.matrix.checkFillable(this.matrix, n, rowIndex, colIndex)) {
                    continue;
                }
                row[colIndex] = n;
                // 去下一行填写 n， 如果没有填写进去， 就继续寻找当前行下一个位置
                if (!this.fillRow(n, rowIndex + 1)) {
                    row[colIndex] = 0;
                    continue;
                }
                return true;
            }
        }
    }]);

    return Generator;
}();

exports.Generator = Generator;
;
exports.default = Generator;

/***/ }),

/***/ "./js/core/sudoku.ts":
/*!***************************!*\
  !*** ./js/core/sudoku.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 生成数独游戏
// 1. 生成完整的解决方案：generator
// 2. 随机去除部分数据：按比例

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __importDefault = undefined && undefined.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var generator_1 = __importDefault(__webpack_require__(/*! ../core/generator */ "./js/core/generator.ts"));

var Sudoku = function () {
    function Sudoku() {
        _classCallCheck(this, Sudoku);

        var generator = new generator_1.default();
        generator.generate();
        this.solutionMatrix = generator.matrix;
    }

    _createClass(Sudoku, [{
        key: "make",
        value: function make() {
            var level = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5;

            this.puzzleMatrix = this.solutionMatrix.map(function (row) {
                return row.map(function (cell) {
                    return Math.random() * 9 < level ? 0 : cell;
                });
            });
        }
    }]);

    return Sudoku;
}();

exports.Sudoku = Sudoku;
;
exports.default = Sudoku;

/***/ }),

/***/ "./js/core/toolkit.ts":
/*!****************************!*\
  !*** ./js/core/toolkit.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 宫坐标系工具
 */
var boxToolkit = {
    getBoxCells: function getBoxCells(matrix, boxIndex) {
        var startRowIndex = Math.floor(boxIndex / 3) * 3;
        var startColIndex = boxIndex % 3 * 3;
        var result = [];
        for (var cellIndex = 0; cellIndex < 9; cellIndex++) {
            var rowIndex = startRowIndex + Math.floor(cellIndex / 3);
            var colIndex = startColIndex + cellIndex % 3;
            result.push(matrix[rowIndex][colIndex]);
        }
        return result;
    },
    convertToBoxIndex: function convertToBoxIndex(rowIndex, colIndex) {
        return {
            boxIndex: Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3),
            cellIndex: rowIndex % 3 * 3 + colIndex % 3
        };
    },
    convertFromBoxIndex: function convertFromBoxIndex(boxIndex, cellIndex) {
        return {
            rowIndex: Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3),
            colIndex: boxIndex % 3 * 3 + cellIndex % 3
        };
    }
};
/**
 * 矩阵和数组相关的工具
 */

var MatrixToolkit = function () {
    function MatrixToolkit() {
        _classCallCheck(this, MatrixToolkit);
    }

    _createClass(MatrixToolkit, null, [{
        key: "makeRow",
        value: function makeRow() {
            var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

            var array = new Array(9);
            array.fill(v);
            return array;
        }
    }, {
        key: "makeMatrix",
        value: function makeMatrix() {
            var _this = this;

            var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

            return Array.from({ length: 9 }, function () {
                return _this.makeRow(v);
            });
        }
        /**
         * Fisher-Yates 洗牌算法
         * @param {*} array
         */

    }, {
        key: "shuffle",
        value: function shuffle(array) {
            var endIndex = array.length - 2;
            for (var i = 0; i <= endIndex; i++) {
                var j = i + Math.floor(Math.random() * (array.length - i));
                var _ref = [array[j], array[i]];
                array[i] = _ref[0];
                array[j] = _ref[1];
            }
            return array;
        }
        /**
         * 检查是否可填写数值
         */

    }, {
        key: "checkFillable",
        value: function checkFillable(matrix, n, rowIndex, colIndex) {
            var row = matrix[rowIndex];
            var column = this.makeRow().map(function (v, i) {
                return matrix[i][colIndex];
            });

            var _boxToolkit$convertTo = boxToolkit.convertToBoxIndex(rowIndex, colIndex),
                boxIndex = _boxToolkit$convertTo.boxIndex;

            var box = boxToolkit.getBoxCells(matrix, boxIndex);
            for (var i = 0; i < 9; i++) {
                if (row[i] === n || column[i] === n || box[i] === n) {
                    return false;
                }
            }
            return true;
        }
    }]);

    return MatrixToolkit;
}();

;
// 工具类

var Toolkit = function () {
    function Toolkit() {
        _classCallCheck(this, Toolkit);
    }

    _createClass(Toolkit, null, [{
        key: "matrix",

        /**
         * 矩阵和数组相关的工具
         */
        get: function get() {
            return MatrixToolkit;
        }
        /**
         * 宫坐标系工具
         */

    }, {
        key: "box",
        get: function get() {
            return boxToolkit;
        }
    }]);

    return Toolkit;
}();

exports.Toolkit = Toolkit;
;
exports.default = Toolkit;

/***/ }),

/***/ "./js/index.ts":
/*!*********************!*\
  !*** ./js/index.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __importDefault = undefined && undefined.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var grid_1 = __importDefault(__webpack_require__(/*! ./ui/grid */ "./js/ui/grid.ts"));
var popupnumbers_1 = __importDefault(__webpack_require__(/*! ./ui/popupnumbers */ "./js/ui/popupnumbers.ts"));
var grid = new grid_1.default($("#container"));
grid.build();
// 这里直接用 css 实现高度自适应宽度
// grid.layout();
var popupNumbers = new popupnumbers_1.default($("#popupNumbers"));
grid.bindPopup(popupNumbers);
$("#check").on("click", function (e) {
    if (grid.check()) {
        alert("成功");
    }
});
$("#reset").on("click", function (e) {
    grid.reset();
});
$("#clear").on("click", function (e) {
    grid.clear();
});
$("#rebuild").on("click", function (e) {
    grid.rebuild();
});

/***/ }),

/***/ "./js/ui/grid.ts":
/*!***********************!*\
  !*** ./js/ui/grid.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 生成九宫格

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __importDefault = undefined && undefined.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sudoku_1 = __importDefault(__webpack_require__(/*! ../core/sudoku */ "./js/core/sudoku.ts"));
var checker_1 = __importDefault(__webpack_require__(/*! ../core/checker */ "./js/core/checker.ts"));

var Grid = function () {
    function Grid(container) {
        _classCallCheck(this, Grid);

        this._$container = container;
    }

    _createClass(Grid, [{
        key: "build",
        value: function build() {
            var sudoku = new sudoku_1.default();
            sudoku.make();
            var matrix = sudoku.puzzleMatrix;
            var rowGroupClasses = ["row_g_top", "row_g_middle", "row_g_bottom"];
            var colGroupCleasses = ["col_g_left", "col_g_center", "col_g_right"];
            var $cells = matrix.map(function (rowValues) {
                return rowValues.map(function (cellValue, colIndex) {
                    return $("<span>").addClass(colGroupCleasses[colIndex % 3]).addClass(cellValue ? "fixed" : "empty").text(cellValue);
                });
            });
            var $divArray = $cells.map(function ($spanArray, rowIndex) {
                return $("<div>").addClass("row").addClass(rowGroupClasses[rowIndex % 3]).append($spanArray);
            });
            this._$container.append($divArray);
        }
    }, {
        key: "layout",
        value: function layout() {
            var width = $("span:first", this._$container).width();
            $("span", this._$container).height(width).css({
                "line-height": width + "px",
                "font-size": width < 32 ? width / 2 + "px" : "" + width
            });
        }
        /**
         * 检查结果
         */

    }, {
        key: "check",
        value: function check() {
            var data = this._$container.children().toArray().map(function (div) {
                return $(div).children().toArray().map(function (span) {
                    return parseInt($(span).text(), 10) || 0;
                });
            });
            var checker = new checker_1.default(data);
            if (checker.check()) {
                return true;
            }
            // 检查不成功，进行标记
            var marks = checker.matrixMarks;
            this._$container.children().each(function (rowIndex, div) {
                $(div).children().each(function (colIndex, span) {
                    var $span = $(span);
                    if ($span.is(".fixed") || marks[rowIndex][colIndex]) {
                        $span.removeClass("error");
                    } else {
                        $(span).addClass("error");
                    }
                });
            });
        }
    }, {
        key: "reset",
        value: function reset() {
            this._$container.find("span:not(.fixed)").removeClass("error mark1 mark2").addClass("empty").text(0);
        }
        /**
         * 清理错误标记
         */

    }, {
        key: "clear",
        value: function clear() {
            this._$container.find("span.error").removeClass("error");
        }
        /**
         * 重建新的迷盘，开始新的一局
         */

    }, {
        key: "rebuild",
        value: function rebuild() {
            this._$container.empty();
            this.build();
            // this.layout();
        }
    }, {
        key: "bindPopup",
        value: function bindPopup(popupNumbers) {
            this._$container.on("click", "span", function (e) {
                var $cell = $(e.target);
                if ($cell.is(".fixed")) {
                    return;
                }
                popupNumbers.popup($cell);
            });
        }
    }]);

    return Grid;
}();

exports.Grid = Grid;
exports.default = Grid;

/***/ }),

/***/ "./js/ui/popupnumbers.ts":
/*!*******************************!*\
  !*** ./js/ui/popupnumbers.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 处理弹出的操作面板

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });

var PopupNumbers = function () {
    function PopupNumbers($panel) {
        var _this = this;

        _classCallCheck(this, PopupNumbers);

        this._$panel = $panel.hide().removeClass("hidden");
        this._$panel.on("click", "span", function (e) {
            var $cell = _this._$targetCell;
            var $span = $(e.target);
            if ($span.hasClass("mark1")) {
                // 回填样式
                if ($cell.hasClass("mark1")) {
                    $cell.removeClass("mark1");
                } else {
                    $cell.removeClass("mark2").addClass("mark1");
                }
            } else if ($span.hasClass("mark2")) {
                // 回填样式
                if ($cell.hasClass("mark2")) {
                    $cell.removeClass("mark2");
                } else {
                    $cell.removeClass("mark1").addClass("mark2");
                }
            } else if ($span.hasClass("empty")) {
                // 取消数字，取消mark
                $cell.text(0).addClass("empty");
            } else {
                // 1-9 回填数字
                $cell.removeClass("empty").text($span.text());
            }
            _this.hide();
        });
    }

    _createClass(PopupNumbers, [{
        key: "popup",
        value: function popup($cell) {
            this._$targetCell = $cell;

            var _$cell$position = $cell.position(),
                left = _$cell$position.left,
                top = _$cell$position.top;

            this._$panel.css({
                left: left + "px",
                top: top + "px"
            }).show();
        }
    }, {
        key: "hide",
        value: function hide() {
            this._$panel.hide();
        }
    }]);

    return PopupNumbers;
}();

exports.PopupNumbers = PopupNumbers;
;
exports.default = PopupNumbers;

/***/ })

/******/ });
//# sourceMappingURL=index.js.map