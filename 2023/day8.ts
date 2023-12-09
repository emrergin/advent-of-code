import { readFileSync } from "fs";
const commands = readFileSync(`day8input.txt`, "utf-8")
  .split("\r\n\r\n")
  .map((m, index) => {
    if (index === 0) {
      return m.trim().split("");
    } else {
      return m
        .split("\r\n")
        .map((a) => a.split(" = "))
        .map((a) => {
          const allMatches = [...a[1].matchAll(/\w{3}/g)];
          return [a[0], { left: allMatches[0][0], right: allMatches[1][0] }];
        });
    }
  });

const mapOfNodes = new Map(
  commands[1] as [
    string,
    {
      left: string;
      right: string;
    }
  ][]
);

function moveOnce(currentNode: string | null, currentCommand: "L" | "R") {
  if (!currentNode) return null;
  const nextNode = mapOfNodes.get(currentNode);
  if (!nextNode) {
    return null;
  }
  return currentCommand === "L" ? nextNode.left : nextNode.right;
}

function partOne() {
  let currentNode: null | string = "AAA";
  let commandIndex = 0;
  while (true) {
    const currentCommand = commands[0][commandIndex % commands[0].length] as
      | "L"
      | "R";
    if (!currentNode) {
      break;
    }
    currentNode = moveOnce(currentNode, currentCommand);
    commandIndex++;
    if (currentNode === "ZZZ") {
      break;
    }
  }

  console.log(commandIndex);
}

function partTwo() {
  let currentNodes: (string | null)[] = (
    commands[1] as [
      string,
      {
        left: string;
        right: string;
      }
    ][]
  )
    .map((a) => a[0])
    .filter((a) => (a as string).charAt(2) === "A");

  let values: number[] = [];

  let commandIndex = 0;
  while (true) {
    const currentCommand = commands[0][commandIndex % commands[0].length] as
      | "L"
      | "R";

    currentNodes = currentNodes.map((a) => moveOnce(a, currentCommand));
    currentNodes.forEach((a) => {
      if (a?.charAt(2) === "Z") {
        values.push(commandIndex + 1);
      }
    });
    currentNodes = currentNodes.filter((a) => a?.charAt(2) !== "Z");

    commandIndex++;
    if (currentNodes.length === 0) {
      break;
    }
  }

  console.log(values.reduce((acc, curr) => lcmFunction(acc, curr), 1));

  function gcd(a: number, b: number) {
    for (let temp = b; b !== 0; ) {
      b = a % b;
      a = temp;
      temp = b;
    }
    return a;
  }

  function lcmFunction(a: number, b: number) {
    const gcdValue = gcd(a, b);
    return (a * b) / gcdValue;
  }
}

partOne();
partTwo();
