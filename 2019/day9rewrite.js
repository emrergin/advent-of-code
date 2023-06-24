import { readFileSync } from "fs";
import Computer from "./Computer.js";
const nums = readFileSync(`day9input.txt`, "utf-8").split(",\r\n");

function partOne() {
  const comp = new Computer(nums, [1]);
  console.log(comp.workTillEndAndDiagnose());
}

function partTwo() {
  const comp = new Computer(nums, [2]);
  console.log(comp.workTillEndAndDiagnose());
}

partOne();
partTwo();
