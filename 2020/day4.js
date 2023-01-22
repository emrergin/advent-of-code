import { readFileSync } from "fs";

let lines = readFileSync(`day4input.txt`, "utf-8")
    .split("\n\n")
    .map((a) =>
        a
            .split(" ")
            .flatMap((c) => c.split("\n"))
            .map((b) => b.split(":"))
    )
    .map((a) =>
        a.reduce((acc, cur) => {
            acc.set(cur[0], cur[1]);
            return acc;
        }, new Map())
    );

const thingsToControl = [`byr`, `iyr`, `eyr`, `hgt`, `hcl`, `ecl`, `pid`];

let counter = 0;

function numControl(yearToControl, beg, end) {
    return +yearToControl >= beg && +yearToControl <= end;
}

function heightCheck(height) {
    const unit = height.slice(-2);
    const num = height.slice(0, -2);

    if (unit === `cm`) {
        return numControl(num, 150, 193);
    } else {
        return numControl(num, 59, 76);
    }
}

function hairControl(text) {
    return /^#[0-9A-F]{6}$/i.test(text);
}

function eyeControl(color) {
    return (
        color === "amb" ||
        color === "blu" ||
        color === "brn" ||
        color === "gry" ||
        color === "grn" ||
        color === "hzl" ||
        color === "oth"
    );
}

function pidControl(text) {
    return /^[0-9]{9}$/i.test(text);
}
outerloop: for (let line of lines) {
    for (let field of thingsToControl) {
        if (line.get(field) === undefined) {
            continue outerloop;
        }
    }
    if (
        !(
            numControl(line.get("byr"), 1920, 2002) &&
            numControl(line.get("iyr"), 2010, 2020) &&
            numControl(line.get("eyr"), 2020, 2030) &&
            heightCheck(line.get("hgt")) &&
            hairControl(line.get("hcl")) &&
            eyeControl(line.get("ecl")) &&
            pidControl(line.get("pid"))
        )
    ) {
        continue;
    }
    counter++;
}

console.log(counter);
