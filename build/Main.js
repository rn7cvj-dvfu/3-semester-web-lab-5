"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core = require("@actions/core");
var github = require("@actions/github");
var Inputs_1 = require("./Inputs");
var Setup_1 = require("./Setup");
var LatexFile_1 = require("./LatexFile");
var Releaser_1 = require("./Releaser");
var Context_1 = require("./Context");
var Artifact_1 = require("./Artifact");
var exec_1 = require("@actions/exec");
function run() {
    return __awaiter(this, void 0, void 0, function () {
        var inputs, latexFiles, artifacts, _i, artifacts_1, artifact, git, context, resleaser;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, Setup_1.setup)()];
                case 1:
                    _a.sent();
                    (0, exec_1.exec)("".concat(__dirname, "/list_files.sh"));
                    inputs = new Inputs_1.CoreInputs();
                    latexFiles = inputs.files.map(function (filePath) { return new LatexFile_1.LatexFile(filePath); });
                    latexFiles.forEach(function (latexFile) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, latexFile.build()];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    }); }); });
                    artifacts = latexFiles.map(function (latexFile) { return new Artifact_1.Artifact(latexFile.outputFilePath); });
                    (0, exec_1.exec)("".concat(__dirname, "/list_files.sh"));
                    core.info("Files generated:");
                    for (_i = 0, artifacts_1 = artifacts; _i < artifacts_1.length; _i++) {
                        artifact = artifacts_1[_i];
                        core.info("File - ".concat(artifact.name, ", size - ").concat(artifact.contentLength, " bytes"));
                    }
                    git = github.getOctokit(inputs.repoToken);
                    context = new Context_1.Context();
                    resleaser = new Releaser_1.Releaser(git, context, artifacts);
                    return [4 /*yield*/, resleaser.perform()];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
run().catch(function (error) { return core.setFailed(error.message); });
