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
        _this.text = "TestWebSocket";
        _this.initStateText();
        _this.initWebSocket();
        return _this;
    }
    Main.prototype.initStateText = function () {
        this.stateText = new egret.TextField();
        this.stateText.size = 22;
        this.stateText.text = this.text;
        this.stateText.width = 480;
        this.addChild(this.stateText);
    };
    Main.prototype.initWebSocket = function () {
        //创建 WebSocket 对象
        this.socket = new egret.WebSocket();
        //设置数据格式为二进制，默认为字符串
        //this.socket.type = egret.WebSocket.TYPE_BINARY;
        this.socket.type = egret.WebSocket.TYPE_STRING;
        //添加收到数据侦听，收到数据会调用此方法
        this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
        //添加链接打开侦听，连接成功会调用此方法
        this.socket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
        //添加链接关闭侦听，手动关闭或者服务器关闭连接会调用此方法
        this.socket.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
        //添加异常侦听，出现异常会调用此方法
        this.socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
        //连接服务器
        this.socket.connect("echo.websocket.org", 80);
    };
    Main.prototype.sendData = function () {
        //创建 ByteArray 对象
        var byte = new egret.ByteArray();
        //写入字符串信息
        byte.writeUTF("Hello Egret WebSocket");
        //写入布尔值信息
        //byte.writeBoolean(false);
        //写入int值信息
        //byte.writeInt(123);
        byte.position = 0;
        //发送数据
        this.socket.writeBytes(byte, 0, byte.bytesAvailable);
    };
    Main.prototype.onSocketOpen = function () {
        this.trace("WebSocketOpen");
        this.sendData();
    };
    Main.prototype.onSocketClose = function () {
        this.trace("WebSocketClose");
    };
    Main.prototype.onSocketError = function () {
        this.trace("WebSocketError");
    };
    Main.prototype.onReceiveMessage = function (e) {
        // //创建 ByteArray 对象
        // var byte:egret.ByteArray = new egret.ByteArray();
        // //读取数据
        // this.socket.readBytes(byte);
        // //读取字符串信息
        // var msg:string = byte.readUTF();
        // //读取布尔值信息
        // var boo:boolean = byte.readBoolean();
        // //读取int值信息
        // var num:number = byte.readInt();
        // this.trace("收到数据:");
        // this.trace("readUTF : "+msg);
        // this.trace("readBoolean : "+boo.toString());
        // this.trace("readInt : "+num.toString());
        this.trace(this.socket.readUTF());
    };
    Main.prototype.trace = function (msg) {
        this.text = this.text + "\n" + msg;
        this.stateText.text = this.text;
        egret.log(msg);
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map