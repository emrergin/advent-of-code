import { readFileSync } from "fs";
import Computer from "./Computer.js";
const nums = readFileSync(`day15input.txt`, "utf-8").split(",");

export class RepairDroid extends Computer {
  constructor(opcode, inputs = [], relativeBase = 0, startingX, startingY) {
    super(opcode, inputs, relativeBase);
    this.lastInput = null;
    this.tileMap = new Map();
    this.currentTile = new RepairDroid.Tile(
      startingX,
      startingY,
      startingX === 0 ? "1" : "2",
      this.tileMap,
      0,
      null
    );
    this.numberOfSteps = 0;
    this.unexplored = 1;
  }

  static directions = [
    { dx: 0, dy: -1 },
    { dx: 0, dy: 1 },
    { dx: -1, dy: 0 },
    { dx: 1, dy: 0 },
  ];

  static reverseMoves = [1, 0, 3, 2];

  nextMovement(tile) {
    let nextMove = tile.movesSoFar.findIndex((a) => a === false);
    if (nextMove !== -1) {
      tile.movesSoFar[nextMove] = true;
      return nextMove;
    }
    tile.explored = true;
    this.unexplored--;
    if (tile.cameVia !== null) {
      nextMove = RepairDroid.reverseMoves[tile.cameVia];
    } else {
      nextMove = Math.floor(Math.random() * 4);
    }
    return nextMove;
  }

  static Tile = class {
    constructor(x, y, content, tileMap, distance, cameVia) {
      this.x = x;
      this.y = y;
      this.content = content;
      // 0 wall, 1 empty, 2 oxygen
      this.explored = false;
      this.distance = distance;
      this.neighbours = [];
      this.cameVia = cameVia;
      this.movesSoFar = [false, false, false, false];
      tileMap.set(`${x}-${y}`, this);
      if (cameVia !== null) {
        this.movesSoFar[RepairDroid.reverseMoves[cameVia]] = true;
      }

      const neighbours1 = tileMap.get(`${x - 1}-${y}`);
      const neighbours2 = tileMap.get(`${x + 1}-${y}`);
      const neighbours3 = tileMap.get(`${x}-${y - 1}`);
      const neighbours4 = tileMap.get(`${x}-${y + 1}`);
      if (neighbours1 && neighbours1.content !== "0") {
        this.neighbours.push(neighbours1);
        neighbours1.neighbours.push(this);
      }
      if (neighbours2 && neighbours2.content !== "0") {
        this.neighbours.push(neighbours2);
        neighbours2.neighbours.push(this);
      }
      if (neighbours3 && neighbours3.content !== "0") {
        this.neighbours.push(neighbours3);
        neighbours3.neighbours.push(this);
      }
      if (neighbours4 && neighbours4.content !== "0") {
        this.neighbours.push(neighbours4);
        neighbours4.neighbours.push(this);
      }

      const minDistance = Math.min(
        ...this.neighbours.map((a) => a.distance + 1),
        this.distance
      );

      this.distance = minDistance;

      if (this.content !== "0") {
        if (neighbours1 && neighbours1.content !== "0") {
          neighbours1.distance = Math.min(
            neighbours1.distance,
            minDistance + 1
          );
        }
        if (neighbours2 && neighbours2.content !== "0") {
          neighbours2.distance = Math.min(
            neighbours2.distance,
            minDistance + 1
          );
        }
        if (neighbours3 && neighbours3.content !== "0") {
          neighbours3.distance = Math.min(
            neighbours3.distance,
            minDistance + 1
          );
        }
        if (neighbours4 && neighbours4.content !== "0") {
          neighbours4.distance = Math.min(
            neighbours4.distance,
            minDistance + 1
          );
        }
      } else {
        this.distance = Infinity;
      }
    }
  };

  inputToOpCode(index) {
    const input = this.nextMovement(this.currentTile);
    this.opcode[index] = String(input + 1);
    this.lastInput = input;
    this.pointer += 2;
  }

  workOnce() {
    super.workOnce();
    if (this.outputs[0]) {
      const response = this.outputs.pop();
      const newX =
        RepairDroid.directions[this.lastInput].dx + this.currentTile.x;
      const newY =
        RepairDroid.directions[this.lastInput].dy + this.currentTile.y;

      let nextTile = this.tileMap.get(`${newX}-${newY}`);
      if (!nextTile) {
        nextTile = new RepairDroid.Tile(
          newX,
          newY,
          response,
          this.tileMap,
          this.currentTile.distance + 1,
          this.lastInput
        );
        this.unexplored++;
      } else {
        nextTile.distance = Math.min(
          nextTile.distance,
          this.currentTile.distance + 1
        );
      }

      if (response !== "0") {
        this.currentTile = nextTile;
      }

      if (this.unexplored === 0) {
        this.halted = true;
      }
    }
  }
}

function partOne() {
  const robot = new RepairDroid(nums, [], 0, 0, 0);
  robot.workTillEnd();
  console.log(robot.tileMap.get(`${12}-${12}`).distance);
}

function partTwo() {
  const robot = new RepairDroid(nums, [], 0, 12, 12);
  robot.workTillEnd();

  const maxDistance = Math.max(
    ...Array.from(robot.tileMap.values())
      .filter((a) => a.content === "1")
      .map((a) => a.distance)
  );
  console.log(maxDistance);
}

partOne();
partTwo();
