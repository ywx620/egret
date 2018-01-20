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
var MoonTest = (function (_super) {
    __extends(MoonTest, _super);
    function MoonTest() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MoonTest.prototype.init = function () {
        this.panelMore = new moon.PanelMoreManager();
        var names = ["moon纯代码组件一，基本按钮展示", "ProgresBar展示", "基本按钮展示"];
        for (var i = 0; i < names.length; i++) {
            var panel = new moon.PanelBar();
            panel.label = names[i];
            panel.newAddEventListener(moon.MoonEvent.RENDER_COMPLETE, this.onAddStage.bind(this));
            //panel.addItem(moon.MoonUI.getCircle(200,moon.Color.random,Math.random()*200,Math.random()*200))
            this.panelMore.addItem(panel);
        }
        this.addChild(this.panelMore);
        this.showButton(0);
        this.showProgresBar(1);
    };
    MoonTest.prototype.onAddStage = function (e) {
        var panel = e.currentTarget;
        panel.colorBottom = 0XFCDF7C;
    };
    MoonTest.prototype.showButton = function (index) {
        var panel = this.panelMore.getItem(index);
        var btn1 = new moon.BasicButton();
        btn1.label = "默认皮肤按钮";
        panel.addItem(btn1, 10, 10);
        var normal = moon.Skin.randomRect;
        var down = moon.Skin.randomRect;
        var btn1 = new moon.BasicButton(normal, down);
        btn1.label = "随机颜色皮肤按钮";
        panel.addItem(btn1, 10, 90);
        var normal = moon.Skin.randomCircle;
        var down = moon.Skin.randomCircle;
        var btn1 = new moon.BasicButton(normal, down);
        btn1.labelCircle = "圆按钮";
        panel.addItem(btn1, 100, 220);
        var normal = moon.Skin.switchOnNormal;
        var down = moon.Skin.switchOnDown;
        var normal2 = moon.Skin.switchOffNormal;
        var down2 = moon.Skin.switchOffDown;
        var btn4 = new moon.MoreSkinButton([normal, down, normal2, down2]);
        btn4.toggleSwitch = true;
        panel.addItem(new moon.Label("toggleSwitch按钮", 0), 10, 300);
        panel.addItem(btn4, 10, 340);
        var items = ["我帅", "我很帅", "我双酷双帅", "我帅得惊动上帝"];
        var radioButton = new moon.RadioButtonBar;
        var len = items.length;
        for (var i = 0; i < len; i++) {
            var btn = new moon.BasicButton(moon.Skin.radioNormal, moon.Skin.radioDown);
            radioButton.addItemLabel(btn, items[i]);
            btn.labelColor = moon.Color.black;
            btn.setLabelPoint(40, 0);
            btn.y = 50 * i;
        }
        panel.addItem(new moon.Label("单选框按钮", 0), 10, 500);
        panel.addItem(radioButton, 10, 540);
        radioButton.newAddEventListener(moon.MoonEvent.CHANGE, onHandlerRadion.bind(this));
        function onHandlerRadion(e) {
            moon.TipsManager.getIns().simpleTips("选择了" + radioButton.selectIndex, new Point(150, 550));
        }
        var items = ["我帅", "我很帅", "我双酷双帅", "我帅得惊动上帝"];
        var checkBox = new moon.CheckBoxBar;
        var len = items.length;
        for (var i = 0; i < len; i++) {
            var skins = [moon.Skin.checkBoxOnNormal, moon.Skin.checkBoxOnDown, moon.Skin.checkBoxOffNormal, moon.Skin.checkBoxOffDown];
            var btnc = new moon.MoreSkinButton(skins);
            btnc.toggleSwitch = true;
            checkBox.addItemLabel(btnc, items[i]);
            btnc.labelColor = moon.Color.black;
            btnc.setLabelPoint(40, 0);
            btnc.y = 50 * i;
        }
        panel.addItem(new moon.Label("复选框按钮", 0), 300, 500);
        panel.addItem(checkBox, 300, 540);
    };
    MoonTest.prototype.showProgresBar = function (index) {
        var panel = this.panelMore.getItem(index);
        // var width=300;
        // var height=20;
        // var skinOut:Sprite=moon.MoonUI.getRect(width,height,moon.Color.random);
        // var skinIn:Sprite=moon.MoonUI.getRect(width,height,moon.Color.random);
        // var progressBar:moon.ProgressBar=new moon.ProgressBar(skinOut,skinIn);
        // progressBar.value=progressBar.value=0.5
        // var v:string=Math.round(progressBar.value*100)+"%";
        // progressBar.showText(v,-1,-40);
        // panel.addItem(progressBar,50,50);
        var width = 400;
        var height = 30;
        var skinOut = moon.MoonUI.getRect(width, height, moon.Color.random);
        var skinIn = moon.MoonUI.getRect(width, height, moon.Color.random);
        var progressBar = new moon.ProgressBar(skinOut, skinIn);
        panel.addItem(progressBar, 0);
        egret.Ticker.getInstance().register(function loop() {
            progressBar.value += 0.002;
            progressBar.value = progressBar.value >= 1 ? 0 : progressBar.value;
            var v = Math.round(progressBar.value * 100) + "%";
            progressBar.showText(v);
        }, this);
    };
    return MoonTest;
}(moon.MoonContainer));
__reflect(MoonTest.prototype, "MoonTest");
//# sourceMappingURL=MoonTest.js.map