import { readFileSync } from "fs";
const commands = readFileSync(`day2input.txt`, "utf-8")
  .split("\r\n")
  .map((a) =>
    a.split(/\;|\:/).map((a) =>
      a.split(",").map((b) => {
        const c = b.trim().split(" ");
        if (/\d+/.test(c[0])) {
          return { [c[1]]: Number(c[0]) };
        } else {
          return Number(c[1]);
        }
      })
    )
  );

function partOne() {
  const limits: Record<string, number> = { red: 12, green: 13, blue: 14 };
  function testCommand(
    command: (
      | number
      | {
          [x: string]: number;
        }
    )[][]
  ) {
    let valid = true;
    const relevantPartOfCommand = command.slice(1) as {
      [x: string]: number;
    }[][];
    for (let subcommand of relevantPartOfCommand) {
      subcommand.forEach((a) => {
        const key = Object.keys(a)[0];
        const relatedLimit = limits[key];
        if (a[key] > relatedLimit) {
          valid = false;
        }
      });
    }
    return valid;
  }

  let total = 0;
  let index = 1;
  for (let command of commands) {
    total += index * Number(testCommand(command));
    index++;
  }
  console.log(total);
}

function partTwo() {
  function getMinimumValuesForCommand(
    command: (
      | number
      | {
          [x: string]: number;
        }
    )[][]
  ) {
    const relevantPartOfCommand = command.slice(1) as {
      [x: string]: number;
    }[][];
    const limits: Record<string, number> = { red: 0, green: 0, blue: 0 };
    for (let subcommand of relevantPartOfCommand) {
      subcommand.forEach((a) => {
        const key = Object.keys(a)[0];
        const relatedLimit = limits[key];
        if (a[key] > relatedLimit) {
          limits[key] = a[key];
        }
      });
    }
    return limits.red * limits.green * limits.blue;
  }

  let total = 0;
  for (let command of commands) {
    total += getMinimumValuesForCommand(command);
  }
  console.log(total);
}

partOne();
partTwo();
