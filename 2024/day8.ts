import { readFileSync } from "fs";
const commands = readFileSync(`day8input.txt`, "utf-8")
  .split("\r\n")
  .map((a) => a.split(""));

const signalsMap = new Map<string, string>();
const signalKeys: [number, number][] = [];

for (let i = 0; i < commands.length; i++) {
  for (let j = 0; j < commands[0].length; j++) {
    if (commands[i][j] !== ".") {
      signalsMap.set(`${i}|${j}`, commands[i][j]);
      signalKeys.push([i, j]);
    }
  }
}

function partOne() {
  let count = 0;
  for (let i = 0; i < commands.length; i++) {
    outer: for (let j = 0; j < commands[0].length; j++) {
      for (let k = 0; k < signalKeys.length; k++) {
        const dx = signalKeys[k][0] - i;
        const dy = signalKeys[k][1] - j;
        if (
          signalsMap.get(`${i + 2 * dx}|${j + 2 * dy}`) ===
            signalsMap.get(`${signalKeys[k][0]}|${signalKeys[k][1]}`) &&
          signalsMap.get(`${i + 2 * dx}|${j + 2 * dy}`) !==
            signalsMap.get(`${i}|${j}`)
        ) {
          count++;
          continue outer;
        }
      }
    }
  }

  console.log(count);
}

function partTwo() {
  let count = 0;
  for (let i = 0; i < commands.length; i++) {
    outer: for (let j = 0; j < commands[0].length; j++) {
      for (let k = 0; k < signalKeys.length; k++) {
        for (let l = 0; l < signalKeys.length; l++) {
          if (k === l) {
            continue;
          }
          const dx1 = signalKeys[k][0] - i;
          const dy1 = signalKeys[k][1] - j;
          const dx2 = signalKeys[l][0] - i;
          const dy2 = signalKeys[l][1] - j;
          if (
            signalsMap.get(`${signalKeys[k][0]}|${signalKeys[k][1]}`) ===
              signalsMap.get(`${signalKeys[l][0]}|${signalKeys[l][1]}`) &&
            (dx1 / dy1 === dx2 / dy2 ||
              (dx1 === 0 && dy1 === 0) ||
              (dx2 === 0 && dy2 === 0))
          ) {
            count++;
            continue outer;
          }
        }
      }
    }
  }

  console.log(count);
}

partOne();
partTwo();
