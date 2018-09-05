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
var TestVector2D = (function (_super) {
    __extends(TestVector2D, _super);
    function TestVector2D() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TestVector2D.prototype.render = function () {
        _super.prototype.render.call(this);
        this.rect = moon.MoonUI.getRect(100, 100);
        this.addChild(this.rect);
        this.v2d = new utils.Vector2D(1, 5);
        this.v2d.length = 3;
        egret.startTick(this.onLoop, this);
    };
    TestVector2D.prototype.onLoop = function (num) {
        this.rect.x += this.v2d.x;
        this.rect.y += this.v2d.y;
        return true;
    };
    return TestVector2D;
}(moon.BasicView));
__reflect(TestVector2D.prototype, "TestVector2D");
//# sourceMappingURL=TestVector2D.js.map