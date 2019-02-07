// 生成数独游戏
// 1. 生成完整的解决方案：generator
// 2. 随机去除部分数据：按比例

const Generator = require("../core/generator");

module.exports = class Sudoku {

  constructor() {
    const generator = new Generator();
    generator.generate();
    this.solutionMatrix = generator.matrix;
  }

  make(level = 5) {
    this.puzzleMatrix = this.solutionMatrix.map(row => row.map(cell => {
      return Math.random() * 9 < level ? 0 : cell;
    }))
  }

};