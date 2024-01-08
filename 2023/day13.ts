import { readFileSync } from "fs";
const commands = readFileSync(`day13input.txt`, "utf-8")
  .split("\r\n\r\n")
  .map((a) => a.split("\r\n").map((b) => b.split("")));

function horizontalCheck(command: string[][], otherLine?: number | null) {
  let result: number | null = null;
  const rows = command.map((a) => a.join(""));
  outer: for (let refX = 1; refX < command.length; refX++) {
    for (let i = 1; refX + i - 1 < command.length && refX - i >= 0; i++) {
      if (rows[refX + i - 1] !== rows[refX - i]) {
        continue outer;
      }
    }
    result = refX;
    if (result !== otherLine) {
      return result;
    }
  }
  return result;
}

function verticalCheck(command: string[][], otherLine?: number | null) {
  let result: number | null = null;
  const columns = command[0]
    .map((_, colIndex) => command.map((row) => row[colIndex]))
    .map((a) => a.join(""));

  outer: for (let refY = 1; refY < columns.length; refY++) {
    for (let i = 1; refY + i - 1 < columns.length && refY - i >= 0; i++) {
      if (columns[refY + i - 1] !== columns[refY - i]) {
        continue outer;
      }
    }
    result = refY;
    if (result !== otherLine) {
      return result;
    }
  }
}

function partOne() {
  let total = 0;
  for (let command of commands) {
    const horizontal = horizontalCheck(command);
    const vertical = verticalCheck(command);
    total += (horizontal || 0) * 100;
    total += vertical || 0;
  }

  console.log(total);
}

function partTwo() {
  let total = 0;
  outer: for (let command of commands) {
    const horizontal = horizontalCheck(command);
    const vertical = verticalCheck(command);
    for (let i = 0; i < command.length; i++) {
      for (let j = 0; j < command[0].length; j++) {
        let commandCopy = structuredClone(command);
        commandCopy[i][j] = commandCopy[i][j] === "." ? "#" : ".";
        const horizontalP = horizontalCheck(commandCopy, horizontal);
        const verticalP = verticalCheck(commandCopy, vertical);
        if (
          (horizontal !== horizontalP && horizontalP) ||
          (verticalP !== vertical && verticalP)
        ) {
          if (horizontal !== horizontalP) {
            total += (horizontalP || 0) * 100;
          }
          if (vertical !== verticalP) {
            total += verticalP || 0;
          }
          continue outer;
        }
      }
    }
  }
  console.log(total);
}

partOne();
partTwo();
