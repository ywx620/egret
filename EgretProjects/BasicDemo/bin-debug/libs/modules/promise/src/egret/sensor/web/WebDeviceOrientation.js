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
var egret;
(function (egret) {
    var web;
    (function (web) {
        /**
         * @private
         */
        var WebDeviceOrientation = (function (_super) {
            __extends(WebDeviceOrientation, _super);
            function WebDeviceOrientation() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**
                 * @private
                 */
                _this.onChange = function (e) {
                    var event = new egret.OrientationEvent(egret.Event.CHANGE);
                    event.beta = e.beta;
                    event.gamma = e.gamma;
                    event.alpha = e.alpha;
                    _this.dispatchEvent(event);
                };
                return _this;
            }
            /**
             * @private
             *
             */
            WebDeviceOrientation.prototype.start = function () {
                window.addEventListener("deviceorientation", this.onChange);
            };
            /**
             * @private
             *
             */
            WebDeviceOrientation.prototype.stop = function () {
                window.removeEventListener("deviceorientation", this.onChange);
            };
            return WebDeviceOrientation;
        }(egret.EventDispatcher));
        web.WebDeviceOrientation = WebDeviceOrientation;
        __reflect(WebDeviceOrientation.prototype, "egret.web.WebDeviceOrientation", ["egret.DeviceOrientation"]);
    })(web = egret.web || (egret.web = {}));
})(egret || (egret = {}));
egret.DeviceOrientation = egret.web.WebDeviceOrientation;
//# sourceMappingURL=WebDeviceOrientation.js.map