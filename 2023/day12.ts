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

function getNumberOfPossibilities(
  command: [string, number[]],
  mapOfPlacements: Map<string, number>
): number {
  const str = command[0];
  const numbers = command[1];
  const key = str + ":" + numbers.join("");
  const num = command[1][0];
  let result = mapOfPlacements.get(key);
  if (result) {
    mapOfPlacements.set(key, 0);
    return result;
  }
  const morePounds = str.includes("#");
  if (!morePounds && numbers.length === 0) {
    mapOfPlacements.set(key, 1);
    return 1;
  }
  if (morePounds && numbers.length === 0) {
    mapOfPlacements.set(key, 0);
    return 0;
  }

  if (str.length < numbers[numbers.length - 1]) {
    mapOfPlacements.set(key, 0);
    return 0;
  }

  const sumOfRest = numbers.reduce((acc, curr) => acc + curr, 0);
  const restOfDots = numbers.length - 1;
  if (sumOfRest + restOfDots > str.length) {
    mapOfPlacements.set(key, 0);
    return 0;
  }

  if (str.charAt(0) === "_") {
    let result = getNumberOfPossibilities(
      [str.slice(1), numbers],
      mapOfPlacements
    );
    mapOfPlacements.set(key, result);
    return result;
  } else if (str.charAt(0) === "x") {
    const newStr = setCharAt(str, 0, "#");
    let result =
      getNumberOfPossibilities([str.slice(1), numbers], mapOfPlacements) +
      getNumberOfPossibilities([newStr, numbers], mapOfPlacements);
    mapOfPlacements.set(key, result);
    return result;
  } else {
    let reg = new RegExp(`(#|x){${num}}(x|_)`);
    if (str.slice(0, num + 1).match(reg)) {
      let result = getNumberOfPossibilities(
        [str.slice(num + 1), numbers.slice(1)],
        mapOfPlacements
      );
      mapOfPlacements.set(key, result);
      return result;
    } else {
      mapOfPlacements.set(key, 0);
      return 0;
    }
  }
}

function partOne() {
  let numberOfPos = 0;
  for (let i = 0; i < commands.length; i++) {
    const mapOfPlacements = new Map();
    const number = getNumberOfPossibilities(commands[i], mapOfPlacements);

    numberOfPos += number;
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
  let index = 0;
  for (let command of commands) {
    index++;
    const mapOfPlacements = new Map();
    const number = getNumberOfPossibilities(
      convertToPart2(command),
      mapOfPlacements
    );
    numberOfPos += number;
    console.log(index, number, command[1]);
  }
  console.log(numberOfPos);
}

partTwo();
