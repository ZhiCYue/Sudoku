// 生成九宫格

import Sudoku from "../core/sudoku";
import Checker from "../core/checker";
import PopupNumbers from "./popupnumbers";

class Grid {
  private _$container: JQuery;

  constructor(container: JQuery) {
    this._$container = container;
  }

  build() {
    const sudoku = new Sudoku();
    sudoku.make();
    const matrix = sudoku.puzzleMatrix;

    const rowGroupClasses = ["row_g_top", "row_g_middle", "row_g_bottom"];
    const colGroupCleasses = ["col_g_left", "col_g_center", "col_g_right"];

    const $cells = matrix.map(rowValues => rowValues
      .map((cellValue, colIndex) => {
          return $("<span>")
              .addClass(colGroupCleasses[colIndex % 3])
              .addClass(cellValue ? "fixed" : "empty")
              .text(cellValue);
    }));

    const $divArray = $cells.map(($spanArray, rowIndex) => {
      return $("<div>")
              .addClass("row")
              .addClass(rowGroupClasses[rowIndex % 3])
              .append($spanArray);
    })

    this._$container.append($divArray);
  }

  layout() {
    const width = $("span:first", this._$container).width();
    $("span", this._$container)
      .height(width)
      .css({
        "line-height": `${width}px`,
        "font-size": width < 32 ? `${width / 2}px` : `${width}`
      });
  }

  /**
   * 检查结果
   */
  check() {
    const data = this._$container.children()
        .toArray()
        .map((div: HTMLElement): number[] => {
          return $(div).children()
              .toArray()
              .map(span => parseInt($(span).text(), 10) || 0);
        });

    const checker = new Checker(data);
    if (checker.check()) {
      return true;
    }

    // 检查不成功，进行标记
    const marks = checker.matrixMarks;
    this._$container.children()
        .each((rowIndex, div) => {
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
    this._$container.find("span:not(.fixed)")
        .removeClass("error mark1 mark2")
        .addClass("empty")
        .text(0);
  }

  /**
   * 清理错误标记
   */
  clear() {
    this._$container.find("span.error")
        .removeClass("error");
  }

  /**
   * 重建新的迷盘，开始新的一局
   */
  rebuild() {
    this._$container.empty();
    this.build();
    // this.layout();
  }

  bindPopup(popupNumbers: PopupNumbers) {
    this._$container.on("click", "span", e => {
      const $cell = $(e.target);
      if ($cell.is(".fixed")) {
        return;
      }
      popupNumbers.popup($cell);
    })
  }
}

export { Grid };
export default Grid;