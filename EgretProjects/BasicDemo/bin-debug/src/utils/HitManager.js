var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 碰撞控制单例管理类
 * 创建时间2017/12/5
 * @author vinson
 */
var HitManager = (function (_super) {
    __extends(HitManager, _super);
    function HitManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HitManager.getIns = function () {
        if (this.instance == null) {
            this.instance = new HitManager();
        }
        return this.instance;
    };
    /**两个可显示对象的区域碰撞*/
    HitManager.prototype.hitTestRect = function (obj1, obj2) {
        var rect1 = obj1.getBounds(); //获取显示对象的测量边界
        var rect2 = obj2.getBounds(); //获取显示对象的测量边界
        rect1.x = obj1.x;
        rect1.y = obj1.y;
        rect2.x = obj2.x;
        rect2.y = obj1.y;
        //此方法检查指定的 Rectangle 对象的 x、y、width 和 height 属性，以查看它是否与此 Rectangle 对象相交。
        return rect1.intersects(rect2);
    };
    return HitManager;
}(egret.HashObject));
__reflect(HitManager.prototype, "HitManager");
//# sourceMappingURL=HitManager.js.map