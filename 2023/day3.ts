import { readFileSync } from "fs";
// const commands = readFileSync(`sasas.txt`, "utf-8").split("\r\n");
const commands = readFileSync(`day3input.txt`, "utf-8").split("\r\n");
// .slice(31, 35);

const regex = /([^\d]\d)|(^\d)/g;

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
      // console.log(valueToAdd);
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
        console.log(currentChar);
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
  console.log(parseInt(resultText, 10));
  return parseInt(resultText, 10);
}
