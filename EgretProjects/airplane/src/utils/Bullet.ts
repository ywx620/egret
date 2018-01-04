class Buttlet extends egret.Sprite {
    private skin:egret.Bitmap;
    public targetX:number=0;
    public targetY:number=0;
    constructor(name:string) {
        super();
        this.render(name);
    }
    private render(name:string) {
        this.skin=this.createBitmapByName(name);
        this.addChild(this.skin);
    }
    protected createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    public changeAngle():void
    {
        var x=this.targetX-this.x;
        var y=this.targetY-this.y;
        var d=Math.sqrt(x*x+y*y);
        this.rotation=x/d*180/Math.PI;
    }
}