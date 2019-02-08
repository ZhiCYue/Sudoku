// 处理弹出的操作面板

export class PopupNumbers {

  private _$panel: JQuery;

  private _$targetCell: JQuery;

  constructor($panel: JQuery) {
    this._$panel = $panel.hide().removeClass("hidden");

    this._$panel.on("click", "span", e => {
      const $cell = this._$targetCell;
      const $span = $(e.target);
      if ($span.hasClass("mark1")) {
        // 回填样式
        if ($cell.hasClass("mark1")) {
          $cell.removeClass("mark1");
        } else {
          $cell.removeClass("mark2")
              .addClass("mark1");
        }
      } else if ($span.hasClass("mark2")) {
        // 回填样式
        if ($cell.hasClass("mark2")) {
          $cell.removeClass("mark2");
        } else {
          $cell.removeClass("mark1")
            .addClass("mark2");
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

  popup($cell: JQuery) {
    this._$targetCell = $cell;
    const { left, top } = $cell.position();
    this._$panel.css({
        left: `${left}px`,
        top: `${top}px`
      })
      .show();
  }

  hide() {
    this._$panel.hide();
  }

};

export default PopupNumbers;