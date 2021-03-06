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

class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView: LoadingUI;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {

        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event: RES.ResourceEvent) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event: RES.ResourceEvent) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event: RES.ResourceEvent) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event: RES.ResourceEvent) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    private textfield: egret.TextField;

    /**
     * 创建游戏场景
     * Create a game scene
     */
     private createGameScene(): void {

        this.createMotorcycleExp();
    }
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string): egret.Bitmap {
        var result: egret.Bitmap = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    /**骨骼角色拥有的动作列表**/
    private actionArray;
    /**骨骼角色执行的当前动作索引**/
    private actionFlag;
    /**存放骨骼动画的容器**/
    private container:egret.Sprite;
    /**骨骼的实体数据**/
    private armature;
    /**骨骼的可视对象**/
    private armatureDisplay;
    /**创建骨骼模型**/
    private createMotorcycleExp():void
    {
        this.container = new egret.Sprite();

        this.addChild(this.container);
        this.container.graphics.beginFill(0XFF0000);
        this.container.graphics.drawCircle(0,0,10);
        this.container.x = 200;
        this.container.y = 200;

       // var name:String=
        FrameAnimation.getIns().loop();
        FrameAnimation.getIns().addFactoryByName("wukong");
        var names:string[]=["stand","walk","run","atk","hurt","jump","jumpTwo","jumpDown"];
        // for(var j=0;j<100;j++){
        //     for(var i=0;i<names.length;i++){
        //         var name:string=names[i];
        //         var armature:dragonBones.Armature= FrameAnimation.getIns().getArmatureByName("wukong",name)
        //         FrameAnimation.getIns().addWorld(armature);
        //         var display:egret.DisplayObject=armature.getDisplay();
        //         display.x=Math.random()*this.stage.stageWidth;
        //         display.y=Math.random()*this.stage.stageHeight;
        //         this.container.addChild(display);
        //         armature.animation.gotoAndPlay(name);
        //     }
        // }

        // var armature:dragonBones.Armature= FrameAnimation.getIns().getArmatureByName("wukong","stand")
        // FrameAnimation.getIns().addWorld(armature);
        // this.container.addChild(armature.getDisplay());
        // armature.animation.gotoAndPlay("stand");
        // armature.animation.timeScale=0.5;
        
        this.container.addChild(FrameAnimation.getIns().getAnimationSpriteByName("wukong",names[0]));
        var index:number=0;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,onClick,this);
        function onClick(e:any):void{
            var name:string=names[index=++index==names.length?0:index];
            this.container.addChild(FrameAnimation.getIns().getAnimationSpriteByName("wukong",name));
            
        }

        // armature= FrameAnimation.getIns().getArmatureByName("wukong","run")
        // FrameAnimation.getIns().addWorld(armature);
        // var display:egret.DisplayObject=armature.getDisplay();
        // display.x=150;
        // this.container.addChild(display);
        // armature.animation.gotoAndPlay("run");
        // armature.animation.timeScale=0.8;

/**
        //读取一个骨骼数据,并创建实例显示到舞台
        // var dragonbonesData = RES.getRes("Dragon_1_ske_json");
        // var textureData = RES.getRes("Dragon_1_tex_json");
        // var texture = RES.getRes("Dragon_1_tex_png");
        //读取一个逐帧数据,并创建实例显示到舞台
        var dragonbonesData = RES.getRes("zhuzhen_ske_json");
        var textureData = RES.getRes("zhuzhen_tex_json");
        var texture = RES.getRes("zhuzhen_tex_png");

        // var dragonbonesData = RES.getRes("skeleton_json");
        // var textureData = RES.getRes("texture_json");
        // var texture = RES.getRes("texture_png");
        // flash 的龙骨是3.0的，框架使用的是5.5的，现在不支付3.0的

        var armatureName:string="Sprite";
        var actionName:string="Sprite"

        var factory = new dragonBones.EgretFactory();
        factory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(dragonbonesData));
        factory.addTextureAtlasData(new dragonBones.EgretTextureAtlas(texture,textureData));

        this.armature = factory.buildArmature(armatureName);
        this.armatureDisplay = this.armature.getDisplay();
        dragonBones.WorldClock.clock.add(this.armature);
        this.container.addChild(this.armatureDisplay);
        this.armatureDisplay.x = 100;
        this.armatureDisplay.y = 500;
        this.armature.animation.gotoAndStopByFrame(actionName,3);

        var min = factory.buildArmature("min");
        var minDisplay = min.getDisplay();
        dragonBones.WorldClock.clock.add(min);
        this.container.addChild(minDisplay);
        minDisplay.x = 100;
        minDisplay.y = 300;
        min.animation.gotoAndStopByFrame("min",0);

		egret.startTick(this.onTicker, this);

*/
        // var data = RES.getRes("tenWater_tex_json");
        // var txtr = RES.getRes("tenWater_tex_png");
        // var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( data, txtr );
        // var mc1:egret.MovieClip = new egret.MovieClip( mcFactory.generateMovieClipData( "tenWater" ) );
        // egret.log(mc1);

        

    }
	
	private _time:number;

    private onTicker(timeStamp:number) {

        if(!this._time) {
            this._time = timeStamp;
        }

        var now = timeStamp;
        var pass = now - this._time;
        this._time = now;

        dragonBones.WorldClock.clock.advanceTime(pass / 1000);


        return false;
    }
}