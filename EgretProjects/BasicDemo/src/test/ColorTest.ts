/**
var matrix:Array = new Array();
						R  ,G,  B,  A, offset //RGB透明值与偏移值
matrix = matrix.concat([1,  0,  0,  0,  0]); // red   红色通道
matrix = matrix.concat([0,  1,  0,  0,  0]); // green 绿色通道
matrix = matrix.concat([0,  0,  1,  0,  0]); // blue  蓝色通道
matrix = matrix.concat([0,  0,  0,  1,  0]); // alpha 透明通道
上面是matrix的初始状态。
例子：red通道的值：（1，0，0，0，0）表示，R通道的乘数是1（完全保留），别的道道的的乘数是0，
（不加入别的通道的颜色），色彩偏移量off是0；
*/
class ColorTest extends moon.MoonContainer{
    lightBar:moon.SliderBar;
    cBar:moon.SliderBar;
	skin:eui.Image;
    protected render():void
    {
        this.skin=new eui.Image("bg_jpg");
		this.addChild(this.skin);

		this.lightBar=new moon.SliderBar();
		this.lightBar.x=this.lightBar.y=50;
		this.addChild(this.lightBar);
		this.lightBar.value=0.5;
		this.lightBar.addEvent(moon.MoonEvent.MOVE,this.move,this);
        this.lightBar.showText("亮度调整",50);

        this.cBar=new moon.SliderBar();
		this.cBar.x=this.cBar.y=120;
		this.addChild(this.cBar);
		this.cBar.value=0.5;
		this.cBar.addEvent(moon.MoonEvent.MOVE,this.move,this);
        this.cBar.showText("对比调整",120);

        var btns:any[]=[];
        var names:any[]=["取消","变灰","反色"];
        for(var i:number=0;i<names.length;i++){
            var btn:moon.BasicButton=new moon.BasicButton;
            btn.label=names[i];
            this.addChild(btn);
            btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClick,this)
            btns.push(btn);
        }
        LayoutManager.displayRank(btns,5,10,10,20,200);
        this.skin.filters = [new egret.ColorMatrixFilter([
                            1, 0, 0, 0, 0,
                            1, 0, 0, 0, 0,
                            1, 0, 0, 0, 0,
                            0, 0, 0, 1, 0
        ])]
	}
    private onClick(e:moon.MoonEvent):void
	{
        switch(e.currentTarget["label"]){
            case "变灰":
            this.setColorGray(this.skin);
            break;
            case "取消":
            this.skin.filters=[];
            break;
            case "反色":
            this.setColorReverse(this.skin);
            break;
        }
    }
	private move(e:moon.MoonEvent):void
	{
        var bar:moon.SliderBar=e.currentTarget as moon.SliderBar;
        if(bar==this.lightBar){
            var value:number=(bar.value-0.5)*2;
            value*=255;
            this.setColorLight(this.skin,value);
        }else{
            value=(bar.value)*10;
            traceSimple(value)
            this.setColorContrast(this.skin,value);
        }
	}
	/**设置可示对象是否为灰色 */
    public setColorGray(image:egret.DisplayObject):void
    {
         image.filters = [new egret.ColorMatrixFilter([
                            0.3, 0.6, 0.08, 0, 0,
                            0.3, 0.6, 0.08, 0, 0,
                            0.3, 0.6, 0.08, 0, 0,
                            0, 0, 0, 1, 0
        ])]
    }
    /**设置可示对象的明亮度值在-255到255,默认为0*/
    public setColorLight(image:egret.DisplayObject,offset:number=0):void
    {
        image.filters = [new egret.ColorMatrixFilter([
                            1, 0, 0, 0, offset,
                            0, 1, 0, 0, offset,
                            0, 0, 1, 0, offset,
                            0, 0, 0, 1, 0
        ])]
    }
    /**反色*/
    public setColorReverse(image:egret.DisplayObject):void
    {
        image.filters = [new egret.ColorMatrixFilter([
                            -1, 0, 0, 0, 255,
                            0, -1, 0, 0, 255,
                            0, 0, -1, 0, 255,
                            0, 0, 0, 1, 0
        ])]
    }
    /**对比度 N取值为0到10*/
    public setColorContrast(image:egret.DisplayObject,N:number=1):void
    {
        image.filters = [new egret.ColorMatrixFilter([
                            N,0,0,0,128*(1-N),
                            0,N,0,0,128*(1-N),
                            0,0,N,0,128*(1-N),
                            0,0,0,1,0,
        ])]
    }
    

}