export class Game {
  x: number;
  y: number;
  cols: number;
  rows: number;
  board: Array<Array<number>>;
  w: number;
  h: number;
  colSize: number;
  rowSize: number;
  opacity = 1;
  cycle: number;
  loop: boolean;
  initialBoard: Array<Array<number>>;
  initialSum: number;
  constructor(x: number, y: number, w: number, h: number, cols: number, rows: number, state?: string, loop = true) {
    this.x = x;
    this.y = y;
    this.cols = cols;
    this.rows = rows;
    this.w = w;
    this.h = h;
    this.loop = loop;
    this.board = Array.from(Array(rows).keys()).map((_) => Array(cols).fill(0));
    this.initialBoard = Array.from(Array(rows).keys()).map((_) => Array(cols).fill(0));
    this.initialSum = 0;
    this.cycle = int(random(20, 80));
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        if (state) {
          this.board[y][x] = state[y * this.cols + x] === '1' ? 1 : 0;
        } else {
          this.board[y][x] = round(random());
        }
        this.initialBoard[y][x] = this.board[y][x];
        this.initialSum += this.board[y][x];
      }
    }
    this.colSize = this.w / this.cols;
    this.rowSize = this.h / this.rows;
    this.opacity = random(0.5, 1);
  }

  draw() {
    noStroke();
    fill(0, this.opacity * 255);
    push();
    translate(this.x, this.y);
    rectMode(CENTER);
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        if (this.board[y][x] === 1) {
          rect(
            x * this.colSize - this.w / 2 + this.colSize / 2,
            y * this.rowSize - this.h / 2 + this.rowSize / 2,
            this.colSize,
            this.rowSize
          );
        }
      }
    }
    // this.opacity -= 0.02;
    pop();
  }

  step() {
    // this.opacity = 1;
    let sum = 0;
    const newBoard = this.board.map((row, cellY) => {
      return row.map((cell, cellX) => {
        let numberOfLiveNeighbours = 0;
        for (let y = cellY - 1; y <= cellY + 1; y++) {
          for (let x = cellX - 1; x <= cellX + 1; x++) {
            if (y === cellY && x === cellX) continue;
            numberOfLiveNeighbours += this.board?.[y]?.[x] || 0;
          }
        }
        let result = 0;
        if (cell && [2, 3].includes(numberOfLiveNeighbours)) result = 1;

        if (!cell && numberOfLiveNeighbours === 3) result = 1;
        sum += result;
        return result;
      });
    });

    // state changed
    let changed = false;
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        if (this.board[y][x] !== newBoard[y][x]) {
          changed = true;
          break;
        }
      }
    }
    if (!changed && this.loop) {
      this.reset();
      sum = this.initialSum;
    } else {
      this.board = newBoard;
    }

    return sum;
  }

  reset() {
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        this.board[y][x] = this.initialBoard[y][x];
      }
    }
  }
}
