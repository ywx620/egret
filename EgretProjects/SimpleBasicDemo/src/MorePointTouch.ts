/**多点触控的实现*/
class MorePointTouch extends egret.DisplayObjectContainer
{ 
    rect:MorePointNode;
    circle:MorePointNode;
    displays:MorePointNode[];
    public constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.addToStage,this);
    }
    private addToStage():void
    {
		var txt:egret.TextField = new egret.TextField();
		this.addChild(txt);
		txt.text = "用两个手指分别拖动两个方块";		        
        //------
        this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.addToStage,this);
        this.displays=[];
        this.rect=new MorePointNode();
        this.circle=new MorePointNode();
        this.addChild(this.rect);
        this.addChild(this.circle);
        this.circle.x=300;
        this.circle.y=this.rect.y=100;
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
                display.distance=new egret.Point(x-display.x,y-display.y);
             }
        }
    }
}
class MorePointNode extends egret.Sprite
{
    public id:number;
    public distance:egret.Point;
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