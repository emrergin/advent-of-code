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

part(commands);
part(commands2);
// for (let i = minimumX - 1; i <= maximumX + 1; i++) {
// pointSet.size
//   let row = "";
//   for (let j = minimumY - 2; j <= maximumY + 2; j++) {
//     if (pointSet.has(`${i}|${j}`)) {
//       row += "#";
//     } else if (explored.has(`${i}|${j}`)) {
//       row += "^";
//     } else {
//       row += ".";
//     }
//   }
//   console.log(row);
// }
