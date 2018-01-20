/** 卡片翻转类
 * 传入正背面卡牌
*/
class CardTurn extends egret.DisplayObjectContainer
{
    public static readonly CARD_FRONT:string="front";
    public static readonly CARD_BACK:string="back";
    public onTurnComplete:Function;
    private status:string;
    private cardFront:egret.DisplayObject;
    private cardBack:egret.DisplayObject;
    private tween:egret.Tween;
    public constructor(cardFront:egret.DisplayObject,cardBack:egret.DisplayObject)
    {
       super();
       this.cardFront=cardFront;
       this.cardBack=cardBack;
       this.setStatus(CardTurn.CARD_FRONT);
    }
    /**设置状态，只有两个状态一个正面一个背面 */
    public setStatus(status:string):void
    {
        this.status=status;
        this.show();
    }
    /**是否是正面*/
    public isFront():boolean
    {
        return this.status==CardTurn.CARD_FRONT;
    }
    /**开始翻转，默认翻转时间是100毫秒 */
    public turn(time:number=100):void
    {
        if(this.scaleX==1){
            this.tween=egret.Tween.get(this);
            this.tween.to({scaleX:0},time)
            this.tween.call(this.call1,this);
            this.tween.wait(10).to({scaleX:1},time);//翻页完等10毫秒后再翻页
            this.tween.call(this.call2,this);
        }
    }
    /**第一次翻页结束后修改状态 */
    private call1():void
    {
        this.status=this.status==CardTurn.CARD_FRONT?CardTurn.CARD_BACK:CardTurn.CARD_FRONT;
        this.setStatus(this.status);
    }
    /**第二次翻页结束后删除动画 */
    private call2():void
    {
        egret.Tween.removeTweens(this);
        if(this.onTurnComplete!=null){
            this.onTurnComplete();
        }
    }
    private show():void
    {
        this.removeChildren();
        if(this.status==CardTurn.CARD_FRONT){
            this.addChild(this.cardFront);
        }else {
            this.addChild(this.cardBack);
        }
    }
}