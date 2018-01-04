var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var MainMvc = (function (_super) {
    __extends(MainMvc, _super);
    function MainMvc() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MainMvc.prototype.render = function () {
        this.stage.scaleMode = egret.StageScaleMode.FIXED_WIDTH;
        SoundControl.getIns().addItem("keyDown_mp3");
        var facade = puremvc.Facade.getInstance("calculator");
        //var moduleView:ModuleView=new ModuleView;
        var c = egret.getDefinitionByName("ModuleView"); //通过名字得到类
        var moduleView = new c;
        var moduleMediator = new ModuleMediator(ModuleMediator.NAME, moduleView);
        this.addChild(moduleView);
        facade.registerMediator(moduleMediator);
        facade.registerCommand(MVCConst.CMD_START, StartCommand);
        facade.sendNotification(MVCConst.CMD_START);
    };
    return MainMvc;
}(moon.BasicView));
__reflect(MainMvc.prototype, "MainMvc");
//# sourceMappingURL=mvcMain.js.map