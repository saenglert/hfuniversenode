
import * as http from "http";
import * as auth from "./Auth";
import * as action from "./Action";
import * as util from "util";

namespace hfuniverse {
    console.log("HFUniverse main server startup");

    startHttpServer();

    function startHttpServer(): void {
        console.log("Starting HTTP server");

        let server: http.Server = http.createServer();
        server.addListener("listening", function (): void {
            console.log("Server is listening on port ", server.address().port);
        });
        server.addListener("request", onRequestWrapper);
        // Use port assigned by heroku or standard port
        server.listen(process.env.port || 8100);
    }

    function onRequestWrapper(_request: http.IncomingMessage, _response: http.ServerResponse): void {
        console.log("Request received");
        onRequest(_request, _response).then(console.log).catch(console.log)
    }

    async function onRequest(_request: http.IncomingMessage, _response: http.ServerResponse): Promise<string> {
            if ( _request.method == "GET") {
                writeResponse(_response, JSON.stringify({
                    "error": "No service using this method",
                    "errorMessage": "This api uses the POST method to send and receive data",
                    "link": "linkToHowTo"
                }));
                console.log("GET Request received");
            }
            else {
                try {
                    let data: JSON = await getRequestData(_request);
                    let message: action.Message = await getMessageData(data);
                    let result: string = await handleMessage(message);
                    writeResponse(_response, result);
                    return result;
                } catch (_error) {
                    console.log(_error);
                }
            }
    }

    function handleMessage(_message: action.Message): Promise<string> {
        return new Promise(function (_resolve: Function, _reject: Function) {
            console.log("handling message");
            switch (_message.handler) {
                case "game":
                    break;
                case "admin":
                    break;
                case "auth":
                    auth.handleData(<action.AuthData>_message.data)
                        .then(function (_result) {
                        _resolve(_result)
                        })
                        .catch(function (_error) {
                            _reject(_error);
                        });
                    break;
                default:
                    _reject(Error("The given handler doesn't exist"));
            }
        });
    }

    function getRequestData(_request: http.IncomingMessage): Promise<JSON> {
        return new Promise(function (_resolve: Function, _reject: Function): void {
            console.log("Reading RequestData");
            let rawData: Buffer[] = [];
            _request.on("data", function (_chunk: Buffer): void {
                rawData.push(_chunk);
            });
            _request.on("end", function (): void {
                _resolve(JSON.parse(rawData.join()));
            });
            _request.on("error", function (): void {
                _reject(Error("Error during data transmission"));
            });
        });
    }

    function getMessageData(_data: JSON): Promise<action.Message> {
        return new Promise(function (_resolve: Function, _reject: Function) {
            console.log("Parsing MessageData");
            let message: action.Message = {
                auth: _data["auth"],
                handler: _data["handler"],
                data: _data["data"]
            };

            if (util.isNullOrUndefined(message["auth"]) || util.isNullOrUndefined(message["handler"]) || util.isNullOrUndefined(message["data"])) {
                _reject(Error("Invalid Request Format"))
            } else {
                _resolve(message);
            }
        });
    }

    function writeResponse(_response: http.ServerResponse, _content: string): void {
        console.log("Writing Response");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.setHeader("content-type", "text/json; charset=utf-8");
        _response.statusCode = 200;
        _response.statusMessage = "OK";
        _response.write(_content);
        _response.end();
    }
}