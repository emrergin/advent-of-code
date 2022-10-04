let numbersInOrder = [4,77,78,12,91,82,48,59,28,26,34,10,71,89,54,63,66,75,15,22,39,55,83,47,81,74,2,46,25,98,29,21,85,96,3,16,60,31,99,86,52,17,69,27,73,49,95,35,9,53,64,88,37,72,92,70,5,65,79,61,38,14,7,44,43,8,42,45,23,41,57,80,51,90,84,11,93,40,50,33,56,67,68,32,6,94,97,13,87,30,18,76,36,24,19,20,1,0,58,62];

import {readFileSync } from "fs";

let boards = readFileSync(`day4_boards.txt`, 'utf-8')
    .split("\n\n")
    .map(a=>a.split("\n")
            .map(b=>b
                .trim()
                .split(/[ ]{1,}/)
                .map(c=>+c)));

const scores = Array(boards.length).fill(``).map(()=>({v:Array(boards[0].length).fill(0),h:Array(boards[0].length).fill(0)}));

loop1:for(let num of numbersInOrder){
    for(let i=0;i<boards.length;i++){
        loop2:for(let j=0;j<boards[0].length;j++){
            for(let k=0;k<boards[0][0].length;k++){
                if(Math.max(...scores[i].v)===boards[0].length || Math.max(...scores[i].h)===boards[0][0].length){
                    continue loop2;
                }
                if(boards[i][j][k]===num){

                    (scores[i].v)[j]++;
                    (scores[i].h)[k]++;
                    boards[i][j][k]=`_`
                    if(Math.max(...scores[i].v)===boards[0].length || Math.max(...scores[i].h)===boards[0][0].length){
                        const sumOfUnmarked = boards[i].map(a=>a.map(b=>b==='_'?0:b))
                                                        .map(a=>a.reduce((prev,curr)=>prev+curr,0))
                                                        .reduce((prev,curr)=>prev+curr,0);
                        console.log(num*sumOfUnmarked)
                    }
                    continue loop2;
                }
            }
        }

    }
}

