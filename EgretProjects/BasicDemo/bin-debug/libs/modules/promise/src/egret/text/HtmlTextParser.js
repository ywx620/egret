var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
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
    /**
     * Convert the text in html format to the object that can be assigned to the egret.TextField#textFlow property
     * @see http://edn.egret.com/cn/docs/page/146 Text mixed in a variety of style
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/text/HtmlTextParser.ts
     * @language en_US
     */
    /**
     * 将html格式文本转换为可赋值给 egret.TextField#textFlow 属性的对象
     * @see http://edn.egret.com/cn/docs/page/146 多种样式文本混合
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/text/HtmlTextParser.ts
     * @language zh_CN
     */
    var HtmlTextParser = (function () {
        /**
         * @version Egret 2.4
         * @platform Web,Native
         */
        function HtmlTextParser() {
            this.replaceArr = [];
            /**
             * @private
             */
            this.resutlArr = [];
            this.initReplaceArr();
        }
        HtmlTextParser.prototype.initReplaceArr = function () {
            this.replaceArr = [];
            this.replaceArr.push([/&lt;/g, "<"]);
            this.replaceArr.push([/&gt;/g, ">"]);
            this.replaceArr.push([/&amp;/g, "&"]);
            this.replaceArr.push([/&quot;/g, "\""]);
            this.replaceArr.push([/&apos;/g, "\'"]);
        };
        /**
         * @private
         *
         * @param value
         * @returns
         */
        HtmlTextParser.prototype.replaceSpecial = function (value) {
            for (var i = 0; i < this.replaceArr.length; i++) {
                var k = this.replaceArr[i][0];
                var v = this.replaceArr[i][1];
                value = value.replace(k, v);
            }
            return value;
        };
        /**
         * Convert the text in html format to the object that can be assigned to the egret.TextField#textFlow property
         * @param htmltext {string} Text in html
         * @returns {Array<egret.ITextElement>} 可赋值给 egret.TextField#textFlow Object that can be assigned to the egret.TextField#textFlow property
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 将html格式文本转换为可赋值给 egret.TextField#textFlow 属性的对象
         * @param htmltext {string} html文本
         * @returns {Array<egret.ITextElement>} 可赋值给 egret.TextField#textFlow 属性的对象
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        HtmlTextParser.prototype.parse = function (htmltext) {
            this.stackArray = [];
            this.resutlArr = [];
            var firstIdx = 0; //文本段开始位置
            var length = htmltext.length;
            while (firstIdx < length) {
                var starIdx = htmltext.indexOf("<", firstIdx);
                if (starIdx < 0) {
                    this.addToResultArr(htmltext.substring(firstIdx));
                    firstIdx = length;
                }
                else {
                    this.addToResultArr(htmltext.substring(firstIdx, starIdx));
                    var fontEnd = htmltext.indexOf(">", starIdx);
                    if (fontEnd == -1) {
                        egret.$error(1038);
                        fontEnd = starIdx;
                    }
                    else if (htmltext.charAt(starIdx + 1) == "\/") {
                        this.stackArray.pop();
                    }
                    else {
                        this.addToArray(htmltext.substring(starIdx + 1, fontEnd));
                    }
                    firstIdx = fontEnd + 1;
                }
            }
            return this.resutlArr;
        };
        HtmlTextParser.prototype.parser = function (htmltext) {
            return this.parse(htmltext);
        };
        /**
         * @private
         *
         * @param value
         */
        HtmlTextParser.prototype.addToResultArr = function (value) {
            if (value == "") {
                return;
            }
            value = this.replaceSpecial(value);
            if (this.stackArray.length > 0) {
                this.resutlArr.push({ text: value, style: this.stackArray[this.stackArray.length - 1] });
            }
            else {
                this.resutlArr.push({ text: value });
            }
        };
        //将字符数据转成Json数据
        HtmlTextParser.prototype.changeStringToObject = function (str) {
            str = str.trim();
            var info = {};
            var header = [];
            if (str.charAt(0) == "i" || str.charAt(0) == "b" || str.charAt(0) == "u") {
                this.addProperty(info, str, "true");
            }
            else if (header = str.match(/^(font|a)\s/)) {
                str = str.substring(header[0].length).trim();
                var next = 0;
                var titles = void 0;
                while (titles = str.match(this.getHeadReg())) {
                    var title = titles[0];
                    var value = "";
                    str = str.substring(title.length).trim();
                    if (str.charAt(0) == "\"") {
                        next = str.indexOf("\"", 1);
                        value = str.substring(1, next);
                        next += 1;
                    }
                    else if (str.charAt(0) == "\'") {
                        next = str.indexOf("\'", 1);
                        value = str.substring(1, next);
                        next += 1;
                    }
                    else {
                        value = str.match(/(\S)+/)[0];
                        next = value.length;
                    }
                    this.addProperty(info, title.substring(0, title.length - 1).trim(), value.trim());
                    str = str.substring(next).trim();
                }
            }
            return info;
        };
        /**
         * @private
         *
         * @returns
         */
        HtmlTextParser.prototype.getHeadReg = function () {
            return /^(color|textcolor|strokecolor|stroke|b|bold|i|italic|u|size|fontfamily|href|target)(\s)*=/;
        };
        /**
         * @private
         *
         * @param info
         * @param head
         * @param value
         */
        HtmlTextParser.prototype.addProperty = function (info, head, value) {
            switch (head.toLowerCase()) {
                case "color":
                case "textcolor":
                    value = value.replace(/#/, "0x");
                    info.textColor = parseInt(value);
                    break;
                case "strokecolor":
                    value = value.replace(/#/, "0x");
                    info.strokeColor = parseInt(value);
                    break;
                case "stroke":
                    info.stroke = parseInt(value);
                    break;
                case "b":
                case "bold":
                    info.bold = value == "true";
                    break;
                case "u":
                    info.underline = value == "true";
                    break;
                case "i":
                case "italic":
                    info.italic = value == "true";
                    break;
                case "size":
                    info.size = parseInt(value);
                    break;
                case "fontfamily":
                    info.fontFamily = value;
                    break;
                case "href":
                    info.href = this.replaceSpecial(value);
                    break;
                case "target":
                    info.target = this.replaceSpecial(value);
                    break;
            }
        };
        /**
         * @private
         *
         * @param infoStr
         */
        HtmlTextParser.prototype.addToArray = function (infoStr) {
            var info = this.changeStringToObject(infoStr);
            if (this.stackArray.length == 0) {
                this.stackArray.push(info);
            }
            else {
                var lastInfo = this.stackArray[this.stackArray.length - 1];
                for (var key in lastInfo) {
                    if (info[key] == null) {
                        info[key] = lastInfo[key];
                    }
                }
                this.stackArray.push(info);
            }
        };
        return HtmlTextParser;
    }());
    egret.HtmlTextParser = HtmlTextParser;
    __reflect(HtmlTextParser.prototype, "egret.HtmlTextParser");
})(egret || (egret = {}));
//# sourceMappingURL=HtmlTextParser.js.map