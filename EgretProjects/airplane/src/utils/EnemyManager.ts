class EnemyData extends egret.Sprite {
    private skin:egret.Bitmap;
    private radius:number;
    public vx:number=0;
    public vy:number=0;
    public blood:number=2;
    constructor(name:string) {
        super();
        this.render(name);
    }
    private render(name:string) {
        this.skin=this.createBitmapByName(name);
        this.addChild(this.skin);
        var dx=this.skin.width/2;
        var dy=this.skin.height/2;
        this.radius=Math.sqrt(dx*dx+dy*dy);
        this.skin.x=-dx;
        this.skin.y=-dy;
        this.x=Math.random()*Const.MAP_WIDTH;
        this.y=Math.random()*Const.MAP_HEIGHT;
        this.vx=Math.random()*4;
        this.vy=Math.random()*4;
        //this.x=1136;
        //this.y=640
        //this.alpha=0.1;
       // this.scaleX=this.scaleY=0.1;

        
    }
    protected createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    public loop():void
    {
    //     var speed:number=0.01;
    //    // if(this.alpha<1){
    //       // this.scaleX-=speed;
    //       // this.scaleY-=speed;
    //       // this.alpha+=speed;
    //    // }
    //     var x=(Const.CENTER_X-this.x)/100;
    //     var y=(Const.CENTER_Y-this.y)/100;
    //     this.x+=x;
    //     this.y+=y;
    //     if(Math.sqrt(x*x+y*y)<1){
    //        this.removeSelf();
    //     }
        this.x+=this.vx;
        this.y+=this.vy;
        var x=this.x,y=this.y;
        var minx=0,maxx=Const.MAP_WIDTH;
        var miny=0,maxy=Const.MAP_HEIGHT;
        if(x<minx){
            this.vx*=-1;
        }else if(x>maxx){
            this.vx*=-1;
        }else if(y<miny){
            this.vy*=-1;
        }else if(y>maxy){
            this.vy*=-1;
        }
    }
    public checkHit(b:egret.Bitmap):void
    {
        var p:egret.Point=this.parent.localToGlobal(this.x,this.y);
        var dx=b.x-p.x;
        var dy=b.y-p.y;
        var dis=Math.sqrt(dx*dx+dy*dy);
        if(dis<this.radius){
            this.blood--;
            if(this.blood==0){
                this.removeSelf();
            }
        }
    }
    private removeSelf():void{
        this.dispatchEvent(new egret.Event(Const.REMOVE));
    }
}