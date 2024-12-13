import { readFileSync } from "fs";
const commands = readFileSync(`day13input.txt`, "utf-8")
  .split("\r\n\r\n")
  .map((a) =>
    a.split("\r\n").map((a) =>
      a
        .split(/\D/)
        .filter((a) => a !== "")
        .map(Number)
    )
  );

function partOne() {
  let commandsCopy = structuredClone(commands);
  let total = 0;
  for (let i = 0; i < commandsCopy.length; i++) {
    let targetX = commandsCopy[i][2][0];
    let targetY = commandsCopy[i][2][1];

    let buttonAX = commandsCopy[i][0][0];
    let buttonAY = commandsCopy[i][0][1];

    let buttonBX = commandsCopy[i][1][0];
    let buttonBY = commandsCopy[i][1][1];

    let currentMinimumCost = Number.MAX_SAFE_INTEGER;
    for (let numberOfB = 0; numberOfB <= 100; numberOfB++) {
      for (let numberOfA = 0; numberOfA <= 100; numberOfA++) {
        let newCost = numberOfA * 3 + numberOfB;

        if (
          numberOfA * buttonAX + numberOfB * buttonBX === targetX &&
          numberOfA * buttonAY + numberOfB * buttonBY === targetY
        ) {
          currentMinimumCost = Math.min(currentMinimumCost, newCost);
          console.log(numberOfA, numberOfB);
        }
      }
    }

    if (currentMinimumCost < Number.MAX_SAFE_INTEGER) {
      total += currentMinimumCost;
    }
  }
  console.log(total);
}

function partTwo() {
  let commandsCopy = structuredClone(commands);
  let total = 0;
  for (let i = 0; i < commandsCopy.length; i++) {
    let targetX = commandsCopy[i][2][0] + 10000000000000;
    let targetY = commandsCopy[i][2][1] + 10000000000000;

    let buttonAX = commandsCopy[i][0][0];
    let buttonAY = commandsCopy[i][0][1];

    let buttonBX = commandsCopy[i][1][0];
    let buttonBY = commandsCopy[i][1][1];

    let numberOfB =
      (buttonAX * targetY - buttonAY * targetX) /
      (buttonAX * buttonBY - buttonAY * buttonBX);

    let numberOfA = (targetY - buttonBY * numberOfB) / buttonAY;

    if (Math.floor(numberOfB) === numberOfB) {
      total += numberOfB + 3 * numberOfA;
    }
  }
  console.log(total);
}
partTwo();
