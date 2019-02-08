// 生成数独解决方案
import Toolkit from "./toolkit";

export class Generator {
  matrix: number[][];
  
  orders: number[][];

  generate(): void {
    while (!this.internalGenerate()) {
      console.warn("try again.");
    }
  }

  internalGenerate() {
    this.matrix = Toolkit.matrix.makeMatrix();
    this.orders = Toolkit.matrix.makeMatrix()
      .map(row => row.map((v, i) => i))
      .map(row => Toolkit.matrix.shuffle(row));

    return Toolkit.matrix.makeRow().every((n, i) => this.fillNumber(i + 1));
  }

  private fillNumber(n: number) {
    return this.fillRow(n, 0);
  }

  private fillRow(n: number, rowIndex: number) {
    if (rowIndex > 8) return true;

    const row = this.matrix[rowIndex];
    const orders = this.orders[rowIndex];
    for (let i=0; i<9; i++) {
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

export default Generator;