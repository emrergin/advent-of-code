import { readFileSync } from "fs";

const lines = readFileSync(`day9input.txt`, "utf-8").split("\n").map(a=>a.split("").map(Number))
// const lines = readFileSync(`day9test.txt`, "utf-8").split("\n").map(a=>a.split("").map(Number))

function partOne(){

    let counter =0;
    for(let i=0;i<lines.length;i++){
        for(let j=0;j<lines[0].length;j++){
            if(
                (i===0 || lines[i-1][j]>lines[i][j]) && 
                (j===0|| lines[i][j-1]>lines[i][j] ) &&
                (i===lines.length-1 || lines[i+1][j]>lines[i][j]) &&
                (j===lines[0].length-1|| lines[i][j+1]>lines[i][j] )){
                    console.log(lines[i][j])
                    counter+=1+lines[i][j];
            }
        }
    }
    
    console.log(counter)
}