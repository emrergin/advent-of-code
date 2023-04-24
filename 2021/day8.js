import { readFileSync } from "fs";

// const lines = readFileSync(`day8test.txt`, "utf-8").split("\n")
const lines = readFileSync(`day8input.txt`, "utf-8").split("\n")

function findNumbers(string){
    const numberMap = new Map();
    const allDigitCodes = string.split(" ");
    const one=allDigitCodes.find(a=>a.length===2);
    numberMap.set(one.split("").sort().join(""),1);
    const seven =allDigitCodes.find(a=>a.length===3);
    numberMap.set(seven.split("").sort().join(""),7);
    const four=allDigitCodes.find(a=>a.length===4);
    numberMap.set(four.split("").sort().join(""),4);
    const eight=allDigitCodes.find(a=>a.length===7);
    numberMap.set(eight.split("").sort().join(""),8);
    const twoOrThreeOrFive = allDigitCodes.filter(a=>a.length===5);
    const nineOrSixOrZero = allDigitCodes.filter(a=>a.length===6);

    let outerCount = [0,0,0];
    for(let i=0;i<3;i++){
        let count=0;
        for(let j=0;j<3;j++){
            if(removeAllLettersExceptOne(nineOrSixOrZero[j],twoOrThreeOrFive[i]).length===1){
                count++;
                outerCount[j]++;
            }
        }
        if(count===1){
            numberMap.set(twoOrThreeOrFive[i].split("").sort().join(""),3);
        }else if(count===0){
            numberMap.set(twoOrThreeOrFive[i].split("").sort().join(""),2);
        }else{
            numberMap.set(twoOrThreeOrFive[i].split("").sort().join(""),5);
        }
    }

    numberMap.set(nineOrSixOrZero[outerCount.findIndex(a=>a===2)].split("").sort().join(""),9);
    numberMap.set(nineOrSixOrZero[outerCount.findIndex(a=>a===1)].split("").sort().join(""),6);
    numberMap.set(nineOrSixOrZero[outerCount.findIndex(a=>a===0)].split("").sort().join(""),0);
    return numberMap;
}

function removeAllLettersExceptOne(startingString, substringToRemove){
    return startingString.split("").filter(a=>!(substringToRemove.includes(a))).join("");
}

function parseOutput2(digitMap,output){
    const result = Number(output.split(" ").map(a=>digitMap.get(a.split("").sort().join(""))).join(""));
    console.log(digitMap)
    console.log(output.split(" "))
    return result;
}

function parseOutput1(output){
    return output.split(" ").filter(a=>(a.length===2 ||a.length===3 || a.length===7||a.length===4)).length;

}

function partOne(){

    let counter=0;
    for(let i=0;i<lines.length;i++){
        counter+=parseOutput1(lines[i].split("|")[1].trim());
    }    
    console.log(counter);
}

function partTwo(){
    let counter=0;
    for(let i=0;i<lines.length;i++){
        const relevantMap = findNumbers(lines[i].split("|")[0].trim());

        counter+=parseOutput2(relevantMap,lines[i].split("|")[1].trim());
    }    
    console.log(counter);
}