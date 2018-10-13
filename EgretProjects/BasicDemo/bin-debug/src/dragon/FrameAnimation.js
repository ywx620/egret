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
/**
 * 帧动画单例管理类
 * 创建时间2017/12/5
 * @author vinson
 */
var FrameAnimation = (function (_super) {
    __extends(FrameAnimation, _super);
    function FrameAnimation() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = {};
        return _this;
    }
    FrameAnimation.getIns = function () {
        if (this.instance == null) {
            this.instance = new FrameAnimation();
        }
        return this.instance;
    };
    FrameAnimation.prototype.loop = function () {
        egret.startTick(onTicker, this);
        function onTicker(timeStamp) {
            var pass = 0.008;
            dragonBones.WorldClock.clock.advanceTime(pass);
            return false;
        }
    };
    /***
    * 设置资源工厂名
    */
    FrameAnimation.prototype.setFactoryNameName = function (name) {
        this.factoryName = name;
    };
    /***
     * 通过资源名增加工厂
     * 资源名同时也为工厂数据的key值既是工厂名
     */
    FrameAnimation.prototype.addFactoryByName = function (name) {
        this.factoryName = name;
        var dragonbonesData = RES.getRes(name + "_ske_json");
        var textureData = RES.getRes(name + "_tex_json");
        var texture = RES.getRes(name + "_tex_png");
        var factory = new dragonBones.EgretFactory();
        var dd = factory.parseDragonBonesData(dragonbonesData);
        var td = factory.parseTextureAtlasData(texture, textureData);
        //factory.addDragonBonesData(dd);
        //factory.addTextureAtlasData(td);
        factory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(dragonbonesData));
        factory.addTextureAtlasData(new dragonBones.EgretTextureAtlas(texture, textureData));
        this.data[name] = factory;
    };
    /**把骨架加入到龙骨世界中 */
    FrameAnimation.prototype.addWorld = function (armature) {
        dragonBones.WorldClock.clock.add(armature);
    };
    /***
     * 通过工厂名与骨架名得到骨架
     * 骨架，是骨骼动画系统的核心，由显示容器、骨骼、插槽、动画、事件系统构成。
     */
    FrameAnimation.prototype.getArmatureByName = function (armatureName) {
        var factory = this.data[this.factoryName];
        var armature = factory.buildArmature(armatureName);
        return armature;
    };
    /***
     * 通过工厂名与骨架名得到可显示对象
     */
    FrameAnimation.prototype.getDisplayByName = function (armatureName) {
        return this.getArmatureByName(armatureName).getDisplay();
    };
    /***
     * 通过工厂名与骨架名得到动画控制
     */
    FrameAnimation.prototype.getAnimationByName = function (armatureName) {
        return this.getArmatureByName(armatureName).animation;
    };
    /**得到动画显示对象并且播放动画 */
    FrameAnimation.prototype.getAnimationSpriteByName = function (animationName) {
        var sprite;
        if (this.data[this.factoryName + "-sprite"] == null) {
            sprite = new egret.Sprite;
            this.data[this.factoryName + "-sprite"] = sprite;
        }
        sprite = this.data[this.factoryName + "-sprite"];
        sprite.removeChildren();
        var armature = this.getArmatureByName(animationName);
        this.addWorld(armature);
        sprite.addChild(armature.display);
        armature.animation.gotoAndPlay(animationName);
        return sprite;
    };
    return FrameAnimation;
}(egret.HashObject));
__reflect(FrameAnimation.prototype, "FrameAnimation");
//# sourceMappingURL=FrameAnimation.js.map