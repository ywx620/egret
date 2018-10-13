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
/**
var matrix:Array = new Array();
                        R  ,G,  B,  A, offset //RGB透明值与偏移值
matrix = matrix.concat([1,  0,  0,  0,  0]); // red   红色通道
matrix = matrix.concat([0,  1,  0,  0,  0]); // green 绿色通道
matrix = matrix.concat([0,  0,  1,  0,  0]); // blue  蓝色通道
matrix = matrix.concat([0,  0,  0,  1,  0]); // alpha 透明通道
上面是matrix的初始状态。
例子：red通道的值：（1，0，0，0，0）表示，R通道的乘数是1（完全保留），别的道道的的乘数是0，
（不加入别的通道的颜色），色彩偏移量off是0；
*/
var ColorTest = (function (_super) {
    __extends(ColorTest, _super);
    function ColorTest() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ColorTest.prototype.render = function () {
        this.skin = new eui.Image("bg_jpg");
        this.addChild(this.skin);
        this.lightBar = new moon.SliderBar();
        this.lightBar.x = this.lightBar.y = 50;
        this.addChild(this.lightBar);
        this.lightBar.value = 0.5;
        this.lightBar.addEvent(moon.MoonEvent.MOVE, this.move, this);
        this.lightBar.showText("亮度调整", 50);
        this.cBar = new moon.SliderBar();
        this.cBar.x = this.cBar.y = 120;
        this.addChild(this.cBar);
        this.cBar.value = 0.5;
        this.cBar.addEvent(moon.MoonEvent.MOVE, this.move, this);
        this.cBar.showText("对比调整", 120);
        var btns = [];
        var names = ["取消", "变灰", "反色"];
        for (var i = 0; i < names.length; i++) {
            var btn = new moon.BasicButton;
            btn.label = names[i];
            this.addChild(btn);
            btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            btns.push(btn);
        }
        LayoutManager.displayRank(btns, 5, 10, 10, 20, 200);
        this.skin.filters = [new egret.ColorMatrixFilter([
                1, 0, 0, 0, 0,
                1, 0, 0, 0, 0,
                1, 0, 0, 0, 0,
                0, 0, 0, 1, 0
            ])];
    };
    ColorTest.prototype.onClick = function (e) {
        switch (e.currentTarget["label"]) {
            case "变灰":
                this.setColorGray(this.skin);
                break;
            case "取消":
                this.skin.filters = [];
                break;
            case "反色":
                this.setColorReverse(this.skin);
                break;
        }
    };
    ColorTest.prototype.move = function (e) {
        var bar = e.currentTarget;
        if (bar == this.lightBar) {
            var value = (bar.value - 0.5) * 2;
            value *= 255;
            this.setColorLight(this.skin, value);
        }
        else {
            value = (bar.value) * 10;
            traceSimple(value);
            this.setColorContrast(this.skin, value);
        }
    };
    /**设置可示对象是否为灰色 */
    ColorTest.prototype.setColorGray = function (image) {
        image.filters = [new egret.ColorMatrixFilter([
                0.3, 0.6, 0.08, 0, 0,
                0.3, 0.6, 0.08, 0, 0,
                0.3, 0.6, 0.08, 0, 0,
                0, 0, 0, 1, 0
            ])];
    };
    /**设置可示对象的明亮度值在-255到255,默认为0*/
    ColorTest.prototype.setColorLight = function (image, offset) {
        if (offset === void 0) { offset = 0; }
        image.filters = [new egret.ColorMatrixFilter([
                1, 0, 0, 0, offset,
                0, 1, 0, 0, offset,
                0, 0, 1, 0, offset,
                0, 0, 0, 1, 0
            ])];
    };
    /**反色*/
    ColorTest.prototype.setColorReverse = function (image) {
        image.filters = [new egret.ColorMatrixFilter([
                -1, 0, 0, 0, 255,
                0, -1, 0, 0, 255,
                0, 0, -1, 0, 255,
                0, 0, 0, 1, 0
            ])];
    };
    /**对比度 N取值为0到10*/
    ColorTest.prototype.setColorContrast = function (image, N) {
        if (N === void 0) { N = 1; }
        image.filters = [new egret.ColorMatrixFilter([
                N, 0, 0, 0, 128 * (1 - N),
                0, N, 0, 0, 128 * (1 - N),
                0, 0, N, 0, 128 * (1 - N),
                0, 0, 0, 1, 0,
            ])];
    };
    return ColorTest;
}(moon.MoonContainer));
__reflect(ColorTest.prototype, "ColorTest");
//# sourceMappingURL=ColorTest.js.map