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
const path = __importStar(require("path"));
const exec_1 = require("../services/exec");
const file_1 = require("../services/file");
const prettier_1 = require("../services/prettier");
function copyFile(sourceFile, destFile, dryRun = false) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield file_1.read(path.join(__dirname, sourceFile));
        yield file_1.write(path.resolve(destFile), data, dryRun);
    });
}
function init(type, { dryRun }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield copyFile('../../.editorconfig', '.editorconfig', dryRun);
            yield copyFile('../../.prettierrc', '.prettierrc', dryRun);
            yield copyFile(`../../tslint-${type}.json`, 'tslint.json', dryRun);
            yield copyFile(`../../.gitignore-${type}`, '.gitignore', dryRun);
            yield file_1.copyDir(path.join(__dirname, '../../.github'), path.resolve('.github'), dryRun);
            yield file_1.copyDir(path.join(__dirname, '../../.circleci'), path.resolve('.circleci'), dryRun);
            yield exec_1.install('tslint-config-codingwise', '-D', dryRun);
            yield exec_1.install('lint-staged', '-D', dryRun);
            yield exec_1.install('husky@next', '-D', dryRun);
            yield exec_1.install('prettier', '-D', dryRun);
            yield prettier_1.hookPrettier(dryRun);
            yield exec_1.runPrettier(dryRun);
            yield exec_1.runLint(type, dryRun);
            console.info(colors_1.default.green('Done initializing the project.'));
        }
        catch (err) {
            console.trace(colors_1.default.red('init error'), err);
        }
        if (dryRun) {
            console.info();
            console.info('NOTE: Run with "dry run" no changes were made.');
        }
    });
}
exports.init = init;
//# sourceMappingURL=init.js.map