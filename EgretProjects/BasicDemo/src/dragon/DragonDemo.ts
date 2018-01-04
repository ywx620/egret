module DragonDemoAction{//枚举数据
    export enum names{stand,walk,run,atk,hurt,jump,jumpTwo,jumpDown};
}
class DragonDemo extends egret.DisplayObjectContainer{
    names:string[];
    role:egret.Sprite;
    constructor() {
        super()
       this.addEventListener(egret.Event.ADDED_TO_STAGE,this.addToStage,this);
    }
    private addToStage():void {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.addToStage,this);
        FrameAnimation.getIns().loop();
        FrameAnimation.getIns().addFactoryByName("wukong");
        this.names=[
            DragonDemoAction.names[0],
            DragonDemoAction.names[1],
            DragonDemoAction.names[2],
            DragonDemoAction.names[3],
            DragonDemoAction.names[4],
            DragonDemoAction.names[5],
            DragonDemoAction.names[6],
            DragonDemoAction.names[7]
            ];
        
        this.role=FrameAnimation.getIns().getAnimationSpriteByName(this.names[DragonDemoAction.names.run]);
        this.role.x=200;
        this.role.y=200;
        this.addChild(this.role);

        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onClick,this)
    }
    private onClick(e:egret.TouchEvent):void
    {
        this.role=FrameAnimation.getIns().getAnimationSpriteByName(this.names[DragonDemoAction.names.jump]);

    }
}