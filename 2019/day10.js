const spaceMap = [
    ".............#..#.#......##........#..#",
    ".#...##....#........##.#......#......#.",
    "..#.#.#...#...#...##.#...#.............",
    ".....##.................#.....##..#.#.#",
    "......##...#.##......#..#.......#......",
    "......#.....#....#.#..#..##....#.......",
    "...................##.#..#.....#.....#.",
    "#.....#.##.....#...##....#####....#.#..",
    "..#.#..........#..##.......#.#...#....#",
    "...#.#..#...#......#..........###.#....",
    "##..##...#.#.......##....#.#..#...##...",
    "..........#.#....#.#.#......#.....#....",
    "....#.........#..#..##..#.##........#..",
    "........#......###..............#.#....",
    "...##.#...#.#.#......#........#........",
    "......##.#.....#.#.....#..#.....#.#....",
    "..#....#.###..#...##.#..##............#",
    "...##..#...#.##.#.#....#.#.....#...#..#",
    "......#............#.##..#..#....##....",
    ".#.#.......#..#...###...........#.#.##.",
    "........##........#.#...#.#......##....",
    ".#.#........#......#..........#....#...",
    "...............#...#........##..#.#....",
    ".#......#....#.......#..#......#.......",
    ".....#...#.#...#...#..###......#.##....",
    ".#...#..##................##.#.........",
    "..###...#.......#.##.#....#....#....#.#",
    "...#..#.......###.............##.#.....",
    "#..##....###.......##........#..#...#.#",
    ".#......#...#...#.##......#..#.........",
    "#...#.....#......#..##.............#...",
    "...###.........###.###.#.....###.#.#...",
    "#......#......#.#..#....#..#.....##.#..",
    ".##....#.....#...#.##..#.#..##.......#.",
    "..#........#.......##.##....#......#...",
    "##............#....#.#.....#...........",
    "........###.............##...#........#",
    "#.........#.....#..##.#.#.#..#....#....",
    "..............##.#.#.#...........#.....",
];

const spaceMap1 = [".#..#", ".....", "#####", "....#", "...##"];

const spaceMap2 = [
    ".#..##.###...#######",
    "##.############..##.",
    ".#.######.########.#",
    ".###.#######.####.#.",
    "#####.##.#.##.###.##",
    "..#####..#.#########",
    "####################",
    "#.####....###.#.#.##",
    "##.#################",
    "#####.##.###..####..",
    "..######..##.#######",
    "####.##.####...##..#",
    ".#####..#.######.###",
    "##...#.##########...",
    "#.##########.#######",
    ".####.#.###.###.#.##",
    "....##.##.###..#####",
    ".#.#.###########.###",
    "#.#.#.#####.####.###",
    "###.##.####.##.#..##",
];

const spaceMap3 = [
    "......#.#.",
    "#..#.#....",
    "..#######.",
    ".#.#.###..",
    ".#..#.....",
    "..#....#.#",
    "#..#....#.",
    ".##.#..###",
    "##...#..#.",
    ".#....####",
];

const relatedMap = spaceMap.map((a) =>
    a.split("").map((a) => (a === `.` ? 0 : 1))
);

const xdimension = relatedMap.length;
const ydimension = relatedMap[0].length;
const scores = Array(xdimension)
    .fill()
    .map((a) => Array(ydimension).fill(0));

function checkLineOfSight(x1, y1, x2, y2) {
    let minX = Math.min(x1, x2);
    let maxX = Math.max(x1, x2);
    let minY = Math.min(y1, y2);
    let maxY = Math.max(y1, y2);
    for (let i = minX; i <= maxX; i++) {
        for (let j = minY; j <= maxY; j++) {
            if (
                (y1 - j) / (x1 - i) === (y1 - y2) / (x1 - x2) &&
                relatedMap[i][j] === 1 &&
                (i !== x1 || j !== y1) &&
                (i !== x2 || j !== y2)
            ) {
                return false;
            }
        }
    }
    return true;
}

function solvePart1() {
    for (let i = 0; i < xdimension; i++) {
        for (let j = 0; j < ydimension; j++) {
            if (relatedMap[i][j] === 0) {
                continue;
            }
            for (let k = 0; k < xdimension; k++) {
                for (let l = 0; l < ydimension; l++) {
                    if (relatedMap[k][l] === 0 || (i === k && j === l)) {
                        continue;
                    }
                    if (checkLineOfSight(i, j, k, l)) {
                        scores[i][j] = scores[i][j] + 1;
                    }
                }
            }
        }
    }

    let maxCount = Number.NEGATIVE_INFINITY;
    let wx, wy;
    for (let i = 0; i < xdimension; i++) {
        for (let j = 0; j < ydimension; j++) {
            if (scores[i][j] > maxCount) {
                maxCount = scores[i][j];
                wx = i;
                wy = j;
            }
        }
    }

    console.log(maxCount, wx, wy);
}

function solvePart2(coordX, coordY) {
    let listOfAsteroids = [];
    let id = 1;
    relatedMap.forEach((row, xindex) =>
        row.forEach((column, yindex) => {
            if (column) {
                listOfAsteroids.push({
                    id: id++,
                    y: yindex,
                    x: xindex,
                    angle: Math.atan2(yindex - coordY, xindex - coordX),
                    distance: Math.hypot(yindex - coordY, xindex - coordX),
                });
            }
        })
    );

    function vaporize(kl) {
        let queue = listOfAsteroids
            .reduce((prev, curr) => {
                let subarray = prev?.find((a) => a[0].angle === curr.angle);
                if (subarray) {
                    subarray.push(curr);
                } else {
                    prev.push([curr]);
                }
                return prev;
            }, [])
            .map((a) =>
                a
                    .filter((a) => a.distance > 0)
                    .sort((a, b) => {
                        if (a.distance < b.distance) {
                            return -1;
                        }
                        if (a.distance > b.distance) {
                            return 1;
                        }
                        return 0;
                    })
            )
            .sort((a, b) => {
                if (a[0].angle > b[0].angle) {
                    return -1;
                }
                if (a[0].angle < b[0].angle) {
                    return 1;
                }
                return 0;
            });

        let k = 0;
        let output = [];
        let neww;
        while (output.length < kl) {
            neww = queue[k % queue.length].shift();
            if (neww) {
                output.push(neww);
                console.log(neww);
            }
            k++;
        }
    }

    vaporize(200);
}

// solvePart1()
solvePart2(29, 26);
