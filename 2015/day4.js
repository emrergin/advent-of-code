const { createHash } = await import("node:crypto");

function checkIfValid(key, number, leadingZeroes) {
    const leadingZeroesText = "0".repeat(leadingZeroes);
    let hash = createHash("md5");
    hash.update(key + number);
    if (hash.digest("hex").slice(0, leadingZeroes) === leadingZeroesText) {
        return true;
    } else {
        return false;
    }
}

function findNumber(key, leadingZeroes) {
    let num = 0;
    while (true) {
        num++;
        if (checkIfValid(key, num, leadingZeroes)) {
            console.log(num);
            break;
        }
    }
}

findNumber("yzbqklnj", 6);
