class Main extends egret.DisplayObjectContainer {
    p2World:P2World;
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClick,this);

        var p2World=new P2World();
        p2World.createBg(0X00FFFF,this.stage);
        p2World.createPlane(Math.PI,0,this.stage.stageHeight);
        p2World.createPlane(-Math.PI/2,0,0);
        p2World.createPlane(Math.PI/2,this.stage.stageWidth,0);
        //在创建第一个最下方的平面做为地面时，不知道为什么档不住第一个刚体，所以又创建了一个静态刚体做为底下地面
        var body:p2.Body=p2World.createBoxBodyShape(this.stage.stageWidth,10,9999,p2.Body.KINEMATIC);
        p2World.drawBox(this.stage.stageWidth,10,body);
        body.position=[this.stage.stageWidth/2,this.stage.stageHeight-100]
        this.addChild(p2World);
        this.p2World=p2World;
    }
    private onClick(e:egret.TouchEvent):void
    {
        this.p2World.index++;
        var index=this.p2World.index;
        var random:number=Math.random();
        var radius:number=30+20*random;
        var body:p2.Body;
        var skin:egret.Sprite;
        if(random<0.3){//圆形
            body=this.p2World.createCircleBodyShape(radius,index);
            skin=this.p2World.drawCircle(radius,body);
        }else if(random<0.6){//正方形
            body=this.p2World.createBoxBodyShape(radius,radius,index);
            skin=this.p2World.drawBox(radius,radius,body);
        }else {//长方形
            var height:number=radius*2;
            body=this.p2World.createBoxBodyShape(radius,height,index);
            skin=this.p2World.drawBox(radius,height,body);
        }
        body.position=[e.stageX,e.stageY];
        skin.x=e.stageX;
        skin.y=e.stageY;
    }
}
