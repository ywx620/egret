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
/// <reference path="../display/Sprite.ts" />
var egret;
(function (egret) {
    var sys;
    (function (sys) {
        /**
         * @private
         * Egret播放器
         */
        var Player = (function (_super) {
            __extends(Player, _super);
            /**
             * @private
             * 实例化一个播放器对象。
             */
            function Player(buffer, stage, entryClassName) {
                var _this = _super.call(this) || this;
                /**
                 * @private
                 */
                _this.isPlaying = false;
                if (true && !buffer) {
                    egret.$error(1003, "buffer");
                }
                _this.entryClassName = entryClassName;
                _this.stage = stage;
                _this.screenDisplayList = _this.createDisplayList(stage, buffer);
                _this.showFPS = false;
                _this.showLog = false;
                _this._showPaintRect = false;
                _this.stageDisplayList = null;
                _this.paintList = [];
                _this.displayFPS = displayFPS;
                _this.showPaintRect = showPaintRect;
                _this.drawPaintRect = drawPaintRect;
                _this.drawDirtyRect = drawDirtyRect;
                return _this;
            }
            /**
             * @private
             */
            Player.prototype.createDisplayList = function (stage, buffer) {
                var displayList = new sys.DisplayList(stage);
                displayList.renderBuffer = buffer;
                stage.$displayList = displayList;
                //displayList.setClipRect(stage.$stageWidth, stage.$stageHeight);
                return displayList;
            };
            /**
             * @private
             * 启动播放器
             */
            Player.prototype.start = function () {
                if (this.isPlaying || !this.stage) {
                    return;
                }
                sys.$TempStage = sys.$TempStage || this.stage;
                this.isPlaying = true;
                if (!this.root) {
                    this.initialize();
                }
                egret.ticker.$addPlayer(this);
            };
            /**
             * @private
             *
             */
            Player.prototype.initialize = function () {
                var rootClass;
                if (this.entryClassName) {
                    rootClass = egret.getDefinitionByName(this.entryClassName);
                }
                if (rootClass) {
                    var rootContainer = new rootClass();
                    this.root = rootContainer;
                    if (rootContainer instanceof egret.DisplayObject) {
                        this.stage.addChild(rootContainer);
                    }
                    else {
                        true && egret.$error(1002, this.entryClassName);
                    }
                }
                else {
                    true && egret.$error(1001, this.entryClassName);
                }
            };
            /**
             * @private
             * 停止播放器，停止后将不能重新启动。
             */
            Player.prototype.stop = function () {
                this.pause();
                this.stage = null;
            };
            /**
             * @private
             * 暂停播放器，后续可以通过调用start()重新启动播放器。
             */
            Player.prototype.pause = function () {
                if (!this.isPlaying) {
                    return;
                }
                this.isPlaying = false;
                egret.ticker.$removePlayer(this);
            };
            /**
             * @private
             * 渲染屏幕
             */
            Player.prototype.$render = function (triggerByFrame, costTicker) {
                if (this.showFPS || this.showLog) {
                    this.stage.addChild(this.fps);
                }
                var stage = this.stage;
                var t = egret.getTimer();
                var dirtyList = stage.$displayList.updateDirtyRegions();
                var t1 = egret.getTimer();
                dirtyList = dirtyList.concat();
                var drawCalls = stage.$displayList.drawToSurface();
                if (this._showPaintRect) {
                    this.drawPaintRect(dirtyList);
                }
                var t2 = egret.getTimer();
                if (triggerByFrame && this.showFPS) {
                    var dirtyRatio = 0;
                    if (drawCalls > 0) {
                        var length_1 = dirtyList.length;
                        var dirtyArea = 0;
                        for (var i = 0; i < length_1; i++) {
                            dirtyArea += dirtyList[i].area;
                        }
                        dirtyRatio = Math.ceil(dirtyArea * 1000 / (stage.stageWidth * stage.stageHeight)) / 10;
                    }
                    this.fps.update(drawCalls, dirtyRatio, t1 - t, t2 - t1, costTicker);
                }
            };
            /**
             * @private
             * 更新舞台尺寸
             * @param stageWidth 舞台宽度（以像素为单位）
             * @param stageHeight 舞台高度（以像素为单位）
             */
            Player.prototype.updateStageSize = function (stageWidth, stageHeight) {
                var stage = this.stage;
                //if (stageWidth !== stage.$stageWidth || stageHeight !== stage.$stageHeight) {
                stage.$stageWidth = stageWidth;
                stage.$stageHeight = stageHeight;
                this.screenDisplayList.setClipRect(stageWidth, stageHeight);
                if (this.stageDisplayList) {
                    this.stageDisplayList.setClipRect(stageWidth, stageHeight);
                }
                stage.dispatchEventWith(egret.Event.RESIZE);
                stage.$invalidate(true);
                //}
            };
            return Player;
        }(egret.HashObject));
        sys.Player = Player;
        __reflect(Player.prototype, "egret.sys.Player");
        var infoLines = [];
        var fpsDisplay;
        var fpsStyle;
        sys.$logToFPS = function (info) {
            if (!fpsDisplay) {
                infoLines.push(info);
                return;
            }
            fpsDisplay.updateInfo(info);
        };
        function displayFPS(showFPS, showLog, logFilter, styles) {
            if (showLog) {
                egret.log = function () {
                    var length = arguments.length;
                    var info = "";
                    for (var i = 0; i < length; i++) {
                        info += arguments[i] + " ";
                    }
                    sys.$logToFPS(info);
                    console.log.apply(console, toArray(arguments));
                };
            }
            fpsStyle = styles ? {} : styles;
            showLog = !!showLog;
            this.showFPS = !!showFPS;
            this.showLog = showLog;
            if (!this.fps) {
                var x = styles["x"] === undefined ? 0 : styles["x"];
                var y = styles["y"] === undefined ? 0 : styles["y"];
                fpsDisplay = this.fps = new FPS(this.stage, showFPS, showLog, logFilter, styles);
                fpsDisplay.x = x;
                fpsDisplay.y = y;
                var length_2 = infoLines.length;
                for (var i = 0; i < length_2; i++) {
                    fpsDisplay.updateInfo(infoLines[i]);
                }
                infoLines = null;
            }
        }
        function showPaintRect(value) {
            value = !!value;
            if (this._showPaintRect == value) {
                return;
            }
            this._showPaintRect = value;
            if (value) {
                if (!this.stageDisplayList) {
                    this.stageDisplayList = sys.DisplayList.create(this.stage);
                }
                this.stage.$displayList = this.stageDisplayList;
            }
            else {
                this.stage.$displayList = this.screenDisplayList;
            }
        }
        function drawPaintRect(dirtyList) {
            var length = dirtyList.length;
            var list = [];
            for (var i = 0; i < length; i++) {
                var region = dirtyList[i];
                list[i] = [region.minX, region.minY, region.width, region.height];
                region.width -= 1;
                region.height -= 1;
            }
            var repaintList = this.paintList;
            repaintList.push(list);
            if (repaintList.length > 1) {
                repaintList.shift();
            }
            var renderBuffer = this.screenDisplayList.renderBuffer;
            var context = renderBuffer.context;
            context.setTransform(1, 0, 0, 1, 0, 0);
            context.clearRect(0, 0, renderBuffer.surface.width, renderBuffer.surface.height);
            context.drawImage(this.stageDisplayList.renderBuffer.surface, 0, 0);
            length = repaintList.length;
            for (var i = 0; i < length; i++) {
                list = repaintList[i];
                for (var j = list.length - 1; j >= 0; j--) {
                    var r = list[j];
                    this.drawDirtyRect(r[0], r[1], r[2], r[3], context);
                }
            }
            context.save();
            context.beginPath();
            length = dirtyList.length;
            for (var i = 0; i < length; i++) {
                var region = dirtyList[i];
                var canvasScaleX = sys.DisplayList.$canvasScaleX;
                var canvasScaleY = sys.DisplayList.$canvasScaleY;
                context.clearRect(region.minX * canvasScaleX, region.minY * canvasScaleY, region.width * canvasScaleX, region.height * canvasScaleY);
                context.rect(region.minX * canvasScaleX, region.minY * canvasScaleY, region.width * canvasScaleX, region.height * canvasScaleY);
            }
            context.clip();
            context.drawImage(this.stageDisplayList.renderBuffer.surface, 0, 0);
            context.restore();
        }
        /**
         * 绘制一个脏矩形显示区域，在显示重绘区功能开启时调用。
         */
        function drawDirtyRect(x, y, width, height, context) {
            context.strokeStyle = 'rgb(255,0,0)';
            context.lineWidth = 5;
            var canvasScaleX = sys.DisplayList.$canvasScaleX;
            var canvasScaleY = sys.DisplayList.$canvasScaleY;
            context.strokeRect(x * canvasScaleX - 0.5, y * canvasScaleY - 0.5, width * canvasScaleX, height * canvasScaleY);
        }
        /**
         * FPS显示对象
         */
        FPS = (function (_super) {
            __extends(FPSImpl, _super);
            function FPSImpl(stage, showFPS, showLog, logFilter, styles) {
                _super.call(this);
                this["isFPS"] = true;
                this.infoLines = [];
                this.totalTime = 0;
                this.totalTick = 0;
                this.lastTime = 0;
                this.drawCalls = 0;
                this.dirtyRatio = 0;
                this.costDirty = 0;
                this.costRender = 0;
                this.costTicker = 0;
                this._stage = stage;
                this.showFPS = showFPS;
                this.showLog = showLog;
                this.logFilter = logFilter;
                this.touchChildren = false;
                this.touchEnabled = false;
                this.styles = styles;
                this.fpsDisplay = new egret.FPSDisplay(stage, showFPS, showLog, logFilter, styles);
                this.addChild(this.fpsDisplay);
                var logFilterRegExp;
                try {
                    logFilterRegExp = logFilter ? new RegExp(logFilter) : null;
                }
                catch (e) {
                    egret.log(e);
                }
                this.filter = function (message) {
                    if (logFilterRegExp)
                        return logFilterRegExp.test(message);
                    return !logFilter || message.indexOf(logFilter) == 0;
                };
            }
            FPSImpl.prototype.update = function (drawCalls, dirtyRatio, costDirty, costRender, costTicker) {
                var current = egret.getTimer();
                this.totalTime += current - this.lastTime;
                this.lastTime = current;
                this.totalTick++;
                this.drawCalls += drawCalls;
                this.dirtyRatio += dirtyRatio;
                this.costDirty += costDirty;
                this.costRender += costRender;
                this.costTicker += costTicker;
                if (this.totalTime >= 1000) {
                    var lastFPS = Math.min(Math.ceil(this.totalTick * 1000 / this.totalTime), egret.ticker.$frameRate);
                    var lastDrawCalls = Math.round(this.drawCalls / this.totalTick);
                    var lastDirtyRatio = Math.round(this.dirtyRatio / this.totalTick);
                    var lastCostDirty = Math.round(this.costDirty / this.totalTick);
                    var lastCostRender = Math.round(this.costRender / this.totalTick);
                    var lastCostTicker = Math.round(this.costTicker / this.totalTick);
                    this.fpsDisplay.update({
                        fps: lastFPS,
                        draw: lastDrawCalls,
                        dirty: lastDirtyRatio,
                        costTicker: lastCostTicker,
                        costDirty: lastCostDirty,
                        costRender: lastCostRender
                    });
                    this.totalTick = 0;
                    this.totalTime = this.totalTime % 1000;
                    this.drawCalls = 0;
                    this.dirtyRatio = 0;
                    this.costDirty = 0;
                    this.costRender = 0;
                    this.costTicker = 0;
                }
            };
            FPSImpl.prototype.updateInfo = function (info) {
                if (!info) {
                    return;
                }
                if (!this.showLog) {
                    return;
                }
                if (!this.filter(info)) {
                    return;
                }
                this.fpsDisplay.updateInfo(info);
            };
            return FPSImpl;
        })(egret.Sprite);
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
            console.assert.apply(console, toArray(arguments));
        };
        egret.log = function () {
            console.log.apply(console, toArray(arguments));
        };
    })(sys = egret.sys || (egret.sys = {}));
})(egret || (egret = {}));
//# sourceMappingURL=Player.js.map