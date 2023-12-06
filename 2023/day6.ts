import { readFileSync } from "fs";

const commands = readFileSync(`day6input.txt`, "utf-8")
  .split("\r\n")
  .map((a) => a.split(/\s+/).slice(1).map(Number));

function partOne() {
  let total = 1;
  for (let i = 0; i < commands[0].length; i++) {
    let numberOfOptions = 0;
    for (let j = 1; j <= commands[0][i]; j++) {
      if (ifRecordIsBeaten(j, commands[0][i], commands[1][i])) {
        numberOfOptions++;
      }
    }
    total *= numberOfOptions;
  }
  console.log(total);
}

function partTwo() {
  const shorterCommands = commands.map((a) => a.join("")).map(Number);

  let numberOfOptions = 0;
  for (let j = 1; j <= shorterCommands[0]; j++) {
    if (ifRecordIsBeaten(j, shorterCommands[0], shorterCommands[1])) {
      numberOfOptions++;
    }
  }
  console.log(numberOfOptions);
}

function ifRecordIsBeaten(
  usedTime: number,
  totalTime: number,
  prevDistance: number
) {
  const remainingTime = totalTime - usedTime;
  return remainingTime * usedTime > prevDistance;
}

partOne();
partTwo();
