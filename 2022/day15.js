import {readFileSync } from "fs";

const existingBeacons = new Set();
const existingSensors = new Set();
// const commands = readFileSync(`day15test.txt`, 'utf-8').split("\n")
const commands = readFileSync(`day15input.txt`, 'utf-8').split("\n")
    .map(a=>[a.match(/x=-*\d+/g),a.match(/y=-*\d+/g)].map(b=>b.map(c=>+c.split("=")[1])))
    .map(a=>({sensor:{x:a[0][0],y:a[1][0]},closestBeacon:{x:a[0][1],y:a[1][1]}}))
    .map(a=>({...a,distance:manhattanDistance(a.sensor,a.closestBeacon)}));
    // .map(a=>)
commands.forEach(a=>{
    // existingBeacons.add(`x-${a.sensor.x},y-${a.sensor.y}`);
    existingBeacons.add(`x-${a.closestBeacon.x},y-${a.closestBeacon.y}`);
    existingSensors.add(`x-${a.sensor.x},y-${a.sensor.y}`);
})

let maxX=Math.max(...commands.flatMap(b=>b.sensor.x+b.distance));
let minX=Math.min(...commands.flatMap(b=>b.sensor.x-b.distance));
let maxY=Math.max(...commands.flatMap(b=>b.sensor.y+b.distance));
let minY=Math.min(...commands.flatMap(b=>b.sensor.y-b.distance));

// console.log(maxX-minX);

// console.log(commands[0]);

function manhattanDistance(f,t){
    return (Math.abs(f.x-t.x)+Math.abs(f.y-t.y));
}

function partOne(){
    let yToCheck=2000000;
    let counter=0;
    for(let i=minX;i<maxX;i++){
        for(let command of commands){
            // console.log(`x`,i,`thisDistance`,manhattanDistance({x:i,y:10},command.sensor),`comparedDistance`,command.distance);
            if((manhattanDistance({x:i,y:yToCheck},command.sensor)<=command.distance && !existingBeacons.has(`x-${i},y-${yToCheck}`)||
                existingSensors.has(`x-${i},y-${yToCheck}`))){
                counter++;
                break;            
            }
        }
    }

    console.log(counter);
}

function partTwo(){
    const notAvailableCells= new Set();
    commands.forEach(a=>paintForBeacon(a));
    outerloop: for(let i=0;i<4000000;i++){
        console.log(i);
        for(let j=0;j<4000000;j++){
            if(notAvailableCells.has(`x-${i},y-${j}`)){
                    continue;
            }   
            console.log(`x`,i,`y`,j,i*4000000+j);
            break outerloop; 
        }
    }
   

    
    function paintForBeacon(com){
        console.log(com)
        for(let i=com.sensor.x-com.distance;i<com.sensor.x+com.distance;i++){
            for(let j=com.sensor.y-com.distance;j<com.sensor.y+com.distance;j++){
                if(notAvailableCells.has(`x-${i},y-${j}`)){continue;}
                const currentDistance = manhattanDistance({x:i,y:j},com.sensor);
                if(currentDistance<=com.distance || 
                    existingBeacons.has(`x-${i},y-${j}`) ||
                    existingSensors.has(`x-${i},y-${j}`)
                ){
                    notAvailableCells.add(`x-${i},y-${j}`);
                }
            }
        }
    }
    // console.log(notAvailableCells)
}

partTwo();