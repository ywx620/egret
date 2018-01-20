var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ArrayManager = (function () {
    function ArrayManager() {
    }
    /**用已有的数组得到随机数组 */
    ArrayManager.getRandomArray = function (array) {
        var value = [];
        var copy = array.concat();
        while (copy.length > 0) {
            var index = Math.floor(Math.random() * copy.length);
            value.push(copy.splice(index, 1)[0]);
        }
        return value;
    };
    return ArrayManager;
}());
__reflect(ArrayManager.prototype, "ArrayManager");
//# sourceMappingURL=ArrayManager.js.map