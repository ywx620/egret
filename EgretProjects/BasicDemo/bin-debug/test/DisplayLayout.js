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
var DisplayLayout = (function (_super) {
    __extends(DisplayLayout, _super);
    function DisplayLayout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DisplayLayout.prototype.init = function () {
        this.panelMore = new moon.PanelMoreManager();
        var names = [];
        names.push("组件一，正常的排列(比如游戏背包)");
        names.push("组件二，分部的排列(比如角色装备栏)");
        names.push("组件三，环绕圆形的排列");
        names.push("组件四，扇形的排列");
        names.push("组件五，椭圆形的排列");
        names.push("组件六，多边形的排列");
        names.push("组件七，三角形的排列");
        names.push("组件八，砖块（墙）的排列");
        names.push("组件九，梯形的排列");
        for (var i = 0; i < names.length; i++) {
            var panel = new moon.PanelBar();
            panel.label = names[i];
            panel.addEvent(moon.MoonEvent.RENDER_COMPLETE, this.onAddStage.bind(this));
            //panel.addItem(moon.MoonUI.getCircle(200,moon.Color.random,Math.random()*200,Math.random()*200))
            this.panelMore.addItem(panel);
        }
        this.panelMore.addEvent(moon.MoonEvent.START, this.start, this);
        this.panelMore.addEvent(moon.MoonEvent.OVER, this.over, this);
        this.addChild(this.panelMore);
        this.show1(0);
        this.show2(1);
        this.show3(2);
        this.show4(3);
        this.show5(4);
        this.show6(5);
        this.show7(6);
        this.show8(7);
        this.show9(8);
        //this.panelMore.once(egret.Event.ADDED_TO_STAGE,this.addToStageMore,this);
        //this.createCloseBtn();
    };
    DisplayLayout.prototype.createCloseBtn = function () {
        var btn = new moon.BasicButton();
        btn.label = "关闭";
        this.addChild(btn);
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
    };
    DisplayLayout.prototype.close = function (e) {
        this.dispEvent(moon.MoonEvent.CLOSE);
        this.removeFromParent(true);
    };
    DisplayLayout.prototype.addToStageMore = function (e) {
        this.panelMore.close();
    };
    DisplayLayout.prototype.start = function (e) {
        //traceSimple("翻页开始");
    };
    DisplayLayout.prototype.over = function (e) {
        //traceSimple("翻页结束");
    };
    DisplayLayout.prototype.onAddStage = function (e) {
        var panel = e.currentTarget;
        panel.colorBottom = 0XFCDF7C;
    };
    //------屏幕1-----
    DisplayLayout.prototype.show1 = function (index) {
        var panel = this.panelMore.getItem(index);
        var rects = [];
        for (var i = 0; i < 50; i++) {
            var rect = moon.MoonUI.getRect(50, 50, 0X7C010B);
            rects.push(rect);
            panel.addItem(rect);
        }
        LayoutManager.displayRank(rects, 5, 2, 2, 10, 10);
    };
    //------屏幕2-----
    DisplayLayout.prototype.show2 = function (index) {
        var panel = this.panelMore.getItem(index);
        var rects = [];
        for (var i = 0; i < 9; i++) {
            var rect = moon.MoonUI.getRect(50, 50, 0X7C010B);
            rects.push(rect);
            panel.addItem(rect);
        }
        LayoutManager.displayRankPart(rects, [3, 1, 0, 20, 50, 50], [6, 2, 20, 20, 300, 50]);
    };
    //------屏幕3-----
    DisplayLayout.prototype.show3 = function (index) {
        var panel = this.panelMore.getItem(index);
        var rects = [];
        for (var i = 0; i < 40; i++) {
            var rect = moon.MoonUI.getRect(50, 50, 0X7C010B);
            rects.push(rect);
            panel.addItem(rect);
        }
        LayoutManager.displayCircle(rects, 250, 250, 250);
    };
    //------屏幕4-----
    DisplayLayout.prototype.show4 = function (index) {
        var panel = this.panelMore.getItem(index);
        var rects = [];
        for (var i = 0; i < 10; i++) {
            var rect = moon.MoonUI.getRect(50, 50, 0X7C010B);
            rects.push(rect);
            panel.addItem(rect);
        }
        LayoutManager.displayCircle(rects, 250, 250, 250, Math.PI / 2);
    };
    //------屏幕5-----
    DisplayLayout.prototype.show5 = function (index) {
        var panel = this.panelMore.getItem(index);
        var rects = [];
        for (var i = 0; i < 40; i++) {
            var rect = moon.MoonUI.getRect(50, 50, 0X7C010B);
            rects.push(rect);
            panel.addItem(rect);
        }
        LayoutManager.displayCircle(rects, 250, 450, 250, 2 * Math.PI, 0, 0, 0, 0, 100);
    };
    //------屏幕6-----
    DisplayLayout.prototype.show6 = function (index) {
        var panel = this.panelMore.getItem(index);
        var rects = [];
        for (var i = 0; i < 24; i++) {
            var rect = moon.MoonUI.getRect(50, 50, 0X7C010B);
            rects.push(rect);
            panel.addItem(rect);
        }
        LayoutManager.displayPolygon(rects, 250, 250, 250, 6);
    };
    //------屏幕7-----
    DisplayLayout.prototype.show7 = function (index) {
        var panel = this.panelMore.getItem(index);
        var rects = [];
        for (var i = 0; i < 15; i++) {
            var rect = moon.MoonUI.getRect(50, 50, 0X7C010B);
            rects.push(rect);
            panel.addItem(rect);
        }
        LayoutManager.displayTrigon(rects, 10, 10, 200, 100);
    };
    //------屏幕8-----
    DisplayLayout.prototype.show8 = function (index) {
        var panel = this.panelMore.getItem(index);
        var rects = [];
        for (var i = 0; i < 400; i++) {
            var rect = moon.MoonUI.getRect(60, 40, 0X7C010B);
            rects.push(rect);
            panel.addItem(rect);
        }
        LayoutManager.displayWall(rects, 15, 2, 2, -30, 0, 30);
    };
    //------屏幕8-----
    DisplayLayout.prototype.show9 = function (index) {
        var panel = this.panelMore.getItem(index);
        var rects = [];
        for (var i = 0; i < 100; i++) {
            var rect = moon.MoonUI.getRect(60, 20, 0X7C010B);
            rects.push(rect);
            panel.addItem(rect);
        }
        LayoutManager.displayLadder(rects, 100, 400, 5, 5);
    };
    return DisplayLayout;
}(moon.MoonContainer));
__reflect(DisplayLayout.prototype, "DisplayLayout");
//# sourceMappingURL=DisplayLayout.js.map