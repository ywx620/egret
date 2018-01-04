var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
*
* @xyl
* 自定义事件管理器
*/
var EventManager = (function () {
    function EventManager() {
    }
    // 添加事件
    EventManager.addEvent = function (type, fun, thisObject) {
        if (this.eventList[type] == null) {
            this.eventList[type] = [];
        }
        var len = this.eventList[type].length;
        this.eventList[type][len] = { "fun": fun, "this": thisObject };
    };
    //删除事件
    EventManager.removeEvent = function (type, fun, thisObject) {
        var dic = this.eventList[type];
        if (dic == null)
            return;
        for (var i in dic) {
            var data = dic;
            if (data["fun"] == fun) {
                dic.splice(i, 1);
            }
        }
    };
    //派发事件
    EventManager.dispatchEvent = function (type, data) {
        var dic = this.eventList[type];
        if (!dic)
            return;
        for (var i = 0; i < dic.length; i++) {
            var data1 = dic;
            data1["fun"].apply(data1["this"], [data]);
        }
    };
    EventManager.hasEvent = function (type) {
        var dic = this.eventList[type];
        if (!dic)
            return false;
        return true;
    };
    //删除无用事件类型
    EventManager.gc = function () {
    };
    EventManager.eventList = {};
    return EventManager;
}());
__reflect(EventManager.prototype, "EventManager");
//# sourceMappingURL=EventManager.js.map