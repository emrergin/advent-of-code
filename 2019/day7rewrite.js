import {readFileSync } from "fs";
import Computer from "./Computer.js";
import { permutator } from "../utilities/functions.mjs";

const nums = readFileSync(`day7input.txt`, 'utf-8').split(",");

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
}


partTwo()