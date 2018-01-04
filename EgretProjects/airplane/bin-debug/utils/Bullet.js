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
var Buttlet = (function (_super) {
    __extends(Buttlet, _super);
    function Buttlet(name) {
        var _this = _super.call(this) || this;
        _this.targetX = 0;
        _this.targetY = 0;
        _this.render(name);
        return _this;
    }
    Buttlet.prototype.render = function (name) {
        this.skin = this.createBitmapByName(name);
        this.addChild(this.skin);
    };
    Buttlet.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    Buttlet.prototype.changeAngle = function () {
        var x = this.targetX - this.x;
        var y = this.targetY - this.y;
        var d = Math.sqrt(x * x + y * y);
        this.rotation = x / d * 180 / Math.PI;
    };
    return Buttlet;
}(egret.Sprite));
__reflect(Buttlet.prototype, "Buttlet");
//# sourceMappingURL=Bullet.js.map