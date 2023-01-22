const IntCode = [
  1, 1, 2, 3, 1, 1, 2, 3, 1, 3, 4, 3, 1, 5, 0, 3, 2, 13, 1, 19, 1, 19, 10, 23,
  2, 10, 23, 27, 1, 27, 6, 31, 1, 13, 31, 35, 1, 13, 35, 39, 1, 39, 10, 43, 2,
  43, 13, 47, 1, 47, 9, 51, 2, 51, 13, 55, 1, 5, 55, 59, 2, 59, 9, 63, 1, 13,
  63, 67, 2, 13, 67, 71, 1, 71, 5, 75, 2, 75, 13, 79, 1, 79, 6, 83, 1, 83, 5,
  87, 2, 87, 6, 91, 1, 5, 91, 95, 1, 95, 13, 99, 2, 99, 6, 103, 1, 5, 103, 107,
  1, 107, 9, 111, 2, 6, 111, 115, 1, 5, 115, 119, 1, 119, 2, 123, 1, 6, 123, 0,
  99, 2, 14, 0, 0,
];

function operator(arrayToUse, cIndex) {
  let input1 = arrayToUse[arrayToUse[cIndex + 1]];
  let input2 = arrayToUse[arrayToUse[cIndex + 2]];
  let outputCell = arrayToUse[cIndex + 3];
  switch (arrayToUse[cIndex]) {
    case 1:
      arrayToUse[outputCell] = input1 + input2;
      return cIndex + 4;
    case 2:
      arrayToUse[outputCell] = input1 * input2;
      return cIndex + 4;
    case 99:
    default:
      return null;
  }
}

function operatorCaller(arrayToUse) {
  let currentIndex = 0;
  while (currentIndex !== null && currentIndex < arrayToUse.length) {
    currentIndex = operator(arrayToUse, currentIndex);
  }
  return arrayToUse;
}

function inputFinder(valueToFind) {
  for (i = 0; i < 100; i++) {
    for (j = 0; j < 100; j++) {
      let IntCodeProxy = [...IntCode];
      IntCodeProxy[1] = i;
      IntCodeProxy[2] = j;
      operatorCaller(IntCodeProxy);

      if (IntCodeProxy[0] === valueToFind) {
        return i * 100 + j;
      }
    }
  }
}

// console.log(operatorCaller(Intcode))
console.log(inputFinder(19690720));
