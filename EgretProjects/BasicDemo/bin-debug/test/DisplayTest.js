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
/**测试卡牌翻转*/
var TestCardTurn = (function (_super) {
    __extends(TestCardTurn, _super);
    function TestCardTurn() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**加载到舞台之后调用 */
    TestCardTurn.prototype.render = function () {
        var card = new CardTurn(moon.MoonUI.getRect(100, 200, 0xff0000, -50, -100), moon.MoonUI.getRect(100, 200, 0XFFFF00, -50, -100));
        card.x = card.y = 200;
        this.addChild(card);
        card.turn();
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, back, this);
        function back(e) {
            card.turn(600);
        }
        card.onTurnComplete = function complete() { trace("翻页完成"); };
    };
    return TestCardTurn;
}(moon.BasicView));
__reflect(TestCardTurn.prototype, "TestCardTurn");
/**测试可示对象碰撞*/
var TestDisplayHit = (function (_super) {
    __extends(TestDisplayHit, _super);
    function TestDisplayHit() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**加载到舞台之后调用 */
    TestDisplayHit.prototype.render = function () {
        this.rect1 = this.createRect(100, 100);
        this.rect1.x = this.rect1.y = 10;
        this.showPoint(this.rect1);
        this.rect2 = this.createRect(100, 200, 0XFFFF00);
        this.rect2.x = this.rect2.y = 200;
        this.showPoint(this.rect2);
        var con = new control.ControlDrag(this.stage, this.rect1);
        con.open();
        con.moveBackFun = this.moveBackFun.bind(this);
    };
    TestDisplayHit.prototype.moveBackFun = function () {
        var isHit1 = this.rect2.hitTestPoint(this.rect1.x, this.rect1.y, true);
        var r1 = this.rect1.getBounds();
        var r2 = this.rect2.getBounds();
        r1.x = this.rect1.x;
        r1.y = this.rect1.y;
        r2.x = this.rect2.x;
        r2.y = this.rect2.y;
        var isHit2 = r1.intersects(r2);
        //simpleTrace("hitTestPoint="+isHit1);
        traceSimple("intersects=" + isHit2);
    };
    /**显示锚点位置 */
    TestDisplayHit.prototype.showPoint = function (rect) {
        var point = this.createCircle(4, 0xff0000);
        rect.addChild(point);
    };
    return TestDisplayHit;
}(moon.BasicView));
__reflect(TestDisplayHit.prototype, "TestDisplayHit");
/**可示对象各种操作 */
var TestDisplayDo = (function (_super) {
    __extends(TestDisplayDo, _super);
    function TestDisplayDo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TestDisplayDo.prototype.render = function () {
        this.createRect(this.stage.stageWidth, this.stage.stageHeight, 0X363636);
        //测试类型
        var a = new DisplayObject;
        trace("b的类型是否为DisplayObject=" + Uinfy.as(a, DisplayObject));
        var b = "";
        var c = 11;
        trace("b是不是string=" + Uinfy.as2(b, 'string'), "c是不是number=" + Uinfy.as2(c, 'number'));
        var rects = [];
        for (var i = 0; i < 10; i++) {
            var rect = this.createRect(50, 50, Math.random() * 0XFFFFFF);
            rect.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBegin, this);
            rect.name = "n" + i;
            rect.touchEnabled = true;
            rects.push(rect);
            this.addChild(rect);
        }
        //排版
        LayoutManager.displayRank(rects, 3, 10, 10, 100, 100);
        //隐藏
        Uinfy.hideShowNum(rects, false, 2, 5);
        var tip = new moon.BasicTips("tips_png");
        tip.x = tip.y = 300;
        tip.setValue("测试带背景的文本\n换行接着测试");
        this.addChild(tip);
        //设置图片为灰色
        var image = new ImageIcon("bg_jpg");
        image.scaleX = image.scaleY = 0.2;
        image.y = 350;
        this.addChild(image);
        image.smoothing = true;
        Uinfy.imageSetGray(image, true);
        var btn = new Button;
        btn.label = "白鹭自带的按钮皮肤";
        this.addChild(btn);
        btn.x = 400;
        btn.y = 550;
        var normal = moon.MoonUI.getRect(100, 100, Math.random() * 0XFFFFFF);
        var down = moon.MoonUI.getRect(100, 100, Math.random() * 0XFFFFFF);
        //var down:ImageIcon=new ImageIcon("controlBar_png");
        var btn1 = new moon.BasicButton(normal, down);
        btn1.label = "moon自定义皮肤按钮";
        btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBegin, this);
        this.addChild(btn1);
        btn1.x = 300;
        btn1.y = 400;
        //btn1.removeFromParent(true);
        var skins = [];
        for (var i = 0; i < 10; i++) {
            skins.push(moon.MoonUI.getRect(100, 50, Math.random() * 0XFFFFFF));
        }
        var btn2 = new moon.MoreSkinButton(skins);
        //btn2.label="多个皮肤的按钮";
        var textFlow = [];
        textFlow.push({ text: "多个皮肤", style: { "size": 80, "textColor": 0 } });
        btn2.setTextFlow(textFlow);
        this.addChild(btn2);
        this.addChild(btn2);
        btn2.x = 300;
        btn2.y = 650;
        btn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBegin2, this);
        //圆形按钮
        var normal = moon.MoonUI.getCircle(50, Math.random() * 0XFFFFFF);
        var down = moon.MoonUI.getCircle(50, Math.random() * 0XFFFFFF);
        var btn3 = new moon.BasicButton(normal, down);
        this.addChild(btn3);
        btn3.x = 400;
        btn3.y = 850;
        btn3.labelCircle = "圆按钮";
        //模拟ToggleSwitch
        var swidth = 80;
        var normal = moon.MoonUI.getRoundRect(swidth, 50, moon.Color.skinNormal, 60, 60);
        normal.addChild(moon.MoonUI.getCircle(22, moon.Color.white, 25, 25));
        var down = moon.MoonUI.getRoundRect(swidth, 50, moon.Color.skinDown, 60, 60);
        down.addChild(moon.MoonUI.getCircle(22, moon.Color.white, 25, 25));
        var normal2 = moon.MoonUI.getRoundRect(swidth, 50, moon.Color.skinNormal, 60, 60);
        normal2.addChild(moon.MoonUI.getCircle(22, moon.Color.white, swidth - 25, 25));
        var down2 = moon.MoonUI.getRoundRect(swidth, 50, moon.Color.skinDown, 60, 60);
        down2.addChild(moon.MoonUI.getCircle(22, moon.Color.white, swidth - 25, 25));
        var btn4 = new moon.MoreSkinButton([normal, down, normal2, down2]);
        this.addChild(btn4);
        btn4.x = 400;
        btn4.y = 950;
        btn4.toggleSwitch = true;
        //模拟progressBar;
        swidth = 200;
        var skinOut = moon.MoonUI.getRect(swidth, 20, moon.Color.random);
        var skinIn = moon.MoonUI.getRect(swidth, 20, moon.Color.random);
        var progressBar = new moon.ProgressBar(skinOut, skinIn);
        this.addChild(progressBar);
        progressBar.x = 200;
        progressBar.y = 920;
        var isLoop = true;
        if (isLoop) {
            egret.Ticker.getInstance().register(function loop() {
                progressBar.value += 0.002;
                progressBar.value = progressBar.value >= 1 ? 0 : progressBar.value;
                var v = Math.round(progressBar.value * 100) + "%";
                progressBar.showText(v);
            }, this);
        }
        else {
            progressBar.value = progressBar.value = 0.5;
            var v = Math.round(progressBar.value * 100) + "%";
            progressBar.showText(v, -1, -40);
        }
    };
    TestDisplayDo.prototype.onBegin = function (e) {
        var rect = e.currentTarget;
        moon.TipsManager.getIns().simpleTips("这是个提示" + rect.name, new Point(e.stageX, e.stageY));
    };
    TestDisplayDo.prototype.onBegin2 = function (e) {
        var btn2 = e.currentTarget;
        btn2.label = "多个皮肤的按钮" + btn2.currentPage;
        btn2.currentPage++;
    };
    return TestDisplayDo;
}(moon.BasicView));
__reflect(TestDisplayDo.prototype, "TestDisplayDo");
//# sourceMappingURL=DisplayTest.js.map