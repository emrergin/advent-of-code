import { readFileSync } from "fs";
const commands = readFileSync(`day4input.txt`, "utf-8")
  .split("\r\n")
  .map((a) => a.split(/\:|\|/))
  .map((a) => [
    Number(a[0].split(/\s+/)[1]),
    a[1].trim().split(/\s+/).map(Number),
    a[2].trim().split(/\s+/).map(Number),
  ])
  .map((a) => ({
    no: a[0],
    winners: a[1] as number[],
    numbers: a[2] as number[],
  }));

function partOne() {
  let total = 0;
  for (let command of commands) {
    const currentHits = command.numbers.filter((number) =>
      command.winners.includes(number)
    ).length;
    if (currentHits > 0) {
      total += 2 ** (currentHits - 1);
    }
  }
  console.log(total);
}

function partTwo() {
  let commandsCopy = structuredClone(commands).map((a) => ({
    ...a,
    quantity: 1,
  }));
  for (let i = 0; i < commandsCopy.length; i++) {
    const command = commandsCopy[i];
    const currentHits = command.numbers.filter((number) =>
      command.winners.includes(number)
    ).length;
    if (currentHits > 0) {
      for (let j = i + 1; j <= i + currentHits; j++) {
        commandsCopy[j].quantity += commandsCopy[i].quantity;
      }
    }
  }
  console.log(commandsCopy.reduce((acc, curr) => acc + curr.quantity, 0));
}

partOne();
partTwo();
