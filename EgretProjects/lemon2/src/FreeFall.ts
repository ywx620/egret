class FreeFall extends egret.DisplayObjectContainer{
    private shapes=[];
    public constructor() { 
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
        
    }
    
 private onAddToStage(event:egret.Event){
     var drawManager=new DrawManager();
     this.addChild(drawManager.createRect(0,0,this.stage.stageWidth,this.stage.stageHeight));
     for(var i=0;i<100;i++){
        var circle=drawManager.createCircle(Math.random()*this.stage.stageWidth,0,10,Math.random()*0XFFFFFF);
        var node=new DrawNode(circle);
        node.vy=Math.random()*2;
        this.addChild(node);
        this.shapes.push(node);
     }
     this.stage.addEventListener(egret.Event.ENTER_FRAME,this.onLoop,this);
 }
 private onLoop(e:egret.Event){
    for(var i=0;i<this.shapes.length;i++){
        var node= this.shapes[i];
        var s=node.g;
         node.vy+=(s*node.reverseY);
         node.y+=node.vy*node.reverseY;
         if(node.y>this.stage.stageHeight){
             node.y=this.stage.stageHeight;
             node.reverseY*=-1;
            node.g+=0.1;
         }
     }
 }
}
