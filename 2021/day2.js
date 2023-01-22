import day2input from "./day2input.mjs";

function solvePart1() {
    let currentX = 0;
    let currentY = 0;

    for (let command of day2input) {
        let [operation, amount] = command.split(" ");
        amount = Number(amount);

        switch (operation) {
            case "forward":
                currentX += amount;
                break;
            case "down":
                currentY += amount;
                break;
            case "up":
                currentY -= amount;
                break;
            default:
                console.log("unknown command");
        }
    }

    console.log(currentX * currentY);
}

function solvePart2() {
    let currentX = 0;
    let aim = 0;
    let currentY = 0;

    for (let command of day2input) {
        let [operation, amount] = command.split(" ");
        amount = Number(amount);

        switch (operation) {
            case "forward":
                currentX += amount;
                currentY += amount * aim;
                break;
            case "down":
                aim += amount;
                break;
            case "up":
                aim -= amount;
                break;
            default:
                console.log("unknown command");
        }
    }

    console.log(currentX * currentY);
}

solvePart2();
