import { readFileSync } from "fs";
const commands = readFileSync(`day10input.txt`, "utf-8")
  .split("\r\n")
  .map((a) => a.split(""));

let startingCoordinates: Tile;

const pipeShapes: Record<
  string,
  [string, string] | [string, string, string, string]
> = {
  "|": ["north", "south"],
  "-": ["east", "west"],
  L: ["north", "east"],
  J: ["north", "west"],
  "7": ["south", "west"],
  F: ["south", "east"],
  S: ["south", "east", "west", "north"],
};

const reverseDirections: Record<string, string> = {
  north: "south",
  south: "north",
  west: "east",
  east: "west",
};

type Tile = {
  tile: string;
  explored: boolean;
  distance: number;
  x: number;
  y: number;
};
const mapOfTiles = new Map<string, Tile>();
let solutionStack: Tile[] = [];

for (let i = 0; i < commands.length; i++) {
  for (let j = 0; j < commands[0].length; j++) {
    let currentNode = {
      tile: commands[i][j],
      explored: commands[i][j] === "S",
      distance: commands[i][j] === "S" ? 0 : Number.MAX_SAFE_INTEGER,
      x: i,
      y: j,
    };
    if (commands[i][j] === "S") {
      startingCoordinates = currentNode;
      solutionStack = [currentNode];
    }
    mapOfTiles.set(`${i},${j}`, currentNode);
  }
}
function partOne() {
  function move(
    direction: "north" | "south" | "east" | "west",
    currentNode: Tile
  ) {
    let nextNode: Tile | undefined;
    switch (direction) {
      case "west":
        nextNode = mapOfTiles.get(`${currentNode.x},${currentNode.y - 1}`);
        break;
      case "east":
        nextNode = mapOfTiles.get(`${currentNode.x},${currentNode.y + 1}`);
        break;
      case "south":
        nextNode = mapOfTiles.get(`${currentNode.x + 1},${currentNode.y}`);
        break;
      case "north":
        nextNode = mapOfTiles.get(`${currentNode.x - 1},${currentNode.y}`);
        break;
    }
    if (
      !nextNode ||
      nextNode.tile === "." ||
      !pipeShapes[currentNode.tile].includes(direction) ||
      !pipeShapes[nextNode.tile].includes(reverseDirections[direction]) ||
      nextNode.explored
    ) {
      return;
    } else {
      nextNode.distance = Math.min(nextNode.distance, currentNode.distance + 1);
      mapOfTiles.set(`${nextNode.x},${nextNode.y}`, nextNode);
      return nextNode;
    }
  }

  while (solutionStack.length > 0) {
    let currentNode = solutionStack.shift() as Tile;
    const n = move("north", currentNode);
    const s = move("south", currentNode);
    const w = move("west", currentNode);
    const e = move("east", currentNode);
    n && solutionStack.push(n);
    s && solutionStack.push(s);
    w && solutionStack.push(w);
    e && solutionStack.push(e);

    currentNode.explored = true;
  }

  console.log(
    Math.max(
      ...[...mapOfTiles.values()]
        .filter((a) => a.explored)
        .map((a) => a.distance)
    )
  );
}

function partTwo() {
  partOne();
  let numberOfInsides = 0;

  function parseMapForPart2(startingChar: string) {
    for (let i = -1; i < commands.length + 1; i++) {
      for (let j = -1; j < commands[0].length + 1; j++) {
        const currentNode = mapOfTiles.get(`${i},${j}`);
        if (currentNode) {
          if (!currentNode.explored) {
            currentNode.tile = ".";
            mapOfTiles.set(`${i},${j}`, currentNode);
          }
          if (currentNode.tile === "S") {
            currentNode.tile = startingChar;
            mapOfTiles.set(`${i},${j}`, currentNode);
          }
        } else {
          mapOfTiles.set(`${i},${j}`, {
            tile: ".",
            explored: false,
            distance: Number.MAX_SAFE_INTEGER,
            x: i,
            y: j,
          });
        }
      }
    }
  }

  parseMapForPart2("|");

  for (let i = 0; i < commands.length; i++) {
    for (let j = 0; j < commands[0].length; j++) {
      const currentNode = mapOfTiles.get(`${i},${j}`);
      if (currentNode && checkIfInside(currentNode)) {
        numberOfInsides++;
      }
    }
  }

  function checkIfInside(node: Tile) {
    if (node.tile !== ".") {
      return false;
    }
    const mapCopy = structuredClone(mapOfTiles);
    let currentNode: Tile | undefined;
    const path: string[] = [];
    for (let i = 0; i <= node.y + 1; i++) {
      currentNode = mapCopy.get(`${node.x},${-1 + i}`);
      if (!currentNode) {
        continue;
      }
      if (currentNode.tile !== "-") {
        path.push(currentNode.tile);
      }
    }
    let simplifiedPath = path.join("");
    let beginning = null;
    while (beginning !== simplifiedPath) {
      beginning = simplifiedPath;

      simplifiedPath = simplifiedPath.replace(/F7/g, "");
      simplifiedPath = simplifiedPath.replace(/LJ/g, "");
      simplifiedPath = simplifiedPath.replace(/FJ/g, "|");
      simplifiedPath = simplifiedPath.replace(/L7/g, "|");
      simplifiedPath = simplifiedPath.replace(/\|\|/g, "");
      simplifiedPath = simplifiedPath.replace(/\.+/g, ".");
    }

    return simplifiedPath.split("").filter((a) => a === "|").length % 2 === 1;
  }

  console.log(numberOfInsides);
}

partTwo();
