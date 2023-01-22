const io = { x: 6, y: 10, z: 10, vel: { x: 0, y: 0, z: 0 } };
const europa = { x: -9, y: 3, z: 17, vel: { x: 0, y: 0, z: 0 } };
const ganymede = { x: 9, y: -4, z: 14, vel: { x: 0, y: 0, z: 0 } };
const callisto = { x: 4, y: 14, z: 4, vel: { x: 0, y: 0, z: 0 } };

const jupitersMoons = [
    { ...io, initial: io },
    { ...europa, initial: europa },
    { ...ganymede, initial: ganymede },
    { ...callisto, initial: callisto },
];

const io2 = { x: -8, y: -10, z: 0, vel: { x: 0, y: 0, z: 0 } };
const europa2 = { x: 5, y: 5, z: 10, vel: { x: 0, y: 0, z: 0 } };
const ganymede2 = { x: 2, y: -7, z: 3, vel: { x: 0, y: 0, z: 0 } };
const callisto2 = { x: 9, y: -8, z: -3, vel: { x: 0, y: 0, z: 0 } };

const jupitersMoons2 = [io2, europa2, ganymede2, callisto2];

const io3 = { x: -1, y: 0, z: 2, vel: { x: 0, y: 0, z: 0 }, name: "io" };
const europa3 = {
    x: 2,
    y: -10,
    z: -7,
    vel: { x: 0, y: 0, z: 0 },
    name: "europa",
};
const ganymede3 = {
    x: 4,
    y: -8,
    z: 8,
    vel: { x: 0, y: 0, z: 0 },
    name: "ganymede",
};
const callisto3 = {
    x: 3,
    y: 5,
    z: -1,
    vel: { x: 0, y: 0, z: 0 },
    name: "callisto",
};

const jupitersMoons3 = [
    { ...io3, initial: io3 },
    { ...europa3, initial: europa3 },
    { ...ganymede3, initial: ganymede3 },
    { ...callisto3, initial: callisto3 },
];

function findGravities(moons) {
    for (let i = 0; i < moons.length; i++) {
        for (let j = i + 1; j < moons.length; j++) {
            moons[i].vel.x -= Math.sign(moons[i].x - moons[j].x);
            moons[j].vel.x += Math.sign(moons[i].x - moons[j].x);
            moons[i].vel.y -= Math.sign(moons[i].y - moons[j].y);
            moons[j].vel.y += Math.sign(moons[i].y - moons[j].y);
            moons[i].vel.z -= Math.sign(moons[i].z - moons[j].z);
            moons[j].vel.z += Math.sign(moons[i].z - moons[j].z);
        }
    }
}

function resolveMovement(moons) {
    for (let i = 0; i < moons.length; i++) {
        moons[i].x += moons[i].vel.x;
        moons[i].y += moons[i].vel.y;
        moons[i].z += moons[i].vel.z;
    }
}

function findEnergies(moons) {
    for (let i = 0; i < moons.length; i++) {
        moons[i].pot =
            Math.abs(moons[i].x) + Math.abs(moons[i].y) + Math.abs(moons[i].z);
        moons[i].kin =
            Math.abs(moons[i].vel.x) +
            Math.abs(moons[i].vel.y) +
            Math.abs(moons[i].vel.z);
        moons[i].total = moons[i].pot * moons[i].kin;
    }
}
function resolveCycles(k, moons) {
    let cycles = [null, null, null];
    for (let steps = 0; steps < k; steps++) {
        findGravities(moons);
        resolveMovement(moons);
        if (
            moons[0].x === moons[0].initial.x &&
            moons[1].x === moons[1].initial.x &&
            moons[2].x === moons[2].initial.x &&
            moons[3].x === moons[3].initial.x &&
            cycles[0] === null
        ) {
            cycles[0] = steps + 1;
            console.log(cycles);
        }
        if (
            moons[0].y === moons[0].initial.y &&
            moons[1].y === moons[1].initial.y &&
            moons[2].y === moons[2].initial.y &&
            moons[3].y === moons[3].initial.y &&
            cycles[1] === null
        ) {
            cycles[1] = steps + 1;
            console.log(cycles);
        }
        if (
            moons[0].z === moons[0].initial.z &&
            moons[1].z === moons[1].initial.z &&
            moons[2].z === moons[2].initial.z &&
            moons[3].z === moons[3].initial.z &&
            cycles[2] === null
        ) {
            cycles[2] = steps + 1;
            console.log(cycles);
        }

        if (cycles.filter((a) => a === null).length === 0) {
            break;
        }
    }
    console.log(moons);
}

resolveCycles(Infinity, jupitersMoons3);

// https://www.w3resource.com/javascript-exercises/javascript-math-exercise-10.php
function lcm_two_numbers(x, y) {
    if (typeof x !== "number" || typeof y !== "number") return false;
    return !x || !y ? 0 : Math.abs((x * y) / gcd_two_numbers(x, y));
}

function gcd_two_numbers(x, y) {
    x = Math.abs(x);
    y = Math.abs(y);
    while (y) {
        var t = y;
        y = x % y;
        x = t;
    }
    return x;
}
