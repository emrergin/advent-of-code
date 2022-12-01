import {readFileSync } from "fs";

let lines = readFileSync(`day1input.txt`, 'utf-8')
                .split(`\n`).map(a=>+a).reduce(
                    (prev,curr)=>{
                        if(curr===0){
                            prev.push(0);
                        }
                        else{
                            prev[prev.length-1]+=curr;
                        }
                        return prev;
                    },[0]
                )

lines.sort((a,b)=>b-a);
console.log(lines[0]+lines[1]+lines[2]);