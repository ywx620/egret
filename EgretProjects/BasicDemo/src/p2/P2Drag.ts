class P2Drag extends AbstractP2Test {
    public constructor() {
        super();
    }
    public onAppReady(): void {
    this.enableMouseDrag(new p2.World({gravity:[0,100]}));
        this.createFourWall();
        this.createDebug();
        this.createBody();
    }
    private createBody():void
    {
        var r:number=Math.random()*20+30
        var shape: p2.Shape=new p2.Circle({radius:r});
        var body: p2.Body = new p2.Body({mass:10});
        body.addShape(shape);
        body.position = [Math.random()*200+50,Math.random()*200+50];
        body.angle = Math.PI;
		var sprite:egret.Sprite = new egret.Sprite();
		sprite.graphics.beginFill(0xffFF00);
		sprite.graphics.drawCircle(0,0,r);
		sprite.graphics.endFill();
        sprite.alpha=0.1;
		this.addChild(sprite);        
        body.userData={skin:sprite};
        this.world.addBody(body);
    }
    public loop(): void {
        super.loop();
        var bodys=this.world.bodies;
        var l: number = bodys.length;
        for (var i: number = 0; i < l; i++) {
            var body: p2.Body = bodys[i];
            if(body.userData&&body.userData.skin){
                var skin:egret.DisplayObject=body.userData.skin;
                skin.x=body.position[0];
                skin.y=body.position[1];
                skin.rotation=body.angle*180/Math.PI;
            }
        }
    }
}