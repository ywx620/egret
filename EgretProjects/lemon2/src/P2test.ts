class P2Main extends egret.DisplayObjectContainer {
 
    private loadingView:LoadingUI;
    private debugDraw: p2DebugDraw;
    private world: p2.World;
 
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
 
    private onAddToStage(event:egret.Event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.loop, this);
 
        //鼠标点击添加刚体
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.addOneBox, this);
 
        this.createWorld();
        this.createGround();
        this.createBodies();
        this.createDebug();
        egret.log(11)
    }
    private createWorld(): void {
        var wrd:p2.World = new p2.World();
        wrd.sleepMode = p2.World.BODY_SLEEPING;
        wrd.gravity = [0,100];
        this.world = wrd;
    }
    private createGround(): void {
        var stageHeight:number = this.stage.stageHeight;
        var groundShape: p2.Plane = new p2.Plane();
        var groundBody: p2.Body = new p2.Body();
        groundBody.mass=0;
        groundBody.position[1] = stageHeight;
        groundBody.angle = Math.PI;
        groundBody.addShape(groundShape);
 
        this.world.addBody(groundBody);
    }
    private createBodies(): void {
        var boxShape: p2.Shape = new p2.Box({width:100, height:50});
        var boxBody: p2.Body = new p2.Body({ mass: 1, position: [200, 200] });
        boxBody.addShape(boxShape);
        this.world.addBody(boxBody);
 
        var boxShape: p2.Shape = new p2.Box({width:50, height:50});
        var boxBody: p2.Body = new p2.Body({ mass: 1, position: [200, 180],angularVelocity:1 });
        boxBody.addShape(boxShape);
        this.world.addBody(boxBody);
    }
    private canvas:egret.Sprite;
    private createDebug(): void {
       // egret.t//.getInstance().run();
        //创建调试试图
        
 
        var sprite: egret.Sprite = new egret.Sprite();
        this.addChild(sprite);
        sprite.graphics.beginFill(0XFF0000);
        sprite.graphics.drawCircle(0,0,500);
        sprite.graphics.endFill();
        this.canvas=sprite;
        this.debugDraw = new p2DebugDraw(this.world,sprite);
        
    }
    private loop(): void {
        this.world.step(60 / 1000);
        this.debugDraw.drawDebug();

    }
    private addOneBox(e: egret.TouchEvent): void {
        var positionX: number = Math.floor(e.stageX);
        var positionY: number = Math.floor(e.stageY);
 
        if (Math.random() > 0.5) {
            //添加方形刚体
            var boxShape: p2.Shape = new p2.Box({width:Math.random() *150 + 50, height:100});
            var boxBody: p2.Body = new p2.Body({ mass: 1, position: [positionX, positionY], angularVelocity: 1 });
            boxBody.addShape(boxShape);
            this.world.addBody(boxBody);
        }
        else {
            //添加圆形刚体
            var boxShape: p2.Shape = new p2.Circle({radius:50});
            var boxBody: p2.Body = new p2.Body({ mass: 1, position: [positionX, positionY] });
            boxBody.addShape(boxShape);
            this.world.addBody(boxBody);
        }
    }
}

//------------------------------------------
//------------------------------------------

class P2Main2 extends egret.DisplayObjectContainer {
    skins:egret.Sprite[]=[];
    index:number=0;
    world:p2.World;
    public constructor() {
        super();

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
       
    }
    private onClick(e:egret.TouchEvent):void
    {
        this.index++;
        var random:number=Math.random();
        var radius:number=20+20*random;
        var body:p2.Body
       
        if(random<0.5){
            body=this.createCircleBodyShape(radius,this.index);
            this.drawCircle(radius,body);
        }else{
            body=this.createBoxBodyShape(radius,radius,this.index);
            this.drawBox(radius,radius,body);
        }
         body.position=[e.stageX,e.stageY];
    }
    private drawCircle(radius:number,body:p2.Body):egret.Sprite
    {
        var skin:egret.Sprite=new egret.Sprite();
        skin.graphics.beginFill(0XFF0000,0.5);
        skin.graphics.drawCircle(0,0,radius);
        skin.graphics.endFill();
        skin.x=body.position[0];
        skin.y=body.position[1];
        skin.name=body.id+"";
        this.addChild(skin);
        this.skins.push(skin);
        return skin;
    }
    private createCircleBodyShape(radius:number,id:number):p2.Body
    {
        var body = new p2.Body({mass:1});
        var shape:p2.Shape = new p2.Circle({ radius: radius });
        body.addShape(shape);
        body.id=id;
        this.world.addBody(body);
        return body;
    }
    private drawBox(width:number,height:number,body:p2.Body):egret.Sprite
    {
        var skin:egret.Sprite=new egret.Sprite();
        skin.graphics.beginFill(0XFF0000,0.5);
        skin.graphics.drawRect(-width/2,-height/2,width,height)
        skin.graphics.endFill();
        skin.x=body.position[0];
        skin.y=body.position[1];
        skin.name=body.id+"";
        this.addChild(skin);
        this.skins.push(skin);
        return skin;
    }
    private createBoxBodyShape(width:number,height:number,id:number):p2.Body
    {
        var body = new p2.Body({mass:1});
        var shape:p2.Shape = new p2.Box({width:width,height:height})
        body.addShape(shape);
        body.id=id;
        this.world.addBody(body);
        return body;
    }
 
    private onAddToStage(event:egret.Event) {

        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClick,this);
        var skin:egret.Sprite=new egret.Sprite();
        skin.graphics.beginFill(0,0.5);
        skin.graphics.drawRect(0,0,this.stage.stageWidth,this.stage.stageHeight)
        skin.graphics.endFill();
        this.addChild(skin);


        var world = new p2.World({
            gravity:[0,800]
        });
        this.world=world;

        var groundShape = new p2.Plane();
        var groundBody = new p2.Body({
        mass:0
        });
        groundBody.addShape(groundShape);
        groundBody.angle = Math.PI;
        groundBody.position[1]=this.stage.stageHeight;
        world.addBody(groundBody);

        var body:p2.Body=this.createBoxBodyShape(100,100,999);
        body.mass=0;
        body.position=[0,this.stage.stageHeight-100];
        this.drawBox(100,100,body);

            var timeStep = 1/60;
            var skins=this.skins
            egret.setInterval(function(){
                world.step(timeStep);
                var bodys=world.bodies;
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
           
            },this, 1000 * timeStep);
    }
}