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
var egret;
(function (egret) {
    var native;
    (function (native) {
        /**
         * 创建一个canvas。
         */
        function createCanvas(width, height) {
            var result = new native.NativeCanvas();
            if (!isNaN(width) && !isNaN(height)) {
                result.width = width;
                result.height = height;
            }
            return result;
        }
        var sharedCanvas;
        /**
         * @private
         * NativeCanvas2D渲染器
         */
        var NativeCanvasRenderBuffer = (function () {
            function NativeCanvasRenderBuffer(width, height) {
                this.surface = createCanvas(width, height);
                this.context = this.surface.getContext("2d");
                //保证rootCanvas是第一个创建的canvas
            }
            Object.defineProperty(NativeCanvasRenderBuffer.prototype, "width", {
                /**
                 * 渲染缓冲的宽度，以像素为单位。
                 * @readOnly
                 */
                get: function () {
                    return this.surface.width;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(NativeCanvasRenderBuffer.prototype, "height", {
                /**
                 * 渲染缓冲的高度，以像素为单位。
                 * @readOnly
                 */
                get: function () {
                    return this.surface.height;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 改变渲染缓冲的大小并清空缓冲区
             * @param width 改变后的宽
             * @param height 改变后的高
             * @param useMaxSize 若传入true，则将改变后的尺寸与已有尺寸对比，保留较大的尺寸。
             */
            NativeCanvasRenderBuffer.prototype.resize = function (width, height, useMaxSize) {
                //resize 之前要提交下绘制命令
                if (native.$supportCmdBatch) {
                    native.$cmdManager.flush();
                }
                var surface = this.surface;
                surface.width = width;
                surface.height = height;
                this.clear();
            };
            /**
             * 改变渲染缓冲为指定大小，但保留原始图像数据
             * @param width 改变后的宽
             * @param height 改变后的高
             * @param offsetX 原始图像数据在改变后缓冲区的绘制起始位置x
             * @param offsetY 原始图像数据在改变后缓冲区的绘制起始位置y
             */
            NativeCanvasRenderBuffer.prototype.resizeTo = function (width, height, offsetX, offsetY) {
                //resize 之前要提交下绘制命令
                if (native.$supportCmdBatch) {
                    native.$cmdManager.flush();
                }
                if (!sharedCanvas) {
                    sharedCanvas = createCanvas();
                }
                var oldContext = this.context;
                var oldSurface = this.surface;
                var newSurface = sharedCanvas;
                var newContext = newSurface.getContext("2d");
                sharedCanvas = oldSurface;
                this.context = newContext;
                this.surface = newSurface;
                newSurface.width = Math.max(width, 1);
                newSurface.height = Math.max(height, 1);
                newContext.setTransform(1, 0, 0, 1, 0, 0);
                newContext.drawImage(oldSurface, offsetX, offsetY);
                oldSurface.height = 1;
                oldSurface.width = 1;
            };
            NativeCanvasRenderBuffer.prototype.setDirtyRegionPolicy = function (state) {
            };
            /**
             * 清空并设置裁切
             * @param regions 矩形列表
             * @param offsetX 矩形要加上的偏移量x
             * @param offsetY 矩形要加上的偏移量y
             */
            NativeCanvasRenderBuffer.prototype.beginClip = function (regions, offsetX, offsetY) {
                offsetX = +offsetX || 0;
                offsetY = +offsetY || 0;
                var context = this.context;
                context.save();
                context.beginPath();
                context.setTransform(1, 0, 0, 1, offsetX, offsetY);
                var length = regions.length;
                for (var i = 0; i < length; i++) {
                    var region = regions[i];
                    context.clearRect(region.minX, region.minY, region.width, region.height);
                    context.rect(region.minX, region.minY, region.width, region.height);
                }
                context.clip();
            };
            /**
             * 取消上一次设置的clip。
             */
            NativeCanvasRenderBuffer.prototype.endClip = function () {
                this.context.restore();
            };
            /**
             * 获取指定区域的像素
             */
            NativeCanvasRenderBuffer.prototype.getPixels = function (x, y, width, height) {
                if (width === void 0) { width = 1; }
                if (height === void 0) { height = 1; }
                return this.context.getImageData(x, y, width, height).data;
            };
            /**
             * 转换成base64字符串，如果图片（或者包含的图片）跨域，则返回null
             * @param type 转换的类型，如: "image/png","image/jpeg"
             */
            NativeCanvasRenderBuffer.prototype.toDataURL = function (type, encoderOptions) {
                return this.surface.toDataURL(type, encoderOptions);
            };
            /**
             * 清空缓冲区数据
             */
            NativeCanvasRenderBuffer.prototype.clear = function () {
                var width = this.surface.width;
                var height = this.surface.height;
                if (width > 0 && height > 0) {
                    this.context.setTransform(1, 0, 0, 1, 0, 0);
                    this.context.clearRect(0, 0, width, height);
                }
            };
            /**
             * 销毁绘制对象
             */
            NativeCanvasRenderBuffer.prototype.destroy = function () {
                this.surface.width = this.surface.height = 1;
            };
            return NativeCanvasRenderBuffer;
        }());
        native.NativeCanvasRenderBuffer = NativeCanvasRenderBuffer;
        __reflect(NativeCanvasRenderBuffer.prototype, "egret.native.NativeCanvasRenderBuffer", ["egret.sys.RenderBuffer"]);
    })(native = egret.native || (egret.native = {}));
})(egret || (egret = {}));
//# sourceMappingURL=NativeCanvasRenderBuffer.js.map