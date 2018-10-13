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
var eui;
(function (eui) {
    /**
     * The SliderBase class lets users select a value by moving a slider thumb between
     * the end points of the slider track.
     * The current value of the slider is determined by the relative location of
     * the thumb between the end points of the slider,
     * corresponding to the slider's minimum and maximum values.
     * The SliderBase class is a base class for HSlider and VSlider.
     *
     * @event eui.UIEvent.CHANGE_START Dispatched when the scroll position is going to change
     * @event eui.UIEvent.CHANGE_END Dispatched when the scroll position changed complete
     * @event egret.Event.CHANGE Dispatched when the scroll position is changing
     *
     * @see eui.HSlider
     * @see eui.VSlider
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @language en_US
     */
    /**
     * 滑块控件基类，通过使用 SliderBase 类，用户可以在滑块轨道的端点之间移动滑块来选择值。
     * 滑块的当前值由滑块端点（对应于滑块的最小值和最大值）之间滑块的相对位置确定。
     * SliderBase 类是 HSlider 和 VSlider 的基类。
     *
     * @event eui.UIEvent.CHANGE_START 滚动位置改变开始
     * @event eui.UIEvent.CHANGE_END 滚动位置改变结束
     * @event egret.Event.CHANGE 滚动位置改变的时候
     *
     * @see eui.HSlider
     * @see eui.VSlider
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @language zh_CN
     */
    var SliderBase = (function (_super) {
        __extends(SliderBase, _super);
        /**
         * Constructor
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 创建一个 SliderBase 实例
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        function SliderBase() {
            var _this = _super.call(this) || this;
            /**
             * [SkinPart] Highlight of track.
             * @skinPart
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             * [SkinPart] 轨道高亮显示对象。
             * @skinPart
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            _this.trackHighlight = null;
            /**
             * [SkinPart] Thumb display object.
             * @skinPart
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             * [SkinPart]滑块显示对象。
             * @skinPart
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            _this.thumb = null;
            /**
             * [SkinPart] Track display object.
             * @skinPart
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             * [SkinPart]轨道显示对象。
             * @skinPart
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            _this.track = null;
            _this.$SliderBase = {
                0: 0,
                1: 0,
                2: 0,
                3: 0,
                4: null,
                5: null,
                6: 300,
                7: 0,
                8: 0,
                9: true,
            };
            _this.maximum = 10;
            _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onTouchBegin, _this);
            return _this;
        }
        Object.defineProperty(SliderBase.prototype, "slideDuration", {
            /**
             * Duration in milliseconds for the sliding animation when you tap on the track to move a thumb.
             *
             * @default 300
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 在轨道上单击以移动滑块时，滑动动画持续的时间（以毫秒为单位）。设置为0将不执行缓动。
             *
             * @default 300
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this.$SliderBase[6 /* slideDuration */];
            },
            set: function (value) {
                this.$SliderBase[6 /* slideDuration */] = +value || 0;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Converts a track-relative x,y pixel location into a value between
         * the minimum and maximum, inclusive.
         *
         * @param x The x coordinate of the location relative to the track's origin.
         * @param y The y coordinate of the location relative to the track's origin.
         * @return A value between the minimum and maximum, inclusive.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 将相对于轨道的 x,y 像素位置转换为介于最小值和最大值（包括两者）之间的一个值。
         *
         * @param x 相对于轨道原点的位置的x坐标。
         * @param y 相对于轨道原点的位置的y坐标。
         * @return 介于最小值和最大值（包括两者）之间的一个值。
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        SliderBase.prototype.pointToValue = function (x, y) {
            return this.minimum;
        };
        Object.defineProperty(SliderBase.prototype, "liveDragging", {
            /**
             * Specifies whether live dragging is enabled for the slider. If true, sets the value
             * and values properties and dispatches the change event continuously as
             * the user moves the thumb.
             *
             * @default true
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 如果为 true，则将在沿着轨道拖动滑块时，而不是在释放滑块按钮时，提交此滑块的值。
             *
             * @default true
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this.$SliderBase[9 /* liveDragging */];
            },
            set: function (value) {
                this.$SliderBase[9 /* liveDragging */] = !!value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SliderBase.prototype, "pendingValue", {
            /**
             * The value the slider will have when the touch is end.
             * This property is updated when the slider thumb moves, even if <code>liveDragging</code> is false.<p/>
             * If the <code>liveDragging</code> style is false, then the slider's value is only set
             * when the touch is end.
             *
             * @default 0
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 触摸结束时滑块将具有的值。
             * 无论 liveDragging 是否为 true，在滑块拖动期间始终更新此属性。
             * 而 value 属性在当 liveDragging 为 false 时，只在触摸释放时更新一次。
             *
             * @default 0
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this.$SliderBase[7 /* pendingValue */];
            },
            set: function (value) {
                value = +value || 0;
                var values = this.$SliderBase;
                if (value === values[7 /* pendingValue */])
                    return;
                values[7 /* pendingValue */] = value;
                this.invalidateDisplayList();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        SliderBase.prototype.setValue = function (value) {
            this.$SliderBase[7 /* pendingValue */] = value;
            _super.prototype.setValue.call(this, value);
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        SliderBase.prototype.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
            if (instance == this.thumb) {
                this.thumb.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onThumbTouchBegin, this);
                this.thumb.addEventListener(egret.Event.RESIZE, this.onTrackOrThumbResize, this);
            }
            else if (instance == this.track) {
                this.track.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTrackTouchBegin, this);
                this.track.addEventListener(egret.Event.RESIZE, this.onTrackOrThumbResize, this);
            }
            else if (instance === this.trackHighlight) {
                this.trackHighlight.touchEnabled = false;
                if (egret.is(this.trackHighlight, "egret.DisplayObjectContainer")) {
                    this.trackHighlight.touchChildren = false;
                }
            }
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        SliderBase.prototype.partRemoved = function (partName, instance) {
            _super.prototype.partRemoved.call(this, partName, instance);
            if (instance == this.thumb) {
                this.thumb.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onThumbTouchBegin, this);
                this.thumb.removeEventListener(egret.Event.RESIZE, this.onTrackOrThumbResize, this);
            }
            else if (instance == this.track) {
                this.track.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTrackTouchBegin, this);
                this.track.removeEventListener(egret.Event.RESIZE, this.onTrackOrThumbResize, this);
            }
        };
        /**
         * @private
         * 滑块或轨道尺寸改变事件
         */
        SliderBase.prototype.onTrackOrThumbResize = function (event) {
            this.updateSkinDisplayList();
        };
        /**
         * Handle touch-begin events on the scroll thumb. Records the touch begin point in clickOffset.
         *
         * @param The <code>egret.TouchEvent</code> object.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 滑块触摸开始事件，记录触碰开始的坐标偏移量。
         *
         * @param event 事件 <code>egret.TouchEvent</code> 的对象.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        SliderBase.prototype.onThumbTouchBegin = function (event) {
            var values = this.$SliderBase;
            if (values[5 /* animation */] && values[5 /* animation */].isPlaying)
                this.stopAnimation();
            var stage = this.$stage;
            stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onStageTouchMove, this);
            stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onStageTouchEnd, this);
            var clickOffset = this.thumb.globalToLocal(event.stageX, event.stageY, egret.$TempPoint);
            values[0 /* clickOffsetX */] = clickOffset.x;
            values[1 /* clickOffsetY */] = clickOffset.y;
            eui.UIEvent.dispatchUIEvent(this, eui.UIEvent.CHANGE_START);
        };
        /**
         * @private
         * 舞台上触摸移动事件
         */
        SliderBase.prototype.onStageTouchMove = function (event) {
            var values = this.$SliderBase;
            values[2 /* moveStageX */] = event.$stageX;
            values[3 /* moveStageY */] = event.$stageY;
            var track = this.track;
            if (!track)
                return;
            var p = track.globalToLocal(values[2 /* moveStageX */], values[3 /* moveStageY */], egret.$TempPoint);
            var newValue = this.pointToValue(p.x - values[0 /* clickOffsetX */], p.y - values[1 /* clickOffsetY */]);
            newValue = this.nearestValidValue(newValue, this.snapInterval);
            this.updateWhenTouchMove(newValue);
            event.updateAfterEvent();
        };
        /**
         * Capture touch-move events anywhere on or off the stage.
         * @param newValue new value
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 监听舞台的触碰移动事件。
         * @param newValue 新的值
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        SliderBase.prototype.updateWhenTouchMove = function (newValue) {
            if (newValue != this.$SliderBase[7 /* pendingValue */]) {
                if (this.liveDragging) {
                    this.setValue(newValue);
                    this.dispatchEventWith(egret.Event.CHANGE);
                }
                else {
                    this.pendingValue = newValue;
                }
            }
        };
        /**
         * Handle touch-end events anywhere on or off the stage.
         *
         * @param The <code>egret.Event</code> object.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 触摸结束事件
         *
         * @param event 事件 <code>egret.Event</code> 的对象。
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        SliderBase.prototype.onStageTouchEnd = function (event) {
            var stage = event.$currentTarget;
            stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onStageTouchMove, this);
            stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onStageTouchEnd, this);
            eui.UIEvent.dispatchUIEvent(this, eui.UIEvent.CHANGE_END);
            var values = this.$SliderBase;
            if (!this.liveDragging && this.value != values[7 /* pendingValue */]) {
                this.setValue(values[7 /* pendingValue */]);
                this.dispatchEventWith(egret.Event.CHANGE);
            }
        };
        /**
         * @private
         * 当在组件上按下时记录被按下的子显示对象
         */
        SliderBase.prototype.onTouchBegin = function (event) {
            this.$stage.addEventListener(egret.TouchEvent.TOUCH_END, this.stageTouchEndHandler, this);
            this.$SliderBase[4 /* touchDownTarget */] = (event.$target);
        };
        /**
         * @private
         * 当结束时，若不是在 touchDownTarget 上弹起，而是另外的子显示对象上弹起时，额外抛出一个触摸单击事件。
         */
        SliderBase.prototype.stageTouchEndHandler = function (event) {
            var target = event.$target;
            var values = this.$SliderBase;
            event.$currentTarget.removeEventListener(egret.TouchEvent.TOUCH_END, this.stageTouchEndHandler, this);
            if (values[4 /* touchDownTarget */] != target && this.contains((target))) {
                egret.TouchEvent.dispatchTouchEvent(this, egret.TouchEvent.TOUCH_TAP, true, true, event.$stageX, event.$stageY, event.touchPointID);
            }
            values[4 /* touchDownTarget */] = null;
        };
        /**
         * @private
         * 动画播放更新数值
         */
        SliderBase.prototype.$animationUpdateHandler = function (animation) {
            this.pendingValue = animation.currentValue;
        };
        /**
         * @private
         * 动画播放完毕
         */
        SliderBase.prototype.animationEndHandler = function (animation) {
            this.setValue(this.$SliderBase[8 /* slideToValue */]);
            this.dispatchEventWith(egret.Event.CHANGE);
            eui.UIEvent.dispatchUIEvent(this, eui.UIEvent.CHANGE_END);
        };
        /**
         * @private
         * 停止播放动画
         */
        SliderBase.prototype.stopAnimation = function () {
            this.$SliderBase[5 /* animation */].stop();
            this.setValue(this.nearestValidValue(this.pendingValue, this.snapInterval));
            this.dispatchEventWith(egret.Event.CHANGE);
            eui.UIEvent.dispatchUIEvent(this, eui.UIEvent.CHANGE_END);
        };
        /**
         * Handle touch-begin events for the slider track. We
         * calculate the value based on the new position and then
         * move the thumb to the correct location as well as
         * commit the value.
         * @param The <code>egret.TouchEvent</code> object.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 轨道的触碰开始事件。我们会在这里根据新的坐标位置计算value，然后移动滑块到当前位置。
         *
         * @param event 事件 <code>egret.TouchEvent</code> 的对象.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        SliderBase.prototype.onTrackTouchBegin = function (event) {
            var thumbW = this.thumb ? this.thumb.width : 0;
            var thumbH = this.thumb ? this.thumb.height : 0;
            var offsetX = event.$stageX - (thumbW / 2);
            var offsetY = event.$stageY - (thumbH / 2);
            var p = this.track.globalToLocal(offsetX, offsetY, egret.$TempPoint);
            var rangeValues = this.$Range;
            var newValue = this.pointToValue(p.x, p.y);
            newValue = this.nearestValidValue(newValue, rangeValues[7 /* snapInterval */]);
            var values = this.$SliderBase;
            if (newValue != values[7 /* pendingValue */]) {
                if (values[6 /* slideDuration */] != 0) {
                    if (!values[5 /* animation */]) {
                        values[5 /* animation */] = new eui.sys.Animation(this.$animationUpdateHandler, this);
                        values[5 /* animation */].endFunction = this.animationEndHandler;
                    }
                    var animation = values[5 /* animation */];
                    if (animation.isPlaying)
                        this.stopAnimation();
                    values[8 /* slideToValue */] = newValue;
                    animation.duration = values[6 /* slideDuration */] *
                        (Math.abs(values[7 /* pendingValue */] - values[8 /* slideToValue */]) / (rangeValues[0 /* maximum */] - rangeValues[2 /* minimum */]));
                    animation.from = values[7 /* pendingValue */];
                    animation.to = values[8 /* slideToValue */];
                    eui.UIEvent.dispatchUIEvent(this, eui.UIEvent.CHANGE_START);
                    animation.play();
                }
                else {
                    this.setValue(newValue);
                    this.dispatchEventWith(egret.Event.CHANGE);
                }
            }
        };
        return SliderBase;
    }(eui.Range));
    eui.SliderBase = SliderBase;
    __reflect(SliderBase.prototype, "eui.SliderBase");
})(eui || (eui = {}));
//# sourceMappingURL=SliderBase.js.map