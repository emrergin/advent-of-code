import { readFileSync } from "fs";
// const commands = readFileSync(`day19test.txt`, "utf-8")
const commands = readFileSync(`day19input.txt`, "utf-8")
  .split("\n")
  .map((a) => a.match(/[0-9]{1,2}/g).map(Number))
  .map((a) => a.slice(1));

function makeOreMachine(state, com) {
  let newState = passTime(state);
  newState.oreRobot = newState.oreRobot + 1;
  newState.ore = newState.ore - com[0];

  return newState;
}

function makeClayMachine(state, com) {
  let newState = passTime(state);
  newState.clayRobot = newState.clayRobot + 1;
  newState.ore = newState.ore - com[1];

  return newState;
}

function makeObsidianMachine(state, com) {
  let newState = passTime(state);
  newState.obsidianRobot = newState.obsidianRobot + 1;
  newState.ore = newState.ore - com[2];
  newState.clay = newState.clay - com[3];

  return newState;
}

function makeGeodeMachine(state, com) {
  let newState = passTime(state);
  newState.geodeRobot = newState.geodeRobot + 1;
  newState.ore = newState.ore - com[4];
  newState.obsidian = newState.obsidian - com[5];

  return newState;
}

function passTime(state, time = 1) {
  const newState = {
    ...state,
    ore: state.ore + state.oreRobot * time,
    clay: state.clay + state.clayRobot * time,
    obsidian: state.obsidian + state.obsidianRobot * time,
    geode: state.geode + state.geodeRobot * time,
    remainingTime: state.remainingTime - time,
  };

  return newState;
}

function findClosestTime(state, com, targetRobot) {
  if (targetRobot === "ore") {
    return Math.max(Math.ceil((com[0] - state.ore) / state.oreRobot), 0);
  }
  if (targetRobot === "clay") {
    return Math.max(Math.ceil((com[1] - state.ore) / state.oreRobot), 0);
  }
  if (targetRobot === "obsidian") {
    return Math.max(
      Math.max(
        Math.ceil((com[2] - state.ore) / state.oreRobot),
        Math.ceil((com[3] - state.clay) / state.clayRobot)
      ),
      0
    );
  }
  if (targetRobot === "geode") {
    return Math.max(
      Math.max(
        Math.ceil((com[4] - state.ore) / state.oreRobot),
        Math.ceil((com[5] - state.obsidian) / state.obsidianRobot)
      ),
      0
    );
  }
}

function waitAndMakeRobot({ stack, state, targetRobot, command }) {
  const timeToPass = findClosestTime(state, command, targetRobot);
  if (timeToPass < state.remainingTime - 1) {
    const newState = passTime(state, timeToPass);
    switch (targetRobot) {
      case "ore":
        stack.push(makeOreMachine(newState, command));
        return;
      case "clay":
        stack.push(makeClayMachine(newState, command));
        return;
      case "obsidian":
        stack.push(makeObsidianMachine(newState, command));
        return;
      case "geode":
        stack.push(makeGeodeMachine(newState, command));
        return;
    }
  }
}

function hashState(state) {
  return Object.values(state).join("-");
}

function findMax(command, remainingTime) {
  const startingState = {
    ore: 0,
    clay: 0,
    obsidian: 0,
    geode: 0,
    oreRobot: 1,
    clayRobot: 0,
    obsidianRobot: 0,
    geodeRobot: 0,
    remainingTime,
  };
  const prevStates = new Set();

  const solutionStack = [];
  solutionStack.push(startingState);
  let maxGeodes = -Infinity;

  while (solutionStack.length > 0) {
    const currentState = solutionStack.pop();
    const stringified = hashState(currentState);
    if (prevStates.has(stringified)) {
      continue;
    }

    if (prevStates.size < 2 ** 24 - 1) {
      prevStates.add(stringified);
    }

    maxGeodes = Math.max(currentState.geode, maxGeodes);

    if (currentState.remainingTime === 0) {
      continue;
    }

    const currentPotential =
      (currentState.remainingTime * (currentState.remainingTime - 1)) / 2 +
      currentState.geode +
      currentState.geodeRobot * currentState.remainingTime;

    if (currentPotential < maxGeodes) {
      continue;
    }

    waitAndMakeRobot({
      stack: solutionStack,
      targetRobot: "geode",
      state: currentState,
      command: command,
    });
    waitAndMakeRobot({
      stack: solutionStack,
      targetRobot: "obsidian",
      state: currentState,
      command: command,
    });
    waitAndMakeRobot({
      stack: solutionStack,
      targetRobot: "clay",
      state: currentState,
      command: command,
    });
    waitAndMakeRobot({
      stack: solutionStack,
      targetRobot: "ore",
      state: currentState,
      command: command,
    });

    solutionStack.push(passTime(currentState, currentState.remainingTime));
  }

  return maxGeodes;
}

function partOne() {
  let index = 1;
  let total = 0;
  for (let command of commands) {
    const outcome = findMax(command, 24);
    console.log(command, outcome);
    total += outcome * index;
    index++;
  }

  console.log(total);
}

function partTwo() {
  let multiplied = 1;
  const firstThreeCommands = commands.slice(0, 3);
  for (let command of firstThreeCommands) {
    const outcome = findMax(command, 32);
    console.log(outcome);
    multiplied *= outcome;
  }
  console.log(multiplied);
}

partOne();
partTwo();
