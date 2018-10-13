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
    var UIComponentClass = "eui.UIComponent";
    /**
     * The VerticalLayout class arranges the layout elements in a vertical sequence,
     * top to bottom, with optional gaps between the elements and optional padding
     * around the sequence of elements.
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/layout/VerticalLayoutExample.ts
     * @language en_US
     */
    /**
     * VerticalLayout 类按垂直顺序从上向下排列布局元素，在元素和围绕元素顺序的可选填充之间带有可选间隙。
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/layout/VerticalLayoutExample.ts
     * @language zh_CN
     */
    var VerticalLayout = (function (_super) {
        __extends(VerticalLayout, _super);
        function VerticalLayout() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        VerticalLayout.prototype.measureReal = function () {
            var target = this.$target;
            var count = target.numElements;
            var numElements = count;
            var measuredWidth = 0;
            var measuredHeight = 0;
            var bounds = egret.$TempRectangle;
            for (var i = 0; i < count; i++) {
                var layoutElement = (target.getElementAt(i));
                if (!egret.is(layoutElement, UIComponentClass) || !layoutElement.$includeInLayout) {
                    numElements--;
                    continue;
                }
                layoutElement.getPreferredBounds(bounds);
                measuredHeight += bounds.height;
                measuredWidth = Math.max(measuredWidth, bounds.width);
            }
            measuredHeight += (numElements - 1) * this.$gap;
            var hPadding = this.$paddingLeft + this.$paddingRight;
            var vPadding = this.$paddingTop + this.$paddingBottom;
            target.setMeasuredSize(measuredWidth + hPadding, measuredHeight + vPadding);
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        VerticalLayout.prototype.measureVirtual = function () {
            var target = this.$target;
            var typicalHeight = this.$typicalHeight;
            var measuredHeight = this.getElementTotalSize();
            var measuredWidth = Math.max(this.maxElementSize, this.$typicalWidth);
            var bounds = egret.$TempRectangle;
            var endIndex = this.endIndex;
            var elementSizeTable = this.elementSizeTable;
            for (var index = this.startIndex; index < endIndex; index++) {
                var layoutElement = (target.getElementAt(index));
                if (!egret.is(layoutElement, UIComponentClass) || !layoutElement.$includeInLayout) {
                    continue;
                }
                layoutElement.getPreferredBounds(bounds);
                measuredHeight += bounds.height;
                measuredHeight -= isNaN(elementSizeTable[index]) ? typicalHeight : elementSizeTable[index];
                measuredWidth = Math.max(measuredWidth, bounds.width);
            }
            var hPadding = this.$paddingLeft + this.$paddingRight;
            var vPadding = this.$paddingTop + this.$paddingBottom;
            target.setMeasuredSize(measuredWidth + hPadding, measuredHeight + vPadding);
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        VerticalLayout.prototype.updateDisplayListReal = function (width, height) {
            var target = this.$target;
            var paddingL = this.$paddingLeft;
            var paddingR = this.$paddingRight;
            var paddingT = this.$paddingTop;
            var paddingB = this.$paddingBottom;
            var gap = this.$gap;
            var targetWidth = Math.max(0, width - paddingL - paddingR);
            var targetHeight = Math.max(0, height - paddingT - paddingB);
            var vJustify = this.$verticalAlign == eui.JustifyAlign.JUSTIFY;
            var hJustify = this.$horizontalAlign == eui.JustifyAlign.JUSTIFY || this.$horizontalAlign == eui.JustifyAlign.CONTENT_JUSTIFY;
            var hAlign = 0;
            if (!hJustify) {
                if (this.$horizontalAlign == egret.HorizontalAlign.CENTER) {
                    hAlign = 0.5;
                }
                else if (this.$horizontalAlign == egret.HorizontalAlign.RIGHT) {
                    hAlign = 1;
                }
            }
            var count = target.numElements;
            var numElements = count;
            var x = paddingL;
            var y = paddingT;
            var i;
            var layoutElement;
            var totalPreferredHeight = 0;
            var totalPercentHeight = 0;
            var childInfoArray = [];
            var childInfo;
            var heightToDistribute = targetHeight;
            var maxElementWidth = this.maxElementSize;
            var bounds = egret.$TempRectangle;
            for (i = 0; i < count; i++) {
                var layoutElement_1 = (target.getElementAt(i));
                if (!egret.is(layoutElement_1, UIComponentClass) || !layoutElement_1.$includeInLayout) {
                    numElements--;
                    continue;
                }
                layoutElement_1.getPreferredBounds(bounds);
                maxElementWidth = Math.max(maxElementWidth, bounds.width);
                if (vJustify) {
                    totalPreferredHeight += bounds.height;
                }
                else {
                    var values = layoutElement_1.$UIComponent;
                    if (!isNaN(values[7 /* percentHeight */])) {
                        totalPercentHeight += values[7 /* percentHeight */];
                        childInfo = new eui.sys.ChildInfo();
                        childInfo.layoutElement = layoutElement_1;
                        childInfo.percent = values[7 /* percentHeight */];
                        childInfo.min = values[14 /* minHeight */];
                        childInfo.max = values[15 /* maxHeight */];
                        childInfoArray.push(childInfo);
                    }
                    else {
                        heightToDistribute -= bounds.height;
                    }
                }
            }
            heightToDistribute -= gap * (numElements - 1);
            heightToDistribute = heightToDistribute > 0 ? heightToDistribute : 0;
            var excessSpace = targetHeight - totalPreferredHeight - gap * (numElements - 1);
            var averageHeight;
            var largeChildrenCount = numElements;
            var heightDic = {};
            if (vJustify) {
                if (excessSpace < 0) {
                    averageHeight = heightToDistribute / numElements;
                    for (i = 0; i < count; i++) {
                        layoutElement = (target.getElementAt(i));
                        if (!egret.is(layoutElement, UIComponentClass) || !layoutElement.$includeInLayout) {
                            continue;
                        }
                        layoutElement.getPreferredBounds(bounds);
                        if (bounds.height <= averageHeight) {
                            heightToDistribute -= bounds.height;
                            largeChildrenCount--;
                            continue;
                        }
                    }
                    heightToDistribute = heightToDistribute > 0 ? heightToDistribute : 0;
                }
            }
            else {
                if (totalPercentHeight > 0) {
                    this.flexChildrenProportionally(targetHeight, heightToDistribute, totalPercentHeight, childInfoArray);
                    var roundOff_1 = 0;
                    var length_1 = childInfoArray.length;
                    for (i = 0; i < length_1; i++) {
                        childInfo = childInfoArray[i];
                        var childSize = Math.round(childInfo.size + roundOff_1);
                        roundOff_1 += childInfo.size - childSize;
                        heightDic[childInfo.layoutElement.$hashCode] = childSize;
                        heightToDistribute -= childSize;
                    }
                    heightToDistribute = heightToDistribute > 0 ? heightToDistribute : 0;
                }
            }
            if (this.$verticalAlign == egret.VerticalAlign.MIDDLE) {
                y = paddingT + heightToDistribute * 0.5;
            }
            else if (this.$verticalAlign == egret.VerticalAlign.BOTTOM) {
                y = paddingT + heightToDistribute;
            }
            var maxX = paddingL;
            var maxY = paddingT;
            var dx = 0;
            var dy = 0;
            var justifyWidth = Math.ceil(targetWidth);
            if (this.$horizontalAlign == eui.JustifyAlign.CONTENT_JUSTIFY)
                justifyWidth = Math.ceil(Math.max(targetWidth, maxElementWidth));
            var roundOff = 0;
            var layoutElementHeight;
            var childHeight;
            for (i = 0; i < count; i++) {
                var exceesWidth = 0;
                layoutElement = (target.getElementAt(i));
                if (!egret.is(layoutElement, UIComponentClass) || !layoutElement.$includeInLayout) {
                    continue;
                }
                layoutElement.getPreferredBounds(bounds);
                layoutElementHeight = NaN;
                if (vJustify) {
                    childHeight = NaN;
                    if (excessSpace > 0) {
                        childHeight = heightToDistribute * bounds.height / totalPreferredHeight;
                    }
                    else if (excessSpace < 0 && bounds.height > averageHeight) {
                        childHeight = heightToDistribute / largeChildrenCount;
                    }
                    if (!isNaN(childHeight)) {
                        layoutElementHeight = Math.round(childHeight + roundOff);
                        roundOff += childHeight - layoutElementHeight;
                    }
                }
                else {
                    layoutElementHeight = heightDic[layoutElement.$hashCode];
                }
                if (hJustify) {
                    x = paddingL;
                    layoutElement.setLayoutBoundsSize(justifyWidth, layoutElementHeight);
                    layoutElement.getLayoutBounds(bounds);
                }
                else {
                    var layoutElementWidth = NaN;
                    var values = layoutElement.$UIComponent;
                    if (!isNaN(values[6 /* percentWidth */])) {
                        var percent = Math.min(100, values[6 /* percentWidth */]);
                        layoutElementWidth = Math.round(targetWidth * percent * 0.01);
                    }
                    layoutElement.setLayoutBoundsSize(layoutElementWidth, layoutElementHeight);
                    layoutElement.getLayoutBounds(bounds);
                    exceesWidth = (targetWidth - bounds.width) * hAlign;
                    exceesWidth = exceesWidth > 0 ? exceesWidth : 0;
                    x = paddingL + exceesWidth;
                }
                layoutElement.setLayoutBoundsPosition(Math.round(x), Math.round(y));
                dx = Math.ceil(bounds.width);
                dy = Math.ceil(bounds.height);
                maxX = Math.max(maxX, x + dx);
                maxY = Math.max(maxY, y + dy);
                y += dy + gap;
            }
            this.maxElementSize = maxElementWidth;
            target.setContentSize(maxX + paddingR, maxY + paddingB);
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        VerticalLayout.prototype.updateDisplayListVirtual = function (width, height) {
            var target = this.$target;
            if (this.indexInViewCalculated)
                this.indexInViewCalculated = false;
            else
                this.getIndexInView();
            var paddingB = this.$paddingBottom;
            var paddingL = this.$paddingLeft;
            var paddingR = this.$paddingRight;
            var gap = this.$gap;
            var contentHeight;
            var numElements = target.numElements;
            if (this.startIndex == -1 || this.endIndex == -1) {
                contentHeight = this.getStartPosition(numElements) - gap + paddingB;
                target.setContentSize(target.contentWidth, contentHeight);
                return;
            }
            var endIndex = this.endIndex;
            target.setVirtualElementIndicesInView(this.startIndex, endIndex);
            //获取垂直布局参数
            var justify = this.$horizontalAlign == eui.JustifyAlign.JUSTIFY || this.$horizontalAlign == eui.JustifyAlign.CONTENT_JUSTIFY;
            var contentJustify = this.$horizontalAlign == eui.JustifyAlign.CONTENT_JUSTIFY;
            var hAlign = 0;
            if (!justify) {
                if (this.$horizontalAlign == egret.HorizontalAlign.CENTER) {
                    hAlign = 0.5;
                }
                else if (this.$horizontalAlign == egret.HorizontalAlign.RIGHT) {
                    hAlign = 1;
                }
            }
            var bounds = egret.$TempRectangle;
            var targetWidth = Math.max(0, width - paddingL - paddingR);
            var justifyWidth = Math.ceil(targetWidth);
            var layoutElement;
            var typicalHeight = this.$typicalHeight;
            var typicalWidth = this.$typicalWidth;
            var maxElementWidth = this.maxElementSize;
            var oldMaxW = Math.max(typicalWidth, this.maxElementSize);
            if (contentJustify) {
                for (var index = this.startIndex; index <= endIndex; index++) {
                    layoutElement = (target.getVirtualElementAt(index));
                    if (!egret.is(layoutElement, UIComponentClass) || !layoutElement.$includeInLayout) {
                        continue;
                    }
                    layoutElement.getPreferredBounds(bounds);
                    maxElementWidth = Math.max(maxElementWidth, bounds.width);
                }
                justifyWidth = Math.ceil(Math.max(targetWidth, maxElementWidth));
            }
            var x = 0;
            var y = 0;
            var contentWidth = 0;
            var oldElementSize;
            var needInvalidateSize = false;
            var elementSizeTable = this.elementSizeTable;
            //对可见区域进行布局
            for (var i = this.startIndex; i <= endIndex; i++) {
                var exceesWidth = 0;
                layoutElement = (target.getVirtualElementAt(i));
                if (!egret.is(layoutElement, UIComponentClass) || !layoutElement.$includeInLayout) {
                    continue;
                }
                layoutElement.getPreferredBounds(bounds);
                if (!contentJustify) {
                    maxElementWidth = Math.max(maxElementWidth, bounds.width);
                }
                if (justify) {
                    x = paddingL;
                    layoutElement.setLayoutBoundsSize(justifyWidth, NaN);
                    layoutElement.getLayoutBounds(bounds);
                }
                else {
                    layoutElement.getLayoutBounds(bounds);
                    exceesWidth = (targetWidth - bounds.width) * hAlign;
                    exceesWidth = exceesWidth > 0 ? exceesWidth : 0;
                    x = paddingL + exceesWidth;
                }
                contentWidth = Math.max(contentWidth, bounds.width);
                if (!needInvalidateSize) {
                    oldElementSize = isNaN(elementSizeTable[i]) ? typicalHeight : elementSizeTable[i];
                    if (oldElementSize != bounds.height)
                        needInvalidateSize = true;
                }
                elementSizeTable[i] = bounds.height;
                y = this.getStartPosition(i);
                layoutElement.setLayoutBoundsPosition(Math.round(x), Math.round(y));
            }
            contentWidth += paddingL + paddingR;
            contentHeight = this.getStartPosition(numElements) - gap + paddingB;
            this.maxElementSize = maxElementWidth;
            target.setContentSize(contentWidth, contentHeight);
            if (needInvalidateSize || oldMaxW < this.maxElementSize) {
                target.invalidateSize();
            }
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        VerticalLayout.prototype.getStartPosition = function (index) {
            if (!this.$useVirtualLayout) {
                if (this.$target) {
                    var element = this.$target.getElementAt(index);
                    if (element) {
                        return element.y;
                    }
                }
            }
            var typicalHeight = this.$typicalHeight;
            var startPos = this.$paddingTop;
            var gap = this.$gap;
            var elementSizeTable = this.elementSizeTable;
            for (var i = 0; i < index; i++) {
                var h = elementSizeTable[i];
                if (isNaN(h)) {
                    h = typicalHeight;
                }
                startPos += h + gap;
            }
            return startPos;
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        VerticalLayout.prototype.getElementSize = function (index) {
            if (this.$useVirtualLayout) {
                var size = this.elementSizeTable[index];
                if (isNaN(size)) {
                    size = this.$typicalHeight;
                }
                return size;
            }
            if (this.$target) {
                return this.$target.getElementAt(index).height;
            }
            return 0;
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        VerticalLayout.prototype.getElementTotalSize = function () {
            var typicalHeight = this.$typicalHeight;
            var gap = this.$gap;
            var totalSize = 0;
            var length = this.$target.numElements;
            var elementSizeTable = this.elementSizeTable;
            for (var i = 0; i < length; i++) {
                var h = elementSizeTable[i];
                if (isNaN(h)) {
                    h = typicalHeight;
                }
                totalSize += h + gap;
            }
            totalSize -= gap;
            return totalSize;
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        VerticalLayout.prototype.elementAdded = function (index) {
            if (!this.$useVirtualLayout)
                return;
            _super.prototype.elementAdded.call(this, index);
            this.elementSizeTable.splice(index, 0, this.$typicalHeight);
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        VerticalLayout.prototype.getIndexInView = function () {
            var target = this.$target;
            if (!target || target.numElements == 0) {
                this.startIndex = this.endIndex = -1;
                return false;
            }
            var values = target.$UIComponent;
            if (values[10 /* width */] == 0 || values[11 /* height */] == 0) {
                this.startIndex = this.endIndex = -1;
                return false;
            }
            var numElements = target.numElements;
            var contentHeight = this.getStartPosition(numElements - 1) +
                this.elementSizeTable[numElements - 1] + this.$paddingBottom;
            var minVisibleY = target.scrollV;
            if (minVisibleY > contentHeight - this.$paddingBottom) {
                this.startIndex = -1;
                this.endIndex = -1;
                return false;
            }
            var maxVisibleY = target.scrollV + values[11 /* height */];
            if (maxVisibleY < this.$paddingTop) {
                this.startIndex = -1;
                this.endIndex = -1;
                return false;
            }
            var oldStartIndex = this.startIndex;
            var oldEndIndex = this.endIndex;
            this.startIndex = this.findIndexAt(minVisibleY, 0, numElements - 1);
            if (this.startIndex == -1)
                this.startIndex = 0;
            this.endIndex = this.findIndexAt(maxVisibleY, 0, numElements - 1);
            if (this.endIndex == -1)
                this.endIndex = numElements - 1;
            return oldStartIndex != this.startIndex || oldEndIndex != this.endIndex;
        };
        return VerticalLayout;
    }(eui.LinearLayoutBase));
    eui.VerticalLayout = VerticalLayout;
    __reflect(VerticalLayout.prototype, "eui.VerticalLayout");
})(eui || (eui = {}));
//# sourceMappingURL=VerticalLayout.js.map