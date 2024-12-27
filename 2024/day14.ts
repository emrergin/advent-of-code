import { readFileSync } from "fs";
import { UnionFind } from "../utilities/helpers.js";
const commands = readFileSync(`day14input.txt`, "utf-8")
  .split("\r\n")
  .map((r) =>
    r.split(" ").map((c) =>
      c
        .split(/[^0-9-]/)
        .filter((d) => d !== "")
        .map(Number)
    )
  );

class TreePic extends UnionFind {
  static greatestSize: number;

  static union(el1: UnionFind, el2: UnionFind) {
    let tag1 = el1.find();
    let tag2 = el2.find();
    let finalParent1 = el1.nodeMap.get(tag1);
    let finalParent2 = el2.nodeMap.get(tag2);
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
      TreePic.greatestSize = Math.max(
        TreePic.greatestSize || 0,
        finalParent1.size,
        finalParent2.size
      );
    }
  }
}

function generateRobotsFromCommands() {
  class Robot {
    x: number;
    y: number;
    vX: number;
    vY: number;
    constructor(x: number, y: number, vX: number, vY: number) {
      this.x = x;
      this.y = y;
      this.vX = vX;
      this.vY = vY;
    }

    move(mapWidth: number, mapHeight: number, step?: number) {
      this.x =
        (((this.x + this.vX * (step || 1)) % mapWidth) + mapWidth) % mapWidth;
      this.y =
        (((this.y + this.vY * (step || 1)) % mapHeight) + mapHeight) %
        mapHeight;
    }
  }

  let allRobots: Robot[] = [];
  let commandCopy = structuredClone(commands);
  for (let i = 0; i < commands.length; i++) {
    allRobots.push(
      new Robot(
        commandCopy[i][0][0],
        commandCopy[i][0][1],
        commandCopy[i][1][0],
        commandCopy[i][1][1]
      )
    );
  }

  return allRobots;
}

function partOne(height: number, width: number) {
  let mapWidth = width;
  let mapHeight = height;
  let allRobots = generateRobotsFromCommands();
  let robotRecords = new Map<string, number>();
  allRobots.forEach((r) => r.move(mapWidth, mapHeight, 100));

  allRobots.forEach((r) => {
    let relevantRecord = robotRecords.get(`${r.x}|${r.y}`) || 0;
    robotRecords.set(`${r.x}|${r.y}`, relevantRecord + 1);
  });

  let quadrantContents = [0, 0, 0, 0];
  for (let i = 0; i < mapHeight; i++) {
    if (i === (mapHeight - 1) / 2) {
      continue;
    }
    for (let j = 0; j < mapWidth; j++) {
      if (j === (mapWidth - 1) / 2) {
        continue;
      }
      let q1 = i / mapHeight > 0.5 ? 2 : 0;
      let q2 = j / mapWidth > 0.5 ? 1 : 0;

      quadrantContents[q1 + q2] =
        quadrantContents[q1 + q2] + (robotRecords.get(`${i}|${j}`) || 0);
    }
  }

  console.log(quadrantContents);
  console.log(quadrantContents.reduce((acc, curr) => acc * curr, 1));
}

function partTwo() {
  const directions = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, -1],
    [1, 1],
    [1, -1],
    [-1, 1],
  ];

  let mapWidth = 101;
  let mapHeight = 103;

  let possibleT = [];

  let t = 0;
  const allRobots = generateRobotsFromCommands();

  while (t < 10000) {
    t++;
    TreePic.greatestSize = 1;
    const robotRecords = new Map<string, TreePic>();
    allRobots.forEach((r) => {
      r.move(mapWidth, mapHeight, 1);
      robotRecords.set(
        `${r.x}|${r.y}`,
        new TreePic(robotRecords, `${r.x}|${r.y}`)
      );
    });

    allRobots.forEach((r) => {
      let currentNode = robotRecords.get(`${r.x}|${r.y}`);
      for (let d = 0; d < directions.length; d++) {
        let targetNode = robotRecords.get(
          `${r.x + directions[d][0]}|${r.y + directions[d][1]}`
        );
        if (targetNode && currentNode) {
          TreePic.union(targetNode, currentNode);
        }
      }
    });

    possibleT.push({ index: t, value: TreePic.greatestSize });
  }
  console.log(possibleT.sort((a, b) => b.value - a.value)[0].index);
}

function print(t: number, print: boolean = true) {
  let total = 0;
  let mapWidth = 101;
  let mapHeight = 103;
  let allRobots = generateRobotsFromCommands();

  let robotRecords = new Map<string, number>();
  allRobots.forEach((r) => {
    r.move(mapWidth, mapHeight, t);
    robotRecords.set(`${r.y}|${r.x}`, 1);
  });

  for (let r = 0; r < 103; r++) {
    let currentline = "";
    for (let c = 0; c < 101; c++) {
      if (robotRecords.get(`${r}|${c}`)) {
        currentline += "#";
        total++;
      } else {
        currentline += ".";
      }
    }
    print && console.log(currentline);
  }
  return total;
}

partOne(101, 103);
partTwo();
