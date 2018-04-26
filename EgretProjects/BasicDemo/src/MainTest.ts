class MainTest extends egret.DisplayObjectContainer {
    stageW:number;
    stageH:number;
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.init,this);
    }
    private init():void
    {
        moon.LogManager.getIns().init(this.stage);
        moon.TipsManager.getIns().init(this.stage);
        this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.init,this);
        this.stageW=this.stage.stageWidth;
        this.stageH=this.stage.stageHeight;
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
       this.testCallPhp();
    }
    private testCallPhp():void
    {
        new TestPhp
    }
    private countMain():void
    {
        this.addChild(new CountMain());
    }
    private colorTest():void
    {
         this.addChild(new ColorTest);
    }
    private dragCircleTest():void
    {
        this.addChild(new DragCircle);
    }
    /**测试计时器与倒计时 */
    private timeTest():void
    {
        var t:time.ITime;
        t=time.TimeFactory.getIns().createTime("11",time.TimeFactory.COUNT_DOWN);
        //t=time.TimeFactory.getIns().createTime("22",time.TimeFactory.COUNT_UP);
        t.setTimeStart(350);
        t.showNum=3;
        t.setBackFunction(backfun);
        function backfun(data:Object):void{
            traceSimple("时间格式："+data["show"],"时间总秒数："+data["value"]);
        }        
    }
    /** 测试毛毛跳一跳*/
    private maomaoJump():void
    {
        this.addChild(new MaoMaoJump);
    }
    /** 测试月亮组件*/
    private moonTest():void
    {
        this.addChild(new MoonTest)
    }
    /** 测试可显对象各种*/
    private testDisplayDo():void
    {
        this.addChild(new TestDisplayDo);
    }
    /** 测试碰撞*/
    private testHit():void
    {
        this.addChild(new TestDisplayHit)
    }
    /** 测试翻页*/
    private turnCard():void
    {
        this.addChild(new TestCardTurn);
    }
    /** 测试exml*/
    private testSkinClass():void
    {
        this.addChild(new TestSkinClass);
    }
    /** 测试最难的游戏*/
    private worldHandestGame():void
    {
        this.addChild(new WorldHardestGame);
    }
    /** 测试拼图*/
    private puzzle():void
    {
        this.addChild(new Puzzle)
    }
    /** 测试MVC*/
    private mainMvc():void
    {
        /**发布时注意－使用puremvc-typescript-multicore-1.1.min.js有错
         * 需要手动修改为puremvc-typescript-multicore-1.1.js
        */
        this.addChild(new MainMvc);
    }
    /** 测试缩放*/
    private scaleMode():void
    {
        this.addChild(new TestView())
    }
    /** 测试多点触摸*/
    private morePointTouch():void
    {
        //this.addChild(new MorePointTouch)
        this.addChild(new MorePointTouch2)
    }
    /** 测试文本*/
    private text():void
    {
        this.addChild(new TextTest)
    }
    /** 测试控制器*/
    private control():void
    {
        this.addChild(new ControlTest)
    }
    /** 测试跑酷*/
    private gameParkour():void
    {
        this.addChild(new GameParkour)
    }
    /** 测试P2物理引擎*/
    private p2Test():void
    {
        this.addChild(new P2Camera);
        //this.addChild(new TestFromPolygon);
        //this.addChild(new P2Drag);
    }
    /** 测试JSON*/
    private readJson():void
    {
        new ReadJson();
    }
    /** 测试A星寻路*/
    private astar():void
    {
       this.addChild(new AStarTest);
    }
    /** 测试月亮背景组件*/
    private moon():void
    {
        // var rect:egret.Rectangle=new egret.Rectangle(0,0,this.stageW,this.stageH);
        // var home:egret.Rectangle=new egret.Rectangle(10,200,20,200);
        // var map:moon.MapHorizontalHouse=new moon.MapHorizontalHouse(rect,home,0);
        // this.addChild(map);

        // var rect:egret.Rectangle=new egret.Rectangle(0,0,this.stageW,this.stageH);
        // var home:egret.Rectangle=new egret.Rectangle(10,100,40,100);
        // var map:moon.MapHorizontalHouse=new moon.MapHorizontalHouse(rect,home);
        // this.addChild(map);

    }
}