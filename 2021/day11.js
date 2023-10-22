import { readFileSync } from "fs";
const allOctopi = new Map();
const aboutToFlashOctopi = [];
let totalFlashes = 0;

// const lines = readFileSync(`day11test.txt`, "utf-8")
const lines = readFileSync(`day11input.txt`, "utf-8")
  .split("\r\n")
  .map((a) => a.split("").map((n) => Number(n)));

class Octopus {
  constructor(x, y, e) {
    allOctopi.set(`${x}-${y}`, this);
    this.energy = e;
    this.flashed = false;
    this.x = x;
    this.y = y;
  }
  increaseEnergy() {
    this.energy++;
    if (this.energy > 9) {
      aboutToFlashOctopi.push(this);
    }
  }
  flash() {
    if (this.flashed) return;
    this.flashed = true;
    totalFlashes++;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        const neighbour = allOctopi.get(`${this.x + i}-${this.y + j}`);
        if (!neighbour) continue;
        neighbour.increaseEnergy();
      }
    }
  }
}

for (let i = 0; i < lines.length; i++) {
  for (let j = 0; j < lines[0].length; j++) {
    new Octopus(i, j, lines[i][j]);
  }
}

function step() {
  let numberOfFlashedThisTurn = 0;
  allOctopi.forEach((o) => o.increaseEnergy());
  while (aboutToFlashOctopi.length > 0) {
    const octopusToFlash = aboutToFlashOctopi.pop();
    octopusToFlash.flash();
  }
  allOctopi.forEach((o) => {
    if (o.flashed) {
      o.energy = 0;
      numberOfFlashedThisTurn++;
    }
    o.flashed = false;
  });
  if (numberOfFlashedThisTurn === allOctopi.size) {
    return true;
  }
}

function partOne() {
  multipleSteps(100);
  function multipleSteps(k) {
    for (let i = 0; i < k; i++) {
      step();
    }
    console.log(totalFlashes);
  }
}

function partTwo() {
  let k = 0;
  multipleSteps();
  function multipleSteps() {
    while (true) {
      k++;
      const condition = step();
      if (condition) break;
    }
    console.log(k);
  }
}
