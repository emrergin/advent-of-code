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
    console.log(this.outputs);
    return this.outputs.find(
      (a, index) => index % 3 === 0 && this.outputs[index + 2] === "4"
    );
  }

  newInput() {
    const [paddlePositionLeft, paddlePositionRight] = this.paddlePosition;
    const currentBallPosition = this.positionOfBall();
    if (+paddlePositionLeft > +currentBallPosition) {
      this.inputs.push("-1");
    } else if (+paddlePositionRight < +currentBallPosition) {
      this.inputs.push("1");
    } else {
      this.inputs.push("0");
    }
  }

  get paddlePosition() {
    const leftEdge =
      this.outputs.findIndex((a, index) => index % 3 === 2 && a === "3") - 2;
    const rightEdge =
      this.outputs.findLastIndex((a, index) => index % 3 === 2 && a === "3") -
      2;
    return [this.outputs[leftEdge], this.outputs[rightEdge]];
  }

  get score() {
    const indexOfScore =
      this.outputs.findIndex((a, index) => index % 3 === 0 && a === "-1") + 2;
    return this.outputs[indexOfScore];
  }

  workTillEnd() {
    while (!this.halted) {
      let currentInputSize = this.inputs.length;
      super.workOnce();
      let updatedInputSize = this.inputs.length;
      if (updatedInputSize > currentInputSize) {
        this.inputs.pop();
        this.newInput();
      }
    }
    return this.score;
  }
}

function partOne() {
  const machine = new ArcadeMachine(nums, ["2"]);
  machine.workTillEnd();
  console.log(machine.numberOfBlocks);
}

function partTwo() {
  const machine = new ArcadeMachine(nums, ["2"]);
  let score;
  while (machine.numberOfBlocks > 0) {
    score = machine.workTillEnd() || score;
  }
  console.log(score, machine.numberOfBlocks);
  console.log(machine.paddlePosition);
}

partOne();
partTwo();
