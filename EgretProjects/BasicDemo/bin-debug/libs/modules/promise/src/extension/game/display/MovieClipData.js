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
     * @classdesc 使用 MovieClipData 类，您可以创建 MovieClip 对象和处理 MovieClip 对象的数据。MovieClipData 一般由MovieClipDataFactory生成
     * @see http://edn.egret.com/cn/docs/page/596 MovieClip序列帧动画
     * @version Egret 2.4
     * @platform Web,Native
     */
    var MovieClipData = (function (_super) {
        __extends(MovieClipData, _super);
        /**
         * 创建一个 egret.MovieClipData 对象
         * @version Egret 2.4
         * @platform Web,Native
         */
        function MovieClipData() {
            var _this = _super.call(this) || this;
            /**
             * @private
             * MovieClip数据
             */
            _this.$mcData = null;
            /**
             * 总帧数
             * @version Egret 2.4
             * @platform Web,Native
             */
            _this.numFrames = 1;
            /**
             * 帧数据列表
             * @version Egret 2.4
             * @platform Web,Native
             */
            _this.frames = [];
            /**
             * 帧标签列表
             * @version Egret 2.4
             * @platform Web,Native
             */
            _this.labels = null;
            /**
             * 帧事件列表
             * @version Egret 2.4
             * @platform Web,Native
             */
            _this.events = [];
            /**
             * 帧率
             * @version Egret 2.4
             * @platform Web,Native
             */
            _this.frameRate = 0;
            /**
             * 纹理数据
             * @version Egret 2.4
             * @platform Web,Native
             */
            _this.textureData = null;
            /**
             * 纹理集
             * @version Egret 2.4
             * @platform Web,Native
             */
            _this.spriteSheet = null;
            return _this;
        }
        /**
         * @private
         *
         * @param mcData
         * @param textureData
         * @param spriteSheet
         */
        MovieClipData.prototype.$init = function (mcData, textureData, spriteSheet) {
            this.textureData = textureData;
            this.spriteSheet = spriteSheet;
            this.setMCData(mcData);
        };
        /**
         * 根据指定帧序号获取该帧对应的关键帧数据
         * @param frame {number} 帧序号
         * @returns {any} 帧数据对象
         * @version Egret 2.4
         * @platform Web,Native
         */
        MovieClipData.prototype.getKeyFrameData = function (frame) {
            var outputFrameData = this.frames[frame - 1];
            if (outputFrameData.frame) {
                outputFrameData = this.frames[outputFrameData.frame - 1];
            }
            return outputFrameData;
        };
        /**
         * 根据指定帧序号获取该帧对应的Texture对象
         * @param frame {number} 帧序号
         * @returns {egret.Texture} Texture对象
         * @version Egret 2.4
         * @platform Web,Native
         */
        MovieClipData.prototype.getTextureByFrame = function (frame) {
            var frameData = this.getKeyFrameData(frame);
            if (frameData.res) {
                var outputTexture = this.getTextureByResName(frameData.res);
                return outputTexture;
            }
            return null;
        };
        MovieClipData.prototype.$getOffsetByFrame = function (frame, point) {
            var frameData = this.getKeyFrameData(frame);
            if (frameData.res) {
                point.setTo(frameData.x | 0, frameData.y | 0);
            }
        };
        /**
         * @private
         *
         * @param resName
         * @returns
         */
        MovieClipData.prototype.getTextureByResName = function (resName) {
            if (this.spriteSheet == null) {
                return null;
            }
            var texture = this.spriteSheet.getTexture(resName);
            if (!texture) {
                var textureData = this.textureData[resName];
                texture = this.spriteSheet.createTexture(resName, textureData.x, textureData.y, textureData.w, textureData.h);
            }
            return texture;
        };
        /**
         * @private
         *
         * @returns
         */
        MovieClipData.prototype.$isDataValid = function () {
            return this.frames.length > 0;
        };
        /**
         * @private
         *
         * @returns
         */
        MovieClipData.prototype.$isTextureValid = function () {
            return this.textureData != null && this.spriteSheet != null;
        };
        /**
         * @private
         *
         * @param mcData
         */
        MovieClipData.prototype.$fillMCData = function (mcData) {
            this.frameRate = mcData["frameRate"] || 24;
            this.fillFramesData(mcData.frames);
            this.fillFrameLabelsData(mcData.labels);
            this.fillFrameEventsData(mcData.events);
        };
        /**
         * @private
         *
         * @param framesData
         */
        MovieClipData.prototype.fillFramesData = function (framesData) {
            var frames = this.frames;
            var length = framesData ? framesData.length : 0;
            var keyFramePosition;
            for (var i = 0; i < length; i++) {
                var frameData = framesData[i];
                frames.push(frameData);
                if (frameData.duration) {
                    var duration = parseInt(frameData.duration);
                    if (duration > 1) {
                        keyFramePosition = frames.length;
                        for (var j = 1; j < duration; j++) {
                            frames.push({ "frame": keyFramePosition });
                        }
                    }
                }
            }
            this.numFrames = frames.length;
        };
        /**
         * @private
         *
         * @param frameLabelsData
         */
        MovieClipData.prototype.fillFrameLabelsData = function (frameLabelsData) {
            if (frameLabelsData) {
                var length_1 = frameLabelsData.length;
                if (length_1 > 0) {
                    this.labels = [];
                    for (var i = 0; i < length_1; i++) {
                        var label = frameLabelsData[i];
                        this.labels.push(new egret.FrameLabel(label.name, label.frame, label.end));
                    }
                }
            }
        };
        /**
         * @private
         *
         * @param frameEventsData
         */
        MovieClipData.prototype.fillFrameEventsData = function (frameEventsData) {
            if (frameEventsData) {
                var length_2 = frameEventsData.length;
                if (length_2 > 0) {
                    this.events = [];
                    for (var i = 0; i < length_2; i++) {
                        var events = frameEventsData[i];
                        this.events[events.frame] = events.name;
                    }
                }
            }
        };
        Object.defineProperty(MovieClipData.prototype, "mcData", {
            /**
             * @version Egret 2.4
             * @platform Web,Native
             */
            get: function () {
                return this.$mcData;
            },
            /**
             * MovieClip数据源
             */
            set: function (value) {
                this.setMCData(value);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         *
         * @param value
         */
        MovieClipData.prototype.setMCData = function (value) {
            if (this.$mcData == value) {
                return;
            }
            this.$mcData = value;
            if (value) {
                this.$fillMCData(value);
            }
        };
        return MovieClipData;
    }(egret.HashObject));
    egret.MovieClipData = MovieClipData;
    __reflect(MovieClipData.prototype, "egret.MovieClipData");
})(egret || (egret = {}));
//# sourceMappingURL=MovieClipData.js.map