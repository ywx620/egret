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
        var NativeSound = (function (_super) {
            __extends(NativeSound, _super);
            /**
             * @private
             * @inheritDoc
             */
            function NativeSound() {
                var _this = _super.call(this) || this;
                /**
                 * @private
                 */
                _this.loaded = false;
                return _this;
            }
            Object.defineProperty(NativeSound.prototype, "length", {
                get: function () {
                    if (this.originAudio) {
                        return this.originAudio.duration;
                    }
                    throw new Error("sound not loaded!");
                    //return 0;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * @inheritDoc
             */
            NativeSound.prototype.load = function (url) {
                var self = this;
                this.url = url;
                if (true && !url) {
                    egret.$error(3002);
                }
                var audio = new Audio(url);
                audio.addEventListener("canplaythrough", onCanPlay);
                audio.addEventListener("error", onAudioError);
                this.originAudio = audio;
                if (!egret_native.isFileExists(url)) {
                    download();
                }
                else {
                    onAudioLoaded();
                }
                function download() {
                    var promise = egret.PromiseObject.create();
                    promise.onSuccessFunc = onAudioLoaded;
                    promise.onErrorFunc = onAudioError;
                    egret_native.download(url, url, promise);
                }
                function onAudioLoaded() {
                    audio.load();
                    if (NativeSound.clearAudios[this.url]) {
                        delete NativeSound.clearAudios[this.url];
                    }
                    NativeSound.$recycle(url, audio);
                }
                function onCanPlay() {
                    removeListeners();
                    self.loaded = true;
                    self.dispatchEventWith(egret.Event.COMPLETE);
                }
                function onAudioError() {
                    removeListeners();
                    self.dispatchEventWith(egret.IOErrorEvent.IO_ERROR);
                }
                function removeListeners() {
                    audio.removeEventListener("canplaythrough", onCanPlay);
                    audio.removeEventListener("error", onAudioError);
                }
            };
            /**
             * @inheritDoc
             */
            NativeSound.prototype.play = function (startTime, loops) {
                startTime = +startTime || 0;
                loops = +loops || 0;
                if (true && this.loaded == false) {
                    egret.$error(1049);
                }
                var audio = NativeSound.$pop(this.url);
                if (audio == null) {
                    audio = new Audio(this.url);
                }
                else {
                    //audio.load();
                }
                audio.autoplay = true;
                var channel = new native.NativeSoundChannel(audio);
                channel.$url = this.url;
                channel.$loops = loops;
                channel.$startTime = startTime;
                channel.$play();
                egret.sys.$pushSoundChannel(channel);
                return channel;
            };
            /**
             * @inheritDoc
             */
            NativeSound.prototype.close = function () {
                if (this.loaded == false && this.originAudio)
                    this.originAudio.src = "";
                if (this.originAudio)
                    this.originAudio = null;
                NativeSound.$clear(this.url);
            };
            NativeSound.$clear = function (url) {
                NativeSound.clearAudios[url] = true;
                var array = NativeSound.audios[url];
                if (array) {
                    array.length = 0;
                }
            };
            NativeSound.$pop = function (url) {
                var array = NativeSound.audios[url];
                if (array && array.length > 0) {
                    return array.pop();
                }
                return null;
            };
            NativeSound.$recycle = function (url, audio) {
                if (NativeSound.clearAudios[url]) {
                    return;
                }
                var array = NativeSound.audios[url];
                if (NativeSound.audios[url] == null) {
                    array = NativeSound.audios[url] = [];
                }
                array.push(audio);
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
            NativeSound.MUSIC = "music";
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
            NativeSound.EFFECT = "effect";
            /**
             * @private
             */
            NativeSound.audios = {};
            NativeSound.clearAudios = {};
            return NativeSound;
        }(egret.EventDispatcher));
        native.NativeSound = NativeSound;
        __reflect(NativeSound.prototype, "egret.native.NativeSound", ["egret.Sound"]);
        if (__global.Audio) {
            egret.Sound = NativeSound;
        }
    })(native = egret.native || (egret.native = {}));
})(egret || (egret = {}));
//# sourceMappingURL=NativeSound.js.map