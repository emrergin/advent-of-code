import { readFileSync } from "fs";

let lines = readFileSync(`day2input.txt`, "utf-8")
    .split(`\n`)
    .map((l) => l.split(" "))
    .map((a) => [a[0].split("-"), a[1][0], a[2]])
    .map((a) => ({
        min: +a[0][0],
        max: +a[0][1],
        letter: a[1],
        password: a[2],
    }));

function checkPassword1(line) {
    let countLetter = 0;
    for (let i = 0; i < line.password.length; i++) {
        if (line.password[i] === line.letter) {
            countLetter++;
        }
    }
    return countLetter <= line.max && countLetter >= line.min;
}

function checkPassword2(line) {
    return (
        (line.password[line.min - 1] === line.letter ||
            line.password[line.max - 1] === line.letter) &&
        (line.password[line.min - 1] !== line.letter ||
            line.password[line.max - 1] !== line.letter)
    );
}

function partOne() {
    let finalCounter = 0;
    lines.forEach((a) => {
        if (checkPassword1(a)) {
            finalCounter++;
        }
    });
    console.log(finalCounter);
}

function partTwo() {
    let finalCounter = 0;
    lines.forEach((a) => {
        if (checkPassword2(a)) {
            finalCounter++;
        }
    });
    console.log(finalCounter);
}
