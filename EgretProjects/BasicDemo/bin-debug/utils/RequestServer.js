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
/**可与PHP通信的类 */
var RequestServer = (function (_super) {
    __extends(RequestServer, _super);
    function RequestServer() {
        var _this = _super.call(this) || this;
        _this.urlloader = new egret.URLLoader();
        _this.urlreq = new egret.URLRequest();
        _this.urlloader.dataFormat = egret.URLLoaderDataFormat.VARIABLES;
        _this.urlreq.method = egret.URLRequestMethod.POST;
        _this.urlloader.addEventListener(egret.Event.COMPLETE, _this.onComplete, _this);
        return _this;
    }
    /***
     * 设置模式
     * 参数value为模式支持GET与POST
     * value:egret.URLRequestMethod.POST;/egret.URLRequestMethod.GET;
     */
    RequestServer.prototype.setMethod = function (value) {
        this.urlreq.method = value;
    };
    /***
     * 设置数据类型
     * 参数value为数据类型
     * value:egret.URLLoaderDataFormat.VARIABLES;/egret.URLLoaderDataFormat.TEXT;等等
     */
    RequestServer.prototype.setDataFormat = function (value) {
        this.urlloader.dataFormat = value;
    };
    /***
     * 设置地址与参数
     * 参数url为地方param为参数
     * url："http://127.0.0.1/test/helloPhp.php"
     * param："userId=9527&password=123456"
     */
    RequestServer.prototype.setUrl = function (url, param) {
        this.urlreq.url = url;
        this.urlreq.data = new egret.URLVariables(param);
        this.urlloader.load(this.urlreq);
    };
    /**返回的数据 */
    RequestServer.prototype.onComplete = function (event) {
        this.dispEvent(moon.MoonEvent.COMPLETE, this.urlloader.data);
    };
    return RequestServer;
}(moon.MoonContainer));
__reflect(RequestServer.prototype, "RequestServer");
//# sourceMappingURL=RequestServer.js.map