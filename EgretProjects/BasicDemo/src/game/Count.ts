class CountMain extends moon.BasicView{
     /**加载到舞台之后调用 */
    private index:number=1;
    private items:any[]=[];
    private time:number=100;
    private progressBar:moon.ProgressBar;
    protected render():void
    {
       super.render();
       this.createBackground();
       var w:number=this.stageWidth/8;
       var h:number=this.stageHeight/17;
       var items:any[]=[];
       for(var i:number=0;i<100;i++){
           var rect:Sprite=moon.MoonUI.getRect(w,h,0XFFCCBB);
           rect.name=String(i+1);
           rect.alpha=0;
           var txt:TextField=this.createText(0,0,rect.name);
           txt.textColor=0;
           rect.addChild(txt);
           this.addChild(rect);
           items.push(rect);
           rect.touchEnabled=true;
           rect.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onClick,this);
       }
       items=ArrayManager.getRandomArray(items);
       moon.SimpleLayout.displayRank(items,7,8,8,16,8);
       this.items=items;
       this.showNum();

       var timer=new egret.Timer(1000,0);
       timer.addEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
       timer.start();

       this.progressBar=new moon.ProgressBar(moon.MoonUI.getRect(this.stageWidth,10,0XFFCC00),moon.MoonUI.getRect(this.stageWidth,10,0XFFFFFF));
       this.addChild(this.progressBar);
       this.progressBar.value=1;
    }
    private onTimer(e:egret.TimerEvent):void
    {
        this.progressBar.value=this.time--/100;

    }
    private showNum():void
    {
        var items=this.items;
        for(var i:number=0;i<items.length;i++){
           var rect=items[i];
           if(parseInt(rect.name)<this.index*1.1){
               Tween.get(rect).to({alpha:1},Math.random()*500+500);
           }
       }
    }
    private onClick(e:egret.TouchEvent):void
    {
        var rect:Sprite=e.currentTarget as Sprite;
        if(String(this.index)==rect.name&&rect.alpha>0.5){
            this.index++;
            Tween.get(rect).to({alpha:0,scaleX:0,scaleY:0},500).call(function back(){rect.parent.removeChild(rect)});
            this.showNum();
        }
    }
}