module draw
{
	/**
	 * ...
	 * 默认参数x轴,y轴,w宽,h高,r半径,c颜色,ew圆角宽,eh圆家高
	 * @author vinson
	 */
	export class BasicUI
	{
		/**得到随机色*/
		public static get randomColor():number{
			return Math.random()*0XFFFFFF;
		}
		/**得到矩形*/
		public static getRect(w:number,h:number,c:number=0,x:number=0,y:number=0):egret.Sprite
		{
			var s:egret.Sprite=new egret.Sprite()
			s.graphics.beginFill(c);
			s.graphics.drawRect(x,y,w,h);
			s.graphics.endFill();
			return s;
		}
		/**得到矩形和一个X*/
		public static getRectAndX(w:number,h:number,c:number=0,x:number=0,y:number=0):egret.Sprite
		{
			var s:egret.Sprite=this.getRect(w,h,c,x,y)
			var l1:egret.Sprite=new egret.Sprite;
			l1.graphics.lineStyle(0.1);
			l1.graphics.moveTo(0,0);
			l1.graphics.lineTo(w,h);
			var l2:egret.Sprite=new egret.Sprite;
			l2.graphics.lineStyle(0.1);
			l2.graphics.moveTo(w,0);
			l2.graphics.lineTo(0,h);
			s.addChild(l1);
			s.addChild(l2);
			return s;
		}
		/**得到圆角矩形*/
		public static getRoundRect(w:number,h:number,c:number=0,ew:number=5,eh:number=5,x:number=0,y:number=0):egret.Sprite
		{
			var s:egret.Sprite=new egret.Sprite()
			s.graphics.beginFill(c);
			s.graphics.drawRoundRect(x,y,w,h,ew,eh);
			s.graphics.endFill();
			return s;
		}
		/**得到圆形*/
		public static getCircle(r:number,c:number=0,x:number=0,y:number=0):egret.Sprite
		{
			var s:egret.Sprite=new egret.Sprite()
			s.graphics.beginFill(c);
			s.graphics.drawCircle(x,y,r);
			s.graphics.endFill();
			return s;
		}
		/**得到多边形,side边数,rotation角度*/
		public static getPolygon(side:number=3,r:number=10,c:number=0,rotation:number=0):egret.Sprite
		{
			var s:egret.Sprite = new egret.Sprite;
			s.rotation=rotation;
			s.graphics.beginFill(c);
			for (var i:number =0; i <=side; i++) {
				var lineX:number =  Math.cos((i * (360 / side) * Math.PI / 180)) * r;
				var lineY:number =  Math.sin((i * (360 / side) * Math.PI / 180)) * r;
				if (i == 0) s.graphics.moveTo(lineX,lineY);
				else		s.graphics.lineTo(lineX, lineY);
				
			}
			s.graphics.endFill();
			return s;
		}
		/**得到圆角矩形与三角形合体rc是正方形颜色,pc是三角形颜色*/
		public static getArrowRoundRect(w:number,h:number,rc:number,pc:number=0,rotation:number=0):egret.Sprite
		{
			var s:egret.Sprite = new egret.Sprite;
			s.addChild(this.getRoundRect(w,h,rc));
			var p:egret.Sprite=this.getPolygon(3,w/3,pc,30+rotation);
			p.x=s.width>>1;p.y=s.height>>1;
			s.addChild(p);
			return s;
		}
		/**得到滚动条的bar*/
		public static getScrollLineBar(w:number,h:number,c:number):egret.Sprite
		{
			var s:egret.Sprite = new egret.Sprite;
			var _h:number=h/3;
			for(var i:number=0;i<3;i++){
				var r:egret.Sprite=this.getRect(w,1,c,0,i*_h);
				s.addChild(r);
			}
			return s;
		}
		/**得到圆角矩形-加*/
		public static getAddRoundRect(w:number,h:number,c:number):egret.Sprite
		{
			var s:egret.Sprite = new egret.Sprite;
			s.addChild(this.getRoundRect(w,h,c));
			var r1:egret.Sprite=this.getRect(w/2,2,0,w/4,h/2-1);
			var r2:egret.Sprite=this.getRect(2,h/2,0,w/2-1,h/4);
			s.addChild(r1);
			s.addChild(r2);
			return s;
		}
		/**得到圆角矩形-减*/
		public static getRemoveRoundRect(w:number,h:number,c:number):egret.Sprite
		{
			var s:egret.Sprite = new egret.Sprite;
			s.addChild(this.getRoundRect(w,h,c));
			var r:egret.Sprite=this.getRect(w/2,2,0,w/4,h/2-1);
			s.addChild(r);
			return s;
		}
		/**得到带文字的圆角方形*/
		public static getRoundRectText(w:number,h:number,c:number,str:string="click"):egret.Sprite
		{
			var s:egret.Sprite = new egret.Sprite;
			s.addChild(this.getRoundRect(w,h,c));
			var text:egret.TextField=new egret.TextField;
			text.text=str;
			text.x=(s.width-text.width)>>1;
			text.y=(s.height-text.height)>>1;
			s.addChild(text);
			return s;
		}
		/**得到矩形-复选框 bc背景颜色，gc钩的颜色,type为0是没有钩为1是有钩*/
		public static getCheckBoxRect(bc:number=0XFFFFFF,gc:number=0,type:number=0):egret.Sprite
		{
			var s:egret.Sprite = new egret.Sprite;
			s.addChild(this.getRect(20,20,bc));
			if(type==1){
				var r:egret.Sprite=new egret.Sprite;
				r.graphics.beginFill(gc);
				r.graphics.moveTo(0,10);
				r.graphics.lineTo(10,18);r.graphics.lineTo(22,4);r.graphics.lineTo(18,0);r.graphics.lineTo(10,9);
				r.graphics.lineTo(6,4);r.graphics.lineTo(0,10);
				s.addChild(r);
			}
			return s;
		}
		/**得到矩形-单选框 bc背景颜色，gc钩的颜色,type为0是没有圆为1是有圆*/
		public static getRadioCircle(bc:number=0XFFFFFF,gc:number=0,type:number=0):egret.Sprite
		{
			var s:egret.Sprite = new egret.Sprite;
			s.addChild(this.getCircle(9,bc,9,9));
			if(type==1){
				var r:egret.Sprite=this.getCircle(5,gc,9,9)
				s.addChild(r);
			}
			return s;
		}
		/**得到矩形-网格
		 * rect.x是x轴数量
		 * rect.y是y轴数量
		 * rect.width是网格宽
		 * rect.height是网格高
		 * lc网格线颜色
		 * */
		public static getGridding(rect:egret.Rectangle,lc:number=0):egret.Sprite
		{
			var s:egret.Sprite=new egret.Sprite;
			s.graphics.lineStyle(0.1,lc);
			var disx:number=rect.width/rect.x;
			var disy:number=rect.height/rect.y;
			for(var i:number=0;i<rect.x;i++){
				s.graphics.moveTo(0,i*disy);
				s.graphics.lineTo(rect.width,i*disy);
			}
			for(i=0;i<rect.y;i++){
				s.graphics.moveTo(i*disx,0);
				s.graphics.lineTo(i*disx,rect.height);
			}
			return s;
		}
	}
}