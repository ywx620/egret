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
    /**
     * The BlurFilter class lets you apply a blur visual effect to display objects. A blur effect softens the details of an image.
     * You can produce blurs that range from a softly unfocused look to a Gaussian blur, a hazy appearance like viewing an image through semi-opaque glass.
     * @version Egret 3.0.1
     * @platform Web
     * @see http://edn.egret.com/cn/docs/page/947#模糊滤镜 模糊滤镜
     * @language en_US
     */
    /**
     * 可使用 BlurFilter 类将模糊视觉效果应用于显示对象。模糊效果可以柔化图像的细节。
     * 您可以生成一些模糊效果，范围从创建一个柔化的、未聚焦的外观到高斯模糊（就像通过半透明玻璃查看图像一样的朦胧的外观）。
     * @version Egret 3.1.0
     * @platform Web
     * @see http://edn.egret.com/cn/docs/page/947#模糊滤镜 模糊滤镜
     * @language zh_CN
     */
    var BlurFilter = (function (_super) {
        __extends(BlurFilter, _super);
        /**
         * Initializes a BlurFilter object.
         * @param blurX {number} The amount of horizontal blur. Valid values are 0 to 255 (floating point).
         * @param blurY {number} The amount of vertical blur. Valid values are 0 to 255 (floating point).
         * @param quality {number} The number of times to apply the filter.
         * @version Egret 3.1.0
         * @platform Web
         * @language en_US
         */
        /**
         * 创建一个 BlurFilter 对象。
         * @param blurX {number} 水平模糊量。有效值为 0 到 255（浮点）。
         * @param blurY {number} 垂直模糊量。有效值为 0 到 255（浮点）。
         * @param quality {number} 应用滤镜的次数。暂未实现。
         * @version Egret 3.1.0
         * @platform Web
         * @language zh_CN
         */
        function BlurFilter(blurX, blurY, quality) {
            if (blurX === void 0) { blurX = 4; }
            if (blurY === void 0) { blurY = 4; }
            if (quality === void 0) { quality = 1; }
            var _this = _super.call(this) || this;
            _this.type = "blur";
            _this.$blurX = blurX;
            _this.$blurY = blurY;
            _this.$quality = quality;
            _this.blurXFilter = new BlurXFilter(blurX);
            _this.blurYFilter = new BlurYFilter(blurY);
            return _this;
        }
        Object.defineProperty(BlurFilter.prototype, "blurX", {
            /**
             * The amount of horizontal blur.
             * @version Egret 3.1.0
             * @platform Web
             * @language en_US
             */
            /**
             * 水平模糊量。
             * @version Egret 3.1.0
             * @platform Web
             * @language zh_CN
             */
            get: function () {
                return this.$blurX;
            },
            set: function (value) {
                if (this.$blurX == value) {
                    return;
                }
                this.$blurX = value;
                this.blurXFilter.blurX = value;
                this.invalidate();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BlurFilter.prototype, "blurY", {
            /**
             * The amount of vertical blur.
             * @version Egret 3.1.0
             * @platform Web
             * @language en_US
             */
            /**
             * 垂直模糊量。
             * @version Egret 3.1.0
             * @platform Web
             * @language zh_CN
             */
            get: function () {
                return this.$blurY;
            },
            set: function (value) {
                if (this.$blurY == value) {
                    return;
                }
                this.$blurY = value;
                this.blurYFilter.blurY = value;
                this.invalidate();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         */
        BlurFilter.prototype.$toJson = function () {
            return '{"blurX": ' + this.$blurX + ', "blurY": ' + this.$blurY + ', "quality": 1}';
        };
        return BlurFilter;
    }(egret.Filter));
    egret.BlurFilter = BlurFilter;
    __reflect(BlurFilter.prototype, "egret.BlurFilter");
    var BlurXFilter = (function (_super) {
        __extends(BlurXFilter, _super);
        function BlurXFilter(blurX) {
            if (blurX === void 0) { blurX = 4; }
            var _this = _super.call(this) || this;
            _this.type = "blurX";
            _this.$uniforms.blur = { x: blurX, y: 0 };
            return _this;
        }
        Object.defineProperty(BlurXFilter.prototype, "blurX", {
            get: function () {
                return this.$uniforms.blur.x;
            },
            set: function (value) {
                this.$uniforms.blur.x = value;
            },
            enumerable: true,
            configurable: true
        });
        return BlurXFilter;
    }(egret.Filter));
    __reflect(BlurXFilter.prototype, "BlurXFilter", ["egret.IBlurXFilter"]);
    var BlurYFilter = (function (_super) {
        __extends(BlurYFilter, _super);
        function BlurYFilter(blurY) {
            if (blurY === void 0) { blurY = 4; }
            var _this = _super.call(this) || this;
            _this.type = "blurY";
            _this.$uniforms.blur = { x: 0, y: blurY };
            return _this;
        }
        Object.defineProperty(BlurYFilter.prototype, "blurY", {
            get: function () {
                return this.$uniforms.blur.y;
            },
            set: function (value) {
                this.$uniforms.blur.y = value;
            },
            enumerable: true,
            configurable: true
        });
        return BlurYFilter;
    }(egret.Filter));
    __reflect(BlurYFilter.prototype, "BlurYFilter", ["egret.IBlurYFilter"]);
})(egret || (egret = {}));
//# sourceMappingURL=BlurFilter.js.map