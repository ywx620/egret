var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * 皮肤基础类
 * 创建时间2017/12/5
 * @author vinson
 */
var BasicComponent = (function (_super) {
    __extends(BasicComponent, _super);
    function BasicComponent() {
        return _super.call(this) || this;
    }
    BasicComponent.prototype.setSkinName = function (skinName) {
        this.addEventListener(eui.UIEvent.COMPLETE, this.onComplete, this);
        this.skinName = skinName;
    };
    BasicComponent.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.isCreateChildren = true;
        this.init();
    };
    BasicComponent.prototype.onComplete = function () {
        this.isLoadComplete = true;
        this.init();
    };
    BasicComponent.prototype.init = function () {
        if (this.isCreateChildren && this.isLoadComplete) {
            this.render();
        }
    };
    /**从这个渲染开始*/
    BasicComponent.prototype.render = function () {
    };
    BasicComponent.prototype.createBitmapByName = function (name, rect) {
        if (rect === void 0) { rect = null; }
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        if (rect != null)
            result.scale9Grid = rect;
        return result;
    };
    /**
     * 增加键盘事件,传入类型keydown或keyup和回调函数，回调函数返回参数的对象包括类型与键值
     * @param type "keydown","keyup"
     * @param backCall 返回函数，函数带回来的参数是个对像
     */
    BasicComponent.prototype.addKeyboardEvent = function (type, backCall) {
        var that = this;
        document.addEventListener(type, function (e) {
            if (backCall) {
                backCall({ type: type, keyCode: e.keyCode });
            }
        });
    };
    return BasicComponent;
}(eui.Component));
__reflect(BasicComponent.prototype, "BasicComponent");
//# sourceMappingURL=BasicComponent.js.map