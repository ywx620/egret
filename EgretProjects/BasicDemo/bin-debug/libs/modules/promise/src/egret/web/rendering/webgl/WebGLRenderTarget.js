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
         * WebGLRenderTarget类
         * 一个WebGL渲染目标，拥有一个frame buffer和texture
         */
        var WebGLRenderTarget = (function (_super) {
            __extends(WebGLRenderTarget, _super);
            function WebGLRenderTarget(gl, width, height) {
                var _this = _super.call(this) || this;
                // 清除色
                _this.clearColor = [0, 0, 0, 0];
                // 是否启用frame buffer, 默认为true
                _this.useFrameBuffer = true;
                _this.gl = gl;
                // 如果尺寸为 0 chrome会报警
                _this.width = width || 1;
                _this.height = height || 1;
                return _this;
            }
            /**
             * 重置render target的尺寸
             */
            WebGLRenderTarget.prototype.resize = function (width, height) {
                var gl = this.gl;
                this.width = width;
                this.height = height;
                if (this.frameBuffer) {
                    // 设置texture尺寸
                    gl.bindTexture(gl.TEXTURE_2D, this.texture);
                    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
                    // gl.bindTexture(gl.TEXTURE_2D, null);
                }
                if (this.stencilBuffer) {
                    gl.deleteRenderbuffer(this.stencilBuffer);
                    this.stencilBuffer = null;
                }
            };
            /**
             * 激活此render target
             */
            WebGLRenderTarget.prototype.activate = function () {
                var gl = this.gl;
                gl.bindFramebuffer(gl.FRAMEBUFFER, this.getFrameBuffer());
            };
            /**
             * 获取frame buffer
             */
            WebGLRenderTarget.prototype.getFrameBuffer = function () {
                if (!this.useFrameBuffer) {
                    return null;
                }
                return this.frameBuffer;
            };
            WebGLRenderTarget.prototype.initFrameBuffer = function () {
                if (!this.frameBuffer) {
                    var gl = this.gl;
                    // 创建材质
                    this.texture = this.createTexture();
                    // 创建frame buffer
                    this.frameBuffer = gl.createFramebuffer();
                    gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);
                    // 绑定材质
                    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture, 0);
                }
            };
            /**
             * 创建材质
             * TODO 创建材质的方法可以合并
             */
            WebGLRenderTarget.prototype.createTexture = function () {
                var gl = this.gl;
                var texture = gl.createTexture();
                gl.bindTexture(gl.TEXTURE_2D, texture);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.width, this.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                return texture;
            };
            /**
             * 清除render target颜色缓存
             */
            WebGLRenderTarget.prototype.clear = function (bind) {
                var gl = this.gl;
                if (bind) {
                    this.activate();
                }
                gl.colorMask(true, true, true, true);
                gl.clearColor(this.clearColor[0], this.clearColor[1], this.clearColor[2], this.clearColor[3]);
                gl.clear(gl.COLOR_BUFFER_BIT);
            };
            WebGLRenderTarget.prototype.enabledStencil = function () {
                if (!this.frameBuffer || this.stencilBuffer) {
                    return;
                }
                var gl = this.gl;
                // 设置render buffer的尺寸
                gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer); // 是否需要强制绑定？
                // 绑定stencil buffer
                this.stencilBuffer = gl.createRenderbuffer();
                gl.bindRenderbuffer(gl.RENDERBUFFER, this.stencilBuffer);
                gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_STENCIL, this.width, this.height);
                gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_STENCIL_ATTACHMENT, gl.RENDERBUFFER, this.stencilBuffer);
                // 此处不解绑是否会造成bug？
                // gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            };
            return WebGLRenderTarget;
        }(egret.HashObject));
        web.WebGLRenderTarget = WebGLRenderTarget;
        __reflect(WebGLRenderTarget.prototype, "egret.web.WebGLRenderTarget");
    })(web = egret.web || (egret.web = {}));
})(egret || (egret = {}));
//# sourceMappingURL=WebGLRenderTarget.js.map