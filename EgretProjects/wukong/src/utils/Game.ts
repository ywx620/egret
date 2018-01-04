module cg{//枚举数据
    export enum names{stand,walk,run,atk,hurt,jump,jumpTwo,jumpDown};
}
class Game extends BasicComponent
{
    private kb:KeyBoard;
    private names:string[];
    private nameIndex:number=0;
    private role:egret.Sprite;
    private bodyRole:p2.Body;
    private keyData:Object={};
    private walkNum:number=500;
    private jumpNum:number=500;
    public constructor() {
        super();
        this.setSkinName("resource/map.exml");
    }
    protected render(): void {
        this.initRole();
        this.initWorld();
        this.initKeyboard();
    }
    private initRole():void {
        FrameAnimation.getIns().loop();
        FrameAnimation.getIns().addFactoryByName("wukong");
        this.names=["stand","walk","run","atk","hurt","jump","jumpTwo","jumpDown"];
        //egret.log(cg.names[cg.names.atk]=="atk")
        
        this.role=FrameAnimation.getIns().getAnimationSpriteByName(this.names[this.nameIndex]);
        this.role.x=200;
        this.role.y=200;
        this.addChild(this.role);
    }
    private initWorld():void{
        var world:P2World=new P2World();
        world.loopBackFun=this.loop.bind(this);
        world.isDebug=false;//是否显示刚体现状
        this.addChild(world);
        for(var i=0;i<this.numChildren;i++){
            var image:eui.Image=this.getChildAt(i) as eui.Image;
            if(image instanceof eui.Image){
                world.index++;
                var body:p2.Body;
                if(image.name!="bg"){
                    body=world.createBoxBodyShape(image.width,image.height,world.index,p2.Body.KINEMATIC);
                    world.drawSkin(body);
                    image.visible=false;
                }
                if(body){
                    body.position[0]=image.x;
                    body.position[1]=image.y;
                }
            }
        }
        var role:egret.Sprite=this.role;
        world.index++;
        body=world.createBoxCircleBodyShape(role.width,role.height,world.index);
        body.fixedRotation=true;
        world.drawSkin(body);
        body.position[0]=role.x;
        body.position[1]=role.y;
        this.bodyRole=body;
        role.name=body.id+"";
        world.skins.push(role);
    }
    private initKeyboard():void
    {
        this.kb = new KeyBoard();
       //添加监听事件
       this.kb.addEventListener(KeyBoard.onkeydown,this.onkeydown,this);

        //使用自身的按键松开事件
       this.addKeyboardEvent("keyup",this.onkeyup);


       //KeyBoard的键盘按键被松开时的事件不起作用
       //this.kb.addEventListener(KeyBoard.onkeyup,this.onkeyup,this);
       //移除事件监听
       //kb.removeEventListener(KeyBoard.onkeydown,this.onkeydown,this);
       //egret.log(KeyBoard.onkeydown,KeyBoard.onkeyup);
    }
    private getTimer():number
    {
        var d:Date=new Date();
        return d.getTime();
    }
    private addKey(key:string):void
    {
        var keyData:Object=this.keyData;
        var keyCode:string=key;
        if(!keyData.hasOwnProperty(keyCode)){
            var kd:Object={keyCode:keyCode};
            keyData[keyCode]=kd
            if(keyCode==KeyBoard.A||keyCode==KeyBoard.D||keyCode==KeyBoard.K){
                kd["time"]=this.getTimer();
                kd["value"]=0;
            }else{
                kd["value"]=-1;
            }
        }else{
            kd=keyData[keyCode]
            if(keyCode==KeyBoard.K){
                kd["value"]=2;
            }else{
                var startTime:number=kd["time"];
                var endTime:number=this.getTimer();
                if(endTime-startTime<=200){
                    kd["value"]=2;
                }else{
                    kd["value"]=-1;
                }
            }
        }
    }
    private removeKey(key:string):void
    {
        var keyData:Object=this.keyData;
        var keyCode:string=key;
        var kd:Object=keyData[keyCode];
        if(kd&&kd.hasOwnProperty("value")){
            var value:number=kd["value"];
            if(value==2||value==-1){
                delete keyData[keyCode];
            }else{
                kd["value"]=1;
            }
        }
        if(keyCode=="-1"){
            for(var keyCode in keyData){
                delete keyData[keyCode];
            }
        }
    }
    private onkeydown(event:egret.Event){
    	 //获取的按键数据为一个数组
         //egret.log(event.data);
        
         var nameIndex:number=this.nameIndex;
         var names:string[]=this.names;
         var role:egret.Sprite=this.role;
         var body:p2.Body=this.bodyRole;
         var walkNum:number=this.walkNum;
         var jumpNum:number=this.jumpNum;
         if(this.kb.isContain(event.data,KeyBoard.A)){
             if(role.scaleX!=-1){
                 role.scaleX=-1;
             }
             this.updateRole(cg.names.walk);
             if(this.nameIndex==cg.names.walk){
                 this.bodyRole.applyForce([-walkNum,0],[0,0])
             }
         }else if(this.kb.isContain(event.data,KeyBoard.D)){
             if(role.scaleX!=1){
                 role.scaleX=1;
             }
             this.updateRole(cg.names.walk)
             if(this.nameIndex==cg.names.walk){
                this.bodyRole.applyForce([walkNum,0],[0,0])
             }
         }
         if(this.kb.isContain(event.data,KeyBoard.K)){
             if(nameIndex!=cg.names.jump){
                this.updateRole(cg.names.jump);
                this.bodyRole.applyImpulse([0,-jumpNum],[0,0]);
             }
         }

         this.addKey(event.data[0]);
    }
    private updateRole(index:number):void{
        if(this.nameIndex==cg.names.jump||this.nameIndex==cg.names.jumpDown){
            if(index==cg.names.walk) return;
        }
        if(index!=this.nameIndex){
            //egret.log("index",index,this.nameIndex)
            this.role=FrameAnimation.getIns().getAnimationSpriteByName(this.names[index]);
            this.nameIndex=index;
            if(index==cg.names.stand){
                this.bodyRole.velocity[0]=0;
                this.bodyRole.velocity[1]=0;
                this.removeKey("-1");
            }
            if(index==cg.names.walk){
                var sx=this.role.scaleX;
                this.bodyRole.applyImpulse([sx*350,0],[0,0]);
            }
        }
    }
    private onkeyup(data:any){
         //egret.log(data.keyCode,this,data.self,KeyBoard.D);
          var self=data.self;
         var key:string=data.key;
         key=key.toUpperCase();
         self.removeKey(key);
         
         //egret.log(key==KeyBoard.D)
        
         //var body:p2.Body=self.bodyRole;
        // self.role=FrameAnimation.getIns().getAnimationSpriteByName("wukong",self.names[self.nameIndex]);
     }
     private loop():void
     {
         //this.bodyRole;
         var body:p2.Body=this.bodyRole;
         var vx:number=Math.round(body.velocity[0]);
         var vy:number=Math.round(body.velocity[1]);
         var walkNum:number=this.walkNum;
         var jumpNum:number=this.jumpNum;
         if(vy>0){//下落
             this.updateRole(cg.names.jumpDown);
         }else if(vy<-jumpNum){//起跳
             this.updateRole(cg.names.jump);
         }
         var isStand:boolean=true;
         var keyData:Object=this.keyData;
         for(var keyCode in keyData){
             isStand=false;
             var kd:Object=keyData[keyCode];
             egret.log("keyCode",keyCode,kd["value"]);
             if(kd&&kd.hasOwnProperty("value")){
                 if(kd["value"]==2){
                     switch(keyCode){
                         case KeyBoard.A:
                         case KeyBoard.D:
                         this.updateRole(cg.names.run);
                         break;
                         case KeyBoard.K:
                         this.updateRole(cg.names.jumpTwo);
                         break;
                     }
                 }
             }
         }
        if(Math.abs(vy)<30&&isStand){//站立
              this.updateRole(cg.names.stand);
         }
     }
}
