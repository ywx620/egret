var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
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
    var web;
    (function (web) {
        /**
         * @private
         * 绘制指令管理器
         * 用来维护drawData数组
         */
        var WebGLDrawCmdManager = (function () {
            function WebGLDrawCmdManager() {
                /**
                 * 用于缓存绘制命令的数组
                 */
                this.drawData = [];
                this.drawDataLen = 0;
            }
            /**
             * 压入绘制矩形指令
             */
            WebGLDrawCmdManager.prototype.pushDrawRect = function () {
                if (this.drawDataLen == 0 || this.drawData[this.drawDataLen - 1].type != 1 /* RECT */) {
                    var data = this.drawData[this.drawDataLen] || {};
                    data.type = 1 /* RECT */;
                    data.count = 0;
                    this.drawData[this.drawDataLen] = data;
                    this.drawDataLen++;
                }
                this.drawData[this.drawDataLen - 1].count += 2;
            };
            /**
             * 压入绘制texture指令
             */
            WebGLDrawCmdManager.prototype.pushDrawTexture = function (texture, count, filter, textureWidth, textureHeight) {
                if (count === void 0) { count = 2; }
                if (filter) {
                    // 目前有滤镜的情况下不会合并绘制
                    var data = this.drawData[this.drawDataLen] || {};
                    data.type = 0 /* TEXTURE */;
                    data.texture = texture;
                    data.filter = filter;
                    data.count = count;
                    data.textureWidth = textureWidth;
                    data.textureHeight = textureHeight;
                    this.drawData[this.drawDataLen] = data;
                    this.drawDataLen++;
                }
                else {
                    if (this.drawDataLen == 0 || this.drawData[this.drawDataLen - 1].type != 0 /* TEXTURE */ || texture != this.drawData[this.drawDataLen - 1].texture || this.drawData[this.drawDataLen - 1].filter) {
                        var data = this.drawData[this.drawDataLen] || {};
                        data.type = 0 /* TEXTURE */;
                        data.texture = texture;
                        data.count = 0;
                        this.drawData[this.drawDataLen] = data;
                        this.drawDataLen++;
                    }
                    this.drawData[this.drawDataLen - 1].count += count;
                }
            };
            WebGLDrawCmdManager.prototype.pushChangeSmoothing = function (texture, smoothing) {
                texture["smoothing"] = smoothing;
                var data = this.drawData[this.drawDataLen] || {};
                data.type = 10 /* SMOOTHING */;
                data.texture = texture;
                data.smoothing = smoothing;
                this.drawData[this.drawDataLen] = data;
                this.drawDataLen++;
            };
            /**
             * 压入pushMask指令
             */
            WebGLDrawCmdManager.prototype.pushPushMask = function (count) {
                if (count === void 0) { count = 1; }
                var data = this.drawData[this.drawDataLen] || {};
                data.type = 2 /* PUSH_MASK */;
                data.count = count * 2;
                this.drawData[this.drawDataLen] = data;
                this.drawDataLen++;
            };
            /**
             * 压入popMask指令
             */
            WebGLDrawCmdManager.prototype.pushPopMask = function (count) {
                if (count === void 0) { count = 1; }
                var data = this.drawData[this.drawDataLen] || {};
                data.type = 3 /* POP_MASK */;
                data.count = count * 2;
                this.drawData[this.drawDataLen] = data;
                this.drawDataLen++;
            };
            /**
             * 压入混色指令
             */
            WebGLDrawCmdManager.prototype.pushSetBlend = function (value) {
                var len = this.drawDataLen;
                // 有无遍历到有效绘图操作
                var drawState = false;
                for (var i = len - 1; i >= 0; i--) {
                    var data = this.drawData[i];
                    if (data) {
                        if (data.type == 0 /* TEXTURE */ || data.type == 1 /* RECT */) {
                            drawState = true;
                        }
                        // 如果与上一次blend操作之间无有效绘图，上一次操作无效
                        if (!drawState && data.type == 4 /* BLEND */) {
                            this.drawData.splice(i, 1);
                            this.drawDataLen--;
                            continue;
                        }
                        // 如果与上一次blend操作重复，本次操作无效
                        if (data.type == 4 /* BLEND */) {
                            if (data.value == value) {
                                return;
                            }
                            else {
                                break;
                            }
                        }
                    }
                }
                var _data = this.drawData[this.drawDataLen] || {};
                _data.type = 4 /* BLEND */;
                _data.value = value;
                this.drawData[this.drawDataLen] = _data;
                this.drawDataLen++;
            };
            /*
             * 压入resize render target命令
             */
            WebGLDrawCmdManager.prototype.pushResize = function (buffer, width, height) {
                var data = this.drawData[this.drawDataLen] || {};
                data.type = 5 /* RESIZE_TARGET */;
                data.buffer = buffer;
                data.width = width;
                data.height = height;
                this.drawData[this.drawDataLen] = data;
                this.drawDataLen++;
            };
            /*
             * 压入clear color命令
             */
            WebGLDrawCmdManager.prototype.pushClearColor = function () {
                var data = this.drawData[this.drawDataLen] || {};
                data.type = 6 /* CLEAR_COLOR */;
                this.drawData[this.drawDataLen] = data;
                this.drawDataLen++;
            };
            /**
             * 压入激活buffer命令
             */
            WebGLDrawCmdManager.prototype.pushActivateBuffer = function (buffer) {
                var len = this.drawDataLen;
                // 有无遍历到有效绘图操作
                var drawState = false;
                for (var i = len - 1; i >= 0; i--) {
                    var data = this.drawData[i];
                    if (data) {
                        if (data.type != 4 /* BLEND */ && data.type != 7 /* ACT_BUFFER */) {
                            drawState = true;
                        }
                        // 如果与上一次buffer操作之间无有效绘图，上一次操作无效
                        if (!drawState && data.type == 7 /* ACT_BUFFER */) {
                            this.drawData.splice(i, 1);
                            this.drawDataLen--;
                            continue;
                        }
                        // 如果与上一次buffer操作重复，本次操作无效
                        // if(data.type == DRAWABLE_TYPE.ACT_BUFFER) {
                        //     if(data.buffer == buffer) {
                        //         return;
                        //     } else {
                        //         break;
                        //     }
                        // }
                    }
                }
                var _data = this.drawData[this.drawDataLen] || {};
                _data.type = 7 /* ACT_BUFFER */;
                _data.buffer = buffer;
                _data.width = buffer.rootRenderTarget.width;
                _data.height = buffer.rootRenderTarget.height;
                this.drawData[this.drawDataLen] = _data;
                this.drawDataLen++;
            };
            /*
             * 压入enabel scissor命令
             */
            WebGLDrawCmdManager.prototype.pushEnableScissor = function (x, y, width, height) {
                var data = this.drawData[this.drawDataLen] || {};
                data.type = 8 /* ENABLE_SCISSOR */;
                data.x = x;
                data.y = y;
                data.width = width;
                data.height = height;
                this.drawData[this.drawDataLen] = data;
                this.drawDataLen++;
            };
            /*
             * 压入disable scissor命令
             */
            WebGLDrawCmdManager.prototype.pushDisableScissor = function () {
                var data = this.drawData[this.drawDataLen] || {};
                data.type = 9 /* DISABLE_SCISSOR */;
                this.drawData[this.drawDataLen] = data;
                this.drawDataLen++;
            };
            /**
             * 清空命令数组
             */
            WebGLDrawCmdManager.prototype.clear = function () {
                for (var i = 0; i < this.drawDataLen; i++) {
                    var data = this.drawData[i];
                    data.type = 0;
                    data.count = 0;
                    data.texture = null;
                    data.filter = null;
                    data.uv = null;
                    data.value = "";
                    data.buffer = null;
                    data.width = 0;
                    data.height = 0;
                }
                this.drawDataLen = 0;
            };
            return WebGLDrawCmdManager;
        }());
        web.WebGLDrawCmdManager = WebGLDrawCmdManager;
        __reflect(WebGLDrawCmdManager.prototype, "egret.web.WebGLDrawCmdManager");
    })(web = egret.web || (egret.web = {}));
})(egret || (egret = {}));
//# sourceMappingURL=WebGLDrawCmdManager.js.map