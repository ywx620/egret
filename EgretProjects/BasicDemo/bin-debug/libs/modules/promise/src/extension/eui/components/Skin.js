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
     * The Skin class defines the base class for all skins.
     * You typically don't need to manually create the instance of this class.
     * It can be created by resolving a EXML.<p/>
     *
     * @example You typically write the skin classes in EXML, as the followiong example shows:<p/>
     * <pre>
     *      <?xml version="1.0" encoding="utf-8"?>
     *      <s:Skin xmlns:s="http://ns.egret.com/eui" xmlns:w="http://ns.egret.com/wing">
     *          <states>
     *              <!-- Specify the states controlled by this skin. -->
     *          </states>
     *          <!-- Define skin. -->
     *      </s:Skin>
     * </pre>
     *
     * @defaultProperty elementsContent
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/components/SkinExample.ts
     * @language en_US
     */
    /**
     * 皮肤基类。通常情况下，您不需要手动创建这个类的实例，而是通过解析EXML文件后自动生成。<p/>
     *
     * @example 通常您可以按照如下方式写EXML代码：<p/>
     * <pre>
     *      <?xml version="1.0" encoding="utf-8"?>
     *      <s:Skin xmlns:s="http://ns.egret.com/eui" xmlns:w="http://ns.egret.com/wing">
     *          <states>
     *              <!-- Specify the states controlled by this skin. -->
     *          </states>
     *          <!-- Define skin. -->
     *      </s:Skin>
     * </pre>
     *
     * @defaultProperty elementsContent
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/components/SkinExample.ts
     * @language zh_CN
     */
    var Skin = (function (_super) {
        __extends(Skin, _super);
        function Skin() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * The maximum recommended width of the component to be considered.
             * This property can only affect measure result of host component.
             *
             * @default 100000
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 皮肤的最大宽度。仅影响主机组件的测量结果。
             *
             * @default 100000
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            _this.maxWidth = 100000;
            /**
             * The minimum recommended width of the component to be considered.
             * This property can only affect measure result of host component.
             *
             * @default 0
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 皮肤的最小宽度,此属性设置为大于maxWidth的值时无效。仅影响主机组件的测量结果。
             *
             * @default 0
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            _this.minWidth = 0;
            /**
             * The maximum recommended height of the component to be considered.
             * This property can only affect measure result of host component.
             *
             * @default 100000
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 皮肤的最大高度。仅影响主机组件的测量结果。
             *
             * @default 100000
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            _this.maxHeight = 100000;
            /**
             * The minimum recommended height of the component to be considered.
             * This property can only affect measure result of host component.
             *
             * @default 0
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 皮肤的最小高度,此属性设置为大于maxHeight的值时无效。仅影响主机组件的测量结果。
             *
             * @default 0
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            _this.minHeight = 0;
            /**
             * Number that specifies the explicit width of the skin.
             * This property can only affect measure result of host component.
             * @default NaN
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 皮肤显式设置宽度,设置为 NaN 表示不显式设置。仅影响主机组件的测量结果。
             *
             * @default NaN
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            _this.width = NaN;
            /**
             * Number that specifies the explicit height of the skin.
             * This property can only affect measure result of host component.
             *
             * @default NaN
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 皮肤显式设置高度,设置为 NaN 表示不显式设置。仅影响主机组件的测量结果。
             *
             * @default NaN
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            _this.height = NaN;
            /**
             * @private
             */
            _this.$elementsContent = [];
            /**
             * @private
             */
            _this._hostComponent = null;
            /**
             * @private
             */
            _this.$stateValues = new eui.sys.StateValues();
            return _this;
        }
        Object.defineProperty(Skin.prototype, "elementsContent", {
            set: function (value) {
                this.$elementsContent = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Skin.prototype, "hostComponent", {
            /**
             * The host component which the skin will be attached.
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 此皮肤附加到的主机组件
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this._hostComponent;
            },
            set: function (value) {
                if (this._hostComponent == value)
                    return;
                if (this._hostComponent) {
                    this._hostComponent.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddedToStage, this);
                }
                this._hostComponent = value;
                var values = this.$stateValues;
                values.parent = value;
                if (value) {
                    this.commitCurrentState();
                    if (!this.$stateValues.intialized) {
                        if (value.$stage) {
                            this.initializeStates(value.$stage);
                        }
                        else {
                            value.once(egret.Event.ADDED_TO_STAGE, this.onAddedToStage, this);
                        }
                    }
                }
                eui.PropertyEvent.dispatchPropertyEvent(this, eui.PropertyEvent.PROPERTY_CHANGE, "hostComponent");
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         *
         * @param event
         */
        Skin.prototype.onAddedToStage = function (event) {
            this.initializeStates(this._hostComponent.$stage);
        };
        return Skin;
    }(egret.EventDispatcher));
    eui.Skin = Skin;
    __reflect(Skin.prototype, "eui.Skin");
    eui.sys.mixin(Skin, eui.sys.StateClient);
    eui.registerProperty(Skin, "elementsContent", "Array", true);
    eui.registerProperty(Skin, "states", "State[]");
    eui.registerBindable(Skin.prototype, "hostComponent");
})(eui || (eui = {}));
//# sourceMappingURL=Skin.js.map