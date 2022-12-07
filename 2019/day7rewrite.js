import {readFileSync } from "fs";
import Computer from "./Computer.js";
import { permutator } from "../utilities/functions.mjs";

const nums = readFileSync(`day7input.txt`, 'utf-8').split(",");

// const nums = [3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,
// 27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5].map(String);

function partOne(){
    let maxAmp = Number.MIN_SAFE_INTEGER;
    const allPermutations = permutator([0,1,2,3,4]);

    for(let perm of allPermutations){
        const A = new Computer(nums,[perm[0],0]);
        const B = new Computer(nums,[perm[1],A.workTillEndAndDiagnose()]);
        const C = new Computer(nums,[perm[2],B.workTillEndAndDiagnose()]);
        const D = new Computer(nums,[perm[3],C.workTillEndAndDiagnose()]);
        const E = new Computer(nums,[perm[4],D.workTillEndAndDiagnose()]);
    
        const result = E.workTillEndAndDiagnose();
    
        if(result[result.length-1]>maxAmp){
            maxAmp=result[result.length-1];
        }
    }
    
    console.log(maxAmp);
}

function partTwo(){
    let maxAmp = Number.MIN_SAFE_INTEGER;
    const allPermutations = permutator([5,6,7,8,9]);

    const computers = [
        new Computer(nums,[9,0]),
        new Computer(nums,[8]),
        new Computer(nums,[7]),
        new Computer(nums,[6]),
        new Computer(nums,[5])
    ]
    let activeComputer=0;
    while(true){
        console.log(`active computer: ${['A','B','C','D','E'][activeComputer]}`,
        computers[activeComputer].inputs,
        computers[activeComputer].outputs,
        computers[activeComputer].opcode[computers[activeComputer].pointer]
        )
        computers[activeComputer].workOnce();
        
        if(computers[activeComputer].outputs.length===1 
            // || computers[activeComputer].opcode[computers[activeComputer].pointer]==='99'
            ){
            
            computers[(activeComputer+1)%5].inputs.push(computers[activeComputer].outputs.shift());
            // console.log(activeComputer,(activeComputer+1)%5)
            activeComputer=(activeComputer+1)%5;
        }
        if(computers[activeComputer].halted===true)
        // if(computers.every(a=>a.halted===true))
        {
            break;
        }
    }

    console.log(computers[4].outputs);

    
}

// partOne()
partTwo()