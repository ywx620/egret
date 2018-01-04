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
var Const = (function (_super) {
    __extends(Const, _super);
    function Const() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Const.START = "game start";
    Const.COMPLETE = "game complete";
    return Const;
}(egret.HashObject));
__reflect(Const.prototype, "Const");
var StartPanel = (function (_super) {
    __extends(StartPanel, _super);
    function StartPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/assetsUI/UIStart.exml";
        return _this;
    }
    StartPanel.prototype.createChildren = function () {
        this.btnStart.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClick, this);
    };
    StartPanel.prototype.onClick = function (e) {
        egret.log(e.currentTarget);
        switch (e.currentTarget) {
            case this.btnStart:
                this.dispatchEvent(new egret.Event(Const.START, false, false, "start"));
                break;
        }
    };
    return StartPanel;
}(eui.Component));
__reflect(StartPanel.prototype, "StartPanel");
/**25游戏 */
var GamePanel = (function (_super) {
    __extends(GamePanel, _super);
    function GamePanel() {
        var _this = _super.call(this) || this;
        _this.index = 1;
        _this.skinName = "resource/assetsUI/UIGame.exml";
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.stopGame, _this);
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.startGame, _this);
        _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onClick, _this);
        return _this;
    }
    GamePanel.prototype.loop = function (t) {
        var count = egret.getTimer() - this.time;
        count = count / 1000;
        this.txtTime.text = "" + count;
        return true;
    };
    GamePanel.prototype.startGame = function () {
        this.createRect();
        this.time = egret.getTimer();
        egret.startTick(this.loop, this);
    };
    GamePanel.prototype.createRect = function () {
        var rects = new Array;
        for (var i = 0; i < 25; i++) {
            var btn = new eui.Button;
            btn.width = btn.height = 110;
            btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.checkNode, this);
            btn.label = "" + Number(i + 1);
            this.group.addChild(btn);
            rects.push(btn);
        }
        rects = this.getRandomArrayByArray(rects);
        LayoutManager.displayRank(rects, 5, 10, 10, 20, 20, 1);
        this.rects = rects;
    };
    /**得到数据随机排序*/
    GamePanel.prototype.getRandomArrayByArray = function (datas) {
        var temps = datas;
        var array = new Array;
        for (var i = 0, len = temps.length; i < len; i++) {
            var j = Math.floor(Math.random() * temps.length);
            array[i] = temps[j];
            temps.splice(j, 1);
        }
        return array;
    };
    GamePanel.prototype.checkNode = function (e) {
        var btn = e.currentTarget;
        //egret.log("num",btn.label);
        if (parseInt(btn.label) == this.index) {
            this.index++;
            btn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.checkNode, this);
            btn.touchEnabled = false;
            btn.alpha = 0.5;
        }
        if (this.index == 26) {
            this.gameOver();
        }
    };
    GamePanel.prototype.gameOver = function () {
        egret.stopTick(this.loop, this);
        this.dispatchEvent(new egret.Event(Const.COMPLETE, false, false, "用时是" + this.txtTime.text + "秒"));
    };
    GamePanel.prototype.onClick = function (e) {
        this.parent.removeChild(this);
    };
    GamePanel.prototype.stopGame = function () {
        egret.log("stop");
        var rects = this.rects;
        for (var i = 0; i < 25; i++) {
            var btn = rects[i];
            btn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.checkNode, this);
            this.group.removeChild(btn);
        }
        this.index = 1;
        egret.stopTick(this.loop, this);
    };
    return GamePanel;
}(eui.Component));
__reflect(GamePanel.prototype, "GamePanel");
var OverPanel = (function (_super) {
    __extends(OverPanel, _super);
    function OverPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/assetsUI/UIOver.exml";
        return _this;
    }
    OverPanel.prototype.createChildren = function () {
        this.x = (this.stage.stageWidth - this.width) >> 1;
        this.y = (this.stage.stageHeight - this.height) >> 1;
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClick, this);
    };
    OverPanel.prototype.onClick = function (e) {
        this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClick, this);
        this.parent.removeChild(this);
    };
    OverPanel.prototype.setData = function (o) {
        this.label.text = o;
    };
    return OverPanel;
}(eui.Component));
__reflect(OverPanel.prototype, "OverPanel");
//# sourceMappingURL=StartPanel.js.map