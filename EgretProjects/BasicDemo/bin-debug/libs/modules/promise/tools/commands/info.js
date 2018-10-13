"use strict";
/// <reference path="../lib/types.d.ts" />
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var info = (function () {
    function info() {
    }
    info.prototype.execute = function () {
        globals.log(1801, egret.version);
        globals.log(1802, egret.root);
        return 0;
    };
    return info;
}());
__reflect(info.prototype, "info", ["egret.Command"]);
module.exports = info;
//# sourceMappingURL=info.js.map