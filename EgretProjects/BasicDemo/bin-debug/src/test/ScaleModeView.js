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
var TestView = (function (_super) {
    __extends(TestView, _super);
    function TestView() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/askins/ScaleModeSkin.exml";
        return _this;
    }
    TestView.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        trace("1.3");
        var btns = [
            egret.StageScaleMode.EXACT_FIT,
            egret.StageScaleMode.FIXED_HEIGHT,
            egret.StageScaleMode.FIXED_NARROW,
            egret.StageScaleMode.FIXED_WIDE,
            egret.StageScaleMode.FIXED_WIDTH,
            egret.StageScaleMode.NO_BORDER,
            egret.StageScaleMode.NO_SCALE,
            egret.StageScaleMode.SHOW_ALL
        ];
        for (var i = 0; i < btns.length; i++) {
            var btn = new Button;
            btn.label = btns[i];
            btn.x = 200;
            btn.y = 100 + 50 * i;
            btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.addChild(btn);
        }
    };
    TestView.prototype.onClick = function (e) {
        this.stage.scaleMode = e.currentTarget.label;
        this.height = this.stage.stageHeight;
        this.width = this.stage.stageWidth;
    };
    return TestView;
}(eui.Component));
__reflect(TestView.prototype, "TestView");
//# sourceMappingURL=ScaleModeView.js.map