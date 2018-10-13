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
var egret;
(function (egret) {
    /**
     * When a load operation has begun or a socket has received data, ProgressEvent object is dispatched.
     * There are two types of progress events: ProgressEvent.PROGRESS and ProgressEvent.SOCKET_DATA.
     * @version Egret 2.4
     * @platform Web,Native
     * @language en_US
     */
    /**
     * 当加载操作已开始或套接字已接收到数据时，将调度 ProgressEvent 对象。
     * 有两种类型的进程事件：ProgressEvent.PROGRESS 和 ProgressEvent.SOCKET_DATA。
     * @version Egret 2.4
     * @platform Web,Native
     * @language zh_CN
     */
    var ProgressEvent = (function (_super) {
        __extends(ProgressEvent, _super);
        /**
         * 创建一个 egret.ProgressEvent 对象
         * @param type  The type of the event, accessible as Event.type.
         * @param bubbles  Determines whether the Event object participates in the bubbling stage of the event flow. The default value is false.
         * @param cancelable Determines whether the Event object can be canceled. The default values is false.
         * @param bytesLoaded {number} Number of items or bytes loaded
         * @param bytesTotal {number} The total number of items or bytes loaded
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 创建一个 egret.ProgressEvent 对象
         * @param type  事件的类型，可以作为 Event.type 访问。
         * @param bubbles  确定 Event 对象是否参与事件流的冒泡阶段。默认值为 false。
         * @param cancelable 确定是否可以取消 Event 对象。默认值为 false。
         * @param bytesLoaded {number} 加载的项数或字节数
         * @param bytesTotal {number} 加载的总项数或总字节数
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        function ProgressEvent(type, bubbles, cancelable, bytesLoaded, bytesTotal) {
            if (bubbles === void 0) { bubbles = false; }
            if (cancelable === void 0) { cancelable = false; }
            if (bytesLoaded === void 0) { bytesLoaded = 0; }
            if (bytesTotal === void 0) { bytesTotal = 0; }
            var _this = _super.call(this, type, bubbles, cancelable) || this;
            /**
             * Number of items or bytes when the listener processes the event。
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 在侦听器处理事件时加载的项数或字节数。
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            _this.bytesLoaded = 0;
            /**
             * If the loading process succeeds, the total number or the total number of bytes that will be loaded term.
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 如果加载过程成功，将加载的总项数或总字节数。
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            _this.bytesTotal = 0;
            _this.bytesLoaded = bytesLoaded;
            _this.bytesTotal = bytesTotal;
            return _this;
        }
        /**
         * EventDispatcher object using the specified event object thrown Event. The objects will be thrown in the object cache pool for the next round robin.
         * @param target {egret.IEventDispatcher} Distribute event target
         * @param type  The type of the event, accessible as Event.type.
         * @param bytesLoaded {number} Number of items or bytes loaded
         * @param bytesTotal {number} The total number of items or bytes loaded
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 使用指定的EventDispatcher对象来抛出Event事件对象。抛出的对象将会缓存在对象池上，供下次循环复用。
         * @param target {egret.IEventDispatcher} 派发事件目标
         * @param type {string} 事件类型
         * @param bytesLoaded {number} 加载的项数或字节数
         * @param bytesTotal {number} 加载的总项数或总字节数
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        ProgressEvent.dispatchProgressEvent = function (target, type, bytesLoaded, bytesTotal) {
            if (bytesLoaded === void 0) { bytesLoaded = 0; }
            if (bytesTotal === void 0) { bytesTotal = 0; }
            var event = egret.Event.create(ProgressEvent, type);
            event.bytesLoaded = bytesLoaded;
            event.bytesTotal = bytesTotal;
            var result = target.dispatchEvent(event);
            egret.Event.release(event);
            return result;
        };
        /**
         * Changes in the loading progress
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 加载进度发生变化
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        ProgressEvent.PROGRESS = "progress";
        /**
         * Get the data
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 获取到数据
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        ProgressEvent.SOCKET_DATA = "socketData";
        return ProgressEvent;
    }(egret.Event));
    egret.ProgressEvent = ProgressEvent;
    __reflect(ProgressEvent.prototype, "egret.ProgressEvent");
})(egret || (egret = {}));
//# sourceMappingURL=ProgressEvent.js.map