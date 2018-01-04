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
var AbstractP2Test = (function (_super) {
    __extends(AbstractP2Test, _super);
    function AbstractP2Test() {
        var _this = _super.call(this) || this;
        _this.factor = 30;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    AbstractP2Test.prototype.onAddToStage = function (event) {
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    };
    AbstractP2Test.prototype.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.loadGroup("preload");
    };
    AbstractP2Test.prototype.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            this.onAppReady();
            this.addEventListener(egret.Event.ENTER_FRAME, this.loop, this);
        }
    };
    AbstractP2Test.prototype.enableMouseDrag = function (world) {
        this.wworld = world;
        this.emptyBody = new p2.Body();
        this.wworld.addBody(this.emptyBody);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
    };
    AbstractP2Test.prototype.onTouch = function (te) {
        var mousePos = new Array(te.stageX / this.factor, te.stageY / this.factor);
        switch (te.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                var hitBodies = this.wworld.hitTest(mousePos, this.wworld.bodies);
                //console.log(hitBodies.length);
                if (hitBodies.length > 0) {
                    //  for (var i: number = 0; i < hitBodies.length; i++) {
                    var body = hitBodies[0];
                    this.emptyBody.position[0] = mousePos[0];
                    this.emptyBody.position[1] = mousePos[1];
                    this.mouseJoint = new p2.RevoluteConstraint(this.emptyBody, body, {
                        worldPivot: mousePos,
                        collideConnected: false
                    });
                    this.wworld.addConstraint(this.mouseJoint);
                    // }
                    this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
                }
                break;
            case egret.TouchEvent.TOUCH_END:
                this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
                this.wworld.removeConstraint(this.mouseJoint);
                this.mouseJoint = null;
                break;
            case egret.TouchEvent.TOUCH_MOVE:
                this.emptyBody.position[0] = mousePos[0];
                this.emptyBody.position[1] = mousePos[1];
                break;
        }
    };
    AbstractP2Test.prototype.onAppReady = function () {
    };
    AbstractP2Test.prototype.loop = function () {
    };
    return AbstractP2Test;
}(egret.DisplayObjectContainer));
__reflect(AbstractP2Test.prototype, "AbstractP2Test");
//# sourceMappingURL=AbstractP2Test.js.map