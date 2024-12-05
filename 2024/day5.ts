import { readFileSync } from "fs";
const commands = readFileSync(`day5input.txt`, "utf-8")
  .trim()
  .split("\r\n\r\n")
  .map((a) =>
    a.split("\r\n").map((b) => b.split(/\||,/).map((a) => Number(a)))
  );

const previousEntries: Record<number, number[]> = {};
const rules = commands[0];
const updates = commands[1];
for (let i = 0; i < rules.length; i++) {
  if (previousEntries[rules[i][0]]) {
    previousEntries[rules[i][0]] = [
      ...previousEntries[rules[i][0]],
      rules[i][1],
    ];
  } else {
    previousEntries[rules[i][0]] = [rules[i][1]];
  }
}

function partOne() {
  let total = 0;
  outer: for (let i = 0; i < updates.length; i++) {
    for (let j = 0; j < updates[i].length - 1; j++) {
      if (previousEntries[updates[i][j + 1]].includes(updates[i][j])) {
        continue outer;
      }
    }
    total += updates[i][(updates[i].length - 1) / 2];
  }
  console.log(total);
}

function partTwo() {
  let total = 0;
  for (let i = 0; i < updates.length; i++) {
    for (let j = 0; j < updates[i].length - 1; j++) {
      if (previousEntries[updates[i][j + 1]]?.includes(updates[i][j])) {
        updates[i] = reorderRow(updates[i], previousEntries);
        total += updates[i][(updates[i].length - 1) / 2];
        break;
      }
    }
  }
  console.log(total);

  function reorderRow(row: number[], record: Record<number, number[]>) {
    let finalOrder: number[] = [];
    let remainingNumbers = row.slice();
    let nextNumber: number;
    while (remainingNumbers.length > 0) {
      outer: for (let i = 0; i < remainingNumbers.length; i++) {
        for (let j = 0; j < remainingNumbers.length; j++) {
          if (record?.[remainingNumbers[i]].includes(remainingNumbers[j])) {
            continue outer;
          }
        }
        nextNumber = remainingNumbers[i];
        finalOrder.push(nextNumber);
      }
      remainingNumbers = remainingNumbers.filter((a) => a !== nextNumber);
    }
    return finalOrder;
  }
}

partOne();
partTwo();
