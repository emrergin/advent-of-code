import { readFileSync } from "fs";
const repeat = (arr, n) => [].concat(...Array(n).fill(arr));

let lines = readFileSync(`day16input.txt`, "utf-8").split("").map(Number);
let lines2 = repeat(lines, 10000);

function getOutputDigits(digit, totalDigits) {
  const baseDigits = [0, 1, 0, -1];
  const afterFirstRepeat = baseDigits.reduce(
    (acc, curr) => acc.concat(repeat([curr], digit + 1)),
    []
  );
  let afterSecondRepeat = afterFirstRepeat;
  while (afterSecondRepeat.length < totalDigits + 4) {
    afterSecondRepeat = afterSecondRepeat.concat(afterSecondRepeat);
  }
  afterSecondRepeat.shift();
  afterSecondRepeat = afterSecondRepeat.slice(0, totalDigits);
  return afterSecondRepeat;
}

function phase(digits) {
  const finalResult = [];
  for (let i = 0; i < digits.length; i++) {
    const currentOutputDigits = getOutputDigits(i, digits.length);
    const currentResult = digits.reduce(
      (acc, curr, index) => acc + curr * currentOutputDigits[index],
      0
    );
    finalResult.push(currentResult);
  }
  return finalResult.map((a) => Math.abs(a) % 10);
}

// function phase() {}
// getOutputDigits(3, 60);

// console.log(phase([1, 2, 3, 4, 5, 6, 7, 8]));

function multiplePhases(startingDigits, numberOfPhases, withOffset = false) {
  let digits = startingDigits;
  let currentPhase = 0;

  while (currentPhase < numberOfPhases) {
    digits = phase(digits);
    console.log(currentPhase);
    currentPhase++;
  }
  if (!withOffset) {
    console.log(digits.slice(0, 8));
  } else {
    let messageOffset = Number(startingDigits.slice(0, 7).join(""));
    console.log(digits.slice(messageOffset, messageOffset + 8));
  }
}

multiplePhases(lines, 100);

multiplePhases(lines2, 100, true);
