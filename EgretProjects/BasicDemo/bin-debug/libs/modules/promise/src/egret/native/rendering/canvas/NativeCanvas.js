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
         * 呈现最终绘图结果的画布
         */
        var NativeCanvas = (function (_super) {
            __extends(NativeCanvas, _super);
            /**
             * @private
             */
            function NativeCanvas() {
                var _this = _super.call(this) || this;
                _this.$width = 0;
                _this.$height = 0;
                _this.renderContext = native.$supportCmdBatch ? new native.NativeCanvasRenderContext() : new native.OldNativeCanvasRenderContext();
                return _this;
            }
            NativeCanvas.prototype.toDataURL = function (type) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                if (this.$nativeCanvas) {
                    return this.$nativeCanvas.toDataURL.apply(this.$nativeCanvas, arguments);
                }
                return null;
            };
            NativeCanvas.prototype.saveToFile = function (type, filePath) {
                if (this.$nativeCanvas && this.$nativeCanvas.saveToFile) {
                    if (native.$supportCmdBatch) {
                        native.$cmdManager.flush();
                    }
                    this.$nativeCanvas.saveToFile(type, filePath);
                }
            };
            Object.defineProperty(NativeCanvas.prototype, "width", {
                /**
                 * @private
                 * @inheritDoc
                 */
                get: function () {
                    return this.$width;
                },
                set: function (value) {
                    if (value > 0) {
                        this.$width = value;
                        if (!this.$nativeCanvas) {
                            this.$nativeCanvas = new egret_native.Canvas(value, 1);
                            if (this.$isRoot) {
                                egret_native.setScreenCanvas(this.$nativeCanvas);
                            }
                            var context = this.$nativeCanvas.getContext("2d");
                            if (native.$supportCmdBatch) {
                                native.$cmdManager.setContext(context);
                                native.$cmdManager.clearScreen(0, 0, 0, 0);
                            }
                            else {
                                context.clearScreen(0, 0, 0, 0);
                            }
                            this.renderContext.$nativeContext = context;
                        }
                        else {
                            this.$nativeCanvas.width = value;
                        }
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(NativeCanvas.prototype, "height", {
                /**
                 * @private
                 * @inheritDoc
                 */
                get: function () {
                    return this.$height;
                },
                set: function (value) {
                    if (value > 0) {
                        this.$height = value;
                        if (!this.$nativeCanvas) {
                            this.$nativeCanvas = new egret_native.Canvas(1, value);
                            if (this.$isRoot) {
                                egret_native.setScreenCanvas(this.$nativeCanvas);
                            }
                            var context = this.$nativeCanvas.getContext("2d");
                            if (native.$supportCmdBatch) {
                                native.$cmdManager.setContext(context);
                                native.$cmdManager.clearScreen(0, 0, 0, 0);
                            }
                            else {
                                context.clearScreen(0, 0, 0, 0);
                            }
                            this.renderContext.$nativeContext = context;
                        }
                        else {
                            this.$nativeCanvas.height = value;
                        }
                    }
                },
                enumerable: true,
                configurable: true
            });
            NativeCanvas.prototype.getContext = function (type) {
                return this.renderContext;
            };
            return NativeCanvas;
        }(egret.HashObject));
        native.NativeCanvas = NativeCanvas;
        __reflect(NativeCanvas.prototype, "egret.native.NativeCanvas");
    })(native = egret.native || (egret.native = {}));
})(egret || (egret = {}));
//# sourceMappingURL=NativeCanvas.js.map