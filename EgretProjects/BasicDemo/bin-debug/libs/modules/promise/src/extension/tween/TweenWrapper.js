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
    var tween;
    (function (tween) {
        /**
         * Abstract class, Indicate the base action.
         * @version Egret 3.1.8
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 抽象类，表示一个基本动作
         * @version Egret 3.1.8
         * @platform Web,Native
         * @language zh_CN
         */
        var BasePath = (function (_super) {
            __extends(BasePath, _super);
            function BasePath() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**
                 * the name of this action.
                 * @version Egret 3.1.8
                 * @platform Web,Native
                 * @language en_US
                 */
                /**
                 * 动作的名称
                 * @version Egret 3.1.8
                 * @platform Web,Native
                 * @language zh_CN
                 */
                _this.name = "";
                return _this;
            }
            return BasePath;
        }(egret.EventDispatcher));
        tween.BasePath = BasePath;
        __reflect(BasePath.prototype, "egret.tween.BasePath");
        /**
         * Indicate the to action. See <code>Tween.to</code>
         * @version Egret 3.1.8
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 表示一个to动作，参见<code>Tween.to</code>
         * @version Egret 3.1.8
         * @platform Web,Native
         * @language zh_CN
         */
        var To = (function (_super) {
            __extends(To, _super);
            function To() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**
                 * Property set of an object
                 * @version Egret 3.1.8
                 * @platform Web,Native
                 * @language en_US
                 */
                /**
                 * 对象的属性集合
                 * @version Egret 3.1.8
                 * @platform Web,Native
                 * @language zh_CN
                 */
                _this.props = undefined;
                /**
                 * Duration
                 * @version Egret 3.1.8
                 * @platform Web,Native
                 * @language en_US
                 */
                /**
                 * 持续时间
                 * @version Egret 3.1.8
                 * @platform Web,Native
                 * @language zh_CN
                 */
                _this.duration = 500;
                /**
                 * Easing algorithm
                 * @version Egret 3.1.8
                 * @platform Web,Native
                 * @language en_US
                 */
                /**
                 * 缓动算法
                 * @version Egret 3.1.8
                 * @platform Web,Native
                 * @language zh_CN
                 */
                _this.ease = undefined;
                return _this;
            }
            return To;
        }(BasePath));
        tween.To = To;
        __reflect(To.prototype, "egret.tween.To");
        /**
         * Indicate the wait action. See <code>Tween.wait</code>
         * @version Egret 3.1.8
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 表示一个wait动作，参见<code>Tween.wait</code>
         * @version Egret 3.1.8
         * @platform Web,Native
         * @language zh_CN
         */
        var Wait = (function (_super) {
            __extends(Wait, _super);
            function Wait() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**
                 * Duration
                 * @version Egret 3.1.8
                 * @platform Web,Native
                 * @language en_US
                 */
                /**
                 * 持续时间
                 * @version Egret 3.1.8
                 * @platform Web,Native
                 * @language zh_CN
                 */
                _this.duration = 500;
                /**
                 * Whether properties are updated during the waiting time
                 * @version Egret 3.1.8
                 * @platform Web,Native
                 * @language en_US
                 */
                /**
                 * 等待期间属性是否会更新
                 * @version Egret 3.1.8
                 * @platform Web,Native
                 * @language zh_CN
                 */
                _this.passive = undefined;
                return _this;
            }
            return Wait;
        }(BasePath));
        tween.Wait = Wait;
        __reflect(Wait.prototype, "egret.tween.Wait");
        /**
         * Indicate the set action. See <code>Tween.set</code>
         * @version Egret 3.1.8
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 表示一个set动作，参见<code>Tween.set</code>
         * @version Egret 3.1.8
         * @platform Web,Native
         * @language zh_CN
         */
        var Set = (function (_super) {
            __extends(Set, _super);
            function Set() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**
                 * Property set of an object
                 * @version Egret 3.1.8
                 * @platform Web,Native
                 * @language en_US
                 */
                /**
                 * 对象的属性集合
                 * @version Egret 3.1.8
                 * @platform Web,Native
                 * @language zh_CN
                 */
                _this.props = undefined;
                return _this;
            }
            return Set;
        }(BasePath));
        tween.Set = Set;
        __reflect(Set.prototype, "egret.tween.Set");
        /**
         * Indicate the tick action. See <code>Tween.tick</code>
         * @version Egret 3.1.8
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 表示一个tick动作，参见<code>Tween.tick</code>
         * @version Egret 3.1.8
         * @platform Web,Native
         * @language zh_CN
         */
        var Tick = (function (_super) {
            __extends(Tick, _super);
            function Tick() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                /**
                 * Delta time
                 * @version Egret 3.1.8
                 * @platform Web,Native
                 * @language en_US
                 */
                /**
                 * 增加的时间
                 * @version Egret 3.1.8
                 * @platform Web,Native
                 * @language zh_CN
                 */
                _this.delta = 0;
                return _this;
            }
            return Tick;
        }(BasePath));
        tween.Tick = Tick;
        __reflect(Tick.prototype, "egret.tween.Tick");
        function convertEase(ease) {
            if (typeof ease === 'function') {
                return ease;
            }
            else {
                var func = egret.Ease[ease];
                if (typeof func === 'function') {
                    return func;
                }
            }
            return null;
        }
        /**
         * TweenItem is a wrapper for Tween, which can set the behavior of Tween by setting attributes and adding Path.
         *
         * @event pathComplete Dispatched when some Path has complete.
         * @event complete Dispatched when all Paths has complete.
         *
         * @defaultProperty props
         * @version Egret 3.1.8
         * @platform Web,Native
         * @language en_US
         */
        /**
         * TweenItem是对Tween的包装器，能通过设置属性和添加Path的方式设置Tween的行为。
         * 通常用于使用在EXML中定义组件的动画。
         *
         * @event pathComplete 当某个Path执行完毕时会派发此事件。
         * @event complete 当所有Path执行完毕时会派发此事件。
         *
         * @defaultProperty props
         * @version Egret 3.1.8
         * @platform Web,Native
         * @language zh_CN
         */
        /**
         * Use in exml:
         * ```
         * 	<tween:TweenItem target="{this.button}">
         * 		<tween:props>
         * 			<e:Object loop="{true}"/>
         * 		</tween:props>
         * 		<tween:paths>
         * 			<e:Array>
         * 				<tween:To duration="500">
         * 					<tween:props>
         * 						<e:Object x="{100}" y="{200}" />
         * 					</tween:props>
         * 				</tween:To>
         * 				<tween:Wait duration="1000" />
         * 				<tween:To duration="1000">
         * 					<tween:props>
         * 						<e:Object x="{200}" y="{100}" />
         * 					</tween:props>
         * 				</tween:To>
         * 			</e:Array>
         * 		</tween:paths>
         * 	</tween:TweenItem>
         * ```
         */
        var TweenItem = (function (_super) {
            __extends(TweenItem, _super);
            function TweenItem() {
                var _this = _super.call(this) || this;
                _this.isStop = false;
                return _this;
            }
            Object.defineProperty(TweenItem.prototype, "props", {
                /**
                 * The Tween's props.
                 * @version Egret 3.1.8
                 * @platform Web,Native
                 * @language en_US
                 */
                /**
                 * Tween的props参数。
                 * @version Egret 3.1.8
                 * @platform Web,Native
                 * @language zh_CN
                 */
                get: function () {
                    return this._props;
                },
                set: function (value) {
                    this._props = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TweenItem.prototype, "target", {
                /**
                 * The Tween's target.
                 * @version Egret 3.1.8
                 * @platform Web,Native
                 * @language en_US
                 */
                /**
                 * Tween的target参数。
                 * @version Egret 3.1.8
                 * @platform Web,Native
                 * @language zh_CN
                 */
                get: function () {
                    return this._target;
                },
                set: function (value) {
                    this._target = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TweenItem.prototype, "paths", {
                /**
                 * The Actions in Tween.
                 * @version Egret 3.1.8
                 * @platform Web,Native
                 * @language en_US
                 */
                /**
                 * TweenItem中添加的行为。
                 * @version Egret 3.1.8
                 * @platform Web,Native
                 * @language zh_CN
                 */
                get: function () {
                    return this._paths;
                },
                set: function (value) {
                    this._paths = value || [];
                },
                enumerable: true,
                configurable: true
            });
            /**
             * Play the Tween
             * @position The starting position, the default is from the last position to play
             * @version Egret 3.1.8
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 播放Tween
             * @position 播放的起始位置, 默认为从上次位置继续播放
             * @version Egret 3.1.8
             * @platform Web,Native
             * @language zh_CN
             */
            TweenItem.prototype.play = function (position) {
                if (!this.tween) {
                    this.createTween(position);
                }
                else {
                    this.tween.setPaused(false);
                    if (this.isStop && position == undefined) {
                        position = 0;
                        this.isStop = false;
                    }
                    if (position !== undefined && position !== null) {
                        this.tween.setPosition(position);
                    }
                }
            };
            /**
             * Pause the Tween
             * @version Egret 3.1.8
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 暂停Tween
             * @version Egret 3.1.8
             * @platform Web,Native
             * @language zh_CN
             */
            TweenItem.prototype.pause = function () {
                if (this.tween) {
                    this.tween.setPaused(true);
                }
            };
            /**
             * Stop the Tween
             * @version Egret 3.1.8
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 停止Tween
             * @version Egret 3.1.8
             * @platform Web,Native
             * @language zh_CN
             */
            TweenItem.prototype.stop = function () {
                this.pause();
                this.isStop = true;
            };
            TweenItem.prototype.createTween = function (position) {
                this.tween = egret.Tween.get(this._target, this._props);
                if (this._paths) {
                    this.applyPaths();
                }
                if (position !== undefined && position !== null) {
                    this.tween.setPosition(position);
                }
            };
            TweenItem.prototype.applyPaths = function () {
                for (var i = 0; i < this._paths.length; i++) {
                    var path_1 = this._paths[i];
                    this.applyPath(path_1);
                }
            };
            TweenItem.prototype.applyPath = function (path) {
                var _this = this;
                if (path instanceof To) {
                    this.tween.to(path.props, path.duration, convertEase(path.ease));
                }
                else if (path instanceof Wait) {
                    this.tween.wait(path.duration, path.passive);
                }
                else if (path instanceof Set) {
                    this.tween.set(path.props);
                }
                else if (path instanceof Tick) {
                    this.tween.$tick(path.delta);
                }
                this.tween.call(function () { return _this.pathComplete(path); });
            };
            TweenItem.prototype.pathComplete = function (path) {
                path.dispatchEventWith('complete');
                this.dispatchEventWith('pathComplete', false, path);
                var index = this._paths.indexOf(path);
                if (index >= 0 && index === this._paths.length - 1) {
                    this.dispatchEventWith('complete');
                }
            };
            return TweenItem;
        }(egret.EventDispatcher));
        tween.TweenItem = TweenItem;
        __reflect(TweenItem.prototype, "egret.tween.TweenItem");
        registerProperty(TweenItem, 'paths', 'Array', true);
        /**
         * TweenGroup is a collection of TweenItem that can be played in parallel with each Item
         *
         * @event itemComplete Dispatched when some TweenItem has complete.
         * @event complete Dispatched when all TweenItems has complete.
         *
         * @version Egret 3.1.8
         * @platform Web,Native
         * @includeExample extension/tween/TweenWrapper.ts
         * @language en_US
         */
        /**
         * TweenGroup是TweenItem的集合，可以并行播放每一个Item
         * @version Egret 3.1.8
         * @platform Web,Native
         * @includeExample extension/tween/TweenWrapper.ts
         * @language zh_CN
         */
        var TweenGroup = (function (_super) {
            __extends(TweenGroup, _super);
            function TweenGroup() {
                var _this = _super.call(this) || this;
                _this.completeCount = 0;
                return _this;
            }
            Object.defineProperty(TweenGroup.prototype, "items", {
                /**
                 * The Array that TweenItems in TweenGroup.
                 * @version Egret 3.1.8
                 * @platform Web,Native
                 * @language en_US
                 */
                /**
                 * TweenGroup要控制的TweenItem集合。
                 * @version Egret 3.1.8
                 * @platform Web,Native
                 * @language zh_CN
                 */
                get: function () {
                    return this._items;
                },
                set: function (value) {
                    this.completeCount = 0;
                    this.registerEvent(false);
                    this._items = value;
                    this.registerEvent(true);
                },
                enumerable: true,
                configurable: true
            });
            TweenGroup.prototype.registerEvent = function (add) {
                var _this = this;
                this._items && this._items.forEach(function (item) {
                    if (add) {
                        item.addEventListener('complete', _this.itemComplete, _this);
                    }
                    else {
                        item.removeEventListener('complete', _this.itemComplete, _this);
                    }
                });
            };
            /**
             * Play the all TweenItems
             * @time The starting position, the default is from the last position to play。If use 0, the group will play from the start position.
             * @version Egret 3.1.8
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 播放所有的TweenItem
             * @time 播放的起始位置, 默认为从上次位置继续播放。如果为0，则从起始位置开始播放。
             * @version Egret 3.1.8
             * @platform Web,Native
             * @language zh_CN
             */
            TweenGroup.prototype.play = function (time) {
                if (!this._items) {
                    return;
                }
                for (var i = 0; i < this._items.length; i++) {
                    var item = this._items[i];
                    item.play(time);
                }
            };
            /**
             * Pause the all TweenItems
             * @version Egret 3.1.8
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 暂停播放所有的TweenItem
             * @version Egret 3.1.8
             * @platform Web,Native
             * @language zh_CN
             */
            TweenGroup.prototype.pause = function () {
                if (!this._items) {
                    return;
                }
                for (var i = 0; i < this._items.length; i++) {
                    var item = this._items[i];
                    item.pause();
                }
            };
            /**
             * Stop the all TweenItems
             * @version Egret 3.1.8
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 停止所有的TweenItem
             * @version Egret 3.1.8
             * @platform Web,Native
             * @language zh_CN
             */
            TweenGroup.prototype.stop = function () {
                if (!this._items) {
                    return;
                }
                for (var i = 0; i < this._items.length; i++) {
                    var item = this._items[i];
                    item.stop();
                }
            };
            TweenGroup.prototype.itemComplete = function (e) {
                var item = e.currentTarget;
                this.completeCount++;
                this.dispatchEventWith('itemComplete', false, item);
                if (this.completeCount === this.items.length) {
                    this.dispatchEventWith('complete');
                    this.completeCount = 0;
                }
            };
            return TweenGroup;
        }(egret.EventDispatcher));
        tween.TweenGroup = TweenGroup;
        __reflect(TweenGroup.prototype, "egret.tween.TweenGroup");
        registerProperty(TweenGroup, 'items', 'Array', true);
        function registerProperty(classDefinition, property, type, asDefault) {
            var prototype = classDefinition.prototype;
            prototype.__meta__ = prototype.__meta__ || {};
            prototype.__meta__[property] = type;
            if (asDefault) {
                prototype.__defaultProperty__ = property;
            }
        }
    })(tween = egret.tween || (egret.tween = {}));
})(egret || (egret = {}));
//# sourceMappingURL=TweenWrapper.js.map