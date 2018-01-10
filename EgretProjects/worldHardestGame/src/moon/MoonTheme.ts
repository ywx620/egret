var trace=function(...arg):void
{
    for(let i:number=0;i<arg.length;i++){
         moon.showLog.getIns().logMessage(arg[i])
    }
}
var simpleTrace=function(s):void
{
    moon.showLog.getIns().log(s);
}
module moon
{
    /**
	 * ...
	 * 默认参数x轴,y轴,w宽,h高,r半径,c颜色,ew圆角宽,eh圆家高
	 * @author vinson
	 */
    export class MoonUI
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
    //--------------
	export class showLog
	{
		private static instance:showLog;
		private txtSimple:egret.TextField;
		private txtMessage:egret.TextField;
		public static getIns():showLog{
				if(this.instance == null){
						this.instance = new showLog();
				}
				return this.instance;
		}
		public init(stage:egret.Stage):void
		{
			var txt:egret.TextField=new egret.TextField;
			txt.textAlign = egret.HorizontalAlign.LEFT;
			stage.addChild(txt);
			this.txtSimple=txt;

			var txt:egret.TextField=new egret.TextField;
			txt.size=25;
			stage.addChild(txt);
			this.txtMessage=txt;
		}
		/**每次都覆盖上一次信息 */
		public log(value:string):void
		{
			this.txtSimple.text=value;
		}
		/**显示所有信息 */
		public logMessage(value:string):void
		{
			this.txtMessage.appendText(value+"\n");
		}
		
	}
	export class TipsManager
	{
		private static instance:TipsManager;
		private stage:egret.Stage;
		private tipsView:BasicTips;
		public static getIns():TipsManager{
			if(this.instance == null){
					this.instance = new TipsManager();
			}
			return this.instance;
		}
		public init(stage:egret.Stage):void
		{
			this.stage=stage;
		}
		public simpleTips(value:string,pos:egret.Point):void
		{
			if(this.tipsView==null){
				this.tipsView=new moon.BasicTips("tips_png");
        		this.tipsView.setValue(value)
        		this.stage.addChild(this.tipsView);
				this.setPosition(pos);
				this.stage.addEventListener(egret.TouchEvent.TOUCH_END,this.removeTips,this);
			}
		}
		protected setPosition(pos:egret.Point):void
		{
			if(pos){
				this.tipsView.x=pos.x-(this.tipsView.width>>1);
				this.tipsView.y=pos.y-this.tipsView.height*2;
				if(this.tipsView.y<0){
					this.tipsView.x=pos.x+50
					this.tipsView.y=pos.y;
				}
				if(this.tipsView.x<0){
					this.tipsView.x=pos.x+50
					this.tipsView.y=pos.y;
				}
				if((this.tipsView.x+this.tipsView.width)>this.stage.stageWidth){
					this.tipsView.x=pos.x-(this.tipsView.width+50);
					this.tipsView.y=pos.y;
				}
			}
		}
		public removeTips():void
		{
			this.stage.removeEventListener(egret.TouchEvent.TOUCH_END,this.removeTips,this);
			var parent:egret.DisplayObjectContainer=this.tipsView.parent;
			if(parent!=null){
				parent.removeChild(this.tipsView);
				this.tipsView=null;
			}
		}
	}
	export class MoonEvent extends egret.EventDispatcher
	{
		//button event
		public static readonly MOUSE_OVER:string="event-over";
		public static readonly MOUSE_OUT:string="event-out";
		public static readonly MOUSE_DOWN:string="event-down";
		public static readonly MOUSE_UP:string="event-up";
		public static readonly CLICK:string="event-click";
		
		//tabbar event
		public static readonly CHANGE:string="change";
		public static readonly COMPLETE:string="complete";
		public static readonly UPDATE:string="update";
		public static readonly CHANGE_ROLE:string="change role";
		
		public currentTarget:Object;
		public type:string;
		public data:Object;
		public dataType:Object;
		public constructor(type:string="",data:Object=null,currentTarget:Object=null)
		{
			super();
			this.type=type;
			this.data=data;
			this.currentTarget=currentTarget;
		}
	}
    export class MoonContainer extends egret.DisplayObjectContainer
	{
		private dataEvent:Object=new Object;
        public constructor()
        {
            super();
            this.init();
            this.addEventListener(egret.Event.ADDED_TO_STAGE,this.addToStage,this);
        }
        private addToStage():void
        {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.addToStage,this);
            this.render();
        }
        /**加载到舞台之前调用 */
        protected init():void
        {

        }
        /**加载到舞台之后调用 */
        protected render():void
        {

        }
		/**发布事件*/
		public newDispatchEvent(type:string,data:Object=null,dataType:Object=null):void
		{
			if(this.dataEvent){
				var fun:Function=this.dataEvent[type] as Function;
				if(fun!=null){
					var moonEvent:MoonEvent=new MoonEvent;
					moonEvent.currentTarget=this;
					moonEvent.data=data;
					moonEvent.type=type;
					moonEvent.dataType=dataType;
					fun(moonEvent);
				}
			}
		}
		/**帧听事件*/
		public newAddEventListener(type:string, listener:Function):void
		{
			if(this.dataEvent&&this.dataEvent[type]==null){
				this.dataEvent[type]=listener;
			}
		}
		/**删除事件*/
		public newRemoveEventListener(type:string, listener:Function):void
		{
			if(this.dataEvent&&this.dataEvent[type]){
				delete this.dataEvent[type];
			}
		}
    }
	export class BasicView extends MoonContainer
	{
		protected createText(x:number=0,y:number=0,s:string=""):egret.TextField
		{
			var text:egret.TextField=new egret.TextField;
			text.x=x;text.y=y;text.text=s;
			this.addChild(text);
			return text;
		}
		protected createRect(w:number,h:number,c:number=0,x:number=0,y:number=0):egret.Sprite
		{
			var sprite:egret.Sprite=moon.MoonUI.getRect(w,h,c,x,y);
			this.addChild(sprite);
			return sprite;
		}
		protected createCircle(r:number,c:number=0,x:number=0,y:number=0):egret.Sprite
		{
			var sprite:egret.Sprite=moon.MoonUI.getCircle(r,c,x,y);
			this.addChild(sprite);
			return sprite;
		}
	}
    export class MapHorizontalHouse extends MoonContainer
	{
        private rect:egret.Rectangle;
        private house:egret.Rectangle;
        private color:number
        public constructor(rect:egret.Rectangle,house:egret.Rectangle,color:number=-1)
        {
            super();
            this.rect=rect;
            this.house=house;
            this.color=color;
        }
        protected render():void
        {
            var house:egret.Rectangle=this.house;
            var bg:egret.Sprite=moon.MoonUI.getRect(this.rect.width,this.rect.height);
            bg.alpha=0.1;
            this.addChild(bg);

            var count:number=this.rect.width/house.width;
            var prevx:number=0;
            for(var i:number=0;i<count;i++){
                var color=this.color==-1?Math.random()*0XFFFFFF:this.color;
                var width:number=house.width+Math.random()*house.x;
                var height:number=house.height+Math.random()*house.y;
                var rect=moon.MoonUI.getRect(width,height,color);
                this.addChild(rect);
                rect.y=this.rect.height-rect.height;
                rect.x=prevx;
                prevx=rect.x+rect.width;
            }
        }
    }
	export class Scale9Image extends MoonContainer
	{
		private image:eui.Image;
		public constructor(name:string)
        {
            super();
			this.image=new eui.Image(name);
			this.image.scale9Grid=new egret.Rectangle(4,4,2,2);
			this.addChild(this.image);
		}
		/**设置宽高，默认为0是不改变大小 */
		public setSize(w:number=0,h:number=0):void
		{
			if(w>0)	this.image.width=w;
			if(h>0)	this.image.height=h;
		}
	}
	export class BasicTips extends MoonContainer
	{
		protected image:Scale9Image;
		protected text:egret.TextField;
		public side:number=14;//文字离边框的距离
		public lineSpacing:number=4;//行间距
		public constructor(skinName:string)
        {
            super();
			this.image=new Scale9Image(skinName);
			this.addChild(this.image);

			this.text=new egret.TextField;
			this.text.textAlign = egret.HorizontalAlign.CENTER;
			this.text.verticalAlign = egret.VerticalAlign.MIDDLE;
			this.text.lineSpacing=this.lineSpacing;
			this.addChild(this.text);
		}
		public setValue(value:string):void
		{
			this.text.text=value;
			this.setCenter();
		}
		public setTextFlow(textFlow:egret.ITextElement[]):void
		{
			this.text.textFlow=textFlow;
			this.setCenter();
		}
		protected setCenter():void
		{
			var image:Scale9Image=this.image;
			var text:egret.TextField=this.text;
			var side:number=this.side;
			var w:number=text.width+side;
			var h:number=text.height+side;
			image.setSize(w,h);
			text.x=text.y=side>>1;
		}
	}
}