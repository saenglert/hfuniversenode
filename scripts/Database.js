"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongo = require("mongodb");
const config = require("./loadConfig");
let url = "mongodb://" + config.data.service.database.host + ":" + config.data.service.database.port + "/" + config.data.service.database.name;
console.log("Initialising database connection");
console.log("Connecting to ", url);
mongo.MongoClient.connect(url).then(function (db) {
    exports.instance = db;
    console.log("Database connection established");
});
async function read(_collectionName, _filter) {
    try {
        let collection = exports.instance.collection(_collectionName);
        return collection.find(_filter);
    }
    catch (_error) {
        console.log(_error);
    }
}
exports.read = read;
async function write(_collectionName, _data) {
    try {
        let collection = exports.instance.collection(_collectionName);
        return collection.insertOne(_data);
    }
    catch (_error) {
        console.log(_error);
    }
}
exports.write = write;
//# sourceMappingURL=Database.js.map