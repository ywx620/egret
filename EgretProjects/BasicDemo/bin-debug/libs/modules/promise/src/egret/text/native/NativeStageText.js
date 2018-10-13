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
    var native;
    (function (native) {
        /**
         * @classdesc
         * @implements egret.StageText
         * @private
         * @version Egret 2.4
         * @platform Web,Native
         */
        var NativeStageText = (function (_super) {
            __extends(NativeStageText, _super);
            /**
             * @version Egret 2.4
             * @platform Web,Native
             */
            function NativeStageText() {
                var _this = _super.call(this) || this;
                /**
                 * @private
                 */
                _this.textValue = "";
                /**
                 * @private
                 */
                _this.colorValue = 0xffffff;
                /**
                 * @private
                 */
                _this.isFinishDown = false;
                _this.textValue = "";
                return _this;
            }
            /**
             * @private
             *
             * @returns
             */
            NativeStageText.prototype.$getText = function () {
                if (!this.textValue) {
                    this.textValue = "";
                }
                return this.textValue;
            };
            /**
             * @private
             *
             * @param value
             */
            NativeStageText.prototype.$setText = function (value) {
                this.textValue = value;
                return true;
            };
            NativeStageText.prototype.$setColor = function (value) {
                this.colorValue = value;
                return true;
            };
            /**
             * @private
             *
             */
            NativeStageText.prototype.$onBlur = function () {
            };
            //全屏键盘
            NativeStageText.prototype.showScreenKeyboard = function () {
                var self = this;
                self.dispatchEvent(new egret.Event("focus"));
                egret.Event.dispatchEvent(self, "focus", false, { "showing": true });
                egret_native.EGT_TextInput = function (appendText) {
                    if (self.$textfield.multiline) {
                        self.textValue = appendText;
                        self.dispatchEvent(new egret.Event("updateText"));
                        if (self.isFinishDown) {
                            self.isFinishDown = false;
                            self.dispatchEvent(new egret.Event("blur"));
                        }
                    }
                    else {
                        self.textValue = appendText.replace(/[\n|\r]/, "");
                        //关闭软键盘
                        egret_native.TextInputOp.setKeybordOpen(false);
                        self.dispatchEvent(new egret.Event("updateText"));
                        self.dispatchEvent(new egret.Event("blur"));
                    }
                };
                //点击完成
                egret_native.EGT_keyboardFinish = function () {
                    if (self.$textfield.multiline) {
                        self.isFinishDown = true;
                    }
                };
            };
            /**
             * @private
             *
             */
            NativeStageText.prototype.$show = function () {
                var self = this;
                var textfield = this.$textfield;
                var values = textfield.$TextField;
                egret_native.TextInputOp.setKeybordOpen(false);
                egret_native.EGT_getTextEditerContentText = function () {
                    return self.$getText();
                };
                egret_native.EGT_keyboardDidShow = function () {
                    //if (egret_native.TextInputOp.isFullScreenKeyBoard()) {//横屏
                    //}
                    self.showScreenKeyboard();
                    egret_native.EGT_keyboardDidShow = function () {
                    };
                    if (egret_native.TextInputOp.updateConfig) {
                        egret_native.TextInputOp.updateConfig(JSON.stringify({
                            "font_color": values[2 /* textColor */]
                        }));
                    }
                };
                egret_native.EGT_keyboardDidHide = function () {
                };
                egret_native.EGT_deleteBackward = function () {
                };
                var inputType = values[37 /* inputType */];
                var inputMode = values[30 /* multiline */] ? 0 : 6;
                var inputFlag = -1; //textfield.displayAsPassword ? 0 : -1;
                if (inputType == egret.TextFieldInputType.PASSWORD) {
                    inputFlag = 0;
                }
                else if (inputType == egret.TextFieldInputType.TEL) {
                    inputMode = 3;
                }
                var returnType = 1;
                var maxLength = values[21 /* maxChars */] <= 0 ? -1 : values[21 /* maxChars */];
                var node = textfield.$getRenderNode();
                var point = this.$textfield.localToGlobal(0, 0);
                egret_native.TextInputOp.setKeybordOpen(true, JSON.stringify({
                    "inputMode": inputMode,
                    "inputFlag": inputFlag,
                    "returnType": returnType,
                    "maxLength": maxLength,
                    "x": point.x,
                    "y": point.y,
                    "width": textfield.width,
                    "height": textfield.height,
                    "font_size": values[0 /* fontSize */],
                    "font_color": values[2 /* textColor */],
                    "textAlign": values[9 /* textAlign */],
                    "verticalAlign": values[10 /* verticalAlign */]
                }));
            };
            /**
             * @private
             *
             */
            NativeStageText.prototype.$hide = function () {
                egret_native.TextInputOp.setKeybordOpen(false);
                this.dispatchEvent(new egret.Event("blur"));
            };
            NativeStageText.prototype.$resetStageText = function () {
            };
            NativeStageText.prototype.$addToStage = function () {
            };
            NativeStageText.prototype.$removeFromStage = function () {
            };
            NativeStageText.prototype.$setTextField = function (value) {
                this.$textfield = value;
                return true;
            };
            return NativeStageText;
        }(egret.EventDispatcher));
        native.NativeStageText = NativeStageText;
        __reflect(NativeStageText.prototype, "egret.native.NativeStageText", ["egret.StageText"]);
        egret.StageText = NativeStageText;
    })(native = egret.native || (egret.native = {}));
})(egret || (egret = {}));
//# sourceMappingURL=NativeStageText.js.map