import { readFileSync } from "fs";
import Computer from "./Computer.js";
const nums = readFileSync(`day13input.txt`, "utf-8").split(",");

export class ArcadeMachine extends Computer {
  constructor(opcode, inputs = [], relativeBase = 0) {
    super(opcode, inputs, relativeBase);
  }

  get numberOfBlocks() {
    return this.outputs.filter((a, index) => index % 3 == 2 && a === "2")
      .length;
  }

  positionOfBall() {
    return this.outputs.findLast(
      (a, index) => index % 3 === 0 && this.outputs[index + 2] === "4"
    );
  }

  newInput() {
    const currentBallPosition = this.positionOfBall();
    if (+this.paddlePosition > +currentBallPosition) {
      return "-1";
    } else if (+this.paddlePosition < +currentBallPosition) {
      return "1";
    }
    return "0";
  }

  get paddlePosition() {
    const index =
      this.outputs.findLastIndex((a, index) => index % 3 === 2 && a === "3") -
      2;
    return this.outputs[index];
  }

  get score() {
    const indexOfScore =
      this.outputs.findLastIndex((a, index) => index % 3 === 0 && a === "-1") +
      2;

    if (indexOfScore % 3 === 2) {
      return +this.outputs[indexOfScore];
    }
    return 0;
  }

  inputToOpCode(index) {
    this.opcode[index] = String(this.newInput());
    this.pointer += 2;
  }
}

function partOne() {
  const machine = new ArcadeMachine(nums, []);
  machine.workTillEnd();
  console.log(machine.numberOfBlocks);
}

function partTwo() {
  const machine = new ArcadeMachine(nums, []);
  machine.workTillEnd();
  console.log(machine.score);
}

partOne();
partTwo();
