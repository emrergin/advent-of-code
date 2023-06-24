import { readFileSync } from "fs";
import Computer from "./Computer.js";
const nums = readFileSync(`day13input.txt`, "utf-8").split(",");

export class ArcadeMachine extends Computer {
  constructor(opcode, inputs = [], relativeBase = 0) {
    super(opcode, inputs, relativeBase);
    this.joysticklocation = 18;
  }

  workOnce(touch) {
    super.workOnce();
    if (touch) {
      if (this.outputs[this.outputs.length - 3] === "-1") {
        console.log(this.outputs[this.outputs.length - 1]);
      }

      if (this.outputs[this.outputs.length - 1] === "4") {
        console.log("uhhhh");
        if (this.outputs[this.outputs.length - 3] < this.joysticklocation) {
          this.inputs.push("-1");
        } else if (
          this.outputs[this.outputs.length - 3] > this.joysticklocation
        ) {
          this.inputs.push("1");
        } else {
          this.inputs.push("0");
        }
      }
    }
  }
}

function partOne() {
  const machine = new ArcadeMachine(nums, ["2"]);
  machine.workTillEnd();
  console.log(
    machine.outputs.filter((a, index) => index % 3 == 2 && a === "2").length
  );
}

function partTwo() {
  const machine = new ArcadeMachine(nums, ["2"]);
  machine.workTillEnd(true);
}

partOne();
partTwo();
