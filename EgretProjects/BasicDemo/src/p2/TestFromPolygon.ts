class TestFromPolygon extends AbstractP2Test {
    private prePoint: number[];
    private points: number[][] = new Array();
    public constructor() {
        super();
    }
    public onAppReady(): void {
        this.createWorld();
        this.createFourWall();
        this.createDebug();

        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchEventHandler, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEventHandler, this);

        this.createBody();
    }
    private createWorld(): void {
        var wrd:p2.World = new p2.World();
        wrd.sleepMode = p2.World.BODY_SLEEPING;
        wrd.gravity = [0,100];
        this.world = wrd;
    }
    public createFourWall():void
    {
        var size:number=10;
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
    private createGround(): void {
        var groundShape: p2.Box=new p2.Box({width:this.stage.stageWidth,height:10})
        var groundBody: p2.Body = new p2.Body();
        groundBody.addShape(groundShape);
        groundBody.type = p2.Body.STATIC;
        groundBody.position = [this.stage.stageWidth/2,this.stage.stageHeight];
        groundBody.angle = Math.PI;
        this.world.addBody(groundBody);
    }
    
    private createBody():void
    {
        var shape: p2.Shape=new p2.Circle({radius:Math.random()*20+30});
        var body: p2.Body = new p2.Body({mass:10});
        body.addShape(shape);
        body.position = [Math.random()*200,Math.random()*200];
        body.angle = Math.PI;
        this.world.addBody(body);
    }
    
    public loop(): void {
        this.world.step(1/60);
        this.debugDraw.drawDebug();
        if (this.points.length > 1) this.debugDraw.drawConvex(this.points, 0x000000, 1, false);
    }
    private touchEventHandler(te: egret.TouchEvent): void {
        var mousePos: number[] = new Array(te.stageX/this.factor, te.stageY/this.factor);

        switch (te.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                this.prePoint = this.copyPoint(mousePos);
                this.points.push(this.prePoint,this.prePoint);
                this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchEventHandler, this);
                break;
            case egret.TouchEvent.TOUCH_END:
                this.createConvexBody();
                this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchEventHandler, this);
                break;
            case egret.TouchEvent.TOUCH_MOVE:
                var dis: number = p2.vec2.dist(mousePos, this.prePoint);
                if (dis > 30/this.factor) {
                    this.points.push(this.prePoint);
                    this.prePoint = this.copyPoint(mousePos);
                    this.points[this.points.length - 1] = this.copyPoint(mousePos);
                } else {
                    this.points[this.points.length-1] = this.copyPoint(mousePos);
                }
                break;
        }
    }
    private createConvexBody(): void {
        /* 错误的做法，使用Convex形状，创建多边形.
        var triangleShape: p2.Convex = new p2.Convex({vertices:this.points});
        var body: p2.Body = new p2.Body({ mass: 1, position:[100/this.factor,100/this.factor] });
        body.addShape(triangleShape);
        */

        //正确的做法，使用fromPolygon()函数，来创建刚体
        var body: p2.Body = new p2.Body({ mass: 10 });
        body.fromPolygon(this.points, {optimalDecomp:false});

        this.world.addBody(body);
        this.points = [];
    }
    private copyPoint(p: number[]): number[] {
        return new Array(p[0], p[1]);
    }
}


