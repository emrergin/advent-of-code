import { readFileSync } from "fs";

const inputs = readFileSync(`day2input.txt`, "utf-8")
    .split("\n")
    .map((a) => a.split("x").map(Number));
const part1 = inputs
    .map(
        (a) =>
            (a[0] * a[1] + a[1] * a[2] + a[0] * a[2]) * 2 +
            Math.min(a[0] * a[1], a[1] * a[2], a[0] * a[2])
    )
    .reduce((acc, curr) => acc + curr, 0);

const part2 = inputs
    .map(
        (a) =>
            2 * Math.min(a[0] + a[1], a[1] + a[2], a[0] + a[2]) +
            a[0] * a[1] * a[2]
    )
    .reduce((acc, curr) => acc + curr, 0);

console.log(part2);
