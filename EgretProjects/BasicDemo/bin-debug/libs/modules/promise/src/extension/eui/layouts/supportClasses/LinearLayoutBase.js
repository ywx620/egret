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
     * Linear layout base class, usually as the parent class of
     * <code>HorizontalLayout</code> and <code>VerticalLayout</code>.
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @language en_US
     */
    /**
     * 线性布局基类，通常作为 <code>HorizontalLayout</code> 和 <code>VerticalLayout</code> 的父类。
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @language zh_CN
     */
    var LinearLayoutBase = (function (_super) {
        __extends(LinearLayoutBase, _super);
        function LinearLayoutBase() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * @private
             */
            _this.$horizontalAlign = "left";
            /**
             * @private
             */
            _this.$verticalAlign = "top";
            /**
             * @private
             */
            _this.$gap = 6;
            /**
             * @private
             */
            _this.$paddingLeft = 0;
            /**
             * @private
             */
            _this.$paddingRight = 0;
            /**
             * @private
             */
            _this.$paddingTop = 0;
            /**
             * @private
             */
            _this.$paddingBottom = 0;
            /**
             * An Array of the virtual layout elements size cache.
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 虚拟布局使用的尺寸缓存。
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            _this.elementSizeTable = [];
            /**
             * The first element index in the view of the virtual layout
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 虚拟布局使用的当前视图中的第一个元素索引
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            _this.startIndex = -1;
            /**
             * The last element index in the view of the virtual layout
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 虚拟布局使用的当前视图中的最后一个元素的索引
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            _this.endIndex = -1;
            /**
             * A Flag of the first element and the end element has been calculated.
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 视图的第一个和最后一个元素的索引值已经计算好的标志
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            _this.indexInViewCalculated = false;
            /**
             * The maximum size of elements
             *
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 子元素最大的尺寸
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            _this.maxElementSize = 0;
            return _this;
        }
        Object.defineProperty(LinearLayoutBase.prototype, "horizontalAlign", {
            /**
             * The horizontal alignment of layout elements.
             * <p>The <code>egret.HorizontalAlign</code> and <code>eui.JustifyAlign</code> class
             * defines the possible values for this property.</p>
             *
             * @default "left"
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 布局元素的水平对齐策略。
             * <p><code>egret.HorizontalAlign</code> 和
             * <code>eui.JustifyAlign</code>类定义此属性的可能值。<p>
             *
             * @default "left"
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this.$horizontalAlign;
            },
            set: function (value) {
                if (this.$horizontalAlign == value)
                    return;
                this.$horizontalAlign = value;
                if (this.$target)
                    this.$target.invalidateDisplayList();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LinearLayoutBase.prototype, "verticalAlign", {
            /**
             * The vertical alignment of layout elements.
             * <p>The <code>egret.VerticalAlign</code> and <code>eui.JustifyAlign</code> class
             * defines the possible values for this property.</p>
             *
             * @default "top"
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 布局元素的垂直对齐策略。请使用 VerticalAlign 定义的常量。
             * <p><code>egret.VerticalAlign</code> 和
             * <code>eui.JustifyAlign</code>类定义此属性的可能值。<p>
             *
             * @default "top"
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this.$verticalAlign;
            },
            set: function (value) {
                if (this.$verticalAlign == value)
                    return;
                this.$verticalAlign = value;
                if (this.$target)
                    this.$target.invalidateDisplayList();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LinearLayoutBase.prototype, "gap", {
            /**
             * The space between layout elements, in pixels.
             *
             * @default 6
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 布局元素之间的间隔（以像素为单位）。
             *
             * @default 6
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this.$gap;
            },
            set: function (value) {
                value = +value || 0;
                if (this.$gap === value)
                    return;
                this.$gap = value;
                this.invalidateTargetLayout();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LinearLayoutBase.prototype, "paddingLeft", {
            /**
             * Number of pixels between the container's left edge
             * and the left edge of the first layout element.
             *
             * @default 0
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 容器的左边缘与第一个布局元素的左边缘之间的像素数。
             *
             * @default 0
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this.$paddingLeft;
            },
            set: function (value) {
                value = +value || 0;
                if (this.$paddingLeft === value)
                    return;
                this.$paddingLeft = value;
                this.invalidateTargetLayout();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LinearLayoutBase.prototype, "paddingRight", {
            /**
             * Number of pixels between the container's right edge
             * and the right edge of the last layout element.
             *
             *  @default 0
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 容器的右边缘与最后一个布局元素的右边缘之间的像素数。
             *
             * @default 0
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this.$paddingRight;
            },
            set: function (value) {
                value = +value || 0;
                if (this.$paddingRight === value)
                    return;
                this.$paddingRight = value;
                this.invalidateTargetLayout();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LinearLayoutBase.prototype, "paddingTop", {
            /**
             * The minimum number of pixels between the container's top edge and
             * the top of all the container's layout elements.
             *
             * @default 0
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 容器的顶边缘与所有容器的布局元素的顶边缘之间的最少像素数。
             *
             * @default 0
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this.$paddingTop;
            },
            set: function (value) {
                value = +value || 0;
                if (this.$paddingTop === value)
                    return;
                this.$paddingTop = value;
                this.invalidateTargetLayout();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LinearLayoutBase.prototype, "paddingBottom", {
            /**
             * The minimum number of pixels between the container's bottom edge and
             * the bottom of all the container's layout elements.
             *
             * @default 0
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 容器的底边缘与所有容器的布局元素的底边缘之间的最少像素数。
             *
             * @default 0
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this.$paddingBottom;
            },
            set: function (value) {
                value = +value || 0;
                if (this.$paddingBottom === value)
                    return;
                this.$paddingBottom = value;
                this.invalidateTargetLayout();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Convenience function for subclasses that invalidates the
         * target's size and displayList so that both layout's <code>measure()</code>
         * and <code>updateDisplayList</code> methods get called.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 失效目标容器的尺寸和显示列表的简便方法，调用目标容器的
         * <code>measure()</code>和<code>updateDisplayList</code>方法
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        LinearLayoutBase.prototype.invalidateTargetLayout = function () {
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
        LinearLayoutBase.prototype.measure = function () {
            if (!this.$target)
                return;
            if (this.$useVirtualLayout) {
                this.measureVirtual();
            }
            else {
                this.measureReal();
            }
        };
        /**
         * Compute exact values for measuredWidth and measuredHeight.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 计算目标容器 measuredWidth 和 measuredHeight 的精确值
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        LinearLayoutBase.prototype.measureReal = function () {
        };
        /**
         * Compute potentially approximate values for measuredWidth and measuredHeight.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 计算目标容器 measuredWidth 和 measuredHeight 的近似值
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        LinearLayoutBase.prototype.measureVirtual = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        LinearLayoutBase.prototype.updateDisplayList = function (width, height) {
            var target = this.$target;
            if (!target)
                return;
            if (target.numElements == 0) {
                target.setContentSize(Math.ceil(this.$paddingLeft + this.$paddingRight), Math.ceil(this.$paddingTop + this.$paddingBottom));
                return;
            }
            if (this.$useVirtualLayout) {
                this.updateDisplayListVirtual(width, height);
            }
            else {
                this.updateDisplayListReal(width, height);
            }
        };
        /**
         * Gets the starting position of the specified index element
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 获取指定索引元素的起始位置
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        LinearLayoutBase.prototype.getStartPosition = function (index) {
            return 0;
        };
        /**
         * Gets the size of the specified index element
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 获取指定索引元素的尺寸
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        LinearLayoutBase.prototype.getElementSize = function (index) {
            return 0;
        };
        /**
         * Gets the sum of the size of cached elements
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 获取缓存的子对象尺寸总和
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        LinearLayoutBase.prototype.getElementTotalSize = function () {
            return 0;
        };
        /**
         * @inheritDoc
         *
         * @param index
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        LinearLayoutBase.prototype.elementRemoved = function (index) {
            if (!this.$useVirtualLayout)
                return;
            _super.prototype.elementRemoved.call(this, index);
            this.elementSizeTable.splice(index, 1);
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        LinearLayoutBase.prototype.clearVirtualLayoutCache = function () {
            if (!this.$useVirtualLayout)
                return;
            this.elementSizeTable = [];
            this.maxElementSize = 0;
        };
        /**
         * The binary search to find the specified index position of the display object
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 折半查找法寻找指定位置的显示对象索引
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        LinearLayoutBase.prototype.findIndexAt = function (x, i0, i1) {
            var index = ((i0 + i1) * 0.5) | 0;
            var elementX = this.getStartPosition(index);
            var elementWidth = this.getElementSize(index);
            if ((x >= elementX) && (x < elementX + elementWidth + this.$gap))
                return index;
            else if (i0 == i1)
                return -1;
            else if (x < elementX)
                return this.findIndexAt(x, i0, Math.max(i0, index - 1));
            else
                return this.findIndexAt(x, Math.min(index + 1, i1), i1);
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        LinearLayoutBase.prototype.scrollPositionChanged = function () {
            _super.prototype.scrollPositionChanged.call(this);
            if (this.$useVirtualLayout) {
                var changed = this.getIndexInView();
                if (changed) {
                    this.indexInViewCalculated = true;
                    this.target.invalidateDisplayList();
                }
            }
        };
        /**
         * Get the index of the first and last element in the view,
         * and to return whether or not to change.
         *
         * @return has the index changed
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 获取视图中第一个和最后一个元素的索引,返回是否发生改变。
         *
         * @return 索引是否已改变
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        LinearLayoutBase.prototype.getIndexInView = function () {
            return false;
        };
        /**
         * Update the layout of the virtualized elements
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 更新虚拟布局的显示列表
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        LinearLayoutBase.prototype.updateDisplayListVirtual = function (width, height) {
        };
        /**
         * Update the layout of the reality elements
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 更新真实布局的显示列表
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        LinearLayoutBase.prototype.updateDisplayListReal = function (width, height) {
        };
        /**
         * Allocate blank area for each variable size element.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 为每个可变尺寸的子项分配空白区域。
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        LinearLayoutBase.prototype.flexChildrenProportionally = function (spaceForChildren, spaceToDistribute, totalPercent, childInfoArray) {
            var numElements = childInfoArray.length;
            var done;
            do {
                done = true;
                var unused = spaceToDistribute -
                    (spaceForChildren * totalPercent / 100);
                if (unused > 0)
                    spaceToDistribute -= unused;
                else
                    unused = 0;
                var spacePerPercent = spaceToDistribute / totalPercent;
                for (var i = 0; i < numElements; i++) {
                    var childInfo = childInfoArray[i];
                    var size = childInfo.percent * spacePerPercent;
                    if (size < childInfo.min) {
                        var min = childInfo.min;
                        childInfo.size = min;
                        childInfoArray[i] = childInfoArray[--numElements];
                        childInfoArray[numElements] = childInfo;
                        totalPercent -= childInfo.percent;
                        if (unused >= min) {
                            unused -= min;
                        }
                        else {
                            spaceToDistribute -= min - unused;
                            unused = 0;
                        }
                        done = false;
                        break;
                    }
                    else if (size > childInfo.max) {
                        var max = childInfo.max;
                        childInfo.size = max;
                        childInfoArray[i] = childInfoArray[--numElements];
                        childInfoArray[numElements] = childInfo;
                        totalPercent -= childInfo.percent;
                        if (unused >= max) {
                            unused -= max;
                        }
                        else {
                            spaceToDistribute -= max - unused;
                            unused = 0;
                        }
                        done = false;
                        break;
                    }
                    else {
                        childInfo.size = size;
                    }
                }
            } while (!done);
        };
        return LinearLayoutBase;
    }(eui.LayoutBase));
    eui.LinearLayoutBase = LinearLayoutBase;
    __reflect(LinearLayoutBase.prototype, "eui.LinearLayoutBase");
})(eui || (eui = {}));
(function (eui) {
    var sys;
    (function (sys) {
        /**
         * @private
         */
        var ChildInfo = (function () {
            function ChildInfo() {
                /**
                 * @private
                 */
                this.layoutElement = null;
                /**
                 * @private
                 */
                this.size = 0;
                /**
                 * @private
                 */
                this.percent = NaN;
                /**
                 * @private
                 */
                this.min = NaN;
                /**
                 * @private
                 */
                this.max = NaN;
            }
            return ChildInfo;
        }());
        sys.ChildInfo = ChildInfo;
        __reflect(ChildInfo.prototype, "eui.sys.ChildInfo");
    })(sys = eui.sys || (eui.sys = {}));
})(eui || (eui = {}));
//# sourceMappingURL=LinearLayoutBase.js.map