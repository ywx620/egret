/**
 * 碰撞控制单例管理类
 * 创建时间2017/12/5
 * @author vinson
 */
class HitManager extends egret.HashObject {
    private static instance:HitManager;
    public static getIns():HitManager{
        if(this.instance == null){
            this.instance = new HitManager();
        }
        return this.instance;
    }
    /**两个可显示对象的区域碰撞*/
    public hitTestRect(obj1: egret.DisplayObject,obj2: egret.DisplayObject): boolean {
        var rect1:egret.Rectangle = obj1.getBounds();//获取显示对象的测量边界
        var rect2:egret.Rectangle = obj2.getBounds();//获取显示对象的测量边界
        rect1.x=obj1.x;rect1.y=obj1.y;
        rect2.x=obj2.x;rect2.y=obj1.y;
        //此方法检查指定的 Rectangle 对象的 x、y、width 和 height 属性，以查看它是否与此 Rectangle 对象相交。
        return rect1.intersects(rect2);
    }
}