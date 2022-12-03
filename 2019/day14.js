import {readFileSync } from "fs";

const processes = new Map();
readFileSync(`day14input.txt`, 'utf-8')
                .split(`\n`).map(a=>a.split('=>'))
                .map(a=>a.map(b=>b.trim().split(',')))
                .forEach(a=>{
                    const inputMap = new Map();
                    const [qty,item] = a[1][0].split(" ");
                    a[0].map(b=>b.trim().split(",").map(c=>c.split(" ")).forEach(d=>inputMap.set(d[1],+d[0])));
                    processes.set(item, {qty:+qty, inputs: inputMap})
                })

function convertOutputIntoInputs(output,needs,present){
    const neededAmount = needs.get(output);
    const presentAmount = present.get(output);
    const producedInOneGo = processes.get(output).qty;

    if (presentAmount>=neededAmount){
        needs.set(output,0);
        present.set(output,presentAmount-neededAmount);
    }
    else{
        const notExisting = neededAmount-presentAmount;
        const numberOfCycles = Math.ceil(notExisting/producedInOneGo);
        needs.set(output,0);
        present.set(output,(numberOfCycles*producedInOneGo)-notExisting);
        processes.get(output).inputs.forEach((v,k)=>needs.set(k,needs.get(k)+(v*numberOfCycles)));
    }
}

function productionLoop(needs,present){
    let willBeBroken = true;
    needs.forEach((v,k)=>{
        if(k!=="ORE" && needs.get(k)>0){
            convertOutputIntoInputs(k,needs,present);
            willBeBroken=false;
        }
        if(needs.get(k)<0){
            present.set(needs.get(k));
            needs.set(k,0)
        }
    })
    return willBeBroken;
}

function partOne(){
    const needs = new Map();
    const present = new Map();
    processes.forEach((v,k)=>{
        needs.set(k,0);
        present.set(k,0);
    });
    needs.set("ORE",0);
    present.set("ORE",0);
    needs.set("FUEL",1);

    convertOutputIntoInputs("FUEL",needs,present);

    while (true){
        const toBeBroken = productionLoop(needs,present);
        if (toBeBroken){break;}
    }

    console.log(needs.get("ORE"));
}

function produceFuel(num){
    const needs = new Map();
    const present = new Map();
    processes.forEach((v,k)=>{
        needs.set(k,0);
        present.set(k,0);
    });
    needs.set("ORE",0);
    present.set("ORE",0);
    needs.set("FUEL",num);
    convertOutputIntoInputs("FUEL",needs,present);
    while (true){
        const toBeBroken = productionLoop(needs,present);
        if (toBeBroken){break;}
    }
    return needs.get("ORE");
}

function partTwo(startingFuel){
    let currentValue = startingFuel;
    let diff = startingFuel/2;
    let upper=2*currentValue,lower=0;
    let lastChange,thisChange;
    while(true){
        if(produceFuel(currentValue)>1000000000000){
            upper=currentValue;
            currentValue=Math.round(currentValue-diff);
            thisChange=-1;
        }
        else{
            lower=Math.max(currentValue,lower);
            currentValue=Math.round(currentValue+diff);
            thisChange=1
        }
        if (lastChange===thisChange){
            diff=2*diff;
        }
        else{
            diff=diff/2;
        }
        lastChange=thisChange;
        if(upper===lower+1){
            break;
        }
        
    }
    console.log(lower);
}

let startingFuel=13000000;
partTwo(startingFuel);