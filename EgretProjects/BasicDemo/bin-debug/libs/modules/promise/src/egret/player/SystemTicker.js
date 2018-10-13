var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
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
var egret;
(function (egret) {
    var sys;
    (function (sys) {
        /**
         * @private
         */
        sys.$START_TIME = 0;
        /**
         * @private
         * 是否要广播Event.RENDER事件的标志。
         */
        sys.$invalidateRenderFlag = false;
        /**
         * @private
         * 需要立即刷新屏幕的标志
         */
        sys.$requestRenderingFlag = false;
        /**
         * Egret心跳计时器
         */
        var SystemTicker = (function () {
            /**
             * @private
             */
            function SystemTicker() {
                /**
                 * @private
                 */
                this.playerList = [];
                /**
                 * @private
                 */
                this.callBackList = [];
                /**
                 * @private
                 */
                this.thisObjectList = [];
                /**
                 * @private
                 * 全局帧率
                 */
                this.$frameRate = 30;
                /**
                 * @private
                 */
                this.lastTimeStamp = 0;
                /**
                 * @private
                 * ticker 花销的时间
                 */
                this.costEnterFrame = 0;
                /**
                 * @private
                 * 是否被暂停
                 */
                this.isPaused = false;
                if (true && egret.ticker) {
                    egret.$error(1008, "egret.sys.SystemTicker");
                }
                sys.$START_TIME = Date.now();
                this.frameDeltaTime = 1000 / this.$frameRate;
                this.lastCount = this.frameInterval = Math.round(60000 / this.$frameRate);
            }
            /**
             * @private
             * 注册一个播放器实例并运行
             */
            SystemTicker.prototype.$addPlayer = function (player) {
                if (this.playerList.indexOf(player) != -1) {
                    return;
                }
                if (true) {
                    egret_stages.push(player.stage);
                }
                this.playerList = this.playerList.concat();
                this.playerList.push(player);
            };
            /**
             * @private
             * 停止一个播放器实例的运行。
             */
            SystemTicker.prototype.$removePlayer = function (player) {
                var index = this.playerList.indexOf(player);
                if (index !== -1) {
                    if (true) {
                        var i = egret_stages.indexOf(player.stage);
                        egret_stages.splice(i, 1);
                    }
                    this.playerList = this.playerList.concat();
                    this.playerList.splice(index, 1);
                }
            };
            /**
             * @private
             */
            SystemTicker.prototype.$startTick = function (callBack, thisObject) {
                var index = this.getTickIndex(callBack, thisObject);
                if (index != -1) {
                    return;
                }
                this.concatTick();
                this.callBackList.push(callBack);
                this.thisObjectList.push(thisObject);
            };
            /**
             * @private
             */
            SystemTicker.prototype.$stopTick = function (callBack, thisObject) {
                var index = this.getTickIndex(callBack, thisObject);
                if (index == -1) {
                    return;
                }
                this.concatTick();
                this.callBackList.splice(index, 1);
                this.thisObjectList.splice(index, 1);
            };
            /**
             * @private
             */
            SystemTicker.prototype.getTickIndex = function (callBack, thisObject) {
                var callBackList = this.callBackList;
                var thisObjectList = this.thisObjectList;
                for (var i = callBackList.length - 1; i >= 0; i--) {
                    if (callBackList[i] == callBack &&
                        thisObjectList[i] == thisObject) {
                        return i;
                    }
                }
                return -1;
            };
            /**
             * @private
             *
             */
            SystemTicker.prototype.concatTick = function () {
                this.callBackList = this.callBackList.concat();
                this.thisObjectList = this.thisObjectList.concat();
            };
            /**
             * @private
             * 设置全局帧率
             */
            SystemTicker.prototype.$setFrameRate = function (value) {
                value = +value || 0;
                if (value <= 0) {
                    return false;
                }
                if (this.$frameRate == value) {
                    return false;
                }
                this.$frameRate = value;
                if (value > 60) {
                    value = 60;
                }
                //todo
                if (egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE) {
                    egret_native.setFrameRate(value);
                    value = 60;
                }
                this.frameDeltaTime = 1000 / value;
                //这里用60*1000来避免浮点数计算不准确的问题。
                this.lastCount = this.frameInterval = Math.round(60000 / value);
                return true;
            };
            /**
             * Pause the ticker.
             * @version Egret 5.0.2
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 暂停心跳
             * @version Egret 5.0.2
             * @platform Web,Native
             * @language zh_CN
             */
            SystemTicker.prototype.pause = function () {
                this.isPaused = true;
            };
            /**
             * Resume the ticker.
             * @version Egret 5.0.2
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 恢复心跳
             * @version Egret 5.0.2
             * @platform Web,Native
             * @language zh_CN
             */
            SystemTicker.prototype.resume = function () {
                this.isPaused = false;
            };
            /**
             * @private
             * 执行一次刷新
             */
            SystemTicker.prototype.update = function () {
                var t1 = egret.getTimer();
                var callBackList = this.callBackList;
                var thisObjectList = this.thisObjectList;
                var length = callBackList.length;
                var requestRenderingFlag = sys.$requestRenderingFlag;
                var timeStamp = egret.getTimer();
                var contexts = egret.lifecycle.contexts;
                for (var _i = 0, contexts_1 = contexts; _i < contexts_1.length; _i++) {
                    var c = contexts_1[_i];
                    if (c.onUpdate) {
                        c.onUpdate();
                    }
                }
                if (this.isPaused) {
                    this.lastTimeStamp = timeStamp;
                    return;
                }
                this.callLaterAsyncs();
                for (var i = 0; i < length; i++) {
                    if (callBackList[i].call(thisObjectList[i], timeStamp)) {
                        requestRenderingFlag = true;
                    }
                }
                var t2 = egret.getTimer();
                var deltaTime = timeStamp - this.lastTimeStamp;
                this.lastTimeStamp = timeStamp;
                if (deltaTime >= this.frameDeltaTime) {
                    this.lastCount = this.frameInterval;
                }
                else {
                    this.lastCount -= 1000;
                    if (this.lastCount > 0) {
                        if (requestRenderingFlag) {
                            this.render(false, this.costEnterFrame + t2 - t1);
                        }
                        return;
                    }
                    this.lastCount += this.frameInterval;
                }
                this.render(true, this.costEnterFrame + t2 - t1);
                var t3 = egret.getTimer();
                this.broadcastEnterFrame();
                var t4 = egret.getTimer();
                this.costEnterFrame = t4 - t3;
            };
            /**
             * @private
             * 执行一次屏幕渲染
             */
            SystemTicker.prototype.render = function (triggerByFrame, costTicker) {
                var playerList = this.playerList;
                var length = playerList.length;
                if (length == 0) {
                    return;
                }
                this.callLaters();
                if (sys.$invalidateRenderFlag) {
                    this.broadcastRender();
                    sys.$invalidateRenderFlag = false;
                }
                for (var i = 0; i < length; i++) {
                    playerList[i].$render(triggerByFrame, costTicker);
                }
                sys.$requestRenderingFlag = false;
            };
            /**
             * @private
             * 广播EnterFrame事件。
             */
            SystemTicker.prototype.broadcastEnterFrame = function () {
                var list = egret.DisplayObject.$enterFrameCallBackList;
                var length = list.length;
                if (length == 0) {
                    return;
                }
                list = list.concat();
                for (var i = 0; i < length; i++) {
                    list[i].dispatchEventWith(egret.Event.ENTER_FRAME);
                }
            };
            /**
             * @private
             * 广播Render事件。
             */
            SystemTicker.prototype.broadcastRender = function () {
                var list = egret.DisplayObject.$renderCallBackList;
                var length = list.length;
                if (length == 0) {
                    return;
                }
                list = list.concat();
                for (var i = 0; i < length; i++) {
                    list[i].dispatchEventWith(egret.Event.RENDER);
                }
            };
            /**
             * @private
             */
            SystemTicker.prototype.callLaters = function () {
                var functionList;
                var thisList;
                var argsList;
                if (egret.$callLaterFunctionList.length > 0) {
                    functionList = egret.$callLaterFunctionList;
                    egret.$callLaterFunctionList = [];
                    thisList = egret.$callLaterThisList;
                    egret.$callLaterThisList = [];
                    argsList = egret.$callLaterArgsList;
                    egret.$callLaterArgsList = [];
                }
                if (functionList) {
                    var length_1 = functionList.length;
                    for (var i = 0; i < length_1; i++) {
                        var func = functionList[i];
                        if (func != null) {
                            func.apply(thisList[i], argsList[i]);
                        }
                    }
                }
            };
            /**
             * @private
             */
            SystemTicker.prototype.callLaterAsyncs = function () {
                if (egret.$callAsyncFunctionList.length > 0) {
                    var locCallAsyncFunctionList = egret.$callAsyncFunctionList;
                    var locCallAsyncThisList = egret.$callAsyncThisList;
                    var locCallAsyncArgsList = egret.$callAsyncArgsList;
                    egret.$callAsyncFunctionList = [];
                    egret.$callAsyncThisList = [];
                    egret.$callAsyncArgsList = [];
                    for (var i = 0; i < locCallAsyncFunctionList.length; i++) {
                        var func = locCallAsyncFunctionList[i];
                        if (func != null) {
                            func.apply(locCallAsyncThisList[i], locCallAsyncArgsList[i]);
                        }
                    }
                }
            };
            return SystemTicker;
        }());
        sys.SystemTicker = SystemTicker;
        __reflect(SystemTicker.prototype, "egret.sys.SystemTicker");
    })(sys = egret.sys || (egret.sys = {}));
})(egret || (egret = {}));
(function (egret) {
    var lifecycle;
    (function (lifecycle) {
        /**
         * @private
         */
        lifecycle.contexts = [];
        var isActivate = true;
        var LifecycleContext = (function () {
            function LifecycleContext() {
            }
            LifecycleContext.prototype.pause = function () {
                if (isActivate) {
                    isActivate = false;
                    lifecycle.stage.dispatchEvent(new egret.Event(egret.Event.DEACTIVATE));
                    if (lifecycle.onPause) {
                        lifecycle.onPause();
                    }
                }
            };
            LifecycleContext.prototype.resume = function () {
                if (!isActivate) {
                    isActivate = true;
                    lifecycle.stage.dispatchEvent(new egret.Event(egret.Event.ACTIVATE));
                    if (lifecycle.onResume) {
                        lifecycle.onResume();
                    }
                }
            };
            return LifecycleContext;
        }());
        lifecycle.LifecycleContext = LifecycleContext;
        __reflect(LifecycleContext.prototype, "egret.lifecycle.LifecycleContext");
        function addLifecycleListener(plugin) {
            var context = new LifecycleContext();
            lifecycle.contexts.push(context);
            plugin(context);
        }
        lifecycle.addLifecycleListener = addLifecycleListener;
    })(lifecycle = egret.lifecycle || (egret.lifecycle = {}));
    /**
     * 心跳计时器单例
     */
    egret.ticker = new egret.sys.SystemTicker();
})(egret || (egret = {}));
if (true) {
    egret_stages = [];
}
//# sourceMappingURL=SystemTicker.js.map