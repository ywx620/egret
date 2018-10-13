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
var eui;
(function (eui) {
    /**
     * @private
     */
    var ScrollerThrowEvent = (function (_super) {
        __extends(ScrollerThrowEvent, _super);
        /**
         * 动画信息，可调节或修改
         */
        //public tween;
        function ScrollerThrowEvent(type, bubbles, cancelable, currentPos, toPos) {
            var _this = _super.call(this, type, bubbles, cancelable) || this;
            currentPos = +currentPos;
            toPos = +toPos;
            _this.currentPos = currentPos;
            _this.toPos = toPos;
            return _this;
        }
        ScrollerThrowEvent.THROW = "throw";
        return ScrollerThrowEvent;
    }(egret.Event));
    eui.ScrollerThrowEvent = ScrollerThrowEvent;
    __reflect(ScrollerThrowEvent.prototype, "eui.ScrollerThrowEvent");
})(eui || (eui = {}));
//# sourceMappingURL=ScrollerThrowEvent.js.map