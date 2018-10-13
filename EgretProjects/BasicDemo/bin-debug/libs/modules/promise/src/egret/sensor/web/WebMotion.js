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
        var WebMotion = (function (_super) {
            __extends(WebMotion, _super);
            function WebMotion() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**
                 * @private
                 */
                _this.onChange = function (e) {
                    var event = new egret.MotionEvent(egret.Event.CHANGE);
                    var acceleration = {
                        x: e.acceleration.x,
                        y: e.acceleration.y,
                        z: e.acceleration.z
                    };
                    var accelerationIncludingGravity = {
                        x: e.accelerationIncludingGravity.x,
                        y: e.accelerationIncludingGravity.y,
                        z: e.accelerationIncludingGravity.z
                    };
                    var rotation = {
                        alpha: e.rotationRate.alpha,
                        beta: e.rotationRate.beta,
                        gamma: e.rotationRate.gamma
                    };
                    event.acceleration = acceleration;
                    event.accelerationIncludingGravity = accelerationIncludingGravity;
                    event.rotationRate = rotation;
                    _this.dispatchEvent(event);
                };
                return _this;
            }
            /**
             * @private
             *
             */
            WebMotion.prototype.start = function () {
                window.addEventListener("devicemotion", this.onChange);
            };
            /**
             * @private
             *
             */
            WebMotion.prototype.stop = function () {
                window.removeEventListener("devicemotion", this.onChange);
            };
            return WebMotion;
        }(egret.EventDispatcher));
        web.WebMotion = WebMotion;
        __reflect(WebMotion.prototype, "egret.web.WebMotion", ["egret.Motion"]);
        egret.Motion = egret.web.WebMotion;
    })(web = egret.web || (egret.web = {}));
})(egret || (egret = {}));
//# sourceMappingURL=WebMotion.js.map