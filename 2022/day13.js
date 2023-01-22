import { readFileSync } from "fs";

function compareTwoElements(element1, element2) {
    if (element1 === undefined) {
        return true;
    }
    if (element2 === undefined) {
        return false;
    }
    if (typeof element1 === "number" && typeof element2 === "number") {
        if (element1 > element2) {
            return false;
        }
        if (element1 < element2) {
            return true;
        }
    } else {
        const ele1 = convertToArray(element1);
        const ele2 = convertToArray(element2);
        if (ele1.length === 0 && ele2.length > 0) {
            return true;
        }
        if (ele2.length === 0 && ele1.length > 0) {
            return false;
        }
        for (let i = 0; i < Math.max(ele1.length, ele2.length); i++) {
            const res = compareTwoElements(ele1[i], ele2[i]);
            if (res !== undefined) {
                return res;
            }
        }
    }
}

function convertToArray(element) {
    if (typeof element === "object") {
        return element;
    }
    if (typeof element === "number") {
        return [element];
    }
}

function partOne() {
    const commands = readFileSync(`day13input.txt`, "utf-8")
        .split("\n\n")
        .map((a) => a.split("\n").map(JSON.parse));

    const results = commands.map((a) => compareTwoElements(a[0], a[1]));
    let total = 0;

    for (let i = 0; i < results.length; i++) {
        if (results[i]) {
            total += i + 1;
        }
    }
    console.log(total);
}

function partTwo() {
    let commands = readFileSync(`day13input.txt`, "utf-8")
        .split("\n")
        .filter((a) => a !== "")
        .map(JSON.parse);

    commands.push([[2]]);
    commands.push([[6]]);

    commands = commands.sort((a, b) => (compareTwoElements(a, b) ? -1 : 1));
    const index1 = commands.findIndex((a) => JSON.stringify(a) === "[[2]]");
    const index2 = commands.findIndex((a) => JSON.stringify(a) === "[[6]]");

    console.log((index1 + 1) * (index2 + 1));
}

partOne();
partTwo();
