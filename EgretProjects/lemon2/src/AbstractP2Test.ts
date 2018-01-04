class AbstractP2Test extends egret.DisplayObjectContainer{

    private mouseJoint: p2.RevoluteConstraint;
    private wworld: p2.World;
    private emptyBody: p2.Body;

    public factor:number = 30;

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
        this.wworld = world;
        this.emptyBody = new p2.Body();
        this.wworld.addBody(this.emptyBody);

        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
    }
    public onTouch(te: egret.TouchEvent): void {
        var mousePos: number[] = new Array(te.stageX/this.factor, te.stageY/this.factor);
        
        switch (te.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                
                var hitBodies: p2.Body[] = this.wworld.hitTest(mousePos, this.wworld.bodies);
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
                        this.wworld.addConstraint(this.mouseJoint);
                        
                   // }
                    this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
                }
                
                break;
            case egret.TouchEvent.TOUCH_END:
                this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
                
                this.wworld.removeConstraint(this.mouseJoint);
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
        
    }
}


