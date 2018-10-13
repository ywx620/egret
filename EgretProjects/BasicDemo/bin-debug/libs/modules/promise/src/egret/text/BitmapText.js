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
    /**
     * Bitmap font adopts the Bitmap+SpriteSheet mode to render text.
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/text/BitmapText.ts
     * @language en_US
     */
    /**
     * 位图字体采用了Bitmap+SpriteSheet的方式来渲染文字。
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/text/BitmapText.ts
     * @language zh_CN
     */
    var BitmapText = (function (_super) {
        __extends(BitmapText, _super);
        /**
         * Create an egret.BitmapText object
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 创建一个 egret.BitmapText 对象
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        function BitmapText() {
            var _this = _super.call(this) || this;
            /**
             * @private
             */
            _this.$textOffsetX = 0;
            /**
             * @private
             */
            _this.$textOffsetY = 0;
            /**
             * @private
             */
            _this.$textStartX = 0;
            /**
             * @private
             */
            _this.$textStartY = 0;
            /**
             * @private
             */
            _this.textLines = [];
            /**
             * @private
             */
            _this.$lineHeights = [];
            _this.$renderNode = new egret.sys.BitmapNode();
            //this.cacheAsBitmap = true;
            _this.$BitmapText = {
                0: NaN,
                1: NaN,
                2: "",
                3: 0,
                4: 0,
                5: null,
                6: false,
                7: false,
                8: false,
                9: false,
                10: "left",
                11: "top",
                12: egret.Bitmap.defaultSmoothing //smoothing
            };
            return _this;
        }
        Object.defineProperty(BitmapText.prototype, "smoothing", {
            /**
             * Whether or not is smoothed when scaled.
             * @default true。
             * @version Egret 3.0
             * @platform Web
             * @language en_US
             */
            /**
             * 控制在缩放时是否进行平滑处理。
             * @default true。
             * @version Egret 3.0
             * @platform Web
             * @language zh_CN
             */
            get: function () {
                var values = this.$BitmapText;
                return values[12 /* smoothing */];
            },
            set: function (value) {
                value = !!value;
                var values = this.$BitmapText;
                if (value == values[12 /* smoothing */]) {
                    return;
                }
                values[12 /* smoothing */] = value;
                this.$invalidate();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BitmapText.prototype, "text", {
            /**
             * A string to display in the text field.
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 要显示的文本内容
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this.$BitmapText[2 /* text */];
            },
            set: function (value) {
                this.$setText(value);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         */
        BitmapText.prototype.$setText = function (value) {
            if (value == null) {
                value = "";
            }
            value = String(value);
            var values = this.$BitmapText;
            if (value == values[2 /* text */])
                return false;
            values[2 /* text */] = value;
            this.$invalidateContentBounds();
            return true;
        };
        /**
         * @private
         */
        BitmapText.prototype.$getWidth = function () {
            var w = this.$BitmapText[0 /* textFieldWidth */];
            return isNaN(w) ? this.$getContentBounds().width : w;
        };
        /**
         * @private
         */
        BitmapText.prototype.$setWidth = function (value) {
            //value = +value || 0;
            var values = this.$BitmapText;
            if (value < 0 || value == values[0 /* textFieldWidth */]) {
                return false;
            }
            values[0 /* textFieldWidth */] = value;
            this.$invalidateContentBounds();
            return true;
        };
        /**
         * @private
         */
        BitmapText.prototype.$invalidateContentBounds = function () {
            _super.prototype.$invalidateContentBounds.call(this);
            this.$BitmapText[7 /* textLinesChanged */] = true;
        };
        /**
         * @private
         */
        BitmapText.prototype.$getHeight = function () {
            var h = this.$BitmapText[1 /* textFieldHeight */];
            return isNaN(h) ? this.$getContentBounds().height : h;
        };
        /**
         * @private
         */
        BitmapText.prototype.$setHeight = function (value) {
            //value = +value || 0;
            var values = this.$BitmapText;
            if (value < 0 || value == values[1 /* textFieldHeight */]) {
                return false;
            }
            values[1 /* textFieldHeight */] = value;
            this.$invalidateContentBounds();
            return true;
        };
        Object.defineProperty(BitmapText.prototype, "font", {
            /**
             * The name of the font to use, or a comma-separated list of font names, the type of value must be BitmapFont.
             * @default null
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 要使用的字体的名称或用逗号分隔的字体名称列表，类型必须是 BitmapFont。
             * @default null
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this.$BitmapText[5 /* font */];
            },
            set: function (value) {
                this.$setFont(value);
            },
            enumerable: true,
            configurable: true
        });
        BitmapText.prototype.$setFont = function (value) {
            var values = this.$BitmapText;
            if (values[5 /* font */] == value) {
                return false;
            }
            values[5 /* font */] = value;
            this.$BitmapText[6 /* fontStringChanged */] = true;
            this.$invalidateContentBounds();
            return true;
        };
        Object.defineProperty(BitmapText.prototype, "lineSpacing", {
            /**
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
                return this.$BitmapText[3 /* lineSpacing */];
            },
            set: function (value) {
                this.$setLineSpacing(value);
            },
            enumerable: true,
            configurable: true
        });
        BitmapText.prototype.$setLineSpacing = function (value) {
            value = +value || 0;
            var values = this.$BitmapText;
            if (values[3 /* lineSpacing */] == value)
                return false;
            values[3 /* lineSpacing */] = value;
            this.$invalidateContentBounds();
            return true;
        };
        Object.defineProperty(BitmapText.prototype, "letterSpacing", {
            /**
             * An integer representing the amount of distance between characters.
             * @default 0
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 一个整数，表示字符之间的距离。
             * @default 0
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this.$BitmapText[4 /* letterSpacing */];
            },
            set: function (value) {
                this.$setLetterSpacing(value);
            },
            enumerable: true,
            configurable: true
        });
        BitmapText.prototype.$setLetterSpacing = function (value) {
            value = +value || 0;
            var values = this.$BitmapText;
            if (values[4 /* letterSpacing */] == value)
                return false;
            values[4 /* letterSpacing */] = value;
            this.$invalidateContentBounds();
            return true;
        };
        Object.defineProperty(BitmapText.prototype, "textAlign", {
            /**
             * Horizontal alignment of text.
             * @default：egret.HorizontalAlign.LEFT
             * @version Egret 2.5.6
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 文本的水平对齐方式。
             * @default：egret.HorizontalAlign.LEFT
             * @version Egret 2.5.6
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this.$BitmapText[10 /* textAlign */];
            },
            set: function (value) {
                this.$setTextAlign(value);
            },
            enumerable: true,
            configurable: true
        });
        BitmapText.prototype.$setTextAlign = function (value) {
            var values = this.$BitmapText;
            if (values[10 /* textAlign */] == value)
                return false;
            values[10 /* textAlign */] = value;
            this.$invalidateContentBounds();
            return true;
        };
        Object.defineProperty(BitmapText.prototype, "verticalAlign", {
            /**
             * Vertical alignment of text.
             * @default：egret.VerticalAlign.TOP
             * @version Egret 2.5.6
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 文字的垂直对齐方式。
             * @default：egret.VerticalAlign.TOP
             * @version Egret 2.5.6
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this.$BitmapText[11 /* verticalAlign */];
            },
            set: function (value) {
                this.$setVerticalAlign(value);
            },
            enumerable: true,
            configurable: true
        });
        BitmapText.prototype.$setVerticalAlign = function (value) {
            var values = this.$BitmapText;
            if (values[11 /* verticalAlign */] == value)
                return false;
            values[11 /* verticalAlign */] = value;
            this.$invalidateContentBounds();
            return true;
        };
        /**
         * @private
         */
        BitmapText.prototype.$render = function () {
            var values = this.$BitmapText;
            var textLines = this.$getTextLines();
            var length = textLines.length;
            if (length == 0) {
                return;
            }
            var textLinesWidth = this.$textLinesWidth;
            var bitmapFont = values[5 /* font */];
            var node = this.$renderNode;
            if (bitmapFont.$texture) {
                node.image = bitmapFont.$texture._bitmapData;
            }
            node.smoothing = values[12 /* smoothing */];
            var emptyHeight = bitmapFont._getFirstCharHeight();
            var emptyWidth = Math.ceil(emptyHeight * BitmapText.EMPTY_FACTOR);
            var hasSetHeight = !isNaN(values[1 /* textFieldHeight */]);
            var textWidth = values[8 /* textWidth */];
            var textFieldWidth = values[0 /* textFieldWidth */];
            var textFieldHeight = values[1 /* textFieldHeight */];
            var align = values[10 /* textAlign */];
            var yPos = this.$textOffsetY + this.$textStartY;
            var lineHeights = this.$lineHeights;
            for (var i = 0; i < length; i++) {
                var lineHeight = lineHeights[i];
                if (hasSetHeight && i > 0 && yPos + lineHeight > textFieldHeight) {
                    break;
                }
                var line = textLines[i];
                var len = line.length;
                var xPos = this.$textOffsetX;
                if (align != egret.HorizontalAlign.LEFT) {
                    var countWidth = textFieldWidth > textWidth ? textFieldWidth : textWidth;
                    if (align == egret.HorizontalAlign.RIGHT) {
                        xPos += countWidth - textLinesWidth[i];
                    }
                    else if (align == egret.HorizontalAlign.CENTER) {
                        xPos += Math.floor((countWidth - textLinesWidth[i]) / 2);
                    }
                }
                for (var j = 0; j < len; j++) {
                    var character = line.charAt(j);
                    var texture = bitmapFont.getTexture(character);
                    if (!texture) {
                        if (character == " ") {
                            xPos += emptyWidth;
                        }
                        else {
                            egret.$warn(1046, character);
                        }
                        continue;
                    }
                    var bitmapWidth = texture._bitmapWidth;
                    var bitmapHeight = texture._bitmapHeight;
                    node.imageWidth = texture._sourceWidth;
                    node.imageHeight = texture._sourceHeight;
                    node.drawImage(texture._bitmapX, texture._bitmapY, bitmapWidth, bitmapHeight, xPos + texture._offsetX, yPos + texture._offsetY, texture.$getScaleBitmapWidth(), texture.$getScaleBitmapHeight());
                    xPos += (bitmapFont.getConfig(character, "xadvance") || texture.$getTextureWidth()) + values[4 /* letterSpacing */];
                }
                yPos += lineHeight + values[3 /* lineSpacing */];
            }
        };
        /**
         * @private
         */
        BitmapText.prototype.$measureContentBounds = function (bounds) {
            var lines = this.$getTextLines();
            if (lines.length == 0) {
                bounds.setEmpty();
            }
            else {
                bounds.setTo(this.$textOffsetX + this.$textStartX, this.$textOffsetY + this.$textStartY, this.$BitmapText[8 /* textWidth */] - this.$textOffsetX, this.$BitmapText[9 /* textHeight */] - this.$textOffsetY);
            }
        };
        Object.defineProperty(BitmapText.prototype, "textWidth", {
            /**
             * Get the BitmapText measured width
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 获取位图文本测量宽度
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                this.$getTextLines();
                return this.$BitmapText[8 /* textWidth */];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BitmapText.prototype, "textHeight", {
            /**
             * Get Text BitmapText height
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 获取位图文本测量高度
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                this.$getTextLines();
                return this.$BitmapText[9 /* textHeight */];
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         *
         * @returns
         */
        BitmapText.prototype.$getTextLines = function () {
            var values = this.$BitmapText;
            if (!values[7 /* textLinesChanged */]) {
                return this.textLines;
            }
            var textLines = [];
            this.textLines = textLines;
            var textLinesWidth = [];
            this.$textLinesWidth = textLinesWidth;
            values[7 /* textLinesChanged */] = false;
            var lineHeights = [];
            this.$lineHeights = lineHeights;
            if (!values[2 /* text */] || !values[5 /* font */]) {
                return textLines;
            }
            var lineSpacing = values[3 /* lineSpacing */];
            var letterSpacing = values[4 /* letterSpacing */];
            var textWidth = 0;
            var textHeight = 0;
            var textOffsetX = 0;
            var textOffsetY = 0;
            var hasWidthSet = !isNaN(values[0 /* textFieldWidth */]);
            var textFieldWidth = values[0 /* textFieldWidth */];
            var textFieldHeight = values[1 /* textFieldHeight */];
            var bitmapFont = values[5 /* font */];
            var emptyHeight = bitmapFont._getFirstCharHeight();
            var emptyWidth = Math.ceil(emptyHeight * BitmapText.EMPTY_FACTOR);
            var text = values[2 /* text */];
            var textArr = text.split(/(?:\r\n|\r|\n)/);
            var length = textArr.length;
            var isFirstLine = true;
            var isFirstChar;
            var isLastChar;
            var lineHeight;
            var xPos;
            for (var i = 0; i < length; i++) {
                var line = textArr[i];
                var len = line.length;
                lineHeight = 0;
                xPos = 0;
                isFirstChar = true;
                isLastChar = false;
                for (var j = 0; j < len; j++) {
                    if (!isFirstChar) {
                        xPos += letterSpacing;
                    }
                    var character = line.charAt(j);
                    var texureWidth = void 0;
                    var textureHeight = void 0;
                    var offsetX = 0;
                    var offsetY = 0;
                    var texture = bitmapFont.getTexture(character);
                    if (!texture) {
                        if (character == " ") {
                            texureWidth = emptyWidth;
                            textureHeight = emptyHeight;
                        }
                        else {
                            egret.$warn(1046, character);
                            if (isFirstChar) {
                                isFirstChar = false;
                            }
                            continue;
                        }
                    }
                    else {
                        texureWidth = texture.$getTextureWidth();
                        textureHeight = texture.$getTextureHeight();
                        offsetX = texture._offsetX;
                        offsetY = texture._offsetY;
                    }
                    if (isFirstChar) {
                        isFirstChar = false;
                        textOffsetX = Math.min(offsetX, textOffsetX);
                    }
                    if (isFirstLine) {
                        isFirstLine = false;
                        textOffsetY = Math.min(offsetY, textOffsetY);
                    }
                    if (hasWidthSet && j > 0 && xPos + texureWidth > textFieldWidth) {
                        if (!setLineData(line.substring(0, j)))
                            break;
                        line = line.substring(j);
                        len = line.length;
                        j = 0;
                        //最后一个字符要计算纹理宽度，而不是xadvance
                        if (j == len - 1) {
                            xPos = texureWidth;
                        }
                        else {
                            xPos = bitmapFont.getConfig(character, "xadvance") || texureWidth;
                        }
                        lineHeight = textureHeight;
                        continue;
                    }
                    //最后一个字符要计算纹理宽度，而不是xadvance
                    if (j == len - 1) {
                        xPos += texureWidth;
                    }
                    else {
                        xPos += bitmapFont.getConfig(character, "xadvance") || texureWidth;
                    }
                    lineHeight = Math.max(textureHeight, lineHeight);
                }
                if (textFieldHeight && i > 0 && textHeight > textFieldHeight) {
                    break;
                }
                isLastChar = true;
                if (!setLineData(line))
                    break;
            }
            function setLineData(str) {
                if (textFieldHeight && textLines.length > 0 && textHeight > textFieldHeight) {
                    return false;
                }
                textHeight += lineHeight + lineSpacing;
                if (!isFirstChar && !isLastChar) {
                    xPos -= letterSpacing;
                }
                textLines.push(str);
                lineHeights.push(lineHeight);
                textLinesWidth.push(xPos);
                textWidth = Math.max(xPos, textWidth);
                return true;
            }
            textHeight -= lineSpacing;
            values[8 /* textWidth */] = textWidth;
            values[9 /* textHeight */] = textHeight;
            this.$textOffsetX = textOffsetX;
            this.$textOffsetY = textOffsetY;
            this.$textStartX = 0;
            this.$textStartY = 0;
            var alignType;
            if (textFieldWidth > textWidth) {
                alignType = values[10 /* textAlign */];
                if (alignType == egret.HorizontalAlign.RIGHT) {
                    this.$textStartX = textFieldWidth - textWidth;
                }
                else if (alignType == egret.HorizontalAlign.CENTER) {
                    this.$textStartX = Math.floor((textFieldWidth - textWidth) / 2);
                }
            }
            if (textFieldHeight > textHeight) {
                alignType = values[11 /* verticalAlign */];
                if (alignType == egret.VerticalAlign.BOTTOM) {
                    this.$textStartY = textFieldHeight - textHeight;
                }
                else if (alignType == egret.VerticalAlign.MIDDLE) {
                    this.$textStartY = Math.floor((textFieldHeight - textHeight) / 2);
                }
            }
            return textLines;
        };
        /**
         * A ratio of the width of the space character. This value is multiplied by the height of the first character is the space character width.
         * @default 0.33
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 一个空格字符的宽度比例。这个数值乘以第一个字符的高度即为空格字符的宽。
         * @default 0.33
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        BitmapText.EMPTY_FACTOR = 0.33;
        return BitmapText;
    }(egret.DisplayObject));
    egret.BitmapText = BitmapText;
    __reflect(BitmapText.prototype, "egret.BitmapText");
})(egret || (egret = {}));
//# sourceMappingURL=BitmapText.js.map