class DrawManager extends egret.HashObject {
    public constructor() {
        super();
    }
    public createRect(x:number,y:number,w:number,h:number,c:number=0,a:number=1){
        var shape:egret.Shape=new egret.Shape();
        shape.graphics.beginFill(c,a);
        shape.graphics.drawRect(x,y,w,h);
        return shape;
    }
    public createCircle(x:number,y:number,r:number,c:number=0,a:number=1){
        var shape:egret.Shape=new egret.Shape();
        shape.graphics.beginFill(c,a);
        shape.graphics.drawCircle(x,y,r);
        return shape;
    }
}
class DrawNode extends egret.Sprite{
    public vx:number=0;
    public vy:number=0;
    public reverseY:number=1;
    public g:number=0.5;
    private node:egret.Shape;
    public constructor(n:egret.Shape) {
        super();
        this.node=n;
        this.addChild(n);
    }
}