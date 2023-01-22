import { readFileSync } from "fs";

let lines = readFileSync(`day5input.txt`, "utf-8")
    .split(`\n`)
    .map((a) => a.split(` -> `).map((b) => b.split(`,`).map((c) => +c)));

let subMap = Array(1000)
    .fill(0)
    .map((x) => Array(1000).fill(0));

for (let i = 0; i < lines.length; i++) {
    fillBetween(lines[i][0][0], lines[i][0][1], lines[i][1][0], lines[i][1][1]);
}

function fillBetween(x, y, z, t) {
    let smallerX = x < z ? x : z;
    let biggerX = x < z ? z : x;
    let smallerY = y < t ? y : t;
    let biggerY = y < t ? t : y;
    if (y === t) {
        for (let i = smallerX; i < biggerX + 1; i++) {
            subMap[i][y] += 1;
        }
    } else if (x === z) {
        for (let i = smallerY; i < biggerY + 1; i++) {
            subMap[x][i] += 1;
        }
    } else if (Math.abs(x - z) === Math.abs(y - t)) {
        for (let i = smallerX; i < biggerX + 1; i++) {
            if (Math.sign(x - z) === Math.sign(y - t)) {
                subMap[i][smallerY - smallerX + i] += 1;
            } else {
                subMap[i][biggerY + smallerX - i] += 1;
            }
        }
    }
}

console.log(
    subMap
        .map((a) => a.filter((c) => c > 1).length)
        .reduce((prev, curr) => prev + curr, 0)
);
