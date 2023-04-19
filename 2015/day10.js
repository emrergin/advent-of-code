function process(number){
    const stringNumber = number.split("").reduce((acc,curr)=>{
        if(acc[acc.length-1]!==undefined && acc[acc.length-1][0]===curr){
            acc[acc.length-1].push(curr);
        }else{
            acc.push([curr]);
        }
        return acc;
    },[]).map(a=> [a.length,...a]).map(a=>`${a[0]}${a[1]}`).join("")

    return stringNumber;
}

// process("1321131112")
let oldNumber = "1321131112";
// let oldNumber = "1";
let newNumber;
for(let i=0;i<50;i++){
    newNumber = process(oldNumber);
    oldNumber= newNumber;
}

console.log(oldNumber.length);

// process("111221")