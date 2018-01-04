
class Const extends egret.HashObject
{
    public static START:string="game start";
    public static COMPLETE:string="game complete";
}
class StartPanel extends eui.Component {
    btnStart:eui.Button;
    btnSet:eui.Button;
    btnClose:eui.Button;
    constructor() {
        super();
         this.skinName="resource/assetsUI/UIStart.exml";
    }
    protected createChildren() {
       this.btnStart.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onClick,this)
    }
    private onClick(e:egret.TouchEvent){
        egret.log(e.currentTarget);
        switch(e.currentTarget){
            case this.btnStart:
            this.dispatchEvent(new egret.Event(Const.START,false,false,"start"));
            break;
        }
    }
}
/**25游戏 */
class GamePanel extends eui.Component {
    group:eui.Group;
    btnClose:eui.Button;
    txtTime:eui.Label;
    time:number;
    constructor() {
        super();
        this.skinName="resource/assetsUI/UIGame.exml";
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.stopGame,this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.startGame,this);
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onClick,this);
    }
    private loop(t){
        var count=egret.getTimer()-this.time;
        count=count/1000;
        this.txtTime.text=""+count;
        return true;
    }
    protected startGame(){
        this.createRect();
        this.time=egret.getTimer();
        egret.startTick(this.loop, this);
    }
    private rects:any[];
    private index:number=1;
    private createRect(){
        var rects=new Array;
        for(var i=0;i<25;i++){
            var btn:eui.Button=new eui.Button;
            btn.width=btn.height=110;
            btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.checkNode,this);
            btn.label=""+Number(i+1);
            this.group.addChild(btn);
            rects.push(btn);
        }
        rects=this.getRandomArrayByArray(rects);
        LayoutManager.displayRank(rects,5,10,10,20,20,1);
        this.rects=rects;
    }
    /**得到数据随机排序*/
    public getRandomArrayByArray(datas:any[])
    {
        var temps:any[]=datas;
        var array:any[]=new Array;
        for (var i = 0, len = temps.length; i < len; i++) {
            var j= Math.floor(Math.random() * temps.length);
            array[i] = temps[j];
            temps.splice(j, 1);
        }
        return array;
	}
    private checkNode(e:egret.TouchEvent){
        var btn:eui.Button=e.currentTarget;
        //egret.log("num",btn.label);
        if(parseInt(btn.label)==this.index){
            this.index++;
            btn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.checkNode,this);
            btn.touchEnabled=false;
             btn.alpha=0.5;
        }
        if(this.index==26){
             this.gameOver();
        }
    }
    private gameOver(){
        egret.stopTick(this.loop,this);
        this.dispatchEvent(new egret.Event(Const.COMPLETE,false,false,"用时是"+this.txtTime.text+"秒"));
    }
    private onClick(e:egret.TouchEvent){
        this.parent.removeChild(this);
    }
    private stopGame(){
        egret.log("stop");
        var rects=this.rects;
        for(var i=0;i<25;i++){
            var btn:eui.Button=rects[i];
            btn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.checkNode,this);
            this.group.removeChild(btn);
        }
        this.index=1;
        egret.stopTick(this.loop,this)
    }
}

class OverPanel extends eui.Component {
    label:eui.Label;
    btnClose:eui.Button;
    constructor() {
        super();
         this.skinName="resource/assetsUI/UIOver.exml";
    }
    protected createChildren() {
         this.x=(this.stage.stageWidth-this.width)>>1;
         this.y=(this.stage.stageHeight-this.height)>>1;
         this.btnClose.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onClick,this);
    }
    private onClick(e:egret.TouchEvent){
        this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onClick,this);
        this.parent.removeChild(this);
    }
    public setData(o){
        this.label.text=o;
    }
}