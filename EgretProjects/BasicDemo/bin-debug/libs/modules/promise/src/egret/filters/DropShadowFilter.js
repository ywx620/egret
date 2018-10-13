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
     * @class egret.DropShadowFilter
     * @classdesc
     * 可使用 DropShadowFilter 类向显示对象添加投影。
     * @extends egret.GlowFilter
     * @version Egret 3.1.4
     * @platform Web,Native
     */
    var DropShadowFilter = (function (_super) {
        __extends(DropShadowFilter, _super);
        /**
         * Initializes a new DropShadowFilter instance.
         * @method egret.DropShadowFilter#constructor
         * @param distance {number} The offset distance of the bevel. Valid values are in pixels (floating point).
         * @param angle {number} The angle of the bevel. Valid values are from 0 to 360°.
         * @param color {number} The color of the glow. Valid values are in the hexadecimal format 0xRRGGBB. The default value is 0xFF0000.
         * @param alpha {number} The alpha transparency value for the color. Valid values are 0 to 1. For example, .25 sets a transparency value of 25%. The default value is 1.
         * @param blurX {number} The amount of horizontal blur. Valid values are 0 to 255 (floating point).
         * @param blurY {number} The amount of vertical blur. Valid values are 0 to 255 (floating point).
         * @param strength {number} The strength of the imprint or spread. The higher the value, the more color is imprinted and the stronger the contrast between the glow and the background. Valid values are 0 to 255.
         * @param quality {number} The number of times to apply the filter.
         * @param inner {boolean} Specifies whether the glow is an inner glow. The value true indicates an inner glow. The default is false, an outer glow (a glow around the outer edges of the object).
         * @param knockout {number} Specifies whether the object has a knockout effect. A value of true makes the object's fill transparent and reveals the background color of the document. The default value is false (no knockout effect).
         * @param hideObject {number} Indicates whether or not the object is hidden. The value true indicates that the object itself is not drawn; only the shadow is visible. The default is false, meaning that the object is shown.
         * @version Egret 3.1.4
         * @platform Web
         * @language en_US
         */
        /**
         * 初始化 DropShadowFilter 对象
         * @method egret.DropShadowFilter#constructor
         * @param distance {number} 阴影的偏移距离，以像素为单位。
         * @param angle {number} 阴影的角度，0 到 360 度（浮点）。
         * @param color {number} 光晕颜色，采用十六进制格式 0xRRGGBB。默认值为 0xFF0000。
         * @param alpha {number} 颜色的 Alpha 透明度值。有效值为 0 到 1。例如，0.25 设置透明度值为 25%。
         * @param blurX {number} 水平模糊量。有效值为 0 到 255（浮点）。
         * @param blurY {number} 垂直模糊量。有效值为 0 到 255（浮点）。
         * @param strength {number} 印记或跨页的强度。该值越高，压印的颜色越深，而且发光与背景之间的对比度也越强。有效值为 0 到 255。
         * @param quality {number} 应用滤镜的次数。暂未实现。
         * @param inner {boolean} 指定发光是否为内侧发光。值 true 指定发光是内侧发光。值 false 指定发光是外侧发光（对象外缘周围的发光）。
         * @param knockout {number} 指定对象是否具有挖空效果。值为 true 将使对象的填充变为透明，并显示文档的背景颜色。
         * @param hideObject {number} 表示是否隐藏对象。如果值为 true，则表示没有绘制对象本身，只有阴影是可见的。默认值为 false（显示对象）。
         * @version Egret 3.1.4
         * @platform Web
         * @language zh_CN
         */
        function DropShadowFilter(distance, angle, color, alpha, blurX, blurY, strength, quality, inner, knockout, hideObject) {
            if (distance === void 0) { distance = 4.0; }
            if (angle === void 0) { angle = 45; }
            if (color === void 0) { color = 0; }
            if (alpha === void 0) { alpha = 1.0; }
            if (blurX === void 0) { blurX = 4.0; }
            if (blurY === void 0) { blurY = 4.0; }
            if (strength === void 0) { strength = 1.0; }
            if (quality === void 0) { quality = 1; }
            if (inner === void 0) { inner = false; }
            if (knockout === void 0) { knockout = false; }
            if (hideObject === void 0) { hideObject = false; }
            var _this = _super.call(this, color, alpha, blurX, blurY, strength, quality, inner, knockout) || this;
            _this.$distance = distance;
            _this.$angle = angle;
            _this.$hideObject = hideObject;
            _this.$uniforms.dist = distance;
            _this.$uniforms.angle = angle / 180 * Math.PI;
            _this.$uniforms.hideObject = hideObject ? 1 : 0;
            return _this;
        }
        Object.defineProperty(DropShadowFilter.prototype, "distance", {
            /**
             * The offset distance of the bevel.
             * @version Egret 3.1.4
             * @platform Web
             * @language en_US
             */
            /**
             * 阴影的偏移距离，以像素为单位。
             * @version Egret 3.1.4
             * @platform Web
             * @language zh_CN
             */
            get: function () {
                return this.$distance;
            },
            set: function (value) {
                if (this.$distance == value) {
                    return;
                }
                this.$distance = value;
                this.$uniforms.dist = value;
                this.invalidate();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DropShadowFilter.prototype, "angle", {
            /**
             * The angle of the bevel.
             * @version Egret 3.1.4
             * @platform Web
             * @language en_US
             */
            /**
             * 阴影的角度。
             * @version Egret 3.1.4
             * @platform Web
             * @language zh_CN
             */
            get: function () {
                return this.$angle;
            },
            set: function (value) {
                if (this.$angle == value) {
                    return;
                }
                this.$angle = value;
                this.$uniforms.angle = value / 180 * Math.PI;
                this.invalidate();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DropShadowFilter.prototype, "hideObject", {
            /**
             * Indicates whether or not the object is hidden.
             * @version Egret 3.1.4
             * @platform Web
             * @language en_US
             */
            /**
             * 表示是否隐藏对象。
             * @version Egret 3.1.4
             * @platform Web
             * @language zh_CN
             */
            get: function () {
                return this.$hideObject;
            },
            set: function (value) {
                if (this.$hideObject == value) {
                    return;
                }
                this.$hideObject = value;
                this.$uniforms.hideObject = value ? 1 : 0;
                this.invalidate();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         */
        DropShadowFilter.prototype.$toJson = function () {
            return '{"distance": ' + this.$distance + ', "angle": ' + this.$angle + ', "color": ' + this.$color + ', "red": ' + this.$red + ', "green": ' + this.$green + ', "blue": ' + this.$blue + ', "alpha": ' + this.$alpha + ', "blurX": ' + this.$blurX + ', "blurY": ' + this.blurY + ', "strength": ' + this.$strength + ', "quality": ' + this.$quality + ', "inner": ' + this.$inner + ', "knockout": ' + this.$knockout + ', "hideObject": ' + this.$hideObject + '}';
        };
        return DropShadowFilter;
    }(egret.GlowFilter));
    egret.DropShadowFilter = DropShadowFilter;
    __reflect(DropShadowFilter.prototype, "egret.DropShadowFilter");
})(egret || (egret = {}));
//# sourceMappingURL=DropShadowFilter.js.map