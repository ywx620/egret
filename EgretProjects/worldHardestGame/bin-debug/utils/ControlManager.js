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
var control;
(function (control) {
    var ControlBasic = (function () {
        function ControlBasic(stage) {
            this.stage = stage;
        }
        /** 打开事件*/
        ControlBasic.prototype.open = function () {
            this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
        };
        /** 关闭事件*/
        ControlBasic.prototype.close = function () {
            this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
        };
        ControlBasic.prototype.onTouch = function (e) {
            switch (e.type) {
                case egret.TouchEvent.TOUCH_BEGIN:
                    this.posStart = new egret.Point(e.stageX, e.stageY);
                    this.controlStart();
                    break;
                case egret.TouchEvent.TOUCH_MOVE:
                    this.posMove = new egret.Point(e.stageX, e.stageY);
                    this.controlMove();
                    break;
                case egret.TouchEvent.TOUCH_END:
                    this.posEnd = new egret.Point(e.stageX, e.stageY);
                    this.controlEnd();
                    break;
            }
        };
        /** 手指按下*/
        ControlBasic.prototype.controlStart = function () {
            if (this.startBackFun != null) {
                this.startBackFun(this.posStart);
            }
            this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
            this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
        };
        /** 手指移动*/
        ControlBasic.prototype.controlMove = function () {
            if (this.moveBackFun != null) {
                this.moveBackFun(this.posMove);
            }
        };
        /** 手指离开*/
        ControlBasic.prototype.controlEnd = function () {
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
        };
        return ControlBasic;
    }());
    control.ControlBasic = ControlBasic;
    __reflect(ControlBasic.prototype, "control.ControlBasic");
    /**
     * @author vinson
     * 创建时间：2017-12-28 上午9:36:42
     * 控制杆自由控制移动
     */
    var ControlBarMove = (function (_super) {
        __extends(ControlBarMove, _super);
        function ControlBarMove(stage, controlBar, controlBg) {
            var _this = _super.call(this, stage) || this;
            _this.controlBar = controlBar;
            _this.controlBg = controlBg;
            return _this;
        }
        ControlBarMove.prototype.controlMove = function () {
            var x = this.posMove.x, y = this.posMove.y;
            var bg = this.controlBg;
            var bar = this.controlBar;
            var cx = bg.x;
            var cy = bg.y;
            var dx = x - cx;
            var dy = y - cy;
            var ds = Math.sqrt(dx * dx + dy * dy);
            var r = bg.width >> 1;
            var conA = dx / ds;
            var sinA = dy / ds;
            if (ds < r) {
                bar.x = x;
                bar.y = y;
            }
            else {
                bar.x = cx + conA * r;
                bar.y = cy + sinA * r;
            }
            if (this.moveBackFun != null) {
                var value = new egret.Point(bar.x - bg.x, bar.y - bg.y);
                this.moveBackFun(value);
            }
        };
        ControlBarMove.prototype.controlEnd = function () {
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
            var bg = this.controlBg;
            var bar = this.controlBar;
            bar.x = bg.x;
            bar.y = bg.y;
            if (this.endBackFun != null) {
                this.endBackFun(this.posEnd);
            }
        };
        return ControlBarMove;
    }(ControlBasic));
    control.ControlBarMove = ControlBarMove;
    __reflect(ControlBarMove.prototype, "control.ControlBarMove");
    /**
     * @author vinson
     * 创建时间：2017-12-28 上午9:36:42
     * 手指滑动，向上向下向左向右滑动
     */
    var ControlFingerMove = (function (_super) {
        __extends(ControlFingerMove, _super);
        function ControlFingerMove(stage) {
            return _super.call(this, stage) || this;
        }
        ControlFingerMove.prototype.controlEnd = function () {
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
            var disx = this.posEnd.x - this.posStart.x;
            var disy = this.posEnd.y - this.posStart.y;
            var value = new egret.Point(0, 0);
            if (Math.abs(disx) > Math.abs(disy)) {
                value.x = disx > 0 ? 1 : -1;
            }
            else {
                value.y = disy > 0 ? 1 : -1;
            }
            if (this.endBackFun != null) {
                this.endBackFun(this.posEnd);
            }
            if (this.moveEndBackFun != null) {
                this.moveEndBackFun(value);
            }
        };
        return ControlFingerMove;
    }(ControlBasic));
    control.ControlFingerMove = ControlFingerMove;
    __reflect(ControlFingerMove.prototype, "control.ControlFingerMove");
    /**
     * @author vinson
     * 创建时间：2017-12-28 上午9:36:42
     * 可示对象自由拖动
     */
    var ControlDrag = (function (_super) {
        __extends(ControlDrag, _super);
        function ControlDrag(stage, display) {
            var _this = _super.call(this, stage) || this;
            _this.display = display;
            _this.distance = new egret.Point;
            return _this;
        }
        /** 打开事件*/
        ControlDrag.prototype.open = function () {
            this.display.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
        };
        /** 关闭事件*/
        ControlDrag.prototype.close = function () {
            this.display.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
        };
        ControlDrag.prototype.onTouch = function (e) {
            _super.prototype.onTouch.call(this, e);
            switch (e.type) {
                case egret.TouchEvent.TOUCH_BEGIN:
                    this.distance.x = e.stageX - this.display.x;
                    this.distance.y = e.stageY - this.display.y;
                    break;
            }
        };
        ControlDrag.prototype.controlMove = function () {
            this.display.x = this.posMove.x - this.distance.x;
            this.display.y = this.posMove.y - this.distance.y;
        };
        ControlDrag.prototype.controlEnd = function () {
            _super.prototype.controlEnd.call(this);
            if (this.endBackFun != null) {
                this.endBackFun();
            }
        };
        return ControlDrag;
    }(ControlBasic));
    control.ControlDrag = ControlDrag;
    __reflect(ControlDrag.prototype, "control.ControlDrag");
})(control || (control = {}));
//# sourceMappingURL=ControlManager.js.map