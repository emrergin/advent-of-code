import { readFileSync } from "fs";

const inputs = readFileSync(`day3input.txt`, "utf-8").split("");

function actAccordingToInput(input, visitedHouses) {
  let currentX = 0;
  let currentY = 0;
  for (let input1 of input) {
    visitedHouses.set(`x:${currentX}-y:${currentY}`, true);
    if (input1 === ">") {
      currentX += 1;
    } else if (input1 === "<") {
      currentX -= 1;
    } else if (input1 === "^") {
      currentY -= 1;
    } else if (input1 === "v") {
      currentY += 1;
    }
  }
}

function partOne() {
  const allVisitedHouses = new Map();
  actAccordingToInput(inputs, allVisitedHouses);
  console.log(allVisitedHouses.size);
}

function partTwo() {
  const allVisitedHouses = new Map();
  const inputs1 = inputs.filter((a, index) => index % 2 === 0);
  const inputs2 = inputs.filter((a, index) => index % 2 === 1);
  actAccordingToInput(inputs1, allVisitedHouses);
  actAccordingToInput(inputs2, allVisitedHouses);
  console.log(allVisitedHouses.size);
}

partOne();
partTwo();
