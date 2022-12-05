import {readFileSync } from "fs";

let lines = readFileSync(`day3input.txt`, 'utf-8')
                .split('\n').map(a=>a.split("").map(a=>{if(a==='#'){return 1;}else{return 0;}}));

function findTrees(slopX,slopY){
    let xCor=0;
    let yCor=0;
    let treesCounter=0;
    
    for(let i=0;i<lines.length;i++){
        if(xCor>lines.length){break;}
        treesCounter+=lines[xCor][yCor%(lines[0].length)];
        xCor+=slopX;
        yCor+=slopY;
    }
    return(treesCounter);
}

console.log(findTrees(1,3)*findTrees(1,1)*findTrees(1,5)*findTrees(1,7)*findTrees(2,1));