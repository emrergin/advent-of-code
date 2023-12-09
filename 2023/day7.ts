import { readFileSync } from "fs";

const commands: [string, number][] = readFileSync(`day7input.txt`, "utf-8")
  .split("\r\n")
  .map((a) => a.split(" "))
  .map((a) => [a[0], Number(a[1])]);

function getCharOrder(c: string, part: 1 | 2) {
  switch (c) {
    case "A":
      return 14;
    case "K":
      return 13;
    case "Q":
      return 12;
    case "J":
      return part === 1 ? 11 : 0;
    case "T":
      return 10;
    default:
      return Number(c);
  }
}

function getPoint(str: string, part: 1 | 2) {
  function convertStringToScores(str: string) {
    return str.split("").reduce((acc, curr) => {
      if (acc[curr]) {
        acc[curr]++;
      } else {
        acc[curr] = 1;
      }
      return acc;
    }, {} as Record<string, number>);
  }
  let scores = convertStringToScores(str);
  let orderedScores = Object.values(scores).sort((a, b) => b - a);
  let maxScore = orderedScores[0];

  let jScore = 0;
  if (part === 2) {
    const { J, ...rest } = scores;
    orderedScores = Object.values(rest).sort((a, b) => b - a);
    orderedScores[0] = orderedScores[0] || 0;
    jScore = J || 0;
    orderedScores[0] += jScore;
    maxScore = orderedScores[0] || 0;
    orderedScores[1] = orderedScores[1] || 0;
  }

  function isFiveOfAKind() {
    return maxScore === 5;
  }
  function isFourOfAKind() {
    return maxScore === 4;
  }

  function isFullHouse() {
    return orderedScores[0] === 3 && orderedScores[1] === 2;
  }

  function isThreeOfAKind() {
    return maxScore === 3;
  }

  function isTwoPair() {
    return orderedScores[0] === 2 && orderedScores[1] === 2;
  }

  function isPair() {
    return maxScore === 2;
  }

  switch (true) {
    case isFiveOfAKind():
      return 6;
    case isFourOfAKind():
      return 5;
    case isFullHouse():
      return 4;
    case isThreeOfAKind():
      return 3;
    case isTwoPair():
      return 2;
    case isPair():
      return 1;
    default:
      return 0;
  }
}

function getPoints(arg: [string, number], part: 1 | 2) {
  const str1 = arg[0];
  const mstr1 = str1.split("").toSorted().join("");
  const point1 = getPoint(mstr1, part);
  const letterPoints: number[] = [];
  for (let i = 0; i < 5; i++) {
    letterPoints.push(getCharOrder(str1.charAt(i), part));
  }
  return [arg[0], arg[1], point1].concat(letterPoints);
}

function compareCardHands(firstPoints: number[], secondPoints: number[]) {
  for (let i = 0; i < firstPoints.length; i++) {
    if (firstPoints[i] > secondPoints[i]) {
      return 1;
    } else if (firstPoints[i] < secondPoints[i]) {
      return -1;
    }
  }
  return 1;
}

function partOne() {
  const newCommand = commands
    .map((a) => getPoints(a, 1))
    .toSorted((a, b) =>
      compareCardHands(a.slice(2) as number[], b.slice(2) as number[])
    );

  let total = 0;
  let index = 0;
  for (let command of newCommand) {
    index++;
    total += index * (command[1] as number);
  }

  console.log(total);
}

function partTwo() {
  const newCommand = commands
    .map((a) => getPoints(a, 2))
    .toSorted((a, b) =>
      compareCardHands(a.slice(2) as number[], b.slice(2) as number[])
    );

  let total = 0;
  let index = 0;
  for (let command of newCommand) {
    index++;
    total += index * (command[1] as number);
  }

  console.log(total);
}

partOne();
partTwo();
