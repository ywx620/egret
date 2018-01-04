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
var Const = (function (_super) {
    __extends(Const, _super);
    function Const() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Const.VER = "1.6";
    Const.REMOVE = "remove";
    Const.MAP_WIDTH = 2272;
    Const.MAP_HEIGHT = 1280;
    Const.CENTER_X = 1136;
    Const.CENTER_Y = 640;
    Const.MAX_ENEMY = 10;
    Const.SOUND_BG = 0.5;
    Const.SOUND_EFFECT = 0.5;
    Const.SOUND_IS_NO = 1;
    return Const;
}(egret.HashObject));
__reflect(Const.prototype, "Const");
//# sourceMappingURL=Const.js.map