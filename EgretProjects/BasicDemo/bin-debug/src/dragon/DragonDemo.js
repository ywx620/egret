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
var DragonDemoAction;
(function (DragonDemoAction) {
    var names;
    (function (names) {
        names[names["stand"] = 0] = "stand";
        names[names["walk"] = 1] = "walk";
        names[names["run"] = 2] = "run";
        names[names["atk"] = 3] = "atk";
        names[names["hurt"] = 4] = "hurt";
        names[names["jump"] = 5] = "jump";
        names[names["jumpTwo"] = 6] = "jumpTwo";
        names[names["jumpDown"] = 7] = "jumpDown";
    })(names = DragonDemoAction.names || (DragonDemoAction.names = {}));
    ;
})(DragonDemoAction || (DragonDemoAction = {}));
var DragonDemo = (function (_super) {
    __extends(DragonDemo, _super);
    function DragonDemo() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.addToStage, _this);
        return _this;
    }
    DragonDemo.prototype.addToStage = function () {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
        FrameAnimation.getIns().loop();
        FrameAnimation.getIns().addFactoryByName("wukong");
        this.names = [
            DragonDemoAction.names[0],
            DragonDemoAction.names[1],
            DragonDemoAction.names[2],
            DragonDemoAction.names[3],
            DragonDemoAction.names[4],
            DragonDemoAction.names[5],
            DragonDemoAction.names[6],
            DragonDemoAction.names[7]
        ];
        this.role = FrameAnimation.getIns().getAnimationSpriteByName(this.names[DragonDemoAction.names.run]);
        this.role.x = 200;
        this.role.y = 200;
        this.addChild(this.role);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClick, this);
    };
    DragonDemo.prototype.onClick = function (e) {
        this.role = FrameAnimation.getIns().getAnimationSpriteByName(this.names[DragonDemoAction.names.jump]);
    };
    return DragonDemo;
}(egret.DisplayObjectContainer));
__reflect(DragonDemo.prototype, "DragonDemo");
//# sourceMappingURL=DragonDemo.js.map