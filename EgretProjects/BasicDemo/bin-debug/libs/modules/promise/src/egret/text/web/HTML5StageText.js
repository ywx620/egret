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
    var web;
    (function (web) {
        /**
         * @classdesc
         * @extends egret.StageText
         * @private
         */
        var HTML5StageText = (function (_super) {
            __extends(HTML5StageText, _super);
            /**
             * @private
             */
            function HTML5StageText() {
                var _this = _super.call(this) || this;
                /**
                 * @private
                 */
                _this._isNeedShow = false;
                /**
                 * @private
                 */
                _this.inputElement = null;
                /**
                 * @private
                 */
                _this.inputDiv = null;
                /**
                 * @private
                 */
                _this._gscaleX = 0;
                /**
                 * @private
                 */
                _this._gscaleY = 0;
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
                _this._styleInfoes = {};
                return _this;
            }
            /**
             * @private
             *
             * @param textfield
             */
            HTML5StageText.prototype.$setTextField = function (textfield) {
                this.$textfield = textfield;
                return true;
            };
            /**
             * @private
             *
             */
            HTML5StageText.prototype.$addToStage = function () {
                this.htmlInput = egret.web.$getTextAdapter(this.$textfield);
            };
            /**
             * @private
             *
             */
            HTML5StageText.prototype._initElement = function () {
                var point = this.$textfield.localToGlobal(0, 0);
                var x = point.x;
                var y = point.y;
                // let m = this.$textfield.$renderNode.renderMatrix;
                // let cX = m.a;
                // let cY = m.d;
                var scaleX = this.htmlInput.$scaleX;
                var scaleY = this.htmlInput.$scaleY;
                this.inputDiv.style.left = x * scaleX + "px";
                this.inputDiv.style.top = y * scaleY + "px";
                if (this.$textfield.multiline && this.$textfield.height > this.$textfield.size) {
                    this.inputDiv.style.top = (y) * scaleY + "px";
                    this.inputElement.style.top = (-this.$textfield.lineSpacing / 2) * scaleY + "px";
                }
                else {
                    this.inputDiv.style.top = y * scaleY + "px";
                    this.inputElement.style.top = 0 + "px";
                }
                var node = this.$textfield;
                var cX = 1;
                var cY = 1;
                var rotation = 0;
                while (node.parent) {
                    cX *= node.scaleX;
                    cY *= node.scaleY;
                    rotation += node.rotation;
                    node = node.parent;
                }
                var transformKey = egret.web.getPrefixStyleName("transform");
                this.inputDiv.style[transformKey] = "rotate(" + rotation + "deg)";
                this._gscaleX = scaleX * cX;
                this._gscaleY = scaleY * cY;
            };
            /**
             * @private
             *
             */
            HTML5StageText.prototype.$show = function () {
                if (!this.htmlInput.isCurrentStageText(this)) {
                    this.inputElement = this.htmlInput.getInputElement(this);
                    if (!this.$textfield.multiline) {
                        this.inputElement.type = this.$textfield.inputType;
                    }
                    else {
                        this.inputElement.type = "text";
                    }
                    this.inputDiv = this.htmlInput._inputDIV;
                }
                else {
                    this.inputElement.onblur = null;
                }
                this.htmlInput._needShow = true;
                //标记当前文本被选中
                this._isNeedShow = true;
                this._initElement();
            };
            /**
             * @private
             *
             */
            HTML5StageText.prototype.onBlurHandler = function () {
                this.htmlInput.clearInputElement();
                window.scrollTo(0, 0);
            };
            /**
             * @private
             *
             */
            HTML5StageText.prototype.executeShow = function () {
                var self = this;
                //打开
                this.inputElement.value = this.$getText();
                if (this.inputElement.onblur == null) {
                    this.inputElement.onblur = this.onBlurHandler.bind(this);
                }
                this.$resetStageText();
                if (this.$textfield.maxChars > 0) {
                    this.inputElement.setAttribute("maxlength", this.$textfield.maxChars);
                }
                else {
                    this.inputElement.removeAttribute("maxlength");
                }
                this.inputElement.selectionStart = this.inputElement.value.length;
                this.inputElement.selectionEnd = this.inputElement.value.length;
                this.inputElement.focus();
            };
            /**
             * @private
             */
            HTML5StageText.prototype.$hide = function () {
                if (this.htmlInput) {
                    this.htmlInput.disconnectStageText(this);
                }
            };
            /**
             * @private
             *
             * @returns
             */
            HTML5StageText.prototype.$getText = function () {
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
            HTML5StageText.prototype.$setText = function (value) {
                this.textValue = value;
                this.resetText();
                return true;
            };
            /**
             * @private
             *
             */
            HTML5StageText.prototype.resetText = function () {
                if (this.inputElement) {
                    this.inputElement.value = this.textValue;
                }
            };
            HTML5StageText.prototype.$setColor = function (value) {
                this.colorValue = value;
                this.resetColor();
                return true;
            };
            /**
             * @private
             *
             */
            HTML5StageText.prototype.resetColor = function () {
                if (this.inputElement) {
                    this.setElementStyle("color", egret.toColorString(this.colorValue));
                }
            };
            HTML5StageText.prototype.$onBlur = function () {
                if (web.Html5Capatibility._System_OS == web.SystemOSType.WPHONE) {
                    egret.Event.dispatchEvent(this, "updateText", false);
                }
            };
            /**
             * @private
             *
             */
            HTML5StageText.prototype._onInput = function () {
                var self = this;
                if (web.Html5Capatibility._System_OS == web.SystemOSType.WPHONE) {
                    var values = this.$textfield.$TextField;
                    if (values[35 /* restrictAnd */] == null && values[36 /* restrictNot */] == null) {
                        self.textValue = self.inputElement.value;
                        egret.Event.dispatchEvent(self, "updateText", false);
                    }
                    else {
                        window.setTimeout(function () {
                            if (self.inputElement && self.inputElement.selectionStart && self.inputElement.selectionEnd) {
                                if (self.inputElement.selectionStart == self.inputElement.selectionEnd) {
                                    self.textValue = self.inputElement.value;
                                    egret.Event.dispatchEvent(self, "updateText", false);
                                }
                            }
                        }, 0);
                    }
                }
                else {
                    window.setTimeout(function () {
                        if (self.inputElement && self.inputElement.selectionStart == self.inputElement.selectionEnd) {
                            self.textValue = self.inputElement.value;
                            egret.Event.dispatchEvent(self, "updateText", false);
                        }
                    }, 0);
                }
            };
            HTML5StageText.prototype.setAreaHeight = function () {
                var textfield = this.$textfield;
                if (textfield.multiline) {
                    var textheight = egret.TextFieldUtils.$getTextHeight(textfield);
                    if (textfield.height <= textfield.size) {
                        this.setElementStyle("height", (textfield.size) * this._gscaleY + "px");
                        this.setElementStyle("padding", "0px");
                        this.setElementStyle("lineHeight", (textfield.size) * this._gscaleY + "px");
                    }
                    else if (textfield.height < textheight) {
                        this.setElementStyle("height", (textfield.height) * this._gscaleY + "px");
                        this.setElementStyle("padding", "0px");
                        this.setElementStyle("lineHeight", (textfield.size + textfield.lineSpacing) * this._gscaleY + "px");
                    }
                    else {
                        this.setElementStyle("height", (textheight + textfield.lineSpacing) * this._gscaleY + "px");
                        var rap = (textfield.height - textheight) * this._gscaleY;
                        var valign = egret.TextFieldUtils.$getValign(textfield);
                        var top_1 = rap * valign;
                        var bottom = rap - top_1;
                        this.setElementStyle("padding", top_1 + "px 0px " + bottom + "px 0px");
                        this.setElementStyle("lineHeight", (textfield.size + textfield.lineSpacing) * this._gscaleY + "px");
                    }
                }
            };
            /**
             * @private
             *
             * @param e
             */
            HTML5StageText.prototype._onClickHandler = function (e) {
                if (this._isNeedShow) {
                    e.stopImmediatePropagation();
                    //e.preventDefault();
                    this._isNeedShow = false;
                    this.executeShow();
                    this.dispatchEvent(new egret.Event("focus"));
                }
            };
            /**
             * @private
             *
             */
            HTML5StageText.prototype._onDisconnect = function () {
                this.inputElement = null;
                this.dispatchEvent(new egret.Event("blur"));
            };
            /**
             * @private
             *
             * @param style
             * @param value
             */
            HTML5StageText.prototype.setElementStyle = function (style, value) {
                if (this.inputElement) {
                    if (this._styleInfoes[style] != value) {
                        this.inputElement.style[style] = value;
                        //this._styleInfoes[style] = value;
                    }
                }
            };
            /**
             * @private
             *
             */
            HTML5StageText.prototype.$removeFromStage = function () {
                if (this.inputElement) {
                    this.htmlInput.disconnectStageText(this);
                }
            };
            /**
             * 修改位置
             * @private
             */
            HTML5StageText.prototype.$resetStageText = function () {
                if (this.inputElement) {
                    var textfield = this.$textfield;
                    this.setElementStyle("fontFamily", textfield.fontFamily);
                    this.setElementStyle("fontStyle", textfield.italic ? "italic" : "normal");
                    this.setElementStyle("fontWeight", textfield.bold ? "bold" : "normal");
                    this.setElementStyle("textAlign", textfield.textAlign);
                    this.setElementStyle("fontSize", textfield.size * this._gscaleY + "px");
                    this.setElementStyle("color", egret.toColorString(textfield.textColor));
                    var tw = void 0;
                    if (textfield.stage) {
                        tw = textfield.localToGlobal(0, 0).x;
                        tw = Math.min(textfield.width, textfield.stage.stageWidth - tw);
                    }
                    else {
                        tw = textfield.width;
                    }
                    this.setElementStyle("width", tw * this._gscaleX + "px");
                    this.setElementStyle("verticalAlign", textfield.verticalAlign);
                    if (textfield.multiline) {
                        this.setAreaHeight();
                    }
                    else {
                        this.setElementStyle("lineHeight", (textfield.size) * this._gscaleY + "px");
                        if (textfield.height < textfield.size) {
                            this.setElementStyle("height", (textfield.size) * this._gscaleY + "px");
                            var bottom = (textfield.size / 2) * this._gscaleY;
                            this.setElementStyle("padding", "0px 0px " + bottom + "px 0px");
                        }
                        else {
                            this.setElementStyle("height", (textfield.size) * this._gscaleY + "px");
                            var rap = (textfield.height - textfield.size) * this._gscaleY;
                            var valign = egret.TextFieldUtils.$getValign(textfield);
                            var top_2 = rap * valign;
                            var bottom = rap - top_2;
                            if (bottom < textfield.size / 2 * this._gscaleY) {
                                bottom = textfield.size / 2 * this._gscaleY;
                            }
                            this.setElementStyle("padding", top_2 + "px 0px " + bottom + "px 0px");
                        }
                    }
                    this.inputDiv.style.clip = "rect(0px " + (textfield.width * this._gscaleX) + "px " + (textfield.height * this._gscaleY) + "px 0px)";
                    this.inputDiv.style.height = textfield.height * this._gscaleY + "px";
                    this.inputDiv.style.width = tw * this._gscaleX + "px";
                }
            };
            return HTML5StageText;
        }(egret.EventDispatcher));
        web.HTML5StageText = HTML5StageText;
        __reflect(HTML5StageText.prototype, "egret.web.HTML5StageText", ["egret.StageText"]);
        egret.StageText = HTML5StageText;
    })(web = egret.web || (egret.web = {}));
})(egret || (egret = {}));
(function (egret) {
    var web;
    (function (web) {
        /**
         * @private
         */
        var HTMLInput = (function () {
            function HTMLInput() {
                /**
                 * @private
                 */
                this._needShow = false;
                /**
                 * @private
                 */
                this.$scaleX = 1;
                /**
                 * @private
                 */
                this.$scaleY = 1;
            }
            /**
             * @private
             *
             * @returns
             */
            HTMLInput.prototype.isInputOn = function () {
                return this._stageText != null;
            };
            /**
             * @private
             *
             * @param stageText
             * @returns
             */
            HTMLInput.prototype.isCurrentStageText = function (stageText) {
                return this._stageText == stageText;
            };
            /**
             * @private
             *
             * @param dom
             */
            HTMLInput.prototype.initValue = function (dom) {
                dom.style.position = "absolute";
                dom.style.left = "0px";
                dom.style.top = "0px";
                dom.style.border = "none";
                dom.style.padding = "0";
            };
            /**
             * @private
             *
             */
            HTMLInput.prototype.$updateSize = function () {
                if (!this.canvas) {
                    return;
                }
                var stageW = this.canvas.width;
                var stageH = this.canvas.height;
                var screenW = this.canvas.style.width.split("px")[0];
                var screenH = this.canvas.style.height.split("px")[0];
                this.$scaleX = screenW / stageW;
                this.$scaleY = screenH / stageH;
                this.StageDelegateDiv.style.left = this.canvas.style.left;
                this.StageDelegateDiv.style.top = this.canvas.style.top;
                var transformKey = egret.web.getPrefixStyleName("transform");
                this.StageDelegateDiv.style[transformKey] = this.canvas.style[transformKey];
                this.StageDelegateDiv.style[egret.web.getPrefixStyleName("transformOrigin")] = "0% 0% 0px";
            };
            /**
             * @private
             *
             * @param container
             * @param canvas
             * @returns
             */
            HTMLInput.prototype._initStageDelegateDiv = function (container, canvas) {
                this.canvas = canvas;
                var self = this;
                var stageDelegateDiv;
                if (!stageDelegateDiv) {
                    stageDelegateDiv = document.createElement("div");
                    this.StageDelegateDiv = stageDelegateDiv;
                    stageDelegateDiv.id = "StageDelegateDiv";
                    container.appendChild(stageDelegateDiv);
                    self.initValue(stageDelegateDiv);
                    self._inputDIV = document.createElement("div");
                    self.initValue(self._inputDIV);
                    self._inputDIV.style.width = "0px";
                    self._inputDIV.style.height = "0px";
                    self._inputDIV.style.left = 0 + "px";
                    self._inputDIV.style.top = "-100px";
                    self._inputDIV.style[egret.web.getPrefixStyleName("transformOrigin")] = "0% 0% 0px";
                    stageDelegateDiv.appendChild(self._inputDIV);
                    this.canvas.addEventListener("click", function (e) {
                        if (self._needShow) {
                            self._needShow = false;
                            self._stageText._onClickHandler(e);
                            self.show();
                        }
                        else {
                            if (self._inputElement) {
                                self.clearInputElement();
                                self._inputElement.blur();
                                self._inputElement = null;
                            }
                        }
                    });
                    self.initInputElement(true);
                    self.initInputElement(false);
                }
            };
            //初始化输入框
            HTMLInput.prototype.initInputElement = function (multiline) {
                var self = this;
                //增加1个空的textarea
                var inputElement;
                if (multiline) {
                    inputElement = document.createElement("textarea");
                    inputElement.style["resize"] = "none";
                    self._multiElement = inputElement;
                    inputElement.id = "egretTextarea";
                }
                else {
                    inputElement = document.createElement("input");
                    self._simpleElement = inputElement;
                    inputElement.id = "egretInput";
                }
                inputElement.type = "text";
                self._inputDIV.appendChild(inputElement);
                inputElement.setAttribute("tabindex", "-1");
                inputElement.style.width = "1px";
                inputElement.style.height = "12px";
                self.initValue(inputElement);
                inputElement.style.outline = "thin";
                inputElement.style.background = "none";
                inputElement.style.overflow = "hidden";
                inputElement.style.wordBreak = "break-all";
                //隐藏输入框
                inputElement.style.opacity = 0;
                inputElement.oninput = function () {
                    if (self._stageText) {
                        self._stageText._onInput();
                    }
                };
            };
            /**
             * @private
             *
             */
            HTMLInput.prototype.show = function () {
                var self = this;
                var inputElement = self._inputElement;
                //隐藏输入框
                egret.$callAsync(function () {
                    inputElement.style.opacity = 1;
                }, self);
            };
            /**
             * @private
             *
             * @param stageText
             */
            HTMLInput.prototype.disconnectStageText = function (stageText) {
                if (this._stageText == null || this._stageText == stageText) {
                    this.clearInputElement();
                    if (this._inputElement) {
                        this._inputElement.blur();
                    }
                }
            };
            /**
             * @private
             *
             */
            HTMLInput.prototype.clearInputElement = function () {
                var self = this;
                if (self._inputElement) {
                    self._inputElement.value = "";
                    self._inputElement.onblur = null;
                    self._inputElement.style.width = "1px";
                    self._inputElement.style.height = "12px";
                    self._inputElement.style.left = "0px";
                    self._inputElement.style.top = "0px";
                    self._inputElement.style.opacity = 0;
                    var otherElement = void 0;
                    if (self._simpleElement == self._inputElement) {
                        otherElement = self._multiElement;
                    }
                    else {
                        otherElement = self._simpleElement;
                    }
                    otherElement.style.display = "block";
                    self._inputDIV.style.left = 0 + "px";
                    self._inputDIV.style.top = "-100px";
                    self._inputDIV.style.height = 0 + "px";
                    self._inputDIV.style.width = 0 + "px";
                }
                if (self._stageText) {
                    self._stageText._onDisconnect();
                    self._stageText = null;
                    this.canvas['userTyping'] = false;
                }
            };
            /**
             * @private
             *
             * @param stageText
             * @returns
             */
            HTMLInput.prototype.getInputElement = function (stageText) {
                var self = this;
                self.clearInputElement();
                self._stageText = stageText;
                this.canvas['userTyping'] = true;
                if (self._stageText.$textfield.multiline) {
                    self._inputElement = self._multiElement;
                }
                else {
                    self._inputElement = self._simpleElement;
                }
                var otherElement;
                if (self._simpleElement == self._inputElement) {
                    otherElement = self._multiElement;
                }
                else {
                    otherElement = self._simpleElement;
                }
                otherElement.style.display = "none";
                return self._inputElement;
            };
            return HTMLInput;
        }());
        web.HTMLInput = HTMLInput;
        __reflect(HTMLInput.prototype, "egret.web.HTMLInput");
    })(web = egret.web || (egret.web = {}));
})(egret || (egret = {}));
(function (egret) {
    var web;
    (function (web) {
        var stageToTextLayerMap = {};
        var stageToCanvasMap = {};
        var stageToContainerMap = {};
        /**
         * @private
         * 获取
         */
        function $getTextAdapter(textfield) {
            var stageHash = textfield.stage ? textfield.stage.$hashCode : 0;
            var adapter = stageToTextLayerMap[stageHash];
            var canvas = stageToCanvasMap[stageHash];
            var container = stageToContainerMap[stageHash];
            if (canvas && container) {
                //adapter._initStageDelegateDiv(container, canvas);
                //adapter.$updateSize();
                delete stageToCanvasMap[stageHash];
                delete stageToContainerMap[stageHash];
            }
            return adapter;
        }
        web.$getTextAdapter = $getTextAdapter;
        /**
         * @private
         */
        function $cacheTextAdapter(adapter, stage, container, canvas) {
            adapter._initStageDelegateDiv(container, canvas);
            stageToTextLayerMap[stage.$hashCode] = adapter;
            stageToCanvasMap[stage.$hashCode] = canvas;
            stageToContainerMap[stage.$hashCode] = container;
        }
        web.$cacheTextAdapter = $cacheTextAdapter;
    })(web = egret.web || (egret.web = {}));
})(egret || (egret = {}));
//# sourceMappingURL=HTML5StageText.js.map