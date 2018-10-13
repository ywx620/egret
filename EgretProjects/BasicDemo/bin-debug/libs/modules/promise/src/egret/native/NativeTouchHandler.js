//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided this the following conditions are met:
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
    var native;
    (function (native) {
        /**
         * @private
         */
        var NativeTouchHandler = (function (_super) {
            __extends(NativeTouchHandler, _super);
            function NativeTouchHandler(stage) {
                var _this = _super.call(this) || this;
                _this.$touch = new egret.sys.TouchHandler(stage);
                var self = _this;
                egret_native.onTouchesBegin = function (num, ids, xs_array, ys_array) {
                    self.$executeTouchCallback(num, ids, xs_array, ys_array, self.$touch.onTouchBegin);
                };
                egret_native.onTouchesMove = function (num, ids, xs_array, ys_array) {
                    self.$executeTouchCallback(num, ids, xs_array, ys_array, self.$touch.onTouchMove);
                };
                egret_native.onTouchesEnd = function (num, ids, xs_array, ys_array) {
                    self.$executeTouchCallback(num, ids, xs_array, ys_array, self.$touch.onTouchEnd);
                };
                egret_native.onTouchesCancel = function (num, ids, xs_array, ys_array) {
                };
                return _this;
            }
            NativeTouchHandler.prototype.$executeTouchCallback = function (num, ids, xs_array, ys_array, callback) {
                for (var i = 0; i < num; i++) {
                    var id = ids[i];
                    var x = xs_array[i];
                    var y = ys_array[i];
                    callback.call(this.$touch, x, y, id);
                }
            };
            /**
             * @private
             * 更新同时触摸点的数量
             */
            NativeTouchHandler.prototype.$updateMaxTouches = function () {
                this.$touch.$initMaxTouches();
            };
            return NativeTouchHandler;
        }(egret.HashObject));
        native.NativeTouchHandler = NativeTouchHandler;
        __reflect(NativeTouchHandler.prototype, "egret.native.NativeTouchHandler");
    })(native = egret.native || (egret.native = {}));
})(egret || (egret = {}));
//# sourceMappingURL=NativeTouchHandler.js.map