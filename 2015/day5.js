import { readFileSync } from "fs";

const inputs = readFileSync(`day5input.txt`, "utf-8").split("\n");

function checkVowels(string) {
    return [...string].filter((letter) => "aeiou".includes(letter)).length > 2;
}

function checkDoubles(string) {
    for (let i = 0; i < string.length - 1; i++) {
        if (string[i] === string[i + 1]) {
            return true;
        }
    }
    return false;
}

function checkBanned(string) {
    const bannedList = ["ab", "cd", "pq", "xy"];
    for (let i = 0; i < bannedList.length; i++) {
        if (string.includes(bannedList[i])) {
            return false;
        }
    }
    return true;
}

function checkAllThree(string) {
    return checkBanned(string) && checkDoubles(string) && checkVowels(string);
}

function countNice1() {
    let counter = 0;
    for (let i = 0; i < inputs.length; i++) {
        if (checkAllThree(inputs[i])) {
            counter++;
        }
    }
    console.log(counter);
}

function doublePair(string) {
    for (let i = 0; i < string.length - 1; i++) {
        for (let j = 0; j < string.length - 1; j++) {
            if (
                string[i] === string[j] &&
                string[i + 1] === string[j + 1] &&
                (i - 1 > j || j - 1 > i)
            ) {
                return true;
            }
        }
    }
    return false;
}

function skippingPair(string) {
    for (let i = 0; i < string.length - 2; i++) {
        if (string[i] === string[i + 2]) {
            return true;
        }
    }
    return false;
}

function checkPart2(string) {
    return skippingPair(string) && doublePair(string);
}

function countNice2() {
    let counter = 0;
    for (let i = 0; i < inputs.length; i++) {
        if (checkPart2(inputs[i])) {
            counter++;
        }
    }
    console.log(counter);
}

countNice2();
