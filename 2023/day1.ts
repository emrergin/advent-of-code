import { readFileSync } from "fs";
const commands = readFileSync(`day1input.txt`, "utf-8").split("\r\n");

function partOne() {
  let commandCopy = commands.map((a) => a.split(""));
  let generalResult = 0;
  for (let command of commandCopy) {
    const firstNumber = command.find((char) => /^\d+$/.test(char));
    const lastNumber = command.findLast((char) => /^\d+$/.test(char));
    generalResult += 10 * Number(firstNumber) + Number(lastNumber);
  }
  console.log(generalResult);
}

function partTwo() {
  const allNumbersAsText: Record<string, number> = {
    zero: 0,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
  };
  let generalResult = 0;
  for (let command of commands) {
    const regex1 =
      /(\d)|(one)|(two)|(three)|(four)|(five)|(six)|(seven)|(eight)|(nine)|(zero)/g;

    const r = [];
    let m: RegExpExecArray | null = null;
    while ((m = regex1.exec(command))) {
      regex1.lastIndex -= m[0].length - 1;
      r.push(m[0]);
    }

    const match1 = r[0];
    const match2 = r[r.length - 1];

    const firstNumber = match1.length === 1 ? match1 : allNumbersAsText[match1];
    const lastNumber = match2.length === 1 ? match2 : allNumbersAsText[match2];

    generalResult += 10 * Number(firstNumber) + Number(lastNumber);
  }
  console.log(generalResult);
}

partOne();
partTwo();
