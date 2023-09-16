import { readFileSync } from "fs";
const commands = readFileSync(`day23smalltest.txt`, "utf-8")
  .split("\r\n")
  .map((a) => a.split(""));

class Board {
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
  constructor(x, y, board) {
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
      //check
      for (let j = 0; j < 3; j++) {
        console.log(
          this.y,
          this.y,
          i,
          this.x + Elf.moves[(i + this.moveIndex) % 4].checks[j].x,
          this.y + Elf.moves[(i + this.moveIndex) % 4].checks[j].y
        );
        if (
          this.board.tilesWithElves.has(
            `${this.x + Elf.moves[(i + this.moveIndex) % 4].checks[j].x}-${
              this.y + Elf.moves[(i + this.moveIndex) % 4].checks[j].y
            }`
          )
        ) {
          continue;
        }
      }
      this.proposedMovement = Elf.moves[(i + this.moveIndex) % 4].movement;
    }
  }
}

const board = new Board();

for (let i = 0; i < commands.length; i++) {
  for (let j = 0; j < commands[0].length; j++) {
    if (commands[i][j] === "#") {
      new Elf(i, j, board);
    }
  }
}

// console.log(board.tilesWithElves);
board.askForMovementProposals();
// console.log(board.elves.map((e) => e.proposedMovement));
