import { readFileSync } from "fs";

const commands = readFileSync(`day7input.txt`, "utf-8").split("\n");

const directories = new Map([]);

class Directory {
  constructor(path, parent) {
    this.size = 0;
    this.path = path;
    this.parent = parent;
    directories.set(path, this);
  }

  addSize(size) {
    this.size += size;
    let currentDir = this.parent;
    while (currentDir) {
      currentDir.size += size;
      currentDir = currentDir.parent;
    }
  }
}

let currentDirectory = new Directory("/", null);

for (let i = 0; i < commands.length; i++) {
  let command = commands[i];
  if (command.slice(0, 4) === "$ cd") {
    if (command.slice(-1) === "/") {
      currentDirectory = directories.get("/");
    } else if (command.slice(-2) === "..") {
      currentDirectory = currentDirectory.parent || currentDirectory;
    } else {
      currentDirectory = new Directory(
        currentDirectory.path +
          `${currentDirectory.path.slice(-1) === "/" ? "" : "/"}` +
          command.substring(4),
        currentDirectory
      );
    }
  }
  if (command.slice(0, 4) === "$ ls") {
    let temporaryMemory = [];
    let k = 1;
    while (k + i < commands.length && commands[k + i].slice(0, 1) !== "$") {
      temporaryMemory.push(commands[k + i]);
      k++;
    }
    temporaryMemory = temporaryMemory
      .map((a) => a.split(" "))
      .filter((a) => a[0] !== "dir")
      .map((c) => [+c[0], c[1]]);
    const totalAddedSize = temporaryMemory.reduce(
      (acc, curr) => acc + curr[0],
      0
    );
    currentDirectory.addSize(totalAddedSize);
  }
}

const directoryArray = [];
directories.forEach((v, k) => directoryArray.push(v));
const allSizes = directoryArray.map((a) => a.size);

function partOne() {
  console.log(
    allSizes.filter((a) => a <= 100000).reduce((acc, curr) => acc + curr, 0)
  );
}

function partTwo() {
  const neededExtraSpace = 30000000 - (70000000 - directories.get("/").size);
  const bigEnoughMinimumSize = Math.min(
    ...allSizes.filter((a) => a >= neededExtraSpace)
  );

  console.log(bigEnoughMinimumSize);
}

partOne();
partTwo();
