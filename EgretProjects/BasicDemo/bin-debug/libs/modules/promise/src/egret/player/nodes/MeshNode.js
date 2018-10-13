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
         * Mesh 渲染节点
         */
        var MeshNode = (function (_super) {
            __extends(MeshNode, _super);
            function MeshNode() {
                var _this = _super.call(this) || this;
                /**
                 * 要绘制的位图
                 */
                _this.image = null;
                /**
                 * 控制在缩放时是否对位图进行平滑处理。
                 */
                _this.smoothing = true;
                /**
                 * 顶点索引。
                 */
                _this.bounds = new egret.Rectangle();
                /**
                 * 使用的混合模式
                 */
                _this.blendMode = null;
                /**
                 * 相对透明度
                 */
                _this.alpha = NaN;
                /**
                 * 颜色变换滤镜
                 */
                _this.filter = null;
                /**
                 * 翻转
                 */
                _this.rotated = false;
                _this.type = 7 /* MeshNode */;
                _this.vertices = [];
                _this.uvs = [];
                _this.indices = [];
                return _this;
            }
            /**
             * 绘制一次位图
             */
            MeshNode.prototype.drawMesh = function (sourceX, sourceY, sourceW, sourceH, drawX, drawY, drawW, drawH) {
                this.drawData.push(sourceX, sourceY, sourceW, sourceH, drawX, drawY, drawW, drawH);
                this.renderCount++;
            };
            /**
             * 在显示对象的$render()方法被调用前，自动清空自身的drawData数据。
             */
            MeshNode.prototype.cleanBeforeRender = function () {
                _super.prototype.cleanBeforeRender.call(this);
                this.image = null;
                this.matrix = null;
            };
            return MeshNode;
        }(sys.RenderNode));
        sys.MeshNode = MeshNode;
        __reflect(MeshNode.prototype, "egret.sys.MeshNode");
    })(sys = egret.sys || (egret.sys = {}));
})(egret || (egret = {}));
//# sourceMappingURL=MeshNode.js.map