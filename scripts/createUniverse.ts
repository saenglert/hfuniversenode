/// <reference path="../typings/index.d.ts"/>
/// <reference path="loadConfig.ts"/>
/// <reference path="helper.ts"/>

import config = require("./loadConfig");
import helper = require("./helper");

import mongodb = require("mongodb");
import assert = require("assert");
import util = require("util");

let universeData: mongodb.Collection[];

// Initial Funktion
export function init(_db: mongodb.Db): void {
    // Get all Collections currently in the database
    _db.collections(onCollection);
}

// Handler for receiving Collections
function onCollection(_error: mongodb.MongoError, _collections: mongodb.Collection[]): void {
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
        } else {
            console.log("Permission denied");
        }
    } else {
        createUniverse(_db);
    }
}

// Check if database is empty or not
function databaseIsNotEmpty(): boolean {
    if (util.isUndefined(universeData))
        return false;
    return universeData.length > 0;
}

// Placeholder for later checkbox/yes no question/button
function askPermission(): boolean {
    // TODO Write permission functionality
    return true;
}

function dropCollections(_db: mongodb.Db): void {
    console.log("Dropping all collections...");
    for (let i: number = 0; i < universeData.length; i++) {
        _db.dropCollection(universeData[i].collectionName, function (_error: mongodb.MongoError, _result: Object): void {
            assert.ifError(_error);
        });
    }
    console.log("Done");
}

// If you wish to make apple pie from scratch, you must first create the universe
function createUniverse(_db: mongodb.Db): void {
    setupDatabase(_db);
    createSolarSystems(_db);
}

function setupDatabase(_db: mongodb.Db): void {
    setupSolarSystemsCollection(_db);
}

function setupSolarSystemsCollection(_db: mongodb.Db): void {
    let options: {} = {validator: {
        $exist: [
            {x: {$type: "double"}},
            {y: {$type: "double"}},
            {z: {$type: "double"}},
            {lastActivity: {$type: {$or: ["timestamp", "null"]}}}
        ]
    }};

    _db.createCollection("solarsystems", options, function (_error: mongodb.MongoError): void {
        assert.ifError(_error);
    });
}

function createSolarSystems(_db: mongodb.Db): void {
    for (let x: number = 0; x < config.data.universe.systemsPerDimension * config.data.solarsystem.minDistanceBetween; x += config.data.solarsystem.minDistanceBetween) {
        for (let y: number = 0; y < config.data.universe.systemsPerDimension  * config.data.solarsystem.minDistanceBetween; y += config.data.solarsystem.minDistanceBetween) {
            for (let z: number = 0; z < config.data.universe.systemsPerDimension  * config.data.solarsystem.minDistanceBetween; z += config.data.solarsystem.minDistanceBetween) {
                let data: {} = {
                    // Position solarsystem with a bit of random deviation to avoid a fully static grid
                    x: x + helper.random(-config.data.universe.solarSystemRadius, config.data.universe.solarSystemRadius),
                    y: y + helper.random(-config.data.universe.solarSystemRadius, config.data.universe.solarSystemRadius),
                    z: z + helper.random(-config.data.universe.solarSystemRadius, config.data.universe.solarSystemRadius),
                    lastActivity: null
                };
                _db.collection("solarsystems").insertOne(data, function (error: mongodb.MongoError): void {
                    assert.ifError(error);
                });
            }
        }
    }
}