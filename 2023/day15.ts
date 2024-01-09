import { readFileSync } from "fs";
const commands = readFileSync(`day15input.txt`, "utf-8").split(",");

function hash(str: string) {
  let currentValue = 0;
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    currentValue += code;
    currentValue *= 17;
    currentValue = currentValue % 256;
  }
  return currentValue;
}

function partOne() {
  let total = 0;
  for (let command of commands) {
    total += hash(command);
  }
  console.log(total);
}

// partOne();

function partTwo() {
  let arr: { label: string; fLen: number }[][] = [...Array(256)].map((e) => []);
  for (let command of commands) {
    const parsedCommand = parseCommand(command);
    const targetBox = hash(parsedCommand.label);
    if (parsedCommand.sign === "-") {
      const targetIndex = arr[targetBox].findIndex(
        (l) => l.label === parsedCommand.label
      );
      if (targetIndex !== -1) {
        arr[targetBox].splice(targetIndex, 1);
      }
    } else if (parsedCommand.fLen) {
      const targetLens = arr[targetBox].find(
        (l) => l.label === parsedCommand.label
      );
      if (targetLens) {
        targetLens.fLen = parsedCommand.fLen;
      } else {
        arr[targetBox].push({
          label: parsedCommand.label,
          fLen: parsedCommand.fLen,
        });
      }
    }
  }
  let total = 0;
  for (let i = 0; i < 256; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      total += (i + 1) * (j + 1) * arr[i][j].fLen;
    }
  }
  console.log(total);
}
partTwo();

function parseCommand(str: string) {
  const regex = /(\w+)(=|-)(\d)?/;
  const res = str.match(regex);
  return {
    label: res?.[1] as string,
    sign: res?.[2] as "-" | "=",
    fLen: Number(res?.[3]),
  };
}
