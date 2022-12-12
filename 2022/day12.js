import {readFileSync } from "fs";
const commands = readFileSync(`day12input.txt`, 'utf-8').split("\n").map(a=>a.split(""));

const numX=commands[0].length;
const numY=commands.length;

class Tile{
    constructor(letter,x,y){
        this.letter=letter;
        this.explored=false;
        this.x=x;
        this.y=y;
        this.distance=Infinity;
        this.neighbours=[];
    }
}

function controlNeighbourToAdd(xx,yy,currentLetter){
    if(xx>=numX){return false;}
    if(xx<0){return false;}
    if(yy>=numY){return false;}
    if(yy<0){return false;}
    const targetLetter = commands[yy][xx];
    if(currentLetter==="z" || targetLetter==="a"){
        return true;
    }
    if(targetLetter==="E"){
        return false;
    }
    if(targetLetter.charCodeAt(0)-currentLetter.charCodeAt(0)>1){
        return false;
    }
    return true;
}

function findDistanceFrom(tarX,tarY){
    const tileMap = new Map();

    for (let y=0;y<commands.length;y++){
        for (let x=0;x<commands[0].length;x++){
            const tile = new Tile(commands[y][x],x,y);
            controlNeighbourToAdd(x+1,y,commands[y][x]) && tile.neighbours.push(`x:${x+1}-y:${y}`);
            controlNeighbourToAdd(x-1,y,commands[y][x])&& tile.neighbours.push(`x:${x-1}-y:${y}`);
            controlNeighbourToAdd(x,y+1,commands[y][x]) && tile.neighbours.push(`x:${x}-y:${y+1}`);
            controlNeighbourToAdd(x,y-1,commands[y][x]) && tile.neighbours.push(`x:${x}-y:${y-1}`);
            tileMap.set(`x:${x}-y:${y}`,tile);
        }
    }

    let queue =[];
    queue.push(tileMap.get(`x:${tarX}-y:${tarY}`));
    tileMap.get(`x:${tarX}-y:${tarY}`).distance=0;
    tileMap.get(`x:${tarX}-y:${tarY}`).explored=true;
    while(queue.length>0){
        let v=queue.shift();
        let currentNeighbours = v.neighbours.map(a=>tileMap.get(a));
        for(let w of currentNeighbours){
            if(!w.explored){
                w.explored=true;
                w.distance=v.distance+1;
                queue.push(w);
            }
        }
    }
    
    let resultingDistance;
    tileMap.forEach((v)=>{
        if(v.letter==="E"){
            resultingDistance= v.distance;
        }
    })
    return resultingDistance;
}

function partOne(){
    const startingPoints=[];
    for (let y=0;y<commands.length;y++){
        for (let x=0;x<commands[0].length;x++){
            if(commands[y][x]==="S"){
                startingPoints.push({x,y});
            }
        }
    }

    const result = startingPoints.map(a=>findDistanceFrom(a.x,a.y)).sort((a,b)=>a-b)[0];
    console.log(result);
}

function partTwo(){
    const startingPoints=[];
    for (let y=0;y<commands.length;y++){
        for (let x=0;x<commands[0].length;x++){
            if(commands[y][x]==="S" || commands[y][x]==="a"){
                startingPoints.push({x,y});
            }
        }
    }
    
    const result = startingPoints.map(a=>findDistanceFrom(a.x,a.y)).sort((a,b)=>a-b)[0];
    console.log(result);    
}

partOne();
partTwo();

