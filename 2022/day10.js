import {readFileSync } from "fs";
const commands = readFileSync(`day10input.txt`, 'utf-8')
    .split("\n")
    .map(a=>a.split(" "))
    .map(a=>[a[0],a[1]? +a[1]:null])

const xCoordinates = commands.reduce((acc,curr)=>{
    acc.push(0);
    if(curr[1]){
        acc.push(curr[1]);
    }
    return acc;
},[1]);

function partOne(){
    const signal1 = (xCoordinates.slice(0,20).reduce((acc,curr)=>acc+curr,0))*20;
    const signal2 = (xCoordinates.slice(0,60).reduce((acc,curr)=>acc+curr,0))*60;
    const signal3 = (xCoordinates.slice(0,100).reduce((acc,curr)=>acc+curr,0))*100;
    const signal4 = (xCoordinates.slice(0,140).reduce((acc,curr)=>acc+curr,0))*140;
    const signal5 = (xCoordinates.slice(0,180).reduce((acc,curr)=>acc+curr,0))*180;
    const signal6 = (xCoordinates.slice(0,220).reduce((acc,curr)=>acc+curr,0))*220;
    console.log(signal1+signal2+signal3+signal4+signal5+signal6);
}

function partTwo(){
    let xregister=0;
    for(let i=0;i<6;i++){
        let row='';
        for(let j=0;j<40;j++){
            xregister+=xCoordinates[i*40+j];
            if(xregister-j<2&&xregister-j>-2){
                row+='⬛';
            }else{
                row+='⬜';
            }            
        }
        console.log(row);
    }
}

partOne();
partTwo();