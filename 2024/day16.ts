import { readFileSync } from "fs";
const input = readFileSync(`day16input.txt`, "utf-8")
  .split("\r\n")
  .map((r) => r.split(""));

const directions = {
  "^": [0, -1],
  ">": [1, 0],
  v: [0, 1],
  "<": [-1, 0],
};

class Vertex {
  x: number;
  y: number;
  direction: "^" | "v" | "<" | ">";
  explored: boolean;
  neighbours: Vertex[];
  distance: number;
  name: string;
  static gridMap: Map<string, Vertex>;

  constructor(x: number, y: number, direction: "^" | "v" | "<" | ">") {
    this.x = x;
    this.y = y;
    this.explored = false;
    this.direction = direction;
    this.neighbours = [];
    this.distance = Infinity;
    this.name = `${direction}|${x}|${y}`;
    if (!Vertex.gridMap) {
      Vertex.gridMap = new Map<string, Vertex>();
    }
    Vertex.gridMap.set(this.name, this);
  }
}

let startX = -1;
let startY = -1;
let endX = -1;
let endY = -1;
for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[0].length; j++) {
    if (input[i][j] === "S") {
      startX = j;
      startY = i;
    } else if (input[i][j] === "E") {
      endX = j;
      endY = i;
    }

    if (input[i][j] !== "#") {
      new Vertex(j, i, "^");
      new Vertex(j, i, ">");
      new Vertex(j, i, "<");
      new Vertex(j, i, "v");
    }
  }
}

const drs: ("^" | "v" | "<" | ">")[] = ["^", ">", "v", "<"];
for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[0].length; j++) {
    for (let k = 0; k < 4; k++) {
      let currentVertex = Vertex.gridMap.get(`${drs[k]}|${j}|${i}`);
      if (!currentVertex) {
        continue;
      }
      let prevVertex = k === 0 ? 3 : k - 1;
      let nextVertex = k === 3 ? 0 : k + 1;
      let neighbour1 = Vertex.gridMap.get(`${drs[prevVertex]}|${j}|${i}`);
      let neighbour2 = Vertex.gridMap.get(`${drs[nextVertex]}|${j}|${i}`);
      let neighbour3 = Vertex.gridMap.get(
        `${drs[k]}|${j + directions[drs[k]][0]}|${i + directions[drs[k]][1]}`
      );
      currentVertex.neighbours = [neighbour3, neighbour1, neighbour2].filter(
        (a) => a !== undefined
      );
    }
  }
}

const startingVertex = Vertex.gridMap.get(`>|${startX}|${startY}`) as Vertex;
startingVertex.distance = 0;
startingVertex.explored = true;

let currentEdges = startingVertex.neighbours.map((e) => ({
  cost: getCost(startingVertex, e),
  end: e,
  start: startingVertex,
}));

while (currentEdges.length > 0) {
  currentEdges.sort((a, b) => a.cost - b.cost);
  let nextEdge = currentEdges[0];

  let nextVertex = nextEdge.end;
  let currentVertex = nextEdge.start;

  nextVertex.explored = true;
  nextVertex.distance =
    currentVertex.distance + getCost(nextVertex, currentVertex);

  currentEdges = [
    ...currentEdges,
    ...nextVertex.neighbours.map((e) => ({
      cost: getCost(nextVertex, e) + nextVertex.distance,
      end: e,
      start: nextVertex,
    })),
  ].filter((n) => !n.end.explored && n.start.explored);
}

console.log(
  Math.min(
    Vertex.gridMap.get(`^|${endX}|${endY}`)?.distance || Infinity,
    Vertex.gridMap.get(`v|${endX}|${endY}`)?.distance || Infinity,
    Vertex.gridMap.get(`<|${endX}|${endY}`)?.distance || Infinity,
    Vertex.gridMap.get(`>|${endX}|${endY}`)?.distance || Infinity
  )
);

function getCost(v1: Vertex, v2: Vertex) {
  if (v1.x === v2.x && v1.y === v2.y) {
    return 1000;
  } else {
    return 1;
  }
}
