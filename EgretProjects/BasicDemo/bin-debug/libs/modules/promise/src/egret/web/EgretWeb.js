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
        var customContext;
        var context = {
            setAutoClear: function (value) {
                web.WebGLRenderBuffer.autoClear = value;
            },
            save: function () {
                // do nothing
            },
            restore: function () {
                var context = web.WebGLRenderContext.getInstance(0, 0);
                var gl = context.context;
                gl.bindBuffer(gl.ARRAY_BUFFER, context["vertexBuffer"]);
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, context["indexBuffer"]);
                gl.activeTexture(gl.TEXTURE0);
                context.currentProgram = null;
                context["bindIndices"] = false;
                var buffer = context.$bufferStack[1];
                context["activateBuffer"](buffer);
                gl.enable(gl.BLEND);
                context["setBlendMode"]("source-over");
            }
        };
        function setRendererContext(custom) {
            custom.onStart(context);
            customContext = custom;
        }
        egret.setRendererContext = setRendererContext;
        /**
         * @private
         * 刷新所有Egret播放器的显示区域尺寸。仅当使用外部JavaScript代码动态修改了Egret容器大小时，需要手动调用此方法刷新显示区域。
         * 当网页尺寸发生改变时此方法会自动被调用。
         */
        function updateAllScreens() {
            if (!isRunning) {
                return;
            }
            var containerList = document.querySelectorAll(".egret-player");
            var length = containerList.length;
            for (var i = 0; i < length; i++) {
                var container = containerList[i];
                var player = container["egret-player"];
                player.updateScreenSize();
            }
        }
        var isRunning = false;
        /**
         * @private
         * 网页加载完成，实例化页面中定义的Egret标签
         */
        function runEgret(options) {
            if (isRunning) {
                return;
            }
            isRunning = true;
            if (!options) {
                options = {};
            }
            web.Html5Capatibility._audioType = options.audioType;
            web.Html5Capatibility.$init();
            // WebGL上下文参数自定义
            if (options.renderMode == "webgl") {
                // WebGL抗锯齿默认关闭，提升PC及某些平台性能
                var antialias = options.antialias;
                web.WebGLRenderContext.antialias = !!antialias;
                // WebGLRenderContext.antialias = (typeof antialias == undefined) ? true : antialias;
            }
            egret.sys.CanvasRenderBuffer = web.CanvasRenderBuffer;
            setRenderMode(options.renderMode);
            var canvasScaleFactor;
            if (options.canvasScaleFactor) {
                canvasScaleFactor = options.canvasScaleFactor;
            }
            else if (options.calculateCanvasScaleFactor) {
                canvasScaleFactor = options.calculateCanvasScaleFactor(egret.sys.canvasHitTestBuffer.context);
            }
            else {
                //based on : https://github.com/jondavidjohn/hidpi-canvas-polyfill
                var context_1 = egret.sys.canvasHitTestBuffer.context;
                var backingStore = context_1.backingStorePixelRatio ||
                    context_1.webkitBackingStorePixelRatio ||
                    context_1.mozBackingStorePixelRatio ||
                    context_1.msBackingStorePixelRatio ||
                    context_1.oBackingStorePixelRatio ||
                    context_1.backingStorePixelRatio || 1;
                canvasScaleFactor = (window.devicePixelRatio || 1) / backingStore;
            }
            egret.sys.DisplayList.$canvasScaleFactor = canvasScaleFactor;
            var ticker = egret.ticker;
            startTicker(ticker);
            if (options.screenAdapter) {
                egret.sys.screenAdapter = options.screenAdapter;
            }
            else if (!egret.sys.screenAdapter) {
                egret.sys.screenAdapter = new egret.sys.DefaultScreenAdapter();
            }
            var list = document.querySelectorAll(".egret-player");
            var length = list.length;
            for (var i = 0; i < length; i++) {
                var container = list[i];
                var player = new web.WebPlayer(container, options);
                container["egret-player"] = player;
                //webgl模式关闭脏矩形
                if (egret.Capabilities.$renderMode == "webgl") {
                    player.stage.dirtyRegionPolicy = egret.DirtyRegionPolicy.OFF;
                }
            }
            if (egret.Capabilities.$renderMode == "webgl") {
                egret.sys.DisplayList.prototype.setDirtyRegionPolicy = function () { };
            }
            window.addEventListener("resize", function () {
                if (isNaN(resizeTimer)) {
                    resizeTimer = window.setTimeout(doResize, 300);
                }
            });
        }
        /**
         * 设置渲染模式。"auto","webgl","canvas"
         * @param renderMode
         */
        function setRenderMode(renderMode) {
            if (renderMode == "webgl" && egret.WebGLUtils.checkCanUseWebGL()) {
                egret.sys.RenderBuffer = web.WebGLRenderBuffer;
                egret.sys.systemRenderer = new web.WebGLRenderer();
                egret.sys.canvasRenderer = new egret.CanvasRenderer();
                egret.sys.customHitTestBuffer = new web.WebGLRenderBuffer(3, 3);
                egret.sys.canvasHitTestBuffer = new web.CanvasRenderBuffer(3, 3);
                egret.Capabilities.$renderMode = "webgl";
            }
            else {
                egret.sys.RenderBuffer = web.CanvasRenderBuffer;
                egret.sys.systemRenderer = new egret.CanvasRenderer();
                egret.sys.canvasRenderer = egret.sys.systemRenderer;
                egret.sys.customHitTestBuffer = new web.CanvasRenderBuffer(3, 3);
                egret.sys.canvasHitTestBuffer = egret.sys.customHitTestBuffer;
                egret.Capabilities.$renderMode = "canvas";
            }
        }
        /**
         * @private
         * 启动心跳计时器。
         */
        function startTicker(ticker) {
            var requestAnimationFrame = window["requestAnimationFrame"] ||
                window["webkitRequestAnimationFrame"] ||
                window["mozRequestAnimationFrame"] ||
                window["oRequestAnimationFrame"] ||
                window["msRequestAnimationFrame"];
            if (!requestAnimationFrame) {
                requestAnimationFrame = function (callback) {
                    return window.setTimeout(callback, 1000 / 60);
                };
            }
            requestAnimationFrame(onTick);
            function onTick() {
                if (customContext) {
                    customContext.onRender(context);
                }
                ticker.update();
                requestAnimationFrame(onTick);
            }
        }
        //覆盖原生的isNaN()方法实现，在不同浏览器上有2~10倍性能提升。
        window["isNaN"] = function (value) {
            value = +value;
            return value !== value;
        };
        egret.runEgret = runEgret;
        egret.updateAllScreens = updateAllScreens;
        var resizeTimer = NaN;
        function doResize() {
            resizeTimer = NaN;
            egret.updateAllScreens();
            if (customContext) {
                customContext.onResize(context);
            }
        }
    })(web = egret.web || (egret.web = {}));
})(egret || (egret = {}));
if (true) {
    var language = navigator.language || navigator["browserLanguage"] || "en_US";
    language = language.replace("-", "_");
    if (language in egret.$locale_strings)
        egret.$language = language;
}
//# sourceMappingURL=EgretWeb.js.map