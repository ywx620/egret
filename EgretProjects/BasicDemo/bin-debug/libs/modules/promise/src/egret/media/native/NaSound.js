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
         * @inheritDoc
         */
        var NaSound = (function (_super) {
            __extends(NaSound, _super);
            /**
             * @private
             * @inheritDoc
             */
            function NaSound() {
                var _this = _super.call(this) || this;
                /**
                 * @private
                 */
                _this.loaded = false;
                return _this;
            }
            Object.defineProperty(NaSound.prototype, "length", {
                get: function () {
                    throw new Error("sound length not supported");
                    //return 0;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * @inheritDoc
             */
            NaSound.prototype.load = function (url) {
                var self = this;
                this.url = url;
                if (true && !url) {
                    egret.$error(3002);
                }
                if (!egret_native.isFileExists(url)) {
                    download();
                }
                else {
                    if (__global.setTimeout) {
                        __global.setTimeout(onLoadComplete, 0);
                    }
                    else {
                        egret.$callAsync(onLoadComplete, self);
                    }
                }
                function download() {
                    var promise = egret.PromiseObject.create();
                    promise.onSuccessFunc = onLoadComplete;
                    promise.onErrorFunc = function () {
                        egret.IOErrorEvent.dispatchIOErrorEvent(self);
                    };
                    egret_native.download(url, url, promise);
                }
                function onLoadComplete() {
                    self.loaded = true;
                    self.preload();
                }
            };
            NaSound.prototype.preload = function () {
                var self = this;
                if (self.type == egret.Sound.EFFECT) {
                    var promise = new egret.PromiseObject();
                    promise.onSuccessFunc = function (soundId) {
                        self.dispatchEventWith(egret.Event.COMPLETE);
                    };
                    egret_native.Audio.preloadEffectAsync(self.url, promise);
                }
                else {
                    self.dispatchEventWith(egret.Event.COMPLETE);
                }
            };
            /**
             * @inheritDoc
             */
            NaSound.prototype.play = function (startTime, loops) {
                startTime = +startTime || 0;
                loops = +loops || 0;
                if (true && this.loaded == false) {
                    egret.$error(1049);
                }
                var channel = new native.NaSoundChannel();
                channel.$url = this.url;
                channel.$loops = loops;
                channel.$type = this.type;
                channel.$startTime = startTime;
                channel.$play();
                egret.sys.$pushSoundChannel(channel);
                return channel;
            };
            /**
             * @inheritDoc
             */
            NaSound.prototype.close = function () {
            };
            /**
             * Background music
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 背景音乐
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            NaSound.MUSIC = "music";
            /**
             * EFFECT
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 音效
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            NaSound.EFFECT = "effect";
            return NaSound;
        }(egret.EventDispatcher));
        native.NaSound = NaSound;
        __reflect(NaSound.prototype, "egret.native.NaSound", ["egret.Sound"]);
        if (!__global.Audio) {
            egret.Sound = NaSound;
        }
    })(native = egret.native || (egret.native = {}));
})(egret || (egret = {}));
//# sourceMappingURL=NaSound.js.map