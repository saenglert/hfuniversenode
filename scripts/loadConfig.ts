interface Config {
    solarSystemRadius: number;
    distanceBetweenSystems: number;
    systemsPerDimension: number;
}

export let data: Config = JSON.parse("../hfuniverse.json");