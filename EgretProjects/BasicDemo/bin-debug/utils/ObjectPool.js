var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var utils;
(function (utils) {
    //import flash.utils.Dictionary;
    //import flash.utils.getDefinitionByName;
    //import flash.utils.getQualifiedClassName;
    /**
     * 用于显示对象的对象池类
     */
    var ObjectPool = (function () {
        function ObjectPool() {
            /**
             *  作为对象池的词典dict
             */
            this.objPoolDict = {};
        }
        ObjectPool.getIns = function () {
            if (this.instance == null) {
                this.instance = new ObjectPool;
            }
            return this.instance;
        };
        /**
         * 向对象池中放入对象，以便重复利用
         * @param disObj 要的放入对象
         */
        ObjectPool.prototype.push = function (oldObj) {
            var objName = egret.getQualifiedClassName(oldObj);
            if (oldObj == null) {
                return;
            }
            if (this.objPoolDict[objName] == null) {
                this.objPoolDict[objName] = [];
            }
            this.objPoolDict[objName].push(oldObj);
        };
        /**
         * 从对象池中取出需要的对象
         * @param targetObj 需要的对象类类名，没必要必须是类实例名 类名就可以
         * @return 取出的相应对象
         *
         */
        ObjectPool.prototype.pop = function (targetObj) {
            var objName = egret.getQualifiedClassName(targetObj);
            if (this.getHas(targetObj)) {
                return this.objPoolDict[objName].pop();
            }
            var objClass = egret.getDefinitionByName(objName);
            var obj = new objClass;
            return obj;
        };
        ObjectPool.prototype.getHas = function (targetObj) {
            var objName = egret.getQualifiedClassName(targetObj);
            if (this.objPoolDict[objName] != null && this.objPoolDict[objName].length > 0) {
                return true;
            }
            return false;
        };
        return ObjectPool;
    }());
    utils.ObjectPool = ObjectPool;
    __reflect(ObjectPool.prototype, "utils.ObjectPool");
})(utils || (utils = {}));
//# sourceMappingURL=ObjectPool.js.map