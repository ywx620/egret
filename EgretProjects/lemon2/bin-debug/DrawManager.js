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
var DrawManager = (function (_super) {
    __extends(DrawManager, _super);
    function DrawManager() {
        return _super.call(this) || this;
    }
    DrawManager.prototype.createRect = function (x, y, w, h, c, a) {
        if (c === void 0) { c = 0; }
        if (a === void 0) { a = 1; }
        var shape = new egret.Shape();
        shape.graphics.beginFill(c, a);
        shape.graphics.drawRect(x, y, w, h);
        return shape;
    };
    DrawManager.prototype.createCircle = function (x, y, r, c, a) {
        if (c === void 0) { c = 0; }
        if (a === void 0) { a = 1; }
        var shape = new egret.Shape();
        shape.graphics.beginFill(c, a);
        shape.graphics.drawCircle(x, y, r);
        return shape;
    };
    return DrawManager;
}(egret.HashObject));
__reflect(DrawManager.prototype, "DrawManager");
var DrawNode = (function (_super) {
    __extends(DrawNode, _super);
    function DrawNode(n) {
        var _this = _super.call(this) || this;
        _this.vx = 0;
        _this.vy = 0;
        _this.reverseY = 1;
        _this.g = 0.5;
        _this.node = n;
        _this.addChild(n);
        return _this;
    }
    return DrawNode;
}(egret.Sprite));
__reflect(DrawNode.prototype, "DrawNode");
//# sourceMappingURL=DrawManager.js.map