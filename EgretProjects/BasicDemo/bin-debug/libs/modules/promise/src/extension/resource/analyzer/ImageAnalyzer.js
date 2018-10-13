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
    /**
     * @private
     */
    var ImageAnalyzer = (function (_super) {
        __extends(ImageAnalyzer, _super);
        /**
         * 构造函数
         */
        function ImageAnalyzer() {
            var _this = _super.call(this) || this;
            /**
             * 字节流数据缓存字典
             */
            _this.fileDic = {};
            /**
             * 加载项字典
             */
            _this.resItemDic = [];
            /**
             * Loader对象池
             */
            _this.recycler = [];
            return _this;
        }
        /**
         * @inheritDoc
         */
        ImageAnalyzer.prototype.loadFile = function (resItem, compFunc, thisObject) {
            if (this.fileDic[resItem.name]) {
                compFunc.call(thisObject, resItem);
                return;
            }
            var loader = this.getLoader();
            this.resItemDic[loader.$hashCode] = { item: resItem, func: compFunc, thisObject: thisObject };
            loader.load(RES.$getVirtualUrl(resItem.url));
        };
        /**
         * 获取一个Loader对象
         */
        ImageAnalyzer.prototype.getLoader = function () {
            var loader = this.recycler.pop();
            if (!loader) {
                loader = new egret.ImageLoader();
                loader.addEventListener(egret.Event.COMPLETE, this.onLoadFinish, this);
                loader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadFinish, this);
            }
            return loader;
        };
        /**
         * 一项加载结束
         */
        ImageAnalyzer.prototype.onLoadFinish = function (event) {
            var request = (event.$target);
            var data = this.resItemDic[request.$hashCode];
            delete this.resItemDic[request.$hashCode];
            var resItem = data.item;
            var compFunc = data.func;
            resItem.loaded = (event.$type == egret.Event.COMPLETE);
            if (resItem.loaded) {
                var texture = new egret.Texture();
                texture._setBitmapData(request.data);
                this.analyzeData(resItem, texture);
            }
            this.recycler.push(request);
            compFunc.call(data.thisObject, resItem);
        };
        /**
         * 解析并缓存加载成功的数据
         */
        ImageAnalyzer.prototype.analyzeData = function (resItem, texture) {
            var name = resItem.name;
            if (this.fileDic[name] || !texture) {
                return;
            }
            this.fileDic[name] = texture;
            var config = resItem.data;
            if (config && config["scale9grid"]) {
                var str = config["scale9grid"];
                var list = str.split(",");
                texture["scale9Grid"] = new egret.Rectangle(parseInt(list[0]), parseInt(list[1]), parseInt(list[2]), parseInt(list[3]));
            }
        };
        /**
         * @inheritDoc
         */
        ImageAnalyzer.prototype.getRes = function (name) {
            return this.fileDic[name];
        };
        /**
         * @inheritDoc
         */
        ImageAnalyzer.prototype.hasRes = function (name) {
            var res = this.getRes(name);
            return res != null;
        };
        /**
         * @inheritDoc
         */
        ImageAnalyzer.prototype.destroyRes = function (name) {
            if (this.fileDic[name]) {
                this.onResourceDestroy(this.fileDic[name]);
                delete this.fileDic[name];
                return true;
            }
            return false;
        };
        ImageAnalyzer.prototype.onResourceDestroy = function (texture) {
            texture.dispose();
        };
        return ImageAnalyzer;
    }(RES.AnalyzerBase));
    RES.ImageAnalyzer = ImageAnalyzer;
    __reflect(ImageAnalyzer.prototype, "RES.ImageAnalyzer");
})(RES || (RES = {}));
//# sourceMappingURL=ImageAnalyzer.js.map