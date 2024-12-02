import { readFileSync } from "fs";
const commands = readFileSync(`day1input.txt`, "utf-8").split("\r\n");

function parseCommands(commands: string[]) {
  return commands
    .map((a) => a.split("  ").map((a) => Number(a)))
    .reduce(
      (acc, curr) => {
        acc[0] = [...acc[0], curr[0]];
        acc[1] = [...acc[1], curr[1]];
        return acc;
      },
      [[], []] as [number[], number[]]
    );
}

function partOne() {
  let commandCopy = parseCommands(commands);
  commandCopy = [
    commandCopy[0].sort((a, b) => a - b),
    commandCopy[1].sort((a, b) => a - b),
  ];

  console.log(
    commandCopy[0].reduce((acc, curr, index) => {
      return acc + Math.abs(curr - commandCopy[1][index]);
    }, 0)
  );
}

function partTwo() {
  let commandCopy = parseCommands(commands);
  let totalScore = 0;
  for (let i = 0; i < commandCopy[0].length; i++) {
    let multiplier = 0;
    for (let j = 0; j < commandCopy[1].length; j++) {
      if (commandCopy[0][i] === commandCopy[1][j]) {
        multiplier++;
      }
    }
    console.log(multiplier * commandCopy[0][i]);
    totalScore += multiplier * commandCopy[0][i];
  }
  console.log(totalScore);
}

partOne();
partTwo();
