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
         * 组渲染节点,用于组合多个渲染节点
         */
        var GroupNode = (function (_super) {
            __extends(GroupNode, _super);
            function GroupNode() {
                var _this = _super.call(this) || this;
                _this.type = 4 /* GroupNode */;
                return _this;
            }
            GroupNode.prototype.addNode = function (node) {
                this.drawData.push(node);
            };
            /**
             * 覆盖父类方法，不自动清空缓存的绘图数据，改为手动调用clear()方法清空。
             * 这里只是想清空绘制命令，因此不调用super
             */
            GroupNode.prototype.cleanBeforeRender = function () {
                var data = this.drawData;
                for (var i = data.length - 1; i >= 0; i--) {
                    data[i].cleanBeforeRender();
                }
            };
            GroupNode.prototype.$getRenderCount = function () {
                var result = 0;
                var data = this.drawData;
                for (var i = data.length - 1; i >= 0; i--) {
                    result += data[i].$getRenderCount();
                }
                return result;
            };
            return GroupNode;
        }(sys.RenderNode));
        sys.GroupNode = GroupNode;
        __reflect(GroupNode.prototype, "egret.sys.GroupNode");
    })(sys = egret.sys || (egret.sys = {}));
})(egret || (egret = {}));
//# sourceMappingURL=GroupNode.js.map