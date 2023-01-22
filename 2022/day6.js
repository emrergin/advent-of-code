import { readFileSync } from "fs";

const letters = readFileSync(`day6input.txt`, "utf-8").split("");

function partOne() {
  for (let i = 0; i < letters.length; i++) {
    let lastFour = new Set(letters.slice(i - 4, i));
    if (lastFour.size === 4) {
      console.log(i);
      break;
    }
  }
}

function partTwo() {
  for (let i = 0; i < letters.length; i++) {
    let lastFour = new Set(letters.slice(i - 14, i));
    if (lastFour.size === 14) {
      console.log(i);
      break;
    }
  }
}

partOne();
partTwo();
