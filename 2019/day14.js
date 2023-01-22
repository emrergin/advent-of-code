import { readFileSync } from "fs";

const processes = new Map();
readFileSync(`day14input.txt`, "utf-8")
  .split(`\n`)
  .map((a) => a.split("=>"))
  .map((a) => a.map((b) => b.trim().split(",")))
  .forEach((a) => {
    const inputMap = new Map();
    const [qty, item] = a[1][0].split(" ");
    a[0].map((b) =>
      b
        .trim()
        .split(",")
        .map((c) => c.split(" "))
        .forEach((d) => inputMap.set(d[1], +d[0]))
    );
    processes.set(item, { qty: +qty, inputs: inputMap });
  });

function convertOutputIntoInputs(output, needs, present) {
  const neededAmount = needs.get(output);
  const presentAmount = present.get(output);
  const producedInOneGo = processes.get(output).qty;

  if (presentAmount >= neededAmount) {
    needs.set(output, 0);
    present.set(output, presentAmount - neededAmount);
  } else {
    const notExisting = neededAmount - presentAmount;
    const numberOfCycles = Math.ceil(notExisting / producedInOneGo);
    needs.set(output, 0);
    present.set(output, numberOfCycles * producedInOneGo - notExisting);
    processes
      .get(output)
      .inputs.forEach((v, k) =>
        needs.set(k, needs.get(k) + v * numberOfCycles)
      );
  }
}

function productionLoop(needs, present) {
  let willBeBroken = true;
  needs.forEach((v, k) => {
    if (k !== "ORE" && needs.get(k) > 0) {
      convertOutputIntoInputs(k, needs, present);
      willBeBroken = false;
    }
    if (needs.get(k) < 0) {
      present.set(needs.get(k));
      needs.set(k, 0);
    }
  });
  return willBeBroken;
}

function partOne() {
  const needs = new Map();
  const present = new Map();
  processes.forEach((v, k) => {
    needs.set(k, 0);
    present.set(k, 0);
  });
  needs.set("ORE", 0);
  present.set("ORE", 0);
  needs.set("FUEL", 1);

  convertOutputIntoInputs("FUEL", needs, present);

  while (true) {
    const toBeBroken = productionLoop(needs, present);
    if (toBeBroken) {
      break;
    }
  }

  console.log(needs.get("ORE"));
}

function produceFuel(num) {
  const needs = new Map();
  const present = new Map();
  processes.forEach((v, k) => {
    needs.set(k, 0);
    present.set(k, 0);
  });
  needs.set("ORE", 0);
  present.set("ORE", 0);
  needs.set("FUEL", num);
  convertOutputIntoInputs("FUEL", needs, present);
  while (true) {
    const toBeBroken = productionLoop(needs, present);
    if (toBeBroken) {
      break;
    }
  }
  return needs.get("ORE");
}

function partTwo(target) {
  let lower = 0;
  let upper = target;
  let currentValue;

  while (lower <= upper) {
    currentValue = Math.floor((upper + lower) / 2);
    const withinBounds = produceFuel(currentValue) <= target;
    if (withinBounds && produceFuel(currentValue + 1) > target) {
      console.log(currentValue);
      break;
    } else if (withinBounds) {
      lower = currentValue + 1;
    } else {
      upper = currentValue - 1;
    }
  }
}

partTwo(1000000000000);
