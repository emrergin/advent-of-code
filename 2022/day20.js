import { readFileSync } from "fs";
// let commands = readFileSync(`day20test.txt`, "utf-8")
let commands = readFileSync(`day20input.txt`, "utf-8")
    .split("\n").map(Number)
    .map((a,index)=>({
        value:a,
        position:index
    }));

let size = commands.length;

const mapOfValues = new Map();

for(let command of commands){
    mapOfValues.set(command.position,command);
}



function mixOnce(){

    for(let command of commands){
        let forward = Math.sign(command.value);
    
        if(forward===0){continue;}
        let numberOfMoves = Math.abs(command.value);
        numberOfMoves=numberOfMoves%(size-1);
    
        while(numberOfMoves>0){
            let currentPosition = command.position;
            let nextPosition = (currentPosition+forward);
            if(nextPosition===-1){
                nextPosition=size-1;
                indexOffset-=1;
            }
            if(nextPosition===size){
                nextPosition=0;
                indexOffset+=1;
            }
            numberOfMoves-=1;
    
            let commandAtNextPosition = mapOfValues.get(nextPosition);
            command.position=nextPosition;        
            commandAtNextPosition.position=currentPosition;
    
            mapOfValues.set(nextPosition,command);
            mapOfValues.set(currentPosition,commandAtNextPosition);
    
        }
    }
}

function printValues(indexOffset){
    offsetCorrector(indexOffset);
    const resultingCode=[...mapOfValues.values()].map(a=>a.value);
    const positionOfZero = resultingCode.findIndex(a=>a===0);

    console.log(resultingCode[(1000+positionOfZero)%size]+resultingCode[(2000+positionOfZero)%size]+resultingCode[(3000+positionOfZero)%size]);
}

function offsetCorrector(indexOffset){
    const resultingCode = [...mapOfValues.values()].map(a=>a.value);
    if(indexOffset<0){
        let shiftAmount = Math.abs(indexOffset);
        
        while(shiftAmount>0){
            let valueToMove = resultingCode.shift();
            resultingCode.push(valueToMove);
            shiftAmount--;
        }
    }
    
    if(indexOffset>0){
        let shiftAmount = indexOffset;
        
        while(shiftAmount>0){
            let valueToMove = resultingCode.pop();
            resultingCode.unshift(valueToMove);
            shiftAmount--;
        }
    }
}

function partOne(){
    let indexOffset = mixOnce();
    printValues(indexOffset);
}


// partOne()

function partTwo(decKey){
    
    commands = commands.map((a)=>({...a,value:a.value*decKey}));

    for(let command of commands){
        mapOfValues.set(command.position,command);
    }

    let count=0;
    let totalIndexOffset=0;
    while (count<10){
        count++;
        totalIndexOffset+=mixOnce();
        console.log(commands);
    }
    printValues(totalIndexOffset);
}

partTwo(811589153);