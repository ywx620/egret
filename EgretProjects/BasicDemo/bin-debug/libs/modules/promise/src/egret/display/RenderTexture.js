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
     * RenderTexture is a dynamic texture
     * @extends egret.Texture
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/display/RenderTexture.ts
     * @language en_US
     */
    /**
     * RenderTexture 是动态纹理类，他实现了将显示对象及其子对象绘制成为一个纹理的功能
     * @extends egret.Texture
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/display/RenderTexture.ts
     * @language zh_CN
     */
    var RenderTexture = (function (_super) {
        __extends(RenderTexture, _super);
        function RenderTexture() {
            var _this = _super.call(this) || this;
            _this.$renderBuffer = new egret.sys.RenderBuffer();
            var bitmapData = new egret.BitmapData(_this.$renderBuffer.surface);
            bitmapData.$deleteSource = false;
            _this._setBitmapData(bitmapData);
            return _this;
        }
        /**
         * The specified display object is drawn as a texture
         * @param displayObject {egret.DisplayObject} the display to draw
         * @param clipBounds {egret.Rectangle} clip rect
         * @param scale {number} scale factor
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 将指定显示对象绘制为一个纹理
         * @param displayObject {egret.DisplayObject} 需要绘制的显示对象
         * @param clipBounds {egret.Rectangle} 绘制矩形区域
         * @param scale {number} 缩放比例
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        RenderTexture.prototype.drawToTexture = function (displayObject, clipBounds, scale) {
            if (scale === void 0) { scale = 1; }
            if (clipBounds && (clipBounds.width == 0 || clipBounds.height == 0)) {
                return false;
            }
            var bounds = clipBounds || displayObject.$getOriginalBounds();
            if (bounds.width == 0 || bounds.height == 0) {
                return false;
            }
            scale /= egret.$TextureScaleFactor;
            var width = (bounds.x + bounds.width) * scale;
            var height = (bounds.y + bounds.height) * scale;
            if (clipBounds) {
                width = bounds.width * scale;
                height = bounds.height * scale;
            }
            var renderBuffer = this.$renderBuffer;
            if (!renderBuffer) {
                return false;
            }
            renderBuffer.resize(width, height);
            this._bitmapData.width = width;
            this._bitmapData.height = height;
            var matrix = egret.Matrix.create();
            matrix.identity();
            //应用裁切
            if (clipBounds) {
                matrix.translate(-clipBounds.x, -clipBounds.y);
            }
            matrix.scale(scale, scale);
            egret.sys.systemRenderer.render(displayObject, renderBuffer, matrix, null, true);
            egret.Matrix.release(matrix);
            //设置纹理参数
            this.$initData(0, 0, width, height, 0, 0, width, height, width, height);
            return true;
        };
        /**
         * @inheritDoc
         */
        RenderTexture.prototype.getPixel32 = function (x, y) {
            var data;
            if (this.$renderBuffer) {
                var scale = egret.$TextureScaleFactor;
                x = Math.round(x / scale);
                y = Math.round(y / scale);
                data = this.$renderBuffer.getPixels(x, y, 1, 1);
            }
            return data;
        };
        /**
         * @inheritDoc
         */
        RenderTexture.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this.$renderBuffer = null;
        };
        return RenderTexture;
    }(egret.Texture));
    egret.RenderTexture = RenderTexture;
    __reflect(RenderTexture.prototype, "egret.RenderTexture");
})(egret || (egret = {}));
//# sourceMappingURL=RenderTexture.js.map