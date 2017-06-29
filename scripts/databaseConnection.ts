
import mongodb = require("mongodb");
import assert = require("assert");

let mongoClient: mongodb.MongoClient = mongodb.MongoClient;

let databaseName: string = "hfuniverse";
let host: string = "mongodb://localhost:27017/";

let url: string = host + databaseName;
export let database: mongodb.Db;

mongoClient.connect(url, onConnect);

function onConnect(_error: mongodb.MongoError, _database: mongodb.Db): void {
    assert.ifError(_error);
    database = _database;
}