class MyPanel extends eui.UILayer {
    constructor() {
        super();
        var panel = new StartPanel();
        this.addChild(panel);
    }
}
class StartPanel extends BasicComponent {
    map:eui.Image;
    enemyContainer:eui.Component;
    airship:eui.Image;
    controlBg: eui.Image;
    controlBar: eui.Image;
    aim:eui.Image;
    container:eui.Component;
    btnFire:eui.Button;
    btnSet:eui.Button;
    setPanel:SetPanel;
    txtScore:eui.Label;
    score:number=0;
    isMoveMap:boolean;//是否移动地图
    isFire:boolean;//是否开火
    conA:number=0;
    sinA:number=0;
    dis:number=0;
    point:egret.Point;
    bullets:any[]=[];
    enemys:any[]=[];
    btns:any[]=[];
    constructor() {
        super();
        this.point=new egret.Point;
        this.setSkinName("resource/eui_skins/APP_GameSkin.exml");
    }
    protected render(): void {
        //egret.log(this.controlBar);
        
        this.initSount()

        SystemSetManager.getIns().initData();
        // this.controlBar.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
        // this.controlBg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
        // this.btnFire.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
        this.btns.push(this.controlBar,this.controlBg,this.btnFire);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);

        this.btnSet.addEventListener(egret.TouchEvent.TOUCH_TAP,(e:any)=>{this.addChild(this.setPanel)},this)
        egret.startTick(this.loop, this);
        this.addEnemy();

        this.txtScore.text=Const.VER;

        this.setPanel=new SetPanel();
        this.setPanel.backFunction=this.backFunction.bind(this);
        this.backFunction();

    }
    private backFunction():void
    {
         this.showView();
    }
    protected initSount():void
    {
        SoundControl.getIns().addItem("fire_mp3");
        SoundControl.getIns().addItem("bomb_mp3");
        SoundControl.getIns().addItem("bgSound2_mp3",true);

        SoundControl.getIns().play("bgSound2_mp3",0,99);
        SoundControl.getIns().setBgVolume(Const.SOUND_BG);
        SoundControl.getIns().setEffectVolume(Const.SOUND_EFFECT);
    }

    public showView():void
    {
        var boo:boolean=SystemSetManager.getIns().getData().showShip
        this.airship.visible=boo;
    }
    //egret 在执行 startTick 的回调时，会给予参数 timeStamp(当前时间戳)
    private loop(timeStamp:number):boolean {
        if(this.isMoveMap){
            this.controlAirMap();
        }
        var bs:any[]=this.bullets;
        var enemys=this.enemys;
        var aim=this.aim;
        for(var i=0;i<bs.length;i++){
            var b=bs[i];
            var dy=b.targetY-b.y;
            var dx=b.targetX-b.x;
            b.y+=dy/5;
            b.x+=dx/5;
            if(Math.abs(dy)<1){
                for(var j=0;j<enemys.length;j++){
                    var enemy=enemys[j];
                    enemy.checkHit(b);
                }
                this.container.removeChild(b);
                bs.splice(i,1);
                i--;
            }
        }

       
        if(Math.random()<0.01){
            this.addEnemy();
        }
        for(i=0;i<enemys.length;i++){
            enemy=enemys[i];
            enemy.loop();
            
        }
        return false;
    }
    private addEnemy():void{
        if(this.enemys.length<Const.MAX_ENEMY){
            var enemy=new EnemyData("enemy_png");
            enemy.addEventListener(Const.REMOVE,this.removeEnemy,this)
            this.enemyContainer.addChild(enemy);
            this.enemys.push(enemy);
        }
    }
    private removeEnemy(e:egret.Event):void{
        var enemy=e.currentTarget;
        enemy.removeEventListener(Const.REMOVE,this.removeEnemy,this)
        this.enemyContainer.removeChild(enemy);
        this.enemys.splice(this.enemys.indexOf(enemy),1);

        SoundControl.getIns().play("bomb_mp3");
        this.score++;
        this.txtScore.text="score："+this.score;
    }
    protected onTouch(e: egret.TouchEvent){
        var id:number=e.touchPointID;
        var sX:number=e.stageX;
        var sY:number=e.stageY;
        switch (e.type) {
                case egret.TouchEvent.TOUCH_BEGIN:
                    for(var i:number=0;i<this.btns.length;i++){
                        var display:any=this.btns[i];
                        if(display.hitTestPoint(sX,sY)){
                            if(display==this.btnFire){
                                this.fireStart();
                                display.name="fire_"+id;
                            }else{
                                this.isMoveMap=true;
                                this.controlStart();
                                display.name="control_"+id;
                            }
                            
                        }
                    }
                    break;
                case egret.TouchEvent.TOUCH_MOVE:
                   for(var i:number=0;i<this.btns.length;i++){
                        var display:any=this.btns[i];
                        var names:string[]=display.name.split("_")
                        var did:number=parseInt(names[1]);
                        var dname:string=names[0]
                        if(did==id){
                            if(dname=="control"){
                                this.controlMove(e.stageX,e.stageY);
                            }
                        }
                    }
                    break;
                case egret.TouchEvent.TOUCH_END:
                    for(var i:number=0;i<this.btns.length;i++){
                        var display:any=this.btns[i];
                        var names:string[]=display.name.split("_")
                        var did:number=parseInt(names[1]);
                        var dname:string=names[0]
                        if(did==id){
                            if(dname=="control"){
                                this.isMoveMap=false;
                                this.controlEnd();
                            }else{
                                this.fireEnd();
                            }
                        }
                    }
                    break;
            }
    }
    private controlStart(): void {
        //egret.log("start");
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
    }
    private controlMove(x:number,y:number): void {
        this.point.x=x;
        this.point.y=y;
        var bg=this.controlBg;
        var bar=this.controlBar;
        
        var cx=bg.x;
        var cy=bg.y;
        var dx=x-cx;
        var dy=y-cy;
        var ds=Math.sqrt(dx*dx+dy*dy);
        var r=bg.width>>1;
        var conA=dx/ds;
        var sinA=dy/ds;
        if(ds<r){//在边内时的处理
            bar.x=x;
            bar.y=y;
            this.dis=ds;
        }else{//超出边界时的处理
            bar.x=cx+conA*r;
            bar.y=cy+sinA*r;
            this.dis=r;
        }
        this.conA=conA;
        this.sinA=sinA;
        
        this.controlAirship(conA,sinA);
    }
    private controlEnd(): void {
        //egret.log("end");
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);

        var bg=this.controlBg;
        var bar=this.controlBar;
        bar.x=bg.x;
        bar.y=bg.y;
        this.aim.x=this.stage.stageWidth>>1;
        this.aim.y=this.stage.stageHeight>>1;

        this.airship.rotation=0;
    }
    private fireStart():void
    {
        this.isFire=true;
        this.sendBullet();
        this.btnFire.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouch, this);
        this.btnFire.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
    }
    private fireEnd():void
    {
        this.isFire=false;
        this.btnFire.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouch, this);
        this.btnFire.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
    }
    private sendBullet():void
    {
        //egret.log(this.isFire);
        if(this.isFire){
            if(SystemSetManager.getIns().getData().fireIsContinue){
                var time:number=1000/SystemSetManager.getIns().getData().fireCount;
                egret.setTimeout(this.sendBullet,this,time);
            }else{
                this.fireEnd();
            }
            var image=new Buttlet("bullet_png")//new egret.Bitmap(RES.getRes("bullet_png"));
            image.x=this.stage.stageWidth/2;
            image.y=this.stage.stageHeight;
            image.targetX=this.aim.x;
            image.targetY=this.aim.y;
            image.changeAngle();
            image.anchorOffsetX=image.width>>1;
            this.container.addChild(image);
            this.bullets.push(image);
            SoundControl.getIns().play("fire_mp3");
        }
    }
    private controlAirship(conA,sinA):void{
        if(SystemSetManager.getIns().getData().turnShip){
            var ship:eui.Image=this.airship;
            var angle=(this.controlBar.x-this.controlBg.x)/20;
            ship.rotation=angle;
        }
        if(SystemSetManager.getIns().getData().aimIsMove){
            var aim:eui.Image=this.aim;
            var bar:eui.Image=this.controlBar;
            var bg:eui.Image=this.controlBg;
            var r:number=bg.width/2;
            var minx:number=bar.x-bg.x;
            var miny:number=bar.y-bg.y;
            var maxx:number=this.stage.stageWidth/2;
            var maxy:number=this.stage.stageHeight/2;
            aim.x=maxx+minx/r*maxx;
            aim.y=maxy+miny/r*maxy;
        }
    }
    private controlAirMap():void{
        if(!SystemSetManager.getIns().getData().mapIsMove) return;
        var conA=this.conA;
        var sinA=this.sinA;
        var ds=this.dis;
        var map:eui.Image=this.map;
        var conBg=this.controlBg;
        var p=this.point;

        var minx=0;
        var miny=0;
        var maxx=this.stage.stageWidth;
        var maxy=this.stage.stageHeight;
        var x=map.x;
        var y=map.y;

        if(x<minx){
            map.x=minx;
        }else if(x>maxx){
            map.x=maxx;
        }else if(y<miny){
            map.y=miny;
        }else if(y>maxy){
            map.y=maxy;
        }else{
             map.x-=conA*ds*0.03;
             map.y-=sinA*ds*0.03;
        }
        this.enemyContainer.x=map.x;
        this.enemyContainer.y=map.y;
    }
}
