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
    var web;
    (function (web) {
        /**
         * @private
         */
        var Html5VersionController = (function (_super) {
            __extends(Html5VersionController, _super);
            function Html5VersionController() {
                var _this = _super.call(this) || this;
                _this._versionInfo = {};
                return _this;
            }
            Html5VersionController.prototype.fetchVersion = function (callback) {
                callback.onSuccess(null);
                return;
                /*
    
                todo
    
                let self = this;
    
                let virtualUrl:string = "all.manifest";
    
                let httpLoader:egret.HttpRequest = new egret.HttpRequest();
                httpLoader.addEventListener(egret.Event.COMPLETE, onLoadComplete, this);
                httpLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, onError, this);
    
                httpLoader.open(virtualUrl + "?r=" + Date.now(), "get");
                httpLoader.send();
    
                function onError(event:egret.IOErrorEvent) {
                    removeListeners();
                    self.dispatchEvent(event);
                }
    
                function onLoadComplete() {
                    removeListeners();
    
                    self._versionInfo = JSON.parse(httpLoader.response);
    
                    window.setTimeout(function () {
                        self.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
                    }, 0);
                }
    
                function removeListeners():void {
                    httpLoader.removeEventListener(egret.Event.COMPLETE, onLoadComplete, self);
                    httpLoader.removeEventListener(egret.IOErrorEvent.IO_ERROR, onError, self);
                }
    
                */
            };
            /**
             * 获取所有有变化的文件
             * @returns {any[]}
             */
            Html5VersionController.prototype.getChangeList = function () {
                return [];
            };
            Html5VersionController.prototype.getVirtualUrl = function (url) {
                return url;
                /*
    
                todo
    
                if (DEBUG) {
                    return url;
                }
                if (this._versionInfo && this._versionInfo[url]) {
                    return "resource/" + this._versionInfo[url]["v"].substring(0, 2) + "/" + this._versionInfo[url]["v"] + "_" + this._versionInfo[url]["s"] + "." + url.substring(url.lastIndexOf(".") + 1);
                }
                else {
                    return url;
                }
    
                */
            };
            return Html5VersionController;
        }(egret.EventDispatcher));
        web.Html5VersionController = Html5VersionController;
        __reflect(Html5VersionController.prototype, "RES.web.Html5VersionController", ["RES.VersionController", "RES.IVersionController"]);
        if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
            RES.VersionController = Html5VersionController;
        }
    })(web = RES.web || (RES.web = {}));
})(RES || (RES = {}));
//# sourceMappingURL=Html5VersionController.js.map