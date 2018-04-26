/**可与PHP通信的类 */
class RequestServer extends moon.MoonContainer{
	private urlloader:egret.URLLoader; 
	private urlreq:egret.URLRequest; 
	public constructor() {
		super();
		this.urlloader = new egret.URLLoader(); 
		this.urlreq = new egret.URLRequest(); 
		this.urlloader.dataFormat = egret.URLLoaderDataFormat.VARIABLES; 
		this.urlreq.method = egret.URLRequestMethod.POST; 
		this.urlloader.addEventListener(egret.Event.COMPLETE, this.onComplete, this);
		this.urlloader.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onError,this);
	}
	/***
	 * 设置模式
	 * 参数value为模式支持GET与POST
	 * value:egret.URLRequestMethod.POST;/egret.URLRequestMethod.GET;
	 */
	public setMethod(value:string):void
	{
		this.urlreq.method = value;
	}
	/***
	 * 设置数据类型
	 * 参数value为数据类型
	 * value:egret.URLLoaderDataFormat.VARIABLES;/egret.URLLoaderDataFormat.TEXT;等等
	 */
	public setDataFormat(value:string):void
	{
		this.urlloader.dataFormat = value;
	}
	/***
	 * 设置地址与参数
	 * 参数url为地方param为参数
	 * url："http://127.0.0.1/test/helloPhp.php"
	 * param："userId=9527&password=123456"
	 */
	public setUrl(url:string,param:string):void
	{
		this.urlreq.url = url; 
		this.urlreq.data = new egret.URLVariables(param); 
		this.urlloader.load(this.urlreq); 
	}
	/**返回的数据 */
	private onComplete(event:egret.Event):void{ 
		this.dispEvent(moon.MoonEvent.COMPLETE,this.urlloader.data);
	} 
	private onError(event:egret.IOErrorEvent):void
	{
		this.dispEvent(moon.MoonEvent.ERROR,event.type);
	}
}