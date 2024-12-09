import { readFileSync } from "fs";
const commands = readFileSync(`day9input.txt`, "utf-8").split("").map(Number);

interface Config {
  spaces: (File | null)[];
  allFilesById: File[];
}

class File {
  id: number;
  length: number;
  places: number[];
  config: Config;
  constructor(id: number, length: number, start: number, config: Config) {
    this.id = id;
    this.length = length;
    this.places = [];
    this.config = config;
    for (let i = start; i < start + length; i++) {
      this.places.push(i);
      config.spaces[i] = this;
    }
    config.allFilesById.push(this);
  }

  move(from?: number) {
    let startFrom = from || 0;
    while (this.config.spaces[startFrom]) {
      startFrom++;
    }

    let totalFilled = 0;
    this.places.forEach((s) => (this.config.spaces[s] = null));
    this.places = [];
    let offSet = 0;
    while (totalFilled < this.length) {
      let currentIndex = startFrom + totalFilled + offSet;
      if (!this.config.spaces[currentIndex]) {
        this.places.push(currentIndex);
        this.config.spaces[currentIndex] = this;
        totalFilled++;
      } else {
        offSet++;
      }
    }
    while (this.config.spaces[startFrom]) {
      startFrom++;
    }
  }

  findBulkMoveIndex() {
    let currentIndex = 0;
    outer: while (currentIndex < this.places[0]) {
      for (let i = 0; i < this.length; i++) {
        if (this.config.spaces[i + currentIndex] != null) {
          currentIndex++;
          continue outer;
        }
      }
      return currentIndex;
    }

    return -1;
  }
}

function partOne() {
  const config = generateStart();
  let firstEmpty = 0;
  let lastFilled = config.spaces.length;
  while (firstEmpty < lastFilled) {
    let relevantFile = config.spaces[lastFilled];
    relevantFile?.move();

    while (config.spaces[firstEmpty]) {
      firstEmpty++;
    }
    while (config.spaces[lastFilled] == null) {
      lastFilled--;
    }
  }

  printCheckSum(config);
}

function partTwo() {
  const config = generateStart();

  for (let k = config.allFilesById.length - 1; k >= 0; k--) {
    let relevantFile = config.allFilesById[k];
    let n = relevantFile.findBulkMoveIndex();
    if (n > 0) {
      relevantFile?.move(n);
    }
  }

  printCheckSum(config);
}

function printCheckSum(config: Config) {
  let total = 0;
  let index = 0;
  while (index < config.spaces.length) {
    if (config.spaces[index] !== null) {
      total += config.spaces[index]!.id * index;
    }
    index++;
  }
  console.log(total);
}

function generateStart() {
  const config: Config = {
    spaces: [],
    allFilesById: [],
  };
  let inputIndex = 0;
  let nextId = 0;
  for (let i = 0; i < commands.length; i++) {
    if (i % 2 === 1) {
      for (let j = 0; j < commands[i]; j++) {
        config.spaces[inputIndex + j] = null;
      }
      inputIndex += commands[i];
    } else {
      new File(nextId, commands[i], inputIndex, config);
      nextId++;
      inputIndex += commands[i];
    }
  }
  return config;
}

partOne();
partTwo();
