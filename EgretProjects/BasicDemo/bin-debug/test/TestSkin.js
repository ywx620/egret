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
var TestSkinClass = (function (_super) {
    __extends(TestSkinClass, _super);
    function TestSkinClass() {
        var _this = _super.call(this) || this;
        _this.setSkinName("resource/askins/TestSkin.exml");
        return _this;
    }
    TestSkinClass.prototype.render = function () {
        moon.LogManager.getIns().setLogMessageColor(0);
        for (var i = 0; i < this.numChildren; i++) {
            var image = this.getChildAt(i);
            trace(image instanceof eui.Button, image.name, image.x, image.y);
            if (image instanceof eui.Group) {
                for (var j = 0; j < image.numChildren; j++) {
                    var im = image.getChildAt(j);
                    trace("button=", im.x, im.y);
                    var p = image.localToGlobal(im.x, im.y); //坐标转全局
                    trace(p.x, p.y);
                }
            }
        }
        var p = this.group.globalToLocal(this.btn.x, this.btn.y); //坐标转地方
        trace(p.x, p.y);
    };
    return TestSkinClass;
}(BasicComponent));
__reflect(TestSkinClass.prototype, "TestSkinClass");
//# sourceMappingURL=TestSkin.js.map