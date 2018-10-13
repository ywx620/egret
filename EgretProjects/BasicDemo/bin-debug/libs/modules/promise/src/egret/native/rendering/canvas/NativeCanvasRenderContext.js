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
        var blendModesForGL = {
            "source-over": [1, 771],
            "lighter": [770, 1],
            "destination-out": [0, 771],
            "destination-in": [0, 770]
        };
        /**
         * @version Egret 2.4
         * @platform Web,Native
         * @private
         */
        var NativeCanvasRenderContext = (function (_super) {
            __extends(NativeCanvasRenderContext, _super);
            function NativeCanvasRenderContext() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.$matrix = new egret.Matrix();
                _this.$nativeContext = null;
                _this.$globalCompositeOperation = "source-over";
                _this.$globalAlpha = 1;
                _this.$lineWidth = 0;
                _this.$strokeStyle = "#000000";
                _this.$fillStyle = "#000000";
                _this.$font = "normal normal 10px sans-serif";
                _this.$fontSize = 10;
                _this.$fontFamily = "";
                _this.clipRectArray = null;
                _this.$saveList = [];
                _this.$clipRectArray = [];
                _this.$clipRect = new egret.Rectangle();
                _this.$saveCount = 0;
                _this.$clipList = [];
                _this.savedMatrix = new egret.Matrix();
                _this.$hasStrokeText = false;
                return _this;
            }
            Object.defineProperty(NativeCanvasRenderContext.prototype, "globalCompositeOperation", {
                /**
                 * @private
                 * 设置新图像如何绘制到已有的图像上的规制
                 * @version Egret 2.4
                 * @platform Web,Native
                 */
                get: function () {
                    return this.$globalCompositeOperation;
                },
                set: function (value) {
                    this.$globalCompositeOperation = value;
                    var arr = blendModesForGL[value];
                    if (arr) {
                        native.$cmdManager.setContext(this.$nativeContext);
                        native.$cmdManager.setBlendArg(arr[0], arr[1]);
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(NativeCanvasRenderContext.prototype, "globalAlpha", {
                /**
                 * @private
                 * 设置接下来绘图填充的整体透明度
                 * @version Egret 2.4
                 * @platform Web,Native
                 */
                get: function () {
                    return this.$globalAlpha;
                },
                set: function (value) {
                    this.$globalAlpha = value;
                    native.$cmdManager.setContext(this.$nativeContext);
                    native.$cmdManager.setGlobalAlpha(value);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(NativeCanvasRenderContext.prototype, "lineWidth", {
                /**
                 * @private
                 * 设置线条粗细，以像素为单位。设置为0，负数，Infinity 或 NaN 将会被忽略。
                 * @default 1
                 * @version Egret 2.4
                 * @platform Web,Native
                 */
                get: function () {
                    return this.$lineWidth;
                },
                set: function (value) {
                    //console.log("set lineWidth" + value);
                    this.$lineWidth = value;
                    native.$cmdManager.setContext(this.$nativeContext);
                    native.$cmdManager.setLineWidth(value);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(NativeCanvasRenderContext.prototype, "strokeStyle", {
                /**
                 * @private
                 * 设置要在图形边线填充的颜色或样式
                 * @default "#000000"
                 * @version Egret 2.4
                 * @platform Web,Native
                 */
                get: function () {
                    return this.$strokeStyle;
                },
                set: function (value) {
                    this.$strokeStyle = value;
                    if (value != null) {
                        if (value.indexOf("rgba") != -1) {
                            value = this.$parseRGBA(value);
                        }
                        else if (value.indexOf("rgb") != -1) {
                            value = this.$parseRGB(value);
                        }
                        native.$cmdManager.setContext(egret_native.Label);
                        native.$cmdManager.setStrokeColor(parseInt(value.replace("#", "0x")));
                    }
                    native.$cmdManager.setContext(this.$nativeContext);
                    var s1 = native.$cmdManager.pushString(value);
                    native.$cmdManager.setStrokeStyle(s1);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(NativeCanvasRenderContext.prototype, "fillStyle", {
                /**
                 * @private
                 * 设置要在图形内部填充的颜色或样式
                 * @default "#000000"
                 * @version Egret 2.4
                 * @platform Web,Native
                 */
                get: function () {
                    return this.$fillStyle;
                },
                set: function (value) {
                    this.$fillStyle = value;
                    if (value != null) {
                        if (value.indexOf("rgba") != -1) {
                            value = this.$parseRGBA(value);
                        }
                        else if (value.indexOf("rgb") != -1) {
                            value = this.$parseRGB(value);
                        }
                        native.$cmdManager.setContext(egret_native.Label);
                        native.$cmdManager.setTextColor(parseInt(value.replace("#", "0x")));
                    }
                    native.$cmdManager.setContext(this.$nativeContext);
                    var s1 = native.$cmdManager.pushString(value);
                    native.$cmdManager.setFillStyle(s1);
                },
                enumerable: true,
                configurable: true
            });
            NativeCanvasRenderContext.prototype.$fillColorStr = function (s) {
                if (s.length < 2) {
                    s = "0" + s;
                }
                return s;
            };
            NativeCanvasRenderContext.prototype.$parseRGBA = function (str) {
                var index = str.indexOf("(");
                str = str.slice(index + 1, str.length - 1);
                var arr = str.split(",");
                var a = parseInt((parseFloat(arr[3]) * 255)).toString(16);
                var r = parseInt(arr[0]).toString(16);
                var g = parseInt(arr[1]).toString(16);
                var b = parseInt(arr[2]).toString(16);
                str = "#" + this.$fillColorStr(a) + this.$fillColorStr(r) + this.$fillColorStr(g) + this.$fillColorStr(b);
                return str;
            };
            NativeCanvasRenderContext.prototype.$parseRGB = function (str) {
                var index = str.indexOf("(");
                str = str.slice(index + 1, str.length - 1);
                var arr = str.split(",");
                var r = parseInt(arr[0]).toString(16);
                var g = parseInt(arr[1]).toString(16);
                var b = parseInt(arr[2]).toString(16);
                str = "#" + this.$fillColorStr(r) + this.$fillColorStr(g) + this.$fillColorStr(b);
                return str;
            };
            Object.defineProperty(NativeCanvasRenderContext.prototype, "font", {
                /**
                 * @private
                 * 当前的字体样式
                 * @version Egret 2.4
                 * @platform Web,Native
                 */
                get: function () {
                    return this.$font;
                },
                set: function (value) {
                    this.$font = value;
                    var arr = value.split(" ");
                    var sizeTxt = arr[2];
                    if (sizeTxt.indexOf("px") != -1) {
                        this.$fontSize = parseInt(sizeTxt.replace("px", ""));
                        //console.log("set font" + this.$lineWidth);
                    }
                    if (egret.useFontMapping) {
                        var fontFamilyText = void 0;
                        if (arr.length == 4) {
                            fontFamilyText = arr[3];
                        }
                        else {
                            fontFamilyText = arr.slice(3).join(" ");
                        }
                        var arr2 = void 0;
                        if (fontFamilyText.indexOf(", ") != -1) {
                            arr2 = fontFamilyText.split(", ");
                        }
                        else if (fontFamilyText.indexOf(",") != -1) {
                            arr2 = fontFamilyText.split(",");
                        }
                        if (arr2) {
                            var length_1 = arr2.length;
                            for (var i = 0; i < length_1; i++) {
                                var fontFamily = arr2[i];
                                //暂时先不考虑带有引号的情况
                                if (egret.fontMapping[fontFamily]) {
                                    this.$fontFamily = egret.fontMapping[fontFamily];
                                    return;
                                }
                            }
                        }
                        else {
                            this.$fontFamily = egret.fontMapping[fontFamilyText];
                        }
                        if (!this.$fontFamily) {
                            this.$fontFamily = "/system/fonts/DroidSansFallback.ttf";
                        }
                    }
                    else {
                        //兼容旧版本直接将 default_fontFamily 设置为字体路径的情况
                        this.$fontFamily = egret.TextField.default_fontFamily;
                    }
                },
                enumerable: true,
                configurable: true
            });
            /**
             * @private
             * 绘制一段圆弧路径。圆弧路径的圆心在 (x, y) 位置，半径为 r ，根据anticlockwise （默认为顺时针）指定的方向从 startAngle 开始绘制，到 endAngle 结束。
             * @param x 圆弧中心（圆心）的 x 轴坐标。
             * @param y 圆弧中心（圆心）的 y 轴坐标。
             * @param radius 圆弧的半径。
             * @param startAngle 圆弧的起始点， x轴方向开始计算，单位以弧度表示。
             * @param endAngle 圆弧的重点， 单位以弧度表示。
             * @param anticlockwise 如果为 true，逆时针绘制圆弧，反之，顺时针绘制。
             * @version Egret 2.4
             * @platform Web,Native
             */
            NativeCanvasRenderContext.prototype.arc = function (x, y, radius, startAngle, endAngle, anticlockwise) {
                native.$cmdManager.setContext(this.$nativeContext);
                native.$cmdManager.arc(x, y, radius, startAngle, endAngle, anticlockwise ? 1 : 0);
                // this.$nativeContext.arc(x, y, radius, startAngle, endAngle, anticlockwise);
            };
            /**
             * @private
             * 绘制一段二次贝塞尔曲线路径。它需要2个点。 第一个点是控制点，第二个点是终点。 起始点是当前路径最新的点，当创建二次贝赛尔曲线之前，可以使用 moveTo() 方法进行改变。
             * @param cpx 控制点的 x 轴坐标。
             * @param cpy 控制点的 y 轴坐标。
             * @param x 终点的 x 轴坐标。
             * @param y 终点的 y 轴坐标。
             * @version Egret 2.4
             * @platform Web,Native
             */
            NativeCanvasRenderContext.prototype.quadraticCurveTo = function (cpx, cpy, x, y) {
                //console.log("quadraticCurveTo " + cpx + " " + cpy + " " + x + " " + y);
                native.$cmdManager.setContext(this.$nativeContext);
                native.$cmdManager.quadraticCurveTo(cpx, cpy, x, y);
                // this.$nativeContext.quadraticCurveTo(cpx, cpy, x, y);
            };
            /**
             * @private
             * 使用直线连接子路径的终点到x，y坐标。
             * @param x 直线终点的 x 轴坐标。
             * @param y 直线终点的 y 轴坐标。
             * @version Egret 2.4
             * @platform Web,Native
             */
            NativeCanvasRenderContext.prototype.lineTo = function (x, y) {
                //console.log("lineTo " + x + " " + y);
                native.$cmdManager.setContext(this.$nativeContext);
                native.$cmdManager.lineTo(x, y);
            };
            /**
             * @private
             * 根据当前的填充样式，填充当前或已存在的路径的方法。采取非零环绕或者奇偶环绕规则。
             * @param fillRule 一种算法，决定点是在路径内还是在路径外。允许的值：
             * "nonzero": 非零环绕规则， 默认的规则。
             * "evenodd": 奇偶环绕规则。
             * @version Egret 2.4
             * @platform Web,Native
             */
            NativeCanvasRenderContext.prototype.fill = function (fillRule) {
                native.$cmdManager.setContext(this.$nativeContext);
                var s1 = native.$cmdManager.pushString(fillRule);
                native.$cmdManager.fill(s1);
            };
            /**
             * @private
             * 使笔点返回到当前子路径的起始点。它尝试从当前点到起始点绘制一条直线。如果图形已经是封闭的或者只有一个点，那么此方法不会做任何操作。
             * @version Egret 2.4
             * @platform Web,Native
             */
            NativeCanvasRenderContext.prototype.closePath = function () {
                native.$cmdManager.setContext(this.$nativeContext);
                native.$cmdManager.closePath();
                if (this.clipRectArray) {
                    this.$clipRectArray = this.clipRectArray;
                    this.clipRectArray = null;
                }
            };
            /**
             * @private
             * 创建一段矩形路径，矩形的起点位置是 (x, y) ，尺寸为 width 和 height。矩形的4个点通过直线连接，子路径做为闭合的标记，所以你可以填充或者描边矩形。
             * @param x 矩形起点的 x 轴坐标。
             * @param y 矩形起点的 y 轴坐标。
             * @param width 矩形的宽度。
             * @param height 矩形的高度。
             * @version Egret 2.4
             * @platform Web,Native
             */
            NativeCanvasRenderContext.prototype.rect = function (x, y, w, h) {
                native.$cmdManager.setContext(this.$nativeContext);
                native.$cmdManager.rect(x, y, w, h);
                this.$clipRectArray.push({ x: x, y: y, w: w, h: h });
            };
            /**
             * @private
             * 将一个新的子路径的起始点移动到(x，y)坐标
             * @param x 点的 x 轴
             * @param y 点的 y 轴
             * @version Egret 2.4
             * @platform Web,Native
             */
            NativeCanvasRenderContext.prototype.moveTo = function (x, y) {
                native.$cmdManager.setContext(this.$nativeContext);
                native.$cmdManager.moveTo(x, y);
            };
            /**
             * @private
             * 绘制一个填充矩形。矩形的起点在 (x, y) 位置，矩形的尺寸是 width 和 height ，fillStyle 属性决定矩形的样式。
             * @param x 矩形起始点的 x 轴坐标。
             * @param y 矩形起始点的 y 轴坐标。
             * @param width 矩形的宽度。
             * @param height 矩形的高度。
             * @version Egret 2.4
             * @platform Web,Native
             */
            NativeCanvasRenderContext.prototype.fillRect = function (x, y, w, h) {
                native.$cmdManager.setContext(this.$nativeContext);
                native.$cmdManager.fillRect(x, y, w, h);
                // this.$nativeContext.fillRect(x, y, w, h);
            };
            /**
             * @private
             * 绘制一段三次贝赛尔曲线路径。该方法需要三个点。 第一、第二个点是控制点，第三个点是结束点。起始点是当前路径的最后一个点，
             * 绘制贝赛尔曲线前，可以通过调用 moveTo() 进行修改。
             * @param cp1x 第一个控制点的 x 轴坐标。
             * @param cp1y 第一个控制点的 y 轴坐标。
             * @param cp2x 第二个控制点的 x 轴坐标。
             * @param cp2y 第二个控制点的 y 轴坐标。
             * @param x 结束点的 x 轴坐标。
             * @param y 结束点的 y 轴坐标。
             * @version Egret 2.4
             * @platform Web,Native
             */
            NativeCanvasRenderContext.prototype.bezierCurveTo = function (cp1x, cp1y, cp2x, cp2y, x, y) {
                native.$cmdManager.setContext(this.$nativeContext);
                native.$cmdManager.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
                // this.$nativeContext.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
            };
            /**
             * @private
             * 根据当前的画线样式，绘制当前或已经存在的路径的方法。
             * @version Egret 2.4
             * @platform Web,Native
             */
            NativeCanvasRenderContext.prototype.stroke = function () {
                native.$cmdManager.setContext(this.$nativeContext);
                native.$cmdManager.stroke();
                // this.$nativeContext.stroke();
            };
            /**
             * @private
             * 使用当前的绘画样式，描绘一个起点在 (x, y) 、宽度为 w 、高度为 h 的矩形的方法。
             * @param x 矩形起点的 x 轴坐标。
             * @param y 矩形起点的 y 轴坐标。
             * @param w 矩形的宽度。
             * @param h 矩形的高度。
             * @version Egret 2.4
             * @platform Web,Native
             */
            NativeCanvasRenderContext.prototype.strokeRect = function (x, y, w, h) {
                //console.log("strokeRect");
                native.$cmdManager.setContext(this.$nativeContext);
                native.$cmdManager.strokeRect(x, y, w, h);
                // this.$nativeContext.strokeRect(x, y, w, h);
            };
            /**
             * @private
             * 清空子路径列表开始一个新路径。 当你想创建一个新的路径时，调用此方法。
             * @version Egret 2.4
             * @platform Web,Native
             */
            NativeCanvasRenderContext.prototype.beginPath = function () {
                native.$cmdManager.setContext(this.$nativeContext);
                native.$cmdManager.beginPath();
                this.clipRectArray = this.$clipRectArray.concat();
            };
            /**
             * @private
             * 根据控制点和半径绘制一段圆弧路径，使用直线连接前一个点。
             * @param x1 第一个控制点的 x 轴坐标。
             * @param y1 第一个控制点的 y 轴坐标。
             * @param x2 第二个控制点的 x 轴坐标。
             * @param y2 第二个控制点的 y 轴坐标。
             * @param radius 圆弧的半径。
             * @version Egret 2.4
             * @platform Web,Native
             */
            NativeCanvasRenderContext.prototype.arcTo = function (x1, y1, x2, y2, radius) {
                this.$nativeContext.arcTo(x1, y1, x2, y2, radius);
            };
            /**
             * @private
             * 使用方法参数描述的矩阵多次叠加当前的变换矩阵。
             * @param a 水平缩放。
             * @param b 水平倾斜。
             * @param c 垂直倾斜。
             * @param d 垂直缩放。
             * @param tx 水平移动。
             * @param ty 垂直移动。
             * @version Egret 2.4
             * @platform Web,Native
             */
            NativeCanvasRenderContext.prototype.transform = function (a, b, c, d, tx, ty) {
                this.$matrix.append(a, b, c, d, tx, ty);
                this.setTransformToNative();
            };
            /**
             * @private
             * 通过在网格中移动 surface 和 surface 原点 x 水平方向、原点 y 垂直方向，添加平移变换
             * @param x 水平移动。
             * @param y 垂直移动。
             * @version Egret 2.4
             * @platform Web,Native
             */
            NativeCanvasRenderContext.prototype.translate = function (x, y) {
                this.$matrix.translate(x, y);
                this.setTransformToNative();
            };
            /**
             * @private
             * 根据 x 水平方向和 y 垂直方向，为 surface 单位添加缩放变换。
             * @param x 水平方向的缩放因子。
             * @param y 垂直方向的缩放因子。
             * @version Egret 2.4
             * @platform Web,Native
             */
            NativeCanvasRenderContext.prototype.scale = function (x, y) {
                this.$matrix.scale(x, y);
                this.setTransformToNative();
            };
            /**
             * @private
             * 在变换矩阵中增加旋转，角度变量表示一个顺时针旋转角度并且用弧度表示。
             * @param angle 顺时针旋转的弧度。
             * @version Egret 2.4
             * @platform Web,Native
             */
            NativeCanvasRenderContext.prototype.rotate = function (angle) {
                this.$matrix.rotate(angle);
                this.setTransformToNative();
            };
            /**
             * @private
             * 恢复到最近的绘制样式状态，此状态是通过 save() 保存到”状态栈“中最新的元素。
             * @version Egret 2.4
             * @platform Web,Native
             */
            NativeCanvasRenderContext.prototype.restore = function () {
                //console.log("restore");
                if (this.$saveList.length) {
                    var data = this.$saveList.pop();
                    for (var key in data) {
                        this[key] = data[key];
                    }
                    this.setTransformToNative();
                    native.$cmdManager.setContext(this.$nativeContext);
                    native.$cmdManager.restore();
                    this.clipRectArray = null;
                }
            };
            /**
             * @private
             * 使用栈保存当前的绘画样式状态，你可以使用 restore() 恢复任何改变。
             * @version Egret 2.4
             * @platform Web,Native
             */
            NativeCanvasRenderContext.prototype.save = function () {
                //console.log("save");
                var transformMatrix = new egret.Matrix();
                transformMatrix.copyFrom(this.$matrix);
                this.$saveList.push({
                    lineWidth: this.$lineWidth,
                    globalCompositeOperation: this.$globalCompositeOperation,
                    globalAlpha: this.$globalAlpha,
                    strokeStyle: this.$strokeStyle,
                    fillStyle: this.$fillStyle,
                    font: this.$font,
                    $matrix: transformMatrix,
                    $clipRectArray: this.$clipRectArray.concat()
                });
                native.$cmdManager.setContext(this.$nativeContext);
                native.$cmdManager.save();
            };
            /**
             * @private
             * 从当前路径创建一个剪切路径。在 clip() 调用之后，绘制的所有信息只会出现在剪切路径内部。
             * @version Egret 2.4
             * @platform Web,Native
             */
            NativeCanvasRenderContext.prototype.clip = function (fillRule) {
                if (this.$clipRectArray.length > 0) {
                    var arr = [];
                    for (var i = 0; i < this.$clipRectArray.length; i++) {
                        var clipRect = this.$clipRectArray[i];
                        arr.push(clipRect.x);
                        arr.push(clipRect.y);
                        arr.push(clipRect.w);
                        arr.push(clipRect.h);
                    }
                    //console.log("pushRectStencils " + arr.toString());
                    native.$cmdManager.setContext(this.$nativeContext);
                    native.$cmdManager.pushRectStencils(arr);
                    this.$clipRectArray.length = 0;
                }
            };
            /**
             * @private
             * 设置指定矩形区域内（以 点 (x, y) 为起点，范围是(width, height) ）所有像素变成透明，并擦除之前绘制的所有内容。
             * @param x 矩形起点的 x 轴坐标。
             * @param y 矩形起点的 y 轴坐标。
             * @param width 矩形的宽度。
             * @param height 矩形的高度。
             * @version Egret 2.4
             * @platform Web,Native
             */
            NativeCanvasRenderContext.prototype.clearRect = function (x, y, width, height) {
                //console.log("clearRect x:" + x + " y:" +  y + " width:" + width + " height:" + height);
                native.$cmdManager.setContext(this.$nativeContext);
                native.$cmdManager.clearRect(x, y, width, height);
            };
            /**
             * @private
             * 重新设置当前的变换为单位矩阵，并使用同样的变量调用 transform() 方法。
             * @param a 水平缩放。
             * @param b 水平倾斜。
             * @param c 垂直倾斜。
             * @param d 垂直缩放。
             * @param tx 水平移动。
             * @param ty 垂直移动。
             * @version Egret 2.4
             * @platform Web,Native
             */
            NativeCanvasRenderContext.prototype.setTransform = function (a, b, c, d, tx, ty) {
                this.$matrix.setTo(a, b, c, d, tx, ty);
                this.setTransformToNative();
            };
            NativeCanvasRenderContext.prototype.setTransformToNative = function () {
                var m = this.$matrix;
                //console.log("setTransformToNative::a=" + m.a + " b=" + m.b + " c=" + m.c + " d=" + m.d + " tx=" + m.tx + " ty=" + m.ty);
                native.$cmdManager.setContext(this.$nativeContext);
                native.$cmdManager.setTransform(m.a, m.b, m.c, m.d, m.tx, m.ty);
            };
            /**
             * @private
             * 保存矩阵，这里只能保存一次，嵌套无效
             */
            NativeCanvasRenderContext.prototype.saveTransform = function () {
                this.savedMatrix.copyFrom(this.$matrix);
            };
            /**
             * @private
             * 保存矩阵，这里只能保存一次，嵌套无效
             */
            NativeCanvasRenderContext.prototype.restoreTransform = function () {
                this.$matrix.copyFrom(this.savedMatrix);
            };
            /**
             * @private
             * 创建一个沿参数坐标指定的直线的渐变。该方法返回一个线性的 GraphicsGradient 对象。
             * @param x0 起点的 x 轴坐标。
             * @param y0 起点的 y 轴坐标。
             * @param x1 终点的 x 轴坐标。
             * @param y1 终点的 y 轴坐标。
             * @version Egret 2.4
             * @platform Web,Native
             */
            NativeCanvasRenderContext.prototype.createLinearGradient = function (x0, y0, x1, y1) {
                return this.$nativeContext.createLinearGradient(x0, y0, x1, y1);
            };
            /**
             * @private
             * 根据参数确定的两个圆的坐标，创建一个放射性渐变。该方法返回一个放射性的 GraphicsGradient。
             * @param x0 开始圆形的 x 轴坐标。
             * @param y0 开始圆形的 y 轴坐标。
             * @param r0 开始圆形的半径。
             * @param x1 结束圆形的 x 轴坐标。
             * @param y1 结束圆形的 y 轴坐标。
             * @param r1 结束圆形的半径。
             * @version Egret 2.4
             * @platform Web,Native
             */
            NativeCanvasRenderContext.prototype.createRadialGradient = function (x0, y0, r0, x1, y1, r1) {
                return this.$nativeContext.createRadialGradient(x0, y0, r0, x1, y1, r1);
            };
            /**
             * @private
             * 在(x,y)位置绘制（填充）文本。
             * @version Egret 2.4
             * @platform Web,Native
             */
            NativeCanvasRenderContext.prototype.fillText = function (text, x, y, maxWidth) {
                //console.log("drawText" + text);
                native.$cmdManager.setContext(this.$nativeContext);
                var s1 = native.$cmdManager.pushString(this.$fontFamily);
                var s2 = native.$cmdManager.pushString("");
                native.$cmdManager.createLabel(s1, this.$fontSize, s2, this.$hasStrokeText ? this.$lineWidth : 0);
                this.$hasStrokeText = false;
                var s3 = native.$cmdManager.pushString(text);
                native.$cmdManager.drawText(s3, x, y);
            };
            NativeCanvasRenderContext.prototype.strokeText = function (text, x, y, maxWidth) {
                this.$hasStrokeText = true;
            };
            /**
             * @private
             * 测量指定文本宽度，返回 TextMetrics 对象。
             * @version Egret 2.4
             * @platform Web,Native
             */
            NativeCanvasRenderContext.prototype.measureText = function (text) {
                native.$cmdManager.setContext(egret_native.Label);
                var s1 = native.$cmdManager.pushString(this.$fontFamily);
                var s2 = native.$cmdManager.pushString("");
                native.$cmdManager.createLabel(s1, this.$fontSize, s2, this.$hasStrokeText ? this.$lineWidth : 0);
                //同步更新
                native.$cmdManager.flush();
                return { width: egret_native.Label.getTextSize(text)[0] };
            };
            /**
             * @private
             * 注意：如果要对绘制的图片进行缩放，出于性能优化考虑，系统不会主动去每次重置imageSmoothingEnabled属性，因此您在调用drawImage()方法前请务必
             * 确保 imageSmoothingEnabled 已被重置为正常的值，否则有可能沿用上个显示对象绘制过程留下的值。
             * @version Egret 2.4
             * @platform Web,Native
             */
            NativeCanvasRenderContext.prototype.drawImage = function (image, offsetX, offsetY, width, height, surfaceOffsetX, surfaceOffsetY, surfaceImageWidth, surfaceImageHeight) {
                var bitmapData;
                var isNative;
                if (image.$nativeCanvas) {
                    bitmapData = image.$nativeCanvas;
                    isNative = true;
                }
                else {
                    bitmapData = image;
                    isNative = false;
                }
                if (!bitmapData) {
                    return;
                }
                if (arguments.length == 3) {
                    surfaceOffsetX = offsetX;
                    surfaceOffsetY = offsetY;
                    offsetX = 0;
                    offsetY = 0;
                    width = surfaceImageWidth = image.width;
                    height = surfaceImageHeight = image.height;
                }
                else if (arguments.length == 5) {
                    surfaceOffsetX = offsetX;
                    surfaceOffsetY = offsetY;
                    surfaceImageWidth = width;
                    surfaceImageHeight = height;
                    offsetX = 0;
                    offsetY = 0;
                    width = image.width;
                    height = image.height;
                }
                else {
                    if (width == void 0) {
                        width = image.width;
                    }
                    if (height == void 0) {
                        height = image.height;
                    }
                    if (surfaceOffsetX == void 0) {
                        surfaceOffsetX = 0;
                    }
                    if (surfaceOffsetY == void 0) {
                        surfaceOffsetY = 0;
                    }
                    if (surfaceImageWidth == void 0) {
                        surfaceImageWidth = width;
                    }
                    if (surfaceImageHeight == void 0) {
                        surfaceImageHeight = height;
                    }
                }
                //console.log("drawImage::" + offsetX + " " + offsetY + " " + width + " " + height + " " + surfaceOffsetX + " " + surfaceOffsetY + " " + surfaceImageWidth + " " + surfaceImageHeight);
                //console.log("drawImage::" + bitmapData);
                var imageAdress;
                if (!isNative) {
                    if (!bitmapData._native_tex_loc) {
                        bitmapData._native_tex_loc = bitmapData.___native_texture__p;
                    }
                    imageAdress = bitmapData._native_tex_loc;
                }
                else {
                    imageAdress = bitmapData.___native_texture__p;
                }
                native.$cmdManager.setContext(this.$nativeContext);
                native.$cmdManager.drawImage(imageAdress, offsetX, offsetY, width, height, surfaceOffsetX, surfaceOffsetY, surfaceImageWidth, surfaceImageHeight);
            };
            /**
             * @private
             * draw mesh
             */
            NativeCanvasRenderContext.prototype.drawMesh = function (image, offsetX, offsetY, width, height, surfaceOffsetX, surfaceOffsetY, surfaceImageWidth, surfaceImageHeight, textureSourceWidth, textureSourceHeight, meshUVs, meshVertices, meshIndices) {
                var bitmapData;
                if (image.$nativeCanvas) {
                    bitmapData = image.$nativeCanvas;
                }
                else {
                    bitmapData = image;
                }
                if (!bitmapData) {
                    return;
                }
                if (arguments.length == 3) {
                    surfaceOffsetX = offsetX;
                    surfaceOffsetY = offsetY;
                    offsetX = 0;
                    offsetY = 0;
                    width = surfaceImageWidth = image.width;
                    height = surfaceImageHeight = image.height;
                }
                else if (arguments.length == 5) {
                    surfaceOffsetX = offsetX;
                    surfaceOffsetY = offsetY;
                    surfaceImageWidth = width;
                    surfaceImageHeight = height;
                    offsetX = 0;
                    offsetY = 0;
                    width = image.width;
                    height = image.height;
                }
                else {
                    if (!width) {
                        width = image.width;
                    }
                    if (!height) {
                        height = image.height;
                    }
                    if (!surfaceOffsetX) {
                        surfaceOffsetX = 0;
                    }
                    if (!surfaceOffsetY) {
                        surfaceOffsetY = 0;
                    }
                    if (!surfaceImageWidth) {
                        surfaceImageWidth = width;
                    }
                    if (!surfaceImageHeight) {
                        surfaceImageHeight = height;
                    }
                }
                this.vertices = new Float32Array(meshVertices.length / 2 * 5);
                this.indicesForMesh = new Uint32Array(meshIndices.length);
                this.cacheArrays(this.$matrix, 1, offsetX, offsetY, width, height, surfaceOffsetX, surfaceOffsetY, surfaceImageWidth, surfaceImageHeight, textureSourceWidth, textureSourceHeight, meshUVs, meshVertices, meshIndices);
                // 打断批渲染
                native.$cmdManager.flush();
                this.$nativeContext.drawMesh(bitmapData, this.vertices, this.indicesForMesh, this.vertices.length, this.indicesForMesh.length);
            };
            NativeCanvasRenderContext.prototype.cacheArrays = function (transform, alpha, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight, textureSourceWidth, textureSourceHeight, meshUVs, meshVertices, meshIndices) {
                //计算出绘制矩阵，之后把矩阵还原回之前的
                var locWorldTransform = transform;
                var originalA = locWorldTransform.a;
                var originalB = locWorldTransform.b;
                var originalC = locWorldTransform.c;
                var originalD = locWorldTransform.d;
                var originalTx = locWorldTransform.tx;
                var originalTy = locWorldTransform.ty;
                if (destX != 0 || destY != 0) {
                    locWorldTransform.append(1, 0, 0, 1, destX, destY);
                }
                if (sourceWidth / destWidth != 1 || sourceHeight / destHeight != 1) {
                    locWorldTransform.append(destWidth / sourceWidth, 0, 0, destHeight / sourceHeight, 0, 0);
                }
                var a = locWorldTransform.a;
                var b = locWorldTransform.b;
                var c = locWorldTransform.c;
                var d = locWorldTransform.d;
                var tx = locWorldTransform.tx;
                var ty = locWorldTransform.ty;
                locWorldTransform.a = originalA;
                locWorldTransform.b = originalB;
                locWorldTransform.c = originalC;
                locWorldTransform.d = originalD;
                locWorldTransform.tx = originalTx;
                locWorldTransform.ty = originalTy;
                if (meshVertices) {
                    // 计算索引位置与赋值
                    var vertices = this.vertices;
                    // 缓存顶点数组
                    var i = 0, iD = 0, l = 0;
                    var u = 0, v = 0, x = 0, y = 0;
                    for (i = 0, l = meshUVs.length; i < l; i += 2) {
                        iD = i * 5 / 2;
                        x = meshVertices[i];
                        y = meshVertices[i + 1];
                        u = meshUVs[i];
                        v = meshUVs[i + 1];
                        // xy
                        vertices[iD + 0] = a * x + c * y + tx;
                        vertices[iD + 1] = b * x + d * y + ty;
                        // uv
                        vertices[iD + 2] = (sourceX + u * sourceWidth) / textureSourceWidth;
                        vertices[iD + 3] = (sourceY + v * sourceHeight) / textureSourceHeight;
                        // alpha
                        vertices[iD + 4] = alpha;
                    }
                    for (i = 0; i < meshIndices.length; i++) {
                        this.indicesForMesh[i] = meshIndices[i];
                    }
                }
                else {
                    console.log("meshVertices not exist");
                }
            };
            /**
             * @private
             * 基于指定的源图象(BitmapData)创建一个模板，通过repetition参数指定源图像在什么方向上进行重复，返回一个GraphicsPattern对象。
             * @param bitmapData 做为重复图像源的 BitmapData 对象。
             * @param repetition 指定如何重复图像。
             * 可能的值有："repeat" (两个方向重复),"repeat-x" (仅水平方向重复),"repeat-y" (仅垂直方向重复),"no-repeat" (不重复).
             * @version Egret 2.4
             * @platform Web,Native
             */
            NativeCanvasRenderContext.prototype.createPattern = function (image, repetition) {
                return null;
            };
            /**
             * @private
             * 返回一个 ImageData 对象，用来描述canvas区域隐含的像素数据，这个区域通过矩形表示，起始点为(sx, sy)、宽为sw、高为sh。
             * @version Egret 2.4
             * @platform Web,Native
             */
            NativeCanvasRenderContext.prototype.getImageData = function (sx, sy, sw, sh) {
                native.$cmdManager.flush();
                var res;
                if (sx != Math.floor(sx)) {
                    sx = Math.floor(sx);
                    sw++;
                }
                if (sy != Math.floor(sy)) {
                    sy = Math.floor(sy);
                    sh++;
                }
                res = this.$nativeContext.getPixels(sx, sy, sw, sh);
                if (res.pixelData) {
                    res.data = res.pixelData;
                }
                return res;
            };
            /**
             * @private
             * 设置全局shader
             * @param filter filter属性生成的json
             */
            NativeCanvasRenderContext.prototype.setGlobalShader = function (filter) {
                native.$cmdManager.setContext(this.$nativeContext);
                var s1;
                if (filter) {
                    s1 = native.$cmdManager.pushString(filter.$toJson());
                }
                else {
                    s1 = native.$cmdManager.pushString("");
                }
                native.$cmdManager.setGlobalShader(s1);
            };
            return NativeCanvasRenderContext;
        }(egret.HashObject));
        native.NativeCanvasRenderContext = NativeCanvasRenderContext;
        __reflect(NativeCanvasRenderContext.prototype, "egret.native.NativeCanvasRenderContext");
    })(native = egret.native || (egret.native = {}));
})(egret || (egret = {}));
//# sourceMappingURL=NativeCanvasRenderContext.js.map