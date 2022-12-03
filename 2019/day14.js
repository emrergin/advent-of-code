import {readFileSync } from "fs";

let lines = readFileSync(`day14test3.txt`, 'utf-8')
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

function cleanUp(arrayOfInputs){
    return arrayOfInputs.reduce((acc,curr)=>{
        let cellToAdd=acc.findIndex(a=>a[1]===curr[1]);
        if(cellToAdd!==-1){acc[cellToAdd][0]+=curr[0];}
        else{acc.push(curr);}
        return acc;
    },[]);
}

function produceOneFuel(currentInput){
    while(currentInput.filter(a=>a[0]>0).length>1){ 
        for(let i=0; i<currentInput.length;i++){
            
            if(currentInput[i][1]!=="ORE"&&currentInput[i][0]>0){
                const relatedProcess = structuredClone(lines.find(a=>a.output[1]===currentInput[i][1]));
                currentInput[i][0]-=relatedProcess.output[0];
                currentInput = currentInput.concat(relatedProcess.input);
                currentInput= cleanUp(currentInput); 
                currentInput=currentInput.filter(a=>a[0]!==0);
            }
        }
    }
    return currentInput;
}
// Not complete yet.
function produceFuel(currentInput){
    while(currentInput.filter(a=>a[0]>0).length>1){ 
        for(let i=0; i<currentInput.length;i++){
            if(currentInput[i][1]!=="ORE"&&currentInput[i][0]>0){
                const relatedProcess = structuredClone(lines.find(a=>a.output[1]===currentInput[i][1]));
                const timesToProcess = Math.max(Math.ceil(relatedProcess.output[0]/currentInput[i][0]),1);
                currentInput[i][0]-=(timesToProcess*relatedProcess.output[0]);
                currentInput = currentInput.concat(relatedProcess.input.map(a=>[a[0]*timesToProcess,a[1]]));
                currentInput= cleanUp(currentInput); 
                currentInput=currentInput.filter(a=>a[0]!==0);
            }
        }
    }
    return currentInput;
}

function partOne(){
    let finalInput = structuredClone(lines.find(a=>a.output[1]==="FUEL").input);
    finalInput=produceOneFuel(finalInput);
    console.log(finalInput);
}

function partOnePrime(){
    let finalInput = structuredClone(lines.find(a=>a.output[1]==="FUEL").input);
    finalInput=produceFuel(finalInput);
    console.log(finalInput);
}

function partTwo(){
    let finalInput = structuredClone(lines.find(a=>a.output[1]==="FUEL").input);
    let currentFuel=0;
    
    while(true){        
        finalInput=produceFuel(finalInput);
        const newFuelToAdd=structuredClone(lines.find(a=>a.output[1]==="FUEL").input);
        finalInput = finalInput.concat(newFuelToAdd);
        currentFuel++;
        finalInput= cleanUp(finalInput); 
        if(finalInput.find(a=>a[1]==="ORE")&& finalInput.find(a=>a[1]==="ORE")[0]>1000000000000){break;}
        if(finalInput.length===1){break;}
        if(currentFuel%1000===0){console.log(currentFuel)}
    }

    console.log(currentFuel-1,finalInput);
}


// function addNewFuelToProduce()
partOne();
partOnePrime();
// partTwo();
// findInputs("FUEL");