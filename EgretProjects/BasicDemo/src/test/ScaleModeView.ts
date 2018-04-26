
class TestView extends eui.Component {
	constructor(){
		super();
		this.skinName="resource/askins/ScaleModeSkin.exml";
	}

	protected childrenCreated(): void {
		super.childrenCreated();
		trace("1.3");
		var btns:string[]=[
			egret.StageScaleMode.EXACT_FIT,
			egret.StageScaleMode.FIXED_HEIGHT,
			egret.StageScaleMode.FIXED_NARROW,
			egret.StageScaleMode.FIXED_WIDE,
			egret.StageScaleMode.FIXED_WIDTH,
			egret.StageScaleMode.NO_BORDER,
			egret.StageScaleMode.NO_SCALE,
			egret.StageScaleMode.SHOW_ALL
		];
		for(var i:number=0;i<btns.length;i++){
			var btn:Button=new Button;
			btn.label=btns[i];
			btn.x=200;
			btn.y=100+50*i;
			btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClick,this);
			this.addChild(btn);
		}
		
	}
	protected onClick(e:egret.TouchEvent):void
	{
		this.stage.scaleMode = e.currentTarget.label;

		this.height = this.stage.stageHeight;
		this.width = this.stage.stageWidth;
	}
}
