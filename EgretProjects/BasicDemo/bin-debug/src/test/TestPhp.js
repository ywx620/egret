var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
//var url:string="http://127.0.0.1/test/helloPhp.php"; 
var url = "http://ptdao.piwater.cn/ywx/data/helloPhp.php";
var TestPhp = (function () {
    function TestPhp() {
        var rs = new RequestServer();
        rs.setUrl(url, "userId=9527&password=123456");
        rs.addEvent(moon.MoonEvent.COMPLETE, this.onComplete, this);
    }
    TestPhp.prototype.onComplete = function (event) {
        trace(event.data);
    };
    return TestPhp;
}());
__reflect(TestPhp.prototype, "TestPhp");
//# sourceMappingURL=TestPhp.js.map