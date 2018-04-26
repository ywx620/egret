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
    /**通过二维数组得到一维数组 xy为0时取x轴,xy为1时取y轴,index为索引*/
    ArrayManager.getOneArrayByTwoArray = function (array, xy, index) {
        var value = [];
        var copy = array.concat();
        var len = copy.length;
        if (xy == 0) {
            if (index < len) {
                value = copy[index];
            }
        }
        else {
            for (var i = 0; i < len; i++) {
                var temps = copy[i];
                if (index < temps.length) {
                    value.push(temps[temps[i]]);
                }
            }
        }
        return value;
    };
    return ArrayManager;
}());
__reflect(ArrayManager.prototype, "ArrayManager");
//# sourceMappingURL=ArrayManager.js.map