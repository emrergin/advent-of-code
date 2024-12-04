import { readFileSync } from "fs";
const commands = readFileSync(`day4input.txt`, "utf-8")
  .split("\r\n")
  .map((a) => a.split(""));

function partOne() {
  const directions: [number, number][] = [
    [0, 1],
    [0, -1],
    [1, 0],
    [1, 1],
    [1, -1],
    [-1, 0],
    [-1, 1],
    [-1, -1],
  ];
  const letters = ["X", "M", "A", "S"];

  function checkDirection(
    startPosition: [number, number],
    step: [number, number]
  ) {
    let currentPosition = startPosition;
    for (let i = 0; i < 4; i++) {
      if (commands[currentPosition[0]][currentPosition[1]] !== letters[i]) {
        return false;
      }
      currentPosition = [
        currentPosition[0] + step[0],
        currentPosition[1] + step[1],
      ];
      if (
        (currentPosition[0] >= commands.length ||
          currentPosition[0] < 0 ||
          currentPosition[1] >= commands[0].length ||
          currentPosition[1] < 0) &&
        i !== 3
      ) {
        return false;
      }
    }
    return true;
  }

  let count = 0;
  for (let x = 0; x < commands.length; x++) {
    for (let y = 0; y < commands[0].length; y++) {
      count += directions.filter((d) => checkDirection([x, y], d)).length;
    }
  }
  console.log(count);
}

function partTwo() {
  let count = 0;
  for (let x = 1; x < commands.length - 1; x++) {
    for (let y = 1; y < commands[0].length - 1; y++) {
      if (
        commands[x][y] === "A" &&
        ((commands[x - 1][y - 1] === "S" && commands[x + 1][y + 1] === "M") ||
          (commands[x - 1][y - 1] === "M" && commands[x + 1][y + 1] === "S")) &&
        ((commands[x + 1][y - 1] === "S" && commands[x - 1][y + 1] === "M") ||
          (commands[x + 1][y - 1] === "M" && commands[x - 1][y + 1] === "S"))
      ) {
        count++;
      }
    }
  }
  console.log(count);
}

partOne();
partTwo();
