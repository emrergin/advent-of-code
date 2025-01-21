import { readFileSync } from "fs";

const input = readFileSync(`day19input.txt`, "utf-8").split("\r\n\r\n");

const patterns = input[0].split(",").map((s) => s.trim());
const designs = input[1].split("\r\n");

const patternsByLetter = patterns.reduce((acc, curr) => {
  if (acc[curr[0]]) {
    acc[curr[0]].push(curr);
  } else {
    acc[curr[0]] = [curr];
  }
  return acc;
}, {} as Record<string, string[]>);

function partOne() {
  let total = 0;
  for (let i = 0; i < designs.length; i++) {
    let d = designs[i];
    let result = countPossibilities(d);
    total += Math.sign(result);
  }

  console.log(total);
}

const cache = new Map<string, number>();
function partTwo() {
  let total = 0;
  for (let i = 0; i < designs.length; i++) {
    let d = designs[i];
    let result = countPossibilities(d);
    total += result;
  }

  console.log(total);
}

function countPossibilities(text: string) {
  let solutionStack = [text];
  while (solutionStack.length > 0) {
    let currentText = solutionStack[solutionStack.length - 1] as string;

    if (currentText.length === 0) {
      cache.set(currentText, 0);
    } else {
      let subPatterns = patternsByLetter[currentText[0]];
      if (!subPatterns) {
        cache.set(currentText, 0);
        solutionStack.pop();
      } else {
        subPatterns = subPatterns.filter((s) => currentText.startsWith(s));
        if (
          subPatterns.every(
            (s) =>
              s.length === currentText.length ||
              cache.get(currentText.slice(s.length)) !== undefined
          )
        ) {
          solutionStack.pop();
          let result = subPatterns.reduce(
            (acc, curr) =>
              curr.length === currentText.length
                ? acc + 1
                : acc + (cache.get(currentText.slice(curr.length)) as number),
            0
          );
          cache.set(currentText, result);
        } else {
          subPatterns
            .filter(
              (s) =>
                s.length !== currentText.length &&
                cache.get(currentText.slice(s.length)) === undefined
            )
            .forEach((s) => solutionStack.push(currentText.slice(s.length)));
        }
      }
    }
  }
  return cache.get(text) || 0;
}

partOne();
partTwo();
