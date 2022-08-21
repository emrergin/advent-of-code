import day3input from "./day3input.mjs";

let resultArray = Array(12).fill().map(a=>(Object.assign({}, {zeros:0,ones:0})))

let parsedInput=day3input.map(a=>a.split("")).reduce(
    (prev,thisNumberArray)=>{
        thisNumberArray.forEach((value,index) =>{
            if (value===`1`){
                prev[index].ones++;
            }else{
                prev[index].zeros++;
            }   
        }
        )
        return prev
    }
    ,resultArray
)


const gamma = parseInt(parsedInput.map(a=> a.zeros>a.ones ? 0 : 1).join(''),2)
const epsilon =  parseInt(parsedInput.map(a=> a.zeros>a.ones ? 1 : 0).join(''),2)

console.log(gamma*epsilon)

// Related Links
// https://stackoverflow.com/questions/35578478/array-prototype-fill-with-object-passes-reference-and-not-new-instance