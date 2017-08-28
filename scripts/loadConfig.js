"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
// Variable holding the config data in a defined format
// To be imported in init.ts
exports.data = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "data", "config", "hfuniverse.json"), "utf8"));
console.log("HFUniverse config loaded");
//# sourceMappingURL=loadConfig.js.map