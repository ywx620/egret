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
var P2World = (function (_super) {
    __extends(P2World, _super);
    function P2World() {
        var _this = _super.call(this) || this;
        _this.skins = [];
        _this.index = 0;
        _this.colors = [10];
        _this.world = new p2.World({ gravity: [0, 800] });
        _this.colors[p2.Body.DYNAMIC] = 0XFF0000;
        _this.colors[p2.Body.KINEMATIC] = 0X00FF00;
        _this.addEventListener(egret.Event.ENTER_FRAME, _this.updateWorld, _this);
        return _this;
    }
    P2World.prototype.createBg = function (color, stage) {
        if (color === void 0) { color = 0; }
        var skin = new egret.Sprite();
        skin.graphics.beginFill(color, 0.5);
        skin.graphics.drawRect(0, 0, stage.stageWidth, stage.stageHeight);
        skin.graphics.endFill();
        this.addChild(skin);
    };
    P2World.prototype.createPlane = function (angle, x, y) {
        if (angle === void 0) { angle = Math.PI; }
        var shape = new p2.Plane();
        var body = new p2.Body({ mass: 0 });
        body.addShape(shape);
        body.angle = angle;
        body.position[0] = x;
        body.position[1] = y;
        this.world.addBody(body);
        return body;
    };
    P2World.prototype.drawCircle = function (radius, body) {
        var skin = new egret.Sprite();
        var color = this.colors[body.type];
        skin.graphics.lineStyle(1, color, 1);
        skin.graphics.moveTo(0, 0);
        skin.graphics.lineTo(0, radius);
        skin.graphics.beginFill(color, 0.5);
        skin.graphics.drawCircle(0, 0, radius);
        skin.graphics.endFill();
        skin.x = body.position[0];
        skin.y = body.position[1];
        skin.name = body.id + "";
        this.addChild(skin);
        this.skins.push(skin);
        return skin;
    };
    P2World.prototype.createCircleBodyShape = function (radius, id, type) {
        if (type === void 0) { type = p2.Body.DYNAMIC; }
        var body = new p2.Body({ mass: 1 });
        var shape = new p2.Circle({ radius: radius });
        body.addShape(shape);
        body.id = id;
        body.type = type;
        this.world.addBody(body);
        return body;
    };
    P2World.prototype.drawBox = function (width, height, body) {
        var skin = new egret.Sprite();
        var color = this.colors[body.type];
        skin.graphics.lineStyle(1, color, 1);
        skin.graphics.beginFill(color, 0.5);
        skin.graphics.drawRect(-width / 2, -height / 2, width, height);
        skin.graphics.endFill();
        skin.x = body.position[0];
        skin.y = body.position[1];
        skin.name = body.id + "";
        this.addChild(skin);
        this.skins.push(skin);
        return skin;
    };
    P2World.prototype.createBoxBodyShape = function (width, height, id, type) {
        if (type === void 0) { type = p2.Body.DYNAMIC; }
        var body = new p2.Body({ mass: 1 });
        var shape = new p2.Box({ width: width, height: height });
        body.addShape(shape);
        body.id = id;
        body.type = type;
        this.world.addBody(body);
        return body;
    };
    P2World.prototype.updateWorld = function (e) {
        var timeStep = 1 / 60;
        var skins = this.skins;
        this.world.step(timeStep);
        var bodys = this.world.bodies;
        var l = bodys.length;
        var s = skins.length;
        for (var i = 0; i < l; i++) {
            var body = bodys[i];
            for (var j = 0; j < s; j++) {
                var skin = skins[j];
                if (body.id + "" == skin.name) {
                    skin.x = body.position[0];
                    skin.y = body.position[1];
                    skin.rotation = body.angle * 180 / Math.PI;
                }
            }
        }
    };
    return P2World;
}(egret.DisplayObjectContainer));
__reflect(P2World.prototype, "P2World");
//# sourceMappingURL=P2World.js.map