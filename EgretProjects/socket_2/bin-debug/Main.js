var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function (event) {
        this.initPomelo();
    };
    Main.prototype.initPomelo = function () {
        // egret.log("开始")
        var host = "192.168.62.159";
        var port = 3010;
        var pomelo = new Pomelo();
        //var pomelo:pomeloClient.Pomelo = new pomeloClient.Pomelo();
        // pomelo.on('io-error', function(e:any):void {
        //         // 错误处理
        //         egret.log("wrong")
        // });
        // pomelo.on('close', function(e:any):void {
        //         // 连接关闭
        //          egret.log("close")
        // });
        // 连接到服务器 127.0.0.1:3010
        pomelo.init({ host: host, port: port }, this.connet);
    };
    Main.prototype.connet = function (response) {
        if (response.code === 200) {
            // 连接成功
            egret.log("OK");
        }
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map