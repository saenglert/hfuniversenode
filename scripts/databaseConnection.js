"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb = require("mongodb");
const assert = require("assert");
let mongoClient = mongodb.MongoClient;
let databaseName = "hfuniverse";
let host = "mongodb://localhost:27017/";
let url = host + databaseName;
mongoClient.connect(url, onConnect);
function onConnect(_error, _database) {
    assert.ifError(_error);
    exports.database = _database;
}
//# sourceMappingURL=databaseConnection.js.map