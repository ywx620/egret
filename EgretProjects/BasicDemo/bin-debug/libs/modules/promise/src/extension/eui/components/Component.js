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
/// <reference path="../utils/registerProperty.ts" />
var eui;
(function (eui) {
    /**
     * The Component class defines the base class for skinnable components.
     * The skins used by a Component class are typically child classes of
     * the Skin class.<p/>
     *
     * Associate a skin class with a component class by setting the <code>skinName</code> property of the
     * component class.
     * @event egret.Event.COMPLETE Dispatch when <code>skinName</code> property is set the path of external EXML file and the EXML file is resolved.
     *
     * @includeExample  extension/eui/components/ComponentExample.ts
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @language en_US
     */
    /**
     * Component 类定义可设置外观的组件的基类。Component 类所使用的外观通常是 Skin 类的子类。<p/>
     * 通过设置 component 类的 skinName 属性，将 skin 类与 component 类相关联。
     * @event egret.Event.COMPLETE 当设置skinName为外部exml文件路径时，加载并完成EXML解析后调度。
     *
     * @includeExample  extension/eui/components/ComponentExample.ts
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @language zh_CN
     */
    var Component = (function (_super) {
        __extends(Component, _super);
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
        function Component() {
            var _this = _super.call(this) || this;
            _this.initializeUIValues();
            _this.$Component = {
                0: null,
                1: null,
                2: "",
                3: true,
                4: false,
                5: false,
                6: true,
                7: true,
                8: null //skin
            };
            //if egret
            _this.$touchEnabled = true;
            return _this;
            //endif*/
        }
        Object.defineProperty(Component.prototype, "hostComponentKey", {
            /**
             * A identifier of host component which can determine only one component names.
             * Usually used for quering a default skin name in theme.
             * @default null
             * @see eui.Theme#getSkinName()
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 主机组件标识符。用于唯一确定一个组件的名称。通常用于在主题中查询默认皮肤名。
             *
             * @default null
             * @see eui.Theme#getSkinName()
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this.$Component[0 /* hostComponentKey */];
            },
            set: function (value) {
                this.$Component[0 /* hostComponentKey */] = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Component.prototype, "skinName", {
            /**
             * Identifier of skin. Valid values: class definition of skin,
             * class name of skin, instance of skin, EXML or external EXML file path.
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 皮肤标识符。有效值可为：皮肤类定义,皮肤类名,皮肤实例,EXML文件内容,或外部EXML文件路径，
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this.$Component[1 /* skinName */];
            },
            set: function (value) {
                var values = this.$Component;
                values[5 /* skinNameExplicitlySet */] = true;
                if (values[1 /* skinName */] == value)
                    return;
                if (value) {
                    values[1 /* skinName */] = value;
                }
                else {
                    var theme = egret.getImplementation("eui.Theme");
                    if (theme) {
                        var skinName = theme.getSkinName(this);
                        if (skinName) {
                            values[1 /* skinName */] = skinName;
                        }
                    }
                }
                this.$parseSkinName();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         * 解析skinName
         */
        Component.prototype.$parseSkinName = function () {
            var skinName = this.skinName;
            var skin;
            if (skinName) {
                if (skinName.prototype) {
                    skin = new skinName();
                }
                else if (typeof (skinName) == "string") {
                    var clazz = void 0;
                    var text = skinName.trim();
                    if (text.charAt(0) == "<") {
                        clazz = EXML.parse(text);
                    }
                    else {
                        clazz = egret.getDefinitionByName(skinName);
                        if (!clazz && text.toLowerCase().indexOf(".exml") != -1) {
                            EXML.load(skinName, this.onExmlLoaded, this, true);
                            return;
                        }
                    }
                    if (clazz) {
                        skin = new clazz();
                    }
                }
                else {
                    skin = skinName;
                }
            }
            this.setSkin(skin);
        };
        /**
         * @private
         * @param clazz
         * @param url
         */
        Component.prototype.onExmlLoaded = function (clazz, url) {
            if (this.skinName != url) {
                return;
            }
            var skin = new clazz();
            this.setSkin(skin);
        };
        Object.defineProperty(Component.prototype, "skin", {
            /**
             * The instance of the skin class for this component instance.
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 皮肤对象实例。
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this.$Component[8 /* skin */];
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Setter for the skin instance.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 设置皮肤实例
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        Component.prototype.setSkin = function (skin) {
            if (skin && !(skin instanceof eui.Skin)) {
                skin = null;
                true && egret.$error(2202);
            }
            var values = this.$Component;
            var oldSkin = values[8 /* skin */];
            if (oldSkin) {
                var skinParts = oldSkin.skinParts;
                var length_1 = skinParts.length;
                for (var i = 0; i < length_1; i++) {
                    var partName = skinParts[i];
                    if (this[partName]) {
                        this.setSkinPart(partName, null);
                    }
                }
                var children = oldSkin.$elementsContent;
                if (children) {
                    length_1 = children.length;
                    for (var i = 0; i < length_1; i++) {
                        var child = children[i];
                        if (child.$parent == this) {
                            this.removeChild(child);
                        }
                    }
                }
                oldSkin.hostComponent = null;
            }
            values[8 /* skin */] = skin;
            if (skin) {
                var skinParts = skin.skinParts;
                var length_2 = skinParts.length;
                for (var i = 0; i < length_2; i++) {
                    var partName = skinParts[i];
                    var instance = skin[partName];
                    if (instance) {
                        this.setSkinPart(partName, instance);
                    }
                }
                var children = skin.$elementsContent;
                if (children) {
                    for (var i = children.length - 1; i >= 0; i--) {
                        this.addChildAt(children[i], 0);
                    }
                }
                skin.hostComponent = this;
            }
            this.invalidateSize();
            this.invalidateDisplayList();
            this.dispatchEventWith(egret.Event.COMPLETE);
        };
        /**
         * Find the skin parts in the skin class and assign them to the properties of the component.
         * You do not call this method directly. This method will be invoked automatically when using a EXML as skin.
         * The ID for a tag in an EXML will be passed in as <code>partName</code>, and the instance of the tag will be
         * passed in as <code>instance</code>.
         * @param partName name of a skin part
         * @param instance instance of a skin part
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 关联一个对象到逻辑组件的指定皮肤部件上。通常您不需要手动调用此方法，当使用EXML文件作为组件皮肤，此方法将会被自动调用。
         * 在运行时，EXML文件内声明的id名称将作为此方法的partName参数，而id所对应的节点对象，将作为此方法的instance参数被依次传入。
         * @param partName 皮肤部件名称
         * @param instance 皮肤部件实例
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        Component.prototype.setSkinPart = function (partName, instance) {
            var oldInstance = this[partName];
            if (oldInstance) {
                this.partRemoved(partName, oldInstance);
            }
            this[partName] = instance;
            if (instance) {
                this.partAdded(partName, instance);
            }
        };
        /**
         * Called when a skin part is added.
         * You do not call this method directly.
         * EUI calls it automatically when it calls the <code>setSkinPart()</code> method.<p/>
         *
         * Override this function to attach behavior to the part, such as add event listener or
         * assign property values cached.
         * @param partName name of a skin part to add.
         * @param instance instance of a skin part to add.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 添加皮肤部件时调用。
         * 您无需直接调用此方法。
         * EUI 会在调用 setSkinPart()方法时自动调用此方法。<p/>
         *
         * 子类覆盖此方法，以在皮肤部件第一次附加时对其执行一些初始化操作，例如添加事件监听，赋值缓存的属性值等。
         * @param partName 要附加的皮肤部件名称。
         * @param instance 要附加的皮肤部件实例。
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        Component.prototype.partAdded = function (partName, instance) {
        };
        /**
         * Called when an instance of a skin part is being removed.
         * You do not call this method directly.
         * EUI calls it automatically when it calls the <code>setSkinPart()</code> method.<p/>
         *
         * Override this function to clean behavior of the part, such as remove event listener or
         * disconnect the cache reference
         * @param partName name of a skin part to remove.
         * @param instance instance of a skin part to remove.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 正删除外观部件的实例时调用。
         * 您无需直接调用此方法。
         * EUI 会在调用 setSkinPart()方法时自动调用此方法。<p/>
         *
         * 子类覆盖此方法，以在皮肤部件从逻辑组件卸载时对其执行一些清理操作，例如移除事件监听，断开缓存的引用等。
         * @param partName 要卸载的皮肤部件名称
         * @param instance 要卸载的皮肤部件实例
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        Component.prototype.partRemoved = function (partName, instance) {
        };
        /**
         * @private
         *
         * @param value
         */
        Component.prototype.$setTouchChildren = function (value) {
            value = !!value;
            var values = this.$Component;
            values[6 /* explicitTouchChildren */] = value;
            if (values[3 /* enabled */]) {
                values[6 /* explicitTouchChildren */] = value;
                return _super.prototype.$setTouchChildren.call(this, value);
            }
            else {
                return true;
            }
        };
        /**
         * @private
         *
         * @param value
         */
        Component.prototype.$setTouchEnabled = function (value) {
            value = !!value;
            var values = this.$Component;
            values[7 /* explicitTouchEnabled */] = value;
            if (values[3 /* enabled */]) {
                return _super.prototype.$setTouchEnabled.call(this, value);
            }
            else {
                return true;
            }
        };
        Object.defineProperty(Component.prototype, "enabled", {
            /**
             * Whether the component can accept user interaction.
             * After setting the <code>enabled</code> property to <code>false</code>, components will disabled touch event
             * (set <code>touchEnabled</code> and <code>touchChildren</code> to false) and set state of skin to "disabled".
             *
             * @default true
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 组件是否可以接受用户交互。
             * 将 enabled 属性设置为 false 后，
             * 组件会自动禁用触摸事件(将 touchEnabled 和 touchChildren 同时设置为 false)，
             * 部分组件可能还会将皮肤的视图状态设置为"disabled",使其所有子项的颜色变暗。
             *
             * @default true
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this.$Component[3 /* enabled */];
            },
            set: function (value) {
                value = !!value;
                this.$setEnabled(value);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         *
         * @param value
         */
        Component.prototype.$setEnabled = function (value) {
            var values = this.$Component;
            if (value === values[3 /* enabled */]) {
                return false;
            }
            values[3 /* enabled */] = value;
            if (value) {
                this.$touchEnabled = values[7 /* explicitTouchEnabled */];
                this.$touchChildren = values[6 /* explicitTouchChildren */];
            }
            else {
                this.$touchEnabled = false;
                this.$touchChildren = false;
            }
            this.invalidateState();
            return true;
        };
        Object.defineProperty(Component.prototype, "currentState", {
            //========================皮肤视图状态=====================start=======================
            /**
             * The current view state of the component. When you use this property to set a component's state,
             * EUI will explicit update state of skin and ignore the return of <code>getCurrentState()</code>.
             *
             * Set to <code>""</code> or <code>null</code> to reset the component back to its base state.
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 组件的当前视图状态。显式设置此属性，
             * 将采用显式设置的值去更新皮肤状态，而忽略组件内部 getCurrentState() 方法返回的值。
             *
             * 将其设置为 "" 或 null 可将取消组件外部显式设置的视图状态名称，从而采用内部 getCurrentState() 方法返回的状态。
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                var values = this.$Component;
                return values[2 /* explicitState */] ?
                    values[2 /* explicitState */] : this.getCurrentState();
            },
            set: function (value) {
                var values = this.$Component;
                if (value == values[2 /* explicitState */]) {
                    return;
                }
                values[2 /* explicitState */] = value;
                this.invalidateState();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Marks the component so that the new state of the skin is set during a later screen update.
         * A subclass of SkinnableComponent must override <code>getCurrentState()</code> to return a value.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 标记组件当前的视图状态失效，调用此方法后，子类应该覆盖 <code>getCurrentState()</code> 方法来返回当前的视图状态名称。
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        Component.prototype.invalidateState = function () {
            var values = this.$Component;
            if (values[4 /* stateIsDirty */])
                return;
            values[4 /* stateIsDirty */] = true;
            this.invalidateProperties();
        };
        /**
         * Returns the name of the state to be applied to the skin.<p/>
         * A subclass of SkinnableComponent must override this method to return a value.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 返回组件当前的皮肤状态名称,子类覆盖此方法定义各种状态名
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        Component.prototype.getCurrentState = function () {
            return "";
        };
        /**
         * Create child objects of the component. This is an advanced method that you might override
         * when creating a subclass of Component. This method will be called once it be added to stage.
         * You must invoke <code>super.createChildren()</code> to complete initialization of the parent class
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 子类覆盖此方法可以执行一些初始化子项操作。此方法仅在组件第一次添加到舞台时回调一次。
         * 请务必调用super.createChildren()以完成父类组件的初始化
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        Component.prototype.createChildren = function () {
            var values = this.$Component;
            if (!values[1 /* skinName */]) {
                var theme = egret.getImplementation("eui.Theme");
                if (theme) {
                    var skinName = theme.getSkinName(this);
                    if (skinName) {
                        values[1 /* skinName */] = skinName;
                        this.$parseSkinName();
                    }
                }
            }
        };
        /**
         * Performs any final processing after child objects are created.
         * This is an advanced method that you might override
         * when creating a subclass of Component.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 创建子对象后执行任何最终处理。此方法在创建 Component 的子类时覆盖。
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        Component.prototype.childrenCreated = function () {
        };
        /**
         * Processes the properties set on the component.
         * You can override this method when creating a subclass of Component.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 提交属性，子类在调用完invalidateProperties()方法后，应覆盖此方法以应用属性
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        Component.prototype.commitProperties = function () {
            eui.sys.UIComponentImpl.prototype["commitProperties"].call(this);
            var values = this.$Component;
            if (values[4 /* stateIsDirty */]) {
                values[4 /* stateIsDirty */] = false;
                if (values[8 /* skin */]) {
                    values[8 /* skin */].currentState = this.currentState;
                }
            }
        };
        /**
         * Calculates the default size.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 测量组件尺寸
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        Component.prototype.measure = function () {
            eui.sys.measure(this);
            var skin = this.$Component[8 /* skin */];
            if (!skin) {
                return;
            }
            var values = this.$UIComponent;
            if (!isNaN(skin.width)) {
                values[16 /* measuredWidth */] = skin.width;
            }
            else {
                if (values[16 /* measuredWidth */] < skin.minWidth) {
                    values[16 /* measuredWidth */] = skin.minWidth;
                }
                if (values[16 /* measuredWidth */] > skin.maxWidth) {
                    values[16 /* measuredWidth */] = skin.maxWidth;
                }
            }
            if (!isNaN(skin.height)) {
                values[17 /* measuredHeight */] = skin.height;
            }
            else {
                if (values[17 /* measuredHeight */] < skin.minHeight) {
                    values[17 /* measuredHeight */] = skin.minHeight;
                }
                if (values[17 /* measuredHeight */] > skin.maxHeight) {
                    values[17 /* measuredHeight */] = skin.maxHeight;
                }
            }
        };
        /**
         * Draws the object and/or sizes and positions its children.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 更新显示列表
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        Component.prototype.updateDisplayList = function (unscaledWidth, unscaledHeight) {
            eui.sys.updateDisplayList(this, unscaledWidth, unscaledHeight);
        };
        /**
         * Method to invalidate parent size and display list if
         * this object affects its layout (includeInLayout is true).
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 此对象影响其布局时（includeInLayout 为 true），使父代大小和显示列表失效的方法。
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        Component.prototype.invalidateParentLayout = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        Component.prototype.setMeasuredSize = function (width, height) {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        Component.prototype.invalidateProperties = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        Component.prototype.validateProperties = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        Component.prototype.invalidateSize = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        Component.prototype.validateSize = function (recursive) {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        Component.prototype.invalidateDisplayList = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        Component.prototype.validateDisplayList = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        Component.prototype.validateNow = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        Component.prototype.setLayoutBoundsSize = function (layoutWidth, layoutHeight) {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        Component.prototype.setLayoutBoundsPosition = function (x, y) {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        Component.prototype.getLayoutBounds = function (bounds) {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        Component.prototype.getPreferredBounds = function (bounds) {
        };
        return Component;
    }(egret.DisplayObjectContainer));
    eui.Component = Component;
    __reflect(Component.prototype, "eui.Component", ["eui.UIComponent", "egret.DisplayObject"]);
    eui.registerProperty(Component, "skinName", "Class");
    eui.sys.implementUIComponent(Component, egret.DisplayObjectContainer, true);
})(eui || (eui = {}));
//# sourceMappingURL=Component.js.map