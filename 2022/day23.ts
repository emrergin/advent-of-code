import { readFileSync } from "fs";
const commands = readFileSync(`day23smalltest.txt`, "utf-8")
  .split("\r\n")
  .map((a) => a.split(""));

type Coordinate = { x: number; y: number };

class Board {
  tilesWithElves: Set<string>;
  elves: Elf[];
  constructor() {
    this.tilesWithElves = new Set();
    this.elves = [];
  }

  askForMovementProposals() {
    for (let elf of this.elves) {
      if (elf.checkIfAnyoneExists()) {
        elf.checkAndProposeMovement();
      }
    }
  }
}

class Elf {
  x: number;
  y: number;
  moveIndex: number;
  board: Board;
  proposedMovement: null | Coordinate;

  constructor(x: number, y: number, board: Board) {
    this.x = x;
    this.y = y;
    this.moveIndex = 0;
    this.board = board;
    this.proposedMovement = null;
    board.tilesWithElves.add(`${x}-${y}`);
    board.elves.push(this);
  }

  static moves = [
    {
      movement: { x: 0, y: -1 },
      checks: [
        { x: -1, y: -1 },
        { x: 0, y: -1 },
        { x: 1, y: -1 },
      ],
    },
    {
      movement: { x: 0, y: 1 },
      checks: [
        { x: -1, y: 1 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
      ],
    },
    {
      movement: { x: -1, y: 0 },
      checks: [
        { x: -1, y: -1 },
        { x: -1, y: 0 },
        { x: -1, y: 1 },
      ],
    },
    {
      movement: { x: 1, y: 0 },
      checks: [
        { x: 1, y: -1 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
      ],
    },
  ];

  checkIfAnyoneExists() {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) {
          continue;
        }
        if (this.board.tilesWithElves.has(`${this.x + i}-${this.y + j}`)) {
          return true;
        }
      }
    }
    return false;
  }

  checkAndProposeMovement() {
    for (let i = 0; i < 4; i++) {
      let relevantEmpty = true;
      //check
      for (let j = 0; j < 3; j++) {
        if (this.x === 1 && this.y === 3 && i == 0) {
          console.log(
            this.x + Elf.moves[(i + this.moveIndex) % 4].checks[j].x,
            this.y + Elf.moves[(i + this.moveIndex) % 4].checks[j].y
          );
        }
        if (
          this.board.tilesWithElves.has(
            `${this.x + Elf.moves[(i + this.moveIndex) % 4].checks[j].x}-${
              this.y + Elf.moves[(i + this.moveIndex) % 4].checks[j].y
            }`
          )
        ) {
          relevantEmpty = false;
          break;
        }
      }
      if (relevantEmpty) {
        this.proposedMovement = Elf.moves[(i + this.moveIndex) % 4].movement;
        break;
      }
    }
  }
}

const board = new Board();

for (let i = 0; i < commands.length; i++) {
  for (let j = 0; j < commands[0].length; j++) {
    if (commands[i][j] === "#") {
      new Elf(j, i, board);
    }
  }
}

board.askForMovementProposals();
console.log(
  board.elves.map((e) => ({ m: e.proposedMovement, x: e.x, y: e.y }))
);
console.log(board.tilesWithElves);
