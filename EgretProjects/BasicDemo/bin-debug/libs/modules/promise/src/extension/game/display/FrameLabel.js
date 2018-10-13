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
     * @private
     */
    var FrameLabel = (function (_super) {
        __extends(FrameLabel, _super);
        /**
         * @version Egret 2.4
         * @platform Web,Native
         */
        function FrameLabel(name, frame /*int*/, end /*int*/) {
            var _this = _super.call(this) || this;
            _this._name = name;
            _this._frame = frame | 0;
            if (end)
                _this._end = end | 0;
            return _this;
        }
        Object.defineProperty(FrameLabel.prototype, "name", {
            /**
             * Frame number
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 标签名
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FrameLabel.prototype, "frame", {
            /**
             * Frame serial number of the label
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 标签所在帧序号
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this._frame;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FrameLabel.prototype, "end", {
            /**
             * Frame serial number, the end of the label
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 标签对应的结束帧序号
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this._end;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Duplicate the current frame label object
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 复制当前帧标签对象
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        FrameLabel.prototype.clone = function () {
            return new FrameLabel(this._name, this._frame, this._end);
        };
        return FrameLabel;
    }(egret.EventDispatcher));
    egret.FrameLabel = FrameLabel;
    __reflect(FrameLabel.prototype, "egret.FrameLabel");
})(egret || (egret = {}));
//# sourceMappingURL=FrameLabel.js.map