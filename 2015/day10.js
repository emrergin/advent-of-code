function process(number) {
    const stringNumber = number
        .split("")
        .reduce((acc, curr) => {
            if (
                acc[acc.length - 1] !== undefined &&
                acc[acc.length - 1][0] === curr
            ) {
                acc[acc.length - 1].push(curr);
            } else {
                acc.push([curr]);
            }
            return acc;
        }, [])
        .map((a) => `${a.length}${a[0]}`)
        .join("");

    return stringNumber;
}

function processNTimes(startingNumber, n) {
    let oldNumber = startingNumber;
    let newNumber;
    for (let i = 0; i < n; i++) {
        newNumber = process(oldNumber);
        oldNumber = newNumber;
    }

    console.log(oldNumber.length);
}

//Part 1 -----
processNTimes("1321131112", 40);
processNTimes("1321131112", 50);
