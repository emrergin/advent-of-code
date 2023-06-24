import { readFileSync } from "fs";
import Computer from "./Computer.js";
const nums = readFileSync(`day11input.txt`, "utf-8").split(",");

export class PainterRobot extends Computer {
  constructor(opcode, inputs = [], relativeBase = 0, allTiles) {
    super(opcode, inputs, relativeBase);
    this.currentLocation = { x: 0, y: 0 };
    this.currentDirection = 0;
    this.allTiles = allTiles;
  }

  static directions = [
    { dx: 0, dy: -1 },
    { dx: 1, dy: 0 },
    { dx: 0, dy: 1 },
    { dx: -1, dy: 0 },
  ];

  static Tile = class {
    constructor(x, y, allTiles) {
      this.x = x;
      this.y = y;
      this.painted = false;
      this.color = "0";
      allTiles.push(this);
    }
  };

  resolveLocation() {
    let relevantTile = this.allTiles.find(
      (place) =>
        place.x === this.currentLocation.x && place.y === this.currentLocation.y
    );

    if (relevantTile === undefined) {
      relevantTile = new PainterRobot.Tile(
        this.currentLocation.x,
        this.currentLocation.y,
        this.allTiles
      );
    }
    if (relevantTile.color !== this.outputs[0]) {
      relevantTile.color = this.outputs[0];
      relevantTile.painted = true;
    }
  }

  resolveMovement() {
    if (this.outputs[1] === "0") {
      this.currentDirection -= 1;
      this.currentDirection =
        this.currentDirection === -1 ? 3 : this.currentDirection;
    } else {
      this.currentDirection += 1;
      this.currentDirection = this.currentDirection % 4;
    }
    this.currentLocation.x += PainterRobot.directions[this.currentDirection].dx;
    this.currentLocation.y += PainterRobot.directions[this.currentDirection].dy;
  }

  workOnce() {
    super.workOnce();
    if (this.outputs.length == 2) {
      this.resolveLocation();
      this.resolveMovement();
      this.inputs = this.allTiles
        .filter(
          (a) =>
            a.x === this.currentLocation.x && a.y === this.currentLocation.y
        )
        .map((a) => a.color);
      this.outputs = [];
    }
  }

  painter(tiles) {
    let limits = tiles.reduce(
      (prev, curr) => {
        if (curr.x < prev.minX) {
          prev.minX = curr.x;
        }
        if (curr.y < prev.minY) {
          prev.minY = curr.y;
        }
        if (curr.x > prev.maxX) {
          prev.maxX = curr.x;
        }
        if (curr.y > prev.maxY) {
          prev.maxY = curr.y;
        }

        return prev;
      },
      { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity }
    );

    for (let j = limits.minY; j <= limits.maxY; j++) {
      let currentRow = "";
      for (let i = limits.minX; i <= limits.maxX; i++) {
        if (tiles.filter((a) => a.x === i && a.y === j).length > 0) {
          let addedChar =
            tiles.filter((a) => a.x === i && a.y === j)[0].color === "0"
              ? `⬜`
              : "⬛";
          currentRow += addedChar;
        } else {
          currentRow += "⬜";
        }
      }
      console.log(currentRow);
    }
  }

  paintTiles() {
    this.painter(this.allTiles);
  }
}

function partOne() {
  const allTiles = [];
  const robot = new PainterRobot(nums, ["0"], 0, allTiles);
  robot.workTillEnd();
  console.log(allTiles.filter((a) => a.painted).length);
}

function partTwo() {
  const allTiles = [];
  const robot = new PainterRobot(nums, ["1"], 0, allTiles);
  robot.workTillEnd();
  robot.paintTiles();
}

partOne();
partTwo();
