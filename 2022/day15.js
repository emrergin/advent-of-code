import { readFileSync } from "fs";

const existingBeacons = new Set();
const existingSensors = new Set();
// let commands = readFileSync(`day15test.txt`, 'utf-8').split("\n")
let commands = readFileSync(`day15input.txt`, "utf-8")
  .split("\n")
  .map((a) =>
    [a.match(/x=-*\d+/g), a.match(/y=-*\d+/g)].map((b) =>
      b.map((c) => +c.split("=")[1])
    )
  )
  .map((a) => ({
    sensor: { x: a[0][0], y: a[1][0] },
    closestBeacon: { x: a[0][1], y: a[1][1] },
  }))
  .map((a) => ({
    ...a,
    distance: manhattanDistance(a.sensor, a.closestBeacon),
  }));

function manhattanDistance(f, t) {
  return Math.abs(f.x - t.x) + Math.abs(f.y - t.y);
}

function partOne() {
  let maxX = Math.max(...commands.flatMap((b) => b.sensor.x + b.distance));
  let minX = Math.min(...commands.flatMap((b) => b.sensor.x - b.distance));
  let maxY = Math.max(...commands.flatMap((b) => b.sensor.y + b.distance));
  let minY = Math.min(...commands.flatMap((b) => b.sensor.y - b.distance));
  let yToCheck = 2000000;
  commands.forEach((a) => {
    existingBeacons.add(`x-${a.closestBeacon.x},y-${a.closestBeacon.y}`);
    existingSensors.add(`x-${a.sensor.x},y-${a.sensor.y}`);
  });
  let counter = 0;
  for (let i = minX; i < maxX; i++) {
    for (let command of commands) {
      if (
        (manhattanDistance({ x: i, y: yToCheck }, command.sensor) <=
          command.distance &&
          !existingBeacons.has(`x-${i},y-${yToCheck}`)) ||
        existingSensors.has(`x-${i},y-${yToCheck}`)
      ) {
        counter++;
        break;
      }
    }
  }

  console.log(counter);
}

function partTwo() {
  const totalDistance = commands.reduce((acc, curr) => acc + curr.distance, 0);
  let totalXtotalY = commands.reduce(
    (acc, curr) => ({
      x: acc.x + curr.sensor.x * (totalDistance / curr.distance),
      y: acc.y + curr.sensor.y * (totalDistance / curr.distance),
      z: acc.z + totalDistance / curr.distance,
    }),
    { x: 0, y: 0, z: 0 }
  );

  totalXtotalY = {
    x: Math.round(totalXtotalY.x / totalXtotalY.z),
    y: Math.round(totalXtotalY.y / totalXtotalY.z),
  };
  let maxDistance = Number.MIN_SAFE_INTEGER;
  let xToMoveAwayFrom = null;
  let yToMoveAwayFrom = null;
  let totalDistanceToMove = 0;

  for (let command of commands) {
    const currentDistance = manhattanDistance(totalXtotalY, command.sensor);
    const distanceToMove = command.distance - currentDistance + 1;
    if (distanceToMove > maxDistance) {
      maxDistance = distanceToMove;
      totalDistanceToMove = maxDistance;
      xToMoveAwayFrom = command.sensor.x;
      yToMoveAwayFrom = command.sensor.y;
    }
  }

  outerloop: for (let i = 0; i < totalDistanceToMove; i++) {
    let currentPoint = {
      x: totalXtotalY.x + i * Math.sign(totalXtotalY.x - xToMoveAwayFrom),
      y:
        totalXtotalY.y +
        (totalDistanceToMove - i) * Math.sign(totalXtotalY.y - yToMoveAwayFrom),
    };
    for (let command of commands) {
      if (manhattanDistance(currentPoint, command.sensor) <= command.distance) {
        continue outerloop;
      }
    }
    console.log(currentPoint.y + currentPoint.x * 4000000);
  }
}

partTwo();
