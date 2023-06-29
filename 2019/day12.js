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

function checkIfADimensionHasReset(moons, dimension) {
  return moons.every(
    (planet) =>
      planet[dimension] === planet.initial[dimension] &&
      planet.vel[dimension] === 0
  );
}

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
  console.log(moons.reduce((acc, curr) => acc + curr.total, 0));
}

function resolveCycles(k, moons) {
  let cycles = [null, null, null];
  for (let steps = 0; steps < k; steps++) {
    findGravities(moons);
    resolveMovement(moons);
    if (checkIfADimensionHasReset(moons, "x") && cycles[0] === null) {
      cycles[0] = steps + 1;
    }
    if (checkIfADimensionHasReset(moons, "y") && cycles[1] === null) {
      cycles[1] = steps + 1;
    }
    if (checkIfADimensionHasReset(moons, "z") && cycles[2] === null) {
      cycles[2] = steps + 1;
    }

    if (cycles.filter((a) => a === null).length === 0) {
      return cycles;
    }
  }
}

function partOne() {
  const moons = structuredClone(jupitersMoons);
  resolveCycles(1000, moons);
  findEnergies(moons);
}

function partTwo() {
  const moons = structuredClone(jupitersMoons);
  const cycles = resolveCycles(Infinity, moons);
  const steps = cycles.reduce((acc, curr) => lcm_two_numbers(acc, curr), 1);
  console.log(steps);
}

partOne();
partTwo();

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
