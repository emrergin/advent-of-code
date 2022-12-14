import {readFileSync } from "fs";
const commands = readFileSync(`day14input.txt`, 'utf-8').split("\n").map(a=>a.split(" -> ").map(b=>b.split(",").map(Number)));

let maxX=Math.max(...commands.flatMap(a=>a.map(b=>b[0])),500);
let minX=Math.min(...commands.flatMap(a=>a.map(b=>b[0])),500);
let maxY=Math.max(...commands.flatMap(a=>a.map(b=>b[1])),0);
let minY=Math.min(...commands.flatMap(a=>a.map(b=>b[1])),0);
maxX++;
maxY++;
minX--;
minY--;

var myGrid = [...Array(maxY-minY+1 )].map(e => Array(maxX-minX+1 ));
for(let i=0;i<myGrid.length;i++){
    for(let j=0;j<myGrid[0].length;j++){
        myGrid[i][j]='.';
    }
}

function drawPath(start,end){
    if(start.y===end.y){
        let currentX=Math.min(start.x,end.x);
        while(currentX<=start.x||currentX<=end.x){
            myGrid[start.y-minY][currentX-minX]='#';
            currentX++;
        }
    }
    if(start.x===end.x){
        let currentY=Math.min(start.y,end.y);
        while(currentY<=start.y||currentY<=end.y){
            myGrid[currentY-minY][start.x-minX]='#';
            currentY++;
        }
    }
}

for(let command of commands){
    while(command.length>1){
        let currentLast = command.pop();
        let currentOneBeforeLast =command[command.length-1];
        drawPath({x:currentLast[0],y:currentLast[1]},{x:currentOneBeforeLast[0],y:currentOneBeforeLast[1]});
    }
}

function drawGrid(){
    // console.clear();
    for(let i=0;i<myGrid.length;i++){
        let row='';
        for(let j=0;j<myGrid[0].length;j++){
            row+=myGrid[i][j];
        }
        console.log(row);
    }
}

function createNewSand(){
    myGrid[0-minY][500-minX]='o';
}

function moveSand(x,y){
    let currentX=x;
    let currentY=y;
    while(true){
        if(currentY===maxY){return false;}
        if(myGrid[currentY+1-minY][currentX-minX]==='.'){
            currentY+=1;
            continue;
        }
        if(myGrid[currentY+1-minY][currentX-1-minX]==='.'){
            currentX=currentX-1;
            currentY=currentY+1;
            continue;
        }
        if(myGrid[currentY+1-minY][currentX+1-minX]==='.'){
            currentX=currentX+1;
            currentY=currentY+1;
            continue;
        }        
        myGrid[currentY-minY][currentX-minX]='o';
        return true;
    }

}
// console.log(maxY);
// drawGrid();

let counter=0;
while(true){
    counter++;
    const continueBool=moveSand(500,0);
    if(!continueBool){break;}
}

console.log(counter-1);
drawGrid();