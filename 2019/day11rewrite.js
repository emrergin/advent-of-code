import { readFileSync } from "fs";
import { PainterRobot } from "./Computer.js";
const nums = readFileSync(`day11input.txt`, "utf-8").split(",");

function partOne() {
  const allTiles = [];
  const robot = new PainterRobot(nums, ["0"], 0, allTiles);
  robot.workTillEnd();
  console.log(allTiles.filter((a) => a.painted).length);
}

function partTwo() {
  const allTiles = [];
  const robot = new PainterRobot(nums, ["1"], 0, allTiles);
  robot.workTillEnd();
  robot.paintTiles();
}

partOne();
partTwo();
