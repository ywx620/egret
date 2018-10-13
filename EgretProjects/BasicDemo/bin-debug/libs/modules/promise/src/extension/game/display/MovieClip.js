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
    * @version Egret 2.4
    * @platform Web,Native
    * @includeExample extension/game/display/MovieClip.ts
    * @language en_US
    */
    /**
     * 影片剪辑，可以通过影片剪辑播放序列帧动画。MovieClip 类从以下类继承而来：DisplayObject 和 EventDispatcher。不同于 DisplayObject 对象，MovieClip 对象拥有一个时间轴。
     * @extends egret.DisplayObject
     * @event egret.Event.COMPLETE 动画播放完成。
     * @event egret.Event.LOOP_COMPLETE 动画循环播放完成。循环最后一次只派发 COMPLETE 事件，不派发 LOOP_COMPLETE 事件。
     * @see http://edn.egret.com/cn/docs/page/596 MovieClip序列帧动画
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample extension/game/display/MovieClip.ts
     * @language zh_CN
     */
    var MovieClip = (function (_super) {
        __extends(MovieClip, _super);
        //Construct Function
        /**
         * 创建新的 MovieClip 实例。创建 MovieClip 之后，调用舞台上的显示对象容器的addElement方法。
         * @param movieClipData {movieClipData} 被引用的 movieClipData 对象
         * @version Egret 2.4
         * @platform Web,Native
         */
        function MovieClip(movieClipData) {
            var _this = _super.call(this) || this;
            //Render Property
            _this.$bitmapData = null;
            //Render Property
            _this.offsetPoint = egret.Point.create(0, 0);
            //Data Property
            _this.$movieClipData = null;
            /**
             * @private
             */
            _this.frames = null;
            /**
             * @private
             */
            _this.$totalFrames = 0;
            /**
             * @version Egret 2.4
             * @platform Web,Native
             * @private
             */
            _this.frameLabels = null;
            /**
             * @private
             */
            _this.$frameLabelStart = 0;
            /**
             * @private
             */
            _this.$frameLabelEnd = 0;
            /**
             * @version Egret 2.4
             * @platform Web,Native
             * @private
             */
            _this.frameEvents = null;
            /**
             * @private
             */
            _this.frameIntervalTime = 0;
            /**
             * @private
             */
            _this.$eventPool = null;
            //Animation Property
            _this.$isPlaying = false;
            /**
             * @private
             */
            _this.isStopped = true;
            /**
             * @private
             */
            _this.playTimes = 0;
            /**
             * @private
             */
            _this.$currentFrameNum = 0;
            /**
             * @private
             */
            _this.$nextFrameNum = 1;
            /**
             * @private
             */
            _this.displayedKeyFrameNum = 0;
            /**
             * @private
             */
            _this.passedTime = 0;
            /**
             * @private
             */
            _this.$frameRate = NaN;
            /**
             * @private
             */
            _this.lastTime = 0;
            _this.$smoothing = egret.Bitmap.defaultSmoothing;
            _this.$renderNode = new egret.sys.BitmapNode();
            _this.setMovieClipData(movieClipData);
            return _this;
        }
        Object.defineProperty(MovieClip.prototype, "smoothing", {
            /**
             * Whether or not is smoothed when scaled.
             * @version Egret 3.0
             * @platform Web
             * @language en_US
             */
            /**
             * 控制在缩放时是否进行平滑处理。
             * @version Egret 3.0
             * @platform Web
             * @language zh_CN
             */
            get: function () {
                return this.$smoothing;
            },
            set: function (value) {
                value = !!value;
                if (value == this.$smoothing) {
                    return;
                }
                this.$smoothing = value;
                this.$invalidate();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         *
         */
        MovieClip.prototype.$init = function () {
            this.$reset();
            var movieClipData = this.$movieClipData;
            if (movieClipData && movieClipData.$isDataValid()) {
                this.frames = movieClipData.frames;
                this.$totalFrames = movieClipData.numFrames;
                this.frameLabels = movieClipData.labels;
                this.frameEvents = movieClipData.events;
                this.$frameRate = movieClipData.frameRate;
                this.frameIntervalTime = 1000 / this.$frameRate;
                this._initFrame();
            }
        };
        /**
         * @private
         *
         */
        MovieClip.prototype.$reset = function () {
            this.frames = null;
            this.playTimes = 0;
            this.$isPlaying = false;
            this.setIsStopped(true);
            this.$currentFrameNum = 0;
            this.$nextFrameNum = 1;
            this.displayedKeyFrameNum = 0;
            this.passedTime = 0;
            this.$eventPool = [];
        };
        /**
         * @private
         *
         */
        MovieClip.prototype._initFrame = function () {
            if (this.$movieClipData.$isTextureValid()) {
                this.advanceFrame();
                this.constructFrame();
            }
        };
        /**
         * @private
         */
        MovieClip.prototype.$render = function () {
            var texture = this.$bitmapData;
            if (texture) {
                var offsetX = Math.round(this.offsetPoint.x);
                var offsetY = Math.round(this.offsetPoint.y);
                var bitmapWidth = texture._bitmapWidth;
                var bitmapHeight = texture._bitmapHeight;
                var textureWidth = texture.$getTextureWidth();
                var textureHeight = texture.$getTextureHeight();
                var destW = Math.round(texture.$getScaleBitmapWidth());
                var destH = Math.round(texture.$getScaleBitmapHeight());
                var sourceWidth = texture._sourceWidth;
                var sourceHeight = texture._sourceHeight;
                egret.sys.BitmapNode.$updateTextureData(this.$renderNode, texture._bitmapData, texture._bitmapX, texture._bitmapY, bitmapWidth, bitmapHeight, offsetX, offsetY, textureWidth, textureHeight, destW, destH, sourceWidth, sourceHeight, null, egret.BitmapFillMode.SCALE, this.$smoothing);
            }
        };
        /**
         * @private
         */
        MovieClip.prototype.$measureContentBounds = function (bounds) {
            var texture = this.$bitmapData;
            if (texture) {
                var x = this.offsetPoint.x;
                var y = this.offsetPoint.y;
                var w = texture.$getTextureWidth();
                var h = texture.$getTextureHeight();
                bounds.setTo(x, y, w, h);
            }
            else {
                bounds.setEmpty();
            }
        };
        /**
         * @private
         *
         * @param stage
         * @param nestLevel
         */
        MovieClip.prototype.$onAddToStage = function (stage, nestLevel) {
            _super.prototype.$onAddToStage.call(this, stage, nestLevel);
            if (this.$isPlaying && this.$totalFrames > 1) {
                this.setIsStopped(false);
            }
        };
        /**
         * @private
         *
         */
        MovieClip.prototype.$onRemoveFromStage = function () {
            _super.prototype.$onRemoveFromStage.call(this);
            this.setIsStopped(true);
        };
        //Data Function
        /**
         * @private
         * 返回帧标签为指定字符串的FrameLabel对象
         * @param labelName {string} 帧标签名
         * @param ignoreCase {boolean} 是否忽略大小写，可选参数，默认false
         * @returns {egret.FrameLabel} FrameLabel对象
         */
        MovieClip.prototype.getFrameLabelByName = function (labelName, ignoreCase) {
            if (ignoreCase === void 0) { ignoreCase = false; }
            if (ignoreCase) {
                labelName = labelName.toLowerCase();
            }
            var frameLabels = this.frameLabels;
            if (frameLabels) {
                var outputFramelabel = null;
                for (var i = 0; i < frameLabels.length; i++) {
                    outputFramelabel = frameLabels[i];
                    if (ignoreCase ? outputFramelabel.name.toLowerCase() == labelName : outputFramelabel.name == labelName) {
                        return outputFramelabel;
                    }
                }
            }
            return null;
        };
        /**
         * @private
         * 根据帧标签，设置开始和结束的帧数
         * @param labelName {string} 帧标签名
         */
        MovieClip.prototype.getFrameStartEnd = function (labelName) {
            var frameLabels = this.frameLabels;
            if (frameLabels) {
                var outputFramelabel = null;
                for (var i = 0; i < frameLabels.length; i++) {
                    outputFramelabel = frameLabels[i];
                    if (labelName == outputFramelabel.name) {
                        this.$frameLabelStart = outputFramelabel.frame;
                        this.$frameLabelEnd = outputFramelabel.end;
                        break;
                    }
                }
            }
        };
        /**
         * @private
         * 返回指定序号的帧的FrameLabel对象
         * @param frame {number} 帧序号
         * @returns {egret.FrameLabel} FrameLabel对象
         */
        MovieClip.prototype.getFrameLabelByFrame = function (frame) {
            var frameLabels = this.frameLabels;
            if (frameLabels) {
                var outputFramelabel = null;
                for (var i = 0; i < frameLabels.length; i++) {
                    outputFramelabel = frameLabels[i];
                    if (outputFramelabel.frame == frame) {
                        return outputFramelabel;
                    }
                }
            }
            return null;
        };
        /**
         * @private
         * 返回指定序号的帧对应的FrameLabel对象，如果当前帧没有标签，则返回前面最近的有标签的帧的FrameLabel对象
         * @method egret.MovieClip#getFrameLabelForFrame
         * @param frame {number} 帧序号
         * @returns {egret.FrameLabel} FrameLabel对象
         */
        MovieClip.prototype.getFrameLabelForFrame = function (frame) {
            var outputFrameLabel = null;
            var tempFrameLabel = null;
            var frameLabels = this.frameLabels;
            if (frameLabels) {
                for (var i = 0; i < frameLabels.length; i++) {
                    tempFrameLabel = frameLabels[i];
                    if (tempFrameLabel.frame > frame) {
                        return outputFrameLabel;
                    }
                    outputFrameLabel = tempFrameLabel;
                }
            }
            return outputFrameLabel;
        };
        //Animation Function
        /**
         * 继续播放当前动画
         * @param playTimes {number} 播放次数。 参数为整数，可选参数，>=1：设定播放次数，<0：循环播放，默认值 0：不改变播放次数(MovieClip初始播放次数设置为1)，
         * @version Egret 2.4
         * @platform Web,Native
         */
        MovieClip.prototype.play = function (playTimes) {
            if (playTimes === void 0) { playTimes = 0; }
            this.$isPlaying = true;
            this.setPlayTimes(playTimes);
            if (this.$totalFrames > 1 && this.$stage) {
                this.setIsStopped(false);
            }
        };
        /**
         * 暂停播放动画
         * @version Egret 2.4
         * @platform Web,Native
         */
        MovieClip.prototype.stop = function () {
            this.$isPlaying = false;
            this.setIsStopped(true);
        };
        /**
         * 将播放头移到前一帧并停止
         * @version Egret 2.4
         * @platform Web,Native
         */
        MovieClip.prototype.prevFrame = function () {
            this.gotoAndStop(this.$currentFrameNum - 1);
        };
        /**
         * 跳到后一帧并停止
         * @version Egret 2.4
         * @platform Web,Native
         */
        MovieClip.prototype.nextFrame = function () {
            this.gotoAndStop(this.$currentFrameNum + 1);
        };
        /**
         * 将播放头移到指定帧并播放
         * @param frame {any} 指定帧的帧号或帧标签
         * @param playTimes {number} 播放次数。 参数为整数，可选参数，>=1：设定播放次数，<0：循环播放，默认值 0：不改变播放次数，
         * @version Egret 2.4
         * @platform Web,Native
         */
        MovieClip.prototype.gotoAndPlay = function (frame, playTimes) {
            if (playTimes === void 0) { playTimes = 0; }
            if (arguments.length == 0 || arguments.length > 2) {
                egret.$error(1022, "MovieClip.gotoAndPlay()");
            }
            if (typeof frame === "string") {
                this.getFrameStartEnd(frame);
            }
            else {
                this.$frameLabelStart = 0;
                this.$frameLabelEnd = 0;
            }
            this.play(playTimes);
            this.gotoFrame(frame);
        };
        /**
         * 将播放头移到指定帧并停止
         * @param frame {any} 指定帧的帧号或帧标签
         * @version Egret 2.4
         * @platform Web,Native
         */
        MovieClip.prototype.gotoAndStop = function (frame) {
            if (arguments.length != 1) {
                egret.$error(1022, "MovieClip.gotoAndStop()");
            }
            this.stop();
            this.gotoFrame(frame);
        };
        /**
         * @private
         *
         * @param frame
         */
        MovieClip.prototype.gotoFrame = function (frame) {
            var frameNum;
            if (typeof frame === "string") {
                frameNum = this.getFrameLabelByName(frame).frame;
            }
            else {
                frameNum = parseInt(frame + '', 10);
                if (frameNum != frame) {
                    egret.$error(1022, "Frame Label Not Found");
                }
            }
            if (frameNum < 1) {
                frameNum = 1;
            }
            else if (frameNum > this.$totalFrames) {
                frameNum = this.$totalFrames;
            }
            if (frameNum == this.$nextFrameNum) {
                return;
            }
            this.$nextFrameNum = frameNum;
            this.advanceFrame();
            this.constructFrame();
            this.handlePendingEvent();
        };
        /**
         * @private
         *
         * @param advancedTime
         * @returns
         */
        MovieClip.prototype.advanceTime = function (timeStamp) {
            var self = this;
            var advancedTime = timeStamp - self.lastTime;
            self.lastTime = timeStamp;
            var frameIntervalTime = self.frameIntervalTime;
            var currentTime = self.passedTime + advancedTime;
            self.passedTime = currentTime % frameIntervalTime;
            var num = currentTime / frameIntervalTime;
            if (num < 1) {
                return false;
            }
            while (num >= 1) {
                num--;
                self.$nextFrameNum++;
                if (self.$nextFrameNum > self.$totalFrames || (self.$frameLabelStart > 0 && self.$nextFrameNum > self.$frameLabelEnd)) {
                    if (self.playTimes == -1) {
                        self.$eventPool.push(egret.Event.LOOP_COMPLETE);
                        self.$nextFrameNum = 1;
                    }
                    else {
                        self.playTimes--;
                        if (self.playTimes > 0) {
                            self.$eventPool.push(egret.Event.LOOP_COMPLETE);
                            self.$nextFrameNum = 1;
                        }
                        else {
                            self.$nextFrameNum = self.$totalFrames;
                            self.$eventPool.push(egret.Event.COMPLETE);
                            self.stop();
                            break;
                        }
                    }
                }
                if (self.$currentFrameNum == self.$frameLabelEnd) {
                    self.$nextFrameNum = self.$frameLabelStart;
                }
                self.advanceFrame();
            }
            self.constructFrame();
            self.handlePendingEvent();
            return false;
        };
        /**
         * @private
         *
         */
        MovieClip.prototype.advanceFrame = function () {
            this.$currentFrameNum = this.$nextFrameNum;
            var event = this.frameEvents[this.$nextFrameNum];
            if (event && event != "") {
                egret.MovieClipEvent.dispatchMovieClipEvent(this, egret.MovieClipEvent.FRAME_LABEL, event);
            }
        };
        /**
         * @private
         *
         */
        MovieClip.prototype.constructFrame = function () {
            var currentFrameNum = this.$currentFrameNum;
            if (this.displayedKeyFrameNum == currentFrameNum) {
                return;
            }
            this.$bitmapData = this.$movieClipData.getTextureByFrame(currentFrameNum);
            this.$movieClipData.$getOffsetByFrame(currentFrameNum, this.offsetPoint);
            this.$invalidateContentBounds();
            this.displayedKeyFrameNum = currentFrameNum;
        };
        /**
         * @private
         *
         */
        MovieClip.prototype.$renderFrame = function () {
            this.$bitmapData = this.$movieClipData.getTextureByFrame(this.$currentFrameNum);
            this.$invalidateContentBounds();
        };
        /**
         * @private
         *
         */
        MovieClip.prototype.handlePendingEvent = function () {
            if (this.$eventPool.length != 0) {
                this.$eventPool.reverse();
                var eventPool = this.$eventPool;
                var length_1 = eventPool.length;
                var isComplete = false;
                var isLoopComplete = false;
                for (var i = 0; i < length_1; i++) {
                    var event_1 = eventPool.pop();
                    if (event_1 == egret.Event.LOOP_COMPLETE) {
                        isLoopComplete = true;
                    }
                    else if (event_1 == egret.Event.COMPLETE) {
                        isComplete = true;
                    }
                    else {
                        this.dispatchEventWith(event_1);
                    }
                }
                if (isLoopComplete) {
                    this.dispatchEventWith(egret.Event.LOOP_COMPLETE);
                }
                if (isComplete) {
                    this.dispatchEventWith(egret.Event.COMPLETE);
                }
            }
        };
        Object.defineProperty(MovieClip.prototype, "totalFrames", {
            //Properties
            /**
             * MovieClip 实例中帧的总数
             * @version Egret 2.4
             * @platform Web,Native
             */
            get: function () {
                return this.$totalFrames;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MovieClip.prototype, "currentFrame", {
            /**
             * MovieClip 实例当前播放的帧的序号
             * @version Egret 2.4
             * @platform Web,Native
             */
            get: function () {
                return this.$currentFrameNum;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MovieClip.prototype, "currentFrameLabel", {
            /**
             * MovieClip 实例当前播放的帧的标签。如果当前帧没有标签，则 currentFrameLabel返回null。
             * @version Egret 2.4
             * @platform Web,Native
             */
            get: function () {
                var label = this.getFrameLabelByFrame(this.$currentFrameNum);
                return label && label.name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MovieClip.prototype, "currentLabel", {
            /**
             * 当前播放的帧对应的标签，如果当前帧没有标签，则currentLabel返回包含标签的先前帧的标签。如果当前帧和先前帧都不包含标签，currentLabel返回null。
             * @version Egret 2.4
             * @platform Web,Native
             */
            get: function () {
                var label = this.getFrameLabelForFrame(this.$currentFrameNum);
                return label ? label.name : null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MovieClip.prototype, "frameRate", {
            /**
             * MovieClip 实例的帧频
             * @version Egret 2.4
             * @platform Web,Native
             */
            get: function () {
                return this.$frameRate;
            },
            set: function (value) {
                if (value == this.$frameRate) {
                    return;
                }
                this.$frameRate = value;
                this.frameIntervalTime = 1000 / this.$frameRate;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MovieClip.prototype, "isPlaying", {
            /**
             * MovieClip 实例当前是否正在播放
             * @version Egret 2.4
             * @platform Web,Native
             */
            get: function () {
                return this.$isPlaying;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MovieClip.prototype, "movieClipData", {
            /**
             * @version Egret 2.4
             * @platform Web,Native
             */
            get: function () {
                return this.$movieClipData;
            },
            /**
             * MovieClip数据源
             */
            set: function (value) {
                this.setMovieClipData(value);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         *
         * @param value
         */
        MovieClip.prototype.setMovieClipData = function (value) {
            if (this.$movieClipData == value) {
                return;
            }
            this.$movieClipData = value;
            this.$init();
        };
        /**
         * @private
         *
         * @param value
         */
        MovieClip.prototype.setPlayTimes = function (value) {
            if (value < 0 || value >= 1) {
                this.playTimes = value < 0 ? -1 : Math.floor(value);
            }
        };
        /**
         * @private
         *
         * @param value
         */
        MovieClip.prototype.setIsStopped = function (value) {
            if (this.isStopped == value) {
                return;
            }
            this.isStopped = value;
            if (value) {
                egret.ticker.$stopTick(this.advanceTime, this);
            }
            else {
                this.playTimes = this.playTimes == 0 ? 1 : this.playTimes;
                this.lastTime = egret.getTimer();
                egret.ticker.$startTick(this.advanceTime, this);
            }
        };
        return MovieClip;
    }(egret.DisplayObject));
    egret.MovieClip = MovieClip;
    __reflect(MovieClip.prototype, "egret.MovieClip");
})(egret || (egret = {}));
//# sourceMappingURL=MovieClip.js.map