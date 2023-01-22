import { readFileSync } from "fs";
import Computer from "./Computer.js";

const nums = readFileSync(`day2input.txt`, "utf-8").split(",");

function partOne() {
  let input = structuredClone(nums);
  input[1] = String(12);
  input[2] = String(2);

  const comp = new Computer(input);
  console.log(comp.workTillEnd());
}

function partTwo(valueToFind) {
  outerloop: for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      const input = structuredClone(nums);
      input[1] = String(i);
      input[2] = String(j);

      const comp = new Computer(input);
      if (comp.workTillEnd() === String(valueToFind)) {
        console.log(i * 100 + j);
        break outerloop;
      }
    }
  }
}

partOne(); //4090701
partTwo(19690720); //6421
