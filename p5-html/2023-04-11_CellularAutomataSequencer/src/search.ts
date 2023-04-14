export class Game {
  cols: number;
  rows: number;
  board: Array<Array<number>>;
  initialBoard: Array<Array<number>>;
  constructor(cols: number, rows: number) {
    this.cols = cols;
    this.rows = rows;
    this.board = Array.from(Array(rows).keys()).map((_) => Array(cols).fill(0));
    this.initialBoard = Array.from(Array(rows).keys()).map((_) => Array(cols).fill(0));
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        this.board[y][x] = Math.round(Math.random());
        this.initialBoard[y][x] = this.board[y][x];
      }
    }
  }

  step(): boolean {
    const newBoard = this.board.map((row, cellY) => {
      return row.map((cell, cellX) => {
        let numberOfLiveNeighbours = 0;
        for (let y = cellY - 1; y <= cellY + 1; y++) {
          for (let x = cellX - 1; x <= cellX + 1; x++) {
            if (y === cellY && x === cellX) continue;
            numberOfLiveNeighbours += this.board?.[y]?.[x] || 0;
          }
        }

        if (cell && [2, 3].includes(numberOfLiveNeighbours)) return 1;

        if (!cell && numberOfLiveNeighbours === 3) return 1;

        return 0;
      });
    });
    let changed = false;
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        if (this.board[y][x] !== newBoard[y][x]) {
          changed = true;
          break;
        }
      }
    }
    this.board = newBoard;
    return changed;
  }
}

export function findInitialState(target: number, rows: number, cols: number) {
  let steps = 0;
  let game = new Game(rows, cols);
  let changed = false;
  do {
    changed = game.step();
    steps++;
    // if (steps % 10 === 0) console.log(steps);
    if ((steps === target + 1 && changed) || (steps <= target && !changed)) {
      game = new Game(rows, cols);
      steps = 0;
      changed = true;
    }
  } while (changed);

  return game.initialBoard;
}

export function findOscillator(target: number, rows: number, cols: number) {
  let steps = 0;
  let game = new Game(rows, cols);
  let isOsc = false;
  do {
    for (let i = 0; i < target; i++) {
      game.step();
    }
    isOsc = true;
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        if (game.board[y][x] !== game.initialBoard[y][x]) {
          isOsc = false;
          break;
        }
      }
    }
    if (steps % 10 === 0) console.log(steps);
    steps++;
  } while (!isOsc);

  return game.initialBoard;
}

export function boardToString(board: number[][]) {
  let str = '';
  for (let y = 0; y < board.length; y++) {
    const row = board[y].map((c) => `${c}`).join('');
    // console.log(row);
    str += row;
  }
  console.log(str);
  return str;
}
// console.log('===========================');
// console.log(boardToString(findOscillator(5, 6, 6)));
// console.log('===========================');
