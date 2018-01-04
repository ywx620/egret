class Game extends BasicComponent
{
    ball:p2.Body;
    label:egret.TextField;
    world:P2World;
    power:number=1;
    public constructor() {
        super();
        this.setSkinName("resource/eui_game.exml");
        SoundControl.getIns().addItem("hole_mp3");
        SoundControl.getIns().addItem("hit_mp3");
    }
    protected render(): void {
        var world:P2World=new P2World();
        this.world=world;
        this.addChild(world);
        world.isDebug=false;
        var BALL = Math.pow(2,0),//1000
        WALL =  Math.pow(2,1),//0100
        HOLE = Math.pow(2,2)//0010
        var ballMaterial = new p2.Material();
        var wallMaterial = new p2.Material();
        this.label=new egret.TextField();
        this.label.text="力度："+this.power;
        this.addChild(this.label);

        var control:egret.TextField=new egret.TextField();
        control.text="拖动手指来控制力量";
        control.x=200;
        this.addChild(control);

        for(var i=0;i<this.numChildren;i++){
            var image:eui.Image=this.getChildAt(i) as eui.Image;
            if(image instanceof eui.Image){
                var body:p2.Body;
                var names=image.name.split("_");
                var shape:p2.Shape;
                if(names[0]=="ball"){
                    //image.width=image.height=42;
                    body=world.createCircleBodyShape(image.width/2);
                    shape=body.shapes[0];
                    body.userData=image;
                    if(names[1]=="0"){
                        this.ball=body;
                    }
                    shape.material=ballMaterial;
                   // shape.collisionGroup=WALL;
                }else if(image.name!="bg"){
                    var angle:number=image.rotation*Math.PI/180;
                    body=world.createBoxBodyShape(image.width,image.height,p2.Body.KINEMATIC,angle);
                    shape=body.shapes[0];
                    body.userData=image;
                    image.visible=false;
                    shape.material=wallMaterial;
                }
               
                if(body){
                    body.damping=0.2;
                    body.angularDamping=0.3;
                    body.mass=500;
                    world.drawSkin(body);
                    body.position[0]=image.x;
                    body.position[1]=image.y;
                    body.inertia=0;
                }
            }
        }
        //球与球的弹性
        var ballAndBallMaterial = new p2.ContactMaterial(ballMaterial, ballMaterial, {restitution : 0.8});//弹性
        world.p2World.addContactMaterial(ballAndBallMaterial);
        //球与桌边的弹性
        var ballAndWallMaterial = new p2.ContactMaterial(ballMaterial, wallMaterial, {restitution : 0.5});//弹性
        world.p2World.addContactMaterial(ballAndWallMaterial);

        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onClick,this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END,this.onClick,this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onClick,this);
        world.p2World.on("beginContact",this.beginContact.bind(this));
    }
    private startPoint:egret.Point;
    private onClick(e:egret.TouchEvent):void
    {
        if(e.type==egret.TouchEvent.TOUCH_BEGIN){
           this.startPoint=new egret.Point(e.stageX,e.stageY);
        }else if(e.type==egret.TouchEvent.TOUCH_MOVE){
            var endPoint=new egret.Point(e.stageX,e.stageY);
            var xx=endPoint.x-this.startPoint.x;
            var yy=endPoint.y-this.startPoint.y;
            var dd:number=Math.sqrt(xx*xx+yy*yy);
            this.power=dd*0.05;
            this.label.text="力量："+Math.floor(this.power);
        }else if(e.type==egret.TouchEvent.TOUCH_END){
            var ran:number=this.power//Math.random()*2+2;
            var x1:number=this.ball.position[0];
            var y1:number=this.ball.position[1];
            var x2:number=this.startPoint.x-x1;
            var y2:number=this.startPoint.y-y1;
            var ds:number=Math.sqrt(x2*x2+y2*y2);
            var x:number=x2*ran;
            var y:number=y2*ran;
            this.ball.applyImpulse([x,y],[5,0]);
        }
        
        //this.ball.applyForce([x,y],[0,0]);
    }
    private beginContact(e:any):void
    {
        // egret.log(e.shapeA,e.bodyA.userData.name)
        // egret.log(e.shapeB,e.bodyB.userData.name)
        var nameA:string=e.bodyA.userData.name;
        var nameB:string=e.bodyB.userData.name;
        var body:p2.Body;
        var xA=e.bodyA.velocity[0];
        var yA=e.bodyA.velocity[1];
        var xB=e.bodyB.velocity[0];
        var yB=e.bodyB.velocity[1];
        var v=Math.sqrt(Math.abs(xA*xB)+Math.abs(yA*yB));
        if(v>50){
            SoundControl.getIns().play("hit_mp3");
        }
        if(nameA=="hole"){
            if(nameB=="ball_0"){
                body=e.bodyB;
            }else{
                this.world.removeBodys.push(e.bodyB);
                SoundControl.getIns().play("hole_mp3");
            }
        }else if(nameB=="hole"){
            if(nameA=="ball_0"){
                body=e.bodyA;
            }else{
                this.world.removeBodys.push(e.bodyA);
                SoundControl.getIns().play("hole_mp3");
            }
        }
        if(body!=null){
            body.position=[800,300];
            body.velocity=[0,0];
            body.force=[0,0];
            body.angularForce=0;
            SoundControl.getIns().play("hole_mp3");
        }
    }
}
