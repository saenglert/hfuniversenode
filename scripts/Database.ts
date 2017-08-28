
import mongo = require("mongodb");
import * as config from "./loadConfig";

export let instance: mongo.Db;
let url: string = "mongodb://" + config.data.service.database.host + ":" + config.data.service.database.port + "/" + config.data.service.database.name;

console.log("Initialising database connection");
console.log("Connecting to ", url);

mongo.MongoClient.connect(url).then(function (db: mongo.Db) {
    instance = db;
    console.log("Database connection established");
});

export async function read(_collectionName: string, _filter: object): Promise<mongo.Cursor<any>> {
    try {
        let collection: mongo.Collection = instance.collection(_collectionName);
        return collection.find(_filter);
    } catch (_error) {
        console.log(_error);
    }
}

export async function write(_collectionName: string, _data: object): Promise<mongo.InsertOneWriteOpResult> {
    try {
        let collection: mongo.Collection = instance.collection(_collectionName);
        return collection.insertOne(_data)
    } catch (_error) {
        console.log(_error);
    }
}
