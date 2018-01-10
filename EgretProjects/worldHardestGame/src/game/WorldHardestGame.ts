var path:string="../"
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
        var control:ArrowControl=new ArrowControl();
        control.level=this.levelControl;
        this.addChild(control);
    }
}
class ArrowControl extends BasicComponent
{
    private arrow_l:eui.Image;
    private arrow_r:eui.Image;
    private arrow_u:eui.Image;
    private arrow_d:eui.Image;
    private arrow_ru:eui.Image;
    private arrow_rd:eui.Image;
    private arrow_lu:eui.Image;
    private arrow_ld:eui.Image;
    private bar:eui.Image;
    private point:egret.Point;
    private arrows:any[]=[];
    public level:LevelControl;
    constructor() {
        super();
        this.setSkinName(path+"resource/askins/WHG_control.exml");
    }
    protected render(): void {
        var datas:any[]=[{display:this.arrow_l,backCall:this.moveleft.bind(this)},
        {display:this.arrow_r,backCall:this.moveright.bind(this)},
        {display:this.arrow_u,backCall:this.moveup.bind(this)},
        {display:this.arrow_d,backCall:this.movedown.bind(this)}
        ];
        for(var i=0;i<datas.length;i++) datas[i].display.alpha=0;
        var controlTab:control.ControlMoreTab=new control.ControlMoreTab(this.stage,datas);
        controlTab.open();
        this.point=new egret.Point;
        for(var i:number=0;i<this.numChildren;i++){
            var image:eui.Image=this.getChildAt(i) as eui.Image;
            var name=image.name.split("_")[0];
            if(name=="arrow"){
                image.alpha=0;
                this.arrows.push(image);
            }
        }

        // var controlBg:egret.Sprite=moon.MoonUI.getCircle(140,0Xffff00);
        // var controlAuton:control.ControlBarMove=new control.ControlBarMove(this.stage,this.bar,controlBg);
        // controlBg.x=this.bar.x;
        // controlBg.y=this.bar.y;
        // controlAuton.open();
        // controlAuton.moveBackFun=this.moveBackFun.bind(this);
        // controlAuton.startBackFun=this.startBackFun.bind(this);
        // controlAuton.endBackFun=this.endBackFun.bind(this);
       
    }
    private startBackFun(point:egret.Point):void
    {
        this.level.isMove=true;
    }
    private endBackFun(point:egret.Point):void{
        this.level.isMove=false;
    }
    private moveBackFun(p:any):void
    {
        var len:number=this.arrows.length;
        for(var i:number=0;i<len;i++){
            var image:eui.Image=this.arrows[i];
            var name=image.name.split("_")[1];
            image.alpha=0;
            if(image.hitTestPoint(this.bar.x,this.bar.y,true)){
                image.alpha=1;
                
                switch(name){
                    case "l": this.point.x=-1;  this.point.y=0; break;
                    case "r": this.point.x=1;   this.point.y=0; break;
                    case "u": this.point.y=0;   this.point.y=-1;break;
                    case "d": this.point.y=0;   this.point.y=1; break;
                    case "ru":this.point.x=1;   this.point.y=-1;break;
                    case "rd":this.point.x=1;   this.point.y=1; break;
                    case "lu":this.point.x=-1;  this.point.y=-1;break;
                    case "ld":this.point.x=-1;  this.point.y=1; break;
                }
                this.level.controlPlay(this.point);
                
            }
        }
    }
    private moveleft(type:number):void
    {
        this.point.x=type==1?-1:0;
        this.arrow_l.alpha=type;
        this.controlMove(type);
    }
    private moveright(type:number):void
    {
        this.point.x=type==1?1:0;
        this.arrow_r.alpha=type;
        this.controlMove(type);
    }
    private moveup(type:number):void
    {
        this.point.y=type==1?-1:0;
        this.arrow_u.alpha=type;
        this.controlMove(type);
    }
    private movedown(type:number):void
    {
        this.point.y=type==1?1:0;
        this.arrow_d.alpha=type;
        this.controlMove(type);
    }
    private controlMove(type:number):void
    {
        this.level.controlPlay(this.point);
    }
}
class LevelControl extends BasicComponent
{
    private test1:egret.tween.TweenGroup;
    private player:eui.Image;
    private wall:eui.Image;
    private safeAreas:any[]=[];
    public isMove:boolean;
    private startPoint:egret.Point;
    private movePoint:egret.Point=new egret.Point;
    private speedX:number=4;
    private speedY:number=4;
    constructor() {
        super();
        this.setSkinName(path+"resource/askins/WHG_level1.exml");
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
        //simpleTrace(this.isMove);
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
        this.movePoint=point;
        simpleTrace(this.movePoint.x,this.movePoint.y)
    }
    // public controlPlay(point:egret.Point):void
    // {
    //     var x:number=point.x;
    //     var y:number=point.y;
    //     if(point.x>0)  this.movePoint.x=1;
    //     else           this.movePoint.x=-1;
    //     if(point.y>0)  this.movePoint.y=1;
    //     else           this.movePoint.y=-1;
    //     if(Math.abs(x)<50)  this.movePoint.x=0;
    //     if(Math.abs(y)<50)  this.movePoint.y=0;
    // }
}