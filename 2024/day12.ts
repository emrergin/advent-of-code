import { readFileSync } from "fs";
const commands = readFileSync(`day12input.txt`, "utf-8")
  .split("\r\n")
  .map((a) => a.split(""));

const directions = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

function generateRegions() {
  const nodeMap = new Map<string, UnionFind>();
  class UnionFind {
    x: number;
    y: number;
    cells: [number, number][];
    tag: string;
    size: number;
    parent: null | UnionFind;
    name: string;
    fences: number;
    fenceCoordinates: [number, number][];

    constructor(x: number, y: number, tag: string) {
      this.x = x;
      this.y = y;
      this.cells = [[x, y]];
      this.tag = tag;
      this.size = 1;
      this.fences = 0;
      this.parent = null;
      this.name = `${x}|${y}`;
      nodeMap.set(`${x}|${y}`, this);
      this.fenceCoordinates = [];
    }

    find() {
      let currentNode = this;
      while (currentNode.parent) {
        currentNode = currentNode.parent as any;
      }
      return currentNode.name;
    }

    static union(el1: UnionFind, el2: UnionFind) {
      let tag1 = el1.find();
      let tag2 = el2.find();
      let finalParent1 = nodeMap.get(tag1);
      let finalParent2 = nodeMap.get(tag2);
      if (tag1 === tag2) {
        return;
      } else if (finalParent1 && finalParent2) {
        if (finalParent1.size > finalParent2.size) {
          finalParent2.parent = finalParent1;
          finalParent1.size += finalParent2.size;
          finalParent1.cells = [...finalParent1.cells, ...finalParent2.cells];
        } else {
          finalParent1.parent = finalParent2;
          finalParent2.size += finalParent1.size;
          finalParent2.cells = [...finalParent2.cells, ...finalParent1.cells];
        }
      }
    }

    addFences() {
      for (let i = 0; i < this.cells.length; i++) {
        let currentCell = nodeMap.get(
          `${this.cells[i][0]}|${this.cells[i][1]}`
        );
        for (let j = 0; j < directions.length; j++) {
          let targetNode = nodeMap.get(
            `${this.cells[i][0] + directions[j][0]}|${
              this.cells[i][1] + directions[j][1]
            }`
          );
          if (
            targetNode &&
            currentCell &&
            currentCell.find() !== targetNode.find()
          ) {
            this.fences = this.fences + 1;
          }
          if (targetNode === undefined) {
            this.fences = this.fences + 1;
          }
        }
      }
    }

    addFenceWithCoordinates() {
      for (let i = 0; i < this.cells.length; i++) {
        let currentCell = nodeMap.get(
          `${this.cells[i][0]}|${this.cells[i][1]}`
        );
        for (let j = 0; j < directions.length; j++) {
          let targetNode = nodeMap.get(
            `${this.cells[i][0] + directions[j][0]}|${
              this.cells[i][1] + directions[j][1]
            }`
          );
          if (
            (targetNode &&
              currentCell &&
              currentCell.find() !== targetNode.find()) ||
            targetNode === undefined
          ) {
            this.fenceCoordinates = [
              ...this.fenceCoordinates,
              [
                this.cells[i][0] + directions[j][0] / 2,
                this.cells[i][1] + directions[j][1] / 2,
              ],
            ];
          }
        }
      }
    }
  }

  for (let i = 0; i < commands.length; i++) {
    for (let j = 0; j < commands[0].length; j++) {
      new UnionFind(i, j, commands[i][j]);
    }
  }

  let mergedInCurrentCycle = true;
  while (mergedInCurrentCycle) {
    mergedInCurrentCycle = false;
    for (let i = 0; i < commands.length; i++) {
      for (let j = 0; j < commands[0].length; j++) {
        let currentCell = nodeMap.get(`${i}|${j}`);
        for (let k = 0; k < directions.length; k++) {
          let targetNode = nodeMap.get(
            `${i + directions[k][0]}|${j + directions[k][1]}`
          );
          if (
            targetNode &&
            currentCell &&
            currentCell?.tag === targetNode?.tag &&
            targetNode.find() !== currentCell.find()
          ) {
            UnionFind.union(targetNode, currentCell);
            mergedInCurrentCycle = true;
          }
        }
      }
    }
  }

  return nodeMap;
}

function partOne() {
  const nodeMap = generateRegions();
  let checkedSet = new Set<string>();
  let priceTotal = 0;
  for (let [, value] of nodeMap) {
    let relevantKey = value.find();
    if (!checkedSet.has(relevantKey)) {
      checkedSet.add(relevantKey);
      let relevantParent = nodeMap.get(relevantKey);
      relevantParent?.addFences();
      if (relevantParent) {
        priceTotal += relevantParent?.size * relevantParent.fences;
      }
    }
  }
  console.log(priceTotal);
}

function partTwo() {
  class UnionFind2 {
    x: number;
    y: number;
    size: number;
    parent: null | UnionFind2;
    name: string;
    fenceMap: Map<string, UnionFind2>;

    constructor(x: number, y: number, fenceMap: Map<string, UnionFind2>) {
      this.x = x;
      this.y = y;
      this.size = 1;
      this.parent = null;
      this.name = `${x}|${y}`;
      this.fenceMap = fenceMap;
      this.fenceMap.set(`${x}|${y}`, this);
    }

    find() {
      let currentNode = this;
      while (currentNode.parent) {
        currentNode = currentNode.parent as any;
      }
      return currentNode.name;
    }

    static union(el1: UnionFind2, el2: UnionFind2) {
      let tag1 = el1.find();
      let tag2 = el2.find();
      let finalParent1 = el1.fenceMap.get(tag1);
      let finalParent2 = el2.fenceMap.get(tag2);
      if (tag1 === tag2) {
        return;
      } else if (finalParent1 && finalParent2) {
        if (finalParent1.size > finalParent2.size) {
          finalParent2.parent = finalParent1;
          finalParent1.size += finalParent2.size;
        } else {
          finalParent1.parent = finalParent2;
          finalParent2.size += finalParent1.size;
        }
      }
    }
  }

  const nodeMap = generateRegions();

  let checkedSet = new Set<string>();
  let priceTotal = 0;
  for (let [, value] of nodeMap) {
    let relevantKey = value.find();
    if (!checkedSet.has(relevantKey)) {
      checkedSet.add(relevantKey);
      let relevantParent = nodeMap.get(relevantKey);
      relevantParent?.addFenceWithCoordinates();
      if (relevantParent) {
        priceTotal +=
          relevantParent?.size *
          getNumberOfFences(relevantParent.fenceCoordinates);
      }
    }
  }
  console.log(priceTotal);

  function getNumberOfFences(fenceCoordinates: [number, number][]) {
    const fenceMap = new Map<string, UnionFind2>();
    for (let i = 0; i < fenceCoordinates.length; i++) {
      fenceMap.set(
        `${fenceCoordinates[i][0]}|${fenceCoordinates[i][1]}`,
        new UnionFind2(fenceCoordinates[i][0], fenceCoordinates[i][1], fenceMap)
      );
    }
    let totalFences = 0;

    for (let i = 0; i < fenceCoordinates.length; i++) {
      let currentCoordinates = fenceCoordinates[i];
      let thisFence = fenceMap.get(
        `${currentCoordinates[0]}|${currentCoordinates[1]}`
      );
      for (let d = 0; d < directions.length; d++) {
        let otherCoordinateX = currentCoordinates[0] + directions[d][0];
        let otherCoordinateY = currentCoordinates[1] + directions[d][1];
        let otherFence = fenceMap.get(
          `${otherCoordinateX}|${otherCoordinateY}`
        );
        let prevDirection = (d - 1 + 4) % 4;
        let nextDirection = (d + 1) % 4;

        let firstDiagonal = [
          directions[d][0] + directions[prevDirection][0],
          directions[d][1] + directions[prevDirection][1],
        ];
        let secondDiagonal = [
          directions[d][0] + directions[nextDirection][0],
          directions[d][1] + directions[nextDirection][1],
        ];

        let nextCoordinateX1 = currentCoordinates[0] + firstDiagonal[0] * 0.5;
        let nextCoordinateY1 = currentCoordinates[1] + secondDiagonal[1] * 0.5;
        let otherFence2 = fenceMap.get(
          `${nextCoordinateX1}|${nextCoordinateY1}`
        );

        if (
          otherFence2 === undefined &&
          otherFence &&
          thisFence &&
          otherFence.find() !== thisFence.find() &&
          ((directions[d][0] === 0 &&
            Math.floor(otherCoordinateX) !== otherCoordinateX) ||
            (directions[d][1] === 0 &&
              Math.floor(otherCoordinateY) !== otherCoordinateY))
        ) {
          UnionFind2.union(thisFence, otherFence);
        }
      }
    }

    for (let [, value] of fenceMap) {
      if (value.parent === null) {
        totalFences++;
      }
    }
    return totalFences;
  }
}

partOne();
partTwo();
