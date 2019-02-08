// 生成数独游戏
// 1. 生成完整的解决方案：generator
// 2. 随机去除部分数据：按比例

import Generator from "../core/generator";

export class Sudoku {
  solutionMatrix: number[][];
  
  puzzleMatrix: number[][];

  constructor() {
    const generator = new Generator();
    generator.generate();
    this.solutionMatrix = generator.matrix;
  }

  make(level: number = 5) {
    this.puzzleMatrix = this.solutionMatrix.map(row => row.map(cell => {
      return Math.random() * 9 < level ? 0 : cell;
    }))
  }

};

export default Sudoku;