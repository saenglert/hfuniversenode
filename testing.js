/// <reference path="typings/index.d.ts" />
"use strict";
exports.__esModule = true;
var mongodb = require("mongodb");
var assert = require("assert");
var MongoClient = mongodb.MongoClient;
// Connection URL
var url = "mongodb://localhost:27017/myproject";
// Use connect method to connect to the server
MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    db.close();
});
MongoClient.conn
var solarsystemRadius = 2.0;
var distanceSolarsystems = 7.0;
var solarsystemsPerDimension = 7;
for (var x = solarsystemRadius; x < solarsystemsPerDimension * distanceSolarsystems + solarsystemRadius; x += distanceSolarsystems) {
    for (var y = solarsystemRadius; y < solarsystemsPerDimension * distanceSolarsystems + solarsystemRadius; y += distanceSolarsystems) {
        for (var z = solarsystemRadius; z < solarsystemsPerDimension * distanceSolarsystems + solarsystemRadius; z += distanceSolarsystems) {
            //console.log("X: " + x + " | Y: " + y + " | Z: " + z);
        }
    }
}
