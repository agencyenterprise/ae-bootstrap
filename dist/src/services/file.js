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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = __importDefault(require("colors"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const util_1 = require("util");
const writeAsync = util_1.promisify(fs.writeFile);
exports.read = util_1.promisify(fs.readFile);
exports.readdir = util_1.promisify(fs.readdir);
exports.stat = util_1.promisify(fs.stat);
function write(filePath, data, dryRun = false) {
    return __awaiter(this, void 0, void 0, function* () {
        console.info(colors_1.default.green('CREATE'), filePath, `(${data.byteLength} bytes)`);
        if (dryRun) {
            return Promise.resolve();
        }
        return yield writeAsync(filePath, data);
    });
}
exports.write = write;
function copyDir(source, target, dryRun = false) {
    return __awaiter(this, void 0, void 0, function* () {
        const items = yield exports.readdir(source);
        if (!fs.existsSync(target)) {
            fs.mkdirSync(target);
        }
        for (const file of items) {
            const sourceFile = path.join(source, file);
            const targetFile = path.join(target, file);
            const meta = yield exports.stat(sourceFile);
            if (meta.isDirectory()) {
                yield copyDir(sourceFile, targetFile, dryRun);
            }
            else {
                const content = yield exports.read(sourceFile);
                yield write(targetFile, content, dryRun);
            }
        }
    });
}
exports.copyDir = copyDir;
function readJson(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        const buffer = yield exports.read(filePath);
        return JSON.parse(buffer.toString());
    });
}
exports.readJson = readJson;
function exists(filePath) {
    return fs.existsSync(filePath);
}
exports.exists = exists;
//# sourceMappingURL=file.js.map