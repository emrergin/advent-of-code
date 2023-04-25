import { readFileSync } from "fs";
// let commands = readFileSync(`day5test.txt`, "utf-8")
let commands = readFileSync(`day6input.txt`, "utf-8")
    .split("\n\n").map(a=>a.split("\n"))

function partOne(){
    let result = commands.map(a=>new Set(a.flatMap(a=>a.split(""))).size).reduce((acc,curr)=>acc+curr,0);
    console.log(result);
}

function partTwo(){
    let counter=0;
    for(let i=0;i<commands.length;i++){
        let currentArray = commands[i][0].split("");
        for(let j=1;j<commands[i].length;j++){
            currentArray = currentArray.filter(a=>commands[i][j].split("").includes(a))
        }
        counter +=currentArray.length;
    }
    console.log(counter);
}

partOne();
partTwo();
