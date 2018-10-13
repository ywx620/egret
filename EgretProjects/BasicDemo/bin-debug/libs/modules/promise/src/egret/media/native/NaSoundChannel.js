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
        var NaSoundChannel = (function (_super) {
            __extends(NaSoundChannel, _super);
            /**
             * @private
             */
            function NaSoundChannel() {
                var _this = _super.call(this) || this;
                /**
                 * @private
                 */
                _this.$startTime = 0;
                //声音是否已经播放完成
                _this.isStopped = false;
                /**
                 * @private
                 */
                _this._startTime = 0;
                return _this;
            }
            NaSoundChannel.prototype.$play = function () {
                this.isStopped = false;
                if (this.$type == egret.Sound.EFFECT) {
                    this._effectId = egret_native.Audio.playEffect(this.$url, this.$loops != 1);
                }
                else {
                    NaSoundChannel.currentPath = this.$url;
                    egret_native.Audio.playBackgroundMusic(this.$url, this.$loops != 1);
                }
                this._startTime = Date.now();
            };
            /**
             * @private
             * @inheritDoc
             */
            NaSoundChannel.prototype.stop = function () {
                if (!this.isStopped) {
                    egret.sys.$popSoundChannel(this);
                }
                this.isStopped = true;
                if (this.$type == egret.Sound.EFFECT) {
                    if (this._effectId) {
                        egret_native.Audio.stopEffect(this._effectId);
                        this._effectId = null;
                    }
                }
                else {
                    if (this.$url == NaSoundChannel.currentPath) {
                        egret_native.Audio.stopBackgroundMusic(false);
                    }
                }
            };
            Object.defineProperty(NaSoundChannel.prototype, "volume", {
                /**
                 * @private
                 * @inheritDoc
                 */
                get: function () {
                    if (this.$type == egret.Sound.EFFECT) {
                        return egret_native.Audio.getEffectsVolume();
                    }
                    else {
                        return egret_native.Audio.getBackgroundMusicVolume();
                    }
                    return 1;
                },
                /**
                 * @inheritDoc
                 */
                set: function (value) {
                    if (this.$type == egret.Sound.EFFECT) {
                        egret_native.Audio.setEffectsVolume(value);
                    }
                    else {
                        egret_native.Audio.setBackgroundMusicVolume(value);
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(NaSoundChannel.prototype, "position", {
                /**
                 * @private
                 * @inheritDoc
                 */
                get: function () {
                    return (Date.now() - this._startTime) / 1000;
                },
                enumerable: true,
                configurable: true
            });
            return NaSoundChannel;
        }(egret.EventDispatcher));
        native.NaSoundChannel = NaSoundChannel;
        __reflect(NaSoundChannel.prototype, "egret.native.NaSoundChannel", ["egret.SoundChannel", "egret.IEventDispatcher"]);
    })(native = egret.native || (egret.native = {}));
})(egret || (egret = {}));
//# sourceMappingURL=NaSoundChannel.js.map