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
    var sys;
    (function (sys) {
        /**
         * @private
         * 文本渲染节点
         */
        var TextNode = (function (_super) {
            __extends(TextNode, _super);
            function TextNode() {
                var _this = _super.call(this) || this;
                /**
                 * 颜色值
                 */
                _this.textColor = 0xFFFFFF;
                /**
                 * 描边颜色值
                 */
                _this.strokeColor = 0x000000;
                /**
                 * 字号
                 */
                _this.size = 30;
                /**
                 * 描边大小
                 */
                _this.stroke = 0;
                /**
                 * 是否加粗
                 */
                _this.bold = false;
                /**
                 * 是否倾斜
                 */
                _this.italic = false;
                /**
                 * 字体名称
                 */
                _this.fontFamily = "Arial";
                /**
                 * 脏渲染标记
                 */
                _this.dirtyRender = true;
                _this.type = 2 /* TextNode */;
                return _this;
            }
            /**
             * 绘制一行文本
             */
            TextNode.prototype.drawText = function (x, y, text, format) {
                this.drawData.push(x, y, text, format);
                this.renderCount++;
                this.dirtyRender = true;
            };
            /**
             * 在显示对象的$render()方法被调用前，自动清空自身的drawData数据。
             */
            TextNode.prototype.cleanBeforeRender = function () {
                _super.prototype.cleanBeforeRender.call(this);
            };
            /**
             * 清除非绘制的缓存数据
             */
            TextNode.prototype.clean = function () {
                if (this.$texture) {
                    egret.WebGLUtils.deleteWebGLTexture(this.$texture);
                    this.$texture = null;
                    this.dirtyRender = true;
                }
            };
            return TextNode;
        }(sys.RenderNode));
        sys.TextNode = TextNode;
        __reflect(TextNode.prototype, "egret.sys.TextNode");
    })(sys = egret.sys || (egret.sys = {}));
})(egret || (egret = {}));
//# sourceMappingURL=TextNode.js.map