import { readFileSync } from "fs";
const commands = readFileSync(`day18input.txt`, "utf-8")
  .split("\n")
  .map((a) => a.split(",").map(Number));

function distanceBetweenCubes(cube1, cube2) {
  return Math.sqrt(
    Math.abs(cube1[0] - cube2[0]) +
      Math.abs(cube1[1] - cube2[1]) +
      Math.abs(cube1[2] - cube2[2])
  );
}

function partOne() {
  let total = 6 * commands.length;

  for (let i = 0; i < commands.length; i++) {
    for (let j = i + 1; j < commands.length; j++) {
      const temp = distanceBetweenCubes(commands[i], commands[j]);
      if (temp <= 1) {
        total -= 2;
      }
    }
  }

  console.log(total);
}

function partTwo() {
  let maxX = Math.max(...commands.flatMap((a) => a[0]));
  let minX = Math.min(...commands.flatMap((a) => a[0]));
  let maxY = Math.max(...commands.flatMap((a) => a[1]));
  let minY = Math.min(...commands.flatMap((a) => a[1]));
  let maxZ = Math.max(...commands.flatMap((a) => a[2]));
  let minZ = Math.min(...commands.flatMap((a) => a[2]));

  const m = maxZ - minZ;
  const n = maxY - minY;
  const l = maxX - minX;
  let arr = Array(m + 1)
    .fill()
    .map(() =>
      Array(n + 1)
        .fill()
        .map(() => Array(l + 1))
    );

  for (let i = minZ; i <= m; i++) {
    for (let j = minY; j <= n; j++) {
      for (let k = minX; k <= l; k++) {
        arr[i - minZ][j - minY][k - minX] = 0;
      }
    }
  }

  for (let command of commands) {
    arr[command[2] - minZ][command[1] - minY][command[0] - minX] = 1;
  }

  let counter = 0;
  let tempCopy = structuredClone(arr);
  while (true) {
    for (let i = minZ; i <= m; i++) {
      for (let j = minY; j <= n; j++) {
        for (let k = minX; k <= l; k++) {
          if (
            arr[i - minZ][j - minY][k - minX] === 0 &&
            (i === minZ ||
              j === minY ||
              k == minX ||
              i === maxZ ||
              j === maxY ||
              k === maxX ||
              (i - minZ >= 1 &&
                arr[i - minZ - 1][j - minY][k - minX] === ".") ||
              (i - minZ + 1 <= m &&
                arr[i - minZ + 1][j - minY][k - minX] === ".") ||
              (j - minY >= 1 &&
                arr[i - minZ][j - minY - 1][k - minX] === ".") ||
              (j - minY + 1 <= n &&
                arr[i - minZ][j - minY + 1][k - minX] === ".") ||
              (k - minX >= 1 &&
                arr[i - minZ][j - minY][k - minX - 1] === ".") ||
              (k - minX + 1 <= l &&
                arr[i - minZ][j - minY][k - minX + 1] === "."))
          ) {
            arr[i - minZ][j - minY][k - minX] = ".";
          }
        }
      }
    }
    if (JSON.stringify(tempCopy) === JSON.stringify(arr)) {
      break;
    }
    counter++;
    tempCopy = structuredClone(arr);
  }

  const commandWithAdditions = structuredClone(commands);

  for (let i = minZ; i <= m; i++) {
    for (let j = minY; j <= n; j++) {
      for (let k = minX; k <= l; k++) {
        if (arr[i - minZ][j - minY][k - minX] === 0) {
          commandWithAdditions.push([k, j, i]);
        }
      }
    }
  }

  let total = 6 * commandWithAdditions.length;

  for (let i = 0; i < commandWithAdditions.length; i++) {
    for (let j = i + 1; j < commandWithAdditions.length; j++) {
      const temp = distanceBetweenCubes(
        commandWithAdditions[i],
        commandWithAdditions[j]
      );
      if (temp <= 1) {
        total -= 2;
      }
    }
  }

  console.log(total);
}

partTwo();
