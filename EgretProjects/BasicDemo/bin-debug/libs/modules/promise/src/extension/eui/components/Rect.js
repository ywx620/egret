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
     * The Rect component is a rectangular shape. It can be touched.
     * @version Egret 2.5.5
     * @version eui 1.0
     * @platform Web,Native
     * @language en_US
     */
    /**
     * Rect 组件矩形绘图元素。此组件可响应鼠标事件。
     * @version Egret 2.5.5
     * @version eui 1.0
     * @platform Web,Native
     * @language zh_CN
     */
    var Rect = (function (_super) {
        __extends(Rect, _super);
        function Rect(width, height, fillColor) {
            var _this = _super.call(this) || this;
            _this.$fillColor = 0x000000;
            _this.$fillAlpha = 1;
            _this.$strokeColor = 0x444444;
            _this.$strokeAlpha = 1;
            _this.$strokeWeight = 0;
            _this.$ellipseWidth = 0;
            _this.$ellipseHeight = 0;
            _this.touchChildren = false;
            _this.$graphics = new egret.Graphics();
            _this.$graphics.$setTarget(_this);
            _this.width = width;
            _this.height = height;
            _this.fillColor = fillColor;
            return _this;
        }
        Object.defineProperty(Rect.prototype, "graphics", {
            get: function () {
                return this.$graphics;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         */
        Rect.prototype.$measureContentBounds = function (bounds) {
            if (this.$graphics) {
                bounds.setTo(0, 0, this.width, this.height);
            }
        };
        Object.defineProperty(Rect.prototype, "fillColor", {
            /**
             * Fill color
             * @version Egret 2.5.5
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 填充颜色
             * @version Egret 2.5.5
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this.$fillColor;
            },
            set: function (value) {
                if (value == undefined || this.$fillColor == value)
                    return;
                this.$fillColor = value;
                this.invalidateDisplayList();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Rect.prototype, "fillAlpha", {
            /**
             * Fill alpha
             * @version Egret 2.5.5
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 填充透明度,默认值为1。
             * @version Egret 2.5.5
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this.$fillAlpha;
            },
            set: function (value) {
                if (this.$fillAlpha == value)
                    return;
                this.$fillAlpha = value;
                this.invalidateDisplayList();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Rect.prototype, "strokeColor", {
            /**
             * The line's color inside the rect border. Caution: when the strokeWeight is 0, a line is not drawn
             * @version Egret 2.5.5
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 边框颜色,注意：当 strokeWeight 为 0 时，不显示边框。
             * @version Egret 2.5.5
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this.$strokeColor;
            },
            set: function (value) {
                if (this.$strokeColor == value)
                    return;
                this.$strokeColor = value;
                this.invalidateDisplayList();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Rect.prototype, "strokeAlpha", {
            /**
             * The line's alpha inside the rect border. Caution: when the strokeWeight is 0, a line is not drawn
             * @version Egret 2.5.5
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 边框透明度,注意：当 strokeWeight 为0时，不显示边框。
             * @version Egret 2.5.5
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this.$strokeAlpha;
            },
            set: function (value) {
                if (this.$strokeAlpha == value)
                    return;
                this.$strokeAlpha = value;
                this.invalidateDisplayList();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Rect.prototype, "strokeWeight", {
            /**
             * The line's thickness inside the rect border. Caution: when the strokeWeight is 0, a line is not drawn
             * @version Egret 2.5.5
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 边框粗细(像素),注意：当 strokeWeight 为 0 时，不显示边框。
             * @version Egret 2.5.5
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this.$strokeWeight;
            },
            set: function (value) {
                if (this.$strokeWeight == value)
                    return;
                this.$strokeWeight = value;
                this.invalidateDisplayList();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Rect.prototype, "ellipseWidth", {
            /**
             * Width used to draw an ellipse with rounded corners (in pixels).
             * @version Egret 2.5.5
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 用于绘制圆角的椭圆的宽度(以像素为单位)
             * @version Egret 2.5.5
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this.$ellipseWidth;
            },
            set: function (value) {
                if (this.$ellipseWidth == value)
                    return;
                this.$ellipseWidth = value;
                this.invalidateDisplayList();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Rect.prototype, "ellipseHeight", {
            /**
             * Height used to draw an ellipse with rounded corners (in pixels). If no value is specified, the default value matches the value of the ellipseWidth parameter.
             * @version Egret 2.5.5
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 用于绘制圆角的椭圆的高度 (以像素为单位)。如果未指定值，则默认值与为 ellipseWidth 参数提供的值相匹配。
             * @version Egret 2.5.5
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this.$ellipseHeight;
            },
            set: function (value) {
                if (this.$ellipseHeight == value)
                    return;
                this.$ellipseHeight = value;
                this.invalidateDisplayList();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @copy eui.UIComponent#updateDisplayList
         *
         * @version Egret 2.5.5
         * @version eui 1.0
         * @platform Web,Native
         */
        Rect.prototype.updateDisplayList = function (unscaledWidth, unscaledHeight) {
            var g = this.graphics;
            g.clear();
            if (this.$strokeWeight > 0) {
                g.beginFill(this.$fillColor, 0);
                g.lineStyle(this.$strokeWeight, this.$strokeColor, this.$strokeAlpha, true, "normal", "square", "miter");
                if (this.$ellipseWidth == 0 && this.$ellipseHeight == 0) {
                    g.drawRect(this.$strokeWeight / 2, this.$strokeWeight / 2, unscaledWidth - this.$strokeWeight, unscaledHeight - this.$strokeWeight);
                }
                else {
                    g.drawRoundRect(this.$strokeWeight / 2, this.$strokeWeight / 2, unscaledWidth - this.$strokeWeight, unscaledHeight - this.$strokeWeight, this.$ellipseWidth, this.$ellipseHeight);
                }
                g.endFill();
            }
            g.beginFill(this.$fillColor, this.$fillAlpha);
            g.lineStyle(this.$strokeWeight, this.$strokeColor, 0, true, "normal", "square", "miter");
            if (this.$ellipseWidth == 0 && this.$ellipseHeight == 0) {
                g.drawRect(this.$strokeWeight, this.$strokeWeight, unscaledWidth - this.$strokeWeight * 2, unscaledHeight - this.$strokeWeight * 2);
            }
            else {
                g.drawRoundRect(this.$strokeWeight, this.$strokeWeight, unscaledWidth - this.$strokeWeight * 2, unscaledHeight - this.$strokeWeight * 2, this.$ellipseWidth, this.$ellipseHeight);
            }
            g.endFill();
            this.$invalidateContentBounds();
        };
        return Rect;
    }(eui.Component));
    eui.Rect = Rect;
    __reflect(Rect.prototype, "eui.Rect");
})(eui || (eui = {}));
//# sourceMappingURL=Rect.js.map