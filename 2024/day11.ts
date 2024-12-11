import { readFileSync } from "fs";
const commands = readFileSync(`day11input.txt`, "utf-8").split(" ");

function part(w: 1 | 2) {
  let oldCommands = commands.reduce((acc, curr) => {
    if (acc[curr] === undefined) {
      acc[curr] = 1;
    } else {
      acc[curr] += 1;
    }
    return acc;
  }, {} as Record<string, number>);
  let newCommands: Record<string, number> = {};

  for (let k = 0; k < (w === 1 ? 25 : 75); k++) {
    for (const key in oldCommands) {
      if (key === "0") {
        newCommands[1] = oldCommands[key];
      } else if (`${key}`.length % 2 === 0) {
        const firstHalf = Number(`${key}`.slice(0, `${key}`.length / 2));
        const secondHalf = Number(`${key}`.slice(`${key}`.length / 2));
        if (newCommands[firstHalf]) {
          newCommands[firstHalf] = newCommands[firstHalf] + oldCommands[key];
        } else {
          newCommands[firstHalf] = oldCommands[key];
        }
        if (newCommands[secondHalf]) {
          newCommands[secondHalf] = newCommands[secondHalf] + oldCommands[key];
        } else {
          newCommands[secondHalf] = oldCommands[key];
        }
      } else {
        const newKey = Number(key) * 2024;
        if (newCommands[newKey]) {
          newCommands[newKey] = newCommands[newKey] + oldCommands[key];
        } else {
          newCommands[newKey] = oldCommands[key];
        }
      }
    }
    oldCommands = newCommands;
    newCommands = {};
  }
  let total = 0;
  for (const key in oldCommands) {
    total += oldCommands[key];
  }
  console.log(total);
}

part(1);
part(2);
