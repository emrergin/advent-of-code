import { readFileSync } from "fs";

// const commands = readFileSync(`day8test.txt`, "utf-8").split("\n");
const commands = readFileSync(`day8input.txt`, "utf-8").split("\n");

let specialCount = 0;
for (let i = 0; i < commands.length; i++) {
    specialCount += getSpecialCount(commands[i]);
}

let specialCount2 = 0;
for (let i = 0; i < commands.length; i++) {
    specialCount2 += getSpecialCount2(commands[i]) + 2;
}

console.log(specialCount2);

function getSpecialCount(text) {
    const quoteCount1 = (text.match(/^\"/g) || []).length;
    const text2 = text.replaceAll(/^\"/g, "");
    const quoteCount2 = (text2.match(/\"$/g) || []).length;
    const text3 = text2.replaceAll(/\"$/g, "");
    const quoteCount3 = (text3.match(/\\"/g) || []).length;
    const text4 = text3.replaceAll(/\\"/g, "");
    const slashCount = (text4.match(/\\\\/g) || []).length;
    const text5 = text4.replaceAll(/\\\\/g, "");
    const hexaCount = (text5.match(/\\x/g) || []).length;

    return quoteCount1 + quoteCount2 + quoteCount3 + slashCount + 3 * hexaCount;
}

function getSpecialCount2(text) {
    const textLength = text.length;
    const text4 = text.replaceAll(/\"/g, "aa");
    const text5 = text4.replaceAll(/\\/g, "aa");

    return text5.length - textLength;
}
