import day3input from "./day3input.mjs";

let test = [
  "00100",
  "11110",
  "10110",
  "10111",
  "10101",
  "01111",
  "00111",
  "11100",
  "10000",
  "11001",
  "00010",
  "01010",
];

function powerConsumption(arrayToUse) {
  // Related Links
  // https://stackoverflow.com/questions/35578478/array-prototype-fill-with-object-passes-reference-and-not-new-instance

  let parsedInput = parseOnesZeros(
    arrayToUse.map((a) => a.split("")),
    1
  );

  const gamma = parseInt(parsedInput.join(""), 2);
  const epsilon = parseInt(
    parsedInput.map((a) => (a === `1` ? 0 : 1)).join(""),
    2
  );

  console.log(gamma * epsilon);
}

function parseOnesZeros(arr, priority = 0) {
  let resultArray = Array(arr[0].length)
    .fill()
    .map((a) => Object.assign({}, { zeros: 0, ones: 0 }));
  let arrayOfObjects = arr.reduce((prev, thisNumberArray) => {
    thisNumberArray.forEach((value, index) => {
      if (value === `1`) {
        prev[index].ones++;
      } else {
        prev[index].zeros++;
      }
    });
    return prev;
  }, resultArray);
  if (priority === 0) {
    return arrayOfObjects.map((a) => (a.zeros >= a.ones ? `0` : `1`));
  } else {
    return arrayOfObjects.map((a) => (a.zeros > a.ones ? `0` : `1`));
  }
}

function lifeSupport(arrayToUse) {
  let parsedInput = arrayToUse.map((a) => a.split(""));

  function O2(input) {
    let index = 0;
    let onesZeros = parseOnesZeros(input, 1);
    while (input.length > 1) {
      input = input.filter((a) => a[index] === onesZeros[index]);
      onesZeros = parseOnesZeros(input, 1);
      index++;
    }
    return parseInt(input[0].join(""), 2);
  }

  function CO2(input) {
    let index = 0;
    let onesZeros = parseOnesZeros(input, 1);
    while (input.length > 1) {
      input = input.filter((a) => a[index] !== onesZeros[index]);
      onesZeros = parseOnesZeros(input, 1);
      index++;
    }
    return parseInt(input[0].join(""), 2);
  }

  console.log(O2([...parsedInput]) * CO2([...parsedInput]));
}
