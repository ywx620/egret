class Puzzle extends egret.DisplayObjectContainer{
    images:egret.Bitmap[]=[];
    checkImages:egret.Bitmap[]=[];
    coltrolMove:control.ControlFingerMove;
    rightOrder:string="";
    imaWidth:number;
    step:number=0;
    constructor() {
       super()
       this.addEventListener(egret.Event.ADDED_TO_STAGE,this.addToStage,this);
    }
    private addToStage():void {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.addToStage,this);
        var texture:egret.Texture = RES.getRes("bg_jpg");
        var poker:egret.SpriteSheet = new egret.SpriteSheet(texture);
        var num:number=3;
        var width:number=640/num;
        var num2:number=Math.floor(1136/width);
        var len:number=num*num2;
        //len=9;
        for(let i:number=0;i<len;i++){
            var x:number=Math.floor(i%num)*width;
            var y:number=Math.floor(i/num)*width;
            poker.createTexture("part", x, y, width, width);
            var part:egret.Texture = poker.getTexture("part");
            var img:egret.Bitmap = new egret.Bitmap();
            img.name=i+"";
            this.rightOrder+=img.name;
            img.texture = part;
            this.images.push(img);
            this.addChild(img);
        }
        //trace(this.rightOrder);
        this.images=ArrayManager.getRandomArray(this.images);
        LayoutManager.displayRank(this.images,num);

        this.imaWidth=width;
        
        // var a:any[]=[1,2,3,4,5,6];
        // var b:any[]=ArrayManager.getRandomArray(a);
        // trace(a.toString(),b.toString())

        this.coltrolMove=new control.ControlFingerMove(this.stage);
        this.coltrolMove.open();
        this.coltrolMove.startBackFun=this.hitImage.bind(this);
        this.coltrolMove.endBackFun=this.hitImage.bind(this);

        this.setStep();
    }
    private setStep():void
    {
        simpleTrace("步数:"+this.step++);
    }
    private hitImage(point:egret.Point):void
    {
        let len=this.images.length;
        for(let i=0;i<len;i++){
            let image:egret.Bitmap=this.images[i];
            if(image.hitTestPoint(point.x,point.y)){
                this.checkImages.push(image);
                break;
            }
        }
        if(this.checkImages.length==2){
            let imageA:egret.Bitmap=this.checkImages[0];
            let imageB:egret.Bitmap=this.checkImages[1];
            if(imageA!=imageB){
                this.coltrolMove.close();
                let ax=imageA.x;
                let ay=imageA.y;
                let bx=imageB.x;
                let by=imageB.y;
                let dx=ax-bx;
                let dy=ay-by;
                let dis=Math.floor(Math.sqrt(dx*dx+dy*dy));
                if(dis<=this.imaWidth){//只有相连的两个才可以换位置
                    let tweenA:egret.Tween=egret.Tween.get(imageA);
                    let tweenB:egret.Tween=egret.Tween.get(imageB);
                    tweenA.to({x:bx,y:by},150).call(this.callback,this);
                    tweenB.to({x:ax,y:ay},150);
                    
                    //把它两在数组中位置换一下
                    let indexA=this.images.indexOf(imageA);
                    let indexB=this.images.indexOf(imageB);
                    this.images.splice(indexA,1,imageB);
                    this.images.splice(indexB,1,imageA);
                }
            }
            this.checkImages.length=0;
        }
    }
    private callback():void
    {
        this.setStep();
        let len=this.images.length;
        let checkOrder:string="";
        for(let i=0;i<len;i++){
            let image:egret.Bitmap=this.images[i];
            checkOrder+=image.name;
        }
        //trace(checkOrder);
        if(this.rightOrder==checkOrder){
            simpleTrace("一共用了"+this.step+"步完成");
        }else{
            this.coltrolMove.open();
        }
    }
}