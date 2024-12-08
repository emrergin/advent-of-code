import { readFileSync } from "fs";

const commands = readFileSync(`day18input.txt`, "utf-8")
  .split("\r\n")
  .map((a) => a.split(" "))
  .map((a) => ({
    direction: a[0] as "R" | "L" | "U" | "D",
    amount: Number(a[1]),
    color: a[2].slice(1, -1),
  }));

const directionTags = ["R", "D", "L", "U"];

const commands2 = commands.map((a) => ({
  amount: parseInt(a.color.slice(1, 6), 16),
  direction: directionTags[Number(a.color.slice(-1))] as "R" | "L" | "U" | "D",
}));

const directions = {
  R: [0, 1],
  L: [0, -1],
  D: [1, 0],
  U: [-1, 0],
};

const conjunctions = {
  UL: "7",
  UR: "F",
  UU: "|",
  DL: "J",
  DR: "L",
  DD: "|",
  LU: "L",
  LL: "-",
  LD: "F",
  RU: "J",
  RR: "-",
  RD: "7",
};

function part(
  commands: {
    direction: "R" | "L" | "U" | "D";
    amount: number;
  }[]
) {
  let currentPosition: [number, number] = [0, 0];

  const allPoints: [number, number][] = [currentPosition];
  const pointSet = new Set<string>();

  for (let command of commands) {
    for (let i = 0; i < command.amount; i++) {
      let currentPoint = allPoints[allPoints.length - 1];
      let nextPoint = [
        currentPoint[0] + directions[command.direction][0],
        currentPoint[1] + directions[command.direction][1],
      ] as [number, number];
      allPoints.push(nextPoint);
      pointSet.add(`${nextPoint[0]}|${nextPoint[1]}`);
    }
  }

  const minimumX = allPoints.reduce(
    (acc, curr) => Math.min(acc, curr[0]),
    Number.MAX_SAFE_INTEGER
  );
  const maximumX = allPoints.reduce(
    (acc, curr) => Math.max(acc, curr[0]),
    Number.MIN_SAFE_INTEGER
  );
  const minimumY = allPoints.reduce(
    (acc, curr) => Math.min(acc, curr[1]),
    Number.MAX_SAFE_INTEGER
  );
  const maximumY = allPoints.reduce(
    (acc, curr) => Math.max(acc, curr[1]),
    Number.MIN_SAFE_INTEGER
  );

  const startingVertex = {
    x: minimumX - 1,
    y: minimumY - 1,
  };
  const stack: {
    x: number;
    y: number;
  }[] = [startingVertex];
  const explored = new Set<string>();

  while (true) {
    const currentvertex = stack.pop();
    if (!currentvertex) {
      break;
    }
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        if (Math.abs(i + j) !== 1) {
          continue;
        }
        if (
          explored.has(`${currentvertex.x + i}|${currentvertex.y + j}`) ||
          pointSet.has(`${currentvertex.x + i}|${currentvertex.y + j}`)
        ) {
          continue;
        }
        if (
          currentvertex.x + i > maximumX + 1 ||
          currentvertex.x + i < minimumX - 1 ||
          currentvertex.y + i > maximumY + 1 ||
          currentvertex.y + i < minimumY - 1
        ) {
          continue;
        }
        stack.push({ x: currentvertex.x + i, y: currentvertex.y + j });
      }
    }
    explored.add(`${currentvertex.x}|${currentvertex.y}`);
  }

  console.log(
    (maximumX - minimumX + 3) * (maximumY - minimumY + 5) - explored.size
  );
}

function part2(
  commands: {
    direction: "R" | "L" | "U" | "D";
    amount: number;
  }[]
) {
  let cornerPositions: [number, number][] = [[0, 0]];
  let pathDistance = commands.reduce((acc, curr) => acc + curr.amount, 0);

  const pointArray: { character: string; index: number }[][] = [];

  for (let j = 0; j < commands.length; j++) {
    let command = commands[j];
    let currentPoint = cornerPositions[cornerPositions.length - 1];
    let nextCorner = [
      currentPoint[0] + directions[command.direction][0] * command.amount,
      currentPoint[1] + directions[command.direction][1] * command.amount,
    ];
    cornerPositions.push(nextCorner as [number, number]);

    let nextIndex = j + 1;
    if (j === commands.length - 1) {
      nextIndex = 0;
    }

    const nextDirection = commands[nextIndex].direction;
    let directionKey = command.direction + nextDirection;

    const character = conjunctions[directionKey as keyof typeof conjunctions];
    const existingArray = pointArray[nextCorner[0]];
    if (existingArray) {
      existingArray.push({ character, index: nextCorner[1] });
    } else {
      pointArray[nextCorner[0]] = [];
      pointArray[nextCorner[0]].push({ character, index: nextCorner[1] });
    }
  }

  const minimumX = cornerPositions.reduce(
    (acc, curr) => Math.min(acc, curr[0]),
    Number.MAX_SAFE_INTEGER
  );
  const maximumX = cornerPositions.reduce(
    (acc, curr) => Math.max(acc, curr[0]),
    Number.MIN_SAFE_INTEGER
  );
  const minimumY = cornerPositions.reduce(
    (acc, curr) => Math.min(acc, curr[1]),
    Number.MAX_SAFE_INTEGER
  );
  const maximumY = cornerPositions.reduce(
    (acc, curr) => Math.max(acc, curr[1]),
    Number.MIN_SAFE_INTEGER
  );

  let insidePoints = 0;
  let increaseForThisRow = 0;
  for (let i = minimumX; i <= maximumX; i++) {
    console.log(i, "/", maximumX);
    if (
      i >= 1 &&
      pointArray[i] === undefined &&
      pointArray[i - 1] === undefined
    ) {
      insidePoints += increaseForThisRow;
      continue;
    }
    increaseForThisRow = 0;
    for (let j = minimumY; j <= maximumY; j++) {
      let string = "";
      let last = null;
      for (let k = minimumY; k <= j; k++) {
        last = checkVerticalHorizontalOrNone(i, k, cornerPositions, pointArray);
        if (last !== "-" && last !== ".") {
          string += last;
        }
      }

      let simplifiedPath = string;

      let beginning = null;
      while (beginning !== simplifiedPath) {
        beginning = simplifiedPath;
        simplifiedPath = simplifiedPath.replace(/\-/g, "");
        simplifiedPath = simplifiedPath.replace(/F7/g, "");
        simplifiedPath = simplifiedPath.replace(/LJ/g, "");
        simplifiedPath = simplifiedPath.replace(/FJ/g, "|");
        simplifiedPath = simplifiedPath.replace(/L7/g, "|");
        simplifiedPath = simplifiedPath.replace(/\|\|/g, "");
        simplifiedPath = simplifiedPath.replace(/\.+/g, ".");
      }

      if (
        simplifiedPath.split("").filter((a) => a === "|").length % 2 === 1 &&
        last === "."
      ) {
        increaseForThisRow++;
      }
    }
    insidePoints += increaseForThisRow;
  }
  console.log(insidePoints + pathDistance);
}

part2(commands2);

function checkVerticalHorizontalOrNone(
  x: number,
  y: number,
  cornerPositions: [number, number][],
  pointMap: { character: string; index: number }[][]
) {
  const valueFromMap = pointMap[x]?.find((a) => a.index === y);
  if (valueFromMap) {
    return valueFromMap.character;
  }

  for (let i = 0; i < cornerPositions.length - 1; i++) {
    const point1 = cornerPositions[i];
    const point2 = cornerPositions[i + 1];

    if (point1[0] === point2[0]) {
      if (
        x === point1[0] &&
        Math.sign(y - point1[1]) === -Math.sign(y - point2[1])
      ) {
        return "-";
      }
    }
    if (point1[1] === point2[1]) {
      if (
        y === point1[1] &&
        Math.sign(x - point1[0]) === -Math.sign(x - point2[0])
      ) {
        return "|";
      }
    }
  }
  return ".";
}
