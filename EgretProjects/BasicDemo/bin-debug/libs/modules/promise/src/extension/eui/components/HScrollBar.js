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
    /**
     * The HScrollBar (horizontal scrollbar) control lets you control
     * the portion of data that is displayed when there is too much data
     * to fit horizontally in a display area.
     *
     * <p>Although you can use the HScrollBar control as a stand-alone control,
     * you usually combine it as part of another group of components to
     * provide scrolling functionality.</p>
     *
     * @includeExample  extension/eui/components/HScrollBarExample.ts
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @language en_US
     */
    /**
     * HScrollBar（水平 ScrollBar）控件可以在因数据太多而不能在显示区域中以水平方向完全显示时控制显示的数据部分。
     * <p>虽然 HScrollBar 控件可以单独使用，但通常将它与其他组件一起使用来提供滚动功能。</p>
     *
     * @includeExample  extension/eui/components/HScrollBarExample.ts
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @language zh_CN
     */
    var HScrollBar = (function (_super) {
        __extends(HScrollBar, _super);
        function HScrollBar() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        HScrollBar.prototype.updateDisplayList = function (unscaledWidth, unscaledHeight) {
            _super.prototype.updateDisplayList.call(this, unscaledWidth, unscaledHeight);
            var thumb = this.thumb;
            var viewport = this.$viewport;
            if (!thumb || !viewport) {
                return;
            }
            var bounds = egret.$TempRectangle;
            thumb.getPreferredBounds(bounds);
            var thumbWidth = bounds.width;
            var thumbY = bounds.y;
            var hsp = viewport.scrollH;
            var contentWidth = viewport.contentWidth;
            var width = viewport.width;
            if (hsp <= 0) {
                var scaleWidth = thumbWidth * (1 - (-hsp) / (width * 0.5));
                scaleWidth = Math.max(5, Math.round(scaleWidth));
                thumb.setLayoutBoundsSize(scaleWidth, NaN);
                thumb.setLayoutBoundsPosition(0, thumbY);
            }
            else if (hsp >= contentWidth - width) {
                var scaleWidth = thumbWidth * (1 - (hsp - contentWidth + width) / (width * 0.5));
                scaleWidth = Math.max(5, Math.round(scaleWidth));
                thumb.setLayoutBoundsSize(scaleWidth, NaN);
                thumb.setLayoutBoundsPosition(unscaledWidth - scaleWidth, thumbY);
            }
            else {
                var thumbX = (unscaledWidth - thumbWidth) * hsp / (contentWidth - width);
                thumb.setLayoutBoundsSize(NaN, NaN);
                thumb.setLayoutBoundsPosition(thumbX, thumbY);
            }
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        HScrollBar.prototype.onPropertyChanged = function (event) {
            switch (event.property) {
                case "scrollH":
                case "contentWidth":
                    this.invalidateDisplayList();
                    break;
            }
        };
        return HScrollBar;
    }(eui.ScrollBarBase));
    eui.HScrollBar = HScrollBar;
    __reflect(HScrollBar.prototype, "eui.HScrollBar");
})(eui || (eui = {}));
//# sourceMappingURL=HScrollBar.js.map