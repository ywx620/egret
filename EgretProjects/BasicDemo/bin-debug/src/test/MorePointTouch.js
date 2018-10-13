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
var MorePointTouch = (function (_super) {
    __extends(MorePointTouch, _super);
    function MorePointTouch() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MorePointTouch.prototype.render = function () {
        this.displays = [];
        this.rect = this.createRect(100, 100, 0XFFFF00, 100, 100);
        this.circle = this.createCircle(50, 0XFF0000, 350, 350);
        this.rect.name = "rect";
        this.circle.name = "circle";
        this.displays.push(this.rect, this.circle);
        this.txt1 = this.createText(0, 0, "rect");
        this.txt2 = this.createText(0, 40, "circle");
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
                        if (display.name == "rect") {
                            this.txt1.text = "rect";
                        }
                        else if (display.name == "circle") {
                            this.txt2.text = "circle";
                        }
                    }
                    display.id = -1;
                }
                break;
        }
    };
    MorePointTouch.prototype.controlStart = function (x, y, id) {
        for (var i = 0; i < this.displays.length; i++) {
            var display = this.displays[i];
            if (display.hitTestPoint(x, y)) {
                display.id = id;
                display.distance = new Point(x - display.x, y - display.y);
            }
        }
        if (this.rect.hitTestPoint(x, y)) {
            this.txt1.text = "rect=" + Math.random();
        }
        if (this.circle.hitTestPoint(x, y)) {
            this.txt2.text = "circle=" + Math.random();
        }
    };
    return MorePointTouch;
}(moon.BasicView));
__reflect(MorePointTouch.prototype, "MorePointTouch");
var MorePointNode = (function (_super) {
    __extends(MorePointNode, _super);
    function MorePointNode() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MorePointNode;
}(Sprite));
__reflect(MorePointNode.prototype, "MorePointNode");
var MorePointTouch2 = (function (_super) {
    __extends(MorePointTouch2, _super);
    function MorePointTouch2() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.addToStage, _this);
        return _this;
    }
    MorePointTouch2.prototype.addToStage = function () {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
        this.displays = [];
        this.rect = new MorePointNode2();
        this.circle = new MorePointNode2();
        this.addChild(this.rect);
        this.addChild(this.circle);
        this.circle.x = 300;
        this.rect.name = "rect";
        this.circle.name = "circle";
        this.displays.push(this.rect, this.circle);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
    };
    MorePointTouch2.prototype.onTouch = function (e) {
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
    MorePointTouch2.prototype.controlStart = function (x, y, id) {
        for (var i = 0; i < this.displays.length; i++) {
            var display = this.displays[i];
            if (display.hitTestPoint(x, y)) {
                display.id = id;
                display.distance = new Point(x - display.x, y - display.y);
            }
        }
    };
    return MorePointTouch2;
}(egret.DisplayObjectContainer));
__reflect(MorePointTouch2.prototype, "MorePointTouch2");
var MorePointNode2 = (function (_super) {
    __extends(MorePointNode2, _super);
    function MorePointNode2() {
        var _this = _super.call(this) || this;
        var shape = new egret.Shape();
        shape.graphics.beginFill(0x00ff00);
        shape.graphics.drawRect(0, 0, 200, 200);
        shape.graphics.endFill();
        _this.addChild(shape);
        return _this;
    }
    return MorePointNode2;
}(Sprite));
__reflect(MorePointNode2.prototype, "MorePointNode2");
//# sourceMappingURL=MorePointTouch.js.map