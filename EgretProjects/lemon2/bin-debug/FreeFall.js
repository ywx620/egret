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
var FreeFall = (function (_super) {
    __extends(FreeFall, _super);
    function FreeFall() {
        var _this = _super.call(this) || this;
        _this.shapes = [];
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    FreeFall.prototype.onAddToStage = function (event) {
        var drawManager = new DrawManager();
        this.addChild(drawManager.createRect(0, 0, this.stage.stageWidth, this.stage.stageHeight));
        for (var i = 0; i < 100; i++) {
            var circle = drawManager.createCircle(Math.random() * this.stage.stageWidth, 0, 10, Math.random() * 0XFFFFFF);
            var node = new DrawNode(circle);
            node.vy = Math.random() * 2;
            this.addChild(node);
            this.shapes.push(node);
        }
        this.stage.addEventListener(egret.Event.ENTER_FRAME, this.onLoop, this);
    };
    FreeFall.prototype.onLoop = function (e) {
        for (var i = 0; i < this.shapes.length; i++) {
            var node = this.shapes[i];
            var s = node.g;
            node.vy += (s * node.reverseY);
            node.y += node.vy * node.reverseY;
            if (node.y > this.stage.stageHeight) {
                node.y = this.stage.stageHeight;
                node.reverseY *= -1;
                node.g += 0.1;
            }
        }
    };
    return FreeFall;
}(egret.DisplayObjectContainer));
__reflect(FreeFall.prototype, "FreeFall");
//# sourceMappingURL=FreeFall.js.map