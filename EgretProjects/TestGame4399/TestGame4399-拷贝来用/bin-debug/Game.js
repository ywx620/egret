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
}(moon.BasicButton));
__reflect(Button.prototype, "Button");
;
/**游戏模版 */
var GameBasic = (function (_super) {
    __extends(GameBasic, _super);
    function GameBasic() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.numbers = [];
        _this.positions = [];
        return _this;
    }
    /**加载到舞台之后调用 */
    GameBasic.prototype.render = function () {
        _super.prototype.render.call(this);
        moon.showLog.getIns().init(this.stage);
        this.createBgGradientFill();
        this.txtScore = this.createText();
        this.txtLevel = this.createText(0, 50);
        this.txtBlood = this.createText(0);
        this.panelStart = new PanelStart;
        this.panelStart.addEvent(moon.MoonEvent.START, this.start, this);
        this.panelOver = new PanelOver;
        this.panelOver.addEvent(moon.MoonEvent.START, this.start, this);
        this.addChild(this.panelStart);
        this.initGame();
        this.initPosition();
        // var gameLoad = new moon.GameLoad;
        // this.addChild(gameLoad);
    };
    GameBasic.prototype.initGame = function () {
        this.level = 1;
        this.score = 0;
        this.blood = 100;
        this.index = 1;
        this.updateBlood();
        this.updateLevel();
        this.updateScore();
    };
    GameBasic.prototype.initPosition = function () {
        var ps = [];
        var num = (this.stageWidth - 60) / 4;
        for (var i = 0; i < 14; i++) {
            var x = 60 + Math.floor(i % 4) * num;
            var y = 200 + Math.floor(i / 4) * 90;
            ps.push(new Point(x, y));
        }
        this.positions = ps;
    };
    GameBasic.prototype.createItem = function () {
        for (var i = 0; i < this.numbers.length; i++) {
            var btn = this.numbers[i];
            btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.removeChild(btn);
        }
        this.numbers.length = 0;
        var len = this.level + 3;
        var ps = this.positions.concat();
        //trace(ps.length);
        for (var i = 0; i < len; i++) {
            var num = i + 1;
            btn = this.createBtn(num.toString());
            btn.name = num.toString();
            this.addChild(btn);
            var index = Math.floor(ps.length * Math.random());
            var p = ps[index];
            ps.splice(index, 1);
            btn.x = p.x;
            btn.y = p.y;
            this.numbers.push(btn);
        }
    };
    GameBasic.prototype.createBtn = function (name) {
        var skin = new moon.MoonDisplayObject();
        skin.type = moon.Const.SHAPE_CIRCLE;
        skin.data = { r: 40, c: 0XE18E0D };
        skin.setBackground(0XFFFFFF, 2);
        var btn = new moon.BasicButton(skin, skin);
        btn.textFild.size = 50;
        btn.labelCircle = name;
        return btn;
    };
    GameBasic.prototype.start = function (e) {
        this.initGame();
        this.createItem();
        this.play();
    };
    GameBasic.prototype.startPlay = function () {
        for (var i = 0; i < this.numbers.length; i++) {
            var btn = this.numbers[i];
            btn.labelCircle = "";
            btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        }
    };
    GameBasic.prototype.onClick = function (e) {
        var btn = e.currentTarget;
        if (btn.name == this.index.toString()) {
            btn.labelCircle = btn.name;
            this.index++;
        }
        else {
            this.over();
        }
        if (this.index == this.numbers.length + 1) {
            this.score += this.index;
            this.level++;
            this.blood = 100;
            this.index = 1;
            this.createItem();
        }
    };
    GameBasic.prototype.loop = function (n) {
        this.updateScore();
        this.updateBlood();
        this.updateLevel();
        return true;
    };
    GameBasic.prototype.over = function () {
        this.addChild(this.panelOver);
        this.panelOver.update({ score: this.score, level: this.level });
        this.stop();
    };
    GameBasic.prototype.updateLevel = function () {
        this.txtLevel.text = "level:" + this.level;
    };
    GameBasic.prototype.updateScore = function () {
        this.txtScore.text = "score:" + this.score;
        if (this.score > 0 && this.score % 200 == 0) {
            this.level++;
            this.updateLevel();
        }
    };
    GameBasic.prototype.updateBlood = function () {
        if (this.blood == 0) {
            this.startPlay();
            this.blood = -1;
        }
        else if (this.blood > 0) {
            this.blood--;
            this.txtBlood.text = "time:" + this.blood;
            this.txtBlood.x = (this.stageWidth - this.txtBlood.width) >> 1;
        }
    };
    GameBasic.prototype.dispose = function () {
        this.stop();
        _super.prototype.dispose.call(this);
    };
    return GameBasic;
}(moon.GameView));
__reflect(GameBasic.prototype, "GameBasic");
/**游戏开始界面 */
var PanelStart = (function (_super) {
    __extends(PanelStart, _super);
    function PanelStart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**加载到舞台之后调用 */
    PanelStart.prototype.render = function () {
        _super.prototype.render.call(this);
        var bg = this.createBackground();
        bg.alpha = 0.5;
        this.initView();
    };
    PanelStart.prototype.initView = function () {
        this.createBtn("开始游戏");
        this.createTitle("记忆数字");
    };
    PanelStart.prototype.createBtn = function (value) {
        var btn = this.createButton(value);
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        btn.x = (this.stageWidth - btn.width) >> 1;
        btn.y = (this.stageHeight - btn.height) >> 1;
        return btn;
    };
    PanelStart.prototype.createTitle = function (value) {
        var title = this.createText(0, 0, value);
        title.x = (this.stageWidth - title.width) / 2;
        title.y = (this.stageHeight - title.height) / 2 - 100;
        return title;
    };
    PanelStart.prototype.onClick = function (e) {
        this.removeFromParent();
        this.dispEvent(moon.MoonEvent.START);
    };
    return PanelStart;
}(moon.GameView));
__reflect(PanelStart.prototype, "PanelStart");
/**游戏结束界面 */
var PanelOver = (function (_super) {
    __extends(PanelOver, _super);
    function PanelOver() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PanelOver.prototype.initView = function () {
        this.createBtn("再来一次");
        this.txtScore = this.createText();
        this.txtLevel = this.createText();
    };
    PanelOver.prototype.update = function (data) {
        this.txtScore.text = "score:" + data["score"];
        this.txtLevel.text = "level:" + data["level"];
        this.txtScore.x = (this.stageWidth - this.txtScore.width) / 2;
        this.txtLevel.x = (this.stageWidth - this.txtLevel.width) / 2;
        this.txtScore.y = (this.stageHeight - this.txtScore.height) / 2 - 60;
        this.txtLevel.y = this.txtScore.y - 60;
    };
    return PanelOver;
}(PanelStart));
__reflect(PanelOver.prototype, "PanelOver");
//# sourceMappingURL=Game.js.map