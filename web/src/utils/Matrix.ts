export class Matrix<T> {
  cols: number;
  rows: number;
  values: T[][] = [];
  size: number;
  constructor(cols: number, rows: number, init: (row: number, col: number) => T) {
    this.cols = cols;
    this.rows = rows;
    // this.values = Array(h).fill(Array(w).fill(zero));
    for (let i = 0; i < rows; i++) {
      if (!this.values[i]) {
        this.values[i] = [];
      }
      for (let j = 0; j < cols; j++) {
        this.values[i][j] = init(i, j);
      }
    }
    this.size = cols * rows;
  }

  get(row: number, col: number): T {
    return this.values[row][col];
  }

  set(i: number, j: number, value: T) {
    this.values[i][j] = value;
  }

  randomIndex() {
    return {
      i: Math.floor(Math.random() * this.rows),
      j: Math.floor(Math.random() * this.cols),
    };
  }

  items() {
    return this.values.flatMap((a) => a);
  }

  getNeighborIndices(i: number, j: number): { i: number; j: number }[] {
    const result = [];
    if (i - 1 >= 0) {
      result.push({ i: i - 1, j });
    }
    if (i + 1 < this.rows) {
      result.push({ i: i + 1, j });
    }
    if (j - 1 >= 0) {
      result.push({ i: i, j: j - 1 });
    }
    if (j + 1 < this.cols) {
      result.push({ i: i, j: j + 1 });
    }
    return result;
  }

  switch(i1: number, j1: number, i2: number, j2: number) {
    const temp = this.values[i1][j1];
    this.values[i1][j1] = this.values[i2][j2];
    this.values[i2][j2] = temp;
  }

  clone(): Matrix<T> {
    return new Matrix<T>(this.cols, this.rows, (i, j) => {
      let item = this.get(i, j);
      item = item['clone'] ? item['clone']() : item;
      return item;
    });
  }

  forEach(cb: (item: T, row: number, col: number) => void) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        cb(this.get(i, j), i, j);
      }
    }
  }
}
