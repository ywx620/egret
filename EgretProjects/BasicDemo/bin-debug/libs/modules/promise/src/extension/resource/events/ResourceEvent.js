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
var RES;
(function (RES) {
    /**
     * The events of resource loading.
     * @version Egret 2.4
     * @platform Web,Native
     * @language en_US
     */
    /**
     * 资源加载事件。
     * @version Egret 2.4
     * @platform Web,Native
     * @language zh_CN
     */
    var ResourceEvent = (function (_super) {
        __extends(ResourceEvent, _super);
        /**
         * Creates an Event object to pass as a parameter to event listeners.
         * @param type  The type of the event, accessible as Event.type.
         * @param bubbles  Determines whether the Event object participates in the bubbling stage of the event flow. The default value is false.
         * @param cancelable Determines whether the Event object can be canceled. The default values is false.
         * @version Egret 2.4
         * @platform Web,Native
         * @private
         * @language en_US
         */
        /**
         * 创建一个作为参数传递给事件侦听器的 Event 对象。
         * @param type  事件的类型，可以作为 Event.type 访问。
         * @param bubbles  确定 Event 对象是否参与事件流的冒泡阶段。默认值为 false。
         * @param cancelable 确定是否可以取消 Event 对象。默认值为 false。
         * @version Egret 2.4
         * @platform Web,Native
         * @private
         * @language zh_CN
         */
        function ResourceEvent(type, bubbles, cancelable) {
            if (bubbles === void 0) { bubbles = false; }
            if (cancelable === void 0) { cancelable = false; }
            var _this = _super.call(this, type, bubbles, cancelable) || this;
            /**
             * File number that has been loaded.
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 已经加载的文件数。
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            _this.itemsLoaded = 0;
            /**
             * Total file number to load.
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 要加载的总文件数。
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            _this.itemsTotal = 0;
            /**
             * Resource group name.
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 资源组名。
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            _this.groupName = "";
            /**
             * An item of information that is finished by the end of a load.
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 一次加载项加载结束的项信息对象。
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            _this.resItem = null;
            return _this;
        }
        /**
         * 使用指定的EventDispatcher对象来抛出事件对象。抛出的对象将会缓存在对象池上，供下次循环复用。
         * @method RES.ResourceEvent.dispatchResourceEvent
         * @param target {egret.IEventDispatcher}
         * @param type {string}
         * @param groupName {string}
         * @param resItem {egret.ResourceItem}
         * @param itemsLoaded {number}
         * @param itemsTotal {number}
         * @private
         */
        ResourceEvent.dispatchResourceEvent = function (target, type, groupName, resItem, itemsLoaded, itemsTotal) {
            if (groupName === void 0) { groupName = ""; }
            if (resItem === void 0) { resItem = null; }
            if (itemsLoaded === void 0) { itemsLoaded = 0; }
            if (itemsTotal === void 0) { itemsTotal = 0; }
            var event = egret.Event.create(ResourceEvent, type);
            event.groupName = groupName;
            event.resItem = resItem;
            event.itemsLoaded = itemsLoaded;
            event.itemsTotal = itemsTotal;
            var result = target.dispatchEvent(event);
            egret.Event.release(event);
            return result;
        };
        /**
         * Failure event for a load item.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 一个加载项加载失败事件。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        ResourceEvent.ITEM_LOAD_ERROR = "itemLoadError";
        /**
         * Configure file to load and parse the completion event. Note: if a configuration file is loaded, it will not be thrown out, and if you want to handle the configuration loading failure, monitor the CONFIG_LOAD_ERROR event.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 配置文件加载并解析完成事件。注意：若有配置文件加载失败，将不会抛出此事件，若要处理配置加载失败，请同时监听 CONFIG_LOAD_ERROR 事件。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        ResourceEvent.CONFIG_COMPLETE = "configComplete";
        /**
         * Configuration file failed to load.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 配置文件加载失败事件。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        ResourceEvent.CONFIG_LOAD_ERROR = "configLoadError";
        /**
         * Delay load group resource loading progress event.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 延迟加载组资源加载进度事件。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        ResourceEvent.GROUP_PROGRESS = "groupProgress";
        /**
         * Delay load group resource to complete event. Note: if you have a resource item loading failure, the event will not be thrown, if you want to handle the group load failure, please listen to the GROUP_LOAD_ERROR event.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 延迟加载组资源加载完成事件。注意：若组内有资源项加载失败，将不会抛出此事件，若要处理组加载失败，请同时监听 GROUP_LOAD_ERROR 事件。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        ResourceEvent.GROUP_COMPLETE = "groupComplete";
        /**
         * Delayed load group resource failed event.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 延迟加载组资源加载失败事件。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        ResourceEvent.GROUP_LOAD_ERROR = "groupLoadError";
        return ResourceEvent;
    }(egret.Event));
    RES.ResourceEvent = ResourceEvent;
    __reflect(ResourceEvent.prototype, "RES.ResourceEvent");
})(RES || (RES = {}));
//# sourceMappingURL=ResourceEvent.js.map