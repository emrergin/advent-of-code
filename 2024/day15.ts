import { readFileSync } from "fs";
const input = readFileSync(`day15input.txt`, "utf-8").split("\r\n\r\n");

const grid = input[0].split("\r\n").map((r) => r.split(""));
const commands = input[1]
  .split("")
  .filter((a) => a == "^" || a == "v" || a == "<" || a == ">") as (
  | "^"
  | "v"
  | "<"
  | ">"
)[];

class Cell {
  type: "box" | "wall";
  x: number;
  y: number;
  static gridMap: Map<string, Cell>;
  static part: 1 | 2;

  constructor(type: "box" | "wall", x: number, y: number) {
    this.type = type;
    this.x = x;
    this.y = y;
    Cell.gridMap.set(`${x}|${y}`, this);
  }

  move(direction: "^" | "v" | "<" | ">") {
    if (this.type === "wall") {
      return false;
    }
    let nextCells = [];
    if (direction === "^" || direction === "v") {
      if (Cell.part === 2) {
        for (let i = -1; i < 2; i++) {
          let targetCell = Cell.gridMap.get(
            `${this.x + i}|${this.y + directions[direction][1]}`
          );
          if (targetCell) {
            nextCells.push(targetCell);
          }
        }
      } else {
        let targetCell = Cell.gridMap.get(
          `${this.x}|${this.y + directions[direction][1]}`
        );
        if (targetCell) {
          nextCells.push(targetCell);
        }
      }
    } else if (direction === "<") {
      let targetCell = Cell.gridMap.get(`${this.x - Cell.part}|${this.y}`);
      if (targetCell) {
        nextCells.push(targetCell);
      }
    } else {
      let targetCell = Cell.gridMap.get(`${this.x + Cell.part}|${this.y}`);
      if (targetCell) {
        nextCells.push(targetCell);
      }
    }
    let noWalls = nextCells.every((c) => c.move(direction));
    if (!noWalls) {
      return false;
    } else {
      Cell.gridMap.delete(`${this.x}|${this.y}`);
      let targetX = this.x + directions[direction][0];
      let targetY = this.y + directions[direction][1];
      Cell.gridMap.set(`${targetX}|${targetY}`, this);
      this.x = targetX;
      this.y = targetY;
      return true;
    }
  }
}

const directions = {
  "^": [0, -1],
  v: [0, 1],
  "<": [-1, 0],
  ">": [1, 0],
};

function partOne() {
  Cell.gridMap = new Map<string, Cell>();
  Cell.part = 1;

  let commandsCopy = structuredClone(commands);
  let gridCopy = structuredClone(grid);
  let robotX = -1;
  let robotY = -1;

  for (let i = 0; i < gridCopy.length; i++) {
    for (let j = 0; j < gridCopy[0].length; j++) {
      if (gridCopy[i][j] === "#") {
        new Cell("wall", j, i);
      } else if (gridCopy[i][j] === "O") {
        new Cell("box", j, i);
      } else if (gridCopy[i][j] === "@") {
        robotX = j;
        robotY = i;
      }
    }
  }

  for (let i = 0; i < commandsCopy.length; i++) {
    let targetX = robotX + directions[commandsCopy[i]][0];
    let targetY = robotY + directions[commandsCopy[i]][1];
    let targetCell = Cell.gridMap.get(`${targetX}|${targetY}`);
    targetCell?.move(commandsCopy[i]);
    let newTarget = Cell.gridMap.get(`${targetX}|${targetY}`);
    if (newTarget === undefined) {
      robotX = targetX;
      robotY = targetY;
    }
  }

  let total = 0;
  for (let [, value] of Cell.gridMap) {
    if (value.type === "box") {
      total += value.y * 100 + value.x;
    }
  }

  console.log(total);
}

function partTwo() {
  Cell.gridMap = new Map<string, Cell>();
  Cell.part = 2;

  let commandsCopy = structuredClone(commands);
  let gridCopy = structuredClone(grid);
  let robotX = -1;
  let robotY = -1;

  for (let i = 0; i < gridCopy.length; i++) {
    for (let j = 0; j < gridCopy[0].length * 2; j++) {
      if (j % 2 === 0) {
        if (gridCopy[i][j / 2] === "#") {
          new Cell("wall", j, i);
        } else if (gridCopy[i][j / 2] === "O") {
          new Cell("box", j, i);
        } else if (gridCopy[i][j / 2] === "@") {
          robotX = j;
          robotY = i;
        }
      }
    }
  }

  for (let i = 0; i < commandsCopy.length; i++) {
    let currentDirection = commandsCopy[i];
    let targetX = robotX + directions[commandsCopy[i]][0];
    let targetY = robotY + directions[commandsCopy[i]][1];
    let targetCell: Cell | undefined;
    if (currentDirection === "^" || currentDirection === "v") {
      targetCell =
        Cell.gridMap.get(`${targetX}|${targetY}`) ||
        Cell.gridMap.get(`${targetX - 1}|${targetY}`);
    } else if (currentDirection === "<") {
      targetCell = Cell.gridMap.get(`${targetX - 1}|${targetY}`);
    } else {
      targetCell = Cell.gridMap.get(`${targetX}|${targetY}`);
    }

    targetCell?.move(commandsCopy[i]);
    let newTarget: Cell | undefined;
    if (currentDirection === "^" || currentDirection === "v") {
      newTarget =
        Cell.gridMap.get(`${targetX}|${targetY}`) ||
        Cell.gridMap.get(`${targetX - 1}|${targetY}`);
    } else if (currentDirection === "<") {
      newTarget = Cell.gridMap.get(`${targetX - 1}|${targetY}`);
    } else {
      newTarget = Cell.gridMap.get(`${targetX}|${targetY}`);
    }

    if (newTarget === undefined) {
      robotX = targetX;
      robotY = targetY;
    }
  }

  let total = 0;
  for (let [, value] of Cell.gridMap) {
    if (value.type === "box") {
      total += value.y * 100 + value.x;
    }
  }

  console.log(total);
}

partOne();
partTwo();
