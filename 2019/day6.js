import orbitRecords from "./day6input.js";

const parentOfChild = new Map();
function Orbit(record) {
  if (!(this instanceof Orbit)) {
    return new Orbit();
  }

  const [parent, child] = record.split(")");
  this.parent = parent;
  this.child = child;
  parentOfChild.set(child, parent);
}

const orbits = orbitRecords.map((a) => new Orbit(a));

function findNumberOfOrbits() {
  return orbits.reduce((prev, curr) => {
    counter = 0;
    let currentParent = curr.parent;
    while (currentParent) {
      counter++;
      currentParent = parentOfChild.get(currentParent);
    }
    return counter + prev;
  }, 0);
}

function findAllParentsAndDistancesToThem(child) {
  let parents = [];
  let counter = 0;
  let currentParent = parentOfChild.get(child);
  while (currentParent) {
    counter++;
    parents.push({ parent: currentParent, distance: counter });
    currentParent = parentOfChild.get(currentParent);
  }
  return parents;
}

let parentsOfMe = findAllParentsAndDistancesToThem("YOU");
let parentsOfSanta = findAllParentsAndDistancesToThem("SAN");

let commonParent = parentsOfMe.find((a) =>
  parentsOfSanta.find((b) => b.parent === a.parent)
);

console.log(
  commonParent.distance +
    parentsOfSanta.find((b) => b.parent === commonParent.parent).distance -
    2
);

// console.log(findNumberOfOrbits());
// const parents = Map([]);
