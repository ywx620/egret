class SetPanel extends BasicComponent {
    backFunction:any;
    soundChange:number=10;
    btnClose:eui.Button;
    soundBg:eui.HSlider;
    soundEffect:eui.HSlider;
    soundIsNo:eui.ToggleButton;
    constructor() {
        super();
        this.setSkinName("resource/eui_skins/APP_SetSkin.exml");
    }
    protected render():void
    {
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP,(e:any)=>{this.parent.removeChild(this)},this)
        this.soundBg.addEventListener(egret.Event.CHANGE,this.onChange,this);
        this.soundEffect.addEventListener(egret.Event.CHANGE,this.onChange,this);

        this.soundBg.value=Const.SOUND_BG*this.soundChange;
        this.soundEffect.value=Const.SOUND_EFFECT*this.soundChange;

        this.setTrackHighLight(this.soundBg);
        this.setTrackHighLight(this.soundEffect);

        for(var i=0;i<this.numChildren;i++){
            var ui:egret.DisplayObject=this.getChildAt(i);
            if(ui instanceof eui.ToggleButton){
                ui.addEventListener(egret.Event.CHANGE,this.onToggleButton,this);
                this.changeUI(ui,true);
            }
        }
    }
    private setTrackHighLight(slider:eui.HSlider):void
    {
        var line=this.createBitmapByName("track_sb_png");
        line.x=slider.x;line.y=slider.y+10;
        this.addChild(line);
        slider.trackHighlight=line;
    }
    protected onChange(e:egret.Event):void
    {
        if(this.soundIsNo.selected==false){
            this.soundIsNo.selected=true;
        }
        var value:number;
        if(e.currentTarget==this.soundBg){
            value=this.soundBg.value;
            value/=this.soundChange;
            SoundControl.getIns().setBgVolume(value);
        }else if(e.currentTarget==this.soundEffect){
            value=this.soundEffect.value;
            value/=this.soundChange;
            SoundControl.getIns().setEffectVolume(value);
        }
    }
    protected onToggleButton(e:egret.Event):void
    {
        var ui:eui.ToggleButton=e.currentTarget as eui.ToggleButton;
        this.changeUI(ui);
        if(this.backFunction!=null){
            this.backFunction();
        }
    }
    protected changeUI(ui:eui.ToggleButton,isInit:boolean=false):void
    {
        var value:number=ui.selected?1:0;
        var bool:boolean=ui.selected;
        var data:SystemData=SystemSetManager.getIns().getData();
        switch(ui.name){
             case "soundIsNo":
             if(isInit) ui.selected=Const.SOUND_IS_NO==1;
             else       SoundControl.getIns().setIsNoVolume(value);
            break;
             case "turnShip":
             if(isInit)  ui.selected=data.turnShip;
             else        SystemSetManager.getIns().getData().turnShip=bool;
            break;
             case "fireIsContinue":
             if(isInit)  ui.selected=data.fireIsContinue;
             else        SystemSetManager.getIns().getData().fireIsContinue=bool;
            break;
             case "moveAim":
            if(isInit)   ui.selected=data.aimIsMove;
            else         SystemSetManager.getIns().getData().aimIsMove=bool;
            break;
             case "moveMap":
             if(isInit)   ui.selected=data.mapIsMove;
             else         SystemSetManager.getIns().getData().mapIsMove=bool;
            break;
             case "showShip":
             if(isInit)   ui.selected=data.showShip;
             else         SystemSetManager.getIns().getData().showShip=bool;
            break;
        }
    }
}