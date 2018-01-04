var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ReadJson = (function () {
    function ReadJson() {
        this.init();
    }
    ReadJson.prototype.init = function () {
        var data = RES.getRes("RoleIcon_json");
        for (var i in data) {
            var d = data[i];
            for (var j in d) {
                moon.showLog.getIns().logMessage(j + "=" + d[j]);
            }
        }
    };
    return ReadJson;
}());
__reflect(ReadJson.prototype, "ReadJson");
//# sourceMappingURL=ReadJson.js.map