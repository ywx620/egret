class P2World extends egret.DisplayObjectContainer {
    skins:any[]=[];
    index:number=0;
    world:p2.World;
    colors:number[]=[10];
    public constructor() {
        super();
        this.world = new p2.World({gravity:[0,0]});
        this.colors[p2.Body.DYNAMIC]=0XFF0000;
        this.colors[p2.Body.KINEMATIC]=0X00FF00;
        this.addEventListener(egret.Event.ENTER_FRAME,this.updateWorld,this);
    }
    public createBg(color:number=0,stage):void
    {
        var skin:egret.Sprite=new egret.Sprite();
        skin.graphics.beginFill(color,0.5);
        skin.graphics.drawRect(0,0,stage.stageWidth,stage.stageHeight)
        skin.graphics.endFill();
        this.addChild(skin);
    }
    public createPlane(angle:number=Math.PI,x:number,y:number):p2.Body
    {
        var shape = new p2.Plane();
        var body = new p2.Body({mass:0});
        body.addShape(shape);
        body.angle = angle;
        body.position[0]=x;
        body.position[1]=y;
        this.world.addBody(body);
        return body;
    }
    public drawCircle(radius:number,body:p2.Body):egret.Sprite
    {
        var skin:egret.Sprite=new egret.Sprite();
        var color:number=this.colors[body.type];
        skin.graphics.lineStyle(1,color,1);
        skin.graphics.moveTo(0,0);
        skin.graphics.lineTo(0,radius)
        skin.graphics.beginFill(color,0.5);
        skin.graphics.drawCircle(0,0,radius);
        skin.graphics.endFill();
        skin.x=body.position[0];
        skin.y=body.position[1];
        skin.name=body.id+"";
        this.addChild(skin);
        this.skins.push(skin);
        return skin;
    }
    public createCircleBodyShape(radius:number,id:number,type:number=p2.Body.DYNAMIC):p2.Body
    {
        var body = new p2.Body({mass:1});
        var shape:p2.Shape = new p2.Circle({ radius: radius });
        body.addShape(shape);
        body.id=id;
        body.type=type
        this.world.addBody(body);
        return body;
    }
    public drawBox(width:number,height:number,body:p2.Body):egret.Sprite
    {
        var skin:egret.Sprite=new egret.Sprite();
        var color:number=this.colors[body.type];
        skin.graphics.lineStyle(1,color,1);
        skin.graphics.beginFill(color,0.5);
        skin.graphics.drawRect(-width/2,-height/2,width,height)
        skin.graphics.endFill();
        skin.x=body.position[0];
        skin.y=body.position[1];
        skin.name=body.id+"";
        this.addChild(skin);
        this.skins.push(skin);
        return skin;
    }
    public createBoxBodyShape(width:number,height:number,id:number,type:number=p2.Body.DYNAMIC):p2.Body
    {
        var body = new p2.Body({mass:1});
        var shape:p2.Shape = new p2.Box({width:width,height:height})
        body.addShape(shape);
        body.id=id;
        body.type=type;
        this.world.addBody(body);
        return body;
    }
    private updateWorld(e:egret.Event):void
    {
        var timeStep = 1/60;
        var skins=this.skins;
        this.world.step(timeStep);
        var bodys=this.world.bodies;
        var l: number = bodys.length;
        var s:number=skins.length;
        for (var i: number = 0; i < l; i++) {
            var body: p2.Body = bodys[i];
            for (var j: number = 0; j < s; j++) {
                var skin:egret.Sprite=skins[j];
                if(body.id+""==skin.name){
                    skin.x=body.position[0];
                    skin.y=body.position[1];
                    skin.rotation=body.angle*180/Math.PI;
                }
            }
        }
    }
}