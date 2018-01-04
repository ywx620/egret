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
var CreateView = (function (_super) {
    __extends(CreateView, _super);
    function CreateView() {
        var _this = _super.call(this) || this;
        var shape = new egret.Shape();
        shape.graphics.beginFill(0xff0000);
        shape.graphics.drawCircle(0, 0, 200);
        shape.graphics.endFill();
        _this.addChild(shape);
        var txt = new egret.TextField();
        _this.addChild(txt);
        txt.text = "646136549879";
        var image = new eui.Image();
        image.source = "bg_jpg";
        _this.addChild(image);
        var button = new eui.Button();
        button.label = "Test";
        button.width = 200;
        button.height = 150;
        _this.addChild(button);
        button.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
        }, _this);
        _this.addChild(new TestView);
        return _this;
    }
    CreateView.prototype.init = function () {
    };
    return CreateView;
}(egret.Sprite));
__reflect(CreateView.prototype, "CreateView");
//# sourceMappingURL=CreateView.js.map