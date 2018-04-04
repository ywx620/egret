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
var Game = (function (_super) {
    __extends(Game, _super);
    function Game() {
        var _this = _super.call(this) || this;
        _this.score = 0;
        _this.blood = 5;
        _this.level = 1;
        _this.sizeMin = 30;
        _this.sizeMid = 60;
        _this.sizeMax = 90;
        _this.sizeCurr = 0;
        _this.checkArray = [];
        _this.colors = [1, 2, 3, 4, 5, 6];
        _this.soundScore = "star_collect_wav";
        _this.soundDown = "special_egg_wav";
        _this.soundLevel = "level_wav";
        _this.setSkinName("resource/eui_skins/gameUI.exml");
        return _this;
    }
    Game.prototype.render = function () {
        _super.prototype.render.call(this);
        moon.showLog.getIns().init(this.stage);
        SoundControl.getIns().addItem(this.soundScore);
        SoundControl.getIns().addItem(this.soundDown);
        SoundControl.getIns().addItem(this.soundLevel);
        for (var i = 0; i < this.numChildren; i++) {
            var display = this.getChildAt(i);
            var name = display.name;
            if (name == "p9") {
                //display.visible=false;
                display.scaleX = display.scaleY = 1.1;
                this.currPoint = new egret.Point(display.x, display.y);
            }
        }
        this.addToStage();
        this.updateBlood();
        this.createOver();
    };
    Game.prototype.createOver = function () {
        this.gameOver = new GameOver(this);
    };
    Game.prototype.addToStage = function () {
        // this.currPoint=new egret.Point(this.stage.stageWidth/2,800);
        // this.nextPoint=new egret.Point(this.stage.stageWidth/2,800);
        this.createMonePoint();
        this.nodeMax = this.createContainer();
        this.nodeMid = this.createContainer();
        this.nodeMin = this.createContainer();
        this.coltrolMove = new control.ControlDrag(this.stage, null);
        this.coltrolMove.endBackFun = this.endBackFun.bind(this);
        this.coltrolMove.open();
        this.createNewCircle();
        this.btnChange.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
    };
    Game.prototype.onTouch = function (e) {
        if (this.target.parent) {
            this.target.parent.removeChild(this.target);
        }
        this.blood--;
        this.updateBlood();
        this.createNewCircle();
    };
    /**拖动结束时 */
    Game.prototype.endBackFun = function () {
        var points = this.points;
        var target = this.target;
        for (var i = 0; i < points.length; i++) {
            var p = points[i];
            var r = p.width / 2;
            var dx = p.x - target.x, dy = p.y - target.y;
            var dis = Math.sqrt(dx * dx + dy * dy);
            if (dis < r) {
                target.x = p.x;
                target.y = p.y;
                if (this.canPush(target, p.name)) {
                    egret.Tween.get(target).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.backIn);
                    this.checkResult(target, p.name);
                    this.createNewCircle();
                    SoundControl.getIns().play(this.soundDown);
                    return;
                }
            }
        }
        target.x = this.currPoint.x;
        target.y = this.currPoint.y;
    };
    /**创建容器 */
    Game.prototype.createContainer = function () {
        var node = new egret.Sprite();
        this.addChild(node);
        return node;
    };
    /**创建新的圆 */
    Game.prototype.createNewCircle = function () {
        var random = Math.random();
        var colorLevel = this.level + 1;
        colorLevel = colorLevel > this.colors.length ? this.colors.length : colorLevel;
        var color = this.colors[Math.floor(Math.random() * colorLevel)];
        var size;
        if (random > 0.7)
            size = this.sizeMax;
        else if (random > 0.4)
            size = this.sizeMid;
        else
            size = this.sizeMin;
        this.target = this.createCircle(size, color);
        this.target.scaleX = this.target.scaleY = 1.1;
        this.coltrolMove.target = this.target;
        this.checekOver();
    };
    /**根据大小与颜色创建圆 */
    Game.prototype.createCircle = function (size, color) {
        this.sizeCurr = size;
        var node = new egret.Sprite();
        // node.graphics.lineStyle(2);
        // node.graphics.beginFill(color);
        // node.graphics.drawCircle(0,0,size);
        // node.graphics.endFill();
        var image;
        switch (size) {
            case this.sizeMax:
                image = new eui.Image("circle_max_png");
                break;
            case this.sizeMid:
                image = new eui.Image("circle_mid_png");
                break;
            case this.sizeMin:
                image = new eui.Image("circle_min_png");
                break;
        }
        node.alpha = 0.8;
        node.addChild(image);
        node.x = this.currPoint.x;
        node.y = this.currPoint.y;
        node.name = color + "_" + size;
        image.addEventListener(egret.Event.COMPLETE, addStage, this);
        function addStage(e) {
            image.anchorOffsetX = image.width / 2;
            image.anchorOffsetY = image.height / 2;
            this.setColor(image, color);
        }
        switch (size) {
            case this.sizeMax:
                this.nodeMax.addChild(node);
                break;
            case this.sizeMid:
                this.nodeMid.addChild(node);
                break;
            case this.sizeMin:
                this.nodeMin.addChild(node);
                break;
        }
        return node;
    };
    Game.prototype.setColor = function (target, color) {
        if (color == this.colors[0]) {
            target.filters = [new egret.ColorMatrixFilter([
                    1, 0, 0, 0, 0,
                    0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0,
                    0, 0, 0, 1, 0
                ])];
        }
        else if (color == this.colors[1]) {
            target.filters = [new egret.ColorMatrixFilter([
                    0, 0, 0, 0, 0,
                    0, 1, 0, 0, 0,
                    0, 0, 0, 0, 0,
                    0, 0, 0, 1, 0
                ])];
        }
        else if (color == this.colors[2]) {
            target.filters = [new egret.ColorMatrixFilter([
                    0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0,
                    0, 0, 1, 0, 0,
                    0, 0, 0, 1, 0
                ])];
        }
        else if (color == this.colors[3]) {
            target.filters = [new egret.ColorMatrixFilter([
                    1, 0, 0, 0, 0,
                    0, 1, 0, 0, 0,
                    0, 0, 0, 0, 0,
                    0, 0, 0, 1, 0
                ])];
        }
        else if (color == this.colors[4]) {
            target.filters = [new egret.ColorMatrixFilter([
                    1, 0, 0, 0, 0,
                    0, 0, 0, 0, 0,
                    0, 0, 1, 0, 0,
                    0, 0, 0, 1, 0
                ])];
        }
        else if (color == this.colors[5]) {
            target.filters = [new egret.ColorMatrixFilter([
                    0, 0, 0, 0, 0,
                    0, 1, 0, 0, 0,
                    0, 0, 1, 0, 0,
                    0, 0, 0, 1, 0
                ])];
        }
    };
    /**创建9个圆点 */
    Game.prototype.createMonePoint = function () {
        var points = [];
        for (var i = 0; i < 9; i++) {
            var p = this.createPoint();
            p.name = "" + Math.floor(i / 3) + i % 3;
            //trace(p.name);
            var display = this.getChildByName("p" + i);
            display.alpha = 0.5;
            p.x = display.x;
            p.y = display.y;
            p.alpha = 0.2;
            points.push(p);
            this.addChild(p);
        }
        this.points = points;
        //LayoutManager.displayRank(points,3,20,20,115,163);
        for (i = 0; i < 3; i++) {
            var array = [];
            for (var j = 0; j < 3; j++) {
                array.push([]);
            }
            this.checkArray.push(array);
        }
    };
    /**创建圆点 */
    Game.prototype.createPoint = function () {
        var node = new egret.Sprite();
        node.graphics.lineStyle(1);
        node.graphics.drawCircle(0, 0, this.sizeMax);
        node.graphics.endFill();
        node.graphics.beginFill(0);
        node.graphics.drawCircle(0, 0, 5);
        node.graphics.endFill();
        this.addChild(node);
        return node;
    };
    /**能否PUSH到数组中 */
    Game.prototype.canPush = function (tagret, pos) {
        var i = parseInt(pos.substr(0, 1));
        var j = parseInt(pos.substr(1, 1));
        var array = this.checkArray[i][j];
        for (var i = 0; i < array.length; i++) {
            var t = array[i];
            if (t.name.split("_")[1] == tagret.name.split("_")[1]) {
                return false; //大小尺寸一样的不能再放
            }
        }
        return true;
    };
    /**查看结果 */
    Game.prototype.checkResult = function (tagret, pos) {
        var i = parseInt(pos.substr(0, 1));
        var j = parseInt(pos.substr(1, 1));
        var array = this.checkArray[i][j];
        var t;
        array.push(tagret);
        if (array.length == 3) {
            var color0 = array[0].name.split("_")[0];
            var color1 = array[1].name.split("_")[0];
            var color2 = array[2].name.split("_")[0];
            if (color0 == color1 && color1 == color2) {
                while (array.length > 0) {
                    t = array[0];
                    this.tweenTarget(t);
                    array.splice(0, 1);
                }
            }
        }
        var a = this.checkArray;
        //查看横排
        var b = a[i][0];
        var c = a[i][1];
        var d = a[i][2];
        this.checkThreeArray(b, c, d);
        b = a[0][j];
        c = a[1][j];
        d = a[2][j];
        this.checkThreeArray(b, c, d);
        if (i == j) {
            b = a[0][0];
            c = a[1][1];
            d = a[2][2];
            this.checkThreeArray(b, c, d);
        }
        if (i + j == 2) {
            b = a[0][2];
            c = a[1][1];
            d = a[2][0];
            this.checkThreeArray(b, c, d);
        }
    };
    Game.prototype.removeNode = function (t) {
        t.parent.removeChild(t);
    };
    Game.prototype.checkThreeArray = function (b, c, d) {
        for (var n = 0; n < b.length; n++) {
            var count1 = 1;
            var count2 = 0;
            var count3 = 0;
            var tb = b[n];
            var tbc = tb.name.split("_")[0];
            var temp = [tb];
            for (var i = 0; i < b.length; i++) {
                var tbb = b[i];
                var tbcc = tbb.name.split("_")[0];
                if (i != n) {
                    if (tbc == tbcc) {
                        temp.push(tbb);
                    }
                }
            }
            for (var i = 0; i < c.length; i++) {
                var tc = c[i];
                var tcc = tc.name.split("_")[0];
                if (tbc == tcc) {
                    count2 = 1;
                    temp.push(tc);
                }
            }
            for (var i = 0; i < d.length; i++) {
                var td = d[i];
                var tdc = td.name.split("_")[0];
                if (tbc == tdc) {
                    count3 = 1;
                    temp.push(td);
                }
            }
            if ((count1 + count2 + count3) == 3) {
                for (var i = 0; i < temp.length; i++) {
                    var t = temp[i];
                    this.tweenTarget(t);
                    var index = b.indexOf(t);
                    if (index >= 0)
                        b.splice(index, 1);
                    index = c.indexOf(t);
                    if (index >= 0)
                        c.splice(index, 1);
                    index = d.indexOf(t);
                    if (index >= 0)
                        d.splice(index, 1);
                }
            }
        }
    };
    Game.prototype.tweenTarget = function (t) {
        egret.Tween.get(t).wait(400).to({ alpha: 0, scaleX: 0, scaleY: 0, x: 0, y: 0 }, 500).call(this.removeNode, this, [t]);
        this.score++;
        this.txtScore.text = "score:" + this.score;
        SoundControl.getIns().play(this.soundScore);
        this.updateLevel();
    };
    Game.prototype.updateLevel = function () {
        if (this.score % 20 == 0) {
            this.level++;
            this.txtLevel.text = "LEVEL:" + this.level;
            this.blood += 2;
            this.updateBlood();
            SoundControl.getIns().play(this.soundLevel);
        }
    };
    Game.prototype.updateBlood = function () {
        this.btnChange.visible = this.blood != 0;
        this.txtBlood.text = "" + this.blood;
        this.checekOver();
    };
    Game.prototype.checekOver = function () {
        if (this.blood == 0) {
            var size = parseInt(this.target.name.split("_")[1]);
            switch (size) {
                case this.sizeMax:
                    if (this.nodeMax.numChildren == 10)
                        this.over();
                    break;
                case this.sizeMid:
                    if (this.nodeMid.numChildren == 10)
                        this.over();
                    break;
                case this.sizeMin:
                    if (this.nodeMin.numChildren == 10)
                        this.over();
                    break;
            }
            //traceSimple("blood=",this.blood,size,this.nodeMin.numChildren,this.nodeMid.numChildren,this.nodeMax.numChildren)
        }
    };
    Game.prototype.over = function () {
        this.gameOver.update();
        this.addChild(this.gameOver);
    };
    Game.prototype.restart = function () {
        this.score = 0;
        this.blood = 5;
        this.level = 1;
        this.txtLevel.text = "LEVEL:" + this.level;
        this.txtBlood.text = "" + this.blood;
        this.txtScore.text = "score:" + this.score;
        this.btnChange.visible = true;
        this.nodeMax.removeChildren();
        this.nodeMid.removeChildren();
        this.nodeMin.removeChildren();
        for (var i = 0; i < this.checkArray.length; i++) {
            var a = this.checkArray[i];
            for (var j = 0; j < a.length; j++) {
                var b = a[j];
                b.length = 0;
            }
        }
        this.createNewCircle();
    };
    return Game;
}(BasicComponent));
__reflect(Game.prototype, "Game");
var GameStart = (function (_super) {
    __extends(GameStart, _super);
    function GameStart() {
        var _this = _super.call(this) || this;
        _this.setSkinName("resource/eui_skins/gameStartUI.exml");
        return _this;
    }
    GameStart.prototype.render = function () {
        _super.prototype.render.call(this);
        for (var key in this.animation.items) {
            this.animation.items[key].props = { loop: true };
        }
        this.animation.play();
        this.btnStart.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
    };
    GameStart.prototype.onTouch = function (e) {
        this.parent.removeChild(this);
    };
    return GameStart;
}(BasicComponent));
__reflect(GameStart.prototype, "GameStart");
var GameOver = (function (_super) {
    __extends(GameOver, _super);
    function GameOver(g) {
        var _this = _super.call(this) || this;
        _this.game = g;
        _this.setSkinName("resource/eui_skins/gameOverUI.exml");
        return _this;
    }
    GameOver.prototype.render = function () {
        _super.prototype.render.call(this);
        this.btnStart.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
    };
    GameOver.prototype.onTouch = function (e) {
        this.parent.removeChild(this);
        this.game.restart();
    };
    GameOver.prototype.update = function () {
        this.txtScore.text = this.game.txtScore.text.toLocaleUpperCase();
        this.txtLevel.text = this.game.txtLevel.text.toLocaleUpperCase();
    };
    return GameOver;
}(BasicComponent));
__reflect(GameOver.prototype, "GameOver");
//# sourceMappingURL=Game.js.map