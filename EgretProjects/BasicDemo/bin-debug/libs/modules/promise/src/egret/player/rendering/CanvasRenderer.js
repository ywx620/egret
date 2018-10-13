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
var egret;
(function (egret) {
    var blendModes = ["source-over", "lighter", "destination-out"];
    var defaultCompositeOp = "source-over";
    var BLACK_COLOR = "#000000";
    var CAPS_STYLES = { none: 'butt', square: 'square', round: 'round' };
    var renderBufferPool = []; //渲染缓冲区对象池
    var renderBufferPool_Filters = []; //滤镜缓冲区对象池
    /**
     * @private
     * Canvas渲染器
     */
    var CanvasRenderer = (function () {
        function CanvasRenderer() {
            this.nestLevel = 0; //渲染的嵌套层次，0表示在调用堆栈的最外层。
            this.renderingMask = false;
        }
        /**
         * 渲染一个显示对象
         * @param displayObject 要渲染的显示对象
         * @param buffer 渲染缓冲
         * @param matrix 要对显示对象整体叠加的变换矩阵
         * @param dirtyList 脏矩形列表
         * @param forRenderTexture 绘制目标是RenderTexture的标志
         * @returns drawCall触发绘制的次数
         */
        CanvasRenderer.prototype.render = function (displayObject, buffer, matrix, dirtyList, forRenderTexture) {
            this.nestLevel++;
            var context = buffer.context;
            var root = forRenderTexture ? displayObject : null;
            //绘制显示对象
            var drawCall = this.drawDisplayObject(displayObject, context, dirtyList, matrix, null, null, root);
            this.nestLevel--;
            if (this.nestLevel === 0) {
                //最大缓存6个渲染缓冲
                if (renderBufferPool.length > 6) {
                    renderBufferPool.length = 6;
                }
                var length_1 = renderBufferPool.length;
                for (var i = 0; i < length_1; i++) {
                    renderBufferPool[i].resize(0, 0);
                }
                if (renderBufferPool_Filters.length > 1) {
                    renderBufferPool_Filters.length = 1;
                    renderBufferPool_Filters[0].resize(0, 0);
                }
            }
            return drawCall;
        };
        /**
         * @private
         * 绘制一个显示对象
         */
        CanvasRenderer.prototype.drawDisplayObject = function (displayObject, context, dirtyList, matrix, displayList, clipRegion, root) {
            var drawCalls = 0;
            var node;
            if (displayList && !root) {
                if (displayList.isDirty ||
                    displayList.$canvasScaleX != egret.sys.DisplayList.$canvasScaleX ||
                    displayList.$canvasScaleY != egret.sys.DisplayList.$canvasScaleY) {
                    drawCalls += displayList.drawToSurface();
                }
                node = displayList.$renderNode;
            }
            else {
                node = displayObject.$getRenderNode();
            }
            if (node) {
                if (dirtyList) {
                    var renderRegion = node.renderRegion;
                    if (clipRegion && !clipRegion.intersects(renderRegion)) {
                        node.needRedraw = false;
                    }
                    else if (!node.needRedraw) {
                        var l = dirtyList.length;
                        for (var j = 0; j < l; j++) {
                            if (renderRegion.intersects(dirtyList[j])) {
                                node.needRedraw = true;
                                break;
                            }
                        }
                    }
                }
                else {
                    node.needRedraw = true;
                }
                if (node.needRedraw) {
                    var renderAlpha = void 0;
                    var m = void 0;
                    if (root) {
                        renderAlpha = displayObject.$getConcatenatedAlphaAt(root, displayObject.$getConcatenatedAlpha());
                        m = egret.Matrix.create().copyFrom(displayObject.$getConcatenatedMatrix());
                        displayObject.$getConcatenatedMatrixAt(root, m);
                    }
                    else {
                        renderAlpha = node.renderAlpha;
                        m = egret.Matrix.create().copyFrom(node.renderMatrix);
                    }
                    matrix.$preMultiplyInto(m, m);
                    context.setTransform(m.a, m.b, m.c, m.d, m.tx, m.ty);
                    egret.Matrix.release(m);
                    context.globalAlpha = renderAlpha;
                    drawCalls += this.renderNode(node, context);
                    node.needRedraw = false;
                }
            }
            if (displayList && !root) {
                return drawCalls;
            }
            var children = displayObject.$children;
            if (children) {
                var length_2 = children.length;
                for (var i = 0; i < length_2; i++) {
                    var child = children[i];
                    if (!child.$visible || child.$alpha <= 0 || child.$maskedObject) {
                        continue;
                    }
                    var filters = child.$getFilters();
                    if (filters && filters.length > 0) {
                        drawCalls += this.drawWithFilter(child, context, dirtyList, matrix, clipRegion, root);
                    }
                    else if ((child.$blendMode !== 0 ||
                        (child.$mask && (child.$mask.$parentDisplayList || root)))) {
                        drawCalls += this.drawWithClip(child, context, dirtyList, matrix, clipRegion, root);
                    }
                    else if (child.$scrollRect || child.$maskRect) {
                        drawCalls += this.drawWithScrollRect(child, context, dirtyList, matrix, clipRegion, root);
                    }
                    else {
                        if (child["isFPS"]) {
                            this.drawDisplayObject(child, context, dirtyList, matrix, child.$displayList, clipRegion, root);
                        }
                        else {
                            drawCalls += this.drawDisplayObject(child, context, dirtyList, matrix, child.$displayList, clipRegion, root);
                        }
                    }
                }
            }
            return drawCalls;
        };
        /**
         * @private
         */
        CanvasRenderer.prototype.drawWithFilter = function (displayObject, context, dirtyList, matrix, clipRegion, root) {
            if (egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE) {
                var drawCalls_1 = 0;
                var filters_1 = displayObject.$getFilters();
                var hasBlendMode_1 = (displayObject.$blendMode !== 0);
                var compositeOp_1;
                if (hasBlendMode_1) {
                    compositeOp_1 = blendModes[displayObject.$blendMode];
                    if (!compositeOp_1) {
                        compositeOp_1 = defaultCompositeOp;
                    }
                }
                var bounds_1 = displayObject.$getOriginalBounds();
                if (bounds_1.width <= 0 || bounds_1.height <= 0) {
                    return drawCalls_1;
                }
                if (filters_1.length == 1 && filters_1[0].type == "colorTransform" && !displayObject.$children) {
                    if (hasBlendMode_1) {
                        context.globalCompositeOperation = compositeOp_1;
                    }
                    context.setGlobalShader(filters_1[0]);
                    if (displayObject.$mask && (displayObject.$mask.$parentDisplayList || root)) {
                        drawCalls_1 += this.drawWithClip(displayObject, context, dirtyList, matrix, clipRegion, root);
                    }
                    else if (displayObject.$scrollRect || displayObject.$maskRect) {
                        drawCalls_1 += this.drawWithScrollRect(displayObject, context, dirtyList, matrix, clipRegion, root);
                    }
                    else {
                        drawCalls_1 += this.drawDisplayObject(displayObject, context, dirtyList, matrix, displayObject.$displayList, clipRegion, root);
                    }
                    context.setGlobalShader(null);
                    if (hasBlendMode_1) {
                        context.globalCompositeOperation = defaultCompositeOp;
                    }
                    return drawCalls_1;
                }
                // 获取显示对象的链接矩阵
                var displayMatrix_1 = egret.Matrix.create();
                displayMatrix_1.copyFrom(displayObject.$getConcatenatedMatrix());
                if (root) {
                    displayObject.$getConcatenatedMatrixAt(root, displayMatrix_1);
                }
                // 获取显示对象的矩形区域
                var region_1;
                region_1 = egret.sys.Region.create();
                region_1.updateRegion(bounds_1, displayMatrix_1);
                // 为显示对象创建一个新的buffer
                // todo 这里应该计算 region.x region.y
                var displayBuffer_1 = this.createRenderBuffer(region_1.width, region_1.height);
                displayBuffer_1.context.setTransform(1, 0, 0, 1, -region_1.minX, -region_1.minY);
                var offsetM_1 = egret.Matrix.create().setTo(1, 0, 0, 1, -region_1.minX, -region_1.minY);
                if (displayObject.$mask && (displayObject.$mask.$parentDisplayList || root)) {
                    drawCalls_1 += this.drawWithClip(displayObject, displayBuffer_1.context, dirtyList, offsetM_1, region_1, root);
                }
                else if (displayObject.$scrollRect || displayObject.$maskRect) {
                    drawCalls_1 += this.drawWithScrollRect(displayObject, displayBuffer_1.context, dirtyList, offsetM_1, region_1, root);
                }
                else {
                    drawCalls_1 += this.drawDisplayObject(displayObject, displayBuffer_1.context, dirtyList, offsetM_1, displayObject.$displayList, region_1, root);
                }
                egret.Matrix.release(offsetM_1);
                //绘制结果到屏幕
                if (drawCalls_1 > 0) {
                    if (hasBlendMode_1) {
                        context.globalCompositeOperation = compositeOp_1;
                    }
                    drawCalls_1++;
                    context.globalAlpha = 1;
                    context.setTransform(1, 0, 0, 1, region_1.minX + matrix.tx, region_1.minY + matrix.ty);
                    // 绘制结果的时候，应用滤镜
                    context.setGlobalShader(filters_1[0]);
                    context.drawImage(displayBuffer_1.surface, 0, 0, displayBuffer_1.width, displayBuffer_1.height, 0, 0, displayBuffer_1.width, displayBuffer_1.height);
                    context.setGlobalShader(null);
                    if (hasBlendMode_1) {
                        context.globalCompositeOperation = defaultCompositeOp;
                    }
                }
                renderBufferPool.push(displayBuffer_1);
                egret.sys.Region.release(region_1);
                egret.Matrix.release(displayMatrix_1);
                return drawCalls_1;
            }
            var drawCalls = 0;
            var filters = displayObject.$getFilters();
            var filtersLen = filters.length;
            var hasBlendMode = (displayObject.$blendMode !== 0);
            var compositeOp;
            if (hasBlendMode) {
                compositeOp = blendModes[displayObject.$blendMode];
                if (!compositeOp) {
                    compositeOp = defaultCompositeOp;
                }
            }
            var bounds = displayObject.$getOriginalBounds();
            if (bounds.width <= 0 || bounds.height <= 0) {
                return drawCalls;
            }
            // 获取显示对象的链接矩阵
            var displayMatrix = egret.Matrix.create();
            displayMatrix.copyFrom(displayObject.$getConcatenatedMatrix());
            if (root) {
                displayObject.$getConcatenatedMatrixAt(root, displayMatrix);
            }
            // 获取显示对象的矩形区域
            var region;
            region = egret.sys.Region.create();
            region.updateRegion(bounds, displayMatrix);
            // 为显示对象创建一个新的buffer
            // todo 这里应该计算 region.x region.y
            var displayBuffer = this.createRenderBuffer(region.width * matrix.a, region.height * matrix.d, true);
            var displayContext = displayBuffer.context;
            displayContext.setTransform(matrix.a, 0, 0, matrix.d, -region.minX * matrix.a, -region.minY * matrix.d);
            var offsetM = egret.Matrix.create().setTo(matrix.a, 0, 0, matrix.d, -region.minX * matrix.a, -region.minY * matrix.d);
            //todo 可以优化减少draw次数
            if (displayObject.$mask && (displayObject.$mask.$parentDisplayList || root)) {
                drawCalls += this.drawWithClip(displayObject, displayContext, dirtyList, offsetM, region, root);
            }
            else if (displayObject.$scrollRect || displayObject.$maskRect) {
                drawCalls += this.drawWithScrollRect(displayObject, displayContext, dirtyList, offsetM, region, root);
            }
            else {
                drawCalls += this.drawDisplayObject(displayObject, displayContext, dirtyList, offsetM, displayObject.$displayList, region, root);
            }
            egret.Matrix.release(offsetM);
            //绘制结果到屏幕
            if (drawCalls > 0) {
                if (hasBlendMode) {
                    context.globalCompositeOperation = compositeOp;
                }
                drawCalls++;
                // 应用滤镜
                var imageData = displayContext.getImageData(0, 0, displayBuffer.surface.width, displayBuffer.surface.height);
                for (var i = 0; i < filtersLen; i++) {
                    var filter = filters[i];
                    if (filter.type == "colorTransform") {
                        colorFilter(imageData.data, displayBuffer.surface.width, displayBuffer.surface.height, filter.$matrix);
                    }
                    else if (filter.type == "blur") {
                        blurFilter(imageData.data, displayBuffer.surface.width, displayBuffer.surface.height, filter.$blurX, filter.$blurY);
                    }
                    else if (filter.type == "glow") {
                        var r = filter.$red;
                        var g = filter.$green;
                        var b = filter.$blue;
                        var a = filter.$alpha;
                        if (filter.$inner || filter.$knockout || filter.$hideObject) {
                            dropShadowFilter2(imageData.data, displayBuffer.surface.width, displayBuffer.surface.height, [r / 255, g / 255, b / 255, a], filter.$blurX, filter.$blurY, filter.$angle ? (filter.$angle / 180 * Math.PI) : 0, filter.$distance || 0, filter.$strength, filter.$inner ? 1 : 0, filter.$knockout ? 0 : 1, filter.$hideObject ? 1 : 0);
                        }
                        else {
                            // 如果没有高级效果，使用性能比较高的方式
                            dropShadowFilter(imageData.data, displayBuffer.surface.width, displayBuffer.surface.height, [r / 255, g / 255, b / 255, a], filter.$blurX, filter.$blurY, filter.$angle ? (filter.$angle / 180 * Math.PI) : 0, filter.$distance || 0, filter.$strength);
                        }
                    }
                    else if (filter.type == "custom") {
                        // 目前canvas渲染不支持自定义滤镜
                    }
                }
                displayContext.putImageData(imageData, 0, 0);
                context.globalAlpha = 1;
                context.setTransform(1, 0, 0, 1, (region.minX + matrix.tx) * matrix.a, (region.minY + matrix.ty) * matrix.d);
                // 绘制结果的时候，应用滤镜
                context.drawImage(displayBuffer.surface, 0, 0);
                if (hasBlendMode) {
                    context.globalCompositeOperation = defaultCompositeOp;
                }
            }
            renderBufferPool_Filters.push(displayBuffer);
            egret.sys.Region.release(region);
            egret.Matrix.release(displayMatrix);
            return drawCalls;
        };
        /**
         * @private
         */
        CanvasRenderer.prototype.drawWithClip = function (displayObject, context, dirtyList, matrix, clipRegion, root) {
            var drawCalls = 0;
            var hasBlendMode = (displayObject.$blendMode !== 0);
            var compositeOp;
            if (hasBlendMode) {
                compositeOp = blendModes[displayObject.$blendMode];
                if (!compositeOp) {
                    compositeOp = defaultCompositeOp;
                }
            }
            var scrollRect = displayObject.$scrollRect ? displayObject.$scrollRect : displayObject.$maskRect;
            var mask = displayObject.$mask;
            var maskRenderNode;
            if (mask) {
                maskRenderNode = mask.$getRenderNode();
                if (maskRenderNode) {
                    var maskRenderMatrix = maskRenderNode.renderMatrix;
                    //遮罩scaleX或scaleY为0，放弃绘制
                    if ((maskRenderMatrix.a == 0 && maskRenderMatrix.b == 0) || (maskRenderMatrix.c == 0 && maskRenderMatrix.d == 0)) {
                        return drawCalls;
                    }
                }
            }
            //if (mask && !mask.$parentDisplayList) {
            //    mask = null; //如果遮罩不在显示列表中，放弃绘制遮罩。
            //}
            //计算scrollRect和mask的clip区域是否需要绘制，不需要就直接返回，跳过所有子项的遍历。
            var maskRegion;
            var displayMatrix = egret.Matrix.create();
            displayMatrix.copyFrom(displayObject.$getConcatenatedMatrix());
            if (root) {
                displayObject.$getConcatenatedMatrixAt(root, displayMatrix);
            }
            else if (displayObject.$parentDisplayList) {
                var displayRoot = displayObject.$parentDisplayList.root;
                if (displayRoot !== displayObject.$stage) {
                    displayObject.$getConcatenatedMatrixAt(displayRoot, displayMatrix);
                }
            }
            var bounds;
            if (mask) {
                bounds = mask.$getOriginalBounds();
                maskRegion = egret.sys.Region.create();
                var m = egret.Matrix.create();
                m.copyFrom(mask.$getConcatenatedMatrix());
                if (root) {
                    mask.$getConcatenatedMatrixAt(root, m);
                }
                maskRegion.updateRegion(bounds, m);
                egret.Matrix.release(m);
            }
            var region;
            if (scrollRect) {
                region = egret.sys.Region.create();
                region.updateRegion(scrollRect, displayMatrix);
            }
            if (region && maskRegion) {
                region.intersect(maskRegion);
                egret.sys.Region.release(maskRegion);
            }
            else if (!region && maskRegion) {
                region = maskRegion;
            }
            if (region) {
                if (region.isEmpty() || (clipRegion && !clipRegion.intersects(region))) {
                    egret.sys.Region.release(region);
                    egret.Matrix.release(displayMatrix);
                    return drawCalls;
                }
            }
            else {
                region = egret.sys.Region.create();
                bounds = displayObject.$getOriginalBounds();
                region.updateRegion(bounds, displayMatrix);
            }
            if (region.width <= 0 || region.height <= 0) {
                return drawCalls;
            }
            var found = false;
            if (!dirtyList) {
                found = true;
            }
            else {
                var l = dirtyList.length;
                for (var j = 0; j < l; j++) {
                    if (region.intersects(dirtyList[j])) {
                        found = true;
                        break;
                    }
                }
            }
            if (!found) {
                egret.sys.Region.release(region);
                egret.Matrix.release(displayMatrix);
                return drawCalls;
            }
            //没有遮罩,同时显示对象没有子项
            if (!mask && (!displayObject.$children || displayObject.$children.length == 0)) {
                if (scrollRect) {
                    var m = displayMatrix;
                    context.save();
                    matrix.$preMultiplyInto(m, m);
                    context.setTransform(m.a, m.b, m.c, m.d, m.tx, m.ty);
                    context.beginPath();
                    context.rect(scrollRect.x, scrollRect.y, scrollRect.width, scrollRect.height);
                    context.clip();
                }
                if (hasBlendMode) {
                    context.globalCompositeOperation = compositeOp;
                }
                drawCalls += this.drawDisplayObject(displayObject, context, dirtyList, matrix, displayObject.$displayList, clipRegion, root);
                if (hasBlendMode) {
                    context.globalCompositeOperation = defaultCompositeOp;
                }
                if (scrollRect) {
                    context.restore();
                }
                egret.sys.Region.release(region);
                egret.Matrix.release(displayMatrix);
                return drawCalls;
            }
            //遮罩是单纯的填充图形,且alpha为1,性能优化
            //todo 平台差异
            if (mask && egret.Capabilities.$runtimeType == egret.RuntimeType.WEB && (!mask.$children || mask.$children.length == 0) &&
                maskRenderNode && maskRenderNode.type == 3 /* GraphicsNode */ &&
                maskRenderNode.drawData.length == 1 &&
                maskRenderNode.drawData[0].type == 1 /* Fill */ &&
                maskRenderNode.drawData[0].fillAlpha == 1) {
                this.renderingMask = true;
                context.save();
                var calls = this.drawDisplayObject(mask, context, dirtyList, matrix, mask.$displayList, clipRegion, root);
                this.renderingMask = false;
                if (scrollRect) {
                    var m = displayMatrix;
                    matrix.$preMultiplyInto(m, m);
                    context.setTransform(m.a, m.b, m.c, m.d, m.tx, m.ty);
                    context.beginPath();
                    context.rect(scrollRect.x, scrollRect.y, scrollRect.width, scrollRect.height);
                    context.clip();
                }
                calls += this.drawDisplayObject(displayObject, context, dirtyList, matrix, displayObject.$displayList, clipRegion, root);
                context.restore();
                egret.sys.Region.release(region);
                egret.Matrix.release(displayMatrix);
                return calls;
            }
            //todo 若显示对象是容器，同时子项有混合模式，则需要先绘制背景到displayBuffer并清除背景区域
            //绘制显示对象自身，若有scrollRect，应用clip
            var displayBuffer = this.createRenderBuffer(region.width * matrix.a, region.height * matrix.d);
            var displayContext = displayBuffer.context;
            if (!displayContext) {
                drawCalls += this.drawDisplayObject(displayObject, context, dirtyList, matrix, displayObject.$displayList, clipRegion, root);
                egret.sys.Region.release(region);
                egret.Matrix.release(displayMatrix);
                return drawCalls;
            }
            displayContext.setTransform(matrix.a, 0, 0, matrix.d, -region.minX * matrix.a, -region.minY * matrix.d);
            var offsetM = egret.Matrix.create().setTo(matrix.a, 0, 0, matrix.d, -region.minX * matrix.a, -region.minY * matrix.d);
            drawCalls += this.drawDisplayObject(displayObject, displayContext, dirtyList, offsetM, displayObject.$displayList, region, root);
            //绘制遮罩
            if (mask) {
                //如果只有一次绘制或是已经被cache直接绘制到displayContext
                if (egret.Capabilities.$runtimeType == egret.RuntimeType.WEB && maskRenderNode && maskRenderNode.$getRenderCount() == 1 || mask.$displayList) {
                    displayContext.globalCompositeOperation = "destination-in";
                    drawCalls += this.drawDisplayObject(mask, displayContext, dirtyList, offsetM, mask.$displayList, region, root);
                }
                else {
                    var maskBuffer = this.createRenderBuffer(region.width * matrix.a, region.height * matrix.d);
                    var maskContext = maskBuffer.context;
                    if (!maskContext) {
                        drawCalls += this.drawDisplayObject(displayObject, context, dirtyList, matrix, displayObject.$displayList, clipRegion, root);
                        renderBufferPool.push(displayBuffer);
                        egret.sys.Region.release(region);
                        egret.Matrix.release(displayMatrix);
                        return drawCalls;
                    }
                    maskContext.setTransform(matrix.a, 0, 0, matrix.d, -region.minX * matrix.a, -region.minY * matrix.d);
                    offsetM = egret.Matrix.create().setTo(matrix.a, 0, 0, matrix.d, -region.minX * matrix.a, -region.minY * matrix.d);
                    drawCalls += this.drawDisplayObject(mask, maskContext, dirtyList, offsetM, mask.$displayList, region, root);
                    displayContext.globalCompositeOperation = "destination-in";
                    displayContext.setTransform(1, 0, 0, 1, 0, 0);
                    displayContext.globalAlpha = 1;
                    displayContext.drawImage(maskBuffer.surface, 0, 0);
                    renderBufferPool.push(maskBuffer);
                }
            }
            egret.Matrix.release(offsetM);
            //绘制结果到屏幕
            if (drawCalls > 0) {
                drawCalls++;
                if (hasBlendMode) {
                    context.globalCompositeOperation = compositeOp;
                }
                if (scrollRect) {
                    var m = displayMatrix;
                    context.save();
                    matrix.$preMultiplyInto(m, m);
                    context.setTransform(m.a, m.b, m.c, m.d, m.tx, m.ty);
                    context.beginPath();
                    context.rect(scrollRect.x, scrollRect.y, scrollRect.width, scrollRect.height);
                    context.clip();
                }
                context.globalAlpha = 1;
                context.setTransform(1, 0, 0, 1, (region.minX + matrix.tx) * matrix.a, (region.minY + matrix.ty) * matrix.d);
                context.drawImage(displayBuffer.surface, 0, 0);
                if (scrollRect) {
                    context.restore();
                }
                if (hasBlendMode) {
                    context.globalCompositeOperation = defaultCompositeOp;
                }
            }
            renderBufferPool.push(displayBuffer);
            egret.sys.Region.release(region);
            egret.Matrix.release(displayMatrix);
            return drawCalls;
        };
        /**
         * @private
         */
        CanvasRenderer.prototype.drawWithScrollRect = function (displayObject, context, dirtyList, matrix, clipRegion, root) {
            var drawCalls = 0;
            var scrollRect = displayObject.$scrollRect ? displayObject.$scrollRect : displayObject.$maskRect;
            if (scrollRect.isEmpty()) {
                return drawCalls;
            }
            var m = egret.Matrix.create();
            m.copyFrom(displayObject.$getConcatenatedMatrix());
            if (root) {
                displayObject.$getConcatenatedMatrixAt(root, m);
            }
            else if (displayObject.$parentDisplayList) {
                var displayRoot = displayObject.$parentDisplayList.root;
                if (displayRoot !== displayObject.$stage) {
                    displayObject.$getConcatenatedMatrixAt(displayRoot, m);
                }
            }
            var region = egret.sys.Region.create();
            region.updateRegion(scrollRect, m);
            if (region.isEmpty() || (clipRegion && !clipRegion.intersects(region))) {
                egret.sys.Region.release(region);
                egret.Matrix.release(m);
                return drawCalls;
            }
            var found = false;
            if (!dirtyList) {
                found = true;
            }
            else {
                var l = dirtyList.length;
                for (var j = 0; j < l; j++) {
                    if (region.intersects(dirtyList[j])) {
                        found = true;
                        break;
                    }
                }
            }
            if (!found) {
                egret.sys.Region.release(region);
                egret.Matrix.release(m);
                return drawCalls;
            }
            //绘制显示对象自身
            context.save();
            matrix.$preMultiplyInto(m, m);
            context.setTransform(m.a, m.b, m.c, m.d, m.tx, m.ty);
            context.beginPath();
            context.rect(scrollRect.x, scrollRect.y, scrollRect.width, scrollRect.height);
            context.clip();
            drawCalls += this.drawDisplayObject(displayObject, context, dirtyList, matrix, displayObject.$displayList, region, root);
            context.restore();
            egret.sys.Region.release(region);
            egret.Matrix.release(m);
            return drawCalls;
        };
        /**
         * 将一个RenderNode对象绘制到渲染缓冲
         * @param node 要绘制的节点
         * @param buffer 渲染缓冲
         * @param matrix 要叠加的矩阵
         * @param forHitTest 绘制结果是用于碰撞检测。若为true，当渲染GraphicsNode时，会忽略透明度样式设置，全都绘制为不透明的。
         */
        CanvasRenderer.prototype.drawNodeToBuffer = function (node, buffer, matrix, forHitTest) {
            var context = buffer.context;
            context.setTransform(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
            this.renderNode(node, context, forHitTest);
        };
        /**
         * @private
         */
        CanvasRenderer.prototype.renderNode = function (node, context, forHitTest) {
            var drawCalls = 0;
            switch (node.type) {
                case 1 /* BitmapNode */:
                    drawCalls = this.renderBitmap(node, context);
                    break;
                case 2 /* TextNode */:
                    drawCalls = 1;
                    this.renderText(node, context);
                    break;
                case 3 /* GraphicsNode */:
                    drawCalls = this.renderGraphics(node, context, forHitTest);
                    break;
                case 4 /* GroupNode */:
                    drawCalls = this.renderGroup(node, context);
                    break;
                case 6 /* SetAlphaNode */:
                    context.globalAlpha = node.drawData[0];
                    break;
                case 7 /* MeshNode */:
                    drawCalls = this.renderMesh(node, context);
                    break;
            }
            return drawCalls;
        };
        /**
         * render mesh
         */
        CanvasRenderer.prototype.renderMesh = function (node, context) {
            if (egret.Capabilities.runtimeType != egret.RuntimeType.NATIVE) {
                return 0;
            }
            var image = node.image;
            var data = node.drawData;
            var length = data.length;
            var pos = 0;
            var m = node.matrix;
            var blendMode = node.blendMode;
            var alpha = node.alpha;
            var saved = false;
            if (m) {
                context.saveTransform();
                context.transform(m.a, m.b, m.c, m.d, m.tx, m.ty);
            }
            if (blendMode) {
                context.globalCompositeOperation = blendModes[blendMode];
            }
            var originAlpha;
            if (alpha == alpha) {
                originAlpha = context.globalAlpha;
                context.globalAlpha *= alpha;
            }
            var drawCalls = 0;
            var filter = node.filter;
            if (filter) {
                egret_native.Graphics.setGlobalShader(filter);
                while (pos < length) {
                    drawCalls++;
                    context.drawMesh(image.source, data[pos++], data[pos++], data[pos++], data[pos++], data[pos++], data[pos++], data[pos++], data[pos++], node.imageWidth, node.imageHeight, node.uvs, node.vertices, node.indices, node.bounds);
                }
                egret_native.Graphics.setGlobalShader(null);
            }
            else {
                while (pos < length) {
                    drawCalls++;
                    context.drawMesh(image.source, data[pos++], data[pos++], data[pos++], data[pos++], data[pos++], data[pos++], data[pos++], data[pos++], node.imageWidth, node.imageHeight, node.uvs, node.vertices, node.indices, node.bounds);
                }
            }
            if (m) {
                context.restoreTransform();
            }
            if (blendMode) {
                context.globalCompositeOperation = defaultCompositeOp;
            }
            if (alpha == alpha) {
                context.globalAlpha = originAlpha;
            }
            return 1;
        };
        /**
         * @private
         */
        CanvasRenderer.prototype.renderBitmap = function (node, context) {
            var image = node.image;
            if (!image || !image.source) {
                return 0;
            }
            if (context.$imageSmoothingEnabled != node.smoothing) {
                context.imageSmoothingEnabled = node.smoothing;
                context.$imageSmoothingEnabled = node.smoothing;
            }
            var data = node.drawData;
            var length = data.length;
            var pos = 0;
            var m = node.matrix;
            var blendMode = node.blendMode;
            var alpha = node.alpha;
            var saved = false;
            if (m) {
                if (context.saveTransform) {
                    context.saveTransform();
                }
                else {
                    context.save();
                }
                saved = true;
                context.transform(m.a, m.b, m.c, m.d, m.tx, m.ty);
            }
            //这里不考虑嵌套
            if (blendMode) {
                context.globalCompositeOperation = blendModes[blendMode];
            }
            var originAlpha;
            if (alpha == alpha) {
                originAlpha = context.globalAlpha;
                context.globalAlpha *= alpha;
            }
            var drawCalls = 0;
            var filter = node.filter;
            //todo 暂时只考虑绘制一次的情况
            if (filter && length == 8) {
                if (egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE) {
                    egret_native.Graphics.setGlobalShader(filter);
                    drawCalls++;
                    if (node.rotated) {
                        var sourceX = data[0];
                        var sourceY = data[1];
                        var sourceHeight = data[2];
                        var sourceWidth = data[3];
                        var offsetX = data[4];
                        var offsetY = data[5];
                        var destHeight = data[6];
                        var destWidth = data[7];
                        if (context.saveTransform) {
                            context.saveTransform();
                        }
                        else {
                            context.save();
                        }
                        context.transform(0, -1, 1, 0, 0, destWidth);
                        context.drawImage(image.source, sourceX, sourceY, sourceWidth, sourceHeight, offsetX, offsetY, destWidth, destHeight);
                        if (context.restoreTransform) {
                            context.restoreTransform();
                        }
                        else {
                            context.restore();
                        }
                    }
                    else {
                        context.drawImage(image.source, data[0], data[1], data[2], data[3], data[4], data[5], data[6], data[7]);
                    }
                    egret_native.Graphics.setGlobalShader(null);
                }
                else {
                    var sourceX = data[0];
                    var sourceY = data[1];
                    var sourceWidth = data[2];
                    var sourceHeight = data[3];
                    var offsetX = data[4];
                    var offsetY = data[5];
                    var destWidth = data[6];
                    var destHeight = data[7];
                    if (node.rotated) {
                        sourceWidth = data[3];
                        sourceHeight = data[2];
                        destWidth = data[7];
                        destHeight = data[6];
                    }
                    var displayBuffer = this.createRenderBuffer(destWidth, destHeight);
                    var displayContext = displayBuffer.context;
                    drawCalls++;
                    if (node.rotated) {
                        context.transform(0, -1, 1, 0, 0, destWidth);
                    }
                    displayContext.drawImage(image.source, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, destWidth, destHeight);
                    //绘制结果到屏幕
                    drawCalls++;
                    // 应用滤镜
                    var imageData = displayContext.getImageData(0, 0, destWidth, destHeight);
                    colorFilter(imageData.data, destWidth, destHeight, filter.$matrix);
                    displayContext.putImageData(imageData, 0, 0);
                    // 绘制结果的时候，应用滤镜
                    context.drawImage(displayBuffer.surface, 0, 0, destWidth, destHeight, offsetX, offsetY, destWidth, destHeight);
                    renderBufferPool.push(displayBuffer);
                }
            }
            else {
                while (pos < length) {
                    drawCalls++;
                    if (node.rotated) {
                        var sourceX = data[pos++];
                        var sourceY = data[pos++];
                        var sourceHeight = data[pos++];
                        var sourceWidth = data[pos++];
                        var offsetX = data[pos++];
                        var offsetY = data[pos++];
                        var destHeight = data[pos++];
                        var destWidth = data[pos++];
                        if (context.saveTransform) {
                            context.saveTransform();
                        }
                        else {
                            context.save();
                        }
                        context.transform(0, -1, 1, 0, 0, destWidth);
                        context.drawImage(image.source, sourceX, sourceY, sourceWidth, sourceHeight, offsetX, offsetY, destWidth, destHeight);
                        if (context.restoreTransform) {
                            context.restoreTransform();
                        }
                        else {
                            context.restore();
                        }
                    }
                    else {
                        context.drawImage(image.source, data[pos++], data[pos++], data[pos++], data[pos++], data[pos++], data[pos++], data[pos++], data[pos++]);
                    }
                }
            }
            if (saved) {
                if (context.restoreTransform) {
                    context.restoreTransform();
                    if (blendMode) {
                        context.globalCompositeOperation = defaultCompositeOp;
                    }
                    if (alpha == alpha) {
                        context.globalAlpha = originAlpha;
                    }
                }
                else {
                    context.restore();
                }
            }
            else {
                if (blendMode) {
                    context.globalCompositeOperation = defaultCompositeOp;
                }
                if (alpha == alpha) {
                    context.globalAlpha = originAlpha;
                }
            }
            return drawCalls;
        };
        /**
         * @private
         */
        CanvasRenderer.prototype.renderText = function (node, context) {
            context.textAlign = "left";
            context.textBaseline = "middle";
            context.lineJoin = "round"; //确保描边样式是圆角
            var drawData = node.drawData;
            var length = drawData.length;
            var pos = 0;
            while (pos < length) {
                var x = drawData[pos++];
                var y = drawData[pos++];
                var text = drawData[pos++];
                var format = drawData[pos++];
                context.font = getFontString(node, format);
                var textColor = format.textColor == null ? node.textColor : format.textColor;
                var strokeColor = format.strokeColor == null ? node.strokeColor : format.strokeColor;
                var stroke = format.stroke == null ? node.stroke : format.stroke;
                context.fillStyle = egret.toColorString(textColor);
                context.strokeStyle = egret.toColorString(strokeColor);
                if (stroke) {
                    context.lineWidth = stroke * 2;
                    context.strokeText(text, x, y);
                }
                context.fillText(text, x, y);
            }
        };
        /**
         * @private
         */
        CanvasRenderer.prototype.renderGraphics = function (node, context, forHitTest) {
            var drawData = node.drawData;
            var length = drawData.length;
            forHitTest = !!forHitTest;
            for (var i = 0; i < length; i++) {
                var path_1 = drawData[i];
                switch (path_1.type) {
                    case 1 /* Fill */:
                        var fillPath = path_1;
                        context.fillStyle = forHitTest ? BLACK_COLOR : getRGBAString(fillPath.fillColor, fillPath.fillAlpha);
                        this.renderPath(path_1, context);
                        if (this.renderingMask) {
                            context.clip();
                        }
                        else {
                            context.fill();
                        }
                        break;
                    case 2 /* GradientFill */:
                        var g = path_1;
                        context.fillStyle = forHitTest ? BLACK_COLOR : getGradient(context, g.gradientType, g.colors, g.alphas, g.ratios, g.matrix);
                        context.save();
                        var m = g.matrix;
                        this.renderPath(path_1, context);
                        context.transform(m.a, m.b, m.c, m.d, m.tx, m.ty);
                        context.fill();
                        context.restore();
                        break;
                    case 3 /* Stroke */:
                        var strokeFill = path_1;
                        var lineWidth = strokeFill.lineWidth;
                        context.lineWidth = lineWidth;
                        context.strokeStyle = forHitTest ? BLACK_COLOR : getRGBAString(strokeFill.lineColor, strokeFill.lineAlpha);
                        context.lineCap = CAPS_STYLES[strokeFill.caps];
                        context.lineJoin = strokeFill.joints;
                        context.miterLimit = strokeFill.miterLimit;
                        //对1像素和3像素特殊处理，向右下角偏移0.5像素，以显示清晰锐利的线条。
                        var isSpecialCaseWidth = lineWidth === 1 || lineWidth === 3;
                        if (isSpecialCaseWidth) {
                            context.translate(0.5, 0.5);
                        }
                        this.renderPath(path_1, context);
                        context.stroke();
                        if (isSpecialCaseWidth) {
                            context.translate(-0.5, -0.5);
                        }
                        break;
                }
            }
            return length == 0 ? 0 : 1;
        };
        CanvasRenderer.prototype.renderPath = function (path, context) {
            context.beginPath();
            var data = path.$data;
            var commands = path.$commands;
            var commandCount = commands.length;
            var pos = 0;
            for (var commandIndex = 0; commandIndex < commandCount; commandIndex++) {
                var command = commands[commandIndex];
                switch (command) {
                    case 4 /* CubicCurveTo */:
                        context.bezierCurveTo(data[pos++], data[pos++], data[pos++], data[pos++], data[pos++], data[pos++]);
                        break;
                    case 3 /* CurveTo */:
                        context.quadraticCurveTo(data[pos++], data[pos++], data[pos++], data[pos++]);
                        break;
                    case 2 /* LineTo */:
                        context.lineTo(data[pos++], data[pos++]);
                        break;
                    case 1 /* MoveTo */:
                        context.moveTo(data[pos++], data[pos++]);
                        break;
                }
            }
        };
        CanvasRenderer.prototype.renderGroup = function (groupNode, context) {
            var m = groupNode.matrix;
            var saved = false;
            if (m) {
                if (context.saveTransform) {
                    context.saveTransform();
                }
                else {
                    context.save();
                }
                saved = true;
                context.transform(m.a, m.b, m.c, m.d, m.tx, m.ty);
            }
            var drawCalls = 0;
            var children = groupNode.drawData;
            var length = children.length;
            for (var i = 0; i < length; i++) {
                var node = children[i];
                drawCalls += this.renderNode(node, context);
            }
            if (saved) {
                if (context.restoreTransform) {
                    context.restoreTransform();
                }
                else {
                    context.restore();
                }
            }
            return drawCalls;
        };
        /**
         * @private
         */
        CanvasRenderer.prototype.createRenderBuffer = function (width, height, useForFilters) {
            var buffer = useForFilters ? renderBufferPool_Filters.pop() : renderBufferPool.pop();
            if (buffer) {
                buffer.resize(width, height, true);
            }
            else {
                buffer = new egret.sys.CanvasRenderBuffer(width, height);
            }
            return buffer;
        };
        return CanvasRenderer;
    }());
    egret.CanvasRenderer = CanvasRenderer;
    __reflect(CanvasRenderer.prototype, "egret.CanvasRenderer", ["egret.sys.SystemRenderer"]);
    /**
     * @private
     * 获取字体字符串
     */
    function getFontString(node, format) {
        var italic = format.italic == null ? node.italic : format.italic;
        var bold = format.bold == null ? node.bold : format.bold;
        var size = format.size == null ? node.size : format.size;
        var fontFamily = format.fontFamily || node.fontFamily;
        var font = italic ? "italic " : "normal ";
        font += bold ? "bold " : "normal ";
        font += size + "px " + fontFamily;
        return font;
    }
    /**
     * @private
     * 获取RGBA字符串
     */
    function getRGBAString(color, alpha) {
        var red = color >> 16;
        var green = (color >> 8) & 0xFF;
        var blue = color & 0xFF;
        return "rgba(" + red + "," + green + "," + blue + "," + alpha + ")";
    }
    /**
     * @private
     * 获取渐变填充样式对象
     */
    function getGradient(context, type, colors, alphas, ratios, matrix) {
        var gradient;
        if (type == egret.GradientType.LINEAR) {
            gradient = context.createLinearGradient(-1, 0, 1, 0);
        }
        else {
            gradient = context.createRadialGradient(0, 0, 0, 0, 0, 1);
        }
        //todo colors alphas ratios数量不一致情况处理
        var l = colors.length;
        for (var i = 0; i < l; i++) {
            gradient.addColorStop(ratios[i] / 255, getRGBAString(colors[i], alphas[i]));
        }
        return gradient;
    }
    // 判断浏览器是否支持 Uint8ClampedArray
    var use8Clamp = false;
    try {
        use8Clamp = (typeof Uint8ClampedArray !== undefined);
    }
    catch (e) { }
    function setArray(a, b, index) {
        if (index === void 0) { index = 0; }
        for (var i = 0, l = b.length; i < l; i++) {
            a[i + index] = b[i];
        }
    }
    /**
     * @private
     */
    function colorFilter(buffer, w, h, matrix) {
        var r0 = matrix[0], r1 = matrix[1], r2 = matrix[2], r3 = matrix[3], r4 = matrix[4];
        var g0 = matrix[5], g1 = matrix[6], g2 = matrix[7], g3 = matrix[8], g4 = matrix[9];
        var b0 = matrix[10], b1 = matrix[11], b2 = matrix[12], b3 = matrix[13], b4 = matrix[14];
        var a0 = matrix[15], a1 = matrix[16], a2 = matrix[17], a3 = matrix[18], a4 = matrix[19];
        for (var p = 0, e = w * h * 4; p < e; p += 4) {
            var r = buffer[p + 0];
            var g = buffer[p + 1];
            var b = buffer[p + 2];
            var a = buffer[p + 3];
            buffer[p + 0] = r0 * r + r1 * g + r2 * b + r3 * a + r4;
            buffer[p + 1] = g0 * r + g1 * g + g2 * b + g3 * a + g4;
            buffer[p + 2] = b0 * r + b1 * g + b2 * b + b3 * a + b4;
            buffer[p + 3] = a0 * r + a1 * g + a2 * b + a3 * a + a4;
        }
    }
    /**
     * @private
     */
    function blurFilter(buffer, w, h, blurX, blurY) {
        blurFilterH(buffer, w, h, blurX);
        blurFilterV(buffer, w, h, blurY);
    }
    /**
     * @private
     */
    function blurFilterH(buffer, w, h, blurX) {
        var lineBuffer;
        if (use8Clamp) {
            lineBuffer = new Uint8ClampedArray(w * 4);
        }
        else {
            lineBuffer = new Array(w * 4);
        }
        var lineSize = w * 4;
        var windowLength = (blurX * 2) + 1;
        var windowSize = windowLength * 4;
        for (var y = 0; y < h; y++) {
            var pLineStart = y * lineSize;
            var rs = 0, gs = 0, bs = 0, _as = 0, alpha = 0, alpha2 = 0;
            // Fill window
            for (var ptr = -blurX * 4, end = blurX * 4 + 4; ptr < end; ptr += 4) {
                var key = pLineStart + ptr;
                if (key < pLineStart || key >= pLineStart + lineSize) {
                    continue;
                }
                alpha = buffer[key + 3];
                rs += buffer[key + 0] * alpha;
                gs += buffer[key + 1] * alpha;
                bs += buffer[key + 2] * alpha;
                _as += alpha;
            }
            // Slide window
            for (var ptr = pLineStart, end = pLineStart + lineSize, linePtr = 0, lastPtr = ptr - blurX * 4, nextPtr = ptr + (blurX + 1) * 4; ptr < end; ptr += 4, linePtr += 4, nextPtr += 4, lastPtr += 4) {
                if (_as === 0) {
                    lineBuffer[linePtr + 0] = 0;
                    lineBuffer[linePtr + 1] = 0;
                    lineBuffer[linePtr + 2] = 0;
                    lineBuffer[linePtr + 3] = 0;
                }
                else {
                    lineBuffer[linePtr + 0] = rs / _as;
                    lineBuffer[linePtr + 1] = gs / _as;
                    lineBuffer[linePtr + 2] = bs / _as;
                    lineBuffer[linePtr + 3] = _as / windowLength;
                }
                alpha = buffer[nextPtr + 3];
                alpha2 = buffer[lastPtr + 3];
                if (alpha || alpha == 0) {
                    if (alpha2 || alpha2 == 0) {
                        rs += buffer[nextPtr + 0] * alpha - buffer[lastPtr + 0] * alpha2;
                        gs += buffer[nextPtr + 1] * alpha - buffer[lastPtr + 1] * alpha2;
                        bs += buffer[nextPtr + 2] * alpha - buffer[lastPtr + 2] * alpha2;
                        _as += alpha - alpha2;
                    }
                    else {
                        rs += buffer[nextPtr + 0] * alpha;
                        gs += buffer[nextPtr + 1] * alpha;
                        bs += buffer[nextPtr + 2] * alpha;
                        _as += alpha;
                    }
                }
                else {
                    if (alpha2 || alpha2 == 0) {
                        rs += -buffer[lastPtr + 0] * alpha2;
                        gs += -buffer[lastPtr + 1] * alpha2;
                        bs += -buffer[lastPtr + 2] * alpha2;
                        _as += -alpha2;
                    }
                    else {
                        // do nothing
                    }
                }
            }
            // Copy line
            if (use8Clamp) {
                buffer.set(lineBuffer, pLineStart);
            }
            else {
                setArray(buffer, lineBuffer, pLineStart);
            }
        }
    }
    /**
     * @private
     */
    function blurFilterV(buffer, w, h, blurY) {
        var columnBuffer;
        if (use8Clamp) {
            columnBuffer = new Uint8ClampedArray(h * 4);
        }
        else {
            columnBuffer = new Array(h * 4);
        }
        var stride = w * 4;
        var windowLength = (blurY * 2) + 1;
        for (var x = 0; x < w; x++) {
            var pColumnStart = x * 4;
            var rs = 0, gs = 0, bs = 0, _as = 0, alpha = 0, alpha2 = 0;
            // Fill window
            for (var ptr = -blurY * stride, end = blurY * stride + stride; ptr < end; ptr += stride) {
                var key = pColumnStart + ptr;
                if (key < pColumnStart || key >= pColumnStart + h * stride) {
                    continue;
                }
                alpha = buffer[key + 3];
                rs += buffer[key + 0] * alpha;
                gs += buffer[key + 1] * alpha;
                bs += buffer[key + 2] * alpha;
                _as += alpha;
            }
            // Slide window
            for (var ptr = pColumnStart, end = pColumnStart + h * stride, columnPtr = 0, lastPtr = pColumnStart - blurY * stride, nextPtr = pColumnStart + ((blurY + 1) * stride); ptr < end; ptr += stride, columnPtr += 4, nextPtr += stride, lastPtr += stride) {
                if (_as === 0) {
                    columnBuffer[columnPtr + 0] = 0;
                    columnBuffer[columnPtr + 1] = 0;
                    columnBuffer[columnPtr + 2] = 0;
                    columnBuffer[columnPtr + 3] = 0;
                }
                else {
                    columnBuffer[columnPtr + 0] = rs / _as;
                    columnBuffer[columnPtr + 1] = gs / _as;
                    columnBuffer[columnPtr + 2] = bs / _as;
                    columnBuffer[columnPtr + 3] = _as / windowLength;
                }
                alpha = buffer[nextPtr + 3];
                alpha2 = buffer[lastPtr + 3];
                if (alpha || alpha == 0) {
                    if (alpha2 || alpha2 == 0) {
                        rs += buffer[nextPtr + 0] * alpha - buffer[lastPtr + 0] * alpha2;
                        gs += buffer[nextPtr + 1] * alpha - buffer[lastPtr + 1] * alpha2;
                        bs += buffer[nextPtr + 2] * alpha - buffer[lastPtr + 2] * alpha2;
                        _as += alpha - alpha2;
                    }
                    else {
                        rs += buffer[nextPtr + 0] * alpha;
                        gs += buffer[nextPtr + 1] * alpha;
                        bs += buffer[nextPtr + 2] * alpha;
                        _as += alpha;
                    }
                }
                else {
                    if (alpha2 || alpha2 == 0) {
                        rs += -buffer[lastPtr + 0] * alpha2;
                        gs += -buffer[lastPtr + 1] * alpha2;
                        bs += -buffer[lastPtr + 2] * alpha2;
                        _as += -alpha2;
                    }
                    else {
                        // do nothing
                    }
                }
            }
            // Copy column
            for (var i = x * 4, end = i + h * stride, j = 0; i < end; i += stride, j += 4) {
                buffer[i + 0] = columnBuffer[j + 0];
                buffer[i + 1] = columnBuffer[j + 1];
                buffer[i + 2] = columnBuffer[j + 2];
                buffer[i + 3] = columnBuffer[j + 3];
            }
        }
    }
    // function glowFilter(buffer, w, h, color, blurX, blurY, strength) {
    //     dropShadowFilter(buffer, w, h, color, blurX, blurY, 0, 0, strength)
    // }
    function dropShadowFilter(buffer, w, h, color, blurX, blurY, angle, distance, strength) {
        var tmp = alphaFilter(buffer, color);
        panFilter(tmp, w, h, angle, distance);
        blurFilter(tmp, w, h, blurX, blurY);
        scaleAlphaChannel(tmp, strength);
        compositeSourceOver(tmp, buffer);
        buffer.set(tmp);
        if (use8Clamp) {
            buffer.set(tmp);
        }
        else {
            setArray(buffer, tmp);
        }
    }
    function alphaFilter(buffer, color) {
        if (!color) {
            color = [0, 0, 0, 0];
        }
        var plane;
        if (use8Clamp) {
            plane = new Uint8ClampedArray(buffer);
        }
        else {
            plane = new Array(buffer.length);
            setArray(plane, buffer);
        }
        var colorR = color[0];
        var colorG = color[1];
        var colorB = color[2];
        var colorA = color[3];
        for (var ptr = 0, end = plane.length; ptr < end; ptr += 4) {
            var alpha = plane[ptr + 3];
            plane[ptr + 0] = colorR * alpha;
            plane[ptr + 1] = colorG * alpha;
            plane[ptr + 2] = colorB * alpha;
            plane[ptr + 3] = colorA * alpha;
        }
        return plane;
    }
    function panFilter(buffer, w, h, angle, distance) {
        var dy = (Math.sin(angle) * distance) | 0;
        var dx = (Math.cos(angle) * distance) | 0;
        var oldBuffer, newBuffer;
        if (use8Clamp) {
            oldBuffer = new Int32Array(buffer.buffer);
            newBuffer = new Int32Array(oldBuffer.length);
            for (var oy = 0; oy < h; oy++) {
                var ny = oy + dy;
                if (ny < 0 || ny > h) {
                    continue;
                }
                for (var ox = 0; ox < w; ox++) {
                    var nx = ox + dx;
                    if (nx < 0 || nx > w) {
                        continue;
                    }
                    newBuffer[ny * w + nx] = oldBuffer[oy * w + ox];
                }
            }
            oldBuffer.set(newBuffer);
        }
        else {
            oldBuffer = buffer;
            newBuffer = new Array(oldBuffer.length);
            for (var oy = 0; oy < h; oy++) {
                var ny = oy + dy;
                if (ny < 0 || ny > h) {
                    continue;
                }
                for (var ox = 0; ox < w; ox++) {
                    var nx = ox + dx;
                    if (nx < 0 || nx > w) {
                        continue;
                    }
                    newBuffer[(ny * w + nx) * 4 + 0] = oldBuffer[(oy * w + ox) * 4 + 0];
                    newBuffer[(ny * w + nx) * 4 + 1] = oldBuffer[(oy * w + ox) * 4 + 1];
                    newBuffer[(ny * w + nx) * 4 + 2] = oldBuffer[(oy * w + ox) * 4 + 2];
                    newBuffer[(ny * w + nx) * 4 + 3] = oldBuffer[(oy * w + ox) * 4 + 3];
                }
            }
            setArray(oldBuffer, newBuffer);
        }
    }
    function scaleAlphaChannel(buffer, value) {
        for (var ptr = 0, end = buffer.length; ptr < end; ptr += 4) {
            buffer[ptr + 3] *= value;
        }
    }
    function compositeSourceOver(dst, src) {
        for (var ptr = 0, end = dst.length; ptr < end; ptr += 4) {
            var Dr = dst[ptr + 0];
            var Dg = dst[ptr + 1];
            var Db = dst[ptr + 2];
            var Da = dst[ptr + 3] / 255;
            var Sr = src[ptr + 0];
            var Sg = src[ptr + 1];
            var Sb = src[ptr + 2];
            var Sa = src[ptr + 3] / 255;
            dst[ptr + 0] = Sr + Dr * (1 - Sa);
            dst[ptr + 1] = Sg + Dg * (1 - Sa);
            dst[ptr + 2] = Sb + Db * (1 - Sa);
            dst[ptr + 3] = (Sa + Da * (1 - Sa)) * 255;
        }
    }
    function getPixelKey(w, x, y) {
        return y * w * 4 + x * 4;
    }
    function mix(v1, v2, rate) {
        return v1 * (1 - rate) + v2 * rate;
    }
    // dropShadowFilter2
    // 模拟shader中的算法，可以实现内发光，挖空等高级效果
    function dropShadowFilter2(buffer, w, h, color, blurX, blurY, angle, distance, strength, inner, knockout, hideObject) {
        var plane;
        if (use8Clamp) {
            plane = new Uint8ClampedArray(buffer.length);
        }
        else {
            plane = new Array(buffer.length);
        }
        var alpha = color[3];
        var curDistanceX = 0;
        var curDistanceY = 0;
        var offsetX = distance * Math.cos(angle);
        var offsetY = distance * Math.sin(angle);
        var linearSamplingTimes = 7.0;
        var circleSamplingTimes = 12.0;
        var PI = 3.14159265358979323846264;
        var cosAngle;
        var sinAngle;
        var stepX = blurX / linearSamplingTimes;
        var stepY = blurY / linearSamplingTimes;
        // 遍历像素
        for (var u = 0; u < w; u++) {
            for (var v = 0; v < h; v++) {
                // 此处为了避免毛刺可以添加一个随机值
                var offset = 0;
                // 处理单个像素
                var key = v * w * 4 + u * 4;
                var totalAlpha = 0;
                var maxTotalAlpha = 0;
                // 采样出来的色值
                var _r = buffer[key + 0] / 255;
                var _g = buffer[key + 1] / 255;
                var _b = buffer[key + 2] / 255;
                var _a = buffer[key + 3] / 255;
                for (var a = 0; a <= PI * 2; a += PI * 2 / circleSamplingTimes) {
                    cosAngle = Math.cos(a + offset);
                    sinAngle = Math.sin(a + offset);
                    for (var i = 0; i < linearSamplingTimes; i++) {
                        curDistanceX = i * stepX * cosAngle;
                        curDistanceY = i * stepY * sinAngle;
                        var _u = Math.round(u + curDistanceX - offsetX);
                        var _v = Math.round(v + curDistanceY - offsetY);
                        var __a = 0;
                        if (_u >= w || _u < 0 || _v < 0 || _v >= h) {
                            __a = 0;
                        }
                        else {
                            var _key = _v * w * 4 + _u * 4;
                            __a = buffer[_key + 3] / 255;
                        }
                        totalAlpha += (linearSamplingTimes - i) * __a;
                        maxTotalAlpha += (linearSamplingTimes - i);
                    }
                }
                _a = Math.max(_a, 0.0001);
                // 'ownColor.rgb = ownColor.rgb / ownColor.a;',
                var outerGlowAlpha = (totalAlpha / maxTotalAlpha) * strength * alpha * (1. - inner) * Math.max(Math.min(hideObject, knockout), 1. - _a);
                var innerGlowAlpha = ((maxTotalAlpha - totalAlpha) / maxTotalAlpha) * strength * alpha * inner * _a;
                _a = Math.max(_a * knockout * (1 - hideObject), 0.0001);
                var rate1 = innerGlowAlpha / (innerGlowAlpha + _a);
                var r1 = mix(_r, color[0], rate1);
                var g1 = mix(_g, color[1], rate1);
                var b1 = mix(_b, color[2], rate1);
                var rate2 = outerGlowAlpha / (innerGlowAlpha + _a + outerGlowAlpha);
                var r2 = mix(r1, color[0], rate2);
                var g2 = mix(g1, color[1], rate2);
                var b2 = mix(b1, color[2], rate2);
                var resultAlpha = Math.min(_a + outerGlowAlpha + innerGlowAlpha, 1);
                // 赋值颜色
                plane[key + 0] = r2 * 255;
                plane[key + 1] = g2 * 255;
                plane[key + 2] = b2 * 255;
                plane[key + 3] = resultAlpha * 255;
            }
        }
        if (use8Clamp) {
            buffer.set(plane);
        }
        else {
            setArray(buffer, plane);
        }
    }
})(egret || (egret = {}));
//# sourceMappingURL=CanvasRenderer.js.map