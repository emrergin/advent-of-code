import {readFileSync } from "fs";

let lines = readFileSync(`day4input.txt`, 'utf-8')
                .split(`\n`).map(a=>a.split(",").flatMap(c=>c.split("-").map(d=>+d)));

function checkLine1(line){
    return (line[0]<=line[2]&&line[1]>=line[3])||(line[2]<=line[0]&&line[3]>=line[1]);
}

function checkLine2(line){
    return (line[2]<=line[1]&&line[0]<=line[3])||(line[0]<=line[3]&&line[2]<=line[1]);
}

function partOne(){
    let finalCounter=0;
    lines.forEach(a=>{
        finalCounter+=checkLine1(a);
    })
    console.log('part 1: ',finalCounter);
}

function partTwo(){
    let finalCounter=0;
    lines.forEach(a=>{
        finalCounter+=checkLine2(a);
    })
    console.log('part 2: ',finalCounter);
}

partOne();
partTwo();