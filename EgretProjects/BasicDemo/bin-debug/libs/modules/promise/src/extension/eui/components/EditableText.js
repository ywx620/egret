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
     * Editable text for displaying,
     * scrolling, selecting, and editing text.
     * @includeExample  extension/eui/components/EditablTextExample.ts
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @language en_US
     */
    /**
     * 可编辑文本，用于显示、滚动、选择和编辑文本。
     * @includeExample  extension/eui/components/EditablTextExample.ts
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @language zh_CN
     */
    var EditableText = (function (_super) {
        __extends(EditableText, _super);
        /**
         * Constructor.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 构造函数。
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        function EditableText() {
            var _this = _super.call(this) || this;
            /**
             * @private
             */
            _this._widthConstraint = NaN;
            /**
             * @private
             */
            _this.$isShowPrompt = false;
            /**
             * @private
             */
            _this.$promptColor = 0x666666;
            /**
             * @private
             */
            _this.$isFocusIn = false;
            _this.initializeUIValues();
            _this.type = egret.TextFieldType.INPUT;
            _this.$EditableText = {
                0: null,
                1: 0xffffff,
                2: false //asPassword
            };
            return _this;
        }
        /**
         * @private
         *
         */
        EditableText.prototype.$invalidateContentBounds = function () {
            _super.prototype.$invalidateContentBounds.call(this);
            this.invalidateSize();
        };
        /**
         * @private
         *
         * @param value
         */
        EditableText.prototype.$setWidth = function (value) {
            var result1 = _super.prototype.$setWidth.call(this, value);
            var result2 = UIImpl.prototype.$setWidth.call(this, value);
            return result1 && result2;
        };
        /**
         * @private
         *
         * @param value
         */
        EditableText.prototype.$setHeight = function (value) {
            var result1 = _super.prototype.$setHeight.call(this, value);
            var result2 = UIImpl.prototype.$setHeight.call(this, value);
            return result1 && result2;
        };
        /**
         * @private
         *
         * @param value
         */
        EditableText.prototype.$getText = function () {
            var value = _super.prototype.$getText.call(this);
            if (value == this.$EditableText[0 /* promptText */]) {
                value = "";
            }
            return value;
        };
        /**
         * @private
         *
         * @param value
         */
        EditableText.prototype.$setText = function (value) {
            var promptText = this.$EditableText[0 /* promptText */];
            if (promptText != value || promptText == null) {
                this.$isShowPrompt = false;
                this.textColor = this.$EditableText[1 /* textColorUser */];
                this.displayAsPassword = this.$EditableText[2 /* asPassword */];
            }
            if (!this.$isFocusIn) {
                if (value == "" || value == null) {
                    value = promptText;
                    this.$isShowPrompt = true;
                    _super.prototype.$setTextColor.call(this, this.$promptColor);
                    _super.prototype.$setDisplayAsPassword.call(this, false);
                }
            }
            var result = _super.prototype.$setText.call(this, value);
            eui.PropertyEvent.dispatchPropertyEvent(this, eui.PropertyEvent.PROPERTY_CHANGE, "text");
            return result;
        };
        /**
         * @private
         *
         * @param stage
         * @param nestLevel
         */
        EditableText.prototype.$onAddToStage = function (stage, nestLevel) {
            eui.sys.UIComponentImpl.prototype["$onAddToStage"].call(this, stage, nestLevel);
            this.addEventListener(egret.FocusEvent.FOCUS_IN, this.onfocusIn, this);
            this.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onfocusOut, this);
        };
        /**
         * @private
         *
         */
        EditableText.prototype.$onRemoveFromStage = function () {
            eui.sys.UIComponentImpl.prototype["$onRemoveFromStage"].call(this);
            this.removeEventListener(egret.FocusEvent.FOCUS_IN, this.onfocusIn, this);
            this.removeEventListener(egret.FocusEvent.FOCUS_OUT, this.onfocusOut, this);
        };
        Object.defineProperty(EditableText.prototype, "prompt", {
            /**
             * When the property of the text is empty, it will show the defalut string.
             * @version Egret 2.5.5
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 当text属性为空字符串时要显示的文本内容。
             * 先创建文本控件时将显示提示文本。控件获得焦点时或控件的 text 属性为非空字符串时，提示文本将消失。
             * 控件失去焦点时提示文本将重新显示，但仅当未输入文本时（如果文本字段的值为空字符串）。<p/>
             * 对于文本控件，如果用户输入文本，但随后又将其删除，则控件失去焦点后，提示文本将重新显示。
             * 您还可以通过编程方式将文本控件的 text 属性设置为空字符串使提示文本重新显示。
             * @version Egret 2.5.5
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this.$EditableText[0 /* promptText */];
            },
            set: function (value) {
                var values = this.$EditableText;
                var promptText = values[0 /* promptText */];
                if (promptText == value)
                    return;
                values[0 /* promptText */] = value;
                var text = this.text;
                if (!text || text == promptText) {
                    this.showPromptText();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EditableText.prototype, "promptColor", {
            get: function () {
                return this.$promptColor;
            },
            /**
             * The color of the defalut string.
             * @version Egret 2.5.5
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 默认文本的颜色
             * @version Egret 2.5.5
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            set: function (value) {
                value = +value | 0;
                if (this.$promptColor != value) {
                    this.$promptColor = value;
                    var text = this.text;
                    if (!text || text == this.$EditableText[0 /* promptText */]) {
                        this.showPromptText();
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         */
        EditableText.prototype.onfocusOut = function () {
            this.$isFocusIn = false;
            if (!this.text) {
                this.showPromptText();
            }
        };
        /**
         * @private
         */
        EditableText.prototype.onfocusIn = function () {
            this.$isFocusIn = true;
            this.$isShowPrompt = false;
            this.displayAsPassword = this.$EditableText[2 /* asPassword */];
            var values = this.$EditableText;
            var text = this.text;
            if (!text || text == values[0 /* promptText */]) {
                this.textColor = values[1 /* textColorUser */];
                this.text = "";
            }
        };
        /**
         * @private
         */
        EditableText.prototype.showPromptText = function () {
            var values = this.$EditableText;
            this.$isShowPrompt = true;
            _super.prototype.$setTextColor.call(this, this.$promptColor);
            _super.prototype.$setDisplayAsPassword.call(this, false);
            this.text = values[0 /* promptText */];
        };
        /**
         * @private
         */
        EditableText.prototype.$setTextColor = function (value) {
            value = +value | 0;
            this.$EditableText[1 /* textColorUser */] = value;
            if (!this.$isShowPrompt) {
                _super.prototype.$setTextColor.call(this, value);
            }
            return true;
        };
        /**
         * @private
         */
        EditableText.prototype.$setDisplayAsPassword = function (value) {
            this.$EditableText[2 /* asPassword */] = value;
            if (!this.$isShowPrompt) {
                _super.prototype.$setDisplayAsPassword.call(this, value);
            }
            return true;
        };
        /**
         * @copy eui.Component#createChildren()
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        EditableText.prototype.createChildren = function () {
            this.onfocusOut();
        };
        /**
         * @copy eui.Component#childrenCreated()
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        EditableText.prototype.childrenCreated = function () {
        };
        /**
         * @copy eui.Component#commitProperties()
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        EditableText.prototype.commitProperties = function () {
        };
        /**
         * @copy eui.Component#measure()
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        EditableText.prototype.measure = function () {
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
         * @copy eui.Component#updateDisplayList()
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        EditableText.prototype.updateDisplayList = function (unscaledWidth, unscaledHeight) {
            _super.prototype.$setWidth.call(this, unscaledWidth);
            _super.prototype.$setHeight.call(this, unscaledHeight);
        };
        /**
         * @copy eui.Component#invalidateParentLayout()
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        EditableText.prototype.invalidateParentLayout = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        EditableText.prototype.setMeasuredSize = function (width, height) {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        EditableText.prototype.invalidateProperties = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        EditableText.prototype.validateProperties = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        EditableText.prototype.invalidateSize = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        EditableText.prototype.validateSize = function (recursive) {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        EditableText.prototype.invalidateDisplayList = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        EditableText.prototype.validateDisplayList = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        EditableText.prototype.validateNow = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        EditableText.prototype.setLayoutBoundsSize = function (layoutWidth, layoutHeight) {
            UIImpl.prototype.setLayoutBoundsSize.call(this, layoutWidth, layoutHeight);
            if (isNaN(layoutWidth) || layoutWidth === this._widthConstraint || layoutWidth == 0) {
                return;
            }
            var values = this.$UIComponent;
            if (!isNaN(values[9 /* explicitHeight */])) {
                return;
            }
            if (layoutWidth == values[16 /* measuredWidth */]) {
                return;
            }
            this._widthConstraint = layoutWidth;
            this.invalidateSize();
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        EditableText.prototype.setLayoutBoundsPosition = function (x, y) {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        EditableText.prototype.getLayoutBounds = function (bounds) {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        EditableText.prototype.getPreferredBounds = function (bounds) {
        };
        return EditableText;
    }(egret.TextField));
    eui.EditableText = EditableText;
    __reflect(EditableText.prototype, "eui.EditableText", ["eui.UIComponent", "egret.DisplayObject", "eui.IDisplayText"]);
    eui.sys.implementUIComponent(EditableText, egret.TextField);
    eui.registerBindable(EditableText.prototype, "text");
})(eui || (eui = {}));
//# sourceMappingURL=EditableText.js.map