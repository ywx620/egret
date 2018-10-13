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
     * @classdesc 使用 MovieClipDataFactory 类，可以生成 MovieClipData 对象用于创建MovieClip
     * @see http://edn.egret.com/cn/docs/page/596 MovieClip序列帧动画
     * @version Egret 2.4
     * @platform Web,Native
     */
    var MovieClipDataFactory = (function (_super) {
        __extends(MovieClipDataFactory, _super);
        /**
         * 创建一个 egret.MovieClipDataFactory 对象
         * @param movieClipDataSet {any} MovieClip数据集，该数据集必须由Egret官方工具生成
         * @param texture {Texture} 纹理
         * @version Egret 2.4
         * @platform Web,Native
         */
        function MovieClipDataFactory(movieClipDataSet, texture) {
            var _this = _super.call(this) || this;
            /**
             * 是否开启缓存
             * @version Egret 2.4
             * @platform Web,Native
             */
            _this.enableCache = true;
            /**
             * @private
             */
            _this.$mcDataCache = {};
            _this.$mcDataSet = movieClipDataSet;
            _this.setTexture(texture);
            return _this;
        }
        /**
         * 清空缓存
         * @version Egret 2.4
         * @platform Web,Native
         */
        MovieClipDataFactory.prototype.clearCache = function () {
            this.$mcDataCache = {};
        };
        /**
         * 根据名字生成一个MovieClipData实例。可以用于创建MovieClip。
         * @param movieClipName {string} MovieClip名字. 可选参数，默认为"", 相当于取第一个MovieClip数据
         * @returns {MovieClipData} 生成的MovieClipData对象
         * @version Egret 2.4
         * @platform Web,Native
         */
        MovieClipDataFactory.prototype.generateMovieClipData = function (movieClipName) {
            if (movieClipName === void 0) { movieClipName = ""; }
            if (movieClipName == "") {
                if (this.$mcDataSet) {
                    for (movieClipName in this.$mcDataSet.mc) {
                        break;
                    }
                }
            }
            if (movieClipName == "") {
                return null;
            }
            var output = this.findFromCache(movieClipName, this.$mcDataCache);
            if (!output) {
                output = new egret.MovieClipData();
                this.fillData(movieClipName, output, this.$mcDataCache);
            }
            return output;
        };
        /**
         * @private
         *
         * @param movieClipName
         * @param cache
         * @returns
         */
        MovieClipDataFactory.prototype.findFromCache = function (movieClipName, cache) {
            if (this.enableCache && cache[movieClipName]) {
                return cache[movieClipName];
            }
            return null;
        };
        /**
         * @private
         *
         * @param movieClipName
         * @param movieClip
         * @param cache
         */
        MovieClipDataFactory.prototype.fillData = function (movieClipName, movieClip, cache) {
            if (this.$mcDataSet) {
                var mcData = this.$mcDataSet.mc[movieClipName];
                if (mcData) {
                    movieClip.$init(mcData, this.$mcDataSet.res, this.$spriteSheet);
                    if (this.enableCache) {
                        cache[movieClipName] = movieClip;
                    }
                }
            }
        };
        Object.defineProperty(MovieClipDataFactory.prototype, "mcDataSet", {
            /**
             * MovieClip数据集
             * @version Egret 2.4
             * @platform Web,Native
             */
            get: function () {
                return this.$mcDataSet;
            },
            set: function (value) {
                this.$mcDataSet = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MovieClipDataFactory.prototype, "texture", {
            /**
             * MovieClip需要使用的纹理图
             */
            set: function (value) {
                this.setTexture(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MovieClipDataFactory.prototype, "spriteSheet", {
            /**
             * 由纹理图生成的精灵表
             * @version Egret 2.4
             * @platform Web,Native
             */
            get: function () {
                return this.$spriteSheet;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         *
         * @param value
         */
        MovieClipDataFactory.prototype.setTexture = function (value) {
            this.$spriteSheet = value ? new egret.SpriteSheet(value) : null;
        };
        return MovieClipDataFactory;
    }(egret.EventDispatcher));
    egret.MovieClipDataFactory = MovieClipDataFactory;
    __reflect(MovieClipDataFactory.prototype, "egret.MovieClipDataFactory");
})(egret || (egret = {}));
//# sourceMappingURL=MovieClipDataFactory.js.map