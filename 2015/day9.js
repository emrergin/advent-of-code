import { readFileSync } from "fs";

const pairMap = new Map();
// const lines = readFileSync(`day9test.txt`, "utf-8").split("\n")
const lines = readFileSync(`day9input.txt`, "utf-8")
    .split("\n")
    .map((line) => line.split(" "));

lines.forEach((a) => {
    pairMap.set(a[0] + "-" + a[2], +a[4]);
    pairMap.set(a[2] + "-" + a[0], +a[4]);
});

const allCities = [
    ...lines
        .map((line) => new Set([line[0], line[2]]))
        .reduce((acc, curr) => union(acc, curr), new Set([])),
];

const allPermutations = permutator(allCities);

let minDistance = Number.MAX_SAFE_INTEGER;
for (let permutation of allPermutations) {
    let currentDistance = 0;
    for (let i = 0; i < permutation.length - 1; i++) {
        currentDistance += pairMap.get(
            permutation[i] + "-" + permutation[i + 1]
        );
    }
    minDistance = Math.min(currentDistance, minDistance);
}

console.log(minDistance);

let maxDistance = Number.MIN_SAFE_INTEGER;
for (let permutation of allPermutations) {
    let currentDistance = 0;
    for (let i = 0; i < permutation.length - 1; i++) {
        currentDistance += pairMap.get(
            permutation[i] + "-" + permutation[i + 1]
        );
    }
    maxDistance = Math.max(currentDistance, maxDistance);
}

console.log(maxDistance);

function union(setA, setB) {
    const union = new Set(setA);

    for (const elem of setB) {
        union.add(elem);
    }

    return union;
}

function permutator(inputArr) {
    let result = [];

    const permute = (arr, m = []) => {
        if (arr.length === 0) {
            result.push(m);
        } else {
            for (let i = 0; i < arr.length; i++) {
                let curr = arr.slice();
                let next = curr.splice(i, 1);
                permute(curr.slice(), m.concat(next));
            }
        }
    };

    permute(inputArr);

    return result;
}
