var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret;
(function (egret) {
    /**
     * The GradientType class provides values for the type parameter in the beginGradientFill() methods of the egret.Graphics class.
     *
     * @see egret.Graphics#beginGradientFill()
     * @version Egret 2.4
     * @platform Web,Native
     * @language en_US
     */
    /**
     * GradientType 类为 egret.Graphics 类的 beginGradientFill() 方法中的 type 参数提供值。
     *
     * @see egret.Graphics#beginGradientFill()
     * @version Egret 2.4
     * @platform Web,Native
     * @language zh_CN
     */
    var GradientType = (function () {
        function GradientType() {
        }
        /**
         * Value used to specify a linear gradient fill.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 用于指定线性渐变填充的值
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        GradientType.LINEAR = "linear";
        /**
         * Value used to specify a radial gradient fill.
         * @version Egret 2.4
         * @platform Web,Native
         * @language en_US
         */
        /**
         * 用于指定放射状渐变填充的值
         * @version Egret 2.4
         * @platform Web,Native
         * @language zh_CN
         */
        GradientType.RADIAL = "radial";
        return GradientType;
    }());
    egret.GradientType = GradientType;
    __reflect(GradientType.prototype, "egret.GradientType");
})(egret || (egret = {}));
//# sourceMappingURL=GradientType.js.map