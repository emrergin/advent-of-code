import { readFileSync } from "fs";
const commands = readFileSync(`day6input.txt`, "utf-8")
  .split("\r\n")
  .map((a) => a.split(""));

const directions: [number, number][] = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

interface GuardState {
  currentDirection: 0 | 1 | 2 | 3;
  currentPosition: [number, number];
  count: number;
  outOfBounds: boolean;
}

function moveOnce(state: GuardState, mapState: string[][]) {
  let { currentDirection, currentPosition } = state;
  const nextPosition: [number, number] = [
    currentPosition[0] + directions[currentDirection][0],
    currentPosition[1] + directions[currentDirection][1],
  ];
  if (
    nextPosition[0] > commands.length - 1 ||
    nextPosition[0] < 0 ||
    nextPosition[1] > commands[0].length ||
    nextPosition[1] < 0
  ) {
    state.outOfBounds = true;
    return;
  } else if (mapState[nextPosition[0]][nextPosition[1]] === "#") {
    state.currentDirection = ((currentDirection + 1) % 4) as 0 | 1 | 2 | 3;
  } else {
    if (mapState[nextPosition[0]][nextPosition[1]] === ".") {
      state.count++;
    }
    mapState[nextPosition[0]][nextPosition[1]] = "@";
    state.currentPosition = nextPosition;
  }
}

function partOne() {
  let state: GuardState = {
    currentDirection: 0,
    currentPosition: [-1, -1],
    count: 1,
    outOfBounds: false,
  };
  const mapState = structuredClone(commands);

  for (let i = 0; i < commands.length; i++) {
    for (let j = 0; j < commands[0].length; j++) {
      if (commands[i][j] === "^") {
        state.currentPosition = [i, j];
      }
    }
  }

  while (!state.outOfBounds) {
    moveOnce(state, mapState);
  }

  console.log(state.count);
}

function partTwo() {
  let count = 0;
  let startingPosition = [-1, -1];

  for (let i = 0; i < commands.length; i++) {
    for (let j = 0; j < commands[0].length; j++) {
      if (commands[i][j] === "^") {
        startingPosition = [i, j];
      }
    }
  }

  for (let i = 0; i < commands.length; i++) {
    for (let j = 0; j < commands[0].length; j++) {
      if (commands[i][j] !== ".") {
        continue;
      } else {
        const mapState = structuredClone(commands);
        mapState[i][j] = "#";

        const previousTurns = new Set<string>();

        let state: GuardState = {
          currentDirection: 0,
          currentPosition: [startingPosition[0], startingPosition[1]],
          count: 1,
          outOfBounds: false,
        };

        while (!state.outOfBounds) {
          let previousDirection = state.currentDirection;
          moveOnce(state, mapState);
          if (state.currentDirection !== previousDirection) {
            if (
              previousTurns.has(
                `${state.currentPosition[0]}|${state.currentPosition[1]}|${state.currentDirection}`
              )
            ) {
              count++;
              break;
            } else {
              previousTurns.add(
                `${state.currentPosition[0]}|${state.currentPosition[1]}|${state.currentDirection}`
              );
            }
          }
        }
      }
    }
  }
  console.log(count);
}

partOne();
partTwo();
