"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Artifact = void 0;
var path_1 = require("path");
var fs_1 = require("fs");
var Artifact = /** @class */ (function () {
    function Artifact(path, contentType) {
        if (contentType === void 0) { contentType = "raw"; }
        this.path = path;
        this.name = (0, path_1.basename)(path);
        this.contentType = contentType;
    }
    Object.defineProperty(Artifact.prototype, "contentLength", {
        get: function () {
            return (0, fs_1.statSync)(this.path).size;
        },
        enumerable: false,
        configurable: true
    });
    Artifact.prototype.readFile = function () {
        return (0, fs_1.createReadStream)(this.path);
    };
    return Artifact;
}());
exports.Artifact = Artifact;
