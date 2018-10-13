//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
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
    /**
     * The GeolocationEvent represents the position and altitude of the device on Earth,
     * and show errors occurred while getting the location of the device.
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/sensor/Geolocation.ts
     * @see http://edn.egret.com/cn/docs/page/662 获取位置信息
     * @language en_US
     */
    /**
     * GeolocationEvent 提供设备的地理位置信息和获取位置时发生的错误信息
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/sensor/Geolocation.ts
     * @see http://edn.egret.com/cn/docs/page/662 获取位置信息
     * @language zh_CN
     */
    var GeolocationEvent = (function (_super) {
        __extends(GeolocationEvent, _super);
        function GeolocationEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * The acquisition of the location information failed because of app don't have permission.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 由于用户拒绝访问位置信息，获取位置信息失败
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        GeolocationEvent.PERMISSION_DENIED = "permissionDenied";
        /**
         * The acquisition of the location failed because at least one internal source of position returned an internal error.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 设备位置服务不可用或者超时等原因没有得到位置信息
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        GeolocationEvent.UNAVAILABLE = "unavailable";
        return GeolocationEvent;
    }(egret.Event));
    egret.GeolocationEvent = GeolocationEvent;
    __reflect(GeolocationEvent.prototype, "egret.GeolocationEvent");
})(egret || (egret = {}));
//# sourceMappingURL=GeolocationEvent.js.map