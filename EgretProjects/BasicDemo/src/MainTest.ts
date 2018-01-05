class MainTest extends egret.DisplayObjectContainer {
    stageW:number;
    stageH:number;
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.init,this);
    }
    private init():void
    {
        moon.showLog.getIns().init(this.stage);
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
        this.puzzle();
    }
    private puzzle():void
    {
        this.addChild(new Puzzle)
    }
    private mainMvc():void
    {
        /**发布时注意－使用puremvc-typescript-multicore-1.1.min.js有错
         * 需要手动修改为puremvc-typescript-multicore-1.1.js
        */
        this.addChild(new MainMvc);
    }
    private scaleMode():void
    {
        this.addChild(new TestView())
    }
    private morePointTouch():void
    {
        //this.addChild(new MorePointTouch)
        this.addChild(new MorePointTouch2)
    }
    private text():void
    {
        this.addChild(new TextTest)
    }
    private control():void
    {
        this.addChild(new ControlTest)
    }
    private gameParkour():void
    {
        this.addChild(new GameParkour)
    }
    private p2Test():void
    {
        //this.addChild(new P2Camera);
        //this.addChild(new TestFromPolygon);
        //this.addChild(new P2Drag);
        
    }
    private readJson():void
    {
        new ReadJson();
    }
    private astar():void
    {
       this.addChild(new AStarTest);
    }
    private moon():void
    {
        var rect:egret.Rectangle=new egret.Rectangle(0,0,this.stageW,this.stageH);
        var home:egret.Rectangle=new egret.Rectangle(10,200,20,200);
        var map:moon.MapHorizontalHouse=new moon.MapHorizontalHouse(rect,home,0);
        this.addChild(map);

        var rect:egret.Rectangle=new egret.Rectangle(0,0,this.stageW,this.stageH);
        var home:egret.Rectangle=new egret.Rectangle(10,100,40,100);
        var map:moon.MapHorizontalHouse=new moon.MapHorizontalHouse(rect,home);
        this.addChild(map);

    }
}