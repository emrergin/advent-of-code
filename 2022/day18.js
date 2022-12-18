import {readFileSync } from "fs";
// const commands = readFileSync(`day18test.txt`, 'utf-8').split("\n")
const commands = readFileSync(`day18input.txt`, 'utf-8').split("\n")
    .map(a=>a.split(",").map(Number));

function partOne(){
    let total = 6*commands.length;
    
    function distanceBetweenCubes(cube1,cube2){
        return Math.sqrt(Math.abs(cube1[0]-cube2[0])+Math.abs(cube1[1]-cube2[1])+Math.abs(cube1[2]-cube2[2]));
    
    }
    for (let i=0;i<commands.length;i++){
        for (let j=i+1;j<commands.length;j++){
            const temp = distanceBetweenCubes(commands[i],commands[j]);
            if(temp<=1){
                total-=2;
            }
        }
    }
    
    console.log(total);

}