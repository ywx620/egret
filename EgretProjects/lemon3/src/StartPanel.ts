class MyPanel extends eui.UILayer {
    constructor() {
        super();
        var panel = new StartPanel();
        this.addChild(panel);
    }
}
class StartPanel extends eui.Component {
    startButton: eui.Button;
    setButton: eui.Button;
    closeButton: eui.Button;
    constructor() {
        super();
        this.addEventListener(eui.UIEvent.COMPLETE, this.onComplete, this);
        this.skinName = "resource/eui_skins/A_start.exml";
    }
    private onComplete() {
        egret.log("complete StartPanel");
        this.startButton.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClick, this);
        this.setButton.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClick, this);
        this.closeButton.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClick, this);
    }
    private onClick(e: egret.TouchEvent) {
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

    }
}

class GamePanel extends eui.Component {
    scroller: eui.VScrollBar;
    // setButton: eui.Button;
    // closeButton: eui.Button;
    list: eui.List;
    constructor() {
        super();
        this.addEventListener(eui.UIEvent.COMPLETE, this.onComplete, this);
        this.skinName = "resource/eui_skins/A_gamePanel.exml";
    }
    private onComplete() {
        egret.log("complete gamePanel");
        //egret.log(this.scroller.addChild(this.createBitmapByName("bg_jpg")));

       // this.list.dataProvider = new eui.ArrayCollection(["11", "22", "33",{label:"label",data:"data",text:"text"}]);
        this.list.addEventListener(egret.Event.CHANGE,this.onList,this);

        var group = new eui.Group();
        var img:eui.Image = new eui.Image("bg_jpg");
        //img.scale9Grid=new egret.Rectangle(10,20,5,5);
       // img.height=200;
        group.addChild(img)
        this.scroller.viewport=group;

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
    }
    private onList(e:egret.Event):void{
        var index=this.list.selectedIndex;
        var item:eui.ItemRenderer=this.list.getChildAt(index) as eui.ItemRenderer;
       // egret.log(item.data.name);
    }
}
class TestPanel extends BasicComponent {
    btn1: eui.Button;
    constructor() {
        super();
        this.setSkinName("resource/eui_skins/A_Test.exml")
    }
    protected render() {
        egret.log(this.isLoadComplete, this.isCreateChildren);
        egret.log(this.btn1, 2);
        
        
        var bitmap:egret.Bitmap=this.createBitmapByName("button_down_png",new egret.Rectangle(2,2,2,2));
        bitmap.width=bitmap.height=100;
        this.addChild(bitmap);
        this.btn1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClick,this);

        this.addKeyboardEvent("keydown",this.backKeyBack);
        
    }
    private backKeyBack(data:any):void
    {
        egret.log(data.type,data.keyCode);
    }
    private onClick(e:egret.TouchEvent){
        e.currentTarget.x++;
    }
}
