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
     * The Panel class defines a container that includes a title bar,
     * a closeButton, a moveArea, and a content area for its children.
     *
     * @event eui.UIEvent.CLOSING Dispatched when the close button is taped
     * you can use <code>event.preventDefault()</code> to prevent close.
     *
     * @defaultProperty elementsContent
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/components/PanelExample.ts
     * @language en_US
     */
    /**
     * Panel 类定义一个容器，该容器为其子代提供标题栏、关闭按钮、可移动区域和内容区域。
     *
     * @event eui.UIEvent.CLOSING 面板即将关闭事件，在关闭按钮被点击后抛出，
     * 监听此事件并调用<code>event.preventDefault()</code>能够阻止面板被关闭。
     *
     * @defaultProperty elementsContent
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/components/PanelExample.ts
     * @language zh_CN
     */
    var Panel = (function (_super) {
        __extends(Panel, _super);
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
        function Panel() {
            var _this = _super.call(this) || this;
            /**
             * The skin part that defines the appearance of the close button.
             * When taped, the close button dispatches a <code>closing</code> event.
             *
             * @skinPart
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 关闭按钮
             *
             * @skinPart
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            _this.closeButton = null;
            /**
             * The area where the user must drag to move the window.
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 可移动区域
             *
             * @skinPart
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            _this.moveArea = null;
            /**
             * The skin part that defines the appearance of the
             * title text in the container.
             *
             * @skinPart
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 标题显示对象
             *
             * @skinPart
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            _this.titleDisplay = null;
            /**
             * @private
             */
            _this._title = "";
            /**
             * @private
             * 触摸按下时的偏移量
             */
            _this.offsetPointX = 0;
            /**
             * @private
             */
            _this.offsetPointY = 0;
            _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onWindowTouchBegin, _this, false, 100);
            return _this;
        }
        /**
         * @private
         * 在窗体上按下时前置窗口
         */
        Panel.prototype.onWindowTouchBegin = function (event) {
            this.$parent.addChild(this);
        };
        Object.defineProperty(Panel.prototype, "elementsContent", {
            /**
             * write-only property,This property is Usually invoked in resolving an EXML for adding multiple children quickly.
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 只写属性，此属性通常在 EXML 的解析器中调用，便于快速添加多个子项。
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            set: function (value) {
                if (value) {
                    var length_1 = value.length;
                    for (var i = 0; i < length_1; i++) {
                        this.addChild(value[i]);
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Panel.prototype, "title", {
            /**
             * Title or caption displayed in the title bar.
             *
             * @default ""
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 标题栏中显示的标题。
             *
             * @default ""
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this._title;
            },
            set: function (value) {
                this._title = value;
                if (this.titleDisplay)
                    this.titleDisplay.text = this.title;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        Panel.prototype.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
            if (instance == this.titleDisplay) {
                this.titleDisplay.text = this._title;
            }
            else if (instance == this.moveArea) {
                this.moveArea.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            }
            else if (instance == this.closeButton) {
                this.closeButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseButtonClick, this);
            }
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        Panel.prototype.partRemoved = function (partName, instance) {
            _super.prototype.partRemoved.call(this, partName, instance);
            if (instance == this.moveArea) {
                this.moveArea.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            }
            else if (instance == this.closeButton) {
                this.closeButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseButtonClick, this);
            }
        };
        /**
         * Dispatch the "closing" event when the closeButton is clicked.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 当 closeButton 被点击时派发 “closing” 事件
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        Panel.prototype.onCloseButtonClick = function (event) {
            if (eui.UIEvent.dispatchUIEvent(this, eui.UIEvent.CLOSING, true, true)) {
                this.close();
            }
        };
        /**
         * Close the panel and remove from the parent container.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 关闭面板，从父级容器移除自身。
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        Panel.prototype.close = function () {
            if (!this.$parent) {
                return;
            }
            this.$parent.removeChild(this);
        };
        /**
         * Called when the user starts dragging a Panel.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 在可移动区域按下
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        Panel.prototype.onTouchBegin = function (event) {
            this.$includeInLayout = false;
            this.offsetPointX = this.x - event.$stageX;
            this.offsetPointY = this.y - event.$stageY;
            this.$stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            this.$stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        };
        /**
         * Called when the user drags a Panel.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 触摸拖拽时的移动事件
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        Panel.prototype.onTouchMove = function (event) {
            this.x = event.$stageX + this.offsetPointX;
            this.y = event.$stageY + this.offsetPointY;
        };
        /**
         * Called when the user releases the Panel.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 在舞台上弹起事件
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        Panel.prototype.onTouchEnd = function (event) {
            var stage = event.$currentTarget;
            stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        };
        return Panel;
    }(eui.Component));
    eui.Panel = Panel;
    __reflect(Panel.prototype, "eui.Panel");
    eui.registerProperty(Panel, "elementsContent", "Array", true);
})(eui || (eui = {}));
//# sourceMappingURL=Panel.js.map