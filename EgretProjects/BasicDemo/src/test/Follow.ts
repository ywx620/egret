class Follow extends moon.BasicView{
    /**加载到舞台之后调用 */
	private fishs:any[]=[];
	private foods:any[]=[];
	private total:number=10;
	private timeout:number;
    protected render():void
    {
		super.render();
		this.createBackground(0);

		this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouch,this)

		for(var i:number=0;i<this.total;i++){
			var fish:Fish=new Fish;
			fish.x=Math.random()*this.stageWidth;
			fish.y=Math.random()*this.stageHeight;
			this.addChild(fish);
			this.fishs.push(fish);
		}
		
		egret.startTick(this.onLoop,this)
    }
	protected onTouch(e:egret.TouchEvent):void
	{
		var targetPoint:Point=new Point(e.stageX,e.stageY);
		for(var i:number=0;i<this.total;i++){
			var fish:Fish=this.fishs[i]
			fish.startMove(targetPoint,1);
		}
		this.addFood(targetPoint);
		this.refreshFood();
	}
	protected addFood(targetPoint:Point):void
	{
		var food:Sprite=moon.MoonUI.getCircle(5,Math.random()*0XFFFFFF);
		food.x=targetPoint.x;
		food.y=targetPoint.y;
		this.addChild(food);
		this.foods.push(food);
	}
	
	protected refreshFood():void
	{
		if(this.foods.length>0){
			clearTimeout(this.timeout);
			this.timeout=setTimeout(this.refreshFood.bind(this),3000);

			var food:Sprite=this.foods[0];
			var targetPoint:Point=new Point(food.x,food.y);
			for(var i:number=0;i<this.total;i++){
				var fish:Fish=this.fishs[i]
				fish.startMove(targetPoint,1);
			}
		}
	}
	protected freeMove():void
	{
		for(var i:number=0;i<this.total;i++){
			var fish:Fish=this.fishs[i];
			fish.freeMove();
		}
	}
	protected onLoop(num:number):boolean
	{
		for(var i:number=0;i<this.total;i++){
			var fish:Fish=this.fishs[i];
			for(var j:number=0;j<this.foods.length;j++){
				var food:Sprite=this.foods[j];
				if(fish.hitTestPoint(food.x,food.y)){
					this.removeChild(food);
					this.foods.splice(j--,1);
					this.freeMove();
				}
			}	
		}
		return true;
	}
}

class Fish extends moon.BasicView{
	protected render():void
    {
		super.render();
		this.addChild(this.fishBody);
		this.freeMove();
    }
	public freeMove():void
	{
		var targetPoint:Point=new Point(Math.random()*this.stageWidth,Math.random()*this.stageHeight);
		var dx:number=targetPoint.x-this.x;
		var dy:number=targetPoint.y-this.y;
		this.startMove(targetPoint);
	}
	public startMove(targetPoint:Point,type:number=0):void
	{
		var dx:number=targetPoint.x-this.x;
		var dy:number=targetPoint.y-this.y;
		var angle:number=Math.atan2(dy,dx);
		var targetAngle:number=angle*180/Math.PI;
		var ds:number=Math.sqrt(dx*dx+dy*dy);
		var time:number=type==0?10:Math.random()*10+2;
		var timePoint:number=ds*time;
		var timeAngle:number=ds*time*0.2;

		Tween.removeTweens(this);
		Tween.get(this).to({rotation:targetAngle},timeAngle).to({x:targetPoint.x,y:targetPoint.y},timePoint).call(this.freeMove);
	}
	protected get fishBody():Sprite
	{
		var fish:Sprite=new Sprite;
		//var color:number=Math.random()*0xffffff;
		var color:number=0xffffff;
		var body:Sprite=moon.MoonUI.getPolygon(3,30,color);
		var tail:Sprite=moon.MoonUI.getPolygon(3,10,color);
		tail.x=-10;
		body.x=10;
		fish.addChild(tail);
		fish.addChild(body);
		return fish;
	}
}