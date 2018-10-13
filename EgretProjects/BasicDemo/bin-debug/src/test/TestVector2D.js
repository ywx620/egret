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