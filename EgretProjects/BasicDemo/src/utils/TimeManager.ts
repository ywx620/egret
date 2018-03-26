module time {
	/**时间产品接口 */
	export interface ITime
	{
		time:number;
		name:string;
		showNum:number;
		start():void;
		setTimeStart(value:number):void;
		setBackFunction(value:Function):void
		dispose():void
	}
	/**
	 * ...2016-11-18
	 * @author vinson
	 * 抽象时间产品
	 */
	export class TimeAbstract extends egret.EventDispatcher implements ITime
	{
		time:number=0;
		name:string="";
		showNum:number=1;
		protected backfunction:Function;
		protected timer:egret.Timer;
		constructor(target:egret.IEventDispatcher=null)
		{
			super(target);
		}
		private removeTime():void
		{
			if(this.timer){
				this.timer.stop();
				this.timer.removeEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
				this.timer=null;
			}
		}
		private createTime():void
		{
			this.removeTime();
			this.timer=new egret.Timer(1000,this.time);
			this.timer.addEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
		}
		/**把数字转换成时间格式,showNum为3时00:00:00,为2时00:00,为1时00*/
		public getTimeFormatByNum(num:number,type:string=":",showNum:number=3):string
		{
			var s:string;
			var hour:string;
			var minute:string;
			var second:string;
			if(showNum==1){
				second = this.numberFormat(num);
				return second;
			}else if(showNum==2){
				minute = this.numberFormat((num/60));
				second = this.numberFormat(num%60);
				return minute+type+second;
			}else{
				hour = this.numberFormat(num/60/60>>0);
				minute = this.numberFormat((num/60) % 60);
				second = this.numberFormat(num%60);
				return hour+type+minute+type+second;
			}
		}
		/**数字格式，把小于10的数在前面加个0*/
		protected numberFormat(num:number):string
		{
			if(num>=10)			return ""+Math.floor(num);
			else				return "0"+Math.floor(num);
		}
		/**此方法必须被子类重写*/
		protected onTimer(event:egret.TimerEvent=null):void
		{
			throw new Error("抽像类不能实例化,必须使用子类实例化")
		}
		/**设置开始计时并且开始计时 value是单位是秒*/
		public setTimeStart(vaule:number):void
		{
			this.time=vaule;
			this.start();
		}
		/**开始计时*/
		public start():void
		{
			if(this.timer==null){
				this.createTime();
			}
			this.timer.start();
			this.onTimer();
		}
		public setBackFunction(value:Function):void
		{
			this.backfunction=value;
		}		
		public dispose():void
		{
			this.removeTime();
		}
	}
	/**
	 * ...2016-11-17
	 * @author vinson
	 * 倒计时产品
	 */
	export class TimeCountDown extends TimeAbstract
	{
		protected onTimer(event:egret.TimerEvent=null):void
		{
			var value:number=this.time--;
			var show:string=this.getTimeFormatByNum(value,":",this.showNum);
			var data:Object={value:value,show:show}
			if(this.backfunction!=null)	this.backfunction(data);
			if(value==0){
				this.time=0;
				this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
			}
		}
	}
	/**
	 * ...2016-11-17
	 * @author vinson
	 * 计时器产品
	 */
	export class TimeCountUp extends TimeAbstract
	{
		protected onTimer(event:egret.TimerEvent=null):void
		{
			var value:number=this.time++;
			var show:string=this.getTimeFormatByNum(value,":",this.showNum);
			var data:Object={value:value,show:show}
			if(this.backfunction!=null)	this.backfunction(data);
		}
	}
	/**
	 * ...2016-11-17
	 * @author vinson
	 * 时间的简单工厂模式(生产倒计时和计时器两种产品)
	 * 可根据产品标签名和类型的不同生产各种独立的产品,各产品独立运行相互不干扰
	 * 在UI层上的表示,UI关闭后,产品依然在继续运行.
	 * 重新打开UI后,只要判断一下产品时间是否为0,不为0则不需要重新赋直,产品会继续运行
	 * 如果是倒计时,当时间为0时会自动销毁,如果是计时器则需要手动
	 */
	export class TimeFactory
	{
		private content:Object={};
		private _timeName:number=0;
		private static _instance:TimeFactory;
		public static COUNT_DOWN:string="down";
		public static COUNT_UP:string="up";
		public static getIns():TimeFactory {
			if(this._instance == null) {
				this._instance = new TimeFactory();
			}
			return this._instance;
		}
		/**如果找不到合适的key值，可以使用这个做为key值*/
		public get timeName():string
		{
			this._timeName++;
			return "timeFactory"+this._timeName;
		}
		/**在工厂中创建时间产品*/
		public createTime(name:string,type:string="down"):ITime
		{
			if(this.content[name]==null){//如果工厂仓库中没有找到同标签的产品,那么生产新产品
				var time:ITime;
				if(type==TimeFactory.COUNT_DOWN){//创建倒计时产品
					time=new TimeCountDown();
					(<TimeCountDown>time).addEventListener(egret.Event.COMPLETE,this.onComplete,this);
				}else{//创建计时器产品
					time=new TimeCountUp();
				}
				time.name=name;//给产品标个签名
				this.content[name]=time;//把产品放入工厂仓库中
			}
			return this.content[name];
		}
		/**找到时间产品然后销毁掉(倒计时的时间到了是可以自动销毁,不过计时器是不能自动销毁的)*/
		public removeTime(name:string):void
		{
			var time:ITime=this.content[name];
			if(time){
				this.dispose(time);
			}
		}
		/**得到已经存在的时间产品*/
		public getContentTime(name:string):ITime
		{
			var time:ITime=this.content[name];
			if(time) return time;
			return null;
		}
		/**当倒计时产品时间为0时表示此产品已经过期,时间工厂会自动把它销毁掉*/
		protected onComplete(event:egret.Event):void
		{
			var time:ITime=<ITime>(event.currentTarget);
			this.dispose(time)
		}
		/**消毁时间产品*/
		private dispose(time:ITime):void
		{
			time.dispose();
			delete this.content[time.name];
		}
	}
}