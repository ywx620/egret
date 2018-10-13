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
    var scrollerThrowEvent;
    /**
     * The Scroller component displays a single scrollable component,
     * called a viewport, and horizontal and vertical scroll bars.
     * The viewport must implement the IViewport interface.
     * <p>The Group components implement the IViewport interface
     * and can be used as the children of the Scroller control,
     * as the following example shows:</p>
     * <pre>
     *       <s:Scroller width="100" height="100">
     *           <s:Group>
     *               <s:Image width="300" height="400" source="assets/logo.jpg"/>
     *           </s:Group>
     *       </s:Scroller>
     * </pre>
     * <p>The size of the Image control is set larger than that of its parent Group container.
     * By default, the child extends past the boundaries of the parent container.
     * Rather than allow the child to extend past the boundaries of the parent container,
     * the Scroller specifies to clip the child to the boundaries and display scroll bars.</p>
     *
     * @event eui.UIEvent.CHANGE_START Dispatched when the scroll position is going to change
     * @event eui.UIEvent.CHANGE_END Dispatched when the scroll position changed complete
     * @event egret.Event.CHANGE Dispatched when the scroll position is changing
     * @event egret.TouchEvent.TOUCH_CANCEL canceled the touch
     *
     * @defaultProperty viewport
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/components/ScrollerExample.ts
     * @language en_US
     */
    /**
     * Scroller 组件显示一个称为视域的单个可滚动组件，以及水平滚动条和垂直滚动条。该视域必须实现 IViewport 接口。
     * <p>Group 组件实现 IViewport 接口，且可以用作 Scroller 控件的子代，如下例所示：</p>
     * <pre>
     *       <s:Scroller width="100" height="100">
     *           <s:Group>
     *               <s:Image width="300" height="400" source="assets/logo.jpg"/>
     *           </s:Group>
     *       </s:Scroller>
     * </pre>
     * Image 控件的大小比其父 Group 容器设置得大。默认情况下，子代超过父容器的边界。
     * Scroller 会指定将子代剪切到边界并显示滚动条，而不是让子代超过父容器的边界。
     *
     * @event eui.UIEvent.CHANGE_START 滚动位置改变开始
     * @event eui.UIEvent.CHANGE_END 滚动位置改变结束
     * @event egret.Event.CHANGE 滚动位置改变的时候
     * @event egret.TouchEvent.TOUCH_CANCEL 取消触摸事件
     *
     * @defaultProperty viewport
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/components/ScrollerExample.ts
     * @language zh_CN
     */
    var Scroller = (function (_super) {
        __extends(Scroller, _super);
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
        function Scroller() {
            var _this = _super.call(this) || this;
            _this.$bounces = true;
            /**
             * the horizontal scroll bar
             *
             * @skinPart
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 水平滚动条
             *
             * @skinPart
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            _this.horizontalScrollBar = null;
            /**
             * the vertical scroll bar
             *
             * @skinPart
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 垂直滚动条
             *
             * @skinPart
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            _this.verticalScrollBar = null;
            var touchScrollH = new eui.sys.TouchScroll(_this.horizontalUpdateHandler, _this.horizontalEndHandler, _this);
            var touchScrollV = new eui.sys.TouchScroll(_this.verticalUpdateHandler, _this.verticalEndHanlder, _this);
            _this.$Scroller = {
                0: "auto",
                1: "auto",
                2: null,
                3: 0,
                4: 0,
                5: false,
                6: false,
                7: false,
                8: touchScrollH,
                9: touchScrollV,
                10: null,
                11: false,
                12: false //touchCancle
            };
            return _this;
        }
        Object.defineProperty(Scroller.prototype, "bounces", {
            /**
             * Whether to enable rebound, rebound When enabled, ScrollView contents allowed to continue to drag the border after arriving at the end user drag operation, and then bounce back boundary position
             * @default true
             * @version Egret 2.5.6
             * @language en_US
             */
            /**
             * 是否启用回弹，当启用回弹后，ScrollView中内容在到达边界后允许继续拖动，在用户拖动操作结束后，再反弹回边界位置
             * @default true
             * @version Egret 2.5.6
             * @language zh_CN
             */
            get: function () {
                return this.$bounces;
            },
            set: function (value) {
                this.$bounces = !!value;
                var touchScrollH = this.$Scroller[8 /* touchScrollH */];
                if (touchScrollH) {
                    touchScrollH.$bounces = this.$bounces;
                }
                var touchScrollV = this.$Scroller[9 /* touchScrollV */];
                if (touchScrollV) {
                    touchScrollV.$bounces = this.$bounces;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Scroller.prototype, "throwSpeed", {
            get: function () {
                return this.$Scroller[8 /* touchScrollH */].$scrollFactor;
            },
            /**
             * Adjust the speed to get out of the slide end.When equal to 0,the scroll animation will not be play.
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 调节滑动结束时滚出的速度。等于0时，没有滚动动画
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            set: function (val) {
                val = +val;
                if (val < 0)
                    val = 0;
                this.$Scroller[8 /* touchScrollH */].$scrollFactor = val;
                this.$Scroller[9 /* touchScrollV */].$scrollFactor = val;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         */
        Scroller.prototype.$getThrowInfo = function (currentPos, toPos) {
            if (!scrollerThrowEvent) {
                scrollerThrowEvent = new eui.ScrollerThrowEvent(eui.ScrollerThrowEvent.THROW, false, false, currentPos, toPos);
            }
            else {
                scrollerThrowEvent.currentPos = currentPos;
                scrollerThrowEvent.toPos = toPos;
            }
            return scrollerThrowEvent;
        };
        Object.defineProperty(Scroller.prototype, "scrollPolicyV", {
            /**
             * Indicates under what conditions the scroller can be moved and the vertical scroll bar is displayed.
             * <p><code>ScrollPolicy.ON</code> - the scroller can be moved, and the scroll bar is displayed when it's move.</p>
             * <p><code>ScrollPolicy.OFF</code> - the scroller can not be moved, the scroll bar is never displayed.</p>
             * <p><code>ScrollPolicy.AUTO</code> - the scroller can not be moved when
             *  the viewport's contentHeight is larger than its height. the scroll bar is displayed when it's move.
             *
             * @default ScrollPolicy.AUTO
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 指示在哪些条件可以滚动并且显示垂直滑动条。
             * <p><code>ScrollPolicy.ON</code> - 可以滚动，滚动时显示滚动条。</p>
             * <p><code>ScrollPolicy.OFF</code> - 不可以滚动并且不显示滚动条。</p>
             * <p><code>ScrollPolicy.AUTO</code> - 当视域的 contentHeight 大于其自身的高度时可以滚动，滚动时显示滚动条。</p>
             *
             * @default ScrollPolicy.AUTO
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this.$Scroller[0 /* scrollPolicyV */];
            },
            set: function (value) {
                var values = this.$Scroller;
                if (values[0 /* scrollPolicyV */] == value) {
                    return;
                }
                values[0 /* scrollPolicyV */] = value;
                this.checkScrollPolicy();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Scroller.prototype, "scrollPolicyH", {
            /**
             * Indicates under what conditions the scroller can be moved and the horizontal scroll bar is displayed.
             * <p><code>ScrollPolicy.ON</code> - the scroller can be moved, and the scroll bar is displayed when it's move.</p>
             * <p><code>ScrollPolicy.OFF</code> - the scroller can not be moved, the scroll bar is never displayed.</p>
             * <p><code>ScrollPolicy.AUTO</code> - the can not be moved  when
             *  the viewport's contentWidth is larger than its width. the scroll bar is displayed when it's move.
             *
             * @default ScrollPolicy.AUTO
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 指示在哪些条件下可以滚动并且显示水平滑动条。
             * <p><code>ScrollPolicy.ON</code> - 可以滚动，滚动时显示滚动条。</p>
             * <p><code>ScrollPolicy.OFF</code> - 不可以滚动并且不显示滚动条。</p>
             * <p><code>ScrollPolicy.AUTO</code> - 当视域的 contentWidth 大于其自身的宽度时可以滚动，滚动时显示滚动条。</p>
             *
             * @default ScrollPolicy.AUTO
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this.$Scroller[1 /* scrollPolicyH */];
            },
            set: function (value) {
                var values = this.$Scroller;
                if (values[1 /* scrollPolicyH */] == value) {
                    return;
                }
                values[1 /* scrollPolicyH */] = value;
                this.checkScrollPolicy();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Stop the scroller animation
         * @version Egret 3.0.2
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 停止滚动的动画
         *
         * @version Egret 3.0.2
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        Scroller.prototype.stopAnimation = function () {
            var values = this.$Scroller;
            var scrollV = values[9 /* touchScrollV */];
            var scrollH = values[8 /* touchScrollH */];
            if (scrollV.animation.isPlaying) {
                eui.UIEvent.dispatchUIEvent(this, eui.UIEvent.CHANGE_END);
            }
            else if (scrollH.animation.isPlaying) {
                eui.UIEvent.dispatchUIEvent(this, eui.UIEvent.CHANGE_END);
            }
            scrollV.stop();
            scrollH.stop();
            var verticalBar = this.verticalScrollBar;
            var horizontalBar = this.horizontalScrollBar;
            if (verticalBar && verticalBar.autoVisibility) {
                verticalBar.visible = false;
            }
            if (horizontalBar && horizontalBar.autoVisibility) {
                horizontalBar.visible = false;
            }
        };
        Object.defineProperty(Scroller.prototype, "viewport", {
            /**
             * The viewport component to be scrolled.
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 要滚动的视域组件。
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this.$Scroller[10 /* viewport */];
            },
            set: function (value) {
                var values = this.$Scroller;
                if (value == values[10 /* viewport */])
                    return;
                this.uninstallViewport();
                values[10 /* viewport */] = value;
                values[11 /* viewprotRemovedEvent */] = false;
                this.installViewport();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         * 安装并初始化视域组件
         */
        Scroller.prototype.installViewport = function () {
            var viewport = this.viewport;
            if (viewport) {
                this.addChildAt(viewport, 0);
                viewport.scrollEnabled = true;
                viewport.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBeginCapture, this, true);
                viewport.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEndCapture, this, true);
                viewport.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapCapture, this, true);
                viewport.addEventListener(egret.Event.REMOVED, this.onViewPortRemove, this);
            }
            if (this.horizontalScrollBar) {
                this.horizontalScrollBar.viewport = viewport;
            }
            if (this.verticalScrollBar) {
                this.verticalScrollBar.viewport = viewport;
            }
        };
        /**
         * @private
         * 卸载视域组件
         */
        Scroller.prototype.uninstallViewport = function () {
            if (this.horizontalScrollBar) {
                this.horizontalScrollBar.viewport = null;
            }
            if (this.verticalScrollBar) {
                this.verticalScrollBar.viewport = null;
            }
            var viewport = this.viewport;
            if (viewport) {
                viewport.scrollEnabled = false;
                viewport.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBeginCapture, this, true);
                viewport.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEndCapture, this, true);
                viewport.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapCapture, this, true);
                viewport.removeEventListener(egret.Event.REMOVED, this.onViewPortRemove, this);
                if (this.$Scroller[11 /* viewprotRemovedEvent */] == false) {
                    this.removeChild(viewport);
                }
            }
        };
        Scroller.prototype.onViewPortRemove = function (event) {
            if (event.target == this.viewport) {
                this.$Scroller[11 /* viewprotRemovedEvent */] = true;
                this.viewport = null;
            }
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        Scroller.prototype.setSkin = function (skin) {
            _super.prototype.setSkin.call(this, skin);
            var viewport = this.viewport;
            if (viewport) {
                this.addChildAt(viewport, 0);
            }
        };
        /**
         * @private
         * @param event
         */
        Scroller.prototype.onTouchBeginCapture = function (event) {
            this.$Scroller[12 /* touchCancle */] = false;
            var canScroll = this.checkScrollPolicy();
            if (!canScroll) {
                return;
            }
            this.onTouchBegin(event);
        };
        /**
         * @private
         * @param event
         */
        Scroller.prototype.onTouchEndCapture = function (event) {
            if (this.$Scroller[12 /* touchCancle */]) {
                event.$bubbles = false;
                this.dispatchBubbleEvent(event);
                event.$bubbles = true;
                event.stopPropagation();
                this.onTouchEnd(event);
            }
        };
        /**
         * @private
         * @param event
         */
        Scroller.prototype.onTouchTapCapture = function (event) {
            if (this.$Scroller[12 /* touchCancle */]) {
                event.$bubbles = false;
                this.dispatchBubbleEvent(event);
                event.$bubbles = true;
                event.stopPropagation();
            }
        };
        /**
         * @private
         * 检查当前滚动策略，若有一个方向可以滚动，返回true。
         */
        Scroller.prototype.checkScrollPolicy = function () {
            var values = this.$Scroller;
            var viewport = values[10 /* viewport */];
            if (!viewport) {
                return false;
            }
            var hCanScroll;
            var uiValues = viewport.$UIComponent;
            switch (values[1 /* scrollPolicyH */]) {
                case "auto":
                    if (viewport.contentWidth > uiValues[10 /* width */] || viewport.scrollH !== 0) {
                        hCanScroll = true;
                    }
                    else {
                        hCanScroll = false;
                    }
                    break;
                case "on":
                    hCanScroll = true;
                    break;
                case "off":
                    hCanScroll = false;
                    break;
            }
            values[6 /* horizontalCanScroll */] = hCanScroll;
            var vCanScroll;
            switch (values[0 /* scrollPolicyV */]) {
                case "auto":
                    if (viewport.contentHeight > uiValues[11 /* height */] || viewport.scrollV !== 0) {
                        vCanScroll = true;
                    }
                    else {
                        vCanScroll = false;
                    }
                    break;
                case "on":
                    vCanScroll = true;
                    break;
                case "off":
                    vCanScroll = false;
                    break;
            }
            values[7 /* verticalCanScroll */] = vCanScroll;
            return hCanScroll || vCanScroll;
        };
        /**
         * @private
         *
         * @param event
         */
        Scroller.prototype.onTouchBegin = function (event) {
            if (event.isDefaultPrevented()) {
                return;
            }
            if (!this.checkScrollPolicy()) {
                return;
            }
            this.downTarget = event.target;
            var values = this.$Scroller;
            this.stopAnimation();
            values[3 /* touchStartX */] = event.$stageX;
            values[4 /* touchStartY */] = event.$stageY;
            if (values[6 /* horizontalCanScroll */]) {
                values[8 /* touchScrollH */].start(event.$stageX);
            }
            if (values[7 /* verticalCanScroll */]) {
                values[9 /* touchScrollV */].start(event.$stageY);
            }
            var stage = this.$stage;
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this, true);
            this.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancel, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveListeners, this);
            this.tempStage = stage;
        };
        /**
         * @private
         *
         * @param event
         */
        Scroller.prototype.onTouchMove = function (event) {
            if (event.isDefaultPrevented()) {
                return;
            }
            var values = this.$Scroller;
            if (!values[5 /* touchMoved */]) {
                var outX = void 0;
                if (Math.abs(values[3 /* touchStartX */] - event.$stageX) < Scroller.scrollThreshold) {
                    outX = false;
                }
                else {
                    outX = true;
                }
                var outY = void 0;
                if (Math.abs(values[4 /* touchStartY */] - event.$stageY) < Scroller.scrollThreshold) {
                    outY = false;
                }
                else {
                    outY = true;
                }
                if (!outX && !outY) {
                    return;
                }
                if (!outY && outX && values[1 /* scrollPolicyH */] == 'off') {
                    return;
                }
                if (!outX && outY && values[0 /* scrollPolicyV */] == 'off') {
                    return;
                }
                values[12 /* touchCancle */] = true;
                values[5 /* touchMoved */] = true;
                this.dispatchCancelEvent(event);
                var horizontalBar = this.horizontalScrollBar;
                var verticalBar = this.verticalScrollBar;
                if (horizontalBar && horizontalBar.autoVisibility && values[6 /* horizontalCanScroll */]) {
                    horizontalBar.visible = true;
                }
                if (verticalBar && verticalBar.autoVisibility && values[7 /* verticalCanScroll */]) {
                    verticalBar.visible = true;
                }
                if (values[2 /* autoHideTimer */]) {
                    values[2 /* autoHideTimer */].reset();
                }
                eui.UIEvent.dispatchUIEvent(this, eui.UIEvent.CHANGE_START);
                this.$stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            }
            event.preventDefault();
            var viewport = values[10 /* viewport */];
            var uiValues = viewport.$UIComponent;
            if (values[6 /* horizontalCanScroll */]) {
                values[8 /* touchScrollH */].update(event.$stageX, viewport.contentWidth - uiValues[10 /* width */], viewport.scrollH);
            }
            if (values[7 /* verticalCanScroll */]) {
                values[9 /* touchScrollV */].update(event.$stageY, viewport.contentHeight - uiValues[11 /* height */], viewport.scrollV);
            }
        };
        /**
         * @private
         * @param event
         */
        Scroller.prototype.onTouchCancel = function (event) {
            if (!this.$Scroller[5 /* touchMoved */]) {
                this.onRemoveListeners();
            }
        };
        /**
         * @private
         * @param event
         */
        Scroller.prototype.dispatchBubbleEvent = function (event) {
            var viewport = this.$Scroller[10 /* viewport */];
            if (!viewport) {
                return;
            }
            var cancelEvent = egret.Event.create(egret.TouchEvent, event.type, event.bubbles, event.cancelable);
            cancelEvent.$initTo(event.$stageX, event.$stageY, event.touchPointID);
            var target = this.downTarget;
            cancelEvent.$setTarget(target);
            var list = this.$getPropagationList(target);
            var length = list.length;
            var targetIndex = list.length * 0.5;
            var startIndex = -1;
            for (var i = 0; i < length; i++) {
                if (list[i] === viewport) {
                    startIndex = i;
                    break;
                }
            }
            list.splice(0, list.length - startIndex + 1);
            targetIndex = 0;
            this.$dispatchPropagationEvent(cancelEvent, list, targetIndex);
            egret.Event.release(cancelEvent);
        };
        /**
         * @private
         * @param event
         */
        Scroller.prototype.dispatchCancelEvent = function (event) {
            var viewport = this.$Scroller[10 /* viewport */];
            if (!viewport) {
                return;
            }
            var cancelEvent = egret.Event.create(egret.TouchEvent, egret.TouchEvent.TOUCH_CANCEL, event.bubbles, event.cancelable);
            cancelEvent.$initTo(event.$stageX, event.$stageY, event.touchPointID);
            var target = this.downTarget;
            cancelEvent.$setTarget(target);
            var list = this.$getPropagationList(target);
            var length = list.length;
            var targetIndex = list.length * 0.5;
            var startIndex = -1;
            for (var i = 0; i < length; i++) {
                if (list[i] === viewport) {
                    startIndex = i;
                    break;
                }
            }
            list.splice(0, startIndex + 1 - 2);
            list.splice(list.length - 1 - startIndex + 2, startIndex + 1 - 2);
            targetIndex -= startIndex + 1;
            this.$dispatchPropagationEvent(cancelEvent, list, targetIndex);
            egret.Event.release(cancelEvent);
        };
        /**
         * @private
         * @param event
         */
        Scroller.prototype.onTouchEnd = function (event) {
            var values = this.$Scroller;
            values[5 /* touchMoved */] = false;
            this.onRemoveListeners();
            var viewport = values[10 /* viewport */];
            var uiValues = viewport.$UIComponent;
            if (values[8 /* touchScrollH */].isStarted()) {
                values[8 /* touchScrollH */].finish(viewport.scrollH, viewport.contentWidth - uiValues[10 /* width */]);
            }
            if (values[9 /* touchScrollV */].isStarted()) {
                values[9 /* touchScrollV */].finish(viewport.scrollV, viewport.contentHeight - uiValues[11 /* height */]);
            }
        };
        /**
         * @private
         */
        Scroller.prototype.onRemoveListeners = function () {
            var stage = this.tempStage || this.$stage;
            this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this, true);
            stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancel, this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveListeners, this);
        };
        /**
         * @private
         *
         * @param scrollPos
         */
        Scroller.prototype.horizontalUpdateHandler = function (scrollPos) {
            this.$Scroller[10 /* viewport */].scrollH = scrollPos;
            this.dispatchEventWith(egret.Event.CHANGE);
        };
        /**
         * @private
         *
         * @param scrollPos
         */
        Scroller.prototype.verticalUpdateHandler = function (scrollPos) {
            this.$Scroller[10 /* viewport */].scrollV = scrollPos;
            this.dispatchEventWith(egret.Event.CHANGE);
        };
        /**
         * @private
         *
         */
        Scroller.prototype.horizontalEndHandler = function () {
            if (!this.$Scroller[9 /* touchScrollV */].isPlaying()) {
                this.onChangeEnd();
            }
        };
        /**
         * @private
         *
         */
        Scroller.prototype.verticalEndHanlder = function () {
            if (!this.$Scroller[8 /* touchScrollH */].isPlaying()) {
                this.onChangeEnd();
            }
        };
        /**
         * @private
         *
         */
        Scroller.prototype.onChangeEnd = function () {
            var values = this.$Scroller;
            var horizontalBar = this.horizontalScrollBar;
            var verticalBar = this.verticalScrollBar;
            if (horizontalBar && horizontalBar.visible || verticalBar && verticalBar.visible) {
                if (!values[2 /* autoHideTimer */]) {
                    values[2 /* autoHideTimer */] = new egret.Timer(200, 1);
                    values[2 /* autoHideTimer */].addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onAutoHideTimer, this);
                }
                values[2 /* autoHideTimer */].reset();
                values[2 /* autoHideTimer */].start();
            }
            eui.UIEvent.dispatchUIEvent(this, eui.UIEvent.CHANGE_END);
        };
        /**
         * @private
         *
         * @param event
         */
        Scroller.prototype.onAutoHideTimer = function (event) {
            var horizontalBar = this.horizontalScrollBar;
            var verticalBar = this.verticalScrollBar;
            if (horizontalBar && horizontalBar.autoVisibility) {
                horizontalBar.visible = false;
            }
            if (verticalBar && verticalBar.autoVisibility) {
                verticalBar.visible = false;
            }
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        Scroller.prototype.updateDisplayList = function (unscaledWidth, unscaledHeight) {
            _super.prototype.updateDisplayList.call(this, unscaledWidth, unscaledHeight);
            var viewport = this.viewport;
            if (viewport) {
                //必须先调用setLayoutBoundsSize()，因为尺寸改变会影响布局位置。
                viewport.setLayoutBoundsSize(unscaledWidth, unscaledHeight);
                viewport.setLayoutBoundsPosition(0, 0);
            }
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        Scroller.prototype.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
            if (instance == this.horizontalScrollBar) {
                this.horizontalScrollBar.touchChildren = false;
                this.horizontalScrollBar.touchEnabled = false;
                this.horizontalScrollBar.viewport = this.viewport;
                if (this.horizontalScrollBar.autoVisibility) {
                    this.horizontalScrollBar.visible = false;
                }
            }
            else if (instance == this.verticalScrollBar) {
                this.verticalScrollBar.touchChildren = false;
                this.verticalScrollBar.touchEnabled = false;
                this.verticalScrollBar.viewport = this.viewport;
                if (this.verticalScrollBar.autoVisibility) {
                    this.verticalScrollBar.visible = false;
                }
            }
        };
        /**
         * The threshold value(in pixels) trigger the rolling.
         * when the touch points deviate from the initial touch point than this value will trigger the rolling.
         *
         * @default 5
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 开始触发滚动的阈值（以像素为单位），当触摸点偏离初始触摸点的距离超过这个值时才会触发滚动。
         *
         * @default 5
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        Scroller.scrollThreshold = 5;
        return Scroller;
    }(eui.Component));
    eui.Scroller = Scroller;
    __reflect(Scroller.prototype, "eui.Scroller");
    eui.registerProperty(Scroller, "viewport", "eui.IViewport", true);
})(eui || (eui = {}));
//# sourceMappingURL=Scroller.js.map