import { readFileSync } from "fs";
const commands = readFileSync(`day3input.txt`, "utf-8").split("\r\n");

const regex = /([^\d]\d)|(^\d)/g;

function partOne() {
  let total = 0;
  for (let i = 0; i < commands.length; i++) {
    const command = commands[i];
    const allIndicesOfNumberStarts = [...command.matchAll(regex)].map(
      (a) => a.index
    );
    for (let j = 0; j < allIndicesOfNumberStarts.length; j++) {
      if (checkIfCounted(i, allIndicesOfNumberStarts[j] as number)) {
        const valueToAdd = getNumberStartingFromIndex(
          i,
          allIndicesOfNumberStarts[j] as number
        );
        total += valueToAdd;
      }
    }
  }
  console.log(total);

  function checkIfCounted(yCor: number, index: number) {
    let currentX = index;
    let lassPass = 0;
    while (currentX < commands[0].length && lassPass < 2) {
      for (let i = -1; i <= 1; i++) {
        if (yCor + i < 0) {
          continue;
        }
        if (yCor + i >= commands.length) {
          continue;
        }
        const currentChar = commands[yCor + i][currentX];
        if (/[^\d\.]/.test(currentChar)) {
          return true;
        }
      }
      if (/[^\d]/.test(commands[yCor][currentX])) {
        lassPass++;
      }
      currentX++;
    }
    return false;
  }
}

function partTwo() {
  const allGears = new Map();
  for (let i = 0; i < commands.length; i++) {
    const command = commands[i];
    const allIndicesOfNumberStarts = [...command.matchAll(regex)].map(
      (a) => a.index
    );
    for (let j = 0; j < allIndicesOfNumberStarts.length; j++) {
      gearReader(i, allIndicesOfNumberStarts[j] as number);
    }
  }
  let total = 0;
  allGears.forEach((g) => {
    if (g.length === 2) {
      total += g[0] * g[1];
    }
  });
  console.log(total);

  function gearReader(yCor: number, index: number) {
    let currentX = index;
    let lassPass = 0;
    while (currentX < commands[0].length && lassPass < 2) {
      for (let i = -1; i <= 1; i++) {
        if (yCor + i < 0) {
          continue;
        }
        if (yCor + i >= commands.length) {
          continue;
        }
        const currentChar = commands[yCor + i][currentX];
        if (/\*/.test(currentChar)) {
          const relevantGear = allGears.get(`${yCor + i}-${currentX}`);
          if (relevantGear) {
            relevantGear.push(getNumberStartingFromIndex(yCor, index));
          } else {
            allGears.set(`${yCor + i}-${currentX}`, [
              getNumberStartingFromIndex(yCor, index),
            ]);
          }
          return true;
        }
      }
      if (/[^\d]/.test(commands[yCor][currentX])) {
        lassPass++;
      }
      currentX++;
    }
    return false;
  }
}

partOne();
partTwo();

function getNumberStartingFromIndex(yCor: number, index: number) {
  let currentX = index;
  let resultText = "";
  if (!/\d/.test(commands[yCor][currentX])) {
    currentX++;
  }
  while (/\d/.test(commands[yCor][currentX])) {
    resultText += commands[yCor][currentX];
    currentX++;
  }
  return parseInt(resultText, 10);
}
