import { readFileSync } from "fs";
import Heap from "../utilities/heap.js";

const commands = readFileSync(`day17input.txt`, "utf-8")
  .split("\r\n")
  .map((a) => a.split("").map(Number));

const directions = { up: [-1, 0], down: [1, 0], right: [0, 1], left: [0, -1] };

type Direction = keyof typeof directions;

type Vertex = {
  x: number;
  y: number;
  cost: number;
  lastTurnWasNBefore: number;
  key: string;
  distance: number;
  neighbours: Vertex[];
  explored: boolean;
  tDistance: number;
  lastTurn: Direction | null;
};

const vertexMap = new Map<string, Vertex>();
let vertices = new Heap<"mapkey">("mapkey");

for (let i = 0; i < commands.length; i++) {
  for (let j = 0; j < commands[0].length; j++) {
    for (let k = 0; k < 11; k++) {
      for (let l = 0; l < 5; l++) {
        const direction = (Object.keys(directions)[l] ||
          null) as Direction | null;
        const key = `${i}|${j}|${k}|${direction}`;
        let startingT = Infinity;
        if (i === 0 && j === 0 && k === 0 && l === 4) {
          startingT = hCalculator(i, j);
        }
        const newVertex: Vertex = {
          key,
          lastTurnWasNBefore: k,
          x: i,
          y: j,
          cost: commands[i][j],
          distance: Infinity,
          neighbours: [],
          explored: false,
          tDistance: Infinity,
          lastTurn: direction,
        };
        vertices.insert({ key: startingT, mapkey: key });
        vertexMap.set(key, newVertex);
      }
    }
  }
}

for (let i = 0; i < commands.length; i++) {
  for (let j = 0; j < commands[0].length; j++) {
    for (let k = 0; k < 11; k++) {
      for (let l = 0; l < 5; l++) {
        const lastDirection = (Object.keys(directions)[l] ||
          null) as Direction | null;
        const key = `${i}|${j}|${k}|${lastDirection}`;
        const currentVertex = vertexMap.get(key);
        if (!currentVertex) continue;

        for (let direction in directions) {
          if (k >= 9 && direction === currentVertex?.lastTurn) {
            continue;
          }
          if (
            (currentVertex?.lastTurn === "down" && direction === "up") ||
            (currentVertex?.lastTurn === "up" && direction === "down") ||
            (currentVertex?.lastTurn === "right" && direction === "left") ||
            (currentVertex?.lastTurn === "left" && direction === "right")
          ) {
            continue;
          }
          if (
            k < 3 &&
            currentVertex?.lastTurn !== direction &&
            currentVertex.lastTurn
          ) {
            continue;
          }
          const updatedLastTurn =
            currentVertex?.lastTurn !== direction
              ? 0
              : currentVertex.lastTurnWasNBefore + 1;
          const currentKey = `${i + directions[direction as Direction][0]}|${
            j + directions[direction as Direction][1]
          }|${updatedLastTurn}|${direction}`;
          const currentNeighbour = vertexMap.get(currentKey);
          if (currentNeighbour) {
            currentVertex?.neighbours.push(currentNeighbour);
          }
        }
      }
    }
  }
}

const startingVertex = vertexMap.get(`${0}|${0}|${0}|${null}`) as Vertex;
startingVertex.distance = 0;
startingVertex.tDistance = hCalculator(0, 0);

while (vertices.length > 0) {
  if (vertices.length === 0) {
    break;
  }
  const currentKey = vertices.extract()?.mapkey;
  if (!currentKey) continue;
  const currentVertex = vertexMap.get(currentKey);
  if (!currentVertex) continue;
  currentVertex.explored = true;
  if (
    currentVertex.x === commands.length - 1 &&
    currentVertex.y === commands[0].length - 1 &&
    currentVertex.lastTurnWasNBefore >= 4
  ) {
    break;
  }

  for (let neighbour of currentVertex.neighbours) {
    const distanceTillNow = neighbour.distance;
    const updatedDistance = currentVertex.distance + neighbour.cost;
    if (updatedDistance < distanceTillNow) {
      let indexToDelete = vertices.indices.get(neighbour.key);

      neighbour.distance = updatedDistance;

      neighbour.tDistance =
        updatedDistance + hCalculator(neighbour.x, neighbour.y);

      if (indexToDelete) {
        let vertexToUpdate = vertices.store[indexToDelete];

        vertices.delete(indexToDelete);
        vertexToUpdate.key = Math.min(
          vertexToUpdate.key,
          updatedDistance + hCalculator(neighbour.x, neighbour.y)
        );
        vertices.insert(vertexToUpdate);
      }
    }
  }
}

console.log(
  Math.min(
    ...Array.from(vertexMap.values())
      .filter(
        (a) =>
          a.x === commands.length - 1 &&
          a.y === commands[0].length - 1 &&
          a.lastTurnWasNBefore >= 3
      )
      .map((a) => a.distance)
  )
);

function hCalculator(x: number, y: number) {
  return commands.length - x + commands[0].length - y;
}
