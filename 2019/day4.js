function countCombinations(start, end) {
  let counter = 0;
  outerloop: for (i = start; i <= end; i++) {
    let arrayFromNumber = `${i}`.split("");
    let doubleController = false;
    for (k = 0; k < arrayFromNumber.length; k++) {
      if (
        arrayFromNumber[k] === arrayFromNumber[k + 1] &&
        arrayFromNumber[k - 1] !== arrayFromNumber[k] &&
        arrayFromNumber[k] !== arrayFromNumber[k + 2]
      ) {
        doubleController = true;
      }
    }
    if (!doubleController) {
      continue outerloop;
    }
    for (j = 1; j < arrayFromNumber.length; j++) {
      if (arrayFromNumber[j - 1] > arrayFromNumber[j]) {
        continue outerloop;
      }
    }
    counter++;
  }
  return counter;
}

console.log(countCombinations(246540, 787419));
