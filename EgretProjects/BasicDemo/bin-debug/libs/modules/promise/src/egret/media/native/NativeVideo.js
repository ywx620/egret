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
    var native;
    (function (native) {
        /**
         * @private
         * @inheritDoc
         */
        var NativeVideo = (function (_super) {
            __extends(NativeVideo, _super);
            /**
             * @private
             * @inheritDoc
             */
            function NativeVideo(url, cache) {
                if (cache === void 0) { cache = true; }
                var _this = _super.call(this) || this;
                /**
                 * @private
                 */
                _this.loaded = false;
                /**
                 * @private
                 */
                _this.loading = false;
                /**
                 * @private
                 * */
                _this.loop = false;
                /**
                 * @private
                 * */
                _this.isPlayed = false;
                /**
                 * @private
                 * */
                _this.firstPlay = true;
                /**
                 * @inheritDoc
                 */
                _this.src = "";
                _this._fullscreen = true;
                _this._bitmapData = null;
                /**
                 * @inheritDoc
                 */
                _this.paused = false;
                /**
                 * @private
                 */
                _this.isAddToStage = false;
                /**
                 * @private
                 */
                _this.heightSet = 0;
                /**
                 * @private
                 */
                _this.widthSet = 0;
                _this.$renderNode = new egret.sys.BitmapNode();
                _this.cache = cache;
                if (!__global.Video) {
                    egret.$error(1044);
                }
                if (url) {
                    _this.load(url, cache);
                }
                return _this;
            }
            /**
             * @inheritDoc
             */
            NativeVideo.prototype.load = function (url, cache) {
                if (cache === void 0) { cache = true; }
                if (true && !url) {
                    egret.$error(3002);
                    return;
                }
                if (this.loading) {
                    return;
                }
                if (url.indexOf('/') == 0) {
                    url = url.slice(1, url.length);
                }
                this.src = url;
                this.loading = true;
                this.loaded = false;
                if (cache && !egret_native.isFileExists(url)) {
                    var self_1 = this;
                    var promise = egret.PromiseObject.create();
                    promise.onSuccessFunc = function () {
                        self_1.loadEnd();
                    };
                    promise.onErrorFunc = function () {
                        egret.$warn(1048);
                        self_1.dispatchEventWith(egret.IOErrorEvent.IO_ERROR);
                    };
                    egret_native.download(url, url, promise);
                }
                else {
                    this.loadEnd();
                }
            };
            /**
             * @private
             * */
            NativeVideo.prototype.loadEnd = function () {
                var video = new __global.Video(this.src);
                video['setVideoRect'](0, 0, 1, 1);
                video['setKeepRatio'](false);
                video.addEventListener("canplaythrough", onCanPlay);
                video.addEventListener("error", onVideoError);
                video.addEventListener("playing", onPlaying);
                video.load();
                var self = this;
                function onCanPlay() {
                    video['setVideoRect'](0, 0, 1, 1);
                    video.play();
                }
                function onPlaying() {
                    video['setVideoRect'](0, 0, 1, 1);
                    __global.setTimeout(function () {
                        video.pause();
                        if (self._fullscreen) {
                            video.fullScreen = true;
                        }
                        video.currentTime = 0;
                        self.originVideo = video;
                        self.loaded = true;
                        self.loading = false;
                        removeListeners();
                        self.dispatchEventWith(egret.Event.COMPLETE);
                        video.addEventListener('pause', function () {
                            self.paused = true;
                        });
                        video.addEventListener('playing', function () {
                            self.paused = false;
                        });
                        video.addEventListener('ended', function () {
                            self.dispatchEventWith(egret.Event.ENDED);
                            if (self.loop) {
                                self.play(0, true);
                            }
                        });
                    }, 1);
                }
                function onVideoError() {
                    removeListeners();
                    self.dispatchEventWith(egret.IOErrorEvent.IO_ERROR);
                }
                function removeListeners() {
                    video.removeEventListener("canplaythrough", onCanPlay);
                    video.removeEventListener("error", onVideoError);
                    video.removeEventListener("playing", onPlaying);
                }
            };
            /**
             * @inheritDoc
             */
            NativeVideo.prototype.play = function (startTime, loop) {
                var _this = this;
                if (loop === void 0) { loop = false; }
                this.loop = loop;
                if (!this.loaded) {
                    this.load(this.src);
                    this.once(egret.Event.COMPLETE, function (e) { return _this.play(startTime, loop); }, this);
                    return;
                }
                var haveStartTime = false;
                if (startTime != undefined && startTime != this.originVideo.currentTime) {
                    this.originVideo.currentTime = startTime || 0;
                    haveStartTime = true;
                }
                this.startPlay(haveStartTime);
            };
            /**
             * @private
             * */
            NativeVideo.prototype.startPlay = function (haveStartTime) {
                if (haveStartTime === void 0) { haveStartTime = false; }
                if (!this.isAddToStage || !this.loaded) {
                    return;
                }
                this.firstPlay = false;
                this.setVideoSize();
                this.isPlayed = true;
                if (!haveStartTime && this.paused && this.position != 0) {
                    this.originVideo['resume']();
                }
                else {
                    this.originVideo.play();
                }
                egret.startTick(this.markDirty, this);
            };
            /**
             * @private
             * */
            NativeVideo.prototype.stopPlay = function () {
                egret.stopTick(this.markDirty, this);
                if (this.isPlayed) {
                    this.isPlayed = false;
                    this.originVideo.pause();
                }
            };
            /**
             * @inheritDoc
             */
            NativeVideo.prototype.close = function () {
                if (this.originVideo) {
                    this.originVideo['destroy']();
                }
                this.loaded = false;
                this.loading = false;
                this.originVideo = null;
                this.loop = false;
                this.src = null;
            };
            Object.defineProperty(NativeVideo.prototype, "poster", {
                /**
                 * @inheritDoc
                 */
                get: function () {
                    return this.posterUrl;
                },
                /**
                 * @inheritDoc
                 */
                set: function (value) {
                    var _this = this;
                    this.posterUrl = value;
                    var loader = new native.NativeImageLoader();
                    loader.load(value);
                    loader.addEventListener(egret.Event.COMPLETE, function () {
                        _this.posterData = loader.data;
                        _this.markDirty();
                        _this.$invalidateContentBounds();
                    }, this);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(NativeVideo.prototype, "fullscreen", {
                /**
                 * @inheritDoc
                 */
                get: function () {
                    if (this.originVideo) {
                        return this.originVideo['fullScreen'];
                    }
                    return this._fullscreen;
                },
                /**
                 * @inheritDoc
                 */
                set: function (value) {
                    this._fullscreen = value;
                    if (this.originVideo) {
                        this.originVideo['fullScreen'] = value;
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(NativeVideo.prototype, "volume", {
                /**
                 * @inheritDoc
                 */
                get: function () {
                    if (!this.loaded)
                        return 0;
                    return this.originVideo.volume;
                },
                /**
                 * @inheritDoc
                 */
                set: function (value) {
                    if (!this.loaded)
                        return;
                    this.originVideo.volume = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(NativeVideo.prototype, "position", {
                /**
                 * @inheritDoc
                 */
                get: function () {
                    return this.originVideo.currentTime;
                },
                /**
                 * @inheritDoc
                 */
                set: function (value) {
                    if (this.loaded) {
                        this.originVideo.currentTime = value;
                    }
                },
                enumerable: true,
                configurable: true
            });
            /**
             * @inheritDoc
             */
            NativeVideo.prototype.pause = function () {
                this.originVideo.pause();
            };
            Object.defineProperty(NativeVideo.prototype, "bitmapData", {
                /**
                 * @inheritDoc
                 */
                get: function () {
                    return this._bitmapData;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(NativeVideo.prototype, "length", {
                /**
                 * @inheritDoc
                 */
                get: function () {
                    if (this.loaded) {
                        return this.originVideo.duration;
                    }
                    throw new Error("Video not loaded!");
                    //return 0;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * @inheritDoc
             */
            NativeVideo.prototype.$onAddToStage = function (stage, nestLevel) {
                this.isAddToStage = true;
                if (this.originVideo) {
                    this.originVideo["setVideoVisible"](true);
                }
                this.$invalidate();
                this.$invalidateContentBounds();
                _super.prototype.$onAddToStage.call(this, stage, nestLevel);
            };
            /**
             * @inheritDoc
             */
            NativeVideo.prototype.$onRemoveFromStage = function () {
                this.isAddToStage = false;
                if (this.originVideo) {
                    this.stopPlay();
                    this.originVideo["setVideoVisible"](false);
                }
                _super.prototype.$onRemoveFromStage.call(this);
            };
            /**
             * @private
             */
            NativeVideo.prototype.getPlayWidth = function () {
                if (!isNaN(this.widthSet)) {
                    return this.widthSet;
                }
                if (this.bitmapData) {
                    return this.bitmapData.width;
                }
                if (this.posterData) {
                    return this.posterData.width;
                }
                return NaN;
            };
            /**
             * @private
             */
            NativeVideo.prototype.getPlayHeight = function () {
                if (!isNaN(this.heightSet)) {
                    return this.heightSet;
                }
                if (this.bitmapData) {
                    return this.bitmapData.height;
                }
                if (this.posterData) {
                    return this.posterData.height;
                }
                return NaN;
            };
            /**
             * @private
             */
            NativeVideo.prototype.$setHeight = function (value) {
                this.heightSet = +value || 0;
                this.setVideoSize();
                this.$invalidate();
                this.$invalidateContentBounds();
                return _super.prototype.$setHeight.call(this, value);
            };
            /**
             * @private
             */
            NativeVideo.prototype.$setWidth = function (value) {
                this.widthSet = +value || 0;
                this.setVideoSize();
                this.$invalidate();
                this.$invalidateContentBounds();
                return _super.prototype.$setWidth.call(this, value);
            };
            /**
             * @inheritDoc
             */
            NativeVideo.prototype.$setX = function (value) {
                var result = _super.prototype.$setX.call(this, value);
                this.setVideoSize();
                return result;
            };
            /**
             * @inheritDoc
             */
            NativeVideo.prototype.$setY = function (value) {
                var result = _super.prototype.$setY.call(this, value);
                this.setVideoSize();
                return result;
            };
            /**
             * @private
             */
            NativeVideo.prototype.setVideoSize = function () {
                var video = this.originVideo;
                if (video && !this.fullscreen) {
                    if (!this.firstPlay) {
                        video['setVideoRect'](this.x, this.y, this.widthSet, this.heightSet);
                    }
                    else {
                        video['setVideoRect'](this.x, this.y, 0, 0);
                    }
                }
            };
            /**
             * @private
             */
            NativeVideo.prototype.$measureContentBounds = function (bounds) {
                var posterData = this.posterData;
                if (posterData) {
                    bounds.setTo(0, 0, this.getPlayWidth(), this.getPlayHeight());
                }
                else {
                    bounds.setEmpty();
                }
            };
            /**
             * @private
             */
            NativeVideo.prototype.$render = function () {
                var node = this.$renderNode;
                var posterData = this.posterData;
                var width = this.getPlayWidth();
                var height = this.getPlayHeight();
                if (width <= 0 || height <= 0) {
                    return;
                }
                if (!this.isPlayed && posterData) {
                    node.image = posterData;
                    node.drawImage(0, 0, posterData.width, posterData.height, 0, 0, width, height);
                }
                else if (this.isPlayed) {
                    this.setVideoSize();
                }
            };
            NativeVideo.prototype.markDirty = function () {
                this.$invalidate();
                return true;
            };
            return NativeVideo;
        }(egret.DisplayObject));
        native.NativeVideo = NativeVideo;
        __reflect(NativeVideo.prototype, "egret.native.NativeVideo", ["egret.Video", "egret.DisplayObject"]);
        if (__global.Video) {
            egret.Video = NativeVideo;
        }
        else {
            egret.$warn(1044);
        }
    })(native = egret.native || (egret.native = {}));
})(egret || (egret = {}));
//# sourceMappingURL=NativeVideo.js.map