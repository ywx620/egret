"use strict";
/// <reference path="../lib/types.d.ts" />
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var service = require("../service/index");
var Quit = (function () {
    function Quit() {
    }
    Quit.prototype.execute = function () {
        service.client.execCommand({
            path: egret.args.projectDir,
            command: "shutdown",
            option: egret.args
        }, function () { return process.exit(0); }, true);
        return DontExitCode;
    };
    return Quit;
}());
__reflect(Quit.prototype, "Quit", ["egret.Command"]);
module.exports = Quit;
//# sourceMappingURL=quit.js.map