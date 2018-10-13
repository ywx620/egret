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
         */
        var WebPlayer = (function (_super) {
            __extends(WebPlayer, _super);
            function WebPlayer(container, options) {
                var _this = _super.call(this) || this;
                _this.init(container, options);
                _this.initOrientation();
                return _this;
            }
            WebPlayer.prototype.init = function (container, options) {
                var option = this.readOption(container, options);
                var stage = new egret.Stage();
                stage.$screen = this;
                stage.$scaleMode = option.scaleMode;
                stage.$orientation = option.orientation;
                stage.$maxTouches = option.maxTouches;
                stage.frameRate = option.frameRate;
                stage.textureScaleFactor = option.textureScaleFactor;
                var buffer = new egret.sys.RenderBuffer(undefined, undefined, true);
                var canvas = buffer.surface;
                this.attachCanvas(container, canvas);
                var webTouch = new web.WebTouchHandler(stage, canvas);
                var player = new egret.sys.Player(buffer, stage, option.entryClassName);
                egret.lifecycle.stage = stage;
                egret.lifecycle.addLifecycleListener(web.WebLifeCycleHandler);
                var webInput = new web.HTMLInput();
                player.showPaintRect(option.showPaintRect);
                if (option.showFPS || option.showLog) {
                    player.displayFPS(option.showFPS, option.showLog, option.logFilter, option.fpsStyles);
                }
                this.playerOption = option;
                this.container = container;
                this.canvas = canvas;
                this.stage = stage;
                this.player = player;
                this.webTouchHandler = webTouch;
                this.webInput = webInput;
                egret.web.$cacheTextAdapter(webInput, stage, container, canvas);
                this.updateScreenSize();
                this.updateMaxTouches();
                player.start();
            };
            WebPlayer.prototype.initOrientation = function () {
                var self = this;
                window.addEventListener("orientationchange", function () {
                    window.setTimeout(function () {
                        egret.StageOrientationEvent.dispatchStageOrientationEvent(self.stage, egret.StageOrientationEvent.ORIENTATION_CHANGE);
                    }, 350);
                });
            };
            /**
             * 读取初始化参数
             */
            WebPlayer.prototype.readOption = function (container, options) {
                var option = {};
                option.entryClassName = container.getAttribute("data-entry-class");
                option.scaleMode = container.getAttribute("data-scale-mode") || egret.StageScaleMode.NO_SCALE;
                option.frameRate = +container.getAttribute("data-frame-rate") || 30;
                option.contentWidth = +container.getAttribute("data-content-width") || 480;
                option.contentHeight = +container.getAttribute("data-content-height") || 800;
                option.orientation = container.getAttribute("data-orientation") || egret.OrientationMode.AUTO;
                option.maxTouches = +container.getAttribute("data-multi-fingered") || 2;
                option.textureScaleFactor = +container.getAttribute("texture-scale-factor") || 1;
                if (options.renderMode == "webgl") {
                    option.showPaintRect = false;
                }
                else {
                    option.showPaintRect = container.getAttribute("data-show-paint-rect") == "true";
                }
                option.showFPS = container.getAttribute("data-show-fps") == "true";
                var styleStr = container.getAttribute("data-show-fps-style") || "";
                var stylesArr = styleStr.split(",");
                var styles = {};
                for (var i = 0; i < stylesArr.length; i++) {
                    var tempStyleArr = stylesArr[i].split(":");
                    styles[tempStyleArr[0]] = tempStyleArr[1];
                }
                option.fpsStyles = styles;
                option.showLog = container.getAttribute("data-show-log") == "true";
                option.logFilter = container.getAttribute("data-log-filter");
                return option;
            };
            /**
             * @private
             * 添加canvas到container。
             */
            WebPlayer.prototype.attachCanvas = function (container, canvas) {
                var style = canvas.style;
                style.cursor = "inherit";
                style.position = "absolute";
                style.top = "0";
                style.bottom = "0";
                style.left = "0";
                style.right = "0";
                container.appendChild(canvas);
                style = container.style;
                style.overflow = "hidden";
                style.position = "absolute";
            };
            /**
             * @private
             * 更新播放器视口尺寸
             */
            WebPlayer.prototype.updateScreenSize = function () {
                var canvas = this.canvas;
                if (canvas['userTyping'])
                    return;
                var option = this.playerOption;
                var screenRect = this.container.getBoundingClientRect();
                var top = 0;
                var boundingClientWidth = screenRect.width;
                var boundingClientHeight = screenRect.height;
                if (screenRect.top < 0) {
                    boundingClientHeight += screenRect.top;
                    top = -screenRect.top;
                }
                var shouldRotate = false;
                var orientation = this.stage.$orientation;
                if (orientation != egret.OrientationMode.AUTO) {
                    shouldRotate = orientation != egret.OrientationMode.PORTRAIT && boundingClientHeight > boundingClientWidth
                        || orientation == egret.OrientationMode.PORTRAIT && boundingClientWidth > boundingClientHeight;
                }
                var screenWidth = shouldRotate ? boundingClientHeight : boundingClientWidth;
                var screenHeight = shouldRotate ? boundingClientWidth : boundingClientHeight;
                egret.Capabilities.$boundingClientWidth = screenWidth;
                egret.Capabilities.$boundingClientHeight = screenHeight;
                var stageSize = egret.sys.screenAdapter.calculateStageSize(this.stage.$scaleMode, screenWidth, screenHeight, option.contentWidth, option.contentHeight);
                var stageWidth = stageSize.stageWidth;
                var stageHeight = stageSize.stageHeight;
                var displayWidth = stageSize.displayWidth;
                var displayHeight = stageSize.displayHeight;
                canvas.style[egret.web.getPrefixStyleName("transformOrigin")] = "0% 0% 0px";
                canvas.style.width = displayWidth + "px";
                canvas.style.height = displayHeight + "px";
                if (canvas.width != stageWidth) {
                    canvas.width = stageWidth;
                }
                if (canvas.height != stageHeight) {
                    canvas.height = stageHeight;
                }
                var rotation = 0;
                if (shouldRotate) {
                    if (orientation == egret.OrientationMode.LANDSCAPE) {
                        rotation = 90;
                        canvas.style.top = top + (boundingClientHeight - displayWidth) / 2 + "px";
                        canvas.style.left = (boundingClientWidth + displayHeight) / 2 + "px";
                    }
                    else {
                        rotation = -90;
                        canvas.style.top = top + (boundingClientHeight + displayWidth) / 2 + "px";
                        canvas.style.left = (boundingClientWidth - displayHeight) / 2 + "px";
                    }
                }
                else {
                    canvas.style.top = top + (boundingClientHeight - displayHeight) / 2 + "px";
                    canvas.style.left = (boundingClientWidth - displayWidth) / 2 + "px";
                }
                var transform = "rotate(" + rotation + "deg)";
                canvas.style[egret.web.getPrefixStyleName("transform")] = transform;
                var scalex = displayWidth / stageWidth, scaley = displayHeight / stageHeight;
                egret.sys.DisplayList.$setCanvasScale(scalex * egret.sys.DisplayList.$canvasScaleFactor, scaley * egret.sys.DisplayList.$canvasScaleFactor);
                this.webTouchHandler.updateScaleMode(scalex, scaley, rotation);
                this.webInput.$updateSize();
                this.player.updateStageSize(stageWidth, stageHeight); //不要在这个方法后面修改属性
            };
            WebPlayer.prototype.setContentSize = function (width, height) {
                var option = this.playerOption;
                option.contentWidth = width;
                option.contentHeight = height;
                this.updateScreenSize();
            };
            /**
             * @private
             * 更新触摸数量
             */
            WebPlayer.prototype.updateMaxTouches = function () {
                this.webTouchHandler.$updateMaxTouches();
            };
            return WebPlayer;
        }(egret.HashObject));
        web.WebPlayer = WebPlayer;
        __reflect(WebPlayer.prototype, "egret.web.WebPlayer", ["egret.sys.Screen"]);
    })(web = egret.web || (egret.web = {}));
})(egret || (egret = {}));
//# sourceMappingURL=WebPlayer.js.map