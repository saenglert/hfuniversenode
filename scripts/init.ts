
import * as http from "http";
import * as mongodb from "mongodb";
import * as config from "./loadConfig";
import {IncomingMessage, ServerResponse} from "http";

namespace hfuniverse {
    console.log("HFUniverse initial server startup");

    console.log("Initialising database connection");

    let url: string = "mongodb://" + config.data.service.database.host + ":" + config.data.service.database.port + "/" + config.data.service.database.name;

    console.log("Connecting to ", url);

    mongodb.MongoClient.connect(url).then(startHttpServer).catch( function (_error: Error): void {
        console.log("Error: Database Error", _error);
    });

    function startHttpServer(_database: mongodb.Db): void {
        console.log("Database connection established");
        console.log("Starting HTTP server");

        let server: http.Server = http.createServer();
        server.addListener("listening", function (): void {
            console.log("Server is listening on port ", server.address().port);
        });
        server.addListener("request", onRequest);
        server.listen(process.env.port || 8100);
    }

    function onListening(): void {
        console.log("Server is listening on port ", server.address().port);
    }

    function onRequest(_request: IncomingMessage, _response: ServerResponse): void {
        //
    }
}