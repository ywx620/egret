class MaoMaoConst{
	public static readonly STATIC_AWAIT:number=0;//待机
	public static readonly STATIC_READY:number=1;//准备起跳
	public static readonly STATIC_JUMP:number=2;//起跳
	public static readonly STATIC_JUMP_OVER:number=3;//结束跳跃
	public static readonly JUMP_HEIGHT:number=48;//要跳的高度
	public static readonly SPEED_MAX:number=10;//速度最高值
	public static readonly SPEED_A:number=0.5;//速度加速度
	public static readonly CENTER:number=0.8;
}
class MaoMaoJump extends moon.GameView{
	private ladder:MaoMaoLader;
	private player:MaoMaoPlayer;
	public constructor() {
		super();	
	}
	/**加载到舞台之后调用 */
	protected render():void
	{
		super.render();
		this.createBackground();
		this.createLadder();
		this.createPlayer();
		this.play();

		this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onClick,this)
		this.touchEnabled=true;

	}
	private onClick(e:egret.TouchEvent):void
	{
		if(this.player.static==MaoMaoConst.STATIC_AWAIT){
			this.player.jump();
		}
	}
	private createPlayer():void
	{
		this.player=new MaoMaoPlayer();
		this.player.x=this.stageWidth-120;
		this.player.y=this.stageHeight-100;
		this.player.addEvent(moon.MoonEvent.OVER,this.jumpOver,this);
		this.addChild(this.player);
	}
	private jumpOver(e:moon.MoonEvent):void
	{
		this.ladder.setSpeed();
	}
	protected loop(n:number):boolean
	{
		this.player.loop();
		if(this.player.static==MaoMaoConst.STATIC_JUMP){
			let sh:number=this.stageHeight*MaoMaoConst.CENTER;
			if(this.player.y<=sh){
				this.ladder.loop();
			}
		}
		return true;
	}
	protected createLadder():void
	{
		this.ladder=new MaoMaoLader();
		this.addChild(this.ladder);
	}
}

class MaoMaoPlayer extends moon.MoonContainer
{
	private bitmap:Bitmap;
	private originHeight:number;//原来高度
	private speed:number;//跳的速度
	private moveX:number=-1;//X轴方向
	private jumpCount:number=0;//跳的次数
	private playerHeight;
	public static:number;
	public constructor() {
		super();	
		var bitmap:Bitmap=new Bitmap()
        bitmap.texture=RES.getRes("maomao_png");
        this.playerHeight=bitmap.height;
        bitmap.scaleY=-1;
        this.addChild(bitmap);
		this.bitmap=bitmap;
		this.await();
	}
	/**待机 */
	public await():void
	{
		this.static=MaoMaoConst.STATIC_AWAIT;
		Tween.removeTweens(this.bitmap);
		var h:number=this.playerHeight;
		var tw:Tween=Tween.get(this.bitmap, {loop:true});
        tw.to({height:h+4},300).to({height:h},300);
	}
	/**跳跃 */
	public jump():void
	{
		this.static=MaoMaoConst.STATIC_READY;
		let jumpHeight:number;
		let sh:number=this.stageHeight*MaoMaoConst.CENTER;
		if(this.y<=sh) 	jumpHeight=0;
		else			jumpHeight=MaoMaoConst.JUMP_HEIGHT;
		this.originHeight=this.y-jumpHeight;
		this.speed=MaoMaoConst.SPEED_MAX;
		Tween.removeTweens(this.bitmap);
		var h:number=this.playerHeight
		var tw:Tween=Tween.get(this.bitmap, {loop:false});
        tw.to({height:h/2},200).to({height:h+10},80).call(this.backJump,this);//先下蹲
		tw.to({height:h},80);//再起跳
	}
	protected backJump():void
	{
		this.static=MaoMaoConst.STATIC_JUMP;
	}
	protected overJump():void
	{
		this.static=MaoMaoConst.STATIC_JUMP_OVER;
		this.dispEvent(moon.MoonEvent.OVER)

		Tween.removeTweens(this.bitmap);
		var h:number=this.playerHeight
		var tw:Tween=Tween.get(this.bitmap, {loop:false});
        tw.to({height:h-10},100).to({height:h},100).call(this.await,this);
		
		this.y=this.originHeight;
		this.jumpCount++;
		if(this.jumpCount==5){
			this.moveX=0;
		}else if(this.jumpCount==6){
			if(this.x<200)  this.moveX=1;
			else 			this.moveX=-1;
			this.jumpCount=0;
		}
	}
	public loop():void
	{
		if(this.static==MaoMaoConst.STATIC_JUMP){
			this.speed-=MaoMaoConst.SPEED_A;
			this.y-=this.speed;
			this.x+=2.85*this.moveX;
			if(this.speed<0&&this.originHeight<this.y){
				this.overJump();
			}
		}
	}
}
class MaoMaoLader extends moon.BasicView
{
	protected ladders:moon.Scale9Image[]=[];
	protected speed:number;
	public constructor() {
		super();
	}
	protected render():void
	{
		super.render();
		var sw:number=this.stageWidth;
		var sh:number=this.stageHeight;
		var image:moon.Scale9Image=new moon.Scale9Image("ladder_png");
		var iw:number=image.width;
		var ih:number=image.height;
		var count:number=Math.floor(sw/iw);
		var off:number=6;//X轴缩进去的距离
		var side:number=((sw%iw)+count*off)/2;
		var x:number=sw-iw-side;
		var y:number=sh-ih;
		var sign:number=1;
		for(var j=0;j<4;j++){
			for(var i=0;i<count;i++){
				image=new moon.Scale9Image("ladder_png");
				this.addChildAt(image,0);
				image.scaleX=sign;
				image.x=x-(iw-off)*i*sign;
				image.y=y-MaoMaoConst.JUMP_HEIGHT*i;
				this.ladders.push(image);
			}
			x=image.x+iw*sign;
			y=image.y-ih/2;
			sign*=-1;
		}
	}
	public setSpeed():void
	{
		this.speed=this.y+MaoMaoConst.SPEED_MAX;
	}
	public loop():void
	{
		var len:number=this.ladders.length;
		//this.speed-=MaoMaoConst.SPEED_A;
		this.y+=(this.speed-this.y)*MaoMaoConst.SPEED_A;
		if(Math.abs(this.speed-this.y)<1){
			this.y=this.speed;
		}
	}
}