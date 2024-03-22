"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Context = void 0;
var github = require("@actions/github");
var Context = /** @class */ (function () {
    function Context() {
        this.context = github.context;
    }
    Object.defineProperty(Context.prototype, "repo", {
        get: function () {
            return this.context.repo.repo;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Context.prototype, "owner", {
        get: function () {
            return this.context.repo.owner;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Context.prototype, "tag", {
        get: function () {
            var ref = this.context.ref;
            var tagPath = "refs/tags/";
            if (ref && ref.startsWith(tagPath)) {
                return ref.substr(tagPath.length, ref.length);
            }
            throw Error("No tag found in ref or input!");
        },
        enumerable: false,
        configurable: true
    });
    return Context;
}());
exports.Context = Context;
