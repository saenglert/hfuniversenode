"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
exports.data = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "data", "config", "hfuniverse.json"), "utf8"));
//# sourceMappingURL=loadConfig.js.map