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