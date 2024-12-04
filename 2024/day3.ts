import { readFileSync } from "fs";
const commands = readFileSync(`day3input.txt`, "utf-8");

const regex = new RegExp(/mul\((\d+),(\d+)\)/g);

function partOne() {
  let array1;
  let result = 0;
  while ((array1 = regex.exec(commands)) !== null) {
    result += Number(array1[1]) * Number(array1[2]);
  }
  console.log(result);
}

function partTwo() {
  let result = 0;
  const doRegex = new RegExp(/do\(\)/g);
  const dontRegex = new RegExp(/don't\(\)/g);
  let switchOn = [0];
  let switchOff: number[] = [];
  let array1;
  while ((array1 = doRegex.exec(commands)) !== null) {
    switchOn.push(array1.index);
  }
  while ((array1 = dontRegex.exec(commands)) !== null) {
    switchOff.push(array1.index);
  }

  let booleans: boolean[] = [];
  let add = true;
  for (let i = 0; i < commands.length; i++) {
    if (i === switchOn[0]) {
      add = true;
      switchOn.shift();
    }
    if (i === switchOff[0]) {
      add = false;
      switchOff.shift();
    }
    booleans[i] = add;
  }

  while ((array1 = regex.exec(commands)) !== null) {
    if (booleans[array1.index]) {
      result += Number(array1[1]) * Number(array1[2]);
    }
  }

  console.log(result);
}

partOne();
partTwo();
