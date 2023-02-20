import { readFileSync } from "fs";
// const commands = readFileSync(`day17test.txt`, "utf-8").split("").map(a=>a===">"?1:0);
const commands = readFileSync(`day17input.txt`, "utf-8").split("").map(a=>a===">"?1:0);
const inputLength = commands.length;
// 1 to right 0 to left

class Board{
    constructor(dimensions) {
        this.dimensions=dimensions;
        this.lines=[];
        this.createLine(false);
        this.createLine();
        this.createLine();
        this.createLine();
    }
    createLine(isEmpty=true,piece){
        let newLine;
        if(isEmpty){
            newLine =  ("#"+".".repeat(this.dimensions-2)+"#").split("");
        }
        else{
            if(piece===undefined){
                newLine = "#".repeat(this.dimensions).split("");
            }
            else{
                newLine = piece.split("");
            }
        }
        this.lines.push(newLine);
    }
    addPiece(pieceNo){
        switch(pieceNo){
            case 1:                
                this.createLine(false,"#..@@@@.#");
                break;
            case 2:
                this.createLine(false,"#...@...#");
                this.createLine(false,"#..@@@..#");
                this.createLine(false,"#...@...#");
                break;
            case 3:
                this.createLine(false,"#..@@@..#");
                this.createLine(false,"#....@..#");
                this.createLine(false,"#....@..#");
                break;
            case 4:
                this.createLine(false,"#..@....#");
                this.createLine(false,"#..@....#");
                this.createLine(false,"#..@....#");
                this.createLine(false,"#..@....#");
                break;
            case 5:
                this.createLine(false,"#..@@...#");
                this.createLine(false,"#..@@...#");
                break;
            default:
                break;
        }
    }
    gravity(){
        let numberOfLines = this.lines.length;
        let numberOfColumns = this.dimensions;
        let continueFalling=true;

        outerloop: for(let i=0;i<numberOfLines;i++){
            for(let j=0;j<numberOfColumns;j++){
                if(this.lines[i][j]==="@"){
                    if(this.lines[i-1][j]==="#"){
                        continueFalling=false;
                        break outerloop;
                    }
                }
            }
        }

        for(let i=0;i<numberOfLines;i++){
            if(continueFalling){
                for(let j=0;j<numberOfColumns;j++){
                    if(this.lines[i][j]==="@"){
                        this.lines[i-1][j]="@";
                        this.lines[i][j]="."
                    }
                }
            }
            else{
                for(let j=0;j<numberOfColumns;j++){                    
                    if(this.lines[i][j]==="@"){
                        this.lines[i][j]="#"
                    }
                }
            }
        }
        return continueFalling;
    }
    wind(w){
        let numberOfLines = this.lines.length;
        let numberOfColumns = this.dimensions;

        if(w===1){
            for(let i=0;i<numberOfLines;i++){
                for(let j=numberOfColumns-1;j>=0;j--){
                    if(this.lines[i][j]==="@" && this.lines[i][j+1]==="#" ){
                        return;
                    }
                }
            }

            for(let i=0;i<numberOfLines;i++){
                for(let j=numberOfColumns-1;j>=0;j--){
                    if(this.lines[i][j]==="@"){
                        let temp = this.lines[i][j+1];
                        this.lines[i][j+1]=this.lines[i][j];
                        this.lines[i][j]=temp;
                    }
                }
            }
            
        }
        else{
            for(let i=0;i<numberOfLines;i++){
                for(let j=0;j<numberOfColumns;j++){
                    if(this.lines[i][j]==="@" && this.lines[i][j-1]==="#" ){
                        return;
                    }
                }
            }

            for(let i=0;i<numberOfLines;i++){
                for(let j=0;j<numberOfColumns;j++){
                    if(this.lines[i][j]==="@"){
                        let temp = this.lines[i][j-1];
                        this.lines[i][j-1]=this.lines[i][j];
                        this.lines[i][j]=temp;
                    }
                }
            }
        }
    }
    countEmptyLines(){
        return this.lines.filter(a=>a.join("")==="#.......#").length;
    }
    removeLinesFromBeginning(){
        let emptyLines = this.countEmptyLines();
        while(emptyLines>3){
            this.lines.pop();
            emptyLines--;
        }
    }
    print(){
        console.log(this.lines.reverse().map(a=>a.join("")).join("\n"));
    }
}

let board = new Board(9);

let numberOfPiecesSoFar=0;
let windIndex = 0;

while(numberOfPiecesSoFar<30000){
    let isFalling=true;
    board.addPiece(numberOfPiecesSoFar%5+1);
    numberOfPiecesSoFar++;
    if(numberOfPiecesSoFar%1000===0){console.log(numberOfPiecesSoFar);}
    if(windIndex%inputLength===0 && numberOfPiecesSoFar%5===0){
        console.log('!!',numberOfPiecesSoFar)
    }
    while(isFalling){
        board.wind(commands[windIndex%inputLength]);
        windIndex++;
        isFalling = board.gravity();
    }
    board.removeLinesFromBeginning();
}
console.log(board.lines.length-4)
