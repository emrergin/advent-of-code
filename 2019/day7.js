import { permutator } from "../utilities/functions.mjs";
import operator from "../utilities/intcodeMachinev2.mjs";

const IntCode = [3,8,1001,8,10,8,105,1,0,0,21,38,47,72,97,122,203,284,365,446,99999,3,9,1001,9,3,9,1002,9,5,9,1001,9,4,9,4,9,99,3,9,102,3,9,9,4,9,99,3,9,1001,9,2,9,102,5,9,9,101,3,9,9,1002,9,5,9,101,4,9,9,4,9,99,3,9,101,5,9,9,1002,9,3,9,101,2,9,9,102,3,9,9,1001,9,2,9,4,9,99,3,9,101,3,9,9,102,2,9,9,1001,9,4,9,1002,9,2,9,101,2,9,9,4,9,99,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,2,9,4,9,99,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,99,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,99,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,99,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,2,9,4,9,99];

const IntCode2 = [3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0];

const IntCode3 = [3,23,3,24,1002,24,10,24,1002,23,-1,23,
101,5,23,23,1,24,23,23,4,23,99,0,0];

const IntCode4 = [3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,
1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0];

const IntCode5 = [3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,
27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5];

const IntCode6 = [3,52,1001,52,-5,52,3,53,1,52,56,54,1007,54,5,55,1005,55,26,1001,54,
-5,54,1105,1,12,1,53,54,53,1008,54,0,55,1001,55,1,55,2,53,55,53,4,
53,1001,56,-1,56,1005,56,6,99,0,0,0,0,10];






function operatorCaller(arrayToUse,memory){
	let currentIndex=0;
	while(currentIndex!==null && currentIndex<arrayToUse.length){
		currentIndex = operator(arrayToUse,currentIndex,memory);
	}
}

function operatorCallerv2(arrayToUse,inputMemory,outputMemory){
	let currentIndex=0;
	while(currentIndex!==null && currentIndex<arrayToUse.length &&currentIndex!==`HALT`){
		currentIndex = operator(arrayToUse,currentIndex,inputMemory,outputMemory);
	}
}







let maxAmp = -Infinity;
let win;
let currentIntCode=IntCode;

function solvepart2(){
	const allPermutations = permutator([5,6,7,8,9]);
	// let hardDisks;
	let intcodes;
	let directives;
	let machineE;
	let cycleEnd;
	let outerCounter=0;
	// let indices;

	for (let permutation of [allPermutations[0]]){
	// for (let permutation of allPermutations){
		intcodes=[[...currentIntCode],[...currentIntCode],[...currentIntCode],[...currentIntCode],[...currentIntCode]]
		directives=[...permutation];
		cycleEnd=false;
		console.log(++outerCounter);
		// let log=true;

		while(!cycleEnd){
			let machineA = amplificationMachine(intcodes[0],machineE?.next().value||0,directives[0]);
			// if (log){
			// 	console.log(machineA.next().value);
			// 	log=false;
			// }
			let machineB = amplificationMachine(intcodes[1],machineA.next().value,directives[1]);
			let machineC = amplificationMachine(intcodes[2],machineB.next().value,directives[2]);
			let machineD = amplificationMachine(intcodes[3],machineC.next().value,directives[3]);
			machineE = amplificationMachine(intcodes[4],machineD.next().value,directives[4]);
		}
		let output=machineE.next();
		if (output>maxAmp){		
			maxAmp=output;
			win=permutation;
		}

	}
	console.log(maxAmp,win);

	
	function* amplificationMachine(intcode,input,directive){
		let submemory=[directive,input];
		console.log(submemory)
		let inputsAreIn=false;
		let currentIndex=0;
		while(currentIndex!==null && currentIndex<intcodes.length && currentIndex!=="HALT"){
			currentIndex= operator(intcode,currentIndex,submemory);
			if (submemory.length===0){
				inputsAreIn=true;
				if(directive===5){console.log(`endofinput`)}
			}
			if ( inputsAreIn){
				yield submemory.shift();
			}
		}
		// if(currentIndex==="HALT"){
			cycleEnd=true;
			// console.log(cycleEnd)
		// }
		return submemory[0];
	}
}

function solvepart1(){
	const allPermutations = permutator([0,1,2,3,4]);
	let memory;
	for (let permutation of allPermutations){
		memory=[...permutation];
		memory.splice(1,0,0);

		operatorCallerv2([...currentIntCode],memory,memory)
		operatorCallerv2([...currentIntCode],memory,memory)
		operatorCallerv2([...currentIntCode],memory,memory)
		operatorCallerv2([...currentIntCode],memory,memory)
		operatorCallerv2([...currentIntCode],memory,memory)
		
		console.log(permutation,memory[0])
		if (memory[0]>maxAmp){		
			maxAmp=memory.shift();
			win=permutation;
		}
		
	}

	console.log(maxAmp,win);
}
function solvepart2v2(){
	const allPermutations = permutator([5,6,7,8,9]);
	let memories;
	let breakLoop=false;
	for (let permutation of allPermutations){
		memories=[...permutation].map(a=>[a]);

		memories[0].push(0);
		let A = operatorCallerv2([...currentIntCode],memories[0],memories[1])
		let B = operatorCallerv2([...currentIntCode],memories[1],memories[2])
		let C = operatorCallerv2([...currentIntCode],memories[2],memories[3])
		let D = operatorCallerv2([...currentIntCode],memories[3],memories[4])
		let E = operatorCallerv2([...currentIntCode],memories[4],memories[0])
		// console.log(memories)

		while(!breakLoop){
			A.next();
			B.next();
			C.next();
			D.next();
			E.next();
		}
		console.log(permutation,memories[0][0])
		if (memories[0][0]>maxAmp){		
			maxAmp=memories[0].shift();
			win=permutation;
		}
		
	}

	function* operatorCallerv2(arrayToUse,inputMemory,outputMemory){
		let currentIndex=0;
		while(currentIndex!==null && currentIndex<arrayToUse.length &&currentIndex!==`HALT`){
			currentIndex = operator(arrayToUse,currentIndex,inputMemory,outputMemory);
			if(currentIndex===`HALT`){breakLoop=true;
			return `stop`}
			yield `continue`
		}
		
	}


	console.log(maxAmp,win);
}

function solvePart2v3(){
	let intcodes,activeOperator;

	const allPermutations = permutator([5,6,7,8,9]);
	// const computers 

	for (let permutation of [allPermutations[0]]){
			intcodes=[[...currentIntCode],[...currentIntCode],[...currentIntCode],[...currentIntCode],[...currentIntCode]]
			directives=[...permutation];
		console.log(permutation)
	}

	function Computer(intcode){
		if (!(this instanceof Computer)){
			return new Computer();
		}
		this.intcode = [...intcode];
		this.directive = directive;
		this.currentIndex = 0;

		this.reset= function () {
			this=new Computer();
		}
	}
}
// solvepart1();
// solvePart2v3();

function Computer(intcode,directive){
	if (!(this instanceof Computer)){
		return new Computer();
	}
	this.intcode = [...intcode];
	this.directive = directive;
	this.currentIndex = 0;

	this.reset= function () {
		this=new Computer();
	}
}

let c = new Computer([1,2],3);
c.currentIndex++;
c.currentIndex++;
c.currentIndex++;
console.log(c.currentIndex);
c.reset();
console.log(c.currentIndex);