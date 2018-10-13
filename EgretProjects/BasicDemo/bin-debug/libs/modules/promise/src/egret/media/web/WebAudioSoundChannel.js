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
    var web;
    (function (web) {
        /**
         * @private
         * @inheritDoc
         */
        var WebAudioSoundChannel = (function (_super) {
            __extends(WebAudioSoundChannel, _super);
            /**
             * @private
             */
            function WebAudioSoundChannel() {
                var _this = _super.call(this) || this;
                /**
                 * @private
                 */
                _this.$startTime = 0;
                /**
                 * @private
                 */
                _this.bufferSource = null;
                /**
                 * @private
                 */
                _this.context = web.WebAudioDecode.ctx;
                //声音是否已经播放完成
                _this.isStopped = false;
                /**
                 * @private
                 */
                _this._currentTime = 0;
                /**
                 * @private
                 */
                _this._volume = 1;
                /**
                 * @private
                 */
                _this.onPlayEnd = function () {
                    if (_this.$loops == 1) {
                        _this.stop();
                        _this.dispatchEventWith(egret.Event.SOUND_COMPLETE);
                        return;
                    }
                    if (_this.$loops > 0) {
                        _this.$loops--;
                    }
                    /////////////
                    _this.$play();
                };
                /**
                 * @private
                 */
                _this._startTime = 0;
                if (_this.context["createGain"]) {
                    _this.gain = _this.context["createGain"]();
                }
                else {
                    _this.gain = _this.context["createGainNode"]();
                }
                return _this;
            }
            WebAudioSoundChannel.prototype.$play = function () {
                if (this.isStopped) {
                    egret.$error(1036);
                    return;
                }
                if (this.bufferSource) {
                    this.bufferSource.onended = null;
                    this.bufferSource = null;
                }
                var context = this.context;
                var gain = this.gain;
                var bufferSource = context.createBufferSource();
                this.bufferSource = bufferSource;
                bufferSource.buffer = this.$audioBuffer;
                bufferSource.connect(gain);
                gain.connect(context.destination);
                bufferSource.onended = this.onPlayEnd;
                this._startTime = Date.now();
                this.gain.gain.value = this._volume;
                bufferSource.start(0, this.$startTime);
                this._currentTime = 0;
            };
            WebAudioSoundChannel.prototype.stop = function () {
                if (this.bufferSource) {
                    var sourceNode = this.bufferSource;
                    if (sourceNode.stop) {
                        sourceNode.stop(0);
                    }
                    else {
                        sourceNode.noteOff(0);
                    }
                    sourceNode.onended = null;
                    sourceNode.disconnect();
                    this.bufferSource = null;
                    this.$audioBuffer = null;
                }
                if (!this.isStopped) {
                    egret.sys.$popSoundChannel(this);
                }
                this.isStopped = true;
            };
            Object.defineProperty(WebAudioSoundChannel.prototype, "volume", {
                /**
                 * @private
                 * @inheritDoc
                 */
                get: function () {
                    return this._volume;
                },
                /**
                 * @inheritDoc
                 */
                set: function (value) {
                    if (this.isStopped) {
                        egret.$error(1036);
                        return;
                    }
                    this._volume = value;
                    this.gain.gain.value = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(WebAudioSoundChannel.prototype, "position", {
                /**
                 * @private
                 * @inheritDoc
                 */
                get: function () {
                    if (this.bufferSource) {
                        return (Date.now() - this._startTime) / 1000 + this.$startTime;
                    }
                    return 0;
                },
                enumerable: true,
                configurable: true
            });
            return WebAudioSoundChannel;
        }(egret.EventDispatcher));
        web.WebAudioSoundChannel = WebAudioSoundChannel;
        __reflect(WebAudioSoundChannel.prototype, "egret.web.WebAudioSoundChannel", ["egret.SoundChannel", "egret.IEventDispatcher"]);
    })(web = egret.web || (egret.web = {}));
})(egret || (egret = {}));
//# sourceMappingURL=WebAudioSoundChannel.js.map