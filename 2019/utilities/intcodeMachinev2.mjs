const parameterMap = new Map([
  [`1`, 3],
  [`01`, 3], //add
  [`2`, 3],
  [`02`, 3], //multiply
  [`3`, 1],
  [`03`, 1], //input
  [`4`, 1],
  [`04`, 1], //output
  [`5`, 2],
  [`05`, 2], //jump-if-true
  [`6`, 2],
  [`06`, 2], //jump-if-false
  [`7`, 3],
  [`07`, 3], //lessthan
  [`8`, 3],
  [`08`, 3], //equal
  [`9`, 1],
  [`09`, 1], //basechange
  [`99`, 0],
]);

export default function operator(
  arrayToUse,
  cIndex,
  inputMemory,
  outputMemory,
  relativeBaseM = [0]
) {
  const operatorCode = String(arrayToUse[cIndex]).slice(-2);
  const parameterMode = String(arrayToUse[cIndex])
    .padStart(parameterMap.get(operatorCode) + 2, "0")
    .slice(0, -2)
    .split(``)
    .reverse();

  function paramFinder(mode, indexOffset) {
    switch (mode) {
      case "0":
        return arrayToUse[cIndex + indexOffset] || 0;
      case "1":
        return cIndex + indexOffset;
      case "2":
        return (arrayToUse[cIndex + indexOffset] || 0) + relativeBaseM[0];
    }
  }
  let param1 = paramFinder(parameterMode[0], 1);
  let param2 = paramFinder(parameterMode[1], 2);
  let param3 = paramFinder(parameterMode[2], 3);

  // console.log(operatorCode,arrayToUse[param1],arrayToUse[param2],arrayToUse[param3])

  function singleOperation() {
    switch (operatorCode) {
      case `1`:
      case `01`:
        arrayToUse[param3] =
          (arrayToUse[param1] || 0) + (arrayToUse[param2] || 0);
        return cIndex + parameterMap.get(`1`) + 1;
      case `2`:
      case `02`:
        arrayToUse[param3] =
          (arrayToUse[param1] || 0) * (arrayToUse[param2] || 0);
        return cIndex + parameterMap.get(`2`) + 1;
      case `3`:
      case `03`:
        let input = inputMemory.shift();
        arrayToUse[param1] = input;
        return cIndex + parameterMap.get(`3`) + 1;
      case `4`:
      case `04`:
        // outputMemory.splice(1,0,(arrayToUse[param1]||0));
        outputMemory.push(arrayToUse[param1] || 0);
        return cIndex + parameterMap.get(`4`) + 1;
      case `5`:
      case `05`:
        if ((arrayToUse[param1] || 0) !== 0) {
          return arrayToUse[param2] || 0;
        } else {
          return cIndex + parameterMap.get(`5`) + 1;
        }
      case `6`:
      case `06`:
        if ((arrayToUse[param1] || 0) === 0) {
          return arrayToUse[param2] || 0;
        } else {
          return cIndex + parameterMap.get(`6`) + 1;
        }
      case `7`:
      case `07`:
        if ((arrayToUse[param1] || 0) < (arrayToUse[param2] || 0)) {
          arrayToUse[param3] = 1;
        } else {
          arrayToUse[param3] = 0;
        }
        return cIndex + parameterMap.get(`7`) + 1;
      case `8`:
      case `08`:
        if ((arrayToUse[param1] || 0) === (arrayToUse[param2] || 0)) {
          arrayToUse[param3] = 1;
        } else {
          arrayToUse[param3] = 0;
        }
        return cIndex + parameterMap.get(`8`) + 1;
      case `9`:
      case `09`:
        // console.log(`updating relative base by ${arrayToUse[param1]}`)
        relativeBaseM[0] = (arrayToUse[param1] || 0) + relativeBaseM[0];
        return cIndex + parameterMap.get(`9`) + 1;
      case `99`:
        return "HALT";
      default:
        return null;
    }
  }
  let newIndex = singleOperation();
  return newIndex;
}
