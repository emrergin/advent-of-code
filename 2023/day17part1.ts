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
  pathSoFar: Direction[];
  lastDirections: [Direction, Direction, Direction];
  key: string;
  distance: number;
  neighbours: Vertex[];
  explored: boolean;
  tDistance: number;
};

const vertexMap = new Map<string, Vertex>();
const explored = new Set<string>();
let vertices = new Heap<"mapkey">("mapkey");

for (let i = 0; i < commands.length; i++) {
  for (let j = 0; j < commands[0].length; j++) {
    for (let direction1 in directions) {
      for (let direction2 in directions) {
        for (let direction3 in directions) {
          const lastDirections = [direction1, direction2, direction3] as [
            Direction,
            Direction,
            Direction
          ];
          const key = `${i}|${j}|${JSON.stringify(lastDirections)}`;

          const newVertex: Vertex = {
            key,
            lastDirections,
            pathSoFar: [],
            x: i,
            y: j,
            cost: commands[i][j],
            distance: Infinity,
            neighbours: [],
            explored: false,
            tDistance: Infinity,
          };
          vertices.insert({ key: Infinity, mapkey: key });
          vertexMap.set(key, newVertex);
        }
      }
    }
  }
}

for (let i = 0; i < commands.length; i++) {
  for (let j = 0; j < commands[0].length; j++) {
    for (let direction1 in directions) {
      for (let direction2 in directions) {
        for (let direction3 in directions) {
          const lastDirections = [direction1, direction2, direction3] as [
            Direction,
            Direction,
            Direction
          ];
          const key = `${i}|${j}|${JSON.stringify(lastDirections)}`;
          const currentVertex = vertexMap.get(key);

          for (let direction in directions) {
            if (
              direction1 === direction2 &&
              direction1 === direction3 &&
              direction1 === direction
            ) {
              continue;
            }
            if (
              (direction3 === "down" && direction === "up") ||
              (direction3 === "up" && direction === "down") ||
              (direction3 === "right" && direction === "left") ||
              (direction3 === "left" && direction === "right")
            ) {
              continue;
            }
            const currentLastDirections = [direction2, direction3, direction];
            const currentKey = `${i + directions[direction as Direction][0]}|${
              j + directions[direction as Direction][1]
            }|${JSON.stringify(currentLastDirections)}`;
            const currentNeighbour = vertexMap.get(currentKey);
            if (currentNeighbour) {
              currentVertex?.neighbours.push(currentNeighbour);
            }
          }
        }
      }
    }
  }
}

const ld = ["up", "up", "up"];
const startingVertex = vertexMap.get(
  `${0}|${0}|${JSON.stringify(ld)}`
) as Vertex;
startingVertex.distance = 0;
startingVertex.tDistance = hCalculator(0, 0);

const totalSize = commands.length * commands[0].length * 64;

while (explored.size < totalSize) {
  if (vertices.length === 0) {
    break;
  }
  const currentKey = vertices.extract()?.mapkey;
  if (!currentKey) continue;
  const currentVertex = vertexMap.get(currentKey);
  if (!currentVertex) continue;
  currentVertex.explored = true;
  explored.add(currentVertex.key);
  if (
    currentVertex.x === commands.length - 1 &&
    currentVertex.y === commands[0].length - 1
  ) {
    break;
  }

  for (let neighbour of currentVertex.neighbours) {
    const distanceTillNow = neighbour.distance;
    const updatedDistance = currentVertex.distance + neighbour.cost;
    if (updatedDistance < distanceTillNow) {
      let indexToDelete = vertices.indices.get(neighbour.key);

      neighbour.distance = updatedDistance;
      neighbour.pathSoFar = [
        ...currentVertex.pathSoFar,
        ...neighbour.lastDirections.slice(-1),
      ];
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
        (a) => a.x === commands.length - 1 && a.y === commands[0].length - 1
      )
      .map((a) => a.distance)
  )
);

function hCalculator(x: number, y: number) {
  return commands.length - x + commands[0].length - y;
}
