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
    this.createLine(false);
    this.createLine();
    this.createLine();
    this.createLine();
    this.numberOfPieces = 0;
    this.windIndex = 0;
  }
  createLine(isEmpty = true, piece) {
    let newLine;
    if (isEmpty) {
      newLine = ("#" + ".".repeat(this.dimensions - 2) + "#").split("");
    } else {
      if (piece === undefined) {
        newLine = "#".repeat(this.dimensions).split("");
      } else {
        newLine = piece.split("");
      }
    }
    this.lines.push(newLine);
  }

  print() {
    console.log(
      this.lines
        .reverse()
        .map((a) => a.join(""))
        .join("\n")
    );
  }
}

class Piece {
  constructor(board) {
    this.board = board;
    const pieceType = (board.numberOfPieces % 5) + 1;

    this.cells = [];
    const heightBefore = board.lines.length;
    switch (pieceType) {
      case 1:
        this.cells.push(new Cell(3, heightBefore + 1));
        this.cells.push(new Cell(4, heightBefore + 1));
        this.cells.push(new Cell(5, heightBefore + 1));
        this.cells.push(new Cell(6, heightBefore + 1));
        break;
      case 2:
        this.cells.push(new Cell(4, heightBefore + 3));
        this.cells.push(new Cell(3, heightBefore + 2));
        this.cells.push(new Cell(4, heightBefore + 2));
        this.cells.push(new Cell(5, heightBefore + 2));
        this.cells.push(new Cell(4, heightBefore + 1));
        break;
      case 3:
        this.cells.push(new Cell(5, heightBefore + 3));
        this.cells.push(new Cell(5, heightBefore + 2));
        this.cells.push(new Cell(5, heightBefore + 1));
        this.cells.push(new Cell(4, heightBefore + 1));
        this.cells.push(new Cell(3, heightBefore + 1));
        break;
      case 4:
        this.cells.push(new Cell(3, heightBefore + 4));
        this.cells.push(new Cell(3, heightBefore + 3));
        this.cells.push(new Cell(3, heightBefore + 2));
        this.cells.push(new Cell(3, heightBefore + 1));
        break;
      case 5:
        this.cells.push(new Cell(3, heightBefore + 2));
        this.cells.push(new Cell(4, heightBefore + 2));
        this.cells.push(new Cell(3, heightBefore + 1));
        this.cells.push(new Cell(4, heightBefore + 1));
        break;
      default:
        break;
    }
    this.fallDown();
  }
  fallDown() {
    const stop = this.cells.some(
      (cell) =>
        this.board.lines[cell.y - 1] &&
        this.board.lines[cell.y - 1][cell.x] != "."
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
          (this.board.lines[cell.y] &&
            this.board.lines[cell.y][cell.x + 1] != ".")
      );

      if (!stop) {
        for (let cell of this.cells) {
          cell.x = cell.x + 1;
        }
      }
    } else {
      const stop = this.cells.some(
        (cell) =>
          cell.x === 1 ||
          (this.board.lines[cell.y] &&
            this.board.lines[cell.y][cell.x - 1] != ".")
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
    const maxY = Math.max(...this.cells.map((a) => a.y));
    const boardHeight = this.board.lines.length;
    const linesToAdd = maxY + 3 - boardHeight;

    for (let i = 0; i <= linesToAdd; i++) {
      this.board.createLine();
    }

    for (let cell of this.cells) {
      this.board.lines[cell.y][cell.x] = "#";
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
  const board = new Board(9);
  while (board.numberOfPieces < n) {
    new Piece(board);
  }
  console.log(board.lines.length - 4);
}

function partOne() {
  addNPieces(2022);
}
partOne();
