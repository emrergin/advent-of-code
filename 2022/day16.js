import { time } from "console";
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
            // incomingPerson: false,
        };
    }
    let zeroVertices = vertices.filter((a) => a.rate === 0).map((a) => a.self);
    let nonZeroVertices = vertices.filter((a) => a.rate > 0).map((a) => a.self);

    function getAllSubsets(array) {
        const activeVertices = [new Set(zeroVertices)];

        for (const el of array) {
            const last = activeVertices.length - 1;
            for (let i = 0; i <= last; i++) {
                const copySet = structuredClone(activeVertices[i]).add(el);
                activeVertices.push(copySet);
            }
        }

        return activeVertices;
    }

    return [vertices, getAllSubsets(nonZeroVertices), allPairShortestPaths];
}

// const [vertices, allSubsets, allPairShortestPaths] = prepareData(`day16input.txt`);
const [vertices, allSubsets, allPairShortestPaths] = prepareData(`day16test.txt`);

function partOne() {
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
    console.log(calculateValueForState(30, allSubsets[0], "AA"));
}

// partOne();

function calculateTotalValueTillEnd(subset, remainingMinutes) {
    // console.log(subset)
    return (
        vertices
            .filter((a) => subset.has(a.self))
            .reduce((acc, curr) => acc + curr.rate, 0) * remainingMinutes
    );
}

function calculateTotalValueTillEndWithTwo(subset, rem1, rem2,loc1,loc2) {
    // console.log(subset)
    let tempSubset=structuredClone(subset);

    if(rem1>rem2){
        tempSubset.delete(loc2);
    }
    else{
        tempSubset.delete(loc1);
    }
    return (
        vertices
            .filter((a) => subset.has(a.self))
            .reduce((acc, curr) => acc + curr.rate, 0) * Math.min(rem1,rem2)
        +
        vertices
            .filter((a) => tempSubset.has(a.self))
            .reduce((acc, curr) => acc + curr.rate, 0) * Math.abs(rem2-rem1)
    );
}

function partTwo() {
    function calculateValueForState(
        time1,
        time2,
        subset,
        location1,
        location2
    ) {
        if (time1 <= 0 && time2 <= 0) {
            return 0;
        }

        const valvesToBeActivated = vertices.filter((a) => !subset.has(a.self));
        const valvesThatCouldBeReachedByOne = valvesToBeActivated.filter(
            (a) => allPairShortestPaths.get(`${location1}-${a.self}`) < time1 - 1 
        );
        const valvesThatCouldBeReachedByTwo = valvesToBeActivated.filter(
            (a) => allPairShortestPaths.get(`${location2}-${a.self}`) < time2 - 1
            )
        let maxValue = calculateTotalValueTillEndWithTwo(
            subset,
            time1,
        time2,
        location1,
        location2
        );
        if(valvesThatCouldBeReachedByTwo.length===0&&valvesThatCouldBeReachedByOne.length===0){
            return maxValue;
        }
        // else if(valvesThatCouldBeReachedByTwo.length===0){
            // console.log(valvesThatCouldBeReachedByOne,valvesThatCouldBeReachedByTwo);
            for (let valve1 of valvesThatCouldBeReachedByOne) {
                const timeToOpen1 =
                    allPairShortestPaths.get(`${location1}-${valve1.self}`) + 1;
                let tempValue = 
                calculateValueForState(
                    time1 - timeToOpen1,
                    time2,
                    structuredClone(subset).add(valve1.self),
                    valve1.self,
                    location2
                )
                // tempValue+=calculateTotalValueTillEnd(subset,time1-timeToOpen1);
                // tempValue+=calculateTotalValueTillEndWithTwo(subset,Math.min(time1-time2,timeToOpen1),0,valve1.self,location2)
                if (tempValue > maxValue) {
                    maxValue = tempValue;
                }
            }
        // }else if(valvesThatCouldBeReachedByOne.length===0){
            for (let valve2 of valvesThatCouldBeReachedByTwo) {
                // console.log(valvesThatCouldBeReachedByOne,valvesThatCouldBeReachedByTwo);
                const timeToOpen2 =
                    allPairShortestPaths.get(`${location2}-${valve2.self}`) + 1;
                // if(time1-timeToOpen1<=0 || time2-timeToOpen2<=0){continue;}
                let tempValue = 
                calculateValueForState(
                    time1 ,
                    time2 - timeToOpen2,
                    structuredClone(subset).add(valve2.self),
                    location1,
                    valve2.self
                )
                // tempValue+= calculateTotalValueTillEnd(subset,Math.min(timeToOpen2,Math.max(time2-time1,0)));
                // tempValue+=calculateTotalValueTillEndWithTwo(subset,0,Math.min(time2-time1,timeToOpen2),location1,valve2.self)
                if (tempValue > maxValue) {
                    maxValue = tempValue;
                }
            }
        // }else{
            // console.log(valvesThatCouldBeReachedByOne,valvesThatCouldBeReachedByTwo);
            for (let valve1 of valvesThatCouldBeReachedByOne) {
                for (let valve2 of valvesThatCouldBeReachedByTwo) {
                    if(valve1.self===valve2.self){continue;}
                    const timeToOpen1 =
                        allPairShortestPaths.get(`${location1}-${valve1.self}`) + 1;
                    const timeToOpen2 =
                        allPairShortestPaths.get(`${location2}-${valve2.self}`) + 1;
                    // if(time1-timeToOpen1<=0 || time2-timeToOpen2<=0){continue;}
                    let tempValue = 
                    calculateValueForState(
                        time1 - timeToOpen1,
                        time2 - timeToOpen2,
                        structuredClone(subset).add(valve1.self).add(valve2.self),
                        valve1.self,
                        valve2.self
                    )
                    // if(Math.min(time1-timeToOpen1,time2-timeToOpen2)>0){
                    //     tempValue+=calculateTotalValueTillEnd(subset,Math.min(time1,time2)-Math.max(time1-timeToOpen1,time2-timeToOpen2));
                    // }
                    // if(time1-timeToOpen1>time2-timeToOpen2 && time1-timeToOpen1>0){
                    //     tempValue+=calculateTotalValueTillEnd(structuredClone(subset).add(valve1.self),timeToOpen2)
                    // }else if(time1-timeToOpen1<time2-timeToOpen2 && time2-timeToOpen2>0){
                    //     tempValue+=calculateTotalValueTillEnd(structuredClone(subset).add(valve2.self),timeToOpen1)
                    // }
                    if (tempValue > maxValue) {
                        maxValue = tempValue;
                    }
                }
            }
        // }
        // console.log(time1, time2, subset, location1, location2, maxValue);
        return maxValue;
    }

    function calculateValueForState2(
        time1,
        time2,
        subset,
        location1,
        location2
    ) {
        return calculateValueForState(
            time1,
            time2,
            subset,
            location1,
            location2
        );
    }
    // console.log(calculateValueForState2(6,6, allSubsets[0], "AA", "AA"));
    // console.log(calculateValueForState2(2,3, structuredClone(allSubsets[0]).add("JJ").add("DD"), "JJ", "DD"));
    console.log(calculateValueForState2(26,26, allSubsets[0], "AA", "AA"));

}

partTwo();
