class TestSkinClass extends BasicComponent
{
    btn:eui.Button;
    group:eui.Group;
    constructor() {
        super();
        this.setSkinName("resource/askins/TestSkin.exml");
    }
    protected render():void
    {
        moon.showLog.getIns().setLogMessageColor(0);
        for(var i:number=0;i<this.numChildren;i++){
            var image:any=this.getChildAt(i) as any;
            trace(image instanceof eui.Button,image.name,image.x,image.y);
            if(image instanceof eui.Group){
                for(var j:number=0;j<image.numChildren;j++){
                    var im:eui.Button=image.getChildAt(j) as eui.Button;
                    trace("button=",im.x,im.y)
                    var p:egret.Point=image.localToGlobal(im.x,im.y);//坐标转全局
                    trace(p.x,p.y)
                }
            }
        }
        var p:egret.Point=this.group.globalToLocal(this.btn.x,this.btn.y);//坐标转地方
         trace(p.x,p.y);
    }
}