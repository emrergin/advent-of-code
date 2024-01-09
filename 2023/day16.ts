import { readFileSync } from "fs";
const commands = readFileSync(`day16input.txt`, "utf-8")
  .split("\r\n")
  .map((a) => a.split(""));

class Beam {
  x: number;
  y: number;
  direction: [-1 | 0 | 1, -1 | 0 | 1];
  stopped: boolean;
  energizedCells: Set<string>;
  energizedCellsWithDirection: Set<string>;
  beams: Beam[];
  constructor(
    x: number,
    y: number,
    direction: [-1 | 0 | 1, -1 | 0 | 1],
    energizedCells: Set<string>,
    energizedCellsWithDirection: Set<string>,
    beams: Beam[]
  ) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.stopped = false;
    this.energizedCells = energizedCells;
    this.energizedCellsWithDirection = energizedCellsWithDirection;
    this.beams = beams;

    // if (commands[x]?.[y] === "\\") {
    //   this.direction = [
    //     this.direction[1] as -1 | 0 | 1,
    //     this.direction[0] as -1 | 0 | 1,
    //   ];
    // }
    // if (commands[x]?.[y] === "/") {
    //   this.direction = [
    //     -this.direction[1] as -1 | 0 | 1,
    //     -this.direction[0] as -1 | 0 | 1,
    //   ];
    // }
    if (
      this.energizedCellsWithDirection.has(
        `${x}|${y}|${JSON.stringify(direction)}`
      )
    ) {
      return;
    }

    if (x >= 0 && y >= 0 && x < commands.length && y < commands.length) {
      this.energizedCells.add(`${x}|${y}`);
    }

    this.energizedCellsWithDirection.add(
      `${x}|${y}|${JSON.stringify(this.direction)}`
    );
    beams.push(this);
  }
  moveTo(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.energizedCells.add(`${x}|${y}`);
    if (
      this.energizedCellsWithDirection.has(
        `${x}|${y}|${JSON.stringify(this.direction)}`
      )
    ) {
      this.stopped = true;
    }
    this.energizedCellsWithDirection.add(
      `${x}|${y}|${JSON.stringify(this.direction)}`
    );
  }
  moveOnce() {
    const nextCell =
      commands[this.x + this.direction[0]]?.[this.y + this.direction[1]];

    if (!nextCell) {
      this.stopped = true;
    }
    const newX = this.x + this.direction[0];
    const newY = this.y + this.direction[1];
    switch (nextCell) {
      case ".":
        this.moveTo(newX, newY);
        break;
      case "/":
        this.moveTo(newX, newY);
        this.direction = [
          -this.direction[1] as -1 | 0 | 1,
          -this.direction[0] as -1 | 0 | 1,
        ];
        break;
      case "\\":
        this.moveTo(newX, newY);
        this.direction = [
          this.direction[1] as -1 | 0 | 1,
          this.direction[0] as -1 | 0 | 1,
        ];
        break;
      case "|":
        if (this.direction[1] === 0) {
          this.moveTo(newX, newY);
        } else {
          this.stopped = true;
          new Beam(
            newX,
            newY,
            [1, 0],
            this.energizedCells,
            this.energizedCellsWithDirection,
            this.beams
          );
          new Beam(
            newX,
            newY,
            [-1, 0],
            this.energizedCells,
            this.energizedCellsWithDirection,
            this.beams
          );
        }
        break;
      case "-":
        if (this.direction[0] === 0) {
          this.moveTo(newX, newY);
        } else {
          this.stopped = true;
          new Beam(
            newX,
            newY,
            [0, 1],
            this.energizedCells,
            this.energizedCellsWithDirection,
            this.beams
          );
          new Beam(
            newX,
            newY,
            [0, -1],
            this.energizedCells,
            this.energizedCellsWithDirection,
            this.beams
          );
        }
        break;
      default:
        break;
    }
  }
}

function partOne() {
  const energizedCells = new Set<string>();
  const energizedCellsWithDirection = new Set<string>();
  let beams: Beam[] = [];
  new Beam(0, -1, [0, 1], energizedCells, energizedCellsWithDirection, beams);
  while (beams.filter((b) => !b.stopped).length > 0) {
    for (let beam of beams) {
      beam.moveOnce();
    }
  }
  console.log(energizedCells.size);
}

partOne();

function partTwo() {
  let maximumEnergy = Number.MIN_SAFE_INTEGER;

  for (let i = 0; i < commands.length; i++) {
    const energizedCells = new Set<string>();
    const energizedCellsWithDirection = new Set<string>();
    let beams: Beam[] = [];
    new Beam(i, -1, [0, 1], energizedCells, energizedCellsWithDirection, beams);
    while (beams.filter((b) => !b.stopped).length > 0) {
      for (let beam of beams) {
        beam.moveOnce();
      }
    }
    maximumEnergy = Math.max(maximumEnergy, energizedCells.size);
  }

  for (let i = 0; i < commands.length; i++) {
    const energizedCells = new Set<string>();
    const energizedCellsWithDirection = new Set<string>();
    let beams: Beam[] = [];
    new Beam(
      i,
      commands[0].length,
      [0, -1],
      energizedCells,
      energizedCellsWithDirection,
      beams
    );
    while (beams.filter((b) => !b.stopped).length > 0) {
      for (let beam of beams) {
        beam.moveOnce();
      }
    }
    maximumEnergy = Math.max(maximumEnergy, energizedCells.size);
  }

  for (let j = 0; j < commands[0].length; j++) {
    const energizedCells = new Set<string>();
    const energizedCellsWithDirection = new Set<string>();
    let beams: Beam[] = [];
    new Beam(-1, j, [1, 0], energizedCells, energizedCellsWithDirection, beams);
    while (beams.filter((b) => !b.stopped).length > 0) {
      for (let beam of beams) {
        beam.moveOnce();
      }
    }
    maximumEnergy = Math.max(maximumEnergy, energizedCells.size);
  }

  for (let j = 0; j < commands[0].length; j++) {
    const energizedCells = new Set<string>();
    const energizedCellsWithDirection = new Set<string>();
    let beams: Beam[] = [];
    new Beam(
      commands.length,
      j,
      [-1, 0],
      energizedCells,
      energizedCellsWithDirection,
      beams
    );
    while (beams.filter((b) => !b.stopped).length > 0) {
      for (let beam of beams) {
        beam.moveOnce();
      }
    }
    maximumEnergy = Math.max(maximumEnergy, energizedCells.size);
  }

  console.log(maximumEnergy);
}

partTwo();
