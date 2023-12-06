import { readFileSync } from "fs";
const commands = readFileSync(`day5input.txt`, "utf-8")
  .split("\r\n\r\n")
  .map((m, index) => {
    if (index === 0) {
      return m.split(" ");
    } else {
      return m.split("\r\n");
    }
  })
  .map((a) => a.slice(1))
  .map((m, index) => {
    if (index === 0) {
      return m.map(Number);
    } else {
      return m.map((a) => a.split(" ").map(Number));
    }
  });

const parsedCommands = {
  seeds: commands[0] as number[],
  seedToSoil: commands[1] as number[][],
  soilToFertilizer: commands[2] as number[][],
  fertilizerToWater: commands[3] as number[][],
  waterToLight: commands[4] as number[][],
  lightToTemperature: commands[5] as number[][],
  temperatureToHumidity: commands[6] as number[][],
  humidityToLocation: commands[7] as number[][],
};

function readMap(keyToCheck: number, subCommand: number[][]) {
  for (let command of subCommand) {
    if (keyToCheck >= command[1] && keyToCheck < command[1] + command[2]) {
      return keyToCheck - command[1] + command[0];
    }
  }
  return keyToCheck;
}

function findLocationForSeed(seedno: number) {
  const soilno = readMap(seedno, parsedCommands.seedToSoil);
  const fertilizerno = readMap(soilno, parsedCommands.soilToFertilizer);
  const waterno = readMap(fertilizerno, parsedCommands.fertilizerToWater);
  const lightno = readMap(waterno, parsedCommands.waterToLight);
  const temperatureno = readMap(lightno, parsedCommands.lightToTemperature);
  const humidityno = readMap(
    temperatureno,
    parsedCommands.temperatureToHumidity
  );
  const locationno = readMap(humidityno, parsedCommands.humidityToLocation);

  return locationno;
}

function partOne() {
  const locations = parsedCommands.seeds.map((s) => findLocationForSeed(s));
  console.log(Math.min(...locations));
}

function partTwo() {
  let minimum = Number.MAX_SAFE_INTEGER;
  for (let i = 0; i < parsedCommands.seeds.length / 2; i++) {
    const startingSeed = parsedCommands.seeds[2 * i];
    for (let j = 0; j < parsedCommands.seeds[2 * i + 1]; j++) {
      minimum = Math.min(findLocationForSeed(j + startingSeed), minimum);
    }
  }
  console.log(minimum);
}

partOne();
partTwo();
