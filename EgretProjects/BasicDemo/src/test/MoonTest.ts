class MoonTest extends moon.MoonContainer
{
    protected panelMore:moon.PanelMoreManager;
    protected panelBar:moon.PanelBar;
    protected init():void
    {
        this.panelMore=new moon.PanelMoreManager();
        var names:string[]=["moon纯代码组件一，基本按钮展示","ProgresBar展示","基本按钮展示"]
        for(var i=0;i<names.length;i++){
            var panel:moon.PanelBar=new moon.PanelBar();
            panel.label=names[i];
            panel.newAddEventListener(moon.MoonEvent.RENDER_COMPLETE,this.onAddStage.bind(this));
            //panel.addItem(moon.MoonUI.getCircle(200,moon.Color.random,Math.random()*200,Math.random()*200))
            this.panelMore.addItem(panel);
        }
        this.addChild(this.panelMore);
        this.showButton(0);
        this.showProgresBar(1);
    }
    protected onAddStage(e:moon.MoonEvent):void
    {
        var panel:moon.PanelBar=e.currentTarget as moon.PanelBar;
        panel.colorBottom=0XFCDF7C;
    }
    protected showButton(index:number):void
    {
        var panel:moon.PanelBar=this.panelMore.getItem(index);

        var btn1:moon.BasicButton=new moon.BasicButton();
        btn1.label="默认皮肤按钮";
        panel.addItem(btn1,10,10)

        var normal:Sprite=moon.Skin.randomRect;
        var down:Sprite=moon.Skin.randomRect;
        var btn1:moon.BasicButton=new moon.BasicButton(normal,down);
        btn1.label="随机颜色皮肤按钮";
        panel.addItem(btn1,10,90)

        var normal:Sprite=moon.Skin.randomCircle;
        var down:Sprite=moon.Skin.randomCircle;
        var btn1:moon.BasicButton=new moon.BasicButton(normal,down);
        btn1.labelCircle="圆按钮";
        panel.addItem(btn1,100,220)


        var normal:Sprite=moon.Skin.switchOnNormal;
        var down:Sprite=moon.Skin.switchOnDown;
        var normal2:Sprite=moon.Skin.switchOffNormal;
        var down2:Sprite=moon.Skin.switchOffDown;
        var btn4:moon.MoreSkinButton=new moon.MoreSkinButton([normal,down,normal2,down2]);
        btn4.toggleSwitch=true;
        panel.addItem(new moon.Label("toggleSwitch按钮",0),10,300);
        panel.addItem(btn4,10,340);

        var items:any[]=["我帅","我很帅","我双酷双帅","我帅得惊动上帝"];
        var radioButton:moon.RadioButtonBar=new moon.RadioButtonBar;
        var len:number=items.length;
        for(var i:number=0;i<len;i++){
            var btn:moon.BasicButton=new moon.BasicButton(moon.Skin.radioNormal,moon.Skin.radioDown);
            radioButton.addItemLabel(btn,items[i]);
            btn.labelColor=moon.Color.black;
            btn.setLabelPoint(40,0);
            btn.y=50*i;
        }
        panel.addItem(new moon.Label("单选框按钮",0),10,500);
        panel.addItem(radioButton,10,540);
        radioButton.newAddEventListener(moon.MoonEvent.CHANGE,onHandlerRadion.bind(this));
        function onHandlerRadion(e:moon.MoonEvent):void
        {
            moon.TipsManager.getIns().simpleTips("选择了"+radioButton.selectIndex,new Point(150,550))
        }

        var items:any[]=["我帅","我很帅","我双酷双帅","我帅得惊动上帝"];
        var checkBox:moon.CheckBoxBar=new moon.CheckBoxBar;
        var len:number=items.length;
        for(var i:number=0;i<len;i++){
            var skins:any[]=[moon.Skin.checkBoxOnNormal,moon.Skin.checkBoxOnDown,moon.Skin.checkBoxOffNormal,moon.Skin.checkBoxOffDown]
            var btnc:moon.MoreSkinButton=new moon.MoreSkinButton(skins);
            btnc.toggleSwitch=true;
            checkBox.addItemLabel(btnc,items[i]);
            btnc.labelColor=moon.Color.black;
            btnc.setLabelPoint(40,0);
            btnc.y=50*i;
        }
        panel.addItem(new moon.Label("复选框按钮",0),300,500);
        panel.addItem(checkBox,300,540);
    }
    protected showProgresBar(index:number):void
    {
         var panel:moon.PanelBar=this.panelMore.getItem(index);
        // var width=300;
        // var height=20;
        // var skinOut:Sprite=moon.MoonUI.getRect(width,height,moon.Color.random);
        // var skinIn:Sprite=moon.MoonUI.getRect(width,height,moon.Color.random);
        // var progressBar:moon.ProgressBar=new moon.ProgressBar(skinOut,skinIn);
        // progressBar.value=progressBar.value=0.5
        // var v:string=Math.round(progressBar.value*100)+"%";
        // progressBar.showText(v,-1,-40);
        // panel.addItem(progressBar,50,50);
        
        var width=400;
        var height=30;
        var skinOut:Sprite=moon.MoonUI.getRect(width,height,moon.Color.random);
        var skinIn:Sprite=moon.MoonUI.getRect(width,height,moon.Color.random);
        var progressBar:moon.ProgressBar=new moon.ProgressBar(skinOut,skinIn);
        panel.addItem(progressBar,0);
        egret.Ticker.getInstance().register(function loop(){
            progressBar.value+=0.002;
            progressBar.value=progressBar.value>=1?0:progressBar.value;
            var v:string=Math.round(progressBar.value*100)+"%";
            progressBar.showText(v);
        }, this);
    }
}