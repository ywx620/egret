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
var egret;
(function (egret) {
    /**
     * @private
     * @version Egret 2.4
     * @platform Web,Native
     */
    var PromiseObject = (function () {
        /**
         * @version Egret 2.4
         * @platform Web,Native
         */
        function PromiseObject() {
            /**
             * @version Egret 2.4
             * @platform Web,Native
             */
            this.onSuccessFunc = null;
            /**
             * @version Egret 2.4
             * @platform Web,Native
             */
            this.onSuccessThisObject = null;
            /**
             * @version Egret 2.4
             * @platform Web,Native
             */
            this.onErrorFunc = null;
            /**
             * @version Egret 2.4
             * @platform Web,Native
             */
            this.onErrorThisObject = null;
            /**
             * @version Egret 2.4
             * @platform Web,Native
             */
            this.downloadingSizeFunc = null;
            /**
             * @version Egret 2.4
             * @platform Web,Native
             */
            this.downloadingSizeThisObject = null;
            /**
             * @version Egret 2.4
             * @platform Web,Native
             */
            this.onResponseHeaderFunc = null;
            /**
             * @version Egret 2.4
             * @platform Web,Native
             */
            this.onResponseHeaderThisObject = null;
        }
        /**
         *
         * @version Egret 2.4
         * @platform Web,Native
         */
        PromiseObject.create = function () {
            if (PromiseObject.promiseObjectList.length) {
                return PromiseObject.promiseObjectList.pop();
            }
            else {
                return new egret.PromiseObject();
            }
        };
        /**
         * @private
         *
         * @param args
         */
        PromiseObject.prototype.onSuccess = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (this.onSuccessFunc) {
                this.onSuccessFunc.apply(this.onSuccessThisObject, args);
            }
            this.destroy();
        };
        /**
         * @private
         *
         * @param args
         */
        PromiseObject.prototype.onError = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (this.onErrorFunc) {
                this.onErrorFunc.apply(this.onErrorThisObject, args);
            }
            this.destroy();
        };
        /**
         * @private
         *
         * @param args
         */
        PromiseObject.prototype.downloadingSize = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (this.downloadingSizeFunc) {
                this.downloadingSizeFunc.apply(this.downloadingSizeThisObject, args);
            }
        };
        /**
         * @private
         *
         * @param args
         */
        PromiseObject.prototype.onResponseHeader = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (this.onResponseHeaderFunc) {
                this.onResponseHeaderFunc.apply(this.onResponseHeaderThisObject, args);
            }
        };
        /**
         * @private
         *
         */
        PromiseObject.prototype.destroy = function () {
            this.onSuccessFunc = undefined;
            this.onSuccessThisObject = undefined;
            this.onErrorFunc = undefined;
            this.onErrorThisObject = undefined;
            this.downloadingSizeFunc = undefined;
            this.downloadingSizeThisObject = undefined;
            this.onResponseHeaderFunc = undefined;
            this.onResponseHeaderThisObject = undefined;
            PromiseObject.promiseObjectList.push(this);
        };
        /**
         * @private
         */
        PromiseObject.promiseObjectList = [];
        return PromiseObject;
    }());
    egret.PromiseObject = PromiseObject;
    __reflect(PromiseObject.prototype, "egret.PromiseObject");
})(egret || (egret = {}));
//# sourceMappingURL=PromiseObject.js.map