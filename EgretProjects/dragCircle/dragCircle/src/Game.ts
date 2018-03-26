class Game extends BasicComponent{
	btnChange:Button;
	txtScore:Label;
	txtLevel:Label;
	txtBlood:Label;
	score:number=0;
	blood:number=5;
	level:number=1;
 	coltrolMove:control.ControlDrag;
    target:egret.Sprite;
	points:egret.Sprite[];
	nodeMin:egret.Sprite;
	nodeMid:egret.Sprite;
	nodeMax:egret.Sprite;
	sizeMin:number=30;      
	sizeMid:number=60;
	sizeMax:number=90;
	sizeCurr:number=0;
	currPoint:egret.Point;
	nextPoint:egret.Point;
	checkArray:any[]=[];
	colors:number[]=[1,2,3,4,5,6];
	soundScore:string="star_collect_wav";
	soundDown:string="special_egg_wav";
	soundLevel:string="level_wav";
	gameOver:GameOver;
	constructor() {
        super();
	    this.setSkinName("resource/eui_skins/gameUI.exml");
    }
    protected render():void
    {
		super.render();
		moon.showLog.getIns().init(this.stage);
		SoundControl.getIns().addItem(this.soundScore);
		SoundControl.getIns().addItem(this.soundDown);
		SoundControl.getIns().addItem(this.soundLevel);
		 for(var i:number=0;i<this.numChildren;i++){
			 var display:DisplayObject=this.getChildAt(i)
		 	 var name:string=display.name;
			 if(name=="p9"){
				 //display.visible=false;
				 display.scaleX=display.scaleY=1.1;
				 this.currPoint=new egret.Point(display.x,display.y);
			 }
		 }
		 this.addToStage();

		 this.updateBlood();

		 this.createOver();

	}
	private createOver():void {
		this.gameOver=new GameOver(this);

	}
	private addToStage():void {

		// this.currPoint=new egret.Point(this.stage.stageWidth/2,800);
		// this.nextPoint=new egret.Point(this.stage.stageWidth/2,800);
		this.createMonePoint();
		this.nodeMax=this.createContainer();
		this.nodeMid=this.createContainer();
		this.nodeMin=this.createContainer();

		this.coltrolMove=new control.ControlDrag(this.stage,null);
		this.coltrolMove.endBackFun=this.endBackFun.bind(this);

		this.coltrolMove.open();
		this.createNewCircle();

		this.btnChange.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouch,this);

	}
	private onTouch(e:egret.TouchEvent):void
	{
		if(this.target.parent){
			this.target.parent.removeChild(this.target);
		}
		this.blood--;
		this.updateBlood();
		this.createNewCircle();
	}
	/**拖动结束时 */
	private endBackFun():void
	{
		var points:egret.Sprite[]=this.points;
		var target:egret.Sprite=this.target;
		for(var i:number=0;i<points.length;i++){
			var p:egret.Sprite=points[i];
			var r:number=p.width/2;
			var dx:number=p.x-target.x,dy:number=p.y-target.y;
			var dis:number=Math.sqrt(dx*dx+dy*dy);
			if(dis<r){
				target.x=p.x;target.y=p.y;
				if(this.canPush(target,p.name)){
					egret.Tween.get(target).to({scaleX:1,scaleY:1},200,egret.Ease.backIn);
					this.checkResult(target,p.name);
					this.createNewCircle();
					SoundControl.getIns().play(this.soundDown);
					return;
				}
			}
		}
		target.x=this.currPoint.x;
		target.y=this.currPoint.y;
	}
	/**创建容器 */
	private createContainer():egret.Sprite
	{
		var node:Sprite=new egret.Sprite();
		this.addChild(node);
		return node;
	}
	/**创建新的圆 */
	private createNewCircle():void
	{
		var random:number=Math.random();
		var colorLevel:number=this.level+1;
		colorLevel=colorLevel>this.colors.length?this.colors.length:colorLevel
		var color:number=this.colors[Math.floor(Math.random()*colorLevel)];
		var size:number;
		if(random>0.7) 		size=this.sizeMax;
		else if(random>0.4) size=this.sizeMid;
		else 				size=this.sizeMin;
		this.target=this.createCircle(size,color);
		this.target.scaleX=this.target.scaleY=1.1;
		this.coltrolMove.target=this.target;
		this.checekOver();
	}
	/**根据大小与颜色创建圆 */
	private createCircle(size:number,color:number):egret.Sprite
	{
		this.sizeCurr=size;
		var node:Sprite=new egret.Sprite();
		// node.graphics.lineStyle(2);
		// node.graphics.beginFill(color);
		// node.graphics.drawCircle(0,0,size);
		// node.graphics.endFill();
		var image:eui.Image;
		switch(size){
			case this.sizeMax:image=new eui.Image("circle_max_png");break;
			case this.sizeMid:image=new eui.Image("circle_mid_png");break;
			case this.sizeMin:image=new eui.Image("circle_min_png");break;
		}
		node.alpha=0.8;
		node.addChild(image);
		node.x=this.currPoint.x;
		node.y=this.currPoint.y;
		node.name=color+"_"+size;
		image.addEventListener(egret.Event.COMPLETE,addStage,this);
		function addStage(e:egret.Event):void
		{
			image.anchorOffsetX=image.width/2;
			image.anchorOffsetY=image.height/2;
			this.setColor(image,color);
		}
		switch(size){
			case this.sizeMax:this.nodeMax.addChild(node);break;
			case this.sizeMid:this.nodeMid.addChild(node);break;
			case this.sizeMin:this.nodeMin.addChild(node);break;
		}
		return node;
	}
	private setColor(target:DisplayObject,color:number):void
	{
		if(color==this.colors[0]){
			target.filters=[new egret.ColorMatrixFilter([
				1,0,0,0,0,
				0,0,0,0,0,
				0,0,0,0,0,
				0,0,0,1,0
				])];
		}else if(color==this.colors[1]){
			target.filters=[new egret.ColorMatrixFilter([
				0,0,0,0,0,
				0,1,0,0,0,
				0,0,0,0,0,
				0,0,0,1,0
				])];
		}else if(color==this.colors[2]){
			target.filters=[new egret.ColorMatrixFilter([
				0,0,0,0,0,
				0,0,0,0,0,
				0,0,1,0,0,
				0,0,0,1,0
				])];
		}else if(color==this.colors[3]){
			target.filters=[new egret.ColorMatrixFilter([
				1,0,0,0,0,
				0,1,0,0,0,
				0,0,0,0,0,
				0,0,0,1,0
				])];
		}else if(color==this.colors[4]){
			target.filters=[new egret.ColorMatrixFilter([
				1,0,0,0,0,
				0,0,0,0,0,
				0,0,1,0,0,
				0,0,0,1,0
				])];
		}else if(color==this.colors[5]){
			target.filters=[new egret.ColorMatrixFilter([
				0,0,0,0,0,
				0,1,0,0,0,
				0,0,1,0,0,
				0,0,0,1,0
				])];
		}
	}
	/**创建9个圆点 */
	private createMonePoint():void
	{
		var points:egret.Sprite[]=[];
		for(var i:number=0;i<9;i++){
			var p:egret.Sprite=this.createPoint();
			p.name=""+Math.floor(i/3)+i%3;
			//trace(p.name);
			var display:DisplayObject=this.getChildByName("p"+i);
			display.alpha=0.5;
			p.x=display.x;p.y=display.y;
			p.alpha=0.2;
			points.push(p);
			this.addChild(p);
		}
		this.points=points;
		//LayoutManager.displayRank(points,3,20,20,115,163);

		for(i=0;i<3;i++){
			var array:any[]=[];
			for(var j:number=0;j<3;j++){
				array.push([]);
			}
			this.checkArray.push(array);
		}
	}
	/**创建圆点 */
	private createPoint():egret.Sprite
	{
		var node:Sprite=new egret.Sprite();
		node.graphics.lineStyle(1);
		node.graphics.drawCircle(0,0,this.sizeMax);
		node.graphics.endFill();
		node.graphics.beginFill(0);
		node.graphics.drawCircle(0,0,5);
		node.graphics.endFill();
		this.addChild(node);
		return node;
	}
	/**能否PUSH到数组中 */
	private canPush(tagret:egret.Sprite,pos:string):boolean
	{
		var i:number=parseInt(pos.substr(0,1));
		var j:number=parseInt(pos.substr(1,1));
		var array:any[]=this.checkArray[i][j];
		for(var i:number=0;i<array.length;i++){
			var t:egret.Sprite=array[i];
			if(t.name.split("_")[1]==tagret.name.split("_")[1]){
				return false;//大小尺寸一样的不能再放
			}
		}
		return true;
	}
	/**查看结果 */
	private checkResult(tagret:egret.Sprite,pos:string):void
	{
		var i:number=parseInt(pos.substr(0,1));
		var j:number=parseInt(pos.substr(1,1));
		var array:any[]=this.checkArray[i][j];
		var t:egret.Sprite;
		array.push(tagret);

		if(array.length==3){
			var color0:string=array[0].name.split("_")[0];
			var color1:string=array[1].name.split("_")[0];
			var color2:string=array[2].name.split("_")[0];
			if(color0==color1&&color1==color2){
				while(array.length>0){
					t=array[0];
					this.tweenTarget(t);
					array.splice(0,1);
				}
			}
		}
		var a:any[]=this.checkArray;
		//查看横排
		var b:any[]=a[i][0];
		var c:any[]=a[i][1];
		var d:any[]=a[i][2];
		this.checkThreeArray(b,c,d);

		b=a[0][j];
		c=a[1][j];
		d=a[2][j];
		this.checkThreeArray(b,c,d);

		if(i==j){
			b=a[0][0];
			c=a[1][1];
			d=a[2][2];
			this.checkThreeArray(b,c,d);
		}
		if(i+j==2){
			b=a[0][2];
			c=a[1][1];
			d=a[2][0];
			this.checkThreeArray(b,c,d);
		}
	}
	private removeNode(t:any):void
	{
		t.parent.removeChild(t);
	}
	private checkThreeArray(b:any[],c:any[],d:any[]):void
	{
		for(var n:number=0;n<b.length;n++){
			var count1:number=1;
			var count2:number=0;
			var count3:number=0;
			var tb:egret.Sprite=b[n];
			var tbc:string=tb.name.split("_")[0];
			var temp:any[]=[tb];
			for(var i:number=0;i<b.length;i++){
				var tbb:egret.Sprite=b[i];
				var tbcc:string=tbb.name.split("_")[0];
				if(i!=n){
					if(tbc==tbcc){
						temp.push(tbb);
					}
				}
			}
			for(var i:number=0;i<c.length;i++){
				var tc:egret.Sprite=c[i];
				var tcc:string=tc.name.split("_")[0];
				if(tbc==tcc){
					count2=1;
					temp.push(tc);
				}
			}
			for(var i:number=0;i<d.length;i++){
				var td:egret.Sprite=d[i];
				var tdc:string=td.name.split("_")[0];
				if(tbc==tdc){
					count3=1;
					temp.push(td);
				}
			}
			if((count1+count2+count3)==3){
				for(var i:number=0;i<temp.length;i++){
					var t=temp[i];
					this.tweenTarget(t);
					var index=b.indexOf(t);
					if(index>=0) b.splice(index,1);
					index=c.indexOf(t);
					if(index>=0) c.splice(index,1);
					index=d.indexOf(t);
					if(index>=0) d.splice(index,1);
				}
			}
		}
	}
	private tweenTarget(t:egret.Sprite):void
	{
		egret.Tween.get(t).wait(400).to({alpha:0,scaleX:0,scaleY:0,x:0,y:0},500).call(this.removeNode,this,[t]);
		this.score++;
		this.txtScore.text="score:"+this.score;
		SoundControl.getIns().play(this.soundScore);
		this.updateLevel();
	}
	private updateLevel():void
	{
		if(this.score%20==0){
			this.level++;
			this.txtLevel.text="LEVEL:"+this.level;
			this.blood+=2;
			this.updateBlood();
			SoundControl.getIns().play(this.soundLevel);
		}
	}
	private updateBlood():void
	{
		this.btnChange.visible=this.blood!=0;
		this.txtBlood.text=""+this.blood;
		this.checekOver();		
	}
	private checekOver():void
	{
		if(this.blood==0){
			var size:number=parseInt(this.target.name.split("_")[1]);
			switch(size){
				case this.sizeMax:if(this.nodeMax.numChildren==10) this.over();break;
				case this.sizeMid:if(this.nodeMid.numChildren==10) this.over();break;
				case this.sizeMin:if(this.nodeMin.numChildren==10) this.over();break;
			}
			//traceSimple("blood=",this.blood,size,this.nodeMin.numChildren,this.nodeMid.numChildren,this.nodeMax.numChildren)
		}
	}
	private over():void
	{
		this.gameOver.update();
		this.addChild(this.gameOver);
	}
	public restart():void
	{
		this.score=0;
		this.blood=5;
		this.level=1;
		this.txtLevel.text="LEVEL:"+this.level;
		this.txtBlood.text=""+this.blood;
		this.txtScore.text="score:"+this.score;
		this.btnChange.visible=true;
		this.nodeMax.removeChildren();
		this.nodeMid.removeChildren();
		this.nodeMin.removeChildren();
		for(var i:number=0;i<this.checkArray.length;i++){
			var a:any[]=this.checkArray[i];
			for(var j:number=0;j<a.length;j++){
				var b:any[]=a[j];
				b.length=0;
			}
		}
		this.createNewCircle();
	}
}
class GameStart extends BasicComponent{
	btnStart:Button;
	animation:egret.tween.TweenGroup;
	constructor() {
        super();
	    this.setSkinName("resource/eui_skins/gameStartUI.exml");
    }
    protected render():void
    {
		super.render();
		for(var key in this.animation.items){//使动画组中的每一个动画都循环播放
            this.animation.items[key].props = {loop:true};
        }
		this.animation.play();
		this.btnStart.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouch,this);
	}
	private onTouch(e:egret.TouchEvent):void
	{
		this.parent.removeChild(this);
	}
}
class GameOver extends BasicComponent{
	btnStart:Button;
	txtScore:Label;
	txtLevel:Label;
	animation:egret.tween.TweenGroup;
	game:Game;
	constructor(g:Game) {
        super();
		this.game=g;
	    this.setSkinName("resource/eui_skins/gameOverUI.exml");
    }
    protected render():void
    {
		super.render();
		this.btnStart.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouch,this);
	}
	private onTouch(e:egret.TouchEvent):void
	{
		this.parent.removeChild(this);
		this.game.restart();
	}
	public update():void
	{
		this.txtScore.text=this.game.txtScore.text.toLocaleUpperCase();
		this.txtLevel.text=this.game.txtLevel.text.toLocaleUpperCase();
	}
}