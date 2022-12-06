import {readFileSync } from "fs";
import Computer from "./Computer.js";

const nums = readFileSync(`day5input.txt`, 'utf-8').split(",");

function partOne(){
    let input=structuredClone(nums);

    const comp = new Computer(input,[1]);
    console.log(comp.workTillEndAndDiagnose());

}

function partTwo(){
    let input=structuredClone(nums);

    const comp = new Computer(input,[5]);
    console.log(comp.workTillEndAndDiagnose());

}

partOne();
partTwo();