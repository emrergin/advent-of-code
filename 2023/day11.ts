import { readFileSync } from "fs";
const commands = readFileSync(`day11input.txt`, "utf-8")
  .split("\r\n")
  .map((a) => a.split(""));

const emptyRows: number[] = [];
const emptyColumns: number[] = [];

for (let i = 0; i < commands.length; i++) {
  if (commands[i].every((a) => a === ".")) {
    emptyRows.push(i);
  }
}

outer: for (let j = 0; j < commands[0].length; j++) {
  for (let i = 0; i < commands.length; i++) {
    if (commands[i][j] === "#") {
      continue outer;
    }
  }
  emptyColumns.push(j);
}

type Galaxy = {
  x: number;
  y: number;
};

const allGalaxies: Galaxy[] = [];
for (let i = 0; i < commands.length; i++) {
  for (let j = 0; j < commands[0].length; j++) {
    if (commands[i][j] === "#") {
      allGalaxies.push({ x: i, y: j });
    }
  }
}

function findDistance(a: Galaxy, b: Galaxy, multiplier = 1) {
  const largerX = a.x > b.x ? a.x : b.x;
  const largerY = a.y > b.y ? a.y : b.y;
  const smallerX = a.x <= b.x ? a.x : b.x;
  const smallerY = a.y <= b.y ? a.y : b.y;

  const numberOfDoubleRows = emptyRows.filter(
    (a) => a > smallerX && a < largerX
  ).length;

  const numberOfDoubleColumns = emptyColumns.filter(
    (a) => a > smallerY && a < largerY
  ).length;

  const result =
    numberOfDoubleRows * (multiplier - 1) +
    numberOfDoubleColumns * (multiplier - 1) +
    largerX +
    largerY -
    smallerX -
    smallerY;

  // console.log(a, b, result);

  return result;
}

function partOne() {
  let totalDistance = 0;
  for (let i = 0; i < allGalaxies.length; i++) {
    for (let j = i + 1; j < allGalaxies.length; j++) {
      const galaxy1 = allGalaxies[i];
      const galaxy2 = allGalaxies[j];

      totalDistance += findDistance(galaxy1, galaxy2, 2);
    }
  }
  console.log(totalDistance);
}

function partTwo() {
  let totalDistance = 0;
  for (let i = 0; i < allGalaxies.length; i++) {
    for (let j = i + 1; j < allGalaxies.length; j++) {
      const galaxy1 = allGalaxies[i];
      const galaxy2 = allGalaxies[j];

      totalDistance += findDistance(galaxy1, galaxy2, 1000000);
    }
  }
  console.log(totalDistance);
}

partOne();
partTwo();
