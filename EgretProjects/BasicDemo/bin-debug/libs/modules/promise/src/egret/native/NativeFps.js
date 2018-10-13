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
    var native;
    (function (native) {
        /**
         * @private
         */
        var NativeFps = (function (_super) {
            __extends(NativeFps, _super);
            function NativeFps(stage, showFPS, showLog, logFilter, styles) {
                var _this = _super.call(this) || this;
                _this.arrFps = [];
                _this.arrLog = [];
                if (showFPS || showLog) {
                    _this.panelX = styles["x"] === undefined ? 0 : parseInt(styles['x']);
                    _this.panelY = styles["y"] === undefined ? 0 : parseInt(styles['y']);
                    _this._stage = stage;
                    _this.showFps = showFPS;
                    _this.showLog = showLog;
                    _this.fontColor = styles["textColor"] === undefined ? 0xffffff : parseInt(styles['textColor']);
                    _this.fontSize = styles["size"] === undefined ? 24 : parseInt(styles['size']);
                    _this.bgAlpha = styles["bgAlpha"] || 0.9;
                    _this.shape = new egret.Shape();
                    _this.addChild(_this.shape);
                    if (showFPS)
                        _this.addFps();
                    if (showLog)
                        _this.addLog();
                }
                return _this;
            }
            NativeFps.prototype.addFps = function () {
                var fps = new egret.TextField();
                fps.x = fps.y = 4;
                this.textFps = fps;
                this.addChild(fps);
                fps.lineSpacing = 2;
                fps.size = this.fontSize;
                fps.textColor = this.fontColor;
                fps.textFlow = [
                    { text: "0 FPS " + egret.Capabilities.renderMode + "\n" },
                    { text: "Draw: 0\nDirty: 0%\n" },
                    { text: "Cost: " },
                    { text: "0 ", style: { "textColor": 0x18fefe } },
                    { text: "0 ", style: { "textColor": 0xffff00 } },
                    { text: "0 ", style: { "textColor": 0xff0000 } }
                ];
            };
            NativeFps.prototype.addLog = function () {
                var text = new egret.TextField();
                text.size = this.fontSize;
                text.textColor = this.fontColor;
                text.x = 4;
                this.addChild(text);
                this.textLog = text;
            };
            ;
            NativeFps.prototype.update = function (datas) {
                this.arrFps.push(datas.fps);
                var fpsTotal = 0;
                var lenFps = this.arrFps.length;
                if (lenFps > 101) {
                    lenFps = 101;
                    this.arrFps.shift();
                }
                var fpsMin = this.arrFps[0];
                var fpsMax = this.arrFps[0];
                for (var i = 0; i < lenFps; i++) {
                    var num = this.arrFps[i];
                    fpsTotal += num;
                    if (num < fpsMin)
                        fpsMin = num;
                    else if (num > fpsMax)
                        fpsMax = num;
                }
                this.textFps.textFlow = [
                    { text: datas.fps + " FPS " + egret.Capabilities.renderMode + "\n" },
                    { text: "min" + fpsMin + " max" + fpsMax + " avg" + Math.floor(fpsTotal / lenFps) + "\n" },
                    { text: "Draw: " + datas.draw + "\nDirty: " + datas.dirty + "%\n" },
                    { text: "Cost: " },
                    { text: datas.costTicker + " ", style: { "textColor": 0x18fefe } },
                    { text: datas.costDirty + " ", style: { "textColor": 0xffff00 } },
                    { text: datas.costRender + " ", style: { "textColor": 0xff0000 } }
                ];
                this.updateLayout();
            };
            ;
            NativeFps.prototype.updateInfo = function (info) {
                var fpsHeight = 0;
                if (this.showFps) {
                    fpsHeight = this.textFps.height;
                    this.textLog.y = fpsHeight + 4;
                }
                this.arrLog.push(info);
                this.textLog.text = this.arrLog.join('\n');
                if (this._stage.stageHeight > 0) {
                    if (this.textLog.textWidth > this._stage.stageWidth - 20 - this.panelX) {
                        this.textLog.width = this._stage.stageWidth - 20 - this.panelX;
                    }
                    while (this.textLog.textHeight > this._stage.stageHeight - fpsHeight - 20 - this.panelY) {
                        this.arrLog.shift();
                        this.textLog.text = this.arrLog.join("\n");
                    }
                }
                this.updateLayout();
            };
            NativeFps.prototype.updateLayout = function () {
                if (egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE) {
                    return;
                }
                var g = this.shape.$graphics;
                g.clear();
                g.beginFill(0x000000, this.bgAlpha);
                g.drawRect(0, 0, this.width + 8, this.height + 8);
                g.endFill();
            };
            return NativeFps;
        }(egret.Sprite));
        native.NativeFps = NativeFps;
        __reflect(NativeFps.prototype, "egret.native.NativeFps", ["egret.FPSDisplay", "egret.DisplayObject"]);
        egret.FPSDisplay = NativeFps;
    })(native = egret.native || (egret.native = {}));
})(egret || (egret = {}));
//# sourceMappingURL=NativeFps.js.map