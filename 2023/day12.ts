import { readFileSync } from "fs";
const commands: [string[], string][] = readFileSync(`day12input.txt`, "utf-8")
  .split("\r\n")
  .map((a) => a.split(" "))
  .map((a) => [a[0].split(""), a[1]]);

function convertToNumbers(code: string[]) {
  return code
    .reduce(
      (acc, curr) => {
        if (curr !== ".") {
          acc[acc.length - 1] = acc[acc.length - 1] + 1;
        } else if (acc[acc.length - 1] > 0) {
          acc.push(0);
        }
        return acc;
      },
      [0]
    )
    .filter((a) => a > 0)
    .join(",");
}

function generateAllPossibilities(code: string[]) {
  let possibilities = [code];

  outer: for (let j = 0; j < possibilities.length; j++) {
    let currentCode = possibilities[j];
    for (let i = 0; i < code.length; i++) {
      if (currentCode[i] === "?") {
        const newCode1 = [...currentCode];
        const newCode2 = [...currentCode];
        newCode1[i] = ".";
        newCode2[i] = "#";
        possibilities.splice(j, 1);
        possibilities.push(newCode1, newCode2);
        j--;
        continue outer;
      }
    }
  }
  return possibilities;
}

function getNumberOfPossibilities(code: string[], numbers: string) {
  return generateAllPossibilities(code)
    .filter((a) => convertToNumbers(a) === numbers)
    .map((a) => a.join()).length;
}

function partOne() {
  let possibilities = 0;
  let index = 0;
  for (let command of commands) {
    index++;
    console.log(index);
    possibilities += getNumberOfPossibilities(command[0], command[1]);
  }
  console.log(possibilities);
}
partOne();

function partTwo() {
  let possibilities = 0;
  let index = 0;
  for (let command of commands) {
    index++;

    const com = [
      ...command[0],
      "?",
      ...command[0],
      "?",
      ...command[0],
      "?",
      ...command[0],
      "?",
      ...command[0],
    ];
    const toAdd = getNumberOfPossibilities(
      com,
      (command[1] + ",").repeat(5).slice(0, -1)
    );
    console.log(index, toAdd);
    possibilities += toAdd;
  }
  console.log(possibilities);
}

partTwo();
