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
    var sys;
    (function (sys) {
        /**
         * @private
         * 2D路径
         */
        var Path2D = (function () {
            function Path2D() {
                /**
                 * 路径类型
                 */
                this.type = 0;
                this.$commands = [];
                this.$data = [];
                this.commandPosition = 0;
                this.dataPosition = 0;
                /**
                 * 当前移动到的坐标X
                 * 注意：目前只有drawArc之前会被赋值
                 */
                this.$lastX = 0;
                /**
                 * 当前移动到的坐标Y
                 * 注意：目前只有drawArc之前会被赋值
                 */
                this.$lastY = 0;
            }
            /**
             * 将当前绘图位置移动到 (x, y)。如果缺少任何一个参数，则此方法将失败，并且当前绘图位置不改变。
             * @param x 一个表示相对于父显示对象注册点的水平位置的数字（以像素为单位）。
             * @param y 一个表示相对于父显示对象注册点的垂直位置的数字（以像素为单位）。
             */
            Path2D.prototype.moveTo = function (x, y) {
                this.$commands[this.commandPosition++] = 1 /* MoveTo */;
                var pos = this.dataPosition;
                this.$data[pos++] = x;
                this.$data[pos++] = y;
                this.dataPosition = pos;
            };
            /**
             * 使用当前线条样式绘制一条从当前绘图位置开始到 (x, y) 结束的直线；当前绘图位置随后会设置为 (x, y)。
             * @param x 一个表示相对于父显示对象注册点的水平位置的数字（以像素为单位）。
             * @param y 一个表示相对于父显示对象注册点的垂直位置的数字（以像素为单位）。
             */
            Path2D.prototype.lineTo = function (x, y) {
                this.$commands[this.commandPosition++] = 2 /* LineTo */;
                var pos = this.dataPosition;
                this.$data[pos++] = x;
                this.$data[pos++] = y;
                this.dataPosition = pos;
            };
            /**
             * 使用当前线条样式和由 (controlX, controlY) 指定的控制点绘制一条从当前绘图位置开始到 (anchorX, anchorY) 结束的二次贝塞尔曲线。当前绘图位置随后设置为 (anchorX, anchorY)。
             * 如果在调用 moveTo() 方法之前调用了 curveTo() 方法，则当前绘图位置的默认值为 (0, 0)。如果缺少任何一个参数，则此方法将失败，并且当前绘图位置不改变。
             * 绘制的曲线是二次贝塞尔曲线。二次贝塞尔曲线包含两个锚点和一个控制点。该曲线内插这两个锚点，并向控制点弯曲。
             * @param controlX 一个数字，指定控制点相对于父显示对象注册点的水平位置。
             * @param controlY 一个数字，指定控制点相对于父显示对象注册点的垂直位置。
             * @param anchorX 一个数字，指定下一个锚点相对于父显示对象注册点的水平位置。
             * @param anchorY 一个数字，指定下一个锚点相对于父显示对象注册点的垂直位置。
             */
            Path2D.prototype.curveTo = function (controlX, controlY, anchorX, anchorY) {
                this.$commands[this.commandPosition++] = 3 /* CurveTo */;
                var pos = this.dataPosition;
                this.$data[pos++] = controlX;
                this.$data[pos++] = controlY;
                this.$data[pos++] = anchorX;
                this.$data[pos++] = anchorY;
                this.dataPosition = pos;
            };
            /**
             * 从当前绘图位置到指定的锚点绘制一条三次贝塞尔曲线。三次贝塞尔曲线由两个锚点和两个控制点组成。该曲线内插这两个锚点，并向两个控制点弯曲。
             * @param controlX1 指定首个控制点相对于父显示对象的注册点的水平位置。
             * @param controlY1 指定首个控制点相对于父显示对象的注册点的垂直位置。
             * @param controlX2 指定第二个控制点相对于父显示对象的注册点的水平位置。
             * @param controlY2 指定第二个控制点相对于父显示对象的注册点的垂直位置。
             * @param anchorX 指定锚点相对于父显示对象的注册点的水平位置。
             * @param anchorY 指定锚点相对于父显示对象的注册点的垂直位置。
             */
            Path2D.prototype.cubicCurveTo = function (controlX1, controlY1, controlX2, controlY2, anchorX, anchorY) {
                this.$commands[this.commandPosition++] = 4 /* CubicCurveTo */;
                var pos = this.dataPosition;
                this.$data[pos++] = controlX1;
                this.$data[pos++] = controlY1;
                this.$data[pos++] = controlX2;
                this.$data[pos++] = controlY2;
                this.$data[pos++] = anchorX;
                this.$data[pos++] = anchorY;
                this.dataPosition = pos;
            };
            /**
             * 绘制一个矩形
             * @param x 圆心相对于父显示对象注册点的 x 位置（以像素为单位）。
             * @param y 相对于父显示对象注册点的圆心的 y 位置（以像素为单位）。
             * @param width 矩形的宽度（以像素为单位）。
             * @param height 矩形的高度（以像素为单位）。
             */
            Path2D.prototype.drawRect = function (x, y, width, height) {
                var x2 = x + width;
                var y2 = y + height;
                this.moveTo(x, y);
                this.lineTo(x2, y);
                this.lineTo(x2, y2);
                this.lineTo(x, y2);
                this.lineTo(x, y);
            };
            /**
             * 绘制一个圆角矩形。
             * @param x 圆心相对于父显示对象注册点的 x 位置（以像素为单位）。
             * @param y 相对于父显示对象注册点的圆心的 y 位置（以像素为单位）。
             * @param width 矩形的宽度（以像素为单位）。
             * @param height 矩形的高度（以像素为单位）。
             * @param ellipseWidth 用于绘制圆角的椭圆的宽度（以像素为单位）。
             * @param ellipseHeight 用于绘制圆角的椭圆的高度（以像素为单位）。 （可选）如果未指定值，则默认值与为 ellipseWidth 参数提供的值相匹配。
             */
            Path2D.prototype.drawRoundRect = function (x, y, width, height, ellipseWidth, ellipseHeight) {
                var radiusX = (ellipseWidth * 0.5) | 0;
                var radiusY = ellipseHeight ? (ellipseHeight * 0.5) | 0 : radiusX;
                if (!radiusX || !radiusY) {
                    this.drawRect(x, y, width, height);
                    return;
                }
                var hw = width * 0.5;
                var hh = height * 0.5;
                if (radiusX > hw) {
                    radiusX = hw;
                }
                if (radiusY > hh) {
                    radiusY = hh;
                }
                if (hw === radiusX && hh === radiusY) {
                    if (radiusX === radiusY) {
                        this.drawCircle(x + radiusX, y + radiusY, radiusX);
                    }
                    else {
                        this.drawEllipse(x, y, radiusX * 2, radiusY * 2);
                    }
                    return;
                }
                //    A-----B
                //  H         C
                //  G         D
                //    F-----E
                // 从D点开始，结束在D点
                var right = x + width;
                var bottom = y + height;
                var xlw = x + radiusX;
                var xrw = right - radiusX;
                var ytw = y + radiusY;
                var ybw = bottom - radiusY;
                this.moveTo(right, ybw);
                this.curveTo(right, bottom, xrw, bottom);
                this.lineTo(xlw, bottom);
                this.curveTo(x, bottom, x, ybw);
                this.lineTo(x, ytw);
                this.curveTo(x, y, xlw, y);
                this.lineTo(xrw, y);
                this.curveTo(right, y, right, ytw);
                this.lineTo(right, ybw);
            };
            /**
             * 绘制一个圆。
             * @param x 圆心相对于父显示对象注册点的 x 位置（以像素为单位）。
             * @param y 相对于父显示对象注册点的圆心的 y 位置（以像素为单位）。
             * @param radius 圆的半径（以像素为单位）。
             */
            Path2D.prototype.drawCircle = function (x, y, radius) {
                this.arcToBezier(x, y, radius, radius, 0, Math.PI * 2);
            };
            /**
             * 绘制一个椭圆。
             * @param x 一个表示相对于父显示对象注册点的水平位置的数字（以像素为单位）。
             * @param y 一个表示相对于父显示对象注册点的垂直位置的数字（以像素为单位）。
             * @param width 矩形的宽度（以像素为单位）。
             * @param height 矩形的高度（以像素为单位）。
             */
            Path2D.prototype.drawEllipse = function (x, y, width, height) {
                var radiusX = width * 0.5;
                var radiusY = height * 0.5;
                // 移动x和y到椭圆的中心.
                x += radiusX;
                y += radiusY;
                this.arcToBezier(x, y, radiusX, radiusY, 0, Math.PI * 2);
            };
            /**
             * 绘制一段圆弧路径。圆弧路径的圆心在 (x, y) 位置，半径为 r ，根据anticlockwise （默认为顺时针）指定的方向从 startAngle 开始绘制，到 endAngle 结束。
             * @param x 圆弧中心（圆心）的 x 轴坐标。
             * @param y 圆弧中心（圆心）的 y 轴坐标。
             * @param radius 圆弧的半径。
             * @param startAngle 圆弧的起始点， x轴方向开始计算，单位以弧度表示。
             * 注意，必须在0~2π之间。
             * @param endAngle 圆弧的终点， 单位以弧度表示。
             * 注意，必须在0~2π之间。
             * @param anticlockwise 如果为 true，逆时针绘制圆弧，反之，顺时针绘制。
             */
            Path2D.prototype.drawArc = function (x, y, radius, startAngle, endAngle, anticlockwise) {
                if (anticlockwise) {
                    if (endAngle >= startAngle) {
                        endAngle -= Math.PI * 2;
                    }
                }
                else {
                    if (endAngle <= startAngle) {
                        endAngle += Math.PI * 2;
                    }
                }
                this.arcToBezier(x, y, radius, radius, startAngle, endAngle, anticlockwise);
            };
            /**
             * 绘制一段圆弧路径
             * @param x 圆弧中心（圆心）的 x 轴坐标。
             * @param y 圆弧中心（圆心）的 y 轴坐标。
             * @param radiusX 圆弧的半径 x。
             * @param radiusY 圆弧的半径 y。
             * @param startAngle 圆弧的起始点， x轴方向开始计算，单位以弧度表示。
             * 注意：必须为正数。
             * @param endAngle 圆弧的终点， 单位以弧度表示。
             * 注意：与startAngle差值必须在0~2π之间。
             * @param anticlockwise 如果为 true，逆时针绘制圆弧，反之，顺时针绘制。
             * 注意：如果为true，endAngle必须小于startAngle，反之必须大于。
             */
            Path2D.prototype.arcToBezier = function (x, y, radiusX, radiusY, startAngle, endAngle, anticlockwise) {
                var halfPI = Math.PI * 0.5;
                var start = startAngle;
                var end = start;
                if (anticlockwise) {
                    end += -halfPI - (start % halfPI);
                    if (end < endAngle) {
                        end = endAngle;
                    }
                }
                else {
                    end += halfPI - (start % halfPI);
                    if (end > endAngle) {
                        end = endAngle;
                    }
                }
                var currentX = x + Math.cos(start) * radiusX;
                var currentY = y + Math.sin(start) * radiusY;
                if (this.$lastX != currentX || this.$lastY != currentY) {
                    this.moveTo(currentX, currentY);
                }
                var u = Math.cos(start);
                var v = Math.sin(start);
                for (var i = 0; i < 4; i++) {
                    var addAngle = end - start;
                    var a = 4 * Math.tan(addAngle / 4) / 3;
                    var x1 = currentX - v * a * radiusX;
                    var y1 = currentY + u * a * radiusY;
                    u = Math.cos(end);
                    v = Math.sin(end);
                    currentX = x + u * radiusX;
                    currentY = y + v * radiusY;
                    var x2 = currentX + v * a * radiusX;
                    var y2 = currentY - u * a * radiusY;
                    this.cubicCurveTo(x1, y1, x2, y2, currentX, currentY);
                    if (end === endAngle) {
                        break;
                    }
                    start = end;
                    if (anticlockwise) {
                        end = start - halfPI;
                        if (end < endAngle) {
                            end = endAngle;
                        }
                    }
                    else {
                        end = start + halfPI;
                        if (end > endAngle) {
                            end = endAngle;
                        }
                    }
                }
            };
            return Path2D;
        }());
        sys.Path2D = Path2D;
        __reflect(Path2D.prototype, "egret.sys.Path2D");
    })(sys = egret.sys || (egret.sys = {}));
})(egret || (egret = {}));
//# sourceMappingURL=Path2D.js.map