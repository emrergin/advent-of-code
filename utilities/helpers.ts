export function catchCycle(array: string[]) {
  const len = array.length;
  outer: for (let k = 0; k < len / 3; k++) {
    if ((len - k) % 2 !== 0) {
      continue outer;
    }
    for (let i = k; i < (len + k) / 2; i++) {
      const j = (len - k) / 2 + i;
      if (array[i] !== array[j]) {
        continue outer;
      }
    }
    return { length: (len - k) / 2, start: k };
  }
  return { length: 0, start: null };
}

export function printMap(array: string[][]) {
  for (let i = 0; i < array.length; i++) {
    let currentLine = "";
    for (let j = 0; j < array[0].length; j++) {
      currentLine += array[i][j];
    }
    console.log(currentLine);
  }
}

export class UnionFind {
  size: number;
  parent: null | UnionFind;
  name: string;
  nodeMap: Map<string, UnionFind>;

  constructor(nodeMap: Map<string, UnionFind>, name: string) {
    this.size = 1;
    this.parent = null;
    this.name = name;
    this.nodeMap = nodeMap;
    this.nodeMap.set(name, this);
  }

  find() {
    let currentNode: UnionFind = this;
    while (currentNode.parent) {
      currentNode = currentNode.parent;
    }
    return currentNode.name;
  }

  static union(el1: UnionFind, el2: UnionFind) {
    let tag1 = el1.find();
    let tag2 = el2.find();
    let finalParent1 = el1.nodeMap.get(tag1);
    let finalParent2 = el2.nodeMap.get(tag2);
    if (tag1 === tag2) {
      return;
    } else if (finalParent1 && finalParent2) {
      if (finalParent1.size > finalParent2.size) {
        finalParent2.parent = finalParent1;
        finalParent1.size += finalParent2.size;
      } else {
        finalParent1.parent = finalParent2;
        finalParent2.size += finalParent1.size;
      }
    }
  }

  get grandParent() {
    return this.nodeMap.get(this.find());
  }
}
