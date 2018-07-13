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
        moon.LogManager.getIns().init(this.stage);
        moon.TipsManager.getIns().init(this.stage);
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
        this.stageW = this.stage.stageWidth;
        this.stageH = this.stage.stageHeight;
        //this.p2Test();
        //this.readJson();
        //this.astar();
        //this.moon();
        //this.gameParkour();
        //this.control();
        //this.text();
        //this.morePointTouch();
        //this.scaleMode();
        //this.mainMvc();
        //this.puzzle();
        //this.worldHandestGame();
        //this.testSkinClass();
        //this.turnCard();
        //this.testHit();
        //this.testDisplayDo();
        //this.moonTest();
        //this.maomaoJump();
        //this.timeTest();
        //this.dragCircleTest();
        // this.colorTest();
        //this.countMain();
        //this.testCallPhp();
        //this.testTsCallJs();
        this.testLayout();
    };
    MainTest.prototype.testLayout = function () {
        this.addChild(new DisplayLayout);
    };
    MainTest.prototype.testTsCallJs = function () {
        exampleB.b();
    };
    MainTest.prototype.testCallPhp = function () {
        new TestPhp;
    };
    MainTest.prototype.countMain = function () {
        this.addChild(new CountMain());
    };
    MainTest.prototype.colorTest = function () {
        this.addChild(new ColorTest);
    };
    MainTest.prototype.dragCircleTest = function () {
        this.addChild(new DragCircle);
    };
    /**测试计时器与倒计时 */
    MainTest.prototype.timeTest = function () {
        var t;
        t = time.TimeFactory.getIns().createTime("11", time.TimeFactory.COUNT_DOWN);
        //t=time.TimeFactory.getIns().createTime("22",time.TimeFactory.COUNT_UP);
        t.setTimeStart(350);
        t.showNum = 3;
        t.setBackFunction(backfun);
        function backfun(data) {
            traceSimple("时间格式：" + data["show"], "时间总秒数：" + data["value"]);
        }
    };
    /** 测试毛毛跳一跳*/
    MainTest.prototype.maomaoJump = function () {
        this.addChild(new MaoMaoJump);
    };
    /** 测试月亮组件*/
    MainTest.prototype.moonTest = function () {
        this.addChild(new MoonTest);
    };
    /** 测试可显对象各种*/
    MainTest.prototype.testDisplayDo = function () {
        this.addChild(new TestDisplayDo);
    };
    /** 测试碰撞*/
    MainTest.prototype.testHit = function () {
        this.addChild(new TestDisplayHit);
    };
    /** 测试翻页*/
    MainTest.prototype.turnCard = function () {
        this.addChild(new TestCardTurn);
    };
    /** 测试exml*/
    MainTest.prototype.testSkinClass = function () {
        this.addChild(new TestSkinClass);
    };
    /** 测试最难的游戏*/
    MainTest.prototype.worldHandestGame = function () {
        this.addChild(new WorldHardestGame);
    };
    /** 测试拼图*/
    MainTest.prototype.puzzle = function () {
        this.addChild(new Puzzle);
    };
    /** 测试MVC*/
    MainTest.prototype.mainMvc = function () {
        /**发布时注意－使用puremvc-typescript-multicore-1.1.min.js有错
         * 需要手动修改为puremvc-typescript-multicore-1.1.js
        */
        this.addChild(new MainMvc);
    };
    /** 测试缩放*/
    MainTest.prototype.scaleMode = function () {
        this.addChild(new TestView());
    };
    /** 测试多点触摸*/
    MainTest.prototype.morePointTouch = function () {
        //this.addChild(new MorePointTouch)
        this.addChild(new MorePointTouch2);
    };
    /** 测试文本*/
    MainTest.prototype.text = function () {
        this.addChild(new TextTest);
    };
    /** 测试控制器*/
    MainTest.prototype.control = function () {
        this.addChild(new ControlTest);
    };
    /** 测试跑酷*/
    MainTest.prototype.gameParkour = function () {
        this.addChild(new GameParkour);
    };
    /** 测试P2物理引擎*/
    MainTest.prototype.p2Test = function () {
        this.addChild(new P2Camera);
        //this.addChild(new TestFromPolygon);
        //this.addChild(new P2Drag);
    };
    /** 测试JSON*/
    MainTest.prototype.readJson = function () {
        new ReadJson();
    };
    /** 测试A星寻路*/
    MainTest.prototype.astar = function () {
        this.addChild(new AStarTest);
    };
    /** 测试月亮背景组件*/
    MainTest.prototype.moon = function () {
        // var rect:egret.Rectangle=new egret.Rectangle(0,0,this.stageW,this.stageH);
        // var home:egret.Rectangle=new egret.Rectangle(10,200,20,200);
        // var map:moon.MapHorizontalHouse=new moon.MapHorizontalHouse(rect,home,0);
        // this.addChild(map);
        // var rect:egret.Rectangle=new egret.Rectangle(0,0,this.stageW,this.stageH);
        // var home:egret.Rectangle=new egret.Rectangle(10,100,40,100);
        // var map:moon.MapHorizontalHouse=new moon.MapHorizontalHouse(rect,home);
        // this.addChild(map);
    };
    return MainTest;
}(egret.DisplayObjectContainer));
__reflect(MainTest.prototype, "MainTest");
//# sourceMappingURL=MainTest.js.map