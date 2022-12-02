import {readFileSync } from "fs";

let lines = readFileSync(`day14input.txt`, 'utf-8')
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

function findInputs(element){
    let finalInput = structuredClone(lines.find(a=>a.output[1]===element).input);
    
    while(finalInput.filter(a=>a[0]>0).length>1){ 
        for(let i=0; i<finalInput.length;i++){
            
            if(finalInput[i][1]!=="ORE"&&finalInput[i][0]>0){
                const relatedProcess = structuredClone(lines.find(a=>a.output[1]===finalInput[i][1]));
                // console.log(relatedProcess)
                finalInput[i][0]-=relatedProcess.output[0];
                finalInput = finalInput.concat(relatedProcess.input);
                finalInput= finalInput.reduce((acc,curr)=>{
                    let cellToAdd=acc.findIndex(a=>a[1]===curr[1]);
                    if(cellToAdd!==-1){acc[cellToAdd][0]+=curr[0];}
                    else{acc.push(curr);}
                    return acc;
                },[])
                finalInput=finalInput.filter(a=>a[0]!==0);
            }
        }
       }

    console.log(finalInput);
}

findInputs("FUEL");