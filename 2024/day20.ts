import { readFileSync } from "fs";
const input = readFileSync(`day20input.txt`, "utf-8")
  .split("\r\n")
  .map((a) => a.split(""));

const directions = {
  "^": [0, -1],
  ">": [1, 0],
  v: [0, 1],
  "<": [-1, 0],
};

class Vertex {
  x: number;
  y: number;
  explored: boolean;
  neighbours: Vertex[];
  distance: number;
  name: string;
  nonWallNeighbours: Vertex[];
  static gridMap: Map<string, Vertex>;
  type: "wall" | "space";

  constructor(x: number, y: number, type: "wall" | "space") {
    this.x = x;
    this.y = y;
    this.explored = false;
    this.neighbours = [];
    this.nonWallNeighbours = [];
    this.distance = Infinity;
    this.name = `${x}|${y}`;
    this.type = type;
    if (!Vertex.gridMap) {
      Vertex.gridMap = new Map<string, Vertex>();
    }
    Vertex.gridMap.set(this.name, this);
  }
}

function partOne() {
  let startingX = -1;
  let startingY = -1;
  let endX = -1;
  let endY = -1;

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
      new Vertex(j, i, input[i][j] === "#" ? "wall" : "space");
      if (input[i][j] === "S") {
        startingX = j;
        startingY = i;
      }
      if (input[i][j] === "E") {
        endX = j;
        endY = i;
      }
    }
  }

  const drs: ("^" | "v" | "<" | ">")[] = ["^", ">", "v", "<"];
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
      for (let k = 0; k < 4; k++) {
        let currentVertex = Vertex.gridMap.get(`${j}|${i}`);
        if (!currentVertex) {
          continue;
        }
        let neighbour = Vertex.gridMap.get(
          `${j + directions[drs[k]][0]}|${i + directions[drs[k]][1]}`
        );

        if (neighbour) {
          currentVertex.neighbours.push(neighbour);
        }
        if (neighbour?.type === "space") {
          currentVertex.nonWallNeighbours.push(neighbour);
        }
      }
    }
  }

  dijkstra(`${startingX}|${startingY}`);

  let goodCheats = 0;
  outer: for (let [, value] of Vertex.gridMap) {
    if (value.type === "wall" && value.nonWallNeighbours.length > 1) {
      let neighbours = value.nonWallNeighbours;
      for (let i = 0; i < neighbours.length; i++) {
        for (let j = 0; j < neighbours.length; j++) {
          if (
            (i !== j && Math.abs(neighbours[i].x - neighbours[j].x) === 2) ||
            Math.abs(neighbours[i].y - neighbours[j].y) === 2
          ) {
            let dist =
              Math.abs(neighbours[i].distance - neighbours[j].distance) - 2;
            if (dist >= 100) {
              goodCheats++;
              continue outer;
            }
          }
        }
      }
    }
  }
  console.log(goodCheats);
}

function dijkstra(startingCellName: string) {
  const firstVertex = Vertex.gridMap.get(startingCellName) as Vertex;
  firstVertex.distance = 0;
  firstVertex.explored = true;

  let currentEdges = firstVertex.nonWallNeighbours.map((e) => ({
    cost: 1,
    end: e,
    start: firstVertex,
  }));

  while (currentEdges.length > 0) {
    currentEdges.sort((a, b) => a.cost - b.cost);
    let nextEdge = currentEdges[0];

    let nextVertex = nextEdge.end;
    let currentVertex = nextEdge.start;

    nextVertex.explored = true;
    nextVertex.distance = currentVertex.distance + 1;

    currentEdges = [
      ...currentEdges,
      ...nextVertex.nonWallNeighbours.map((e) => ({
        cost: 1,
        end: e,
        start: nextVertex,
      })),
    ].filter((n) => !n.end.explored && n.start.explored);
  }
}
