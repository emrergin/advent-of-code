import { readFileSync } from "fs";
import Computer from "./Computer.js";
import { permutator } from "../utilities/functions.mjs";

const nums = readFileSync(`day7input.txt`, "utf-8").split(",");

function partOne() {
  let maximumValue = Number.MIN_SAFE_INTEGER;

  const allPermutations = permutator([0, 1, 2, 3, 4]);
  for (let permutation of allPermutations) {
    const compA = new Computer(nums, [permutation[0], 0]);
    const outputOfA = compA.workTillEndAndDiagnose();
    const compB = new Computer(nums, [permutation[1], outputOfA]);
    const outputOfB = compB.workTillEndAndDiagnose();
    const compC = new Computer(nums, [permutation[2], outputOfB]);
    const outputOfC = compC.workTillEndAndDiagnose();
    const compD = new Computer(nums, [permutation[3], outputOfC]);
    const outputOfD = compD.workTillEndAndDiagnose();
    const compE = new Computer(nums, [permutation[4], outputOfD]);
    const outputOfE = compE.workTillEndAndDiagnose();
    maximumValue = Math.max(maximumValue, +outputOfE[0]);
  }
  console.log(maximumValue);
}

function partTwo() {
  let maximumValue = Number.MIN_SAFE_INTEGER;

  const allPermutations = permutator([5, 6, 7, 8, 9]);

  for (let permutation of allPermutations) {
    console.log(permutation);
    let computers = [
      new Computer(nums, [permutation[0], 0]),
      new Computer(nums, [permutation[1]]),
      new Computer(nums, [permutation[2]]),
      new Computer(nums, [permutation[3]]),
      new Computer(nums, [permutation[4]]),
    ];

    let activeComputer = 0;
    while (true) {
      computers[activeComputer].workOnce();
      if (computers[0].halted) {
        break;
      }
      if (computers[activeComputer].outputs.length === 1) {
        if (!computers[(activeComputer + 1) % 5].halted) {
          computers[(activeComputer + 1) % 5].inputs.push(
            computers[activeComputer].outputs.pop()
          );
          activeComputer = (activeComputer + 1) % 5;
        } else {
          break;
        }
      }
    }
    maximumValue = Math.max(maximumValue, +computers[0].inputs[0]);
  }
  console.log(maximumValue);
}

partOne();
partTwo();
