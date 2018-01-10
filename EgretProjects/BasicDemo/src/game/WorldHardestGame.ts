class WorldHardestGame extends egret.DisplayObjectContainer{
    controlMove:control.ControlBarMove;
    levelControl:LevelControl;
    constructor() {
       super()
       this.addEventListener(egret.Event.ADDED_TO_STAGE,this.addToStage,this);
    }
    private addToStage():void {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.addToStage,this);
        this.levelControl=new LevelControl
        this.addChild(this.levelControl);
        this.createControl();
    }
    private createControl():void
    {
        var w:number=(this.stage.stageHeight-640)>>2;
        var controlBg:Sprite=moon.MoonUI.getCircle(w,0Xffff00);
        controlBg.alpha=0;
        var controlBar:Sprite=moon.MoonUI.getCircle(w-30,0XFF0000);
        var controlAuton:control.ControlBarMove=new control.ControlBarMove(this.stage,controlBar,controlBg);
        //controlAuton.open();
        controlBg.x=controlBar.x=this.stage.stageWidth>>1;
        controlBg.y=controlBar.y=this.stage.stageHeight-(w<<1);
        this.addChild(controlBg);
        this.addChild(controlBar);
        controlAuton.open();
        controlAuton.moveBackFun=this.moveBackFun.bind(this);
        controlAuton.startBackFun=this.startBackFun.bind(this);
        controlAuton.endBackFun=this.endBackFun.bind(this);
    }
    private startBackFun(point:egret.Point):void
    {
        this.levelControl.setStartPoint()
    }
    private endBackFun(point:egret.Point):void{
        this.levelControl.setEndPoint()
    }
    private moveBackFun(point:egret.Point):void
    {
        this.levelControl.controlPlay(point);
    }
}
class LevelControl extends BasicComponent
{
    private test1:egret.tween.TweenGroup;
    private player:eui.Image;
    private wall:eui.Image;
    private safeAreas:any[]=[];
    private isMove:Boolean;
    private startPoint:egret.Point;
    private movePoint:egret.Point=new egret.Point;
    private speedX:number=1;
    private speedY:number=1;
    constructor() {
        super();
        this.setSkinName("../resource/askins/WHG_level1.exml");
    }
    protected render(): void {
        for(var i=0;i<this.numChildren;i++){
            var image:eui.Image=this.getChildAt(i) as eui.Image;
            if(image){
                var name:String=image.name.substr(0,4);
                if(name=="play") this.player=image;
                else if(name=="wall") this.wall=image;
                else if(name=="safe") this.safeAreas.push(image);
            }
        }
        this.startPoint=new egret.Point(this.player.x,this.player.y);
        this.test1.play();
        this.test1.addEventListener(egret.Event.COMPLETE, this.onTweenGroupComplete, this);
        this.addEventListener(egret.Event.ENTER_FRAME,this.onLoop,this);
    }
    protected onTweenGroupComplete(e):void
    {
        this.test1.play(0);
    }
    public setEndPoint():void
    {
        this.isMove=false;
    }
    public setStartPoint():void
    {
        this.isMove=true;
    }
    private gameOver():void
    {
        this.isMove=false;
        var that=this;
        var tw:egret.Tween=egret.Tween.get(this.player);
        tw.to({alpha:0},800).call(callBack);
        function callBack():void{
            that.player.x=that.startPoint.x;
            that.player.y=that.startPoint.y;
            that.player.alpha=1;
        }
       
    }
    private onLoop(e):void
    {
        simpleTrace(this.isMove);
        if(this.isMove){
            var speedX:number=this.speedX*this.movePoint.x;
            var speedY:number=this.speedY*this.movePoint.y;
            this.player.x+=speedX;
            this.player.y+=speedY;
            var playerX:number=this.player.x;
            var playerY:number=this.player.y;
            var halfWidth:number=this.player.width>>1;
            for(var i=0;i<this.numChildren;i++){
                var image:eui.Image=this.getChildAt(i) as eui.Image;
                if(image!=this.player){
                    var name:String=image.name.substr(0,4);
                    if(name=="wall"){
                        if (image.hitTestPoint(playerX+halfWidth+speedX , playerY, true)){
                            this.player.x-=speedX;
                        }
                        if (image.hitTestPoint(playerX-halfWidth+speedX, playerY, true)){
                            this.player.x-=speedX;
                        }
                        if (image.hitTestPoint(playerX , playerY+halfWidth+speedY, true)){
                            this.player.y-=speedY;
                        }
                        if (image.hitTestPoint(playerX, playerY-halfWidth+speedY, true)){
                            this.player.y-=speedY;
                        } 
                    }else if(name=="safe"){

                    }else if(name=="back"){
                        
                    }else{
                        if(image.hitTestPoint(playerX,playerY,true)){
                            this.gameOver();
                        }else if (image.hitTestPoint(playerX+halfWidth,playerY,true)){
                            this.gameOver();
                        }else if (image.hitTestPoint(playerX-halfWidth,playerY,true)){
                            this.gameOver();
                        }else if (image.hitTestPoint(playerX,playerY+halfWidth,true)){
                            this.gameOver();
                        }else if (image.hitTestPoint(playerX,playerY-halfWidth,true)){
                            this.gameOver();
                        } 
                    }
                }
            }
        }
    }
    public controlPlay(point:egret.Point):void
    {
        var x:number=point.x;
        var y:number=point.y;
        if(point.x>0)  this.movePoint.x=1;
        else           this.movePoint.x=-1;
        if(point.y>0)  this.movePoint.y=1;
        else           this.movePoint.y=-1;
        if(Math.abs(x)<50)  this.movePoint.x=0;
        if(Math.abs(y)<50)  this.movePoint.y=0;
    }
}