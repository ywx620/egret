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
var TextTest = (function (_super) {
    __extends(TextTest, _super);
    function TextTest() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    TextTest.prototype.init = function () {
        // var image:moon.Scale9Image=new moon.Scale9Image("tips_png");
        // image.setSize(200,200);
        // this.addChild(image);
        var tip = new moon.BasicTips("tips_png");
        tip.y = 10;
        tip.setValue("这是一个TIPS测试\n换行接着测试");
        this.addChild(tip);
        var tip = new moon.BasicTips("selected_png");
        tip.side = 60;
        //tip.x=300;
        tip.setTextFlow([{ text: "这是一个TIPS测试", style: { size: 140, textColor: 0 } }]);
        this.addChild(tip);
        tip.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClick, this);
        var txt = new TextField;
        txt.y = 300;
        txt.fontFamily = "黑体";
        var strs = ["请先预留", "10", "个", "材料", "背包格子"];
        var colors = [0XFFFFFF, 0xFF0000, 0XFFFFFF, 0x336699, 0XFFFFFF];
        var textFlow = [];
        for (var i = 0; i < strs.length; i++) {
            textFlow.push({ text: strs[i], style: { "textColor": colors[i] } });
        }
        txt.textFlow = textFlow;
        this.addChild(txt);
        var tx = new egret.TextField;
        tx.width = 400;
        tx.x = 10;
        tx.y = 100;
        tx.textColor = 0;
        tx.size = 20;
        tx.fontFamily = "微软雅黑";
        tx.textAlign = egret.HorizontalAlign.CENTER;
        tx.textFlow = [
            { text: "妈妈再也不用担心我在", style: { "size": 12 } },
            { text: "Egret", style: { "textColor": 0x336699, "size": 60, "strokeColor": 0x6699cc, "stroke": 2 } },
            { text: "里说一句话不能包含各种", style: { "fontFamily": "楷体" } },
            { text: "五", style: { "textColor": 0xff0000 } },
            { text: "彩", style: { "textColor": 0x00ff00 } },
            { text: "缤", style: { "textColor": 0xf000f0 } },
            { text: "纷", style: { "textColor": 0x00ffff } },
            { text: "、\n" },
            { text: "大", style: { "size": 36 } },
            { text: "小", style: { "size": 6 } },
            { text: "不", style: { "size": 16 } },
            { text: "一", style: { "size": 24 } },
            { text: "、" },
            { text: "格", style: { "italic": true, "textColor": 0x00ff00 } },
            { text: "式", style: { "size": 16, "textColor": 0xf000f0 } },
            { text: "各", style: { "italic": true, "textColor": 0xf06f00 } },
            { text: "样", style: { "fontFamily": "楷体" } },
            { text: "" },
            { text: "的文字了！" }
        ];
        this.addChild(tx);
        var label = new egret.TextField();
        label.x = label.y = 350;
        label.width = 480;
        label.textAlign = egret.HorizontalAlign.CENTER;
        //使用 HtmlTextParser 解析html文本
        label.textFlow = new egret.HtmlTextParser().parser("<font size=12>妈妈再也不用担心我在</font>" +
            "<font color='#336699' size=60 strokecolor='#6699cc' stroke=2>Egret</font>" +
            "<font fontFamily='楷体'>里说一句话不能包含各种</font>" +
            "<font color=0xff0000>五</font>" +
            "<font color=0x00ff00>彩</font>" +
            "<font color=0xf000f0>缤</font>" +
            "<font color=0x00ffff>纷</font>" +
            "<font>、\n</font>" +
            "<font size=36>大</font>" +
            "<font size=6>小</font>" +
            "<font size=16>不</font>" +
            "<font size=24>一</font>" +
            "<font italic='true' color=0x00ff00>格</font>" +
            "<font size=16 color=0xf000f0>式</font>" +
            "<font i='true' color=0xf06f00>各</font>" +
            "<font fontFamily='楷体'><b>样</b></font>" +
            "<font blod='true'>的</font>" +
            "<font><i>文</i></font>" +
            "<font b='true'>字</font>" +
            "<font>了！</font>");
        this.addChild(label);
    };
    TextTest.prototype.onClick = function (e) {
        if (e.type == egret.TouchEvent.TOUCH_BEGIN) {
            moon.TipsManager.getIns().simpleTips("一个小测试", new egret.Point(e.stageX, e.stageY));
        }
    };
    return TextTest;
}(Sprite));
__reflect(TextTest.prototype, "TextTest");
//# sourceMappingURL=TextTest.js.map