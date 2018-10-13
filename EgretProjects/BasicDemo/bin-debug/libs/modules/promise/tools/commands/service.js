"use strict";
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var service = require("../service/index");
var Service = (function () {
    function Service() {
    }
    Service.prototype.execute = function () {
        service.server.run();
        return DontExitCode;
    };
    return Service;
}());
__reflect(Service.prototype, "Service", ["egret.Command"]);
module.exports = Service;
//# sourceMappingURL=service.js.map