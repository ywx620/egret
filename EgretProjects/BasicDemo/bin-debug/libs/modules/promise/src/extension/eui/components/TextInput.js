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
    var FocusEvent = egret.FocusEvent;
    /**
     *
     */
    /**
     * The TextInput is a textfield input component, the user can input and edit the text.
     *
     * @version Egret 2.5.7
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/components/TextInputExample.ts
     * @language en_US
     */
    /**
     * TextInput 是一个文本输入控件，供用户输入和编辑统一格式文本
     *
     * @version Egret 2.5.7
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/components/TextInputExample.ts
     * @language zh_CN
     */
    var TextInput = (function (_super) {
        __extends(TextInput, _super);
        function TextInput() {
            var _this = _super.call(this) || this;
            /**
             * @private
             */
            _this.isFocus = false;
            _this.$TextInput = {
                0: null,
                1: null,
                2: null,
                3: null,
                4: null,
                5: null,
                6: "",
                7: null,
                8: egret.TextFieldInputType.TEXT //inputType
            };
            return _this;
        }
        Object.defineProperty(TextInput.prototype, "prompt", {
            /**
             * @copy eui.EditableText#prompt
             *
             * @version Egret 2.5.7
             * @version eui 1.0
             * @platform Web,Native
             */
            get: function () {
                if (this.promptDisplay) {
                    return this.promptDisplay.text;
                }
                return this.$TextInput[0 /* prompt */];
            },
            /**
             * @copy eui.EditableText#prompt
             *
             * @version Egret 2.5.7
             * @version eui 1.0
             * @platform Web,Native
             */
            set: function (value) {
                this.$TextInput[0 /* prompt */] = value;
                if (this.promptDisplay) {
                    this.promptDisplay.text = value;
                }
                this.invalidateProperties();
                this.invalidateState();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextInput.prototype, "displayAsPassword", {
            /**
             * @copy egret.TextField#displayAsPassword
             *
             * @version Egret 2.5.7
             * @version eui 1.0
             * @platform Web,Native
             */
            get: function () {
                if (this.textDisplay) {
                    return this.textDisplay.displayAsPassword;
                }
                var v = this.$TextInput[1 /* displayAsPassword */];
                return v ? v : false;
            },
            /**
             * @copy egret.TextField#displayAsPassword
             *
             * @version Egret 2.5.7
             * @version eui 1.0
             * @platform Web,Native
             */
            set: function (value) {
                this.$TextInput[1 /* displayAsPassword */] = value;
                if (this.textDisplay) {
                    this.textDisplay.displayAsPassword = value;
                }
                this.invalidateProperties();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextInput.prototype, "inputType", {
            /**
             * @copy egret.TextField#inputType
             *
             * @version Egret 3.1.6
             * @version eui 1.0
             * @platform Web,Native
             */
            get: function () {
                if (this.textDisplay) {
                    return this.textDisplay.inputType;
                }
                return this.$TextInput[8 /* inputType */];
            },
            /**
             * @copy egret.TextField#inputType
             *
             * @version Egret 3.1.6
             * @version eui 1.0
             * @platform Web,Native
             */
            set: function (value) {
                this.$TextInput[8 /* inputType */] = value;
                if (this.textDisplay) {
                    this.textDisplay.inputType = value;
                }
                this.invalidateProperties();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextInput.prototype, "textColor", {
            /**
             * @copy egret.TextField#textColor
             *
             * @version Egret 2.5.7
             * @version eui 1.0
             * @platform Web,Native
             */
            get: function () {
                if (this.textDisplay) {
                    return this.textDisplay.textColor;
                }
                return this.$TextInput[2 /* textColor */];
            },
            /**
             * @copy egret.TextField#textColor
             *
             * @version Egret 2.5.7
             * @version eui 1.0
             * @platform Web,Native
             */
            set: function (value) {
                this.$TextInput[2 /* textColor */] = value;
                if (this.textDisplay) {
                    this.textDisplay.textColor = value;
                }
                this.invalidateProperties();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextInput.prototype, "maxChars", {
            /**
             * @copy egret.TextField#maxChars
             *
             * @version Egret 2.5.7
             * @version eui 1.0
             * @platform Web,Native
             */
            get: function () {
                if (this.textDisplay) {
                    return this.textDisplay.maxChars;
                }
                var v = this.$TextInput[3 /* maxChars */];
                return v ? v : 0;
            },
            /**
             * @copy egret.TextField#maxChars
             *
             * @version Egret 2.5.7
             * @version eui 1.0
             * @platform Web,Native
             */
            set: function (value) {
                this.$TextInput[3 /* maxChars */] = value;
                if (this.textDisplay) {
                    this.textDisplay.maxChars = value;
                }
                this.invalidateProperties();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextInput.prototype, "maxWidth", {
            /**
             * @inheritDoc
             *
             * @version Egret 2.5.7
             * @version eui 1.0
             * @platform Web,Native
             */
            get: function () {
                if (this.textDisplay) {
                    return this.textDisplay.maxWidth;
                }
                var v = this.$TextInput[4 /* maxWidth */];
                return v ? v : 100000;
            },
            /**
             * @inheritDoc
             *
             * @version Egret 2.5.7
             * @version eui 1.0
             * @platform Web,Native
             */
            set: function (value) {
                this.$TextInput[4 /* maxWidth */] = value;
                if (this.textDisplay) {
                    this.textDisplay.maxWidth = value;
                }
                this.invalidateProperties();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextInput.prototype, "maxHeight", {
            /**
             * @inheritDoc
             *
             * @version Egret 2.5.7
             * @version eui 1.0
             * @platform Web,Native
             */
            get: function () {
                if (this.textDisplay) {
                    //return this.textDisplay.maxHeight;
                }
                var v = this.$TextInput[5 /* maxHeight */];
                return v ? v : 100000;
            },
            /**
             * @inheritDoc
             *
             * @version Egret 2.5.7
             * @version eui 1.0
             * @platform Web,Native
             */
            set: function (value) {
                this.$TextInput[5 /* maxHeight */] = value;
                if (this.textDisplay) {
                    this.textDisplay.maxHeight = value;
                }
                this.invalidateProperties();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextInput.prototype, "text", {
            /**
             * @copy egret.TextField#text
             *
             * @version Egret 2.5.7
             * @version eui 1.0
             * @platform Web,Native
             */
            get: function () {
                if (this.textDisplay) {
                    return this.textDisplay.text;
                }
                return this.$TextInput[6 /* text */];
            },
            /**
             * @copy egret.TextField#text
             *
             * @version Egret 2.5.7
             * @version eui 1.0
             * @platform Web,Native
             */
            set: function (value) {
                this.$TextInput[6 /* text */] = value;
                if (this.textDisplay) {
                    this.textDisplay.text = value;
                }
                this.invalidateProperties();
                this.invalidateState();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextInput.prototype, "restrict", {
            /**
             * @copy egret.TextField#restrict
             *
             * @version Egret 2.5.7
             * @version eui 1.0
             * @platform Web,Native
             */
            get: function () {
                if (this.textDisplay) {
                    return this.textDisplay.restrict;
                }
                return this.$TextInput[7 /* restrict */];
            },
            /**
             * @copy egret.TextField#restrict
             *
             * @version Egret 2.5.7
             * @version eui 1.0
             * @platform Web,Native
             */
            set: function (value) {
                this.$TextInput[7 /* restrict */] = value;
                if (this.textDisplay) {
                    this.textDisplay.restrict = value;
                }
                this.invalidateProperties();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         * 焦点移入
         */
        TextInput.prototype.focusInHandler = function (event) {
            this.isFocus = true;
            this.invalidateState();
        };
        /**
         * @private
         * 焦点移出
         */
        TextInput.prototype.focusOutHandler = function (event) {
            this.isFocus = false;
            this.invalidateState();
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.5.7
         * @version eui 1.0
         * @platform Web,Native
         */
        TextInput.prototype.getCurrentState = function () {
            var skin = this.skin;
            if (this.prompt && !this.isFocus && !this.text) {
                if (this.enabled && skin.hasState("normalWithPrompt")) {
                    return "normalWithPrompt";
                }
                else if (!this.enabled && skin.hasState("disabledWithPrompt")) {
                    return "disabledWithPrompt";
                }
            }
            else {
                if (this.enabled) {
                    return "normal";
                }
                else {
                    return "disabled";
                }
            }
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.5.7
         * @version eui 1.0
         * @platform Web,Native
         */
        TextInput.prototype.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
            var values = this.$TextInput;
            if (instance == this.textDisplay) {
                this.textDisplayAdded();
                if (this.textDisplay instanceof eui.EditableText) {
                    this.textDisplay.addEventListener(FocusEvent.FOCUS_IN, this.focusInHandler, this);
                    this.textDisplay.addEventListener(FocusEvent.FOCUS_OUT, this.focusOutHandler, this);
                }
            }
            else if (instance == this.promptDisplay) {
                if (values[0 /* prompt */]) {
                    this.promptDisplay.text = values[0 /* prompt */];
                }
            }
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.5.7
         * @version eui 1.0
         * @platform Web,Native
         */
        TextInput.prototype.partRemoved = function (partName, instance) {
            _super.prototype.partRemoved.call(this, partName, instance);
            if (instance == this.textDisplay) {
                this.textDisplayRemoved();
                if (this.textDisplay instanceof eui.EditableText) {
                    this.textDisplay.removeEventListener(FocusEvent.FOCUS_IN, this.focusInHandler, this);
                    this.textDisplay.removeEventListener(FocusEvent.FOCUS_OUT, this.focusOutHandler, this);
                }
            }
            else if (instance == this.promptDisplay) {
                this.$TextInput[0 /* prompt */] = this.promptDisplay.text;
            }
        };
        /**
         * @private
         */
        TextInput.prototype.textDisplayAdded = function () {
            var values = this.$TextInput;
            if (values[1 /* displayAsPassword */]) {
                this.textDisplay.displayAsPassword = values[1 /* displayAsPassword */];
            }
            if (values[2 /* textColor */]) {
                this.textDisplay.textColor = values[2 /* textColor */];
            }
            if (values[3 /* maxChars */]) {
                this.textDisplay.maxChars = values[3 /* maxChars */];
            }
            if (values[4 /* maxWidth */]) {
                this.textDisplay.maxWidth = values[4 /* maxWidth */];
            }
            if (values[5 /* maxHeight */]) {
                this.textDisplay.maxHeight = values[5 /* maxHeight */];
            }
            if (values[6 /* text */]) {
                this.textDisplay.text = values[6 /* text */];
            }
            if (values[7 /* restrict */]) {
                this.textDisplay.restrict = values[7 /* restrict */];
            }
            if (values[8 /* inputType */]) {
                this.textDisplay.inputType = values[8 /* inputType */];
            }
        };
        /**
         * @private
         */
        TextInput.prototype.textDisplayRemoved = function () {
            var values = this.$TextInput;
            values[1 /* displayAsPassword */] = this.textDisplay.displayAsPassword;
            values[2 /* textColor */] = this.textDisplay.textColor;
            values[3 /* maxChars */] = this.textDisplay.maxChars;
            values[4 /* maxWidth */] = this.textDisplay.maxWidth;
            values[5 /* maxHeight */] = this.textDisplay.maxHeight;
            values[6 /* text */] = this.textDisplay.text;
            values[7 /* restrict */] = this.textDisplay.restrict;
            values[8 /* inputType */] = this.textDisplay.inputType;
        };
        return TextInput;
    }(eui.Component));
    eui.TextInput = TextInput;
    __reflect(TextInput.prototype, "eui.TextInput");
})(eui || (eui = {}));
//# sourceMappingURL=TextInput.js.map