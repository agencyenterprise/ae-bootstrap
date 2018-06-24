#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = __importDefault(require("commander"));
const package_json_1 = __importDefault(require("../package.json"));
process.on('uncaughtException', (err) => {
    console.error(err);
});
commander_1.default
    .version(package_json_1.default.version)
    .command('node', 'node bootstrap commands')
    .command('angular', 'angular bootstrap commands')
    .command('react', 'react bootstrap commands')
    .parse(process.argv);
//# sourceMappingURL=index.js.map