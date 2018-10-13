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
    var web;
    (function (web) {
        /**
         * @private
         * WebGL渲染缓存
         */
        var WebGLRenderBuffer = (function (_super) {
            __extends(WebGLRenderBuffer, _super);
            function WebGLRenderBuffer(width, height, root) {
                var _this = _super.call(this) || this;
                _this.globalAlpha = 1;
                /**
                 * stencil state
                 * 模版开关状态
                 */
                _this.stencilState = false;
                _this.$stencilList = [];
                _this.stencilHandleCount = 0;
                /**
                 * scissor state
                 * scissor 开关状态
                 */
                _this.$scissorState = false;
                _this.scissorRect = new egret.Rectangle();
                _this.$hasScissor = false;
                // dirtyRegionPolicy hack
                _this.dirtyRegionPolicy = true;
                _this._dirtyRegionPolicy = true; // 默认设置为true，保证第一帧绘制在frameBuffer上
                _this.$drawCalls = 0;
                _this.$computeDrawCall = false;
                _this.globalMatrix = new egret.Matrix();
                _this.savedGlobalMatrix = new egret.Matrix();
                // 获取webglRenderContext
                _this.context = web.WebGLRenderContext.getInstance(width, height);
                // buffer 对应的 render target
                _this.rootRenderTarget = new web.WebGLRenderTarget(_this.context.context, 3, 3);
                if (width && height) {
                    _this.resize(width, height);
                }
                // 如果是第一个加入的buffer，说明是舞台buffer
                _this.root = root;
                // 如果是用于舞台渲染的renderBuffer，则默认添加renderTarget到renderContext中，而且是第一个
                if (_this.root) {
                    _this.context.pushBuffer(_this);
                    // 画布
                    _this.surface = _this.context.surface;
                }
                else {
                    // 由于创建renderTarget造成的frameBuffer绑定，这里重置绑定
                    var lastBuffer = _this.context.activatedBuffer;
                    if (lastBuffer) {
                        lastBuffer.rootRenderTarget.activate();
                    }
                    _this.rootRenderTarget.initFrameBuffer();
                    _this.surface = _this.rootRenderTarget;
                }
                return _this;
            }
            WebGLRenderBuffer.prototype.enableStencil = function () {
                if (!this.stencilState) {
                    this.context.enableStencilTest();
                    this.stencilState = true;
                }
            };
            WebGLRenderBuffer.prototype.disableStencil = function () {
                if (this.stencilState) {
                    this.context.disableStencilTest();
                    this.stencilState = false;
                }
            };
            WebGLRenderBuffer.prototype.restoreStencil = function () {
                if (this.stencilState) {
                    this.context.enableStencilTest();
                }
                else {
                    this.context.disableStencilTest();
                }
            };
            WebGLRenderBuffer.prototype.enableScissor = function (x, y, width, height) {
                if (!this.$scissorState) {
                    this.$scissorState = true;
                    this.scissorRect.setTo(x, y, width, height);
                    this.context.enableScissorTest(this.scissorRect);
                }
            };
            WebGLRenderBuffer.prototype.disableScissor = function () {
                if (this.$scissorState) {
                    this.$scissorState = false;
                    this.scissorRect.setEmpty();
                    this.context.disableScissorTest();
                }
            };
            WebGLRenderBuffer.prototype.restoreScissor = function () {
                if (this.$scissorState) {
                    this.context.enableScissorTest(this.scissorRect);
                }
                else {
                    this.context.disableScissorTest();
                }
            };
            Object.defineProperty(WebGLRenderBuffer.prototype, "width", {
                /**
                 * 渲染缓冲的宽度，以像素为单位。
                 * @readOnly
                 */
                get: function () {
                    return this.rootRenderTarget.width;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(WebGLRenderBuffer.prototype, "height", {
                /**
                 * 渲染缓冲的高度，以像素为单位。
                 * @readOnly
                 */
                get: function () {
                    return this.rootRenderTarget.height;
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
            WebGLRenderBuffer.prototype.resize = function (width, height, useMaxSize) {
                this.context.pushBuffer(this);
                width = width || 1;
                height = height || 1;
                // render target 尺寸重置
                if (width != this.rootRenderTarget.width || height != this.rootRenderTarget.height) {
                    this.context.drawCmdManager.pushResize(this, width, height);
                    // 同步更改宽高
                    this.rootRenderTarget.width = width;
                    this.rootRenderTarget.height = height;
                }
                // 如果是舞台的渲染缓冲，执行resize，否则surface大小不随之改变
                if (this.root) {
                    this.context.resize(width, height, useMaxSize);
                }
                this.context.clear();
                this.context.popBuffer();
            };
            /**
             * 改变渲染缓冲为指定大小，但保留原始图像数据
             * @param width 改变后的宽
             * @param height 改变后的高
             * @param offsetX 原始图像数据在改变后缓冲区的绘制起始位置x
             * @param offsetY 原始图像数据在改变后缓冲区的绘制起始位置y
             */
            WebGLRenderBuffer.prototype.resizeTo = function (width, height, offsetX, offsetY) {
                this.context.pushBuffer(this);
                var oldWidth = this.rootRenderTarget.width;
                var oldHeight = this.rootRenderTarget.height;
                var tempBuffer = WebGLRenderBuffer.create(oldWidth, oldHeight);
                this.context.pushBuffer(tempBuffer);
                this.context.drawImage(this.rootRenderTarget, 0, 0, oldWidth, oldHeight, 0, 0, oldWidth, oldHeight, oldWidth, oldHeight, false);
                this.context.popBuffer();
                this.resize(width, height);
                this.setTransform(1, 0, 0, 1, 0, 0);
                this.context.drawImage(tempBuffer.rootRenderTarget, 0, 0, oldWidth, oldHeight, offsetX, offsetY, oldWidth, oldHeight, oldWidth, oldHeight, false);
                WebGLRenderBuffer.release(tempBuffer);
                this.context.popBuffer();
            };
            WebGLRenderBuffer.prototype.setDirtyRegionPolicy = function (state) {
                this.dirtyRegionPolicy = (state == "on");
            };
            /**
             * 清空并设置裁切
             * @param regions 矩形列表
             * @param offsetX 矩形要加上的偏移量x
             * @param offsetY 矩形要加上的偏移量y
             */
            WebGLRenderBuffer.prototype.beginClip = function (regions, offsetX, offsetY) {
                this.context.pushBuffer(this);
                if (this.root) {
                    // dirtyRegionPolicy hack
                    if (this._dirtyRegionPolicy) {
                        this.rootRenderTarget.useFrameBuffer = true;
                        this.rootRenderTarget.activate();
                    }
                    else {
                        this.rootRenderTarget.useFrameBuffer = false;
                        this.rootRenderTarget.activate();
                        WebGLRenderBuffer.autoClear && this.context.clear();
                    }
                }
                offsetX = +offsetX || 0;
                offsetY = +offsetY || 0;
                this.setTransform(1, 0, 0, 1, offsetX, offsetY);
                var length = regions.length;
                //只有一个区域且刚好为舞台大小时,不设置模板
                // if (length == 1 && regions[0].minX == 0 && regions[0].minY == 0 &&
                //     regions[0].width == this.rootRenderTarget.width && regions[0].height == this.rootRenderTarget.height) {
                this.maskPushed = false;
                this.rootRenderTarget.useFrameBuffer && this.context.clear();
                this.context.popBuffer();
                return;
                // }
                // 擦除脏矩形区域
                // for (let i = 0; i < length; i++) {
                //     let region = regions[i];
                //     this.context.clearRect(region.minX, region.minY, region.width, region.height);
                // }
                // // 设置模版
                // if (length > 0) {
                //     // 对第一个且只有一个mask用scissor处理
                //     if(!this.$hasScissor && length == 1) {
                //         let region = regions[0];
                //         regions = regions.slice(1);
                //         let x = region.minX + offsetX;
                //         let y = region.minY + offsetY;
                //         let width = region.width;
                //         let height = region.height;
                //         this.context.enableScissor(x, - y - height + this.height, width, height);
                //         this.scissorEnabled = true;
                //     } else {
                //         this.scissorEnabled = false;
                //     }
                //     if(regions.length > 0) {
                //         this.context.pushMask(regions);
                //         this.maskPushed = true;
                //     } else {
                //         this.maskPushed = false;
                //     }
                //     this.offsetX = offsetX;
                //     this.offsetY = offsetY;
                // }
                // else {
                //     this.maskPushed = false;
                // }
                // this.context.popBuffer();
            };
            /**
             * 取消上一次设置的clip。
             */
            WebGLRenderBuffer.prototype.endClip = function () {
                if (this.maskPushed || this.scissorEnabled) {
                    this.context.pushBuffer(this);
                    if (this.maskPushed) {
                        this.setTransform(1, 0, 0, 1, this.offsetX, this.offsetY);
                        this.context.popMask();
                    }
                    if (this.scissorEnabled) {
                        this.context.disableScissor();
                    }
                    this.context.popBuffer();
                }
            };
            /**
             * 获取指定区域的像素
             */
            WebGLRenderBuffer.prototype.getPixels = function (x, y, width, height) {
                if (width === void 0) { width = 1; }
                if (height === void 0) { height = 1; }
                var pixels = new Uint8Array(4 * width * height);
                var useFrameBuffer = this.rootRenderTarget.useFrameBuffer;
                this.rootRenderTarget.useFrameBuffer = true;
                this.rootRenderTarget.activate();
                this.context.getPixels(x, y, width, height, pixels);
                this.rootRenderTarget.useFrameBuffer = useFrameBuffer;
                this.rootRenderTarget.activate();
                //图像反转
                var result = new Uint8Array(4 * width * height);
                for (var i = 0; i < height; i++) {
                    for (var j = 0; j < width; j++) {
                        result[(width * (height - i - 1) + j) * 4] = pixels[(width * i + j) * 4];
                        result[(width * (height - i - 1) + j) * 4 + 1] = pixels[(width * i + j) * 4 + 1];
                        result[(width * (height - i - 1) + j) * 4 + 2] = pixels[(width * i + j) * 4 + 2];
                        result[(width * (height - i - 1) + j) * 4 + 3] = pixels[(width * i + j) * 4 + 3];
                    }
                }
                return result;
            };
            /**
             * 转换成base64字符串，如果图片（或者包含的图片）跨域，则返回null
             * @param type 转换的类型，如: "image/png","image/jpeg"
             */
            WebGLRenderBuffer.prototype.toDataURL = function (type, encoderOptions) {
                return this.context.surface.toDataURL(type, encoderOptions);
            };
            /**
             * 销毁绘制对象
             */
            WebGLRenderBuffer.prototype.destroy = function () {
                this.context.destroy();
            };
            WebGLRenderBuffer.prototype.onRenderFinish = function () {
                this.$drawCalls = 0;
                // 如果是舞台渲染buffer，判断脏矩形策略
                if (this.root) {
                    // dirtyRegionPolicy hack
                    if (!this._dirtyRegionPolicy && this.dirtyRegionPolicy) {
                        this.drawSurfaceToFrameBuffer(0, 0, this.rootRenderTarget.width, this.rootRenderTarget.height, 0, 0, this.rootRenderTarget.width, this.rootRenderTarget.height, true);
                    }
                    if (this._dirtyRegionPolicy) {
                        this.drawFrameBufferToSurface(0, 0, this.rootRenderTarget.width, this.rootRenderTarget.height, 0, 0, this.rootRenderTarget.width, this.rootRenderTarget.height);
                    }
                    this._dirtyRegionPolicy = this.dirtyRegionPolicy;
                }
            };
            /**
             * 交换frameBuffer中的图像到surface中
             * @param width 宽度
             * @param height 高度
             */
            WebGLRenderBuffer.prototype.drawFrameBufferToSurface = function (sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight, clear) {
                if (clear === void 0) { clear = false; }
                this.rootRenderTarget.useFrameBuffer = false;
                this.rootRenderTarget.activate();
                this.context.disableStencilTest(); // 切换frameBuffer注意要禁用STENCIL_TEST
                this.context.disableScissorTest();
                this.setTransform(1, 0, 0, 1, 0, 0);
                this.globalAlpha = 1;
                this.context.setGlobalCompositeOperation("source-over");
                clear && this.context.clear();
                this.context.drawImage(this.rootRenderTarget, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight, sourceWidth, sourceHeight, false);
                this.context.$drawWebGL();
                this.rootRenderTarget.useFrameBuffer = true;
                this.rootRenderTarget.activate();
                this.restoreStencil();
                this.restoreScissor();
            };
            /**
             * 交换surface的图像到frameBuffer中
             * @param width 宽度
             * @param height 高度
             */
            WebGLRenderBuffer.prototype.drawSurfaceToFrameBuffer = function (sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight, clear) {
                if (clear === void 0) { clear = false; }
                this.rootRenderTarget.useFrameBuffer = true;
                this.rootRenderTarget.activate();
                this.context.disableStencilTest(); // 切换frameBuffer注意要禁用STENCIL_TEST
                this.context.disableScissorTest();
                this.setTransform(1, 0, 0, 1, 0, 0);
                this.globalAlpha = 1;
                this.context.setGlobalCompositeOperation("source-over");
                clear && this.context.clear();
                this.context.drawImage(this.context.surface, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight, sourceWidth, sourceHeight, false);
                this.context.$drawWebGL();
                this.rootRenderTarget.useFrameBuffer = false;
                this.rootRenderTarget.activate();
                this.restoreStencil();
                this.restoreScissor();
            };
            /**
             * 清空缓冲区数据
             */
            WebGLRenderBuffer.prototype.clear = function () {
                this.context.clear();
            };
            WebGLRenderBuffer.prototype.setTransform = function (a, b, c, d, tx, ty) {
                // this.globalMatrix.setTo(a, b, c, d, tx, ty);
                var matrix = this.globalMatrix;
                matrix.a = a;
                matrix.b = b;
                matrix.c = c;
                matrix.d = d;
                matrix.tx = tx;
                matrix.ty = ty;
            };
            WebGLRenderBuffer.prototype.transform = function (a, b, c, d, tx, ty) {
                // this.globalMatrix.append(a, b, c, d, tx, ty);
                var matrix = this.globalMatrix;
                var a1 = matrix.a;
                var b1 = matrix.b;
                var c1 = matrix.c;
                var d1 = matrix.d;
                if (a != 1 || b != 0 || c != 0 || d != 1) {
                    matrix.a = a * a1 + b * c1;
                    matrix.b = a * b1 + b * d1;
                    matrix.c = c * a1 + d * c1;
                    matrix.d = c * b1 + d * d1;
                }
                matrix.tx = tx * a1 + ty * c1 + matrix.tx;
                matrix.ty = tx * b1 + ty * d1 + matrix.ty;
            };
            WebGLRenderBuffer.prototype.translate = function (dx, dy) {
                // this.globalMatrix.translate(dx, dy);
                var matrix = this.globalMatrix;
                matrix.tx += dx;
                matrix.ty += dy;
            };
            WebGLRenderBuffer.prototype.saveTransform = function () {
                // this.savedGlobalMatrix.copyFrom(this.globalMatrix);
                var matrix = this.globalMatrix;
                var sMatrix = this.savedGlobalMatrix;
                sMatrix.a = matrix.a;
                sMatrix.b = matrix.b;
                sMatrix.c = matrix.c;
                sMatrix.d = matrix.d;
                sMatrix.tx = matrix.tx;
                sMatrix.ty = matrix.ty;
            };
            WebGLRenderBuffer.prototype.restoreTransform = function () {
                // this.globalMatrix.copyFrom(this.savedGlobalMatrix);
                var matrix = this.globalMatrix;
                var sMatrix = this.savedGlobalMatrix;
                matrix.a = sMatrix.a;
                matrix.b = sMatrix.b;
                matrix.c = sMatrix.c;
                matrix.d = sMatrix.d;
                matrix.tx = sMatrix.tx;
                matrix.ty = sMatrix.ty;
            };
            /**
             * 创建一个buffer实例
             */
            WebGLRenderBuffer.create = function (width, height) {
                var buffer = renderBufferPool.pop();
                // width = Math.min(width, 1024);
                // height = Math.min(height, 1024);
                if (buffer) {
                    buffer.resize(width, height);
                    var matrix = buffer.globalMatrix;
                    matrix.a = 1;
                    matrix.b = 0;
                    matrix.c = 0;
                    matrix.d = 1;
                    matrix.tx = 0;
                    matrix.ty = 0;
                }
                else {
                    buffer = new WebGLRenderBuffer(width, height);
                    buffer.$computeDrawCall = false;
                }
                return buffer;
            };
            /**
             * 回收一个buffer实例
             */
            WebGLRenderBuffer.release = function (buffer) {
                renderBufferPool.push(buffer);
            };
            WebGLRenderBuffer.autoClear = true;
            return WebGLRenderBuffer;
        }(egret.HashObject));
        web.WebGLRenderBuffer = WebGLRenderBuffer;
        __reflect(WebGLRenderBuffer.prototype, "egret.web.WebGLRenderBuffer", ["egret.sys.RenderBuffer"]);
        var renderBufferPool = []; //渲染缓冲区对象池
    })(web = egret.web || (egret.web = {}));
})(egret || (egret = {}));
//# sourceMappingURL=WebGLRenderBuffer.js.map