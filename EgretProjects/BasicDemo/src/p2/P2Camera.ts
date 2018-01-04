class P2Camera extends BasicComponent {
    public constructor() {
        super();
        //this.setSkinName("resource/askins/P2CameraSkin.exml")
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.render,this);
        
    }
    protected render(): void {
        var bg=new eui.Image("bg_jpg")
        bg.width=this.stage.stageWidth*1.2
        bg.height=this.stage.stageHeight*1.2
        this.addChild(bg)
        var world:P2World=new P2World(0,200);
        //world.isDebug=false;
        world.createWall(new egret.Rectangle(0,0,this.width,this.height));
        this.addChild(world);
        var ball:p2.Body=world.createCircleBodyShape(50);
        ball.mass=10;
        //world.drawSkin(ball);
		var shape:egret.Shape = new egret.Shape();
        shape.graphics.lineStyle(1,0XFF0000);
		shape.graphics.beginFill(0xffff00);
		shape.graphics.drawCircle(0,0,50);
        shape.graphics.drawCircle(20,10,10);
		shape.graphics.endFill();
		this.addChild(shape);
        ball.userData.skin=shape;

        world.drawSkin(world.createConvexBodyShape([[0,-150], [150,150], [-150,150]]));
        world.drawSkin(world.createConvexBodyShape([[-100,-100], [100,-100], [100,100], [-10,100]]));
        world.drawSkin(world.createConvexBodyShape([[-10,-10], [100,-10], [100,100], [-10,10]]));
        world.drawSkin(world.createBoxBodyShape(150,100));
        world.drawSkin(world.createPolygon(8,50));

        // var body:p2.Body=world.createConvexBodyShape([[0,-150], [150,150], [-150,150]],p2.Body.STATIC)
        // world.drawSkin(body);
        // body.position=[500,600];

        // var body:p2.Body=world.createConvexBodyShape([[-10,-10], [100,-10], [100,100], [-10,10]],p2.Body.KINEMATIC)
        // world.drawSkin(body);
        // body.position=[800,200];




        var cameraRect:egret.Rectangle=new egret.Rectangle(0,0,this.stage.stageWidth,this.stage.stageHeight);
        var camera:control.Camera2D=new control.Camera2D(ball.userData.skin,this,cameraRect);
        this.addEventListener(egret.Event.ENTER_FRAME,onLoop,this);
        
        function onLoop(e:egret.Event):void
        {
            //body.velocity[0]++;
            camera.move();
        }

        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,onClick,this);
        function onClick(e:egret.TouchEvent):void
        {
            var ran:number=2;
            var x1:number=ball.position[0];
            var y1:number=ball.position[1];
            var x2:number=e.stageX-x1;
            var y2:number=e.stageY-y1;
            var ds:number=Math.sqrt(x2*x2+y2*y2);
            var x:number=x2*ran;
            var y:number=y2*ran;
            ball.applyImpulse([x,y],[0,0]);
        }
    }
}

class P2Camera2 extends BasicComponent {
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.render,this)
    }
    protected render(): void {

        var bg=new eui.Image("bg_jpg")
        bg.width=bg.height=2000;
        this.addChild(bg)
        
		var shape:egret.Shape = new egret.Shape();
		shape.graphics.beginFill(0xff0000);
		shape.graphics.drawCircle(0,0,100);
		shape.graphics.endFill();
		this.addChild(shape);        

        var cameraRect:egret.Rectangle=new egret.Rectangle(0,0,this.stage.stageWidth,this.stage.stageHeight);
        var camera:control.Camera2D=new control.Camera2D(shape,this,cameraRect);
        this.addEventListener(egret.Event.ENTER_FRAME,onLoop,this);
        
        function onLoop(e:egret.Event):void
        {
            if(shape.x+shape.width/2<2000)     shape.x+=10;
            if(shape.x+shape.width/2<2000)     shape.y+=10;
            camera.move();
        }
    }
}