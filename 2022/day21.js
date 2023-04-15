import { readFileSync } from "fs";
// let commands = readFileSync(`day21test.txt`, "utf-8")
let commands = readFileSync(`day21input.txt`, "utf-8")
    .split("\n").map(a=>a.split(':')).map(a=>[a[0],a[1].trim().split(" ")]);

    
commands.sort((a,b)=>a[1].length-b[1].length);
    
function partOne(){
        
    const mapOfValues = new Map();
    while(mapOfValues.get('root')===undefined){
        for(let command of commands){
            if(command[1].length===1){
                mapOfValues.set(command[0],Number(command[1]));
            }
            else{
                const term1 = mapOfValues.get(command[1][0]);
                const term2 = mapOfValues.get(command[1][2]);
                if(term1 && term2){
                    if(command[1][1]==='+'){
                        mapOfValues.set(command[0],term1+term2);                        
                    }
                    if(command[1][1]==='-'){
                        mapOfValues.set(command[0],term1-term2);                    
                    }
                    if(command[1][1]==='*'){
                        mapOfValues.set(command[0],term1*term2);                
                    }
                    if(command[1][1]==='/'){
                        mapOfValues.set(command[0],term1/term2);
                    }
                }
            }
        }
    }
    
    console.log(mapOfValues.get("root"));
}

function autoYeller(value){
    const mapOfValues = new Map();
    let commandCopy = [...commands];
    while(mapOfValues.get('root')===undefined){
        for(let command of commandCopy){
            if(command[1].length===1){
                if(command[0]==="humn"){
                    mapOfValues.set(command[0],value);
                }else{
                    mapOfValues.set(command[0],Number(command[1][0]));
                }
            }
            else{
                const term1 = mapOfValues.get(command[1][0]);
                const term2 = mapOfValues.get(command[1][2]);
                if(term1!==undefined && term2!==undefined){
                    if(command[0]==="root"){
                        mapOfValues.set(command[0],term1-term2);    
                    }else{

                        if(command[1][1]==='+'){
                            mapOfValues.set(command[0],term1+term2);                        
                        }
                        if(command[1][1]==='-'){
                            mapOfValues.set(command[0],term1-term2);                    
                        }
                        if(command[1][1]==='*'){
                            mapOfValues.set(command[0],term1*term2);                
                        }
                        if(command[1][1]==='/'){
                            mapOfValues.set(command[0],term1/term2);
                        }
                    }
                }
            }
        }
        commandCopy=commandCopy.filter(a=>mapOfValues.get(a[0])===undefined);
    }
    
    return mapOfValues.get("root");
}

function bruteForce(val,step){
    let i=val;
    while(true){
        const currentYellResult = autoYeller(i);
        if (i%10000===0){
            console.log(i,currentYellResult);
            }
        if(currentYellResult===0){
            console.log('I should yell: ',i);
            break;
        }
        if(currentYellResult>0){
            // break;
        }else{
            break;
        }
        i=i+step;
    
    }
}


function optimizationAttempt(){
    let i=0;
    let maxPositive=-Infinity;
    let minNegative=Infinity;
    let movement=1;
    let lastMovement = 'up';
    while(true){
        const currentYellResult = autoYeller(i);
        if(currentYellResult===0){
            console.log('I should yell: ',i);
            break;
        }
        if(currentYellResult<0){
            
            maxPositive=Math.max(i,maxPositive);
            if(lastMovement==="down"){
                movement=2*movement;
            }else{                
                movement=Math.ceil(movement/3);
            }
            lastMovement = 'down';
            i=Math.max(i-movement,0);
        }
        else{
            minNegative=Math.min(i,minNegative);
            if(lastMovement==="up"){
                movement=2*movement;                
            }else{
                movement=Math.floor(movement/3);
            }
            i=i+movement;
            lastMovement = 'up';

        }
    }
}

optimizationAttempt();