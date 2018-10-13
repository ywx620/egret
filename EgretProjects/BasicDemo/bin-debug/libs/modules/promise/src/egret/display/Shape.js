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
     * This class is used to create lightweight shapes using the drawing application program interface (API). The Shape
     * class includes a graphics property, which lets you access methods from the Graphics class.
     * @see egret.Graphics
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/display/Shape.ts
     * @language en_US
     */
    /**
     * 此类用于使用绘图应用程序编程接口 (API) 创建简单形状。Shape 类含有 graphics 属性，通过该属性您可以访问各种矢量绘图方法。
     * @see egret.Graphics
     * @version Egret 2.4
     * @platform Web,Native
     * @includeExample egret/display/Shape.ts
     * @language zh_CN
     */
    var Shape = (function (_super) {
        __extends(Shape, _super);
        /**
         * Creates a new Shape object.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 创建一个 Shape 对象
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        function Shape() {
            var _this = _super.call(this) || this;
            _this.$graphics = new egret.Graphics();
            _this.$graphics.$setTarget(_this);
            return _this;
        }
        Object.defineProperty(Shape.prototype, "graphics", {
            /**
             * Specifies the Graphics object belonging to this Shape object, where vector drawing commands can occur.
             * @version Egret 2.4
             * @platform Web,Native
             * @language en_US
             */
            /**
             * 获取 Shape 中的 Graphics 对象。可通过此对象执行矢量绘图命令。
             * @version Egret 2.4
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this.$graphics;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         */
        Shape.prototype.$measureContentBounds = function (bounds) {
            this.$graphics.$measureContentBounds(bounds);
        };
        Shape.prototype.$hitTest = function (stageX, stageY) {
            var target = _super.prototype.$hitTest.call(this, stageX, stageY);
            if (target == this) {
                target = this.$graphics.$hitTest(stageX, stageY);
            }
            return target;
        };
        /**
         * @private
         */
        Shape.prototype.$onRemoveFromStage = function () {
            _super.prototype.$onRemoveFromStage.call(this);
            if (this.$graphics) {
                this.$graphics.$onRemoveFromStage();
            }
        };
        return Shape;
    }(egret.DisplayObject));
    egret.Shape = Shape;
    __reflect(Shape.prototype, "egret.Shape");
})(egret || (egret = {}));
//# sourceMappingURL=Shape.js.map