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
var eui;
(function (eui) {
    var UIImpl = eui.sys.UIComponentImpl;
    /**
     * Label is an UIComponent that can render one or more lines of text.
     * The text to be displayed is determined by the <code>text</code> property.
     * The formatting of the text is specified by the styles，
     * such as <code>fontFamily</code> and <code>size</code>.
     *
     * <p>Because Label is fast and lightweight, it is especially suitable
     * for use cases that involve rendering many small pieces of non-interactive
     * text, such as item renderers and labels in Button skins.</p>
     *
     * <p>In Label, three character sequences are recognized
     * as explicit line breaks: CR (<code>"\r"</code>), LF (<code>"\n"</code>),
     * and CR+LF (<code>"\r\n"</code>).</p>
     *
     * <p>If you don't specify any kind of width for a Label,
     * then the longest line, as determined by these explicit line breaks,
     * determines the width of the Label.</p>
     *
     * <p>If you do specify some kind of width, then the specified text is
     * word-wrapped at the right edge of the component's bounds.
     * If the text extends below the bottom of the component,
     * it is clipped.</p>
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/components/LabelExample.ts
     * @language en_US
     */
    /**
     * Label 是可以呈示一行或多行统一格式文本的UI组件。要显示的文本由 text 属性确定。文本格式由样式属性指定，例如 fontFamily 和 size。
     * 因为 Label 运行速度快且占用内存少，所以它特别适合用于显示多个小型非交互式文本的情况，例如，项呈示器和 Button 外观中的标签。
     * 在 Label 中，将以下三个字符序列识别为显式换行符：CR（“\r”）、LF（“\n”）和 CR+LF（“\r\n”）。
     * 如果没有为 Label 指定宽度，则由这些显式换行符确定的最长行确定 Label 的宽度。
     * 如果指定了宽度，则指定文本将在组件边界的右边缘换行，如果文本扩展到低于组件底部，则将被剪切。
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/components/LabelExample.ts
     * @language zh_CN
     */
    var Label = (function (_super) {
        __extends(Label, _super);
        /**
         * Constructor.
         *
         * @param text The text displayed by this text component.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 构造函数。
         *
         * @param text 此文本组件所显示的文本。
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        function Label(text) {
            var _this = _super.call(this) || this;
            /**
             * style中属性是否允许被赋值，当主动赋值过属性之后将不允许被赋值
             */
            _this.$styleSetMap = {
                "fontFamily": true,
                "size": true,
                "bold": true,
                "italic": true,
                "textAlign": true,
                "verticalAlign": true,
                "lineSpacing": true,
                "textColor": true,
                "wordWrap": true,
                "displayAsPassword": true,
                "strokeColor": true,
                "stroke": true,
                "maxChars": true,
                "multiline": true,
                "border": true,
                "borderColor": true,
                "background": true,
                "backgroundColor": true
            };
            _this.$revertStyle = {};
            _this.$style = null;
            _this.$changeFromStyle = false;
            /**
             * @private
             */
            _this._widthConstraint = NaN;
            _this.initializeUIValues();
            _this.text = text;
            return _this;
        }
        Object.defineProperty(Label.prototype, "style", {
            /**
             * The style of text.
             * @version Egret 3.2.1
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 文本样式。
             * @version Egret 3.2.1
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this.$style;
            },
            set: function (value) {
                this.$setStyle(value);
            },
            enumerable: true,
            configurable: true
        });
        Label.prototype.$setStyle = function (value) {
            if (this.$style == value) {
                return;
            }
            this.$style = value;
            var theme = egret.getImplementation("eui.Theme");
            if (theme) {
                this.$changeFromStyle = true;
                for (var key in this.$revertStyle) {
                    this[key] = this.$revertStyle[key];
                }
                this.$revertStyle = {};
                if (value == null) {
                    this.$changeFromStyle = false;
                    return;
                }
                var styleList = value.split(",");
                for (var i = 0; i < styleList.length; i++) {
                    var config = theme.$getStyleConfig(styleList[i]);
                    if (config) {
                        for (var key in config) {
                            if (this.$styleSetMap[key]) {
                                var revertValue = this[key];
                                this[key] = config[key];
                                this.$revertStyle[key] = revertValue;
                            }
                        }
                    }
                }
                this.$changeFromStyle = false;
            }
        };
        Label.prototype.$setFontFamily = function (value) {
            if (!this.$changeFromStyle) {
                delete this.$revertStyle["fontFanily"];
                this.$styleSetMap["fontFanily"] = false;
            }
            return _super.prototype.$setFontFamily.call(this, value);
        };
        Label.prototype.$setSize = function (value) {
            if (!this.$changeFromStyle) {
                delete this.$revertStyle["size"];
                this.$styleSetMap["size"] = false;
            }
            return _super.prototype.$setSize.call(this, value);
        };
        Label.prototype.$setBold = function (value) {
            if (!this.$changeFromStyle) {
                delete this.$revertStyle["bold"];
                this.$styleSetMap["bold"] = false;
            }
            return _super.prototype.$setBold.call(this, value);
        };
        Label.prototype.$setItalic = function (value) {
            if (!this.$changeFromStyle) {
                delete this.$revertStyle["italic"];
                this.$styleSetMap["italic"] = false;
            }
            return _super.prototype.$setItalic.call(this, value);
        };
        Label.prototype.$setTextAlign = function (value) {
            if (!this.$changeFromStyle) {
                delete this.$revertStyle["textAlign"];
                this.$styleSetMap["textAlign"] = false;
            }
            return _super.prototype.$setTextAlign.call(this, value);
        };
        Label.prototype.$setVerticalAlign = function (value) {
            if (!this.$changeFromStyle) {
                delete this.$revertStyle["verticalAlign"];
                this.$styleSetMap["verticalAlign"] = false;
            }
            return _super.prototype.$setVerticalAlign.call(this, value);
        };
        Label.prototype.$setLineSpacing = function (value) {
            if (!this.$changeFromStyle) {
                delete this.$revertStyle["lineSpacing"];
                this.$styleSetMap["lineSpacing"] = false;
            }
            return _super.prototype.$setLineSpacing.call(this, value);
        };
        Label.prototype.$setTextColor = function (value) {
            if (!this.$changeFromStyle) {
                delete this.$revertStyle["textColor"];
                this.$styleSetMap["textColor"] = false;
            }
            return _super.prototype.$setTextColor.call(this, value);
        };
        Label.prototype.$setWordWrap = function (value) {
            if (!this.$changeFromStyle) {
                delete this.$revertStyle["wordWrap"];
                this.$styleSetMap["wordWrap"] = false;
            }
            _super.prototype.$setWordWrap.call(this, value);
        };
        Label.prototype.$setDisplayAsPassword = function (value) {
            if (!this.$changeFromStyle) {
                delete this.$revertStyle["displayAsPassword"];
                this.$styleSetMap["displayAsPassword"] = false;
            }
            return _super.prototype.$setDisplayAsPassword.call(this, value);
        };
        Label.prototype.$setStrokeColor = function (value) {
            if (!this.$changeFromStyle) {
                delete this.$revertStyle["strokeColor"];
                this.$styleSetMap["strokeColor"] = false;
            }
            return _super.prototype.$setStrokeColor.call(this, value);
        };
        Label.prototype.$setStroke = function (value) {
            if (!this.$changeFromStyle) {
                delete this.$revertStyle["stroke"];
                this.$styleSetMap["stroke"] = false;
            }
            return _super.prototype.$setStroke.call(this, value);
        };
        Label.prototype.$setMaxChars = function (value) {
            if (!this.$changeFromStyle) {
                delete this.$revertStyle["maxChars"];
                this.$styleSetMap["maxChars"] = false;
            }
            return _super.prototype.$setMaxChars.call(this, value);
        };
        Label.prototype.$setMultiline = function (value) {
            if (!this.$changeFromStyle) {
                delete this.$revertStyle["multiline"];
                this.$styleSetMap["multiline"] = false;
            }
            return _super.prototype.$setMultiline.call(this, value);
        };
        Label.prototype.$setBorder = function (value) {
            if (!this.$changeFromStyle) {
                delete this.$revertStyle["border"];
                this.$styleSetMap["border"] = false;
            }
            _super.prototype.$setBorder.call(this, value);
        };
        Label.prototype.$setBorderColor = function (value) {
            if (!this.$changeFromStyle) {
                delete this.$revertStyle["borderColor"];
                this.$styleSetMap["borderColor"] = false;
            }
            _super.prototype.$setBorderColor.call(this, value);
        };
        Label.prototype.$setBackground = function (value) {
            if (!this.$changeFromStyle) {
                delete this.$revertStyle["background"];
                this.$styleSetMap["background"] = false;
            }
            _super.prototype.$setBackground.call(this, value);
        };
        Label.prototype.$setBackgroundColor = function (value) {
            if (!this.$changeFromStyle) {
                delete this.$revertStyle["backgroundColor"];
                this.$styleSetMap["backgroundColor"] = false;
            }
            _super.prototype.$setBackgroundColor.call(this, value);
        };
        /**
         * @private
         *
         */
        Label.prototype.$invalidateContentBounds = function () {
            _super.prototype.$invalidateContentBounds.call(this);
            this.invalidateSize();
        };
        /**
         * @private
         *
         * @param value
         */
        Label.prototype.$setWidth = function (value) {
            var result1 = _super.prototype.$setWidth.call(this, value);
            var result2 = UIImpl.prototype.$setWidth.call(this, value);
            return result1 && result2;
        };
        /**
         * @private
         *
         * @param value
         */
        Label.prototype.$setHeight = function (value) {
            var result1 = _super.prototype.$setHeight.call(this, value);
            var result2 = UIImpl.prototype.$setHeight.call(this, value);
            return result1 && result2;
        };
        /**
         * @private
         *
         * @param value
         */
        Label.prototype.$setText = function (value) {
            var result = _super.prototype.$setText.call(this, value);
            eui.PropertyEvent.dispatchPropertyEvent(this, eui.PropertyEvent.PROPERTY_CHANGE, "text");
            return result;
        };
        /**
         * @copy eui.UIComponent#createChildren
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        Label.prototype.createChildren = function () {
        };
        /**
         * @copy eui.UIComponent#childrenCreated
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        Label.prototype.childrenCreated = function () {
        };
        /**
         * @copy eui.UIComponent#commitProperties
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        Label.prototype.commitProperties = function () {
        };
        /**
         * @copy eui.UIComponent#measure
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        Label.prototype.measure = function () {
            var values = this.$UIComponent;
            var textValues = this.$TextField;
            var oldWidth = textValues[3 /* textFieldWidth */];
            var availableWidth = NaN;
            if (!isNaN(this._widthConstraint)) {
                availableWidth = this._widthConstraint;
                this._widthConstraint = NaN;
            }
            else if (!isNaN(values[8 /* explicitWidth */])) {
                availableWidth = values[8 /* explicitWidth */];
            }
            else if (values[13 /* maxWidth */] != 100000) {
                availableWidth = values[13 /* maxWidth */];
            }
            _super.prototype.$setWidth.call(this, availableWidth);
            this.setMeasuredSize(this.textWidth, this.textHeight);
            _super.prototype.$setWidth.call(this, oldWidth);
        };
        /**
         * @copy eui.UIComponent#updateDisplayList
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        Label.prototype.updateDisplayList = function (unscaledWidth, unscaledHeight) {
            _super.prototype.$setWidth.call(this, unscaledWidth);
            _super.prototype.$setHeight.call(this, unscaledHeight);
        };
        /**
         * @copy eui.UIComponent#invalidateParentLayout
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        Label.prototype.invalidateParentLayout = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        Label.prototype.setMeasuredSize = function (width, height) {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        Label.prototype.invalidateProperties = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        Label.prototype.validateProperties = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        Label.prototype.invalidateSize = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        Label.prototype.validateSize = function (recursive) {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        Label.prototype.invalidateDisplayList = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        Label.prototype.validateDisplayList = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        Label.prototype.validateNow = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        Label.prototype.setLayoutBoundsSize = function (layoutWidth, layoutHeight) {
            UIImpl.prototype.setLayoutBoundsSize.call(this, layoutWidth, layoutHeight);
            if (isNaN(layoutWidth) || layoutWidth === this._widthConstraint || layoutWidth == 0) {
                this._widthConstraint = layoutWidth;
                return;
            }
            this._widthConstraint = layoutWidth;
            var values = this.$UIComponent;
            if (!isNaN(values[9 /* explicitHeight */])) {
                return;
            }
            if (layoutWidth == values[16 /* measuredWidth */]) {
                return;
            }
            this.invalidateSize();
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        Label.prototype.setLayoutBoundsPosition = function (x, y) {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        Label.prototype.getLayoutBounds = function (bounds) {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        Label.prototype.getPreferredBounds = function (bounds) {
        };
        return Label;
    }(egret.TextField));
    eui.Label = Label;
    __reflect(Label.prototype, "eui.Label", ["eui.UIComponent", "egret.DisplayObject", "eui.IDisplayText"]);
    eui.sys.implementUIComponent(Label, egret.TextField);
    eui.registerBindable(Label.prototype, "text");
})(eui || (eui = {}));
//# sourceMappingURL=Label.js.map