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
var SetPanel = (function (_super) {
    __extends(SetPanel, _super);
    function SetPanel() {
        var _this = _super.call(this) || this;
        _this.soundChange = 10;
        _this.setSkinName("resource/eui_skins/APP_SetSkin.exml");
        return _this;
    }
    SetPanel.prototype.render = function () {
        var _this = this;
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) { _this.parent.removeChild(_this); }, this);
        this.soundBg.addEventListener(egret.Event.CHANGE, this.onChange, this);
        this.soundEffect.addEventListener(egret.Event.CHANGE, this.onChange, this);
        this.soundBg.value = Const.SOUND_BG * this.soundChange;
        this.soundEffect.value = Const.SOUND_EFFECT * this.soundChange;
        this.setTrackHighLight(this.soundBg);
        this.setTrackHighLight(this.soundEffect);
        for (var i = 0; i < this.numChildren; i++) {
            var ui = this.getChildAt(i);
            if (ui instanceof eui.ToggleButton) {
                ui.addEventListener(egret.Event.CHANGE, this.onToggleButton, this);
                this.changeUI(ui, true);
            }
        }
    };
    SetPanel.prototype.setTrackHighLight = function (slider) {
        var line = this.createBitmapByName("track_sb_png");
        line.x = slider.x;
        line.y = slider.y + 10;
        this.addChild(line);
        slider.trackHighlight = line;
    };
    SetPanel.prototype.onChange = function (e) {
        if (this.soundIsNo.selected == false) {
            this.soundIsNo.selected = true;
        }
        var value;
        if (e.currentTarget == this.soundBg) {
            value = this.soundBg.value;
            value /= this.soundChange;
            SoundControl.getIns().setBgVolume(value);
        }
        else if (e.currentTarget == this.soundEffect) {
            value = this.soundEffect.value;
            value /= this.soundChange;
            SoundControl.getIns().setEffectVolume(value);
        }
    };
    SetPanel.prototype.onToggleButton = function (e) {
        var ui = e.currentTarget;
        this.changeUI(ui);
        if (this.backFunction != null) {
            this.backFunction();
        }
    };
    SetPanel.prototype.changeUI = function (ui, isInit) {
        if (isInit === void 0) { isInit = false; }
        var value = ui.selected ? 1 : 0;
        var bool = ui.selected;
        var data = SystemSetManager.getIns().getData();
        switch (ui.name) {
            case "soundIsNo":
                if (isInit)
                    ui.selected = Const.SOUND_IS_NO == 1;
                else
                    SoundControl.getIns().setIsNoVolume(value);
                break;
            case "turnShip":
                if (isInit)
                    ui.selected = data.turnShip;
                else
                    SystemSetManager.getIns().getData().turnShip = bool;
                break;
            case "fireIsContinue":
                if (isInit)
                    ui.selected = data.fireIsContinue;
                else
                    SystemSetManager.getIns().getData().fireIsContinue = bool;
                break;
            case "moveAim":
                if (isInit)
                    ui.selected = data.aimIsMove;
                else
                    SystemSetManager.getIns().getData().aimIsMove = bool;
                break;
            case "moveMap":
                if (isInit)
                    ui.selected = data.mapIsMove;
                else
                    SystemSetManager.getIns().getData().mapIsMove = bool;
                break;
            case "showShip":
                if (isInit)
                    ui.selected = data.showShip;
                else
                    SystemSetManager.getIns().getData().showShip = bool;
                break;
        }
    };
    return SetPanel;
}(BasicComponent));
__reflect(SetPanel.prototype, "SetPanel");
//# sourceMappingURL=appSet.js.map