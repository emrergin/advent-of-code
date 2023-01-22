import { readFileSync } from "fs";

let lines = readFileSync(`day3input.txt`, "utf-8").split(`\n`);

function findCommonType(com1, com2, com3) {
  let filteredArray;
  if (arguments[2] === undefined) {
    filteredArray = [...com1].filter((value) => [...com2].includes(value));
  } else {
    filteredArray = [...com1].filter(
      (value) => [...com2].includes(value) && [...com3].includes(value)
    );
  }
  return filteredArray[0];
}

function convertToPriority(letter) {
  if (letter == letter.toLowerCase()) {
    return letter.charCodeAt(letter) - 96;
  } else {
    return letter.charCodeAt(letter) - 38;
  }
}

function partOne() {
  let totalPriority = 0;
  for (let line of lines) {
    const leftPart = line.substring(0, line.length / 2);
    const rightPart = line.substring(line.length / 2, line.length);
    const commonType = findCommonType(leftPart, rightPart);
    totalPriority += convertToPriority(commonType);
  }
  console.log(totalPriority);
}

function partTwo() {
  let totalPriorityOfBadges = 0;
  for (let i = 0; i < lines.length; i = i + 3) {
    const currentThreeElves = []
      .concat(lines[i])
      .concat(lines[i + 1])
      .concat(lines[i + 2]);
    totalPriorityOfBadges += convertToPriority(
      findCommonType(
        currentThreeElves[0],
        currentThreeElves[1],
        currentThreeElves[2]
      )
    );
  }
  console.log(totalPriorityOfBadges);
}

partOne();
partTwo();
