class Button extends moon.BasicButton {};
/**游戏模版 */
class GameBasic extends moon.GameView
{
    private panelStart:PanelStart;
    private panelOver:PanelOver;
    private score:number;//分数
    private level:number;//等级
    private blood:number;//血量
    private txtScore:TextField;
    private txtLevel:TextField;
    private txtBlood:TextField;
    private numbers:any[]=[];
    private positions:any[]=[];
    private index:number;
    /**加载到舞台之后调用 */
    protected render():void
    {
        super.render();
        moon.showLog.getIns().init(this.stage);
        this.createBgGradientFill();

        this.txtScore=this.createText();
        this.txtLevel=this.createText(0,50);
        this.txtBlood=this.createText(0);
        

        this.panelStart=new PanelStart;
        this.panelStart.addEvent(moon.MoonEvent.START,this.start,this)

        this.panelOver=new PanelOver;
        this.panelOver.addEvent(moon.MoonEvent.START,this.start,this)

        this.addChild(this.panelStart);

        this.initGame();
        this.initPosition();

        // var gameLoad = new moon.GameLoad;
        // this.addChild(gameLoad);

    }
    protected initGame():void
    {
        this.level=1;
        this.score=0;
        this.blood=100;
        this.index=1;
        this.updateBlood();
        this.updateLevel();
        this.updateScore();
    }
    protected initPosition():void
    {
        var ps:any[]=[];
        var num:number=(this.stageWidth-60)/4
        for(var i:number=0;i<14;i++){
            var x:number=60+Math.floor(i%4)*num;
            var y:number=200+Math.floor(i/4)*90;
            ps.push(new Point(x,y));
        }
        this.positions=ps;
    }
    protected createItem():void
    {
        for(var i:number=0;i<this.numbers.length;i++){
            var btn:moon.BasicButton=this.numbers[i];
            btn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClick,this);
            this.removeChild(btn);
        }
        this.numbers.length=0;
        var len:number=this.level+3;
        var ps:any[]=this.positions.concat();
        //trace(ps.length);
        for(var i:number=0;i<len;i++){
            var num:number=i+1;
            btn=this.createBtn(num.toString());
            btn.name=num.toString();
            this.addChild(btn);
            var index:number=Math.floor(ps.length*Math.random())
            var p:Point=ps[index];
            ps.splice(index,1);
            btn.x=p.x;
            btn.y=p.y;
            this.numbers.push(btn);
        }
    }
    protected createBtn(name:string):moon.BasicButton
    {
        var skin:moon.MoonDisplayObject=new moon.MoonDisplayObject();
        skin.type=moon.Const.SHAPE_CIRCLE;
        skin.data={r:40,c:0XE18E0D};
        skin.setBackground(0XFFFFFF,2);
        var btn:moon.BasicButton=new moon.BasicButton(skin,skin);
        btn.textFild.size=50;
        btn.labelCircle=name;
        return btn;
    }
    protected start(e:moon.MoonEvent):void
    {
        this.initGame();
        this.createItem();
        this.play();
    }
    protected startPlay():void
    {
        for(var i:number=0;i<this.numbers.length;i++){
            var btn:moon.BasicButton=this.numbers[i];
            btn.labelCircle="";
            btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClick,this);
        }
    }
    protected onClick(e:egret.TouchEvent):void
    {
        var btn:moon.BasicButton=e.currentTarget as moon.BasicButton;
        if(btn.name==this.index.toString()){
            btn.labelCircle=btn.name;
            this.index++;
        }else{
            this.over();
        }
        if(this.index==this.numbers.length+1){
            this.score+=this.index;
            this.level++;
            this.blood=100;
            this.index=1;
            this.createItem();
        }
    }
    protected loop(n:number):boolean
    {
        this.updateScore();
        this.updateBlood();
        this.updateLevel();
        return true;
    }
    protected over():void
    {
        this.addChild(this.panelOver);
        this.panelOver.update({score:this.score,level:this.level});
        this.stop();
    }
    protected updateLevel():void
    {
        this.txtLevel.text="level:"+this.level;
    }
    protected updateScore():void
    {
        this.txtScore.text="score:"+this.score;
        if(this.score>0&&this.score%200==0){
            this.level++;
            this.updateLevel();
        }
    }
    protected updateBlood():void
    {
        if(this.blood==0){
            this.startPlay();
            this.blood=-1;
        }else if(this.blood>0){
            this.blood--;
            this.txtBlood.text="time:"+this.blood;
            this.txtBlood.x=(this.stageWidth-this.txtBlood.width)>>1
        }
    }
    public dispose():void
	{
        this.stop();
        super.dispose();
    }
}
/**游戏开始界面 */
class PanelStart extends moon.GameView
{
    /**加载到舞台之后调用 */
    protected render():void
    {
        super.render();
        var bg:Sprite=this.createBackground();
        bg.alpha=0.5;
        
        this.initView();
    }
    protected initView():void
    {
        this.createBtn("开始游戏");
        this.createTitle("记忆数字")
    }
    protected createBtn(value:string):Button
    {
        var btn:moon.BasicButton=this.createButton(value);
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClick,this);
        btn.x=(this.stageWidth-btn.width)>>1;
        btn.y=(this.stageHeight-btn.height)>>1;
        return btn;
    }
    protected createTitle(value:string):TextField
    {
        var title:TextField=this.createText(0,0,value);
        title.x=(this.stageWidth-title.width)/2;
        title.y=(this.stageHeight-title.height)/2-100;
        return title;
    }
    protected onClick(e:egret.TouchEvent):void
    {
        this.removeFromParent();
        this.dispEvent(moon.MoonEvent.START);
    }
}
/**游戏结束界面 */
class PanelOver extends PanelStart
{
    private txtScore:TextField;
    private txtLevel:TextField;
    protected initView():void
    {
        this.createBtn("再来一次");
        this.txtScore=this.createText();
        this.txtLevel=this.createText();
    }
    public update(data:Object):void
    {
        this.txtScore.text="score:"+data["score"];
        this.txtLevel.text="level:"+data["level"];
        this.txtScore.x=(this.stageWidth-this.txtScore.width)/2;
        this.txtLevel.x=(this.stageWidth-this.txtLevel.width)/2;
        this.txtScore.y=(this.stageHeight-this.txtScore.height)/2-60;
        this.txtLevel.y=this.txtScore.y-60;
    }
}
