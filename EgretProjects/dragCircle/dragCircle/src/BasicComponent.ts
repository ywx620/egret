class Button extends eui.Button {};
class ImageIcon extends eui.Image {};
class Component extends eui.Component {};
class Label extends eui.Label {};
/**基础皮肤类 */
class BasicComponent extends Component {
    isCreateChildren: boolean;
    isLoadComplete: boolean;
    constructor() {
        super();
    }
    public setSkinName(skinName: string): void {
        this.addEventListener(eui.UIEvent.COMPLETE, this.onComplete, this);
        this.skinName = skinName;
    }
    protected createChildren(): void {
        super.createChildren();
        this.isCreateChildren = true;
        this.init();
    }
    private onComplete(): void {
        this.isLoadComplete = true;
        this.init();
    }
    private init(): void {
        if (this.isCreateChildren && this.isLoadComplete) {
            this.render();
        }
    }
    /**从这个渲染开始*/
    protected render(): void {
        // this.width=this.stage.stageWidth;
        // this.height=this.stage.stageHeight;
    }
    protected createBitmapByName(name: string,rect:egret.Rectangle=null): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        if(rect!=null) result.scale9Grid=rect;
        return result;
    }
    /**
     * 增加键盘事件,传入类型keydown或keyup和回调函数，回调函数返回参数的对象包括类型与键值
     * @param type "keydown","keyup"
     * @param backCall 返回函数，函数带回来的参数是个对像
     */
    public addKeyboardEvent(type:string,backCall:any){
        var self = this;
        document.addEventListener(type,function(e:any){
            if(backCall){
                //返回keyCode是数字，key返回字母，self返回类本身
                backCall({type:type,keyCode:e.keyCode,key:e.key,self:self});
            }
        });
    }
}