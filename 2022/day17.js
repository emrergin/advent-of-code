import { readFileSync } from "fs";
// const commands = readFileSync(`day17test.txt`, "utf-8")
const commands = readFileSync(`day17.txt`, "utf-8")
  .split("")
  .map((a) => (a === ">" ? 1 : 0));
const inputLength = commands.length;

class Board {
  constructor(dimensions) {
    this.dimensions = dimensions;
    this.lines = [];
    this.numberOfPieces = 0;
    this.windIndex = 0;
    this.height = 0;
    this.cells = new Set();
    this.cells.add(`${0}-${0}`);
    this.cells.add(`${1}-${0}`);
    this.cells.add(`${2}-${0}`);
    this.cells.add(`${3}-${0}`);
    this.cells.add(`${4}-${0}`);
    this.cells.add(`${5}-${0}`);
    this.cells.add(`${6}-${0}`);
  }
}

class Piece {
  constructor(board) {
    this.board = board;
    const pieceType = (board.numberOfPieces % 5) + 1;

    this.cells = [];
    const startingHeight = board.height + 4;
    switch (pieceType) {
      case 1:
        this.cells.push(new Cell(2, startingHeight + 1));
        this.cells.push(new Cell(3, startingHeight + 1));
        this.cells.push(new Cell(4, startingHeight + 1));
        this.cells.push(new Cell(5, startingHeight + 1));
        break;
      case 2:
        this.cells.push(new Cell(3, startingHeight + 3));
        this.cells.push(new Cell(2, startingHeight + 2));
        this.cells.push(new Cell(3, startingHeight + 2));
        this.cells.push(new Cell(4, startingHeight + 2));
        this.cells.push(new Cell(3, startingHeight + 1));
        break;
      case 3:
        this.cells.push(new Cell(4, startingHeight + 3));
        this.cells.push(new Cell(4, startingHeight + 2));
        this.cells.push(new Cell(4, startingHeight + 1));
        this.cells.push(new Cell(3, startingHeight + 1));
        this.cells.push(new Cell(2, startingHeight + 1));
        break;
      case 4:
        this.cells.push(new Cell(2, startingHeight + 4));
        this.cells.push(new Cell(2, startingHeight + 3));
        this.cells.push(new Cell(2, startingHeight + 2));
        this.cells.push(new Cell(2, startingHeight + 1));
        break;
      case 5:
        this.cells.push(new Cell(2, startingHeight + 2));
        this.cells.push(new Cell(3, startingHeight + 2));
        this.cells.push(new Cell(2, startingHeight + 1));
        this.cells.push(new Cell(3, startingHeight + 1));
        break;
      default:
        break;
    }
    this.fallDown();
  }
  fallDown() {
    const stop = this.cells.some((cell) =>
      this.board.cells.has(`${cell.x}-${cell.y - 1}`)
    );
    if (stop) {
      this.joinToBoard();
    } else {
      for (let cell of this.cells) {
        cell.y = cell.y - 1;
      }
      this.slide(this.board.windIndex);
    }
  }
  slide(windIndex) {
    const wind = commands[windIndex % inputLength];
    if (wind === 1) {
      const stop = this.cells.some(
        (cell) =>
          cell.x === this.board.dimensions - 1 ||
          this.board.cells.has(`${cell.x + 1}-${cell.y}`)
      );

      if (!stop) {
        for (let cell of this.cells) {
          cell.x = cell.x + 1;
        }
      }
    } else {
      const stop = this.cells.some(
        (cell) =>
          cell.x === 0 || this.board.cells.has(`${cell.x - 1}-${cell.y}`)
      );

      if (!stop) {
        for (let cell of this.cells) {
          cell.x = cell.x - 1;
        }
      }
    }

    this.board.windIndex++;
    this.fallDown();
  }
  joinToBoard() {
    for (let cell of this.cells) {
      this.board.cells.add(`${cell.x}-${cell.y}`);

      if (cell.y > this.board.height) {
        this.board.height = cell.y;
      }
    }

    this.board.numberOfPieces++;
  }
}

class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

function addNPieces(n) {
  const board = new Board(7);
  while (board.numberOfPieces < n) {
    new Piece(board);
  }
  console.log(board.height);
}

function catchCyclesWhileAdding(n) {
  const board = new Board(7);
  const lengths = [];
  while (board.numberOfPieces < n) {
    const prevHeight = board.height;
    new Piece(board);
    lengths.push(board.height - prevHeight);
    const cycle = catchCycle(lengths);
    if (cycle.start) {
      console.log(
        lengths.slice(0, cycle.start).reduce((acc, curr) => acc + curr) +
          lengths
            .slice(cycle.start, cycle.length + cycle.start)
            .reduce((acc, curr) => acc + curr) *
            Math.floor(n / cycle.length) +
          lengths
            .slice(cycle.start, cycle.start + (n % cycle.length) - cycle.start)
            .reduce((acc, curr) => acc + curr, 0)
      );
      break;
    }
  }
}

function catchCycle(array) {
  const len = array.length;
  outer: for (let k = 0; k < len / 3; k++) {
    if ((len - k) % 2 !== 0) {
      continue outer;
    }
    for (let i = k; i < (len + k) / 2; i++) {
      const j = (len - k) / 2 + i;
      if (array[i] !== array[j]) {
        continue outer;
      }
    }
    return { length: (len - k) / 2, start: k };
  }
  return { length: 0, start: null };
}

function partOne() {
  addNPieces(2022);
}
partOne();

function partTwo() {
  catchCyclesWhileAdding(1000000000000);
}

partTwo();
