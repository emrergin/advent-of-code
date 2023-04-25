import { readFileSync } from "fs";
// let commands = readFileSync(`day5test.txt`, "utf-8")
let commands = readFileSync(`day5input.txt`, "utf-8")
    .split("\n").map(command =>findRow(command.slice(0,8))*8+findColumn( command.slice(-3)));

function findRow(string){
    let interval = 64;
    let result = 0;
    for(let i=0;i<string.length;i++){
        if (string[i]==="B"){
            result+=interval;
        }
        interval=interval/2;
    }
    return result;
}

function findColumn(string){
    let interval = 4;
    let result = 0;
    for(let i=0;i<string.length;i++){
        if (string[i]==="R"){
            result+=interval;
        }
        interval=interval/2;
    }
    return result;
}


function partOne(){
    console.log(Math.max(...commands));
}

function partTwo(){
    const allIds = commands.sort((a,b)=>b-a);
    for(let i=1;i<allIds.length;i++){
        if(allIds[i]===allIds[i-1]-2){
            console.log(allIds[i]+1)
        }
    }
}

partOne();
partTwo();