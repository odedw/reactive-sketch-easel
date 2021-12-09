export class Matrix<T> {
  w: number;
  h: number;
  values: T[][] = [];
  size: number;
  constructor(w: number, h: number, init: (i: number, j: number) => T) {
    this.w = w;
    this.h = h;
    // this.values = Array(h).fill(Array(w).fill(zero));
    for (let i = 0; i < h; i++) {
      if (!this.values[i]) {
        this.values[i] = [];
      }
      for (let j = 0; j < w; j++) {
        this.values[i][j] = init(i, j);
      }
    }
    this.size = w * h;
  }

  get(i: number, j: number): T {
    return this.values[i][j];
  }

  set(i: number, j: number, value: T) {
    this.values[i][j] = value;
  }

  randomIndex() {
    return {
      i: Math.floor(Math.random() * this.h),
      j: Math.floor(Math.random() * this.w),
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
    if (i + 1 < this.h) {
      result.push({ i: i + 1, j });
    }
    if (j - 1 >= 0) {
      result.push({ i: i, j: j - 1 });
    }
    if (j + 1 < this.w) {
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
    return new Matrix<T>(this.w, this.h, (i, j) => {
      let item = this.get(i, j);
      item = item['clone'] ? item['clone']() : item;
      return item;
    });
  }
}
