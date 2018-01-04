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
var ControlTest = (function (_super) {
    __extends(ControlTest, _super);
    function ControlTest() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ControlTest.prototype.render = function () {
        var controlBg = moon.MoonUI.getCircle(100, 0Xffff00);
        var controlBar = moon.MoonUI.getCircle(20, 0X00ff00);
        var controlAuton = new control.ControlBarMove(this.stage, controlBar, controlBg);
        //controlAuton.open();
        controlBg.x = controlBar.x = this.stage.stageWidth >> 1;
        controlBg.y = controlBar.y = this.stage.stageHeight >> 1;
        this.addChild(controlBg);
        this.addChild(controlBar);
        var image = new ImageIcon("tips_png");
        this.addChild(image);
        var controlDrag = new control.ControlDrag(this.stage, image);
        controlDrag.endBackFun = function () { image.x = 0; }; //返回函数处理
        controlDrag.open();
    };
    return ControlTest;
}(moon.MoonContainer));
__reflect(ControlTest.prototype, "ControlTest");
//# sourceMappingURL=ControlTest.js.map