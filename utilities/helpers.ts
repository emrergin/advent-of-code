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
