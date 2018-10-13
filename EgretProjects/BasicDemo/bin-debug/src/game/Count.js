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
var CountMain = (function (_super) {
    __extends(CountMain, _super);
    function CountMain() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**加载到舞台之后调用 */
        _this.index = 1;
        _this.items = [];
        _this.time = 100;
        return _this;
    }
    CountMain.prototype.render = function () {
        _super.prototype.render.call(this);
        this.createBackground();
        var w = this.stageWidth / 8;
        var h = this.stageHeight / 17;
        var items = [];
        for (var i = 0; i < 100; i++) {
            var rect = moon.MoonUI.getRect(w, h, 0XFFCCBB);
            rect.name = String(i + 1);
            rect.alpha = 0;
            var txt = this.createText(0, 0, rect.name);
            txt.textColor = 0;
            rect.addChild(txt);
            this.addChild(rect);
            items.push(rect);
            rect.touchEnabled = true;
            rect.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClick, this);
        }
        items = ArrayManager.getRandomArray(items);
        moon.SimpleLayout.displayRank(items, 7, 8, 8, 16, 8);
        this.items = items;
        this.showNum();
        var timer = new egret.Timer(1000, 0);
        timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        timer.start();
        this.progressBar = new moon.ProgressBar(moon.MoonUI.getRect(this.stageWidth, 10, 0XFFCC00), moon.MoonUI.getRect(this.stageWidth, 10, 0XFFFFFF));
        this.addChild(this.progressBar);
        this.progressBar.value = 1;
    };
    CountMain.prototype.onTimer = function (e) {
        this.progressBar.value = this.time-- / 100;
    };
    CountMain.prototype.showNum = function () {
        var items = this.items;
        for (var i = 0; i < items.length; i++) {
            var rect = items[i];
            if (parseInt(rect.name) < this.index * 1.1) {
                Tween.get(rect).to({ alpha: 1 }, Math.random() * 500 + 500);
            }
        }
    };
    CountMain.prototype.onClick = function (e) {
        var rect = e.currentTarget;
        if (String(this.index) == rect.name && rect.alpha > 0.5) {
            this.index++;
            Tween.get(rect).to({ alpha: 0, scaleX: 0, scaleY: 0 }, 500).call(function back() { rect.parent.removeChild(rect); });
            this.showNum();
        }
    };
    return CountMain;
}(moon.BasicView));
__reflect(CountMain.prototype, "CountMain");
//# sourceMappingURL=Count.js.map