import { readFileSync } from "fs";

// const commands = readFileSync(`day7test.txt`, "utf-8").split("\n");
const commands = readFileSync(`day7input.txt`, "utf-8").split("\n");
const result = {};

function parseCommand(command) {
    const commandArray = command.split("->").map((a) => a.trim());
    const inputArray = commandArray[0].split(" ");
    let resultOfInput = parseInput(inputArray);
    if (resultOfInput < 0) {
        resultOfInput += 65536;
    }
    if (resultOfInput > 65535) {
        resultOfInput -= 65536;
    }
    if (resultOfInput === undefined) {
        return false;
    }
    result[commandArray[commandArray.length - 1]] = resultOfInput;
    return true;
}

function parseInput(input) {
    for (let i = 0; i < input.length; i++) {
        if (
            isNaN(input[i]) &&
            input[i] !== "NOT" &&
            input[i] !== "OR" &&
            input[i] !== "AND" &&
            input[i] !== "LSHIFT" &&
            input[i] !== "RSHIFT" &&
            result[input[i]] === undefined
        ) {
            return undefined;
        }
    }
    if (input.length === 1) {
        if (isNaN(input[0])) {
            return result[input[0]];
        }
        return Number(input[0]);
    } else if (input[0] === "NOT") {
        return ~result[input[1]];
    } else if (input[1] === "LSHIFT") {
        return result[input[0]] << input[2];
    } else if (input[1] === "RSHIFT") {
        return result[input[0]] >> input[2];
    } else if (input[1] === "AND") {
        let input1 = isNaN(input[0]) ? result[input[0]] : input[0];
        let input2 = isNaN(input[2]) ? result[input[2]] : input[2];
        return input1 & input2;
    } else if (input[1] === "OR") {
        let input1 = isNaN(input[0]) ? result[input[0]] : input[0];
        let input2 = isNaN(input[2]) ? result[input[2]] : input[2];
        return input1 | input2;
    }
}

while (true) {
    for (let i = 0; i < commands.length; i++) {
        let result = parseCommand(commands[i]);
        if (result) {
            const temp = commands[commands.length - 1];
            commands[commands.length - 1] = commands[i];
            commands[i] = temp;
            commands.pop();
        }
    }
    if (commands.length === 0) {
        break;
    }
}

console.log(result.a);
