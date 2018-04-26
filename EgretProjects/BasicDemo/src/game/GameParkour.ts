module GameParkourAction{//枚举数据
    export enum names{stand,walk,run,atk,hurt,jump,jumpTwo,jumpDown};
}
class GameParkour extends egret.DisplayObjectContainer{
    names:string[];
    roleDisplay:egret.Sprite;
    roleBody:p2.Body;
    p2World:P2World;
    roleMaterial = new p2.Material();
    stoneMaterial = new p2.Material();
    isPlay:boolean;
    btnStart:eui.Button;
    speed:number=100;
    distance:number;
    constructor() {
       super()
       this.once(egret.Event.ADDED_TO_STAGE,this.addToStage,this);//只帧听一次然后自动删除
    }
    private addToStage():void {
        this.addChild(moon.MoonUI.getRect(this.stage.stageWidth,this.stage.stageHeight,0XFFFFFF))
        FrameAnimation.getIns().loop();
        FrameAnimation.getIns().addFactoryByName("wukong");
        this.names=[
            GameParkourAction.names[0],
            GameParkourAction.names[1],
            GameParkourAction.names[2],
            GameParkourAction.names[3],
            GameParkourAction.names[4],
            GameParkourAction.names[5],
            GameParkourAction.names[6],
            GameParkourAction.names[7]
            ];
        
        this.createAction(GameParkourAction.names.jumpDown);
        // this.roleDisplay.x=200;
        // this.roleDisplay.y=200;
        // this.addChild(this.roleDisplay);

        
        this.createP2World();
        this.gameInit();
    }
    private gameInit():void
    {
        if(this.btnStart==null){
            var btn:eui.Button=new eui.Button();
            btn.label="开始";
            btn.x=(this.stage.stageWidth-btn.width)>>1;
            btn.y=(this.stage.stageHeight-btn.height)>>1;
            btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.gameStart,this);
            this.btnStart=btn;
        }
        this.speed=100;
        this.jumpNum=0;
        this.distance=0;
        this.addChild(this.btnStart);
        this.initStone();
    }
    private gameStart():void
    {
        this.removeChild(this.btnStart);
        this.isPlay=true;
        this.createAction(GameParkourAction.names.run);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onClick,this);
        this.addEventListener(egret.Event.ENTER_FRAME,this.onLoop,this);
    }
    private gameOver():void
    {
        this.isPlay=false;
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onClick,this);
        this.removeEventListener(egret.Event.ENTER_FRAME,this.onLoop,this);
        //moon.showLog.getIns().log("gameOver");
        this.gameInit();
    }
    private stones:any[]=[];
    private initStone():void
    {
        for(var i:number=0;i<this.stones.length;i++){
            var body:p2.Body=this.stones[i];
            if(body.userData&&body.userData.skin){
                var skin:any=body.userData.skin;
                if(skin&&skin.parent!=null){
                    skin.parent.removeChild(skin);
                }
                //body.userData=null;
            }
            body.velocity=[0,0];
            this.p2World.removeBodys.push(body);
        }
        this.stones.length=0;
        this.createAction(GameParkourAction.names.run);
        this.roleBody.position=[100,330];
        this.roleBody.velocity=[0,0];
        var w:number=400
        var h:number=300;
        this.stones.push(this.createStone(w,h,0));
        var prevx:number=w;
        for(var i:number=0;i<5;i++){
            var w:number=Math.random()*200+200;
            var h:number=Math.random()*150+150;
            this.stones.push(this.createStone(w,h,prevx));
            prevx+=w*1.2+Math.random()*100+100;
        }
    }
    private createP2World():void
    {
        var bg=new eui.Image("zm5Bg_png");
        bg.width=this.stage.stageWidth;
        bg.height=this.stage.stageHeight;
        this.addChild(bg)
        var world:P2World=new P2World(0,200);
        world.world.on("beginContact",this.beginContact.bind(this));
        //world.isDebug=false;
        world.createWall(new egret.Rectangle(0,0,this.width,this.height));
        this.addChild(world);
        var role:p2.Body=world.createBoxCircleBodyShape(100,100);
        //var role:p2.Body=world.createBoxBodyShape(100,100);
        //role.shapes[0].position[1]=-50;
        role.fixedRotation=true;
        role.mass=20;
        role.userData.skin=this.roleDisplay;
        role.userData.name="role";
        role.shapes[0].material=this.roleMaterial;
        //world.drawSkin(role);
        
        this.addChild(this.roleDisplay);

        this.p2World=world;
        this.roleBody=role;

        //中间的透明阻挡物
        this.createStone(20,this.stage.stageHeight,this.stage.stageWidth>>1,"middle");
    }
    private createAction(index:number):void
    {
        this.roleDisplay=FrameAnimation.getIns().getAnimationSpriteByName(this.names[index]);
        this.addChild(this.roleDisplay);
    }
    private addStone():void
    {
        var body:p2.Body=this.stones[this.stones.length-1];
        var prevx:number=body.position[0];
        var w:number=Math.random()*200+200;
        var h:number=Math.random()*150+150;
        prevx+=w*1.2+Math.random()*100+this.speed;
        this.stones.push(this.createStone(w,h,prevx));
    }
    private createStone(width:number,height:number,x:number,name:string=null):p2.Body
    {
        var stageH:number=this.stage.stageHeight;
        var image:eui.Image=new eui.Image("zm5Ft_png");
        image.scale9Grid=new egret.Rectangle(70,35,2,2);
        image.height=height;
        image.width=width;
        this.addChild(image);
        image.anchorOffsetX=image.width>>1;
        image.anchorOffsetY=(image.height>>1)+15;
        if(name=="middle"){
            image.visible=false;
        }
        var y=stageH-(image.height>>1);
        image.x=x;
        image.y=y;
        
        var body:p2.Body=this.p2World.createBoxBodyShape(image.width,image.height,p2.Body.KINEMATIC);
        body.userData.skin=image;
        body.userData.name=name||"stone";
        body.position=[x,y];
        

        body.shapes[0].material=this.stoneMaterial;
        var roleAndStoneMaterial = new p2.ContactMaterial(this.roleMaterial, this.stoneMaterial, {restitution:0,friction:0});//弹性，摩擦力
        this.p2World.world.addContactMaterial(roleAndStoneMaterial);
        return body;
    }
    private jumpNum:number=2;
    private onClick(e:egret.TouchEvent):void
    {
        this.createAction(GameParkourAction.names.jump);
        if(this.jumpNum<2){
            this.jumpNum++;
            //var vy:number=Math.abs(this.roleBody.velocity[1]);
            //vy=vy>100?100:vy;
            //var y=-1*(vy*10+3000);
            //moon.showLog.getIns().logMessage("y="+this.roleBody.velocity[1]+",vy="+vy);
            this.roleBody.velocity[1]=0;
            var y=-3000;
            this.roleBody.applyImpulse([0,y],[0,0]);
            if(this.jumpNum==2){
                this.createAction(GameParkourAction.names.jumpTwo);
            }
        }
    }
    private beginContact(e:any):void
    {
        // egret.log(e.shapeA,e.bodyA.userData.name)
        // egret.log(e.shapeB,e.bodyB.userData.name)
        var nameA:string=e.bodyA.userData.name;
        var nameB:string=e.bodyB.userData.name;
        var yA:number=e.bodyA.position[1];
        var yB:number=e.bodyB.position[1];
        var bodyA:p2.Body=e.bodyA;
        var bodyB:p2.Body=e.bodyB;
        //moon.showLog.getIns().log("nameA="+hA+",nameB="+hB);
        //egret.log(bodyA.getAABB().lowerBound,bodyB.getAABB().upperBound);
        if(nameA=="stone"||nameB=="stone"){
            var isRun:boolean=false;
            if(nameA=="stone"){
                yA=bodyA.getAABB().lowerBound[1];
                yB=bodyB.getAABB().upperBound[1];
            }else{
                yA=bodyA.getAABB().upperBound[1];
                yB=bodyB.getAABB().lowerBound[1];
            }
           // egret.log(Math.abs(yA-yB))
            if(Math.abs(yA-yB)<20){
                isRun=true;
            }else{
                this.gameOver();
            }
        }
        if(isRun){
            this.jumpNum=0;
            if(this.isPlay){
                this.createAction(GameParkourAction.names.run);
            }else{
                this.createAction(GameParkourAction.names.stand);
            }
        }
         
    }
    private onLoop():void
    {
        var vy:number=this.roleBody.velocity[1];
        var posY:number=this.roleBody.position[1];
        if(vy>100){
             this.createAction(GameParkourAction.names.jumpDown);
        }
        if(posY>this.stage.stageHeight){
            this.gameOver();
        }else{
            var bodys=this.p2World.world.bodies;
            var l: number = bodys.length;
            trace("奔跑:"+this.distance+"米");
            this.distance+=Math.floor(this.speed/100)
            for (var i: number = 0; i < l; i++) {
                var body: p2.Body = bodys[i];
                if(body.userData){
                    if(body.userData.name=="stone"){
                        var stoneW:number=body.userData.skin.width
                        body.velocity[0]=-this.speed;
                        this.roleBody.velocity[0]=this.speed*1.2;
                        if(body.position[0]<-stoneW){
                            this.p2World.removeBodys.push(body);
                            this.speed+=10;
                            this.addStone();
                        }
                    }
                }
            }
        }
    }
}