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
/// <reference path="supportClasses/DefaultAssetAdapter.ts" />
var eui;
(function (eui) {
    /**
     * The Image control lets you show JPEG, PNG, and GIF files
     * at runtime. Image inherit Bitmap，so you can set the <code>bitmapData</code> property
     * to show the data. you can also set the <code>source</code> property, Image will auto load
     * and show the url image or the bitmapData.
     *
     * @event egret.Event.COMPLETE Dispatched when the image loaded complete.
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/components/ImageExample.ts
     * @language en_US
     */
    /**
     * Image 控件允许您在运行时显示 JPEG、PNG 等图片文件文件。Image 继承至 Bitmap，因此您可以直接对其 bitmapData 属性，
     * 赋值从外部加载得到的位图数据以显示对应图片。同时，Image 还提供了更加方便的 source 属性，source 属性可以接受一个网络图片url作为值，
     * 赋值为url后，它内部会自动去加载并显示图片。并且您同样也可以直接把 BitmapData 对象赋值给 source 属性以显示图片。
     *
     * @event egret.Event.COMPLETE 当图片加载完成后调度
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample  extension/eui/components/ImageExample.ts
     * @language zh_CN
     */
    var Image = (function (_super) {
        __extends(Image, _super);
        /**
         * Constructor.
         *
         * @param source The source used for the bitmap fill. the value can be
         * a string or an instance of <code>egret.Texture</code>
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 构造函数。
         *
         * @param source 用于位图填充的源。可以是一个字符串或者 <code>egret.Texture</code> 对象
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         * @language zh_CN
         */
        function Image(source) {
            var _this = _super.call(this) || this;
            //endif*/
            /**
             * @private
             */
            _this.sourceChanged = false;
            /**
             * @private
             */
            _this._source = null;
            _this.initializeUIValues();
            if (source) {
                _this.source = source;
            }
            return _this;
        }
        Object.defineProperty(Image.prototype, "scale9Grid", {
            /**
             * Represent a Rectangle Area that the 9 scale area of Image.
             * Notice: This property is valid only when <code>fillMode</code>
             * is <code>BitmapFillMode.SCALE</code>.
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 矩形区域，它定义素材对象的九个缩放区域。
             * 注意:此属性仅在<code>fillMode</code>为<code>BitmapFillMode.SCALE</code>时有效。
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this.$scale9Grid;
            },
            set: function (value) {
                this.$scale9Grid = value;
                this.$invalidateContentBounds();
                this.invalidateDisplayList();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Image.prototype, "fillMode", {
            /**
             * Determines how the bitmap fills in the dimensions.
             * <p>When set to <code>BitmapFillMode.CLIP</code>, the bitmap
             * ends at the edge of the region.</p>
             * <p>When set to <code>BitmapFillMode.REPEAT</code>, the bitmap
             * repeats to fill the region.</p>
             * <p>When set to <code>BitmapFillMode.SCALE</code>, the bitmap
             * stretches to fill the region.</p>
             *
             * @default <code>BitmapFillMode.SCALE</code>
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 确定位图填充尺寸的方式。
             * <p>设置为 <code>BitmapFillMode.CLIP</code>时，位图将在边缘处被截断。</p>
             * <p>设置为 <code>BitmapFillMode.REPEAT</code>时，位图将重复以填充区域。</p>
             * <p>设置为 <code>BitmapFillMode.SCALE</code>时，位图将拉伸以填充区域。</p>
             *
             * @default <code>BitmapFillMode.SCALE</code>
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this.$fillMode;
            },
            set: function (value) {
                if (value == this.$fillMode) {
                    return;
                }
                this.$fillMode = value;
                this.invalidateDisplayList();
            },
            enumerable: true,
            configurable: true
        });
        //if egret
        Image.prototype.$setFillMode = function (value) {
            var result = _super.prototype.$setFillMode.call(this, value);
            this.invalidateDisplayList();
            return result;
        };
        Object.defineProperty(Image.prototype, "source", {
            /**
             * The source used for the bitmap fill. the value can be
             * a string or an instance of <code>egret.Texture</code>
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 用于位图填充的源。可以是一个字符串或者 <code>egret.Texture</code> 对象
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this._source;
            },
            set: function (value) {
                if (value == this._source) {
                    return;
                }
                this._source = value;
                if (this.$stage) {
                    this.parseSource();
                }
                else {
                    this.sourceChanged = true;
                    this.invalidateProperties();
                }
            },
            enumerable: true,
            configurable: true
        });
        Image.prototype.$setBitmapData = function (value) {
            if (value == this.$Bitmap[0 /* bitmapData */]) {
                return false;
            }
            var result = _super.prototype.$setBitmapData.call(this, value);
            this.sourceChanged = false;
            this.invalidateSize();
            this.invalidateDisplayList();
            return result;
        };
        /**
         * @private
         * 解析source
         */
        Image.prototype.parseSource = function () {
            var _this = this;
            this.sourceChanged = false;
            var source = this._source;
            if (source && typeof source == "string") {
                eui.getAssets(this._source, function (data) {
                    if (source !== _this._source)
                        return;
                    if (!egret.is(data, "egret.Texture")) {
                        return;
                    }
                    _this.$setBitmapData(data);
                    if (data) {
                        _this.dispatchEventWith(egret.Event.COMPLETE);
                    }
                    else if (true) {
                        egret.$warn(2301, source);
                    }
                });
            }
            else {
                this.$setBitmapData(source);
            }
        };
        Image.prototype.$measureContentBounds = function (bounds) {
            var values = this.$Bitmap;
            var image = this.$Bitmap[0 /* bitmapData */];
            if (image) {
                var uiValues = this.$UIComponent;
                var width = uiValues[10 /* width */];
                var height = uiValues[11 /* height */];
                if (isNaN(width) || isNaN(height)) {
                    bounds.setEmpty();
                    return;
                }
                if (this.$fillMode == "clip") {
                    if (width > image.$getTextureWidth()) {
                        width = image.$getTextureWidth();
                    }
                    if (height > image.$getTextureHeight()) {
                        height = image.$getTextureHeight();
                    }
                }
                bounds.setTo(0, 0, width, height);
            }
            else {
                bounds.setEmpty();
            }
        };
        /**
         * @private
         *
         * @param context
         */
        Image.prototype.$render = function () {
            var image = this.$Bitmap[0 /* bitmapData */];
            if (!image) {
                return;
            }
            var uiValues = this.$UIComponent;
            var width = uiValues[10 /* width */];
            var height = uiValues[11 /* height */];
            if (width === 0 || height === 0) {
                return;
            }
            var values = this.$Bitmap;
            egret.sys.BitmapNode.$updateTextureData(this.$renderNode, values[1 /* image */], values[2 /* bitmapX */], values[3 /* bitmapY */], values[4 /* bitmapWidth */], values[5 /* bitmapHeight */], values[6 /* offsetX */], values[7 /* offsetY */], values[8 /* textureWidth */], values[9 /* textureHeight */], width, height, values[13 /* sourceWidth */], values[14 /* sourceHeight */], this.scale9Grid || values[0 /* bitmapData */]["scale9Grid"], this.$fillMode, values[10 /* smoothing */]);
        };
        /**
         * @copy eui.UIComponent#createChildren
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        Image.prototype.createChildren = function () {
            if (this.sourceChanged) {
                this.parseSource();
            }
        };
        /**
         * @copy eui.UIComponent#childrenCreated
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        Image.prototype.childrenCreated = function () {
        };
        /**
         * @copy eui.UIComponent#commitProperties
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        Image.prototype.commitProperties = function () {
            eui.sys.UIComponentImpl.prototype["commitProperties"].call(this);
            if (this.sourceChanged) {
                this.parseSource();
            }
        };
        /**
         * @copy eui.UIComponent#measure
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        Image.prototype.measure = function () {
            var bitmapData = this.$Bitmap[0 /* bitmapData */];
            if (bitmapData) {
                this.setMeasuredSize(bitmapData.$getTextureWidth(), bitmapData.$getTextureHeight());
            }
            else {
                this.setMeasuredSize(0, 0);
            }
        };
        /**
         * @copy eui.UIComponent#updateDisplayList
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        Image.prototype.updateDisplayList = function (unscaledWidth, unscaledHeight) {
            this.$invalidateContentBounds();
        };
        /**
         * @copy eui.UIComponent#invalidateParentLayout
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        Image.prototype.invalidateParentLayout = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        Image.prototype.setMeasuredSize = function (width, height) {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        Image.prototype.invalidateProperties = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        Image.prototype.validateProperties = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        Image.prototype.invalidateSize = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        Image.prototype.validateSize = function (recursive) {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        Image.prototype.invalidateDisplayList = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        Image.prototype.validateDisplayList = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        Image.prototype.validateNow = function () {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        Image.prototype.setLayoutBoundsSize = function (layoutWidth, layoutHeight) {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        Image.prototype.setLayoutBoundsPosition = function (x, y) {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        Image.prototype.getLayoutBounds = function (bounds) {
        };
        /**
         * @inheritDoc
         *
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        Image.prototype.getPreferredBounds = function (bounds) {
        };
        return Image;
    }(egret.Bitmap));
    eui.Image = Image;
    __reflect(Image.prototype, "eui.Image", ["eui.UIComponent", "egret.DisplayObject"]);
    eui.sys.implementUIComponent(Image, egret.Bitmap);
    eui.registerProperty(Image, "scale9Grid", "egret.Rectangle");
})(eui || (eui = {}));
//# sourceMappingURL=Image.js.map