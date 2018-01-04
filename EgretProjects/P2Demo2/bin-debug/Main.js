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
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.floorMaterial = new p2.Material();
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function (event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        var p2World = new P2World();
        p2World.createBg(0X00FFFF, this.stage);
        p2World.createPlane(Math.PI, 0, this.stage.stageHeight);
        p2World.createPlane(-Math.PI / 2, 0, 0);
        p2World.createPlane(Math.PI / 2, this.stage.stageWidth, 0);
        //在创建第一个最下方的平面做为地面时，不知道为什么档不住第一个刚体，所以又创建了一个静态刚体做为底下地面
        var body = p2World.createBoxBodyShape(this.stage.stageWidth, 10, 9999, p2.Body.KINEMATIC);
        p2World.drawBox(this.stage.stageWidth, 10, body);
        body.position = [this.stage.stageWidth / 2, this.stage.stageHeight - 200];
        body.shapes[0].material = this.floorMaterial;
        body.angle = 0.1;
        p2.vec2.add;
        this.addChild(p2World);
        this.p2World = p2World;
    };
    Main.prototype.onClick = function (e) {
        this.p2World.index++;
        var index = this.p2World.index;
        var random = Math.random();
        var radius = 30 + 20 * random;
        var body;
        var skin;
        if (random < 0.99) {
            body = this.p2World.createCircleBodyShape(radius, index);
            skin = this.p2World.drawCircle(radius, body);
        }
        else if (random < 0.6) {
            body = this.p2World.createBoxBodyShape(radius, radius, index);
            skin = this.p2World.drawBox(radius, radius, body);
        }
        else {
            var height = radius * 2;
            body = this.p2World.createBoxBodyShape(radius, height, index);
            skin = this.p2World.drawBox(radius, height, body);
        }
        body.position = [e.stageX, e.stageY];
        var m = new p2.Material();
        body.shapes[0].material = m;
        var ballBatContactMaterial = new p2.ContactMaterial(m, this.floorMaterial, {
            friction: 0.5,
            restitution: 0.6 //弹性
        });
        this.p2World.world.addContactMaterial(ballBatContactMaterial);
        skin.x = e.stageX;
        skin.y = e.stageY;
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map