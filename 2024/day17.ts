import { readFileSync } from "fs";

const input = readFileSync(`day17input.txt`, "utf-8").split("\r\n\r\n");

const registerValues = input[0]
  .split("\r\n")
  .map((a) => Number(a.split(" ")[2]));
const program = input[1].split(" ")[1].split(",").map(Number);

function partOne() {
  let allOutputs: number[] = [];
  let registerCopy = structuredClone(registerValues);
  let a = registerCopy[0];
  while (a > 0) {
    a = fullCycleForMyInput(a, allOutputs);
  }
  console.log(allOutputs.join(","));
}

function aCycle(a: number) {
  return ((getB(a) ^ getC(a)) >>> 0) % 8;

  function getB(a: number) {
    return a % 8;
  }

  function getC(a: number) {
    return Math.floor(a / 2 ** ((a % 8 ^ 7) >>> 0));
  }
}

function getAForNumber(t: number) {
  let aa = 1;
  while (true) {
    if (aCycle(aa) === t) {
      break;
    } else {
      aa++;
    }
  }

  let resultingA = aa;
  return resultingA;
}

function fullCycleForMyInput(a: number, outputs?: number[]) {
  let result = aCycle(a);
  if (outputs) {
    outputs.push(result);
  } else {
    console.log(result);
  }
  return Math.floor(a / 8);
}

function checkNumber(aa: number, k: number) {
  let a = aa;

  let o: number[] = [];
  while (a > 0) {
    a = fullCycleForMyInput(a, o);
  }

  return (
    o.toReversed().join("").slice(0, k) ===
    program.toReversed().join("").slice(0, k)
  );
}

function partTwo() {
  let nextStepCandidates = [getAForNumber(program[program.length - 1])];
  let k = 1;

  while (k < 16) {
    nextStepCandidates = nextStepCandidates
      .flatMap((a) => generateArray(a))
      .filter((a) => checkNumber(a, k));
    k++;
  }

  nextStepCandidates = nextStepCandidates.filter((a) => {
    let o: number[] = [];
    while (a > 0) {
      a = fullCycleForMyInput(a, o);
    }
    return o.join("") === program.join("");
  });

  console.log(Math.min(...nextStepCandidates));
}

function generateArray(target: number) {
  const start = target * 8;
  const end = start + 7;
  const result = [];

  for (let i = start; i <= end; i++) {
    result.push(i);
  }

  return result;
}

partOne();
partTwo();
