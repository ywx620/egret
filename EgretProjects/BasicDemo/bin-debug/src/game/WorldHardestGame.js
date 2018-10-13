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
var path = "../";
var WorldHardestGame = (function (_super) {
    __extends(WorldHardestGame, _super);
    function WorldHardestGame() {
        var _this = _super.call(this) || this;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.addToStage, _this); //只帧听一次然后自动删除
        return _this;
    }
    WorldHardestGame.prototype.addToStage = function () {
        this.levelControl = new LevelControl;
        this.addChild(this.levelControl);
        this.createControl();
    };
    WorldHardestGame.prototype.createControl = function () {
        // var w:number=(this.stage.stageHeight-640)>>2;
        // var controlBg:Sprite=moon.MoonUI.getCircle(w,0Xffff00);
        // controlBg.alpha=0;
        // var controlBar:Sprite=moon.MoonUI.getCircle(w-30,0XFF0000);
        // var controlAuton:control.ControlBarMove=new control.ControlBarMove(this.stage,controlBar,controlBg);
        // //controlAuton.open();
        // controlBg.x=controlBar.x=this.stage.stageWidth>>1;
        // controlBg.y=controlBar.y=this.stage.stageHeight-(w<<1);
        // this.addChild(controlBg);
        // this.addChild(controlBar);
        // controlAuton.open();
        // controlAuton.moveBackFun=this.moveBackFun.bind(this);
        // controlAuton.startBackFun=this.startBackFun.bind(this);
        // controlAuton.endBackFun=this.endBackFun.bind(this);
        var control = new ArrowControl();
        control.level = this.levelControl;
        this.addChild(control);
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
var ArrowControl = (function (_super) {
    __extends(ArrowControl, _super);
    function ArrowControl() {
        var _this = _super.call(this) || this;
        _this.setSkinName(path + "resource/askins/WHG_control.exml");
        return _this;
    }
    ArrowControl.prototype.render = function () {
        var datas = [{ display: this.arrow_l, backCall: this.moveleft.bind(this) },
            { display: this.arrow_r, backCall: this.moveright.bind(this) },
            { display: this.arrow_u, backCall: this.moveup.bind(this) },
            { display: this.arrow_d, backCall: this.movedown.bind(this) }
        ];
        var controlTab = new control.ControlMoreTab(this.stage, datas);
        controlTab.open();
        this.point = new egret.Point;
    };
    ArrowControl.prototype.moveleft = function (type) {
        this.point.x = type == 1 ? -1 : 0;
        this.controlMove(type);
    };
    ArrowControl.prototype.moveright = function (type) {
        this.point.x = type == 1 ? 1 : 0;
        this.controlMove(type);
    };
    ArrowControl.prototype.moveup = function (type) {
        this.point.y = type == 1 ? -1 : 0;
        this.controlMove(type);
    };
    ArrowControl.prototype.movedown = function (type) {
        this.point.y = type == 1 ? 1 : 0;
        this.controlMove(type);
    };
    ArrowControl.prototype.controlMove = function (type) {
        this.level.isMove = type == 1;
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
        _this.speedX = 2;
        _this.speedY = 2;
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
        traceSimple(this.isMove);
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
    };
    return LevelControl;
}(BasicComponent));
__reflect(LevelControl.prototype, "LevelControl");
//# sourceMappingURL=WorldHardestGame.js.map