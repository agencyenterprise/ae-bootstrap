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
const file_1 = require("./file");
function hookPrettier(dryRun = false) {
    return __awaiter(this, void 0, void 0, function* () {
        const filename = 'package.json';
        const file = path.resolve(filename);
        const userPackage = JSON.parse((yield file_1.read(file)).toString());
        userPackage.husky = {
            hooks: {
                'pre-commit': 'lint-staged',
            },
        };
        userPackage['lint-staged'] = {
            '*.{ts,tsx,scss,md,css}': ['prettier --write', 'git add'],
        };
        console.info(colors_1.default.green('PATCH prettier'), filename);
        if (dryRun) {
            return Promise.resolve();
        }
        const spaces = 2;
        const patchedPack = JSON.stringify(userPackage, undefined, spaces);
        yield file_1.write(file, Buffer.from(`${patchedPack}\n`));
    });
}
exports.hookPrettier = hookPrettier;
//# sourceMappingURL=prettier.js.map