import {readFileSync } from "fs";

const commands = readFileSync(`day8input.txt`, 'utf-8').split("\n").map(a=>a.split("").map(Number));

const example = [
    [3,0,3,7,3],
    [2,5,5,1,2],
    [6,5,3,3,2],
    [3,3,5,4,9],
    [3,5,3,9,0]
];
function checkIfVisible(xCor,yCor,inputs){
    const currentVal = inputs[yCor][xCor];
    let checks1=true,checks2=true,checks3=true,checks4=true;
    let i=1,j=1,k=1,l=1;
    while(i+xCor<=inputs[0].length-1){
        if(inputs[yCor][xCor+i]>=currentVal){
            checks1= false;
        }
        i++;
    }
    while(xCor-j>=0){
        if(inputs[yCor][xCor-j]>=currentVal){
            checks2= false;
        }
        j++;
    }
    while(k+yCor<=inputs.length-1){
        if(inputs[yCor+k][xCor]>=currentVal){
            checks3= false;
        }
        k++;
    }
    while(yCor-l>=0){
        if(inputs[yCor-l][xCor]>=currentVal){
            checks4= false;
        }
        l++;
    }
    return checks1||checks2||checks3||checks4;
}

function countVisibleTrees(xCor,yCor,inputs){
    const currentVal = inputs[yCor][xCor];
    let i=1,j=1,k=1,l=1;
    while(i+xCor<inputs[0].length-1&&inputs[yCor][xCor+i]<currentVal){
        i++;
    }
    while(xCor-j>0 && inputs[yCor][xCor-j]<currentVal){
        j++;
    }
    while(k+yCor<inputs.length-1&&inputs[yCor+k][xCor]<currentVal){
        k++;
    }
    while(yCor-l>0&&inputs[yCor-l][xCor]<currentVal){
        l++;
    }

    if(xCor===0||xCor===inputs[0].length-1||yCor===0||yCor===inputs[0].length-1){return 0;}
    return i*j*k*l;
}

function partOne(comm){

    let counter=0;
    for (let y=0;y<comm.length;y++){
        for (let x=0;x<comm[0].length;x++){
            if(checkIfVisible(x,y,comm)){
                counter++;
            }
        }
    }
    console.log(counter);
}

function partTwo(comm){

    let max=-Infinity;
    for (let y=0;y<comm.length;y++){
        for (let x=0;x<comm[0].length;x++){
            const trees = countVisibleTrees(x,y,comm);
            if(trees>max){
                max=trees;
            }
        }
    }
    console.log(max);
}

partTwo(commands);