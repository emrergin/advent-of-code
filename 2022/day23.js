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
    for (let elf in this.elves) {
      console.log(elf);
      if (elf.checkIfAnyoneExists()) {
        elf.checkAndProposeMovement();
      }
    }
    console.log(elves);
  }
}

class Elf {
  constructor(x, y, board) {
    this.x = x;
    this.y = y;
    this.moveIndex = 0;
    this.board = board;
    board.tilesWithElves.add(`${x}-${y}`);
    this.proposedMovement = null;
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
        if (
          this.board.tilesWithElves.has(
            `${this.x + this.moves[(i + this.moveIndex) % 4].checks[j].x}-${
              this.y + this.moves[(i + this.moveIndex) % 4].checks[j].y
            }`
          )
        ) {
          continue;
        }
      }
      this.proposedMovement = this.moves[(i + this.moveIndex) % 4].movement;
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

board.askForMovementProposals();
