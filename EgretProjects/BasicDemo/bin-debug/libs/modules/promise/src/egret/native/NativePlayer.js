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
    var native;
    (function (native) {
        /**
         * @private
         */
        var NativePlayer = (function (_super) {
            __extends(NativePlayer, _super);
            function NativePlayer() {
                var _this = _super.call(this) || this;
                _this.init(NativePlayer.option);
                return _this;
            }
            NativePlayer.prototype.init = function (option) {
                //暂时无法显示重绘区域
                option.showPaintRect = false;
                var stage = new egret.Stage();
                stage.$screen = this;
                stage.$scaleMode = option.scaleMode;
                stage.$maxTouches = option.maxTouches;
                stage.textureScaleFactor = option.textureScaleFactor;
                //设置帧频到native
                stage.frameRate = option.frameRate;
                var buffer = new egret.sys.RenderBuffer(undefined, undefined, true);
                var canvas = buffer.surface;
                canvas.$isRoot = true;
                var touch = new native.NativeTouchHandler(stage);
                var player = new egret.sys.Player(buffer, stage, option.entryClassName);
                egret.lifecycle.stage = stage;
                egret.lifecycle.addLifecycleListener(native.NativeLifeCycleHandler);
                player.showPaintRect(option.showPaintRect);
                if (option.showFPS || option.showLog) {
                    var styleStr = option.fpsStyles || "";
                    var stylesArr = styleStr.split(",");
                    var styles = {};
                    for (var i = 0; i < stylesArr.length; i++) {
                        var tempStyleArr = stylesArr[i].split(":");
                        styles[tempStyleArr[0]] = tempStyleArr[1];
                    }
                    option.fpsStyles = styles;
                    player.displayFPS(option.showFPS, option.showLog, option.logFilter, option.fpsStyles);
                }
                this.playerOption = option;
                this.$stage = stage;
                this.player = player;
                this.nativeTouch = touch;
                //this.nativeInput = nativeInput;
                this.updateScreenSize();
                this.updateMaxTouches();
                player.start();
            };
            NativePlayer.prototype.updateScreenSize = function () {
                var option = this.playerOption;
                var screenWidth = egret_native.EGTView.getFrameWidth();
                var screenHeight = egret_native.EGTView.getFrameHeight();
                egret.Capabilities.$boundingClientWidth = screenWidth;
                egret.Capabilities.$boundingClientHeight = screenHeight;
                var stageSize = egret.sys.screenAdapter.calculateStageSize(this.$stage.$scaleMode, screenWidth, screenHeight, option.contentWidth, option.contentHeight);
                var stageWidth = stageSize.stageWidth;
                var stageHeight = stageSize.stageHeight;
                var displayWidth = stageSize.displayWidth;
                var displayHeight = stageSize.displayHeight;
                var top = (screenHeight - displayHeight) / 2;
                var left = (screenWidth - displayWidth) / 2;
                egret_native.EGTView.setVisibleRect(left, top, displayWidth, displayHeight);
                egret_native.EGTView.setDesignSize(stageWidth, stageHeight);
                this.player.updateStageSize(stageWidth, stageHeight);
            };
            NativePlayer.prototype.setContentSize = function (width, height) {
                var option = this.playerOption;
                option.contentWidth = width;
                option.contentHeight = height;
                this.updateScreenSize();
            };
            /**
             * @private
             * 更新触摸数量
             */
            NativePlayer.prototype.updateMaxTouches = function () {
                this.nativeTouch.$updateMaxTouches();
            };
            return NativePlayer;
        }(egret.HashObject));
        native.NativePlayer = NativePlayer;
        __reflect(NativePlayer.prototype, "egret.native.NativePlayer", ["egret.sys.Screen"]);
    })(native = egret.native || (egret.native = {}));
})(egret || (egret = {}));
//# sourceMappingURL=NativePlayer.js.map