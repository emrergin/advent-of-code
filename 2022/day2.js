import {readFileSync } from "fs";

let lines = readFileSync(`day2input.txt`, 'utf-8')
                .split(`\n`);


function firstPart(){
    const points = lines.reduce((acc,curr)=>acc+calculatePoint(curr),0);
    console.log(points);
    function calculatePoint(tuple){
        let result='win';
        let score=0;
        const pair=tuple.split(" ");
        
        if ((pair[0]==="A"&& pair[1]==="Z")||(pair[0]==="B"&& pair[1]==="X")||(pair[0]==="C"&& pair[1]==="Y")){
            result='loss';
        }
        if ((pair[0]==="A"&& pair[1]==="X")||(pair[0]==="B"&& pair[1]==="Y")||(pair[0]==="C"&& pair[1]==="Z")){
            result='draw';
        }
        if(pair[1]==="X"){
            score+=1;
        }
        if(pair[1]==="Y"){
            score+=2;
        }
        if(pair[1]==="Z"){
            score+=3;
        }
        if(result==='win'){
            score+=6;
        }
        if(result==='draw'){
            score+=3;
        }
        return score;
    }
}

function secondPart(){
    const points = lines.reduce((acc,curr)=>acc+calculatePoint(curr),0);
    console.log(points);
    function calculatePoint(tuple){
        let score=0;
        const pair=tuple.split(" ");
        if(pair[1]==="Y"){
            score+=3;
        }
        if(pair[1]==="Z"){
            score+=6;
        }
        if(pair[1]==="Z"){
            if(pair[0]==="A"){
                score+=2;
            }
            if(pair[0]==="B"){
                score+=3;
            }
            if(pair[0]==="C"){
                score+=1;
            }
        }
        if(pair[1]==="Y"){
            if(pair[0]==="A"){
                score+=1;
            }
            if(pair[0]==="B"){
                score+=2;
            }
            if(pair[0]==="C"){
                score+=3;
            }
        }
        if(pair[1]==="X"){
            if(pair[0]==="A"){
                score+=3;
            }
            if(pair[0]==="B"){
                score+=1;
            }
            if(pair[0]==="C"){
                score+=2;
            }
        }
        return score;
    }
}

firstPart();
secondPart();