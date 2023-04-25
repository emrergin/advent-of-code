import { readFileSync } from "fs";

// const lines = readFileSync(`day10test.txt`, "utf-8")
const lines = readFileSync(`day10input.txt`, "utf-8")
    .split("\n")

const scores ={
    "}":1197,
    "]":57,
    ">":25137,
    ")":3
}

const scores2 ={
    "{":3,
    "[":2,
    "<":4,
    "(":1
}

function removeBrackets(string){
    const newString = string.replaceAll(/(\[\])|(\(\))|(\<\>)|(\{\})/g,"")
    if(newString===string){
        return newString; 
    }
    else{
        return removeBrackets(newString);
    }
}

function calculateScore1(string){
    const cleanedString = removeBrackets(string);
    var m = cleanedString.match(/(\])|(\))|(\})|(\>)/);
    if (m===null){return 0;}
    return scores[m[0][m[0].length-1]];
}

function calculateScore2(string){
    const cleanedString = removeBrackets(string);
    const score1 = calculateScore1(cleanedString);
    if (score1!==0){return 0;}
    const score2 = cleanedString.split("").reverse().reduce((acc,curr)=>acc*5+scores2[curr],0);
    return score2;
}


function partOne() {
    let counter = 0;
    for (let i = 0; i < lines.length; i++) {
        counter += calculateScore1(lines[i]);
    }
    console.log(counter);
}

function partTwo() {
    let scores = [];
    for (let i = 0; i < lines.length; i++) {
        scores.push(calculateScore2(lines[i]));
    }
    scores = scores.filter(a=>a!==0).sort((a,b)=>b-a);
    console.log(scores[((scores.length+1)/2)-1]);
}

partOne();
partTwo();