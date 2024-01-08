import { readFileSync } from "fs";
import { catchCycle } from "../utilities/helpers.js";
const commands = readFileSync(`day14input.txt`, "utf-8").split("\r\n");

function setCharAt(str: string, index: number, chr: string) {
  if (index > str.length - 1) return str;
  return str.substring(0, index) + chr + str.substring(index + 1);
}

function moveNorth(oldCommands: string[]) {
  let run = true;
  const commands = structuredClone(oldCommands);
  while (run) {
    let starting = commands.join("");
    for (let i = 1; i < commands.length; i++) {
      for (let j = 0; j < commands[0].length; j++) {
        if (
          commands[i].charAt(j) === "O" &&
          commands[i - 1].charAt(j) === "."
        ) {
          commands[i] = setCharAt(commands[i], j, ".");
          commands[i - 1] = setCharAt(commands[i - 1], j, "O");
        }
      }
    }
    let end = commands.join("");
    if (starting === end) {
      run = false;
    }
  }
  return commands;
}

function moveSouth(oldCommands: string[]) {
  let run = true;
  const commands = structuredClone(oldCommands);
  while (run) {
    let starting = commands.join("");
    for (let i = commands.length - 2; i >= 0; i--) {
      for (let j = 0; j < commands[0].length; j++) {
        if (
          commands[i].charAt(j) === "O" &&
          commands[i + 1].charAt(j) === "."
        ) {
          commands[i] = setCharAt(commands[i], j, ".");
          commands[i + 1] = setCharAt(commands[i + 1], j, "O");
        }
      }
    }
    let end = commands.join("");
    if (starting === end) {
      run = false;
    }
  }
  return commands;
}

function moveWest(oldCommands: string[]) {
  let run = true;
  const commands = structuredClone(oldCommands);
  while (run) {
    let starting = commands.join("");
    for (let j = 1; j < commands[0].length; j++) {
      for (let i = 0; i < commands.length; i++) {
        if (
          commands[i].charAt(j) === "O" &&
          commands[i].charAt(j - 1) === "."
        ) {
          commands[i] = setCharAt(commands[i], j, ".");
          commands[i] = setCharAt(commands[i], j - 1, "O");
        }
      }
    }
    let end = commands.join("");
    if (starting === end) {
      run = false;
    }
  }
  return commands;
}

function moveEast(oldCommands: string[]) {
  let run = true;
  const commands = structuredClone(oldCommands);
  while (run) {
    let starting = commands.join("");
    for (let j = commands[0].length; j >= 0; j--) {
      for (let i = 0; i < commands.length; i++) {
        if (
          commands[i].charAt(j) === "O" &&
          commands[i].charAt(j + 1) === "."
        ) {
          commands[i] = setCharAt(commands[i], j, ".");
          commands[i] = setCharAt(commands[i], j + 1, "O");
        }
      }
    }
    let end = commands.join("");
    if (starting === end) {
      run = false;
    }
  }
  return commands;
}

function partOne() {
  let commandsCopy = structuredClone(commands);
  commandsCopy = moveNorth(commandsCopy);

  let total = 0;
  for (let i = 0; i < commandsCopy.length; i++) {
    for (let j = 0; j < commandsCopy[0].length; j++) {
      if (commandsCopy[i].charAt(j) === "O") {
        total += commandsCopy.length - i;
      }
    }
  }
  console.log(total);
}

function partTwo() {
  let commandsCopy = structuredClone(commands);
  let stack = [commandsCopy.join("")];
  let newLimit = Number.MAX_SAFE_INTEGER;
  let notStopped = true;
  for (let i = 0; i < 1000000000 && i <= newLimit; i++) {
    commandsCopy = moveNorth(commandsCopy);
    commandsCopy = moveWest(commandsCopy);
    commandsCopy = moveSouth(commandsCopy);
    commandsCopy = moveEast(commandsCopy);
    stack.push(commandsCopy.join(""));
    const existingCycle = catchCycle(stack);
    if (existingCycle.start && notStopped) {
      notStopped = false;
      newLimit =
        ((1000000000 - existingCycle.start) % existingCycle.length) + i + 1;
    }
  }

  let total = 0;
  for (let i = 0; i < commandsCopy.length; i++) {
    for (let j = 0; j < commandsCopy[0].length; j++) {
      if (commandsCopy[i].charAt(j) === "O") {
        total += commandsCopy.length - i;
      }
    }
  }
  console.log(total);
}

partOne();
partTwo();
