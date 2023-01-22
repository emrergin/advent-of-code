import {readFileSync } from "fs";

const allEdges = new Set();
const commands = readFileSync(`day16input.txt`, 'utf-8').split("\n")
// const commands = readFileSync(`day16test.txt`, 'utf-8').split("\n")
    .map(a=>[a.match(/[A-Z]{2}/g),a.match(/[0-9]{1,2}/g)]);


let vertices = commands.map(a=>[a[0][0],+a[1]]);


const n = vertices.length;
commands.map(a=>a[0]).flatMap(b=>b
    .reduce((acc,curr,index,array)=>{
        if(index>0){
            acc.push([array[0],curr])
        }
        return acc;
    },[])).forEach(a=>allEdges.add(`${a[0]}-${a[1]}`));

function floydWarshall(){
    let A_k_1 = Array(n).fill().map(() =>  Array(n));
    let A_k = Array(n).fill().map(() =>  Array(n));
    
    for(let v=0;v<n;v++){
        for(let w=0;w<n;w++){
            if(v===w){
                A_k_1[v][w]=0;
            }else{
                if (allEdges.has(`${vertices[v][0]}-${vertices[w][0]}`)){
                    A_k_1[v][w]=1;
                }
                else{
                    A_k_1[v][w]=Infinity;
                }
            }
        }
    }
    
    for (let k=1;k<=n;k++){
        for(let v=0;v<n;v++){
            for(let w=0;w<n;w++){
                A_k[v][w]=Math.min(A_k_1[v][w],A_k_1[v][k-1]+A_k_1[k-1][w]);
            }
        }
        A_k_1=A_k;
    }  
    
    const allPairShortestPaths =  new Map();
    
    for(let i=0;i<A_k.length;i++){
        for(let j=0;j<A_k.length;j++){
            allPairShortestPaths.set(`${vertices[i][0]}-${vertices[j][0]}`,A_k[i][j])
        }  
    }

    return allPairShortestPaths;
}

const allPairShortestPaths=floydWarshall();


for (let i=0;i<vertices.length;i++){
    vertices[i]={self:vertices[i][0],rate:vertices[i][1],active:false,valueTillEnd:-Infinity,nextVertices:commands[i][0].slice(1)}
    if(vertices[i].rate===0){
        vertices[i].active=true;
    }
}


function findBest(loc, rem){
    const relatedVertices = vertices.filter(a=>!a.active);
    for (let vertex of relatedVertices){
        const timeToOpen = allPairShortestPaths.get(`${loc.self}-${vertex.self}`)+1;
        const remainingTime = rem-timeToOpen;
        vertex.valueTillEnd=+vertex.rate*remainingTime;
        vertex.timeToOpen=timeToOpen;
    }
    const targetLocation = vertices.filter(a=>!a.active).sort((a,b)=>b.valueTillEnd-a.valueTillEnd)[0];
    return targetLocation;
}

function moveOrOpen(loc,targetLocation){
    if(loc.self===targetLocation.self && loc.active===false){
        targetLocation.active=true;
        return loc;
    }
    else{
        const neighbouringVertices = loc.nextVertices;
        let minimumDistance = Infinity;
        let relatedVertex=null;
        for(let i=0;i<neighbouringVertices.length;i++){
            let currentDistance = allPairShortestPaths.get(`${neighbouringVertices[i]}-${targetLocation.self}`);
            if(currentDistance<minimumDistance){
                minimumDistance=currentDistance;
                relatedVertex=neighbouringVertices[i];
            }
        }
        relatedVertex = vertices.find(a=>a.self===relatedVertex);
        return relatedVertex;
    }
}

let valuesA = Array(n).fill().map(() =>  Array(30));

let zeroVertices=vertices.filter(a=>a.rate===0).map(a=>a.self);
let nonZeroVertices = vertices.filter(a=>a.rate>0).map(a=>a.self);

function getAllSubsets(array) {
    const activeVertices = [new Set(zeroVertices)];
    
    for (const el of array) {
        const last = activeVertices.length-1;
        for (let i = 0; i <= last; i++) {
            const copySet = structuredClone(activeVertices[i]).add(el);
            activeVertices.push( copySet );
        }
    }
    
    return activeVertices;
}

const allSubsets=getAllSubsets(nonZeroVertices);



// console.log(calculateTotalValueTillEnd(new Set(["AA","JJ"]),30))


// for(let v=0;v<n;v++){
//     for(let w=0;w<30;w++){
//         if(w===0){
//             valuesA[v][w]=0;
//             activeVertices[v][w]=[];
//         }
//         if(w===1){
//             valuesA[v][w]=vertices[v].rate;
//             activeVertices[v][w]=activeVertices[v][w-1].push(vertices[v]);
//         }
//     }
// }

// console.log(valuesA)

// let totalPressure=0;
// let remainingMinutes = 30;
// let currentLocation = vertices.find(a=>a.self==="AA");
// let targetLocation=null;


// while (remainingMinutes>0 && vertices.filter(a=>!a.active).length>0){
//     addPressure();
//     targetLocation = findBest(currentLocation,remainingMinutes);
//     currentLocation = moveOrOpen(currentLocation,targetLocation);
//     remainingMinutes--;
// }
// console.log(totalPressure);

// function addPressure(){
//     totalPressure+=vertices.filter(a=>a.active).reduce((acc,curr)=>acc+curr.rate,0);
// }

function calculateValueForState(time,subset,location){
    // console.log(time,subset,location,"-----------");
    if(time===0){
        return 0;
    }
    // if(time===1){
    //     return calculateTotalValueTillEnd(subset,time);
    // }
    const valvesToBeActivated = vertices.filter(a=>!subset.has(a.self));
    const valvesThatCouldBeReached = valvesToBeActivated.filter(
        a=>allPairShortestPaths.get(`${location}-${a.self}`)<time-1
        )
    let maxValue = calculateTotalValueTillEnd(subset,time);
    for(let valve of valvesThatCouldBeReached){
        const timeToOpen = allPairShortestPaths.get(`${location}-${valve.self}`)+1;
        maxValue=Math.max(maxValue,
            calculateValueForState(time-timeToOpen,structuredClone(subset).add(valve.self),valve.self)
            +calculateTotalValueTillEnd(subset,timeToOpen)
        );
    }
    // console.log(time,subset,location,maxValue);
    return(maxValue);
}

function calculateTotalValueTillEnd(subset,remainingMinutes){
    return vertices.filter(a=>subset.has(a.self)).reduce((acc,curr)=>acc+curr.rate,0)*remainingMinutes;
}

console.log(calculateValueForState(30,allSubsets[0],"AA"));