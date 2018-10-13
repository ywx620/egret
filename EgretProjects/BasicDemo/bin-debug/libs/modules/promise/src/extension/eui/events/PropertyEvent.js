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
     * The PropertyChangeEvent class represents the event object
     * passed to the event listener when one of the properties of
     * an object has changed, and provides information about the change.
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/events/PropertyEventExample.ts
     * @language en_US
     */
    /**
     * 对象的一个属性发生更改时传递到事件侦听器的事件。
     *
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/events/PropertyEventExample.ts
     * @language zh_CN
     */
    var PropertyEvent = (function (_super) {
        __extends(PropertyEvent, _super);
        /**
         * Constructor.
         *
         * @param type The event type; indicates the action that triggered the event.
         * @param bubbles Specifies whether the event can bubble
         * up the display list hierarchy.
         * @param cancelable Specifies whether the behavior
         * associated with the event can be prevented.
         * @param property Name of the property that changed.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 创建一个属性改变事件。
         *
         * @param type 事件类型；指示触发事件的动作。
         * @param bubbles 指定该事件是否可以在显示列表层次结构得到冒泡处理。
         * @param cancelable 指定是否可以防止与事件相关联的行为。
         * @param property 发生改变的属性名称。
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        function PropertyEvent(type, bubbles, cancelable, property) {
            var _this = _super.call(this, type, bubbles, cancelable) || this;
            _this.property = property;
            return _this;
        }
        /**
         * Dispatch an event with specified EventDispatcher. The dispatched event will be cached in the object pool,
         * for the next cycle of reuse.
         *
         * @param target the target of event dispatcher.
         * @param eventType The event type; indicates the action that triggered the event.
         * @param property Name of the property that changed.
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 使用指定的 EventDispatcher 对象来抛出事件对象。抛出的对象将会缓存在对象池上，供下次循环复用。
         *
         * @param target 事件派发目标
         * @param eventType 事件类型；指示触发事件的动作。
         * @param property 发生改变的属性名称。
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        PropertyEvent.dispatchPropertyEvent = function (target, eventType, property) {
            if (!target.hasEventListener(eventType)) {
                return true;
            }
            var event = egret.Event.create(PropertyEvent, eventType);
            event.property = property;
            var result = target.dispatchEvent(event);
            egret.Event.release(event);
            return result;
        };
        /**
         * Dispatch when a property changed.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 属性改变。
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        PropertyEvent.PROPERTY_CHANGE = "propertyChange";
        return PropertyEvent;
    }(egret.Event));
    eui.PropertyEvent = PropertyEvent;
    __reflect(PropertyEvent.prototype, "eui.PropertyEvent");
})(eui || (eui = {}));
//# sourceMappingURL=PropertyEvent.js.map