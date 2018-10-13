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
var eui;
(function (eui) {
    var sys;
    (function (sys) {
        /**
         * @private
         *
         * @param fraction
         * @returns
         */
        function sineInOut(fraction) {
            return -0.5 * (Math.cos(Math.PI * fraction) - 1);
        }
        /**
         * @private
         * 数值缓动工具类
         */
        var Animation = (function () {
            /**
             * @private
             */
            function Animation(updateFunction, thisObject) {
                /**
                 * @private
                 * 此动画的缓动行为。设置为null意味着不使用缓动，默认值为 sineInOut
                 */
                this.easerFunction = sineInOut;
                /**
                 * @private
                 * 是否正在播放动画，不包括延迟等待和暂停的阶段
                 */
                this.isPlaying = false;
                /**
                 * @private
                 * 动画持续时间,单位毫秒，默认值500
                 */
                this.duration = 500;
                /**
                 * @private
                 * 动画到当前时间对应的值。
                 */
                this.currentValue = 0;
                /**
                 * @private
                 * 起始值
                 */
                this.from = 0;
                /**
                 * @private
                 * 终点值。
                 */
                this.to = 0;
                /**
                 * @private
                 * 动画启动时刻
                 */
                this.startTime = 0;
                /**
                 * @private
                 * 动画播放结束时的回调函数
                 */
                this.endFunction = null;
                this.updateFunction = updateFunction;
                this.thisObject = thisObject;
            }
            /**
             * @private
             * 开始正向播放动画,无论何时调用都重新从零时刻开始，若设置了延迟会首先进行等待。
             */
            Animation.prototype.play = function () {
                this.stop();
                this.start();
            };
            /**
             * @private
             * 开始播放动画
             */
            Animation.prototype.start = function () {
                this.isPlaying = false;
                this.currentValue = 0;
                this.startTime = egret.getTimer();
                this.doInterval(this.startTime);
                egret.startTick(this.doInterval, this);
            };
            /**
             * @private
             * 停止播放动画
             */
            Animation.prototype.stop = function () {
                this.isPlaying = false;
                this.startTime = 0;
                egret.stopTick(this.doInterval, this);
            };
            /**
             * @private
             * 计算当前值并返回动画是否结束
             */
            Animation.prototype.doInterval = function (currentTime) {
                var runningTime = currentTime - this.startTime;
                if (!this.isPlaying) {
                    this.isPlaying = true;
                }
                var duration = this.duration;
                var fraction = duration == 0 ? 1 : Math.min(runningTime, duration) / duration;
                if (this.easerFunction) {
                    fraction = this.easerFunction(fraction);
                }
                this.currentValue = this.from + (this.to - this.from) * fraction;
                if (this.updateFunction)
                    this.updateFunction.call(this.thisObject, this);
                var isEnded = runningTime >= duration;
                if (isEnded) {
                    this.stop();
                }
                if (isEnded && this.endFunction) {
                    this.endFunction.call(this.thisObject, this);
                }
                return true;
            };
            return Animation;
        }());
        sys.Animation = Animation;
        __reflect(Animation.prototype, "eui.sys.Animation");
    })(sys = eui.sys || (eui.sys = {}));
})(eui || (eui = {}));
//# sourceMappingURL=Animation.js.map