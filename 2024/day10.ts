import { readFileSync } from "fs";
const commands = readFileSync(`day10input.txt`, "utf-8")
  .split("\r\n")
  .map((a) => a.split("").map(Number));

interface TrailHead {
  score: number;
}

function part(part: 1 | 2) {
  const headMap = new Map<string, TrailHead>();
  for (let i = 0; i < commands.length; i++) {
    for (let j = 0; j < commands[0].length; j++) {
      if (commands[i][j] === 0) {
        headMap.set(`${i}|${j}`, { score: 0 });
      }
    }
  }

  const directions = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];

  function addScores(x: number, y: number) {
    let discoveryStack = [[x, y]];
    let reachedTrailheads: string[] = [];

    while (discoveryStack.length > 0) {
      let currentNode = discoveryStack.shift() as [number, number];
      let currentHeight = commands[currentNode[0]][currentNode[1]];
      if (currentHeight === 0) {
        let trailheadKey = `${currentNode[0]}|${currentNode[1]}`;
        if (!reachedTrailheads.includes(trailheadKey) || part === 2) {
          let relevantTrailhead = headMap.get(trailheadKey);
          if (relevantTrailhead) {
            relevantTrailhead.score = relevantTrailhead?.score + 1;
          }
          if (part === 2) {
            reachedTrailheads.push(trailheadKey);
          }
        }
        continue;
      }

      for (let i = 0; i < directions.length; i++) {
        let nextNode = [
          currentNode[0] + directions[i][0],
          currentNode[1] + directions[i][1],
        ];
        if (
          commands[nextNode[0]] &&
          commands[nextNode[0]][nextNode[1]] === currentHeight - 1
        ) {
          discoveryStack.push(nextNode);
        }
      }
    }
  }

  for (let i = 0; i < commands.length; i++) {
    for (let j = 0; j < commands[0].length; j++) {
      if (commands[i][j] === 9) {
        addScores(i, j);
      }
    }
  }

  let total = 0;
  for (let [, value] of headMap) {
    total += value.score;
  }

  console.log(total);
}

part(1);
part(2);
