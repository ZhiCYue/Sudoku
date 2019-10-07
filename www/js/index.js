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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/core/checker.js":
/*!********************************!*\
  !*** ./src/js/core/checker.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 检查数独的解决方案

function checkArray(array) {
  const length = array.length;
  const marks = new Array(length);
  marks.fill(true);

  for (let i = 0; i < length - 1; i++) {
    if (!marks[i]) {
      continue;
    }

    const v = array[i];
    // 是否有效， 0 - 无效， 1-9 有效
    if (!v) {
      marks[i] = false;
      continue;
    }

    // 是否有重复: i + 1 - 9， 是否有重复
    for (let j = i + 1; j < length; j++) {
      if (v === array[j]) {
        marks[i] = marks[j] = false;
      }
    }
  }

  return marks;
}

const Toolkit = __webpack_require__(/*! ./toolkit */ "./src/js/core/toolkit.js");

// 输入： matrix， 用户完成的数据，9 x 9
// 处理： 对 matrix 行、列、宫进行检查，并填写 marks
// 输出： 检查是否成功、marks
module.exports = class Checker {
  constructor(matrix) {
    this._matrix = matrix;
    this._matrixMarks = Toolkit.matrix.makeMatrix(true);
  }

  get matrixMarks() {
    return this._matrixMarks;
  }

  get isSuccess() {
    return this._success;
  }

  check() {
    this.checkRows();
    this.checkCols();
    this.checkBoxes();

    this._success = this._matrixMarks.every(row => row.every(mark => mark));
    return this._success;
  }

  checkRows() {
    for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
      const row = this._matrix[rowIndex];
      const marks = checkArray(row);

      for (let colIndex = 0; colIndex < marks.length; colIndex++) {
        if (!marks[colIndex]) {
          this._matrixMarks[rowIndex][colIndex] = false;
        }
      }
    }
  }

  checkCols() {
    for (let colIndex = 0; colIndex < 9; colIndex++) {
      const cols = [];
      for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
        cols[rowIndex] = this._matrix[rowIndex][colIndex];
      }

      const marks = checkArray(cols);
      for (let rowIndex = 0; rowIndex < marks.length; rowIndex++) {
        if (!marks[rowIndex]) {
          this._matrixMarks[rowIndex][colIndex] = false;
        }
      }
    }
  }

  checkBoxes() {
    for (let boxIndex = 0; boxIndex < 9; boxIndex++) {
      const boxes = Toolkit.box.getBoxCells(this._matrix, boxIndex);
      const marks = checkArray(boxes);
      for (let cellIndex = 0; cellIndex < 9; cellIndex++) {
        const { rowIndex, colIndex } = Toolkit.box.convertFromBoxIndex(boxIndex, cellIndex);

        if (!marks[cellIndex]) {
          this._matrixMarks[rowIndex][colIndex] = false;
        }
      }
    }
  }
};

/***/ }),

/***/ "./src/js/core/generator.js":
/*!**********************************!*\
  !*** ./src/js/core/generator.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 生成数独解决方案
const Toolkit = __webpack_require__(/*! ./toolkit */ "./src/js/core/toolkit.js");

module.exports = class Generator {

  generate() {
    while (!this.internalGenerate()) {
      console.warn("try again.");
    }
  }

  internalGenerate() {
    this.matrix = Toolkit.matrix.makeMatrix();
    this.orders = Toolkit.matrix.makeMatrix().map(row => row.map((v, i) => i)).map(row => Toolkit.matrix.shuffle(row));

    return Toolkit.matrix.makeRow().every((n, i) => this.fillNumber(i + 1));
  }

  fillNumber(n) {
    return this.fillRow(n, 0);
  }

  fillRow(n, rowIndex) {
    if (rowIndex > 8) return true;

    const row = this.matrix[rowIndex];
    const orders = this.orders[rowIndex];
    for (let i = 0; i < 9; i++) {
      const colIndex = orders[i];
      // 如果该位置已经有值，跳过
      if (row[colIndex]) {
        continue;
      }

      // 检查这个位置是否可以填写
      if (!Toolkit.matrix.checkFillable(this.matrix, n, rowIndex, colIndex)) {
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

};

/***/ }),

/***/ "./src/js/core/sudoku.js":
/*!*******************************!*\
  !*** ./src/js/core/sudoku.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 生成数独游戏
// 1. 生成完整的解决方案：generator
// 2. 随机去除部分数据：按比例

const Generator = __webpack_require__(/*! ../core/generator */ "./src/js/core/generator.js");

module.exports = class Sudoku {

  constructor() {
    const generator = new Generator();
    generator.generate();
    this.solutionMatrix = generator.matrix;
  }

  make(level = 5) {
    this.puzzleMatrix = this.solutionMatrix.map(row => row.map(cell => {
      return Math.random() * 9 < level ? 0 : cell;
    }));
  }

};

/***/ }),

/***/ "./src/js/core/toolkit.js":
/*!********************************!*\
  !*** ./src/js/core/toolkit.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * 矩阵和数组相关的工具
 */
const matrixToolkit = {

  makeRow(v = 0) {
    const array = new Array(9);
    array.fill(v);
    return array;
  },

  makeMatrix(v = 0) {
    return Array.from({ length: 9 }, () => this.makeRow(v));
  },

  /**
   * Fisher-Yates 洗牌算法
   * @param {*} array 
   */
  shuffle(array) {
    const endIndex = array.length - 2;
    for (let i = 0; i <= endIndex; i++) {
      const j = i + Math.floor(Math.random() * (array.length - i));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  },

  /**
   * 检查是否可填写数值
   */
  checkFillable(matrix, n, rowIndex, colIndex) {
    const row = matrix[rowIndex];
    const column = this.makeRow().map((v, i) => matrix[i][colIndex]);
    const { boxIndex } = boxToolkit.convertToBoxIndex(rowIndex, colIndex);
    const box = boxToolkit.getBoxCells(matrix, boxIndex);
    for (let i = 0; i < 9; i++) {
      if (row[i] === n || column[i] === n || box[i] === n) {
        return false;
      }
    }

    return true;
  }

};

/**
 * 宫坐标系工具
 */
const boxToolkit = {
  getBoxCells(matrix, boxIndex) {
    const startRowIndex = Math.floor(boxIndex / 3) * 3;
    const startColIndex = boxIndex % 3 * 3;
    const result = [];
    for (let cellIndex = 0; cellIndex < 9; cellIndex++) {
      const rowIndex = startRowIndex + Math.floor(cellIndex / 3);
      const colIndex = startColIndex + cellIndex % 3;
      result.push(matrix[rowIndex][colIndex]);
    }

    return result;
  },

  convertToBoxIndex(rowIndex, colIndex) {
    return {
      boxIndex: Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3),
      cellIndex: rowIndex % 3 * 3 + colIndex % 3
    };
  },

  convertFromBoxIndex(boxIndex, cellIndex) {
    return {
      rowIndex: Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3),
      colIndex: boxIndex % 3 * 3 + cellIndex % 3
    };
  }
};

// 工具类
module.exports = class Toolkit {
  /**
   * 矩阵和数组相关的工具
   */
  static get matrix() {
    return matrixToolkit;
  }

  /**
   * 宫坐标系工具
   */
  static get box() {
    return boxToolkit;
  }
};

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Grid = __webpack_require__(/*! ./ui/grid */ "./src/js/ui/grid.js");
const PopupNumbers = __webpack_require__(/*! ./ui/popupnumbers */ "./src/js/ui/popupnumbers.js");

const grid = new Grid($("#container"));
grid.build();
// 这里直接用 css 实现高度自适应宽度
// grid.layout();

const popupNumbers = new PopupNumbers($("#popupNumbers"));
grid.bindPopup(popupNumbers);

$("#check").on("click", () => {
  if (grid.check()) {
    alert("成功");
  }
});

$("#reset").on("click", () => {
  grid.reset();
});

$("#clear").on("click", () => {
  grid.clear();
});

$("#rebuild").on("click", () => {
  grid.rebuild();
});

/***/ }),

/***/ "./src/js/ui/grid.js":
/*!***************************!*\
  !*** ./src/js/ui/grid.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 生成九宫格

const Sudoku = __webpack_require__(/*! ../core/sudoku */ "./src/js/core/sudoku.js");
const Checker = __webpack_require__(/*! ../core/checker */ "./src/js/core/checker.js");

class Grid {
  constructor(container) {
    this._$container = container;
  }

  build() {
    const sudoku = new Sudoku();
    sudoku.make();
    const matrix = sudoku.puzzleMatrix;

    const rowGroupClasses = ["row_g_top", "row_g_middle", "row_g_bottom"];
    const colGroupCleasses = ["col_g_left", "col_g_center", "col_g_right"];

    const $cells = matrix.map(rowValues => rowValues.map((cellValue, colIndex) => {
      return $("<span>").addClass(colGroupCleasses[colIndex % 3]).addClass(cellValue ? "fixed" : "empty").text(cellValue);
    }));

    const $divArray = $cells.map(($spanArray, rowIndex) => {
      return $("<div>").addClass("row").addClass(rowGroupClasses[rowIndex % 3]).append($spanArray);
    });

    this._$container.append($divArray);
  }

  layout() {
    const width = $("span:first", this._$container).width;
    $("span", this._$container).height(width).css({
      "line-height": `${width}px`,
      "font-size": widht < 32 ? `${width / 2}px` : `${width}`
    });
  }

  /**
   * 检查结果
   */
  check() {
    const $rows = this._$container.children();
    // tip: map 是 jquery 的 map
    const data = $rows.map((rowIndex, div) => {
      return $(div).children().map((colIndex, span) => parseInt($(span).text()) || 0);
    }).toArray().map($data => $data.toArray());

    const checker = new Checker(data);
    if (checker.check()) {
      return true;
    }

    // 检查不成功，进行标记
    const marks = checker.matrixMarks;
    this._$container.children().each((rowIndex, div) => {
      $(div).children().each((colIndex, span) => {
        const $span = $(span);
        if ($span.is(".fixed") || marks[rowIndex][colIndex]) {
          $span.removeClass("error");
        } else {
          $(span).addClass("error");
        }
      });
    });
  }

  reset() {
    this._$container.find("span:not(.fixed)").removeClass("error mark1 mark2").addClass("empty").text(0);
  }

  /**
   * 清理错误标记
   */
  clear() {
    this._$container.find("span.error").removeClass("error");
  }

  /**
   * 重建新的迷盘，开始新的一局
   */
  rebuild() {
    this._$container.empty();
    this.build();
    // this.layout();
  }

  bindPopup(popupNumbers) {
    this._$container.on("click", "span", e => {
      const $cell = $(e.target);
      if ($cell.is(".fixed")) {
        return;
      }
      popupNumbers.popup($cell);
    });
  }
}

module.exports = Grid;

/***/ }),

/***/ "./src/js/ui/popupnumbers.js":
/*!***********************************!*\
  !*** ./src/js/ui/popupnumbers.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// 处理弹出的操作面板

module.exports = class PopupNumbers {

  constructor($panel) {
    this._$panel = $panel.hide().removeClass("hidden");

    this._$panel.on("click", "span", e => {
      const $cell = this._$targetCell;
      const $span = $(e.target);
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

      this.hide();
    });
  }

  popup($cell) {
    this._$targetCell = $cell;
    const { left, top } = $cell.position();
    this._$panel.css({
      left: `${left}px`,
      top: `${top}px`
    }).show();
  }

  hide() {
    this._$panel.hide();
  }

};

/***/ })

/******/ });
//# sourceMappingURL=index.js.map