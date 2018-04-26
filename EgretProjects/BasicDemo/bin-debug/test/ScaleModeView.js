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