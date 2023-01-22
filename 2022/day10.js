import { readFileSync } from "fs";
const commands = readFileSync(`day10input.txt`, "utf-8")
    .split("\n")
    .map((a) => a.split(" "))
    .map((a) => [a[0], a[1] ? +a[1] : null]);

const xCommands = commands.reduce(
    (acc, curr) => {
        acc.push(0);
        if (curr[1]) {
            acc.push(curr[1]);
        }
        return acc;
    },
    [1]
);

function partOne() {
    function getSignal(upTo) {
        return (
            xCommands.slice(0, upTo).reduce((acc, curr) => acc + curr, 0) * upTo
        );
    }
    console.log(
        [20, 60, 100, 140, 180, 220]
            .map(getSignal)
            .reduce((acc, curr) => acc + curr, 0)
    );
}

function partTwo() {
    let xregister = 0;
    for (let i = 0; i < 6; i++) {
        let row = "";
        for (let j = 0; j < 40; j++) {
            xregister += xCommands[i * 40 + j];
            if (xregister - j < 2 && xregister - j > -2) {
                row += "⬛";
            } else {
                row += "⬜";
            }
        }
        console.log(row);
    }
}

partOne();
partTwo();
