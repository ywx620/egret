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
        //注册主视窗控制
        facade.registerMediator(moduleMediator);
        //注册命令
        facade.registerCommand(MVCConst.CMD_START, StartCommand);
        //发收执行开始命令
        facade.sendNotification(MVCConst.CMD_START);
    };
    return MainMvc;
}(moon.BasicView));
__reflect(MainMvc.prototype, "MainMvc");
//# sourceMappingURL=mvcMain.js.map