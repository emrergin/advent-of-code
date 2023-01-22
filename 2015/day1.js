import { readFileSync } from "fs";

const inputs = readFileSync(`day1input.txt`, "utf-8")
    .split("")
    .map((a) => (a === ")" ? -1 : 1));
const part1 = inputs.reduce((acc, curr) => acc + curr, 0);
console.log(part1);

let currentFloor = 0;
for (let i = 0; i < inputs.length; i++) {
    currentFloor += inputs[i];
    if (currentFloor === -1) {
        console.log(i + 1);
        break;
    }
}
