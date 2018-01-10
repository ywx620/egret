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
var trace = function () {
    var arg = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        arg[_i] = arguments[_i];
    }
    for (var i = 0; i < arg.length; i++) {
        moon.showLog.getIns().logMessage(arg[i]);
    }
};
var simpleTrace = function (s) {
    moon.showLog.getIns().log(s);
};
var moon;
(function (moon) {
    /**
     * ...
     * 默认参数x轴,y轴,w宽,h高,r半径,c颜色,ew圆角宽,eh圆家高
     * @author vinson
     */
    var MoonUI = (function () {
        function MoonUI() {
        }
        Object.defineProperty(MoonUI, "randomColor", {
            /**得到随机色*/
            get: function () {
                return Math.random() * 0XFFFFFF;
            },
            enumerable: true,
            configurable: true
        });
        /**得到矩形*/
        MoonUI.getRect = function (w, h, c, x, y) {
            if (c === void 0) { c = 0; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            var s = new egret.Sprite();
            s.graphics.beginFill(c);
            s.graphics.drawRect(x, y, w, h);
            s.graphics.endFill();
            return s;
        };
        /**得到矩形和一个X*/
        MoonUI.getRectAndX = function (w, h, c, x, y) {
            if (c === void 0) { c = 0; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            var s = this.getRect(w, h, c, x, y);
            var l1 = new egret.Sprite;
            l1.graphics.lineStyle(0.1);
            l1.graphics.moveTo(0, 0);
            l1.graphics.lineTo(w, h);
            var l2 = new egret.Sprite;
            l2.graphics.lineStyle(0.1);
            l2.graphics.moveTo(w, 0);
            l2.graphics.lineTo(0, h);
            s.addChild(l1);
            s.addChild(l2);
            return s;
        };
        /**得到圆角矩形*/
        MoonUI.getRoundRect = function (w, h, c, ew, eh, x, y) {
            if (c === void 0) { c = 0; }
            if (ew === void 0) { ew = 5; }
            if (eh === void 0) { eh = 5; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            var s = new egret.Sprite();
            s.graphics.beginFill(c);
            s.graphics.drawRoundRect(x, y, w, h, ew, eh);
            s.graphics.endFill();
            return s;
        };
        /**得到圆形*/
        MoonUI.getCircle = function (r, c, x, y) {
            if (c === void 0) { c = 0; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            var s = new egret.Sprite();
            s.graphics.beginFill(c);
            s.graphics.drawCircle(x, y, r);
            s.graphics.endFill();
            return s;
        };
        /**得到多边形,side边数,rotation角度*/
        MoonUI.getPolygon = function (side, r, c, rotation) {
            if (side === void 0) { side = 3; }
            if (r === void 0) { r = 10; }
            if (c === void 0) { c = 0; }
            if (rotation === void 0) { rotation = 0; }
            var s = new egret.Sprite;
            s.rotation = rotation;
            s.graphics.beginFill(c);
            for (var i = 0; i <= side; i++) {
                var lineX = Math.cos((i * (360 / side) * Math.PI / 180)) * r;
                var lineY = Math.sin((i * (360 / side) * Math.PI / 180)) * r;
                if (i == 0)
                    s.graphics.moveTo(lineX, lineY);
                else
                    s.graphics.lineTo(lineX, lineY);
            }
            s.graphics.endFill();
            return s;
        };
        /**得到圆角矩形与三角形合体rc是正方形颜色,pc是三角形颜色*/
        MoonUI.getArrowRoundRect = function (w, h, rc, pc, rotation) {
            if (pc === void 0) { pc = 0; }
            if (rotation === void 0) { rotation = 0; }
            var s = new egret.Sprite;
            s.addChild(this.getRoundRect(w, h, rc));
            var p = this.getPolygon(3, w / 3, pc, 30 + rotation);
            p.x = s.width >> 1;
            p.y = s.height >> 1;
            s.addChild(p);
            return s;
        };
        /**得到滚动条的bar*/
        MoonUI.getScrollLineBar = function (w, h, c) {
            var s = new egret.Sprite;
            var _h = h / 3;
            for (var i = 0; i < 3; i++) {
                var r = this.getRect(w, 1, c, 0, i * _h);
                s.addChild(r);
            }
            return s;
        };
        /**得到圆角矩形-加*/
        MoonUI.getAddRoundRect = function (w, h, c) {
            var s = new egret.Sprite;
            s.addChild(this.getRoundRect(w, h, c));
            var r1 = this.getRect(w / 2, 2, 0, w / 4, h / 2 - 1);
            var r2 = this.getRect(2, h / 2, 0, w / 2 - 1, h / 4);
            s.addChild(r1);
            s.addChild(r2);
            return s;
        };
        /**得到圆角矩形-减*/
        MoonUI.getRemoveRoundRect = function (w, h, c) {
            var s = new egret.Sprite;
            s.addChild(this.getRoundRect(w, h, c));
            var r = this.getRect(w / 2, 2, 0, w / 4, h / 2 - 1);
            s.addChild(r);
            return s;
        };
        /**得到带文字的圆角方形*/
        MoonUI.getRoundRectText = function (w, h, c, str) {
            if (str === void 0) { str = "click"; }
            var s = new egret.Sprite;
            s.addChild(this.getRoundRect(w, h, c));
            var text = new egret.TextField;
            text.text = str;
            text.x = (s.width - text.width) >> 1;
            text.y = (s.height - text.height) >> 1;
            s.addChild(text);
            return s;
        };
        /**得到矩形-复选框 bc背景颜色，gc钩的颜色,type为0是没有钩为1是有钩*/
        MoonUI.getCheckBoxRect = function (bc, gc, type) {
            if (bc === void 0) { bc = 0XFFFFFF; }
            if (gc === void 0) { gc = 0; }
            if (type === void 0) { type = 0; }
            var s = new egret.Sprite;
            s.addChild(this.getRect(20, 20, bc));
            if (type == 1) {
                var r = new egret.Sprite;
                r.graphics.beginFill(gc);
                r.graphics.moveTo(0, 10);
                r.graphics.lineTo(10, 18);
                r.graphics.lineTo(22, 4);
                r.graphics.lineTo(18, 0);
                r.graphics.lineTo(10, 9);
                r.graphics.lineTo(6, 4);
                r.graphics.lineTo(0, 10);
                s.addChild(r);
            }
            return s;
        };
        /**得到矩形-单选框 bc背景颜色，gc钩的颜色,type为0是没有圆为1是有圆*/
        MoonUI.getRadioCircle = function (bc, gc, type) {
            if (bc === void 0) { bc = 0XFFFFFF; }
            if (gc === void 0) { gc = 0; }
            if (type === void 0) { type = 0; }
            var s = new egret.Sprite;
            s.addChild(this.getCircle(9, bc, 9, 9));
            if (type == 1) {
                var r = this.getCircle(5, gc, 9, 9);
                s.addChild(r);
            }
            return s;
        };
        /**得到矩形-网格
         * rect.x是x轴数量
         * rect.y是y轴数量
         * rect.width是网格宽
         * rect.height是网格高
         * lc网格线颜色
         * */
        MoonUI.getGridding = function (rect, lc) {
            if (lc === void 0) { lc = 0; }
            var s = new egret.Sprite;
            s.graphics.lineStyle(0.1, lc);
            var disx = rect.width / rect.x;
            var disy = rect.height / rect.y;
            for (var i = 0; i < rect.x; i++) {
                s.graphics.moveTo(0, i * disy);
                s.graphics.lineTo(rect.width, i * disy);
            }
            for (i = 0; i < rect.y; i++) {
                s.graphics.moveTo(i * disx, 0);
                s.graphics.lineTo(i * disx, rect.height);
            }
            return s;
        };
        return MoonUI;
    }());
    moon.MoonUI = MoonUI;
    __reflect(MoonUI.prototype, "moon.MoonUI");
    //--------------
    var showLog = (function () {
        function showLog() {
        }
        showLog.getIns = function () {
            if (this.instance == null) {
                this.instance = new showLog();
            }
            return this.instance;
        };
        showLog.prototype.init = function (stage) {
            var txt = new egret.TextField;
            txt.textAlign = egret.HorizontalAlign.LEFT;
            stage.addChild(txt);
            this.txtSimple = txt;
            var txt = new egret.TextField;
            txt.size = 25;
            stage.addChild(txt);
            this.txtMessage = txt;
        };
        /**每次都覆盖上一次信息 */
        showLog.prototype.log = function (value) {
            this.txtSimple.text = value;
        };
        /**显示所有信息 */
        showLog.prototype.logMessage = function (value) {
            this.txtMessage.appendText(value + "\n");
        };
        return showLog;
    }());
    moon.showLog = showLog;
    __reflect(showLog.prototype, "moon.showLog");
    var TipsManager = (function () {
        function TipsManager() {
        }
        TipsManager.getIns = function () {
            if (this.instance == null) {
                this.instance = new TipsManager();
            }
            return this.instance;
        };
        TipsManager.prototype.init = function (stage) {
            this.stage = stage;
        };
        TipsManager.prototype.simpleTips = function (value, pos) {
            if (this.tipsView == null) {
                this.tipsView = new moon.BasicTips("tips_png");
                this.tipsView.setValue(value);
                this.stage.addChild(this.tipsView);
                this.setPosition(pos);
                this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.removeTips, this);
            }
        };
        TipsManager.prototype.setPosition = function (pos) {
            if (pos) {
                this.tipsView.x = pos.x - (this.tipsView.width >> 1);
                this.tipsView.y = pos.y - this.tipsView.height * 2;
                if (this.tipsView.y < 0) {
                    this.tipsView.x = pos.x + 50;
                    this.tipsView.y = pos.y;
                }
                if (this.tipsView.x < 0) {
                    this.tipsView.x = pos.x + 50;
                    this.tipsView.y = pos.y;
                }
                if ((this.tipsView.x + this.tipsView.width) > this.stage.stageWidth) {
                    this.tipsView.x = pos.x - (this.tipsView.width + 50);
                    this.tipsView.y = pos.y;
                }
            }
        };
        TipsManager.prototype.removeTips = function () {
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.removeTips, this);
            var parent = this.tipsView.parent;
            if (parent != null) {
                parent.removeChild(this.tipsView);
                this.tipsView = null;
            }
        };
        return TipsManager;
    }());
    moon.TipsManager = TipsManager;
    __reflect(TipsManager.prototype, "moon.TipsManager");
    var MoonEvent = (function (_super) {
        __extends(MoonEvent, _super);
        function MoonEvent(type, data, currentTarget) {
            if (type === void 0) { type = ""; }
            if (data === void 0) { data = null; }
            if (currentTarget === void 0) { currentTarget = null; }
            var _this = _super.call(this) || this;
            _this.type = type;
            _this.data = data;
            _this.currentTarget = currentTarget;
            return _this;
        }
        //button event
        MoonEvent.MOUSE_OVER = "event-over";
        MoonEvent.MOUSE_OUT = "event-out";
        MoonEvent.MOUSE_DOWN = "event-down";
        MoonEvent.MOUSE_UP = "event-up";
        MoonEvent.CLICK = "event-click";
        //tabbar event
        MoonEvent.CHANGE = "change";
        MoonEvent.COMPLETE = "complete";
        MoonEvent.UPDATE = "update";
        MoonEvent.CHANGE_ROLE = "change role";
        return MoonEvent;
    }(egret.EventDispatcher));
    moon.MoonEvent = MoonEvent;
    __reflect(MoonEvent.prototype, "moon.MoonEvent");
    var MoonContainer = (function (_super) {
        __extends(MoonContainer, _super);
        function MoonContainer() {
            var _this = _super.call(this) || this;
            _this.dataEvent = new Object;
            _this.init();
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.addToStage, _this);
            return _this;
        }
        MoonContainer.prototype.addToStage = function () {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
            this.render();
        };
        /**加载到舞台之前调用 */
        MoonContainer.prototype.init = function () {
        };
        /**加载到舞台之后调用 */
        MoonContainer.prototype.render = function () {
        };
        /**发布事件*/
        MoonContainer.prototype.newDispatchEvent = function (type, data, dataType) {
            if (data === void 0) { data = null; }
            if (dataType === void 0) { dataType = null; }
            if (this.dataEvent) {
                var fun = this.dataEvent[type];
                if (fun != null) {
                    var moonEvent = new MoonEvent;
                    moonEvent.currentTarget = this;
                    moonEvent.data = data;
                    moonEvent.type = type;
                    moonEvent.dataType = dataType;
                    fun(moonEvent);
                }
            }
        };
        /**帧听事件*/
        MoonContainer.prototype.newAddEventListener = function (type, listener) {
            if (this.dataEvent && this.dataEvent[type] == null) {
                this.dataEvent[type] = listener;
            }
        };
        /**删除事件*/
        MoonContainer.prototype.newRemoveEventListener = function (type, listener) {
            if (this.dataEvent && this.dataEvent[type]) {
                delete this.dataEvent[type];
            }
        };
        return MoonContainer;
    }(egret.DisplayObjectContainer));
    moon.MoonContainer = MoonContainer;
    __reflect(MoonContainer.prototype, "moon.MoonContainer");
    var BasicView = (function (_super) {
        __extends(BasicView, _super);
        function BasicView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BasicView.prototype.createText = function (x, y, s) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (s === void 0) { s = ""; }
            var text = new egret.TextField;
            text.x = x;
            text.y = y;
            text.text = s;
            this.addChild(text);
            return text;
        };
        BasicView.prototype.createRect = function (w, h, c, x, y) {
            if (c === void 0) { c = 0; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            var sprite = moon.MoonUI.getRect(w, h, c, x, y);
            this.addChild(sprite);
            return sprite;
        };
        BasicView.prototype.createCircle = function (r, c, x, y) {
            if (c === void 0) { c = 0; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            var sprite = moon.MoonUI.getCircle(r, c, x, y);
            this.addChild(sprite);
            return sprite;
        };
        return BasicView;
    }(MoonContainer));
    moon.BasicView = BasicView;
    __reflect(BasicView.prototype, "moon.BasicView");
    var MapHorizontalHouse = (function (_super) {
        __extends(MapHorizontalHouse, _super);
        function MapHorizontalHouse(rect, house, color) {
            if (color === void 0) { color = -1; }
            var _this = _super.call(this) || this;
            _this.rect = rect;
            _this.house = house;
            _this.color = color;
            return _this;
        }
        MapHorizontalHouse.prototype.render = function () {
            var house = this.house;
            var bg = moon.MoonUI.getRect(this.rect.width, this.rect.height);
            bg.alpha = 0.1;
            this.addChild(bg);
            var count = this.rect.width / house.width;
            var prevx = 0;
            for (var i = 0; i < count; i++) {
                var color = this.color == -1 ? Math.random() * 0XFFFFFF : this.color;
                var width = house.width + Math.random() * house.x;
                var height = house.height + Math.random() * house.y;
                var rect = moon.MoonUI.getRect(width, height, color);
                this.addChild(rect);
                rect.y = this.rect.height - rect.height;
                rect.x = prevx;
                prevx = rect.x + rect.width;
            }
        };
        return MapHorizontalHouse;
    }(MoonContainer));
    moon.MapHorizontalHouse = MapHorizontalHouse;
    __reflect(MapHorizontalHouse.prototype, "moon.MapHorizontalHouse");
    var Scale9Image = (function (_super) {
        __extends(Scale9Image, _super);
        function Scale9Image(name) {
            var _this = _super.call(this) || this;
            _this.image = new eui.Image(name);
            _this.image.scale9Grid = new egret.Rectangle(4, 4, 2, 2);
            _this.addChild(_this.image);
            return _this;
        }
        /**设置宽高，默认为0是不改变大小 */
        Scale9Image.prototype.setSize = function (w, h) {
            if (w === void 0) { w = 0; }
            if (h === void 0) { h = 0; }
            if (w > 0)
                this.image.width = w;
            if (h > 0)
                this.image.height = h;
        };
        return Scale9Image;
    }(MoonContainer));
    moon.Scale9Image = Scale9Image;
    __reflect(Scale9Image.prototype, "moon.Scale9Image");
    var BasicTips = (function (_super) {
        __extends(BasicTips, _super);
        function BasicTips(skinName) {
            var _this = _super.call(this) || this;
            _this.side = 14; //文字离边框的距离
            _this.lineSpacing = 4; //行间距
            _this.image = new Scale9Image(skinName);
            _this.addChild(_this.image);
            _this.text = new egret.TextField;
            _this.text.textAlign = egret.HorizontalAlign.CENTER;
            _this.text.verticalAlign = egret.VerticalAlign.MIDDLE;
            _this.text.lineSpacing = _this.lineSpacing;
            _this.addChild(_this.text);
            return _this;
        }
        BasicTips.prototype.setValue = function (value) {
            this.text.text = value;
            this.setCenter();
        };
        BasicTips.prototype.setTextFlow = function (textFlow) {
            this.text.textFlow = textFlow;
            this.setCenter();
        };
        BasicTips.prototype.setCenter = function () {
            var image = this.image;
            var text = this.text;
            var side = this.side;
            var w = text.width + side;
            var h = text.height + side;
            image.setSize(w, h);
            text.x = text.y = side >> 1;
        };
        return BasicTips;
    }(MoonContainer));
    moon.BasicTips = BasicTips;
    __reflect(BasicTips.prototype, "moon.BasicTips");
})(moon || (moon = {}));
//# sourceMappingURL=MoonTheme.js.map