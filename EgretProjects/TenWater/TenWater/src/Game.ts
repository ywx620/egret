var MUSIC_CLICK_BTN:string="click_wav";
var MUSIC_CLICK_WATER:string="water_wav";
var MUSIC_BOMB:string="bomb_wav";
var MUSIC_BG:string="background_mp3";

var EVENT_BOMB:string="event bomb";
var EVENT_REMOVE:string="event remove";
var EVENT_ADD_WATER:string="event add water";

var TYPE_HAND:string="type hand";
class GamePanel extends moon.BasicGamePanel
{
	private chessboard:MImage;
	private layout:Layout=Layout.getIns();
	private bloodImage:BloodImage;
	private waters:Water[]=[];
	private bullets:Bullet[] =[];
	private edge:Rectangle=new Rectangle(0,0,516,516);
	private calc:number=0;
	private hasWater:boolean;
	private loopNum:number=0;
	private canCalc:boolean;
	private startCheck:boolean;
	private readonly TOTALNUM:number=10;
	protected initView():void
	{
		this.layout.setStageWH(this.stageWidth,this.stageHeight);
		SoundControl.getIns().addItem(MUSIC_CLICK_BTN);
		SoundControl.getIns().addItem(MUSIC_CLICK_WATER);
		SoundControl.getIns().addItem(MUSIC_BOMB);
		SoundControl.getIns().addItem(MUSIC_BG,true);

		this.createImageBg("background_jpg");

		var top:number;
		this.chessboard=new MImage("chessboard_jpg");
		this.layout.setImage(this.chessboard);
		this.layout.setBottom(10);
		this.addChild(this.chessboard);
		top=this.chessboard.y;

		var image:MImage=new MImage("title_png");
		image.scaleX=image.scaleY=top*3/this.stageHeight;
		this.addChild(image);
		
		var image:MImage=new MImage("level_png");
		this.layout.setImage(image);
		this.layout.setLeft(30);
		this.layout.setTop(top-image.height);
		this.txtLevel=this.createText();
		this.setMImageText(image,this.txtLevel);
		this.addChild(image);
		
		var image:MImage=new MImage("score_png");
		this.layout.setImage(image);
		this.layout.setRight(30);
		this.layout.setTop(top-image.height);
		this.txtScore=this.createText();
		this.txtScore.size=40;
		this.setMImageText(image,this.txtScore);
		
		var image:MImage=new BloodImage("waterNum3_png");
		this.layout.setImage(image);
		this.layout.setCenterX();
		this.layout.setTop(top-image.height);
		this.txtBlood=this.createText();
		this.setMImageText(image,this.txtBlood);
		this.bloodImage=image as BloodImage;

		this.edge.width=this.chessboard.width;
		this.edge.height=this.chessboard.height;
		// this.initGame();
		// this.play();
		SoundControl.getIns().play(MUSIC_BG,0,999);

		this.panelStart=new GameStart;
		this.panelStart.addEvent(moon.MoonEvent.START,this.start,this)

		this.panelOver=new GameOver;
		this.panelOver.addEvent(moon.MoonEvent.START,this.start,this)

		this.addChild(this.panelStart);
	}
	protected initGame():void{
		super.initGame();
		this.blood=this.TOTALNUM;
        this.updateBlood();
		this.initWater();
	}
	protected initWater():void{
		this.removeWater();
		var water:Water;
		var waters:any[]=this.waters;
		for(var i:number=0;i<30;i++){
			var num:number=Math.floor(Math.random()*4);
			water=new Water();
			water.addEvent(EVENT_BOMB,this.bombHandler,this);
			water.addEvent(EVENT_ADD_WATER,this.bombHandler,this);
			water.gotoAndStop(num);
			this.chessboard.addChild(water);
			waters.push(water);
		}
		moon.SimpleLayout.displayRank(waters,5,1,1,60,70);
	}
	protected removeWater():void
	{
		var waters:any[]=this.waters;
		var water:Water;
		for(var i:number=0;i<waters.length;i++){
			water=waters[i];
			water.removeFromParent(true);
			water=null;
		}
		waters.length=0;
	}
	private setMImageText(image:MImage,text:TextField):void
	{
		this.addChild(image);
		text.x=image.width/2;
		text.y=image.height/2;
		text.size=50;
		image.addChild(text);
	}
	private bombHandler(e:MoonEvent):void
	{
		var water:Water=e.currentTarget as Water;
		if(e.dataType==TYPE_HAND){
			if(this.blood==0){
				return;
			}
		}
		if(e.type==EVENT_ADD_WATER){
			this.blood--;
			this.updateBlood();
			if(this.blood==0){
				this.startCheck=true;
			}
			this.calc=0;
			this.canCalc=water.currentFrame==3;
			water.updateWater();
			return;
		}else if(e.type==EVENT_BOMB){
			this.startCheck=false;
		}
		var x:number=water.x;
		var y:number=water.y;
		water.removeFromParent(true);
		this.waters.splice(this.waters.indexOf(water),1);
		water=null;
		
		for(var i:number=0;i<4;i++){
			var bullet:Bullet=new Bullet;
			this.chessboard.addChild(bullet);
			bullet.x=x;
			bullet.y=y;
			bullet.setSpeed(i);
			bullet.addEvent(EVENT_REMOVE,this.onBullet,this);
			this.bullets.push(bullet);
		}
		if(this.blood==0){
			this.startCheck=true;
		}
		if(this.canCalc){
			this.calc++;
			this.score+=this.calc*(this.level);
			this.updateScore();
			if(this.calc%3==0){
				this.blood++;
				this.updateBlood();
			}
		}
		
	}
	protected loop(n:number):boolean
    {
		var bullets:Bullet[]=this.bullets;
		var waters:Water[]=this.waters;
		var edge:Rectangle=this.edge;
		for(var i:number=0;i<bullets.length;i++){
			var bullet:Bullet=bullets[i];
			bullet.update();
			for(var j:number=0;j<waters.length;j++){
				var water:Water=waters[j];
				var dx:number=water.x-bullet.x;
				var dy:number=water.y-bullet.y;
				if(Math.sqrt(dx*dx+dy*dy)<10){
					water.addNumber();
					bullets.splice(i,1);
					i--;
					bullet.removeFromParent(true);
					bullet=null;
					break;
				}
			}
			if(bullet){
				if(bullet.x<edge.x||bullet.x>edge.width||bullet.y<edge.y||bullet.y>edge.height){
					bullet.playBomb();
					bullets.splice(i,1);
					SoundControl.getIns().play(MUSIC_BOMB)
					i--;
				}
			}
		}
		if(bullets.length==0){
			if(this.waters.length==0){
				this.nextLevel();
			}
			
			if(this.blood==0){
				this.loopNum++;
				if(this.loopNum==50){
					this.loopNum=0
					if((!this.hasWater||this.startCheck)){
						this.over();
					}
				}
			}
		}
	
		return true;
	}
	private onBullet(e:MoonEvent):void
	{
		var bullet:Bullet=e.currentTarget as Bullet;
		bullet.removeFromParent(true);
		bullet=null;
	}
	private nextLevel():void
	{
		this.blood++;
		this.level++;
		this.updateBlood();
		this.updateLevel();
		this.initWater();
	}
	protected updateLevel():void
	{
		this.txtLevel.text=""+this.level;
		this.layout.setCenterXByPanent(this.txtLevel);
	}
	protected updateScore():void
	{
		this.txtScore.text=""+this.score;
		this.layout.setCenterXByPanent(this.txtScore);
	}
	protected updateBlood():void
	{
		this.blood=this.blood>this.TOTALNUM?this.TOTALNUM:this.blood;
		this.blood=this.blood<0?0:this.blood;
		this.txtBlood.text=""+this.blood;
		this.layout.setCenterXByPanent(this.txtBlood);
		this.bloodImage.update(this.blood);
		this.hasWater=this.blood>0;
	}
	protected 
}

class BloodImage extends MImage
{
	private blood:Scale9Image;
	private max:number=10;
	public constructor(skinName:string="")
	{
		super("waterNum3_png");
		var mask:Scale9Image=new Scale9Image("waterNum2_png");
		this.blood=new Scale9Image("waterNum1_png");
		this.addChild(mask);
		this.addChild(this.blood);
		this.blood.mask=mask;
		this.blood.scaleY=0;
		this.blood.anchorOffsetY=this.blood.height;
		this.blood.anchorOffsetX=this.blood.width/2;
		this.blood.y=this.blood.height;
		this.blood.x=this.blood.width/2;
		Tween.get(this.blood,{loop:true}).to({rotation:4},500).to({rotation:-4},500).to({rotation:0},500);
	}
	public update(value:number):void
	{
		this.blood.scaleY=value/this.max;
	}
}

class GameStart extends moon.BasicGameStart
{
	private layout:Layout=Layout.getIns();
	protected initView():void
	{
		this.layout.setStageWH(this.stageWidth,this.stageHeight);
		this.createImageBg("backgroundAlpha_png");

		var top:number;
		var image:MImage=new MImage("explain_jpg");
		this.layout.setImage(image);
		this.layout.setBottom(10);
		//this.layout.setCenterY();
		this.addChild(image);
		top=image.y;

		var btn:MButton=this.createBtn("btnStart_png");
		this.layout.setImage(btn);
		this.layout.setCenterX();
		this.layout.setBottom(100);

	}
	protected createBtn(value:string):MButton
	{
		var skin:Scale9Image=new Scale9Image(value);
		var skin2:Scale9Image=new Scale9Image(value);
		skin2.alpha=0.5;
		var btn:MButton=new MButton(skin,skin2);
		btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClick,this);
		this.addChild(btn);
		return btn;
	}
	protected onClick(e:egret.TouchEvent):void
	{
		super.onClick(e);
		SoundControl.getIns().play(MUSIC_CLICK_BTN);
	}
}
class GameOver extends moon.BasicGameOver
{
	private layout:Layout=Layout.getIns();
	protected initView():void
	{
		this.layout.setStageWH(this.stageWidth,this.stageHeight);
		this.createImageBg("backgroundAlpha_png");

		var top:number;
		var image:MImage=new MImage("chessboard_jpg");
		this.layout.setImage(image);
		this.layout.setBottom(10);
		//this.layout.setCenterY();
		this.addChild(image);
		top=image.y;

		var btn:MButton=this.createBtn("btnReStart_png");
		this.layout.setImage(btn);
		this.layout.setCenterX();
		this.layout.setBottom(300);


		var image:MImage=new MImage("level_png");
		this.layout.setImage(image);
		this.layout.setLeft(50);
		this.layout.setBottom(500);
		this.txtLevel=this.createText();
		this.setMImageText(image,this.txtLevel);
		this.addChild(image);
		
		var image:MImage=new MImage("score_png");
		this.layout.setImage(image);
		this.layout.setRight(50);
		this.layout.setBottom(500);
		this.txtScore=this.createText();
		this.txtScore.size=40;
		this.setMImageText(image,this.txtScore);

		var image:MImage=new MImage("titleOver_png");
		this.addChild(image);
		this.layout.setImage(image);
		this.layout.setCenterX();
		this.layout.setBottom(700);
	}
	private setMImageText(image:MImage,text:TextField):void
	{
		this.addChild(image);
		text.x=image.width/2;
		text.y=image.height/2;
		text.size=50;
		image.addChild(text);
	}
	protected createBtn(value:string):MButton
	{
		var skin:Scale9Image=new Scale9Image(value);
		var skin2:Scale9Image=new Scale9Image(value);
		skin2.alpha=0.5;
		var btn:MButton=new MButton(skin,skin2);
		btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClick,this);
		this.addChild(btn);
		return btn;
	}
	protected onClick(e:egret.TouchEvent):void
	{
		super.onClick(e);
		SoundControl.getIns().play(MUSIC_CLICK_BTN);
	}
	public update(data:Object):void
	{
		this.txtScore.text=data["score"];
		this.txtLevel.text=data["level"];
		this.layout.setCenterXByPanent(this.txtScore);
		this.layout.setCenterXByPanent(this.txtLevel);
	}
}
class Water extends moon.ImageAnimation
{
	public constructor(){
    	super("w",2,5);
		this.anchorOffsetX=this.width/2;
		this.anchorOffsetY=this.height/2;
		var time:number=1000+Math.random()*500;
		var sx:number=0.8+Math.random()*0.3;
		var sy:number=0.8+Math.random()*0.3;
		Tween.get(this,{loop:true}).to({scaleX:sx,scaleY:sy},time).to({scaleX:1,scaleY:1},time);
		this.gotoAndStop(0);

		this.touchEnabled=true;
		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onClick,this);
    }
	private onClick(e:egret.TouchEvent):void
	{
		this.dispEvent(EVENT_ADD_WATER,null,TYPE_HAND);
	}
	public updateWater():void
	{
		if(this.index==this.items.length-1){
			this.dispEvent(EVENT_BOMB);
			SoundControl.getIns().play(MUSIC_BOMB);
		}else{
			Tween.get(this).to({alpha:0.5,rotation:this.rotation+5},200).call(this.backCall,this);
		}
	}
	private backCall():void
	{
		this.alpha=1;
		this.gotoAndStop(++this.index);
		SoundControl.getIns().play(MUSIC_CLICK_WATER);
	}
	public addNumber():void
	{
		if(this.index==this.items.length-1){
			this.dispEvent(EVENT_BOMB);
			SoundControl.getIns().play(MUSIC_BOMB);
		}else{
			this.backCall();
		}
		
	}
	 public gotoAndStop(index:number):void{
		var len:number=this.items.length-1
		index=index>=len?len:index;
		if(this.hasItem(index)){
			this.index=index;
			this.skinName=this.getItem(index);
			this.update();
		}
	}
	public dispose():void
	{
		Tween.removeTweens(this);
		this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onClick,this);
		super.dispose();
	}
}
class Bullet extends moon.ImageAnimation
{
	private v:number=4;
	private vx:number=0;
	private vy:number=0;
	public constructor(){
    	super("w",1,1);
		this.anchorOffsetX=this.width/2;
		this.anchorOffsetY=this.height/2;
		this.gotoAndStop(0);
    }
	public setSpeed(type:number):void
	{
		if(type==0){
			this.vx=this.v;
			this.rotation=90;
			this.x+=35;
		}else if(type==1){
			this.vx=-1*this.v;
			this.x+=-35;
			this.rotation=-90;
		}else if(type==2){
			this.vy=this.v;
			this.rotation=180;
			this.y+=35;
		}else if(type==3){
			this.vy=-1*this.v;
			this.y+=-35;
		}
	}
	public update():void
	{
		this.x+=this.vx;
		this.y+=this.vy;
	}
	public playBomb():void
	{
		//mc.gotoAndPlay(2);
		//mc.addFrameScript(mc.totalFrames-1,stopHandler);
		this.stopHandler();
	}
	private stopHandler():void
	{
		//mc.stop();
		this.dispEvent(EVENT_REMOVE)
	}
}