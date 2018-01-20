class Uinfy{
    /**用来判断方法/类/接口等类型 a是否为b类型 例如as(btn,Button)*/
    public static as(a:any,b:any):boolean
    {
        return a instanceof b;
    }
    /**用来判断变量类型 a是否为b类型 例如as2(str,'string')
     * '"string" | "number" | "boolean" | "symbol" | "undefined" | "object" | "function"' and '"array"'
     * */
    public static as2(a:any,b:string):boolean
    {
        return typeof a === b
    }
    /**显示所有可示对象 */
    public static show(...args):void
    {
        if(Uinfy.as(args[0],Array)) for(var i:number=0;i<args[0].length;i++) args[0][i].visible=true;
        else for(i=0;i<args.length;i++) args[i].visible=true;
    }
     /**隐藏所有可示对象 */
    public static hide(...args):void
    {
        if(Uinfy.as(args[0],Array)) for(var i:number=0;i<args[0].length;i++) args[0][i].visible=false;
        else for(i=0;i<args.length;i++) args[i].visible=false;
    }
    /**数组中显示或隐藏几个*/
    public static hideShowNum(args:any[],boo:boolean,start:number=0,end:number=-1):void
    {
        end=end==-1?args.length:end;
        for(var i:number=start;i<end;i++) args[i].visible=boo;
    }
    /**创建图片 */
    public static  createBitmapByName(name: string,rect:egret.Rectangle=null): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        if(rect!=null) result.scale9Grid=rect;
        return result;
    }
    /**设置可示对象是否为灰色 */
    public static imageSetGray(image:egret.DisplayObject,isGray:boolean):void
    {
        if(isGray){
            image.filters = [new egret.ColorMatrixFilter([
                            0.3, 0.6, 0, 0, 0,
                            0.3, 0.6, 0, 0, 0,
                            0.3, 0.6, 0, 0, 0,
                            0, 0, 0, 1, 0
            ])]
        }else{
            image.filters =[];
        }
    }
}