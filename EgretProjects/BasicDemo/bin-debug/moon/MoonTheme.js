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
var Button = (function (_super) {
    __extends(Button, _super);
    function Button() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Button;
}(eui.Button));
__reflect(Button.prototype, "Button");
;
var ImageIcon = (function (_super) {
    __extends(ImageIcon, _super);
    function ImageIcon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ImageIcon;
}(eui.Image));
__reflect(ImageIcon.prototype, "ImageIcon");
;
var TextField = (function (_super) {
    __extends(TextField, _super);
    function TextField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TextField;
}(egret.TextField));
__reflect(TextField.prototype, "TextField");
;
var Sprite = (function (_super) {
    __extends(Sprite, _super);
    function Sprite() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Sprite;
}(egret.Sprite));
__reflect(Sprite.prototype, "Sprite");
;
var Shape = (function (_super) {
    __extends(Shape, _super);
    function Shape() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Shape;
}(egret.Shape));
__reflect(Shape.prototype, "Shape");
;
var DisplayObject = (function (_super) {
    __extends(DisplayObject, _super);
    function DisplayObject() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DisplayObject;
}(egret.DisplayObject));
__reflect(DisplayObject.prototype, "DisplayObject");
;
var DisplayObjectContainer = (function (_super) {
    __extends(DisplayObjectContainer, _super);
    function DisplayObjectContainer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DisplayObjectContainer;
}(egret.DisplayObjectContainer));
__reflect(DisplayObjectContainer.prototype, "DisplayObjectContainer");
;
var Point = (function (_super) {
    __extends(Point, _super);
    function Point() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Point;
}(egret.Point));
__reflect(Point.prototype, "Point");
;
var Rectangle = (function (_super) {
    __extends(Rectangle, _super);
    function Rectangle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Rectangle;
}(egret.Rectangle));
__reflect(Rectangle.prototype, "Rectangle");
;
var Bitmap = (function (_super) {
    __extends(Bitmap, _super);
    function Bitmap() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Bitmap;
}(egret.Bitmap));
__reflect(Bitmap.prototype, "Bitmap");
;
var BitmapData = (function (_super) {
    __extends(BitmapData, _super);
    function BitmapData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BitmapData;
}(egret.BitmapData));
__reflect(BitmapData.prototype, "BitmapData");
;
var Stage = (function (_super) {
    __extends(Stage, _super);
    function Stage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Stage;
}(egret.Stage));
__reflect(Stage.prototype, "Stage");
;
//----------------------------------------------
var trace = function () {
    var arg = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        arg[_i] = arguments[_i];
    }
    var str = "";
    for (var i = 0; i < arg.length; i++) {
        str += arg[i] + ",";
    }
    str = str.substr(0, str.length - 1);
    moon.showLog.getIns().logMessage(str);
};
var simpleTrace = function () {
    var arg = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        arg[_i] = arguments[_i];
    }
    var str = "";
    for (var i = 0; i < arg.length; i++) {
        str += arg[i] + ",";
    }
    str = str.substr(0, str.length - 1);
    moon.showLog.getIns().log(str);
};
//----------------------------------------------
var moon;
(function (moon) {
    var FONT = (function () {
        function FONT() {
        }
        FONT.fontName = "黑体";
        return FONT;
    }());
    moon.FONT = FONT;
    __reflect(FONT.prototype, "moon.FONT");
    var Const = (function () {
        function Const() {
        }
        Const.buttonStatusNormal = 0;
        Const.buttonStatusDown = 1;
        return Const;
    }());
    moon.Const = Const;
    __reflect(Const.prototype, "moon.Const");
    /**颜色 */
    var Color = (function () {
        function Color() {
        }
        Object.defineProperty(Color, "random", {
            get: function () { return Math.random() * 0XFFFFFF; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Color, "white", {
            get: function () { return 0XFFFFFF; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Color, "black", {
            get: function () { return 0X000000; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Color, "gray", {
            get: function () { return 0X666666; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Color, "red", {
            get: function () { return 0XFF0000; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Color, "green", {
            get: function () { return 0X00FF00; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Color, "bule", {
            get: function () { return 0X0000FF; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Color, "skinNormal", {
            get: function () { return 0X15191C; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Color, "skinDown", {
            get: function () { return 0X20262B; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Color, "titleBackground", {
            get: function () { return 0X20262B; },
            enumerable: true,
            configurable: true
        });
        ;
        return Color;
    }());
    moon.Color = Color;
    __reflect(Color.prototype, "moon.Color");
    /**皮肤 */
    var Skin = (function () {
        function Skin() {
        }
        Object.defineProperty(Skin, "pointNormal", {
            get: function () { return moon.MoonUI.getCircle(6, moon.Color.black); },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Skin, "pointDown", {
            get: function () { return moon.MoonUI.getCircle(6, moon.Color.gray); },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Skin, "buttonNormal", {
            get: function () { return moon.MoonUI.getRect(60, 60, moon.Color.skinNormal); },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Skin, "buttonDown", {
            get: function () { return moon.MoonUI.getRect(60, 60, moon.Color.skinDown); },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Skin, "randomRect", {
            get: function () { return moon.MoonUI.getRect(60, 60, moon.Color.random); },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Skin, "randomCircle", {
            get: function () { return moon.MoonUI.getCircle(50, moon.Color.random); },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Skin, "radioNormal", {
            get: function () { return moon.MoonUI.getRadioCircle(moon.Color.white, moon.Color.white); },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Skin, "radioDown", {
            get: function () { return moon.MoonUI.getRadioCircle(moon.Color.white, moon.Color.black, 1); },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Skin, "checkBoxOnNormal", {
            get: function () { return moon.MoonUI.getCheckBoxRect(moon.Color.white, moon.Color.white); },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Skin, "checkBoxOnDown", {
            get: function () { return moon.MoonUI.getCheckBoxRect(moon.Color.white, moon.Color.white); },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Skin, "checkBoxOffNormal", {
            get: function () { return moon.MoonUI.getCheckBoxRect(moon.Color.white, moon.Color.black, 1); },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Skin, "checkBoxOffDown", {
            get: function () { return moon.MoonUI.getCheckBoxRect(moon.Color.white, moon.Color.black, 1); },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Skin, "switchOnNormal", {
            get: function () {
                var node = moon.MoonUI.getRoundRect(80, 50, moon.Color.skinNormal, 60, 60);
                node.addChild(moon.MoonUI.getCircle(22, moon.Color.white, 25, 25));
                return node;
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Skin, "switchOnDown", {
            get: function () {
                var node = moon.MoonUI.getRoundRect(80, 50, moon.Color.skinDown, 60, 60);
                node.addChild(moon.MoonUI.getCircle(22, moon.Color.white, 25, 25));
                return node;
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Skin, "switchOffNormal", {
            get: function () {
                var node = moon.MoonUI.getRoundRect(80, 50, moon.Color.skinNormal, 60, 60);
                node.addChild(moon.MoonUI.getCircle(22, moon.Color.white, 55, 25));
                return node;
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Skin, "switchOffDown", {
            get: function () {
                var node = moon.MoonUI.getRoundRect(80, 50, moon.Color.skinDown, 60, 60);
                node.addChild(moon.MoonUI.getCircle(22, moon.Color.white, 55, 25));
                return node;
            },
            enumerable: true,
            configurable: true
        });
        ;
        return Skin;
    }());
    moon.Skin = Skin;
    __reflect(Skin.prototype, "moon.Skin");
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
            var s = new Sprite();
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
            var l1 = new Sprite;
            l1.graphics.lineStyle(0.1);
            l1.graphics.moveTo(0, 0);
            l1.graphics.lineTo(w, h);
            var l2 = new Sprite;
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
            var s = new Sprite();
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
            var s = new Sprite();
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
            var s = new Sprite;
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
            var s = new Sprite;
            s.addChild(this.getRoundRect(w, h, rc));
            var p = this.getPolygon(3, w / 3, pc, 30 + rotation);
            p.x = s.width >> 1;
            p.y = s.height >> 1;
            s.addChild(p);
            return s;
        };
        /**得到滚动条的bar*/
        MoonUI.getScrollLineBar = function (w, h, c) {
            var s = new Sprite;
            var _h = h / 3;
            for (var i = 0; i < 3; i++) {
                var r = this.getRect(w, 1, c, 0, i * _h);
                s.addChild(r);
            }
            return s;
        };
        /**得到圆角矩形-加*/
        MoonUI.getAddRoundRect = function (w, h, c) {
            var s = new Sprite;
            s.addChild(this.getRoundRect(w, h, c));
            var r1 = this.getRect(w / 2, 2, 0, w / 4, h / 2 - 1);
            var r2 = this.getRect(2, h / 2, 0, w / 2 - 1, h / 4);
            s.addChild(r1);
            s.addChild(r2);
            return s;
        };
        /**得到圆角矩形-减*/
        MoonUI.getRemoveRoundRect = function (w, h, c) {
            var s = new Sprite;
            s.addChild(this.getRoundRect(w, h, c));
            var r = this.getRect(w / 2, 2, 0, w / 4, h / 2 - 1);
            s.addChild(r);
            return s;
        };
        /**得到带文字的圆角方形*/
        MoonUI.getRoundRectText = function (w, h, c, str) {
            if (str === void 0) { str = "click"; }
            var s = new Sprite;
            s.addChild(this.getRoundRect(w, h, c));
            var text = new TextField;
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
            var s = new Sprite;
            s.addChild(this.getRect(20, 20, bc));
            if (type == 1) {
                var r = new Sprite;
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
            s.scaleX = s.scaleY = 1.5;
            return s;
        };
        /**得到矩形-单选框 bc背景颜色，gc钩的颜色,type为0是没有圆为1是有圆*/
        MoonUI.getRadioCircle = function (bc, gc, type) {
            if (bc === void 0) { bc = 0XFFFFFF; }
            if (gc === void 0) { gc = 0; }
            if (type === void 0) { type = 0; }
            var s = new Sprite;
            s.addChild(this.getCircle(16, bc, 16, 16));
            s.graphics.lineStyle(1, 0);
            if (type == 1) {
                var r = this.getCircle(8, gc, 16, 16);
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
            var s = new Sprite;
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
            var txt = (new Label).textField;
            txt.textAlign = egret.HorizontalAlign.LEFT;
            stage.addChild(txt);
            this.txtSimple = txt;
            var txt = (new Label).textField;
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
        showLog.prototype.setLogColor = function (color) {
            this.txtSimple.textColor = color;
        };
        showLog.prototype.setLogMessageColor = function (color) {
            this.txtMessage.textColor = color;
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
        MoonEvent.MOUSE_MOVE = "event-move";
        MoonEvent.MOUSE_UP = "event-up";
        MoonEvent.CLICK = "event-click";
        //tabbar event
        MoonEvent.CHANGE = "change";
        MoonEvent.COMPLETE = "complete";
        MoonEvent.RENDER_COMPLETE = "render complete";
        MoonEvent.UPDATE = "update";
        MoonEvent.START = "start";
        MoonEvent.OVER = "over";
        MoonEvent.PAUSE = "pause";
        return MoonEvent;
    }(egret.EventDispatcher));
    moon.MoonEvent = MoonEvent;
    __reflect(MoonEvent.prototype, "moon.MoonEvent");
    /**基础皮肤类 */
    var BasicSkinComponent = (function (_super) {
        __extends(BasicSkinComponent, _super);
        function BasicSkinComponent() {
            return _super.call(this) || this;
        }
        BasicSkinComponent.prototype.setSkinName = function (skinName) {
            this.addEventListener(eui.UIEvent.COMPLETE, this.onComplete, this);
            this.skinName = skinName;
        };
        BasicSkinComponent.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.isCreateChildren = true;
            this.init();
        };
        BasicSkinComponent.prototype.onComplete = function () {
            this.isLoadComplete = true;
            this.init();
        };
        BasicSkinComponent.prototype.init = function () {
            if (this.isCreateChildren && this.isLoadComplete) {
                this.render();
            }
        };
        /**从这个渲染开始*/
        BasicSkinComponent.prototype.render = function () {
        };
        return BasicSkinComponent;
    }(eui.Component));
    moon.BasicSkinComponent = BasicSkinComponent;
    __reflect(BasicSkinComponent.prototype, "moon.BasicSkinComponent");
    var MoonContainer = (function (_super) {
        __extends(MoonContainer, _super);
        function MoonContainer() {
            var _this = _super.call(this) || this;
            _this.dataEvent = new Object;
            _this.init();
            _this.once(egret.Event.ADDED_TO_STAGE, _this.addToStage, _this);
            return _this;
        }
        MoonContainer.prototype.addToStage = function () {
            this.render();
        };
        /**加载到舞台之前调用 */
        MoonContainer.prototype.init = function () {
        };
        /**加载到舞台之后调用 */
        MoonContainer.prototype.render = function () {
            this.stageWidth = this.stage.stageWidth;
            this.stageHeight = this.stage.stageHeight;
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
        /**把自己从父级删除*/
        MoonContainer.prototype.removeFromParent = function (dispose) {
            if (dispose === void 0) { dispose = false; }
            var _parent = this.parent;
            if (dispose)
                this.dispose();
            if (_parent && _parent.contains(this))
                _parent.removeChild(this);
            _parent = null;
        };
        /**删除所有的*/
        MoonContainer.prototype.removeChildAll = function (beginIndex, endIndex, dispose) {
            if (beginIndex === void 0) { beginIndex = 0; }
            if (endIndex === void 0) { endIndex = 2147483647; }
            if (dispose === void 0) { dispose = false; }
            if (endIndex < 0 || endIndex >= this.numChildren)
                endIndex = this.numChildren - 1;
            for (var i = beginIndex; i <= endIndex; ++i)
                this.removeChildIndex(beginIndex, dispose);
        };
        /**删除index层的*/
        MoonContainer.prototype.removeChildIndex = function (beginIndex, dispose) {
            if (beginIndex >= 0 || beginIndex < this.numChildren) {
                var basicContent = this.getChildAt(beginIndex);
                if (basicContent instanceof MoonContainer) {
                    basicContent.removeFromParent(dispose);
                }
                else {
                    var display = this.getChildAt(beginIndex);
                    if (display.parent)
                        display.parent.removeChild(display);
                }
            }
        };
        /**销毁*/
        MoonContainer.prototype.dispose = function () {
            this.removeChildAll(0, -1, true);
            this.dataEvent = null;
        };
        return MoonContainer;
    }(DisplayObjectContainer));
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
            var text = (new Label).textField;
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
        BasicView.prototype.createRectBySprite = function (s, w, h, c, x, y) {
            if (c === void 0) { c = 0; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            s.graphics.clear();
            s.graphics.beginFill(c);
            s.graphics.drawRect(x, y, w, h);
            s.graphics.endFill();
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
            _this.image.scale9Grid = new Rectangle(4, 4, 2, 2);
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
            _this.text = (new Label).textField;
            _this.text.textAlign = egret.HorizontalAlign.CENTER;
            _this.text.verticalAlign = egret.VerticalAlign.MIDDLE;
            _this.text.lineSpacing = _this.lineSpacing;
            _this.addChild(_this.text);
            return _this;
        }
        /**设置普通文字*/
        BasicTips.prototype.setValue = function (value) {
            this.text.text = value;
            this.setCenter();
        };
        /**设置富文字 {text:"string",style:{"size":50,"textColor":0}}*/
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
    var Label = (function (_super) {
        __extends(Label, _super);
        function Label(str, c) {
            if (str === void 0) { str = ""; }
            if (c === void 0) { c = 0XFFFFFF; }
            var _this = _super.call(this) || this;
            _this.text = new TextField;
            _this.text.textAlign = egret.HorizontalAlign.LEFT;
            _this.text.verticalAlign = egret.VerticalAlign.MIDDLE;
            _this.text.text = str;
            _this.text.textColor = c;
            _this.text.fontFamily = moon.FONT.fontName;
            _this.addChild(_this.text);
            return _this;
        }
        Object.defineProperty(Label.prototype, "textField", {
            get: function () {
                return this.text;
            },
            enumerable: true,
            configurable: true
        });
        return Label;
    }(MoonContainer));
    moon.Label = Label;
    __reflect(Label.prototype, "moon.Label");
    var BasicButton = (function (_super) {
        __extends(BasicButton, _super);
        function BasicButton(normal, down) {
            if (normal === void 0) { normal = null; }
            if (down === void 0) { down = null; }
            var _this = _super.call(this) || this;
            /**皮肤大小随字体大小变化 */
            _this.skinAutoScale = true;
            _this.status = 0;
            _this.statusNormal = normal || Skin.buttonNormal;
            _this.statusDown = down || Skin.buttonDown;
            _this.skinContainer = new DisplayObjectContainer;
            _this.addChild(_this.skinContainer);
            _this.updateSkin(_this.statusNormal);
            _this.text = (new Label).textField;
            _this.text.textAlign = egret.HorizontalAlign.CENTER;
            _this.text.verticalAlign = egret.VerticalAlign.MIDDLE;
            _this.addChild(_this.text);
            _this.touchEnabled = true;
            _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onTouch, _this);
            return _this;
        }
        BasicButton.prototype.setLabelPoint = function (x, y) {
            this.text.anchorOffsetX = 0;
            this.text.anchorOffsetY = 0;
            this.text.x = x;
            this.text.y = y;
        };
        Object.defineProperty(BasicButton.prototype, "labelCircle", {
            set: function (value) {
                this.text.text = value;
                this.skinAutoScale = false;
                this.text.x = this.text.y = 0;
                this.text.anchorOffsetX = this.text.textWidth >> 1;
                this.text.anchorOffsetY = this.text.textHeight >> 1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BasicButton.prototype, "labelColor", {
            set: function (value) {
                this.text.textColor = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BasicButton.prototype, "label", {
            get: function () {
                return this.text.text;
            },
            set: function (value) {
                this.text.text = value;
                var width = this.text.width + 20;
                this.setSkinSize();
                this.setTextPosition();
            },
            enumerable: true,
            configurable: true
        });
        /**设置富文字 {text:"string",style:{"size":50,"textColor":0}}*/
        BasicButton.prototype.setTextFlow = function (textFlow) {
            this.text.textFlow = textFlow;
            this.setSkinSize();
            this.setTextPosition();
        };
        BasicButton.prototype.setSkinNormal = function () {
            this.updateSkin(this.statusNormal);
        };
        BasicButton.prototype.setSkinDown = function () {
            this.updateSkin(this.statusDown);
        };
        BasicButton.prototype.onTouch = function (e) {
            if (e.type == egret.TouchEvent.TOUCH_BEGIN) {
                this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
                this.updateSkin(this.statusDown);
            }
            else {
                this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
                this.updateSkin(this.statusNormal);
            }
        };
        Object.defineProperty(BasicButton.prototype, "textWidth", {
            get: function () {
                return this.text.width + 20;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BasicButton.prototype, "textHeight", {
            get: function () {
                return this.text.height + 20;
            },
            enumerable: true,
            configurable: true
        });
        BasicButton.prototype.setSkinSize = function () {
            if (this.skinAutoScale && this.text.text != "") {
                var scale = this.textWidth / this.statusNormal.width;
                this.statusNormal.scaleX = this.statusDown.scaleX = scale;
                var height = this.textHeight;
                if (height >= this.statusNormal.height) {
                    scale = height / this.statusNormal.height;
                    this.statusNormal.scaleY = this.statusDown.scaleY = scale;
                }
            }
        };
        BasicButton.prototype.setTextPosition = function () {
            this.text.anchorOffsetX = this.text.width >> 1;
            this.text.anchorOffsetY = this.text.height >> 1;
            this.text.x = this.textWidth >> 1;
            this.text.y = this.statusNormal.height >> 1;
            if (this.textHeight > this.statusNormal.height) {
                this.text.y = this.textHeight >> 1;
            }
        };
        BasicButton.prototype.updateSkin = function (skin) {
            this.skinContainer.removeChildren();
            this.skinContainer.addChild(skin);
            this.status = skin == this.statusNormal ? Const.buttonStatusNormal : Const.buttonStatusDown;
        };
        BasicButton.prototype.dispose = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
            _super.prototype.dispose.call(this);
        };
        return BasicButton;
    }(MoonContainer));
    moon.BasicButton = BasicButton;
    __reflect(BasicButton.prototype, "moon.BasicButton");
    /**类似多个皮肤按钮,构造函数的参数必须大于2个且必须是2的次方
     * 使用四个皮肤就可以模拟ToggleSwitch了
    */
    var MoreSkinButton = (function (_super) {
        __extends(MoreSkinButton, _super);
        function MoreSkinButton(skins) {
            var _this = _super.call(this, skins[0], skins[1]) || this;
            _this._currentPage = 0;
            _this.skins = skins;
            return _this;
        }
        Object.defineProperty(MoreSkinButton.prototype, "currentPage", {
            get: function () {
                return this._currentPage;
            },
            set: function (value) {
                value = value * 2 == this.skins.length ? 0 : value;
                this._currentPage = value;
                this.statusNormal = this.skins[value * 2];
                this.statusDown = this.skins[(value * 2) + 1];
                this.setSkinSize();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MoreSkinButton.prototype, "toggleSwitch", {
            set: function (value) {
                this._toggleSwitch = value;
            },
            enumerable: true,
            configurable: true
        });
        MoreSkinButton.prototype.onTouch = function (e) {
            if (e.type == egret.TouchEvent.TOUCH_END) {
                if (this._toggleSwitch) {
                    this.currentPage = 1 - this.currentPage;
                }
            }
            _super.prototype.onTouch.call(this, e);
        };
        return MoreSkinButton;
    }(BasicButton));
    moon.MoreSkinButton = MoreSkinButton;
    __reflect(MoreSkinButton.prototype, "moon.MoreSkinButton");
    /***进度条 */
    var ProgressBar = (function (_super) {
        __extends(ProgressBar, _super);
        function ProgressBar(bg, value) {
            var _this = _super.call(this) || this;
            _this._value = 0;
            _this.skinBg = bg;
            _this.skinValue = value;
            _this.addChild(_this.skinBg);
            _this.addChild(_this.skinValue);
            _this.value = 0;
            _this.text = (new Label).textField;
            _this.text.textAlign = egret.HorizontalAlign.CENTER;
            _this.text.verticalAlign = egret.VerticalAlign.MIDDLE;
            _this.addChild(_this.text);
            return _this;
        }
        Object.defineProperty(ProgressBar.prototype, "value", {
            get: function () {
                return this._value;
            },
            /**值只能是0－1之间 */
            set: function (v) {
                v = v < 0 ? 0 : v > 1 ? 1 : v;
                this._value = v;
                this.skinValue.scaleX = v;
            },
            enumerable: true,
            configurable: true
        });
        ProgressBar.prototype.showText = function (v, x, y) {
            if (x === void 0) { x = -1; }
            if (y === void 0) { y = -1; }
            this.text.text = v;
            if (x == -1)
                this.text.x = (this.skinBg.width - this.text.width) >> 1;
            else
                this.text.x = x;
            if (y == -1)
                this.text.y = this.skinBg.height + 5;
            else
                this.text.y = y;
        };
        return ProgressBar;
    }(MoonContainer));
    moon.ProgressBar = ProgressBar;
    __reflect(ProgressBar.prototype, "moon.ProgressBar");
    /**复选框按钮 */
    var CheckBoxBar = (function (_super) {
        __extends(CheckBoxBar, _super);
        function CheckBoxBar() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.items = [];
            return _this;
        }
        CheckBoxBar.prototype.addItemLabel = function (item, str) {
            item.skinAutoScale = false;
            item.label = str;
            this.addItem(item);
        };
        CheckBoxBar.prototype.addItem = function (item) {
            item.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.addChild(item);
            this.items.push(item);
        };
        CheckBoxBar.prototype.removeItem = function (item) {
            item.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            var index = this.items.indexOf(item);
            if (index > 0)
                this.items.splice(index, 1);
            item.removeFromParent(true);
        };
        CheckBoxBar.prototype.hasItem = function (index) {
            return index >= 0 || index < this.items.length;
        };
        CheckBoxBar.prototype.getItem = function (index) {
            return this.items[index];
        };
        CheckBoxBar.prototype.update = function () {
        };
        CheckBoxBar.prototype.onClick = function (e) {
            var item = e.currentTarget;
            this.newDispatchEvent(moon.MoonEvent.CHANGE);
        };
        return CheckBoxBar;
    }(BasicView));
    moon.CheckBoxBar = CheckBoxBar;
    __reflect(CheckBoxBar.prototype, "moon.CheckBoxBar", ["moon.IFace"]);
    /**单选框按钮 */
    var RadioButtonBar = (function (_super) {
        __extends(RadioButtonBar, _super);
        function RadioButtonBar() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.items = [];
            _this.isAutoLayout = false;
            return _this;
        }
        RadioButtonBar.prototype.addItemLabel = function (item, str) {
            item.skinAutoScale = false;
            item.label = str;
            this.addItem(item);
        };
        RadioButtonBar.prototype.addItem = function (item) {
            item.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.addChild(item);
            this.items.push(item);
        };
        RadioButtonBar.prototype.removeItem = function (item) {
            item.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            var index = this.items.indexOf(item);
            if (index > 0)
                this.items.splice(index, 1);
            item.removeFromParent(true);
        };
        RadioButtonBar.prototype.hasItem = function (index) {
            return index >= 0 || index < this.items.length;
        };
        RadioButtonBar.prototype.getItem = function (index) {
            return this.items[index];
        };
        RadioButtonBar.prototype.render = function () {
            this.update();
        };
        RadioButtonBar.prototype.update = function () {
            var item;
            if (this.isAutoLayout == true) {
                for (var i = 0; i < this.items.length; i++) {
                    item = this.items[i];
                    item.x = (item.width + 10) * i;
                }
            }
        };
        RadioButtonBar.prototype.onClick = function (e) {
            var item = e.currentTarget;
            this.selectIndex = this.items.indexOf(item);
            this.newDispatchEvent(moon.MoonEvent.CHANGE);
        };
        Object.defineProperty(RadioButtonBar.prototype, "selectIndex", {
            get: function () {
                return this._selectIndex;
            },
            set: function (index) {
                this._selectIndex = index;
                var item = this.items[index];
                this.items.map(setSkinNormal, this);
                function setSkinNormal(i) {
                    i.setSkinNormal();
                }
                item.setSkinDown();
            },
            enumerable: true,
            configurable: true
        });
        return RadioButtonBar;
    }(BasicView));
    moon.RadioButtonBar = RadioButtonBar;
    __reflect(RadioButtonBar.prototype, "moon.RadioButtonBar", ["moon.IFace"]);
    var PanelBar = (function (_super) {
        __extends(PanelBar, _super);
        function PanelBar(pWidth, pHeight) {
            if (pWidth === void 0) { pWidth = 0; }
            if (pHeight === void 0) { pHeight = 0; }
            var _this = _super.call(this) || this;
            _this.titleHeight = 60;
            _this.pWidth = pWidth;
            _this.pHeight = pWidth;
            _this.titleBg = new Sprite;
            _this.containerBg = new Sprite;
            _this.title = (new Label).textField;
            _this.container = new MoonContainer;
            return _this;
        }
        /**加载到舞台之后调用 */
        PanelBar.prototype.render = function () {
            if (this.pWidth == 0 && this.pWidth == 0) {
                _super.prototype.render.call(this);
            }
            else {
                this.stageWidth = this.pWidth;
                this.stageHeight = this.pHeight;
            }
            this.createRectBySprite(this.titleBg, this.stageWidth, this.titleHeight, moon.Color.titleBackground);
            this.createRectBySprite(this.containerBg, this.stageWidth, this.stageHeight - this.titleHeight, moon.Color.white, 0, this.titleHeight);
            this.addChild(this.titleBg);
            this.addChild(this.containerBg);
            this.title.textAlign = egret.HorizontalAlign.CENTER;
            this.title.verticalAlign = egret.VerticalAlign.MIDDLE;
            this.title.anchorOffsetX = this.title.textWidth >> 1;
            this.title.anchorOffsetY = this.title.textHeight >> 1;
            this.title.x = this.stageWidth >> 1;
            this.title.y = this.titleHeight >> 1;
            this.addChild(this.title);
            this.container.y = this.titleHeight;
            this.addChild(this.container);
            this.containerMask = this.createRect(this.stageWidth, this.stageHeight - this.titleHeight, moon.Color.white, 0, this.titleHeight);
            this.container.mask = this.containerMask;
            this.newDispatchEvent(MoonEvent.RENDER_COMPLETE);
        };
        PanelBar.prototype.addItem = function (item, x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (x != 0)
                item.x = x;
            if (y != 0)
                item.y = y;
            this.container.addChild(item);
        };
        PanelBar.prototype.removeItem = function (item) {
            if (this.container.contains(item))
                this.container.removeChild(item);
        };
        PanelBar.prototype.update = function () {
        };
        Object.defineProperty(PanelBar.prototype, "label", {
            get: function () {
                return this.title.text;
            },
            set: function (value) {
                this.title.text = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PanelBar.prototype, "colorTop", {
            set: function (c) {
                var w = this.titleBg.width, h = this.titleBg.height;
                this.createRectBySprite(this.titleBg, w, h, c);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PanelBar.prototype, "colorBottom", {
            set: function (c) {
                var w = this.containerBg.width, h = this.containerBg.height;
                this.createRectBySprite(this.containerBg, w, h, c, 0, this.titleHeight);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PanelBar.prototype, "windowRect", {
            get: function () {
                var rect = new Rectangle(0, 0, this.stageWidth, this.stageHeight);
                return rect;
            },
            enumerable: true,
            configurable: true
        });
        PanelBar.prototype.removeAll = function () {
            this.container.dispose();
        };
        return PanelBar;
    }(BasicView));
    moon.PanelBar = PanelBar;
    __reflect(PanelBar.prototype, "moon.PanelBar", ["moon.IFace"]);
    var PanelMoreManager = (function (_super) {
        __extends(PanelMoreManager, _super);
        function PanelMoreManager() {
            var _this = _super.call(this) || this;
            _this.items = [];
            _this.radioButton = new RadioButtonBar;
            _this.currentPage = 0;
            _this.posStartX = 0;
            _this.moveItems = [];
            _this.container = new MoonContainer;
            _this.addChild(_this.container);
            _this.radioButton.isAutoLayout = true;
            return _this;
        }
        PanelMoreManager.prototype.addItem = function (item) {
            this.items.push(item);
        };
        PanelMoreManager.prototype.removeItem = function (item) {
            var index = this.items.indexOf(item);
            if (index > 0)
                this.items.splice(index, 1);
        };
        PanelMoreManager.prototype.hasItem = function (index) {
            return index >= 0 || index < this.items.length;
        };
        PanelMoreManager.prototype.getItem = function (index) {
            return this.items[index];
        };
        PanelMoreManager.prototype.update = function () {
            this.container.removeChildren();
            var itemW;
            var itemH;
            if (this.items.length > 0) {
                var item = this.items[0];
                this.container.addChild(item);
                itemW = item.windowRect.width;
                itemH = item.windowRect.height;
                this.panelWidth = itemW;
            }
            var len = this.items.length;
            for (var i = 0; i < len; i++) {
                var btn = new BasicButton(moon.Skin.pointNormal, moon.Skin.pointDown);
                this.radioButton.addItem(btn);
            }
            btn = this.radioButton.getItem(0);
            btn.setSkinDown();
            this.radioButton.x = (itemW - len * 22) >> 1;
            this.radioButton.y = itemH - 20;
            this.addChild(this.radioButton);
        };
        PanelMoreManager.prototype.render = function () {
            this.update();
            if (this.items.length > 1) {
                this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
            }
        };
        PanelMoreManager.prototype.onTouch = function (e) {
            switch (e.type) {
                case egret.TouchEvent.TOUCH_BEGIN:
                    this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
                    this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
                    this.posStartX = e.stageX;
                    break;
                case egret.TouchEvent.TOUCH_MOVE:
                    this.moveDo(e.stageX);
                    break;
                case egret.TouchEvent.TOUCH_END:
                    this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
                    this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
                    this.moveEnd(e.stageX);
                    break;
            }
        };
        PanelMoreManager.prototype.moveDo = function (x) {
            var disx = x - this.posStartX;
            if (Math.abs(disx) > 20) {
                if (this.moveItems.length == 0) {
                    var item = this.items[this.currentPage];
                    var width = this.panelWidth;
                    this.moveItems.push(item);
                    if (this.currentPage == 0) {
                        item = this.items[this.currentPage + 1];
                        this.container.addChild(item);
                        item.x = width;
                        this.moveItems.push(item);
                    }
                    else if (this.currentPage == this.items.length - 1) {
                        item = this.items[this.currentPage - 1];
                        this.container.addChild(item);
                        item.x = -width;
                        this.moveItems.push(item);
                    }
                    else {
                        item = this.items[this.currentPage - 1];
                        this.container.addChild(item);
                        item.x = -width;
                        this.moveItems.push(item);
                        item = this.items[this.currentPage + 1];
                        this.container.addChild(item);
                        item.x = width;
                        this.moveItems.push(item);
                    }
                }
                var boo1 = (this.currentPage == 0 && disx > 0);
                var boo2 = ((this.currentPage == this.items.length - 1) && disx < 0);
                if (!boo1 && !boo2) {
                    this.container.x = disx;
                }
            }
        };
        PanelMoreManager.prototype.moveEnd = function (x) {
            if (this.container.x == 0) {
                this.backCall(0);
                return;
            }
            var disx = x - this.posStartX;
            var tw = egret.Tween.get(this.container);
            var currX = this.panelWidth;
            var turnDis = this.panelWidth >> 2;
            //至少滑动窗口宽的四分之一才可以算翻页
            if (Math.abs(disx) > turnDis) {
                currX = this.panelWidth;
                currX *= disx > 0 ? 1 : -1;
            }
            else {
                disx = 0;
                currX = 0;
            }
            var time = 200;
            tw.to({ x: currX }, time);
            tw.call(this.backCall, this, [disx]);
        };
        /**结束翻页后的回调函数 */
        PanelMoreManager.prototype.backCall = function (disx) {
            if (disx > 0) {
                this.currentPage--;
                this.currentPage = this.currentPage < 0 ? 0 : this.currentPage;
            }
            else if (disx < 0) {
                this.currentPage++;
                this.currentPage = this.currentPage == this.items.length ? this.items.length - 1 : this.currentPage;
            }
            this.container.removeChildren();
            var item = this.items[this.currentPage];
            item.x = 0;
            this.container.addChild(item);
            this.radioButton.selectIndex = this.currentPage;
            this.moveItems.length = 0;
            this.container.x = 0;
        };
        return PanelMoreManager;
    }(BasicView));
    moon.PanelMoreManager = PanelMoreManager;
    __reflect(PanelMoreManager.prototype, "moon.PanelMoreManager", ["moon.IFace"]);
})(moon || (moon = {}));
//# sourceMappingURL=MoonTheme.js.map