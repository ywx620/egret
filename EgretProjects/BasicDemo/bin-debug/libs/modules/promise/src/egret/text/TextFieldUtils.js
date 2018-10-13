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
    /**
     * @private
     * @version Egret 2.4
     * @platform Web,Native
     */
    var TextFieldUtils = (function () {
        function TextFieldUtils() {
        }
        /**
         * 获取第一个绘制的行数
         * @param textfield 文本
         * @returns {number} 行数，从0开始
         * @private
         */
        TextFieldUtils.$getStartLine = function (textfield) {
            var values = textfield.$TextField;
            var textHeight = TextFieldUtils.$getTextHeight(textfield);
            var startLine = 0;
            var textFieldHeight = values[4 /* textFieldHeight */];
            if (!isNaN(textFieldHeight)) {
                if (textHeight < textFieldHeight) {
                }
                else if (textHeight > textFieldHeight) {
                    startLine = Math.max(values[28 /* scrollV */] - 1, 0);
                    startLine = Math.min(values[29 /* numLines */] - 1, startLine);
                }
                if (!values[30 /* multiline */]) {
                    startLine = Math.max(values[28 /* scrollV */] - 1, 0);
                    if (values[29 /* numLines */] > 0) {
                        startLine = Math.min(values[29 /* numLines */] - 1, startLine);
                    }
                }
            }
            return startLine;
        };
        /**
         * 获取水平比例
         * @param textfield 文本
         * @returns {number} 水平比例
         * @private
         */
        TextFieldUtils.$getHalign = function (textfield) {
            var lineArr = textfield.$getLinesArr();
            var halign = 0;
            if (textfield.$TextField[9 /* textAlign */] == egret.HorizontalAlign.CENTER) {
                halign = 0.5;
            }
            else if (textfield.$TextField[9 /* textAlign */] == egret.HorizontalAlign.RIGHT) {
                halign = 1;
            }
            if (textfield.$TextField[24 /* type */] == egret.TextFieldType.INPUT && !textfield.$TextField[30 /* multiline */] && lineArr.length > 1) {
                halign = 0;
            }
            return halign;
        };
        /**
         * @private
         *
         * @param textfield
         * @returns
         */
        TextFieldUtils.$getTextHeight = function (textfield) {
            var textHeight = (egret.TextFieldType.INPUT == textfield.$TextField[24 /* type */]
                && !textfield.$TextField[30 /* multiline */]) ? textfield.$TextField[0 /* fontSize */] : (textfield.$TextField[6 /* textHeight */] + (textfield.$TextField[29 /* numLines */] - 1) * textfield.$TextField[1 /* lineSpacing */]);
            return textHeight;
        };
        /**
         * 获取垂直比例
         * @param textfield 文本
         * @returns {number} 垂直比例
         * @private
         */
        TextFieldUtils.$getValign = function (textfield) {
            var textHeight = TextFieldUtils.$getTextHeight(textfield);
            //if (textfield.$TextField[sys.TextKeys.type] == egret.TextFieldType.INPUT) {
            //    if (textfield.$TextField[sys.TextKeys.multiline]) {
            //return 0;
            //}
            //return 0.5;
            //}
            var textFieldHeight = textfield.$TextField[4 /* textFieldHeight */];
            if (!isNaN(textFieldHeight)) {
                if (textHeight < textFieldHeight) {
                    var valign = 0;
                    if (textfield.$TextField[10 /* verticalAlign */] == egret.VerticalAlign.MIDDLE)
                        valign = 0.5;
                    else if (textfield.$TextField[10 /* verticalAlign */] == egret.VerticalAlign.BOTTOM)
                        valign = 1;
                    return valign;
                }
            }
            return 0;
        };
        /**
         * 根据x、y获取文本项
         * @param textfield 文本
         * @param x x坐标值
         * @param y y坐标值
         * @returns 文本单项
         * @private
         */
        TextFieldUtils.$getTextElement = function (textfield, x, y) {
            var hitTextEle = TextFieldUtils.$getHit(textfield, x, y);
            var lineArr = textfield.$getLinesArr();
            if (hitTextEle && lineArr[hitTextEle.lineIndex] && lineArr[hitTextEle.lineIndex].elements[hitTextEle.textElementIndex]) {
                return lineArr[hitTextEle.lineIndex].elements[hitTextEle.textElementIndex];
            }
            return null;
        };
        /**
         * 获取文本点击块
         * @param textfield 文本
         * @param x x坐标值
         * @param y y坐标值
         * @returns 文本点击块
         * @private
         */
        TextFieldUtils.$getHit = function (textfield, x, y) {
            var lineArr = textfield.$getLinesArr();
            if (textfield.$TextField[3 /* textFieldWidth */] == 0) {
                return null;
            }
            var line = 0;
            var textHeight = TextFieldUtils.$getTextHeight(textfield);
            var startY = 0;
            var textFieldHeight = textfield.$TextField[4 /* textFieldHeight */];
            if (!isNaN(textFieldHeight) && textFieldHeight > textHeight) {
                var valign = TextFieldUtils.$getValign(textfield);
                startY = valign * (textFieldHeight - textHeight);
                if (startY != 0) {
                    y -= startY;
                }
            }
            var startLine = TextFieldUtils.$getStartLine(textfield);
            var lineH = 0;
            for (var i = startLine; i < lineArr.length; i++) {
                var lineEle = lineArr[i];
                if (lineH + lineEle.height >= y) {
                    if (lineH < y) {
                        line = i + 1;
                    }
                    break;
                }
                else {
                    lineH += lineEle.height;
                }
                if (lineH + textfield.$TextField[1 /* lineSpacing */] > y) {
                    return null;
                }
                lineH += textfield.$TextField[1 /* lineSpacing */];
            }
            if (line == 0) {
                return null;
            }
            var lineElement = lineArr[line - 1];
            var textFieldWidth = textfield.$TextField[3 /* textFieldWidth */];
            if (isNaN(textFieldWidth)) {
                textFieldWidth = textfield.textWidth;
            }
            var halign = TextFieldUtils.$getHalign(textfield);
            x -= halign * (textFieldWidth - lineElement.width);
            var lineW = 0;
            for (var i = 0; i < lineElement.elements.length; i++) {
                var iwTE = lineElement.elements[i];
                if (lineW + iwTE.width <= x) {
                    lineW += iwTE.width;
                }
                else if (lineW < x) {
                    return { "lineIndex": line - 1, "textElementIndex": i };
                }
            }
            return null;
        };
        /**
         * 获取当前显示多少行
         * @param textfield 文本
         * @returns {number} 显示的行数
         * @private
         */
        TextFieldUtils.$getScrollNum = function (textfield) {
            var scrollNum = 1;
            if (textfield.$TextField[30 /* multiline */]) {
                var height = textfield.height;
                var size = textfield.size;
                var lineSpacing = textfield.lineSpacing;
                scrollNum = Math.floor(height / (size + lineSpacing));
                var leftH = height - (size + lineSpacing) * scrollNum;
                if (leftH > size / 2) {
                    scrollNum++;
                }
            }
            return scrollNum;
        };
        return TextFieldUtils;
    }());
    egret.TextFieldUtils = TextFieldUtils;
    __reflect(TextFieldUtils.prototype, "egret.TextFieldUtils");
})(egret || (egret = {}));
//# sourceMappingURL=TextFieldUtils.js.map