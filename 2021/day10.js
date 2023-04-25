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
    console.log(m[0][m[0].length-1],scores[m[0][m[0].length-1]])
    return scores[m[0][m[0].length-1]];
}


function partOne() {
    let counter = 0;
    for (let i = 0; i < lines.length; i++) {
        counter += calculateScore1(lines[i]);
    }
    console.log(counter);
}

partOne();