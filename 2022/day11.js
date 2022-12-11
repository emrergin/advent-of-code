import {readFileSync } from "fs";
const commands = readFileSync(`day11test.txt`, 'utf-8')
// const commands = readFileSync(`day11input.txt`, 'utf-8')
    .split("\n\n").map(a=>a.split('\n').map(b=>b.split(":")))
    .map(a=>{
        let arr=a[1][1].trim().split(",").map(Number);
        let opr="return"+a[2][1].split("=")[1];
        let te = a[3][1].split(" ")[3];
        let tu = a[4][1].split(" ")[4];
        let fa = a[5][1].split(" ")[4];

        return [arr,opr,+te,+tu,+fa];
    });

const monkeys = [];

class Monkey{
    constructor(items,op,test,tru,fal,part){
        // this.name=name;
        this.items=part===1? items:items.map(BigInt);
        this.tru=tru;
        this.fal=fal;
        this.test=(a)=>part===1? a%test===0:a%BigInt(test)===0;
        let str2=op;
        if(part===2){
            str2 = op.replace(/\d+/g, (match) => `BigInt(${match})`);
        }        
        this.op=new Function('old', str2);
        this.totalInspections=0;
        this.decreaseWorry=part===1?(a)=>Math.floor(a/3):a=>a;
    }

    inspectAndThrow(){        
        let currentItem = this.items.shift();
        currentItem=this.op(currentItem);
        currentItem=this.decreaseWorry(currentItem);
        let test=this.test(currentItem);
        this.totalInspections++;
        if(test){
            monkeys[this.tru].items.push(currentItem);
        }
        else{
            monkeys[this.fal].items.push(currentItem);
        }
    }

    inspectTillEnd(){
        while(this.items.length>0){
            this.inspectAndThrow();
        }
    }
}

function partOne(){
    for(let command of commands){
        monkeys.push(new Monkey(...command,1))
    }
    
    for(let j=0;j<20;j++){
        for(let i=0;i<monkeys.length;i++){
            monkeys[i].inspectTillEnd()
    
        }
    }
    
    const allMonkeysOrdered = monkeys.map(a=>a.totalInspections).sort((a,b)=>b-a);
    console.log(allMonkeysOrdered[0]*allMonkeysOrdered[1]);
}

function partTwo(){
    for(let command of commands){
        monkeys.push(new Monkey(...command,2))
    }

    
    for(let j=0;j<10000;j++){
        for(let i=0;i<monkeys.length;i++){
            monkeys[i].inspectTillEnd();    
        }
    }
    const allMonkeysOrdered = monkeys.map(a=>a.totalInspections).sort((a,b)=>b-a);
    // console.log(monkeys.map(a=>a.items))
    console.log(allMonkeysOrdered);
    // console.log(allMonkeysOrdered[0]*allMonkeysOrdered[1]);
}

partOne();
// partTwo();

// const str = "return old * 19";
// const str2 = str.replace( , "BigInt($&)")

// console.log(str2)

