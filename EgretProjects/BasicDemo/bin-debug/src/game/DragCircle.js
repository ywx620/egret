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
var DragCircle = (function (_super) {
    __extends(DragCircle, _super);
    function DragCircle() {
        var _this = _super.call(this) || this;
        _this.sizeMin = 30;
        _this.sizeMid = 60;
        _this.sizeMax = 90;
        _this.checkArray = [];
        _this.colors = [0XFF0000, 0XFFFF00, 0X006600, 0XFF8C69];
        _this.score = 0;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.addToStage, _this); //只帧听一次后自动删除
        return _this;
    }
    DragCircle.prototype.addToStage = function () {
        var bg = new egret.Sprite;
        bg.graphics.beginFill(0X00ccff);
        bg.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
        this.addChild(bg);
        this.currPoint = new egret.Point(this.stage.stageWidth / 2, 800);
        this.nextPoint = new egret.Point(this.stage.stageWidth / 2, 800);
        this.createMonePoint();
        this.nodeMax = this.createContainer();
        this.nodeMid = this.createContainer();
        this.nodeMin = this.createContainer();
        this.coltrolMove = new control.ControlDrag(this.stage, null);
        this.coltrolMove.endBackFun = this.endBackFun.bind(this);
        this.coltrolMove.open();
        this.createNewCircle();
        var btn = new moon.BasicButton();
        btn.label = "更新";
        btn.y = 600;
        this.addChild(btn);
        btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
    };
    DragCircle.prototype.onTouch = function (e) {
        if (this.target.parent) {
            this.target.parent.removeChild(this.target);
        }
        this.createNewCircle();
    };
    /**拖动结束时 */
    DragCircle.prototype.endBackFun = function () {
        var points = this.points;
        var target = this.target;
        for (var i = 0; i < points.length; i++) {
            var p = points[i];
            var r = p.width / 2;
            var dx = p.x - target.x, dy = p.y - target.y;
            var dis = Math.sqrt(dx * dx + dy * dy);
            if (dis < r) {
                //target.x=p.x;target.y=p.y;
                egret.Tween.get(target).to({ x: p.x, y: p.y }, 200).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.backIn);
                if (this.canPush(target, p.name)) {
                    this.checkResult(target, p.name);
                    this.createNewCircle();
                    return;
                }
            }
        }
        target.x = this.currPoint.x;
        target.y = this.currPoint.y;
    };
    /**创建容器 */
    DragCircle.prototype.createContainer = function () {
        var node = new egret.Sprite();
        this.addChild(node);
        return node;
    };
    /**创建新的圆 */
    DragCircle.prototype.createNewCircle = function () {
        var random = Math.random();
        var color = this.colors[Math.floor(Math.random() * this.colors.length)];
        var size;
        if (random > 0.7)
            size = this.sizeMax;
        else if (random > 0.4)
            size = this.sizeMid;
        else
            size = this.sizeMin;
        this.target = this.createCircle(size, color);
        this.target.scaleX = this.target.scaleY = 1.1;
        this.coltrolMove.target = this.target;
    };
    /**根据大小与颜色创建圆 */
    DragCircle.prototype.createCircle = function (size, color) {
        var node = new egret.Sprite();
        node.graphics.lineStyle(2);
        node.graphics.beginFill(color);
        node.graphics.drawCircle(0, 0, size);
        node.graphics.endFill();
        node.x = this.currPoint.x;
        node.y = this.currPoint.y;
        node.name = color + "_" + size;
        switch (size) {
            case this.sizeMax:
                this.nodeMax.addChild(node);
                break;
            case this.sizeMid:
                this.nodeMid.addChild(node);
                break;
            case this.sizeMin:
                this.nodeMin.addChild(node);
                break;
        }
        return node;
    };
    /**创建9个圆点 */
    DragCircle.prototype.createMonePoint = function () {
        var points = [];
        for (var i = 0; i < 9; i++) {
            var p = this.createPoint();
            p.name = "" + Math.floor(i / 3) + i % 3;
            //trace(p.name);
            points.push(p);
            this.addChild(p);
        }
        this.points = points;
        LayoutManager.displayRank(points, 3, 20, 20, 100, 100);
        for (i = 0; i < 3; i++) {
            var array = [];
            for (var j = 0; j < 3; j++) {
                array.push([]);
            }
            this.checkArray.push(array);
        }
    };
    /**创建圆点 */
    DragCircle.prototype.createPoint = function () {
        var node = new egret.Sprite();
        node.graphics.lineStyle(1);
        node.graphics.drawCircle(0, 0, this.sizeMax);
        node.graphics.endFill();
        node.graphics.beginFill(0);
        node.graphics.drawCircle(0, 0, 5);
        node.graphics.endFill();
        this.addChild(node);
        return node;
    };
    /**能否PUSH到数组中 */
    DragCircle.prototype.canPush = function (tagret, pos) {
        var i = parseInt(pos.substr(0, 1));
        var j = parseInt(pos.substr(1, 1));
        var array = this.checkArray[i][j];
        for (var i = 0; i < array.length; i++) {
            var t = array[i];
            if (t.name.split("_")[1] == tagret.name.split("_")[1]) {
                return false; //大小尺寸一样的不能再放
            }
        }
        return true;
    };
    /**查看结果 */
    DragCircle.prototype.checkResult = function (tagret, pos) {
        var i = parseInt(pos.substr(0, 1));
        var j = parseInt(pos.substr(1, 1));
        var array = this.checkArray[i][j];
        var t;
        array.push(tagret);
        if (array.length == 3) {
            var color0 = array[0].name.split("_")[0];
            var color1 = array[1].name.split("_")[0];
            var color2 = array[2].name.split("_")[0];
            if (color0 == color1 && color1 == color2) {
                while (array.length > 0) {
                    t = array[0];
                    this.tweenTarget(t);
                    array.splice(0, 1);
                }
            }
        }
        var a = this.checkArray;
        //查看横排
        var b = a[i][0];
        var c = a[i][1];
        var d = a[i][2];
        this.checkThreeArray(b, c, d);
        b = a[0][j];
        c = a[1][j];
        d = a[2][j];
        this.checkThreeArray(b, c, d);
        if (i == j) {
            b = a[0][0];
            c = a[1][1];
            d = a[2][2];
            this.checkThreeArray(b, c, d);
        }
        if (i + j == 2) {
            b = a[0][2];
            c = a[1][1];
            d = a[2][0];
            this.checkThreeArray(b, c, d);
        }
    };
    DragCircle.prototype.removeNode = function (t) {
        t.parent.removeChild(t);
    };
    DragCircle.prototype.checkThreeArray = function (b, c, d) {
        for (var n = 0; n < b.length; n++) {
            var count1 = 1;
            var count2 = 0;
            var count3 = 0;
            var tb = b[n];
            var tbc = tb.name.split("_")[0];
            var temp = [tb];
            for (var i = 0; i < b.length; i++) {
                var tbb = b[i];
                var tbcc = tbb.name.split("_")[0];
                if (i != n) {
                    if (tbc == tbcc) {
                        temp.push(tbb);
                    }
                }
            }
            for (var i = 0; i < c.length; i++) {
                var tc = c[i];
                var tcc = tc.name.split("_")[0];
                if (tbc == tcc) {
                    count2 = 1;
                    temp.push(tc);
                }
            }
            for (var i = 0; i < d.length; i++) {
                var td = d[i];
                var tdc = td.name.split("_")[0];
                if (tbc == tdc) {
                    count3 = 1;
                    temp.push(td);
                }
            }
            if ((count1 + count2 + count3) == 3) {
                for (var i = 0; i < temp.length; i++) {
                    var t = temp[i];
                    this.tweenTarget(t);
                    var index = b.indexOf(t);
                    if (index >= 0)
                        b.splice(index, 1);
                    index = c.indexOf(t);
                    if (index >= 0)
                        c.splice(index, 1);
                    index = d.indexOf(t);
                    if (index >= 0)
                        d.splice(index, 1);
                }
            }
        }
    };
    DragCircle.prototype.tweenTarget = function (t) {
        egret.Tween.get(t).wait(400).to({ alpha: 0, scaleX: 0, scaleY: 0, x: 0, y: 0 }, 500).call(this.removeNode, this, [t]);
        this.score++;
        traceSimple(this.score);
    };
    return DragCircle;
}(egret.DisplayObjectContainer));
__reflect(DragCircle.prototype, "DragCircle");
//# sourceMappingURL=DragCircle.js.map