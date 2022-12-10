import {readFileSync } from "fs";
const commands = readFileSync(`day9input.txt`, 'utf-8').split("\n").map(a=>a.split(" ")).map(a=>[a[0],+a[1]]);

function moveHead(command,visited,head){
    let[direction,amount]=command;
    while(amount>0){
        switch(direction){
            case 'U':
                head.y-=1;
                break;
            case 'D':
                head.y+=1;
                break;
            case 'L':
                head.x-=1;
                break;
            case 'R':
                head.x+=1;
                break;
            default:
                break;
        }
        moveTail(visited,head,head.next);
        amount--;
    }
}

function moveTail(visited,h,t){
    if(Math.abs(h.x-t.x)<2 && Math.abs(h.y-t.y)<2){return;}
    if(h.x===t.x||h.y===t.y){
        if(Math.abs(h.x-t.x)>1){
            t.x+=Math.sign(h.x-t.x);
        }
        else if(Math.abs(h.y-t.y)>1){
            t.y+=Math.sign(h.y-t.y);
        }
    }
    else{
        t.x+=Math.sign(h.x-t.x);
        t.y+=Math.sign(h.y-t.y);
    }
    if(t.next){
        moveTail(visited,t,t.next);
    }else{
        visited.set(`${t.x}-${t.y}`,true);
    }    
}

function partOne(c){
    const tail={x:0,y:0};
    const head={x:0,y:0,next:tail};
    const visited = new Map();
    visited.set(`0-0`,true);
    for(let command of c){
        moveHead(command,visited,head);
    }
    console.log(visited.size);
}

function partTwo(c){
    const tail={x:0,y:0,next:null};
    const eight={x:0,y:0,next:tail};
    const seven={x:0,y:0,next:eight};
    const six={x:0,y:0,next:seven};
    const five={x:0,y:0,next:six};
    const four={x:0,y:0,next:five};
    const three={x:0,y:0,next:four};
    const two={x:0,y:0,next:three};
    const one={x:0,y:0,next:two};
    const head={x:0,y:0,next:one};
    const visited = new Map();
    visited.set(`0-0`,true);
    for(let command of c){
        moveHead(command,visited,head);
    }
    console.log(visited.size);    
}

partOne(commands);
partTwo(commands);
