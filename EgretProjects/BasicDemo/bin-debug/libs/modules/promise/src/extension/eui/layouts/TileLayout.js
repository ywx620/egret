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
     * The TileLayout class arranges layout elements in columns and rows
     * of equally-sized cells.
     * The TileLayout class uses a number of properties that control orientation,
     * count, size, gap and justification of the columns and the rows
     * as well as element alignment within the cells.
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/layout/TileLayoutExample.ts
     * @language en_US
     */
    /**
     * TileLayout 类在单元格大小相等的列和行中排列布局元素。
     * TileLayout 类使用许多属性来控制列和行的方向、计数、大小、间隙和两端对齐以及单元格内的元素对齐。
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/layout/TileLayoutExample.ts
     * @language zh_CN
     */
    var TileLayout = (function (_super) {
        __extends(TileLayout, _super);
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
        function TileLayout() {
            var _this = _super.call(this) || this;
            /**
             * @private
             * 标记horizontalGap被显式指定过
             */
            _this.explicitHorizontalGap = NaN;
            /**
             * @private
             */
            _this._horizontalGap = 6;
            /**
             * @private
             * 标记verticalGap被显式指定过
             */
            _this.explicitVerticalGap = NaN;
            /**
             * @private
             */
            _this._verticalGap = 6;
            /**
             * @private
             */
            _this._columnCount = -1;
            /**
             * @private
             */
            _this._requestedColumnCount = 0;
            /**
             * @private
             */
            _this._rowCount = -1;
            /**
             * @private
             */
            _this._requestedRowCount = 0;
            /**
             * @private
             * 外部显式指定的列宽
             */
            _this.explicitColumnWidth = NaN;
            /**
             * @private
             */
            _this._columnWidth = NaN;
            /**
             * @private
             * 外部显式指定的行高
             */
            _this.explicitRowHeight = NaN;
            /**
             * @private
             */
            _this._rowHeight = NaN;
            /**
             * @private
             */
            _this._paddingLeft = 0;
            /**
             * @private
             */
            _this._paddingRight = 0;
            /**
             * @private
             */
            _this._paddingTop = 0;
            /**
             * @private
             */
            _this._paddingBottom = 0;
            /**
             * @private
             */
            _this._horizontalAlign = eui.JustifyAlign.JUSTIFY;
            /**
             * @private
             */
            _this._verticalAlign = eui.JustifyAlign.JUSTIFY;
            /**
             * @private
             */
            _this._columnAlign = eui.ColumnAlign.LEFT;
            /**
             * @private
             */
            _this._rowAlign = eui.RowAlign.TOP;
            /**
             * @private
             */
            _this._orientation = eui.TileOrientation.ROWS;
            /**
             * @private
             * 缓存的最大子对象宽度
             */
            _this.maxElementWidth = 0;
            /**
             * @private
             * 缓存的最大子对象高度
             */
            _this.maxElementHeight = 0;
            /**
             * @private
             * 当前视图中的第一个元素索引
             */
            _this.startIndex = -1;
            /**
             * @private
             * 当前视图中的最后一个元素的索引
             */
            _this.endIndex = -1;
            /**
             * @private
             * 视图的第一个和最后一个元素的索引值已经计算好的标志
             */
            _this.indexInViewCalculated = false;
            return _this;
        }
        Object.defineProperty(TileLayout.prototype, "horizontalGap", {
            /**
             * Horizontal space between columns, in pixels.
             *
             * @default 6
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 列之间的水平空间（以像素为单位）。
             *
             * @default 6
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this._horizontalGap;
            },
            set: function (value) {
                value = +value;
                if (value === this._horizontalGap)
                    return;
                this.explicitHorizontalGap = value;
                this._horizontalGap = value;
                this.invalidateTargetLayout();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TileLayout.prototype, "verticalGap", {
            /**
             * Vertical space between rows, in pixels.
             *
             * @default 6
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 行之间的垂直空间（以像素为单位）。
             *
             * @default 6
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this._verticalGap;
            },
            set: function (value) {
                value = +value;
                if (value === this._verticalGap)
                    return;
                this.explicitVerticalGap = value;
                this._verticalGap = value;
                this.invalidateTargetLayout();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TileLayout.prototype, "columnCount", {
            /**
             * Contain the actual column count.
             *
             * @default -1
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             *  实际列计数。
             *
             * @default -1
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this._columnCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TileLayout.prototype, "requestedColumnCount", {
            /**
             * Number of columns to be displayed.
             * <p>Set to 0 to allow the TileLayout to determine
             * the column count automatically.</p>
             * <p>If the <code>orientation</code> property is set to <code>TileOrientation.ROWS</code>,
             * then setting this property has no effect
             * In this case, the <code>rowCount</code> is explicitly set, and the
             * container width is explicitly set. </p>
             *
             * @default 0
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 要显示的列数。
             * <p>设置为 0 会允许 TileLayout 自动确定列计数。</p>
             * <p>如果将 <code>orientation</code> 属性设置为 <code>TileOrientation.ROWS</code>，
             * 则设置此属性不会产生任何效果。这种情况下，会显式设置 code>rowCount</code>，并显式设置容器宽度。</p>
             *
             * @default 0
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this._requestedColumnCount;
            },
            set: function (value) {
                value = +value || 0;
                if (this._requestedColumnCount === value)
                    return;
                this._requestedColumnCount = value;
                this._columnCount = value;
                this.invalidateTargetLayout();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TileLayout.prototype, "rowCount", {
            /**
             * The row count.
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             *  行计数。
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this._rowCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TileLayout.prototype, "requestedRowCount", {
            /**
             * Number of rows to be displayed.
             * <p>Set to 0 to remove explicit override and allow the TileLayout to determine
             * the row count automatically.</p>
             * <p>If the <code>orientation</code> property is set to
             * <code>TileOrientation.COLUMNS</code>, setting this property has no effect.
             * in this case, <code>columnCount</code> is explicitly set, and the
             * container height is explicitly set.</p>
             *
             * @default 0
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 要显示的行数。
             * <code>设置为 -1 会删除显式覆盖并允许 TileLayout 自动确定行计数。</code>
             * <code>如果将 <code>orientation</code> 属性设置为 <code>TileOrientation.COLUMNS</code>，
             * 则设置此属性不会产生任何效果。这种情况下，会显式设置 <code>columnCount</code>，并显式设置容器高度。</code>
             *
             * @default 0
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this._requestedRowCount;
            },
            set: function (value) {
                value = +value || 0;
                if (this._requestedRowCount == value)
                    return;
                this._requestedRowCount = value;
                this._rowCount = value;
                this.invalidateTargetLayout();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TileLayout.prototype, "columnWidth", {
            /**
             * Contain the actual column width, in pixels.
             * <p>If not explicitly set, the column width is
             * determined from the width of the widest element. </p>
             *
             * @default NaN
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 包含实际列宽（以像素为单位）。
             * <p>若未显式设置，则从根据最宽的元素的宽度确定列宽度。</p>
             *
             * @default NaN
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this._columnWidth;
            },
            set: function (value) {
                value = +value;
                if (value === this._columnWidth)
                    return;
                this.explicitColumnWidth = value;
                this._columnWidth = value;
                this.invalidateTargetLayout();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TileLayout.prototype, "rowHeight", {
            /**
             * The row height, in pixels.
             * <p>If not explicitly set, the row height is
             * determined from the maximum of elements' height.</p>
             *
             * @default NaN
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 行高（以像素为单位）。
             * <p>如果未显式设置，则从元素的高度的最大值确定行高度。<p>
             *
             * @default NaN
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this._rowHeight;
            },
            set: function (value) {
                value = +value;
                if (value === this._rowHeight)
                    return;
                this.explicitRowHeight = value;
                this._rowHeight = value;
                this.invalidateTargetLayout();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TileLayout.prototype, "paddingLeft", {
            /**
             * @copy eui.LinearLayoutBase#paddingLeft
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            get: function () {
                return this._paddingLeft;
            },
            set: function (value) {
                value = +value || 0;
                if (this._paddingLeft == value)
                    return;
                this._paddingLeft = value;
                this.invalidateTargetLayout();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TileLayout.prototype, "paddingRight", {
            /**
             * @copy eui.LinearLayoutBase#paddingRight
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            get: function () {
                return this._paddingRight;
            },
            set: function (value) {
                value = +value || 0;
                if (this._paddingRight === value)
                    return;
                this._paddingRight = value;
                this.invalidateTargetLayout();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TileLayout.prototype, "paddingTop", {
            /**
             * @copy eui.LinearLayoutBase#paddingTop
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            get: function () {
                return this._paddingTop;
            },
            set: function (value) {
                value = +value || 0;
                if (this._paddingTop == value)
                    return;
                this._paddingTop = value;
                this.invalidateTargetLayout();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TileLayout.prototype, "paddingBottom", {
            /**
             * @copy eui.LinearLayoutBase#paddingBottom
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            get: function () {
                return this._paddingBottom;
            },
            set: function (value) {
                value = +value || 0;
                if (this._paddingBottom === value)
                    return;
                this._paddingBottom = value;
                this.invalidateTargetLayout();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TileLayout.prototype, "horizontalAlign", {
            /**
             * Specifies how to align the elements within the cells in the horizontal direction.
             * Supported values are
             * HorizontalAlign.LEFT、HorizontalAlign.CENTER、
             * HorizontalAlign.RIGHT、JustifyAlign.JUSTIFY。
             *
             * @default <code>JustifyAlign.JUSTIFY</code>
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 指定如何在水平方向上对齐单元格内的元素。支持的值有
             * HorizontalAlign.LEFT、HorizontalAlign.CENTER、
             * HorizontalAlign.RIGHT、JustifyAlign.JUSTIFY。
             *
             * @default <code>JustifyAlign.JUSTIFY</code>
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this._horizontalAlign;
            },
            set: function (value) {
                if (this._horizontalAlign == value)
                    return;
                this._horizontalAlign = value;
                this.invalidateTargetLayout();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TileLayout.prototype, "verticalAlign", {
            /**
             * 指定如何在垂直方向上对齐单元格内的元素。
             * 支持的值有 VerticalAlign.TOP、VerticalAlign.MIDDLE、
             * VerticalAlign.BOTTOM、JustifyAlign.JUSTIFY。
             * 默认值：JustifyAlign.JUSTIFY。
             *
             * @default <code>eui.JustifyAlign.JUSTIFY</code>
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             * Specifies how to align the elements within the cells in the vertical direction.
             * Supported values are
             * VerticalAlign.TOP、VerticalAlign.MIDDLE、
             * VerticalAlign.BOTTOM、JustifyAlign.JUSTIFY。
             *
             * @default <code>eui.JustifyAlign.JUSTIFY</code>
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this._verticalAlign;
            },
            set: function (value) {
                if (this._verticalAlign == value)
                    return;
                this._verticalAlign = value;
                this.invalidateTargetLayout();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TileLayout.prototype, "columnAlign", {
            /**
             * Specifies how to justify the fully visible columns to the container width.
             *
             * <p>When set to <code>ColumnAlign.LEFT</code> it turns column justification off.
             *  There may be partially visible columns or whitespace between the last column and
             *  the right edge of the container.  This is the default value.</p>
             *
             * <p>When set to <code>ColumnAlign.JUSTIFY_USING_GAP</code> the <code>horizontalGap</code>
             * actual value increases so that
             * the last fully visible column right edge aligns with the container's right edge.
             * In case there is only a single fully visible column, the <code>horizontalGap</code> actual value
             * increases so that it pushes any partially visible column beyond the right edge
             * of the container.
             * Note that explicitly setting the <code>horizontalGap</code> property does not turn off
             * justification. It only determines the initial gap value.
             * Justification may increases it.</p>
             *
             * <p>When set to <code>ColumnAlign.JUSTIFY_USING_WIDTH</code> the <code>columnWidth</code>
             * actual value increases so that
             * the last fully visible column right edge aligns with the container's right edge.
             * Note that explicitly setting the <code>columnWidth</code> property does not turn off justification.
             * It only determines the initial column width value.
             * Justification may increases it.</p>
             *
             * @default ColumnAlign.LEFT
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 指定如何将完全可见列与容器宽度对齐。
             *
             * <p>设置为 <code>ColumnAlign.LEFT</code> 时，它会关闭列两端对齐。
             * 在容器的最后一列和右边缘之间可能存在部分可见的列或空白。这是默认值。</p>
             *
             * <p>设置为 <code>ColumnAlign.JUSTIFY_USING_GAP</code> 时，<code>horizontalGap</code> 的实际值将增大，
             * 这样最后一个完全可见列右边缘会与容器的右边缘对齐。仅存在一个完全可见列时，
             * <code>horizontalGap</code> 的实际值将增大，这样它会将任何部分可见列推到容器的右边缘之外。
             * 请注意显式设置 <code>horizontalGap</code> 属性不会关闭两端对齐。它仅确定初始间隙值。两端对齐可能会增大它。</p>
             *
             * <p>设置为 <code>ColumnAlign.JUSTIFY_USING_WIDTH</code> 时，<code>columnWidth</code> 的实际值将增大，
             * 这样最后一个完全可见列右边缘会与容器的右边缘对齐。请注意显式设置 <code>columnWidth</code> 属性不会关闭两端对齐。
             * 它仅确定初始列宽度值。两端对齐可能会增大它。</p>
             *
             * @default ColumnAlign.LEFT
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this._columnAlign;
            },
            set: function (value) {
                if (this._columnAlign == value)
                    return;
                this._columnAlign = value;
                this.invalidateTargetLayout();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TileLayout.prototype, "rowAlign", {
            /**
             * Specifies how to justify the fully visible rows to the container height.
             *
             * <p>When set to <code>RowAlign.TOP</code> it turns column justification off.
             * There might be partially visible rows or whitespace between the last row and
             * the bottom edge of the container.  This is the default value.</p>
             *
             * <p>When set to <code>RowAlign.JUSTIFY_USING_GAP</code> the <code>verticalGap</code>
             * actual value increases so that
             * the last fully visible row bottom edge aligns with the container's bottom edge.
             * In case there is only a single fully visible row, the value of <code>verticalGap</code>
             * increases so that it pushes any partially visible row beyond the bottom edge
             * of the container.  Note that explicitly setting the <code>verticalGap</code> does not turn off
             * justification, but just determines the initial gap value.
             * Justification can then increases it.</p>
             *
             * <p>When set to <code>RowAlign.JUSTIFY_USING_HEIGHT</code> the <code>rowHeight</code>
             * actual value increases so that
             * the last fully visible row bottom edge aligns with the container's bottom edge.  Note that
             * explicitly setting the <code>rowHeight</code> does not turn off justification, but
             * determines the initial row height value.
             * Justification can then increase it.</p>
             *
             * @default RowAlign.TOP
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 指定如何将完全可见行与容器高度对齐。
             *
             * <p>设置为 <code>RowAlign.TOP</code> 时，它会关闭列两端对齐。
             * 在容器的最后一行和底边缘之间可能存在部分可见的行或空白。这是默认值。</p>
             *
             * <p>设置为 <code>RowAlign.JUSTIFY_USING_GAP</code> 时，<code>verticalGap</code> 的实际值会增大，
             * 这样最后一个完全可见行底边缘会与容器的底边缘对齐。仅存在一个完全可见行时，<code>verticalGap</code> 的值会增大，
             * 这样它会将任何部分可见行推到容器的底边缘之外。请注意，显式设置 <code>verticalGap</code>
             * 不会关闭两端对齐，而只是确定初始间隙值。两端对齐接着可以增大它。</p>
             *
             * <p>设置为 <code>RowAlign.JUSTIFY_USING_HEIGHT</code> 时，<code>rowHeight</code> 的实际值会增大，
             * 这样最后一个完全可见行底边缘会与容器的底边缘对齐。请注意，显式设置 <code>rowHeight</code>
             * 不会关闭两端对齐，而只是确定初始行高度值。两端对齐接着可以增大它。</p>
             *
             * @default RowAlign.TOP
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this._rowAlign;
            },
            set: function (value) {
                if (this._rowAlign == value)
                    return;
                this._rowAlign = value;
                this.invalidateTargetLayout();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TileLayout.prototype, "orientation", {
            /**
             * Specifies whether elements are arranged row by row or
             * column by column.
             *
             * @default TileOrientation.ROWS
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 指定是逐行还是逐列排列元素。
             *
             * @default TileOrientation.ROWS
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this._orientation;
            },
            set: function (value) {
                if (this._orientation == value)
                    return;
                this._orientation = value;
                this.invalidateTargetLayout();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         * 标记目标容器的尺寸和显示列表失效
         */
        TileLayout.prototype.invalidateTargetLayout = function () {
            var target = this.$target;
            if (target) {
                target.invalidateSize();
                target.invalidateDisplayList();
            }
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        TileLayout.prototype.measure = function () {
            var target = this.$target;
            if (!target)
                return;
            var savedColumnCount = this._columnCount;
            var savedRowCount = this._rowCount;
            var savedColumnWidth = this._columnWidth;
            var savedRowHeight = this._rowHeight;
            var measuredWidth = 0;
            var measuredHeight = 0;
            var values = target.$UIComponent;
            this.calculateRowAndColumn(values[8 /* explicitWidth */], values[9 /* explicitHeight */]);
            var columnCount = this._requestedColumnCount > 0 ? this._requestedColumnCount : this._columnCount;
            var rowCount = this._requestedRowCount > 0 ? this._requestedRowCount : this._rowCount;
            var horizontalGap = isNaN(this._horizontalGap) ? 0 : this._horizontalGap;
            var verticalGap = isNaN(this._verticalGap) ? 0 : this._verticalGap;
            if (columnCount > 0) {
                measuredWidth = columnCount * (this._columnWidth + horizontalGap) - horizontalGap;
            }
            if (rowCount > 0) {
                measuredHeight = rowCount * (this._rowHeight + verticalGap) - verticalGap;
            }
            var hPadding = this._paddingLeft + this._paddingRight;
            var vPadding = this._paddingTop + this._paddingBottom;
            target.setMeasuredSize(measuredWidth + hPadding, measuredHeight + vPadding);
            this._columnCount = savedColumnCount;
            this._rowCount = savedRowCount;
            this._columnWidth = savedColumnWidth;
            this._rowHeight = savedRowHeight;
        };
        /**
         * @private
         * 计算行和列的尺寸及数量
         */
        TileLayout.prototype.calculateRowAndColumn = function (explicitWidth, explicitHeight) {
            var target = this.$target;
            var horizontalGap = isNaN(this._horizontalGap) ? 0 : this._horizontalGap;
            var verticalGap = isNaN(this._verticalGap) ? 0 : this._verticalGap;
            this._rowCount = this._columnCount = -1;
            var numElements = target.numElements;
            var count = numElements;
            for (var index = 0; index < count; index++) {
                var layoutElement = (target.getElementAt(index));
                if (layoutElement && (!egret.is(layoutElement, UIComponentClass) || !layoutElement.$includeInLayout)) {
                    numElements--;
                    continue;
                }
            }
            if (numElements == 0) {
                this._rowCount = this._columnCount = 0;
                return;
            }
            if (isNaN(this.explicitColumnWidth) || isNaN(this.explicitRowHeight))
                this.updateMaxElementSize();
            if (isNaN(this.explicitColumnWidth)) {
                this._columnWidth = this.maxElementWidth;
            }
            else {
                this._columnWidth = this.explicitColumnWidth;
            }
            if (isNaN(this.explicitRowHeight)) {
                this._rowHeight = this.maxElementHeight;
            }
            else {
                this._rowHeight = this.explicitRowHeight;
            }
            var itemWidth = this._columnWidth + horizontalGap;
            //防止出现除数为零的情况
            if (itemWidth <= 0)
                itemWidth = 1;
            var itemHeight = this._rowHeight + verticalGap;
            if (itemHeight <= 0)
                itemHeight = 1;
            var orientedByColumns = (this._orientation == eui.TileOrientation.COLUMNS);
            var widthHasSet = !isNaN(explicitWidth);
            var heightHasSet = !isNaN(explicitHeight);
            var paddingL = this._paddingLeft;
            var paddingR = this._paddingRight;
            var paddingT = this._paddingTop;
            var paddingB = this._paddingBottom;
            if (this._requestedColumnCount > 0 || this._requestedRowCount > 0) {
                if (this._requestedRowCount > 0)
                    this._rowCount = Math.min(this._requestedRowCount, numElements);
                if (this._requestedColumnCount > 0)
                    this._columnCount = Math.min(this._requestedColumnCount, numElements);
            }
            else if (!widthHasSet && !heightHasSet) {
                var side = Math.sqrt(numElements * itemWidth * itemHeight);
                if (orientedByColumns) {
                    this._rowCount = Math.max(1, Math.round(side / itemHeight));
                }
                else {
                    this._columnCount = Math.max(1, Math.round(side / itemWidth));
                }
            }
            else if (widthHasSet && (!heightHasSet || !orientedByColumns)) {
                var targetWidth = Math.max(0, explicitWidth - paddingL - paddingR);
                this._columnCount = Math.floor((targetWidth + horizontalGap) / itemWidth);
                this._columnCount = Math.max(1, Math.min(this._columnCount, numElements));
            }
            else {
                var targetHeight = Math.max(0, explicitHeight - paddingT - paddingB);
                this._rowCount = Math.floor((targetHeight + verticalGap) / itemHeight);
                this._rowCount = Math.max(1, Math.min(this._rowCount, numElements));
            }
            if (this._rowCount == -1)
                this._rowCount = Math.max(1, Math.ceil(numElements / this._columnCount));
            if (this._columnCount == -1)
                this._columnCount = Math.max(1, Math.ceil(numElements / this._rowCount));
            if (this._requestedColumnCount > 0 && this._requestedRowCount > 0) {
                if (this._orientation == eui.TileOrientation.ROWS)
                    this._rowCount = Math.max(1, Math.ceil(numElements / this._requestedColumnCount));
                else
                    this._columnCount = Math.max(1, Math.ceil(numElements / this._requestedRowCount));
            }
        };
        /**
         * @private
         * 更新最大子对象尺寸
         */
        TileLayout.prototype.updateMaxElementSize = function () {
            if (!this.$target)
                return;
            if (this.$useVirtualLayout) {
                this.maxElementWidth = Math.max(this.maxElementWidth, this.$typicalWidth);
                this.maxElementHeight = Math.max(this.maxElementHeight, this.$typicalHeight);
                this.doUpdateMaxElementSize(this.startIndex, this.endIndex);
            }
            else {
                this.doUpdateMaxElementSize(0, this.$target.numElements - 1);
            }
        };
        /**
         * @private
         * 更新虚拟布局的最大子对象尺寸
         */
        TileLayout.prototype.doUpdateMaxElementSize = function (startIndex, endIndex) {
            var maxElementWidth = this.maxElementWidth;
            var maxElementHeight = this.maxElementHeight;
            var bounds = egret.$TempRectangle;
            var target = this.$target;
            if ((startIndex != -1) && (endIndex != -1)) {
                for (var index = startIndex; index <= endIndex; index++) {
                    var elt = target.getVirtualElementAt(index);
                    if (!egret.is(elt, UIComponentClass) || !elt.$includeInLayout) {
                        continue;
                    }
                    elt.getPreferredBounds(bounds);
                    maxElementWidth = Math.max(maxElementWidth, bounds.width);
                    maxElementHeight = Math.max(maxElementHeight, bounds.height);
                }
            }
            this.maxElementWidth = maxElementWidth;
            this.maxElementHeight = maxElementHeight;
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        TileLayout.prototype.clearVirtualLayoutCache = function () {
            _super.prototype.clearVirtualLayoutCache.call(this);
            this.maxElementWidth = 0;
            this.maxElementHeight = 0;
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        TileLayout.prototype.scrollPositionChanged = function () {
            if (this.$useVirtualLayout) {
                var changed = this.getIndexInView();
                if (changed) {
                    this.indexInViewCalculated = true;
                    this.$target.invalidateDisplayList();
                }
            }
        };
        /**
         * @private
         * 获取视图中第一个和最后一个元素的索引,返回是否发生改变
         */
        TileLayout.prototype.getIndexInView = function () {
            if (!this.$target || this.$target.numElements == 0) {
                this.startIndex = this.endIndex = -1;
                return false;
            }
            var target = this.$target;
            var numElements = target.numElements;
            if (!this.$useVirtualLayout) {
                this.startIndex = 0;
                this.endIndex = numElements - 1;
                return false;
            }
            var values = target.$UIComponent;
            if (values[10 /* width */] == 0 || values[11 /* height */] == 0) {
                this.startIndex = this.endIndex = -1;
                return false;
            }
            var oldStartIndex = this.startIndex;
            var oldEndIndex = this.endIndex;
            var paddingL = this._paddingLeft;
            var paddingT = this._paddingTop;
            var horizontalGap = isNaN(this._horizontalGap) ? 0 : this._horizontalGap;
            var verticalGap = isNaN(this._verticalGap) ? 0 : this._verticalGap;
            if (this._orientation == eui.TileOrientation.COLUMNS) {
                var itemWidth = this._columnWidth + horizontalGap;
                if (itemWidth <= 0) {
                    this.startIndex = 0;
                    this.endIndex = numElements - 1;
                    return false;
                }
                var minVisibleX = target.scrollH;
                var maxVisibleX = minVisibleX + values[10 /* width */];
                var startColumn = Math.floor((minVisibleX - paddingL) / itemWidth);
                if (startColumn < 0)
                    startColumn = 0;
                var endColumn = Math.ceil((maxVisibleX - paddingL) / itemWidth);
                if (endColumn < 0)
                    endColumn = 0;
                this.startIndex = Math.min(numElements - 1, Math.max(0, startColumn * this._rowCount));
                this.endIndex = Math.min(numElements - 1, Math.max(0, endColumn * this._rowCount - 1));
            }
            else {
                var itemHeight = this._rowHeight + verticalGap;
                if (itemHeight <= 0) {
                    this.startIndex = 0;
                    this.endIndex = numElements - 1;
                    return false;
                }
                var minVisibleY = target.scrollV;
                var maxVisibleY = minVisibleY + values[11 /* height */];
                var startRow = Math.floor((minVisibleY - paddingT) / itemHeight);
                if (startRow < 0)
                    startRow = 0;
                var endRow = Math.ceil((maxVisibleY - paddingT) / itemHeight);
                if (endRow < 0)
                    endRow = 0;
                this.startIndex = Math.min(numElements - 1, Math.max(0, startRow * this._columnCount));
                this.endIndex = Math.min(numElements - 1, Math.max(0, endRow * this._columnCount - 1));
            }
            return this.startIndex != oldStartIndex || this.endIndex != oldEndIndex;
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        TileLayout.prototype.updateDisplayList = function (width, height) {
            _super.prototype.updateDisplayList.call(this, width, height);
            if (!this.$target)
                return;
            var target = this.$target;
            var paddingL = this._paddingLeft;
            var paddingR = this._paddingRight;
            var paddingT = this._paddingTop;
            var paddingB = this._paddingBottom;
            if (this.indexInViewCalculated) {
                this.indexInViewCalculated = false;
            }
            else {
                this.calculateRowAndColumn(width, height);
                if (this._rowCount == 0 || this._columnCount == 0) {
                    target.setContentSize(paddingL + paddingR, paddingT + paddingB);
                    return;
                }
                this.adjustForJustify(width, height);
                this.getIndexInView();
            }
            if (this.$useVirtualLayout) {
                this.calculateRowAndColumn(width, height);
                this.adjustForJustify(width, height);
            }
            if (this.startIndex == -1 || this.endIndex == -1) {
                target.setContentSize(0, 0);
                return;
            }
            var endIndex = this.endIndex;
            target.setVirtualElementIndicesInView(this.startIndex, endIndex);
            var elt;
            var x;
            var y;
            var columnIndex;
            var rowIndex;
            var orientedByColumns = (this._orientation == eui.TileOrientation.COLUMNS);
            var index = this.startIndex;
            var horizontalGap = isNaN(this._horizontalGap) ? 0 : this._horizontalGap;
            var verticalGap = isNaN(this._verticalGap) ? 0 : this._verticalGap;
            var rowCount = this._rowCount;
            var columnCount = this._columnCount;
            var columnWidth = this._columnWidth;
            var rowHeight = this._rowHeight;
            for (var i = this.startIndex; i <= endIndex; i++) {
                if (this.$useVirtualLayout) {
                    elt = (this.target.getVirtualElementAt(i));
                }
                else {
                    elt = (this.target.getElementAt(i));
                }
                if (!egret.is(elt, UIComponentClass) || !elt.$includeInLayout) {
                    continue;
                }
                if (orientedByColumns) {
                    columnIndex = Math.ceil((index + 1) / rowCount) - 1;
                    rowIndex = Math.ceil((index + 1) % rowCount) - 1;
                    if (rowIndex == -1)
                        rowIndex = rowCount - 1;
                }
                else {
                    columnIndex = Math.ceil((index + 1) % columnCount) - 1;
                    if (columnIndex == -1)
                        columnIndex = columnCount - 1;
                    rowIndex = Math.ceil((index + 1) / columnCount) - 1;
                }
                switch (this._horizontalAlign) {
                    case egret.HorizontalAlign.RIGHT:
                        x = width - (columnIndex + 1) * (columnWidth + horizontalGap) + horizontalGap - paddingR;
                        break;
                    case egret.HorizontalAlign.LEFT:
                        x = columnIndex * (columnWidth + horizontalGap) + paddingL;
                        break;
                    default:
                        x = columnIndex * (columnWidth + horizontalGap) + paddingL;
                }
                switch (this._verticalAlign) {
                    case egret.VerticalAlign.TOP:
                        y = rowIndex * (rowHeight + verticalGap) + paddingT;
                        break;
                    case egret.VerticalAlign.BOTTOM:
                        y = height - (rowIndex + 1) * (rowHeight + verticalGap) + verticalGap - paddingB;
                        break;
                    default:
                        y = rowIndex * (rowHeight + verticalGap) + paddingT;
                }
                this.sizeAndPositionElement(elt, x, y, columnWidth, rowHeight);
                index++;
            }
            var hPadding = paddingL + paddingR;
            var vPadding = paddingT + paddingB;
            var contentWidth = (columnWidth + horizontalGap) * columnCount - horizontalGap;
            var contentHeight = (rowHeight + verticalGap) * rowCount - verticalGap;
            target.setContentSize(contentWidth + hPadding, contentHeight + vPadding);
        };
        /**
         * @private
         * 为单个元素布局
         */
        TileLayout.prototype.sizeAndPositionElement = function (element, cellX, cellY, cellWidth, cellHeight) {
            var elementWidth = NaN;
            var elementHeight = NaN;
            var values = element.$UIComponent;
            if (this._horizontalAlign == eui.JustifyAlign.JUSTIFY)
                elementWidth = cellWidth;
            else if (!isNaN(values[6 /* percentWidth */]))
                elementWidth = cellWidth * values[6 /* percentWidth */] * 0.01;
            if (this._verticalAlign == eui.JustifyAlign.JUSTIFY)
                elementHeight = cellHeight;
            else if (!isNaN(values[7 /* percentHeight */]))
                elementHeight = cellHeight * values[7 /* percentHeight */] * 0.01;
            element.setLayoutBoundsSize(Math.round(elementWidth), Math.round(elementHeight));
            var x = cellX;
            var bounds = egret.$TempRectangle;
            element.getLayoutBounds(bounds);
            switch (this._horizontalAlign) {
                case egret.HorizontalAlign.RIGHT:
                    x += cellWidth - bounds.width;
                    break;
                case egret.HorizontalAlign.CENTER:
                    x = cellX + (cellWidth - bounds.width) / 2;
                    break;
            }
            var y = cellY;
            switch (this._verticalAlign) {
                case egret.VerticalAlign.BOTTOM:
                    y += cellHeight - bounds.height;
                    break;
                case egret.VerticalAlign.MIDDLE:
                    y += (cellHeight - bounds.height) / 2;
                    break;
            }
            element.setLayoutBoundsPosition(Math.round(x), Math.round(y));
        };
        /**
         * @private
         * 为两端对齐调整间隔或格子尺寸
         */
        TileLayout.prototype.adjustForJustify = function (width, height) {
            var paddingL = this._paddingLeft;
            var paddingR = this._paddingRight;
            var paddingT = this._paddingTop;
            var paddingB = this._paddingBottom;
            var targetWidth = Math.max(0, width - paddingL - paddingR);
            var targetHeight = Math.max(0, height - paddingT - paddingB);
            if (!isNaN(this.explicitVerticalGap))
                this._verticalGap = this.explicitVerticalGap;
            if (!isNaN(this.explicitHorizontalGap))
                this._horizontalGap = this.explicitHorizontalGap;
            this._verticalGap = isNaN(this._verticalGap) ? 0 : this._verticalGap;
            this._horizontalGap = isNaN(this._horizontalGap) ? 0 : this._horizontalGap;
            var offsetY = targetHeight - this._rowHeight * this._rowCount;
            var offsetX = targetWidth - this._columnWidth * this._columnCount;
            var gapCount;
            if (offsetY > 0) {
                if (this._rowAlign == eui.RowAlign.JUSTIFY_USING_GAP) {
                    gapCount = Math.max(1, this._rowCount - 1);
                    this._verticalGap = offsetY / gapCount;
                }
                else if (this._rowAlign == eui.RowAlign.JUSTIFY_USING_HEIGHT) {
                    if (this._rowCount > 0) {
                        this._rowHeight += (offsetY - (this._rowCount - 1) * this._verticalGap) / this._rowCount;
                    }
                }
            }
            if (offsetX > 0) {
                if (this._columnAlign == eui.ColumnAlign.JUSTIFY_USING_GAP) {
                    gapCount = Math.max(1, this._columnCount - 1);
                    this._horizontalGap = offsetX / gapCount;
                }
                else if (this._columnAlign == eui.ColumnAlign.JUSTIFY_USING_WIDTH) {
                    if (this._columnCount > 0) {
                        this._columnWidth += (offsetX - (this._columnCount - 1) * this._horizontalGap) / this._columnCount;
                    }
                }
            }
        };
        return TileLayout;
    }(eui.LayoutBase));
    eui.TileLayout = TileLayout;
    __reflect(TileLayout.prototype, "eui.TileLayout");
})(eui || (eui = {}));
//# sourceMappingURL=TileLayout.js.map