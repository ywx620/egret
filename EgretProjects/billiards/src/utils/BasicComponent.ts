class BasicComponent extends eui.Component {
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