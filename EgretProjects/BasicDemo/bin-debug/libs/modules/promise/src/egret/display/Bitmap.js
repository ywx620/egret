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
     * The Bitmap class represents display objects that represent bitmap images.
     * The Bitmap() constructor allows you to create a Bitmap object that contains a reference to a BitmapData object.
     * After you create a Bitmap object, use the addChild() or addChildAt() method of the parent DisplayObjectContainer
     * instance to place the bitmap on the display list.A Bitmap object can share its texture reference among several
     * Bitmap objects, independent of translation or rotation properties. Because you can create multiple Bitmap objects
     * that reference the same texture object, multiple display objects can use the same complex texture object
     * without incurring the memory overhead of a texture object for each display object instance.
     *
     * @see egret.Texture
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/display/Bitmap.ts
     * @language en_US
     */
    /**
     * Bitmap 类表示用于显示位图图片的显示对象。
     * 利用 Bitmap() 构造函数，可以创建包含对 BitmapData 对象引用的 Bitmap 对象。创建了 Bitmap 对象后，
     * 使用父级 DisplayObjectContainer 实例的 addChild() 或 addChildAt() 方法可以将位图放在显示列表中。
     * 一个 Bitmap 对象可在若干 Bitmap 对象之中共享其 texture 引用，与缩放或旋转属性无关。
     * 由于能够创建引用相同 texture 对象的多个 Bitmap 对象，因此，多个显示对象可以使用相同的 texture 对象，
     * 而不会因为每个显示对象实例使用一个 texture 对象而产生额外内存开销。
     *
     * @see egret.Texture
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/display/Bitmap.ts
     * @language zh_CN
     */
    var Bitmap = (function (_super) {
        __extends(Bitmap, _super);
        /**
         * Initializes a Bitmap object to refer to the specified BitmapData|Texture object.
         * @param value The BitmapData|Texture object being referenced.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 创建一个引用指定 BitmapData|Texture 实例的 Bitmap 对象
         * @param value 被引用的 BitmapData|Texture 实例
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        function Bitmap(value) {
            var _this = _super.call(this) || this;
            /**
             * @private
             */
            _this.$scale9Grid = null;
            /**
             * @private
             */
            _this.$fillMode = "scale";
            _this._pixelHitTest = false;
            _this.$renderNode = new egret.sys.BitmapNode();
            _this.$Bitmap = {
                0: null,
                1: null,
                2: 0,
                3: 0,
                4: 0,
                5: 0,
                6: 0,
                7: 0,
                8: 0,
                9: 0,
                10: Bitmap.defaultSmoothing,
                11: NaN,
                12: NaN,
                13: NaN,
                14: NaN,
            };
            _this.$setBitmapData(value);
            if (value instanceof egret.Texture) {
                _this.$renderNode.rotated = value.$rotated;
            }
            return _this;
        }
        /**
         * @private
         * 显示对象添加到舞台
         */
        Bitmap.prototype.$onAddToStage = function (stage, nestLevel) {
            _super.prototype.$onAddToStage.call(this, stage, nestLevel);
            var bitmapData = this.$Bitmap[0 /* bitmapData */];
            if (bitmapData) {
                egret.BitmapData.$addDisplayObject(this, bitmapData);
            }
        };
        /**
         * @private
         * 显示对象从舞台移除
         */
        Bitmap.prototype.$onRemoveFromStage = function () {
            _super.prototype.$onRemoveFromStage.call(this);
            var bitmapData = this.$Bitmap[0 /* bitmapData */];
            if (bitmapData) {
                egret.BitmapData.$removeDisplayObject(this, bitmapData);
            }
        };
        Object.defineProperty(Bitmap.prototype, "bitmapData", {
            /**
             * The BitmapData object being referenced.
             * If you pass the constructor of type Texture or last set for texture, this value returns null.
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 被引用的 BitmapData 对象。
             * 如果传入构造函数的类型为 Texture 或者最后设置的为 texture，则此值返回 null。
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                var value = this.$Bitmap[0 /* bitmapData */];
                if (value instanceof egret.Texture) {
                    return null;
                }
                else {
                    return value;
                }
            },
            set: function (value) {
                this.$setBitmapData(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Bitmap.prototype, "texture", {
            /**
             * The Texture object being referenced.
             * If you pass the constructor of type BitmapData or last set for bitmapData, this value returns null.
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 被引用的 Texture 对象。
             * 如果传入构造函数的类型为 BitmapData 或者最后设置的为 bitmapData，则此值返回 null。
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                var value = this.$Bitmap[0 /* bitmapData */];
                if (value instanceof egret.Texture) {
                    return value;
                }
                else {
                    return null;
                }
            },
            set: function (value) {
                var self = this;
                self.$setBitmapData(value);
                if (value && self.$renderNode) {
                    self.$renderNode.rotated = value.$rotated;
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         */
        Bitmap.prototype.$setBitmapData = function (value) {
            var values = this.$Bitmap;
            var oldBitmapData = values[0 /* bitmapData */];
            if (value == oldBitmapData) {
                return false;
            }
            values[0 /* bitmapData */] = value;
            if (value) {
                this.$refreshImageData();
            }
            else {
                if (oldBitmapData) {
                    egret.BitmapData.$removeDisplayObject(this, oldBitmapData);
                }
                this.setImageData(null, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
                this.$invalidateContentBounds();
                return true;
            }
            if (this.$stage) {
                if (oldBitmapData) {
                    var oldHashCode = void 0;
                    if (oldBitmapData._bitmapData && oldBitmapData._bitmapData.hashCode) {
                        oldHashCode = oldBitmapData._bitmapData.hashCode;
                    }
                    else {
                        oldHashCode = oldBitmapData.hashCode;
                    }
                    var newHashCode = void 0;
                    if (value._bitmapData && value._bitmapData.hashCode) {
                        newHashCode = value._bitmapData.hashCode;
                    }
                    else {
                        newHashCode = value.hashCode;
                    }
                    if (oldHashCode == newHashCode) {
                        this.$invalidateContentBounds();
                        return true;
                    }
                    egret.BitmapData.$removeDisplayObject(this, oldBitmapData);
                }
                egret.BitmapData.$addDisplayObject(this, value);
            }
            this.$invalidateContentBounds();
            return true;
        };
        /**
         * @private
         */
        Bitmap.prototype.$refreshImageData = function () {
            var values = this.$Bitmap;
            var bitmapData = values[0 /* bitmapData */];
            if (bitmapData) {
                if (bitmapData instanceof egret.Texture) {
                    this.setImageData(bitmapData._bitmapData, bitmapData._bitmapX, bitmapData._bitmapY, bitmapData._bitmapWidth, bitmapData._bitmapHeight, bitmapData._offsetX, bitmapData._offsetY, bitmapData.$getTextureWidth(), bitmapData.$getTextureHeight(), bitmapData._sourceWidth, bitmapData._sourceHeight);
                }
                else {
                    var width = bitmapData.width;
                    var height = bitmapData.height;
                    this.setImageData(bitmapData, 0, 0, width, height, 0, 0, width, height, width, height);
                }
            }
        };
        /**
         * @private
         */
        Bitmap.prototype.setImageData = function (image, bitmapX, bitmapY, bitmapWidth, bitmapHeight, offsetX, offsetY, textureWidth, textureHeight, sourceWidth, sourceHeight) {
            var values = this.$Bitmap;
            values[1 /* image */] = image;
            values[2 /* bitmapX */] = bitmapX;
            values[3 /* bitmapY */] = bitmapY;
            values[4 /* bitmapWidth */] = bitmapWidth;
            values[5 /* bitmapHeight */] = bitmapHeight;
            values[6 /* offsetX */] = offsetX;
            values[7 /* offsetY */] = offsetY;
            values[8 /* textureWidth */] = textureWidth;
            values[9 /* textureHeight */] = textureHeight;
            values[13 /* sourceWidth */] = sourceWidth;
            values[14 /* sourceHeight */] = sourceHeight;
        };
        Object.defineProperty(Bitmap.prototype, "scale9Grid", {
            /**
             * Represent a Rectangle Area that the 9 scale area of Image.
             * Notice: This property is valid only when <code>fillMode</code>
             * is <code>BitmapFillMode.SCALE</code>.
             *
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 矩形区域，它定义素材对象的九个缩放区域。
             * 注意:此属性仅在<code>fillMode</code>为<code>BitmapFillMode.SCALE</code>时有效。
             *
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this.$scale9Grid;
            },
            set: function (value) {
                this.$scale9Grid = value;
                this.$invalidateContentBounds();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Bitmap.prototype, "fillMode", {
            /**
             * Determines how the bitmap fills in the dimensions.
             * <p>When set to <code>BitmapFillMode.REPEAT</code>, the bitmap
             * repeats to fill the region.</p>
             * <p>When set to <code>BitmapFillMode.SCALE</code>, the bitmap
             * stretches to fill the region.</p>
             *
             * @default <code>BitmapFillMode.SCALE</code>
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web
             * @language en_US
             */
            /**
             * 确定位图填充尺寸的方式。
             * <p>设置为 <code>BitmapFillMode.REPEAT</code>时，位图将重复以填充区域。</p>
             * <p>设置为 <code>BitmapFillMode.SCALE</code>时，位图将拉伸以填充区域。</p>
             *
             * @default <code>BitmapFillMode.SCALE</code>
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web
             * @language zh_CN
             */
            get: function () {
                return this.$fillMode;
            },
            set: function (value) {
                this.$setFillMode(value);
            },
            enumerable: true,
            configurable: true
        });
        Bitmap.prototype.$setFillMode = function (value) {
            if (value == this.$fillMode) {
                return false;
            }
            this.$fillMode = value;
            return true;
        };
        Object.defineProperty(Bitmap.prototype, "smoothing", {
            /**
             * Whether or not the bitmap is smoothed when scaled.
             * @version Egret 2.4
             * @platform Web
             * @language en_US
             */
            /**
             * 控制在缩放时是否对位图进行平滑处理。
             * @version Egret 2.4
             * @platform Web
             * @language zh_CN
             */
            get: function () {
                var values = this.$Bitmap;
                return values[10 /* smoothing */];
            },
            set: function (value) {
                value = !!value;
                var values = this.$Bitmap;
                if (value == values[10 /* smoothing */]) {
                    return;
                }
                values[10 /* smoothing */] = value;
                this.$invalidate();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         *
         * @param value
         */
        Bitmap.prototype.$setWidth = function (value) {
            //value = +value || 0;
            var values = this.$Bitmap;
            if (value < 0 || value == values[11 /* explicitBitmapWidth */]) {
                return false;
            }
            values[11 /* explicitBitmapWidth */] = value;
            this.$invalidateContentBounds();
            return true;
        };
        /**
         * @private
         *
         * @param value
         */
        Bitmap.prototype.$setHeight = function (value) {
            //value = +value || 0;
            var values = this.$Bitmap;
            if (value < 0 || value == values[12 /* explicitBitmapHeight */]) {
                return false;
            }
            values[12 /* explicitBitmapHeight */] = value;
            this.$invalidateContentBounds();
            return true;
        };
        /**
         * @private
         * 获取显示宽度
         */
        Bitmap.prototype.$getWidth = function () {
            var values = this.$Bitmap;
            return isNaN(values[11 /* explicitBitmapWidth */]) ? this.$getContentBounds().width : values[11 /* explicitBitmapWidth */];
        };
        /**
         * @private
         * 获取显示宽度
         */
        Bitmap.prototype.$getHeight = function () {
            var values = this.$Bitmap;
            return isNaN(values[12 /* explicitBitmapHeight */]) ? this.$getContentBounds().height : values[12 /* explicitBitmapHeight */];
        };
        /**
         * @private
         */
        Bitmap.prototype.$measureContentBounds = function (bounds) {
            var values = this.$Bitmap;
            if (values[1 /* image */]) {
                var values_1 = this.$Bitmap;
                var w = !isNaN(values_1[11 /* explicitBitmapWidth */]) ? values_1[11 /* explicitBitmapWidth */] : values_1[8 /* textureWidth */];
                var h = !isNaN(values_1[12 /* explicitBitmapHeight */]) ? values_1[12 /* explicitBitmapHeight */] : values_1[9 /* textureHeight */];
                bounds.setTo(0, 0, w, h);
            }
            else {
                var w = !isNaN(values[11 /* explicitBitmapWidth */]) ? values[11 /* explicitBitmapWidth */] : 0;
                var h = !isNaN(values[12 /* explicitBitmapHeight */]) ? values[12 /* explicitBitmapHeight */] : 0;
                bounds.setTo(0, 0, w, h);
            }
        };
        /**
         * @private
         */
        Bitmap.prototype.$render = function () {
            var values = this.$Bitmap;
            if (values[1 /* image */]) {
                var destW = !isNaN(values[11 /* explicitBitmapWidth */]) ? values[11 /* explicitBitmapWidth */] : values[8 /* textureWidth */];
                var destH = !isNaN(values[12 /* explicitBitmapHeight */]) ? values[12 /* explicitBitmapHeight */] : values[9 /* textureHeight */];
                egret.sys.BitmapNode.$updateTextureData(this.$renderNode, values[1 /* image */], values[2 /* bitmapX */], values[3 /* bitmapY */], values[4 /* bitmapWidth */], values[5 /* bitmapHeight */], values[6 /* offsetX */], values[7 /* offsetY */], values[8 /* textureWidth */], values[9 /* textureHeight */], destW, destH, values[13 /* sourceWidth */], values[14 /* sourceHeight */], this.scale9Grid || values[0 /* bitmapData */]["scale9Grid"], this.fillMode, values[10 /* smoothing */]);
            }
        };
        Object.defineProperty(Bitmap.prototype, "pixelHitTest", {
            /**
             * Specifies whether this object use precise hit testing by checking the alpha value of each pixel.If pixelHitTest
             * is set to true,the transparent area of the bitmap will be touched through.<br/>
             * Note:If the image is loaded from cross origin,that we can't access to the pixel data,so it might cause
             * the pixelHitTest property invalid.
             * @default false
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 是否开启精确像素碰撞。设置为true显示对象本身的透明区域将能够被穿透。<br/>
             * 注意：若图片资源是以跨域方式从外部服务器加载的，将无法访问图片的像素数据，而导致此属性失效。
             * @default false
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this._pixelHitTest;
            },
            set: function (value) {
                this._pixelHitTest = !!value;
            },
            enumerable: true,
            configurable: true
        });
        Bitmap.prototype.$hitTest = function (stageX, stageY) {
            var target = _super.prototype.$hitTest.call(this, stageX, stageY);
            if (target && this._pixelHitTest) {
                target = this.hitTestPixel(stageX, stageY);
            }
            return target;
        };
        /**
         * @private
         */
        Bitmap.prototype.hitTestPixel = function (stageX, stageY) {
            var m = this.$getInvertedConcatenatedMatrix();
            var localX = m.a * stageX + m.c * stageY + m.tx;
            var localY = m.b * stageX + m.d * stageY + m.ty;
            var data;
            var displayList = this.$displayList;
            if (displayList) {
                var buffer = displayList.renderBuffer;
                try {
                    data = buffer.getPixels(localX - displayList.offsetX, localY - displayList.offsetY);
                }
                catch (e) {
                    console.log(this.$Bitmap[0 /* bitmapData */]);
                    throw new Error(egret.sys.tr(1039));
                }
            }
            else {
                var buffer = egret.sys.customHitTestBuffer;
                buffer.resize(3, 3);
                var node = this.$getRenderNode();
                var matrix = egret.Matrix.create();
                matrix.identity();
                matrix.translate(1 - localX, 1 - localY);
                egret.sys.systemRenderer.drawNodeToBuffer(node, buffer, matrix, true);
                egret.Matrix.release(matrix);
                try {
                    data = buffer.getPixels(1, 1);
                }
                catch (e) {
                    console.log(this.$Bitmap[0 /* bitmapData */]);
                    throw new Error(egret.sys.tr(1039));
                }
            }
            if (data[3] === 0) {
                return null;
            }
            return this;
        };
        Bitmap.$drawImage = function (node, image, bitmapX, bitmapY, bitmapWidth, bitmapHeight, offsetX, offsetY, textureWidth, textureHeight, destW, destH, sourceWidth, sourceHeight, scale9Grid, fillMode, smoothing) {
            console.warn('deprecated method : Bitmap.$drawImage,use egret.sys.BitmapNode.$drawImage instead of it');
            egret.sys.BitmapNode.$updateTextureData(node, image, bitmapX, bitmapY, bitmapWidth, bitmapHeight, offsetX, offsetY, textureWidth, textureHeight, destW, destH, sourceWidth, sourceHeight, scale9Grid, fillMode, smoothing);
        };
        /**
         * The default value of whether or not is smoothed when scaled.
         * When object such as Bitmap is created,smoothing property will be set to this value.
         * @default true。
         * @version Egret 3.0
         * @platform Web
         * @language en_US
         */
        /**
         * 控制在缩放时是否进行平滑处理的默认值。
         * 在 Bitmap 等对象创建时,smoothing 属性会被设置为该值。
         * @default true。
         * @version Egret 3.0
         * @platform Web
         * @language zh_CN
         */
        Bitmap.defaultSmoothing = true;
        return Bitmap;
    }(egret.DisplayObject));
    egret.Bitmap = Bitmap;
    __reflect(Bitmap.prototype, "egret.Bitmap");
})(egret || (egret = {}));
//# sourceMappingURL=Bitmap.js.map