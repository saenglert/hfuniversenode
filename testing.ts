let solarsystemRadius: number = 2.0;
let distanceSolarsystems: number = 7.0;
let solarsystemsPerDimension: number = 7;

for (let x: number = solarsystemRadius; x < solarsystemsPerDimension * distanceSolarsystems + solarsystemRadius; x += distanceSolarsystems) {
    for (let y: number = solarsystemRadius; y < solarsystemsPerDimension * distanceSolarsystems + solarsystemRadius; y += distanceSolarsystems) {
        for (let z: number = solarsystemRadius; z < solarsystemsPerDimension * distanceSolarsystems + solarsystemRadius; z += distanceSolarsystems) {
            console.log("X: " + x + " | Y: " + y + " | Z: " + z);
        }
    }
}