import {readFileSync } from "fs";
const commands = readFileSync(`day14input.txt`, 'utf-8').split("\n").map(a=>a.split(" -> ").map(b=>b.split(",").map(Number)));

let maxX=Math.max(...commands.flatMap(a=>a.map(b=>b[0])),500);
let minX=Math.min(...commands.flatMap(a=>a.map(b=>b[0])),500);
let maxY=Math.max(...commands.flatMap(a=>a.map(b=>b[1])),0);
let minY=Math.min(...commands.flatMap(a=>a.map(b=>b[1])),0);

function partOne(){
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

    function moveSand(x,y,grid){
        let currentX=x;
        let currentY=y;
        while(true){
            if(currentY===maxY){return false;}
            if(grid[currentY+1-minY][currentX-minX]==='.'){
                currentY+=1;
                continue;
            }
            if(grid[currentY+1-minY][currentX-1-minX]==='.'){
                currentX=currentX-1;
                currentY=currentY+1;
                continue;
            }
            if(grid[currentY+1-minY][currentX+1-minX]==='.'){
                currentX=currentX+1;
                currentY=currentY+1;
                continue;
            }        
            grid[currentY-minY][currentX-minX]='o';
            return true;
        }
    }
    
    let counter=0;
    while(true){
        counter++;
        const continueBool=moveSand(500,0);
        if(!continueBool){break;}
    }

    console.log(counter-1);
}

function partTwo(){
    maxX++;
    maxY+=2;
    minX--;
    minY--;
    let sandPlace=500;

    
    var myGrid = [...Array(maxY-minY+1 )].map(e => Array(maxX-minX+1 ));

    let xLen = maxX-minX+1;
    
    for(let i=0;i<myGrid.length;i++){
        for(let j=0;j<myGrid[0].length;j++){
            myGrid[i][j]='.';
        }
    }
    drawPath({x:minX,y:maxY},{x:maxX,y:maxY});
    const repGrid = structuredClone(myGrid);
     
    
    for(let command of commands){
        while(command.length>1){
            let currentLast = command.pop();
            let currentOneBeforeLast =command[command.length-1];
            drawPath({x:currentLast[0],y:currentLast[1]},{x:currentOneBeforeLast[0],y:currentOneBeforeLast[1]});
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

    function moveSand(x,y){
        let currentX=x;
        let currentY=y;
        while(true){
            
            if(currentX===maxX-1){
                let newrep = structuredClone(repGrid);
                myGrid=myGrid.map((a,index)=>a.concat(newrep[index]));
                maxX+=xLen;
                continue;
            }if(currentX===minX+1){
                let newrep = structuredClone(repGrid);
                myGrid=newrep.map((a,index)=>a.concat(myGrid[index]));
                minX-=xLen;
                continue;
            }
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
            if(currentX===500&&currentY===0){return false;}
            return true;
        }
    }
    
    let counter=0;
    while(true){
        counter++;
        const continueBool=moveSand(500,0);
        if(!continueBool){break;}
    }
    console.log(counter);
}

partOne();
partTwo();
