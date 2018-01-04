class ControlTest extends moon.MoonContainer{
    controlAutoMove:control.ControlBarMove;
    protected render():void
    {
        var controlBg:Sprite=moon.MoonUI.getCircle(100,0Xffff00);
        var controlBar:Sprite=moon.MoonUI.getCircle(20,0X00ff00);
        var controlAuton:control.ControlBarMove=new control.ControlBarMove(this.stage,controlBar,controlBg);
        //controlAuton.open();
        controlBg.x=controlBar.x=this.stage.stageWidth>>1;
        controlBg.y=controlBar.y=this.stage.stageHeight>>1;
        this.addChild(controlBg);
        this.addChild(controlBar);

        var image:ImageIcon=new ImageIcon("tips_png");
        this.addChild(image);
        var controlDrag:control.ControlDrag=new control.ControlDrag(this.stage,image);
        controlDrag.endBackFun=function():void{image.x=0}//返回函数处理
        controlDrag.open();
    }
}