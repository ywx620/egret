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
    * @version Egret 2.4
    * @platform Web,Native
    * @includeExample extension/game/player/Ticker.ts
    * @language en_US
    */
    /**
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample extension/game/player/Ticker.ts
     * @language zh_CN
     */
    var Ticker = (function (_super) {
        __extends(Ticker, _super);
        /**
         * @deprecated
         * @version Egret 2.4
         * @platform Web,Native
         */
        function Ticker() {
            var _this = _super.call(this) || this;
            _this._timeScale = 1;
            _this._paused = false;
            _this._callIndex = -1;
            _this._lastTime = 0;
            _this.callBackList = [];
            if (Ticker.instance != null) {
                if (true) {
                    egret.$error(1033);
                }
            }
            egret.ticker.$startTick(_this.update, _this);
            _this._lastTime = egret.getTimer();
            return _this;
        }
        Ticker.prototype.update = function (timeStamp) {
            var advancedTime = timeStamp - this._lastTime;
            this._lastTime = timeStamp;
            if (this._paused) {
                return false;
            }
            var frameTime = advancedTime * this._timeScale;
            this._callList = this.callBackList.concat();
            this._callIndex = 0;
            for (; this._callIndex < this._callList.length; this._callIndex++) {
                var eventBin = this._callList[this._callIndex];
                eventBin.listener.call(eventBin.thisObject, frameTime);
            }
            this._callIndex = -1;
            this._callList = null;
            return false;
        };
        /**
         * 注册帧回调事件，同一函数的重复监听会被忽略。推荐使用 egret.startTick 替代此方法。
         * @method egret.Ticker#register
         * @param listener {Function} 帧回调函数,参数返回上一帧和这帧的间隔时间。示例：onEnterFrame(frameTime:number):void
         * @param thisObject {any} 帧回调函数的this对象
         * @param priority {number} 事件优先级，开发者请勿传递 Number.NEGATIVE_INFINITY 和 Number.POSITIVE_INFINITY
         * @version Egret 2.4
         * @platform Web,Native
         * @deprecated
         */
        Ticker.prototype.register = function (listener, thisObject, priority) {
            if (priority === void 0) { priority = 0; }
            this.$insertEventBin(this.callBackList, "", listener, thisObject, false, priority, false);
        };
        /**
         * 取消侦听enterFrame事件。推荐使用 egret.stopTick 替代此方法。
         * @method egret.Ticker#unregister
         * @param listener {Function} 事件侦听函数
         * @param thisObject {any} 侦听函数的this对象
         * @version Egret 2.4
         * @platform Web,Native
         * @deprecated
         */
        Ticker.prototype.unregister = function (listener, thisObject) {
            this.$removeEventBin(this.callBackList, listener, thisObject);
        };
        /**
         * @deprecated
         * @param timeScale {number}
         * @private
         */
        Ticker.prototype.setTimeScale = function (timeScale) {
            this._timeScale = timeScale;
        };
        /**
         * @deprecated
         * @method egret.Ticker#getTimeScale
         * @private
         */
        Ticker.prototype.getTimeScale = function () {
            return this._timeScale;
        };
        /**
         * 暂停
         * @deprecated
         * @method egret.Ticker#pause
         */
        Ticker.prototype.pause = function () {
            this._paused = true;
        };
        /**
         * 继续
         * @deprecated
         * @method egret.Ticker#resume
         */
        Ticker.prototype.resume = function () {
            this._paused = false;
        };
        /**
         * @method egret.Ticker.getInstance
         * @returns {Ticker}
         * @version Egret 2.4
         * @platform Web,Native
         * @deprecated
         */
        Ticker.getInstance = function () {
            if (Ticker.instance == null) {
                Ticker.instance = new Ticker();
            }
            return Ticker.instance;
        };
        return Ticker;
    }(egret.EventDispatcher));
    egret.Ticker = Ticker;
    __reflect(Ticker.prototype, "egret.Ticker");
})(egret || (egret = {}));
//# sourceMappingURL=Ticker.js.map