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
     * A BitmapData object contains an array of pixel data. This data can represent either a fully opaque bitmap or a
     * transparent bitmap that contains alpha channel data. Either type of BitmapData object is stored as a buffer of 32-bit
     * integers. Each 32-bit integer determines the properties of a single pixel in the bitmap.<br/>
     * Each 32-bit integer is a combination of four 8-bit channel values (from 0 to 255) that describe the alpha transparency
     * and the red, green, and blue (ARGB) values of the pixel. (For ARGB values, the most significant byte represents the
     * alpha channel value, followed by red, green, and blue.)
     * @see egret.Bitmap
     * @version Egret 2.4
     * @platform Web,Native
     * @language en_US
     */
    /**
     * BitmapData 对象是一个包含像素数据的数组。此数据可以表示完全不透明的位图，或表示包含 Alpha 通道数据的透明位图。
     * 以上任一类型的 BitmapData 对象都作为 32 位整数的缓冲区进行存储。每个 32 位整数确定位图中单个像素的属性。<br/>
     * 每个 32 位整数都是四个 8 位通道值（从 0 到 255）的组合，这些值描述像素的 Alpha 透明度以及红色、绿色、蓝色 (ARGB) 值。
     * （对于 ARGB 值，最高有效字节代表 Alpha 通道值，其后的有效字节分别代表红色、绿色和蓝色通道值。）
     * @see egret.Bitmap
     * @version Egret 2.4
     * @platform Web,Native
     * @language zh_CN
     */
    var BitmapData = (function (_super) {
        __extends(BitmapData, _super);
        /**
         * Initializes a BitmapData object to refer to the specified source object.
         * @param source The source object being referenced.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 创建一个引用指定 source 实例的 BitmapData 对象
         * @param source 被引用的 source 实例
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        function BitmapData(source) {
            var _this = _super.call(this) || this;
            /**
             * Texture format.
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 纹理格式。
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            _this.format = "image";
            /**
             * @private
             * webgl纹理生成后，是否删掉原始图像数据
             */
            _this.$deleteSource = true;
            _this.source = source;
            _this.width = source.width;
            _this.height = source.height;
            return _this;
        }
        BitmapData.create = function (type, data, callback) {
            if (egret.Capabilities.runtimeType === egret.RuntimeType.WEB) {
                var base64 = "";
                if (type === "arraybuffer") {
                    base64 = egret.Base64Util.encode(data);
                }
                else {
                    base64 = data;
                }
                var imageType = "image/png"; //default value
                if (base64.charAt(0) === '/') {
                    imageType = "image/jpeg";
                }
                else if (base64.charAt(0) === 'R') {
                    imageType = "image/gif";
                }
                else if (base64.charAt(0) === 'i') {
                    imageType = "image/png";
                }
                var img_1 = new Image();
                img_1.src = "data:" + imageType + ";base64," + base64;
                img_1.crossOrigin = '*';
                var bitmapData_1 = new BitmapData(img_1);
                img_1.onload = function () {
                    img_1.onload = undefined;
                    bitmapData_1.source = img_1;
                    bitmapData_1.height = img_1.height;
                    bitmapData_1.width = img_1.width;
                    if (callback) {
                        callback(bitmapData_1);
                    }
                };
                return bitmapData_1;
            }
            else {
                var buffer = null;
                if (type === "arraybuffer") {
                    buffer = data;
                }
                else {
                    buffer = egret.Base64Util.decode(data);
                }
                var native_texture = egret_native.Texture.createTextureFromArrayBuffer(buffer);
                var bitmapData = new BitmapData(native_texture);
                if (callback) {
                    callback(bitmapData);
                }
                return bitmapData;
            }
        };
        BitmapData.prototype.$dispose = function () {
            if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB && egret.Capabilities.renderMode == "webgl" && this.webGLTexture) {
                egret.WebGLUtils.deleteWebGLTexture(this.webGLTexture);
                this.webGLTexture = null;
            }
            //native
            if (this.source && this.source.dispose) {
                this.source.dispose();
            }
            this.source = null;
            BitmapData.$dispose(this);
        };
        BitmapData.$addDisplayObject = function (displayObject, bitmapData) {
            var hashCode;
            if (bitmapData._bitmapData && bitmapData._bitmapData.hashCode) {
                hashCode = bitmapData._bitmapData.hashCode;
            }
            else {
                hashCode = bitmapData.hashCode;
            }
            if (!hashCode) {
                return;
            }
            if (!BitmapData._displayList[hashCode]) {
                BitmapData._displayList[hashCode] = [displayObject];
                return;
            }
            var tempList = BitmapData._displayList[hashCode];
            if (tempList.indexOf(displayObject) < 0) {
                tempList.push(displayObject);
            }
        };
        BitmapData.$removeDisplayObject = function (displayObject, bitmapData) {
            var hashCode;
            if (bitmapData._bitmapData && bitmapData._bitmapData.hashCode) {
                hashCode = bitmapData._bitmapData.hashCode;
            }
            else {
                hashCode = bitmapData.hashCode;
            }
            if (!hashCode) {
                return;
            }
            if (!BitmapData._displayList[hashCode]) {
                return;
            }
            var tempList = BitmapData._displayList[hashCode];
            var index = tempList.indexOf(displayObject);
            if (index >= 0) {
                tempList.splice(index);
            }
        };
        BitmapData.$invalidate = function (bitmapData) {
            var hashCode;
            if (bitmapData._bitmapData && bitmapData._bitmapData.hashCode) {
                hashCode = bitmapData._bitmapData.hashCode;
            }
            else {
                hashCode = bitmapData.hashCode;
            }
            if (!hashCode) {
                return;
            }
            if (!BitmapData._displayList[hashCode]) {
                return;
            }
            var tempList = BitmapData._displayList[hashCode];
            for (var i = 0; i < tempList.length; i++) {
                if (tempList[i] instanceof egret.Bitmap) {
                    tempList[i].$refreshImageData();
                }
                tempList[i].$invalidateContentBounds();
            }
        };
        BitmapData.$dispose = function (bitmapData) {
            var hashCode;
            if (bitmapData._bitmapData && bitmapData._bitmapData.hashCode) {
                hashCode = bitmapData._bitmapData.hashCode;
            }
            else {
                hashCode = bitmapData.hashCode;
            }
            if (!hashCode) {
                return;
            }
            if (!BitmapData._displayList[hashCode]) {
                return;
            }
            var tempList = BitmapData._displayList[hashCode];
            for (var _i = 0, tempList_1 = tempList; _i < tempList_1.length; _i++) {
                var node = tempList_1[_i];
                if (node instanceof egret.Bitmap) {
                    node.$Bitmap[1 /* image */] = null;
                }
                node.$invalidateContentBounds();
            }
            delete BitmapData._displayList[hashCode];
        };
        BitmapData._displayList = egret.createMap();
        return BitmapData;
    }(egret.HashObject));
    egret.BitmapData = BitmapData;
    __reflect(BitmapData.prototype, "egret.BitmapData");
})(egret || (egret = {}));
//# sourceMappingURL=BitmapData.js.map