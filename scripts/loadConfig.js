"use strict";
exports.__esModule = true;
var fs = require("fs");
exports.data = JSON.parse(fs.readFileSync(__dirname + "/data/config/hfuniverse.json", "utf8"));
