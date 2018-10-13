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
     * @private
     * @version Egret 2.4
     * @platform Web,Native
     */
    var Filter = (function (_super) {
        __extends(Filter, _super);
        function Filter() {
            var _this = _super.call(this) || this;
            /**
             * @version Egret 2.4
             * @platform Web,Native
             */
            _this.type = null;
            _this.$targets = [];
            _this.$uniforms = {};
            return _this;
        }
        Filter.prototype.$addTarget = function (target) {
            var length = this.$targets.length;
            for (var i = 0; i < length; i++) {
                if (this.$targets[i].$hashCode == target.$hashCode) {
                    return;
                }
            }
            this.$targets.push(target);
        };
        Filter.prototype.$removeTarget = function (target) {
            var length = this.$targets.length;
            for (var i = 0; i < length; i++) {
                if (this.$targets[i].$hashCode == target.$hashCode) {
                    this.$targets.splice(i, 1);
                    return;
                }
            }
        };
        Filter.prototype.invalidate = function () {
            var length = this.$targets.length;
            for (var i = 0; i < length; i++) {
                this.$targets[i].$invalidateContentBounds();
            }
        };
        /**
         * @private
         */
        Filter.prototype.$toJson = function () {
            return '';
        };
        return Filter;
    }(egret.HashObject));
    egret.Filter = Filter;
    __reflect(Filter.prototype, "egret.Filter");
})(egret || (egret = {}));
//# sourceMappingURL=Filter.js.map