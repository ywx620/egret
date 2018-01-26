class ModuleMediator extends puremvc.Mediator
{
    public static NAME: string = "MediatorView";
    private view:moon.BasicView;
    constructor(mediatorName:string=null, viewComponent:Object=null){
        super(mediatorName);
        this.view=viewComponent as moon.BasicView;
    }
    public onRegister():void
    {
        this.facade().registerMediator(new SendMediator(SendMediator.NAME,this.view));
        this.facade().registerMediator(new ReceiveMediator(ReceiveMediator.NAME,this.view));
    }
}
class ModuleView extends moon.BasicView
{
    protected render():void
    {
        this.createRect(this.stage.stageWidth,this.stage.stageHeight,0X333300);
    }
}

//---------------
/**基础类 */
class BasicMediator extends puremvc.Mediator
{   
    protected container:moon.BasicView;
    protected view:moon.BasicView;
    constructor(mediatorName:string=null, viewComponent:Object=null){
        super(mediatorName);
        this.container=viewComponent as moon.BasicView;
    }
}

//------接收方----Mediator----
class ReceiveMediator extends BasicMediator
{
    public static NAME:string="ReceiveMediator";
    private num1:string;
    private num2:string;
    private sign:string;
    constructor(mediatorName:string=null, viewComponent:Object=null){
        super(mediatorName,viewComponent);
    }
    public onRegister():void
    {
        this.view=new ReceiveView();
        this.container.addChild(this.view);
        this.clear();
    }
    public listNotificationInterests(): string[] {
        return [MVCConst.DATA_TRANSPOND,MVCConst.RESULT_RELEASE];
    }
    public handleNotification(notification: puremvc.INotification): void {
        switch(notification.getName()){
            case MVCConst.DATA_TRANSPOND://数据转发
                this.showTranspond(notification.getBody());
            break;
            case MVCConst.RESULT_RELEASE://结果发布
                this.showResult(notification.getBody());
            break;
        }
    }
    /**清空 */
    protected clear():void
    {
        this.num1=this.num2=this.sign="";
        (this.view as ReceiveView).clear();
    }
    /**查看是否符合规定，符合规定时所有的都不能为空 */
    protected get hasStipulation():boolean
    {
        if(this.num1==""||this.num2==""||this.sign=="") return false;
        return true;
    }
    /**设置转发的值 */
    public setTranspond(value:string):void
    {
         var receiveView:ReceiveView=(this.view as ReceiveView);
         receiveView.setProcess(value);
    }
    /**把数字显示出来 */
    public pushNumber(num:number,value:string):void
    {
        var receiveView:ReceiveView=(this.view as ReceiveView);
         if(this.sign==MVCConst.HAS_SIGN&&receiveView.getResult()==this.num1){
             //如果符号有值（不是加减乘除），并且上一次计算结果等于num1，如果这时候输入数字则清空，重新计算
             if(MVCConst.SIGNS.indexOf(value)<0){
                 this.clear();
             }
         }
        receiveView.pushNumber(num,value);
    }
    /**显示转发的值 */
    protected showTranspond(data:Object):void
    {
        var value:string=<string>data;
        var index:number=MVCConst.SIGNS.indexOf(value);
        if(index<0){//没有找到则表示是数字或小数点
            var num:number;
            var numstr:string;
            if(this.sign=="")     numstr=this.num1;
            else                  numstr=this.num2;
            if(value=="."){
                if(numstr.indexOf(value)<0){
                    numstr+=value;
                }
            }else{
                numstr+=value;
            }
            num=parseFloat(numstr);
            this.pushNumber(num,value);

            if(this.sign=="")     this.num1=numstr;
            else                  this.num2=numstr;
        }else{
            if(value=="c"){//清空
                this.clear();
            }else if(value=="="){//结果
                this.setTranspond(value);
                this.sendCalculate();
            }else{//算法符号
                if(this.num1!=""){//第一个数字不是空才可以输入符号
                    this.setTranspond(value);
                    this.sendCalculate();
                    this.sign=value;
                }
            }
        }
    }
    /**发送去计算 */
    protected sendCalculate():void
    {
        if(this.hasStipulation){
            var index:number=MVCConst.SIGNS.indexOf(this.sign);
            var type:string=MVCConst.CMDS[index];
            this.facade().sendNotification(type,{num1:parseFloat(this.num1),num2:parseFloat(this.num2)});
        }
    }
    /**显示结果 */
    protected showResult(data:Object):void
    {
        var value:string=<string>data;
        (this.view as ReceiveView).setResult(value);
        this.num1=value;//num1变量保存上次计算结果
        this.sign=MVCConst.HAS_SIGN//符号标为有值，则再输入数字时就会转到num2
        this.num2="";
    }
}
//------接收方----view----
class ReceiveView extends moon.BasicView
{
    protected txtProcess:TextField;
    protected txtResult:TextField;
    protected render():void
    {
        this.createRect(this.stage.stageWidth,200,0X666600);
        this.txtProcess=this.createText(10,10);
        this.txtResult=this.createText(10,150);

        this.txtProcess.width=this.stage.stageWidth-10;
        this.txtProcess.height=130;
        this.txtProcess.multiline=true;
        this.txtProcess.wordWrap=true;
        //this.txtProcess.textAlign = egret.HorizontalAlign.LEFT;
        this.txtResult.textAlign = egret.HorizontalAlign.LEFT;
        this.txtProcess.size=40;
        this.txtResult.size=50;
    }
    /**清空 */
    public clear():void
    {
        this.txtProcess.text=this.txtResult.text="";
    }
    /**设置计算处理值 */
    public setProcess(value:string):void
    {
        if(MVCConst.SIGNS.indexOf(value)>=0){//如果是符号
            var str:string=this.txtProcess.text
            var last:string=str.substr(str.length-1,1);
            //查看一下最后一位数是不是符号，如果是得删除掉，然后替换最新符号
            if(MVCConst.SIGNS.indexOf(last)>=0){
                this.txtProcess.text=str.substr(0,str.length-1);
            }
        }
        this.txtProcess.appendText(value);
    }
    /**经过整理后显示数字*/
    public pushNumber(num:number,point:string):void
    {
        var value:string=this.txtProcess.text;
        var numstr:string=num.toString();
        if(point=="."&&numstr.indexOf(point)<0){
            numstr+=point;
        }
        if(value==""){
            this.txtProcess.appendText(numstr);
        }else{
            while(value.length>0){
                var last:string=value.substr(value.length-1,1);
                if(MVCConst.SIGNS.indexOf(last)>=0){
                    this.txtProcess.text=value;
                    this.txtProcess.appendText(numstr);
                    break;
                }else{
                    value=value.substr(0,value.length-1);
                }
            }
            if(value.length==0){
                this.txtProcess.text=numstr;
            }
        }
    }
    /**设置结果值 */
    public setResult(value:string):void
    {
        this.txtResult.text=value;
    }
    /**得到结果值 */
    public getResult():string
    {
        return this.txtResult.text;
    }
}

//-------发送方----Mediator----
class SendMediator extends BasicMediator
{
    public static NAME:string="SendMediator";
    constructor(mediatorName:string=null, viewComponent:Object=null){
        super(mediatorName,viewComponent);
    }
    public onRegister():void
    {
        this.view=new SendView();
        this.container.addChild(this.view);
        this.view.addEvent(moon.MoonEvent.CLICK,this.onClick.bind(this));
        this.view.y=210;
    }
    /**发送转发数据*/
    protected onClick(e:moon.MoonEvent):void
    {
        this.facade().sendNotification(MVCConst.CMD_TRANSPOND,e.data);
    }
}
//-------发送方----view----
class SendView extends moon.BasicView
{
    private shows:string[];
    protected render():void
    {
        this.createRect(this.stage.stageWidth,this.stage.stageHeight-200,0X999900,0,0);
        this.shows=["0","1","2","3","4","5","6","7","8","9","."];
        this.shows=this.shows.concat(MVCConst.SIGNS);
        var len:number=this.shows.length;
        var btns:Button[]=[];
        for(var i:number=0;i<len;i++){
            var btn:Button=new Button;
            btn.width=btn.height=146;
            btn.label=this.shows[i];
            btn.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToState,this);
            btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClick,this);
            this.addChild(btn);
            btns.push(btn);
        }
        LayoutManager.displayRank(btns,4,10,10,10,40);
    }
    protected onAddToState(e:egret.Event):void
    {
        var btn:Button=e.currentTarget as Button;
        btn.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToState,this);
        (btn.labelDisplay as eui.Label).size=50;
    }
    protected onClick(e:egret.TouchEvent):void
    {
        var btn:Button=e.currentTarget as Button;
        this.dispEvent(moon.MoonEvent.CLICK,btn.label);
    }
}
