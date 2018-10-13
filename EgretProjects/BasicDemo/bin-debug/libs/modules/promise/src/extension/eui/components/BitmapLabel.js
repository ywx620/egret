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
/// <reference path="../core/UIComponent.ts" />
var eui;
(function (eui) {
    var UIImpl = eui.sys.UIComponentImpl;
    /**
     * BitmapLabel is one line or multiline uneditable BitmapText
     * @version Egret 2.5.3
     * @version eui 1.0
     * @platform Web,Native
     * @language en_US
     */
    /**
     * BitmapLabel 组件是一行或多行不可编辑的位图文本
     * @version Egret 2.5.3
     * @version eui 1.0
     * @platform Web,Native
     * @language zh_CN
     */
    var BitmapLabel = (function (_super) {
        __extends(BitmapLabel, _super);
        function BitmapLabel(text) {
            var _this = _super.call(this) || this;
            _this.$createChildrenCalled = false;
            _this.$fontChanged = false;
            /**
             * @private
             */
            _this._widthConstraint = NaN;
            /**
             * @private
             */
            _this._heightConstraint = NaN;
            _this.initializeUIValues();
            _this.text = text;
            return _this;
        }
        /**
         * @private
         *
         */
        BitmapLabel.prototype.$invalidateContentBounds = function () {
            _super.prototype.$invalidateContentBounds.call(this);
            this.invalidateSize();
        };
        /**
         * @private
         *
         * @param value
         */
        BitmapLabel.prototype.$setWidth = function (value) {
            var result1 = _super.prototype.$setWidth.call(this, value);
            var result2 = UIImpl.prototype.$setWidth.call(this, value);
            return result1 && result2;
        };
        /**
         * @private
         *
         * @param value
         */
        BitmapLabel.prototype.$setHeight = function (value) {
            var result1 = _super.prototype.$setHeight.call(this, value);
            var result2 = UIImpl.prototype.$setHeight.call(this, value);
            return result1 && result2;
        };
        /**
         * @private
         *
         * @param value
         */
        BitmapLabel.prototype.$setText = function (value) {
            var result = _super.prototype.$setText.call(this, value);
            eui.PropertyEvent.dispatchPropertyEvent(this, eui.PropertyEvent.PROPERTY_CHANGE, "text");
            return result;
        };
        BitmapLabel.prototype.$setFont = function (value) {
            var values = this.$BitmapText;
            if (this.$font == value) {
                return false;
            }
            this.$font = value;
            if (this.$createChildrenCalled) {
                this.$parseFont();
            }
            else {
                this.$fontChanged = true;
            }
            this.$BitmapText[6 /* fontStringChanged */] = true;
            return true;
        };
        /**
         * 解析source
         */
        BitmapLabel.prototype.$parseFont = function () {
            var _this = this;
            this.$fontChanged = false;
            var font = this.$font;
            if (typeof font == "string") {
                eui.getAssets(font, function (bitmapFont) {
                    _this.$setFontData(bitmapFont);
                });
            }
            else {
                this.$setFontData(font);
            }
        };
        BitmapLabel.prototype.$setFontData = function (value) {
            if (value == this.$BitmapText[5 /* font */]) {
                return false;
            }
            this.$BitmapText[5 /* font */] = value;
            this.$invalidateContentBounds();
            return true;
        };
        /**
         * @copy eui.UIComponent#createChildren
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        BitmapLabel.prototype.createChildren = function () {
            if (this.$fontChanged) {
                this.$parseFont();
            }
            this.$createChildrenCalled = true;
        };
        /**
         * @copy eui.UIComponent#childrenCreated
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        BitmapLabel.prototype.childrenCreated = function () {
        };
        /**
         * @copy eui.UIComponent#commitProperties
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        BitmapLabel.prototype.commitProperties = function () {
        };
        /**
         * @copy eui.UIComponent#measure
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        BitmapLabel.prototype.measure = function () {
            var values = this.$UIComponent;
            var textValues = this.$BitmapText;
            var oldWidth = textValues[0 /* textFieldWidth */];
            var oldHeight = textValues[1 /* textFieldHeight */];
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
            var availableHeight = NaN;
            if (!isNaN(this._heightConstraint)) {
                availableHeight = this._heightConstraint;
                this._heightConstraint = NaN;
            }
            else if (!isNaN(values[9 /* explicitHeight */])) {
                availableHeight = values[9 /* explicitHeight */];
            }
            else if (values[15 /* maxHeight */] != 100000) {
                availableHeight = values[15 /* maxHeight */];
            }
            _super.prototype.$setHeight.call(this, availableHeight);
            this.setMeasuredSize(this.textWidth, this.textHeight);
            _super.prototype.$setWidth.call(this, oldWidth);
            _super.prototype.$setHeight.call(this, oldHeight);
        };
        /**
         * @copy eui.UIComponent#updateDisplayList
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        BitmapLabel.prototype.updateDisplayList = function (unscaledWidth, unscaledHeight) {
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
        BitmapLabel.prototype.invalidateParentLayout = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        BitmapLabel.prototype.setMeasuredSize = function (width, height) {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        BitmapLabel.prototype.invalidateProperties = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        BitmapLabel.prototype.validateProperties = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        BitmapLabel.prototype.invalidateSize = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        BitmapLabel.prototype.validateSize = function (recursive) {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        BitmapLabel.prototype.invalidateDisplayList = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        BitmapLabel.prototype.validateDisplayList = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        BitmapLabel.prototype.validateNow = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        BitmapLabel.prototype.setLayoutBoundsSize = function (layoutWidth, layoutHeight) {
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
            this._heightConstraint = layoutHeight;
            this.invalidateSize();
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        BitmapLabel.prototype.setLayoutBoundsPosition = function (x, y) {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        BitmapLabel.prototype.getLayoutBounds = function (bounds) {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        BitmapLabel.prototype.getPreferredBounds = function (bounds) {
        };
        return BitmapLabel;
    }(egret.BitmapText));
    eui.BitmapLabel = BitmapLabel;
    __reflect(BitmapLabel.prototype, "eui.BitmapLabel", ["eui.UIComponent", "egret.DisplayObject", "eui.IDisplayText"]);
    eui.sys.implementUIComponent(BitmapLabel, egret.BitmapText);
    eui.registerBindable(BitmapLabel.prototype, "text");
})(eui || (eui = {}));
//# sourceMappingURL=BitmapLabel.js.map