const Grid = require("./ui/grid")
const PopupNumbers = require("./ui/popupnumbers")

const grid = new Grid($("#container"))
grid.build()
// 这里直接用 css 实现高度自适应宽度
// grid.layout();

const popupNumbers = new PopupNumbers($("#popupNumbers"))
grid.bindPopup(popupNumbers)

$("#check").on("click", () => {
  if (grid.check()) {
    alert("成功")
  }
})

$("#reset").on("click", () => {
  grid.reset()
})

$("#clear").on("click", () => {
  grid.clear()
})

$("#rebuild").on("click", () => {
  grid.rebuild()
})