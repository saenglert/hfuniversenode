/// <reference path="typings/index.d.ts" />

import mongodb = require("mongodb");
import assert = require("assert");


namespace hfuniverse {
    let mongoclient: mongodb.MongoClient = mongodb.MongoClient;
    let databaseName: string = "hfuniverse";
    let host: string = "mongodb://localhost:27017/eia2ss17";

    console.log("before start");
    start().then(function (message: string): void {
        console.log(message);
    });
    console.log("after start");

    async function start(): Promise<string> {
        console.log("start start");
        let db: mongodb.Db = await mongoclient.connect(host + databaseName);
        let collections: mongodb.Collection = await db.collection("planets");
        let cursor: mongodb.Cursor<any> = collections.find();
        let data: Object[] = await cursor.toArray();
        console.log(data);
        return "start end";
    }

}