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
        var WebGeolocation = (function (_super) {
            __extends(WebGeolocation, _super);
            /**
             * @private
             */
            function WebGeolocation(option) {
                var _this = _super.call(this) || this;
                /**
                 * @private
                 */
                _this.onUpdate = function (position) {
                    var event = new egret.GeolocationEvent(egret.Event.CHANGE);
                    var coords = position.coords;
                    event.altitude = coords.altitude;
                    event.heading = coords.heading;
                    event.accuracy = coords.accuracy;
                    event.latitude = coords.latitude;
                    event.longitude = coords.longitude;
                    event.speed = coords.speed;
                    event.altitudeAccuracy = coords.altitudeAccuracy;
                    _this.dispatchEvent(event);
                };
                /**
                 * @private
                 */
                _this.onError = function (error) {
                    var errorType = egret.GeolocationEvent.UNAVAILABLE;
                    if (error.code == error.PERMISSION_DENIED)
                        errorType = egret.GeolocationEvent.PERMISSION_DENIED;
                    var event = new egret.GeolocationEvent(egret.IOErrorEvent.IO_ERROR);
                    event.errorType = errorType;
                    event.errorMessage = error.message;
                    _this.dispatchEvent(event);
                };
                _this.geolocation = navigator.geolocation;
                return _this;
            }
            /**
             * @private
             *
             */
            WebGeolocation.prototype.start = function () {
                var geo = this.geolocation;
                if (geo)
                    this.watchId = geo.watchPosition(this.onUpdate, this.onError);
                else
                    this.onError({
                        code: 2,
                        message: egret.sys.tr(3004),
                        PERMISSION_DENIED: 1,
                        POSITION_UNAVAILABLE: 2
                    });
            };
            /**
             * @private
             *
             */
            WebGeolocation.prototype.stop = function () {
                var geo = this.geolocation;
                geo.clearWatch(this.watchId);
            };
            return WebGeolocation;
        }(egret.EventDispatcher));
        web.WebGeolocation = WebGeolocation;
        __reflect(WebGeolocation.prototype, "egret.web.WebGeolocation", ["egret.Geolocation"]);
        egret.Geolocation = egret.web.WebGeolocation;
    })(web = egret.web || (egret.web = {}));
})(egret || (egret = {}));
//# sourceMappingURL=WebGeolocation.js.map