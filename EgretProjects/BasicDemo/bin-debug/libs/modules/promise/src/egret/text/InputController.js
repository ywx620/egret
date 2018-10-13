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
    /**
     * @private
     * @version Egret 2.4
     * @platform Web,Native
     */
    var InputController = (function (_super) {
        __extends(InputController, _super);
        /**
         * @version Egret 2.4
         * @platform Web,Native
         */
        function InputController() {
            var _this = _super.call(this) || this;
            /**
             * @private
             */
            _this.stageTextAdded = false;
            /**
             * @private
             */
            _this._text = null;
            /**
             * @private
             */
            _this._isFocus = false;
            return _this;
        }
        /**
         *
         * @param text
         * @version Egret 2.4
         * @platform Web,Native
         */
        InputController.prototype.init = function (text) {
            this._text = text;
            this.stageText = new egret.StageText();
            this.stageText.$setTextField(this._text);
        };
        /**
         * @private
         *
         */
        InputController.prototype._addStageText = function () {
            if (this.stageTextAdded) {
                return;
            }
            if (!this._text.$inputEnabled) {
                this._text.$touchEnabled = true;
            }
            this.tempStage = this._text.stage;
            this.stageText.$addToStage();
            this.stageText.addEventListener("updateText", this.updateTextHandler, this);
            this._text.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onMouseDownHandler, this);
            this.stageText.addEventListener("blur", this.blurHandler, this);
            this.stageText.addEventListener("focus", this.focusHandler, this);
            this.stageTextAdded = true;
        };
        /**
         * @private
         *
         */
        InputController.prototype._removeStageText = function () {
            if (!this.stageTextAdded) {
                return;
            }
            if (!this._text.$inputEnabled) {
                this._text.$touchEnabled = false;
            }
            this.stageText.$removeFromStage();
            this.stageText.removeEventListener("updateText", this.updateTextHandler, this);
            this._text.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onMouseDownHandler, this);
            this.tempStage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onStageDownHandler, this);
            this.stageText.removeEventListener("blur", this.blurHandler, this);
            this.stageText.removeEventListener("focus", this.focusHandler, this);
            this.stageTextAdded = false;
        };
        /**
         * @private
         *
         * @returns
         */
        InputController.prototype._getText = function () {
            return this.stageText.$getText();
        };
        /**
         * @private
         *
         * @param value
         */
        InputController.prototype._setText = function (value) {
            this.stageText.$setText(value);
        };
        /**
         * @private
         */
        InputController.prototype._setColor = function (value) {
            this.stageText.$setColor(value);
        };
        /**
         * @private
         *
         * @param event
         */
        InputController.prototype.focusHandler = function (event) {
            //不再显示竖线，并且输入框显示最开始
            if (!this._isFocus) {
                this._isFocus = true;
                if (!event["showing"]) {
                    this._text.$isTyping = true;
                }
                this._text.$invalidateContentBounds();
                this._text.dispatchEvent(new egret.FocusEvent(egret.FocusEvent.FOCUS_IN, true));
            }
        };
        /**
         * @private
         *
         * @param event
         */
        InputController.prototype.blurHandler = function (event) {
            if (this._isFocus) {
                //不再显示竖线，并且输入框显示最开始
                this._isFocus = false;
                this.tempStage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onStageDownHandler, this);
                this._text.$isTyping = false;
                this._text.$invalidateContentBounds();
                //失去焦点后调用
                this.stageText.$onBlur();
                this._text.dispatchEvent(new egret.FocusEvent(egret.FocusEvent.FOCUS_OUT, true));
            }
        };
        //点中文本
        InputController.prototype.onMouseDownHandler = function (event) {
            this.$onFocus();
        };
        InputController.prototype.$onFocus = function () {
            var _this = this;
            var self = this;
            if (!this._text.visible) {
                return;
            }
            if (this._isFocus) {
                return;
            }
            this.tempStage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onStageDownHandler, this);
            egret.callLater(function () {
                _this.tempStage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onStageDownHandler, _this);
            }, this);
            //强制更新输入框位置
            this.stageText.$show();
        };
        //未点中文本
        InputController.prototype.onStageDownHandler = function (event) {
            if (event.$target != this._text) {
                this.stageText.$hide();
            }
        };
        /**
         * @private
         *
         * @param event
         */
        InputController.prototype.updateTextHandler = function (event) {
            var values = this._text.$TextField;
            var textValue = this.stageText.$getText();
            var isChanged = false;
            var reg;
            var result;
            if (values[35 /* restrictAnd */] != null) {
                reg = new RegExp("[" + values[35 /* restrictAnd */] + "]", "g");
                result = textValue.match(reg);
                if (result) {
                    textValue = result.join("");
                }
                else {
                    textValue = "";
                }
                isChanged = true;
            }
            if (values[36 /* restrictNot */] != null) {
                reg = new RegExp("[^" + values[36 /* restrictNot */] + "]", "g");
                result = textValue.match(reg);
                if (result) {
                    textValue = result.join("");
                }
                else {
                    textValue = "";
                }
                isChanged = true;
            }
            if (isChanged && this.stageText.$getText() != textValue) {
                this.stageText.$setText(textValue);
            }
            this.resetText();
            //抛出change事件
            this._text.dispatchEvent(new egret.Event(egret.Event.CHANGE, true));
        };
        /**
         * @private
         *
         */
        InputController.prototype.resetText = function () {
            this._text.$setBaseText(this.stageText.$getText());
        };
        /**
         * @private
         *
         */
        InputController.prototype._hideInput = function () {
            this.stageText.$removeFromStage();
        };
        /**
         * @private
         *
         */
        InputController.prototype.updateInput = function () {
            if (!this._text.$visible && this.stageText) {
                this._hideInput();
            }
        };
        /**
         * @private
         *
         */
        InputController.prototype._updateProperties = function () {
            if (this._isFocus) {
                //整体修改
                this.stageText.$resetStageText();
                this.updateInput();
                return;
            }
            var stage = this._text.$stage;
            if (stage == null) {
            }
            else {
                var item = this._text;
                var visible = item.$visible;
                while (true) {
                    if (!visible) {
                        break;
                    }
                    item = item.parent;
                    if (item == stage) {
                        break;
                    }
                    visible = item.$visible;
                }
            }
            this.stageText.$setText(this._text.$TextField[13 /* text */]);
            //整体修改
            this.stageText.$resetStageText();
            this.updateInput();
        };
        return InputController;
    }(egret.HashObject));
    egret.InputController = InputController;
    __reflect(InputController.prototype, "egret.InputController");
})(egret || (egret = {}));
//# sourceMappingURL=InputController.js.map