#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = __importDefault(require("commander"));
const package_json_1 = __importDefault(require("../package.json"));
const init_1 = require("./shared/init");
commander_1.default
    .version(package_json_1.default.version)
    .option('-i, --init', 'init default bootstrap files')
    .option('-d, --dry-run', 'preview of execution')
    .parse(process.argv);
(() => __awaiter(this, void 0, void 0, function* () {
    if (commander_1.default.init) {
        yield init_1.init('react', commander_1.default);
    }
}))();
//# sourceMappingURL=index-react.js.map