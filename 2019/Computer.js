export default class Computer {
  constructor(opcode, inputs = [], relativeBase = 0) {
    this.pointer = 0;
    this.halted = false;
    this.opcode = opcode;
    this.outputs = [];
    this.inputs = inputs.map((a) => String(a));
    this.relativeBase = relativeBase;
  }

  static parameterMap = new Map([
    [`1`, 3],
    [`01`, 3], //add
    [`2`, 3],
    [`02`, 3], //multiply
    [`3`, 1],
    [`03`, 1], //input
    [`4`, 1],
    [`04`, 1], //output
    [`5`, 2],
    [`05`, 2], //jump-if-true
    [`6`, 2],
    [`06`, 2], //jump-if-false
    [`7`, 3],
    [`07`, 3], //lessthan
    [`8`, 3],
    [`08`, 3], //equal
    [`9`, 1],
    [`09`, 1], //basechange
    [`99`, 0],
  ]);

  paramFinder(mode, indexOffset) {
    switch (mode) {
      case "0":
        return +this.opcode[this.pointer + indexOffset] || 0;
      case "1":
        return +this.pointer + indexOffset;
      case "2":
        return (
          +(this.opcode[this.pointer + indexOffset] || 0) + this.relativeBase
        );
    }
  }

  workOnce() {
    const currentCommand = this.opcode[this.pointer].slice(-2);
    const parameterMode = this.opcode[this.pointer]
      .padStart(Computer.parameterMap.get(currentCommand) + 2, "0")
      .slice(0, -2)
      .split(``)
      .reverse();

    const parameterIndexes = parameterMode.map((a, index) =>
      this.paramFinder(a, index + 1)
    );

    switch (currentCommand) {
      case "1":
      case "01":
        this.opcode[parameterIndexes[2]] = String(
          +this.opcode[parameterIndexes[0]] + +this.opcode[parameterIndexes[1]]
        );
        this.pointer += Computer.parameterMap.get(currentCommand) + 1;
        break;
      case "2":
      case "02":
        this.opcode[parameterIndexes[2]] = String(
          +this.opcode[parameterIndexes[0]] * +this.opcode[parameterIndexes[1]]
        );
        this.pointer += Computer.parameterMap.get(currentCommand) + 1;
        break;
      case "3":
      case "03":
        this.opcode[parameterIndexes[0]] = String(this.inputs.shift() || 0);
        this.pointer += Computer.parameterMap.get(currentCommand) + 1;
        break;
      case "4":
      case "04":
        this.outputs.push(this.opcode[parameterIndexes[0]]);
        this.pointer += Computer.parameterMap.get(currentCommand) + 1;
        break;
      case "5":
      case "05":
        if (this.opcode[parameterIndexes[0]] !== "0") {
          this.pointer = +this.opcode[parameterIndexes[1]];
        } else {
          this.pointer += Computer.parameterMap.get(currentCommand) + 1;
        }
        break;
      case "6":
      case "06":
        if (this.opcode[parameterIndexes[0]] === "0") {
          this.pointer = +this.opcode[parameterIndexes[1]];
        } else {
          this.pointer += Computer.parameterMap.get(currentCommand) + 1;
        }
        break;
      case "7":
      case "07":
        if (
          +(this.opcode[parameterIndexes[0]] || 0) <
          +(this.opcode[parameterIndexes[1]] || 0)
        ) {
          this.opcode[parameterIndexes[2]] = "1";
        } else {
          this.opcode[parameterIndexes[2]] = "0";
        }
        this.pointer += Computer.parameterMap.get(currentCommand) + 1;
        break;
      case "8":
      case "08":
        if (
          (this.opcode[parameterIndexes[0]] || "0") ===
          (this.opcode[parameterIndexes[1]] || "0")
        ) {
          this.opcode[parameterIndexes[2]] = "1";
        } else {
          this.opcode[parameterIndexes[2]] = "0";
        }
        this.pointer += Computer.parameterMap.get(currentCommand) + 1;
        break;
      case "9":
      case "09":
        this.relativeBase += +this.opcode[parameterIndexes[0]];
        this.pointer += Computer.parameterMap.get(currentCommand) + 1;
        break;
      case "99":
        this.halted = true;
        break;
      default:
        break;
    }
  }

  workTillEnd() {
    while (!this.halted) {
      this.workOnce();
    }
    return this.opcode[0];
  }

  workTillEndAndDiagnose() {
    while (!this.halted) {
      this.workOnce();
    }
    return this.outputs;
  }
}

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
