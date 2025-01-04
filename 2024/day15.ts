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
  static cellstatwillMove: { cell: Cell; orderingAxis: number }[];

  constructor(type: "box" | "wall", x: number, y: number) {
    this.type = type;
    this.x = x;
    this.y = y;
    Cell.gridMap.set(`${x}|${y}`, this);
  }

  static moveAll(direction: "^" | "v" | "<" | ">") {
    let allCells = new Set<string>();
    Cell.cellstatwillMove = Cell.cellstatwillMove.reduce((acc, curr) => {
      if (!allCells.has(`${curr.cell.x}|${curr.cell.y}`)) {
        acc.push(curr);
        allCells.add(`${curr.cell.x}|${curr.cell.y}`);
      }
      return acc;
    }, [] as typeof Cell.cellstatwillMove);

    if (direction === "^" || direction === "<") {
      Cell.cellstatwillMove.sort((a, b) => a.orderingAxis - b.orderingAxis);
    } else {
      Cell.cellstatwillMove.sort((a, b) => b.orderingAxis - a.orderingAxis);
    }

    for (let { cell } of this.cellstatwillMove) {
      cell.moveSelf(direction);
    }

    Cell.cellstatwillMove = [];
  }

  moveSelf(direction: "^" | "v" | "<" | ">") {
    let targetX = this.x + directions[direction][0];
    let targetY = this.y + directions[direction][1];
    Cell.gridMap.set(`${targetX}|${targetY}`, this);
    Cell.gridMap.delete(`${this.x}|${this.y}`);
    this.x = targetX;
    this.y = targetY;
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
      Cell.cellstatwillMove = [];
      return false;
    } else {
      Cell.cellstatwillMove.push({
        cell: this,
        orderingAxis: direction === "^" || direction === "v" ? this.y : this.x,
      });
      return true;
    }
  }

  get gps() {
    return this.type === "wall" ? 0 : 100 * this.y + this.x;
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
  Cell.cellstatwillMove = [];

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
    Cell.moveAll(commandsCopy[i]);
    let newTarget = Cell.gridMap.get(`${targetX}|${targetY}`);
    if (newTarget === undefined) {
      robotX = targetX;
      robotY = targetY;
    }
  }

  let total = 0;
  for (let [, value] of Cell.gridMap) {
    total += value.gps;
  }

  console.log(total);
}

function partTwo() {
  Cell.gridMap = new Map<string, Cell>();
  Cell.part = 2;
  Cell.cellstatwillMove = [];

  let commandsCopy = structuredClone(commands);
  let gridCopy = structuredClone(grid);
  let robotX = -1;
  let robotY = -1;

  for (let i = 0; i < gridCopy.length; i++) {
    for (let j = 0; j < gridCopy[0].length; j++) {
      if (gridCopy[i][j] === "#") {
        new Cell("wall", j * 2, i);
      } else if (gridCopy[i][j] === "O") {
        new Cell("box", j * 2, i);
      } else if (gridCopy[i][j] === "@") {
        robotX = j * 2;
        robotY = i;
      }
    }
  }

  for (let currentDirection of commandsCopy) {
    let targetX = robotX + directions[currentDirection][0];
    let targetY = robotY + directions[currentDirection][1];
    let targetCell = getTarget(targetX, targetY, currentDirection);

    if (targetCell) {
      targetCell.move(currentDirection);
      Cell.moveAll(currentDirection);
    }
    let newTarget = getTarget(targetX, targetY, currentDirection);

    if (newTarget === undefined) {
      robotX = targetX;
      robotY = targetY;
    }
  }

  function getTarget(tx: number, ty: number, direction: "^" | "v" | "<" | ">") {
    let target: Cell | undefined;
    if (direction === "^" || direction === "v") {
      target =
        Cell.gridMap.get(`${tx}|${ty}`) || Cell.gridMap.get(`${tx - 1}|${ty}`);
    } else if (direction === "<") {
      target = Cell.gridMap.get(`${tx - 1}|${ty}`);
    } else {
      target = Cell.gridMap.get(`${tx}|${ty}`);
    }
    return target;
  }

  let total = 0;
  for (let [, value] of Cell.gridMap) {
    total += value.gps;
  }

  console.log(total);
}

partOne();
partTwo();
