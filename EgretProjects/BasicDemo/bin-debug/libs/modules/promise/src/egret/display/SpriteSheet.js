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
     * SpriteSheet is a mosaic of multiple sub-bitmaps, comprising a plurality of Texture objects.
     * Each Texture object shares the set bitmap of SpriteSheet, but it points to its different areas.
     * On WebGL / OpenGL, this operation can significantly improve performance.
     * At the same time, SpriteSheet can carry out material integration easily to reduce the number of HTTP requests
     * For specification of the SpriteSheet format, see the document https://github.com/egret-labs/egret-core/wiki/Egret-SpriteSheet-Specification
     * @see http://edn.egret.com/cn/docs/page/135 The use of texture packs
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/display/SpriteSheet.ts
     * @language en_US
     */
    /**
     * SpriteSheet 是一张由多个子位图拼接而成的集合位图，它包含多个 Texture 对象。
     * 每一个 Texture 都共享 SpriteSheet 的集合位图，但是指向它的不同的区域。
     * 在WebGL / OpenGL上，这种做法可以显著提升性能
     * 同时，SpriteSheet可以很方便的进行素材整合，降低HTTP请求数量
     * SpriteSheet 格式的具体规范可以参见此文档  https://github.com/egret-labs/egret-core/wiki/Egret-SpriteSheet-Specification
     * @see http://edn.egret.com/cn/docs/page/135 纹理集的使用
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/display/SpriteSheet.ts
     * @language zh_CN
     */
    var SpriteSheet = (function (_super) {
        __extends(SpriteSheet, _super);
        /**
         * Create an egret.SpriteSheet object
         * @param texture {Texture} Texture
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 创建一个 egret.SpriteSheet 对象
         * @param texture {Texture} 纹理
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        function SpriteSheet(texture) {
            var _this = _super.call(this) || this;
            /**
             * @private
             * 表示这个SpriteSheet的位图区域在bitmapData上的起始位置x。
             */
            _this._bitmapX = 0;
            /**
             * @private
             * 表示这个SpriteSheet的位图区域在bitmapData上的起始位置y。
             */
            _this._bitmapY = 0;
            /**
             * @private
             * 纹理缓存字典
             */
            _this._textureMap = egret.createMap();
            _this.$texture = texture;
            _this._bitmapX = texture._bitmapX - texture._offsetX;
            _this._bitmapY = texture._bitmapY - texture._offsetY;
            return _this;
        }
        /**
         * Obtain a cached Texture object according to the specified texture name
         * @param name {string} Cache the name of this Texture object
         * @returns {egret.Texture} The Texture object
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 根据指定纹理名称获取一个缓存的 Texture 对象
         * @param name {string} 缓存这个 Texture 对象所使用的名称
         * @returns {egret.Texture} Texture 对象
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        SpriteSheet.prototype.getTexture = function (name) {
            return this._textureMap[name];
        };
        /**
         * Create a new Texture object for the specified area on SpriteSheet and cache it
         * @param name {string} Cache the name of this Texture object. If the name already exists, the previous Texture object will be overwrited.
         * @param bitmapX {number} Starting coordinate x of texture area on bitmapData
         * @param bitmapY {number} Starting coordinate y of texture area on bitmapData
         * @param bitmapWidth {number} Width of texture area on bitmapData
         * @param bitmapHeight {number} Height of texture area on bitmapData
         * @param offsetX {number} Starting point x for a non-transparent area of the original bitmap
         * @param offsetY {number} Starting point y for a non-transparent area of the original bitmap
         * @param textureWidth {number} Width of the original bitmap. If it is not passed, use the bitmapWidth  value.
         * @param textureHeight {number} Height of the original bitmap. If it is not passed, use the bitmapHeight value.
         * @returns {egret.Texture} The created Texture object
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 为 SpriteSheet 上的指定区域创建一个新的 Texture 对象并缓存它
         * @param name {string} 缓存这个 Texture 对象所使用的名称，如果名称已存在，将会覆盖之前的 Texture 对象
         * @param bitmapX {number} 纹理区域在 bitmapData 上的起始坐标x
         * @param bitmapY {number} 纹理区域在 bitmapData 上的起始坐标y
         * @param bitmapWidth {number} 纹理区域在 bitmapData 上的宽度
         * @param bitmapHeight {number} 纹理区域在 bitmapData 上的高度
         * @param offsetX {number} 原始位图的非透明区域 x 起始点
         * @param offsetY {number} 原始位图的非透明区域 y 起始点
         * @param textureWidth {number} 原始位图的高度，若不传入，则使用 bitmapWidth 的值。
         * @param textureHeight {number} 原始位图的宽度，若不传入，则使用 bitmapHeight 的值。
         * @returns {egret.Texture} 创建的 Texture 对象
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        SpriteSheet.prototype.createTexture = function (name, bitmapX, bitmapY, bitmapWidth, bitmapHeight, offsetX, offsetY, textureWidth, textureHeight) {
            if (offsetX === void 0) { offsetX = 0; }
            if (offsetY === void 0) { offsetY = 0; }
            if (textureWidth === void 0) {
                textureWidth = offsetX + bitmapWidth;
            }
            if (textureHeight === void 0) {
                textureHeight = offsetY + bitmapHeight;
            }
            var texture = new egret.Texture();
            texture._bitmapData = this.$texture._bitmapData;
            texture.$initData(this._bitmapX + bitmapX, this._bitmapY + bitmapY, bitmapWidth, bitmapHeight, offsetX, offsetY, textureWidth, textureHeight, this.$texture._sourceWidth, this.$texture._sourceHeight);
            this._textureMap[name] = texture;
            return texture;
        };
        /**
         * dispose texture
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 释放纹理
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        SpriteSheet.prototype.dispose = function () {
            if (this.$texture) {
                this.$texture.dispose();
            }
        };
        return SpriteSheet;
    }(egret.HashObject));
    egret.SpriteSheet = SpriteSheet;
    __reflect(SpriteSheet.prototype, "egret.SpriteSheet");
})(egret || (egret = {}));
//# sourceMappingURL=SpriteSheet.js.map