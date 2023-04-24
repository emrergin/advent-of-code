import { readFileSync } from "fs";
// const commands = readFileSync(`day19test.txt`, "utf-8")
const commands = readFileSync(`day19input.txt`, "utf-8")
    .split("\n")
    .map((a) => a.match(/[0-9]{1,2}/g).map(Number))
    .map((a) => a.slice(1));

// console.log(commands[0])
function checkOre(state, com) {
    if (com[0] <= state[0]) {
        return true;
    }
    return false;
}

function checkClay(state, com) {
    if (com[1] <= state[0]) {
        return true;
    }
    return false;
}

function checkObsidian(state, com) {
    if (com[2] <= state[0] && com[3] <= state[1]) {
        return true;
    }
    return false;
}

function checkGeode(state, com) {
    if (com[4] <= state[0] && com[5] <= state[2]) {
        return true;
    }
    return false;
}

function passTime(state) {
    let newState = [...state];
    newState[0] = newState[0] + newState[4];
    newState[1] = newState[1] + newState[5];
    newState[2] = newState[2] + newState[6];
    newState[3] = newState[3] + newState[7];
    newState[8] = newState[8] - 1;

    return newState;
}

function makeOreMachine(state, com) {
    let newState = passTime(state);
    newState[4] = newState[4] + 1;
    newState[0] = newState[0] - com[0];

    return newState;
}

function makeClayMachine(state, com) {
    let newState = passTime(state);
    newState[5] = newState[5] + 1;
    newState[0] = newState[0] - com[1];

    return newState;
}

function makeObsidianMachine(state, com) {
    let newState = passTime(state);
    newState[6] = newState[6] + 1;
    newState[0] = newState[0] - com[2];
    newState[1] = newState[1] - com[3];

    return newState;
}

function makeGeodeMachine(state, com) {
    let newState = passTime(state);
    newState[7] = newState[7] + 1;
    newState[0] = newState[0] - com[4];
    newState[2] = newState[2] - com[5];

    return newState;
}

function findMax(command, remainingTime) {
    const startingState = [0, 0, 0, 0, 1, 0, 0, 0, remainingTime];
    let maxGeodes = new Array(remainingTime).fill(-Infinity);

    let solutionStack = [];
    solutionStack.push(startingState);

    while (solutionStack.length > 0) {
        const currentState = solutionStack.pop();
        maxGeodes[remainingTime - currentState[8]] = Math.max(
            currentState[3],
            maxGeodes[remainingTime - currentState[8]]
        );
        if (currentState[8] === 0) {
            continue;
        }
        // if(maxGeodes[remainingTime-currentState[8]]===-Infinity && currentState[8]<remainingTime){
        //     maxGeodes[remainingTime-currentState[8]]=maxGeodes[remainingTime-currentState[8]-1];
        // }
        // if(Math.floor(maxGeodes[remainingTime-currentState[8]]/2) > currentState[3]){
        //     continue;
        // }
        if (checkGeode(currentState, command)) {
            solutionStack.push(makeGeodeMachine(currentState, command));
            continue;
        }
        if (checkObsidian(currentState, command)) {
            solutionStack.push(makeObsidianMachine(currentState, command));
            if (currentState[2] < currentState[0]) {
                continue;
            }
        }
        if (checkClay(currentState, command)) {
            solutionStack.push(makeClayMachine(currentState, command));
            const necessaryOre =
                command[4] +
                command[5] * command[2] +
                command[5] * command[3] * command[1];
            const necessaryClay = command[5] * command[3];

            if (
                necessaryOre - currentState[0] <
                necessaryClay - currentState[1]
            ) {
                continue;
            }
        }
        if (checkOre(currentState, command)) {
            solutionStack.push(makeOreMachine(currentState, command));
        }
        solutionStack.push(passTime(currentState, command));
    }

    // console.log(maxGeodes);
    return maxGeodes[remainingTime - 1];
}

function partOne() {
    let index = 1;
    let total = 0;
    for (let command of commands) {
        console.log(index);
        total += findMax(command, 24) * index;
        index++;
    }

    console.log(total);
}

function partTwo() {
    let multiplied = 1;
    const firstThreeCommands = commands.slice(0, 3);
    for (let command of firstThreeCommands) {
        console.log(command);
        multiplied *= findMax(command, 32);
    }
    console.log(multiplied);
}

// partOne();
partTwo();
