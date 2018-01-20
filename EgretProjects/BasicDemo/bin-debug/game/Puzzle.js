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
var Puzzle = (function (_super) {
    __extends(Puzzle, _super);
    function Puzzle() {
        var _this = _super.call(this) || this;
        _this.images = [];
        _this.checkImages = [];
        _this.rightOrder = "";
        _this.step = 0;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.addToStage, _this); //只帧听一次然后自动删除
        return _this;
    }
    Puzzle.prototype.addToStage = function () {
        var texture = RES.getRes("bg_jpg");
        var poker = new egret.SpriteSheet(texture);
        var num = 3;
        var width = 640 / num;
        var num2 = Math.floor(1136 / width);
        var len = num * num2;
        //len=9;
        for (var i = 0; i < len; i++) {
            var x = Math.floor(i % num) * width;
            var y = Math.floor(i / num) * width;
            poker.createTexture("part", x, y, width, width);
            var part = poker.getTexture("part");
            var img = new egret.Bitmap();
            img.name = i + "";
            this.rightOrder += img.name;
            img.texture = part;
            this.images.push(img);
            this.addChild(img);
        }
        //trace(this.rightOrder);
        this.images = ArrayManager.getRandomArray(this.images);
        LayoutManager.displayRank(this.images, num);
        this.imaWidth = width;
        // var a:any[]=[1,2,3,4,5,6];
        // var b:any[]=ArrayManager.getRandomArray(a);
        // trace(a.toString(),b.toString())
        this.coltrolMove = new control.ControlFingerMove(this.stage);
        this.coltrolMove.open();
        this.coltrolMove.startBackFun = this.hitImage.bind(this);
        //this.coltrolMove.endBackFun=this.hitImage.bind(this);
        this.coltrolMove.moveEndBackFun = this.moveEnd.bind(this);
        this.setStep();
    };
    Puzzle.prototype.setStep = function () {
        simpleTrace("步数:" + this.step++);
    };
    Puzzle.prototype.moveEnd = function (point) {
        if (this.checkImages.length == 1) {
            var imageA = this.checkImages[0];
            var len = this.images.length;
            for (var i = 0; i < len; i++) {
                var image = this.images[i];
                if (imageA != image) {
                    if (point.x != 0) {
                        if (image.y == imageA.y) {
                            var dis = Math.floor(image.x - imageA.x);
                            if (dis == Math.floor(this.imaWidth * point.x)) {
                                this.checkImages.push(image);
                                break;
                            }
                        }
                    }
                    else {
                        if (image.x == imageA.x) {
                            var dis = Math.floor(image.y - imageA.y);
                            if (dis == Math.floor(this.imaWidth * point.y)) {
                                this.checkImages.push(image);
                                break;
                            }
                        }
                    }
                }
            }
        }
        this.checkResult();
    };
    Puzzle.prototype.hitImage = function (point) {
        var len = this.images.length;
        for (var i = 0; i < len; i++) {
            var image = this.images[i];
            if (image.hitTestPoint(point.x, point.y)) {
                this.checkImages.push(image);
                break;
            }
        }
        this.checkResult();
    };
    Puzzle.prototype.checkResult = function () {
        if (this.checkImages.length == 2) {
            var imageA = this.checkImages[0];
            var imageB = this.checkImages[1];
            if (imageA != imageB) {
                this.coltrolMove.close();
                /** */
                var ax = imageA.x;
                var ay = imageA.y;
                var bx = imageB.x;
                var by = imageB.y;
                var dx = ax - bx;
                var dy = ay - by;
                var dis = Math.floor(Math.sqrt(dx * dx + dy * dy));
                if (dis <= this.imaWidth) {
                    var tweenA = egret.Tween.get(imageA);
                    var tweenB = egret.Tween.get(imageB);
                    tweenA.to({ x: bx, y: by }, 150).call(this.callback, this);
                    tweenB.to({ x: ax, y: ay }, 150);
                    //把它两在数组中位置换一下
                    var indexA = this.images.indexOf(imageA);
                    var indexB = this.images.indexOf(imageB);
                    this.images.splice(indexA, 1, imageB);
                    this.images.splice(indexB, 1, imageA);
                }
            }
            this.checkImages.length = 0;
        }
    };
    Puzzle.prototype.callback = function () {
        this.setStep();
        var len = this.images.length;
        var checkOrder = "";
        for (var i = 0; i < len; i++) {
            var image = this.images[i];
            checkOrder += image.name;
        }
        //trace(checkOrder);
        if (this.rightOrder == checkOrder) {
            simpleTrace("一共用了" + this.step + "步完成");
        }
        else {
            this.coltrolMove.open();
        }
    };
    return Puzzle;
}(egret.DisplayObjectContainer));
__reflect(Puzzle.prototype, "Puzzle");
//# sourceMappingURL=Puzzle.js.map