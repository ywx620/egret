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
    var web;
    (function (web) {
        /**
         * 创建一个canvas。
         */
        function createCanvas(width, height) {
            var canvas = document.createElement("canvas");
            if (!isNaN(width) && !isNaN(height)) {
                canvas.width = width;
                canvas.height = height;
            }
            return canvas;
        }
        /**
         * @private
         * WebGL上下文对象，提供简单的绘图接口
         * 抽象出此类，以实现共用一个context
         */
        var WebGLRenderContext = (function () {
            function WebGLRenderContext(width, height) {
                this.glID = null;
                this.projectionX = NaN;
                this.projectionY = NaN;
                this.contextLost = false;
                this.$scissorState = false;
                this.vertSize = 5;
                this.surface = createCanvas(width, height);
                this.initWebGL();
                this.$bufferStack = [];
                var gl = this.context;
                this.vertexBuffer = gl.createBuffer();
                this.indexBuffer = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
                this.drawCmdManager = new web.WebGLDrawCmdManager();
                this.vao = new web.WebGLVertexArrayObject();
                this.setGlobalCompositeOperation("source-over");
            }
            WebGLRenderContext.getInstance = function (width, height) {
                if (this.instance) {
                    return this.instance;
                }
                this.instance = new WebGLRenderContext(width, height);
                return this.instance;
            };
            /**
             * 推入一个RenderBuffer并绑定
             */
            WebGLRenderContext.prototype.pushBuffer = function (buffer) {
                this.$bufferStack.push(buffer);
                if (buffer != this.currentBuffer) {
                    if (this.currentBuffer) {
                        // this.$drawWebGL();
                    }
                    this.drawCmdManager.pushActivateBuffer(buffer);
                }
                this.currentBuffer = buffer;
            };
            /**
             * 推出一个RenderBuffer并绑定上一个RenderBuffer
             */
            WebGLRenderContext.prototype.popBuffer = function () {
                // 如果只剩下一个buffer，则不执行pop操作
                // 保证舞台buffer永远在最开始
                if (this.$bufferStack.length <= 1) {
                    return;
                }
                var buffer = this.$bufferStack.pop();
                var lastBuffer = this.$bufferStack[this.$bufferStack.length - 1];
                // 重新绑定
                if (buffer != lastBuffer) {
                    // this.$drawWebGL();
                    this.drawCmdManager.pushActivateBuffer(lastBuffer);
                }
                this.currentBuffer = lastBuffer;
            };
            /**
             * 启用RenderBuffer
             */
            WebGLRenderContext.prototype.activateBuffer = function (buffer) {
                buffer.rootRenderTarget.activate();
                if (!this.bindIndices) {
                    this.uploadIndicesArray(this.vao.getIndices());
                }
                buffer.restoreStencil();
                buffer.restoreScissor();
                this.onResize(buffer.width, buffer.height);
            };
            /**
             * 上传顶点数据
             */
            WebGLRenderContext.prototype.uploadVerticesArray = function (array) {
                var gl = this.context;
                gl.bufferData(gl.ARRAY_BUFFER, array, gl.STREAM_DRAW);
                // gl.bufferSubData(gl.ARRAY_BUFFER, 0, array);
            };
            /**
             * 上传索引数据
             */
            WebGLRenderContext.prototype.uploadIndicesArray = function (array) {
                var gl = this.context;
                gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, array, gl.STATIC_DRAW);
                this.bindIndices = true;
            };
            /**
             * 销毁绘制对象
             */
            WebGLRenderContext.prototype.destroy = function () {
                this.surface.width = this.surface.height = 0;
            };
            WebGLRenderContext.prototype.onResize = function (width, height) {
                width = width || this.surface.width;
                height = height || this.surface.height;
                this.projectionX = width / 2;
                this.projectionY = -height / 2;
                if (this.context) {
                    this.context.viewport(0, 0, width, height);
                }
            };
            /**
             * 改变渲染缓冲的大小并清空缓冲区
             * @param width 改变后的宽
             * @param height 改变后的高
             * @param useMaxSize 若传入true，则将改变后的尺寸与已有尺寸对比，保留较大的尺寸。
             */
            WebGLRenderContext.prototype.resize = function (width, height, useMaxSize) {
                var surface = this.surface;
                if (useMaxSize) {
                    if (surface.width < width) {
                        surface.width = width;
                    }
                    if (surface.height < height) {
                        surface.height = height;
                    }
                }
                else {
                    if (surface.width != width) {
                        surface.width = width;
                    }
                    if (surface.height != height) {
                        surface.height = height;
                    }
                }
                this.onResize();
            };
            WebGLRenderContext.prototype.initWebGL = function () {
                this.onResize();
                this.surface.addEventListener("webglcontextlost", this.handleContextLost.bind(this), false);
                this.surface.addEventListener("webglcontextrestored", this.handleContextRestored.bind(this), false);
                this.getWebGLContext();
                var gl = this.context;
                this.$maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
            };
            WebGLRenderContext.prototype.handleContextLost = function () {
                this.contextLost = true;
            };
            WebGLRenderContext.prototype.handleContextRestored = function () {
                this.initWebGL();
                this.contextLost = false;
            };
            WebGLRenderContext.prototype.getWebGLContext = function () {
                var options = {
                    antialias: WebGLRenderContext.antialias,
                    stencil: true //设置可以使用模板（用于不规则遮罩）
                };
                var gl;
                //todo 是否使用chrome源码names
                //let contextNames = ["moz-webgl", "webkit-3d", "experimental-webgl", "webgl", "3d"];
                var names = ["webgl", "experimental-webgl"];
                for (var i = 0; i < names.length; i++) {
                    try {
                        gl = this.surface.getContext(names[i], options);
                    }
                    catch (e) {
                    }
                    if (gl) {
                        break;
                    }
                }
                if (!gl) {
                    egret.$error(1021);
                }
                this.setContext(gl);
            };
            WebGLRenderContext.prototype.setContext = function (gl) {
                this.context = gl;
                gl.id = WebGLRenderContext.glContextId++;
                this.glID = gl.id;
                gl.disable(gl.DEPTH_TEST);
                gl.disable(gl.CULL_FACE);
                gl.enable(gl.BLEND);
                gl.colorMask(true, true, true, true);
                // 目前只使用0号材质单元，默认开启
                gl.activeTexture(gl.TEXTURE0);
            };
            /**
             * 开启模版检测
             */
            WebGLRenderContext.prototype.enableStencilTest = function () {
                var gl = this.context;
                gl.enable(gl.STENCIL_TEST);
            };
            /**
             * 关闭模版检测
             */
            WebGLRenderContext.prototype.disableStencilTest = function () {
                var gl = this.context;
                gl.disable(gl.STENCIL_TEST);
            };
            /**
             * 开启scissor检测
             */
            WebGLRenderContext.prototype.enableScissorTest = function (rect) {
                var gl = this.context;
                gl.enable(gl.SCISSOR_TEST);
                gl.scissor(rect.x, rect.y, rect.width, rect.height);
            };
            /**
             * 关闭scissor检测
             */
            WebGLRenderContext.prototype.disableScissorTest = function () {
                var gl = this.context;
                gl.disable(gl.SCISSOR_TEST);
            };
            /**
             * 获取像素信息
             */
            WebGLRenderContext.prototype.getPixels = function (x, y, width, height, pixels) {
                var gl = this.context;
                gl.readPixels(x, y, width, height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
            };
            /**
             * 创建一个WebGLTexture
             */
            WebGLRenderContext.prototype.createTexture = function (bitmapData) {
                var gl = this.context;
                var texture = gl.createTexture();
                if (!texture) {
                    //先创建texture失败,然后lost事件才发出来..
                    this.contextLost = true;
                    return;
                }
                texture.glContext = gl;
                gl.bindTexture(gl.TEXTURE_2D, texture);
                gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 1);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, bitmapData);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                return texture;
            };
            WebGLRenderContext.prototype.createTextureFromCompressedData = function (data, width, height, levels, internalFormat) {
                return null;
            };
            /**
             * 更新材质的bitmapData
             */
            WebGLRenderContext.prototype.updateTexture = function (texture, bitmapData) {
                var gl = this.context;
                gl.bindTexture(gl.TEXTURE_2D, texture);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, bitmapData);
            };
            /**
             * 获取一个WebGLTexture
             * 如果有缓存的texture返回缓存的texture，如果没有则创建并缓存texture
             */
            WebGLRenderContext.prototype.getWebGLTexture = function (bitmapData) {
                if (!bitmapData.webGLTexture) {
                    if (bitmapData.format == "image") {
                        bitmapData.webGLTexture = this.createTexture(bitmapData.source);
                    }
                    else if (bitmapData.format == "pvr") {
                        bitmapData.webGLTexture = this.createTextureFromCompressedData(bitmapData.source.pvrtcData, bitmapData.width, bitmapData.height, bitmapData.source.mipmapsCount, bitmapData.source.format);
                    }
                    if (bitmapData.$deleteSource && bitmapData.webGLTexture) {
                        bitmapData.source = null;
                    }
                    //todo 默认值
                    bitmapData.webGLTexture["smoothing"] = true;
                }
                return bitmapData.webGLTexture;
            };
            /**
             * 清除矩形区域
             */
            WebGLRenderContext.prototype.clearRect = function (x, y, width, height) {
                if (x != 0 || y != 0 || width != this.surface.width || height != this.surface.height) {
                    var buffer = this.currentBuffer;
                    if (buffer.$hasScissor) {
                        this.setGlobalCompositeOperation("destination-out");
                        this.drawRect(x, y, width, height);
                        this.setGlobalCompositeOperation("source-over");
                    }
                    else {
                        var m = buffer.globalMatrix;
                        if (m.b == 0 && m.c == 0) {
                            x = x * m.a + m.tx;
                            y = y * m.d + m.ty;
                            width = width * m.a;
                            height = height * m.d;
                            this.enableScissor(x, -y - height + buffer.height, width, height);
                            this.clear();
                            this.disableScissor();
                        }
                        else {
                            this.setGlobalCompositeOperation("destination-out");
                            this.drawRect(x, y, width, height);
                            this.setGlobalCompositeOperation("source-over");
                        }
                    }
                }
                else {
                    this.clear();
                }
            };
            /**
             * 设置混色
             */
            WebGLRenderContext.prototype.setGlobalCompositeOperation = function (value) {
                this.drawCmdManager.pushSetBlend(value);
            };
            /**
             * 绘制图片，image参数可以是BitmapData或者renderTarget
             */
            WebGLRenderContext.prototype.drawImage = function (image, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight, imageSourceWidth, imageSourceHeight, rotated, smoothing) {
                var buffer = this.currentBuffer;
                if (this.contextLost || !image || !buffer) {
                    return;
                }
                var texture;
                if (image["texture"] || (image.source && image.source["texture"])) {
                    // 如果是render target
                    texture = image["texture"] || image.source["texture"];
                    buffer.saveTransform();
                    buffer.transform(1, 0, 0, -1, 0, destHeight + destY * 2); // 翻转
                }
                else if (!image.source && !image.webGLTexture) {
                    return;
                }
                else {
                    texture = this.getWebGLTexture(image);
                }
                if (!texture) {
                    return;
                }
                this.drawTexture(texture, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight, imageSourceWidth, imageSourceHeight, undefined, undefined, undefined, undefined, rotated, smoothing);
                if (image.source && image.source["texture"]) {
                    buffer.restoreTransform();
                }
            };
            /**
             * 绘制Mesh
             */
            WebGLRenderContext.prototype.drawMesh = function (image, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight, imageSourceWidth, imageSourceHeight, meshUVs, meshVertices, meshIndices, bounds, rotated, smoothing) {
                var buffer = this.currentBuffer;
                if (this.contextLost || !image || !buffer) {
                    return;
                }
                var texture;
                if (image["texture"] || (image.source && image.source["texture"])) {
                    // 如果是render target
                    texture = image["texture"] || image.source["texture"];
                    buffer.saveTransform();
                    buffer.transform(1, 0, 0, -1, 0, destHeight + destY * 2); // 翻转
                }
                else if (!image.source && !image.webGLTexture) {
                    return;
                }
                else {
                    texture = this.getWebGLTexture(image);
                }
                if (!texture) {
                    return;
                }
                this.drawTexture(texture, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight, imageSourceWidth, imageSourceHeight, meshUVs, meshVertices, meshIndices, bounds, rotated, smoothing);
                if (image["texture"] || (image.source && image.source["texture"])) {
                    buffer.restoreTransform();
                }
            };
            /**
             * 绘制材质
             */
            WebGLRenderContext.prototype.drawTexture = function (texture, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight, textureWidth, textureHeight, meshUVs, meshVertices, meshIndices, bounds, rotated, smoothing) {
                var buffer = this.currentBuffer;
                if (this.contextLost || !texture || !buffer) {
                    return;
                }
                if (meshVertices && meshIndices) {
                    if (this.vao.reachMaxSize(meshVertices.length / 2, meshIndices.length)) {
                        this.$drawWebGL();
                    }
                }
                else {
                    if (this.vao.reachMaxSize()) {
                        this.$drawWebGL();
                    }
                }
                if (smoothing != undefined && texture["smoothing"] != smoothing) {
                    this.drawCmdManager.pushChangeSmoothing(texture, smoothing);
                }
                if (meshUVs) {
                    this.vao.changeToMeshIndices();
                }
                var transform = buffer.globalMatrix;
                var alpha = buffer.globalAlpha;
                var count = meshIndices ? meshIndices.length / 3 : 2;
                // 应用$filter，因为只可能是colorMatrixFilter，最后两个参数可不传
                this.drawCmdManager.pushDrawTexture(texture, count, this.$filter);
                this.vao.cacheArrays(transform, alpha, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight, textureWidth, textureHeight, meshUVs, meshVertices, meshIndices, rotated);
            };
            /**
             * 绘制矩形（仅用于遮罩擦除等）
             */
            WebGLRenderContext.prototype.drawRect = function (x, y, width, height) {
                var buffer = this.currentBuffer;
                if (this.contextLost || !buffer) {
                    return;
                }
                if (this.vao.reachMaxSize()) {
                    this.$drawWebGL();
                }
                this.drawCmdManager.pushDrawRect();
                this.vao.cacheArrays(buffer.globalMatrix, buffer.globalAlpha, 0, 0, width, height, x, y, width, height, width, height);
            };
            /**
             * 绘制遮罩
             */
            WebGLRenderContext.prototype.pushMask = function (mask) {
                var buffer = this.currentBuffer;
                if (this.contextLost || !buffer) {
                    return;
                }
                buffer.$stencilList.push(mask);
                if (this.vao.reachMaxSize()) {
                    this.$drawWebGL();
                }
                var length = mask.length;
                if (length) {
                    this.drawCmdManager.pushPushMask(length);
                    for (var i = 0; i < length; i++) {
                        var item = mask[i];
                        this.vao.cacheArrays(buffer.globalMatrix, buffer.globalAlpha, 0, 0, item.width, item.height, item.minX, item.minY, item.width, item.height, item.width, item.height);
                    }
                }
                else {
                    this.drawCmdManager.pushPushMask();
                    this.vao.cacheArrays(buffer.globalMatrix, buffer.globalAlpha, 0, 0, mask.width, mask.height, mask.x, mask.y, mask.width, mask.height, mask.width, mask.height);
                }
            };
            /**
             * 恢复遮罩
             */
            WebGLRenderContext.prototype.popMask = function () {
                var buffer = this.currentBuffer;
                if (this.contextLost || !buffer) {
                    return;
                }
                var mask = buffer.$stencilList.pop();
                if (this.vao.reachMaxSize()) {
                    this.$drawWebGL();
                }
                var length = mask.length;
                if (length) {
                    this.drawCmdManager.pushPopMask(length);
                    for (var i = 0; i < length; i++) {
                        var item = mask[i];
                        this.vao.cacheArrays(buffer.globalMatrix, buffer.globalAlpha, 0, 0, item.width, item.height, item.minX, item.minY, item.width, item.height, item.width, item.height);
                    }
                }
                else {
                    this.drawCmdManager.pushPopMask();
                    this.vao.cacheArrays(buffer.globalMatrix, buffer.globalAlpha, 0, 0, mask.width, mask.height, mask.x, mask.y, mask.width, mask.height, mask.width, mask.height);
                }
            };
            /**
             * 清除颜色缓存
             */
            WebGLRenderContext.prototype.clear = function () {
                this.drawCmdManager.pushClearColor();
            };
            /**
             * 开启scissor test
             */
            WebGLRenderContext.prototype.enableScissor = function (x, y, width, height) {
                var buffer = this.currentBuffer;
                this.drawCmdManager.pushEnableScissor(x, y, width, height);
                buffer.$hasScissor = true;
            };
            /**
             * 关闭scissor test
             */
            WebGLRenderContext.prototype.disableScissor = function () {
                var buffer = this.currentBuffer;
                this.drawCmdManager.pushDisableScissor();
                buffer.$hasScissor = false;
            };
            WebGLRenderContext.prototype.$drawWebGL = function () {
                if (this.drawCmdManager.drawDataLen == 0 || this.contextLost) {
                    return;
                }
                this.uploadVerticesArray(this.vao.getVertices());
                // 有mesh，则使用indicesForMesh
                if (this.vao.isMesh()) {
                    this.uploadIndicesArray(this.vao.getMeshIndices());
                }
                var length = this.drawCmdManager.drawDataLen;
                var offset = 0;
                for (var i = 0; i < length; i++) {
                    var data = this.drawCmdManager.drawData[i];
                    offset = this.drawData(data, offset);
                    // 计算draw call
                    if (data.type == 7 /* ACT_BUFFER */) {
                        this.activatedBuffer = data.buffer;
                    }
                    if (data.type == 0 /* TEXTURE */ || data.type == 1 /* RECT */ || data.type == 2 /* PUSH_MASK */ || data.type == 3 /* POP_MASK */) {
                        if (this.activatedBuffer && this.activatedBuffer.$computeDrawCall) {
                            this.activatedBuffer.$drawCalls++;
                        }
                    }
                }
                // 切换回默认indices
                if (this.vao.isMesh()) {
                    this.uploadIndicesArray(this.vao.getIndices());
                }
                // 清空数据
                this.drawCmdManager.clear();
                this.vao.clear();
            };
            /**
             * 执行绘制命令
             */
            WebGLRenderContext.prototype.drawData = function (data, offset) {
                if (!data) {
                    return;
                }
                var gl = this.context;
                var program;
                var filter = data.filter;
                switch (data.type) {
                    case 0 /* TEXTURE */:
                        if (filter) {
                            if (filter.type === "custom") {
                                program = web.EgretWebGLProgram.getProgram(gl, filter.$vertexSrc, filter.$fragmentSrc, filter.$shaderKey);
                            }
                            else if (filter.type === "colorTransform") {
                                program = web.EgretWebGLProgram.getProgram(gl, web.EgretShaderLib.default_vert, web.EgretShaderLib.colorTransform_frag, "colorTransform");
                            }
                            else if (filter.type === "blurX") {
                                program = web.EgretWebGLProgram.getProgram(gl, web.EgretShaderLib.default_vert, web.EgretShaderLib.blur_frag, "blur");
                            }
                            else if (filter.type === "blurY") {
                                program = web.EgretWebGLProgram.getProgram(gl, web.EgretShaderLib.default_vert, web.EgretShaderLib.blur_frag, "blur");
                            }
                            else if (filter.type === "glow") {
                                program = web.EgretWebGLProgram.getProgram(gl, web.EgretShaderLib.default_vert, web.EgretShaderLib.glow_frag, "glow");
                            }
                        }
                        else {
                            program = web.EgretWebGLProgram.getProgram(gl, web.EgretShaderLib.default_vert, web.EgretShaderLib.texture_frag, "texture");
                        }
                        this.activeProgram(gl, program);
                        this.syncUniforms(program, filter, data.textureWidth, data.textureHeight);
                        offset += this.drawTextureElements(data, offset);
                        break;
                    case 1 /* RECT */:
                        program = web.EgretWebGLProgram.getProgram(gl, web.EgretShaderLib.default_vert, web.EgretShaderLib.primitive_frag, "primitive");
                        this.activeProgram(gl, program);
                        this.syncUniforms(program, filter, data.textureWidth, data.textureHeight);
                        offset += this.drawRectElements(data, offset);
                        break;
                    case 2 /* PUSH_MASK */:
                        program = web.EgretWebGLProgram.getProgram(gl, web.EgretShaderLib.default_vert, web.EgretShaderLib.primitive_frag, "primitive");
                        this.activeProgram(gl, program);
                        this.syncUniforms(program, filter, data.textureWidth, data.textureHeight);
                        offset += this.drawPushMaskElements(data, offset);
                        break;
                    case 3 /* POP_MASK */:
                        program = web.EgretWebGLProgram.getProgram(gl, web.EgretShaderLib.default_vert, web.EgretShaderLib.primitive_frag, "primitive");
                        this.activeProgram(gl, program);
                        this.syncUniforms(program, filter, data.textureWidth, data.textureHeight);
                        offset += this.drawPopMaskElements(data, offset);
                        break;
                    case 4 /* BLEND */:
                        this.setBlendMode(data.value);
                        break;
                    case 5 /* RESIZE_TARGET */:
                        data.buffer.rootRenderTarget.resize(data.width, data.height);
                        this.onResize(data.width, data.height);
                        break;
                    case 6 /* CLEAR_COLOR */:
                        if (this.activatedBuffer) {
                            var target = this.activatedBuffer.rootRenderTarget;
                            if (target.width != 0 || target.height != 0) {
                                target.clear(true);
                            }
                        }
                        break;
                    case 7 /* ACT_BUFFER */:
                        this.activateBuffer(data.buffer);
                        break;
                    case 8 /* ENABLE_SCISSOR */:
                        var buffer = this.activatedBuffer;
                        if (buffer) {
                            if (buffer.rootRenderTarget) {
                                buffer.rootRenderTarget.enabledStencil();
                            }
                            buffer.enableScissor(data.x, data.y, data.width, data.height);
                        }
                        break;
                    case 9 /* DISABLE_SCISSOR */:
                        buffer = this.activatedBuffer;
                        if (buffer) {
                            buffer.disableScissor();
                        }
                        break;
                    case 10 /* SMOOTHING */:
                        gl.bindTexture(gl.TEXTURE_2D, data.texture);
                        if (data.smoothing) {
                            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                        }
                        else {
                            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
                            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
                        }
                        break;
                    default:
                        break;
                }
                return offset;
            };
            WebGLRenderContext.prototype.activeProgram = function (gl, program) {
                if (program != this.currentProgram) {
                    gl.useProgram(program.id);
                    // 目前所有attribute buffer的绑定方法都是一致的
                    var attribute = program.attributes;
                    for (var key in attribute) {
                        if (key === "aVertexPosition") {
                            gl.vertexAttribPointer(attribute["aVertexPosition"].location, 2, gl.FLOAT, false, 5 * 4, 0);
                            gl.enableVertexAttribArray(attribute["aVertexPosition"].location);
                        }
                        else if (key === "aTextureCoord") {
                            gl.vertexAttribPointer(attribute["aTextureCoord"].location, 2, gl.FLOAT, false, 5 * 4, 2 * 4);
                            gl.enableVertexAttribArray(attribute["aTextureCoord"].location);
                        }
                        else if (key === "aColor") {
                            gl.vertexAttribPointer(attribute["aColor"].location, 1, gl.FLOAT, false, 5 * 4, 4 * 4);
                            gl.enableVertexAttribArray(attribute["aColor"].location);
                        }
                    }
                    this.currentProgram = program;
                }
            };
            WebGLRenderContext.prototype.syncUniforms = function (program, filter, textureWidth, textureHeight) {
                var uniforms = program.uniforms;
                var isCustomFilter = filter && filter.type === "custom";
                for (var key in uniforms) {
                    if (key === "projectionVector") {
                        uniforms[key].setValue({ x: this.projectionX, y: this.projectionY });
                    }
                    else if (key === "uTextureSize") {
                        uniforms[key].setValue({ x: textureWidth, y: textureHeight });
                    }
                    else if (key === "uSampler") {
                    }
                    else {
                        var value = filter.$uniforms[key];
                        if (value !== undefined) {
                            uniforms[key].setValue(value);
                        }
                        else {
                            // egret.warn("filter custom: uniform " + key + " not defined!");
                        }
                    }
                }
            };
            /**
             * 画texture
             **/
            WebGLRenderContext.prototype.drawTextureElements = function (data, offset) {
                var gl = this.context;
                gl.bindTexture(gl.TEXTURE_2D, data.texture);
                var size = data.count * 3;
                gl.drawElements(gl.TRIANGLES, size, gl.UNSIGNED_SHORT, offset * 2);
                return size;
            };
            /**
             * @private
             * 画rect
             **/
            WebGLRenderContext.prototype.drawRectElements = function (data, offset) {
                var gl = this.context;
                // gl.bindTexture(gl.TEXTURE_2D, null);
                var size = data.count * 3;
                gl.drawElements(gl.TRIANGLES, size, gl.UNSIGNED_SHORT, offset * 2);
                return size;
            };
            /**
             * 画push mask
             **/
            WebGLRenderContext.prototype.drawPushMaskElements = function (data, offset) {
                var gl = this.context;
                var size = data.count * 3;
                var buffer = this.activatedBuffer;
                if (buffer) {
                    if (buffer.rootRenderTarget) {
                        buffer.rootRenderTarget.enabledStencil();
                    }
                    if (buffer.stencilHandleCount == 0) {
                        buffer.enableStencil();
                        gl.clear(gl.STENCIL_BUFFER_BIT); // clear
                    }
                    var level = buffer.stencilHandleCount;
                    buffer.stencilHandleCount++;
                    gl.colorMask(false, false, false, false);
                    gl.stencilFunc(gl.EQUAL, level, 0xFF);
                    gl.stencilOp(gl.KEEP, gl.KEEP, gl.INCR);
                    // gl.bindTexture(gl.TEXTURE_2D, null);
                    gl.drawElements(gl.TRIANGLES, size, gl.UNSIGNED_SHORT, offset * 2);
                    gl.stencilFunc(gl.EQUAL, level + 1, 0xFF);
                    gl.colorMask(true, true, true, true);
                    gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);
                }
                return size;
            };
            /**
             * 画pop mask
             **/
            WebGLRenderContext.prototype.drawPopMaskElements = function (data, offset) {
                var gl = this.context;
                var size = data.count * 3;
                var buffer = this.activatedBuffer;
                if (buffer) {
                    buffer.stencilHandleCount--;
                    if (buffer.stencilHandleCount == 0) {
                        buffer.disableStencil(); // skip this draw
                    }
                    else {
                        var level = buffer.stencilHandleCount;
                        gl.colorMask(false, false, false, false);
                        gl.stencilFunc(gl.EQUAL, level + 1, 0xFF);
                        gl.stencilOp(gl.KEEP, gl.KEEP, gl.DECR);
                        // gl.bindTexture(gl.TEXTURE_2D, null);
                        gl.drawElements(gl.TRIANGLES, size, gl.UNSIGNED_SHORT, offset * 2);
                        gl.stencilFunc(gl.EQUAL, level, 0xFF);
                        gl.colorMask(true, true, true, true);
                        gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);
                    }
                }
                return size;
            };
            /**
             * 设置混色
             */
            WebGLRenderContext.prototype.setBlendMode = function (value) {
                var gl = this.context;
                var blendModeWebGL = WebGLRenderContext.blendModesForGL[value];
                if (blendModeWebGL) {
                    gl.blendFunc(blendModeWebGL[0], blendModeWebGL[1]);
                }
            };
            /**
             * 应用滤镜绘制给定的render target
             * 此方法不会导致input被释放，所以如果需要释放input，需要调用此方法后手动调用release
             */
            WebGLRenderContext.prototype.drawTargetWidthFilters = function (filters, input) {
                var originInput = input, filtersLen = filters.length, output;
                // 应用前面的滤镜
                if (filtersLen > 1) {
                    for (var i = 0; i < filtersLen - 1; i++) {
                        var filter_1 = filters[i];
                        var width = input.rootRenderTarget.width;
                        var height = input.rootRenderTarget.height;
                        output = web.WebGLRenderBuffer.create(width, height);
                        output.setTransform(1, 0, 0, 1, 0, 0);
                        output.globalAlpha = 1;
                        this.drawToRenderTarget(filter_1, input, output);
                        if (input != originInput) {
                            web.WebGLRenderBuffer.release(input);
                        }
                        input = output;
                    }
                }
                // 应用最后一个滤镜并绘制到当前场景中
                var filter = filters[filtersLen - 1];
                this.drawToRenderTarget(filter, input, this.currentBuffer);
                // 释放掉用于交换的buffer
                if (input != originInput) {
                    web.WebGLRenderBuffer.release(input);
                }
            };
            /**
             * 向一个renderTarget中绘制
             * */
            WebGLRenderContext.prototype.drawToRenderTarget = function (filter, input, output) {
                if (this.contextLost) {
                    return;
                }
                if (this.vao.reachMaxSize()) {
                    this.$drawWebGL();
                }
                this.pushBuffer(output);
                var originInput = input, temp, width = input.rootRenderTarget.width, height = input.rootRenderTarget.height;
                // 模糊滤镜分别处理blurX与blurY
                if (filter.type == "blur") {
                    var blurXFilter = filter.blurXFilter;
                    var blurYFilter = filter.blurYFilter;
                    if (blurXFilter.blurX != 0 && blurYFilter.blurY != 0) {
                        temp = web.WebGLRenderBuffer.create(width, height);
                        temp.setTransform(1, 0, 0, 1, 0, 0);
                        temp.globalAlpha = 1;
                        this.drawToRenderTarget(filter.blurXFilter, input, temp);
                        if (input != originInput) {
                            web.WebGLRenderBuffer.release(input);
                        }
                        input = temp;
                        filter = blurYFilter;
                    }
                    else {
                        filter = blurXFilter.blurX === 0 ? blurYFilter : blurXFilter;
                    }
                }
                // 绘制input结果到舞台
                output.saveTransform();
                output.transform(1, 0, 0, -1, 0, height);
                this.vao.cacheArrays(output.globalMatrix, output.globalAlpha, 0, 0, width, height, 0, 0, width, height, width, height);
                output.restoreTransform();
                this.drawCmdManager.pushDrawTexture(input.rootRenderTarget.texture, 2, filter, width, height);
                // 释放掉input
                if (input != originInput) {
                    web.WebGLRenderBuffer.release(input);
                }
                this.popBuffer();
            };
            WebGLRenderContext.initBlendMode = function () {
                WebGLRenderContext.blendModesForGL = {};
                WebGLRenderContext.blendModesForGL["source-over"] = [1, 771];
                WebGLRenderContext.blendModesForGL["lighter"] = [1, 1];
                WebGLRenderContext.blendModesForGL["lighter-in"] = [770, 771];
                WebGLRenderContext.blendModesForGL["destination-out"] = [0, 771];
                WebGLRenderContext.blendModesForGL["destination-in"] = [0, 770];
            };
            /**
             * 改变渲染缓冲为指定大小，但保留原始图像数据
             * @param width 改变后的宽
             * @param height 改变后的高
             * @param offsetX 原始图像数据在改变后缓冲区的绘制起始位置x
             * @param offsetY 原始图像数据在改变后缓冲区的绘制起始位置y
             */
            // public resizeTo(width:number, height:number, offsetX:number, offsetY:number):void {
            //     this.surface.width = width;
            //     this.surface.height = height;
            // }
            WebGLRenderContext.glContextId = 0;
            WebGLRenderContext.blendModesForGL = null;
            return WebGLRenderContext;
        }());
        web.WebGLRenderContext = WebGLRenderContext;
        __reflect(WebGLRenderContext.prototype, "egret.web.WebGLRenderContext");
        WebGLRenderContext.initBlendMode();
    })(web = egret.web || (egret.web = {}));
})(egret || (egret = {}));
//# sourceMappingURL=WebGLRenderContext.js.map