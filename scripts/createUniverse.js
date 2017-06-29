"use strict";
/// <reference path="../typings/index.d.ts"/>
/// <reference path="loadConfig.ts"/>
/// <reference path="helper.ts"/>
Object.defineProperty(exports, "__esModule", { value: true });
const config = require("./loadConfig");
const helper = require("./helper");
const assert = require("assert");
const util = require("util");
let universeData;
// Initial Funktion
function init(_db) {
    // Get all Collections currently in the database
    _db.collections(onCollection);
}
exports.init = init;
// Handler for receiving Collections
function onCollection(_error, _collections) {
    assert.ifError(_error);
    // Hand out the data
    universeData = _collections;
    console.log("Database data gathered");
    if (databaseIsNotEmpty()) {
        console.log("Selected Database already has data");
        console.log("Asking for permission to delete data ...");
        if (askPermission()) {
            console.log("Permission granted");
            dropCollections(_db);
            createUniverse(_db);
        }
        else {
            console.log("Permission denied");
        }
    }
    else {
        createUniverse(_db);
    }
}
// Check if database is empty or not
function databaseIsNotEmpty() {
    if (util.isUndefined(universeData))
        return false;
    return universeData.length > 0;
}
// Placeholder for later checkbox/yes no question/button
function askPermission() {
    // TODO Write permission functionality
    return true;
}
function dropCollections(_db) {
    console.log("Dropping all collections...");
    for (let i = 0; i < universeData.length; i++) {
        _db.dropCollection(universeData[i].collectionName, function (_error, _result) {
            assert.ifError(_error);
        });
    }
    console.log("Done");
}
// If you wish to make apple pie from scratch, you must first create the universe
function createUniverse(_db) {
    setupDatabase(_db);
    createSolarSystems(_db);
}
function setupDatabase(_db) {
    setupSolarSystemsCollection(_db);
}
function setupSolarSystemsCollection(_db) {
    let options = { validator: {
            $exist: [
                { x: { $type: "double" } },
                { y: { $type: "double" } },
                { z: { $type: "double" } },
                { lastActivity: { $type: { $or: ["timestamp", "null"] } } }
            ]
        } };
    _db.createCollection("solarsystems", options, function (_error) {
        assert.ifError(_error);
    });
}
function createSolarSystems(_db) {
    for (let x = 0; x < config.data.universe.systemsPerDimension * config.data.solarsystem.minDistanceBetween; x += config.data.solarsystem.minDistanceBetween) {
        for (let y = 0; y < config.data.universe.systemsPerDimension * config.data.solarsystem.minDistanceBetween; y += config.data.solarsystem.minDistanceBetween) {
            for (let z = 0; z < config.data.universe.systemsPerDimension * config.data.solarsystem.minDistanceBetween; z += config.data.solarsystem.minDistanceBetween) {
                let data = {
                    // Position solarsystem with a bit of random deviation to avoid a fully static grid
                    x: x + helper.random(-config.data.universe.solarSystemRadius, config.data.universe.solarSystemRadius),
                    y: y + helper.random(-config.data.universe.solarSystemRadius, config.data.universe.solarSystemRadius),
                    z: z + helper.random(-config.data.universe.solarSystemRadius, config.data.universe.solarSystemRadius),
                    lastActivity: null
                };
                _db.collection("solarsystems").insertOne(data, function (error) {
                    assert.ifError(error);
                });
            }
        }
    }
}
//# sourceMappingURL=createUniverse.js.map