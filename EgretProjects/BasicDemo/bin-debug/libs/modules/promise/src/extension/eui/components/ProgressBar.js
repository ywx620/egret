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
     * The ProgressBar control provides a visual representation of the progress of a task over time.
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/components/ProgressBarExample.ts
     * @language en_US
     */
    /**
     * ProgressBar 控件为随时间而变的任务进度提供了形象化的表示。
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/components/ProgressBarExample.ts
     * @language zh_CN
     */
    var ProgressBar = (function (_super) {
        __extends(ProgressBar, _super);
        /**
         * Constructor.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 构造函数。
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        function ProgressBar() {
            var _this = _super.call(this) || this;
            /**
             * this hightlight component of the progressbar.
             *
             * @skinPart
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 进度高亮显示对象。
             *
             * @skinPart
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            _this.thumb = null;
            /**
             * the label of the progressbar.
             *
             * @skinPart
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 进度条文本
             *
             * @skinPart
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            _this.labelDisplay = null;
            /**
             * @private
             */
            _this._labelFunction = null;
            /**
             * @private
             */
            _this._slideDuration = 500;
            /**
             * @private
             */
            _this._direction = eui.Direction.LTR;
            /**
             * @private
             * 动画播放结束时要到达的value。
             */
            _this.slideToValue = 0;
            /**
             * @private
             */
            _this.animationValue = 0;
            /**
             * @private
             */
            _this.thumbInitX = 0;
            /**
             * @private
             */
            _this.thumbInitY = 0;
            _this.animation = new eui.sys.Animation(_this.animationUpdateHandler, _this);
            return _this;
        }
        Object.defineProperty(ProgressBar.prototype, "labelFunction", {
            /**
             * a text format callback function。example：
             * <code>labelFunction(value:Number,maximum:Number):String;</code>
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 进度条文本格式化回调函数。示例：
             * <code>labelFunction(value:Number,maximum:Number):String;</code>
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this._labelFunction;
            },
            set: function (value) {
                if (this._labelFunction == value)
                    return;
                this._labelFunction = value;
                this.invalidateDisplayList();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Convert the current value to display text
         *
         * @param value the current value
         * @param maximum the maximum value
         *
         * @return a converted text
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 将当前value转换成文本
         *
         * @param value 当前值
         * @param maximum 最大值
         *
         * @return 转换后的文本
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        ProgressBar.prototype.valueToLabel = function (value, maximum) {
            if (this.labelFunction != null) {
                return this._labelFunction(value, maximum);
            }
            return value + " / " + maximum;
        };
        Object.defineProperty(ProgressBar.prototype, "slideDuration", {
            /**
             * Duration in milliseconds for a sliding animation
             * when the value changing. If the vlaue is 0, no animation will be done.
             *
             * @default 500
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             * value改变时更新视图的缓动动画时间(毫秒为单位)。设置为0则不执行缓动。
             *
             * @default 500
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this._slideDuration;
            },
            set: function (value) {
                value = +value | 0;
                if (this._slideDuration === value)
                    return;
                this._slideDuration = value;
                if (this.animation.isPlaying) {
                    this.animation.stop();
                    this.setValue(this.slideToValue);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ProgressBar.prototype, "direction", {
            /**
             * Direction in which the fill of the ProgressBar expands toward completion.
             * you should use the <code>Direction</code> class constants to set the property.
             *
             * @default Direction.LTR
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             * ProgressBar 填充在逐步完成过程中扩展的方向。使用 <code>Direction</code> 类定义的常量。
             *
             * @default Direction.LTR
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this._direction;
            },
            set: function (value) {
                if (this._direction == value)
                    return;
                if (this.thumb)
                    this.thumb.x = this.thumbInitX;
                if (this.thumb)
                    this.thumb.y = this.thumbInitY;
                this._direction = value;
                this.invalidateDisplayList();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         *
         * @param newValue
         */
        ProgressBar.prototype.$setValue = function (newValue) {
            if (this.value === newValue)
                return false;
            var values = this.$Range;
            var result = _super.prototype.$setValue.call(this, newValue);
            if (this._slideDuration > 0 && this.$stage) {
                this.validateProperties(); //最大值最小值发生改变时要立即应用，防止当前起始值不正确。
                var animation = this.animation;
                if (animation.isPlaying) {
                    this.animationValue = this.slideToValue;
                    this.invalidateDisplayList();
                    animation.stop();
                }
                this.slideToValue = this.nearestValidValue(newValue, values[7 /* snapInterval */]);
                if (this.slideToValue === this.animationValue)
                    return result;
                var duration = this._slideDuration *
                    (Math.abs(this.animationValue - this.slideToValue) / (values[0 /* maximum */] - values[2 /* minimum */]));
                animation.duration = duration === Infinity ? 0 : duration;
                animation.from = this.animationValue;
                animation.to = this.slideToValue;
                animation.play();
            }
            else {
                this.animationValue = this.value;
            }
            return result;
        };
        /**
         * @private
         * 动画播放更新数值
         */
        ProgressBar.prototype.animationUpdateHandler = function (animation) {
            var values = this.$Range;
            var value = this.nearestValidValue(animation.currentValue, values[7 /* snapInterval */]);
            this.animationValue = Math.min(values[0 /* maximum */], Math.max(values[2 /* minimum */], value));
            this.invalidateDisplayList();
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        ProgressBar.prototype.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
            if (instance === this.thumb) {
                if (this.thumb.x)
                    this.thumbInitX = this.thumb.x;
                if (this.thumb.y)
                    this.thumbInitY = this.thumb.y;
                this.thumb.addEventListener(egret.Event.RESIZE, this.onThumbResize, this);
            }
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        ProgressBar.prototype.partRemoved = function (partName, instance) {
            _super.prototype.partRemoved.call(this, partName, instance);
            if (instance === this.thumb) {
                this.thumb.removeEventListener(egret.Event.RESIZE, this.onThumbResize, this);
            }
        };
        /**
         * @private
         * thumb的位置或尺寸发生改变
         */
        ProgressBar.prototype.onThumbResize = function (event) {
            this.updateSkinDisplayList();
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        ProgressBar.prototype.updateSkinDisplayList = function () {
            var currentValue = this.animation.isPlaying ? this.animationValue : this.value;
            var maxValue = this.maximum;
            var thumb = this.thumb;
            if (thumb) {
                var thumbWidth = thumb.width;
                var thumbHeight = thumb.height;
                var clipWidth = Math.round((currentValue / maxValue) * thumbWidth);
                if (clipWidth < 0 || clipWidth === Infinity)
                    clipWidth = 0;
                var clipHeight = Math.round((currentValue / maxValue) * thumbHeight);
                if (clipHeight < 0 || clipHeight === Infinity)
                    clipHeight = 0;
                var rect = thumb.$scrollRect;
                if (!rect) {
                    rect = egret.$TempRectangle;
                }
                rect.setTo(0, 0, thumbWidth, thumbHeight);
                var thumbPosX = thumb.x - rect.x;
                var thumbPosY = thumb.y - rect.y;
                switch (this._direction) {
                    case eui.Direction.LTR:
                        rect.width = clipWidth;
                        thumb.x = thumbPosX;
                        break;
                    case eui.Direction.RTL:
                        rect.width = clipWidth;
                        rect.x = thumbWidth - clipWidth;
                        thumb.x = rect.x;
                        break;
                    case eui.Direction.TTB:
                        rect.height = clipHeight;
                        thumb.y = thumbPosY;
                        break;
                    case eui.Direction.BTT:
                        rect.height = clipHeight;
                        rect.y = thumbHeight - clipHeight;
                        thumb.y = rect.y;
                        break;
                }
                thumb.scrollRect = rect;
            }
            if (this.labelDisplay) {
                this.labelDisplay.text = this.valueToLabel(currentValue, maxValue);
            }
        };
        return ProgressBar;
    }(eui.Range));
    eui.ProgressBar = ProgressBar;
    __reflect(ProgressBar.prototype, "eui.ProgressBar");
})(eui || (eui = {}));
//# sourceMappingURL=ProgressBar.js.map