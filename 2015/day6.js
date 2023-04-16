import { readFileSync } from "fs";

const commands = readFileSync(`day6input.txt`, "utf-8").split("\n");

const grid = Array(1000).fill().map(() => Array(1000).fill(0));

function parseCommand(command){
    const commandArray = command.split(" ");
    const indexTh = commandArray.findIndex(a=>a==="through");
    const commandObj = {
        type: commandArray.slice(0,indexTh-1).join(""),
        x1: commandArray[indexTh-1].split(",")[0],
        y1: commandArray[indexTh-1].split(",")[1],
        x2: commandArray[indexTh+1].split(",")[0],
        y2: commandArray[indexTh+1].split(",")[1]
    }
    commandObj.x1 = Math.min(commandObj.x1,commandObj.x2);
    commandObj.x2 = Math.max(commandObj.x1,commandObj.x2);
    commandObj.y1 = Math.min(commandObj.y1,commandObj.y2);
    commandObj.y2 = Math.max(commandObj.y1,commandObj.y2);
    return commandObj;
}


function actOnCommand(command){
    const currentCommand = parseCommand(command);

    for(let x=currentCommand.x1;x<=currentCommand.x2;x++){
        for(let y=currentCommand.y1;y<=currentCommand.y2;y++){
            switch (currentCommand.type){
                case "turnon":
                    grid[x][y]=1;
                    break;
                case "turnoff":
                    grid[x][y]=0;
                    break;
                case "toggle":
                    grid[x][y]=grid[x][y]=== 1? 0:1;
                    break;
            }
        }
    }
}

function applyAllCommands1(){
    for(let i=0;i<commands.length;i++){
        actOnCommand(commands[i]);
    }
    let counter=0;
    for(let x=0;x<1000;x++){
        for(let y=0;y<1000;y++){
            if(grid[x][y]===1){
                counter++;
            }
    }}
    console.log(counter);
}


function actOnCommand2(command){
    const currentCommand = parseCommand(command);

    for(let x=currentCommand.x1;x<=currentCommand.x2;x++){
        for(let y=currentCommand.y1;y<=currentCommand.y2;y++){
            switch (currentCommand.type){
                case "turnon":
                    grid[x][y]+=1;
                    break;
                case "turnoff":
                    grid[x][y]=Math.max(0,grid[x][y]-1);
                    break;
                case "toggle":
                    grid[x][y]+=2;
                    break;
            }
        }
    }
}

function applyAllCommands2(){
    for(let i=0;i<commands.length;i++){
        actOnCommand2(commands[i]);
    }
    let counter=0;
    for(let x=0;x<1000;x++){
        for(let y=0;y<1000;y++){
            counter+=grid[x][y];
        }
    }
    console.log(counter);
}

applyAllCommands2();