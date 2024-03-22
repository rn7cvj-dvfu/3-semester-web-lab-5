"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreInputs = void 0;
var core = require("@actions/core");
var CoreInputs = /** @class */ (function () {
    function CoreInputs() {
    }
    Object.defineProperty(CoreInputs.prototype, "repoToken", {
        get: function () {
            var token = core.getInput("repo-token");
            return token;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CoreInputs.prototype, "files", {
        get: function () {
            var filesStr = core.getInput("files");
            var fileArr = filesStr.split(", ");
            return fileArr;
        },
        enumerable: false,
        configurable: true
    });
    return CoreInputs;
}());
exports.CoreInputs = CoreInputs;
