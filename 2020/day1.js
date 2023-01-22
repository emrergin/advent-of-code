import { readFileSync } from "fs";

let lines = readFileSync(`day1input.txt`, "utf-8")
    .split(`\n`)
    .map((a) => +a);

const skimmed = new Map();

function partOne() {
    for (let line of lines) {
        if (skimmed.get(2020 - line)) {
            console.log(line * (2020 - line));
            break;
        } else {
            skimmed.set(line, true);
        }
    }
}

function partTwo() {
    outerloop: for (let line1 of lines) {
        for (let line2 of lines) {
            if (skimmed.get(2020 - line1 - line2)) {
                console.log(line1 * line2 * (2020 - line1 - line2));
                break outerloop;
            } else {
                skimmed.set(line2, true);
            }
        }
    }
}
