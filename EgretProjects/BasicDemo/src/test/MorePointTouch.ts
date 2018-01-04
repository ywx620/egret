class MorePointTouch extends moon.BasicView{
    rect:MorePointNode;
    circle:MorePointNode;
    txt1:TextField;
    txt2:TextField;
    displays:MorePointNode[];
    protected render():void
    {
        this.displays=[];
        this.rect=this.createRect(100,100,0XFFFF00,100,100) as MorePointNode;
        this.circle=this.createCircle(50,0XFF0000,350,350) as MorePointNode;
        this.rect.name="rect";
        this.circle.name="circle";
        this.displays.push(this.rect,this.circle);
        this.txt1=this.createText(0,0,"rect");
        this.txt2=this.createText(0,40,"circle");
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
    }
    protected onTouch(e: egret.TouchEvent){
        var id:number=e.touchPointID;
        var sX:number=e.stageX;
        var sY:number=e.stageY;
        switch (e.type) {
                case egret.TouchEvent.TOUCH_BEGIN:
                    this.controlStart(sX,sY,id);
                    break;
                case egret.TouchEvent.TOUCH_MOVE:
                   for(var i:number=0;i<this.displays.length;i++){
                        var display:MorePointNode=this.displays[i];
                        if(display.id==id){
                            display.x=sX-display.distance.x;
                            display.y=sY-display.distance.y;
                        }
                    }
                    break;
                case egret.TouchEvent.TOUCH_END:
                    for(var i:number=0;i<this.displays.length;i++){
                        var display:MorePointNode=this.displays[i];
                        if(display.id==id){
                            if(display.name=="rect"){
                                this.txt1.text="rect"
                            }else if(display.name=="circle"){
                                this.txt2.text="circle"
                            }
                        }
                        display.id=-1;
                    }
                    break;
            }
    }
    protected controlStart(x:number,y:number,id:number):void
    {
        for(var i:number=0;i<this.displays.length;i++){
              var display:MorePointNode=this.displays[i];
              if(display.hitTestPoint(x,y)){
                display.id=id;
                display.distance=new Point(x-display.x,y-display.y);
             }
        }
        if(this.rect.hitTestPoint(x,y)){
            this.txt1.text="rect="+Math.random();
        } if(this.circle.hitTestPoint(x,y)){
            this.txt2.text="circle="+Math.random();
        }
    }
}
class MorePointNode extends Sprite
{
    public id:number;
    public distance:Point;
}

class MorePointTouch2 extends egret.DisplayObjectContainer
{
        
    rect:MorePointNode2;
    circle:MorePointNode2;
    displays:MorePointNode2[];
    public constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.addToStage,this);
    }
    private addToStage():void
    {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.addToStage,this);
        this.displays=[];
        this.rect=new MorePointNode2();
        this.circle=new MorePointNode2();
        this.addChild(this.rect);
        this.addChild(this.circle);
        this.circle.x=300;
        this.rect.name="rect";
        this.circle.name="circle";
        this.displays.push(this.rect,this.circle);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
    }
    protected onTouch(e: egret.TouchEvent){
        var id:number=e.touchPointID;
        var sX:number=e.stageX;
        var sY:number=e.stageY;
        switch (e.type) {
                case egret.TouchEvent.TOUCH_BEGIN:
                    this.controlStart(sX,sY,id);
                    break;
                case egret.TouchEvent.TOUCH_MOVE:
                   for(var i:number=0;i<this.displays.length;i++){
                        var display:MorePointNode=this.displays[i];
                        if(display.id==id){
                            display.x=sX-display.distance.x;
                            display.y=sY-display.distance.y;
                        }
                    }
                    break;
                case egret.TouchEvent.TOUCH_END:
                    for(var i:number=0;i<this.displays.length;i++){
                        var display:MorePointNode=this.displays[i];
                        if(display.id==id){
                            display.id=-1;
                        }
                    }
                    break;
            }
    }
    protected controlStart(x:number,y:number,id:number):void
    {
        for(var i:number=0;i<this.displays.length;i++){
              var display:MorePointNode=this.displays[i];
              if(display.hitTestPoint(x,y)){
                display.id=id;
                display.distance=new Point(x-display.x,y-display.y);
             }
        }
    }
}
class MorePointNode2 extends Sprite
{
    public id:number;
    public distance:Point;
    public constructor()
    {
        super();
		var shape:egret.Shape = new egret.Shape();
		shape.graphics.beginFill(0x00ff00);
		shape.graphics.drawRect(0,0,200,200);
		shape.graphics.endFill();
		this.addChild(shape);        
    }
}