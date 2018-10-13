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
var MaoMaoConst = (function () {
    function MaoMaoConst() {
    }
    MaoMaoConst.STATIC_AWAIT = 0; //待机
    MaoMaoConst.STATIC_READY = 1; //准备起跳
    MaoMaoConst.STATIC_JUMP = 2; //起跳
    MaoMaoConst.STATIC_JUMP_OVER = 3; //结束跳跃
    MaoMaoConst.JUMP_HEIGHT = 48; //要跳的高度
    MaoMaoConst.SPEED_MAX = 10; //速度最高值
    MaoMaoConst.SPEED_A = 0.5; //速度加速度
    MaoMaoConst.CENTER = 0.8;
    return MaoMaoConst;
}());
__reflect(MaoMaoConst.prototype, "MaoMaoConst");
var MaoMaoJump = (function (_super) {
    __extends(MaoMaoJump, _super);
    function MaoMaoJump() {
        return _super.call(this) || this;
    }
    /**加载到舞台之后调用 */
    MaoMaoJump.prototype.render = function () {
        _super.prototype.render.call(this);
        this.createBackground();
        this.createLadder();
        this.createPlayer();
        this.play();
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClick, this);
        this.touchEnabled = true;
    };
    MaoMaoJump.prototype.onClick = function (e) {
        if (this.player.static == MaoMaoConst.STATIC_AWAIT) {
            this.player.jump();
        }
    };
    MaoMaoJump.prototype.createPlayer = function () {
        this.player = new MaoMaoPlayer();
        this.player.x = this.stageWidth - 120;
        this.player.y = this.stageHeight - 100;
        this.player.addEvent(moon.MoonEvent.OVER, this.jumpOver, this);
        this.addChild(this.player);
    };
    MaoMaoJump.prototype.jumpOver = function (e) {
        this.ladder.setSpeed();
    };
    MaoMaoJump.prototype.loop = function (n) {
        this.player.loop();
        if (this.player.static == MaoMaoConst.STATIC_JUMP) {
            var sh = this.stageHeight * MaoMaoConst.CENTER;
            if (this.player.y <= sh) {
                this.ladder.loop();
            }
        }
        return true;
    };
    MaoMaoJump.prototype.createLadder = function () {
        this.ladder = new MaoMaoLader();
        this.addChild(this.ladder);
    };
    return MaoMaoJump;
}(moon.GameView));
__reflect(MaoMaoJump.prototype, "MaoMaoJump");
var MaoMaoPlayer = (function (_super) {
    __extends(MaoMaoPlayer, _super);
    function MaoMaoPlayer() {
        var _this = _super.call(this) || this;
        _this.moveX = -1; //X轴方向
        _this.jumpCount = 0; //跳的次数
        var bitmap = new Bitmap();
        bitmap.texture = RES.getRes("maomao_png");
        _this.playerHeight = bitmap.height;
        bitmap.scaleY = -1;
        _this.addChild(bitmap);
        _this.bitmap = bitmap;
        _this.await();
        return _this;
    }
    /**待机 */
    MaoMaoPlayer.prototype.await = function () {
        this.static = MaoMaoConst.STATIC_AWAIT;
        Tween.removeTweens(this.bitmap);
        var h = this.playerHeight;
        var tw = Tween.get(this.bitmap, { loop: true });
        tw.to({ height: h + 4 }, 300).to({ height: h }, 300);
    };
    /**跳跃 */
    MaoMaoPlayer.prototype.jump = function () {
        this.static = MaoMaoConst.STATIC_READY;
        var jumpHeight;
        var sh = this.stageHeight * MaoMaoConst.CENTER;
        if (this.y <= sh)
            jumpHeight = 0;
        else
            jumpHeight = MaoMaoConst.JUMP_HEIGHT;
        this.originHeight = this.y - jumpHeight;
        this.speed = MaoMaoConst.SPEED_MAX;
        Tween.removeTweens(this.bitmap);
        var h = this.playerHeight;
        var tw = Tween.get(this.bitmap, { loop: false });
        tw.to({ height: h / 2 }, 200).to({ height: h + 10 }, 80).call(this.backJump, this); //先下蹲
        tw.to({ height: h }, 80); //再起跳
    };
    MaoMaoPlayer.prototype.backJump = function () {
        this.static = MaoMaoConst.STATIC_JUMP;
    };
    MaoMaoPlayer.prototype.overJump = function () {
        this.static = MaoMaoConst.STATIC_JUMP_OVER;
        this.dispEvent(moon.MoonEvent.OVER);
        Tween.removeTweens(this.bitmap);
        var h = this.playerHeight;
        var tw = Tween.get(this.bitmap, { loop: false });
        tw.to({ height: h - 10 }, 100).to({ height: h }, 100).call(this.await, this);
        this.y = this.originHeight;
        this.jumpCount++;
        if (this.jumpCount == 5) {
            this.moveX = 0;
        }
        else if (this.jumpCount == 6) {
            if (this.x < 200)
                this.moveX = 1;
            else
                this.moveX = -1;
            this.jumpCount = 0;
        }
    };
    MaoMaoPlayer.prototype.loop = function () {
        if (this.static == MaoMaoConst.STATIC_JUMP) {
            this.speed -= MaoMaoConst.SPEED_A;
            this.y -= this.speed;
            this.x += 2.85 * this.moveX;
            if (this.speed < 0 && this.originHeight < this.y) {
                this.overJump();
            }
        }
    };
    return MaoMaoPlayer;
}(moon.MoonContainer));
__reflect(MaoMaoPlayer.prototype, "MaoMaoPlayer");
var MaoMaoLader = (function (_super) {
    __extends(MaoMaoLader, _super);
    function MaoMaoLader() {
        var _this = _super.call(this) || this;
        _this.ladders = [];
        return _this;
    }
    MaoMaoLader.prototype.render = function () {
        _super.prototype.render.call(this);
        var sw = this.stageWidth;
        var sh = this.stageHeight;
        var image = new moon.Scale9Image("ladder_png");
        var iw = image.width;
        var ih = image.height;
        var count = Math.floor(sw / iw);
        var off = 6; //X轴缩进去的距离
        var side = ((sw % iw) + count * off) / 2;
        var x = sw - iw - side;
        var y = sh - ih;
        var sign = 1;
        for (var j = 0; j < 4; j++) {
            for (var i = 0; i < count; i++) {
                image = new moon.Scale9Image("ladder_png");
                this.addChildAt(image, 0);
                image.scaleX = sign;
                image.x = x - (iw - off) * i * sign;
                image.y = y - MaoMaoConst.JUMP_HEIGHT * i;
                this.ladders.push(image);
            }
            x = image.x + iw * sign;
            y = image.y - ih / 2;
            sign *= -1;
        }
    };
    MaoMaoLader.prototype.setSpeed = function () {
        this.speed = this.y + MaoMaoConst.SPEED_MAX;
    };
    MaoMaoLader.prototype.loop = function () {
        var len = this.ladders.length;
        //this.speed-=MaoMaoConst.SPEED_A;
        this.y += (this.speed - this.y) * MaoMaoConst.SPEED_A;
        if (Math.abs(this.speed - this.y) < 1) {
            this.y = this.speed;
        }
    };
    return MaoMaoLader;
}(moon.BasicView));
__reflect(MaoMaoLader.prototype, "MaoMaoLader");
//# sourceMappingURL=MaoMaoJump.js.map