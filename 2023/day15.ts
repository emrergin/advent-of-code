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

partOne();
