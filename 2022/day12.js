import { readFileSync } from "fs";
const commands = readFileSync(`day12input.txt`, "utf-8")
    .split("\n")
    .map((a) => a.split(""));

const numX = commands[0].length;
const numY = commands.length;

class Tile {
    constructor(letter, x, y) {
        this.letter = letter;
        this.explored = false;
        this.x = x;
        this.y = y;
        this.distance = Infinity;
        this.neighbours = [];
    }
}

function controlNeighbourToAdd(xx, yy, currentLetter) {
    if (xx >= numX) {
        return false;
    }
    if (xx < 0) {
        return false;
    }
    if (yy >= numY) {
        return false;
    }
    if (yy < 0) {
        return false;
    }
    const targetLetter = commands[yy][xx];
    if (currentLetter === "z" || targetLetter === "a") {
        return true;
    }
    if (targetLetter === "E") {
        return false;
    }

    if (
        convertToPriority(targetLetter) - convertToPriority(currentLetter) >
        1
    ) {
        return false;
    }
    return true;
}

function controlNeighbourToAdd2(xx, yy, currentLetter) {
    if (xx >= numX) {
        return false;
    }
    if (xx < 0) {
        return false;
    }
    if (yy >= numY) {
        return false;
    }
    if (yy < 0) {
        return false;
    }
    const targetLetter = commands[yy][xx];

    if (
        convertToPriority(currentLetter) - convertToPriority(targetLetter) >
        1
    ) {
        return false;
    }
    return true;
}

function convertToPriority(letter) {
    if (letter === "E") {
        return "{".charCodeAt(0);
    }
    if (letter === "S") {
        return "a".charCodeAt(0);
    }
    return letter.charCodeAt(0);
}

function findDistanceFrom(tarX, tarY, controlFunction, part) {
    const tileMap = new Map();

    for (let y = 0; y < commands.length; y++) {
        for (let x = 0; x < commands[0].length; x++) {
            const tile = new Tile(commands[y][x], x, y);
            controlFunction(x + 1, y, commands[y][x]) &&
                tile.neighbours.push(`x:${x + 1}-y:${y}`);
            controlFunction(x - 1, y, commands[y][x]) &&
                tile.neighbours.push(`x:${x - 1}-y:${y}`);
            controlFunction(x, y + 1, commands[y][x]) &&
                tile.neighbours.push(`x:${x}-y:${y + 1}`);
            controlFunction(x, y - 1, commands[y][x]) &&
                tile.neighbours.push(`x:${x}-y:${y - 1}`);
            tileMap.set(`x:${x}-y:${y}`, tile);
        }
    }

    let queue = [];
    queue.push(tileMap.get(`x:${tarX}-y:${tarY}`));
    tileMap.get(`x:${tarX}-y:${tarY}`).distance = 0;
    tileMap.get(`x:${tarX}-y:${tarY}`).explored = true;
    while (queue.length > 0) {
        let v = queue.shift();
        let currentNeighbours = v.neighbours.map((a) => tileMap.get(a));
        for (let w of currentNeighbours) {
            if (!w.explored) {
                w.explored = true;
                w.distance = v.distance + 1;
                queue.push(w);
                if (w.letter === "E" && part === 1) {
                    return w.distance;
                }
                if ((w.letter === "a" || w.letter === "S") && part === 2) {
                    return w.distance;
                }
            }
        }
    }
}

function partOne() {
    let startingPoint;
    outerloop: for (let y = 0; y < commands.length; y++) {
        for (let x = 0; x < commands[0].length; x++) {
            if (commands[y][x] === "S") {
                startingPoint = { x, y };
                break outerloop;
            }
        }
    }

    const result = findDistanceFrom(
        startingPoint.x,
        startingPoint.y,
        controlNeighbourToAdd,
        1
    );
    console.log(result);
}

function partTwo() {
    let startingPoint;
    outerloop: for (let y = 0; y < commands.length; y++) {
        for (let x = 0; x < commands[0].length; x++) {
            if (commands[y][x] === "E") {
                startingPoint = { x, y };
                break outerloop;
            }
        }
    }

    const result = findDistanceFrom(
        startingPoint.x,
        startingPoint.y,
        controlNeighbourToAdd2,
        2
    );
    console.log(result);
}

partOne();
partTwo();
