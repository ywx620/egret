class DisplayLayout extends moon.MoonContainer
{
    protected panelMore:moon.PanelMoreManager;
    protected panelBar:moon.PanelBar;
    protected init():void
    {
        this.panelMore=new moon.PanelMoreManager();
        var names:string[]=[];
        names.push("组件一，正常的排列(比如游戏背包)");
        names.push("组件二，分部的排列(比如角色装备栏)");
        names.push("组件三，环绕圆形的排列");
        names.push("组件四，扇形的排列");
        names.push("组件五，椭圆形的排列");
        names.push("组件六，多边形的排列");
        names.push("组件七，三角形的排列");
        names.push("组件八，砖块（墙）的排列");
        names.push("组件九，梯形的排列");
        for(var i=0;i<names.length;i++){
            var panel:moon.PanelBar=new moon.PanelBar();
            panel.label=names[i];
            panel.addEvent(moon.MoonEvent.RENDER_COMPLETE,this.onAddStage.bind(this));
            //panel.addItem(moon.MoonUI.getCircle(200,moon.Color.random,Math.random()*200,Math.random()*200))
            this.panelMore.addItem(panel);
        }
        this.panelMore.addEvent(moon.MoonEvent.START,this.start,this);
        this.panelMore.addEvent(moon.MoonEvent.OVER,this.over,this);
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
    }
    protected createCloseBtn():void
    {
        var btn:moon.BasicButton=new moon.BasicButton();
        btn.label="关闭";
        this.addChild(btn);
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.close,this)
    }
    protected close(e:egret.TouchEvent):void
    {
        this.dispEvent(moon.MoonEvent.CLOSE)
        this.removeFromParent(true);
    }
    protected addToStageMore(e:egret.Event):void
    {
        this.panelMore.close();
    }
    protected start(e:moon.MoonEvent):void
    {
        //traceSimple("翻页开始");
    }
    protected over(e:moon.MoonEvent):void
    {
        //traceSimple("翻页结束");
    }
    protected onAddStage(e:moon.MoonEvent):void
    {
        var panel:moon.PanelBar=e.currentTarget as moon.PanelBar;
        panel.colorBottom=0XFCDF7C;
    }
    //------屏幕1-----
    protected show1(index:number):void
    {
        var panel:moon.PanelBar=this.panelMore.getItem(index) as moon.PanelBar;
        var rects:any[]=[];
        for(var i:number=0;i<50;i++){
            var rect:DisplayObject=moon.MoonUI.getRect(50,50,0X7C010B);
            rects.push(rect);
            panel.addItem(rect);
        }
        LayoutManager.displayRank(rects,5,2,2,10,10);
    }
    //------屏幕2-----
    protected show2(index:number):void
    {
        var panel:moon.PanelBar=this.panelMore.getItem(index) as moon.PanelBar;
        var rects:any[]=[];
        for(var i:number=0;i<9;i++){
            var rect:DisplayObject=moon.MoonUI.getRect(50,50,0X7C010B);
            rects.push(rect);
            panel.addItem(rect);
        }
        LayoutManager.displayRankPart(rects,[3,1,0,20,50,50],[6,2,20,20,300,50]);
    }
    //------屏幕3-----
    protected show3(index:number):void
    {
        var panel:moon.PanelBar=this.panelMore.getItem(index) as moon.PanelBar;
        var rects:any[]=[];
        for(var i:number=0;i<40;i++){
            var rect:DisplayObject=moon.MoonUI.getRect(50,50,0X7C010B);
            rects.push(rect);
            panel.addItem(rect);
        }
        LayoutManager.displayCircle(rects,250,250,250);
    }
    //------屏幕4-----
    protected show4(index:number):void
    {
        var panel:moon.PanelBar=this.panelMore.getItem(index) as moon.PanelBar;
        var rects:any[]=[];
        for(var i:number=0;i<10;i++){
            var rect:DisplayObject=moon.MoonUI.getRect(50,50,0X7C010B);
            rects.push(rect);
            panel.addItem(rect);
        }
        LayoutManager.displayCircle(rects,250,250,250,Math.PI/2);
    }
    //------屏幕5-----
    private show5(index:number):void
    {
         var panel:moon.PanelBar=this.panelMore.getItem(index) as moon.PanelBar;
        var rects:any[]=[];
        for(var i:number=0;i<40;i++){
            var rect:DisplayObject=moon.MoonUI.getRect(50,50,0X7C010B);
            rects.push(rect);
            panel.addItem(rect);
        }
        LayoutManager.displayCircle(rects,250,450,250,2*Math.PI,0,0,0,0,100);
    }
    //------屏幕6-----
    private show6(index:number):void
    {
        var panel:moon.PanelBar=this.panelMore.getItem(index) as moon.PanelBar;
        var rects:any[]=[];
        for(var i:number=0;i<24;i++){
            var rect:DisplayObject=moon.MoonUI.getRect(50,50,0X7C010B);
            rects.push(rect);
            panel.addItem(rect);
        }
        LayoutManager.displayPolygon(rects,250,250,250,6);
    }
    //------屏幕7-----
    private show7(index:number):void
    {
        var panel:moon.PanelBar=this.panelMore.getItem(index) as moon.PanelBar;
        var rects:any[]=[];
        for(var i:number=0;i<15;i++){
            var rect:DisplayObject=moon.MoonUI.getRect(50,50,0X7C010B);
            rects.push(rect);
            panel.addItem(rect);
        }
        LayoutManager.displayTrigon(rects,10,10,200,100);
    }
    //------屏幕8-----
    private show8(index:number):void
    {
        var panel:moon.PanelBar=this.panelMore.getItem(index) as moon.PanelBar;
        var rects:any[]=[];
        for(var i:number=0;i<400;i++){
            var rect:DisplayObject=moon.MoonUI.getRect(60,40,0X7C010B);
            rects.push(rect);
            panel.addItem(rect);
        }
        LayoutManager.displayWall(rects,15,2,2,-30,0,30);
    }
    //------屏幕8-----
    private show9(index:number):void
    {
        var panel:moon.PanelBar=this.panelMore.getItem(index) as moon.PanelBar;
        var rects:any[]=[];
        for(var i:number=0;i<100;i++){
            var rect:DisplayObject=moon.MoonUI.getRect(60,20,0X7C010B);
            rects.push(rect);
            panel.addItem(rect);
        }
        LayoutManager.displayLadder(rects,100,400,5,5);
    }
}