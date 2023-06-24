import operator from "./utilities/intcodeMachinev2.mjs";

const IntCode = [
  3, 8, 1005, 8, 335, 1106, 0, 11, 0, 0, 0, 104, 1, 104, 0, 3, 8, 1002, 8, -1,
  10, 1001, 10, 1, 10, 4, 10, 108, 0, 8, 10, 4, 10, 102, 1, 8, 28, 3, 8, 1002,
  8, -1, 10, 1001, 10, 1, 10, 4, 10, 1008, 8, 1, 10, 4, 10, 101, 0, 8, 51, 1006,
  0, 82, 1006, 0, 56, 1, 1107, 0, 10, 3, 8, 102, -1, 8, 10, 101, 1, 10, 10, 4,
  10, 1008, 8, 0, 10, 4, 10, 1001, 8, 0, 83, 3, 8, 1002, 8, -1, 10, 101, 1, 10,
  10, 4, 10, 108, 1, 8, 10, 4, 10, 101, 0, 8, 104, 1006, 0, 58, 3, 8, 1002, 8,
  -1, 10, 1001, 10, 1, 10, 4, 10, 108, 0, 8, 10, 4, 10, 1001, 8, 0, 129, 1006,
  0, 54, 1006, 0, 50, 1006, 0, 31, 3, 8, 1002, 8, -1, 10, 1001, 10, 1, 10, 4,
  10, 1008, 8, 1, 10, 4, 10, 102, 1, 8, 161, 2, 101, 14, 10, 1006, 0, 43, 1006,
  0, 77, 3, 8, 102, -1, 8, 10, 1001, 10, 1, 10, 4, 10, 1008, 8, 0, 10, 4, 10,
  102, 1, 8, 193, 2, 101, 12, 10, 2, 109, 18, 10, 1, 1009, 13, 10, 3, 8, 102,
  -1, 8, 10, 101, 1, 10, 10, 4, 10, 108, 1, 8, 10, 4, 10, 102, 1, 8, 226, 1,
  1103, 1, 10, 1, 1007, 16, 10, 1, 3, 4, 10, 1006, 0, 88, 3, 8, 102, -1, 8, 10,
  101, 1, 10, 10, 4, 10, 108, 1, 8, 10, 4, 10, 1001, 8, 0, 263, 1006, 0, 50, 2,
  1108, 17, 10, 1006, 0, 36, 1, 9, 8, 10, 3, 8, 1002, 8, -1, 10, 101, 1, 10, 10,
  4, 10, 1008, 8, 0, 10, 4, 10, 1002, 8, 1, 300, 1006, 0, 22, 2, 106, 2, 10, 2,
  1001, 19, 10, 1, 3, 1, 10, 101, 1, 9, 9, 1007, 9, 925, 10, 1005, 10, 15, 99,
  109, 657, 104, 0, 104, 1, 21101, 0, 937268454156, 1, 21102, 1, 352, 0, 1106,
  0, 456, 21101, 0, 666538713748, 1, 21102, 363, 1, 0, 1105, 1, 456, 3, 10, 104,
  0, 104, 1, 3, 10, 104, 0, 104, 0, 3, 10, 104, 0, 104, 1, 3, 10, 104, 0, 104,
  1, 3, 10, 104, 0, 104, 0, 3, 10, 104, 0, 104, 1, 21101, 3316845608, 0, 1,
  21102, 1, 410, 0, 1105, 1, 456, 21101, 0, 209475103911, 1, 21101, 421, 0, 0,
  1106, 0, 456, 3, 10, 104, 0, 104, 0, 3, 10, 104, 0, 104, 0, 21101, 0,
  984353603944, 1, 21101, 444, 0, 0, 1105, 1, 456, 21102, 1, 988220752232, 1,
  21102, 1, 455, 0, 1106, 0, 456, 99, 109, 2, 22101, 0, -1, 1, 21102, 40, 1, 2,
  21101, 487, 0, 3, 21101, 0, 477, 0, 1106, 0, 520, 109, -2, 2105, 1, 0, 0, 1,
  0, 0, 1, 109, 2, 3, 10, 204, -1, 1001, 482, 483, 498, 4, 0, 1001, 482, 1, 482,
  108, 4, 482, 10, 1006, 10, 514, 1102, 0, 1, 482, 109, -2, 2105, 1, 0, 0, 109,
  4, 2101, 0, -1, 519, 1207, -3, 0, 10, 1006, 10, 537, 21101, 0, 0, -3, 22101,
  0, -3, 1, 22101, 0, -2, 2, 21102, 1, 1, 3, 21101, 556, 0, 0, 1106, 0, 561,
  109, -4, 2106, 0, 0, 109, 5, 1207, -3, 1, 10, 1006, 10, 584, 2207, -4, -2, 10,
  1006, 10, 584, 21201, -4, 0, -4, 1106, 0, 652, 22101, 0, -4, 1, 21201, -3, -1,
  2, 21202, -2, 2, 3, 21101, 0, 603, 0, 1105, 1, 561, 22101, 0, 1, -4, 21102, 1,
  1, -1, 2207, -4, -2, 10, 1006, 10, 622, 21102, 1, 0, -1, 22202, -2, -1, -2,
  2107, 0, -3, 10, 1006, 10, 644, 21201, -1, 0, 1, 21101, 644, 0, 0, 105, 1,
  519, 21202, -2, -1, -2, 22201, -4, -2, -4, 109, -5, 2106, 0, 0,
];

let relativeBase = [0];

const robotInput = [1];
const robotOutput = [];
//PART1========================================================
const allTiles = [];
class Tile {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.painted = 0;
    this.color = 0;
    allTiles.push(this);
  }
}

let currentLocation = { x: 0, y: 0 };
let directions = [
  { dx: 0, dy: -1 },
  { dx: 1, dy: 0 },
  { dx: 0, dy: 1 },
  { dx: -1, dy: 0 },
];
let currentDirection = 0;

function operatorCaller(arrayToUse, inputMemory, outputMemory, relativeBaseM) {
  let currentIndex = 0;
  while (
    currentIndex !== null &&
    currentIndex < arrayToUse.length &&
    currentIndex !== `HALT`
  ) {
    currentIndex = operator(
      arrayToUse,
      currentIndex,
      inputMemory,
      outputMemory,
      relativeBaseM
    );
    if (outputMemory.length == 2) {
      resolveLocation(currentLocation, outputMemory[0]);
      currentDirection = resolveMovement(currentDirection, currentLocation);
      inputMemory = allTiles
        .filter((a) => a.x === currentLocation.x && a.y === currentLocation.y)
        .map((a) => a.color);
      if (inputMemory.length === 0) {
        inputMemory = [0];
      }
      outputMemory = [];
    }
  }

  function resolveLocation(location, color) {
    let relevantTile = allTiles.filter(
      (place) => place.x === location.x && place.y === location.y
    )[0];

    if (relevantTile === undefined) {
      relevantTile = new Tile(location.x, location.y);
    }

    if (relevantTile.color !== color) {
      relevantTile.color = color;
      relevantTile.painted++;
    }
  }

  function resolveMovement(currentDirection, currentLocation) {
    if (outputMemory[1] === 0) {
      currentDirection -= 1;
      currentDirection = currentDirection === -1 ? 3 : currentDirection;
    } else {
      currentDirection += 1;
      currentDirection = currentDirection % 4;
    }
    currentLocation.x += directions[currentDirection].dx;
    currentLocation.y += directions[currentDirection].dy;

    return currentDirection;
  }
}
//PART2========================================================
function painter(tiles) {
  let limits = tiles.reduce(
    (prev, curr) => {
      if (curr.x < prev.minX) {
        prev.minX = curr.x;
      }
      if (curr.y < prev.minY) {
        prev.minY = curr.y;
      }
      if (curr.x > prev.maxX) {
        prev.maxX = curr.x;
      }
      if (curr.y > prev.maxY) {
        prev.maxY = curr.y;
      }

      return prev;
    },
    { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity }
  );

  for (let j = limits.minY; j <= limits.maxY; j++) {
    let currentRow = "";
    for (let i = limits.minX; i <= limits.maxX; i++) {
      if (tiles.filter((a) => a.x === i && a.y === j).length > 0) {
        let addedChar =
          tiles.filter((a) => a.x === i && a.y === j)[0].color === 0
            ? `⬜`
            : "⬛";
        currentRow += addedChar;
      } else {
        currentRow += "⬜";
      }
    }
    console.log(currentRow);
  }
}

operatorCaller(IntCode, robotInput, robotOutput, relativeBase);
console.log(allTiles.filter((a) => a.painted).length);
painter(allTiles);
