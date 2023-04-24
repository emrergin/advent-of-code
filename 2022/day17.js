import { readFileSync } from "fs";
const commands = readFileSync(`day17test.txt`, "utf-8")
    .split("")
    .map((a) => (a === ">" ? 1 : 0));
// const commands = readFileSync(`day17input.txt`, "utf-8").split("").map(a=>a===">"?1:0);
const inputLength = commands.length;
// 1 to right 0 to left

class Board {
    constructor(dimensions) {
        this.dimensions = dimensions;
        this.lines = [];
        this.createLine(false);
        this.createLine();
        this.createLine();
        this.createLine();
    }
    createLine(isEmpty = true, piece) {
        let newLine;
        if (isEmpty) {
            newLine = ("#" + ".".repeat(this.dimensions - 2) + "#").split("");
        } else {
            if (piece === undefined) {
                newLine = "#".repeat(this.dimensions).split("");
            } else {
                newLine = piece.split("");
            }
        }
        this.lines.push(newLine);
    }
    addPiece(pieceNo) {
        switch (pieceNo) {
            case 1:
                this.createLine(false, "#..@@@@.#");
                break;
            case 2:
                this.createLine(false, "#...@...#");
                this.createLine(false, "#..@@@..#");
                this.createLine(false, "#...@...#");
                break;
            case 3:
                this.createLine(false, "#..@@@..#");
                this.createLine(false, "#....@..#");
                this.createLine(false, "#....@..#");
                break;
            case 4:
                this.createLine(false, "#..@....#");
                this.createLine(false, "#..@....#");
                this.createLine(false, "#..@....#");
                this.createLine(false, "#..@....#");
                break;
            case 5:
                this.createLine(false, "#..@@...#");
                this.createLine(false, "#..@@...#");
                break;
            default:
                break;
        }
    }
    gravity() {
        let numberOfLines = this.lines.length;
        let numberOfColumns = this.dimensions;
        let continueFalling = true;

        outerloop: for (let i = 0; i < numberOfLines; i++) {
            for (let j = 0; j < numberOfColumns; j++) {
                if (this.lines[i][j] === "@") {
                    if (this.lines[i - 1][j] === "#") {
                        continueFalling = false;
                        break outerloop;
                    }
                }
            }
        }

        for (let i = 0; i < numberOfLines; i++) {
            if (continueFalling) {
                for (let j = 0; j < numberOfColumns; j++) {
                    if (this.lines[i][j] === "@") {
                        this.lines[i - 1][j] = "@";
                        this.lines[i][j] = ".";
                    }
                }
            } else {
                for (let j = 0; j < numberOfColumns; j++) {
                    if (this.lines[i][j] === "@") {
                        this.lines[i][j] = "#";
                    }
                }
            }
        }
        return continueFalling;
    }
    wind(w) {
        let numberOfLines = this.lines.length;
        let numberOfColumns = this.dimensions;

        if (w === 1) {
            for (let i = 0; i < numberOfLines; i++) {
                for (let j = numberOfColumns - 1; j >= 0; j--) {
                    if (
                        this.lines[i][j] === "@" &&
                        this.lines[i][j + 1] === "#"
                    ) {
                        return;
                    }
                }
            }

            for (let i = 0; i < numberOfLines; i++) {
                for (let j = numberOfColumns - 1; j >= 0; j--) {
                    if (this.lines[i][j] === "@") {
                        let temp = this.lines[i][j + 1];
                        this.lines[i][j + 1] = this.lines[i][j];
                        this.lines[i][j] = temp;
                    }
                }
            }
        } else {
            for (let i = 0; i < numberOfLines; i++) {
                for (let j = 0; j < numberOfColumns; j++) {
                    if (
                        this.lines[i][j] === "@" &&
                        this.lines[i][j - 1] === "#"
                    ) {
                        return;
                    }
                }
            }

            for (let i = 0; i < numberOfLines; i++) {
                for (let j = 0; j < numberOfColumns; j++) {
                    if (this.lines[i][j] === "@") {
                        let temp = this.lines[i][j - 1];
                        this.lines[i][j - 1] = this.lines[i][j];
                        this.lines[i][j] = temp;
                    }
                }
            }
        }
    }
    countEmptyLines() {
        return this.lines.filter((a) => a.join("") === "#.......#").length;
    }
    removeLinesFromBeginning() {
        let emptyLines = this.countEmptyLines();
        while (emptyLines > 3) {
            this.lines.pop();
            emptyLines--;
        }
    }
    print() {
        console.log(
            this.lines
                .reverse()
                .map((a) => a.join(""))
                .join("\n")
        );
    }
}

function partOne() {
    let board = new Board(9);

    let numberOfPiecesSoFar = 0;
    let windIndex = 0;

    while (numberOfPiecesSoFar < 2022) {
        let isFalling = true;
        board.addPiece((numberOfPiecesSoFar % 5) + 1);
        numberOfPiecesSoFar++;
        while (isFalling) {
            board.wind(commands[windIndex % inputLength]);
            windIndex++;
            isFalling = board.gravity();
        }
        board.removeLinesFromBeginning();
    }
    console.log(board.lines.length - 4);
}

function partTwo() {
    let board = new Board(9);

    let numberOfPiecesSoFar = 0;
    let windIndex = 0;
    let heightsAfterPieces = [0];

    while (!longestRepeatingSubarray(heightsAfterPieces)) {
        let isFalling = true;
        board.addPiece((numberOfPiecesSoFar % 5) + 1);
        numberOfPiecesSoFar++;
        while (isFalling) {
            board.wind(commands[windIndex % inputLength]);
            windIndex++;
            isFalling = board.gravity();
        }
        board.removeLinesFromBeginning();
        let previousCell = heightsAfterPieces[heightsAfterPieces.length - 1];
        // console.log(previousCell,board.lines.length-4);
        heightsAfterPieces.push(board.lines.length - 4 - previousCell);
        // console.log(heightsAfterPieces.slice(-3))
    }
    // while(!patternFound(heightsAfterPieces)){
    //     heightsAfterPieces.shift();
    // }
    console.log(heightsAfterPieces.length);

    console.log(board.lines.length - 4, numberOfPiecesSoFar);
    console.log(
        Math.floor(1000000000000 / numberOfPiecesSoFar) * board.lines.length - 4
    );
}

// partOne();
partTwo();

const exampleArray = [5, 6, 7, 1, 2, 3, 4, 1, 2, 3, 4];
// function longestRepeatingSubarray(array){

// }

function longestRepeatingSubarray(a) {
    let n = a.length;
    let LCSRe = new Array(n + 1);
    for (let i = 0; i < n + 1; i++) {
        LCSRe[i] = new Array(n + 1);
    }
    for (let i = 0; i < n + 1; i++) {
        for (let j = 0; j < n + 1; j++) {
            LCSRe[i][j] = 0;
        }
    }

    let res = []; // To store result
    let res_length = 0; // To store length of result

    // building table in bottom-up manner
    let i,
        index = 0;
    for (i = 1; i <= n; i++) {
        for (let j = i + 1; j <= n; j++) {
            // (j-i) > LCSRe[i-1][j-1] to remove
            // overlapping
            if (a[i - 1] == a[j - 1] && LCSRe[i - 1][j - 1] < j - i) {
                LCSRe[i][j] = LCSRe[i - 1][j - 1] + 1;

                // updating maximum length of the
                // substring and updating the finishing
                // index of the suffix
                if (LCSRe[i][j] > res_length) {
                    res_length = LCSRe[i][j];
                    index = Math.max(i, index);
                }
            } else {
                LCSRe[i][j] = 0;
            }
        }
    }

    // If we have non-empty result, then insert all
    // characters from first character to last
    // character of String
    // if (res_length > 0) {
    //     for (i = index - res_length + 1; i <= index; i++) {
    //         res.push(a[i - 1]);
    //     }
    // }

    // return res;
    console.log(res_length, a.length);
    return res_length > a.length / 3;
}

// console.log(longestRepeatingSubarray(exampleArray))
