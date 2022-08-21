const parameterMap=new Map([
	[`1`,3],[`01`,3],
	[`2`,3],[`02`,3],
	[`3`,1],[`03`,1],
	[`4`,1],[`04`,1],
	[`5`,2],[`05`,2],
	[`6`,2],[`06`,2],
	[`7`,3],[`07`,3],
	[`8`,3],[`08`,3],
	[`99`,0]
]);

export default function operator(arrayToUse,cIndex,memoryToUse){
	// const localMemory = [...memoryToUse];
	
	const operatorCode = String(arrayToUse[cIndex]).slice(-2);
	const parameterMode = String(arrayToUse[cIndex]).padStart(parameterMap.get(operatorCode)+2, '0').slice(0,-2).split(``).reverse();
	
	
	let param1 = parameterMode[0]===`1`?  cIndex+1 : arrayToUse[cIndex+1];
	let param2 = parameterMode[1]===`1`?  cIndex+2 : arrayToUse[cIndex+2];
	let param3 = parameterMode[2]===`1`?  cIndex+3 : arrayToUse[cIndex+3];
	
	function singleOperation(){
		switch (operatorCode){
			case `1`:
			case `01`:
				arrayToUse[param3]=arrayToUse[param1]+arrayToUse[param2];
				return cIndex+parameterMap.get(`1`)+1;	
			case `2`:
			case `02`:
				arrayToUse[param3]=arrayToUse[param1]*arrayToUse[param2];	
				return cIndex+parameterMap.get(`2`)+1;
			case `3`:
			case `03`:		
				let input=memoryToUse.shift();			
				arrayToUse[param1]=input;
				// console.log(input)
				return cIndex+parameterMap.get(`3`)+1;
			case `4`:
			case `04`:
				memoryToUse.splice(1,0,arrayToUse[param1]);	
				// console.log(arrayToUse[param1])	
				return cIndex+parameterMap.get(`4`)+1;
			case `5`:
			case `05`:
				if (arrayToUse[param1]!==0){
					return arrayToUse[param2];
				}
				else{
					return cIndex+parameterMap.get(`5`)+1;
				}
			case `6`:
			case `06`:
				if (arrayToUse[param1]===0){
					return arrayToUse[param2];
				}
				else{
					return cIndex+parameterMap.get(`6`)+1;	
				}
			case `7`:
			case `07`:
				if (arrayToUse[param1]<arrayToUse[param2]){
					arrayToUse[param3]=1;
				}
				else{
					arrayToUse[param3]=0;
				}
				return cIndex+parameterMap.get(`7`)+1;
			case `8`:
			case `08`:
				if (arrayToUse[param1]===arrayToUse[param2]){
					arrayToUse[param3]=1;
				}
				else{
					arrayToUse[param3]=0;
				}
				return cIndex+parameterMap.get(`8`)+1;	
			case `99`:	
				return 'HALT'
			default:
				return null;	
		}
	}
	// console.log(localMemory)
	let newIndex = singleOperation();
	return newIndex;
	// return (arrayToUse,newIndex,localMemory)
}