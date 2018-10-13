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
     * The DataGroup class is the base container class for data items.
     * The DataGroup class converts data items to visual elements for display.
     * While this container can hold visual elements, it is often used only
     * to hold data items as children.
     *
     * @see eui.Group
     * @see http://edn.egret.com/cn/article/index/id/527 Data container
     * @see http://edn.egret.com/cn/article/index/id/528 Array collection
     * @defaultProperty dataProvider
     * @includeExample  extension/eui/components/DataGroupExample.ts
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @language en_US
     */
    /**
     * DataGroup 类将数据项目转换为可视元素以进行显示。
     * 尽管此容器可以包含可视元素，但它通常仅用于包含作为子项的数据项目。
     *
     * @see eui.Group
     * @see http://edn.egret.com/cn/article/index/id/527 数据容器
     * @see http://edn.egret.com/cn/article/index/id/528 数组集合
     * @defaultProperty dataProvider
     * @includeExample  extension/eui/components/DataGroupExample.ts
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @language zh_CN
     */
    var DataGroup = (function (_super) {
        __extends(DataGroup, _super);
        /**
         * Constructor.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 构造函数。
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        function DataGroup() {
            var _this = _super.call(this) || this;
            /**
             * @private
             */
            _this.$dataProviderChanged = false;
            /**
             * @private
             */
            _this.$dataProvider = null;
            /**
             * @private
             * 索引到项呈示器的转换数组
             */
            _this.$indexToRenderer = [];
            _this.$DataGroup = {
                0: true,
                1: false,
                2: {},
                3: {},
                4: false,
                5: false,
                6: null,
                7: null,
                8: false,
                9: null,
                10: false,
                11: false,
                12: null,
                13: null,
                14: false,
            };
            return _this;
        }
        Object.defineProperty(DataGroup.prototype, "useVirtualLayout", {
            /**
             * @copy eui.LayoutBase#useVirtualLayout
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            get: function () {
                return this.$layout ? this.$layout.$useVirtualLayout :
                    this.$DataGroup[0 /* useVirtualLayout */];
            },
            set: function (value) {
                value = !!value;
                var values = this.$DataGroup;
                if (value === values[0 /* useVirtualLayout */])
                    return;
                values[0 /* useVirtualLayout */] = value;
                if (this.$layout)
                    this.$layout.useVirtualLayout = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         *
         * @param value
         */
        DataGroup.prototype.$setLayout = function (value) {
            if (value == this.$layout)
                return false;
            if (this.$layout) {
                this.$layout.setTypicalSize(0, 0);
                this.$layout.removeEventListener("useVirtualLayoutChanged", this.onUseVirtualLayoutChanged, this);
            }
            if (this.$layout && value && (this.$layout.$useVirtualLayout != value.$useVirtualLayout))
                this.onUseVirtualLayoutChanged();
            var result = _super.prototype.$setLayout.call(this, value);
            if (value) {
                var rect = this.$DataGroup[9 /* typicalLayoutRect */];
                if (rect) {
                    value.setTypicalSize(rect.width, rect.height);
                }
                value.useVirtualLayout = this.$DataGroup[0 /* useVirtualLayout */];
                value.addEventListener("useVirtualLayoutChanged", this.onUseVirtualLayoutChanged, this);
            }
            return result;
        };
        /**
         * @private
         * 是否使用虚拟布局标记改变
         */
        DataGroup.prototype.onUseVirtualLayoutChanged = function (event) {
            var values = this.$DataGroup;
            values[1 /* useVirtualLayoutChanged */] = true;
            values[10 /* cleanFreeRenderer */] = true;
            this.removeDataProviderListener();
            this.invalidateProperties();
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        DataGroup.prototype.setVirtualElementIndicesInView = function (startIndex, endIndex) {
            if (!this.$layout || !this.$layout.$useVirtualLayout) {
                return;
            }
            var indexToRenderer = this.$indexToRenderer;
            var keys = Object.keys(indexToRenderer);
            var length = keys.length;
            for (var i = 0; i < length; i++) {
                var index = +keys[i];
                if (index < startIndex || index > endIndex) {
                    this.freeRendererByIndex(index);
                }
            }
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        DataGroup.prototype.getElementAt = function (index) {
            return this.$indexToRenderer[index];
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.5.2
         * @version eui 1.0
         * @platform Web,Native
         */
        DataGroup.prototype.getVirtualElementAt = function (index) {
            index = +index | 0;
            if (index < 0 || index >= this.$dataProvider.length)
                return null;
            var renderer = this.$indexToRenderer[index];
            if (!renderer) {
                var item = this.$dataProvider.getItemAt(index);
                renderer = this.createVirtualRenderer(item);
                this.$indexToRenderer[index] = renderer;
                this.updateRenderer(renderer, index, item);
                var values = this.$DataGroup;
                if (values[4 /* createNewRendererFlag */]) {
                    renderer.validateNow();
                    values[4 /* createNewRendererFlag */] = false;
                    this.rendererAdded(renderer, index, item);
                }
            }
            return renderer;
        };
        /**
         * @private
         * 释放指定索引处的项呈示器
         */
        DataGroup.prototype.freeRendererByIndex = function (index) {
            var renderer = this.$indexToRenderer[index];
            if (renderer) {
                delete this.$indexToRenderer[index];
                this.doFreeRenderer(renderer);
            }
        };
        /**
         * @private
         *
         * @param renderer
         */
        DataGroup.prototype.doFreeRenderer = function (renderer) {
            var values = this.$DataGroup;
            var rendererClass = values[2 /* rendererToClassMap */][renderer.$hashCode];
            var hashCode = rendererClass.$hashCode;
            if (!values[3 /* freeRenderers */][hashCode]) {
                values[3 /* freeRenderers */][hashCode] = [];
            }
            values[3 /* freeRenderers */][hashCode].push(renderer);
            renderer.visible = false;
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        DataGroup.prototype.invalidateSize = function () {
            if (!this.$DataGroup[4 /* createNewRendererFlag */]) {
                _super.prototype.invalidateSize.call(this);
            }
        };
        /**
         * @private
         * 为指定索引创建虚拟的项呈示器
         */
        DataGroup.prototype.createVirtualRenderer = function (item) {
            var renderer;
            var rendererClass = this.itemToRendererClass(item);
            var hashCode = rendererClass.$hashCode;
            var values = this.$DataGroup;
            var freeRenderers = values[3 /* freeRenderers */];
            if (freeRenderers[hashCode] && freeRenderers[hashCode].length > 0) {
                renderer = freeRenderers[hashCode].pop();
                renderer.visible = true;
                this.invalidateDisplayList();
                return renderer;
            }
            values[4 /* createNewRendererFlag */] = true;
            return this.createOneRenderer(rendererClass);
        };
        /**
         * @private
         * 根据rendererClass创建一个Renderer,并添加到显示列表
         */
        DataGroup.prototype.createOneRenderer = function (rendererClass) {
            var renderer = (new rendererClass());
            var values = this.$DataGroup;
            values[2 /* rendererToClassMap */][renderer.$hashCode] = rendererClass;
            if (!egret.is(renderer, "eui.IItemRenderer")) {
                return null;
            }
            if (values[13 /* itemRendererSkinName */]) {
                this.setItemRenderSkinName(renderer, values[13 /* itemRendererSkinName */]);
            }
            this.addChild(renderer);
            return renderer;
        };
        /**
         * @private
         * 设置项呈示器的默认皮肤
         */
        DataGroup.prototype.setItemRenderSkinName = function (renderer, skinName) {
            if (renderer && renderer instanceof eui.Component) {
                var comp = renderer;
                if (!comp.$Component[5 /* skinNameExplicitlySet */]) {
                    comp.skinName = skinName;
                    comp.$Component[5 /* skinNameExplicitlySet */] = false;
                }
            }
        };
        Object.defineProperty(DataGroup.prototype, "dataProvider", {
            /**
             * The data provider for this DataGroup.
             * It must be an ICollection, such as ArrayCollection
             *
             * @see eui.ICollection
             * @see eui.ArrayCollection
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 列表数据源，请使用实现了ICollection接口的数据类型，例如 ArrayCollection
             *
             * @see eui.ICollection
             * @see eui.ArrayCollection
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this.$dataProvider;
            },
            set: function (value) {
                this.$setDataProvider(value);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         *
         * @param value
         */
        DataGroup.prototype.$setDataProvider = function (value) {
            if (this.$dataProvider == value || (value && !value.getItemAt))
                return false;
            this.removeDataProviderListener();
            this.$dataProvider = value;
            this.$dataProviderChanged = true;
            this.$DataGroup[10 /* cleanFreeRenderer */] = true;
            this.invalidateProperties();
            this.invalidateSize();
            this.invalidateDisplayList();
            return true;
        };
        /**
         * @private
         * 移除数据源监听
         */
        DataGroup.prototype.removeDataProviderListener = function () {
            if (this.$dataProvider)
                this.$dataProvider.removeEventListener(eui.CollectionEvent.COLLECTION_CHANGE, this.onCollectionChange, this);
        };
        /**
         * Called when contents within the dataProvider changes.  We will catch certain
         * events and update our children based on that.
         *
         * @param event 事件<code>eui.CollectionEvent</code>的对象。
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 数据源改变事件处理。
         *
         * @param event 事件<code>eui.CollectionEvent</code>的对象。
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        DataGroup.prototype.onCollectionChange = function (event) {
            switch (event.kind) {
                case eui.CollectionEventKind.ADD:
                    this.itemAddedHandler(event.items, event.location);
                    break;
                case eui.CollectionEventKind.REMOVE:
                    this.itemRemovedHandler(event.items, event.location);
                    break;
                case eui.CollectionEventKind.UPDATE:
                case eui.CollectionEventKind.REPLACE:
                    this.itemUpdatedHandler(event.items[0], event.location);
                    break;
                case eui.CollectionEventKind.RESET:
                case eui.CollectionEventKind.REFRESH:
                    if (this.$layout && this.$layout.$useVirtualLayout) {
                        var indexToRenderer = this.$indexToRenderer;
                        var keys = Object.keys(indexToRenderer);
                        var length_1 = keys.length;
                        for (var i = length_1 - 1; i >= 0; i--) {
                            var index = +keys[i];
                            this.freeRendererByIndex(index);
                        }
                    }
                    this.$dataProviderChanged = true;
                    this.invalidateProperties();
                    break;
            }
            this.invalidateSize();
            this.invalidateDisplayList();
        };
        /**
         * @private
         * 数据源添加项目事件处理
         */
        DataGroup.prototype.itemAddedHandler = function (items, index) {
            var length = items.length;
            for (var i = 0; i < length; i++) {
                this.itemAdded(items[i], index + i);
            }
            this.resetRenderersIndices();
        };
        /**
         * @private
         * 数据源移除项目事件处理
         */
        DataGroup.prototype.itemRemovedHandler = function (items, location) {
            var length = items.length;
            for (var i = length - 1; i >= 0; i--) {
                this.itemRemoved(items[i], location + i);
            }
            this.resetRenderersIndices();
        };
        /**
         * Adds the item for the specified dataProvider item to this DataGroup.
         *
         * This method is called as needed by the DataGroup implementation,
         * it should not be called directly.
         *
         * @param item The item that was added, the value of dataProvider[index].
         * @param index The index where the dataProvider item was added.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 添加一个指定的数据到数据源。
         *
         * 这个方法不应该由开发者直接调用，而用于本类自动内调用。
         *
         * @param item 添加的数据项。
         * @param index 被添加到的索引。
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        DataGroup.prototype.itemAdded = function (item, index) {
            if (this.$layout)
                this.$layout.elementAdded(index);
            if (this.$layout && this.$layout.$useVirtualLayout) {
                this.$indexToRenderer.splice(index, 0, null);
                return;
            }
            var renderer = this.createVirtualRenderer(item);
            this.$indexToRenderer.splice(index, 0, renderer);
            if (renderer) {
                this.updateRenderer(renderer, index, item);
                var values = this.$DataGroup;
                if (values[4 /* createNewRendererFlag */]) {
                    values[4 /* createNewRendererFlag */] = false;
                    this.rendererAdded(renderer, index, item);
                }
            }
        };
        /**
         * Removes the itemRenderer for the specified dataProvider item from this DataGroup.
         *
         * This method is called as needed by the DataGroup implementation,
         * it should not be called directly.
         *
         * @param item The item that is being removed.
         * @param index The index of the item that is being removed.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 删除数据源中指定的项。
         *
         * 这个方法不应该由开发者直接调用，而用于本类自动内调用。
         *
         * @param item 移除的数据项。
         * @param index 被移除的索引。
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        DataGroup.prototype.itemRemoved = function (item, index) {
            if (this.$layout)
                this.$layout.elementRemoved(index);
            var oldRenderer = this.$indexToRenderer[index];
            if (this.$indexToRenderer.length > index)
                this.$indexToRenderer.splice(index, 1);
            if (oldRenderer) {
                if (this.$layout && this.$layout.$useVirtualLayout) {
                    this.doFreeRenderer(oldRenderer);
                }
                else {
                    this.rendererRemoved(oldRenderer, index, item);
                    this.removeChild(oldRenderer);
                }
            }
        };
        /**
         * @private
         * 更新当前所有项的索引
         */
        DataGroup.prototype.resetRenderersIndices = function () {
            var indexToRenderer = this.$indexToRenderer;
            if (indexToRenderer.length == 0)
                return;
            if (this.$layout && this.$layout.$useVirtualLayout) {
                var keys = Object.keys(indexToRenderer);
                var length_2 = keys.length;
                for (var i = 0; i < length_2; i++) {
                    var index = +keys[i];
                    this.resetRendererItemIndex(index);
                }
            }
            else {
                var indexToRendererLength = indexToRenderer.length;
                for (var index = 0; index < indexToRendererLength; index++) {
                    this.resetRendererItemIndex(index);
                }
            }
        };
        /**
         * @private
         * 数据源更新或替换项目事件处理
         */
        DataGroup.prototype.itemUpdatedHandler = function (item, location) {
            if (this.$DataGroup[11 /* renderersBeingUpdated */]) {
                return; //防止无限循环
            }
            var renderer = this.$indexToRenderer[location];
            if (renderer)
                this.updateRenderer(renderer, location, item);
        };
        /**
         * @private
         * 调整指定项呈示器的索引值
         */
        DataGroup.prototype.resetRendererItemIndex = function (index) {
            var renderer = this.$indexToRenderer[index];
            if (renderer)
                renderer.itemIndex = index;
        };
        Object.defineProperty(DataGroup.prototype, "itemRenderer", {
            /**
             * The item renderer to use for data items.
             * The class must implement the IItemRenderer interface.
             * If defined, the <code>itemRendererFunction</code> property
             * takes precedence over this property.
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 用于数据项目的项呈示器。您应该直接为此属性赋值自定义类的类定义，而不是一个实例。注意：该类必须实现 IItemRenderer 接口。<br/>
             * rendererClass获取顺序：itemRendererFunction > itemRenderer > 默认ItemRenerer。
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this.$DataGroup[6 /* itemRenderer */];
            },
            set: function (value) {
                var values = this.$DataGroup;
                if (values[6 /* itemRenderer */] == value)
                    return;
                values[6 /* itemRenderer */] = value;
                values[5 /* itemRendererChanged */] = true;
                values[8 /* typicalItemChanged */] = true;
                values[10 /* cleanFreeRenderer */] = true;
                this.removeDataProviderListener();
                this.invalidateProperties();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataGroup.prototype, "itemRendererSkinName", {
            /**
             * The skinName property of the itemRenderer.This property will be passed to itemRenderer.skinName as default value,if you
             * did not set it explicitly.<br>
             * Note: This property is invalid if the itemRenderer is not a subclass of the Component class.
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 条目渲染器的可选皮肤标识符。在实例化itemRenderer时，若其内部没有设置过skinName,则将此属性的值赋值给它的skinName。
             * 注意:若 itemRenderer 不是 Component 的子类，则此属性无效。
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this.$DataGroup[13 /* itemRendererSkinName */];
            },
            set: function (value) {
                var values = this.$DataGroup;
                if (values[13 /* itemRendererSkinName */] == value)
                    return;
                values[13 /* itemRendererSkinName */] = value;
                if (this.$UIComponent[29 /* initialized */]) {
                    values[14 /* itemRendererSkinNameChange */] = true;
                    this.invalidateProperties();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataGroup.prototype, "itemRendererFunction", {
            /**
             * Function that returns an item renderer for a
             * specific item.
             *
             * If defined, this property
             * takes precedence over the <code>itemRenderer</code> property.
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 为某个特定数据项返回一个项呈示器类定义的函数。
             * rendererClass获取顺序：itemRendererFunction > itemRenderer > 默认ItemRenerer。
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this.$DataGroup[7 /* itemRendererFunction */];
            },
            set: function (value) {
                var values = this.$DataGroup;
                if (values[7 /* itemRendererFunction */] == value)
                    return;
                values[7 /* itemRendererFunction */] = value;
                values[5 /* itemRendererChanged */] = true;
                values[8 /* typicalItemChanged */] = true;
                this.removeDataProviderListener();
                this.invalidateProperties();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         * 为特定的数据项返回项呈示器的工厂实例
         */
        DataGroup.prototype.itemToRendererClass = function (item) {
            var rendererClass;
            var values = this.$DataGroup;
            if (values[7 /* itemRendererFunction */]) {
                rendererClass = values[7 /* itemRendererFunction */](item);
            }
            if (!rendererClass) {
                rendererClass = values[6 /* itemRenderer */];
            }
            if (!rendererClass) {
                rendererClass = eui.ItemRenderer;
            }
            if (!rendererClass.$hashCode) {
                rendererClass.$hashCode = egret.$hashCount++;
            }
            return rendererClass;
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        DataGroup.prototype.createChildren = function () {
            if (!this.$layout) {
                var layout = new eui.VerticalLayout();
                layout.gap = 0;
                layout.horizontalAlign = eui.JustifyAlign.CONTENT_JUSTIFY;
                this.$setLayout(layout);
            }
            _super.prototype.createChildren.call(this);
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        DataGroup.prototype.commitProperties = function () {
            var values = this.$DataGroup;
            if (values[5 /* itemRendererChanged */] || this.$dataProviderChanged || values[1 /* useVirtualLayoutChanged */]) {
                this.removeAllRenderers();
                if (this.$layout)
                    this.$layout.clearVirtualLayoutCache();
                this.setTypicalLayoutRect(null);
                values[1 /* useVirtualLayoutChanged */] = false;
                values[5 /* itemRendererChanged */] = false;
                if (this.$dataProvider)
                    this.$dataProvider.addEventListener(eui.CollectionEvent.COLLECTION_CHANGE, this.onCollectionChange, this);
                if (this.$layout && this.$layout.$useVirtualLayout) {
                    this.invalidateSize();
                    this.invalidateDisplayList();
                }
                else {
                    this.createRenderers();
                }
                if (this.$dataProviderChanged) {
                    this.$dataProviderChanged = false;
                    this.scrollV = this.scrollH = 0;
                }
            }
            _super.prototype.commitProperties.call(this);
            if (values[8 /* typicalItemChanged */]) {
                values[8 /* typicalItemChanged */] = false;
                if (this.$dataProvider && this.$dataProvider.length > 0) {
                    values[12 /* typicalItem */] = this.$dataProvider.getItemAt(0);
                    this.measureRendererSize();
                }
            }
            if (values[14 /* itemRendererSkinNameChange */]) {
                values[14 /* itemRendererSkinNameChange */] = false;
                var skinName = values[13 /* itemRendererSkinName */];
                var indexToRenderer = this.$indexToRenderer;
                var keys = Object.keys(indexToRenderer);
                var length_3 = keys.length;
                for (var i = 0; i < length_3; i++) {
                    var index = keys[i];
                    this.setItemRenderSkinName(indexToRenderer[index], skinName);
                }
                var freeRenderers = values[3 /* freeRenderers */];
                keys = Object.keys(freeRenderers);
                length_3 = keys.length;
                for (var i = 0; i < length_3; i++) {
                    var hashCode = keys[i];
                    var list = freeRenderers[hashCode];
                    var length_4 = list.length;
                    for (var i_1 = 0; i_1 < length_4; i_1++) {
                        this.setItemRenderSkinName(list[i_1], skinName);
                    }
                }
            }
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        DataGroup.prototype.measure = function () {
            if (this.$layout && this.$layout.$useVirtualLayout) {
                this.ensureTypicalLayoutElement();
            }
            _super.prototype.measure.call(this);
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        DataGroup.prototype.updateDisplayList = function (unscaledWidth, unscaledHeight) {
            var useVirtualLayout = (this.$layout && this.$layout.$useVirtualLayout);
            if (useVirtualLayout) {
                this.ensureTypicalLayoutElement();
            }
            _super.prototype.updateDisplayList.call(this, unscaledWidth, unscaledHeight);
            var values = this.$DataGroup;
            if (useVirtualLayout) {
                //检查索引 0 处的项测量大小是否发生改变，若改变就重新计算 typicalLayoutRect
                var rect = values[9 /* typicalLayoutRect */];
                if (rect) {
                    var renderer = this.$indexToRenderer[0];
                    if (renderer) {
                        var bounds = egret.$TempRectangle;
                        renderer.getPreferredBounds(bounds);
                        if (bounds.width != rect.width || bounds.height != rect.height) {
                            values[9 /* typicalLayoutRect */] = null;
                        }
                    }
                }
            }
        };
        /**
         * @private
         * 确保测量过默认条目大小。
         */
        DataGroup.prototype.ensureTypicalLayoutElement = function () {
            if (this.$DataGroup[9 /* typicalLayoutRect */])
                return;
            if (this.$dataProvider && this.$dataProvider.length > 0) {
                this.$DataGroup[12 /* typicalItem */] = this.$dataProvider.getItemAt(0);
                this.measureRendererSize();
            }
        };
        /**
         * @private
         * 测量项呈示器默认尺寸
         */
        DataGroup.prototype.measureRendererSize = function () {
            var values = this.$DataGroup;
            if (!values[12 /* typicalItem */]) {
                this.setTypicalLayoutRect(null);
                return;
            }
            var typicalRenderer = this.createVirtualRenderer(values[12 /* typicalItem */]);
            if (!typicalRenderer) {
                this.setTypicalLayoutRect(null);
                return;
            }
            this.updateRenderer(typicalRenderer, 0, values[12 /* typicalItem */]);
            typicalRenderer.validateNow();
            var bounds = egret.$TempRectangle;
            typicalRenderer.getPreferredBounds(bounds);
            var rect = new egret.Rectangle(0, 0, bounds.width, bounds.height);
            if (this.$layout && this.$layout.$useVirtualLayout) {
                if (values[4 /* createNewRendererFlag */]) {
                    this.rendererAdded(typicalRenderer, 0, values[12 /* typicalItem */]);
                }
                this.doFreeRenderer(typicalRenderer);
            }
            else {
                this.removeChild(typicalRenderer);
            }
            this.setTypicalLayoutRect(rect);
            values[4 /* createNewRendererFlag */] = false;
        };
        /**
         * @private
         * 设置项目默认大小
         */
        DataGroup.prototype.setTypicalLayoutRect = function (rect) {
            this.$DataGroup[9 /* typicalLayoutRect */] = rect;
            if (this.$layout) {
                if (rect) {
                    this.$layout.setTypicalSize(rect.width, rect.height);
                }
                else {
                    this.$layout.setTypicalSize(0, 0);
                }
            }
        };
        /**
         * @private
         * 移除所有项呈示器
         */
        DataGroup.prototype.removeAllRenderers = function () {
            var indexToRenderer = this.$indexToRenderer;
            var keys = Object.keys(indexToRenderer);
            var length = keys.length;
            for (var i = 0; i < length; i++) {
                var index = keys[i];
                var renderer = indexToRenderer[index];
                if (renderer) {
                    this.rendererRemoved(renderer, renderer.itemIndex, renderer.data);
                    this.removeChild(renderer);
                }
            }
            this.$indexToRenderer = [];
            var values = this.$DataGroup;
            if (values[10 /* cleanFreeRenderer */]) {
                var freeRenderers = values[3 /* freeRenderers */];
                var keys_1 = Object.keys(freeRenderers);
                var length_5 = keys_1.length;
                for (var i = 0; i < length_5; i++) {
                    var hashCode = keys_1[i];
                    var list = freeRenderers[hashCode];
                    var length_6 = list.length;
                    for (var i_2 = 0; i_2 < length_6; i_2++) {
                        var renderer = list[i_2];
                        this.rendererRemoved(renderer, renderer.itemIndex, renderer.data);
                        this.removeChild(renderer);
                    }
                }
                values[3 /* freeRenderers */] = {};
                values[2 /* rendererToClassMap */] = {};
                values[10 /* cleanFreeRenderer */] = false;
            }
        };
        /**
         * @private
         * 为数据项创建项呈示器
         */
        DataGroup.prototype.createRenderers = function () {
            if (!this.$dataProvider)
                return;
            var index = 0;
            var length = this.$dataProvider.length;
            for (var i = 0; i < length; i++) {
                var item = this.$dataProvider.getItemAt(i);
                var rendererClass = this.itemToRendererClass(item);
                var renderer = this.createOneRenderer(rendererClass);
                if (!renderer)
                    continue;
                this.$indexToRenderer[index] = renderer;
                this.updateRenderer(renderer, index, item);
                this.rendererAdded(renderer, index, item);
                index++;
            }
        };
        /**
         * Updates the renderer for reuse.
         * This method first prepares the item
         * renderer for reuse by cleaning out any stale properties
         * as well as updating it with new properties.<p/>
         *
         * The last thing this method should do is set the <code>data</code> property
         * of the item renderer.
         *
         * @param renderer The item renderer.
         * @param itemIndex The index of the data in the data provider.
         * @param data The data object this item renderer is representing.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 此方法首先会准备项呈示器以重用，方法是清除任何旧属性，同时使用新属性进行更新。<p/>
         *
         * 最后，此方法应对项呈示器设置 data 属性。
         *
         * @param renderer 项呈示器。
         * @param itemIndex 数据提供程序中的数据索引。
         * @param data 此项呈示器正在表示的数据对象。
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        DataGroup.prototype.updateRenderer = function (renderer, itemIndex, data) {
            var values = this.$DataGroup;
            values[11 /* renderersBeingUpdated */] = true;
            renderer.itemIndex = itemIndex;
            if (renderer.parent == this) {
                this.setChildIndex(renderer, itemIndex);
            }
            renderer.data = data;
            values[11 /* renderersBeingUpdated */] = false;
            return renderer;
        };
        Object.defineProperty(DataGroup.prototype, "numElements", {
            /**
             * @inheritDoc
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             */
            get: function () {
                if (!this.$dataProvider)
                    return 0;
                return this.$dataProvider.length;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Adds the itemRenderer for the specified dataProvider item to this DataGroup.
         *
         * This method is called as needed by the DataGroup implementation,
         * it should not be called directly.
         *
         * @param renderer The renderer that was added.
         * @param index The index where the dataProvider item was added.
         * @param item The item that was added, the value of dataProvider[index].
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 项呈示器被添加.
         *
         * 这个方法不能直接调用，它是由该类自身自动调用的。
         *
         * @param renderer 添加的项呈示器
         * @param index 项呈示器的索引
         * @param item 项呈示器对应的数据
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        DataGroup.prototype.rendererAdded = function (renderer, index, item) {
        };
        /**
         * Removes the itemRenderer for the specified dataProvider item from this DataGroup.
         *
         * This method is called as needed by the DataGroup implementation,
         * it should not be called directly.
         *
         * @param renderer The renderer that is being removed.
         * @param index The index of the item that is being removed.
         * @param item The item that is being removed.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 项呈示器被移除。
         * 这个方法不能直接调用，它是由该类自身自动调用的。
         *
         * @param renderer 移除的项呈示器
         * @param index 项呈示器的索引
         * @param item 项呈示器对应的数据
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        DataGroup.prototype.rendererRemoved = function (renderer, index, item) {
        };
        return DataGroup;
    }(eui.Group));
    eui.DataGroup = DataGroup;
    __reflect(DataGroup.prototype, "eui.DataGroup");
    eui.registerProperty(DataGroup, "itemRenderer", "Class");
    eui.registerProperty(DataGroup, "itemRendererSkinName", "Class");
    eui.registerProperty(DataGroup, "dataProvider", "eui.ICollection", true);
})(eui || (eui = {}));
//# sourceMappingURL=DataGroup.js.map