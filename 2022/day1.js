import {readFileSync } from "fs";

let lines = readFileSync(`day1input.txt`, 'utf-8')
                .split(`\n`).map(a=>+a).reduce(
                    (acc,curr)=>{
                        if(curr===0){
                            acc.push(0);
                        }
                        else{
                            acc[acc.length-1]+=curr;
                        }
                        return acc;
                    },[0]
                )

lines.sort((a,b)=>b-a);
console.log("Part 1: ",lines[0]);
console.log("Part 2: ",lines[0]+lines[1]+lines[2]);