const io ={x:6, y:10, z:10, vel:{x:0,y:0,z:0}};
const europa={x:-9, y:3, z:17, vel:{x:0,y:0,z:0}};
const ganymede={x:9, y:-4, z:14, vel:{x:0,y:0,z:0}};
const callisto={x:4, y:14, z:4, vel:{x:0,y:0,z:0}};

const jupitersMoons = [io,europa,ganymede,callisto];

const io2 ={x:-8, y:-10, z:0, vel:{x:0,y:0,z:0}};
const europa2={x:5, y:5, z:10, vel:{x:0,y:0,z:0}};
const ganymede2={x:2, y:-7, z:3, vel:{x:0,y:0,z:0}};
const callisto2={x:9, y:-8, z:-3, vel:{x:0,y:0,z:0}};

const jupitersMoons2 = [io2,europa2,ganymede2,callisto2];

const io3 ={x:-1, y:0, z:2, vel:{x:0,y:0,z:0}};
const europa3={x:2, y:-10, z:-7, vel:{x:0,y:0,z:0}};
const ganymede3={x:4, y:-8, z:8, vel:{x:0,y:0,z:0}};
const callisto3={x:3, y:5, z:-1, vel:{x:0,y:0,z:0}};

const jupitersMoons3 = [io3,europa3,ganymede3,callisto3];

function findGravities(moons){
    for(let i=0;i<moons.length;i++){
        for(let j=i+1;j<moons.length;j++){
            moons[i].vel.x-=Math.sign(moons[i].x-moons[j].x);
            moons[j].vel.x+=Math.sign(moons[i].x-moons[j].x);
            moons[i].vel.y-=Math.sign(moons[i].y-moons[j].y);
            moons[j].vel.y+=Math.sign(moons[i].y-moons[j].y);
            moons[i].vel.z-=Math.sign(moons[i].z-moons[j].z);
            moons[j].vel.z+=Math.sign(moons[i].z-moons[j].z);
        }
    }
}

function resolveMovement(moons){
    for(let i=0;i<moons.length;i++){
        moons[i].x+=moons[i].vel.x;
        moons[i].y+=moons[i].vel.y;
        moons[i].z+=moons[i].vel.z;
    }
}

function findEnergies(moons){
    for(let i=0;i<moons.length;i++){
        moons[i].pot=Math.abs(moons[i].x)+Math.abs(moons[i].y)+Math.abs(moons[i].z);
        moons[i].kin=Math.abs(moons[i].vel.x)+Math.abs(moons[i].vel.y)+Math.abs(moons[i].vel.z);
        moons[i].total=moons[i].pot*moons[i].kin;
    }
}
function resolveCycles(k,moons){
    for( let steps=0;steps<k;steps++){
        console.log(steps,moons);
        findGravities(moons);
        resolveMovement(moons);
        console.log(steps,moons);
    }
    findEnergies(moons);
}

resolveCycles(1000,jupitersMoons);
// console.log(jupitersMoons);
// console.log(jupitersMoons.reduce((prev,curr)=>prev+curr.total,0))
console.log(jupitersMoons);
console.log(jupitersMoons.reduce((prev,curr)=>prev+curr.total,0))