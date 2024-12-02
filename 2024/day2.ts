import { readFileSync } from "fs";
const commands = readFileSync(`day2input.txt`, "utf-8")
  .split("\r\n")
  .map((a) => a.split(" ").map((b) => Number(b)));

function checkIfIncreasing(row: number[]) {
  for (let i = 0; i < row.length - 1; i++) {
    if (row[i] > row[i + 1]) {
      return false;
    }
  }
  return true;
}
function checkIfDecreasing(row: number[]) {
  for (let i = 0; i < row.length - 1; i++) {
    if (row[i] < row[i + 1]) {
      return false;
    }
  }
  return true;
}
function checkIfContinuous(row: number[]) {
  for (let i = 0; i < row.length - 1; i++) {
    if (
      Math.abs(row[i] - row[i + 1]) === 0 ||
      Math.abs(row[i] - row[i + 1]) > 3
    ) {
      return false;
    }
  }
  return true;
}

function partOne() {
  let count = 0;
  for (let i = 0; i < commands.length; i++) {
    if (
      (checkIfDecreasing(commands[i]) || checkIfIncreasing(commands[i])) &&
      checkIfContinuous(commands[i])
    ) {
      count++;
    }
  }
  console.log(count);
}

function partTwo() {
  let count = 0;
  outer: for (let i = 0; i < commands.length; i++) {
    for (let j = 0; j < commands[i].length; j++) {
      let modifiedRow = commands[i].toSpliced(j, 1);
      if (
        (checkIfDecreasing(modifiedRow) || checkIfIncreasing(modifiedRow)) &&
        checkIfContinuous(modifiedRow)
      ) {
        count++;
        continue outer;
      }
    }
  }
  console.log(count);
}
partOne();
partTwo();
