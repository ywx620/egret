var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Uinfy = (function () {
    function Uinfy() {
    }
    /**用来判断方法/类/接口等类型 a是否为b类型 例如as(btn,Button)*/
    Uinfy.as = function (a, b) {
        return a instanceof b;
    };
    /**用来判断变量类型 a是否为b类型 例如as2(str,'string')
     * '"string" | "number" | "boolean" | "symbol" | "undefined" | "object" | "function"' and '"array"'
     * */
    Uinfy.as2 = function (a, b) {
        return typeof a === b;
    };
    /**显示所有可示对象 */
    Uinfy.show = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (Uinfy.as(args[0], Array))
            for (var i = 0; i < args[0].length; i++)
                args[0][i].visible = true;
        else
            for (i = 0; i < args.length; i++)
                args[i].visible = true;
    };
    /**隐藏所有可示对象 */
    Uinfy.hide = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (Uinfy.as(args[0], Array))
            for (var i = 0; i < args[0].length; i++)
                args[0][i].visible = false;
        else
            for (i = 0; i < args.length; i++)
                args[i].visible = false;
    };
    /**数组中显示或隐藏几个*/
    Uinfy.hideShowNum = function (args, boo, start, end) {
        if (start === void 0) { start = 0; }
        if (end === void 0) { end = -1; }
        end = end == -1 ? args.length : end;
        for (var i = start; i < end; i++)
            args[i].visible = boo;
    };
    /**创建图片 */
    Uinfy.createBitmapByName = function (name, rect) {
        if (rect === void 0) { rect = null; }
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        if (rect != null)
            result.scale9Grid = rect;
        return result;
    };
    /**设置可示对象是否为灰色 */
    Uinfy.imageSetGray = function (image, isGray) {
        if (isGray) {
            image.filters = [new egret.ColorMatrixFilter([
                    0.3, 0.6, 0, 0, 0,
                    0.3, 0.6, 0, 0, 0,
                    0.3, 0.6, 0, 0, 0,
                    0, 0, 0, 1, 0
                ])];
        }
        else {
            image.filters = [];
        }
    };
    return Uinfy;
}());
__reflect(Uinfy.prototype, "Uinfy");
//# sourceMappingURL=Uinfy.js.map