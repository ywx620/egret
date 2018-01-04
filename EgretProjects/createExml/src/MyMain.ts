class MyComponent extends eui.Component {
    constructor() {
        super();
         this.addEventListener(eui.UIEvent.COMPLETE, this.onComplete, this);
        this.skinName = "resource/eui_skins/myPanelSkin.exml";
    }
    protected createChildren(): void {
        super.createChildren();
         egret.log("createChildren");
       
    }
    private onComplete(): void {
        egret.log("onComplete");
    }
}