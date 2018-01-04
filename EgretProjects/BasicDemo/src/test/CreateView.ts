class CreateView extends egret.Sprite{
    public constructor() {
        super();
		var shape:egret.Shape = new egret.Shape();
		shape.graphics.beginFill(0xff0000);
		shape.graphics.drawCircle(0,0,200);
		shape.graphics.endFill();
		this.addChild(shape);     
		var txt:egret.TextField = new egret.TextField();
		this.addChild(txt);
		txt.text = "646136549879";

		var image:eui.Image = new eui.Image();
		image.source = "bg_jpg";
		this.addChild(image);        
		
		var button:eui.Button = new eui.Button();
		button.label = "Test";
		button.width = 200;
		button.height = 150;
		this.addChild(button);
		button.addEventListener(egret.TouchEvent.TOUCH_TAP,(event:TouchEvent)=>{
		  
		},this);			

		this.addChild(new TestView);
    }
    private init():void
    {
        
    }
}