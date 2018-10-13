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
     * Tool class for object cache repeat use, which can be used to construct an object pool. Objects are automatically recycled after a certain duration.
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample extension/game/utils/Recycler.ts
     * @private
     * @language en_US
     */
    /**
     * 对象缓存复用工具类，可用于构建对象池，一段时间后会自动回收对象。
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample extension/game/utils/Recycler.ts
     * @private
     * @language zh_CN
     */
    var Recycler = (function (_super) {
        __extends(Recycler, _super);
        /**
         * Create an egret.Recycler object
         * @param autoDisposeTime {number} Number of frames when objects are destroyed automatically. Default value: 300
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 创建一个 egret.Recycler 对象
         * @param autoDisposeTime {number} 多少帧后自动销毁对象，默认值300
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        function Recycler(autoDisposeTime) {
            if (autoDisposeTime === void 0) { autoDisposeTime = 300; }
            var _this = _super.call(this) || this;
            /**
             * @private
             */
            _this.objectPool = [];
            /**
             * @private
             */
            _this._length = 0;
            if (autoDisposeTime < 1)
                autoDisposeTime = 1;
            _this.autoDisposeTime = autoDisposeTime;
            _this.frameCount = 0;
            return _this;
        }
        Recycler.$init = function () {
            egret.ticker.$startTick(Recycler.onUpdate, Recycler);
        };
        Recycler.onUpdate = function (timeStamp) {
            var list = Recycler._callBackList;
            for (var i = list.length - 1; i >= 0; i--) {
                list[i].$checkFrame();
            }
            return false;
        };
        /**
         * @private
         *
         */
        Recycler.prototype.$checkFrame = function () {
            this.frameCount--;
            if (this.frameCount <= 0) {
                this.dispose();
            }
        };
        Object.defineProperty(Recycler.prototype, "length", {
            /**
             * Number of cached objects"
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 缓存的对象数量
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this._length;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Cache an object for repeat use
         * @param object {any} The object to be cached
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 缓存一个对象以复用
         * @param object {any} 需要缓存的对象
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        Recycler.prototype.push = function (object) {
            var pool = this.objectPool;
            if (pool.indexOf(object) == -1) {
                pool.push(object);
                if (object.__recycle) {
                    object.__recycle();
                }
                this._length++;
                if (this.frameCount == 0) {
                    this.frameCount = this.autoDisposeTime;
                    Recycler._callBackList.push(this);
                }
            }
        };
        /**
         * Obtain a cached object
         * @returns {any} The obtained cached object
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 获取一个缓存的对象
         * @returns {any} 获得的缓存对象
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        Recycler.prototype.pop = function () {
            if (this._length == 0)
                return null;
            this._length--;
            return this.objectPool.pop();
        };
        /**
         * Immediately clear all cached objects.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 立即清空所有缓存的对象。
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        Recycler.prototype.dispose = function () {
            if (this._length > 0) {
                this.objectPool = [];
                this._length = 0;
            }
            this.frameCount = 0;
            var list = Recycler._callBackList;
            var index = list.indexOf(this);
            if (index != -1) {
                list.splice(index, 1);
            }
        };
        /**
         * @private
         */
        Recycler._callBackList = [];
        return Recycler;
    }(egret.HashObject));
    egret.Recycler = Recycler;
    __reflect(Recycler.prototype, "egret.Recycler");
    Recycler.$init();
})(egret || (egret = {}));
//# sourceMappingURL=Recycler.js.map