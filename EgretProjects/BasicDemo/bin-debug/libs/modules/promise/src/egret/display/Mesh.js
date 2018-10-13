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
     * @private
     */
    var Mesh = (function (_super) {
        __extends(Mesh, _super);
        function Mesh(value) {
            var _this = _super.call(this, value) || this;
            /**
             * @private
             */
            _this._verticesDirty = true;
            _this._bounds = new egret.Rectangle();
            _this.$renderNode = new egret.sys.MeshNode();
            return _this;
        }
        /**
         * @private
         */
        Mesh.prototype.$render = function () {
            var values = this.$Bitmap;
            var image = values[1 /* image */];
            if (!image) {
                return;
            }
            var scale = egret.$TextureScaleFactor;
            var node = this.$renderNode;
            node.smoothing = values[10 /* smoothing */];
            node.image = image;
            node.imageWidth = values[13 /* sourceWidth */];
            node.imageHeight = values[14 /* sourceHeight */];
            var destW = !isNaN(values[11 /* explicitBitmapWidth */]) ? values[11 /* explicitBitmapWidth */] : values[8 /* textureWidth */];
            var destH = !isNaN(values[12 /* explicitBitmapHeight */]) ? values[12 /* explicitBitmapHeight */] : values[9 /* textureHeight */];
            var tsX = destW / values[8 /* textureWidth */];
            var tsY = destH / values[9 /* textureHeight */];
            var bitmapWidth = values[4 /* bitmapWidth */];
            var bitmapHeight = values[5 /* bitmapHeight */];
            node.drawMesh(values[2 /* bitmapX */], values[3 /* bitmapY */], bitmapWidth, bitmapHeight, values[6 /* offsetX */] * tsX, values[7 /* offsetY */] * tsY, tsX * bitmapWidth, tsY * bitmapHeight);
        };
        /**
         * @private
         */
        Mesh.prototype.$updateVertices = function () {
            this._verticesDirty = true;
            this.$invalidateContentBounds();
        };
        /**
         * @private
         */
        Mesh.prototype.$measureContentBounds = function (bounds) {
            if (this._verticesDirty) {
                this._verticesDirty = false;
                var node = this.$renderNode;
                var vertices = node.vertices;
                if (vertices.length) {
                    this._bounds.setTo(Number.MAX_VALUE, Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE);
                    for (var i = 0, l = vertices.length; i < l; i += 2) {
                        var x = vertices[i];
                        var y = vertices[i + 1];
                        if (this._bounds.x > x)
                            this._bounds.x = x;
                        if (this._bounds.width < x)
                            this._bounds.width = x;
                        if (this._bounds.y > y)
                            this._bounds.y = y;
                        if (this._bounds.height < y)
                            this._bounds.height = y;
                    }
                    this._bounds.width -= this._bounds.x;
                    this._bounds.height -= this._bounds.y;
                }
                else {
                    this._bounds.setTo(0, 0, 0, 0);
                }
                node.bounds.copyFrom(this._bounds);
            }
            bounds.copyFrom(this._bounds);
        };
        return Mesh;
    }(egret.Bitmap));
    egret.Mesh = Mesh;
    __reflect(Mesh.prototype, "egret.Mesh");
})(egret || (egret = {}));
//# sourceMappingURL=Mesh.js.map