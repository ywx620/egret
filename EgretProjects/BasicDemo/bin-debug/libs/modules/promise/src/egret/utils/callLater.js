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
     * @private
     */
    egret.$callLaterFunctionList = [];
    /**
     * @private
     */
    egret.$callLaterThisList = [];
    /**
     * @private
     */
    egret.$callLaterArgsList = [];
    /**
     * Delay the function to run unless screen is redrawn.
     * @param method {Function} The function to be delayed to run
     * @param thisObject {any} this reference of callback function
     * @param ...args {any} Function parameter list
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/utils/callLater.ts
     * @language en_US
     */
    /**
     * 延迟函数到屏幕重绘前执行。
     * @param method {Function} 要延迟执行的函数
     * @param thisObject {any} 回调函数的this引用
     * @param ...args {any} 函数参数列表
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/utils/callLater.ts
     * @language zh_CN
     */
    function callLater(method, thisObject) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        egret.$callLaterFunctionList.push(method);
        egret.$callLaterThisList.push(thisObject);
        egret.$callLaterArgsList.push(args);
    }
    egret.callLater = callLater;
    /**
     * @private
     */
    egret.$callAsyncFunctionList = [];
    /**
     * @private
     */
    egret.$callAsyncThisList = [];
    /**
     * @private
     */
    egret.$callAsyncArgsList = [];
    /**
     * 异步调用函数
     * @param method {Function} 要异步调用的函数
     * @param thisObject {any} 函数的this引用
     * @param ...args {any} 函数参数列表
     * @private
     */
    function $callAsync(method, thisObject) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        egret.$callAsyncFunctionList.push(method);
        egret.$callAsyncThisList.push(thisObject);
        egret.$callAsyncArgsList.push(args);
    }
    egret.$callAsync = $callAsync;
})(egret || (egret = {}));
//# sourceMappingURL=callLater.js.map