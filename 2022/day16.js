import { readFileSync } from "fs";

function prepareData(filename) {
    const allEdges = new Set();
    const commands = readFileSync(filename, "utf-8")
        .split("\n")
        .map((a) => [a.match(/[A-Z]{2}/g), a.match(/[0-9]{1,2}/g)]);

    let vertices = commands.map((a) => [a[0][0], +a[1]]);

    const n = vertices.length;
    commands
        .map((a) => a[0])
        .flatMap((b) =>
            b.reduce((acc, curr, index, array) => {
                if (index > 0) {
                    acc.push([array[0], curr]);
                }
                return acc;
            }, [])
        )
        .forEach((a) => allEdges.add(`${a[0]}-${a[1]}`));

    function floydWarshall() {
        let A_k_1 = Array(n)
            .fill()
            .map(() => Array(n));
        let A_k = Array(n)
            .fill()
            .map(() => Array(n));

        for (let v = 0; v < n; v++) {
            for (let w = 0; w < n; w++) {
                if (v === w) {
                    A_k_1[v][w] = 0;
                } else {
                    if (allEdges.has(`${vertices[v][0]}-${vertices[w][0]}`)) {
                        A_k_1[v][w] = 1;
                    } else {
                        A_k_1[v][w] = Infinity;
                    }
                }
            }
        }

        for (let k = 1; k <= n; k++) {
            for (let v = 0; v < n; v++) {
                for (let w = 0; w < n; w++) {
                    A_k[v][w] = Math.min(
                        A_k_1[v][w],
                        A_k_1[v][k - 1] + A_k_1[k - 1][w]
                    );
                }
            }
            A_k_1 = A_k;
        }

        const allPairShortestPaths = new Map();

        for (let i = 0; i < A_k.length; i++) {
            for (let j = 0; j < A_k.length; j++) {
                allPairShortestPaths.set(
                    `${vertices[i][0]}-${vertices[j][0]}`,
                    A_k[i][j]
                );
            }
        }

        return allPairShortestPaths;
    }
    const allPairShortestPaths = floydWarshall();

    for (let i = 0; i < vertices.length; i++) {
        vertices[i] = {
            self: vertices[i][0],
            rate: vertices[i][1],
        };
    }
    let zeroVertices = vertices.filter((a) => a.rate === 0).map((a) => a.self);

    return [vertices, new Set(zeroVertices), allPairShortestPaths];
}

const [allVertices, baseSubset, allPairShortestPaths] =
    prepareData(`day16input.txt`);
// const [allVertices, baseSubset, allPairShortestPaths] = prepareData(`day16test.txt`);

function partOne() {
    let vertices = allVertices.filter((a) => !baseSubset.has(a.self));
    function calculateValueForState(time, subset, location) {
        if (time === 0) {
            return 0;
        }
        const valvesToBeActivated = vertices.filter((a) => !subset.has(a.self));
        const valvesThatCouldBeReached = valvesToBeActivated.filter(
            (a) => allPairShortestPaths.get(`${location}-${a.self}`) < time - 1
        );
        let maxValue = calculateTotalValueTillEnd(subset, time);
        for (let valve of valvesThatCouldBeReached) {
            const timeToOpen =
                allPairShortestPaths.get(`${location}-${valve.self}`) + 1;
            maxValue = Math.max(
                maxValue,
                calculateValueForState(
                    time - timeToOpen,
                    structuredClone(subset).add(valve.self),
                    valve.self
                ) + calculateTotalValueTillEnd(subset, timeToOpen)
            );
        }
        return maxValue;
    }
    console.log(calculateValueForState(30, new Set([]), "AA"));

    function calculateTotalValueTillEnd(subset, remainingMinutes) {
        return (
            vertices
                .filter((a) => subset.has(a.self))
                .reduce((acc, curr) => acc + curr.rate, 0) * remainingMinutes
        );
    }
}

partOne();

function convertSetToString(set) {
    return JSON.stringify(Array.from(set).sort());
}

function partTwo() {
    const resultMap = new Map();
    let vertices = allVertices.filter((a) => !baseSubset.has(a.self));
    function calculateValueForState(
        time1,
        time2,
        subset1,
        subset2,
        location1,
        location2
    ) {
        if (time1 <= 0 && time2 <= 0) {
            return 0;
        }
        const searchQuery1 = `${time1};${time2};${convertSetToString(
            subset1
        )};${convertSetToString(subset2)};${location1};${location2}}`;
        const searchQuery2 = `${time2};${time1};${convertSetToString(
            subset2
        )};${convertSetToString(subset1)};${location2};${location1}}`;

        if (resultMap.get(searchQuery1)) {
            return resultMap.get(searchQuery1);
        }
        if (resultMap.get(searchQuery2)) {
            return resultMap.get(searchQuery2);
        }

        const valvesToBeActivated = vertices.filter(
            (a) => !subset1.has(a.self) && !subset2.has(a.self)
        );
        const valvesThatCouldBeReachedByOne = valvesToBeActivated.filter(
            (a) =>
                allPairShortestPaths.get(`${location1}-${a.self}`) < time1 - 1
        );
        const valvesThatCouldBeReachedByTwo = valvesToBeActivated.filter(
            (a) =>
                allPairShortestPaths.get(`${location2}-${a.self}`) < time2 - 1
        );
        let maxValue = calculateTotalValueTillEndWithTwo(
            subset1,
            subset2,
            time1,
            time2
        );
        for (let valve1 of valvesThatCouldBeReachedByOne) {
            const timeToOpen1 =
                allPairShortestPaths.get(`${location1}-${valve1.self}`) + 1;
            let tempValue = calculateValueForState(
                time1 - timeToOpen1,
                time2,
                structuredClone(subset1).add(valve1.self),
                subset2,
                valve1.self,
                location2
            );
            tempValue += calculateTotalValueTillEndWithTwo(
                subset1,
                subset2,
                timeToOpen1,
                0
            );
            if (tempValue > maxValue) {
                maxValue = tempValue;
            }
        }
        for (let valve2 of valvesThatCouldBeReachedByTwo) {
            const timeToOpen2 =
                allPairShortestPaths.get(`${location2}-${valve2.self}`) + 1;
            let tempValue = calculateValueForState(
                time1,
                time2 - timeToOpen2,
                subset1,
                structuredClone(subset2).add(valve2.self),
                location1,
                valve2.self
            );
            tempValue += calculateTotalValueTillEndWithTwo(
                subset1,
                subset2,
                0,
                timeToOpen2
            );
            if (tempValue > maxValue) {
                maxValue = tempValue;
            }
        }
        for (let valve1 of valvesThatCouldBeReachedByOne) {
            for (let valve2 of valvesThatCouldBeReachedByTwo) {
                if (valve1.self === valve2.self) {
                    continue;
                }
                const timeToOpen1 =
                    allPairShortestPaths.get(`${location1}-${valve1.self}`) + 1;
                const timeToOpen2 =
                    allPairShortestPaths.get(`${location2}-${valve2.self}`) + 1;
                let tempValue =
                    calculateValueForState(
                        time1 - timeToOpen1,
                        time2 - timeToOpen2,
                        structuredClone(subset1).add(valve1.self),
                        structuredClone(subset2).add(valve2.self),
                        valve1.self,
                        valve2.self
                    ) +
                    calculateTotalValueTillEndWithTwo(
                        subset1,
                        subset2,
                        timeToOpen1,
                        timeToOpen2
                    );
                if (tempValue > maxValue) {
                    maxValue = tempValue;
                }
            }
        }
        resultMap.set(searchQuery1, maxValue);
        return maxValue;
    }

    console.log(
        calculateValueForState(26, 26, new Set([]), new Set([]), "AA", "AA")
    );

    function calculateTotalValueTillEndWithTwo(subset1, subset2, rem1, rem2) {
        return (
            vertices
                .filter((a) => subset1.has(a.self))
                .reduce((acc, curr) => acc + curr.rate, 0) *
                rem1 +
            vertices
                .filter((a) => subset2.has(a.self))
                .reduce((acc, curr) => acc + curr.rate, 0) *
                rem2
        );
    }
}

partTwo();
