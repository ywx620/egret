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
         * @private
         * 判断当前runtime版本是否支持cmdBatch
         */
        native.$supportCmdBatch = egret_native.sendToC ? true : false;
        /*
         * @private
         * 命令控制器
         * */
        var CmdManager = (function () {
            function CmdManager() {
                /*
                 * 存储绘制命令的 array buffer
                 **/
                this.maxArrayBufferLen = 80000;
                this.arrayBuffer = new ArrayBuffer(this.maxArrayBufferLen * 4);
                this.uint32View = new Uint32Array(this.arrayBuffer);
                this.float32View = new Float32Array(this.arrayBuffer);
                this.arrayBufferLen = 0;
                /*
                 * 存储字符串的数组
                 */
                this.strArray = [];
                //------绘制命令 end-------------
            }
            /*
             * 上传绘制命令到C
             */
            CmdManager.prototype.flush = function () {
                egret_native.sendToC(this.float32View, this.arrayBufferLen, this.strArray);
                this.clear();
            };
            /*
             * 切换native上下文
             * native绘制需要在自身的上下文进行绘制
             */
            CmdManager.prototype.setContext = function (ctx) {
                if (this.context != ctx) {
                    if (this.arrayBufferLen + 3 > this.maxArrayBufferLen) {
                        this.flush();
                    }
                    this.context = ctx;
                    var uint32View = this.uint32View;
                    var arrayBufferLen = this.arrayBufferLen;
                    uint32View[arrayBufferLen++] = 1000;
                    // uint32View[arrayBufferLen++] = ctx.___native_texture__p;
                    // 兼容64位
                    var addr = ctx.___native_texture__p;
                    uint32View[arrayBufferLen++] = (addr / 4294967296) >>> 0;
                    uint32View[arrayBufferLen++] = (addr & 4294967295) >>> 0;
                    // uint32View[arrayBufferLen++] = addr >> 32;
                    // uint32View[arrayBufferLen++] = addr & 4294967295;
                    this.arrayBufferLen = arrayBufferLen;
                }
            };
            /*
             * 清空绘制命令
             */
            CmdManager.prototype.clear = function () {
                this.arrayBufferLen = 0;
                this.strArray.length = 0;
            };
            /*
             * 压入一个字符串并返回索引
             */
            CmdManager.prototype.pushString = function (str) {
                var array = this.strArray;
                var len = array.length;
                array[len] = str;
                return len;
            };
            //------绘制命令 start-------------
            CmdManager.prototype.clearScreen = function (i1, i2, i3, i4) {
                if (this.arrayBufferLen + 5 > this.maxArrayBufferLen) {
                    this.flush();
                }
                var uint32View = this.uint32View;
                var arrayBufferLen = this.arrayBufferLen;
                uint32View[arrayBufferLen++] = 100;
                uint32View[arrayBufferLen++] = i1;
                uint32View[arrayBufferLen++] = i2;
                uint32View[arrayBufferLen++] = i3;
                uint32View[arrayBufferLen++] = i4;
                this.arrayBufferLen = arrayBufferLen;
            };
            CmdManager.prototype.drawImage = function (i1, f1, f2, f3, f4, f5, f6, f7, f8) {
                if (this.arrayBufferLen + 11 > this.maxArrayBufferLen) {
                    this.flush();
                }
                var uint32View = this.uint32View;
                var float32View = this.float32View;
                var arrayBufferLen = this.arrayBufferLen;
                uint32View[arrayBufferLen++] = 101;
                // uint32View[arrayBufferLen++] = i1;
                // 兼容64位
                // uint32View[arrayBufferLen++] = i1 >> 32;
                // uint32View[arrayBufferLen++] = i1 & 4294967295;
                uint32View[arrayBufferLen++] = (i1 / 4294967296) >>> 0;
                uint32View[arrayBufferLen++] = (i1 & 4294967295) >>> 0;
                float32View[arrayBufferLen++] = f1;
                float32View[arrayBufferLen++] = f2;
                float32View[arrayBufferLen++] = f3;
                float32View[arrayBufferLen++] = f4;
                float32View[arrayBufferLen++] = f5;
                float32View[arrayBufferLen++] = f6;
                float32View[arrayBufferLen++] = f7;
                float32View[arrayBufferLen++] = f8;
                this.arrayBufferLen = arrayBufferLen;
            };
            CmdManager.prototype.setTransform = function (f1, f2, f3, f4, f5, f6) {
                if (this.arrayBufferLen + 7 > this.maxArrayBufferLen) {
                    this.flush();
                }
                var uint32View = this.uint32View;
                var float32View = this.float32View;
                var arrayBufferLen = this.arrayBufferLen;
                uint32View[arrayBufferLen++] = 103;
                float32View[arrayBufferLen++] = f1;
                float32View[arrayBufferLen++] = f2;
                float32View[arrayBufferLen++] = f3;
                float32View[arrayBufferLen++] = f4;
                float32View[arrayBufferLen++] = f5;
                float32View[arrayBufferLen++] = f6;
                this.arrayBufferLen = arrayBufferLen;
            };
            CmdManager.prototype.setGlobalAlpha = function (f1) {
                if (this.arrayBufferLen + 2 > this.maxArrayBufferLen) {
                    this.flush();
                }
                var uint32View = this.uint32View;
                var float32View = this.float32View;
                var arrayBufferLen = this.arrayBufferLen;
                uint32View[arrayBufferLen++] = 106;
                float32View[arrayBufferLen++] = f1;
                this.arrayBufferLen = arrayBufferLen;
            };
            CmdManager.prototype.pushRectStencils = function (array) {
                var len = array.length;
                if (this.arrayBufferLen + len + 1 > this.maxArrayBufferLen) {
                    this.flush();
                }
                var uint32View = this.uint32View;
                var float32View = this.float32View;
                var arrayBufferLen = this.arrayBufferLen;
                uint32View[arrayBufferLen++] = 113;
                uint32View[arrayBufferLen++] = len;
                for (var i = 0; i < len; i++) {
                    float32View[arrayBufferLen++] = array[i];
                }
                this.arrayBufferLen = arrayBufferLen;
            };
            CmdManager.prototype.restore = function () {
                if (this.arrayBufferLen + 1 > this.maxArrayBufferLen) {
                    this.flush();
                }
                this.uint32View[this.arrayBufferLen++] = 116;
            };
            CmdManager.prototype.save = function () {
                if (this.arrayBufferLen + 1 > this.maxArrayBufferLen) {
                    this.flush();
                }
                this.uint32View[this.arrayBufferLen++] = 117;
            };
            CmdManager.prototype.setBlendArg = function (f1, f2) {
                if (this.arrayBufferLen + 3 > this.maxArrayBufferLen) {
                    this.flush();
                }
                var uint32View = this.uint32View;
                var float32View = this.float32View;
                var arrayBufferLen = this.arrayBufferLen;
                uint32View[arrayBufferLen++] = 120;
                float32View[arrayBufferLen++] = f1;
                float32View[arrayBufferLen++] = f2;
                this.arrayBufferLen = arrayBufferLen;
            };
            CmdManager.prototype.beginPath = function () {
                if (this.arrayBufferLen + 1 > this.maxArrayBufferLen) {
                    this.flush();
                }
                this.uint32View[this.arrayBufferLen++] = 204;
            };
            CmdManager.prototype.closePath = function () {
                if (this.arrayBufferLen + 1 > this.maxArrayBufferLen) {
                    this.flush();
                }
                this.uint32View[this.arrayBufferLen++] = 205;
            };
            CmdManager.prototype.rect = function (f1, f2, f3, f4) {
                if (this.arrayBufferLen + 5 > this.maxArrayBufferLen) {
                    this.flush();
                }
                var uint32View = this.uint32View;
                var float32View = this.float32View;
                var arrayBufferLen = this.arrayBufferLen;
                uint32View[arrayBufferLen++] = 210;
                float32View[arrayBufferLen++] = f1;
                float32View[arrayBufferLen++] = f2;
                float32View[arrayBufferLen++] = f3;
                float32View[arrayBufferLen++] = f4;
                this.arrayBufferLen = arrayBufferLen;
            };
            CmdManager.prototype.clearRect = function (f1, f2, f3, f4) {
                if (this.arrayBufferLen + 5 > this.maxArrayBufferLen) {
                    this.flush();
                }
                var uint32View = this.uint32View;
                var float32View = this.float32View;
                var arrayBufferLen = this.arrayBufferLen;
                uint32View[arrayBufferLen++] = 214;
                float32View[arrayBufferLen++] = f1;
                float32View[arrayBufferLen++] = f2;
                float32View[arrayBufferLen++] = f3;
                float32View[arrayBufferLen++] = f4;
                this.arrayBufferLen = arrayBufferLen;
            };
            CmdManager.prototype.createLabel = function (i1, f1, i2, f2) {
                if (this.arrayBufferLen + 5 > this.maxArrayBufferLen) {
                    this.flush();
                }
                var uint32View = this.uint32View;
                var float32View = this.float32View;
                var arrayBufferLen = this.arrayBufferLen;
                uint32View[arrayBufferLen++] = 300;
                uint32View[arrayBufferLen++] = i1;
                float32View[arrayBufferLen++] = f1;
                uint32View[arrayBufferLen++] = i2;
                float32View[arrayBufferLen++] = f2;
                this.arrayBufferLen = arrayBufferLen;
            };
            CmdManager.prototype.drawText = function (i1, f1, f2) {
                if (this.arrayBufferLen + 4 > this.maxArrayBufferLen) {
                    this.flush();
                }
                var uint32View = this.uint32View;
                var float32View = this.float32View;
                var arrayBufferLen = this.arrayBufferLen;
                uint32View[arrayBufferLen++] = 301;
                uint32View[arrayBufferLen++] = i1;
                float32View[arrayBufferLen++] = f1;
                float32View[arrayBufferLen++] = f2;
                this.arrayBufferLen = arrayBufferLen;
            };
            CmdManager.prototype.setTextColor = function (i1) {
                if (this.arrayBufferLen + 2 > this.maxArrayBufferLen) {
                    this.flush();
                }
                var uint32View = this.uint32View;
                var arrayBufferLen = this.arrayBufferLen;
                uint32View[arrayBufferLen++] = 302;
                uint32View[arrayBufferLen++] = i1;
                this.arrayBufferLen = arrayBufferLen;
            };
            CmdManager.prototype.setStrokeColor = function (i1) {
                if (this.arrayBufferLen + 2 > this.maxArrayBufferLen) {
                    this.flush();
                }
                var uint32View = this.uint32View;
                var arrayBufferLen = this.arrayBufferLen;
                uint32View[arrayBufferLen++] = 303;
                uint32View[arrayBufferLen++] = i1;
                this.arrayBufferLen = arrayBufferLen;
            };
            CmdManager.prototype.setFillStyle = function (i1) {
                if (this.arrayBufferLen + 2 > this.maxArrayBufferLen) {
                    this.flush();
                }
                var uint32View = this.uint32View;
                var arrayBufferLen = this.arrayBufferLen;
                uint32View[arrayBufferLen++] = 1200;
                uint32View[arrayBufferLen++] = i1;
                this.arrayBufferLen = arrayBufferLen;
            };
            CmdManager.prototype.setStrokeStyle = function (i1) {
                if (this.arrayBufferLen + 2 > this.maxArrayBufferLen) {
                    this.flush();
                }
                var uint32View = this.uint32View;
                var arrayBufferLen = this.arrayBufferLen;
                uint32View[arrayBufferLen++] = 1201;
                uint32View[arrayBufferLen++] = i1;
                this.arrayBufferLen = arrayBufferLen;
            };
            CmdManager.prototype.setLineWidth = function (f1) {
                if (this.arrayBufferLen + 2 > this.maxArrayBufferLen) {
                    this.flush();
                }
                var uint32View = this.uint32View;
                var float32View = this.float32View;
                var arrayBufferLen = this.arrayBufferLen;
                uint32View[arrayBufferLen++] = 1202;
                float32View[arrayBufferLen++] = f1;
                this.arrayBufferLen = arrayBufferLen;
            };
            CmdManager.prototype.moveTo = function (f1, f2) {
                if (this.arrayBufferLen + 3 > this.maxArrayBufferLen) {
                    this.flush();
                }
                var uint32View = this.uint32View;
                var float32View = this.float32View;
                var arrayBufferLen = this.arrayBufferLen;
                uint32View[arrayBufferLen++] = 207;
                float32View[arrayBufferLen++] = f1;
                float32View[arrayBufferLen++] = f2;
                this.arrayBufferLen = arrayBufferLen;
            };
            CmdManager.prototype.lineTo = function (f1, f2) {
                if (this.arrayBufferLen + 3 > this.maxArrayBufferLen) {
                    this.flush();
                }
                var uint32View = this.uint32View;
                var float32View = this.float32View;
                var arrayBufferLen = this.arrayBufferLen;
                uint32View[arrayBufferLen++] = 208;
                float32View[arrayBufferLen++] = f1;
                float32View[arrayBufferLen++] = f2;
                this.arrayBufferLen = arrayBufferLen;
            };
            CmdManager.prototype.fill = function (i1) {
                if (this.arrayBufferLen + 2 > this.maxArrayBufferLen) {
                    this.flush();
                }
                var uint32View = this.uint32View;
                var arrayBufferLen = this.arrayBufferLen;
                uint32View[arrayBufferLen++] = 203;
                uint32View[arrayBufferLen++] = i1;
                this.arrayBufferLen = arrayBufferLen;
            };
            CmdManager.prototype.pushClip = function (f1, f2, f3, f4) {
                if (this.arrayBufferLen + 5 > this.maxArrayBufferLen) {
                    this.flush();
                }
                var uint32View = this.uint32View;
                var float32View = this.float32View;
                var arrayBufferLen = this.arrayBufferLen;
                uint32View[arrayBufferLen++] = 107;
                float32View[arrayBufferLen++] = f1;
                float32View[arrayBufferLen++] = f2;
                float32View[arrayBufferLen++] = f3;
                float32View[arrayBufferLen++] = f4;
                this.arrayBufferLen = arrayBufferLen;
            };
            CmdManager.prototype.popClip = function () {
                if (this.arrayBufferLen + 1 > this.maxArrayBufferLen) {
                    this.flush();
                }
                this.uint32View[this.arrayBufferLen++] = 108;
            };
            CmdManager.prototype.stroke = function () {
                if (this.arrayBufferLen + 1 > this.maxArrayBufferLen) {
                    this.flush();
                }
                this.uint32View[this.arrayBufferLen++] = 206;
            };
            CmdManager.prototype.arc = function (f1, f2, f3, f4, f5, i6) {
                if (this.arrayBufferLen + 7 > this.maxArrayBufferLen) {
                    this.flush();
                }
                var uint32View = this.uint32View;
                var float32View = this.float32View;
                var arrayBufferLen = this.arrayBufferLen;
                uint32View[arrayBufferLen++] = 209;
                float32View[arrayBufferLen++] = f1;
                float32View[arrayBufferLen++] = f2;
                float32View[arrayBufferLen++] = f3;
                float32View[arrayBufferLen++] = f4;
                float32View[arrayBufferLen++] = f5;
                uint32View[arrayBufferLen++] = i6;
                this.arrayBufferLen = arrayBufferLen;
            };
            CmdManager.prototype.quadraticCurveTo = function (f1, f2, f3, f4) {
                if (this.arrayBufferLen + 5 > this.maxArrayBufferLen) {
                    this.flush();
                }
                var uint32View = this.uint32View;
                var float32View = this.float32View;
                var arrayBufferLen = this.arrayBufferLen;
                uint32View[arrayBufferLen++] = 211;
                float32View[arrayBufferLen++] = f1;
                float32View[arrayBufferLen++] = f2;
                float32View[arrayBufferLen++] = f3;
                float32View[arrayBufferLen++] = f4;
                this.arrayBufferLen = arrayBufferLen;
            };
            CmdManager.prototype.fillRect = function (f1, f2, f3, f4) {
                if (this.arrayBufferLen + 5 > this.maxArrayBufferLen) {
                    this.flush();
                }
                var uint32View = this.uint32View;
                var float32View = this.float32View;
                var arrayBufferLen = this.arrayBufferLen;
                uint32View[arrayBufferLen++] = 212;
                float32View[arrayBufferLen++] = f1;
                float32View[arrayBufferLen++] = f2;
                float32View[arrayBufferLen++] = f3;
                float32View[arrayBufferLen++] = f4;
                this.arrayBufferLen = arrayBufferLen;
            };
            CmdManager.prototype.strokeRect = function (f1, f2, f3, f4) {
                if (this.arrayBufferLen + 5 > this.maxArrayBufferLen) {
                    this.flush();
                }
                var uint32View = this.uint32View;
                var float32View = this.float32View;
                var arrayBufferLen = this.arrayBufferLen;
                uint32View[arrayBufferLen++] = 213;
                float32View[arrayBufferLen++] = f1;
                float32View[arrayBufferLen++] = f2;
                float32View[arrayBufferLen++] = f3;
                float32View[arrayBufferLen++] = f4;
                this.arrayBufferLen = arrayBufferLen;
            };
            CmdManager.prototype.bezierCurveTo = function (f1, f2, f3, f4, f5, f6) {
                if (this.arrayBufferLen + 7 > this.maxArrayBufferLen) {
                    this.flush();
                }
                var uint32View = this.uint32View;
                var float32View = this.float32View;
                var arrayBufferLen = this.arrayBufferLen;
                uint32View[arrayBufferLen++] = 215;
                float32View[arrayBufferLen++] = f1;
                float32View[arrayBufferLen++] = f2;
                float32View[arrayBufferLen++] = f3;
                float32View[arrayBufferLen++] = f4;
                float32View[arrayBufferLen++] = f5;
                float32View[arrayBufferLen++] = f6;
                this.arrayBufferLen = arrayBufferLen;
            };
            CmdManager.prototype.setGlobalShader = function (i1) {
                if (this.arrayBufferLen + 2 > this.maxArrayBufferLen) {
                    this.flush();
                }
                var uint32View = this.uint32View;
                var arrayBufferLen = this.arrayBufferLen;
                uint32View[arrayBufferLen++] = 111;
                uint32View[arrayBufferLen++] = i1;
                this.arrayBufferLen = arrayBufferLen;
            };
            return CmdManager;
        }());
        __reflect(CmdManager.prototype, "CmdManager");
        /*
         * @private
         * 输出一个单例命令控制器，供所有需要调用的地方使用
         */
        native.$cmdManager = new CmdManager();
        var isRunning = false;
        var playerList = [];
        function runEgret(options) {
            if (isRunning) {
                return;
            }
            isRunning = true;
            if (!options) {
                options = {};
            }
            setRenderMode(options.renderMode);
            if (true) {
                //todo 获得系统语言版本
                var language = "zh_CN";
                if (language in egret.$locale_strings)
                    egret.$language = language;
            }
            try {
                egret.Capabilities.$setNativeCapabilities(egret_native.getVersion());
            }
            catch (e) {
            }
            var ticker = egret.ticker;
            var mainLoop = native.$supportCmdBatch ? function () {
                ticker.update();
                native.$cmdManager.flush();
            } : function () {
                ticker.update();
            };
            egret_native.executeMainLoop(mainLoop, ticker);
            if (!egret.sys.screenAdapter) {
                if (options.screenAdapter) {
                    egret.sys.screenAdapter = options.screenAdapter;
                }
                else {
                    egret.sys.screenAdapter = new egret.sys.DefaultScreenAdapter();
                }
            }
            //todo
            var player = new native.NativePlayer();
            playerList.push(player);
            egret.sys.customHitTestBuffer = new native.NativeCanvasRenderBuffer(3, 3);
            egret.sys.canvasHitTestBuffer = egret.sys.customHitTestBuffer;
        }
        /**
         * 设置渲染模式。"auto","webgl","canvas"
         * @param renderMode
         */
        function setRenderMode(renderMode) {
            egret.sys.RenderBuffer = native.NativeCanvasRenderBuffer;
            egret.sys.CanvasRenderBuffer = native.NativeCanvasRenderBuffer;
            egret.sys.systemRenderer = new egret.CanvasRenderer();
            egret.sys.canvasRenderer = egret.sys.systemRenderer;
            egret.Capabilities.$renderMode = "canvas";
        }
        function updateAllScreens() {
            var length = playerList.length;
            for (var i = 0; i < length; i++) {
                playerList[i].updateScreenSize();
            }
        }
        function toArray(argument) {
            var args = [];
            for (var i = 0; i < argument.length; i++) {
                args.push(argument[i]);
            }
            return args;
        }
        egret.warn = function () {
            console.warn.apply(console, toArray(arguments));
        };
        egret.error = function () {
            console.error.apply(console, toArray(arguments));
        };
        egret.assert = function () {
            if (console.assert) {
                console.assert.apply(console, toArray(arguments));
            }
            else {
                var args_1 = toArray(arguments);
                if (!args_1[0]) {
                    var args2 = [];
                    for (var i = 1; i < args_1.length; i++) {
                        args2.push(args_1[i]);
                    }
                    console.error.apply(console, args2);
                }
            }
        };
        if (true) {
            egret.log = function () {
                if (true) {
                    var length_1 = arguments.length;
                    var info = "";
                    for (var i = 0; i < length_1; i++) {
                        info += arguments[i] + " ";
                    }
                    egret.sys.$logToFPS(info);
                }
                console.log.apply(console, toArray(arguments));
            };
        }
        else {
            egret.log = function () {
                console.log.apply(console, toArray(arguments));
            };
        }
        egret.runEgret = runEgret;
        egret.updateAllScreens = updateAllScreens;
    })(native = egret.native || (egret.native = {}));
})(egret || (egret = {}));
//# sourceMappingURL=EgretNative.js.map