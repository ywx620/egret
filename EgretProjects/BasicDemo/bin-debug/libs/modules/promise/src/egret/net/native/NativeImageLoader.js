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
    var native;
    (function (native) {
        /**
         * @private
         * ImageLoader 类可用于加载图像（JPG、PNG 或 GIF）文件。使用 load() 方法来启动加载。被加载的图像对象数据将存储在 ImageLoader.data 属性上 。
         */
        var NativeImageLoader = (function (_super) {
            __extends(NativeImageLoader, _super);
            function NativeImageLoader() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**
                 * @private
                 * 使用 load() 方法加载成功的 BitmapData 图像数据。
                 */
                _this.data = null;
                /**
                 * @private
                 * 当从其他站点加载一个图片时，指定是否启用跨域资源共享(CORS)，默认值为null。
                 * 可以设置为"anonymous","use-credentials"或null,设置为其他值将等同于"anonymous"。
                 */
                _this._crossOrigin = null;
                return _this;
            }
            Object.defineProperty(NativeImageLoader.prototype, "crossOrigin", {
                get: function () {
                    return this._crossOrigin;
                },
                set: function (value) {
                    this._crossOrigin = value;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * @private
             *
             * @param url
             * @param callback
             */
            NativeImageLoader.prototype.load = function (url) {
                this.check(url);
            };
            NativeImageLoader.prototype.check = function (url) {
                var self = this;
                if (self.isNetUrl(url)) {
                    self.download(url);
                }
                else if (!egret_native.isFileExists(url)) {
                    self.download(url);
                }
                else {
                    self.loadTexture(url);
                }
            };
            NativeImageLoader.prototype.download = function (url) {
                var self = this;
                var promise = egret.PromiseObject.create();
                promise.onSuccessFunc = function () {
                    self.loadTexture(url);
                };
                promise.onErrorFunc = function () {
                    self.dispatchEventWith(egret.IOErrorEvent.IO_ERROR);
                };
                egret_native.download(url, url, promise);
            };
            NativeImageLoader.prototype.loadTexture = function (url) {
                var self = this;
                var promise = new egret.PromiseObject();
                promise.onSuccessFunc = function (bitmapData) {
                    self.data = new egret.BitmapData(bitmapData);
                    self.dispatchEventWith(egret.Event.COMPLETE);
                };
                promise.onErrorFunc = function () {
                    self.dispatchEventWith(egret.IOErrorEvent.IO_ERROR);
                };
                egret_native.Texture.addTextureAsyn(url, promise);
            };
            /**
             * 是否是网络地址
             * @param url
             * @returns {boolean}
             */
            NativeImageLoader.prototype.isNetUrl = function (url) {
                return url.indexOf("http://") != -1 || url.indexOf("HTTP://") != -1 || url.indexOf("https://") != -1 || url.indexOf("HTTPS://") != -1;
            };
            /**
             * @private
             * 指定是否启用跨域资源共享,如果ImageLoader实例有设置过crossOrigin属性将使用设置的属性
             */
            NativeImageLoader.crossOrigin = null;
            return NativeImageLoader;
        }(egret.EventDispatcher));
        native.NativeImageLoader = NativeImageLoader;
        __reflect(NativeImageLoader.prototype, "egret.native.NativeImageLoader", ["egret.ImageLoader"]);
        egret.ImageLoader = NativeImageLoader;
    })(native = egret.native || (egret.native = {}));
})(egret || (egret = {}));
//# sourceMappingURL=NativeImageLoader.js.map