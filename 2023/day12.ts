import { readFileSync } from "fs";
const commands: [string, number[]][] = readFileSync(`day12input.txt`, "utf-8")
  .split("\r\n")
  .map((a) => a.split(" "))
  .map((a) => [
    (a[0]
      .replaceAll(".", "_")
      .replaceAll("?", "x")
      .replaceAll(/_+/g, "_") as string) + "_",
    a[1].split(",").map(Number),
  ]);

function setCharAt(str: string, index: number, chr: string) {
  if (index > str.length - 1) return str;
  return str.substring(0, index) + chr + str.substring(index + 1);
}

function getNumberOfPossibilities(command: [string, number[]]) {
  const mapOfPlacements = new Map<string, number>();

  const stack = [command];
  while (stack.length > 0) {
    const currentArguments = stack[stack.length - 1];
    const str = currentArguments[0];
    const numbers = currentArguments[1];
    const num = currentArguments[1][0];
    const key = str + ":" + numbers.join(",");

    const morePounds = str.includes("#");
    if (!morePounds && numbers.length === 0) {
      mapOfPlacements.set(key, 1);
      stack.pop();
      continue;
    }
    if (morePounds && numbers.length === 0) {
      mapOfPlacements.set(key, 0);
      stack.pop();
      continue;
    }
    if (str.length < numbers[numbers.length - 1]) {
      mapOfPlacements.set(key, 0);
      stack.pop();
      continue;
    }

    const sumOfRest = numbers.reduce((acc, curr) => acc + curr, 0);
    const restOfDots = numbers.length - 1;
    if (sumOfRest + restOfDots > str.length) {
      mapOfPlacements.set(key, 0);
      stack.pop();
      continue;
    }

    if (str.charAt(0) === "_") {
      const targetArray = [str.slice(1), numbers] as [string, number[]];
      const targetKey = targetArray[0] + ":" + targetArray[1].join(",");
      const targetValue = mapOfPlacements.get(targetKey);
      if (targetValue !== undefined) {
        mapOfPlacements.set(key, targetValue);
        stack.pop();
        continue;
      } else {
        stack.push(targetArray);
        continue;
      }
    } else if (str.charAt(0) === "x") {
      const newStr = setCharAt(str, 0, "#");
      const targetArray1 = [newStr, numbers] as [string, number[]];
      const targetArray2 = [str.slice(1), numbers] as [string, number[]];
      const targetKey1 = targetArray1[0] + ":" + targetArray1[1].join(",");
      const targetKey2 = targetArray2[0] + ":" + targetArray2[1].join(",");
      const targetValue1 = mapOfPlacements.get(targetKey1);
      const targetValue2 = mapOfPlacements.get(targetKey2);
      if (targetValue1 !== undefined && targetValue2 !== undefined) {
        mapOfPlacements.set(key, targetValue1 + targetValue2);
        stack.pop();
        continue;
      }
      if (targetValue1 === undefined) {
        stack.push(targetArray1);
      }
      if (targetValue2 === undefined) {
        stack.push(targetArray2);
      }
      continue;
    } else {
      const reg = new RegExp(`(#|x){${num}}(x|_)`);
      if (str.slice(0, num + 1).match(reg)) {
        const targetArray = [str.slice(num + 1), numbers.slice(1)] as [
          string,
          number[]
        ];
        const targetKey = targetArray[0] + ":" + targetArray[1].join(",");
        const targetValue = mapOfPlacements.get(targetKey);
        if (targetValue !== undefined) {
          mapOfPlacements.set(key, targetValue);
          stack.pop();
          continue;
        } else {
          stack.push(targetArray);
          continue;
        }
      } else {
        mapOfPlacements.set(key, 0);
        stack.pop();
        continue;
      }
    }
  }

  return mapOfPlacements.get(command[0] + ":" + command[1].join(",")) as number;
}

function partOne() {
  let numberOfPos = 0;
  for (let command of commands) {
    numberOfPos += getNumberOfPossibilities(command);
  }
  console.log(numberOfPos);
}
partOne();

function convertToPart2(command: [string, number[]]) {
  const repeat = (arr: number[], n: number) => [].concat(...Array(n).fill(arr));
  const updatedCommand =
    (command[0].slice(0, -1) + "x").repeat(5).slice(0, -1) + "_";

  const com1 = repeat(command[1], 5) as number[];
  return [updatedCommand, com1] as [string, number[]];
}

function partTwo() {
  let numberOfPos = 0;
  for (let command of commands) {
    numberOfPos += getNumberOfPossibilities(convertToPart2(command));
  }
  console.log(numberOfPos);
}

partTwo();
