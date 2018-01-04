var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
        egret.log("开始");
        var host = "192.168.53.150";
        var port = 3010;
        var pomelo = new Pomelo();
        pomelo.on('io-error', function (e) {
            // 错误处理
            egret.log("wrong");
        });
        pomelo.on('close', function (e) {
            // 连接关闭
            egret.log("close");
        });
        // 连接到服务器 127.0.0.1:3010
        pomelo.init({
            host: host,
            port: port
        }, function (response) {
            if (response.code === 200) {
                // 连接成功
                egret.log("OK");
            }
        });
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map