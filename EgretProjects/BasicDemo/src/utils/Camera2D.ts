module control
{
	/**
	 * @author vinson
	 * 创建时间：2017-12-18 上午9:36:42
	 * 2D摄像机(适用于物理引擎)
	 * 此类与BasicCamera,LayerCamera最大不同是目标是在外部控制移动
	 */
	export class Camera2D
	{
		/**场景（背景与目标所在处）*/
		private screen:egret.DisplayObject;
		/**摄像机范围（眼睛可以看到的范围）*/
		private cameraRect:egret.Rectangle;
		/**目标（玩家控制的对象）*/
		private target:egret.DisplayObject;
		/**速度（目标移动的速度）*/
		private vx:number=0;
		private vy:number=0;
		private prevX:number=0;
		private prevY:number=0;
		/**边境值比例（相对摄像机的）*/
		private leftTop:number=0.25;
		private rightBottom:number=0.75;
		/**边境值*/
		private leftBoundary:number;
		private topBoundary:number;
		private rightBoundary:number;
		private bottomBoundary:number;
		/**场景最大范围*/
		private screenWidth:number;
		private screenHeight:number;
		private layers:any[]=new Array;
		/**锚点默认是左上，如果居中设置为（0.5,0.5）*/
		private anchorPoint:egret.Point=new egret.Point(1,1)
		constructor(target:egret.DisplayObject,screen:egret.DisplayObject,cameraRect:egret.Rectangle=null)
		{
			this.target=target;
			this.screen=screen;
			this.cameraRect=cameraRect;
			this.setBoundary(this.leftTop,this.rightBottom);
			this.screenWidth=screen.width;
			this.screenHeight=screen.height;
		}
		/**定义边界 ，即定义个相对运动的视窗，
		 * 当操作对象没有达到边界的时候，即视窗内时是对象移动。
		 * 当超过这个视窗的时候，就场景移动*/
		public setBoundary(leftTop:number,rightBottom:number):void
		{
			this.leftTop=leftTop;
			this.rightBottom=rightBottom;
			this.leftBoundary = this.cameraRect.width * this.leftTop;
			this.topBoundary = this.cameraRect.height * this.leftTop;
			this.rightBoundary = this.cameraRect.width * this.rightBottom;
			this.bottomBoundary = this.cameraRect.height * this.rightBottom;
		}
		/**设置场景*/
		public setScreen(screen:egret.DisplayObject):void
		{
			this.screen=screen;
			this.screenWidth=screen.width;
			this.screenHeight=screen.height;
		}
		/**设置目标*/
		public setTarget(target:egret.DisplayObject):void
		{
			this.target=target;
			this.prevX=this.target.x;
			this.prevY=this.target.y;
		}
		/**设置目标锚点*/
		public setTargetAnchor(point:egret.Point):void
		{
			this.anchorPoint=point;
		}
		/**增加层*/
		public addLayer(layer:egret.DisplayObject):void
		{
			this.layers.push(layer);
		}
		/**画出边界范围*/
		public drawBoundary(color:number=0XFF0000):egret.Sprite
		{
			var sprite:egret.Sprite=new egret.Sprite();
			sprite.graphics.lineStyle(1,color);
			sprite.graphics.beginFill(0,0);
			sprite.graphics.drawRect(this.leftBoundary,this.topBoundary,this.rightBoundary-this.leftBoundary,this.bottomBoundary-this.topBoundary);
			return sprite;
		}
		public move():void
		{
			this.vx=this.target.x-this.prevX;
			this.vy=this.target.y-this.prevY;
			this.prevX=this.target.x;
			this.prevY=this.target.y;
			if(this.vx==0&&this.vy==0){
				return;
			}
			var local:egret.Point=this.target.parent.localToGlobal(this.target.x,this.target.y);
			var targetW:number=this.target.width*this.anchorPoint.x;
			var targetH:number=this.target.height*this.anchorPoint.y;
			//-----x轴-----
			if(this.vx>0){
				//目标达到右边界
				if(local.x+targetW>this.rightBoundary){
					this.screen.x-=this.vx;
				}
				//场景已经移到右尽头
				if(this.screen.x < this.cameraRect.width - this.screenWidth){
					this.screen.x = this.cameraRect.width - this.screenWidth;
				}
			}else if(this.vx<0){
				//目标达到左边界
				if(local.x < this.leftBoundary){
					this.screen.x-=this.vx;
				}
				//场景已经移到左尽头
				if(this.screen.x > this.cameraRect.x){
					this.screen.x = this.cameraRect.x;
				}
			}
			//-----y轴-----
			if(this.vy>0){
				//目标达到上边界
				if(local.y+targetH>this.bottomBoundary){
					this.screen.y-=this.vy;
				}
				//场景已经移到上尽头
				if(this.screen.y < this.cameraRect.height - this.screenHeight){
					this.screen.y = this.cameraRect.height - this.screenHeight;
				}
			}else if(this.vy<0){
				//目标达到下边界
				if(local.y < this.topBoundary){
					this.screen.y-=this.vy;
				}
				//场景已经移到下尽头
				if(this.screen.y > this.cameraRect.y){
					this.screen.y = this.cameraRect.y;
				}
			}
			this.moveLayer();
		}
		/**移动层*/
		private moveLayer():void
		{
			var len:number=this.layers.length;
			for(var i:number=0;i<len;i++){
				var layer:egret.Sprite=this.layers[i];
				layer.x=this.screen.x*((layer.width-this.cameraRect.width)/(this.screen.width-this.cameraRect.width));
				layer.y=this.screen.y*((layer.height-this.cameraRect.height)/(this.screen.height-this.cameraRect.height));
			}
		}
	}
}