import { readFileSync } from "fs";
const commands = readFileSync(`day7input.txt`, "utf-8")
  .split("\r\n")
  .map((a) => a.split(":").map((a) => a.trim().split(" ").map(Number)));

function isToBePrunned(
  currentValue: number,
  valueToReach: number,
  remainingValues: number[],
  part: 1 | 2
) {
  return (
    currentValue <= valueToReach &&
    highestValueCanBeReached(currentValue, remainingValues, part) >=
      valueToReach &&
    lowestValueCanBeReached(currentValue, remainingValues, part) <= valueToReach
  );

  function highestValueCanBeReached(
    currentValue: number,
    remainingValues: number[],
    part: 1 | 2
  ) {
    let cV = currentValue;
    for (let i = 0; i < remainingValues.length; i++) {
      cV = Math.max(
        part === 1
          ? Number.MIN_SAFE_INTEGER
          : Number(`${cV}${remainingValues[i]}`),
        cV * remainingValues[i],
        cV + remainingValues[i]
      );
    }
    return cV;
  }

  function lowestValueCanBeReached(
    currentValue: number,
    remainingValues: number[],
    part: 1 | 2
  ) {
    let cV = currentValue;
    for (let i = 0; i < remainingValues.length; i++) {
      cV = Math.min(
        part === 1
          ? Number.MAX_SAFE_INTEGER
          : Number(`${cV}${remainingValues[i]}`),
        cV * remainingValues[i],
        cV + remainingValues[i]
      );
    }
    return cV;
  }
}

function parts(part: 1 | 2) {
  let total = 0;
  for (let i = 0; i < commands.length; i++) {
    let reachedValues = [commands[i][1][0]];
    let valueToReach = commands[i][0][0];
    for (let j = 1; j < commands[i][1].length; j++) {
      let newPossibilities: number[] = [];
      for (let l = 0; l < reachedValues.length; l++) {
        const newSubPossibilities = [
          reachedValues[l] + commands[i][1][j],
          reachedValues[l] * commands[i][1][j],
          Number(`${reachedValues[l]}${commands[i][1][j]}`),
        ].filter(
          (a, index) =>
            (part === 2 || index !== 2) &&
            isToBePrunned(a, valueToReach, commands[i][1].slice(j + 1), part)
        );
        newPossibilities = [...newPossibilities, ...newSubPossibilities];
      }
      reachedValues = newPossibilities;
    }
    if (reachedValues.some((a) => a === valueToReach)) {
      total += valueToReach;
    }
  }
  console.log(total);
}

parts(1);
parts(2);
