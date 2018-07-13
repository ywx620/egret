/**测试卡牌翻转*/
class TestCardTurn extends moon.BasicView{
    /**加载到舞台之后调用 */
    protected render():void
    {
        var card:CardTurn=new CardTurn(moon.MoonUI.getRect(100,200,0xff0000,-50,-100),moon.MoonUI.getRect(100,200,0XFFFF00,-50,-100));
        card.x=card.y=200;
        this.addChild(card);
        card.turn();
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,back,this);
        function back(e:any):void{
           card.turn(600);
        }
        card.onTurnComplete=function complete(){trace("翻页完成")}
    }
}
/**测试可示对象碰撞*/
class TestDisplayHit extends moon.BasicView{
    private rect1:Sprite;
    private rect2:Sprite;
    /**加载到舞台之后调用 */
    protected render():void
    {
        this.rect1=this.createRect(100,100);
        this.rect1.x=this.rect1.y=10;
        this.showPoint(this.rect1);

        this.rect2=this.createRect(100,200,0XFFFF00);
        this.rect2.x=this.rect2.y=200;
        this.showPoint(this.rect2);

        var con:control.ControlDrag=new control.ControlDrag(this.stage,this.rect1);
        con.open();
        con.moveBackFun=this.moveBackFun.bind(this);
    }
    private moveBackFun():void
    {
        var isHit1:boolean=this.rect2.hitTestPoint(this.rect1.x,this.rect1.y,true);
        var r1:Rectangle=this.rect1.getBounds();
        var r2:Rectangle=this.rect2.getBounds();
        r1.x=this.rect1.x;
        r1.y=this.rect1.y;
        r2.x=this.rect2.x;
        r2.y=this.rect2.y;
        var isHit2:boolean=r1.intersects(r2);
        //simpleTrace("hitTestPoint="+isHit1);

        traceSimple("intersects="+isHit2);
        
    }
    /**显示锚点位置 */
    private showPoint(rect:Sprite):void
    {
        var point:Sprite=this.createCircle(4,0xff0000);
        rect.addChild(point);
    }
}
/**可示对象各种操作 */
class TestDisplayDo extends moon.BasicView{
    protected render():void
    {
        this.createRect(this.stage.stageWidth,this.stage.stageHeight,0X363636)
        //测试类型
        var a:DisplayObject=new DisplayObject;
        trace("b的类型是否为DisplayObject="+Uinfy.as(a,DisplayObject));

        var b:string="";
        var c:number=11;
        trace("b是不是string="+Uinfy.as2(b,'string'),"c是不是number="+Uinfy.as2(c,'number'));

        var rects:any[]=[];
        for(var i:number=0;i<10;i++){
            var rect:DisplayObject=this.createRect(50,50,Math.random()*0XFFFFFF);
            rect.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onBegin,this);
            rect.name="n"+i;
            rect.touchEnabled=true;
            rects.push(rect);
            this.addChild(rect);
        }
        //排版
        LayoutManager.displayRank(rects,3,10,10,100,100);
        //隐藏
        Uinfy.hideShowNum(rects,false,2,5);
        // LayoutManager.displayLadder(rects,250,300,0,10,200);
        
        var tip:moon.BasicTips=new moon.BasicTips("tips_png");
        tip.x=tip.y=300;
        tip.setValue("测试带背景的文本\n换行接着测试");
        this.addChild(tip);

        //设置图片为灰色
        var image:ImageIcon=new ImageIcon("bg_jpg");
        image.scaleX=image.scaleY=0.2;image.y=350;
        this.addChild(image);image.smoothing=true;
        Uinfy.imageSetGray(image,true);

        var btn:Button=new Button;
        btn.label="白鹭自带的按钮皮肤"
        this.addChild(btn);btn.x=400;btn.y=550;

        var normal:Sprite=moon.MoonUI.getRect(100,100,Math.random()*0XFFFFFF);
        var down:Sprite=moon.MoonUI.getRect(100,100,Math.random()*0XFFFFFF);
        //var down:ImageIcon=new ImageIcon("controlBar_png");
        var btn1:moon.BasicButton=new moon.BasicButton(normal,down);
        btn1.label="moon自定义皮肤按钮";
        btn1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onBegin,this);
        this.addChild(btn1);btn1.x=300;btn1.y=400;
        //btn1.removeFromParent(true);

        var skins:any[]=[];
        for(var i=0;i<10;i++){
            skins.push(moon.MoonUI.getRect(100,50,Math.random()*0XFFFFFF));
        }
        var btn2:moon.MoreSkinButton=new moon.MoreSkinButton(skins);
        //btn2.label="多个皮肤的按钮";
        var textFlow:egret.ITextElement[]=[];
        textFlow.push({text:"多个皮肤",style:{"size":80,"textColor":0}});
        btn2.setTextFlow(textFlow);
        this.addChild(btn2);
        this.addChild(btn2);btn2.x=300;btn2.y=650;
        btn2.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onBegin2,this);

        //圆形按钮
        var normal:Sprite=moon.MoonUI.getCircle(50,Math.random()*0XFFFFFF);
        var down:Sprite=moon.MoonUI.getCircle(50,Math.random()*0XFFFFFF);
        var btn3:moon.BasicButton=new moon.BasicButton(normal,down);
        this.addChild(btn3);btn3.x=400;btn3.y=850;
        btn3.labelCircle="圆按钮";
        

        //模拟ToggleSwitch
        var swidth:number=80;
        var normal:Sprite=moon.MoonUI.getRoundRect(swidth,50,moon.Color.skinNormal,60,60);
        normal.addChild(moon.MoonUI.getCircle(22,moon.Color.white,25,25));
        var down:Sprite=moon.MoonUI.getRoundRect(swidth,50,moon.Color.skinDown,60,60);
        down.addChild(moon.MoonUI.getCircle(22,moon.Color.white,25,25));
        var normal2:Sprite=moon.MoonUI.getRoundRect(swidth,50,moon.Color.skinNormal,60,60);
        normal2.addChild(moon.MoonUI.getCircle(22,moon.Color.white,swidth-25,25));
        var down2:Sprite=moon.MoonUI.getRoundRect(swidth,50,moon.Color.skinDown,60,60);
        down2.addChild(moon.MoonUI.getCircle(22,moon.Color.white,swidth-25,25));
        var btn4:moon.MoreSkinButton=new moon.MoreSkinButton([normal,down,normal2,down2]);
        this.addChild(btn4);btn4.x=400;btn4.y=950;
        btn4.toggleSwitch=true;

        //模拟progressBar;
        swidth=200
        var skinOut:Sprite=moon.MoonUI.getRect(swidth,20,moon.Color.random);
        var skinIn:Sprite=moon.MoonUI.getRect(swidth,20,moon.Color.random);
        var progressBar:moon.ProgressBar=new moon.ProgressBar(skinOut,skinIn);
        this.addChild(progressBar);progressBar.x=200;progressBar.y=920;
        var isLoop:boolean=true;
        if(isLoop){
            egret.Ticker.getInstance().register(function loop(){
                progressBar.value+=0.002;
                progressBar.value=progressBar.value>=1?0:progressBar.value;
                var v:string=Math.round(progressBar.value*100)+"%";
                progressBar.showText(v);
            }, this);
        }else{
            progressBar.value=progressBar.value=0.5
            var v:string=Math.round(progressBar.value*100)+"%";
            progressBar.showText(v,-1,-40);
        }

        
    }
    protected onBegin(e:egret.TouchEvent):void
    {
        var rect:DisplayObject=e.currentTarget;
        moon.TipsManager.getIns().simpleTips("这是个提示"+rect.name,new Point(e.stageX,e.stageY));
    }
    protected onBegin2(e:egret.TouchEvent):void
    {
        var btn2:moon.MoreSkinButton=e.currentTarget as moon.MoreSkinButton;
        btn2.label="多个皮肤的按钮"+btn2.currentPage;
        btn2.currentPage++;
    }
}