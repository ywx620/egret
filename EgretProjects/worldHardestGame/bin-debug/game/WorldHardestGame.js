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
var path = "../";
var WorldHardestGame = (function (_super) {
    __extends(WorldHardestGame, _super);
    function WorldHardestGame() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.addToStage, _this);
        return _this;
    }
    WorldHardestGame.prototype.addToStage = function () {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
        this.levelControl = new LevelControl;
        this.addChild(this.levelControl);
        this.createControl();
    };
    WorldHardestGame.prototype.createControl = function () {
        var control = new ArrowControl();
        control.level = this.levelControl;
        this.addChild(control);
    };
    return WorldHardestGame;
}(egret.DisplayObjectContainer));
__reflect(WorldHardestGame.prototype, "WorldHardestGame");
var ArrowControl = (function (_super) {
    __extends(ArrowControl, _super);
    function ArrowControl() {
        var _this = _super.call(this) || this;
        _this.arrows = [];
        _this.setSkinName(path + "resource/askins/WHG_control.exml");
        return _this;
    }
    ArrowControl.prototype.render = function () {
        var datas = [{ display: this.arrow_l, backCall: this.moveleft.bind(this) },
            { display: this.arrow_r, backCall: this.moveright.bind(this) },
            { display: this.arrow_u, backCall: this.moveup.bind(this) },
            { display: this.arrow_d, backCall: this.movedown.bind(this) }
        ];
        for (var i = 0; i < datas.length; i++)
            datas[i].display.alpha = 0;
        var controlTab = new control.ControlMoreTab(this.stage, datas);
        controlTab.open();
        this.point = new egret.Point;
        for (var i = 0; i < this.numChildren; i++) {
            var image = this.getChildAt(i);
            var name = image.name.split("_")[0];
            if (name == "arrow") {
                image.alpha = 0;
                this.arrows.push(image);
            }
        }
        // var controlBg:egret.Sprite=moon.MoonUI.getCircle(140,0Xffff00);
        // var controlAuton:control.ControlBarMove=new control.ControlBarMove(this.stage,this.bar,controlBg);
        // controlBg.x=this.bar.x;
        // controlBg.y=this.bar.y;
        // controlAuton.open();
        // controlAuton.moveBackFun=this.moveBackFun.bind(this);
        // controlAuton.startBackFun=this.startBackFun.bind(this);
        // controlAuton.endBackFun=this.endBackFun.bind(this);
    };
    ArrowControl.prototype.startBackFun = function (point) {
        this.level.isMove = true;
    };
    ArrowControl.prototype.endBackFun = function (point) {
        this.level.isMove = false;
    };
    ArrowControl.prototype.moveBackFun = function (p) {
        var len = this.arrows.length;
        for (var i = 0; i < len; i++) {
            var image = this.arrows[i];
            var name = image.name.split("_")[1];
            image.alpha = 0;
            if (image.hitTestPoint(this.bar.x, this.bar.y, true)) {
                image.alpha = 1;
                switch (name) {
                    case "l":
                        this.point.x = -1;
                        this.point.y = 0;
                        break;
                    case "r":
                        this.point.x = 1;
                        this.point.y = 0;
                        break;
                    case "u":
                        this.point.y = 0;
                        this.point.y = -1;
                        break;
                    case "d":
                        this.point.y = 0;
                        this.point.y = 1;
                        break;
                    case "ru":
                        this.point.x = 1;
                        this.point.y = -1;
                        break;
                    case "rd":
                        this.point.x = 1;
                        this.point.y = 1;
                        break;
                    case "lu":
                        this.point.x = -1;
                        this.point.y = -1;
                        break;
                    case "ld":
                        this.point.x = -1;
                        this.point.y = 1;
                        break;
                }
                this.level.controlPlay(this.point);
            }
        }
    };
    ArrowControl.prototype.moveleft = function (type) {
        this.point.x = type == 1 ? -1 : 0;
        this.arrow_l.alpha = type;
        this.controlMove(type);
    };
    ArrowControl.prototype.moveright = function (type) {
        this.point.x = type == 1 ? 1 : 0;
        this.arrow_r.alpha = type;
        this.controlMove(type);
    };
    ArrowControl.prototype.moveup = function (type) {
        this.point.y = type == 1 ? -1 : 0;
        this.arrow_u.alpha = type;
        this.controlMove(type);
    };
    ArrowControl.prototype.movedown = function (type) {
        this.point.y = type == 1 ? 1 : 0;
        this.arrow_d.alpha = type;
        this.controlMove(type);
    };
    ArrowControl.prototype.controlMove = function (type) {
        this.level.controlPlay(this.point);
    };
    return ArrowControl;
}(BasicComponent));
__reflect(ArrowControl.prototype, "ArrowControl");
var LevelControl = (function (_super) {
    __extends(LevelControl, _super);
    function LevelControl() {
        var _this = _super.call(this) || this;
        _this.safeAreas = [];
        _this.movePoint = new egret.Point;
        _this.speedX = 4;
        _this.speedY = 4;
        _this.setSkinName(path + "resource/askins/WHG_level1.exml");
        return _this;
    }
    LevelControl.prototype.render = function () {
        for (var i = 0; i < this.numChildren; i++) {
            var image = this.getChildAt(i);
            if (image) {
                var name = image.name.substr(0, 4);
                if (name == "play")
                    this.player = image;
                else if (name == "wall")
                    this.wall = image;
                else if (name == "safe")
                    this.safeAreas.push(image);
            }
        }
        this.startPoint = new egret.Point(this.player.x, this.player.y);
        this.test1.play();
        this.test1.addEventListener(egret.Event.COMPLETE, this.onTweenGroupComplete, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.onLoop, this);
    };
    LevelControl.prototype.onTweenGroupComplete = function (e) {
        this.test1.play(0);
    };
    LevelControl.prototype.gameOver = function () {
        this.isMove = false;
        var that = this;
        var tw = egret.Tween.get(this.player);
        tw.to({ alpha: 0 }, 800).call(callBack);
        function callBack() {
            that.player.x = that.startPoint.x;
            that.player.y = that.startPoint.y;
            that.player.alpha = 1;
        }
    };
    LevelControl.prototype.onLoop = function (e) {
        //simpleTrace(this.isMove);
        if (this.isMove) {
            var speedX = this.speedX * this.movePoint.x;
            var speedY = this.speedY * this.movePoint.y;
            this.player.x += speedX;
            this.player.y += speedY;
            var playerX = this.player.x;
            var playerY = this.player.y;
            var halfWidth = this.player.width >> 1;
            for (var i = 0; i < this.numChildren; i++) {
                var image = this.getChildAt(i);
                if (image != this.player) {
                    var name = image.name.substr(0, 4);
                    if (name == "wall") {
                        if (image.hitTestPoint(playerX + halfWidth + speedX, playerY, true)) {
                            this.player.x -= speedX;
                        }
                        if (image.hitTestPoint(playerX - halfWidth + speedX, playerY, true)) {
                            this.player.x -= speedX;
                        }
                        if (image.hitTestPoint(playerX, playerY + halfWidth + speedY, true)) {
                            this.player.y -= speedY;
                        }
                        if (image.hitTestPoint(playerX, playerY - halfWidth + speedY, true)) {
                            this.player.y -= speedY;
                        }
                    }
                    else if (name == "safe") {
                    }
                    else if (name == "back") {
                    }
                    else {
                        if (image.hitTestPoint(playerX, playerY, true)) {
                            this.gameOver();
                        }
                        else if (image.hitTestPoint(playerX + halfWidth, playerY, true)) {
                            this.gameOver();
                        }
                        else if (image.hitTestPoint(playerX - halfWidth, playerY, true)) {
                            this.gameOver();
                        }
                        else if (image.hitTestPoint(playerX, playerY + halfWidth, true)) {
                            this.gameOver();
                        }
                        else if (image.hitTestPoint(playerX, playerY - halfWidth, true)) {
                            this.gameOver();
                        }
                    }
                }
            }
        }
    };
    LevelControl.prototype.controlPlay = function (point) {
        this.movePoint = point;
        simpleTrace(this.movePoint.x, this.movePoint.y);
    };
    return LevelControl;
}(BasicComponent));
__reflect(LevelControl.prototype, "LevelControl");
//# sourceMappingURL=WorldHardestGame.js.map