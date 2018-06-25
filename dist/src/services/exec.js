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
const child_process_1 = require("child_process");
const util_1 = require("util");
const file_1 = require("./file");
const exec = util_1.promisify(child_process_1.exec);
function install(packageName, type = '-D', dryRun = false) {
    return __awaiter(this, void 0, void 0, function* () {
        console.info(colors_1.default.green('INSTALL'), type, packageName);
        if (dryRun) {
            return Promise.resolve();
        }
        yield exec(`npm i -${type} ${packageName}`);
    });
}
exports.install = install;
function runPrettier(dryRun = false) {
    return __awaiter(this, void 0, void 0, function* () {
        const extensions = [
            'ts',
            'tsx',
            'css',
            'scss',
            'json',
            'md',
        ];
        const globs = extensions.map((ext) => `src/**/*.${ext}`).join(' ');
        const command = `npx prettier --write ${globs}`;
        console.log(colors_1.default.green('RUN'), command);
        if (dryRun) {
            return Promise.resolve();
        }
        yield exec(command);
    });
}
exports.runPrettier = runPrettier;
function runLint(type, dryRun = false) {
    return __awaiter(this, void 0, void 0, function* () {
        const angularFile = path.resolve('angular.json');
        let projName = '';
        if (file_1.exists(angularFile)) {
            const angular = yield file_1.readJson(angularFile);
            if (angular) {
                projName += angular.defaultProject;
            }
        }
        try {
            switch (type) {
                case 'angular':
                    yield exec(`npm run lint ${projName} -- --fix`);
                    break;
                case 'node':
                case 'react':
                    yield exec('npx tslint --project tsconfig.json src/**/*.tsx src/**/*.ts --fix');
                    break;
            }
        }
        catch (error) {
            console.log(colors_1.default.red('LINT RESULT'), error.stdout);
        }
    });
}
exports.runLint = runLint;
function initGit(dryRun = false) {
    return __awaiter(this, void 0, void 0, function* () {
        console.info(colors_1.default.green('INIT GIT'));
        if (dryRun) {
            return Promise.resolve();
        }
        const hasGit = yield file_1.exists(path.resolve('.git'));
        if (!hasGit) {
            yield exec('git init');
        }
    });
}
exports.initGit = initGit;
//# sourceMappingURL=exec.js.map