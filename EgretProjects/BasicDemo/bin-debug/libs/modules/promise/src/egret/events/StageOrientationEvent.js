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
var egret;
(function (egret) {
    /**
     * When the direction of the stage of change, Stage object dispatches StageOrientationEvent object.
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/events/StageOrientationEvent.ts
     * @language en_US
     */
    /**
     * 当舞台的方向更改时，Stage 对象将调度 StageOrientationEvent 对象。
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/events/StageOrientationEvent.ts
     * @language zh_CN
     */
    var StageOrientationEvent = (function (_super) {
        __extends(StageOrientationEvent, _super);
        /**
         * Creating contains specific information related to the event and the stage direction of StageOrientationEvent object.
         * @param type Event types:StageOrientationEvent.ORIENTATION_CHANGE
         * @param bubbles It indicates whether the Event object participates in the bubbling stage of the event flow.
         * @param cancelable It indicates whether the Event object can be canceled.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 创建包含与舞台方向事件相关的特定信息的 StageOrientationEvent 对象。
         * @param type 事件的类型：StageOrientationEvent.ORIENTATION_CHANGE
         * @param bubbles 表示 Event 对象是否参与事件流的冒泡阶段。
         * @param cancelable 表示是否可以取消 Event 对象。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        function StageOrientationEvent(type, bubbles, cancelable) {
            if (bubbles === void 0) { bubbles = false; }
            if (cancelable === void 0) { cancelable = false; }
            return _super.call(this, type, bubbles, cancelable) || this;
        }
        /**
         * 派发一个屏幕旋转的事件。
         * @param target {egret.IEventDispatcher} 派发事件目标
         * @param type {egret.IEventDispatcher} 派发事件类型
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 派发一个屏幕旋转的事件。
         * @param target {egret.IEventDispatcher} Distribute event target
         * @param type {egret.IEventDispatcher} Distribute event type
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        StageOrientationEvent.dispatchStageOrientationEvent = function (target, type) {
            var event = egret.Event.create(StageOrientationEvent, type);
            var result = target.dispatchEvent(event);
            egret.Event.release(event);
            return result;
        };
        /**
         * After screen rotation distribute events.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 屏幕旋转后派发的事件。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        StageOrientationEvent.ORIENTATION_CHANGE = "orientationChange";
        return StageOrientationEvent;
    }(egret.Event));
    egret.StageOrientationEvent = StageOrientationEvent;
    __reflect(StageOrientationEvent.prototype, "egret.StageOrientationEvent");
})(egret || (egret = {}));
//# sourceMappingURL=StageOrientationEvent.js.map