import { readFileSync } from "fs";
const input = readFileSync(`day18input.txt`, "utf-8")
  .split("\r\n")
  .map((r) => r.split(",").map(Number));

// console.log(input);

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
  static gridMap: Map<string, Vertex>;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.explored = false;
    this.neighbours = [];
    this.distance = Infinity;
    this.name = `${x}|${y}`;
    if (!Vertex.gridMap) {
      Vertex.gridMap = new Map<string, Vertex>();
    }
    Vertex.gridMap.set(this.name, this);
  }

  static delete(n: string) {
    Vertex.gridMap.delete(n);
  }
}

function part(size: number, bytes: number) {
  let allCorruptedSpaces = input.slice(0, bytes);

  for (let i = 0; i < size + 1; i++) {
    for (let j = 0; j < size + 1; j++) {
      new Vertex(j, i);
      new Vertex(j, i);
      new Vertex(j, i);
      new Vertex(j, i);
    }
  }

  for (let s of allCorruptedSpaces) {
    Vertex.delete(`${s[1]}|${s[0]}`);
  }

  const drs: ("^" | "v" | "<" | ">")[] = ["^", ">", "v", "<"];
  for (let i = 0; i < size + 1; i++) {
    for (let j = 0; j < size + 1; j++) {
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
      }
    }
  }

  dijkstra(`${0}|${0}`);
  return Vertex.gridMap.get(`${size}|${size}`)?.distance;
}

console.log(part(70, 1024));

for (let i = 1024; i < input.length; i++) {
  Vertex.gridMap = new Map<string, Vertex>();
  let dist = part(70, i);
  if (dist === Infinity) {
    console.log(input[i - 1], "!!!");
    break;
  }
}

function dijkstra(startingCellName: string) {
  const firstVertex = Vertex.gridMap.get(startingCellName) as Vertex;
  firstVertex.distance = 0;
  firstVertex.explored = true;

  let currentEdges = firstVertex.neighbours.map((e) => ({
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
      ...nextVertex.neighbours.map((e) => ({
        cost: 1,
        end: e,
        start: nextVertex,
      })),
    ].filter((n) => !n.end.explored && n.start.explored);
  }
}
