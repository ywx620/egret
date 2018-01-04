var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var control;
(function (control) {
    /**
     * @author vinson
     * 创建时间：2017-12-18 上午9:36:42
     * 2D摄像机(适用于物理引擎)
     * 此类与BasicCamera,LayerCamera最大不同是目标是在外部控制移动
     */
    var Camera2D = (function () {
        function Camera2D(target, screen, cameraRect) {
            if (cameraRect === void 0) { cameraRect = null; }
            /**速度（目标移动的速度）*/
            this.vx = 0;
            this.vy = 0;
            this.prevX = 0;
            this.prevY = 0;
            /**边境值比例（相对摄像机的）*/
            this.leftTop = 0.25;
            this.rightBottom = 0.75;
            this.layers = new Array;
            /**锚点默认是左上，如果居中设置为（0.5,0.5）*/
            this.anchorPoint = new egret.Point(1, 1);
            this.target = target;
            this.screen = screen;
            this.cameraRect = cameraRect;
            this.setBoundary(this.leftTop, this.rightBottom);
            this.screenWidth = screen.width;
            this.screenHeight = screen.height;
        }
        /**定义边界 ，即定义个相对运动的视窗，
         * 当操作对象没有达到边界的时候，即视窗内时是对象移动。
         * 当超过这个视窗的时候，就场景移动*/
        Camera2D.prototype.setBoundary = function (leftTop, rightBottom) {
            this.leftTop = leftTop;
            this.rightBottom = rightBottom;
            this.leftBoundary = this.cameraRect.width * this.leftTop;
            this.topBoundary = this.cameraRect.height * this.leftTop;
            this.rightBoundary = this.cameraRect.width * this.rightBottom;
            this.bottomBoundary = this.cameraRect.height * this.rightBottom;
        };
        /**设置场景*/
        Camera2D.prototype.setScreen = function (screen) {
            this.screen = screen;
            this.screenWidth = screen.width;
            this.screenHeight = screen.height;
        };
        /**设置目标*/
        Camera2D.prototype.setTarget = function (target) {
            this.target = target;
            this.prevX = this.target.x;
            this.prevY = this.target.y;
        };
        /**设置目标锚点*/
        Camera2D.prototype.setTargetAnchor = function (point) {
            this.anchorPoint = point;
        };
        /**增加层*/
        Camera2D.prototype.addLayer = function (layer) {
            this.layers.push(layer);
        };
        /**画出边界范围*/
        Camera2D.prototype.drawBoundary = function (color) {
            if (color === void 0) { color = 0XFF0000; }
            var sprite = new egret.Sprite();
            sprite.graphics.lineStyle(1, color);
            sprite.graphics.beginFill(0, 0);
            sprite.graphics.drawRect(this.leftBoundary, this.topBoundary, this.rightBoundary - this.leftBoundary, this.bottomBoundary - this.topBoundary);
            return sprite;
        };
        Camera2D.prototype.move = function () {
            this.vx = this.target.x - this.prevX;
            this.vy = this.target.y - this.prevY;
            this.prevX = this.target.x;
            this.prevY = this.target.y;
            if (this.vx == 0 && this.vy == 0) {
                return;
            }
            var local = this.target.parent.localToGlobal(this.target.x, this.target.y);
            var targetW = this.target.width * this.anchorPoint.x;
            var targetH = this.target.height * this.anchorPoint.y;
            //-----x轴-----
            if (this.vx > 0) {
                //目标达到右边界
                if (local.x + targetW > this.rightBoundary) {
                    this.screen.x -= this.vx;
                }
                //场景已经移到右尽头
                if (this.screen.x < this.cameraRect.width - this.screenWidth) {
                    this.screen.x = this.cameraRect.width - this.screenWidth;
                }
            }
            else if (this.vx < 0) {
                //目标达到左边界
                if (local.x < this.leftBoundary) {
                    this.screen.x -= this.vx;
                }
                //场景已经移到左尽头
                if (this.screen.x > this.cameraRect.x) {
                    this.screen.x = this.cameraRect.x;
                }
            }
            //-----y轴-----
            if (this.vy > 0) {
                //目标达到上边界
                if (local.y + targetH > this.bottomBoundary) {
                    this.screen.y -= this.vy;
                }
                //场景已经移到上尽头
                if (this.screen.y < this.cameraRect.height - this.screenHeight) {
                    this.screen.y = this.cameraRect.height - this.screenHeight;
                }
            }
            else if (this.vy < 0) {
                //目标达到下边界
                if (local.y < this.topBoundary) {
                    this.screen.y -= this.vy;
                }
                //场景已经移到下尽头
                if (this.screen.y > this.cameraRect.y) {
                    this.screen.y = this.cameraRect.y;
                }
            }
            this.moveLayer();
        };
        /**移动层*/
        Camera2D.prototype.moveLayer = function () {
            var len = this.layers.length;
            for (var i = 0; i < len; i++) {
                var layer = this.layers[i];
                layer.x = this.screen.x * ((layer.width - this.cameraRect.width) / (this.screen.width - this.cameraRect.width));
                layer.y = this.screen.y * ((layer.height - this.cameraRect.height) / (this.screen.height - this.cameraRect.height));
            }
        };
        return Camera2D;
    }());
    control.Camera2D = Camera2D;
    __reflect(Camera2D.prototype, "control.Camera2D");
})(control || (control = {}));
//# sourceMappingURL=Camera2D.js.map