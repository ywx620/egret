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
var Follow = (function (_super) {
    __extends(Follow, _super);
    function Follow() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**加载到舞台之后调用 */
        _this.fishs = [];
        _this.foods = [];
        _this.total = 10;
        return _this;
    }
    Follow.prototype.render = function () {
        _super.prototype.render.call(this);
        this.createBackground(0);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
        for (var i = 0; i < this.total; i++) {
            var fish = new Fish;
            fish.x = Math.random() * this.stageWidth;
            fish.y = Math.random() * this.stageHeight;
            this.addChild(fish);
            this.fishs.push(fish);
        }
        egret.startTick(this.onLoop, this);
    };
    Follow.prototype.onTouch = function (e) {
        var targetPoint = new Point(e.stageX, e.stageY);
        for (var i = 0; i < this.total; i++) {
            var fish = this.fishs[i];
            fish.startMove(targetPoint, 1);
        }
        this.addFood(targetPoint);
        this.refreshFood();
    };
    Follow.prototype.addFood = function (targetPoint) {
        var food = moon.MoonUI.getCircle(5, Math.random() * 0XFFFFFF);
        food.x = targetPoint.x;
        food.y = targetPoint.y;
        this.addChild(food);
        this.foods.push(food);
    };
    Follow.prototype.refreshFood = function () {
        if (this.foods.length > 0) {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(this.refreshFood.bind(this), 3000);
            var food = this.foods[0];
            var targetPoint = new Point(food.x, food.y);
            for (var i = 0; i < this.total; i++) {
                var fish = this.fishs[i];
                fish.startMove(targetPoint, 1);
            }
        }
    };
    Follow.prototype.freeMove = function () {
        for (var i = 0; i < this.total; i++) {
            var fish = this.fishs[i];
            fish.freeMove();
        }
    };
    Follow.prototype.onLoop = function (num) {
        for (var i = 0; i < this.total; i++) {
            var fish = this.fishs[i];
            for (var j = 0; j < this.foods.length; j++) {
                var food = this.foods[j];
                if (fish.hitTestPoint(food.x, food.y)) {
                    this.removeChild(food);
                    this.foods.splice(j--, 1);
                    this.freeMove();
                }
            }
        }
        return true;
    };
    return Follow;
}(moon.BasicView));
__reflect(Follow.prototype, "Follow");
var Fish = (function (_super) {
    __extends(Fish, _super);
    function Fish() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Fish.prototype.render = function () {
        _super.prototype.render.call(this);
        this.addChild(this.fishBody);
        this.freeMove();
    };
    Fish.prototype.freeMove = function () {
        var targetPoint = new Point(Math.random() * this.stageWidth, Math.random() * this.stageHeight);
        var dx = targetPoint.x - this.x;
        var dy = targetPoint.y - this.y;
        this.startMove(targetPoint);
    };
    Fish.prototype.startMove = function (targetPoint, type) {
        if (type === void 0) { type = 0; }
        var dx = targetPoint.x - this.x;
        var dy = targetPoint.y - this.y;
        var angle = Math.atan2(dy, dx);
        var targetAngle = angle * 180 / Math.PI;
        var ds = Math.sqrt(dx * dx + dy * dy);
        var time = type == 0 ? 10 : Math.random() * 10 + 2;
        var timePoint = ds * time;
        var timeAngle = ds * time * 0.2;
        Tween.removeTweens(this);
        Tween.get(this).to({ rotation: targetAngle }, timeAngle).to({ x: targetPoint.x, y: targetPoint.y }, timePoint).call(this.freeMove);
    };
    Object.defineProperty(Fish.prototype, "fishBody", {
        get: function () {
            var fish = new Sprite;
            //var color:number=Math.random()*0xffffff;
            var color = 0xffffff;
            var body = moon.MoonUI.getPolygon(3, 30, color);
            var tail = moon.MoonUI.getPolygon(3, 10, color);
            tail.x = -10;
            body.x = 10;
            fish.addChild(tail);
            fish.addChild(body);
            return fish;
        },
        enumerable: true,
        configurable: true
    });
    return Fish;
}(moon.BasicView));
__reflect(Fish.prototype, "Fish");
//# sourceMappingURL=Follow.js.map