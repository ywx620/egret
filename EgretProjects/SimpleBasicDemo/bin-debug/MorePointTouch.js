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
/**多点触控的实现*/
var MorePointTouch = (function (_super) {
    __extends(MorePointTouch, _super);
    function MorePointTouch() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.addToStage, _this);
        return _this;
    }
    MorePointTouch.prototype.addToStage = function () {
        var txt = new egret.TextField();
        this.addChild(txt);
        txt.text = "用两个手指分别拖动两个方块";
        //------
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
        this.displays = [];
        this.rect = new MorePointNode();
        this.circle = new MorePointNode();
        this.addChild(this.rect);
        this.addChild(this.circle);
        this.circle.x = 300;
        this.circle.y = this.rect.y = 100;
        this.rect.name = "rect";
        this.circle.name = "circle";
        this.displays.push(this.rect, this.circle);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
    };
    MorePointTouch.prototype.onTouch = function (e) {
        var id = e.touchPointID;
        var sX = e.stageX;
        var sY = e.stageY;
        switch (e.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                this.controlStart(sX, sY, id);
                break;
            case egret.TouchEvent.TOUCH_MOVE:
                for (var i = 0; i < this.displays.length; i++) {
                    var display = this.displays[i];
                    if (display.id == id) {
                        display.x = sX - display.distance.x;
                        display.y = sY - display.distance.y;
                    }
                }
                break;
            case egret.TouchEvent.TOUCH_END:
                for (var i = 0; i < this.displays.length; i++) {
                    var display = this.displays[i];
                    if (display.id == id) {
                        display.id = -1;
                    }
                }
                break;
        }
    };
    MorePointTouch.prototype.controlStart = function (x, y, id) {
        for (var i = 0; i < this.displays.length; i++) {
            var display = this.displays[i];
            if (display.hitTestPoint(x, y)) {
                display.id = id;
                display.distance = new egret.Point(x - display.x, y - display.y);
            }
        }
    };
    return MorePointTouch;
}(egret.DisplayObjectContainer));
__reflect(MorePointTouch.prototype, "MorePointTouch");
var MorePointNode = (function (_super) {
    __extends(MorePointNode, _super);
    function MorePointNode() {
        var _this = _super.call(this) || this;
        var shape = new egret.Shape();
        shape.graphics.beginFill(0x00ff00);
        shape.graphics.drawRect(0, 0, 200, 200);
        shape.graphics.endFill();
        _this.addChild(shape);
        return _this;
    }
    return MorePointNode;
}(egret.Sprite));
__reflect(MorePointNode.prototype, "MorePointNode");
