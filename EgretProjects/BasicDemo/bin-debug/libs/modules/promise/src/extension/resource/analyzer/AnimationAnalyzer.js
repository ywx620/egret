////////////////////////////////////////////////////////////////////////////////////////
////
////  Copyright (c) 2014-present, Egret Technology.
////  All rights reserved.
////  Redistribution and use in source and binary forms, with or without
////  modification, are permitted provided that the following conditions are met:
////
////     * Redistributions of source code must retain the above copyright
////       notice, this list of conditions and the following disclaimer.
////     * Redistributions in binary form must reproduce the above copyright
////       notice, this list of conditions and the following disclaimer in the
////       documentation and/or other materials provided with the distribution.
////     * Neither the name of the Egret nor the
////       names of its contributors may be used to endorse or promote products
////       derived from this software without specific prior written permission.
////
////  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
////  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
////  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
////  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
////  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
////  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
////  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
////  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
////  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
////  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
////
////////////////////////////////////////////////////////////////////////////////////////
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
    /**
     * SpriteSheet解析器
     * @private
     */
    var AnimationAnalyzer = (function (_super) {
        __extends(AnimationAnalyzer, _super);
        function AnimationAnalyzer() {
            var _this = _super.call(this) || this;
            _this.sheetMap = {};
            /**
             * ImageLoader对象池
             */
            _this.recyclerIamge = [];
            _this._dataFormat = egret.HttpResponseType.TEXT;
            return _this;
        }
        /**
         * 一项加载结束
         */
        AnimationAnalyzer.prototype.onLoadFinish = function (event) {
            var request = event.target;
            var data = this.resItemDic[request.$hashCode];
            delete this.resItemDic[request.hashCode];
            var resItem = data.item;
            var compFunc = data.func;
            resItem.loaded = (event.type == egret.Event.COMPLETE);
            if (resItem.loaded) {
                if (request instanceof egret.HttpRequest) {
                    resItem.loaded = false;
                    var imageUrl = this.analyzeConfig(resItem, request.response);
                    if (imageUrl) {
                        this.loadImage(imageUrl, data);
                        this.recycler.push(request);
                        return;
                    }
                }
                else {
                    this.analyzeBitmap(resItem, request.data);
                }
            }
            if (request instanceof egret.HttpRequest) {
                this.recycler.push(request);
            }
            else {
                this.recyclerIamge.push(request);
            }
            compFunc.call(data.thisObject, resItem);
        };
        /**
         * 解析并缓存加载成功的配置文件
         */
        AnimationAnalyzer.prototype.analyzeConfig = function (resItem, data) {
            var name = resItem.name;
            var config;
            var imageUrl = "";
            try {
                var str = data;
                config = JSON.parse(str);
            }
            catch (e) {
                egret.$warn(1017, resItem.url, data);
            }
            if (config) {
                this.sheetMap[name] = config;
                if (config["file"]) {
                    imageUrl = this.getRelativePath(resItem.url, config["file"]);
                }
                else {
                    var arr = resItem.url.split("?");
                    var arr2 = arr[0].split("/");
                    arr2[arr2.length - 1] = arr2[arr2.length - 1].split(".")[0] + ".png";
                    imageUrl = "";
                    for (var i = 0; i < arr2.length; i++) {
                        imageUrl += arr2[i] + (i < arr2.length - 1 ? "/" : "");
                    }
                    if (arr.length == 2)
                        imageUrl += arr[2];
                }
            }
            return imageUrl;
        };
        /**
         * 解析并缓存加载成功的位图数据
         */
        AnimationAnalyzer.prototype.analyzeBitmap = function (resItem, data) {
            var name = resItem.name;
            if (this.fileDic[name] || !data) {
                return;
            }
            var config = this.sheetMap[name];
            delete this.sheetMap[name];
            var targetName = resItem.data && resItem.data.subkeys ? "" : name;
            var spriteSheet = this.parseAnimation(data, config, targetName);
            this.fileDic[name] = spriteSheet;
        };
        /**
         * 获取相对位置
         */
        AnimationAnalyzer.prototype.getRelativePath = function (url, file) {
            url = url.split("\\").join("/");
            var index = url.lastIndexOf("/");
            if (index != -1) {
                url = url.substring(0, index + 1) + file;
            }
            else {
                url = file;
            }
            return url;
        };
        AnimationAnalyzer.prototype.parseAnimation = function (bitmapData, data, name) {
            var attributes = Object.keys(data.mc);
            var list = data.mc[attributes[0]].frames;
            var len = list.length;
            var config;
            var animationFrames = [];
            for (var i = 0; i < len; i++) {
                config = data.res[list[i].res];
                var texture = new egret.Texture();
                texture._bitmapData = bitmapData;
                texture.$initData(config.x, config.y, config.w, config.h, list[i].x, list[i].y, list[i].sourceW, list[i].sourceH, bitmapData.width, bitmapData.height);
            }
            return animationFrames;
        };
        AnimationAnalyzer.prototype.destroyRes = function (name) {
            var sheet = this.fileDic[name];
            if (sheet) {
                delete this.fileDic[name];
                return true;
            }
            return false;
        };
        AnimationAnalyzer.prototype.loadImage = function (url, data) {
            var loader = this.getImageLoader();
            this.resItemDic[loader.hashCode] = data;
            loader.load(RES.$getVirtualUrl(url));
        };
        AnimationAnalyzer.prototype.getImageLoader = function () {
            var loader = this.recyclerIamge.pop();
            if (!loader) {
                loader = new egret.ImageLoader();
                loader.addEventListener(egret.Event.COMPLETE, this.onLoadFinish, this);
                loader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadFinish, this);
            }
            return loader;
        };
        return AnimationAnalyzer;
    }(RES.BinAnalyzer));
    RES.AnimationAnalyzer = AnimationAnalyzer;
    __reflect(AnimationAnalyzer.prototype, "RES.AnimationAnalyzer");
})(RES || (RES = {}));
//# sourceMappingURL=AnimationAnalyzer.js.map