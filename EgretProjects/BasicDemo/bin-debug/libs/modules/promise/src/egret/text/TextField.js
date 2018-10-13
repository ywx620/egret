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
    var SplitRegex = new RegExp("(?=[\\u00BF-\\u1FFF\\u2C00-\\uD7FF]|\\b|\\s)(?![。，！、》…）)}”】\\.\\,\\!\\?\\]\\:])");
    /**
     * @private
     * 根据样式测量文本宽度
     */
    function measureTextWidth(text, values, style) {
        style = style || {};
        var italic = style.italic == null ? values[16 /* italic */] : style.italic;
        var bold = style.bold == null ? values[15 /* bold */] : style.bold;
        var size = style.size == null ? values[0 /* fontSize */] : style.size;
        var fontFamily = style.fontFamily || values[8 /* fontFamily */] || TextField.default_fontFamily;
        return egret.sys.measureText(text, fontFamily, size, bold, italic);
    }
    /**
     * TextField is the text rendering class of egret. It conducts rendering by using the browser / device API. Due to different ways of font rendering in different browsers / devices, there may be differences in the rendering
     * If developers expect  no differences among all platforms, please use BitmapText
     * @see http://edn.egret.com/cn/docs/page/141 Create Text
     *
     * @event egret.Event.CHANGE Dispatched when entering text user input。
     * @event egret.FocusEvent.FOCUS_IN Dispatched after the focus to enter text.
     * @event egret.FocusEvent.FOCUS_OUT Enter the text loses focus after dispatch.
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/text/TextField.ts
     * @language en_US
     */
    /**
     * TextField是egret的文本渲染类，采用浏览器/设备的API进行渲染，在不同的浏览器/设备中由于字体渲染方式不一，可能会有渲染差异
     * 如果开发者希望所有平台完全无差异，请使用BitmapText
     * @see http://edn.egret.com/cn/docs/page/141 创建文本
     *
     * @event egret.Event.CHANGE 输入文本有用户输入时调度。
     * @event egret.FocusEvent.FOCUS_IN 聚焦输入文本后调度。
     * @event egret.FocusEvent.FOCUS_OUT 输入文本失去焦点后调度。
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/text/TextField.ts
     * @language zh_CN
     */
    var TextField = (function (_super) {
        __extends(TextField, _super);
        /**
         * @version Egret 2.4
         * @platform Web,Native
         */
        function TextField() {
            var _this = _super.call(this) || this;
            _this.$inputEnabled = false;
            /**
             * @private
             */
            _this.inputUtils = null;
            /**
             * @private
             */
            _this.graphicsNode = null;
            /**
             * @private
             */
            _this.isFlow = false;
            /**
             * @private
             */
            _this.textArr = [];
            /**
             * @private
             */
            _this.linesArr = [];
            /**
             * @private
             */
            _this.$isTyping = false;
            var textNode = new egret.sys.TextNode();
            textNode.fontFamily = TextField.default_fontFamily;
            _this.textNode = textNode;
            _this.$renderNode = textNode;
            _this.$TextField = {
                0: TextField.default_size,
                1: 0,
                2: TextField.default_textColor,
                3: NaN,
                4: NaN,
                5: 0,
                6: 0,
                7: 0,
                8: TextField.default_fontFamily,
                9: "left",
                10: "top",
                11: "#ffffff",
                12: "",
                13: "",
                14: [],
                15: false,
                16: false,
                17: true,
                18: false,
                19: false,
                20: false,
                21: 0,
                22: 0,
                23: 0,
                24: egret.TextFieldType.DYNAMIC,
                25: 0x000000,
                26: "#000000",
                27: 0,
                28: -1,
                29: 0,
                30: false,
                31: false,
                32: 0x000000,
                33: false,
                34: 0xffffff,
                35: null,
                36: null,
                37: egret.TextFieldInputType.TEXT //inputType
            };
            return _this;
        }
        /**
         * @private
         */
        TextField.prototype.isInput = function () {
            return this.$TextField[24 /* type */] == egret.TextFieldType.INPUT;
        };
        TextField.prototype.$setTouchEnabled = function (value) {
            var result = _super.prototype.$setTouchEnabled.call(this, value);
            if (this.isInput()) {
                this.$inputEnabled = true;
            }
            return result;
        };
        Object.defineProperty(TextField.prototype, "fontFamily", {
            /**
             * The name of the font to use, or a comma-separated list of font names.
             * @default "Arial"
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 要使用的字体的名称或用逗号分隔的字体名称列表。
             * @default "Arial"
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this.$TextField[8 /* fontFamily */];
            },
            set: function (value) {
                this.$setFontFamily(value);
            },
            enumerable: true,
            configurable: true
        });
        TextField.prototype.$setFontFamily = function (value) {
            var values = this.$TextField;
            if (values[8 /* fontFamily */] == value) {
                return false;
            }
            values[8 /* fontFamily */] = value;
            this.invalidateFontString();
            return true;
        };
        Object.defineProperty(TextField.prototype, "size", {
            /**
             * The size in pixels of text
             * @default 30
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 文本的字号大小。
             * @default 30
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this.$TextField[0 /* fontSize */];
            },
            set: function (value) {
                this.$setSize(value);
            },
            enumerable: true,
            configurable: true
        });
        TextField.prototype.$setSize = function (value) {
            value = +value || 0;
            var values = this.$TextField;
            if (values[0 /* fontSize */] == value) {
                return false;
            }
            values[0 /* fontSize */] = value;
            this.invalidateFontString();
            return true;
        };
        Object.defineProperty(TextField.prototype, "bold", {
            /**
             * Specifies whether the text is boldface.
             * @default false
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 是否显示为粗体。
             * @default false
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this.$TextField[15 /* bold */];
            },
            set: function (value) {
                this.$setBold(value);
            },
            enumerable: true,
            configurable: true
        });
        TextField.prototype.$setBold = function (value) {
            value = !!value;
            var values = this.$TextField;
            if (value == values[15 /* bold */]) {
                return false;
            }
            values[15 /* bold */] = value;
            this.invalidateFontString();
            return true;
        };
        Object.defineProperty(TextField.prototype, "italic", {
            /**
             * Determines whether the text is italic font.
             * @default false
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 是否显示为斜体。
             * @default false
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this.$TextField[16 /* italic */];
            },
            set: function (value) {
                this.$setItalic(value);
            },
            enumerable: true,
            configurable: true
        });
        TextField.prototype.$setItalic = function (value) {
            value = !!value;
            var values = this.$TextField;
            if (value == values[16 /* italic */]) {
                return false;
            }
            values[16 /* italic */] = value;
            this.invalidateFontString();
            return true;
        };
        /**
         * @private
         *
         */
        TextField.prototype.invalidateFontString = function () {
            this.$TextField[17 /* fontStringChanged */] = true;
            this.$invalidateTextField();
        };
        Object.defineProperty(TextField.prototype, "textAlign", {
            /**
             * Horizontal alignment of text.
             * @default：egret.HorizontalAlign.LEFT
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 文本的水平对齐方式。
             * @default：egret.HorizontalAlign.LEFT
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this.$TextField[9 /* textAlign */];
            },
            set: function (value) {
                this.$setTextAlign(value);
            },
            enumerable: true,
            configurable: true
        });
        TextField.prototype.$setTextAlign = function (value) {
            var values = this.$TextField;
            if (values[9 /* textAlign */] == value) {
                return false;
            }
            values[9 /* textAlign */] = value;
            this.$invalidateTextField();
            return true;
        };
        Object.defineProperty(TextField.prototype, "verticalAlign", {
            /**
             * Vertical alignment of text.
             * @default：egret.VerticalAlign.TOP
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 文字的垂直对齐方式。
             * @default：egret.VerticalAlign.TOP
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this.$TextField[10 /* verticalAlign */];
            },
            set: function (value) {
                this.$setVerticalAlign(value);
            },
            enumerable: true,
            configurable: true
        });
        TextField.prototype.$setVerticalAlign = function (value) {
            var values = this.$TextField;
            if (values[10 /* verticalAlign */] == value) {
                return false;
            }
            values[10 /* verticalAlign */] = value;
            this.$invalidateTextField();
            return true;
        };
        Object.defineProperty(TextField.prototype, "lineSpacing", {
            /**
             * An integer representing the amount of vertical space between lines.
             * @default 0
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 一个整数，表示行与行之间的垂直间距量
             * @default 0
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this.$TextField[1 /* lineSpacing */];
            },
            set: function (value) {
                this.$setLineSpacing(value);
            },
            enumerable: true,
            configurable: true
        });
        TextField.prototype.$setLineSpacing = function (value) {
            value = +value || 0;
            var values = this.$TextField;
            if (values[1 /* lineSpacing */] == value)
                return false;
            values[1 /* lineSpacing */] = value;
            this.$invalidateTextField();
            return true;
        };
        Object.defineProperty(TextField.prototype, "textColor", {
            /**
             * Color of the text.
             * @default 0x000000
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 文本颜色
             * @default 0x000000
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this.$TextField[2 /* textColor */];
            },
            set: function (value) {
                this.$setTextColor(value);
            },
            enumerable: true,
            configurable: true
        });
        TextField.prototype.$setTextColor = function (value) {
            value = +value | 0;
            var values = this.$TextField;
            if (values[2 /* textColor */] == value) {
                return false;
            }
            values[2 /* textColor */] = value;
            if (this.inputUtils) {
                this.inputUtils._setColor(this.$TextField[2 /* textColor */]);
            }
            this.$invalidate();
            return true;
        };
        Object.defineProperty(TextField.prototype, "wordWrap", {
            /**
             * A Boolean value that indicates whether the text field word wrap. If the value is true, then the text field by word wrap;
             * if the value is false, the text field by newline characters.
             * @default false
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 一个布尔值，表示文本字段是否按单词换行。如果值为 true，则该文本字段按单词换行；
             * 如果值为 false，则该文本字段按字符换行。
             * @default false
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this.$TextField[19 /* wordWrap */];
            },
            set: function (value) {
                this.$setWordWrap(value);
            },
            enumerable: true,
            configurable: true
        });
        TextField.prototype.$setWordWrap = function (value) {
            value = !!value;
            var values = this.$TextField;
            if (value == values[19 /* wordWrap */]) {
                return;
            }
            if (values[20 /* displayAsPassword */]) {
                return;
            }
            values[19 /* wordWrap */] = value;
            this.$invalidateTextField();
        };
        Object.defineProperty(TextField.prototype, "type", {
            /**
             * @version Egret 2.4
             * @platform Web,Native
             */
            get: function () {
                return this.$TextField[24 /* type */];
            },
            /**
             * Type of the text field.
             * Any one of the following TextFieldType constants: TextFieldType.DYNAMIC (specifies the dynamic text field that users can not edit), or TextFieldType.INPUT (specifies the dynamic text field that users can edit).
             * @default egret.TextFieldType.DYNAMIC
             * @language en_US
             */
            /**
             * 文本字段的类型。
             * 以下 TextFieldType 常量中的任一个：TextFieldType.DYNAMIC（指定用户无法编辑的动态文本字段），或 TextFieldType.INPUT（指定用户可以编辑的输入文本字段）。
             * @default egret.TextFieldType.DYNAMIC
             * @language zh_CN
             */
            set: function (value) {
                this.$setType(value);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         *
         * @param value
         */
        TextField.prototype.$setType = function (value) {
            var values = this.$TextField;
            if (values[24 /* type */] != value) {
                values[24 /* type */] = value;
                if (value == egret.TextFieldType.INPUT) {
                    if (isNaN(values[3 /* textFieldWidth */])) {
                        this.$setWidth(100);
                    }
                    if (isNaN(values[4 /* textFieldHeight */])) {
                        this.$setHeight(30);
                    }
                    this.$setTouchEnabled(true);
                    //创建stageText
                    if (this.inputUtils == null) {
                        this.inputUtils = new egret.InputController();
                    }
                    this.inputUtils.init(this);
                    this.$invalidateTextField();
                    if (this.$stage) {
                        this.inputUtils._addStageText();
                    }
                }
                else {
                    if (this.inputUtils) {
                        this.inputUtils._removeStageText();
                        this.inputUtils = null;
                    }
                    this.$setTouchEnabled(false);
                }
                return true;
            }
            return false;
        };
        Object.defineProperty(TextField.prototype, "inputType", {
            /**
             * @version Egret 3.1.2
             * @platform Web,Native
             */
            get: function () {
                return this.$TextField[37 /* inputType */];
            },
            /**
             * Pop-up keyboard type.
             * Any of a TextFieldInputType constants.
             * @language en_US
             */
            /**
             * 弹出键盘的类型。
             * TextFieldInputType 常量中的任一个。
             * @language zh_CN
             */
            set: function (value) {
                this.$TextField[37 /* inputType */] = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextField.prototype, "text", {
            /**
             * @version Egret 2.4
             * @platform Web,Native
             */
            get: function () {
                return this.$getText();
            },
            /**
             * Serve as a string of the current text field in the text
             * @language en_US
             */
            /**
             * 作为文本字段中当前文本的字符串
             * @language zh_CN
             */
            set: function (value) {
                this.$setText(value);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         *
         * @returns
         */
        TextField.prototype.$getText = function () {
            if (this.$TextField[24 /* type */] == egret.TextFieldType.INPUT) {
                return this.inputUtils._getText();
            }
            return this.$TextField[13 /* text */];
        };
        /**
         * @private
         *
         * @param value
         */
        TextField.prototype.$setBaseText = function (value) {
            if (value == null) {
                value = "";
            }
            value = value.toString();
            this.isFlow = false;
            var values = this.$TextField;
            if (values[13 /* text */] != value) {
                this.$invalidateTextField();
                values[13 /* text */] = value;
                var text = "";
                if (values[20 /* displayAsPassword */]) {
                    text = this.changeToPassText(value);
                }
                else {
                    text = value;
                }
                this.setMiddleStyle([{ text: text }]);
                return true;
            }
            return false;
        };
        /**
         * @private
         *
         * @param value
         */
        TextField.prototype.$setText = function (value) {
            if (value == null) {
                value = "";
            }
            var result = this.$setBaseText(value);
            if (this.inputUtils) {
                this.inputUtils._setText(this.$TextField[13 /* text */]);
            }
            return result;
        };
        Object.defineProperty(TextField.prototype, "displayAsPassword", {
            /**
             * Specify whether the text field is a password text field.
             * If the value of this property is true, the text field is treated as a password text field and hides the input characters using asterisks instead of the actual characters. If false, the text field is not treated as a password text field.
             * @default false
             * @language en_US
             */
            /**
             * 指定文本字段是否是密码文本字段。
             * 如果此属性的值为 true，则文本字段被视为密码文本字段，并使用星号而不是实际字符来隐藏输入的字符。如果为 false，则不会将文本字段视为密码文本字段。
             * @default false
             * @language zh_CN
             */
            get: function () {
                return this.$TextField[20 /* displayAsPassword */];
            },
            set: function (value) {
                this.$setDisplayAsPassword(value);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         *
         * @param value
         */
        TextField.prototype.$setDisplayAsPassword = function (value) {
            var values = this.$TextField;
            if (values[20 /* displayAsPassword */] != value) {
                values[20 /* displayAsPassword */] = value;
                this.$invalidateTextField();
                var text = "";
                if (value) {
                    text = this.changeToPassText(values[13 /* text */]);
                }
                else {
                    text = values[13 /* text */];
                }
                this.setMiddleStyle([{ text: text }]);
                return true;
            }
            return false;
        };
        Object.defineProperty(TextField.prototype, "strokeColor", {
            /**
             * @version Egret 2.4
             * @platform Web,Native
             */
            get: function () {
                return this.$TextField[25 /* strokeColor */];
            },
            /**
             * Represent the stroke color of the text.
             * Contain three 8-bit numbers with RGB color components; for example, 0xFF0000 is red, 0x00FF00 is green.
             * @default 0x000000
             * @language en_US
             */
            /**
             * 表示文本的描边颜色。
             * 包含三个 8 位 RGB 颜色成分的数字；例如，0xFF0000 为红色，0x00FF00 为绿色。
             * @default 0x000000
             * @language zh_CN
             */
            set: function (value) {
                value = +value || 0;
                this.$setStrokeColor(value);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         *
         * @param value
         */
        TextField.prototype.$setStrokeColor = function (value) {
            var values = this.$TextField;
            if (values[25 /* strokeColor */] != value) {
                this.$invalidateTextField();
                values[25 /* strokeColor */] = value;
                values[26 /* strokeColorString */] = egret.toColorString(value);
                return true;
            }
            return false;
        };
        Object.defineProperty(TextField.prototype, "stroke", {
            /**
             * @version Egret 2.4
             * @platform Web,Native
             */
            get: function () {
                return this.$TextField[27 /* stroke */];
            },
            /**
             * Indicate the stroke width.
             * 0 means no stroke.
             * @default 0
             * @language en_US
             */
            /**
             * 表示描边宽度。
             * 0为没有描边。
             * @default 0
             * @language zh_CN
             */
            set: function (value) {
                this.$setStroke(value);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         *
         * @param value
         */
        TextField.prototype.$setStroke = function (value) {
            if (this.$TextField[27 /* stroke */] != value) {
                this.$invalidateTextField();
                this.$TextField[27 /* stroke */] = value;
                return true;
            }
            return false;
        };
        Object.defineProperty(TextField.prototype, "maxChars", {
            /**
             * The maximum number of characters that the text field can contain, as entered by a user. \n A script can insert more text than maxChars allows; the maxChars property indicates only how much text a user can enter. If the value of this property is 0, a user can enter an unlimited amount of text.
             * The default value is 0.
             * @default 0
             * @language en_US
             */
            /**
             * 文本字段中最多可包含的字符数（即用户输入的字符数）。
             * 脚本可以插入比 maxChars 允许的字符数更多的文本；maxChars 属性仅表示用户可以输入多少文本。如果此属性的值为 0，则用户可以输入无限数量的文本。
             * @default 0
             * @language zh_CN
             */
            get: function () {
                return this.$TextField[21 /* maxChars */];
            },
            set: function (value) {
                this.$setMaxChars(value);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         *
         * @param value
         */
        TextField.prototype.$setMaxChars = function (value) {
            if (this.$TextField[21 /* maxChars */] != value) {
                this.$TextField[21 /* maxChars */] = value;
                return true;
            }
            return false;
        };
        Object.defineProperty(TextField.prototype, "scrollV", {
            /**
             * @version Egret 2.4
             * @platform Web,Native
             */
            get: function () {
                return Math.min(Math.max(this.$TextField[28 /* scrollV */], 1), this.maxScrollV);
            },
            /**
             * Vertical position of text in a text field. scrollV property helps users locate specific passages in a long article, and create scrolling text fields.
             * Vertically scrolling units are lines, and horizontal scrolling unit is pixels.
             * If the first displayed line is the first line in the text field, scrollV is set to 1 (instead of 0).
             * @language en_US
             */
            /**
             * 文本在文本字段中的垂直位置。scrollV 属性可帮助用户定位到长篇文章的特定段落，还可用于创建滚动文本字段。
             * 垂直滚动的单位是行，而水平滚动的单位是像素。
             * 如果显示的第一行是文本字段中的第一行，则 scrollV 设置为 1（而非 0）。
             * @language zh_CN
             */
            set: function (value) {
                this.$TextField[28 /* scrollV */] = Math.max(value, 1);
                this.$invalidateTextField();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextField.prototype, "maxScrollV", {
            /**
             * The maximum value of scrollV
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * scrollV 的最大值
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                this.$getLinesArr();
                return Math.max(this.$TextField[29 /* numLines */] - egret.TextFieldUtils.$getScrollNum(this) + 1, 1);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextField.prototype, "selectionBeginIndex", {
            /**
             * @private
             * @version Egret 2.4
             * @platform Web,Native
             */
            get: function () {
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextField.prototype, "selectionEndIndex", {
            /**
             * @private
             * @version Egret 2.4
             * @platform Web,Native
             */
            get: function () {
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextField.prototype, "caretIndex", {
            /**
             * @private
             * @version Egret 2.4
             * @platform Web,Native
             */
            get: function () {
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         *
         * @param beginIndex
         * @param endIndex
         */
        TextField.prototype.$setSelection = function (beginIndex, endIndex) {
            return false;
        };
        /**
         * @private
         *
         * @returns
         */
        TextField.prototype.$getLineHeight = function () {
            return this.$TextField[1 /* lineSpacing */] + this.$TextField[0 /* fontSize */];
        };
        Object.defineProperty(TextField.prototype, "numLines", {
            /**
             * Number of lines of text.
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 文本行数。
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                this.$getLinesArr();
                return this.$TextField[29 /* numLines */];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextField.prototype, "multiline", {
            get: function () {
                return this.$TextField[30 /* multiline */];
            },
            /**
             * Indicate whether field is a multiline text field. Note that this property is valid only when the type is TextFieldType.INPUT.
             * If the value is true, the text field is multiline; if the value is false, the text field is a single-line text field. In a field of type TextFieldType.INPUT, the multiline value determines whether the Enter key creates a new line (a value of false, and the Enter key is ignored).
             * @default false
             * @language en_US
             */
            /**
             * 表示字段是否为多行文本字段。注意，此属性仅在type为TextFieldType.INPUT时才有效。
             * 如果值为 true，则文本字段为多行文本字段；如果值为 false，则文本字段为单行文本字段。在类型为 TextFieldType.INPUT 的字段中，multiline 值将确定 Enter 键是否创建新行（如果值为 false，则将忽略 Enter 键）。
             * @default false
             * @language zh_CN
             */
            set: function (value) {
                this.$setMultiline(value);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         *
         * @param value
         */
        TextField.prototype.$setMultiline = function (value) {
            this.$TextField[30 /* multiline */] = value;
            this.$invalidateTextField();
            return true;
        };
        Object.defineProperty(TextField.prototype, "restrict", {
            get: function () {
                var values = this.$TextField;
                var str = null;
                if (values[35 /* restrictAnd */] != null) {
                    str = values[35 /* restrictAnd */];
                }
                if (values[36 /* restrictNot */] != null) {
                    if (str == null) {
                        str = "";
                    }
                    str += "^" + values[36 /* restrictNot */];
                }
                return str;
            },
            /**
             * Indicates a user can enter into the text field character set. If you restrict property is null, you can enter any character. If you restrict property is an empty string, you can not enter any character. If you restrict property is a string of characters, you can enter only characters in the string in the text field. The string is scanned from left to right. You can use a hyphen (-) to specify a range. Only restricts user interaction; a script may put any text into the text field. <br/>
                      * If the string of characters caret (^) at the beginning, all characters are initially accepted, then the string are excluded from receiving ^ character. If the string does not begin with a caret (^) to, any characters are initially accepted and then a string of characters included in the set of accepted characters. <br/>
                      * The following example allows only uppercase characters, spaces, and numbers in the text field: <br/>
                      * My_txt.restrict = "A-Z 0-9"; <br/>
                      * The following example includes all characters except lowercase letters: <br/>
                      * My_txt.restrict = "^ a-z"; <br/>
                      * If you need to enter characters \ ^, use two backslash "\\ -" "\\ ^": <br/>
                      * Can be used anywhere in the string ^ to rule out including characters and switch between characters, but can only be used to exclude a ^. The following code includes only uppercase letters except uppercase Q: <br/>
                      * My_txt.restrict = "A-Z ^ Q"; <br/>
             * @version Egret 2.4
             * @platform Web,Native
             * @default null
             * @language en_US
             */
            /**
             * 表示用户可输入到文本字段中的字符集。如果 restrict 属性的值为 null，则可以输入任何字符。如果 restrict 属性的值为空字符串，则不能输入任何字符。如果 restrict 属性的值为一串字符，则只能在文本字段中输入该字符串中的字符。从左向右扫描该字符串。可以使用连字符 (-) 指定一个范围。只限制用户交互；脚本可将任何文本放入文本字段中。<br/>
             * 如果字符串以尖号 (^) 开头，则先接受所有字符，然后从接受字符集中排除字符串中 ^ 之后的字符。如果字符串不以尖号 (^) 开头，则最初不接受任何字符，然后将字符串中的字符包括在接受字符集中。<br/>
             * 下例仅允许在文本字段中输入大写字符、空格和数字：<br/>
             * my_txt.restrict = "A-Z 0-9";<br/>
             * 下例包含除小写字母之外的所有字符：<br/>
             * my_txt.restrict = "^a-z";<br/>
             * 如果需要输入字符 \ ^，请使用2个反斜杠 "\\-" "\\^" ：<br/>
             * 可在字符串中的任何位置使用 ^，以在包含字符与排除字符之间进行切换，但是最多只能有一个 ^ 用来排除。下面的代码只包含除大写字母 Q 之外的大写字母：<br/>
             * my_txt.restrict = "A-Z^Q";<br/>
             * @version Egret 2.4
             * @platform Web,Native
             * @default null
             * @language zh_CN
             */
            set: function (value) {
                var values = this.$TextField;
                if (value == null) {
                    values[35 /* restrictAnd */] = null;
                    values[36 /* restrictNot */] = null;
                }
                else {
                    var index = -1;
                    while (index < value.length) {
                        index = value.indexOf("^", index);
                        if (index == 0) {
                            break;
                        }
                        else if (index > 0) {
                            if (value.charAt(index - 1) != "\\") {
                                break;
                            }
                            index++;
                        }
                        else {
                            break;
                        }
                    }
                    if (index == 0) {
                        values[35 /* restrictAnd */] = null;
                        values[36 /* restrictNot */] = value.substring(index + 1);
                    }
                    else if (index > 0) {
                        values[35 /* restrictAnd */] = value.substring(0, index);
                        values[36 /* restrictNot */] = value.substring(index + 1);
                    }
                    else {
                        values[35 /* restrictAnd */] = value;
                        values[36 /* restrictNot */] = null;
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         *
         * @param value
         */
        TextField.prototype.$setWidth = function (value) {
            var values = this.$TextField;
            if (isNaN(value)) {
                if (isNaN(values[3 /* textFieldWidth */])) {
                    return false;
                }
                values[3 /* textFieldWidth */] = NaN;
            }
            else {
                if (values[3 /* textFieldWidth */] == value) {
                    return false;
                }
                values[3 /* textFieldWidth */] = value;
            }
            value = +value;
            if (value < 0) {
                return false;
            }
            this.$invalidateTextField();
            return true;
        };
        /**
         * @private
         *
         * @param value
         */
        TextField.prototype.$setHeight = function (value) {
            var values = this.$TextField;
            if (isNaN(value)) {
                if (isNaN(values[4 /* textFieldHeight */])) {
                    return false;
                }
                values[4 /* textFieldHeight */] = NaN;
            }
            else {
                if (values[4 /* textFieldHeight */] == value) {
                    return false;
                }
                values[4 /* textFieldHeight */] = value;
            }
            value = +value;
            if (value < 0) {
                return false;
            }
            this.$invalidateTextField();
            return true;
        };
        /**
         * @private
         * 获取显示宽度
         */
        TextField.prototype.$getWidth = function () {
            var values = this.$TextField;
            return isNaN(values[3 /* textFieldWidth */]) ? this.$getContentBounds().width : values[3 /* textFieldWidth */];
        };
        /**
         * @private
         * 获取显示宽度
         */
        TextField.prototype.$getHeight = function () {
            var values = this.$TextField;
            return isNaN(values[4 /* textFieldHeight */]) ? this.$getContentBounds().height : values[4 /* textFieldHeight */];
        };
        Object.defineProperty(TextField.prototype, "border", {
            /**
             * @version Egret 2.4
             * @platform Web,Native
             */
            get: function () {
                return this.$TextField[31 /* border */];
            },
            /**
             * Specifies whether the text field has a border.
             * If true, the text field has a border. If false, the text field has no border.
             * Use borderColor property to set the border color.
             * @default false
             * @language en_US
             */
            /**
             * 指定文本字段是否具有边框。
             * 如果为 true，则文本字段具有边框。如果为 false，则文本字段没有边框。
             * 使用 borderColor 属性来设置边框颜色。
             * @default false
             * @language zh_CN
             */
            set: function (value) {
                this.$setBorder(value);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         */
        TextField.prototype.$setBorder = function (value) {
            this.$TextField[31 /* border */] = !!value;
            this.$invalidate();
        };
        Object.defineProperty(TextField.prototype, "borderColor", {
            /**
             * @version Egret 2.4
             * @platform Web,Native
             */
            get: function () {
                return this.$TextField[32 /* borderColor */];
            },
            /**
             * The color of the text field border.
             * Even currently is no border can be retrieved or set this property, but only if the text field has the border property is set to true, the color is visible.
             * @default 0x000000
             * @language en_US
             */
            /**
             * 文本字段边框的颜色。
             * 即使当前没有边框，也可检索或设置此属性，但只有当文本字段已将 border 属性设置为 true 时，才可以看到颜色。
             * @default 0x000000
             * @language zh_CN
             */
            set: function (value) {
                this.$setBorderColor(value);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         */
        TextField.prototype.$setBorderColor = function (value) {
            this.$TextField[32 /* borderColor */] = +value || 0;
            this.$invalidate();
        };
        Object.defineProperty(TextField.prototype, "background", {
            /**
             * @version Egret 2.4
             * @platform Web,Native
             */
            get: function () {
                return this.$TextField[33 /* background */];
            },
            /**
             * Specifies whether the text field has a background fill.
             * If true, the text field has a background fill. If false, the text field has no background fill.
             * Use the backgroundColor property to set the background color of the text field.
             * @default false
             * @language en_US
             */
            /**
             * 指定文本字段是否具有背景填充。
             * 如果为 true，则文本字段具有背景填充。如果为 false，则文本字段没有背景填充。
             * 使用 backgroundColor 属性来设置文本字段的背景颜色。
             * @default false
             * @language zh_CN
             */
            set: function (value) {
                this.$setBackground(value);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         */
        TextField.prototype.$setBackground = function (value) {
            this.$TextField[33 /* background */] = value;
            this.$invalidate();
        };
        Object.defineProperty(TextField.prototype, "backgroundColor", {
            /**
             * @version Egret 2.4
             * @platform Web,Native
             */
            get: function () {
                return this.$TextField[34 /* backgroundColor */];
            },
            /**
             * Color of the text field background.
             * Even currently is no background, can be retrieved or set this property, but only if the text field has the background property set to true, the color is visible.
             * @default 0xFFFFFF
             * @language en_US
             */
            /**
             * 文本字段背景的颜色。
             * 即使当前没有背景，也可检索或设置此属性，但只有当文本字段已将 background 属性设置为 true 时，才可以看到颜色。
             * @default 0xFFFFFF
             * @language zh_CN
             */
            set: function (value) {
                this.$setBackgroundColor(value);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         */
        TextField.prototype.$setBackgroundColor = function (value) {
            this.$TextField[34 /* backgroundColor */] = value;
            this.$invalidate();
        };
        /**
         * @private
         *
         */
        TextField.prototype.fillBackground = function (lines) {
            var graphics = this.graphicsNode;
            if (graphics) {
                graphics.clear();
            }
            var values = this.$TextField;
            if (values[33 /* background */] || values[31 /* border */] || (lines && lines.length > 0)) {
                if (!graphics) {
                    graphics = this.graphicsNode = new egret.sys.GraphicsNode();
                    var groupNode = new egret.sys.GroupNode();
                    groupNode.addNode(graphics);
                    groupNode.addNode(this.textNode);
                    this.$renderNode = groupNode;
                }
                var fillPath = void 0;
                var strokePath = void 0;
                //渲染背景
                if (values[33 /* background */]) {
                    fillPath = graphics.beginFill(values[34 /* backgroundColor */]);
                    fillPath.drawRect(0, 0, this.$getWidth(), this.$getHeight());
                }
                //渲染边框
                if (values[31 /* border */]) {
                    strokePath = graphics.lineStyle(1, values[32 /* borderColor */]);
                    //1像素和3像素线条宽度的情况，会向右下角偏移0.5像素绘制。少画一像素宽度，正好能不超出文本测量边界。
                    strokePath.drawRect(0, 0, this.$getWidth() - 1, this.$getHeight() - 1);
                }
                //渲染下划线
                if (lines && lines.length > 0) {
                    var textColor = values[2 /* textColor */];
                    var lastColor = -1;
                    var length_1 = lines.length;
                    for (var i = 0; i < length_1; i += 4) {
                        var x = lines[i];
                        var y = lines[i + 1];
                        var w = lines[i + 2];
                        var color = lines[i + 3] || textColor;
                        if (lastColor < 0 || lastColor != color) {
                            lastColor = color;
                            strokePath = graphics.lineStyle(2, color, 1, egret.CapsStyle.NONE);
                        }
                        strokePath.moveTo(x, y);
                        strokePath.lineTo(x + w, y);
                    }
                }
            }
            if (graphics) {
                var bounds = this.$getRenderBounds();
                graphics.x = bounds.x;
                graphics.y = bounds.y;
                graphics.width = bounds.width;
                graphics.height = bounds.height;
                egret.Rectangle.release(bounds);
            }
        };
        /**
         * Enter the text automatically entered into the input state, the input type is text only and may only be invoked in the user interaction.
         * @version Egret 3.0.8
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 输入文本自动进入到输入状态，仅在类型是输入文本并且是在用户交互下才可以调用。
         * @version Egret 3.0.8
         * @platform Web,Native
         * @language zh_CN
         */
        TextField.prototype.setFocus = function () {
            if (this.type == egret.TextFieldType.INPUT && this.$stage) {
                this.inputUtils.$onFocus();
            }
        };
        /**
         * @private
         *
         */
        TextField.prototype.$onRemoveFromStage = function () {
            _super.prototype.$onRemoveFromStage.call(this);
            this.removeEvent();
            if (this.$TextField[24 /* type */] == egret.TextFieldType.INPUT) {
                this.inputUtils._removeStageText();
            }
            if (this.textNode) {
                this.textNode.clean();
            }
        };
        /**
         * @private
         *
         * @param stage
         * @param nestLevel
         */
        TextField.prototype.$onAddToStage = function (stage, nestLevel) {
            _super.prototype.$onAddToStage.call(this, stage, nestLevel);
            this.addEvent();
            if (this.$TextField[24 /* type */] == egret.TextFieldType.INPUT) {
                this.inputUtils._addStageText();
            }
        };
        /**
         * 不能重写$invalidateContentBounds，因为内部graphics调用clear时会触发$invalidateContentBounds这个方法，从而导致死循环。
         */
        TextField.prototype.$invalidateTextField = function () {
            this.$invalidateContentBounds();
            this.$TextField[18 /* textLinesChanged */] = true;
        };
        TextField.prototype.$update = function (dirtyRegionPolicy, bounds) {
            var tmpBounds = this.$getRenderBounds();
            var result = _super.prototype.$update.call(this, dirtyRegionPolicy, tmpBounds);
            egret.Rectangle.release(tmpBounds);
            return result;
        };
        TextField.prototype.$getRenderBounds = function () {
            var bounds = this.$getContentBounds();
            var tmpBounds = egret.Rectangle.create();
            tmpBounds.copyFrom(bounds);
            if (this.$TextField[31 /* border */]) {
                tmpBounds.width += 2;
                tmpBounds.height += 2;
            }
            var _strokeDouble = this.$TextField[27 /* stroke */] * 2;
            if (_strokeDouble > 0) {
                tmpBounds.width += _strokeDouble * 2;
                tmpBounds.height += _strokeDouble * 2;
            }
            tmpBounds.x -= _strokeDouble + 2; //+2和+4 是为了解决脏区域的问题
            tmpBounds.y -= _strokeDouble + 2;
            tmpBounds.width = Math.ceil(tmpBounds.width) + 4;
            tmpBounds.height = Math.ceil(tmpBounds.height) + 4;
            return tmpBounds;
        };
        /**
         * @private
         */
        TextField.prototype.$measureContentBounds = function (bounds) {
            this.$getLinesArr();
            var w = !isNaN(this.$TextField[3 /* textFieldWidth */]) ? this.$TextField[3 /* textFieldWidth */] : this.$TextField[5 /* textWidth */];
            var h = !isNaN(this.$TextField[4 /* textFieldHeight */]) ? this.$TextField[4 /* textFieldHeight */] : egret.TextFieldUtils.$getTextHeight(this);
            bounds.setTo(0, 0, w, h);
        };
        /**
         * @private
         * @see egret.DisplayObject._render
         * @param renderContext
         */
        TextField.prototype.$render = function () {
            if (this.$TextField[24 /* type */] == egret.TextFieldType.INPUT) {
                if (this.$hasAnyFlags(2032 /* InitFlags */) || this.$hasAnyFlags(1648 /* DownOnAddedOrRemoved */)) {
                    this.inputUtils._updateProperties();
                }
                if (this.$isTyping) {
                    this.fillBackground();
                    return;
                }
            }
            else if (this.$TextField[3 /* textFieldWidth */] == 0) {
                return;
            }
            var underLines = this.drawText();
            this.fillBackground(underLines);
            //tudo 宽高很小的情况下webgl模式绘制异常
            var bounds = this.$getRenderBounds();
            var node = this.textNode;
            node.x = bounds.x;
            node.y = bounds.y;
            node.width = Math.ceil(bounds.width);
            node.height = Math.ceil(bounds.height);
            egret.Rectangle.release(bounds);
        };
        Object.defineProperty(TextField.prototype, "textFlow", {
            /**
             * @version Egret 2.4
             * @platform Web,Native
             */
            get: function () {
                return this.textArr;
            },
            /**
             * Set rich text
             * @language en_US
             */
            /**
             * 设置富文本
             * @see http://edn.egret.com/cn/index.php/article/index/id/146
             * @language zh_CN
             */
            set: function (textArr) {
                this.isFlow = true;
                var text = "";
                if (textArr == null)
                    textArr = [];
                for (var i = 0; i < textArr.length; i++) {
                    var element = textArr[i];
                    text += element.text;
                }
                if (this.$TextField[20 /* displayAsPassword */]) {
                    this.$setBaseText(text);
                }
                else {
                    this.$TextField[13 /* text */] = text;
                    this.setMiddleStyle(textArr);
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         *
         * @param text
         * @returns
         */
        TextField.prototype.changeToPassText = function (text) {
            if (this.$TextField[20 /* displayAsPassword */]) {
                var passText = "";
                for (var i = 0, num = text.length; i < num; i++) {
                    switch (text.charAt(i)) {
                        case '\n':
                            passText += "\n";
                            break;
                        case '\r':
                            break;
                        default:
                            passText += '*';
                    }
                }
                return passText;
            }
            return text;
        };
        /**
         * @private
         *
         * @param textArr
         */
        TextField.prototype.setMiddleStyle = function (textArr) {
            this.$TextField[18 /* textLinesChanged */] = true;
            this.textArr = textArr;
            this.$invalidateTextField();
        };
        Object.defineProperty(TextField.prototype, "textWidth", {
            /**
             * Get the text measured width
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 获取文本测量宽度
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                this.$getLinesArr();
                return this.$TextField[5 /* textWidth */];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextField.prototype, "textHeight", {
            /**
             * Get Text measuring height
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 获取文本测量高度
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                this.$getLinesArr();
                return egret.TextFieldUtils.$getTextHeight(this);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         * @param text
         * @version Egret 2.4
         * @platform Web,Native
         */
        TextField.prototype.appendText = function (text) {
            this.appendElement({ text: text });
        };
        /**
         * @private
         * @param element
         * @version Egret 2.4
         * @platform Web,Native
         */
        TextField.prototype.appendElement = function (element) {
            var text = this.$TextField[13 /* text */] + element.text;
            if (this.$TextField[20 /* displayAsPassword */]) {
                this.$setBaseText(text);
            }
            else {
                this.$TextField[13 /* text */] = text;
                this.textArr.push(element);
                this.setMiddleStyle(this.textArr);
            }
        };
        /**
         * @private
         *
         * @returns
         */
        TextField.prototype.$getLinesArr = function () {
            var values = this.$TextField;
            if (!values[18 /* textLinesChanged */]) {
                return this.linesArr;
            }
            values[18 /* textLinesChanged */] = false;
            var text2Arr = this.textArr;
            this.linesArr.length = 0;
            values[6 /* textHeight */] = 0;
            values[5 /* textWidth */] = 0;
            var textFieldWidth = values[3 /* textFieldWidth */];
            //宽度被设置为0
            if (!isNaN(textFieldWidth) && textFieldWidth == 0) {
                values[29 /* numLines */] = 0;
                return [{ width: 0, height: 0, charNum: 0, elements: [], hasNextLine: false }];
            }
            var linesArr = this.linesArr;
            var lineW = 0;
            var lineCharNum = 0;
            var lineH = 0;
            var lineCount = 0;
            var lineElement;
            for (var i = 0, text2ArrLength = text2Arr.length; i < text2ArrLength; i++) {
                var element = text2Arr[i];
                //可能设置为没有文本，忽略绘制
                if (!element.text) {
                    if (lineElement) {
                        lineElement.width = lineW;
                        lineElement.height = lineH;
                        lineElement.charNum = lineCharNum;
                        values[5 /* textWidth */] = Math.max(values[5 /* textWidth */], lineW);
                        values[6 /* textHeight */] += lineH;
                    }
                    continue;
                }
                element.style = element.style || {};
                var text = element.text.toString();
                var textArr = text.split(/(?:\r\n|\r|\n)/);
                for (var j = 0, textArrLength = textArr.length; j < textArrLength; j++) {
                    if (linesArr[lineCount] == null) {
                        lineElement = { width: 0, height: 0, elements: [], charNum: 0, hasNextLine: false };
                        linesArr[lineCount] = lineElement;
                        lineW = 0;
                        lineH = 0;
                        lineCharNum = 0;
                    }
                    if (values[24 /* type */] == egret.TextFieldType.INPUT) {
                        lineH = values[0 /* fontSize */];
                    }
                    else {
                        lineH = Math.max(lineH, element.style.size || values[0 /* fontSize */]);
                    }
                    var isNextLine = true;
                    if (textArr[j] == "") {
                        if (j == textArrLength - 1) {
                            isNextLine = false;
                        }
                    }
                    else {
                        var w = measureTextWidth(textArr[j], values, element.style);
                        if (isNaN(textFieldWidth)) {
                            lineW += w;
                            lineCharNum += textArr[j].length;
                            lineElement.elements.push({
                                width: w,
                                text: textArr[j],
                                style: element.style
                            });
                            if (j == textArrLength - 1) {
                                isNextLine = false;
                            }
                        }
                        else {
                            if (lineW + w <= textFieldWidth) {
                                lineElement.elements.push({
                                    width: w,
                                    text: textArr[j],
                                    style: element.style
                                });
                                lineW += w;
                                lineCharNum += textArr[j].length;
                                if (j == textArrLength - 1) {
                                    isNextLine = false;
                                }
                            }
                            else {
                                var k = 0;
                                var ww = 0;
                                var word = textArr[j];
                                var words = void 0;
                                if (values[19 /* wordWrap */]) {
                                    words = word.split(SplitRegex);
                                }
                                else {
                                    words = word.match(/./g);
                                }
                                var wl = words.length;
                                var charNum = 0;
                                for (; k < wl; k++) {
                                    // detect 4 bytes unicode, refer https://mths.be/punycode
                                    var codeLen = words[k].length;
                                    var has4BytesUnicode = false;
                                    if (codeLen == 1 && k < wl - 1) {
                                        var charCodeHigh = words[k].charCodeAt(0);
                                        var charCodeLow = words[k + 1].charCodeAt(0);
                                        if (charCodeHigh >= 0xD800 && charCodeHigh <= 0xDBFF && (charCodeLow & 0xFC00) == 0xDC00) {
                                            var realWord = words[k] + words[k + 1];
                                            codeLen = 2;
                                            has4BytesUnicode = true;
                                            w = measureTextWidth(realWord, values, element.style);
                                        }
                                        else {
                                            w = measureTextWidth(words[k], values, element.style);
                                        }
                                    }
                                    else {
                                        w = measureTextWidth(words[k], values, element.style);
                                    }
                                    // w = measureTextWidth(words[k], values, element.style);
                                    if (lineW != 0 && lineW + w > textFieldWidth && lineW + k != 0) {
                                        break;
                                    }
                                    if (ww + w > textFieldWidth) {
                                        var words2 = words[k].match(/./g);
                                        for (var k2 = 0, wl2 = words2.length; k2 < wl2; k2++) {
                                            // detect 4 bytes unicode, refer https://mths.be/punycode
                                            var codeLen = words2[k2].length;
                                            var has4BytesUnicode2 = false;
                                            if (codeLen == 1 && k2 < wl2 - 1) {
                                                var charCodeHigh = words2[k2].charCodeAt(0);
                                                var charCodeLow = words2[k2 + 1].charCodeAt(0);
                                                if (charCodeHigh >= 0xD800 && charCodeHigh <= 0xDBFF && (charCodeLow & 0xFC00) == 0xDC00) {
                                                    var realWord = words2[k2] + words2[k2 + 1];
                                                    codeLen = 2;
                                                    has4BytesUnicode2 = true;
                                                    w = measureTextWidth(realWord, values, element.style);
                                                }
                                                else {
                                                    w = measureTextWidth(words2[k2], values, element.style);
                                                }
                                            }
                                            else {
                                                w = measureTextWidth(words2[k2], values, element.style);
                                            }
                                            // w = measureTextWidth(words2[k2], values, element.style);
                                            if (k2 > 0 && lineW + w > textFieldWidth) {
                                                break;
                                            }
                                            // charNum += words2[k2].length;
                                            charNum += codeLen;
                                            ww += w;
                                            lineW += w;
                                            lineCharNum += charNum;
                                            if (has4BytesUnicode2) {
                                                k2++;
                                            }
                                        }
                                    }
                                    else {
                                        // charNum += words[k].length;
                                        charNum += codeLen;
                                        ww += w;
                                        lineW += w;
                                        lineCharNum += charNum;
                                    }
                                    if (has4BytesUnicode) {
                                        k++;
                                    }
                                }
                                if (k > 0) {
                                    lineElement.elements.push({
                                        width: ww,
                                        text: word.substring(0, charNum),
                                        style: element.style
                                    });
                                    var leftWord = word.substring(charNum);
                                    var m = void 0;
                                    var lwleng = leftWord.length;
                                    for (m = 0; m < lwleng; m++) {
                                        if (leftWord.charAt(m) != " ") {
                                            break;
                                        }
                                    }
                                    textArr[j] = leftWord.substring(m);
                                }
                                if (textArr[j] != "") {
                                    j--;
                                    isNextLine = false;
                                }
                            }
                        }
                    }
                    if (isNextLine) {
                        lineCharNum++;
                        lineElement.hasNextLine = true;
                    }
                    if (j < textArr.length - 1) {
                        lineElement.width = lineW;
                        lineElement.height = lineH;
                        lineElement.charNum = lineCharNum;
                        values[5 /* textWidth */] = Math.max(values[5 /* textWidth */], lineW);
                        values[6 /* textHeight */] += lineH;
                        //if (this._type == TextFieldType.INPUT && !this._multiline) {
                        //    this._numLines = linesArr.length;
                        //    return linesArr;
                        //}
                        lineCount++;
                    }
                }
                if (i == text2Arr.length - 1 && lineElement) {
                    lineElement.width = lineW;
                    lineElement.height = lineH;
                    lineElement.charNum = lineCharNum;
                    values[5 /* textWidth */] = Math.max(values[5 /* textWidth */], lineW);
                    values[6 /* textHeight */] += lineH;
                }
            }
            values[29 /* numLines */] = linesArr.length;
            return linesArr;
        };
        /**
         * @private
         * 返回要绘制的下划线列表
         */
        TextField.prototype.drawText = function () {
            var node = this.textNode;
            var values = this.$TextField;
            //更新文本样式
            node.bold = values[15 /* bold */];
            node.fontFamily = values[8 /* fontFamily */] || TextField.default_fontFamily;
            node.italic = values[16 /* italic */];
            node.size = values[0 /* fontSize */];
            node.stroke = values[27 /* stroke */];
            node.strokeColor = values[25 /* strokeColor */];
            node.textColor = values[2 /* textColor */];
            //先算出需要的数值
            var lines = this.$getLinesArr();
            if (values[5 /* textWidth */] == 0) {
                return [];
            }
            var maxWidth = !isNaN(values[3 /* textFieldWidth */]) ? values[3 /* textFieldWidth */] : values[5 /* textWidth */];
            var textHeight = egret.TextFieldUtils.$getTextHeight(this);
            var drawY = 0;
            var startLine = egret.TextFieldUtils.$getStartLine(this);
            var textFieldHeight = values[4 /* textFieldHeight */];
            if (!isNaN(textFieldHeight) && textFieldHeight > textHeight) {
                var vAlign = egret.TextFieldUtils.$getValign(this);
                drawY += vAlign * (textFieldHeight - textHeight);
            }
            drawY = Math.round(drawY);
            var hAlign = egret.TextFieldUtils.$getHalign(this);
            var drawX = 0;
            var underLineData = [];
            for (var i = startLine, numLinesLength = values[29 /* numLines */]; i < numLinesLength; i++) {
                var line = lines[i];
                var h = line.height;
                drawY += h / 2;
                if (i != startLine) {
                    if (values[24 /* type */] == egret.TextFieldType.INPUT && !values[30 /* multiline */]) {
                        break;
                    }
                    if (!isNaN(textFieldHeight) && drawY > textFieldHeight) {
                        break;
                    }
                }
                drawX = Math.round((maxWidth - line.width) * hAlign);
                for (var j = 0, elementsLength = line.elements.length; j < elementsLength; j++) {
                    var element = line.elements[j];
                    var size = element.style.size || values[0 /* fontSize */];
                    node.drawText(drawX, drawY + (h - size) / 2, element.text, element.style);
                    if (element.style.underline) {
                        underLineData.push(drawX, drawY + (h) / 2, element.width, element.style.textColor);
                    }
                    drawX += element.width;
                }
                drawY += h / 2 + values[1 /* lineSpacing */];
            }
            return underLineData;
        };
        //增加点击事件
        TextField.prototype.addEvent = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapHandler, this);
        };
        //释放点击事件
        TextField.prototype.removeEvent = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapHandler, this);
        };
        //处理富文本中有href的
        TextField.prototype.onTapHandler = function (e) {
            if (this.$TextField[24 /* type */] == egret.TextFieldType.INPUT) {
                return;
            }
            var ele = egret.TextFieldUtils.$getTextElement(this, e.localX, e.localY);
            if (ele == null) {
                return;
            }
            var style = ele.style;
            if (style && style.href) {
                if (style.href.match(/^event:/)) {
                    var type = style.href.match(/^event:/)[0];
                    egret.TextEvent.dispatchTextEvent(this, egret.TextEvent.LINK, style.href.substring(type.length));
                }
                else {
                    open(style.href, style.target || "_blank");
                }
            }
        };
        /**
         * default fontFamily
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 默认文本字体
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        TextField.default_fontFamily = "Arial";
        /**
         * default size in pixels of text
         * @version Egret 3.2.1
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 默认文本字号大小
         * @version Egret 3.2.1
         * @platform Web,Native
         * @language zh_CN
         */
        TextField.default_size = 30;
        /**
         * default color of the text.
         * @version Egret 3.2.1
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 默认文本颜色
         * @version Egret 3.2.1
         * @platform Web,Native
         * @language zh_CN
         */
        TextField.default_textColor = 0xffffff;
        return TextField;
    }(egret.DisplayObject));
    egret.TextField = TextField;
    __reflect(TextField.prototype, "egret.TextField");
})(egret || (egret = {}));
//# sourceMappingURL=TextField.js.map