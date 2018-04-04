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
var MUSIC_CLICK_BTN = "click_wav";
var MUSIC_CLICK_WATER = "water_wav";
var MUSIC_BOMB = "bomb_wav";
var MUSIC_BG = "background_mp3";
var EVENT_BOMB = "event bomb";
var EVENT_REMOVE = "event remove";
var EVENT_ADD_WATER = "event add water";
var GamePanel = (function (_super) {
    __extends(GamePanel, _super);
    function GamePanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.layout = Layout.getIns();
        _this.waters = [];
        _this.bullets = [];
        _this.edge = new Rectangle(0, 0, 516, 516);
        _this.calc = 0;
        _this.loopNum = 0;
        _this.TOTALNUM = 10;
        return _this;
    }
    GamePanel.prototype.initView = function () {
        this.layout.setStageWH(this.stageWidth, this.stageHeight);
        SoundControl.getIns().addItem(MUSIC_CLICK_BTN);
        SoundControl.getIns().addItem(MUSIC_CLICK_WATER);
        SoundControl.getIns().addItem(MUSIC_BOMB);
        SoundControl.getIns().addItem(MUSIC_BG, true);
        this.createImageBg("background_jpg");
        var top;
        this.chessboard = new MImage("chessboard_jpg");
        this.layout.setImage(this.chessboard);
        this.layout.setBottom(10);
        this.addChild(this.chessboard);
        top = this.chessboard.y;
        var image = new MImage("title_png");
        image.scaleX = image.scaleY = top * 3 / this.stageHeight;
        this.addChild(image);
        var image = new MImage("level_png");
        this.layout.setImage(image);
        this.layout.setLeft(30);
        this.layout.setTop(top - image.height);
        this.txtLevel = this.createText();
        this.setMImageText(image, this.txtLevel);
        this.addChild(image);
        var image = new MImage("score_png");
        this.layout.setImage(image);
        this.layout.setRight(30);
        this.layout.setTop(top - image.height);
        this.txtScore = this.createText();
        this.setMImageText(image, this.txtScore);
        var image = new BloodImage("waterNum3_png");
        this.layout.setImage(image);
        this.layout.setCenterX();
        this.layout.setTop(top - image.height);
        this.txtBlood = this.createText();
        this.setMImageText(image, this.txtBlood);
        this.bloodImage = image;
        this.edge.width = this.chessboard.width;
        this.edge.height = this.chessboard.height;
        // this.initGame();
        // this.play();
        SoundControl.getIns().play(MUSIC_BG, 0, 999);
        this.panelStart = new GameStart;
        this.panelStart.addEvent(moon.MoonEvent.START, this.start, this);
        this.panelOver = new GameOver;
        this.panelOver.addEvent(moon.MoonEvent.START, this.start, this);
        this.addChild(this.panelStart);
    };
    GamePanel.prototype.initGame = function () {
        _super.prototype.initGame.call(this);
        this.blood = this.TOTALNUM;
        this.updateBlood();
        this.initWater();
    };
    GamePanel.prototype.initWater = function () {
        this.removeWater();
        var water;
        var waters = this.waters;
        for (var i = 0; i < 30; i++) {
            var num = Math.floor(Math.random() * 4);
            water = new Water();
            water.addEvent(EVENT_BOMB, this.bombHandler, this);
            water.addEvent(EVENT_ADD_WATER, this.bombHandler, this);
            water.gotoAndStop(num);
            this.chessboard.addChild(water);
            waters.push(water);
        }
        moon.SimpleLayout.displayRank(waters, 5, 1, 1, 60, 70);
    };
    GamePanel.prototype.removeWater = function () {
        var waters = this.waters;
        var water;
        for (var i = 0; i < waters.length; i++) {
            water = waters[i];
            water.removeFromParent(true);
            water = null;
        }
        waters.length = 0;
    };
    GamePanel.prototype.setMImageText = function (image, text) {
        this.addChild(image);
        text.x = image.width / 2;
        text.y = image.height / 2;
        text.size = 50;
        image.addChild(text);
    };
    GamePanel.prototype.bombHandler = function (e) {
        var water = e.currentTarget;
        if (e.type == EVENT_ADD_WATER) {
            this.blood--;
            this.updateBlood();
            if (this.blood == 0) {
                this.startCheck = true;
            }
            this.calc = 0;
            this.canCalc = water.currentFrame == 3;
            return;
        }
        else if (e.type == EVENT_BOMB) {
            this.startCheck = false;
        }
        var x = water.x;
        var y = water.y;
        water.removeFromParent(true);
        this.waters.splice(this.waters.indexOf(water), 1);
        water = null;
        for (var i = 0; i < 4; i++) {
            var bullet = new Bullet;
            this.chessboard.addChild(bullet);
            bullet.x = x;
            bullet.y = y;
            bullet.setSpeed(i);
            bullet.addEvent(EVENT_REMOVE, this.onBullet, this);
            this.bullets.push(bullet);
        }
        if (this.blood == 0) {
            this.startCheck = true;
        }
        if (this.canCalc) {
            this.calc++;
            this.score += this.calc * (this.level);
            this.updateScore();
            if (this.calc % 3 == 0) {
                this.blood++;
                this.updateBlood();
            }
        }
    };
    GamePanel.prototype.loop = function (n) {
        var bullets = this.bullets;
        var waters = this.waters;
        var edge = this.edge;
        for (var i = 0; i < bullets.length; i++) {
            var bullet = bullets[i];
            bullet.update();
            for (var j = 0; j < waters.length; j++) {
                var water = waters[j];
                var dx = water.x - bullet.x;
                var dy = water.y - bullet.y;
                if (Math.sqrt(dx * dx + dy * dy) < 10) {
                    water.addNumber();
                    bullets.splice(i, 1);
                    i--;
                    bullet.removeFromParent(true);
                    bullet = null;
                    break;
                }
            }
            if (bullet) {
                if (bullet.x < edge.x || bullet.x > edge.width || bullet.y < edge.y || bullet.y > edge.height) {
                    bullet.playBomb();
                    bullets.splice(i, 1);
                    SoundControl.getIns().play(MUSIC_BOMB);
                    i--;
                }
            }
        }
        if (bullets.length == 0) {
            if (this.waters.length == 0) {
                this.nextLevel();
            }
            if (this.blood == 0) {
                this.loopNum++;
                if (this.loopNum == 50) {
                    this.loopNum = 0;
                    if ((!this.hasWater || this.startCheck)) {
                        this.over();
                    }
                }
            }
        }
        return true;
    };
    GamePanel.prototype.onBullet = function (e) {
        var bullet = e.currentTarget;
        bullet.removeFromParent(true);
        bullet = null;
    };
    GamePanel.prototype.nextLevel = function () {
        this.blood++;
        this.level++;
        this.updateBlood();
        this.updateLevel();
        this.initWater();
    };
    GamePanel.prototype.updateLevel = function () {
        this.txtLevel.text = "" + this.level;
        this.layout.setCenterXByPanent(this.txtLevel);
    };
    GamePanel.prototype.updateScore = function () {
        this.txtScore.text = "" + this.score;
        this.layout.setCenterXByPanent(this.txtScore);
    };
    GamePanel.prototype.updateBlood = function () {
        this.blood = this.blood > this.TOTALNUM ? this.TOTALNUM : this.blood;
        this.blood = this.blood < 0 ? 0 : this.blood;
        this.txtBlood.text = "" + this.blood;
        this.layout.setCenterXByPanent(this.txtBlood);
        this.bloodImage.update(this.blood);
        this.hasWater = this.blood > 0;
    };
    return GamePanel;
}(moon.BasicGamePanel));
__reflect(GamePanel.prototype, "GamePanel");
var BloodImage = (function (_super) {
    __extends(BloodImage, _super);
    function BloodImage(skinName) {
        if (skinName === void 0) { skinName = ""; }
        var _this = _super.call(this, "waterNum3_png") || this;
        _this.max = 10;
        var mask = new Scale9Image("waterNum2_png");
        _this.blood = new Scale9Image("waterNum1_png");
        _this.addChild(mask);
        _this.addChild(_this.blood);
        _this.blood.mask = mask;
        _this.blood.scaleY = 0;
        _this.blood.anchorOffsetY = _this.blood.height;
        _this.blood.anchorOffsetX = _this.blood.width / 2;
        _this.blood.y = _this.blood.height;
        _this.blood.x = _this.blood.width / 2;
        Tween.get(_this.blood, { loop: true }).to({ rotation: 4 }, 500).to({ rotation: -4 }, 500).to({ rotation: 0 }, 500);
        return _this;
    }
    BloodImage.prototype.update = function (value) {
        this.blood.scaleY = value / this.max;
    };
    return BloodImage;
}(MImage));
__reflect(BloodImage.prototype, "BloodImage");
var GameStart = (function (_super) {
    __extends(GameStart, _super);
    function GameStart() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.layout = Layout.getIns();
        return _this;
    }
    GameStart.prototype.initView = function () {
        this.layout.setStageWH(this.stageWidth, this.stageHeight);
        this.createImageBg("backgroundAlpha_png");
        var top;
        var image = new MImage("explain_jpg");
        this.layout.setImage(image);
        this.layout.setBottom(10);
        //this.layout.setCenterY();
        this.addChild(image);
        top = image.y;
        var btn = this.createBtn("btnStart_png");
        this.layout.setImage(btn);
        this.layout.setCenterX();
        this.layout.setBottom(100);
    };
    GameStart.prototype.createBtn = function (value) {
        var skin = new Scale9Image(value);
        var skin2 = new Scale9Image(value);
        skin2.alpha = 0.5;
        var btn = new MButton(skin, skin2);
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.addChild(btn);
        return btn;
    };
    GameStart.prototype.onClick = function (e) {
        _super.prototype.onClick.call(this, e);
        SoundControl.getIns().play(MUSIC_CLICK_BTN);
    };
    return GameStart;
}(moon.BasicGameStart));
__reflect(GameStart.prototype, "GameStart");
var GameOver = (function (_super) {
    __extends(GameOver, _super);
    function GameOver() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.layout = Layout.getIns();
        return _this;
    }
    GameOver.prototype.initView = function () {
        this.layout.setStageWH(this.stageWidth, this.stageHeight);
        this.createImageBg("backgroundAlpha_png");
        var top;
        var image = new MImage("chessboard_jpg");
        this.layout.setImage(image);
        this.layout.setBottom(10);
        //this.layout.setCenterY();
        this.addChild(image);
        top = image.y;
        var btn = this.createBtn("btnReStart_png");
        this.layout.setImage(btn);
        this.layout.setCenterX();
        this.layout.setBottom(300);
        var image = new MImage("level_png");
        this.layout.setImage(image);
        this.layout.setLeft(50);
        this.layout.setBottom(500);
        this.txtLevel = this.createText();
        this.setMImageText(image, this.txtLevel);
        this.addChild(image);
        var image = new MImage("score_png");
        this.layout.setImage(image);
        this.layout.setRight(50);
        this.layout.setBottom(500);
        this.txtScore = this.createText();
        this.setMImageText(image, this.txtScore);
        var image = new MImage("titleOver_png");
        this.addChild(image);
        this.layout.setImage(image);
        this.layout.setCenterX();
        this.layout.setBottom(700);
    };
    GameOver.prototype.setMImageText = function (image, text) {
        this.addChild(image);
        text.x = image.width / 2;
        text.y = image.height / 2;
        text.size = 50;
        image.addChild(text);
    };
    GameOver.prototype.createBtn = function (value) {
        var skin = new Scale9Image(value);
        var skin2 = new Scale9Image(value);
        skin2.alpha = 0.5;
        var btn = new MButton(skin, skin2);
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.addChild(btn);
        return btn;
    };
    GameOver.prototype.onClick = function (e) {
        _super.prototype.onClick.call(this, e);
        SoundControl.getIns().play(MUSIC_CLICK_BTN);
    };
    GameOver.prototype.update = function (data) {
        this.txtScore.text = data["score"];
        this.txtLevel.text = data["level"];
        this.layout.setCenterXByPanent(this.txtScore);
        this.layout.setCenterXByPanent(this.txtLevel);
    };
    return GameOver;
}(moon.BasicGameOver));
__reflect(GameOver.prototype, "GameOver");
var Water = (function (_super) {
    __extends(Water, _super);
    function Water() {
        var _this = _super.call(this, "w", 2, 5) || this;
        _this.anchorOffsetX = _this.width / 2;
        _this.anchorOffsetY = _this.height / 2;
        var time = 1000 + Math.random() * 500;
        var sx = 0.8 + Math.random() * 0.3;
        var sy = 0.8 + Math.random() * 0.3;
        Tween.get(_this, { loop: true }).to({ scaleX: sx, scaleY: sy }, time).to({ scaleX: 1, scaleY: 1 }, time);
        _this.gotoAndStop(0);
        _this.touchEnabled = true;
        _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onClick, _this);
        return _this;
    }
    Water.prototype.onClick = function (e) {
        this.dispEvent(EVENT_ADD_WATER);
        if (this.index == this.items.length - 1) {
            this.dispEvent(EVENT_BOMB);
            SoundControl.getIns().play(MUSIC_BOMB);
        }
        else {
            Tween.get(this).to({ alpha: 0.5, rotation: this.rotation + 5 }, 200).call(this.backCall, this);
        }
    };
    Water.prototype.backCall = function () {
        this.alpha = 1;
        this.gotoAndStop(++this.index);
        SoundControl.getIns().play(MUSIC_CLICK_WATER);
    };
    Water.prototype.addNumber = function () {
        if (this.index == this.items.length - 1) {
            this.dispEvent(EVENT_BOMB);
            SoundControl.getIns().play(MUSIC_BOMB);
        }
        else {
            this.backCall();
        }
    };
    Water.prototype.dispose = function () {
        Tween.removeTweens(this);
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClick, this);
        _super.prototype.dispose.call(this);
    };
    return Water;
}(moon.ImageAnimation));
__reflect(Water.prototype, "Water");
var Bullet = (function (_super) {
    __extends(Bullet, _super);
    function Bullet() {
        var _this = _super.call(this, "w", 1, 1) || this;
        _this.v = 4;
        _this.vx = 0;
        _this.vy = 0;
        _this.anchorOffsetX = _this.width / 2;
        _this.anchorOffsetY = _this.height / 2;
        _this.gotoAndStop(0);
        return _this;
    }
    Bullet.prototype.setSpeed = function (type) {
        if (type == 0) {
            this.vx = this.v;
            this.rotation = 90;
            this.x += 35;
        }
        else if (type == 1) {
            this.vx = -1 * this.v;
            this.x += -35;
            this.rotation = -90;
        }
        else if (type == 2) {
            this.vy = this.v;
            this.rotation = 180;
            this.y += 35;
        }
        else if (type == 3) {
            this.vy = -1 * this.v;
            this.y += -35;
        }
    };
    Bullet.prototype.update = function () {
        this.x += this.vx;
        this.y += this.vy;
    };
    Bullet.prototype.playBomb = function () {
        //mc.gotoAndPlay(2);
        //mc.addFrameScript(mc.totalFrames-1,stopHandler);
        this.stopHandler();
    };
    Bullet.prototype.stopHandler = function () {
        //mc.stop();
        this.dispEvent(EVENT_REMOVE);
    };
    return Bullet;
}(moon.ImageAnimation));
__reflect(Bullet.prototype, "Bullet");
//# sourceMappingURL=Game.js.map