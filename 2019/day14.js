import {readFileSync } from "fs";

let lines = readFileSync(`day14test1.txt`, 'utf-8')
                .split(`\n`).map(a=>a.split('=>'))
                .map(a=>a.flatMap(b=>b.trim().split(',')))
                .map(a=>a.map(b=>b.trim().split(" "))
                    .reduce((acc,curr, currentIndex, array)=>{
                        if(currentIndex<array.length-1){
                            acc.input.push([+curr[0],curr[1]])
                        }
                        else{
                            acc.output=[+curr[0],curr[1]]
                        }
                        return acc;
                    },{input:[],output:[]})
                );

const hasPathToOre = new Map();
// const leftOverInputs = new Map();

function calculatenewPaths(){
    for(let line of lines){
        if(line.input.every(i=>i[1]==="ORE")){
            line.lowestOreCost=line.input.reduce((acc,curr)=>acc+curr[0],0);
            hasPathToOre.set(line.output[1],line);
        }
    }
}

function cleanUp(){
    lines.map(a=>a.input.reduce((acc,curr)=>
    {
        const prev = acc.findIndex(a=>a[1]===curr[1]);
        if (prev!==-1){acc[prev][0]+=curr[0];}
        else{acc.push(curr);}
        return acc;
    },[]))
}

// console.log(hasPathToOre);

function reduceIntoOres(){
    for(let line of lines){
        for(let i=0;i<line.input.length;i++){
            if (hasPathToOre.get((line.input[i])[1])){
                const amountProducedInOneGo = hasPathToOre.get((line.input[i])[1]).output[0];
                const amountNeededToBeProduced = line.input[i][0];
                const productionCycles = Math.ceil(amountNeededToBeProduced/amountProducedInOneGo);
                line.input[i]=[productionCycles*hasPathToOre.get((line.input[i])[1]).lowestOreCost,"ORE"];
            }
        }
    }
}

// console.log(lines[lines.length-1]);
// console.log(lines.find(a=>a.output[1]==="FUEL").input.every(i=>i[1]==="ORE"));

while(!(lines.find(a=>a.output[1]==="FUEL").input.every(i=>i[1]==="ORE"))){
    calculatenewPaths();
    reduceIntoOres();
    console.log(hasPathToOre);
    // cleanUp();
}

console.log(lines.find(a=>a.output[1]==="FUEL"));