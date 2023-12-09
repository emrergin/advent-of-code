import { readFileSync } from "fs";
const commands = readFileSync(`day9input.txt`, "utf-8")
  .split("\r\n")
  .map((a) => a.split(" ").map(Number));

function extrapolateCommand(command: number[], part: 1 | 2) {
  let currentCommand = command;
  const allCommands = [command];

  while (currentCommand.some((a) => a !== 0)) {
    const tempArray: number[] = [];
    for (let i = 0; i < currentCommand.length - 1; i++) {
      const difference = currentCommand[i + 1] - currentCommand[i];
      tempArray.push(difference);
    }
    allCommands.push(tempArray);
    currentCommand = allCommands[allCommands.length - 1];
  }

  if (part === 1) {
    let addedValue =
      allCommands[allCommands.length - 1][
        allCommands[allCommands.length - 1].length - 1
      ];
    for (let i = allCommands.length - 2; i >= 0; i--) {
      allCommands[i][allCommands[i].length - 1] += addedValue;
      addedValue = allCommands[i][allCommands[i].length - 1];
    }
    return command[command.length - 1];
  } else {
    let addedValue = allCommands[allCommands.length - 1][0];
    for (let i = allCommands.length - 2; i >= 0; i--) {
      allCommands[i][0] -= addedValue;
      addedValue = allCommands[i][0];
    }
    return command[0];
  }
}

function partOne() {
  let total = 0;
  const commandsCopy = structuredClone(commands);
  for (let command of commandsCopy) {
    total += extrapolateCommand(command, 1);
  }
  console.log(total);
}

function partTwo() {
  let total = 0;
  for (let command of commands) {
    total += extrapolateCommand(command, 2);
  }
  console.log(total);
}

partOne();
partTwo();
