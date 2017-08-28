import fs = require("fs");
import path = require("path");

// Variable holding the config data in a defined format
// To be imported in init.ts
export let data: Config = JSON.parse(
    fs.readFileSync(
        path.join(__dirname , "..", "data", "config" , "hfuniverse.json"), "utf8"
    )
);

console.log("HFUniverse config loaded");

// Interface for easy accessibility of the config files contents
interface Config {
    // Defining Variables for the HFUniverse Service
    service: {
        database: {
            // Host of the database service
            host: string;
            // Port number for database service
            port: string;
            // Name of the database in use
            name: string;
        },
        http: {
            // Port number for http service
            port: number;
        }
    };
    // General game defining variables
    game: {
        maxPlayerCount: number;
        maxBaseCount: number;
        // Array of number values where the first value corresponds to the first resource defined
        startResources: number[];
        // Returned resources in % of base cost
        recyclingYield: number;
        // Threshold at which point a player can start to conquer a base
        conquerHP: number;
        // Time needed to destroy a base
        timeToDestroy: number;
    };
    // Universe data
    universe: {
        size: number;
        // Radius around a point on the grid in which a solarsystem will be positioned
        solarSystemRadius: number;
        // Amount of solarsystems per dimension in a 3D universe
        systemsPerDimension: number;
    };
    // Data concerning individual solarsystems
    solarsystem: {
        size: number;
        // Distance between individual solarystems
        minDistanceBetween: number;
        // Minimum amount of planets per solarsystem
        minPlanetCount: number;
        // Maximum amount of planets per solarsystem
        maxPlanetCount: number;
    };
    // Data concerning individual planets
    planet: {
        // Minimum distance between two planets in a solarsystem
        mindDistanceBetween: number;
        // Chance of a planet being habitable
        chanceOfHabitability: number;
    };
    // List of resources in the game
    resources: {
        // Name of the resource
        name: string;
        // Chance of the resource appearing on a planet for mining
        probability: number;
    }[];
    // List of base types in the game
    bases: {
        // Name of the base type
        name: string;
        // Hitpoints of the base type
        hp: number;
        // Shield hitpoints
        shield: number;
        // Amount of hp regeneration per cycle
        regeneration: number;
        // Firepower of this base type
        firepower: number;
        // Build cost in resources. First index corresponds to first resource in game
        cost: number[];
    }[];
    // List of all ship types in game
    ships: {}[];
}