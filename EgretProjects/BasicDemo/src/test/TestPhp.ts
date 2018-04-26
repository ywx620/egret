//var url:string="http://127.0.0.1/test/helloPhp.php"; 
var url:string="http://ptdao.piwater.cn/ywx/data/helloPhp.php"; 
class TestPhp {
	public constructor() {
		var rs:RequestServer=new RequestServer();
		rs.setUrl(url,"userId=9527&password=123456");
		rs.addEvent(moon.MoonEvent.COMPLETE,this.onComplete,this);
	}
	private onComplete(event:moon.MoonEvent):void{ 
		trace(event.data);
	} 
}