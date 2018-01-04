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
var MainTest = (function (_super) {
    __extends(MainTest, _super);
    function MainTest() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.init, _this);
        return _this;
    }
    MainTest.prototype.init = function () {
        moon.showLog.getIns().init(this.stage);
        moon.TipsManager.getIns().init(this.stage);
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
        this.stageW = this.stage.stageWidth;
        this.stageH = this.stage.stageHeight;
        //this.p2Test();
        //this.readJson();
        //this.astar()
        //this.moon();
        //this.gameParkour();
        //this.control();
        //this.text();
        //this.morePointTouch();
        //this.scaleMode()
        this.mainMvc();
        //this.puzzle();
    };
    MainTest.prototype.puzzle = function () {
        this.addChild(new Puzzle);
    };
    MainTest.prototype.mainMvc = function () {
        /**发布时注意－使用puremvc-typescript-multicore-1.1.min.js有错
         * 需要手动修改为puremvc-typescript-multicore-1.1.js
        */
        this.addChild(new MainMvc);
    };
    MainTest.prototype.scaleMode = function () {
        this.addChild(new TestView());
    };
    MainTest.prototype.morePointTouch = function () {
        //this.addChild(new MorePointTouch)
        this.addChild(new MorePointTouch2);
    };
    MainTest.prototype.text = function () {
        this.addChild(new TextTest);
    };
    MainTest.prototype.control = function () {
        this.addChild(new ControlTest);
    };
    MainTest.prototype.gameParkour = function () {
        this.addChild(new GameParkour);
    };
    MainTest.prototype.p2Test = function () {
        //this.addChild(new P2Camera);
        //this.addChild(new TestFromPolygon);
        //this.addChild(new P2Drag);
    };
    MainTest.prototype.readJson = function () {
        new ReadJson();
    };
    MainTest.prototype.astar = function () {
        this.addChild(new AStarTest);
    };
    MainTest.prototype.moon = function () {
        var rect = new egret.Rectangle(0, 0, this.stageW, this.stageH);
        var home = new egret.Rectangle(10, 200, 20, 200);
        var map = new moon.MapHorizontalHouse(rect, home, 0);
        this.addChild(map);
        var rect = new egret.Rectangle(0, 0, this.stageW, this.stageH);
        var home = new egret.Rectangle(10, 100, 40, 100);
        var map = new moon.MapHorizontalHouse(rect, home);
        this.addChild(map);
    };
    return MainTest;
}(egret.DisplayObjectContainer));
__reflect(MainTest.prototype, "MainTest");
//# sourceMappingURL=MainTest.js.map