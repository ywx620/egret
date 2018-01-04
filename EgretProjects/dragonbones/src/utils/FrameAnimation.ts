/**
 * 帧动画单例管理类
 * 创建时间2017/12/5
 * @author vinson
 */
class FrameAnimation extends egret.HashObject {
    private static instance:FrameAnimation;
    data:Object={};
    public static getIns():FrameAnimation{
            if(this.instance == null){
                    this.instance = new FrameAnimation();
            }
            return this.instance;
    }
    public loop():void
    {
        egret.startTick(onTicker, this);
        function onTicker(timeStamp:number) {
            var pass:number=0.008;
            dragonBones.WorldClock.clock.advanceTime(pass);
            return false;
        }
    }
    /***
     * 通过资源名增加工厂
     * 资源名同时也为工厂数据的key值既是工厂名
     */
    public addFactoryByName(name:string):void
    {
        var dragonbonesData = RES.getRes(name+"_ske_json");
        var textureData = RES.getRes(name+"_tex_json");
        var texture = RES.getRes(name+"_tex_png");
        var factory:dragonBones.EgretFactory = new dragonBones.EgretFactory();
        factory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(dragonbonesData));
        factory.addTextureAtlasData(new dragonBones.EgretTextureAtlas(texture,textureData));
        this.data[name]=factory;
    }
    /**把骨架加入到龙骨世界中 */
    public addWorld(armature:dragonBones.Armature):void
    {
         dragonBones.WorldClock.clock.add(armature);
    }
    /***
     * 通过工厂名与骨架名得到骨架
     * 骨架，是骨骼动画系统的核心，由显示容器、骨骼、插槽、动画、事件系统构成。
     */
    public getArmatureByName(factoryName:string,armatureName:string):dragonBones.Armature
    {
        var factory:dragonBones.EgretFactory=this.data[factoryName];
        var armature:dragonBones.Armature=factory.buildArmature(armatureName);
        return armature
    }
    /***
     * 通过工厂名与骨架名得到可显示对象
     */
    public getDisplayByName(factoryName:string,armatureName:string):egret.DisplayObject
    {
        return this.getArmatureByName(factoryName,armatureName).getDisplay();
    }
    /***
     * 通过工厂名与骨架名得到动画控制
     */
    public getAnimationByName(factoryName:string,armatureName:string):dragonBones.Animation
    {
        return this.getArmatureByName(factoryName,armatureName).animation;
    }
    /**得到动画显示对象并且播放动画 */
    public getAnimationSpriteByName(factoryName:string,animationName:string):egret.Sprite
    {
        var sprite:egret.Sprite
        if(this.data[factoryName+"-sprite"]==null){
            sprite=new egret.Sprite;
            this.data[factoryName+"-sprite"]=sprite;
        }
        sprite=this.data[factoryName+"-sprite"];
        sprite.removeChildren();
        var armature:dragonBones.Armature= this.getArmatureByName(factoryName,animationName)
        this.addWorld(armature);
        sprite.addChild(armature.getDisplay());
        armature.animation.gotoAndPlay(animationName);
        return sprite;
    }
}