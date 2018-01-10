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
var WorldHardestGame = (function (_super) {
    __extends(WorldHardestGame, _super);
    function WorldHardestGame() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.addToStage, _this);
        return _this;
    }
    WorldHardestGame.prototype.addToStage = function () {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
        moon.showLog.getIns().init(this.stage);
        this.levelControl = new LevelControl;
        this.addChild(this.levelControl);
        this.createControl();
    };
    WorldHardestGame.prototype.createControl = function () {
        var w = (this.stage.stageHeight - 640) >> 2;
        var controlBg = moon.MoonUI.getCircle(w, 0Xffff00);
        controlBg.alpha = 0;
        var controlBar = moon.MoonUI.getCircle(w - 30, 0XFF0000);
        var controlAuton = new control.ControlBarMove(this.stage, controlBar, controlBg);
        //controlAuton.open();
        controlBg.x = controlBar.x = this.stage.stageWidth >> 1;
        controlBg.y = controlBar.y = this.stage.stageHeight - (w << 1);
        this.addChild(controlBg);
        this.addChild(controlBar);
        controlAuton.open();
        controlAuton.moveBackFun = this.moveBackFun.bind(this);
        controlAuton.startBackFun = this.startBackFun.bind(this);
        controlAuton.endBackFun = this.endBackFun.bind(this);
    };
    WorldHardestGame.prototype.startBackFun = function (point) {
        this.levelControl.setStartPoint();
    };
    WorldHardestGame.prototype.endBackFun = function (point) {
        this.levelControl.setEndPoint();
    };
    WorldHardestGame.prototype.moveBackFun = function (point) {
        this.levelControl.controlPlay(point);
    };
    return WorldHardestGame;
}(egret.DisplayObjectContainer));
__reflect(WorldHardestGame.prototype, "WorldHardestGame");
var LevelControl = (function (_super) {
    __extends(LevelControl, _super);
    function LevelControl() {
        var _this = _super.call(this) || this;
        _this.safeAreas = [];
        _this.movePoint = new egret.Point;
        _this.speedX = 1;
        _this.speedY = 1;
        trace(RES.getRes("description_json"));
        _this.setSkinName("../resource/askins/WHG_level1.exml");
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
    LevelControl.prototype.setEndPoint = function () {
        this.isMove = false;
    };
    LevelControl.prototype.setStartPoint = function () {
        this.isMove = true;
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
        simpleTrace(this.isMove);
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
        var x = point.x;
        var y = point.y;
        if (point.x > 0)
            this.movePoint.x = 1;
        else
            this.movePoint.x = -1;
        if (point.y > 0)
            this.movePoint.y = 1;
        else
            this.movePoint.y = -1;
        if (Math.abs(x) < 50)
            this.movePoint.x = 0;
        if (Math.abs(y) < 50)
            this.movePoint.y = 0;
    };
    return LevelControl;
}(BasicComponent));
__reflect(LevelControl.prototype, "LevelControl");
//# sourceMappingURL=WorldHardestGame.js.map