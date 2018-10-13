"use strict";
/// <reference path="../lib/types.d.ts" />
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CompileProject = require("../actions/CompileProject");
var path = require("path");
var InternalCompile = (function () {
    function InternalCompile() {
    }
    InternalCompile.prototype.execute = function () {
        var options = egret.args;
        options.releaseDir = path.resolve(egret.args.projectDir, options.fileName);
        options.minify = true;
        options.publish = true;
        var compileProject = new CompileProject();
        var result = compileProject.compile(options);
        return 0;
    };
    return InternalCompile;
}());
__reflect(InternalCompile.prototype, "InternalCompile", ["egret.Command"]);
module.exports = InternalCompile;
//# sourceMappingURL=internal_compile.js.map