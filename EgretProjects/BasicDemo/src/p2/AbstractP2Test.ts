class AbstractP2Test extends egret.DisplayObjectContainer{
    private mouseJoint: p2.RevoluteConstraint;
    private emptyBody: p2.Body;
    public world: p2.World;
    public debugDraw: p2DebugDraw;
    public factor:number = 1;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    private onAddToStage(event: egret.Event) {
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");

        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.loadGroup("preload");
    }
    private onResourceLoadComplete(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            this.onAppReady();
            this.addEventListener(egret.Event.ENTER_FRAME, this.loop, this);
        }
    }
    public enableMouseDrag(world:p2.World): void {
        this.world = world;
        this.emptyBody = new p2.Body();
        this.world.addBody(this.emptyBody);

        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);

    }
    public createDebug(): void {
        var sprite: egret.Sprite = new egret.Sprite();
        this.addChild(sprite);
        this.debugDraw = new p2DebugDraw(this.world,sprite);
    }
    public createFourWall():void
    {
        var size:number=100;
        var width:number=this.stage.stageWidth;
        var height:number=this.stage.stageHeight;
        var w2:number=width/2;
        var h2:number=height/2;
        var world:p2.World=this.world;
        createOneWall(new egret.Rectangle(w2,0,width,size));//上
        createOneWall(new egret.Rectangle(w2,height,width,size));//下
        createOneWall(new egret.Rectangle(0,h2,size,height));
        createOneWall(new egret.Rectangle(width,h2,size,height));
        function createOneWall(rect:egret.Rectangle):void
        {
            var groundShape: p2.Box=new p2.Box({width:rect.width,height:rect.height})
            var groundBody: p2.Body = new p2.Body({mass:0});
            groundBody.addShape(groundShape);
            groundBody.position = [rect.x,rect.y];
            world.addBody(groundBody);
        }
    }
    public onTouch(te: egret.TouchEvent): void {
        var mousePos: number[] = new Array(te.stageX/this.factor, te.stageY/this.factor);
        
        switch (te.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                
                var hitBodies: p2.Body[] = this.world.hitTest(mousePos, this.world.bodies);
                //console.log(hitBodies.length);
                if (hitBodies.length > 0) {
                  //  for (var i: number = 0; i < hitBodies.length; i++) {
                        var body: p2.Body = hitBodies[0];
                        this.emptyBody.position[0] = mousePos[0];
                        this.emptyBody.position[1] = mousePos[1];
                        this.mouseJoint = new p2.RevoluteConstraint(this.emptyBody, body, {
                            worldPivot: mousePos,
                            collideConnected: false
                        });
                        this.world.addConstraint(this.mouseJoint);
                        
                   // }
                    this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
                }
                
                break;
            case egret.TouchEvent.TOUCH_END:
                this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
                
                this.world.removeConstraint(this.mouseJoint);
                this.mouseJoint = null;
                break;
            case egret.TouchEvent.TOUCH_MOVE:
                this.emptyBody.position[0] = mousePos[0];
                this.emptyBody.position[1] = mousePos[1];
                break;
        }
    }
    public onAppReady(): void {

    }
    public loop(): void {
        this.world.step(1/60);
        this.debugDraw.drawDebug();
    }
}


