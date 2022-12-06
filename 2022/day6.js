import {readFileSync } from "fs";

let letters = readFileSync(`day6input.txt`, 'utf-8').split("");

function partOne(){    
    for(let i=0;i<letters.length;i++){
        if(i>2){
            let lastFour = new Set(letters.slice(i-3,i+1));
            if (lastFour.size===4){
                console.log(i+1);
                break;
            }
        }
    }
}

function partTwo(){
    for(let i=0;i<letters.length;i++){
        if(i>12){
            let lastFour = new Set(letters.slice(i-13,i+1));
            if (lastFour.size===14){
                console.log(i+1);
                break;
            }
        }
    }
}
partOne();
partTwo();