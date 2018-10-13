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
     * @private
     */
    var ScrollEase = (function () {
        /**
         * @version Egret 2.4
         * @platform Web,Native
         */
        function ScrollEase() {
            egret.$error(1014);
        }
        /**
         *
         * @param amount
         * @returns
         * @version Egret 2.4
         * @platform Web,Native
         */
        ScrollEase.get = function (amount) {
            if (amount < -1) {
                amount = -1;
            }
            if (amount > 1) {
                amount = 1;
            }
            return function (t) {
                if (amount == 0) {
                    return t;
                }
                if (amount < 0) {
                    return t * (t * -amount + 1 + amount);
                }
                return t * ((2 - t) * amount + (1 - amount));
            };
        };
        /**
         *
         * @param pow
         * @returns
         * @version Egret 2.4
         * @platform Web,Native
         */
        ScrollEase.getPowOut = function (pow) {
            return function (t) {
                return 1 - Math.pow(1 - t, pow);
            };
        };
        /**
         * @version Egret 2.4
         * @platform Web,Native
         */
        ScrollEase.quintOut = ScrollEase.getPowOut(5);
        /**
         * @version Egret 2.4
         * @platform Web,Native
         */
        ScrollEase.quartOut = ScrollEase.getPowOut(4);
        return ScrollEase;
    }());
    egret.ScrollEase = ScrollEase;
    __reflect(ScrollEase.prototype, "egret.ScrollEase");
    /**
     * @private
     */
    var ScrollTween = (function (_super) {
        __extends(ScrollTween, _super);
        /**
         * 创建一个 egret.ScrollTween 对象
         * @private
         * @version Egret 2.4
         * @platform Web,Native
         */
        function ScrollTween(target, props, pluginData) {
            var _this = _super.call(this) || this;
            /**
             * @private
             */
            _this._target = null;
            /**
             * @private
             */
            _this._useTicks = false;
            /**
             * @private
             */
            _this.ignoreGlobalPause = false;
            /**
             * @private
             */
            _this.loop = false;
            /**
             * @private
             */
            _this.pluginData = null;
            /**
             * @private
             */
            _this._steps = null;
            /**
             * @private
             */
            _this._actions = null;
            /**
             * @private
             */
            _this.paused = false;
            /**
             * @private
             */
            _this.duration = 0;
            /**
             * @private
             */
            _this._prevPos = -1;
            /**
             * @private
             */
            _this.position = null;
            /**
             * @private
             */
            _this._prevPosition = 0;
            /**
             * @private
             */
            _this._stepPosition = 0;
            /**
             * @private
             */
            _this.passive = false;
            _this.initialize(target, props, pluginData);
            return _this;
        }
        /**
         * Activate an object and add a ScrollTween animation to the object
         * @param target {any} The object to be activated
         * @param props {any} Parameters, support loop onChange onChangeObj
         * @param pluginData {any} Write realized
         * @param override {boolean} Whether to remove the object before adding a tween, the default value false
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 激活一个对象，对其添加 ScrollTween 动画
         * @param target {any} 要激活 ScrollTween 的对象
         * @param props {any} 参数，支持loop(循环播放) onChange(变化函数) onChangeObj(变化函数作用域)
         * @param pluginData {any} 暂未实现
         * @param override {boolean} 是否移除对象之前添加的tween，默认值false
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        ScrollTween.get = function (target, props, pluginData, override) {
            if (props === void 0) { props = null; }
            if (pluginData === void 0) { pluginData = null; }
            if (override === void 0) { override = false; }
            if (override) {
                ScrollTween.removeTweens(target);
            }
            return new ScrollTween(target, props, pluginData);
        };
        /**
         * Delete all ScrollTween animations from an object
         * @param target The object whose ScrollTween to be deleted
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 删除一个对象上的全部 ScrollTween 动画
         * @param target  需要移除 ScrollTween 的对象
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        ScrollTween.removeTweens = function (target) {
            if (!target.tween_count) {
                return;
            }
            var tweens = ScrollTween._tweens;
            for (var i = tweens.length - 1; i >= 0; i--) {
                if (tweens[i]._target == target) {
                    tweens[i].paused = true;
                    tweens.splice(i, 1);
                }
            }
            target.tween_count = 0;
        };
        /**
         * @private
         *
         * @param delta
         * @param paused
         */
        ScrollTween.tick = function (timeStamp, paused) {
            if (paused === void 0) { paused = false; }
            var delta = timeStamp - ScrollTween._lastTime;
            ScrollTween._lastTime = timeStamp;
            var tweens = ScrollTween._tweens.concat();
            for (var i = tweens.length - 1; i >= 0; i--) {
                var tween_1 = tweens[i];
                if ((paused && !tween_1.ignoreGlobalPause) || tween_1.paused) {
                    continue;
                }
                tween_1.tick(tween_1._useTicks ? 1 : delta);
            }
            return false;
        };
        /**
         * @private
         *
         * @param tween
         * @param value
         */
        ScrollTween._register = function (tween, value) {
            var target = tween._target;
            var tweens = ScrollTween._tweens;
            if (value) {
                if (target) {
                    target.tween_count = target.tween_count > 0 ? target.tween_count + 1 : 1;
                }
                tweens.push(tween);
                if (!ScrollTween._inited) {
                    ScrollTween._lastTime = egret.getTimer();
                    egret.ticker.$startTick(ScrollTween.tick, null);
                    ScrollTween._inited = true;
                }
            }
            else {
                if (target) {
                    target.tween_count--;
                }
                var i = tweens.length;
                while (i--) {
                    if (tweens[i] == tween) {
                        tweens.splice(i, 1);
                        return;
                    }
                }
            }
        };
        /**
         * @private
         *
         * @param target
         * @param props
         * @param pluginData
         */
        ScrollTween.prototype.initialize = function (target, props, pluginData) {
            this._target = target;
            if (props) {
                this._useTicks = props.useTicks;
                this.ignoreGlobalPause = props.ignoreGlobalPause;
                this.loop = props.loop;
                props.onChange && this.addEventListener("change", props.onChange, props.onChangeObj);
                if (props.override) {
                    ScrollTween.removeTweens(target);
                }
            }
            this.pluginData = pluginData || {};
            this._curQueueProps = {};
            this._initQueueProps = {};
            this._steps = [];
            this._actions = [];
            if (props && props.paused) {
                this.paused = true;
            }
            else {
                ScrollTween._register(this, true);
            }
            if (props && props.position != null) {
                this.setPosition(props.position);
            }
        };
        /**
         * @private
         *
         * @param value
         * @param actionsMode
         * @returns
         */
        ScrollTween.prototype.setPosition = function (value, actionsMode) {
            if (actionsMode === void 0) { actionsMode = 1; }
            if (value < 0) {
                value = 0;
            }
            //正常化位置
            var t = value;
            var end = false;
            if (t >= this.duration) {
                if (this.loop) {
                    t = t % this.duration;
                }
                else {
                    t = this.duration;
                    end = true;
                }
            }
            if (t == this._prevPos) {
                return end;
            }
            var prevPos = this._prevPos;
            this.position = this._prevPos = t;
            this._prevPosition = value;
            if (this._target) {
                if (end) {
                    //结束
                    this._updateTargetProps(null, 1);
                }
                else if (this._steps.length > 0) {
                    // 找到新的tween
                    var i = void 0;
                    var l = this._steps.length;
                    for (i = 0; i < l; i++) {
                        if (this._steps[i].t > t) {
                            break;
                        }
                    }
                    var step = this._steps[i - 1];
                    this._updateTargetProps(step, (this._stepPosition = t - step.t) / step.d);
                }
            }
            if (end) {
                this.setPaused(true);
            }
            //执行actions
            if (actionsMode != 0 && this._actions.length > 0) {
                if (this._useTicks) {
                    this._runActions(t, t);
                }
                else if (actionsMode == 1 && t < prevPos) {
                    if (prevPos != this.duration) {
                        this._runActions(prevPos, this.duration);
                    }
                    this._runActions(0, t, true);
                }
                else {
                    this._runActions(prevPos, t);
                }
            }
            this.dispatchEventWith("change");
            return end;
        };
        /**
         * @private
         *
         * @param startPos
         * @param endPos
         * @param includeStart
         */
        ScrollTween.prototype._runActions = function (startPos, endPos, includeStart) {
            if (includeStart === void 0) { includeStart = false; }
            var sPos = startPos;
            var ePos = endPos;
            var i = -1;
            var j = this._actions.length;
            var k = 1;
            if (startPos > endPos) {
                //把所有的倒置
                sPos = endPos;
                ePos = startPos;
                i = j;
                j = k = -1;
            }
            while ((i += k) != j) {
                var action = this._actions[i];
                var pos = action.t;
                if (pos == ePos || (pos > sPos && pos < ePos) || (includeStart && pos == startPos)) {
                    action.f.apply(action.o, action.p);
                }
            }
        };
        /**
         * @private
         *
         * @param step
         * @param ratio
         */
        ScrollTween.prototype._updateTargetProps = function (step, ratio) {
            var p0, p1, v, v0, v1, arr;
            if (!step && ratio == 1) {
                this.passive = false;
                p0 = p1 = this._curQueueProps;
            }
            else {
                this.passive = !!step.v;
                //不更新props.
                if (this.passive) {
                    return;
                }
                //使用ease
                if (step.e) {
                    ratio = step.e(ratio, 0, 1, 1);
                }
                p0 = step.p0;
                p1 = step.p1;
            }
            for (var n in this._initQueueProps) {
                if ((v0 = p0[n]) == null) {
                    p0[n] = v0 = this._initQueueProps[n];
                }
                if ((v1 = p1[n]) == null) {
                    p1[n] = v1 = v0;
                }
                if (v0 == v1 || ratio == 0 || ratio == 1 || (typeof (v0) != "number")) {
                    v = ratio == 1 ? v1 : v0;
                }
                else {
                    v = v0 + (v1 - v0) * ratio;
                }
                var ignore = false;
                if (arr = ScrollTween._plugins[n]) {
                    for (var i = 0, l = arr.length; i < l; i++) {
                        var v2 = arr[i].tween(this, n, v, p0, p1, ratio, !!step && p0 == p1, !step);
                        if (v2 == ScrollTween.IGNORE) {
                            ignore = true;
                        }
                        else {
                            v = v2;
                        }
                    }
                }
                if (!ignore) {
                    this._target[n] = v;
                }
            }
        };
        /**
         * Whether setting is paused
         * @param value {boolean} Whether to pause
         * @returns ScrollTween object itself
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 设置是否暂停
         * @param value {boolean} 是否暂停
         * @returns Tween对象本身
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        ScrollTween.prototype.setPaused = function (value) {
            this.paused = value;
            ScrollTween._register(this, !value);
            return this;
        };
        /**
         * @private
         *
         * @param props
         * @returns
         */
        ScrollTween.prototype._cloneProps = function (props) {
            var o = {};
            for (var n in props) {
                o[n] = props[n];
            }
            return o;
        };
        /**
         * @private
         *
         * @param o
         * @returns
         */
        ScrollTween.prototype._addStep = function (o) {
            if (o.d > 0) {
                this._steps.push(o);
                o.t = this.duration;
                this.duration += o.d;
            }
            return this;
        };
        /**
         * @private
         *
         * @param o
         * @returns
         */
        ScrollTween.prototype._appendQueueProps = function (o) {
            var arr, oldValue, i, l, injectProps;
            for (var n in o) {
                if (this._initQueueProps[n] === undefined) {
                    oldValue = this._target[n];
                    //设置plugins
                    if (arr = ScrollTween._plugins[n]) {
                        for (i = 0, l = arr.length; i < l; i++) {
                            oldValue = arr[i].init(this, n, oldValue);
                        }
                    }
                    this._initQueueProps[n] = this._curQueueProps[n] = (oldValue === undefined) ? null : oldValue;
                }
                else {
                    oldValue = this._curQueueProps[n];
                }
            }
            for (var n in o) {
                oldValue = this._curQueueProps[n];
                if (arr = ScrollTween._plugins[n]) {
                    injectProps = injectProps || {};
                    for (i = 0, l = arr.length; i < l; i++) {
                        if (arr[i].step) {
                            arr[i].step(this, n, oldValue, o[n], injectProps);
                        }
                    }
                }
                this._curQueueProps[n] = o[n];
            }
            if (injectProps) {
                this._appendQueueProps(injectProps);
            }
            return this._curQueueProps;
        };
        /**
         * @private
         *
         * @param o
         * @returns
         */
        ScrollTween.prototype._addAction = function (o) {
            o.t = this.duration;
            this._actions.push(o);
            return this;
        };
        /**
         * Modify the property of the specified display object to a specified value
         * @param props {Object} Property set of an object
         * @param duration {number} Duration
         * @param ease {egret.ScrollEase} Easing algorithm
         * @returns {egret.ScrollTween} ScrollTween object itself
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 将指定显示对象的属性修改为指定值
         * @param props {Object} 对象的属性集合
         * @param duration {number} 持续时间
         * @param ease {egret.ScrollEase} 缓动算法
         * @returns {egret.ScrollTween} Tween对象本身
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        ScrollTween.prototype.to = function (props, duration, ease) {
            if (ease === void 0) { ease = undefined; }
            if (isNaN(duration) || duration < 0) {
                duration = 0;
            }
            return this._addStep({ d: duration || 0, p0: this._cloneProps(this._curQueueProps), e: ease, p1: this._cloneProps(this._appendQueueProps(props)) });
        };
        /**
         * Execute callback function
         * @param callback {Function} Callback method
         * @param thisObj {any} this action scope of the callback method
         * @param params {any[]} Parameter of the callback method
         * @returns {egret.ScrollTween} ScrollTween object itself
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 执行回调函数
         * @param callback {Function} 回调方法
         * @param thisObj {any} 回调方法this作用域
         * @param params {any[]} 回调方法参数
         * @returns {egret.ScrollTween} Tween对象本身
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        ScrollTween.prototype.call = function (callback, thisObj, params) {
            if (thisObj === void 0) { thisObj = undefined; }
            if (params === void 0) { params = undefined; }
            return this._addAction({ f: callback, p: params ? params : [], o: thisObj ? thisObj : this._target });
        };
        /**
         * @method egret.ScrollTween#tick
         * @param delta {number}
         * @private
         * @version Egret 2.4
         * @platform Web,Native
         */
        ScrollTween.prototype.tick = function (delta) {
            if (this.paused) {
                return;
            }
            this.setPosition(this._prevPosition + delta);
        };
        /**
         * @private
         */
        ScrollTween._tweens = [];
        /**
         * @private
         */
        ScrollTween.IGNORE = {};
        /**
         * @private
         */
        ScrollTween._plugins = {};
        /**
         * @private
         */
        ScrollTween._inited = false;
        ScrollTween._lastTime = 0;
        return ScrollTween;
    }(egret.EventDispatcher));
    egret.ScrollTween = ScrollTween;
    __reflect(ScrollTween.prototype, "egret.ScrollTween");
})(egret || (egret = {}));
//# sourceMappingURL=ScrollTween.js.map