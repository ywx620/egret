class P2World extends egret.DisplayObjectContainer {
    world:p2.World;
    colors:number[]=[10];
    loopBackFun:any;
    isDebug:boolean=true;//是否显示刚体现状
    removeBodys:any[]=[];//需要删除的刚体
    public constructor() {
        super();
        this.world = new p2.World({gravity:[0,0]});
        this.colors[p2.Body.DYNAMIC]=0XFF0000;
        this.colors[p2.Body.KINEMATIC]=0X00FF00;
        this.addEventListener(egret.Event.ENTER_FRAME,this.updateWorld,this);
    }
    public get p2World():p2.World
    {
        return this.world;
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
    /**   
    public drawCircle(radius:number,body:p2.Body):egret.Sprite
    {
        if(!this.isDebug) return;
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
        this.addChild(skin);
        this.skins.push(skin);
        return skin;
    }
    public drawBox(width:number,height:number,body:p2.Body):egret.Sprite
    {
        if(!this.isDebug) return;
        var skin:egret.Sprite=new egret.Sprite();
        var color:number=this.colors[body.type];
        skin.graphics.lineStyle(1,color,1);
        skin.graphics.beginFill(color,0.5);
        skin.graphics.drawRect(-width/2,-height/2,width,height)
        skin.graphics.endFill();
        skin.x=body.position[0];
        skin.y=body.position[1];
        this.addChild(skin);
        this.skins.push(skin);
        return skin;
    }
    */
    public createCircleBodyShape(radius:number,type:number=p2.Body.DYNAMIC):p2.Body
    {
        var body = new p2.Body({mass:1});
        var shape:p2.Shape = new p2.Circle({ radius: radius });
        body.addShape(shape);
        body.type=type
        this.world.addBody(body);
        return body;
    }
    /***
     * angle=rotation*Math.PI/180
     */
    public createBoxBodyShape(width:number,height:number,type:number=p2.Body.DYNAMIC,angle:number=0):p2.Body
    {
        var body = new p2.Body({mass:1});
        var shape:p2.Shape = new p2.Box({width:width,height:height});
        body.addShape(shape);
        body.angle=angle;
        body.type=type;
        this.world.addBody(body);
        return body;
    }
    
    public createBoxCircleBodyShape(width:number,height:number,type:number=p2.Body.DYNAMIC):p2.Body
    {
        var body = new p2.Body({mass:1});
        width/=2;
        height/=1.5;
        var shape:p2.Shape = new p2.Box({width:width,height:height})
        var shape2:p2.Shape = new p2.Circle({radius: width/2 });
        body.addShape(shape);
        body.addShape(shape2);
        body.type=type;
        shape.position[1]=-height;
        shape2.position[1]=-width/2;
        this.world.addBody(body);
        return body;
    }
    public drawSkin(body:p2.Body):egret.Sprite
    {
         if(!this.isDebug) return;
        var skin:egret.Sprite=new egret.Sprite();
        var color:number=this.colors[body.type];
        skin.graphics.lineStyle(1,color,1);
        for(var i=0;i<body.shapes.length;i++){
            var shape:p2.Shape = body.shapes[i];
            var pos:egret.Point=new egret.Point(shape.position[0],shape.position[1]);
            //egret.log(pos.x,pos.y)
            if(shape instanceof p2.Box){
                var width:number=shape.width,height:number=shape.height;
                skin.graphics.beginFill(color,0.5);
                skin.graphics.drawRect(-width/2+pos.x,-height/2+pos.y,width,height)
                skin.graphics.endFill();
            }else if(shape instanceof p2.Circle){
                var radius:number=shape.radius;
                skin.graphics.moveTo(pos.x,pos.y);
                skin.graphics.lineTo(pos.x,radius+pos.y)
                skin.graphics.beginFill(color,0.5);
                skin.graphics.drawCircle(pos.x,pos.y,radius);
                skin.graphics.endFill();
            }
        }
        skin.x=body.position[0];
        skin.y=body.position[1];
        body.userData=skin;
        this.addChild(skin);
        //this.skins.push(skin);
        return skin;
    }
    private updateWorld(e:egret.Event):void
    {
        var timeStep = 1/60;
        var removeBodys:any[]=this.removeBodys;
        this.world.step(timeStep);
        var bodys=this.world.bodies;
        var l: number = bodys.length;
        for (var i: number = 0; i < l; i++) {
            var body: p2.Body = bodys[i];
            var skin:egret.DisplayObject=body.userData;
            skin.x=body.position[0];
            skin.y=body.position[1];
            skin.rotation=body.angle*180/Math.PI;
        }
        for(i=0;i<removeBodys.length;i++){
            body=removeBodys[i];
            skin=body.userData;
            if(skin.parent!=null){
                skin.parent.removeChild(skin);
            }
            this.world.removeBody(body);
        }
        if(this.loopBackFun!=null){
            this.loopBackFun();
        }
    }
}