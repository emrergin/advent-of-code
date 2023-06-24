export default class Computer {
  constructor(opcode, inputs = [], relativeBase = 0) {
    this.pointer = 0;
    this.halted = false;
    this.opcode = opcode;
    this.outputs = [];
    this.inputs = inputs.map((a) => String(a));
    this.relativeBase = relativeBase;
  }

  static parameterMap = new Map([
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

  paramFinder(mode, indexOffset) {
    switch (mode) {
      case "0":
        return +this.opcode[this.pointer + indexOffset] || 0;
      case "1":
        return +this.pointer + indexOffset;
      case "2":
        return (
          +(this.opcode[this.pointer + indexOffset] || 0) + this.relativeBase
        );
    }
  }

  workOnce() {
    const currentCommand = this.opcode[this.pointer].slice(-2);
    const parameterMode = this.opcode[this.pointer]
      .padStart(Computer.parameterMap.get(currentCommand) + 2, "0")
      .slice(0, -2)
      .split(``)
      .reverse();

    const parameterIndexes = parameterMode.map((a, index) =>
      this.paramFinder(a, index + 1)
    );

    switch (currentCommand) {
      case "1":
      case "01":
        this.opcode[parameterIndexes[2]] = String(
          +this.opcode[parameterIndexes[0]] + +this.opcode[parameterIndexes[1]]
        );
        this.pointer += Computer.parameterMap.get(currentCommand) + 1;
        break;
      case "2":
      case "02":
        this.opcode[parameterIndexes[2]] = String(
          +this.opcode[parameterIndexes[0]] * +this.opcode[parameterIndexes[1]]
        );
        this.pointer += Computer.parameterMap.get(currentCommand) + 1;
        break;
      case "3":
      case "03":
        this.opcode[parameterIndexes[0]] = String(this.inputs.shift() || 0);
        this.pointer += Computer.parameterMap.get(currentCommand) + 1;
        break;
      case "4":
      case "04":
        this.outputs.push(this.opcode[parameterIndexes[0]]);
        this.pointer += Computer.parameterMap.get(currentCommand) + 1;
        break;
      case "5":
      case "05":
        if (this.opcode[parameterIndexes[0]] !== "0") {
          this.pointer = +this.opcode[parameterIndexes[1]];
        } else {
          this.pointer += Computer.parameterMap.get(currentCommand) + 1;
        }
        break;
      case "6":
      case "06":
        if (this.opcode[parameterIndexes[0]] === "0") {
          this.pointer = +this.opcode[parameterIndexes[1]];
        } else {
          this.pointer += Computer.parameterMap.get(currentCommand) + 1;
        }
        break;
      case "7":
      case "07":
        if (
          +(this.opcode[parameterIndexes[0]] || 0) <
          +(this.opcode[parameterIndexes[1]] || 0)
        ) {
          this.opcode[parameterIndexes[2]] = "1";
        } else {
          this.opcode[parameterIndexes[2]] = "0";
        }
        this.pointer += Computer.parameterMap.get(currentCommand) + 1;
        break;
      case "8":
      case "08":
        if (
          (this.opcode[parameterIndexes[0]] || "0") ===
          (this.opcode[parameterIndexes[1]] || "0")
        ) {
          this.opcode[parameterIndexes[2]] = "1";
        } else {
          this.opcode[parameterIndexes[2]] = "0";
        }
        this.pointer += Computer.parameterMap.get(currentCommand) + 1;
        break;
      case "9":
      case "09":
        this.relativeBase += +this.opcode[parameterIndexes[0]];
        this.pointer += Computer.parameterMap.get(currentCommand) + 1;
        break;
      case "99":
        this.halted = true;
        break;
      default:
        break;
    }
  }

  workTillEnd() {
    while (!this.halted) {
      this.workOnce();
    }
    return this.opcode[0];
  }

  workTillEndAndDiagnose() {
    while (!this.halted) {
      this.workOnce();
    }
    return this.outputs;
  }
}
