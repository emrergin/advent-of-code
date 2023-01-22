import { readFileSync } from "fs";

let lines = readFileSync(`day5input.txt`, "utf-8")
  .split("\n\n")
  .map((a) => a.split(`\n`));

const instructions = lines[1]
  .map((a) => a.split(" "))
  .map((a) => ({ qty: +a[1], from: +a[3], to: +a[5] }));
lines[0] = lines[0].map((a) => a.split(/\s{1,4}/)).slice(0, -1);

let columns = Array.from(Array(9), () => new Array(0));
for (let i = lines[0].length - 1; i >= 0; i--) {
  for (let j = 0; j < lines[0][i].length; j++) {
    if (lines[0][i][j] !== "") {
      columns[j].push(lines[0][i][j]);
    }
  }
}

function partOne() {
  for (let inst of instructions) {
    for (let i = 0; i < inst.qty; i++) {
      const itemToMove = columns[inst.from - 1].pop();
      columns[inst.to - 1].push(itemToMove);
    }
  }

  console.log(columns.map((a) => a[a.length - 1][1]).join(""));
}

function partTwo() {
  for (let inst of instructions) {
    const tempArray = [];
    for (let i = 0; i < inst.qty; i++) {
      const itemToMove = columns[inst.from - 1].pop();
      tempArray.push(itemToMove);
    }
    tempArray.reverse();
    columns[inst.to - 1] = columns[inst.to - 1].concat(tempArray);
  }

  console.log(columns.map((a) => a[a.length - 1][1]).join(""));
}
