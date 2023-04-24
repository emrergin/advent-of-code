import { readFileSync } from "fs";

const lines = readFileSync(`day9input.txt`, "utf-8")
    .split("\n")
    .map((a) => a.split("").map(Number));
// const lines = readFileSync(`day9test.txt`, "utf-8").split("\n").map(a=>a.split("").map(Number))

const allLowPoints = [];
function partOne() {
    let counter = 0;
    for (let i = 0; i < lines.length; i++) {
        for (let j = 0; j < lines[0].length; j++) {
            if (
                (i === 0 || lines[i - 1][j] > lines[i][j]) &&
                (j === 0 || lines[i][j - 1] > lines[i][j]) &&
                (i === lines.length - 1 || lines[i + 1][j] > lines[i][j]) &&
                (j === lines[0].length - 1 || lines[i][j + 1] > lines[i][j])
            ) {
                counter += 1 + lines[i][j];
                allLowPoints.push({ x: i, y: j });
            }
        }
    }

    console.log(counter);
}

const filledMap = new Map();

function calculateBasinSize(x, y) {
    if (
        x < 0 ||
        y < 0 ||
        x > lines.length - 1 ||
        y > lines[0].length - 1 ||
        lines[x][y] === 9 ||
        filledMap.get(`${x}-${y}`)
    ) {
        return 0;
    } else {
        filledMap.set(`${x}-${y}`, true);
        return (
            calculateBasinSize(x - 1, y) +
            calculateBasinSize(x + 1, y) +
            calculateBasinSize(x, y - 1) +
            calculateBasinSize(x, y + 1) +
            1
        );
    }
}

partOne();
const allBasinSizes = [];
for (let k = 0; k < allLowPoints.length; k++) {
    allBasinSizes.push(
        calculateBasinSize(allLowPoints[k].x, allLowPoints[k].y)
    );
}

console.log(
    allBasinSizes
        .sort((a, b) => b - a)
        .slice(0, 3)
        .reduce((acc, curr) => acc * curr, 1)
);
