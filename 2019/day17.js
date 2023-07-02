import { readFileSync } from "fs";
import Computer from "./Computer.js";
const nums = readFileSync(`day17input.txt`, "utf-8").split(",");

function partOne() {
  const robot = new Computer(nums, [], 0, 0, 0);
  robot.workTillEnd();

  let grid = parseOutput(robot.outputs);

  let calibrationValue = 0;
  for (let j = 1; j < grid.length - 1; j++) {
    for (let i = 1; i < grid[0].length - 1; i++) {
      if (
        grid[j - 1][i] === 1 &&
        grid[j + 1][i] === 1 &&
        grid[j][i + 1] === 1 &&
        grid[j][i - 1] === 1 &&
        grid[j][i] === 1
      ) {
        calibrationValue += i * j;
      }
    }
  }

  console.log(calibrationValue);

  function parseOutput(output) {
    const outputGrid = [[]];
    //1 scaffold, 2 robot, 0 empty
    for (let char of output) {
      if (char === "35") {
        outputGrid[outputGrid.length - 1].push(1);
      } else if (char === "46") {
        outputGrid[outputGrid.length - 1].push(0);
      } else if (char === "10") {
        outputGrid.push([]);
      } else {
        outputGrid[outputGrid.length - 1].push(2);
      }
    }
    return outputGrid;
  }
}

partOne();
