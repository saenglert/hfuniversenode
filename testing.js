"use strict";
/// <reference path="typings/index.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb = require("mongodb");
var hfuniverse;
(function (hfuniverse) {
    let mongoclient = mongodb.MongoClient;
    let databaseName = "hfuniverse";
    let host = "mongodb://localhost:27017/eia2ss17";
    console.log("before start");
    start().then(function (message) {
        console.log(message);
    });
    console.log("after start");
    async function start() {
        console.log("start start");
        let db = await mongoclient.connect(host + databaseName);
        let collections = await db.collection("planets");
        let cursor = collections.find();
        let data = await cursor.toArray();
        console.log(data);
        return "start end";
    }
})(hfuniverse || (hfuniverse = {}));
//# sourceMappingURL=testing.js.map