import { permutator } from "../utilities/functions.mjs";
import operator from "./utilities/intcodeMachinev2.mjs";

const IntCode = [
    3, 8, 1001, 8, 10, 8, 105, 1, 0, 0, 21, 38, 47, 72, 97, 122, 203, 284, 365,
    446, 99999, 3, 9, 1001, 9, 3, 9, 1002, 9, 5, 9, 1001, 9, 4, 9, 4, 9, 99, 3,
    9, 102, 3, 9, 9, 4, 9, 99, 3, 9, 1001, 9, 2, 9, 102, 5, 9, 9, 101, 3, 9, 9,
    1002, 9, 5, 9, 101, 4, 9, 9, 4, 9, 99, 3, 9, 101, 5, 9, 9, 1002, 9, 3, 9,
    101, 2, 9, 9, 102, 3, 9, 9, 1001, 9, 2, 9, 4, 9, 99, 3, 9, 101, 3, 9, 9,
    102, 2, 9, 9, 1001, 9, 4, 9, 1002, 9, 2, 9, 101, 2, 9, 9, 4, 9, 99, 3, 9,
    1001, 9, 2, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3,
    9, 1001, 9, 1, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9,
    3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4,
    9, 3, 9, 1001, 9, 2, 9, 4, 9, 99, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 101, 1,
    9, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 101,
    2, 9, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9,
    101, 1, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 99,
    3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 1001, 9, 2, 9,
    4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 101, 2, 9,
    9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 1002, 9,
    2, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 99, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9,
    101, 1, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3,
    9, 101, 2, 9, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9,
    3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4,
    9, 99, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 2,
    9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 101, 1,
    9, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 101,
    2, 9, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 99,
];

const IntCode2 = [
    3, 15, 3, 16, 1002, 16, 10, 16, 1, 16, 15, 15, 4, 15, 99, 0, 0,
];

const IntCode3 = [
    3, 23, 3, 24, 1002, 24, 10, 24, 1002, 23, -1, 23, 101, 5, 23, 23, 1, 24, 23,
    23, 4, 23, 99, 0, 0,
];

const IntCode4 = [
    3, 31, 3, 32, 1002, 32, 10, 32, 1001, 31, -2, 31, 1007, 31, 0, 33, 1002, 33,
    7, 33, 1, 33, 31, 31, 1, 32, 31, 31, 4, 31, 99, 0, 0, 0,
];

const IntCode5 = [
    3, 26, 1001, 26, -4, 26, 3, 27, 1002, 27, 2, 27, 1, 27, 26, 27, 4, 27, 1001,
    28, -1, 28, 1005, 28, 6, 99, 0, 0, 5,
];

const IntCode6 = [
    3, 52, 1001, 52, -5, 52, 3, 53, 1, 52, 56, 54, 1007, 54, 5, 55, 1005, 55,
    26, 1001, 54, -5, 54, 1105, 1, 12, 1, 53, 54, 53, 1008, 54, 0, 55, 1001, 55,
    1, 55, 2, 53, 55, 53, 4, 53, 1001, 56, -1, 56, 1005, 56, 6, 99, 0, 0, 0, 0,
    10,
];

let maxAmp = Number.MIN_SAFE_INTEGER;
let win;
let currentIntCode = IntCode5;

function solvePart1() {
    const allPermutations = permutator([0, 1, 2, 3, 4]);
    let memory;
    for (let permutation of allPermutations) {
        memory = [...permutation];
        memory.splice(1, 0, 0);

        operatorCallerv2([...currentIntCode], memory, memory);
        operatorCallerv2([...currentIntCode], memory, memory);
        operatorCallerv2([...currentIntCode], memory, memory);
        operatorCallerv2([...currentIntCode], memory, memory);
        operatorCallerv2([...currentIntCode], memory, memory);

        console.log(permutation, memory[0]);
        if (memory[0] > maxAmp) {
            maxAmp = memory.shift();
            win = permutation;
        }
    }

    console.log(maxAmp, win);

    function operatorCallerv2(arrayToUse, inputMemory, outputMemory) {
        let currentIndex = 0;
        while (
            currentIndex !== null &&
            currentIndex < arrayToUse.length &&
            currentIndex !== `HALT`
        ) {
            currentIndex = operator(
                arrayToUse,
                currentIndex,
                inputMemory,
                outputMemory
            );
        }
    }
}

function solvePart2() {
    const allPermutations = permutator([5, 6, 7, 8, 9]);

    for (let permutation of allPermutations) {
        let computers = [
            new Computer(currentIntCode, permutation[0]),
            new Computer(currentIntCode, permutation[1]),
            new Computer(currentIntCode, permutation[2]),
            new Computer(currentIntCode, permutation[3]),
            new Computer(currentIntCode, permutation[4]),
        ];
        let activeOperator = 0;

        computers[0].memory.push(0);

        while (true) {
            computers[activeOperator].run();
            if (computers[activeOperator].currentIndex === "HALT") {
                break;
            }
            if (computers[activeOperator].output.length === 1) {
                computers[(activeOperator + 1) % 5].memory.push(
                    computers[activeOperator].output.pop()
                );
                activeOperator = (activeOperator + 1) % 5;
            }
            if (computers[activeOperator].memory[0] > maxAmp) {
                maxAmp = computers[activeOperator].memory[0];
                win = permutation;
            }
        }
    }
    console.log(maxAmp, win);

    function Computer(intcode, directive) {
        if (!(this instanceof Computer)) {
            return new Computer();
        }
        this.intcode = [...intcode];
        // this.defaultIntcode = [...intcode];
        this.memory = [directive];
        this.output = [];
        this.currentIndex = 0;

        this.run = () => {
            this.currentIndex = operator(
                this.intcode,
                this.currentIndex,
                this.memory,
                this.output
            );
        };
    }
}

solvePart2();
