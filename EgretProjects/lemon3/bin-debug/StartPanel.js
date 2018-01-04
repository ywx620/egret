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
var MyPanel = (function (_super) {
    __extends(MyPanel, _super);
    function MyPanel() {
        var _this = _super.call(this) || this;
        var panel = new StartPanel();
        _this.addChild(panel);
        return _this;
    }
    return MyPanel;
}(eui.UILayer));
__reflect(MyPanel.prototype, "MyPanel");
var StartPanel = (function (_super) {
    __extends(StartPanel, _super);
    function StartPanel() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/eui_skins/A_start.exml";
        return _this;
    }
    StartPanel.prototype.onComplete = function () {
        egret.log("complete StartPanel");
        this.startButton.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClick, this);
        this.setButton.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClick, this);
        this.closeButton.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClick, this);
    };
    StartPanel.prototype.onClick = function (e) {
        switch (e.currentTarget) {
            case this.startButton:
                var panel = new GamePanel();
                this.addChild(panel);
                break;
            case this.setButton:
                egret.log("setButton");
                break;
            case this.closeButton:
                egret.log("closeButton");
                break;
        }
    };
    return StartPanel;
}(eui.Component));
__reflect(StartPanel.prototype, "StartPanel");
var GamePanel = (function (_super) {
    __extends(GamePanel, _super);
    function GamePanel() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/eui_skins/A_gamePanel.exml";
        return _this;
    }
    GamePanel.prototype.onComplete = function () {
        egret.log("complete gamePanel");
        //egret.log(this.scroller.addChild(this.createBitmapByName("bg_jpg")));
        // this.list.dataProvider = new eui.ArrayCollection(["11", "22", "33",{label:"label",data:"data",text:"text"}]);
        this.list.addEventListener(egret.Event.CHANGE, this.onList, this);
        var group = new eui.Group();
        var img = new eui.Image("bg_jpg");
        //img.scale9Grid=new egret.Rectangle(10,20,5,5);
        // img.height=200;
        group.addChild(img);
        this.scroller.viewport = group;
        //创建一个容器，里面包含一张图片
        var group = new eui.Group();
        var img = new eui.Image("bg_jpg");
        group.addChild(img);
        //创建一个Scroller
        var myScroller = new eui.Scroller();
        //注意位置和尺寸的设置是在Scroller上面，而不是容器上面
        myScroller.width = 200;
        myScroller.height = 200;
        //设置viewport
        myScroller.viewport = this.list;
        this.addChild(myScroller);
        //this.scroller.viewport = this.list;
    };
    GamePanel.prototype.onList = function (e) {
        var index = this.list.selectedIndex;
        var item = this.list.getChildAt(index);
        // egret.log(item.data.name);
    };
    return GamePanel;
}(eui.Component));
__reflect(GamePanel.prototype, "GamePanel");
var TestPanel = (function (_super) {
    __extends(TestPanel, _super);
    function TestPanel() {
        var _this = _super.call(this) || this;
        _this.setSkinName("resource/eui_skins/A_Test.exml");
        return _this;
    }
    TestPanel.prototype.render = function () {
        egret.log(this.isLoadComplete, this.isCreateChildren);
        egret.log(this.btn1, 2);
        var bitmap = this.createBitmapByName("button_down_png", new egret.Rectangle(2, 2, 2, 2));
        bitmap.width = bitmap.height = 100;
        this.addChild(bitmap);
        this.btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.addKeyboardEvent("keydown", this.backKeyBack);
    };
    TestPanel.prototype.backKeyBack = function (data) {
        egret.log(data.type, data.keyCode);
    };
    TestPanel.prototype.onClick = function (e) {
        e.currentTarget.x++;
    };
    return TestPanel;
}(BasicComponent));
__reflect(TestPanel.prototype, "TestPanel");
//# sourceMappingURL=StartPanel.js.map