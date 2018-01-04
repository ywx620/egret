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
var MyPanel = (function (_super) {
    __extends(MyPanel, _super);
    function MyPanel() {
        var _this = _super.call(this) || this;
        var panel = new StartPanel();
        _this.addChild(panel);
        return _this;
    }
    return MyPanel;
}(eui.UILayer));
__reflect(MyPanel.prototype, "MyPanel");
var StartPanel = (function (_super) {
    __extends(StartPanel, _super);
    function StartPanel() {
        var _this = _super.call(this) || this;
        _this.score = 0;
        _this.conA = 0;
        _this.sinA = 0;
        _this.dis = 0;
        _this.bullets = [];
        _this.enemys = [];
        _this.btns = [];
        _this.point = new egret.Point;
        _this.setSkinName("resource/eui_skins/APP_GameSkin.exml");
        return _this;
    }
    StartPanel.prototype.render = function () {
        //egret.log(this.controlBar);
        var _this = this;
        this.initSount();
        SystemSetManager.getIns().initData();
        // this.controlBar.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
        // this.controlBg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
        // this.btnFire.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
        this.btns.push(this.controlBar, this.controlBg, this.btnFire);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
        this.btnSet.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) { _this.addChild(_this.setPanel); }, this);
        egret.startTick(this.loop, this);
        this.addEnemy();
        this.txtScore.text = Const.VER;
        this.setPanel = new SetPanel();
        this.setPanel.backFunction = this.backFunction.bind(this);
        this.backFunction();
    };
    StartPanel.prototype.backFunction = function () {
        this.showView();
    };
    StartPanel.prototype.initSount = function () {
        SoundControl.getIns().addItem("fire_mp3");
        SoundControl.getIns().addItem("bomb_mp3");
        SoundControl.getIns().addItem("bgSound2_mp3", true);
        SoundControl.getIns().play("bgSound2_mp3", 0, 99);
        SoundControl.getIns().setBgVolume(Const.SOUND_BG);
        SoundControl.getIns().setEffectVolume(Const.SOUND_EFFECT);
    };
    StartPanel.prototype.showView = function () {
        var boo = SystemSetManager.getIns().getData().showShip;
        this.airship.visible = boo;
    };
    //egret 在执行 startTick 的回调时，会给予参数 timeStamp(当前时间戳)
    StartPanel.prototype.loop = function (timeStamp) {
        if (this.isMoveMap) {
            this.controlAirMap();
        }
        var bs = this.bullets;
        var enemys = this.enemys;
        var aim = this.aim;
        for (var i = 0; i < bs.length; i++) {
            var b = bs[i];
            var dy = b.targetY - b.y;
            var dx = b.targetX - b.x;
            b.y += dy / 5;
            b.x += dx / 5;
            if (Math.abs(dy) < 1) {
                for (var j = 0; j < enemys.length; j++) {
                    var enemy = enemys[j];
                    enemy.checkHit(b);
                }
                this.container.removeChild(b);
                bs.splice(i, 1);
                i--;
            }
        }
        if (Math.random() < 0.01) {
            this.addEnemy();
        }
        for (i = 0; i < enemys.length; i++) {
            enemy = enemys[i];
            enemy.loop();
        }
        return false;
    };
    StartPanel.prototype.addEnemy = function () {
        if (this.enemys.length < Const.MAX_ENEMY) {
            var enemy = new EnemyData("enemy_png");
            enemy.addEventListener(Const.REMOVE, this.removeEnemy, this);
            this.enemyContainer.addChild(enemy);
            this.enemys.push(enemy);
        }
    };
    StartPanel.prototype.removeEnemy = function (e) {
        var enemy = e.currentTarget;
        enemy.removeEventListener(Const.REMOVE, this.removeEnemy, this);
        this.enemyContainer.removeChild(enemy);
        this.enemys.splice(this.enemys.indexOf(enemy), 1);
        SoundControl.getIns().play("bomb_mp3");
        this.score++;
        this.txtScore.text = "score：" + this.score;
    };
    StartPanel.prototype.onTouch = function (e) {
        var id = e.touchPointID;
        var sX = e.stageX;
        var sY = e.stageY;
        switch (e.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                for (var i = 0; i < this.btns.length; i++) {
                    var display = this.btns[i];
                    if (display.hitTestPoint(sX, sY)) {
                        if (display == this.btnFire) {
                            this.fireStart();
                            display.name = "fire_" + id;
                        }
                        else {
                            this.isMoveMap = true;
                            this.controlStart();
                            display.name = "control_" + id;
                        }
                    }
                }
                break;
            case egret.TouchEvent.TOUCH_MOVE:
                for (var i = 0; i < this.btns.length; i++) {
                    var display = this.btns[i];
                    var names = display.name.split("_");
                    var did = parseInt(names[1]);
                    var dname = names[0];
                    if (did == id) {
                        if (dname == "control") {
                            this.controlMove(e.stageX, e.stageY);
                        }
                    }
                }
                break;
            case egret.TouchEvent.TOUCH_END:
                for (var i = 0; i < this.btns.length; i++) {
                    var display = this.btns[i];
                    var names = display.name.split("_");
                    var did = parseInt(names[1]);
                    var dname = names[0];
                    if (did == id) {
                        if (dname == "control") {
                            this.isMoveMap = false;
                            this.controlEnd();
                        }
                        else {
                            this.fireEnd();
                        }
                    }
                }
                break;
        }
    };
    StartPanel.prototype.controlStart = function () {
        //egret.log("start");
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
    };
    StartPanel.prototype.controlMove = function (x, y) {
        this.point.x = x;
        this.point.y = y;
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
            this.dis = ds;
        }
        else {
            bar.x = cx + conA * r;
            bar.y = cy + sinA * r;
            this.dis = r;
        }
        this.conA = conA;
        this.sinA = sinA;
        this.controlAirship(conA, sinA);
    };
    StartPanel.prototype.controlEnd = function () {
        //egret.log("end");
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
        var bg = this.controlBg;
        var bar = this.controlBar;
        bar.x = bg.x;
        bar.y = bg.y;
        this.aim.x = this.stage.stageWidth >> 1;
        this.aim.y = this.stage.stageHeight >> 1;
        this.airship.rotation = 0;
    };
    StartPanel.prototype.fireStart = function () {
        this.isFire = true;
        this.sendBullet();
        this.btnFire.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouch, this);
        this.btnFire.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
    };
    StartPanel.prototype.fireEnd = function () {
        this.isFire = false;
        this.btnFire.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouch, this);
        this.btnFire.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
    };
    StartPanel.prototype.sendBullet = function () {
        //egret.log(this.isFire);
        if (this.isFire) {
            if (SystemSetManager.getIns().getData().fireIsContinue) {
                var time = 1000 / SystemSetManager.getIns().getData().fireCount;
                egret.setTimeout(this.sendBullet, this, time);
            }
            else {
                this.fireEnd();
            }
            var image = new Buttlet("bullet_png"); //new egret.Bitmap(RES.getRes("bullet_png"));
            image.x = this.stage.stageWidth / 2;
            image.y = this.stage.stageHeight;
            image.targetX = this.aim.x;
            image.targetY = this.aim.y;
            image.changeAngle();
            image.anchorOffsetX = image.width >> 1;
            this.container.addChild(image);
            this.bullets.push(image);
            SoundControl.getIns().play("fire_mp3");
        }
    };
    StartPanel.prototype.controlAirship = function (conA, sinA) {
        if (SystemSetManager.getIns().getData().turnShip) {
            var ship = this.airship;
            var angle = (this.controlBar.x - this.controlBg.x) / 20;
            ship.rotation = angle;
        }
        if (SystemSetManager.getIns().getData().aimIsMove) {
            var aim = this.aim;
            var bar = this.controlBar;
            var bg = this.controlBg;
            var r = bg.width / 2;
            var minx = bar.x - bg.x;
            var miny = bar.y - bg.y;
            var maxx = this.stage.stageWidth / 2;
            var maxy = this.stage.stageHeight / 2;
            aim.x = maxx + minx / r * maxx;
            aim.y = maxy + miny / r * maxy;
        }
    };
    StartPanel.prototype.controlAirMap = function () {
        if (!SystemSetManager.getIns().getData().mapIsMove)
            return;
        var conA = this.conA;
        var sinA = this.sinA;
        var ds = this.dis;
        var map = this.map;
        var conBg = this.controlBg;
        var p = this.point;
        var minx = 0;
        var miny = 0;
        var maxx = this.stage.stageWidth;
        var maxy = this.stage.stageHeight;
        var x = map.x;
        var y = map.y;
        if (x < minx) {
            map.x = minx;
        }
        else if (x > maxx) {
            map.x = maxx;
        }
        else if (y < miny) {
            map.y = miny;
        }
        else if (y > maxy) {
            map.y = maxy;
        }
        else {
            map.x -= conA * ds * 0.03;
            map.y -= sinA * ds * 0.03;
        }
        this.enemyContainer.x = map.x;
        this.enemyContainer.y = map.y;
    };
    return StartPanel;
}(BasicComponent));
__reflect(StartPanel.prototype, "StartPanel");
//# sourceMappingURL=appMain.js.map