import { readFileSync } from "fs";
const commands = readFileSync(`day11input.txt`, "utf-8").split(" ");

function setValue(record: Record<string, number>, key: number, value: number) {
  if (record[key]) {
    record[key] = record[key] + value;
  } else {
    record[key] = value;
  }
}

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
        setValue(newCommands, 1, oldCommands[key]);
      } else if (`${key}`.length % 2 === 0) {
        const firstHalf = Number(`${key}`.slice(0, `${key}`.length / 2));
        const secondHalf = Number(`${key}`.slice(`${key}`.length / 2));
        setValue(newCommands, firstHalf, oldCommands[key]);
        setValue(newCommands, secondHalf, oldCommands[key]);
      } else {
        const newKey = Number(key) * 2024;
        setValue(newCommands, newKey, oldCommands[key]);
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
